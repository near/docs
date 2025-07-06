const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { promisify } = require('util');

// Load configurations
const frontmatterIds = require('../frontmatter_ids.json');
const sidebars = require('../sidebars.js');

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const BUILD_DIR = path.join(__dirname, '../build');
const CACHE_DIR = path.join(__dirname, '../.cache');

// Cache for GitHub code and processed content with size limits
const MAX_CACHE_SIZE = 100; // Reduce cache size to limit memory usage
const githubCache = new Map();
const contentCache = new Map();
const failedGithubUrls = new Set();

// Performance tracking
let cacheHits = 0;
let cacheMisses = 0;

// Memory management
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

// Function to create cache key
function createCacheKey(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Function to load cache from disk
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

// Function to save cache to disk
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

// Optimized function to fetch GitHub code with better memory management
async function fetchGitHubCode(url) {
  const cacheKey = createCacheKey(url);
  
  // Check cache first
  if (githubCache.has(cacheKey)) {
    cacheHits++;
    return githubCache.get(cacheKey);
  }
  
  cacheMisses++;
  
  return new Promise((resolve, reject) => {
    // Convert GitHub URL to raw URL
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    
    const options = {
      timeout: 5000, // Reduce timeout to 5 seconds
      headers: {
        'User-Agent': 'NEAR-Docs-Processor/1.0'
      }
    };
    
    const req = https.get(rawUrl, options, (res) => {
      const chunks = [];
      let totalSize = 0;
      const maxSize = 1024 * 1024; // 1MB limit per file
      
      res.on('data', (chunk) => {
        totalSize += chunk.length;
        if (totalSize > maxSize) {
          req.destroy();
          console.warn(`File too large from ${url}: ${totalSize} bytes`);
          failedGithubUrls.add(url);
          const errorResult = `// File too large from ${url}`;
          githubCache.set(cacheKey, errorResult);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(errorResult);
          return;
        }
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.warn(`Error fetching GitHub code from ${url}: HTTP ${res.statusCode}`);
          failedGithubUrls.add(url);
          const errorResult = `// Error fetching code from ${url}`;
          githubCache.set(cacheKey, errorResult);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(errorResult);
        } else {
          const data = Buffer.concat(chunks).toString('utf8');
          // Cache the result with size management
          githubCache.set(cacheKey, data);
          clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
          resolve(data);
        }
      });
    });
    
    req.on('error', (err) => {
      console.warn(`Error fetching GitHub code from ${url}:`, err.message);
      failedGithubUrls.add(url);
      const errorResult = `// Error fetching code from ${url}`;
      githubCache.set(cacheKey, errorResult);
      clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
      resolve(errorResult);
    });
    
    req.on('timeout', () => {
      req.destroy();
      console.warn(`Timeout fetching GitHub code from ${url}`);
      failedGithubUrls.add(url);
      const timeoutResult = `// Timeout fetching code from ${url}`;
      githubCache.set(cacheKey, timeoutResult);
      clearOldCacheEntries(githubCache, MAX_CACHE_SIZE);
      resolve(timeoutResult);
    });
  });
}

