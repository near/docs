const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const glob = require('glob');

// Load configurations
const frontmatterIds = require('../frontmatter_ids.json');
const sidebar = require('../sidebars.js').default;

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const STATIC_DIR = path.join(__dirname, '../static');
const CACHE_DIR = path.join(__dirname, '../.cache');

// Cache configuration
const MAX_CACHE_SIZE = 100;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB limit per file
const BATCH_SIZE = 3;
const REQUEST_TIMEOUT = 5000;

// Check for clear cache argument
const shouldClearCache = process.argv.includes('--clear-cache') || process.argv.includes('-c');

// Cache and tracking
const githubCache = new Map();
const contentCache = new Map();
const failedGithubUrls = new Set();
let cacheHits = 0;
let cacheMisses = 0;

// Utility functions
function createCacheKey(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function clearOldCacheEntries(cache, maxSize) {
  if (cache.size > maxSize) {
    const entries = Array.from(cache.entries());
    const entriesToRemove = entries.slice(0, cache.size - maxSize);
    entriesToRemove.forEach(([key]) => cache.delete(key));
  }
}

function forceGarbageCollection() {
  if (global.gc) {
    global.gc();
  }
}

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Cache management functions
function clearCache() {
  try {
    const cacheFile = path.join(CACHE_DIR, 'github_cache.json');
    if (fs.existsSync(cacheFile)) {
      fs.unlinkSync(cacheFile);
      console.log('✅ Cache file deleted successfully');
    } else {
      console.log('ℹ️  No cache file found to delete');
    }
    
    // Clear in-memory caches
    githubCache.clear();
    contentCache.clear();
    failedGithubUrls.clear();
    
    console.log('✅ Memory caches cleared');
  } catch (error) {
    console.warn('⚠️  Could not clear cache:', error.message);
  }
}

function loadCache() {
  try {
    const cacheFile = path.join(CACHE_DIR, 'github_cache.json');
    if (fs.existsSync(cacheFile)) {
      const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      Object.entries(cacheData).forEach(([key, value]) => {
        githubCache.set(key, value);
      });
      console.log(`Loaded ${githubCache.size} entries from cache`);
    }
  } catch (error) {
    console.warn('Could not load cache:', error.message);
  }
}

function saveCache() {
  try {
    const cacheFile = path.join(CACHE_DIR, 'github_cache.json');
    const cacheData = Object.fromEntries(githubCache);
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`Saved ${githubCache.size} entries to cache`);
  } catch (error) {
    console.warn('Could not save cache:', error.message);
  }
}

// GitHub code fetching
async function fetchGitHubCode(url) {
  const cacheKey = createCacheKey(url);
  
  if (githubCache.has(cacheKey)) {
    cacheHits++;
    return githubCache.get(cacheKey);
  }
  
  cacheMisses++;
  
  return new Promise((resolve) => {
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    
    const req = https.get(rawUrl, {
      timeout: REQUEST_TIMEOUT,
      headers: { 'User-Agent': 'NEAR-Docs-Processor/1.0' }
    }, (res) => {
      const chunks = [];
      let totalSize = 0;
      
      res.on('data', (chunk) => {
        totalSize += chunk.length;
        if (totalSize > MAX_FILE_SIZE) {
          req.destroy();
          const errorResult = `// File too large from ${url}`;
          failedGithubUrls.add(url);
          githubCache.set(cacheKey, errorResult);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(errorResult);
          return;
        }
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        const errorResult = `// Error fetching code from ${url}`;
        if (res.statusCode >= 400) {
          failedGithubUrls.add(url);
          githubCache.set(cacheKey, errorResult);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(errorResult);
        } else {
          const data = Buffer.concat(chunks).toString('utf8');
          githubCache.set(cacheKey, data);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(data);
        }
      });
    });
    
    req.on('error', () => {
      const errorResult = `// Error fetching code from ${url}`;
      failedGithubUrls.add(url);
      githubCache.set(cacheKey, errorResult);
      clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
      resolve(errorResult);
    });
    
    req.on('timeout', () => {
      req.destroy();
      const timeoutResult = `// Timeout fetching code from ${url}`;
      failedGithubUrls.add(url);
      githubCache.set(timeoutResult, timeoutResult);
      clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
      resolve(timeoutResult);
    });
  });
}

