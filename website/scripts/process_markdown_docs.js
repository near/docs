const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

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

// Main content cleaning function
async function cleanContent(content) {
  const cacheKey = createCacheKey(content);
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }
  
  let cleaned = content;
  
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

// Final cleanup function to fix markdown structure issues
function finalMarkdownCleanup(content) {
  let cleaned = content;
  
  // Fix inconsistent header levels - ensure proper hierarchy
  cleaned = cleaned.replace(/^#{5,}/gm, '####'); // Max 4 levels
  
  // Fix code blocks without language specification
  cleaned = cleaned.replace(/```\s*\n([^`]+)\n```/g, (match, code) => {
    // Try to detect language from code content
    let language = '';
    if (code.includes('function') || code.includes('const') || code.includes('let') || code.includes('var')) {
      language = 'javascript';
    } else if (code.includes('fn ') || code.includes('struct ') || code.includes('impl ')) {
      language = 'rust';
    } else if (code.includes('def ') || code.includes('import ') || code.includes('from ')) {
      language = 'python';
    } else if (code.includes('curl') || code.includes('http ') || code.includes('POST')) {
      language = 'bash';
    } else if (code.includes('{') && code.includes('}') && code.includes('"')) {
      language = 'json';
    }
    
    return `\`\`\`${language}\n${code}\n\`\`\``;
  });
  
  // Fix mixed bold/italic formatting
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '**$1**'); // Ensure proper bold
  cleaned = cleaned.replace(/\*([^*]+)\*/g, '*$1*'); // Ensure proper italic
  
  // Fix broken links
  cleaned = cleaned.replace(/\[([^\]]+)\]\s*\(\s*\)/g, '$1'); // Remove empty links
  cleaned = cleaned.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1]($2)'); // Clean up spacing
  
  // Fix list formatting
  cleaned = cleaned.replace(/^-\s+/gm, '- '); // Ensure proper list spacing
  cleaned = cleaned.replace(/^\*\s+/gm, '* '); // Ensure proper list spacing
  cleaned = cleaned.replace(/^\d+\.\s+/gm, (match) => match.replace(/\s+/g, ' ')); // Clean numbered lists
  
  // Clean up excessive whitespace but preserve code blocks
  const codeBlocks = [];
  const codeBlockRegex = /```[\s\S]*?```/g;
  let match;
  while ((match = codeBlockRegex.exec(cleaned)) !== null) {
    codeBlocks.push(match[0]);
  }
  
  // Create placeholders for code blocks
  const placeholders = codeBlocks.map((_, i) => `__PRESERVE_CODE_BLOCK_${i}__`);
  
  // Replace code blocks with placeholders
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(block, placeholders[i]);
  });
  
  // Clean up whitespace (now safe from code blocks)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines
  cleaned = cleaned.replace(/[ \t]+$/gm, ''); // Remove trailing whitespace
  cleaned = cleaned.replace(/^[ \t]+/gm, ''); // Remove leading whitespace on non-code lines
  
  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(placeholders[i], block);
  });
  
  // Final cleanup
  cleaned = cleaned.trim();
  
  return cleaned;
}

// Main processing function
async function processMarkdownFiles() {
  console.log('Starting markdown files processing...');
  
  loadCache();
  
  if (!fs.existsSync(STATIC_DIR)) {
    fs.mkdirSync(STATIC_DIR, { recursive: true });
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  // Get all document IDs from sidebar
  const sidebarDocIds = extractDocIdsFromSidebar(sidebar);
  console.log(`Found ${sidebarDocIds.size} documents in sidebar structure`);
  
  // Filter frontmatter IDs to only include those in sidebar
  const filteredEntries = Object.entries(frontmatterIds).filter(([docId]) => 
    sidebarDocIds.has(docId)
  );
  
  console.log(`Processing ${filteredEntries.length} files (filtered by sidebar) in batches of ${BATCH_SIZE}...`);
  
  // Process files in batches
  for (let i = 0; i < filteredEntries.length; i += BATCH_SIZE) {
    const batch = filteredEntries.slice(i, i + BATCH_SIZE);
    
    const batchPromises = batch.map(async ([docId, filePath]) => {
      try {
        const fullPath = path.join(DOCS_DIR, filePath);
        
        if (!fs.existsSync(fullPath)) {
          console.warn(`File not found: ${fullPath}`);
          return { success: false, docId, error: 'File not found' };
        }
        
        const content = fs.readFileSync(fullPath, 'utf8');
        const cleanedContent = await cleanContent(content);
        const finalContent = finalMarkdownCleanup(cleanedContent);
        const outputPath = getMarkdownOutputPath(docId);
        const outputFile = path.join(STATIC_DIR, outputPath + '.md');
        
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputFile, finalContent, 'utf8');
        
        return { success: true, docId, outputPath };
      } catch (error) {
        console.error(`Error processing ${docId}:`, error.message);
        return { success: false, docId, error: error.message };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    batchResults.forEach(result => {
      if (result.success) {
        processedCount++;
      } else {
        errorCount++;
      }
    });
    
    // Memory management
    if (i % (BATCH_SIZE * 10) === 0) {
      forceGarbageCollection();
    }
    
    // Progress report
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(filteredEntries.length / BATCH_SIZE);
    console.log(`Batch ${batchNumber}/${totalBatches} completed (${processedCount} files processed)`);
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Cleanup
  contentCache.clear();
  forceGarbageCollection();
  saveCache();
  
  // Report results
  console.log(`\nProcessing completed:`);
  console.log(`- Files processed: ${processedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log(`- Cache hits: ${cacheHits}`);
  console.log(`- Cache misses: ${cacheMisses}`);
  console.log(`- Cache efficiency: ${cacheHits > 0 ? ((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(1) : 0}%`);
  console.log(`- Output directory: ${STATIC_DIR}`);
  
  if (failedGithubUrls.size > 0) {
    console.log(`\n🚫 GitHub URLs that could not be fetched (${failedGithubUrls.size}):`);
    Array.from(failedGithubUrls).sort().forEach((url, index) => {
      console.log(`${index + 1}. ${url}`);
    });
  } else {
    console.log(`\n✅ All GitHub URLs were successfully fetched!`);
  }
}

// Execute if called directly
if (require.main === module) {
  if (shouldClearCache) {
    console.log('🧹 Clearing cache...');
    clearCache();
    console.log('Cache cleared successfully. Run the script again without --clear-cache to process files.');
  } else {
    processMarkdownFiles().catch(console.error);
  }
}

module.exports = {
  processMarkdownFiles,
  cleanContent,
  loadCache,
  saveCache,
  failedGithubUrls,
  extractDocIdsFromSidebar
};