// Function to process GitHub tags with parallelization
async function replaceGithubWithCode(content) {
  const githubTags = content.match(/<Github\s[^>]*?\/?>/g);
  if (!githubTags) return content;
  
  let formatted = content;
  
  // Process all GitHub tags in parallel
  const promises = githubTags.map(async (tag) => {
    try {
      const normalizedTag = tag.replace(/'/g, '"');
      
      const urlMatch = normalizedTag.match(/url="([^"]*?)"/);
      if (!urlMatch) return { tag, replacement: '' };
      
      let url = urlMatch[1];
      url = url.split('#')[0];
      
      const urlParts = url.replace('https://github.com/', '').split('/');
      if (urlParts.length < 5) return { tag, replacement: '' };
      
      const [org, repo, , branch, ...pathSegments] = urlParts;
      const filePath = pathSegments.join('/');
      
      const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`;
      
      const code = await fetchGitHubCode(url);
      
      if (!code || code.includes('Error fetching code') || code.includes('Timeout fetching code')) {
        console.warn(`Failed to fetch code from ${url}`);
        return { tag, replacement: '' };
      }
      
      const startMatch = normalizedTag.match(/start="(\d*)"/);
      const endMatch = normalizedTag.match(/end="(\d*)"/);
      
      const lines = code.split('\n');
      const startLine = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
      const endLine = endMatch ? parseInt(endMatch[1]) : lines.length;
      
      const selectedCode = lines.slice(startLine, endLine).join('\n');
      
      if (!selectedCode.trim()) {
        console.warn(`Empty code selection for ${tag}`);
        return { tag, replacement: '' };
      }
      
      const languageMatch = normalizedTag.match(/language="([^"]*?)"/);
      const language = languageMatch ? languageMatch[1] : 'javascript';
      
      return { tag, replacement: `\`\`\`${language}\n${selectedCode}\n\`\`\`` };
      
    } catch (error) {
      console.warn(`Error processing GitHub tag: ${tag}`, error.message);
      return { tag, replacement: '' };
    }
  });
  
  const results = await Promise.all(promises);
  
  // Apply all replacements
  results.forEach(({ tag, replacement }) => {
    formatted = formatted.replace(tag, replacement);
  });
  
  return formatted;
}

// Function to process Card components
function processCardComponents(content) {
  const cardRegex = /<Card\s+[^>]*>/g;
  let processed = content;
  
  const cardMatches = content.match(cardRegex);
  if (!cardMatches) return processed;
  
  cardMatches.forEach(cardTag => {
    try {
      const imgMatch = cardTag.match(/img=['"]([^'"]*)['"]/);
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
        const linksContent = linksMatch[1];
        const linkPairs = linksContent.match(/"([^"]+)":\s*"([^"]+)"/g);
        
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
      console.warn(`Error processing Card component: ${cardTag}`, error.message);
      processed = processed.replace(cardTag, '');
    }
  });
  
  return processed;
}

// Function to process Tabs components
function processTabComponents(content) {
  const tabsRegex = /<Tabs[\s\S]*?<\/Tabs>/g;
  let processed = content;
  
  const tabsMatches = content.match(tabsRegex);
  if (!tabsMatches) return processed;
  
  tabsMatches.forEach(tabsBlock => {
    try {
      let tabContent = '';
      
      // Extract TabItems
      const tabItemRegex = /<TabItem\s+[^>]*?>([\s\S]*?)<\/TabItem>/g;
      let tabItemMatch;
      
      while ((tabItemMatch = tabItemRegex.exec(tabsBlock)) !== null) {
        const tabItemTag = tabItemMatch[0];
        const tabItemContent = tabItemMatch[1];
        
        // Extract TabItem attributes
        const labelMatch = tabItemTag.match(/label=['"]([^'"]*)['"]/);
        const valueMatch = tabItemTag.match(/value=['"]([^'"]*)['"]/);
        
        if (labelMatch) {
          tabContent += `### ${labelMatch[1]}\n\n`;
        }
        
        tabContent += `${tabItemContent.trim()}\n\n`;
      }
      
      processed = processed.replace(tabsBlock, tabContent);
      
    } catch (error) {
      console.warn(`Error processing Tabs component: ${tabsBlock}`, error.message);
      processed = processed.replace(tabsBlock, '');
    }
  });
  
  return processed;
}

