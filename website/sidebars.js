const sidebar = {
  "concepts": [
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> From Web 2 to Web 3 </small></b></span>"
    },
    [
      "concepts/web3/intro",
      "concepts/web3/basics",
      "concepts/web3/near",
      "concepts/web3/economics",
      "concepts/web3/nfts"
    ]
  ],
  "build": [
    "build/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> NEAR Protocol </small></b></span>"
    },
    "concepts/basics/protocol",
    {
      "Understand the Protocol": [
        {
          type: 'category',
          label: 'Accounts / Contracts',
          link: { type: 'doc', id: 'concepts/protocol/account-model' },
          items: [
            "concepts/protocol/account-id",
            "concepts/protocol/access-keys",
          ]
        },
        {
          type: 'category',
          label: 'Transactions',
          link: { type: 'doc', id: 'concepts/protocol/transactions' },
          items: [
            "concepts/protocol/transaction-anatomy",
            "concepts/protocol/gas",
            "concepts/protocol/transaction-execution",
          ]
        },
        {
          "Data Flow": [
            "concepts/data-flow/near-data-flow",
            "concepts/data-flow/token-transfer-flow"
          ]
        },
        {
          "Tokens": ["concepts/basics/tokens", "concepts/basics/token-loss"]
        },
        {
          "Storage": [
            "concepts/storage/storage-staking",
            "concepts/storage/storage-solutions"
          ]
        },
        {
          "Network": [
            "concepts/basics/validators",
            "concepts/basics/networks",
            "concepts/basics/epoch",
            "concepts/basics/runtime",
          ]
        },
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Chain Abstraction ✨ </small></b></span>"
    },
    'build/chain-abstraction/what-is',
    {
      "Chain Abstraction Services": [
        {
          "Meta Transactions": [
            "concepts/abstraction/meta-transactions",
            "concepts/abstraction/relayers",
            "build/chain-abstraction/meta-transactions",
          ]
        },
        {
          "Chain Signatures": [
            "concepts/abstraction/chain-signatures",
            'build/chain-abstraction/chain-signatures',
            'build/chain-abstraction/nft-chain-keys',
          ]
        },
        // 'build/chain-abstraction/wallet',
        {
          "Multichain Gas Relayer": [
            "build/chain-abstraction/multichain-gas-relayer/overview",
            "build/chain-abstraction/multichain-gas-relayer/gas-station",
            "build/chain-abstraction/multichain-gas-relayer/multichain-server",
            "build/chain-abstraction/multichain-gas-relayer/relayer-gas-example",
          ]
        },
        'build/chain-abstraction/fastauth-sdk',
        "build/chain-abstraction/data-availability",
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Smart Contracts </small></b></span>"
    },
    "build/smart-contracts/what-is",
    {
      "Building Smart Contracts": [
        "build/smart-contracts/quickstart",
        {
          "Anatomy of a Contract": [
            "build/smart-contracts/anatomy/anatomy",
            "build/smart-contracts/anatomy/functions",
            "build/smart-contracts/anatomy/storage",
            "build/smart-contracts/anatomy/types",
            "build/smart-contracts/anatomy/collections",
            "build/smart-contracts/anatomy/environment",
            "build/smart-contracts/anatomy/actions",
            "build/smart-contracts/anatomy/crosscontract",
            "build/smart-contracts/security/checklist",
            {
              "type": "html",
              "value": "<hr/>"
            },
            {
              "Advanced": [
                "build/smart-contracts/anatomy/best-practices",
                "build/smart-contracts/anatomy/serialization",
                "build/smart-contracts/anatomy/serialization-protocols",
                "build/smart-contracts/anatomy/reduce-size",
                "build/smart-contracts/anatomy/reproducible-builds",
              ]
            }
          ]
        },
        {
          "Test the Contract": [
            "build/smart-contracts/testing/introduction",
            "build/smart-contracts/testing/unit-test",
            "build/smart-contracts/testing/integration-test",
            {
              "type": "html",
              "value": "<hr/>"
            },
            "build/smart-contracts/testing/kurtosis-localnet",
          ]
        },
        {
          "Deploy, Update & Lock": [
            "build/smart-contracts/release/deploy",
            "build/smart-contracts/release/upgrade",
            "build/smart-contracts/release/lock"
          ]
        },
        {
          "type": "category",
          "label": "Security",
          "link": {
            "type": "doc",
            "id": "build/smart-contracts/security/welcome"
          },
          "items": [
            "build/smart-contracts/security/checklist",
            "build/smart-contracts/security/storage",
            "build/smart-contracts/security/callbacks",
            "build/smart-contracts/security/one-yocto",
            "build/smart-contracts/security/sybil",
            "build/smart-contracts/security/frontrunning",
            "build/smart-contracts/security/reentrancy",
            "build/smart-contracts/security/random",
            {
              "type": "html",
              "value": "<hr/>"
            },
            "build/smart-contracts/security/bounty"
          ]
        }
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Web3 Applications </small></b></span>"
    },
    "build/web3-apps/what-is",
    {
      "Building Web3 Applications": [
        "build/web3-apps/quickstart",
        {
          type: 'category',
          label: 'Frontends',
          link: { type: 'doc', id: 'build/web3-apps/frontend' },
          items: [
            "build/web3-apps/integrate-contracts",
            {
              "Social Components (BOS)": [
                "build/near-components/what-is",
                "build/near-components/dev-environment",
                {
                  "Anatomy of a Component": [
                    "build/near-components/anatomy/state",
                    "build/near-components/anatomy/web-methods",
                    "build/near-components/anatomy/builtin-components",
                    "build/near-components/anatomy/near",
                    "build/near-components/anatomy/social",
                    "build/near-components/anatomy/notifications",
                    "build/near-components/anatomy/bos-components"
                  ]
                },
                "build/near-components/bos-gateway",
                "build/web3-apps/integrate-components",
              ]
            }
          ]
        },
        {
          "Backend": [
            "build/web3-apps/backend/backend-login",
          ]
        },
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Primitives (FT, NFT, ...) </small></b></span>"
    },
    "build/primitives/what-is",
    {
      "Primitives & Standards": [
        "build/primitives/ft",
        "build/primitives/nft",
        "build/primitives/linkdrop",
        "build/primitives/oracles",
        "build/primitives/dao",
        "build/primitives/dex",
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Data Infrastructure </small></b></span>"
    },
    "build/data-infrastructure/what-is",
    {
      "NEAR Data Infrastructure": [
        "concepts/data-flow/data-storage",
        "build/data-infrastructure/big-query",
        {
          "QueryAPI": [
            "build/data-infrastructure/query-api/intro",
            "build/data-infrastructure/query-api/how-it-works",
            "build/data-infrastructure/query-api/indexers",
            "build/data-infrastructure/query-api/best-practices",
            "build/data-infrastructure/query-api/index-functions",
            "build/data-infrastructure/query-api/context-object",
            "build/data-infrastructure/query-api/query-data",
            "build/data-infrastructure/query-api/migrate-from-near-lake",
          ]
        },
        {
          "Lake Framework": [
            "concepts/advanced/near-lake-framework",  
            "build/data-infrastructure/lake-framework/near-lake",
            "build/data-infrastructure/lake-framework/near-lake-state-changes-indexer",
            "build/data-infrastructure/lake-framework/migrating-to-near-lake-framework",
            {
              "Building Indexers": [
                "build/data-infrastructure/lake-framework/building-indexers/primitives",
                {
                  "type": "link",
                  "label": "NEAR Lake Primitives",
                  "href": "https://near.github.io/near-lake-framework-js/"
                },
                "build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer",
                "build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer",
                "build/data-infrastructure/lake-framework/building-indexers/nft-indexer",
                "build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer"
              ]
            },
            {
              "Running NEAR Lake": [
                "build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer",
                "build/data-infrastructure/lake-framework/running-near-lake/lake-start-options",
                "build/data-infrastructure/lake-framework/running-near-lake/credentials"
              ]
            },
            {
              "Lake Data Structures": [
                "build/data-infrastructure/lake-data-structures/toc",
                "build/data-infrastructure/lake-data-structures/block",
                "build/data-infrastructure/lake-data-structures/chunk",
                "build/data-infrastructure/lake-data-structures/shard",
                "build/data-infrastructure/lake-data-structures/transaction",
                "build/data-infrastructure/lake-data-structures/receipt",
                "build/data-infrastructure/lake-data-structures/execution-outcome",
                "build/data-infrastructure/lake-data-structures/state-change"
              ]
            },
          ]
        },
      ]
    }
  ],
  "tutorials": [
    "tutorials/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Examples </small></b></span>"
    },
    {
      "Frontend & Smart Contract": [
        "tutorials/examples/count-near",
        "tutorials/examples/guest-book",
        "tutorials/examples/donation",
        "tutorials/examples/xcc",
        "tutorials/examples/coin-flip",
      ]
    },
    {
      "Advanced Contracts": [
        "tutorials/examples/factory",
        "tutorials/examples/advanced-xcc",
        "tutorials/examples/update-contract-migrate-state",
      ]
    },
    "tutorials/examples/frontend-multiple-contracts",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Templates </small></b></span>"
    },
    "tutorials/templates/minter",
    "tutorials/templates/marketplace",
    "tutorials/templates/blog",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Tutorials </small></b></span>"
    },
    {
      "Components": [
        "tutorials/near-components/bos-loader",
        "tutorials/near-components/interaction",
        "tutorials/near-components/ds-components",
        "tutorials/near-components/using-iframes",
        "tutorials/near-components/blog-posts",
        "tutorials/near-components/push-notifications",
        "tutorials/near-components/queryapi-websockets",
        "tutorials/near-components/ethers-js",
        "tutorials/near-components/ethers-js-best-practices",
        "tutorials/near-components/lido",
      ]
    },
    {
      "Fungible Tokens 101 (FT)": [
        "tutorials/fts/introduction",
        "tutorials/fts/predeployed-contract",
        "tutorials/fts/skeleton",
        "tutorials/fts/defining-a-token",
        "tutorials/fts/circulating-supply",
        "tutorials/fts/registering-accounts",
        "tutorials/fts/transfers",
        "tutorials/fts/marketplace"
      ]
    },
    {
      "Non-Fungible Tokens (NFT)": [
        "tutorials/nfts/minting-nfts",
        "tutorials/nfts/minting-nft-frontend",
        "tutorials/nfts/minecraft-nfts",
        {
          "type": "link",
          "label": "Building a Frontend",
          "href": "https://github.com/near-examples/nft-tutorial-frontend"
        },
        {
          "type": "html",
          "value": "<hr/>"
        },
        {
          "🌐 Contract: Zero to Hero ": [
            "tutorials/nfts/js/introduction",
            "tutorials/nfts/js/predeployed-contract",
            "tutorials/nfts/js/skeleton",
            "tutorials/nfts/js/minting",
            "tutorials/nfts/js/upgrade-contract",
            "tutorials/nfts/js/enumeration",
            "tutorials/nfts/js/core",
            "tutorials/nfts/js/approvals",
            "tutorials/nfts/js/royalty",
            "tutorials/nfts/js/events",
            "tutorials/nfts/js/marketplace"
          ]
        },
        {
          "🦀 Contract: Zero to Hero": [
            "tutorials/nfts/introduction",
            {
              "Basic": [
                "tutorials/nfts/predeployed-contract",
                "tutorials/nfts/skeleton",
                "tutorials/nfts/minting",
                "tutorials/nfts/upgrade-contract",
                "tutorials/nfts/enumeration",
                "tutorials/nfts/core",]
            },
            "tutorials/nfts/events",
            {
              "Marketplace": [
                "tutorials/nfts/approvals",
                "tutorials/nfts/marketplace",
              ]
            },
            "tutorials/nfts/royalty",
            "tutorials/nfts/series"
          ]
        }
      ]
    },
    {
      "Build a Crossword Game": [
        {
          "type": "category",
          "label": "Basics",
          "items": [
            "tutorials/crosswords/basics/overview",
            "tutorials/crosswords/basics/set-up-skeleton",
            "tutorials/crosswords/basics/add-functions-call",
            "tutorials/crosswords/basics/hashing-and-unit-tests",
            "tutorials/crosswords/basics/simple-frontend"
          ]
        },
        {
          "type": "category",
          "label": "Beginner",
          "items": [
            "tutorials/crosswords/beginner/overview",
            "tutorials/crosswords/beginner/collections",
            "tutorials/crosswords/beginner/structs-enums",
            "tutorials/crosswords/beginner/actions",
            "tutorials/crosswords/beginner/adding-a-puzzle",
            "tutorials/crosswords/beginner/logging-in",
            "tutorials/crosswords/beginner/logging-in-implementation"
          ]
        },
        {
          "type": "category",
          "label": "Intermediate",
          "items": [
            "tutorials/crosswords/intermediate/overview",
            "tutorials/crosswords/intermediate/access-key-solution",
            "tutorials/crosswords/intermediate/use-seed-phrase",
            "tutorials/crosswords/intermediate/linkdrop",
            "tutorials/crosswords/intermediate/cross-contract-calls",
            "tutorials/crosswords/intermediate/base64vecu8"
          ]
        }
      ]
    },
    {
      "Data Infrastructure":
        [
          "tutorials/near-components/indexer-tutorials/posts-indexer",
          "tutorials/near-components/indexer-tutorials/hype-indexer",
          "tutorials/near-components/indexer-tutorials/nft-indexer",
          "tutorials/near-components/indexer-tutorials/feed-indexer",
        ]
    },

  ],
  "tools": [
    "tools/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Developer Tools </small></b></span>"
    },
    {
      "type": "category",
      "label": "JavaScript API",
      "items": [
        "tools/near-api-js/quick-reference",
        "tools/near-api-js/wallet",
        "tools/near-api-js/account",
        "tools/near-api-js/contract",
        "tools/near-api-js/utils",
        "tools/near-api-js/faq",
        {
          "type": "link",
          "label": "Handling Passphrases",
          "href": "https://github.com/near/near-seed-phrase"
        },
        {
          "type": "link",
          "label": "Type Docs",
          "href": "https://near.github.io/near-api-js"
        }
      ]
    },
    "tools/sdk",
    {
      "type": "category",
      "label": "Command Line Tools (CLI)",
      "items": ["tools/near-cli", "tools/near-cli-rs"]
    },
    {
      "type": "category",
      "label": "BOS Web Editors",
      "items": [
        {
          "type": "link",
          "label": "dev.near.org Web Editor",
          "href": "https://dev.near.org/sandbox"
        },
        {
          "type": "link",
          "label": "Jutsu Web Editor",
          "href": "https://jutsu.ai/editor"
        }
      ]
    },
    {
      "type": "category",
      "label": "Wallets",
      "items": [
        "tools/wallet-selector",
        {
          "type": "link",
          "label": "Remix IDE Plugin",
          "href": "https://docs.welldonestudio.io/code/getting-started"
        }
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Ecosystem Tools </small></b></span>"
    },
    "tools/wallets",
    {
      "type": "link",
      "label": "Testnet Faucet",
      "href": "https://near-faucet.io/"
    },
    {
      "type": "link",
      "label": "Keypom",
      "href": "https://keypom.xyz/"
    },
    'tools/fastnear-api',
    "tools/explorer",
    "tools/indexing"
  ],
  "api": [
    "api/rpc/introduction",
    "api/rpc/providers",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> NEAR RPC API </small></b></span>"
    },
    "api/rpc/setup",
    "api/rpc/access-keys",
    "api/rpc/contracts",
    "api/rpc/block-chunk",
    "api/rpc/gas",
    "api/rpc/protocol",
    "api/rpc/network",
    "api/rpc/transactions",
    "api/rpc/maintenance-windows",
  ],
  "pagoda": [
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> PAGODA CONSOLE </small></b></span>"
    },
    {
      "Pagoda RPC": [
        "pagoda/rpc/intro",
        "pagoda/rpc/get-keys",
        "pagoda/rpc/setup",
        "pagoda/rpc/stats",
      ]
    },
    {
      "Enhanced API": [
        "pagoda/rpc/api",
      ]
    },
    {
      "Alerts & Triggers": [
        "pagoda/alerts/intro",
        "pagoda/alerts/setup",
        "pagoda/alerts/webhooks",
      ]
    },
  ],
  "exchanges": [
    {
      "Integration": [
        "integrations/exchange-integration",
        "integrations/balance-changes",
        "integrations/accounts",
        "integrations/create-transactions",
        "integrations/fungible-tokens",
        "integrations/implicit-accounts"
      ]
    },
    {
      "Understanding Errors": [
        "integrations/errors/introduction",
        "integrations/errors/error-implementation",
        "integrations/errors/token-loss"
      ]
    },
    "integrations/faq"
  ]
};

export default sidebar;
