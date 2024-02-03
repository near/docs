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
  "build": [
    "develop/welcome",
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Smart Contracts </small></b></span>"
    },
    "develop/contracts/whatisacontract",
    {
      "Building Smart Contracts": [
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
            "develop/contracts/security/checklist",
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
            "develop/contracts/security/bounty"
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
      "value": "<span class='menu__link'><b><small> Primitives (FT, NFT, ...) </small></b></span>"
    },
    "primitives/whatareprimitives",
    {
      "Using Primitives": [
        "primitives/ft",
        "primitives/nft",
        "primitives/linkdrop",
        "primitives/oracles",
        "primitives/dao",
        "primitives/dex"
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Components </small></b></span>"
    },
    "bos/tutorial/quickstart",
    {
      "Building Components": [
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
      ]
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Web3 Apps </small></b></span>"
    },
    "develop/web3-apps/whatareweb3apps",
    {
      "Building a Web3 App": [
        "develop/integrate/quickstart-frontend",
        "develop/integrate/frontend",
        "develop/integrate/frontend-components",
        "develop/relayers/build-relayer",
        {
          "Backend": [
            "develop/integrate/backend-login",
          ]
        },

      ],
    },
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Data Infrastructure </small></b></span>"
    },
    "develop/whataredatasolutions",
    {
      "NEAR Data Infrastructure": [
        "bos/queryapi/big-query",
        {
          "QueryAPI": [
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
          ]
        },
        {
          "Lake Framework": [
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
          ]
        },
      ]
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