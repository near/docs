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
      "Accounts": [
        "concepts/basics/accounts/model",
        "concepts/basics/accounts/account-id",
        "concepts/basics/accounts/access-keys",
        "concepts/basics/accounts/smartcontract",
        "concepts/basics/accounts/state",
        {
          "type": "html",
          "value": "<hr/>"
        },
        "concepts/basics/accounts/creating-accounts"
      ]
    },
    {
      "Transactions": [
        "concepts/basics/transactions/overview",
        {
          "Gas": [
            "concepts/basics/transactions/gas",
            "concepts/basics/transactions/gas-advanced"
          ]
        }
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
    "concepts/basics/validators",
    "concepts/basics/networks",
    "concepts/basics/epoch",
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
      "concepts/advanced/papers"
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
  "contracts": [
    "develop/contracts/welcome",
    "develop/contracts/whatisacontract",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Building Smart Contracts </small></b></span>"
    },
    [
      "develop/contracts/quickstart",
      {
        
        "Anatomy of a Contract": [
          "develop/contracts/basics",
          "develop/contracts/anatomy",
          "develop/contracts/environment/environment",
          "develop/contracts/storage",
          "develop/contracts/actions",
          "develop/contracts/crosscontract",
          "develop/contracts/security/checklist",
          {
            "type": "html",
            "value": "<hr/>"
          },
          "develop/contracts/serialization"
        ]
      },
      {
        "Test the Contract": [
          "develop/testing/introduction",
          "develop/testing/unit-test",
          "develop/testing/integration-test",
          {
            "type": "html",
            "value": "<hr/>"
          },
          "develop/testing/kurtosis-localnet",
        ]
      },
      {
        "Deploy, Update & Lock": [
          "develop/deploy",
          "develop/upgrade",
          "develop/lock"
        ]
      },
      {
        "type": "category",
        "label": "Security",
        "link": {
          "type": "doc",
          "id": "develop/contracts/security/welcome"
        },
        "items": [
          "develop/contracts/security/storage",
          "develop/contracts/security/callbacks",
          "develop/contracts/security/one-yocto",
          "develop/contracts/security/sybil",
          "develop/contracts/security/frontrunning",
          "develop/contracts/security/reentrancy",
          "develop/contracts/security/random",
          {
            "type": "html",
            "value": "<hr/>"
          },
          "develop/contracts/security/audits",
          "develop/contracts/security/bounty"
        ]
      }
    ],
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Standards & Primitives </small></b></span>"
    },
    {
      "type": "link",
      "label": "Fungible Tokens (FT) ↗",
      "href": "/primitives/ft"
    },
    {
      "type": "link",
      "label": "Non-Fungible Tokens (NFT) ↗",
      "href": "/primitives/nft"
    },
    {
      "type": "link",
      "label": "Autonomous Organizations (DAO)",
      "href": "/primitives/dao"
    },
    {
      "type": "link",
      "label": "Oracles ↗",
      "href": "/primitives/oracles"
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Examples & Tutorials </small></b></span>"
    },
    {
      "Examples": [
        "tutorials/examples/guest-book",
        "tutorials/examples/xcc",
        "tutorials/examples/coin-flip",
        "tutorials/examples/factory",
        "tutorials/examples/advanced-xcc",
        "tutorials/examples/update-contract-migrate-state"
      ]
    },
    {
      "Tutorials": [
        "tutorials/fts/simple-fts",
        {
          "Non Fungible Tokens": [
            "tutorials/nfts/minting-nfts",
            "tutorials/nfts/minting-nft-frontend",
            "tutorials/nfts/minecraft-nfts",
            {
              "type": "link",
              "label": "Building a Frontend",
              "href": "https://github.com/near-examples/nft-tutorial-frontend"
            }
          ]
        },
        {
          "Zero to Hero": [
            {
              "Master NFTs on NEAR": [
                {
                  "🌐 Using the JavaScript SDK": [
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
                  "🦀 Using the Rust SDK": [
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
              "Fungible Tokens 101": [
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
            }
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
      "value": "<span class='menu__link'><b><small> Related Tools </small></b></span>"
    },
    {
      "type": "link",
      "label": "Development Kit (SDK) ↗",
      "href": "/sdk/welcome"
    },
    {
      "type": "link",
      "label": "NEAR API JS ↗",
      "href": "/tools/near-api-js/quick-reference"
    },
    {
      "type": "link",
      "label": "NEAR CLI ↗",
      "href": "/tools/near-cli"
    },
    {
      "type": "link",
      "label": "Remix IDE Plugin",
      "href": "https://docs.welldonestudio.io/code/getting-started"
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Ethereum Ecosystem </small></b></span>"
    },
    {
      "type": "link",
      "label": "Aurora (EVM)",
      "href": "https://aurora.dev"
    }
  ],
  "primitives": [
    "primitives/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Standards </small></b></span>"
    },
    "primitives/ft",
    "primitives/nft",
    "primitives/linkdrop",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Community Apps </small></b></span>"
    },
    "primitives/oracles",
    "primitives/dao",
    "primitives/dex",
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
        "tools/fastauth-sdk",
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
    "bos/tutorial/quickstart",
    "bos/dev/intro",
    {
      "Anatomy of a Component": [
        "bos/api/state",
        "bos/api/web-methods",
        "bos/api/builtin-components",
        "bos/api/near",
        "bos/api/social",
        "bos/api/notifications",
        "bos/queryapi/bos-components"
      ]
    },
    "bos/tutorial/bos-gateway",
    {
      "Tutorials": [
        "bos/dev/bos-loader",
        "bos/tutorial/interaction",
        "bos/tutorial/ds-components",
        "bos/tutorial/using-iframes",
        "bos/tutorial/push-notifications",
        "bos/tutorial/queryapi-websockets",
        "bos/tutorial/ethers-js",
        "bos/tutorial/ethers-js-best-practices",
        "bos/tutorial/lido"
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Web Apps </small></b></span>"
    },
    "develop/integrate/quickstart-frontend",
    "develop/integrate/frontend",
    "develop/integrate/frontend-components",
    {
      "type": "category",
      "label": "Examples",
      "items": [
        "tutorials/examples/count-near",
        "tutorials/examples/donation",
        "tutorials/examples/frontend-multiple-contracts"
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Backend </small></b></span>"
    },
    "develop/relayers/build-relayer",
    "develop/integrate/backend-login",
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
  "indexers": [
    "develop/monitor",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> QueryAPI </small></b></span>"
    },
    "bos/queryapi/intro",
    "bos/queryapi/how-it-works",
    {
      "type": "link",
      "label": "Limitations",
      "href": "/bos/queryapi/intro#known-limitations"
    },
    "bos/community/indexers",
    "bos/queryapi/best-practices",
    "bos/queryapi/index-functions",
    "bos/queryapi/context-object",
    "bos/queryapi/query-data",
    "bos/queryapi/migrate-from-near-lake",
    {
      "Tutorials": [
        "bos/tutorial/indexer-tutorials/posts-indexer",
        "bos/tutorial/indexer-tutorials/hype-indexer",
        "bos/tutorial/indexer-tutorials/nft-indexer",
        "bos/tutorial/indexer-tutorials/feed-indexer"
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Data Analytics </small></b></span>"
    },
    "bos/queryapi/big-query",
    "tools/indexer-for-explorer",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> NEAR Lake Framework </small></b></span>"
    },
    "tools/near-lake",
    "tutorials/indexer/near-lake-state-changes-indexer",
    "tutorials/indexer/migrating-to-near-lake-framework",
    {
      "Building Indexers": [
        "develop/lake/primitives",
        {
          "type": "link",
          "label": "NEAR Lake Primitives",
          "href": "https://near.github.io/near-lake-framework-js/"
        },
        "tutorials/indexer/js-lake-indexer",
        "tutorials/indexer/python-lake-indexer",
        "tutorials/indexer/nft-indexer",
        "tutorials/indexer/python-nft-indexer"
      ]
    },
    {
      "Running NEAR Lake": [
        "tutorials/indexer/run-lake-indexer",
        "tutorials/indexer/lake-start-options",
        "tutorials/indexer/credentials"
      ]
    },
    {
      "Lake Data Structures": [
        "develop/lake/structures/toc",
        "develop/lake/structures/block",
        "develop/lake/structures/chunk",
        "develop/lake/structures/shard",
        "develop/lake/structures/transaction",
        "develop/lake/structures/receipt",
        "develop/lake/structures/execution-outcome",
        "develop/lake/structures/state-change"
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Track Real-time Events </small></b></span>"
    },
    {
      "type": "link",
      "label": "Real-time Events (Lake)",
      "href": "/tutorials/indexer/nft-indexer"
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Ecosystem Tools </small></b></span>"
    },
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
    "api/rpc/transactions"
  ],
  "data-availability": [
    "data-availability/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> DA Docs </small></b></span>"
    },
    "data-availability/blob-contract",
    "data-availability/light-client",
    "data-availability/rpc",
    {
      "Integrations": [
        "data-availability/integrations",
        "data-availability/optimism",
        "data-availability/cdk-integration"
      ]
    }
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