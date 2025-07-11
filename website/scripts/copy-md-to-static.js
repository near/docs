#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

async function fetchGitHubCode(tag) {
  // Replace single quotes with double quotes for consistent parsing
  const normalizedTag = tag.replace(/'/g, '"');
  
  // Extract URL from the tag
  const urlMatch = normalizedTag.match(/url="(.*?)"/);
  if (!urlMatch) return null;
  
  let url = urlMatch[1];
  // Remove hash fragment
  url = url.split('#')[0];
  
  // Parse URL and extract components
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.slice(1).split('/');
  
  if (pathSegments.length < 4) return null;
  
  const [org, repo, , branch, ...pathSeg] = pathSegments;
  const filePath = pathSeg.join('/');
  
  // Construct raw GitHub URL
  const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`;
  
  try {
    // Fetch the code
    const response = await axios.get(rawUrl);
    return {
      code: response.data,
      normalizedTag,
      url: rawUrl
    };
  } catch (error) {
    console.error(`❌ ${rawUrl}`);
    return null;
  }
}

// Extract code lines based on start/end parameters and format as code block
function formatCodeBlock(codeData, language = '') {
  const { code, normalizedTag } = codeData;
  
  // Extract line numbers
  const startMatch = normalizedTag.match(/start="(\d*)"/);
  const endMatch = normalizedTag.match(/end="(\d*)"/);
  
  const codeLines = String(code).split('\n');
  const start = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
  const end = endMatch ? parseInt(endMatch[1]) + 1 : codeLines.length;
  
  const selectedCode = codeLines.slice(start, end).join('\n');
  
  // Return formatted code block with optional language syntax highlighting
  return `\`\`\`${language}\n${selectedCode}\n\`\`\``;
}

async function replaceTagsWithCode(content, tagName, includeLanguage = false) {
  const tagRegex = new RegExp(`<${tagName}\\s[^>]*?(?:\\/>|>[^<]*<\\/${tagName}>)`, 'g');
  const tags = content.match(tagRegex) || [];
  
  for (const tag of tags) {
    const codeData = await fetchGitHubCode(tag);
    
    if (codeData) {
      let language = '';
      
      // Extract language if needed (for File tags)
      if (includeLanguage) {
        const languageMatch = codeData.normalizedTag.match(/language="(.*?)"/);
        language = languageMatch ? languageMatch[1] : '';
      }
      
      const codeBlock = formatCodeBlock(codeData, language);
      content = content.replace(tag, codeBlock);
    }
  }
  
  return content;
}

async function replaceGithubWithCode(content) {
  return replaceTagsWithCode(content, 'Github', false);
}

async function replaceFileWithCode(content) {
  return replaceTagsWithCode(content, 'File', true);
}

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const BUILD_DIR = path.join(__dirname, '../../build');

console.log('🚀 Starting markdown files post-processing...');
console.log('This script will copy processed .md files alongside .html files in build/');

// Clear md
async function cleanContent(content) {
  let cleaned = content;

  // Remove all imports (including JSX components and MDX imports)
  cleaned = cleaned.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+\{[^}]*\}\s+from\s+['"].*?['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+.*?$/gm, '');

  cleaned = await replaceGithubWithCode(cleaned);
  cleaned = await replaceFileWithCode(cleaned);

  return cleaned;
}

function generatePath(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  let id = null;
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
    if (idMatch) {
      id = idMatch[1].trim().replace(/['"]/g, '');
    }
  }

  const relativePath = path.relative(DOCS_DIR, filePath);
  const dirPath = path.dirname(relativePath);
  
  let newFilename;
  if (id) {
    newFilename = `${id}.md`;
  } else {
    newFilename = path.basename(filePath);
  }
  
  return path.join(BUILD_DIR, dirPath, newFilename);
}

// Get all markdown files from the docs directory
const allMarkdownFiles = glob.sync(path.join(DOCS_DIR, '**/*.md'));;

// Process each markdown file
allMarkdownFiles.forEach(async (filePath) => {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  // Clean the content
  content = await cleanContent(content);
  // Write the cleaned content back to the file

  const outputPath = generatePath(filePath);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content, 'utf8');
});