// Component processing functions
async function replaceGithubWithCode(content) {
  const githubTags = content.match(/<Github\s[^>]*?\/?>/g);
  if (!githubTags) return content;
  
  const promises = githubTags.map(async (tag) => {
    try {
      const normalizedTag = tag.replace(/'/g, '"');
      const urlMatch = normalizedTag.match(/url="([^"]*?)"/);
      if (!urlMatch) return { tag, replacement: '' };
      
      const url = urlMatch[1].split('#')[0];
      const code = await fetchGitHubCode(url);
      
      if (!code || code.includes('Error fetching code') || code.includes('Timeout fetching code')) {
        return { tag, replacement: '' };
      }
      
      const startMatch = normalizedTag.match(/start="(\d*)"/);
      const endMatch = normalizedTag.match(/end="(\d*)"/);
      const lines = code.split('\n');
      const startLine = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
      const endLine = endMatch ? parseInt(endMatch[1]) : lines.length;
      const selectedCode = lines.slice(startLine, endLine).join('\n');
      
      if (!selectedCode.trim()) {
        return { tag, replacement: '' };
      }
      
      const languageMatch = normalizedTag.match(/language="([^"]*?)"/);
      const language = languageMatch ? languageMatch[1] : 'javascript';
      
      // Clean up the code and handle common syntax issues
      let cleanedCode = selectedCode
        // Fix empty function parameters
        .replace(/\(\s*,\s*\)/g, '()')
        .replace(/\(\s*,/g, '(')
        .replace(/,\s*\)/g, ')')
        // Fix incomplete const declarations
        .replace(/^const\s*;/gm, '')
        .replace(/^const\s*,/gm, '')
        // Fix empty parameters in function calls
        .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\(\s*,\s*([^)]*)\)/g, '$1($2)')
        .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\(\s*,\s*\)/g, '$1()')
        // Fix trailing commas in parameters
        .replace(/,\s*\)/g, ')')
        // Remove empty lines at start/end
        .replace(/^\s*\n/, '')
        .replace(/\n\s*$/, '');
      
      // Ensure proper code block formatting
      cleanedCode = cleanedCode.replace(/```/g, '\\`\\`\\`'); // Escape any existing backticks
      
      // Only return non-empty code blocks
      if (cleanedCode.trim()) {
        return { tag, replacement: `\`\`\`${language}\n${cleanedCode}\n\`\`\`` };
      } else {
        return { tag, replacement: '' };
      }
    } catch (error) {
      return { tag, replacement: '' };
    }
  });
  
  const results = await Promise.all(promises);
  let formatted = content;
  
  results.forEach(({ tag, replacement }) => {
    formatted = formatted.replace(tag, replacement);
  });
  
  return formatted;
}

function processCardComponents(content) {
  const cardMatches = content.match(/<Card\s+[^>]*>/g);
  if (!cardMatches) return content;
  
  let processed = content;
  
  cardMatches.forEach(cardTag => {
    try {
      const titleMatch = cardTag.match(/title=['"]([^'"]*)['"]/);
      const textMatch = cardTag.match(/text=['"]([^'"]*)['"]/);
      const linksMatch = cardTag.match(/links=\{([^}]*)\}/);
      
      let cardContent = '';
      
      if (titleMatch) {
        cardContent += `## ${titleMatch[1]}\n\n`;
      }
      
      if (textMatch) {
        cardContent += `${textMatch[1]}\n\n`;
      }
      
      if (linksMatch) {
        const linkPairs = linksMatch[1].match(/"([^"]+)":\s*"([^"]+)"/g);
        if (linkPairs) {
          cardContent += '**Useful Links:**\n\n';
          linkPairs.forEach(pair => {
            const [, linkText, linkUrl] = pair.match(/"([^"]+)":\s*"([^"]+)"/);
            cardContent += `- [${linkText}](${linkUrl})\n`;
          });
          cardContent += '\n';
        }
      }
      
      processed = processed.replace(cardTag, cardContent);
    } catch (error) {
      processed = processed.replace(cardTag, '');
    }
  });
  
  return processed;
}

