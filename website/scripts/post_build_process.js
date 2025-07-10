#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

async function replaceGithubWithCode(content) {
  // Find all Github tags
  const githubRegex = /<Github\s[^>]*?\/>/g;
  const githubs = content.match(githubRegex) || [];

  for (const gh of githubs) {
    try {
      // Replace single quotes with double quotes
      const normalizedGh = gh.replace(/'/g, '"');
      
      // Extract URL
      const urlMatch = normalizedGh.match(/url="(.*?)"/);
      if (!urlMatch) continue;
      
      let url = urlMatch[1];
      
      // Remove hash fragment
      url = url.split('#')[0];
      
      // Parse URL and extract components
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.slice(1).split('/');
      
      if (pathSegments.length < 4) continue;
      
      const [org, repo, , branch, ...pathSeg] = pathSegments;
      const filePath = pathSeg.join('/');
      
      // Construct raw GitHub URL
      const rawUrl = `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`;
      
      // Fetch the code
      const code = (await axios.get(rawUrl)).data;
      
      // Extract line numbers
      const startMatch = normalizedGh.match(/start="(\d*)"/);
      const endMatch = normalizedGh.match(/end="(\d*)"/);
      
      const codeLines = code.split('\n');
      const start = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
      const end = endMatch ? parseInt(endMatch[1]) + 1 : codeLines.length;
      
      const selectedCode = codeLines.slice(start, end).join('\n');
      
      // Replace the GitHub tag with code block
      content = content.replace(gh, `\`\`\`\n${selectedCode}\n\`\`\``);
      
    } catch (error) {
      console.error(`Error processing GitHub tag: ${gh}`, error.message);
      // Continue with other tags even if one fails
    }
  }
  
  return content;
}

// Directories
const DOCS_DIR = path.join(__dirname, '../../docs');
const STATIC_DIR = path.join(__dirname, '../static');

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

  return cleaned;
}

async function generatePath(filePath) {
  // read the file
  // if it has an id, then the new path is: old_path + id + .md
  // else, it is old_path + filename + .md

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

  const newFilePath = generatePath(filePath);

  fs.writeFileSync(filePath, content, 'utf8');

});