// Function to process Admonition components (:::tip, :::warning, etc.)
function processAdmonitionComponents(content) {
  // Process admonitions with ::: syntax (tip, warning, info, caution, danger)
  const admonitionRegex = /:::(tip|warning|info|caution|danger)(\s+[^\n]*?)?\n([\s\S]*?):::/g;
  let processed = content;
  
  processed = processed.replace(admonitionRegex, (match, type, title, content) => {
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
    
    const emoji = typeEmoji[type] || '';
    const label = typeLabel[type] || type.charAt(0).toUpperCase() + type.slice(1);
    const finalTitle = title ? title.trim() : label;
    
    return `> ${emoji} **${finalTitle}**\n> \n> ${content.trim().replace(/\n/g, '\n> ')}\n`;
  });
  
  return processed;
}

// Function to process Components
function processDetailsComponents(content) {
  const detailsRegex = /<details[\s\S]*?<\/details>/g;
  let processed = content;
  
  const detailsMatches = content.match(detailsRegex);
  if (!detailsMatches) return processed;
  
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
      console.warn(`Error processing Details component: ${detailsBlock}`, error.message);
      processed = processed.replace(detailsBlock, '');
    }
  });
  
  return processed;
}

// Function to process other common components
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
  
  return processed;
}

// Optimized main function to clean markdown content with better memory management
async function cleanContent(content) {
  const cacheKey = createCacheKey(content);
  
  // Check content cache
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }
  
  let cleaned = content;
  
  // Remove imports
  cleaned = cleaned.replace(/^import\s+.*?\n/gm, '');
  
  // Remove metadata from markdown (front matter)
  const sections = cleaned.split('---');
  if (sections.length >= 3) {
    sections.splice(1, 1);
    cleaned = sections.join('---').replace(/^---+\n\n/g, '');
  }
  
  // Process Docusaurus components
  cleaned = await replaceGithubWithCode(cleaned);
  cleaned = processCardComponents(cleaned);
  cleaned = processTabComponents(cleaned);
  cleaned = processAdmonitionComponents(cleaned);
  cleaned = processDetailsComponents(cleaned);
  cleaned = processOtherComponents(cleaned);
  
  // Temporarily replace code blocks with placeholders
  const codeBlocks = cleaned.match(/```[\s\S]*?```/g) || [];
  const placeholders = codeBlocks.map((_, i) => `__CODE_BLOCK_${i}__`);
  
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(block, placeholders[i]);
  });
  
  // Remove remaining HTML tags
  cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Remove problematic apostrophes
  cleaned = cleaned.replace(/'(.)/g, '$1');
  
  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(placeholders[i], block);
  });
  
  // Decode unicode
  try {
    cleaned = cleaned.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
  } catch (error) {
    // Ignore decoding errors
  }
  
  // Cache the result with size management
  contentCache.set(cacheKey, cleaned);
  clearOldCacheEntries(contentCache, MAX_CACHE_SIZE);
  
  return cleaned;
}

// Function to get the route structure from the sidebar
function extractRoutesFromSidebar(sidebarConfig) {
  const routes = new Map();
  
  function processItems(items, basePath = '') {
    items.forEach(item => {
      if (typeof item === 'string') {
        // Direct route
        routes.set(item, basePath + item);
      } else if (item.type === 'category' && item.items) {
        // Category with items
        const categoryPath = item.link?.id ? basePath + item.link.id + '/' : basePath;
        processItems(item.items, categoryPath);
      } else if (item.type === 'doc') {
        // Document
        routes.set(item.id, basePath + item.id);
      } else if (typeof item === 'object' && !item.type) {
        // Object with grouped routes
        Object.entries(item).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            processItems(value, basePath);
          }
        });
      }
    });
  }
  
  // Process all sections of the sidebar
  Object.values(sidebarConfig.default).forEach(section => {
    if (Array.isArray(section)) {
      processItems(section);
    }
  });
  
  return routes;
}

// Function to determine the correct output path for markdown files
function getMarkdownOutputPath(docId, filePath) {
  // For most documents, the docId already contains the correct path structure
  // e.g., "protocol/basics" should become "protocol/basics.md"
  
  // Remove any file extensions from the docId to get the clean path
  const cleanDocId = docId.replace(/\.(md|mdx)$/, '');
  
  // The output path should match the URL structure exactly
  // This ensures both /protocol/basics and /protocol/basics.md work
  return cleanDocId;
}

