import 'dotenv/config';
import { MeiliSearch } from 'meilisearch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MEILI_HOST = process.env.MEILI_HOST || 'http://localhost:7700';
const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY || 'masterKey123';
const MEILI_INDEX_NAME = process.env.MEILI_INDEX_NAME || 'near-docs';
const DOCS_PATH = path.resolve(__dirname, '../../docs');
const BATCH_SIZE = 100;

const CATEGORY_MAP = {
  'smart-contracts': 'Smart Contracts',
  'web3-apps': 'Web3 Apps',
  'protocol': 'Protocol',
  'tools': 'Tools',
  'api': 'API',
  'tutorials': 'Tutorials',
  'primitives': 'Primitives',
  'chain-abstraction': 'Chain Abstraction',
  'integrations': 'Integrations',
  'data-infrastructure': 'Data Infrastructure',
  'ai': 'AI',
  'aurora': 'Aurora',
  'quest': 'Quest',
};

function generateId(content) {
  return createHash('md5').update(content).digest('hex').substring(0, 12);
}

function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

function extractHeadings(content) {
  const headings = [];
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].replace(/[*_`]/g, '').trim());
  }

  return headings;
}

function cleanContent(content) {
  return content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove import statements
    .replace(/^import\s+.*$/gm, '')
    // Remove markdown emphasis
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getUrlPath(filePath) {
  const relativePath = path.relative(DOCS_PATH, filePath);
  let urlPath = relativePath
    .replace(/\.mdx?$/, '')
    .replace(/\\/g, '/');

  // Handle index files
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.slice(0, -6);
  }

  // Handle files with numeric prefixes (e.g., 0-intro.md -> intro)
  urlPath = urlPath.replace(/\/\d+-/g, '/').replace(/^\d+-/, '');

  return '/' + urlPath;
}

function getCategoryFromPath(filePath) {
  const relativePath = path.relative(DOCS_PATH, filePath);
  const firstFolder = relativePath.split(path.sep)[0];
  return CATEGORY_MAP[firstFolder] || 'General';
}

function getHierarchy(filePath) {
  const relativePath = path.relative(DOCS_PATH, filePath);
  const parts = relativePath.split(path.sep);

  // Remove file name
  parts.pop();

  const hierarchy = {
    lvl0: getCategoryFromPath(filePath),
    lvl1: '',
    lvl2: '',
  };

  if (parts.length > 0) {
    hierarchy.lvl1 = parts[0]
      .replace(/-/g, ' ')
      .replace(/^\d+\s*/, '')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  if (parts.length > 1) {
    hierarchy.lvl2 = parts.slice(1).join(' > ')
      .replace(/-/g, ' ')
      .replace(/^\d+\s*/g, '')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  return hierarchy;
}

function getAllMarkdownFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip hidden directories
        if (!entry.name.startsWith('.')) {
          walk(fullPath);
        }
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

async function indexDocuments() {
  console.log('Starting MeiliSearch indexation...');
  console.log(`Host: ${MEILI_HOST}`);
  console.log(`Index: ${MEILI_INDEX_NAME}`);

  // Initialize client
  const client = new MeiliSearch({
    host: MEILI_HOST,
    apiKey: MEILI_MASTER_KEY,
  });

  // Check connection
  try {
    const health = await client.health();
    console.log('MeiliSearch status:', health.status);
  } catch (error) {
    console.error('Failed to connect to MeiliSearch:', error.message);
    console.error('Make sure MeiliSearch is running at', MEILI_HOST);
    process.exit(1);
  }

  // Get or create index
  let index;
  try {
    index = await client.getIndex(MEILI_INDEX_NAME);
    console.log('Using existing index:', MEILI_INDEX_NAME);
  } catch {
    console.log('Creating new index:', MEILI_INDEX_NAME);
    const task = await client.createIndex(MEILI_INDEX_NAME, { primaryKey: 'id' });
    // Wait for index creation to complete
    await client.tasks.waitForTask(task.taskUid);
    index = client.index(MEILI_INDEX_NAME);
  }

  // Configure index settings
  console.log('Configuring index settings...');
  await index.updateSettings({
    searchableAttributes: ['title', 'content', 'section', 'hierarchy_lvl0', 'hierarchy_lvl1', 'hierarchy_lvl2'],
    filterableAttributes: ['category', 'version', 'hierarchy_lvl0'],
    sortableAttributes: ['timestamp'],
    rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
    distinctAttribute: 'path',
  });

  // Get all markdown files
  const files = getAllMarkdownFiles(DOCS_PATH);
  console.log(`Found ${files.length} markdown files`);

  // Process files into documents
  const documents = [];

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = extractFrontmatter(content);
      const headings = extractHeadings(body);
      const cleanedContent = cleanContent(body);

      // Skip empty or very short content
      if (cleanedContent.length < 50) continue;

      const urlPath = getUrlPath(filePath);
      const title = frontmatter.title ||
        frontmatter.sidebar_label ||
        headings[0] ||
        path.basename(filePath, path.extname(filePath)).replace(/-/g, ' ');

      const hierarchy = getHierarchy(filePath);

      const doc = {
        id: generateId(urlPath),
        title,
        content: cleanedContent.substring(0, 10000), // Limit content size
        path: urlPath,
        section: frontmatter.sidebar_label || title,
        category: hierarchy.lvl0,
        version: 'current',
        hierarchy_lvl0: hierarchy.lvl0,
        hierarchy_lvl1: hierarchy.lvl1,
        hierarchy_lvl2: hierarchy.lvl2,
        timestamp: Date.now(),
      };

      documents.push(doc);

      // Also index individual headings as separate documents for better search granularity
      for (const heading of headings.slice(0, 5)) { // Limit to first 5 headings
        const anchor = heading
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        const headingDoc = {
          id: generateId(urlPath + '#' + anchor),
          title: heading,
          content: cleanedContent.substring(0, 500),
          path: urlPath + '#' + anchor,
          section: title,
          category: hierarchy.lvl0,
          version: 'current',
          hierarchy_lvl0: hierarchy.lvl0,
          hierarchy_lvl1: hierarchy.lvl1,
          hierarchy_lvl2: heading,
          timestamp: Date.now(),
        };

        documents.push(headingDoc);
      }
    } catch (error) {
      console.warn(`Warning: Failed to process ${filePath}:`, error.message);
    }
  }

  console.log(`Prepared ${documents.length} documents for indexing`);

  // Delete all existing documents
  console.log('Clearing existing documents...');
  const deleteTask = await index.deleteAllDocuments();
  await client.tasks.waitForTask(deleteTask.taskUid);

  // Upload documents in batches
  console.log('Uploading documents...');
  const uploadTasks = [];
  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    const task = await index.addDocuments(batch);
    uploadTasks.push(task.taskUid);
    console.log(`Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(documents.length / BATCH_SIZE)} (Task: ${task.taskUid})`);
  }

  // Wait for all indexing tasks to complete
  console.log('Waiting for indexing to complete...');
  for (const taskUid of uploadTasks) {
    await client.tasks.waitForTask(taskUid);
  }

  // Get final stats
  const stats = await index.getStats();
  console.log('\nIndexing complete!');
  console.log(`Total documents indexed: ${stats.numberOfDocuments}`);
  console.log(`Index is indexing: ${stats.isIndexing}`);

  // Generate search API key if master key is provided
  if (MEILI_MASTER_KEY && MEILI_MASTER_KEY !== 'masterKey123') {
    try {
      const keys = await client.getKeys();
      const searchKey = keys.results.find(k => k.actions.includes('search'));
      if (searchKey) {
        console.log(`\nSearch API Key: ${searchKey.key}`);
        console.log('Add this to your .env file as MEILI_SEARCH_KEY');
      }
    } catch (error) {
      console.log('Note: Could not retrieve search key. Use the dashboard to get it.');
    }
  }
}

// Run indexation
indexDocuments().catch(error => {
  console.error('Indexation failed:', error);
  process.exit(1);
});
