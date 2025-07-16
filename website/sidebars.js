const sidebar = {
  build: [
    {
      type: 'doc',
      id: 'index',
      customProps: {
        icon: '/img/icons/home.svg',
      },
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'category',
      label: 'NEAR Protocol',
      collapsed: true,
      customProps: {
        icon: '/img/icons/near.svg',
      },
      link: { type: 'doc', id: 'protocol/basics' },
      items: [
        {
          type: 'link',
          href: '/protocol/basics',
          label: 'Introduction',
        },
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
      type: 'category',
      label: 'Multi-Chain',
      collapsed: true,
      customProps: {
        icon: '/img/icons/multichain.svg',
      },
      link: { type: 'doc', id: 'chain-abstraction/what-is' },
      items: [
        {
          type: 'link',
          label: 'Introduction',
          href: '/chain-abstraction/what-is',
        },
        'chain-abstraction/intents/overview',
        {
          'Chain Signatures': [
            'chain-abstraction/chain-signatures',
            'chain-abstraction/chain-signatures/getting-started',
            'chain-abstraction/chain-signatures/implementation',
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
        'chain-abstraction/data-availability',
        {
          'Meta Transactions': [
            'chain-abstraction/meta-transactions',
            'chain-abstraction/relayers',
            'chain-abstraction/meta-transactions-relayer',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'AI and Agents',
      collapsed: true,
      link: { type: 'doc', id: 'ai/introduction' },
      customProps: {
        icon: '/img/icons/ai.svg',
      },
      items: [
        'ai/introduction',
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
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      link: { type: 'doc', id: 'smart-contracts/what-is' },
      customProps: {
        icon: '/img/icons/contract.svg',
      },
      items: [
        {
          'type': 'link',
          'label': 'Introduction',
          'href': '/smart-contracts/what-is',
        },
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
          ],
        },
        {
          Advanced: ['smart-contracts/global-contracts'],
        },
        'resources/contracts-list'
      ],
    },
    {
      type: 'category',
      label: 'Web3 Applications',
      collapsed: true,
      customProps: {
        icon: '/img/icons/app.svg',
      },
      link: { type: 'doc', id: 'web3-apps/what-is' },
      items: [
        {
          'type': 'link',
          'label': 'Introduction',
          'href': '/web3-apps/what-is',
        },
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
      type: 'category',
      label: 'Tokens & Primitives',
      collapsed: true,
      link: { type: 'doc', id: 'primitives/what-is' },
      customProps: {
        icon: '/img/icons/token.svg',
      },
      items: [
        { type: 'link', label: 'Introduction', href: '/primitives/what-is' },
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
      type: 'category',
      label: 'Data Infrastructure',
      collapsed: true,
      customProps: {
        icon: '/img/icons/database.svg',
      },
      link: { type: 'doc', id: 'data-infrastructure/what-is' },
      items: [
        {
          type: 'link',
          label: 'Introduction',
          href: '/data-infrastructure/what-is',
        },
        'tools/explorer',
        'tools/ecosystem-apis/fastnear',
        'tools/indexing',
        'data-infrastructure/indexers',
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
    {
      type: 'doc',
      id: 'tutorials/welcome',
      customProps: {
        icon: '/img/icons/home.svg',
      },
    },
    {
      type: 'html',
      value: '<hr/>',
    },
    {
      type: 'category',
      label: 'First Steps',
      collapsed: true,
      customProps: {
        icon: '/img/icons/near.svg',
      },
      items: [
        'smart-contracts/quickstart',
        'web3-apps/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Learn by Building',
      collapsed: true,
      customProps: {
        icon: '/img/icons/near.svg',
      },
      items: [
        {
          "Mastering Web3 Apps": [
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
          ]
        },
        {
          type: 'category',
          label: 'Build a Crossword Game',
          items: [
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
      ],
    },
    {
      type: 'category',
      label: 'Frontend Guides',
      collapsed: true,
      customProps: {
        icon: '/img/icons/app.svg',
      },
      items: [
        'tutorials/examples/frontend-multiple-contracts',
        'tutorials/templates/marketplace',
        'tutorials/templates/minter',
        'tutorials/templates/blog',
      ]
    },
    {
      type: 'category',
      label: 'Contract guides',
      collapsed: true,
      customProps: {
        icon: '/img/icons/contract.svg',
      },
      link: { type: 'doc', id: 'tutorials/examples/count-near' },
      items: [
        'tutorials/examples/donation',
        'tutorials/examples/coin-flip',
        'tutorials/examples/factory',
        'tutorials/examples/near-drop',
        'tutorials/examples/advanced-xcc',
        'tutorials/examples/update-contract-migrate-state',
        {
          "Build an FT Contract from Scratch": [
            'tutorials/fts/introduction',
            'tutorials/fts/predeployed-contract',
            'tutorials/fts/skeleton',
            'tutorials/fts/defining-a-token',
            'tutorials/fts/circulating-supply',
            'tutorials/fts/registering-accounts',
            'tutorials/fts/transfers',
            'tutorials/fts/marketplace',
          ]
        },
        {
          "Build an NFT Contract from Scratch": [
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
          ]
        },      
      ],
    },
    {
      type: 'category',
      label: 'Multi-Chain Projects',
      collapsed: true,
      customProps: {
        icon: '/img/icons/multichain.svg',
      },
      link: { type: 'doc', id: 'tutorials/controlling-near-accounts/introduction' },
      items: [
        {
          type: 'category',
          label: 'Controlling NEAR Accounts',
          link: { type: 'doc', id: 'tutorials/controlling-near-accounts/introduction' },
          items: [
            'tutorials/controlling-near-accounts/introduction',
            'tutorials/controlling-near-accounts/setup',
            'tutorials/controlling-near-accounts/transfer',
          ],
        },
        {
          type: 'category',
          label: 'Multi-Chain DAO Governance',
          link: { type: 'doc', id: 'tutorials/multichain-dao/introduction' },
          items: [
            'tutorials/multichain-dao/introduction',
            'tutorials/multichain-dao/request',
            'tutorials/multichain-dao/signing',
            'tutorials/multichain-dao/voting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Data Infrastructure',
      collapsed: true,
      customProps: {
        icon: '/img/icons/database.svg',
      },

      link: { type: 'doc', id: 'data-infrastructure/lake-framework/building-indexers/primitives' },
      items: [
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
      link: { type: 'doc', id: 'tools/ecosystem-apis/introduction' },
      items: [
        'tools/ecosystem-apis/introduction',
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
