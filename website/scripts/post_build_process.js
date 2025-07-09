#!/usr/bin/env node

/**
 * Script to run after the Docusaurus build process
 * Processes all markdown files and copies them alongside HTML files in the build directory
 */

const { processMarkdownFiles } = require('./process_markdown_docs');
const { generateFrontmatterDictionary } = require('./utils/extract_frontmatter_ids.js');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

// Load configurations
const frontmatterIds = require('../frontmatter_ids.json');
const sidebar = require('../sidebars.js').default;

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const STATIC_DIR = path.join(__dirname, '../static');
const CACHE_DIR = path.join(__dirname, '../.cache');

// Global set to track unprocessed tags
const unprocessedTags = new Set();

console.log('🚀 Starting markdown files post-processing...');
console.log('This script will copy processed .md files alongside .html files in build/');
generateFrontmatterDictionary()



// Function to detect and collect unprocessed HTML tags/components
function detectUnprocessedTags(content) {
  // First, remove code blocks to avoid detecting tags inside them
  let contentWithoutCodeBlocks = content;

  // Remove code blocks (both ``` and indented code blocks)
  contentWithoutCodeBlocks = contentWithoutCodeBlocks.replace(/```[\s\S]*?```/g, '');
  contentWithoutCodeBlocks = contentWithoutCodeBlocks.replace(/^    .*$/gm, ''); // Remove indented code blocks
  contentWithoutCodeBlocks = contentWithoutCodeBlocks.replace(/`[^`]*`/g, ''); // Remove inline code

  // Regex to match HTML/JSX tags
  const tagRegex = /<([A-Za-z][A-Za-z0-9]*(?:[.-][A-Za-z0-9]*)*)(?:\s[^>]*)?\/?>/g;
  let match;

  while ((match = tagRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const tagName = match[1];

    // Skip common HTML tags that are processed
    const processedTags = new Set([
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'div', 'span', 'ul', 'ol', 'li',
      'a', 'img', 'pre', 'strong', 'em', 'code',
      'br', 'hr', 'blockquote', 'table', 'thead',
      'tbody', 'tr', 'th', 'td', 'section',
      'article', 'main', 'header', 'footer',
      'nav', 'aside', 'details', 'summary',
      'iframe', 'Tabs', 'TabItem', 'Card',
      'Container', 'SigsSupport'
    ]);

    if (!processedTags.has(tagName)) {
      unprocessedTags.add(tagName);
    }
  }
}

// obtener md y mdx de docs
function discoverMarkdownFiles() {
  const discovered = {};
  const patterns = ['**/*.md', '**/*.mdx'];
  patterns.forEach(pattern => {
    const fullPattern = path.join(DOCS_DIR, pattern);
    const files = glob.sync(fullPattern);

    files.forEach(file => {
      const relativePath = path.relative(DOCS_DIR, file);
      const docId = relativePath.replace(/\.(md|mdx)$/, '').replace(/\\/g, '/');
      discovered[docId] = relativePath;
    });
  });

  return discovered;
}

//

// paso 2

// Filtrar por sidebar
function filterDiscoveredFiles(discoveredFiles) {
  const sidebarDocIds = extractDocIdsFromSidebar(sidebar);
  const frontmatterDocIds = new Set(Object.keys(frontmatterIds));
  const frontmatterDocValues = new Set(Object.values(frontmatterIds));

  const filtered = {};

  Object.entries(discoveredFiles).forEach(([docId, filePath]) => {
    if (frontmatterDocIds.has(docId) || frontmatterDocValues.has(filePath) || sidebarDocIds.has(docId)) {
      filtered[docId] = filePath;
    } else {
      console.log(`❌ Excluded: ${docId} (${filePath}) - Not in frontmatter_ids or sidebar`);
    }
  });

  return filtered;
}

//Cleaners
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

function processOtherReactComponents(content) {
  let processed = content;
  processed = processed.replace(/<Container[^>]*>([\s\S]*?)<\/Container>/g, (match, content) => {
    return content.trim();
  });

  processed = processed.replace(/<SigsSupport\s*[^>]*?>/g, `
    > **Chain Signatures Support**
    >
    > This feature supports Chain Signatures for multi-chain functionality.
    `);

  processed = processed.replace(/<MovingForwardSupportSection\s*[^>]*?>/g, `
    ## Looking for Support?
    
    If you have any questions, connect with us on [Dev Telegram](https://t.me/neardev) or [Discord](https://discord.gg/nearprotocol). We also host **Office Hours** on Discord every Thursday at **11 AM UTC** and **6 PM UTC**. Join our voice channel to ask your questions and get live support.
    
    Happy coding! 🚀
    `);

  processed = processed.replace(/<MovingForwardSupportSection\s*><\/MovingForwardSupportSection>/g, `
    ## Looking for Support?
    
    If you have any questions, connect with us on [Dev Telegram](https://t.me/neardev) or [Discord](https://discord.gg/nearprotocol). We also host **Office Hours** on Discord every Thursday at **11 AM UTC** and **6 PM UTC**. Join our voice channel to ask your questions and get live support.
    
    Happy coding! 🚀
    `);

  processed = processed.replace(/<Block\s*[^>]*?>([\s\S]*?)<\/Block>/g, (match, content) => {
    return content.trim();
  });

  processed = processed.replace(/<ExplainCode\s*[^>]*?>([\s\S]*?)<\/ExplainCode>/g, (match, content) => {
    return content.trim();
  });

  processed = processed.replace(/<File\s*[^>]*?>([\s\S]*?)<\/File>/g, (match, content) => {
    return content.trim();
  });

  //TODO:Replace Links
  // Handle self-closing File tags
  processed = processed.replace(/<File\s+([^>]*?)\s*\/>/g, (match, attributes) => {
    // Extract attributes from the File tag
    const languageMatch = attributes.match(/language=['"]([^'"]*)['"]/);
    const fnameMatch = attributes.match(/fname=['"]([^'"]*)['"]/);
    const urlMatch = attributes.match(/url=['"]([^'"]*)['"]/);
    const startMatch = attributes.match(/start=['"]([^'"]*)['"]/);
    const endMatch = attributes.match(/end=['"]([^'"]*)['"]/);

    let result = '';
    
    // Create a meaningful replacement based on available attributes
    if (fnameMatch || urlMatch) {
      if (fnameMatch) {
        result += `**File: ${fnameMatch[1]}**\n\n`;
      }
      
      if (urlMatch) {
        const url = urlMatch[1];
        const linkText = fnameMatch ? fnameMatch[1] : 'View source';
        result += `[${linkText}](${url})`;
        
        if (startMatch && endMatch) {
          result += ` (lines ${startMatch[1]}-${endMatch[1]})`;
        } else if (startMatch) {
          result += ` (from line ${startMatch[1]})`;
        }
        result += '\n\n';
      }
      
      if (languageMatch) {
        result += `Language: ${languageMatch[1]}\n\n`;
      }
    }
    
    return result;
  });

  processed = processed.replace(/<FeatureList\s*[^>]*?>([\s\S]*?)<\/FeatureList>/g, (match, content) => {
      return `\n${content.trim()}\n`;
    });
  
    processed = processed.replace(/<Column\s*[^>]*?>([\s\S]*?)<\/Column>/g, (match, content) => {
      const titleMatch = match.match(/title=['"]([^'"]*)['"]/);
      let result = '';
      if (titleMatch && titleMatch[1].trim()) {
        result = `\n## ${titleMatch[1]}\n\n`;
      }
      result += content.trim();
      return result;
    });

  return processed;
}
function processOtherComponents(content) {
  let processed = content;
  let previousContent = '';
  let iterations = 0;
  const maxIterations = 10; // Prevent infinite loops

  // Keep processing until no more HTML tags are found or max iterations reached
  while (processed !== previousContent && iterations < maxIterations) {
    previousContent = processed;
    iterations++;

    // Process heading tags FIRST (h1-h6) - handle both simple and attribute cases
    processed = processed.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '# $1');
    processed = processed.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '## $1');
    processed = processed.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '### $1');
    processed = processed.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, '#### $1');
    processed = processed.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/g, '##### $1');
    processed = processed.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/g, '###### $1');

    // Process paragraph tags
    processed = processed.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n\n');

    // Process div tags - remove tags completely, keep content without extra line breaks
    processed = processed.replace(/<div\s*[^>]*?>([\s\S]*?)<\/div>/g, '$1');

    // Process span tags (remove tags, keep content)
    processed = processed.replace(/<span\s*[^>]*?>([\s\S]*?)<\/span>/g, '$1');

    // Process list tags
    processed = processed.replace(/<ul\s*[^>]*?>([\s\S]*?)<\/ul>/g, (match, content) => {
      return content.replace(/<li\s*[^>]*?>([\s\S]*?)<\/li>/g, '- $1') + '\n';
    });

    processed = processed.replace(/<ol\s*[^>]*?>([\s\S]*?)<\/ol>/g, (match, content) => {
      let counter = 1;
      return content.replace(/<li\s*[^>]*?>([\s\S]*?)<\/li>/g, () => `${counter++}. $1`) + '\n';
    });

    // Process remaining li tags (in case they're not wrapped in ul/ol)
    processed = processed.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '- $1');

    // Process anchor tags
    processed = processed.replace(/<a\s+href=['"]([^'"]*?)['"][^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)');
    processed = processed.replace(/<a[^>]*>([\s\S]*?)<\/a>/g, '$1'); // Links without href

    // Process img tags
    processed = processed.replace(/<img\s+src=['"]([^'"]*?)['"][^>]*alt=['"]([^'"]*?)['"][^>]*\/?>/g, '![$2]($1)');
    processed = processed.replace(/<img\s+alt=['"]([^'"]*?)['"][^>]*src=['"]([^'"]*?)['"][^>]*\/?>/g, '![$1]($2)');
    processed = processed.replace(/<img\s+src=['"]([^'"]*?)['"][^>]*\/?>/g, '![]($1)');

    // Process pre tags (preserve as code blocks)
    processed = processed.replace(/<pre\s*[^>]*?>([\s\S]*?)<\/pre>/g, '```\n$1\n```');

    // Process strong tags
    processed = processed.replace(/<strong\s*[^>]*?>([\s\S]*?)<\/strong>/g, '**$1**');

    // Process em tags
    processed = processed.replace(/<em\s*[^>]*?>([\s\S]*?)<\/em>/g, '*$1*');

    // Process code tags
    processed = processed.replace(/<code\s*[^>]*?>([\s\S]*?)<\/code>/g, '`$1`');

    // Process br tags
    processed = processed.replace(/<br\s*[^>]*?>/g, '\n');

    // Process hr tags
    processed = processed.replace(/<hr\s*[^>]*?>/g, '\n---\n');

    // Process blockquote tags
    processed = processed.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (match, content) => {
      return content.trim().split('\n').map(line => `> ${line}`).join('\n');
    });

    // Process table tags
    processed = processed.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (match, content) => {
      // Basic table conversion - extract rows and cells
      let tableContent = content;
      tableContent = tableContent.replace(/<thead[^>]*>([\s\S]*?)<\/thead>/g, '$1');
      tableContent = tableContent.replace(/<tbody[^>]*>([\s\S]*?)<\/tbody>/g, '$1');
      tableContent = tableContent.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/g, (rowMatch, rowContent) => {
        const cells = rowContent.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g);
        if (cells) {
          return '| ' + cells.map(cell => cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g, '$1').trim()).join(' | ') + ' |\n';
        }
        return '';
      });
      return tableContent;
    });

    // Clean up any remaining common HTML tags by removing them but keeping content
    processed = processed.replace(/<(section|article|main|header|footer|nav|aside)[^>]*>([\s\S]*?)<\/\1>/g, '$2');

    // // Process any other remaining HTML tags (catch-all)
    // processed = processed.replace(/<([a-zA-Z][a-zA-Z0-9]*)[^>]*>([\s\S]*?)<\/\1>/g, '$2');
    // processed = processed.replace(/<[a-zA-Z][a-zA-Z0-9]*[^>]*\/>/g, ''); // Self-closing tags
  }

  // Clean up excessive whitespace and blank lines
  processed = processed.replace(/\n\s*\n\s*\n+/g, '\n\n'); // Replace multiple consecutive newlines with double newline
  processed = processed.replace(/^\s+/gm, ''); // Remove leading whitespace from lines
  processed = processed.replace(/\s+$/gm, ''); // Remove trailing whitespace from lines
  processed = processed.trim(); // Remove leading/trailing whitespace from entire content

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
// Clear md
async function cleanContent(content) {
  let cleaned = content;

  // Detect unprocessed tags before cleaning
  detectUnprocessedTags(content);

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

  // // Create placeholders for code blocks
  const placeholders = codeBlocks.map((_, i) => `__CODE_BLOCK_${i}__`);

  // // Replace code blocks with placeholders
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(block, placeholders[i]);
  });

  // // Process all components (now safe from code block interference)
  // cleaned = await replaceGithubWithCode(cleaned);
  cleaned = processCardComponents(cleaned);
  cleaned = processTabComponents(cleaned);
  cleaned = processOtherReactComponents(cleaned);
  cleaned = processAdmonitionComponents(cleaned);
  cleaned = processDetailsComponents(cleaned);
  cleaned = processOtherComponents(cleaned);
  // cleaned = processMdxComponents(cleaned, currentFilePath);

  // Detect unprocessed tags after cleaning to catch any remaining ones
  detectUnprocessedTags(cleaned);

  // // Convert HTML tables to markdown tables
  // cleaned = convertHtmlTablesToMarkdown(cleaned);

  // // Remove remaining HTML/JSX tags and clean up
  // cleaned = cleaned.replace(/<iframe[\s\S]*?<\/iframe>/g, '');
  // cleaned = cleaned.replace(/<[^>]*>/g, '');
  // cleaned = cleaned.replace(/'(.)/g, '$1');

  // // Clean up JSX expressions and fragments
  // cleaned = cleaned.replace(/\{[^}]*\}/g, '');
  // cleaned = cleaned.replace(/<>\s*<\/>/g, '');
  // cleaned = cleaned.replace(/<React\.Fragment[\s\S]*?<\/React\.Fragment>/g, '');

  // // Clean up multiple empty lines
  // cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');

  // // Restore code blocks
  codeBlocks.forEach((block, i) => {
    cleaned = cleaned.replace(placeholders[i], block);
  });

  // // Handle any remaining incomplete code blocks or malformed markdown
  // cleaned = cleaned.replace(/```\s*$/gm, '```');
  // cleaned = cleaned.replace(/```([^`\n]*)\n\s*```/g, '```$1\n// Code block content\n```');

  // // Decode unicode
  // try {
  //   cleaned = cleaned.replace(/\\u[\dA-F]{4}/gi, (match) => {
  //     return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  //   });
  // } catch (error) {
  //   // Ignore decoding errors
  // }

  // // Cache the result
  // contentCache.set(cacheKey, cleaned);
  // clearOldCacheEntries(contentCache, MAX_CACHE_SIZE);

  return cleaned.trim();
}

