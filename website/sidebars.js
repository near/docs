const sidebar = {
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
    'chain-abstraction/what-is',
    {
      "Chain Abstraction Services": [
        {
          "Meta Transactions": [
            "chain-abstraction/meta-transactions",
            "chain-abstraction/relayers",
            "chain-abstraction/meta-transactions-relayer",
          ]
        },
        {
          "Chain Signatures": [
            "chain-abstraction/chain-signatures",
            "chain-abstraction/chain-signatures/getting-started",
            'chain-abstraction/chain-signatures/implementation',
            // 'build/chain-abstraction/nft-chain-keys',
          ]
        },
        {
          "Intents": [
            "chain-abstraction/intents/overview",
            "chain-abstraction/intents/solvers",
            "chain-abstraction/intents/intents-bridge",
            "chain-abstraction/intents/faq",
          ]
        },
        {
          "Omni Bridge": [
            "chain-abstraction/omnibridge/overview",
            "chain-abstraction/omnibridge/how-it-works",
            "chain-abstraction/omnibridge/implementation-details",
            "chain-abstraction/omnibridge/roadmap",
          ]
        },
        'chain-abstraction/fastauth-sdk',
        "chain-abstraction/data-availability",
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
            "build/smart-contracts/anatomy/yield-resume",
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
      "value": "<span class='menu__link'><b><small> Web3 Apps (Frontend, AI, ...) </small></b></span>"
    },
    "build/web3-apps/what-is",
    {
      "Building Web3 Applications": [
        "build/web3-apps/quickstart",
        {
          "Frontends": [
            "build/web3-apps/integrate-contracts",
            "build/web3-apps/ethereum-wallets"
          ]
        },
        {
          "Backend": [
            "build/web3-apps/backend/backend-login",
          ]
        },
        {
          "Artificial Intelligence (AI)": [
            "build/web3-apps/ai/ai-assistant",
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
    "build/primitives/what-is",
    {
      "Primitives & Standards": [
        {
          type: 'category',
          label: 'Fungible Tokens (FT)',
          items: [
            "build/primitives/ft",
            {
              "type": "link",
              "label": "Tutorial: Zero to Hero (Rust) ↗",
              "href": "/tutorials/fts/introduction"
            },
          ]
        },
        {
          type: 'category',
          label: 'Non Fungible Tokens (NFT)',
          items: [
            "build/primitives/nft",
            {
              "type": "link",
              "label": "Tutorial: Minting NFTs ↗",
              "href": "/tutorials/nfts/minting-nfts"
            },
            {
              "type": "link",
              "label": "Tutorial: Zero to Hero (JS) ↗",
              "href": "/tutorials/nfts/js/introduction"
            },
            {
              "type": "link",
              "label": "Tutorial: Zero to Hero (Rust) ↗",
              "href": "/tutorials/nfts/introduction"
            },
          ]
        },
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
        "build/data-infrastructure/data-apis",
        "build/data-infrastructure/big-query",
        {
          "Lake Framework": [
            "build/data-infrastructure/lake-framework/near-lake-framework",
            "build/data-infrastructure/lake-framework/near-lake",
            "build/data-infrastructure/lake-framework/near-lake-state-changes-indexer",
            "build/data-infrastructure/lake-framework/migrating-to-near-lake-framework",
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
        "tutorials/examples/near-drop",
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
      "NEAR 101: Building Web3 Apps": [
        "tutorials/auction/introduction",
        {
          "Smart Contracts 101": [
            "tutorials/auction/basic-auction",
            "tutorials/auction/sandbox-testing",
            "tutorials/auction/deploy",
          ]
        },
        {
          "Frontends 101": [
            "tutorials/auction/creating-a-frontend",
            "tutorials/auction/indexing-historical-data",
          ]
        },
        {
          "Using Primitives": [
            "tutorials/auction/winning-an-nft",
            "tutorials/auction/bidding-with-fts",
            "tutorials/auction/updating-the-frontend",
          ]
        },
        "tutorials/auction/auction-factory",
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
      "Multi-Chain DAO Governance": [
        "tutorials/multichain-dao/introduction",
        "tutorials/multichain-dao/request",
        "tutorials/multichain-dao/signing",
        "tutorials/multichain-dao/voting"
      ]
    },
    {
      "Integrate with NEAR Intents": [
        "tutorials/intents/introduction",
        "tutorials/intents/deposit",
        "tutorials/intents/swap",
        "tutorials/intents/withdraw",
      ]
    },
    {
      "Controlling Near accounts": [
        "tutorials/controlling-near-accounts/introduction",
        "tutorials/controlling-near-accounts/setup",
        "tutorials/controlling-near-accounts/transfer",
      ]
    }
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
    "tools/near-api",
    "tools/sdk",
    "tools/near-cli",
    "tools/wallet-selector",
    'tools/clear-state',
    {
      "type": "html",
      "value": "<hr/>"
    },
    {
      "type": "html",
      "value": "<span class='menu__link'><b><small> Data Tools </small></b></span>"
    },
    "tools/explorer",
    {
      "type": "category",
      "label": "Data APIs",
      "items": [
        'tools/ecosystem-apis/fastnear',
        'tools/ecosystem-apis/nearblocks',
        'tools/ecosystem-apis/pikespeak',
      ]
    },
    "tools/indexing",
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
      "label": "Testnet Faucet",
      "href": "https://near-faucet.io/"
    },
    {
      "type": "link",
      "label": "Developer Portal",
      "href": "https://dev.near.org/"
    },
    {
      "type": "link",
      "label": "NEAR Catalog",
      "href": "https://app.nearcatalog.xyz/"
    },
    {
      "type": "link",
      "label": "Keypom",
      "href": "https://keypom.xyz/"
    },
    {
      "type": "link",
      "label": "Remix IDE Plugin",
      "href": "https://docs.welldonestudio.io/code/getting-started"
    },
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
