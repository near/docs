import 'dotenv/config';
import { MeiliSearch } from 'meilisearch';
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import {
  BUILD_DIR,
  extractFrontmatter,
} from './shared.mjs';
import { createHash } from 'crypto';

export const CATEGORY_MAP = {
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

const MEILI_HOST = process.env.MEILI_HOST || 'http://localhost:7700';
const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY || 'masterKey123';
const MEILI_INDEX_NAME = process.env.MEILI_INDEX_NAME || 'near-docs';
const BATCH_SIZE = 100;
const TASK_TIMEOUT = 300000; 

async function getAllDocumentIds(index) {
  const ids = [];
  const pageSize = 1000;
  let offset = 0;

  while (true) {
    const page = await index.getDocuments({
      fields: ['id'],
      limit: pageSize,
      offset,
    });

    if (!page.results.length) {
      break;
    }

    for (const doc of page.results) {
      if (doc.id) {
        ids.push(doc.id);
      }
    }

    offset += page.results.length;

    if (page.results.length < pageSize) {
      break;
    }
  }

  return ids;
}

function getCategoryFromPath(filePath) {
  const relativePath = path.relative(BUILD_DIR, filePath);
  const firstFolder = relativePath.split(path.sep)[0];
  return CATEGORY_MAP[firstFolder] || 'General';
}

function getHierarchy(filePath) {
  const relativePath = path.relative(BUILD_DIR, filePath);
  const parts = relativePath.split(path.sep);

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

function getUrlPath(filePath) {
  const relativePath = path.relative(BUILD_DIR, filePath);
  const pathParts = relativePath.replace(/\\/g, '/').split('/');
  const fileName = pathParts.pop().replace(/\.mdx?$/, '');

  const docId = fileName.replace(/^\d+-/, '');

  const cleanPathParts = pathParts.map(part => part.replace(/^\d+-/, ''));

  let urlPath;

  if (docId === 'index') {
    urlPath = cleanPathParts.join('/');
  } else {
    const parentFolder = cleanPathParts[cleanPathParts.length - 1];
    if (docId === parentFolder) {
      urlPath = cleanPathParts.join('/');
    } else {
      urlPath = [...cleanPathParts, docId].join('/');
    }
  }

  return '/' + urlPath;
}

async function indexDocuments() {
  console.log('Starting MeiliSearch indexation...');
  console.log(`Host: ${MEILI_HOST}`);
  console.log(`Index: ${MEILI_INDEX_NAME}`);

  const client = new MeiliSearch({
    host: MEILI_HOST,
    apiKey: MEILI_MASTER_KEY,
  });

  let index = await client.getIndex(MEILI_INDEX_NAME);
  console.log('Using existing index:', MEILI_INDEX_NAME);

  await index.updateSettings({
    searchableAttributes: ['title', 'content', 'section', 'hierarchy_lvl0', 'hierarchy_lvl1', 'hierarchy_lvl2'],
    filterableAttributes: ['category', 'version', 'hierarchy_lvl0'],
    sortableAttributes: ['timestamp'],
    rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
    distinctAttribute: 'path',
    embedders: {
      default: {
        source: 'huggingFace',
        model: 'BAAI/bge-small-en-v1.5',
        documentTemplate: '{{doc.title}} {{doc.content}}',
      },
    }
  });
 
  let files = globSync(path.join(BUILD_DIR, '**/*.md'));
  console.log(`Found ${files.length} markdown files`);

  const documents = [];

  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = extractFrontmatter(content);

      const urlPath = getUrlPath(filePath);
      const title = frontmatter.title;

      const hierarchy = getHierarchy(filePath);

      const doc = {
        id: createHash('md5').update(urlPath).digest('hex').substring(0, 12),
        title,
        content: body,
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

  const currentDocIds = new Set(documents.map((doc) => doc.id));

  console.log('Fetching existing indexed document IDs...');
  const existingDocIds = await getAllDocumentIds(index);
  console.log(`Found ${existingDocIds.length} existing indexed documents`);

  // Upload documents in batches (upsert by id)
  console.log('Uploading documents (incremental upsert)...');
  const uploadTasks = [];
  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    const task = await index.addDocuments(batch);
    uploadTasks.push(task.taskUid);
    console.log(`Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(documents.length / BATCH_SIZE)} (Task: ${task.taskUid})`);
  }

  const staleDocIds = existingDocIds.filter((id) => !currentDocIds.has(id));

  if (staleDocIds.length > 0) {
    console.log(`Deleting ${staleDocIds.length} stale documents...`);
    for (let i = 0; i < staleDocIds.length; i += BATCH_SIZE) {
      const batch = staleDocIds.slice(i, i + BATCH_SIZE);
      const task = await index.deleteDocuments(batch);
      uploadTasks.push(task.taskUid);
      console.log(`Deleted stale batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(staleDocIds.length / BATCH_SIZE)} (Task: ${task.taskUid})`);
    }
  } else {
    console.log('No stale documents to delete');
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