//Utils
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


async function main() {
  try {
    const discoveredFiles = discoverMarkdownFiles();
    console.log(`📁 Discovered ${Object.keys(discoveredFiles).length} markdown files`);
    const filteredFiles = filterDiscoveredFiles(discoveredFiles);
    console.log(`📁 Filtered to ${Object.keys(filteredFiles).length} files based on criteria`);

    const results = await Promise.all(
      Object.entries(filteredFiles).map(async ([docId, filePath]) => {
        try {
          const fullPath = path.join(DOCS_DIR, filePath);

          if (!fs.existsSync(fullPath)) {
            console.warn(`⚠️  File not found: ${fullPath}`);
            return { success: false, docId, error: 'File not found' };
          }

          const content = fs.readFileSync(fullPath, 'utf8');

          const cleanedContent = await cleanContent(content, fullPath);
          const outputFile = path.join(STATIC_DIR, docId + '.md');

          const outputDir = path.dirname(outputFile);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          fs.writeFileSync(outputFile, cleanedContent, 'utf8');

          return { success: true, docId, outputPath: outputFile };
        } catch (error) {
          console.error(`❌ Error processing ${docId}:`, error.message);
          return { success: false, docId, error: error.message };
        }
      })
    );

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`✅ Successfully processed ${successful} files`);
    if (failed > 0) {
      console.log(`❌ Failed to process ${failed} files`);
    }

    // Show unprocessed tags report
    console.log('\n📋 UNPROCESSED TAGS REPORT');
    console.log('='.repeat(50));
    if (unprocessedTags.size === 0) {
      console.log('✅ No unprocessed HTML/JSX tags found!');
    } else {
      console.log(`⚠️  Found ${unprocessedTags.size} unprocessed HTML/JSX tags:`);
      const sortedTags = Array.from(unprocessedTags).sort();
      sortedTags.forEach(tag => {
        console.log(`   - <${tag}>`);
      });
      console.log('\n💡 These components may need custom processing logic.');
    }
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error discovering markdown files:', error);
    process.exit(1);
  }
}

main();