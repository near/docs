const sidebar = {
  build: [
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> NEAR Protocol </small></b></span>",
    },
    'protocol/basics',
    {
      'Understand the Protocol': [
        {
          type: 'category',
          label: 'Accounts / Contracts',
          link: { type: 'doc', id: 'protocol/account-model' },
          items: ['protocol/account-id', 'protocol/access-keys'],
        },
        {
          type: 'category',
          label: 'Transactions',
          link: { type: 'doc', id: 'protocol/transactions' },
          items: ['protocol/transaction-anatomy', 'protocol/gas', 'protocol/transaction-execution'],
        },
        {
          'Data Flow': [
            'protocol/data-flow/near-data-flow',
            'protocol/data-flow/token-transfer-flow',
          ],
        },
        {
          Tokens: ['protocol/network/tokens', 'protocol/network/token-loss'],
        },
        {
          Storage: ['protocol/storage/storage-staking', 'protocol/storage/storage-solutions'],
        },
        {
          Network: [
            'protocol/network/validators',
            'protocol/network/networks',
            'protocol/network/epoch',
            'protocol/network/runtime',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> AI and Agents </small></b></span>",
    },
    'ai/introduction',
    {"AI and Agents": [
      {
        "Shade Agents": [
              "ai/shade-agents/introduction",
              "ai/shade-agents/examples",
              {
                "Sandbox Agents": [
                  "ai/shade-agents/sandbox/sandbox-deploying",
                  "ai/shade-agents/sandbox/sandbox-components",
                ]
              },
              {
                "Production Agents": [
                  "ai/shade-agents/production/production-deploying",
                  "ai/shade-agents/production/production-components",
                ]
              },
              "ai/shade-agents/plugins",
        ],
      },
        {
          type: 'link',
          label: 'NEAR AI',
          href: 'https://docs.near.ai/',
        },
        {
          type: 'link',
          label: 'Bitte Protocol',
          href: 'https://docs.bitte.ai/',
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Chain Abstraction ✨ </small></b></span>",
    },
    'chain-abstraction/what-is',
    {
      'Chain Abstraction Services': [
        {
          'Meta Transactions': [
            'chain-abstraction/meta-transactions',
            'chain-abstraction/relayers',
            'chain-abstraction/meta-transactions-relayer',
          ],
        },
        {
          'Chain Signatures': [
            'chain-abstraction/chain-signatures',
            'chain-abstraction/chain-signatures/getting-started',
            'chain-abstraction/chain-signatures/implementation',
            // 'build/chain-abstraction/nft-chain-keys',
          ],
        },
        {
          Intents: [
            'chain-abstraction/intents/overview',
            'chain-abstraction/intents/solvers',
            'chain-abstraction/intents/intents-bridge',
            'chain-abstraction/intents/faq',
          ],
        },
        {
          'Omni Bridge': [
            'chain-abstraction/omnibridge/overview',
            'chain-abstraction/omnibridge/how-it-works',
            'chain-abstraction/omnibridge/implementation-details',
            'chain-abstraction/omnibridge/roadmap',
          ],
        },
        'chain-abstraction/fastauth-sdk',
        'chain-abstraction/data-availability',
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Smart Contracts </small></b></span>",
    },
    'smart-contracts/what-is',
    {
      'Building Smart Contracts': [
        'smart-contracts/quickstart',
        {
          'Anatomy of a Contract': [
            'smart-contracts/anatomy/anatomy',
            'smart-contracts/anatomy/functions',
            'smart-contracts/anatomy/storage',
            'smart-contracts/anatomy/types',
            'smart-contracts/anatomy/collections',
            'smart-contracts/anatomy/environment',
            'smart-contracts/anatomy/actions',
            'smart-contracts/anatomy/crosscontract',
            'smart-contracts/anatomy/yield-resume',
            'smart-contracts/security/checklist',
            {
              type: 'html',
              value: '<hr/>',
            },
            {
              Advanced: [
                'smart-contracts/anatomy/best-practices',
                'smart-contracts/anatomy/serialization',
                'smart-contracts/anatomy/serialization-protocols',
                'smart-contracts/anatomy/reduce-size',
                'smart-contracts/anatomy/reproducible-builds',
              ],
            },
          ],
        },
        {
          'Test the Contract': [
            'smart-contracts/testing/introduction',
            'smart-contracts/testing/unit-test',
            'smart-contracts/testing/integration-test',
            {
              type: 'html',
              value: '<hr/>',
            },
            'smart-contracts/testing/kurtosis-localnet',
          ],
        },
        {
          'Deploy, Update & Lock': [
            'smart-contracts/release/deploy',
            'smart-contracts/release/upgrade',
            'smart-contracts/release/lock',
          ],
        },
        {
          type: 'category',
          label: 'Security',
          link: {
            type: 'doc',
            id: 'smart-contracts/security/welcome',
          },
          items: [
            'smart-contracts/security/checklist',
            'smart-contracts/security/storage',
            'smart-contracts/security/callbacks',
            'smart-contracts/security/one-yocto',
            'smart-contracts/security/sybil',
            'smart-contracts/security/frontrunning',
            'smart-contracts/security/reentrancy',
            'smart-contracts/security/random',
            {
              type: 'html',
              value: '<hr/>',
            },
          ],
        },
        {
          Advanced: ['smart-contracts/global-contracts'],
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value:
        "<span class='menu__link'><b><small> Web3 Apps (Frontend, AI, ...) </small></b></span>",
    },
    'web3-apps/what-is',
    {
      'Building Web3 Applications': [
        'web3-apps/quickstart',
        {
          Frontends: ['web3-apps/integrate-contracts', 'web3-apps/ethereum-wallets'],
        },
        {
          Backend: ['web3-apps/backend/backend-login'],
        },
        {
          'Artificial Intelligence (AI)': ['web3-apps/ai/ai-assistant'],
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Primitives (FT, NFT, ...) </small></b></span>"
    },
    'primitives/what-is',
    {
      'Primitives & Standards': [
        {
          type: 'category',
          label: 'Fungible Tokens (FT)',
          items: [
            'primitives/ft',
            {
              type: 'link',
              label: 'Tutorial: Zero to Hero (Rust) ↗',
              href: '/tutorials/fts/introduction',
            },
          ],
        },
        {
          type: 'category',
          label: 'Non Fungible Tokens (NFT)',
          items: [
            'primitives/nft',
            {
              type: 'link',
              label: 'Tutorial: Minting NFTs ↗',
              href: '/tutorials/nfts/minting-nfts',
            },
            {
              type: 'link',
              label: 'Tutorial: Zero to Hero (JS) ↗',
              href: '/tutorials/nfts/js/introduction',
            },
            {
              type: 'link',
              label: 'Tutorial: Zero to Hero (Rust) ↗',
              href: '/tutorials/nfts/introduction',
            },
          ],
        },
        'protocol/network/staking',
        'primitives/linkdrop',
        'primitives/oracles',
        'primitives/dao',
        'primitives/dex',
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Data Infrastructure </small></b></span>",
    },
    'data-infrastructure/what-is',
    'data-infrastructure/indexers',
    {
      'NEAR Data Infrastructure': [
        'data-infrastructure/data-apis',
        'data-infrastructure/big-query',
        {
          'Lake Framework': [
            'data-infrastructure/lake-framework/near-lake-framework',
            'data-infrastructure/lake-framework/near-lake',
            'data-infrastructure/lake-framework/near-lake-state-changes-indexer',
            'data-infrastructure/lake-framework/migrating-to-near-lake-framework',
            {
              'Running NEAR Lake': [
                'data-infrastructure/lake-framework/running-near-lake/run-lake-indexer',
                'data-infrastructure/lake-framework/running-near-lake/lake-start-options',
                'data-infrastructure/lake-framework/running-near-lake/credentials',
              ],
            },
            {
              'Lake Data Structures': [
                'data-infrastructure/lake-data-structures/toc',
                'data-infrastructure/lake-data-structures/block',
                'data-infrastructure/lake-data-structures/chunk',
                'data-infrastructure/lake-data-structures/shard',
                'data-infrastructure/lake-data-structures/transaction',
                'data-infrastructure/lake-data-structures/receipt',
                'data-infrastructure/lake-data-structures/execution-outcome',
                'data-infrastructure/lake-data-structures/state-change',
              ],
            },
          ],
        },
      ],
    },
  ],
  tutorials: [
    'tutorials/welcome',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Examples </small></b></span>",
    },
    {
      'Frontend & Smart Contract': [
        'tutorials/examples/count-near',
        'tutorials/examples/guest-book',
        'tutorials/examples/donation',
        'tutorials/examples/xcc',
        'tutorials/examples/coin-flip',
      ],
    },
    {
      'Advanced Contracts': [
        'tutorials/examples/factory',
        'tutorials/examples/near-drop',
        'tutorials/examples/advanced-xcc',
        'tutorials/examples/update-contract-migrate-state',
      ],
    },
    'tutorials/examples/frontend-multiple-contracts',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Templates </small></b></span>",
    },
    'tutorials/templates/minter',
    'tutorials/templates/marketplace',
    'tutorials/templates/blog',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Tutorials </small></b></span>",
    },
    {
      'NEAR 101: Building Web3 Apps': [
        'tutorials/auction/introduction',
        {
          'Smart Contracts 101': [
            'tutorials/auction/basic-auction',
            'tutorials/auction/sandbox-testing',
            'tutorials/auction/deploy',
          ],
        },
        {
          'Frontends 101': [
            'tutorials/auction/creating-a-frontend',
            'tutorials/auction/indexing-historical-data',
          ],
        },
        {
          'Using Primitives': [
            'tutorials/auction/winning-an-nft',
            'tutorials/auction/bidding-with-fts',
            'tutorials/auction/updating-the-frontend',
          ],
        },
        'tutorials/auction/auction-factory',
      ],
    },
    {
      'Fungible Tokens 101 (FT)': [
        'tutorials/fts/introduction',
        'tutorials/fts/predeployed-contract',
        'tutorials/fts/skeleton',
        'tutorials/fts/defining-a-token',
        'tutorials/fts/circulating-supply',
        'tutorials/fts/registering-accounts',
        'tutorials/fts/transfers',
        'tutorials/fts/marketplace',
      ],
    },
    {
      'Non-Fungible Tokens (NFT)': [
        'tutorials/nfts/minting-nfts',
        {
          type: 'html',
          value: '<hr/>',
        },
        {
          '🌐 Contract: Zero to Hero ': [
            'tutorials/nfts/js/introduction',
            'tutorials/nfts/js/predeployed-contract',
            'tutorials/nfts/js/skeleton',
            'tutorials/nfts/js/minting',
            'tutorials/nfts/js/upgrade-contract',
            'tutorials/nfts/js/enumeration',
            'tutorials/nfts/js/core',
            'tutorials/nfts/js/approvals',
            'tutorials/nfts/js/royalty',
            'tutorials/nfts/js/events',
            'tutorials/nfts/js/marketplace',
          ],
        },
        {
          '🦀 Contract: Zero to Hero': [
            'tutorials/nfts/introduction',
            {
              Basic: [
                'tutorials/nfts/predeployed-contract',
                'tutorials/nfts/skeleton',
                'tutorials/nfts/minting',
                'tutorials/nfts/upgrade-contract',
                'tutorials/nfts/enumeration',
                'tutorials/nfts/core',
              ],
            },
            'tutorials/nfts/events',
            {
              Marketplace: ['tutorials/nfts/approvals', 'tutorials/nfts/marketplace'],
            },
            'tutorials/nfts/royalty',
            'tutorials/nfts/series',
          ],
        },
      ],
    },
    {
      'Building Indexers': [
        'data-infrastructure/lake-framework/building-indexers/primitives',
        {
          type: 'link',
          label: 'NEAR Lake Primitives',
          href: 'https://near.github.io/near-lake-framework-js/',
        },
        'data-infrastructure/lake-framework/building-indexers/js-lake-indexer',
        'data-infrastructure/lake-framework/building-indexers/python-lake-indexer',
        'data-infrastructure/lake-framework/building-indexers/nft-indexer',
        'data-infrastructure/lake-framework/building-indexers/python-nft-indexer',
      ],
    },
    {
      'Build a Crossword Game': [
        {
          type: 'category',
          label: 'Basics',
          items: [
            'tutorials/crosswords/basics/overview',
            'tutorials/crosswords/basics/set-up-skeleton',
            'tutorials/crosswords/basics/add-functions-call',
            'tutorials/crosswords/basics/hashing-and-unit-tests',
            'tutorials/crosswords/basics/simple-frontend',
          ],
        },
        {
          type: 'category',
          label: 'Beginner',
          items: [
            'tutorials/crosswords/beginner/overview',
            'tutorials/crosswords/beginner/collections',
            'tutorials/crosswords/beginner/structs-enums',
            'tutorials/crosswords/beginner/actions',
            'tutorials/crosswords/beginner/adding-a-puzzle',
            'tutorials/crosswords/beginner/logging-in',
            'tutorials/crosswords/beginner/logging-in-implementation',
          ],
        },
        {
          type: 'category',
          label: 'Intermediate',
          items: [
            'tutorials/crosswords/intermediate/overview',
            'tutorials/crosswords/intermediate/access-key-solution',
            'tutorials/crosswords/intermediate/use-seed-phrase',
            'tutorials/crosswords/intermediate/linkdrop',
            'tutorials/crosswords/intermediate/cross-contract-calls',
            'tutorials/crosswords/intermediate/base64vecu8',
          ],
        },
      ],
    },
    {
      'Multi-Chain DAO Governance': [
        'tutorials/multichain-dao/introduction',
        'tutorials/multichain-dao/request',
        'tutorials/multichain-dao/signing',
        'tutorials/multichain-dao/voting',
      ],
    },
    {
      'Integrate with NEAR Intents': [
        'tutorials/intents/introduction',
        'tutorials/intents/deposit',
        'tutorials/intents/swap',
        'tutorials/intents/withdraw',
      ],
    },
    {
      'Controlling Near accounts': [
        'tutorials/controlling-near-accounts/introduction',
        'tutorials/controlling-near-accounts/setup',
        'tutorials/controlling-near-accounts/transfer',
      ],
    },
  ],
  tools: [
    'tools/welcome',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Developer Tools </small></b></span>",
    },
    'tools/near-api',
    'tools/sdk',
    'tools/near-cli',
    'tools/wallet-selector',
    'tools/clear-state',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Data Tools </small></b></span>",
    },
    'tools/explorer',
    {
      type: 'category',
      label: 'Data APIs',
      items: [
        'tools/ecosystem-apis/fastnear',
        'tools/ecosystem-apis/nearblocks',
        'tools/ecosystem-apis/pikespeak',
      ],
    },
    'tools/indexing',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> Ecosystem Tools </small></b></span>",
    },
    'tools/faucet',
    {
      type: 'link',
      label: 'Developer Portal',
      href: 'https://dev.near.org/',
    },
    {
      type: 'link',
      label: 'NEAR Catalog',
      href: 'https://app.nearcatalog.xyz/',
    },
    {
      type: 'link',
      label: 'Keypom',
      href: 'https://keypom.xyz/',
    },
    {
      type: 'link',
      label: 'Remix IDE Plugin',
      href: 'https://docs.welldonestudio.io/code/getting-started',
    },
  ],
  api: [
    'api/rpc/introduction',
    'api/rpc/providers',
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'html',
      value: "<span class='menu__link'><b><small> NEAR RPC API </small></b></span>",
    },
    'api/rpc/setup',
    'api/rpc/access-keys',
    'api/rpc/contracts',
    'api/rpc/block-chunk',
    'api/rpc/gas',
    'api/rpc/protocol',
    'api/rpc/network',
    'api/rpc/transactions',
    'api/rpc/maintenance-windows',
  ],
  exchanges: [
    {
      Integration: [
        'integrations/exchange-integration',
        'integrations/balance-changes',
        'integrations/accounts',
        'integrations/create-transactions',
        'integrations/fungible-tokens',
        'integrations/implicit-accounts',
      ],
    },
    {
      'Understanding Errors': [
        'integrations/errors/introduction',
        'integrations/errors/error-implementation',
        'integrations/errors/token-loss',
      ],
    },
    'integrations/faq',
  ],
};

export default sidebar;
