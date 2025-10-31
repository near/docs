const sidebar = {
  build: [
    {
      type: 'doc',
      id: 'index',
      customProps: {
        icon: '/assets/menu/home.svg',
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
        icon: '/assets/menu/near.svg',
      },
      link: { type: 'generated-index', slug: 'protocol/basics' },
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
            'protocol/architecture',
          ]
        },
        {
          "Tutorials": [
            'tutorials/protocol/importing-account',
            'faucet'
          ]
        },
        {
          "Reference": [
            'tools/explorer',
            {
              type: 'link',
              label: 'Wallets ↗',
              href: 'https://wallet.near.org',
            },
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
        icon: '/assets/menu/multichain.svg',
      },
      link: { type: 'generated-index', slug: 'chain-abstraction/what-is' },
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
              link: { type: 'generated-index', slug: 'tutorials/controlling-near-accounts/introduction' },
              items: [
                'tutorials/controlling-near-accounts/introduction',
                'tutorials/controlling-near-accounts/setup',
                'tutorials/controlling-near-accounts/transfer',
              ],
            },
            {
              type: 'category',
              label: 'Cross-Chain DAO Governance',
              link: { type: 'generated-index', slug: 'tutorials/multichain-dao/introduction' },
              items: [
                'tutorials/multichain-dao/introduction',
                'tutorials/multichain-dao/request',
                'tutorials/multichain-dao/signing',
                'tutorials/multichain-dao/voting',
              ],
            },
          ]
        },
        {
          "Reference": [
            {
              type: "link",
              label: "Chainsig.js",
              href: "https://github.com/NearDeFi/chainsig.js"
            }
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'AI and Agents',
      collapsed: true,
      link: { type: 'generated-index', slug: 'ai/introduction' },
      customProps: {
        icon: '/assets/menu/ai.svg',
      },
      items: [
        'ai/introduction',
        'ai/near-mcp',
        'ai/using-llms',
        {
          "Shade Agents": [
            {
              "Getting Started": [
                "ai/shade-agents/getting-started/introduction",
                {
                  "Quickstart": [
                    "ai/shade-agents/getting-started/quickstart/deploying",
                    "ai/shade-agents/getting-started/quickstart/components",
                  ]
                },
              ]
            },
            {
              "Concepts": [
                "ai/shade-agents/concepts/framework-overview",
                "ai/shade-agents/concepts/what-can-you-build",
                "ai/shade-agents/concepts/security",
              ]
            },
            {
              "Tutorials": [
                "ai/shade-agents/tutorials/tutorials-overview",
                {
                  "AI DAO": [
                    "ai/shade-agents/tutorials/ai-dao/overview",
                    "ai/shade-agents/tutorials/ai-dao/dao-agent-contract",
                    "ai/shade-agents/tutorials/ai-dao/dao-agent",
                    "ai/shade-agents/tutorials/ai-dao/deploying",
                  ]
                }
              ]
            },
            {
              "Reference": [
                "ai/shade-agents/reference/api",
                "ai/shade-agents/reference/cli",
                "ai/shade-agents/reference/environment-variables",
                "ai/shade-agents/reference/custom-agent-contract",
                "ai/shade-agents/reference/plugins",
              ]
            },
          ]
        },
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      link: { type: 'generated-index', slug: 'smart-contracts/what-is' },
      customProps: {
        icon: '/assets/menu/contract.svg',
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
            'smart-contracts/contracts-list',
            'tools/near-cli',
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
        icon: '/assets/menu/app.svg',
      },
      link: { type: 'generated-index', slug: 'web3-apps/what-is' },
      items: [
        {
          "Getting Started": [
            'web3-apps/what-is',
            'web3-apps/quickstart']
        },
        {
          "Concepts": [
            'web3-apps/concepts/web-login',
            'web3-apps/concepts/eth-wallets-on-near',
            'web3-apps/concepts/data-types'
          ]
        },
        {
          "Tutorials": [
            {
              "Web Login": [
                'web3-apps/tutorials/web-login/near-connector',
                'web3-apps/tutorials/web-login/wallet-selector',
                'web3-apps/tutorials/web-login/ethereum-wallets',
                'web3-apps/tutorials/web-login/web3-auth',
              ]
            },
            'tutorials/examples/frontend-multiple-contracts',
            'web3-apps/backend/backend-login',
            {
              'Testing on Localnet': [
                'web3-apps/tutorials/localnet/introduction',
                'web3-apps/tutorials/localnet/run',
              ],
            },
            'chain-abstraction/meta-transactions-relayer',
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
            'tools/near-cli',
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
        icon: '/assets/menu/token.svg',
      },
      items: [
        { type: 'link', label: 'Introduction', href: '/primitives/what-is' },
        {
          'Fungible Tokens (FT)': [
            'primitives/ft/standard',
            'primitives/ft/ft'
          ]
        },
        {
          'Non-Fungible Tokens (NFT)': [
            'primitives/nft/standard',
            'primitives/nft/nft'
          ]
        },
        {
          'Linkdrops': [
            'primitives/linkdrop/standard',
            'primitives/linkdrop/linkdrop'
          ]
        },
        'protocol/network/staking',
        'primitives/oracles',
        'primitives/dao',
        'primitives/dex',
        'primitives/did',
        {
          'Lockup Contracts': [
            'primitives/lockup/introduction',
            'primitives/lockup/lockup',
          ]
        },
        {
          "Liquid Staking":
            [
              "primitives/liquid-staking/liquid-staking",
              "primitives/liquid-staking/deploy-your-own-contract",
            ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Data Infrastructure',
      collapsed: true,
      customProps: {
        icon: '/assets/menu/database.svg',
      },
      link: { type: 'generated-index', slug: 'data-infrastructure/what-is' },
      items: [
        'data-infrastructure/what-is',
        'data-infrastructure/data-apis',
        'data-infrastructure/big-query',
        {
          'Indexers': [
            'data-infrastructure/indexers',
            {
              "NEAR Lake Framework": [
                'data-infrastructure/near-lake-framework',
                'data-infrastructure/tutorials/listen-function-calls',
                'data-infrastructure/tutorials/state-changes',
              ]
            },
            {
              "NEAR Indexer": [
                'data-infrastructure/near-indexer',
                "data-infrastructure/tutorials/listen-to-realtime-events",
                {
                  "Building a Data Lake": [
                    'data-infrastructure/tutorials/running-near-lake/run-lake-indexer',
                    'data-infrastructure/tutorials/running-near-lake/lake-start-options',
                    'data-infrastructure/tutorials/running-near-lake/credentials',
                  ],
                },
              ]
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'EVM Developers',
      collapsed: true,
      customProps: {
        icon: '/assets/menu/ethereum.svg',
      },
      link: { type: 'generated-index', slug: 'aurora/what-is' },
      items: [
        'aurora/what-is',
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
  ]
};

export default sidebar;
