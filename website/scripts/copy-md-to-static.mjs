#!/usr/bin/env node

import { globSync } from 'glob';
import path from 'path';
import fs from 'fs';
import {
  DOCS_DIR,
  BUILD_DIR,
  BASE_URL,
  extractFrontmatter,
} from './shared.mjs';


export const DOCUMENTATION_SECTIONS = {
  protocol: 'Core Protocol',
  ai: 'AI and Agents',
  'chain-abstraction': 'Chain Abstraction',
  'smart-contracts': 'Smart Contracts',
  'web3-apps': 'Web3 Applications',
  primitives: 'Tokens and Primitives',
  tools: 'Developer Tools',
  tutorials: 'Tutorials and Examples',
  api: 'API Reference',
  'data-infrastructure': 'Data Infrastructure',
  integrations: 'Integration Examples',
  aurora: 'Aurora',
  quest: 'Learning Quests',
};


const SKIPPED_FILES = new Set(['index.md', 'help.md']);

const githubCache = new Map();
let cacheHits = 0;

const JSX_COMPONENTS = [
  'TabItem', 'Tabs', 'CodeTabs',
  'Card', 'ConceptCard',
  'SplitLayoutContainer', 'SplitLayoutLeft', 'SplitLayoutRight',
  'Language', 'Block',
  'Quiz', 'Progress','MultipleChoice', 'Option',
  'LantstoolLabel', 'TryOutOnLantstool',
  'MovingForwardSupportSection', 'SigsSupport', 'TryDemo',
  'ExplainCode', 'CodeBlock',
  'LandingHero', 'Faucet', 'AIBadges',
  'CreateTokenForm', 'MintNFT',
  'FeatureList', 'Column', 'Feature',
];

const LLMS_TXT_HEADER = `# NEAR Protocol Documentation

> NEAR is a layer-1 blockchain built for scale and multichain compatibility,
> featuring AI-native infrastructure and chain abstraction capabilities.
> This documentation covers smart contracts, Web3 applications, AI agents,
> cross-chain development, and the complete NEAR ecosystem.

NEAR Protocol is a proof-of-stake blockchain that enables developers to build
decentralized applications with seamless user experiences. Key features include
human-readable account names, minimal transaction fees, and built-in developer
tools. The platform supports multiple programming languages and provides chain
abstraction for cross-blockchain interactions.

This documentation is organized into several main sections: Protocol fundamentals,
AI and agent development, chain abstraction features, smart contract development,
Web3 application building, and comprehensive API references. Each section includes
tutorials, examples, and detailed technical specifications.


`;


function parseGitHubTag(tag) {
  const normalized = tag.replace(/'/g, '"');

  const urlMatch = normalized.match(/url="(.*?)"/);
  if (!urlMatch) return null;

  const url = urlMatch[1].split('#')[0];
  const urlObj = new URL(url);
  const segments = urlObj.pathname.slice(1).split('/');
  if (segments.length < 4) return null;

  const [org, repo, , branch, ...rest] = segments;
  const filePath = rest.join('/');

  return {
    rawUrl: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${filePath}`,
    normalized,
  };
}

async function fetchGitHubCode(tag) {
  const parsed = parseGitHubTag(tag);
  if (!parsed) {
    console.warn('Invalid GitHub tag format');
    return null;
  }

  if (githubCache.has(parsed.rawUrl)) {
    cacheHits++;
    return githubCache.get(parsed.rawUrl);
  }

  try {
    const response = await fetch(parsed.rawUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const code = await response.text();
    const result = { code, normalized: parsed.normalized };
    
    githubCache.set(parsed.rawUrl, result);
    
    return result;
  } catch (error) {
    console.error(`❌ Failed to fetch ${parsed.rawUrl}: ${error.message}`);
    return null;
  }
}

function extractCodeSlice(code, tagAttrs) {
  const startMatch = tagAttrs.match(/start="(\d*)"/);
  const endMatch = tagAttrs.match(/end="(\d*)"/);

  const lines = String(code).split('\n');
  const start = startMatch ? Math.max(parseInt(startMatch[1]) - 1, 0) : 0;
  const end = endMatch ? parseInt(endMatch[1]) + 1 : lines.length;

  return lines.slice(start, end).join('\n');
}

async function replaceTagsWithCode(content, tagName, { includeLanguage = false } = {}) {
  const tagRegex = new RegExp(`<${tagName}\\s[^>]*?(?:\\/>|>[^<]*<\\/${tagName}>)`, 'g');
  const tags = content.match(tagRegex) || [];

  for (const tag of tags) {
    const codeData = await fetchGitHubCode(tag);
    if (!codeData) continue;

    let language = '';
    if (includeLanguage) {
      const langMatch = codeData.normalized.match(/language="(.*?)"/);
      language = langMatch ? langMatch[1] : '';
    }

    const slice = extractCodeSlice(codeData.code, codeData.normalized);
    content = content.replace(tag, `\`\`\`${language}\n${slice}\n\`\`\``);
  }

  return content;
}

