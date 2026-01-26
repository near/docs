#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { MeiliSearch } from 'meilisearch';
import { z } from 'zod';

const MEILI_HOST = process.env.MEILI_HOST || 'http://localhost:7700';
const MEILI_API_KEY = process.env.MEILI_API_KEY || process.env.MEILI_MASTER_KEY || 'masterKey123';
const MEILI_INDEX_NAME = process.env.MEILI_INDEX_NAME || 'near-docs';


const client = new MeiliSearch({
  host: MEILI_HOST,
  apiKey: MEILI_API_KEY,
});

const server = new McpServer({
  name: 'mcp-meilisearch',
  version: '1.0.0',
});

server.registerTool(
  'search_near_docs',
  {
    description: 'Search the NEAR Protocol documentation. Use this to find information about NEAR blockchain, smart contracts, web3 apps, wallets, transactions, gas, accounts, and more.',
    inputSchema: {
      query: z.string().describe('The search query (e.g., "smart contract", "gas fees", "wallet integration")'),
      category: z.string().optional().describe('Optional category filter: Smart Contracts, Web3 Apps, Protocol, Tutorials, AI, Tools, API, Integrations, Data Infrastructure, Chain Abstraction, Primitives'),
      limit: z.number().optional().default(5).describe('Maximum number of results (default: 5, max: 20)'),
    },
  },
  async ({ query, category, limit = 5 }) => {
    try {
      const index = client.index(MEILI_INDEX_NAME);

      const searchParams = {
        limit: Math.min(limit, 20),
        attributesToRetrieve: ['title', 'content', 'path', 'category', 'hierarchy_lvl0', 'hierarchy_lvl1'],
        attributesToHighlight: ['title', 'content'],
        highlightPreTag: '**',
        highlightPostTag: '**',
      };

      if (category) {
        searchParams.filter = `category = "${category}"`;
      }

      const results = await index.search(query, searchParams);

      if (results.hits.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No results found for "${query}"${category ? ` in category "${category}"` : ''}. Try different keywords or remove the category filter.`,
            },
          ],
        };
      }

      const formattedResults = results.hits.map((hit, i) => {
        const breadcrumb = [hit.hierarchy_lvl0, hit.hierarchy_lvl1].filter(Boolean).join(' > ');
        const content = hit._formatted?.content?.substring(0, 300) || hit.content?.substring(0, 300);

        return `## ${i + 1}. ${hit._formatted?.title || hit.title}

**Category:** ${hit.category}
**Path:** ${hit.path}
**Breadcrumb:** ${breadcrumb}

${content}...

---`;
      }).join('\n\n');

      return {
        content: [
          {
            type: 'text',
            text: `Found ${results.estimatedTotalHits} results for "${query}" (showing ${results.hits.length}):\n\n${formattedResults}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error searching: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'get_doc_content',
  {
    description: 'Get the full content of a specific documentation page by its path',
    inputSchema: {
      path: z.string().describe('The document path (e.g., "/smart-contracts/what-is")'),
    },
  },
  async ({ path }) => {
    try {
      const index = client.index(MEILI_INDEX_NAME);

      const results = await index.search('', {
        filter: `path = "${path}"`,
        limit: 1,
        attributesToRetrieve: ['title', 'content', 'path', 'category', 'hierarchy_lvl0', 'hierarchy_lvl1', 'hierarchy_lvl2'],
      });

      if (results.hits.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `Document not found at path: ${path}`,
            },
          ],
        };
      }

      const doc = results.hits[0];
      const breadcrumb = [doc.hierarchy_lvl0, doc.hierarchy_lvl1, doc.hierarchy_lvl2].filter(Boolean).join(' > ');

      return {
        content: [
          {
            type: 'text',
            text: `# ${doc.title}

**Category:** ${doc.category}
**Path:** ${doc.path}
**Breadcrumb:** ${breadcrumb}

---

${doc.content}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'list_doc_categories',
  {
    description: 'List all available documentation categories',
    inputSchema: {},
  },
  async () => {
    const categories = [
      'Smart Contracts - Build and deploy smart contracts on NEAR',
      'Web3 Apps - Create decentralized applications',
      'Protocol - Core NEAR Protocol concepts (accounts, transactions, gas)',
      'Tutorials - Step-by-step guides and examples',
      'AI - AI agents and tools on NEAR',
      'Tools - CLI, SDKs, and developer tools',
      'API - RPC API reference',
      'Integrations - Exchange and wallet integrations',
      'Data Infrastructure - Indexers and data tools',
      'Chain Abstraction - Cross-chain functionality',
      'Primitives - NFTs, FTs, DAOs',
    ];

    return {
      content: [
        {
          type: 'text',
          text: `Available documentation categories:\n\n${categories.map(c => `- ${c}`).join('\n')}`,
        },
      ],
    };
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MeiliSearch MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