function processTabComponents(content) {
  const tabsMatches = content.match(/<Tabs[\s\S]*?<\/Tabs>/g);
  if (!tabsMatches) return content;
  
  let processed = content;
  
  tabsMatches.forEach(tabsBlock => {
    try {
      let tabContent = '';
      const tabItemRegex = /<TabItem\s+[^>]*?>([\s\S]*?)<\/TabItem>/g;
      let tabItemMatch;
      
      while ((tabItemMatch = tabItemRegex.exec(tabsBlock)) !== null) {
        const tabItemTag = tabItemMatch[0];
        const tabItemContent = tabItemMatch[1];
        
        // Handle both regular and JSX label attributes
        const labelMatch = tabItemTag.match(/label=['"]([^'"]*)['"]/);
        const jsxLabelMatch = tabItemTag.match(/label=\{([^}]*)\}/);
        const valueMatch = tabItemTag.match(/value=['"]([^'"]*)['"]/);
        
        let label = null;
        if (labelMatch) {
          label = labelMatch[1];
        } else if (jsxLabelMatch) {
          // Try to extract text from JSX expression
          const jsxContent = jsxLabelMatch[1];
          if (jsxContent.includes('LantstoolLabel')) {
            label = 'Lantstool';
          } else {
            // Try to extract simple text
            const textMatch = jsxContent.match(/['"]([^'"]*)['"]/);
            if (textMatch) {
              label = textMatch[1];
            }
          }
        } else if (valueMatch) {
          // Use value as fallback label
          label = valueMatch[1];
        }
        
        if (label) {
          tabContent += `### ${label}\n\n`;
        }
        
        // Process the content inside TabItem
        let processedContent = tabItemContent.trim();
        
        // Remove imported component references but preserve their content
        processedContent = processedContent.replace(/<([A-Z][a-zA-Z0-9]*)\s*\/>/g, '');
        processedContent = processedContent.replace(/<([A-Z][a-zA-Z0-9]*)\s*><\/\1>/g, '');
        
        // Fix code blocks that might have lost their language specification
        processedContent = processedContent.replace(/```\s*\n/g, '```\n');
        
        // Ensure proper spacing around code blocks
        processedContent = processedContent.replace(/```/g, '\n```');
        processedContent = processedContent.replace(/\n\n```/g, '\n```');
        
        tabContent += `${processedContent}\n\n`;
      }
      
      processed = processed.replace(tabsBlock, tabContent);
    } catch (error) {
      processed = processed.replace(tabsBlock, '');
    }
  });
  
  return processed;
}

function processAdmonitionComponents(content) {
  const admonitionRegex = /:::(tip|warning|info|caution|danger)(\s+[^\n]*?)?\n([\s\S]*?):::/g;
  
  const typeEmoji = {
    tip: '💡',
    warning: '⚠️',
    info: 'ℹ️',
    caution: '⚠️',
    danger: '🚫'
  };
  
  const typeLabel = {
    tip: 'Tip',
    warning: 'Warning',
    info: 'Information',
    caution: 'Caution',
    danger: 'Danger'
  };
  
  return content.replace(admonitionRegex, (match, type, title, content) => {
    const emoji = typeEmoji[type] || '';
    const label = typeLabel[type] || type.charAt(0).toUpperCase() + type.slice(1);
    const finalTitle = title ? title.trim() : label;
    
    return `> ${emoji} **${finalTitle}**\n> \n> ${content.trim().replace(/\n/g, '\n> ')}\n`;
  });
}

function processDetailsComponents(content) {
  const detailsMatches = content.match(/<details[\s\S]*?<\/details>/g);
  if (!detailsMatches) return content;
  
  let processed = content;
  
  detailsMatches.forEach(detailsBlock => {
    try {
      const summaryMatch = detailsBlock.match(/<summary>([\s\S]*?)<\/summary>/);
      const contentMatch = detailsBlock.match(/<\/summary>([\s\S]*?)<\/details>/);
      
      let detailContent = '';
      
      if (summaryMatch) {
        detailContent += `**${summaryMatch[1].trim()}**\n\n`;
      }
      
      if (contentMatch) {
        detailContent += `${contentMatch[1].trim()}\n\n`;
      }
      
      processed = processed.replace(detailsBlock, detailContent);
    } catch (error) {
      processed = processed.replace(detailsBlock, '');
    }
  });
  
  return processed;
}

function processOtherComponents(content) {
  let processed = content;
  
  // Process CodeBlock components
  processed = processed.replace(/<CodeBlock[\s\S]*?>([\s\S]*?)<\/CodeBlock>/g, (match, code) => {
    return `\`\`\`\n${code.trim()}\n\`\`\``;
  });
  
  // Process Highlight components
  processed = processed.replace(/<Highlight[\s\S]*?>([\s\S]*?)<\/Highlight>/g, (match, text) => {
    return `**${text.trim()}**`;
  });
  
  // Process Link components
  processed = processed.replace(/<Link\s+to=['"]([^'"]*)['"]\s*>([\s\S]*?)<\/Link>/g, (match, url, text) => {
    return `[${text.trim()}](${url})`;
  });
  
  // Process strong tags
  processed = processed.replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**');
  
  // Process em tags
  processed = processed.replace(/<em>([\s\S]*?)<\/em>/g, '*$1*');
  
  // Process code tags
  processed = processed.replace(/<code>([\s\S]*?)<\/code>/g, '`$1`');
  
  // Process br tags
  processed = processed.replace(/<br\s*\/?>/g, '\n');
  
  // Process hr tags
  processed = processed.replace(/<hr\s*\/?>/g, '\n---\n');
  
  // Process blockquote tags
  processed = processed.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (match, content) => {
    return content.trim().split('\n').map(line => `> ${line}`).join('\n');
  });
  
  return processed;
}

// New function to process imported MDX components
async function processImportedComponents(content, currentFilePath) {
  // Extract imports
  const importMatches = content.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?\s*$/gm);
  if (!importMatches) return content;
  
  const componentMap = new Map();
  
  // Parse imports and read component files
  for (const importMatch of importMatches) {
    const match = importMatch.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?\s*$/);
    if (match) {
      const [, componentName, importPath] = match;
      
      try {
        // Resolve the import path relative to current file
        let resolvedPath;
        if (importPath.startsWith('@site/src/')) {
          // Handle @site alias
          resolvedPath = path.join(__dirname, '../src/', importPath.replace('@site/src/', ''));
        } else if (importPath.startsWith('./') || importPath.startsWith('../')) {
          // Handle relative imports
          const currentDir = path.dirname(currentFilePath);
          resolvedPath = path.resolve(currentDir, importPath);
        } else {
          continue; // Skip absolute imports or theme components
        }
        
        // Add .mdx extension if not present
        if (!path.extname(resolvedPath)) {
          resolvedPath += '.mdx';
        }
        
        // Check if component file exists
        if (fs.existsSync(resolvedPath)) {
          const componentContent = fs.readFileSync(resolvedPath, 'utf8');
          const cleanedComponentContent = await cleanContent(componentContent);
          componentMap.set(componentName, cleanedComponentContent);
        }
      } catch (error) {
        console.warn(`Could not process import ${componentName} from ${importPath}:`, error.message);
      }
    }
  }
  
  let processed = content;
  
  // Replace component usage with actual content
  componentMap.forEach((componentContent, componentName) => {
    // Match both self-closing and regular component tags
    const componentRegex = new RegExp(`<${componentName}\\s*\\/?>`, 'g');
    const wrappedComponentRegex = new RegExp(`<${componentName}[^>]*>([\\s\\S]*?)<\\/${componentName}>`, 'g');
    
    processed = processed.replace(componentRegex, componentContent);
    processed = processed.replace(wrappedComponentRegex, componentContent);
  });
  
  return processed;
}