function transformOutsideCodeBlocks(content, transformFn) {
  const segments = content.split(/(```[\s\S]*?```)/g);
  return segments.map((segment, index) => {
    if (index % 2 === 1) return segment; // code block, keep as-is
    return transformFn(segment);
  }).join('');
}

function removeImports(content) {
  return transformOutsideCodeBlocks(content, (text) =>
    text
      .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
      .replace(/^import\s+\{[^}]*\}\s+from\s+['"].*?['"];?\s*$/gm, '')
      .replace(/^import\s+.*?$/gm, '')
  );
}


function convertComponentTitles(content) {
  const openTag = /^\s*<(?:Card|ConceptCard)\b/;
  const lines = content.split('\n');
  const result = [];
  let collecting = false;
  let collected = '';

  for (const line of lines) {
    if (!collecting && openTag.test(line)) {
      collected = line;
      collecting = true;
      const trimmed = line.trim();
      if (trimmed.endsWith('>') || trimmed.endsWith('/>')) {
        const heading = extractHeadingFromAttrs(collected);
        result.push(heading !== null ? heading : line);
        collecting = false;
        collected = '';
      }
      continue;
    }

    if (collecting) {
      collected += '\n' + line;
      const trimmed = line.trim();
      if (trimmed === '>' || trimmed === '/>') {
        const heading = extractHeadingFromAttrs(collected);
        result.push(heading !== null ? heading : collected);
        collecting = false;
        collected = '';
      }
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

function extractHeadingFromAttrs(tagText) {
  const titleMatch = tagText.match(/title=["']([^"']+)["']/);
  if (!titleMatch) return null;

  const title = titleMatch[1];
  const hrefMatch = tagText.match(/href=["']([^"']+)["']/);
  return hrefMatch ? `### [${title}](${hrefMatch[1]})` : `### ${title}`;
}

function stripJsx(content) {
  const names = JSX_COMPONENTS.join('|');
  const singleLineSelfClosing = new RegExp(`^\\s*<(?:${names})\\b.*/>\\s*$`);
  const singleLineOpening = new RegExp(`^\\s*<(?:${names})\\b.*>\\s*$`);
  const closingTag = new RegExp(`^\\s*</(?:${names})\\s*>\\s*$`);
  const multiLineStart = new RegExp(`^\\s*<(?:${names})\\b`);

  const lines = content.split('\n');
  const result = [];
  let insideMultiLineTag = false;

  for (const line of lines) {
    if (insideMultiLineTag) {
      const trimmed = line.trim();
      if (trimmed === '/>' || trimmed === '>' || trimmed.endsWith('/>') || trimmed.endsWith('>')) {
        insideMultiLineTag = false;
      }
      continue;
    }

    if (singleLineSelfClosing.test(line)) continue;
    if (singleLineOpening.test(line)) continue;
    if (closingTag.test(line)) continue;

    if (multiLineStart.test(line) && !line.includes('>')) {
      insideMultiLineTag = true;
      continue;
    }

    result.push(line);
  }

  content = result.join('\n');

  return content
    .replace(/<hr\s+className[^>]*\/?>/g, '---')
    .replace(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<img\s+src="([^"]*)"(?:\s+alt="([^"]*)")?[^>]*\/?>/g, '![$2]($1)')
    .replace(/<li>(.*?)<\/li>/gm, '- $1')
    .replace(/<\/?(?:ul|ol)>/g, '')
    .replace(/<div\b[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    .replace(/<span\b[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<\/?p>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<iframe\b[\s\S]*?(?:<\/iframe>|\/>)/g, '')
    .replace(/^[ \t]*<details>[ \t]*$/gm, '')
    .replace(/^[ \t]*<\/details>[ \t]*$/gm, '')
    .replace(/^[ \t]*<summary>\s*(.*?)\s*<\/summary>[ \t]*$/gm, '**$1**')
    .replace(/^[ \t]*:::\w+.*$/gm, '')
    .replace(/^[ \t]*:::$/gm, '');
}

function removeJsxTags(content) {
  return transformOutsideCodeBlocks(content, stripJsx)
    .replace(/\n{3,}/g, '\n\n');
}

function dedentCodeBlocks(content) {
  const lines = content.split('\n');
  const result = [];
  let insideCodeBlock = false;
  let indentSize = 0;

  for (const line of lines) {
    if (!insideCodeBlock) {
      const openMatch = line.match(/^(\s+)(```\w)/);
      if (openMatch) {
        indentSize = openMatch[1].length;
        result.push(line.slice(indentSize));
        insideCodeBlock = true;
        continue;
      }
      result.push(line);
    } else {
      const stripped = line.length >= indentSize && line.slice(0, indentSize).trim() === ''
        ? line.slice(indentSize)
        : line;
      result.push(stripped);
      if (stripped.trimEnd() === '```') {
        insideCodeBlock = false;
      }
    }
  }

  return result.join('\n');
}

function ensureCodeBlockSpacing(content) {
  content = content.replace(/```([^\n`]+)```/g, '```\n\n$1\n\n```');

  const lines = content.split('\n');
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    const isOpenFence = /^```\w/.test(trimmed);
    const isCloseFence = line.trimEnd() === '```';

    if (isOpenFence && !isCloseFence) {
      if (result.length > 0 && result[result.length - 1].trim() !== '') {
        result.push('');
      }
      result.push(line);
    } else if (isCloseFence && !isOpenFence) {
      result.push(line);
      if (i + 1 < lines.length && lines[i + 1].trim() !== '') {
        result.push('');
      }
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

function minifyMarkdown(content) {
  return transformOutsideCodeBlocks(content, (text) =>
    text
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/[ \t]+$/gm, '')
  )
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

function cleanFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return content;

  // 'sidebar_label'
  const keysToRemove = new Set([
    'hide_title',  'slug', 'hide_table_of_contents'
  ]);

  const fmLines = fmMatch[1].split('\n');
  const cleaned = fmLines.filter(line => {
    const keyMatch = line.match(/^(\w[\w_-]*)\s*:/);
    return !keyMatch || !keysToRemove.has(keyMatch[1]);
  });

  return content.replace(fmMatch[0], `---\n${cleaned.join('\n')}\n---`);
}

function fixImagePaths(content) {
  return content.replace(/@site\/static\//g, `${BASE_URL}/`);
}

function resolveRelativeLinks(content, relativeFilePath) {
  const fileDir = path.dirname(relativeFilePath);

  return content.replace(/\]\(([^)]+)\)/g, (match, linkPath) => {
    if (/^(https?:|#|data:|\/\/)/.test(linkPath)) return match;

    if (linkPath.startsWith('/')) {
      return `](${BASE_URL}${linkPath})`;
    }

    if (linkPath.startsWith('./') || linkPath.startsWith('../')) {
      const [pathPart, ...anchorParts] = linkPath.split('#');
      const anchor = anchorParts.length ? '#' + anchorParts.join('#') : '';
      const resolved = path.normalize(path.join(fileDir, pathPart));
      return `](${BASE_URL}/${resolved}${anchor})`;
    }

    return match;
  });
}

async function cleanContent(content, relativeFilePath) {
  let cleaned = removeImports(content);
  cleaned = await replaceTagsWithCode(cleaned, 'Github', { includeLanguage: true });
  cleaned = await replaceTagsWithCode(cleaned, 'File', { includeLanguage: true });
  cleaned = convertComponentTitles(cleaned);
  cleaned = removeJsxTags(cleaned);
  cleaned = fixImagePaths(cleaned);
  cleaned = resolveRelativeLinks(cleaned, relativeFilePath);
  cleaned = dedentCodeBlocks(cleaned);
  cleaned = ensureCodeBlockSpacing(cleaned);
  cleaned = cleanFrontmatter(cleaned);
  cleaned = minifyMarkdown(cleaned);
  return cleaned;
}


function getFirstNonEmptyLine(text) {
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return '';
}


function getOutputPath(filePath, frontmatterId) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const dirPath = path.dirname(relativePath);

  // border case, for <path>/frontmatterId/frontmatterId gets transformed into <path>/frontmatterId.md instead of <path>/frontmatterId/frontmatterId.md
  if (path.basename(dirPath) === frontmatterId) {
    return path.join(BUILD_DIR, path.dirname(dirPath), `${frontmatterId}.md`);
  }

  return path.join(BUILD_DIR, dirPath, `${frontmatterId}.md`);
}


function writeFileSafe(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function buildPageMetadata(relativeFilename, frontmatter, body) {
  const pathSegments = relativeFilename.split('/');
  const section = pathSegments[0];
  const fileName = pathSegments.pop();
  const title = frontmatter.title || frontmatter.sidebar_label;

  if (!title) {
    console.warn(`⚠️  Missing title in ${relativeFilename}`);
  }

  const pageId = frontmatter.id;
  const url = `${pathSegments.join('/')}/${frontmatter.id ? frontmatter.id + '.md' : fileName}`;
  const firstLine = getFirstNonEmptyLine(body);

  // Validate description
  let description = frontmatter.description;
  if (!description) {
    console.log(`❌ No description tag found for ${relativeFilename}`);
    
    if (firstLine.startsWith('#') || firstLine.startsWith('import') ||
        firstLine.startsWith(':::') || firstLine.startsWith('![')) {
      console.warn(`⚠️  No valid description found in ${relativeFilename}`);
      description = title; // Fallback to title
    } else {
      description = firstLine;
    }
  }

  return {
    section,
    title,
    url,
    description,
    id: pageId,
  };
}


async function checkLink(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    const status = 'NO RESPONSE';
    console.log(`❌ ${url} - ${status}`);
    return { url, status, ok: false };
  }
}

async function reportBrokenLinks(links) {
  console.log('Checking links...');
  const results = await Promise.all(links.map(checkLink));
  const broken = results.filter(r => !r.ok);

  if (broken.length > 0) {
    console.log('\n🔴 Broken URLs:');
    broken.forEach(b => console.log(`${b.url} - Status: ${b.status}`));
  } else {
    console.log('🟢 All links are valid');
  }
}


function buildLlmsTxt(pagesBySection) {
  let content = LLMS_TXT_HEADER;
  const links = [];

  for (const [key, section] of Object.entries(DOCUMENTATION_SECTIONS)) {
    const pages = (pagesBySection[key] || []).sort((a, b) => a.url.localeCompare(b.url));
    if (pages.length === 0) continue;

    content += `## ${section}\n`;
    for (const page of pages) {
      const desc = (page.description || page.title).replace(/\s*\n\s*/g, ' ').trim();
      const fullUrl = `${BASE_URL}/${page.url}`;
      links.push(fullUrl);
      content += `- [${page.title}](${fullUrl}): ${desc}\n`;
    }
    content += '\n';
  }

  return { content, links };
}

async function processMarkdownFiles() {
  console.log('🚀 Starting markdown files post-processing...');
  console.log('This script will copy processed .md files alongside .html files in build/');

  const allMarkdownFiles = globSync(path.join(DOCS_DIR, '**/*.md'));
  console.log(`📁 Found ${allMarkdownFiles.length} markdown files`);
  
  const pagesBySection = {};
  let processedCount = 0;
  let errorCount = 0;

  await Promise.all(
    allMarkdownFiles.map(async (filePath) => {
      try {
        const relativeFilename = path.relative(DOCS_DIR, filePath);
        const rawContent = fs.readFileSync(filePath, 'utf8');
        const cleanedContent = await cleanContent(rawContent, relativeFilename);
        const { frontmatter, body } = extractFrontmatter(cleanedContent);

        const outputPath = getOutputPath(filePath, frontmatter.id);
        writeFileSafe(outputPath, cleanedContent);
        
        processedCount++;
        if (processedCount % 10 === 0) {
          console.log(`✅ Processed ${processedCount}/${allMarkdownFiles.length} files`);
        }

        if (SKIPPED_FILES.has(relativeFilename)) return;

        const page = buildPageMetadata(relativeFilename, frontmatter, body);

        if (!pagesBySection[page.section]) {
          pagesBySection[page.section] = [];
        }
        pagesBySection[page.section].push(page);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error processing ${path.relative(DOCS_DIR, filePath)}: ${error.message}`);
      }
    })
  );

  const { content: llmsTxt, links } = buildLlmsTxt(pagesBySection);
  writeFileSafe(path.join(BUILD_DIR, 'llms.txt'), llmsTxt);
  console.log(`📝 Generated llms.txt with ${links.length} links\n`);

  await reportBrokenLinks(links);
}

processMarkdownFiles();
