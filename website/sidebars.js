const sidebar = {
  academy: [
        'quest/introduction',
        {
          type: 'html',
          value: '<hr/>',
        },
        'quest/a-file',
        'quest/protocol',
        'quest/wallet',
        'quest/hello-world',
  ],
  build: [
    {
      type: 'doc',
      id: 'index',
      customProps: {
        icon: '/icons/home.svg',
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
        icon: '/icons/near.svg',
      },
      link: { type: 'doc', id: 'protocol/basics' },
      items: [
        {
          "Getting Started": [
            'protocol/basics',
            'tutorials/protocol/create-account',
          ],
        },
        {
          "Concepts": [
            {
              'Accounts / Contracts': ['protocol/account-model', 'protocol/account-id', 'protocol/access-keys'],
            },
            {
              'Transactions': [
                'protocol/transactions',
                'protocol/transaction-anatomy',
                'protocol/gas',
                'protocol/transaction-execution',
                'chain-abstraction/meta-transactions',
              ],
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
          ]
        },
        {
          "Tutorials": [
            'tutorials/protocol/create-account',
            'tutorials/protocol/importing-account',
            'tools/faucet'
          ]
        },
        {
          "Reference": [
            'tools/near-cli',
            {
              type: 'link',
              label: 'RPC API ↗',
              href: '/api/rpc/introduction',
            },
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'Multi-Chain',
      collapsed: true,
      customProps: {
        icon: '/icons/multichain.svg',
      },
      link: { type: 'doc', id: 'chain-abstraction/what-is' },
      items: [
        {
          "Getting Started": [
            "chain-abstraction/what-is"
          ]
        },
        {
          "Concepts": [
            'chain-abstraction/chain-signatures',
            'chain-abstraction/intents/overview',
            {
              'Omni Bridge': [
                'chain-abstraction/omnibridge/overview',
                'chain-abstraction/omnibridge/how-it-works',
                'chain-abstraction/omnibridge/implementation-details',
                'chain-abstraction/omnibridge/roadmap',
              ],
            },
            'chain-abstraction/data-availability',
          ]
        },
        {
          "Tutorials": [
            'chain-abstraction/chain-signatures/implementation',
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
              label: 'Cross-Chain DAO Governance',
              link: { type: 'doc', id: 'tutorials/multichain-dao/introduction' },
              items: [
                'tutorials/multichain-dao/introduction',
                'tutorials/multichain-dao/request',
                'tutorials/multichain-dao/signing',
                'tutorials/multichain-dao/voting',
              ],
            },
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'AI and Agents',
      collapsed: true,
      link: { type: 'doc', id: 'ai/introduction' },
      customProps: {
        icon: '/icons/ai.svg',
      },
      items: [
        'ai/introduction',
        {
          "Shade Agents": [
            {
              "Getting Started": [
                'ai/shade-agents/quickstart/deploying',
                "ai/shade-agents/quickstart/components",
              ]
            },
            {
              "Concepts": [
                "ai/shade-agents/introduction",
                "ai/shade-agents/examples",
                "ai/shade-agents/custom-agent-contract",
                "ai/shade-agents/security",
                "ai/shade-agents/plugins",
              ],
            },
          ]
        },
        {
          "Reference": [
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
          ]
        }
        // 'web3-apps/ai/ai-assistant'
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      link: { type: 'doc', id: 'smart-contracts/what-is' },
      customProps: {
        icon: '/icons/contract.svg',
      },
      items: [
        {
          "Getting Started": [
            'smart-contracts/what-is',
            'smart-contracts/quickstart',
          ]
        },
        {
          "Concepts": [
            [
              {
                "Anatomy of a Contract": [
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
                ]
              },
              'smart-contracts/global-contracts',
              {
                'Deploy, Update & Lock': [
                  'smart-contracts/release/deploy',
                  'smart-contracts/release/upgrade',
                  'smart-contracts/release/lock',
                ],
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
              {
                'Test the Contract': [
                  'smart-contracts/testing/introduction',
                  'smart-contracts/testing/unit-test',
                  'smart-contracts/testing/integration-test',
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
            ],
          ]
        },
        {
          "Tutorials": [
            'tutorials/examples/count-near',
            'tutorials/examples/guest-book',
            'tutorials/examples/donation',
            'tutorials/examples/coin-flip',
            'tutorials/examples/factory',
            'tutorials/examples/near-drop',
            'tutorials/examples/xcc',
            'tutorials/examples/advanced-xcc',
            'tutorials/examples/global-contracts',
            'tutorials/examples/update-contract-migrate-state',
            {
              "Build a FT Contract from Scratch": [
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
              "Build a NFT Contract from Scratch": [
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
            {
              "Build a NFT Contract from Scratch (JS)": [
                'tutorials/nfts/js/introduction',
                {
                  Basic: [
                    'tutorials/nfts/js/predeployed-contract',
                    'tutorials/nfts/js/skeleton',
                    'tutorials/nfts/js/minting',
                    'tutorials/nfts/js/upgrade-contract',
                    'tutorials/nfts/js/enumeration',
                    'tutorials/nfts/js/core',
                  ],
                },
                'tutorials/nfts/js/events',
                {
                  Marketplace: [
                    'tutorials/nfts/js/approvals',
                    'tutorials/nfts/js/marketplace'
                  ],
                },
                'tutorials/nfts/js/royalty',
              ]
            },
          ]
        },
        {
          "Reference": [
            'resources/contracts-list',
            'tools/sdk',
            'tools/clear-state',
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'App Development',
      collapsed: true,
      customProps: {
        icon: '/icons/app.svg',
      },
      link: { type: 'doc', id: 'web3-apps/what-is' },
      items: [
        {
          "Getting Started": [
            'web3-apps/what-is',
            'web3-apps/quickstart']
        },
        {
          "Tutorials": [
            'web3-apps/integrate-contracts',
            'tutorials/examples/frontend-multiple-contracts',
            'web3-apps/ethereum-wallets',
            'web3-apps/backend/backend-login',
            'chain-abstraction/meta-transactions-relayer',
            'data-infrastructure/lake-framework/building-indexers/js-lake-indexer',
            'data-infrastructure/lake-framework/building-indexers/python-lake-indexer',
            {
              type: 'category',
              label: 'Mastering NEAR',
              collapsed: true,
              items: [
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
            }
          ]
        },
        {
          "Reference": [
            'tools/near-api',
            'tools/wallet-selector',
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Tokens & Primitives',
      collapsed: true,
      link: { type: 'doc', id: 'primitives/what-is' },
      customProps: {
        icon: '/icons/token.svg',
      },
      items: [
        { type: 'link', label: 'Introduction', href: '/primitives/what-is' },
        {
          "Fungible Tokens": [
            'primitives/ft',
          ]
        },
        {
          "Non-Fungible Tokens": [
            'primitives/nft',
            'data-infrastructure/lake-framework/building-indexers/nft-indexer',
            'data-infrastructure/lake-framework/building-indexers/python-nft-indexer',
          ]
        },
        'protocol/network/staking',
        'primitives/linkdrop',
        'primitives/oracles',
        'primitives/dao',
        'primitives/dex',
        'primitives/did',
      ],
    },
    {
      type: 'category',
      label: 'Data Infrastructure',
      collapsed: true,
      customProps: {
        icon: '/icons/database.svg',
      },
      link: { type: 'doc', id: 'data-infrastructure/what-is' },
      items: [
        {
          type: 'link',
          label: 'Introduction',
          href: '/data-infrastructure/what-is',
        },
        {
          "Concepts": [
            'data-infrastructure/data-apis',
            'data-infrastructure/big-query',
            'tools/indexing',
            {
              'Lake Framework': [
                'data-infrastructure/indexers',
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
                    'data-infrastructure/lake-framework/building-indexers/primitives',
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
          ]
        },
        {
          "Reference": [
            'tools/explorer',
            {
              type: 'category',
              label: 'Data APIs',
              link: { type: 'doc', id: 'tools/ecosystem-apis/introduction' },
              items: [
                'tools/ecosystem-apis/fastnear',
                'tools/ecosystem-apis/nearblocks',
                'tools/ecosystem-apis/pikespeak',
              ]
            }
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'EVM Developers',
      collapsed: true,
      customProps: {
        icon: '/img/icons/ethereum.svg',
      },
      link: { type: 'doc', id: 'aurora/what-is' },
      items: [
        {
          type: 'link',
          label: 'Introduction',
          href: '/aurora/what-is',
        },
        'aurora/build-on-aurora',
        'aurora/launch-virtual-chain',
      ],
    }
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
    'api/rpc/errors',
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
  toolbox: [
    'toolbox',
  ]
};

export default sidebar;