// Main content cleaning function
async function cleanContent(content, currentFilePath = '') {
  const cacheKey = createCacheKey(content);
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }
  
  let cleaned = content;
  
  // Process imported components BEFORE removing imports
  if (currentFilePath) {
    cleaned = await processImportedComponents(cleaned, currentFilePath);
  }
  
  // Remove all imports (including JSX components and MDX imports)
  cleaned = cleaned.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+\{[^}]*\}\s+from\s+['"].*?['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+.*?$/gm, '');
  
  // Remove front matter
  const sections = cleaned.split('---');
  if (sections.length >= 3) {
    sections.splice(1, 1);
    cleaned = sections.join('---').replace(/^---+\n\n/g, '');
  }
  
  // Remove export statements
  cleaned = cleaned.replace(/^export\s+.*?$/gm, '');
  
  // First, protect existing code blocks before processing components
  const codeBlocks = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match;
  while ((match = codeBlockRegex.exec(cleaned)) !== null) {
    codeBlocks.push(match[0]);
  }
  
  // Create placeholders for code blocks
  const placeholders = codeBlocks.map((_, i) => `__CODE_BLOCK_${i}__`);
  
  // Replace code blocks with placeholders
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(block, placeholders[i]);
  });
  
  // Process all components (now safe from code block interference)
  cleaned = await replaceGithubWithCode(cleaned);
  cleaned = processCardComponents(cleaned);
  cleaned = processTabComponents(cleaned);
  cleaned = processAdmonitionComponents(cleaned);
  cleaned = processDetailsComponents(cleaned);
  cleaned = processOtherComponents(cleaned);
  cleaned = processMdxComponents(cleaned);
  
  // Remove remaining HTML/JSX tags and clean up
  cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/'(.)/g, '$1');
  
  // Clean up JSX expressions and fragments
  cleaned = cleaned.replace(/\{[^}]*\}/g, '');
  cleaned = cleaned.replace(/<>\s*<\/>/g, '');
  cleaned = cleaned.replace(/<React\.Fragment[\s\S]*?<\/React\.Fragment>/g, '');
  
  // Clean up multiple empty lines
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(placeholders[i], block);
  });
  
  // Handle any remaining incomplete code blocks or malformed markdown
  cleaned = cleaned.replace(/```\s*$/gm, '```');
  cleaned = cleaned.replace(/```([^`\n]*)\n\s*```/g, '```$1\n// Code block content\n```');
  
  // Decode unicode
  try {
    cleaned = cleaned.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
  } catch (error) {
    // Ignore decoding errors
  }
  
  // Cache the result
  contentCache.set(cacheKey, cleaned);
  clearOldCacheEntries(contentCache, MAX_CACHE_SIZE);
  
  return cleaned;
}

