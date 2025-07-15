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
const BUILD_DIR = path.join(__dirname, '../build');

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

function extractFrontmatter(content) {
  const frontmatter = {};
  let body = content;

  if (content.startsWith('---\n')) {
    const endIndex = content.indexOf('\n---\n', 4);
    if (endIndex !== -1) {
      const frontmatterText = content.substring(4, endIndex);
      body = content.substring(endIndex + 5);
      const lines = frontmatterText.split('\n');
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
          frontmatter[key] = value;
        }
      }
    }
  }

  return { frontmatter, body };
}

function getDescription(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed &&
      trimmed.length > 0) {
      return trimmed
    }
  }
  return ''
}

async function checkLink(url) {
  try {
    const response = await axios.head(url, { timeout: 5000 });
    return { url, status: response.status, ok: true };
  } catch (error) {
    const status = error.response?.status || 'NO RESPONSE';
    console.log(`❌ ${url} - ${status}`);
    return { url, status, ok: false };
  }
}

const allMarkdownFiles = glob.sync(path.join(DOCS_DIR, '**/*.md'));

async function processMarkdownFiles() {
  const documentationPages = {};
  
  await Promise.all(
    allMarkdownFiles.map(async (markdownFilePath) => {
      let fileContent = fs.readFileSync(markdownFilePath, 'utf8');
      
      fileContent = await cleanContent(fileContent);
      
      const outputFilePath = generatePath(markdownFilePath);
      const outputDirectory = path.dirname(outputFilePath);

      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
      fs.writeFileSync(outputFilePath, fileContent, 'utf8');

      const relativeFilename = path.relative(DOCS_DIR, markdownFilePath);
      
      if (relativeFilename === "index.md" || relativeFilename === "help.md") {
        return;
      }

      const pathSegments = relativeFilename.split('/');
      const sectionName = pathSegments[0];
      const fileName = pathSegments.pop();
      const alternativeId = fileName.replace('.md', '');
      
      if (!documentationPages[sectionName]) {
        documentationPages[sectionName] = [];
      }

      const { frontmatter, body } = extractFrontmatter(fileContent);
      const pageDescription = getDescription(body);
      
      if (pageDescription.startsWith('#') || 
          pageDescription.startsWith('import') || 
          pageDescription.startsWith(':::') ||
          pageDescription.startsWith('![')) {
        console.warn(`Warning: No valid description found in ${relativeFilename}`);
      }
      
      const pageTitle = frontmatter.title || 
                       frontmatter.sidebar_label || 
                       alternativeId.replace(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
      
      const pageUrl = `${pathSegments.join("/")}/${frontmatter.id ? frontmatter.id + ".md" : fileName}`;
      const pageId = frontmatter.id || alternativeId;
      
      documentationPages[sectionName].push({
        title: pageTitle,
        url: pageUrl,
        description: pageDescription,
        id: pageId,
      });
    })
  );

  const documentationSections = {
    "protocol": { name: "Core Protocol" },
    "ai": { name: "AI and Agents" },
    "chain-abstraction": { name: "Chain Abstraction" },
    "smart-contracts": { name: "Smart Contracts" },
    "web3-apps": { name: "Web3 Applications" },
    "primitives": { name: "Tokens and Primitives" },
    "tools": { name: "Developer Tools" },
    "tutorials": { name: "Tutorials and Examples" },
    "api": { name: "API Reference" },
    "data-infrastructure": { name: "Data Infrastructure" },
    "integrations": { name: "Integration Examples" },
    "resources": { name: "Resources" }
  };

  let documentationContent = `# NEAR Protocol Documentation

> NEAR is a layer-1 blockchain built for scale and multichain compatibility, featuring AI-native infrastructure and chain abstraction capabilities. This documentation covers smart contracts, Web3 applications, AI agents, cross-chain development, and the complete NEAR ecosystem.
NEAR Protocol is a proof-of-stake blockchain that enables developers to build decentralized applications with seamless user experiences. Key features include human-readable account names, minimal transaction fees, and built-in developer tools. The platform supports multiple programming languages and provides chain abstraction for cross-blockchain interactions.
This documentation is organized into several main sections: Protocol fundamentals, AI and agent development, chain abstraction features, smart contract development, Web3 application building, and comprehensive API references. Each section includes tutorials, examples, and detailed technical specifications.

`;
  const links =[];
  for (const sectionKey in documentationSections) {
    const section = documentationSections[sectionKey];
    const sectionPages = documentationPages[sectionKey] || [];
    
    let sectionContent = `## ${section.name}\n\n`;
    
    for (const page of sectionPages) {
      const cleanDescription = (page.description || page.title)
        .replace(/\s*\n\s*/g, ' ')
        .trim();
      links.push(`https://docs.near.org/${page.url}`);
      
      sectionContent += `- [${page.title}](https://docs.near.org/${page.url}): ${cleanDescription}\n`;
    }
    
    documentationContent += sectionContent + '\n';
  }

  const outputFilePath = path.join(BUILD_DIR, 'llms.txt');
  const outputDirectory = BUILD_DIR;
  
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, documentationContent, 'utf-8');

  console.log("Checking links...");
  const results = await Promise.all(links.map(checkLink));
  const broken = results.filter(r => !r.ok);
  if (broken.length > 0) {
    console.log('\n🔴 Broken URLs:');
    broken.forEach(b => console.log(`${b.url} - Status: ${b.status}`));
  } else {
    console.log('🟢 All links are valid');
  }
}

processMarkdownFiles();