// Optimized main function with better memory management
async function processMarkdownFiles() {
  console.log('Starting markdown files processing...');
  
  // Load cache
  loadCache();
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  const entries = Object.entries(frontmatterIds);
  const batchSize = 3; // Reduce batch size significantly to prevent memory issues
  
  console.log(`Processing ${entries.length} files in batches of ${batchSize}...`);
  
  // Process files in batches with memory management
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async ([docId, filePath]) => {
      try {
        const fullPath = path.join(DOCS_DIR, filePath);
        
        if (!fs.existsSync(fullPath)) {
          console.warn(`File not found: ${fullPath}`);
          return { success: false, docId, error: 'File not found' };
        }
        
        console.log(`Processing: ${docId} -> ${filePath}`);
        
        // Read file content
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Clean content
        const cleanedContent = await cleanContent(content);
        
        // Get the correct output path
        const outputPath = getMarkdownOutputPath(docId, filePath);
        const outputFile = path.join(BUILD_DIR, outputPath + '.md');
        
        // Create output directory if it doesn't exist
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write processed file
        fs.writeFileSync(outputFile, cleanedContent, 'utf8');
        
        console.log(`  → Created: ${outputPath}.md`);
        
        return { success: true, docId, outputPath };
        
      } catch (error) {
        console.error(`Error processing ${docId}:`, error.message);
        return { success: false, docId, error: error.message };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    // Update counters
    batchResults.forEach(result => {
      if (result.success) {
        processedCount++;
      } else {
        errorCount++;
      }
    });
    
    // Memory management: force garbage collection every 10 batches
    if (i % (batchSize * 10) === 0) {
      forceGarbageCollection();
    }
    
    // Progress report
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(entries.length / batchSize);
    console.log(`Batch ${batchNumber}/${totalBatches} completed (${processedCount} files processed)`);
    
    // Add small delay to help with memory management
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Final cleanup
  contentCache.clear();
  forceGarbageCollection();
  
  // Save cache
  saveCache();
  
  console.log(`\nProcessing completed:`);
  console.log(`- Files processed: ${processedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log(`- Cache hits: ${cacheHits}`);
  console.log(`- Cache misses: ${cacheMisses}`);
  console.log(`- Cache efficiency: ${cacheHits > 0 ? ((cacheHits / (cacheHits + cacheMisses)) * 100).toFixed(1) : 0}%`);
  console.log(`- Output files in: ${BUILD_DIR}`);
  
  // Display failed GitHub URLs
  if (failedGithubUrls.size > 0) {
    console.log(`\n🚫 GitHub URLs that could not be fetched (${failedGithubUrls.size}):`);
    console.log('=' .repeat(60));
    const sortedFailedUrls = Array.from(failedGithubUrls).sort();
    sortedFailedUrls.forEach((url, index) => {
      console.log(`${index + 1}. ${url}`);
    });
    console.log('=' .repeat(60));
  } else {
    console.log(`\n✅ All GitHub URLs were successfully fetched!`);
  }
  
  console.log(`\nNow both URLs will work:`);
  console.log(`- HTML: https://docs.near.org/protocol/basics`);
  console.log(`- Markdown: https://docs.near.org/protocol/basics.md`);
}

// Execute if called directly
if (require.main === module) {
  processMarkdownFiles().catch(console.error);
}

module.exports = {
  processMarkdownFiles,
  cleanContent,
  processCardComponents,
  replaceGithubWithCode,
  processTabComponents,
  processAdmonitionComponents,
  processDetailsComponents,
  processOtherComponents,
  // Export cache functions for testing
  loadCache,
  saveCache,
  failedGithubUrls // Export for testing
};