// New function to process MDX-specific components
function processMdxComponents(content) {
  let processed = content;
  
  // Process LantstoolLabel components
  processed = processed.replace(/<LantstoolLabel\s*\/>/g, 'Lantstool');
  processed = processed.replace(/<LantstoolLabel\s*><\/LantstoolLabel>/g, 'Lantstool');
  
  // Process TryOutOnLantstool components
  processed = processed.replace(/<TryOutOnLantstool\s+[^>]*\/>/g, '');
  processed = processed.replace(/<TryOutOnLantstool[\s\S]*?<\/TryOutOnLantstool>/g, '');
  
  // Process imported component references (like RequestJson, ResponseJson, etc.)
  processed = processed.replace(/<([A-Z][a-zA-Z0-9]*)\s*\/>/g, '');
  processed = processed.replace(/<([A-Z][a-zA-Z0-9]*)\s*><\/\1>/g, '');
  
  // Process JSX expressions in attributes
  processed = processed.replace(/\s+\w+\s*=\s*\{[^}]*\}/g, '');
  
  // Process self-closing tags with JSX expressions
  processed = processed.replace(/<\w+\s+[^>]*\{[^}]*\}[^>]*\/>/g, '');
  
  // Clean up remaining JSX syntax
  processed = processed.replace(/\{[\s\S]*?\}/g, '');
  
  return processed;
}

// Generate output path maintaining folder structure
function getMarkdownOutputPath(docId) {
  // Keep the original folder structure instead of flattening
  return docId;
}

// New function to extract all document IDs from sidebar structure
function extractDocIdsFromSidebar(sidebarConfig) {
  const docIds = new Set();
  
  function traverseItem(item) {
    if (typeof item === 'string') {
      docIds.add(item);
    } else if (Array.isArray(item)) {
      item.forEach(traverseItem);
    } else if (typeof item === 'object' && item !== null) {
      if (item.id) {
        docIds.add(item.id);
      }
      if (item.link && item.link.id) {
        docIds.add(item.link.id);
      }
      if (item.items) {
        item.items.forEach(traverseItem);
      }
      // Handle nested objects with string keys
      Object.values(item).forEach(value => {
        if (Array.isArray(value)) {
          value.forEach(traverseItem);
        }
      });
    }
  }
  
  // Traverse all sidebar sections
  Object.values(sidebarConfig).forEach(section => {
    if (Array.isArray(section)) {
      section.forEach(traverseItem);
    }
  });
  
  return docIds;
}

// New function to discover markdown files using glob patterns
function discoverMarkdownFiles(patterns = ['**/*.md', '**/*.mdx']) {
  const discovered = new Map();
  
  patterns.forEach(pattern => {
    const fullPattern = path.join(DOCS_DIR, pattern);
    const files = glob.sync(fullPattern, {
      ignore: [
        '**/node_modules/**',
        '**/build/**',
        '**/dist/**',
        '**/.git/**',
        '**/README.md',
        '**/CODE_OF_CONDUCT.md',
        '**/CONTRIBUTING.md',
        '**/LICENSE*.md'
      ]
    });
    
    files.forEach(file => {
      const relativePath = path.relative(DOCS_DIR, file);
      // Create docId from relative path without extension
      const docId = relativePath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
      discovered.set(docId, relativePath);
    });
  });
  
  return discovered;
}

// Enhanced function to get document metadata from frontmatter
function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};
  
  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '');
      frontmatter[key] = value;
    }
  });
  
  return frontmatter;
}

