import 'dotenv/config';
import { MeiliSearch } from 'meilisearch';
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MEILI_HOST = process.env.MEILI_HOST || 'http://localhost:7700';
const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY || 'masterKey123';
const MEILI_INDEX_NAME = process.env.MEILI_INDEX_NAME || 'near-docs';
const DOCS_PATH = path.resolve(__dirname, '../static');
const BATCH_SIZE = 100;
const TASK_TIMEOUT = 300000; // 5 minutes timeout for tasks with embedders

const CATEGORY_MAP = {
  'protocol': 'Protocol',
  'chain-abstraction': 'Multi-Chain',
  'ai': 'AI & Agents',
  'smart-contracts': 'Smart Contracts',
  'web3-apps': 'Web3 Apps',
  'primitives': 'Primitives',
  'data-infrastructure': 'Data Infrastructure',
  'tools': 'Tools',
  'api': 'API',
};

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

async function indexDocuments() {
  // console.log('Starting MeiliSearch indexation...');
  // console.log(`Host: ${MEILI_HOST}`);
  // console.log(`Index: ${MEILI_INDEX_NAME}`);

  // // Initialize client
  // const client = new MeiliSearch({
  //   host: MEILI_HOST,
  //   apiKey: MEILI_MASTER_KEY,
  // });

  // // Check connection
  // try {
  //   const health = await client.health();
  //   console.log('MeiliSearch status:', health.status);
  // } catch (error) {
  //   console.error('Failed to connect to MeiliSearch:', error.message);
  //   console.error('Make sure MeiliSearch is running at', MEILI_HOST);
  //   process.exit(1);
  // }

  // // Get index
  // let index;
  // index = await client.getIndex(MEILI_INDEX_NAME);
  // console.log('Using existing index:', MEILI_INDEX_NAME);

  // // Configure index settings
  // console.log('Configuring index settings...');
  // await index.updateSettings({
  //   searchableAttributes: ['title', 'content', 'section', 'hierarchy_lvl0', 'hierarchy_lvl1', 'hierarchy_lvl2'],
  //   filterableAttributes: ['category', 'version', 'hierarchy_lvl0'],
  //   sortableAttributes: ['timestamp'],
  //   rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
  //   distinctAttribute: 'path',
  //   embedders: {
  //     default: {
  //       source: 'huggingFace',
  //       model: 'sentence-transformers/all-MiniLM-L6-v2',
  //       documentTemplate: '{{doc.title}} {{doc.content}}',
  //     },
  //   },
  // });

  // Get all markdown files
  let files = globSync('../static/**/*.md', { cwd: __dirname });
  console.log(`Found ${files.length} markdown files`);

  console.log(files[0]);
  exit();

  // Process files into documents
  const documents = [];

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = extractFrontmatter(content);
      const headings = extractHeadings(body);
      const cleanedContent = cleanContent(body);

      const urlPath = getUrlPath(filePath, frontmatter);
      const title = frontmatter.title ||
        frontmatter.sidebar_label ||
        headings[0] ||
        path.basename(filePath, path.extname(filePath)).replace(/-/g, ' ');

      const hierarchy = getHierarchy(filePath);

      const doc = {
        id: generateId(urlPath),
        title,
        content: cleanedContent, // Limit content size
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
    } catch (error) {
      console.warn(`Warning: Failed to process ${filePath}:`, error.message);
    }
  }

  console.log(`Prepared ${documents.length} documents for indexing`);

  // Delete all existing documents
  console.log('Clearing existing documents...');
  const deleteTask = await index.deleteAllDocuments();
  await client.tasks.waitForTask(deleteTask.taskUid, { timeout: TASK_TIMEOUT });

  // Upload documents in batches
  console.log('Uploading documents...');
  const uploadTasks = [];
  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    const task = await index.addDocuments(batch);
    uploadTasks.push(task.taskUid);
    console.log(`Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(documents.length / BATCH_SIZE)} (Task: ${task.taskUid})`);
  }

  // Wait for all indexing tasks to complete (takes longer with embedders)
  console.log('Waiting for indexing to complete (this may take a few minutes with embedders)...');
  for (const taskUid of uploadTasks) {
    await client.tasks.waitForTask(taskUid, { timeout: TASK_TIMEOUT });
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
