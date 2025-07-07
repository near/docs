const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Load configurations
const frontmatterIds = require('../frontmatter_ids.json');

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const BUILD_DIR = path.join(__dirname, '../build');
const CACHE_DIR = path.join(__dirname, '../.cache');

// Cache configuration
const MAX_CACHE_SIZE = 100;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB limit per file
const BATCH_SIZE = 3;
const REQUEST_TIMEOUT = 5000;

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
      githubCache.set(cacheKey, timeoutResult);
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
      
      return { tag, replacement: `\`\`\`${language}\n${selectedCode}\n\`\`\`` };
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
        const labelMatch = tabItemTag.match(/label=['"]([^'"]*)['"]/);
        
        if (labelMatch) {
          tabContent += `### ${labelMatch[1]}\n\n`;
        }
        
        tabContent += `${tabItemContent.trim()}\n\n`;
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
  
  return processed;
}

// Main content cleaning function
async function cleanContent(content) {
  const cacheKey = createCacheKey(content);
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey);
  }
  
  let cleaned = content;
  
  // Remove imports and front matter
  cleaned = cleaned.replace(/^import\s+.*?\n/gm, '');
  
  const sections = cleaned.split('---');
  if (sections.length >= 3) {
    sections.splice(1, 1);
    cleaned = sections.join('---').replace(/^---+\n\n/g, '');
  }
  
  // Process all components
  cleaned = await replaceGithubWithCode(cleaned);
  cleaned = processCardComponents(cleaned);
  cleaned = processTabComponents(cleaned);
  cleaned = processAdmonitionComponents(cleaned);
  cleaned = processDetailsComponents(cleaned);
  cleaned = processOtherComponents(cleaned);
  
  // Handle code blocks protection
  const codeBlocks = cleaned.match(/```[\s\S]*?```/g) || [];
  const placeholders = codeBlocks.map((_, i) => `__CODE_BLOCK_${i}__`);
  
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(block, placeholders[i]);
  });
  
  // Remove HTML tags and clean up
  cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/g, '');
  cleaned = cleaned.replace(/<[^>]*>/g, '');
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
  
  // Cache the result
  contentCache.set(cacheKey, cleaned);
  clearOldCacheEntries(contentCache, MAX_CACHE_SIZE);
  
  return cleaned;
}

function getMarkdownOutputPath(docId) {
  return docId.replace(/\.(md|mdx)$/, '');
}

// Main processing function
async function processMarkdownFiles() {
  console.log('Starting markdown files processing...');
  
  loadCache();
  
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  const entries = Object.entries(frontmatterIds);
  console.log(`Processing ${entries.length} files in batches of ${BATCH_SIZE}...`);
  
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
        const cleanedContent = await cleanContent(content);
        const outputPath = getMarkdownOutputPath(docId);
        const outputFile = path.join(BUILD_DIR, outputPath + '.md');
        
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputFile, cleanedContent, 'utf8');
        
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
    const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
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
  processMarkdownFiles().catch(console.error);
}

module.exports = {
  processMarkdownFiles,
  cleanContent,
  loadCache,
  saveCache,
  failedGithubUrls
};