// Enhanced function to filter discovered files based on criteria
function filterDiscoveredFiles(discoveredFiles, options = {}) {
  const {
    includeFrontmatterIds = true,
    includeSidebarDocs = true,
    includeOrphaned = false,
    patterns = []
  } = options;
  
  const sidebarDocIds = extractDocIdsFromSidebar(sidebar);
  const frontmatterDocIds = new Set(Object.keys(frontmatterIds));
  const filtered = new Map();
  
  discoveredFiles.forEach((filePath, docId) => {
    let shouldInclude = false;
    
    // Check if it's in frontmatter_ids.json
    if (includeFrontmatterIds && frontmatterDocIds.has(docId)) {
      shouldInclude = true;
    }
    
    // Check if it's in sidebar
    if (includeSidebarDocs && sidebarDocIds.has(docId)) {
      shouldInclude = true;
    }
    
    // Check if it's an orphaned file (not in frontmatter or sidebar)
    if (includeOrphaned && !frontmatterDocIds.has(docId) && !sidebarDocIds.has(docId)) {
      shouldInclude = true;
    }
    
    // Check custom patterns
    if (patterns.length > 0) {
      shouldInclude = patterns.some(pattern => {
        if (typeof pattern === 'string') {
          return docId.includes(pattern) || filePath.includes(pattern);
        }
        if (pattern instanceof RegExp) {
          return pattern.test(docId) || pattern.test(filePath);
        }
        return false;
      });
    }
    
    if (shouldInclude) {
      filtered.set(docId, filePath);
    }
  });
  
  return filtered;
}

