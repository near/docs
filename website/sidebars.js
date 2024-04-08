const sidebar = {
  "concepts": [
    "concepts/welcome",
    "concepts/basics/protocol",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> The NEAR Protocol </small></b></span>"
    },
    {
      type: 'category',
      label: 'Accounts / Contracts',
      link: { type: 'doc', id: 'concepts/protocol/account-model' },
      items: [
        "concepts/protocol/account-id",
        "concepts/protocol/access-keys",
        "concepts/protocol/smartcontract",
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
        "concepts/storage/data-storage",
        "concepts/storage/storage-staking",
        "concepts/storage/storage-solutions"
      ]
    },
    {
      "Network": [
        "concepts/basics/validators",
        "concepts/basics/networks",
        "concepts/basics/epoch",
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Chain Abstraction ✨</small></b></span>"
    },
    "concepts/abstraction/introduction",
    "concepts/abstraction/meta-transactions",
    "concepts/abstraction/relayers",
    {
      "Chain Signatures": [
        "concepts/abstraction/chain-signatures",
        "concepts/abstraction/signatures/use-cases",
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Blockchain Data &amp; Indexing </small></b></span>"
    },
    [
      "concepts/data-flow/data-storage",
      {
        "Data Indexing": [
          "concepts/advanced/indexers",
          "concepts/advanced/near-indexer-framework",
          "concepts/advanced/near-lake-framework"
        ]
      }
    ],
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Advanced Topics </small></b></span>"
    },
    [
      "concepts/basics/runtime",
      "concepts/advanced/specification",
      {
        "type": "link",
        "label": "Papers",
        "href": "https://near.org/papers"
      },
    ],
    {
      "type": "html",
      "value": "<hr/>"
    },
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
      "value": "<span class='menu__link'><b><small> Chain Abstraction ✨ </small></b></span>"
    },
    'build/chain-abstraction-services/what-is',
    {
      "Chain Abstraction Services": [
        "build/chain-abstraction-services/welcome",
        'build/chain-abstraction-services/fastauth-sdk',
        'build/chain-abstraction-services/chain-signatures',
        'build/chain-abstraction-services/wallet',
        {
          "Multichain Gas Relayer": [
            "build/chain-abstraction-services/multichain-gas-relayer/multichain-server",
            "build/chain-abstraction-services/multichain-gas-relayer/gas-station",
            "build/chain-abstraction-services/multichain-gas-relayer/relayer-gas-example",
          ]
        },
        "build/chain-abstraction-services/data-availability",
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
    "build/building-smart-contracts/what-is",
    {
      "Building Smart Contracts": [
        "build/building-smart-contracts/quickstart",
        {
          "Anatomy of a Contract": [
            "build/building-smart-contracts/anatomy-of-a-contract/basics",
            "build/building-smart-contracts/anatomy-of-a-contract/anatomy",
            "build/building-smart-contracts/anatomy-of-a-contract/environment",
            "build/building-smart-contracts/anatomy-of-a-contract/storage",
            "build/building-smart-contracts/anatomy-of-a-contract/actions",
            "build/building-smart-contracts/anatomy-of-a-contract/crosscontract",
            "build/building-smart-contracts/anatomy-of-a-contract/checklist",
            {
              "type": "html",
              "value": "<hr/>"
            },
            "build/building-smart-contracts/anatomy-of-a-contract/serialization"
          ]
        },
        {
          "Test the Contract": [
            "build/building-smart-contracts/test-the-contract/introduction",
            "build/building-smart-contracts/test-the-contract/unit-test",
            "build/building-smart-contracts/test-the-contract/integration-test",
            {
              "type": "html",
              "value": "<hr/>"
            },
            "build/building-smart-contracts/test-the-contract/kurtosis-localnet",
          ]
        },
        {
          "Deploy, Update & Lock": [
            "build/building-smart-contracts/deploy-update-and-lock/deploy",
            "build/building-smart-contracts/deploy-update-and-lock/upgrade",
            "build/building-smart-contracts/deploy-update-and-lock/lock"
          ]
        },
        {
          "type": "category",
          "label": "Security",
          "link": {
            "type": "doc",
            "id": "build/building-smart-contracts/security/welcome"
          },
          "items": [
            // repeated
            "build/building-smart-contracts/anatomy-of-a-contract/checklist",
            "build/building-smart-contracts/security/storage",
            "build/building-smart-contracts/security/callbacks",
            "build/building-smart-contracts/security/one-yocto",
            "build/building-smart-contracts/security/sybil",
            "build/building-smart-contracts/security/frontrunning",
            "build/building-smart-contracts/security/reentrancy",
            "build/building-smart-contracts/security/random",
            {
              "type": "html",
              "value": "<hr/>"
            },
            "build/building-smart-contracts/security/bounty"
          ]
        },
        {
          "type": "html",
          "value": "<hr/>"
        },
        {
          "type": "html",
          "value": "<a class='menu__link internal' href='/tutorials/examples/count-near'> 📖 Tutorials </a>",
        },
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Multi-Chain Components </small></b></span>"
    },
    "build/building-web3-components/what-is",
    {
      "Building Web3 Components": [
        "build/building-web3-components/intro",
        {
          "Anatomy of a Component": [
            "build/building-web3-components/anatomy-of-a-component/state",
            "build/building-web3-components/anatomy-of-a-component/web-methods",
            "build/building-web3-components/anatomy-of-a-component/builtin-components",
            "build/building-web3-components/anatomy-of-a-component/near",
            "build/building-web3-components/anatomy-of-a-component/social",
            "build/building-web3-components/anatomy-of-a-component/notifications",
            "build/building-web3-components/anatomy-of-a-component/bos-components"
          ]
        },
        "build/building-web3-components/bos-gateway",
        {
          "type": "html",
          "value": "<hr/>"
        },
        {
          "type": "html",
          "value": "<a class='menu__link internal' href='/bos/dev/bos-loader'> 📖 Tutorials </a>",
        },
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
    "build/building-web3-applications/what-is",
    {
      "Building Web3 Applications": [
        "build/building-web3-applications/quickstart-frontend",
        "build/building-web3-applications/frontend",
        "build/building-web3-applications/frontend-components",
        {
          "Backend": [
            "build/building-web3-applications/backend/backend-login",
          ]
        },
        {
          "type": "html",
          "value": "<hr/>"
        },
        {
          "type": "html",
          "value": "<a class='menu__link internal' href='/tutorials/examples/count-near'> 📖 Tutorials </a>",
        },
      ],
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Primitives (FT, NFT, ...) </small></b></span>"
    },
    "build/primitives-and-standards/what-is",
    {
      "Primitives & Standards": [
        "build/primitives-and-standards/ft",
        "build/primitives-and-standards/nft",
        "build/primitives-and-standards/linkdrop",
        "build/primitives-and-standards/oracles",
        "build/primitives-and-standards/dao",
        "build/primitives-and-standards/dex",
        {
          "type": "html",
          "value": "<hr/>"
        },
        {
          "type": "html",
          "value": "<a class='menu__link internal' href='/tutorials/nfts/minting-nfts'> 📖 Tutorials </a>",
        },
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
    "build/near-data-infrastructure/what-is",
    {
      "NEAR Data Infrastructure": [
        "build/near-data-infrastructure/big-query",
        {
          "QueryAPI": [
            "build/near-data-infrastructure/query-api/intro",
            "build/near-data-infrastructure/query-api/how-it-works",
            {
              "type": "link",
              "label": "Limitations",
              "href": "/build/near-data-infrastructure/query-api/intro#known-limitations"
            },
            "build/near-data-infrastructure/query-api/indexers",
            "build/near-data-infrastructure/query-api/best-practices",
            "build/near-data-infrastructure/query-api/index-functions",
            "build/near-data-infrastructure/query-api/context-object",
            "build/near-data-infrastructure/query-api/query-data",
            "build/near-data-infrastructure/query-api/migrate-from-near-lake",
          ]
        },
        {
          "Lake Framework": [
            "build/near-data-infrastructure/lake-framework/near-lake",
            "build/near-data-infrastructure/lake-framework/near-lake-state-changes-indexer",
            "build/near-data-infrastructure/lake-framework/migrating-to-near-lake-framework",
            {
              "Building Indexers": [
                "build/near-data-infrastructure/lake-framework/building-indexers/primitives",
                {
                  "type": "link",
                  "label": "NEAR Lake Primitives",
                  "href": "https://near.github.io/near-lake-framework-js/"
                },
                "build/near-data-infrastructure/lake-framework/building-indexers/js-lake-indexer",
                "build/near-data-infrastructure/lake-framework/building-indexers/python-lake-indexer",
                "build/near-data-infrastructure/lake-framework/building-indexers/nft-indexer",
                "build/near-data-infrastructure/lake-framework/building-indexers/python-nft-indexer"
              ]
            },
            {
              "Running NEAR Lake": [
                "build/near-data-infrastructure/lake-framework/running-near-lake/run-lake-indexer",
                "build/near-data-infrastructure/lake-framework/running-near-lake/lake-start-options",
                "build/near-data-infrastructure/lake-framework/running-near-lake/credentials"
              ]
            },
            {
              "Lake Data Structures": [
                "build/near-data-infrastructure/lake-data-structures/toc",
                "build/near-data-infrastructure/lake-data-structures/block",
                "build/near-data-infrastructure/lake-data-structures/chunk",
                "build/near-data-infrastructure/lake-data-structures/shard",
                "build/near-data-infrastructure/lake-data-structures/transaction",
                "build/near-data-infrastructure/lake-data-structures/receipt",
                "build/near-data-infrastructure/lake-data-structures/execution-outcome",
                "build/near-data-infrastructure/lake-data-structures/state-change"
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
      "value": "<span class='menu__link'><b><small> Tutorials </small></b></span>"
    },
    {
      "Components": [
        "bos/dev/bos-loader",
        "bos/tutorial/interaction",
        "bos/tutorial/ds-components",
        "bos/tutorial/using-iframes",
        "bos/tutorial/push-notifications",
        "bos/tutorial/queryapi-websockets",
        "bos/tutorial/ethers-js",
        "bos/tutorial/ethers-js-best-practices",
        "bos/tutorial/lido",
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
            "tutorials/nfts/predeployed-contract",
            "tutorials/nfts/skeleton",
            "tutorials/nfts/minting",
            "tutorials/nfts/upgrade-contract",
            "tutorials/nfts/enumeration",
            "tutorials/nfts/core",
            "tutorials/nfts/approvals",
            "tutorials/nfts/royalty",
            "tutorials/nfts/events",
            "tutorials/nfts/marketplace",
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
          "bos/tutorial/indexer-tutorials/posts-indexer",
          "bos/tutorial/indexer-tutorials/hype-indexer",
          "bos/tutorial/indexer-tutorials/nft-indexer",
          "bos/tutorial/indexer-tutorials/feed-indexer",
          "build/near-data-infrastructure/lake-framework/near-lake-state-changes-indexer",
          "build/near-data-infrastructure/lake-framework/migrating-to-near-lake-framework",
          {
            "Building Indexers": [
              "build/near-data-infrastructure/lake-framework/building-indexers/primitives",
              {
                "type": "link",
                "label": "NEAR Lake Primitives",
                "href": "https://near.github.io/near-lake-framework-js/"
              },
              "build/near-data-infrastructure/lake-framework/building-indexers/js-lake-indexer",
              "build/near-data-infrastructure/lake-framework/building-indexers/python-lake-indexer",
              "build/near-data-infrastructure/lake-framework/building-indexers/nft-indexer",
              "build/near-data-infrastructure/lake-framework/building-indexers/python-nft-indexer"
            ]
          },
          {
            "Running NEAR Lake": [
              "build/near-data-infrastructure/lake-framework/running-near-lake/run-lake-indexer",
              "build/near-data-infrastructure/lake-framework/running-near-lake/lake-start-options",
              "build/near-data-infrastructure/lake-framework/running-near-lake/credentials"
            ]
          },
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
    {
      "type": "category",
      "label": "Smart Contract SDKs",
      "link": {
        "type": "doc",
        "id": "sdk/welcome"
      },
      "items": [
        {
          "Rust SDK": [
            "sdk/rust/introduction",
            "sdk/rust/get-started",
            {
              "Structure of a Contract": [
                "sdk/rust/contract-structure/near-bindgen",
                "sdk/rust/contract-structure/collections",
                "sdk/rust/contract-structure/nesting"
              ]
            },
            {
              "Contract Interface": [
                "sdk/rust/contract-interface/public-methods",
                "sdk/rust/contract-interface/contract-mutability",
                "sdk/rust/contract-interface/private-methods",
                "sdk/rust/contract-interface/payable-methods",
                "sdk/rust/contract-interface/serialization-interface"
              ]
            },
            {
              "Cross-Contract Calls": ["sdk/rust/cross-contract/callbacks"]
            },
            {
              "Promises": [
                "sdk/rust/promises/intro",
                "sdk/rust/promises/token-tx",
                "sdk/rust/promises/create-account",
                "sdk/rust/promises/deploy-contract"
              ]
            },
            {
              "Building Contracts": [
                "sdk/rust/building/basics",
                "sdk/rust/building/prototyping",
                "sdk/rust/building/post-processing",
                "sdk/rust/building/reproducible-builds"
              ]
            },
            {
              "Testing": [
                "sdk/rust/testing/integration-tests",
                "sdk/rust/testing/unit-tests"
              ]
            },
            "sdk/rust/best-practices",
            "sdk/rust/contract-size"
          ],
          "JavaScript SDK": [
            "sdk/js/introduction",
            "sdk/js/get-started",
            {
              "type": "link",
              "label": "Type Docs ↗",
              "href": "https://near.github.io/near-sdk-js/"
            },
            {
              "Structure of a Contract": [
                "sdk/js/contract-structure/near-bindgen",
                "sdk/js/contract-structure/collections"
              ]
            },
            {
              "Contract Interface": [
                "sdk/js/contract-interface/public-methods",
                "sdk/js/contract-interface/private-methods",
                "sdk/js/contract-interface/payable-methods"
              ]
            },
            {
              "Cross-Contract Calls": ["sdk/js/cross-contract/callbacks"]
            },
            {
              "Promises": [
                "sdk/js/promises/intro",
                "sdk/js/promises/token-tx",
                "sdk/js/promises/create-account",
                "sdk/js/promises/deploy-contract"
              ]
            },
            {
              "Building Contracts": [
                "sdk/js/building/basics",
                "sdk/js/building/prototyping",
                "sdk/js/building/reproducible-builds"
              ]
            },
            {
              "SDK CLI": ["sdk/js/cli/cli"]
            },
            {
              "Testing": [
                "sdk/js/testing/integration-tests",
                "sdk/js/testing/unit-tests"
              ]
            }
          ]
        }
      ]
    },
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
          "label": "near.org Web Editor",
          "href": "https://near.org/sandbox"
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
    {
      "type": "link",
      "label": "Wallets",
      "href": "https://wallet.near.org"
    },
    {
      "type": "link",
      "label": "Testnet Faucet",
      "href": "https://near-faucet.io/"
    },
    'tools/fastnear-api',
    "tools/explorer",
    "tools/indexing"
  ],
  "integrate": [
    "develop/integrate/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Composable Apps </small></b></span>"
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Related Tools </small></b></span>"
    },
    {
      "type": "link",
      "label": "Wallet Selector ↗",
      "href": "/tools/wallet-selector"
    },
    {
      "type": "link",
      "label": "QueryAPI ↗",
      "href": "/bos/queryapi/intro"
    },
    {
      "type": "link",
      "label": "BOS CLI",
      "href": "https://github.com/FroVolod/bos-cli-rs"
    },
    "bos/dev/vscode",
    {
      "type": "link",
      "label": "Seed Phrase Generator",
      "href": "https://github.com/near/near-seed-phrase"
    }
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
    "api/rpc/transactions"
  ],
  "exchanges": [
    {
      "Integration": [
        "integrator/exchange-integration",
        "integrator/balance-changes",
        "integrator/accounts",
        "integrator/create-transactions",
        "integrator/fungible-tokens",
        "integrator/implicit-accounts"
      ]
    },
    {
      "Understanding Errors": [
        "integrator/errors/introduction",
        "integrator/errors/error-implementation",
        "integrator/errors/token-loss"
      ]
    },
    "integrator/faq"
  ]
};

export default sidebar;
