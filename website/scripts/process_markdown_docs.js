const fs = require('fs');
const path = require('path');
const https = require('https');

// Load configurations
const frontmatterIds = require('../frontmatter_ids.json');
const sidebars = require('../sidebars.js');

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const BUILD_DIR = path.join(__dirname, '../build');

// Function to fetch GitHub code
async function fetchGitHubCode(url) {
  return new Promise((resolve, reject) => {
    // Convert GitHub URL to raw URL
    const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    
    https.get(rawUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      console.warn(`Error fetching GitHub code from ${url}:`, err.message);
      resolve(`// Error fetching code from ${url}`);
    });
  });
}

// Function to process GitHub tags
async function replaceGithubWithCode(content) {
  const githubTags = content.match(/<Github\s[^>]*?\/?>/g);
  if (!githubTags) return content;
  
  let formatted = content;
  
  for (const tag of githubTags) {
    try {
      const normalizedTag = tag.replace(/'/g, '"');
      
      const urlMatch = normalizedTag.match(/url="([^"]*?)"/);
      if (!urlMatch) continue;
      
      let url = urlMatch[1];
      url = url.split('#')[0];
      
      const urlParts = url.replace('https://github.com/', '').split('/');
      if (urlParts.length < 5) continue;
      
      const [org, repo, , branch, ...pathSegments] = urlParts;
      const filePath = pathSegments.join('/');
      
      const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`;
      
      const code = await fetchGitHubCode(rawUrl);
      
      if (!code || code.includes('Error fetching code')) {
        console.warn(`Failed to fetch code from ${rawUrl}`);
        formatted = formatted.replace(tag, '');
        continue;
      }
      
      const startMatch = normalizedTag.match(/start="(\d*)"/);
      const endMatch = normalizedTag.match(/end="(\d*)"/);
      
      const lines = code.split('\n');
      const startLine = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
      const endLine = endMatch ? parseInt(endMatch[1]) : lines.length;
      
      const selectedCode = lines.slice(startLine, endLine).join('\n');
      
      if (!selectedCode.trim()) {
        console.warn(`Empty code selection for ${tag}`);
        formatted = formatted.replace(tag, '');
        continue;
      }
      
      const languageMatch = normalizedTag.match(/language="([^"]*?)"/);
      const language = languageMatch ? languageMatch[1] : 'javascript';
      
      formatted = formatted.replace(tag, `\`\`\`${language}\n${selectedCode}\n\`\`\``);
      
    } catch (error) {
      console.warn(`Error processing GitHub tag: ${tag}`, error.message);
      formatted = formatted.replace(tag, '');
    }
  }
  
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

// Main function to clean markdown content
async function cleanContent(content) {
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

// Main function to process all markdown files
async function processMarkdownFiles() {
  console.log('Starting markdown files processing...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  // Process each file in frontmatter_ids
  for (const [docId, filePath] of Object.entries(frontmatterIds)) {
    try {
      const fullPath = path.join(DOCS_DIR, filePath);
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`File not found: ${fullPath}`);
        continue;
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
      processedCount++;
      
    } catch (error) {
      console.error(`Error processing ${docId}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\nProcessing completed:`);
  console.log(`- Files processed: ${processedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log(`- Output files in: ${BUILD_DIR}`);
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
  processOtherComponents
};