// New function to process files discovered by glob
async function processDiscoveredFiles(discoveredFiles) {
  console.log(`Processing ${discoveredFiles.size} discovered files in batches of ${BATCH_SIZE}...`);
  
  let processedCount = 0;
  let errorCount = 0;
  const entries = Array.from(discoveredFiles.entries());
  
  // Process files in batches
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    
    const batchPromises = batch.map(async ([docId, filePath]) => {
      try {
        const fullPath = path.join(DOCS_DIR, filePath);
        
        if (!fs.existsSync(fullPath)) {
          console.warn(`File not found: ${fullPath}`);
          return { success: false, docId, error: 'File not found' };
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Extract frontmatter for additional metadata
        const frontmatter = extractFrontmatter(content);
        
        // Skip files marked as drafts or hidden
        if (frontmatter.draft === 'true' || frontmatter.hidden === 'true') {
          console.log(`Skipping draft/hidden file: ${docId}`);
          return { success: true, docId, skipped: true };
        }
        
        const cleanedContent = await cleanContent(content, fullPath);
        const finalContent = finalMarkdownCleanup(cleanedContent);
        const outputPath = getMarkdownOutputPath(docId);
        const outputFile = path.join(STATIC_DIR, outputPath + '.md');
        
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputFile, finalContent, 'utf8');
        
        return { success: true, docId, outputPath, frontmatter };
      } catch (error) {
        console.error(`Error processing ${docId}:`, error.message);
        return { success: false, docId, error: error.message };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(result => {
      if (result.success && !result.skipped) {
        processedCount++;
      } else if (!result.success) {
        errorCount++;
      }
    });
    
    // Memory management
    if (i % (BATCH_SIZE * 10) === 0) {
      forceGarbageCollection();
    }
    
    // Progress report
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
    if (!options.verbose) {
      console.log(`📊 Batch ${batchNumber}/${totalBatches} completed (${processedCount} processed, ${errorCount} errors)`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Cleanup
  contentCache.clear();
  forceGarbageCollection();
  saveCache();
  
  // Report results
  console.log(`\n🎉 Processing completed:`);
  console.log(`   📝 Files processed: ${processedCount}`);
  console.log(`   ⏭️  Files skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🎯 Cache hits: ${cacheHits}`);
  console.log(`   🔍 Cache misses: ${cacheMisses}`);
  console.log(`   📈 Cache efficiency: ${cacheHits > 0 ? ((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(1) : 0}%`);
  console.log(`   📂 Output directory: ${options.outputDir}`);
  
  if (failedGithubUrls.size > 0) {
    console.log(`\n🚫 GitHub URLs that could not be fetched (${failedGithubUrls.size}):`);
    Array.from(failedGithubUrls).sort().forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });
  } else {
    console.log(`\n✅ All GitHub URLs were successfully fetched!`);
  }
  
  return { processedCount, errorCount, skippedCount };
}

// Final markdown cleanup function
function finalMarkdownCleanup(content) {
  let cleaned = content;
  
  // Fix broken links
  cleaned = cleaned.replace(/\[([^\]]*)\]\(\s*\)/g, '$1');
  cleaned = cleaned.replace(/\[\]\([^)]+\)/g, '');
  
  // Fix malformed headers
  cleaned = cleaned.replace(/^#+\s*$/gm, '');
  cleaned = cleaned.replace(/^(#+)\s*(.+?)\s*\1*$/gm, '$1 $2');
  
  // Clean up excessive whitespace but preserve intentional spacing
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');
  cleaned = cleaned.replace(/^\s+$/gm, '');
  
  // Fix incomplete code blocks
  const codeBlockMatches = cleaned.match(/```[^`]*$/gm);
  if (codeBlockMatches) {
    codeBlockMatches.forEach(match => {
      cleaned = cleaned.replace(match, match + '\n```');
    });
  }
  
  // Remove empty code blocks
  cleaned = cleaned.replace(/```\s*\n\s*```/g, '');
  
  // Fix table formatting if any tables exist
  cleaned = cleaned.replace(/\|\s*\|\s*\|/g, '| | |');
  
  // Ensure file ends with single newline
  cleaned = cleaned.replace(/\s+$/, '\n');
  
  return cleaned;
}

// CLI option parsing function
function parseCliOptions() {
  const args = process.argv.slice(2);
  const options = {
    clearCache: false,
    patterns: [],
    includeFrontmatterIds: true,
    includeSidebarDocs: true,
    includeOrphaned: false,
    outputDir: STATIC_DIR,
    dryRun: false,
    verbose: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--clear-cache':
      case '-c':
        options.clearCache = true;
        break;
      case '--pattern':
      case '-p':
        if (i + 1 < args.length) {
          options.patterns.push(args[++i]);
        }
        break;
      case '--include-orphaned':
        options.includeOrphaned = true;
        break;
      case '--exclude-frontmatter':
        options.includeFrontmatterIds = false;
        break;
      case '--exclude-sidebar':
        options.includeSidebarDocs = false;
        break;
      case '--output-dir':
      case '-o':
        if (i + 1 < args.length) {
          options.outputDir = args[++i];
        }
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
    }
  }
  
  return options;
}

// Help function
function printHelp() {
  console.log(`
NEAR Docs Markdown Processor with Glob Support

Usage: node process_markdown_docs.js [options]

Options:
  -c, --clear-cache          Clear the GitHub content cache before processing
  -p, --pattern <pattern>    Add custom glob pattern for file discovery (can be used multiple times)
  --include-orphaned         Include files not referenced in frontmatter_ids.json or sidebar
  --exclude-frontmatter      Exclude files from frontmatter_ids.json
  --exclude-sidebar          Exclude files from sidebar configuration
  -o, --output-dir <dir>     Specify output directory (default: ../static)
  --dry-run                  Show what would be processed without actually processing
  -v, --verbose              Enable verbose logging
  -h, --help                 Show this help message

Examples:
  # Process all files from frontmatter and sidebar
  node process_markdown_docs.js
  
  # Include orphaned files (not in frontmatter or sidebar)
  node process_markdown_docs.js --include-orphaned
  
  # Process only files matching specific patterns
  node process_markdown_docs.js -p "docs/ai/**/*.md" -p "docs/tools/**/*.md"
  
  # Clear cache and process with verbose output
  node process_markdown_docs.js --clear-cache --verbose
  
  # Dry run to see what would be processed
  node process_markdown_docs.js --dry-run --verbose
`);
}

// Enhanced main processing function with CLI options
async function processMarkdownFiles(cliOptions = null) {
  const options = cliOptions || parseCliOptions();
  
  if (options.verbose) {
    console.log('🚀 Starting markdown files processing with options:', options);
  } else {
    console.log('🚀 Starting markdown files processing...');
  }
  
  loadCache();
  
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir, { recursive: true });
  }
  
  let processedCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  // Use custom patterns if provided, otherwise use defaults
  const globPatterns = options.patterns.length > 0 ? options.patterns : ['**/*.md', '**/*.mdx'];
  
  // Discover markdown files using glob
  const discoveredFiles = discoverMarkdownFiles(globPatterns);
  console.log(`📁 Discovered ${discoveredFiles.size} markdown files using patterns: ${globPatterns.join(', ')}`);
  
  if (options.verbose) {
    console.log('Discovered files:');
    Array.from(discoveredFiles.entries()).forEach(([docId, filePath]) => {
      console.log(`  - ${docId} (${filePath})`);
    });
  }
  
  // Filter discovered files based on criteria
  const filteredFiles = filterDiscoveredFiles(discoveredFiles, {
    includeFrontmatterIds: options.includeFrontmatterIds,
    includeSidebarDocs: options.includeSidebarDocs,
    includeOrphaned: options.includeOrphaned,
    patterns: options.patterns.map(p => new RegExp(p.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')))
  });
  
  console.log(`🔍 Filtered down to ${filteredFiles.size} files after applying criteria`);
  
  if (options.verbose || options.dryRun) {
    console.log('Files to be processed:');
    Array.from(filteredFiles.entries()).forEach(([docId, filePath]) => {
      const inFrontmatter = Object.keys(frontmatterIds).includes(docId);
      const inSidebar = extractDocIdsFromSidebar(sidebar).has(docId);
      const status = [];
      if (inFrontmatter) status.push('frontmatter');
      if (inSidebar) status.push('sidebar');
      if (status.length === 0) status.push('orphaned');
      
      console.log(`  - ${docId} (${filePath}) [${status.join(', ')}]`);
    });
  }
  
  if (options.dryRun) {
    console.log(`\n🏃‍♂️ Dry run completed. Would process ${filteredFiles.size} files.`);
    return { processedCount: 0, errorCount: 0, skippedCount: 0, dryRun: true };
  }
  
  // Process files in batches
  console.log(`⚙️  Processing ${filteredFiles.size} files in batches of ${BATCH_SIZE}...`);
  
  const entries = Array.from(filteredFiles.entries());
  
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    
    const batchPromises = batch.map(async ([docId, filePath]) => {
      try {
        const fullPath = path.join(DOCS_DIR, filePath);
        
        if (!fs.existsSync(fullPath)) {
          console.warn(`⚠️  File not found: ${fullPath}`);
          return { success: false, docId, error: 'File not found' };
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Extract frontmatter for additional metadata
        const frontmatter = extractFrontmatter(content);
        
        // Skip files marked as drafts or hidden
        if (frontmatter.draft === 'true' || frontmatter.hidden === 'true') {
          if (options.verbose) {
            console.log(`⏭️  Skipping draft/hidden file: ${docId}`);
          }
          return { success: true, docId, skipped: true };
        }
        
        const cleanedContent = await cleanContent(content, fullPath);
        const finalContent = finalMarkdownCleanup(cleanedContent);
        const outputPath = getMarkdownOutputPath(docId);
        const outputFile = path.join(options.outputDir, outputPath + '.md');
        
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputFile, finalContent, 'utf8');
        
        if (options.verbose) {
          console.log(`✅ Processed: ${docId} -> ${outputPath}.md`);
        }
        
        return { success: true, docId, outputPath, frontmatter };
      } catch (error) {
        console.error(`❌ Error processing ${docId}:`, error.message);
        return { success: false, docId, error: error.message };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(result => {
      if (result.success && !result.skipped) {
        processedCount++;
      } else if (result.success && result.skipped) {
        skippedCount++;
      } else if (!result.success) {
        errorCount++;
      }
    });
    
    // Memory management
    if (i % (BATCH_SIZE * 10) === 0) {
      forceGarbageCollection();
    }
    
    // Progress report
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
    if (!options.verbose) {
      console.log(`📊 Batch ${batchNumber}/${totalBatches} completed (${processedCount} processed, ${skippedCount} skipped, ${errorCount} errors)`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Cleanup
  contentCache.clear();
  forceGarbageCollection();
  saveCache();
  
  // Report results
  console.log(`\n🎉 Processing completed:`);
  console.log(`   📝 Files processed: ${processedCount}`);
  console.log(`   ⏭️  Files skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   🎯 Cache hits: ${cacheHits}`);
  console.log(`   🔍 Cache misses: ${cacheMisses}`);
  console.log(`   📈 Cache efficiency: ${cacheHits > 0 ? ((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(1) : 0}%`);
  console.log(`   📂 Output directory: ${options.outputDir}`);
  
  if (failedGithubUrls.size > 0) {
    console.log(`\n🚫 GitHub URLs that could not be fetched (${failedGithubUrls.size}):`);
    Array.from(failedGithubUrls).sort().forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });
  } else {
    console.log(`\n✅ All GitHub URLs were successfully fetched!`);
  }
  
  return { processedCount, errorCount, skippedCount };
}

// Execute if called directly
if (require.main === module) {
  const options = parseCliOptions();
  
  if (options.clearCache) {
    console.log('🧹 Clearing cache...');
    clearCache();
    console.log('✅ Cache cleared successfully. Run the script again without --clear-cache to process files.');
  } else {
    processMarkdownFiles(options).catch(console.error);
  }
}

module.exports = {
  processMarkdownFiles,
  cleanContent,
  loadCache,
  saveCache,
  failedGithubUrls,
  extractDocIdsFromSidebar,
  discoverMarkdownFiles,
  filterDiscoveredFiles,
  parseCliOptions
};