import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-CN/search',
    component: ComponentCreator('/zh-CN/search', '5cd'),
    exact: true
  },
  {
    path: '/zh-CN/',
    component: ComponentCreator('/zh-CN/', 'ae2'),
    routes: [
      {
        path: '/zh-CN/',
        component: ComponentCreator('/zh-CN/', '476'),
        routes: [
          {
            path: '/zh-CN/',
            component: ComponentCreator('/zh-CN/', 'e25'),
            routes: [
              {
                path: '/zh-CN/',
                component: ComponentCreator('/zh-CN/', '251'),
                exact: true
              },
              {
                path: '/zh-CN/abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/abstraction/chain-signatures', '6bd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/abstraction/chain-signatures/wallet',
                component: ComponentCreator('/zh-CN/abstraction/chain-signatures/wallet', '424'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/abstraction/data-availability',
                component: ComponentCreator('/zh-CN/abstraction/data-availability', '41a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/abstraction/what-is',
                component: ComponentCreator('/zh-CN/abstraction/what-is', 'a5a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/api/rpc/access-keys',
                component: ComponentCreator('/zh-CN/api/rpc/access-keys', 'bdc'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/block-chunk',
                component: ComponentCreator('/zh-CN/api/rpc/block-chunk', '03c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/contracts',
                component: ComponentCreator('/zh-CN/api/rpc/contracts', 'd08'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/gas',
                component: ComponentCreator('/zh-CN/api/rpc/gas', '4a2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/introduction',
                component: ComponentCreator('/zh-CN/api/rpc/introduction', '268'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/maintenance-windows',
                component: ComponentCreator('/zh-CN/api/rpc/maintenance-windows', '9f1'),
                exact: true
              },
              {
                path: '/zh-CN/api/rpc/network',
                component: ComponentCreator('/zh-CN/api/rpc/network', '753'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/protocol',
                component: ComponentCreator('/zh-CN/api/rpc/protocol', 'dc2'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/providers',
                component: ComponentCreator('/zh-CN/api/rpc/providers', '379'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/setup',
                component: ComponentCreator('/zh-CN/api/rpc/setup', '3ff'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/transactions',
                component: ComponentCreator('/zh-CN/api/rpc/transactions', '20b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/bos/api/builtin-components',
                component: ComponentCreator('/zh-CN/bos/api/builtin-components', '80b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/near',
                component: ComponentCreator('/zh-CN/bos/api/near', '5c3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/notifications',
                component: ComponentCreator('/zh-CN/bos/api/notifications', 'c41'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/primitives',
                component: ComponentCreator('/zh-CN/bos/api/primitives', '5a1'),
                exact: true
              },
              {
                path: '/zh-CN/bos/api/social',
                component: ComponentCreator('/zh-CN/bos/api/social', 'be7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/state',
                component: ComponentCreator('/zh-CN/bos/api/state', 'c26'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/web-methods',
                component: ComponentCreator('/zh-CN/bos/api/web-methods', '896'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/community/indexers',
                component: ComponentCreator('/zh-CN/bos/community/indexers', '558'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/dev/bos-loader',
                component: ComponentCreator('/zh-CN/bos/dev/bos-loader', '24e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/dev/intro',
                component: ComponentCreator('/zh-CN/bos/dev/intro', '545'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/dev/vscode',
                component: ComponentCreator('/zh-CN/bos/dev/vscode', 'e0b'),
                exact: true,
                sidebar: "integrate"
              },
              {
                path: '/zh-CN/bos/overview',
                component: ComponentCreator('/zh-CN/bos/overview', '801'),
                exact: true
              },
              {
                path: '/zh-CN/bos/queryapi/best-practices',
                component: ComponentCreator('/zh-CN/bos/queryapi/best-practices', 'b45'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/big-query',
                component: ComponentCreator('/zh-CN/bos/queryapi/big-query', '6df'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/bos-components',
                component: ComponentCreator('/zh-CN/bos/queryapi/bos-components', 'a6a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/context-object',
                component: ComponentCreator('/zh-CN/bos/queryapi/context-object', 'f20'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/how-it-works',
                component: ComponentCreator('/zh-CN/bos/queryapi/how-it-works', 'c3b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/index-functions',
                component: ComponentCreator('/zh-CN/bos/queryapi/index-functions', '848'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/intro',
                component: ComponentCreator('/zh-CN/bos/queryapi/intro', '6ae'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/migrate-from-near-lake',
                component: ComponentCreator('/zh-CN/bos/queryapi/migrate-from-near-lake', '7ab'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/query-data',
                component: ComponentCreator('/zh-CN/bos/queryapi/query-data', '37b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/bos-gateway',
                component: ComponentCreator('/zh-CN/bos/tutorial/bos-gateway', '70c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/ds-components',
                component: ComponentCreator('/zh-CN/bos/tutorial/ds-components', '3d4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/ethers-js',
                component: ComponentCreator('/zh-CN/bos/tutorial/ethers-js', 'a54'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/ethers-js-best-practices',
                component: ComponentCreator('/zh-CN/bos/tutorial/ethers-js-best-practices', 'eed'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/feed-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/feed-indexer', '0bd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/hype-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/hype-indexer', '93b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/nft-indexer', 'fc7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/posts-indexer', '67e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/interaction',
                component: ComponentCreator('/zh-CN/bos/tutorial/interaction', 'a4c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/lido',
                component: ComponentCreator('/zh-CN/bos/tutorial/lido', 'aa7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/push-notifications',
                component: ComponentCreator('/zh-CN/bos/tutorial/push-notifications', '286'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/queryapi-websockets',
                component: ComponentCreator('/zh-CN/bos/tutorial/queryapi-websockets', '2b2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/quickstart',
                component: ComponentCreator('/zh-CN/bos/tutorial/quickstart', '9cc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/using-iframes',
                component: ComponentCreator('/zh-CN/bos/tutorial/using-iframes', 'a8f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/concepts/abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/concepts/abstraction/chain-signatures', 'edb'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/introduction',
                component: ComponentCreator('/zh-CN/concepts/abstraction/introduction', '268'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/meta-transactions',
                component: ComponentCreator('/zh-CN/concepts/abstraction/meta-transactions', '7d5'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/mpc',
                component: ComponentCreator('/zh-CN/concepts/abstraction/mpc', '8eb'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/abstraction/relayers',
                component: ComponentCreator('/zh-CN/concepts/abstraction/relayers', 'a88'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/signatures/use-cases',
                component: ComponentCreator('/zh-CN/concepts/abstraction/signatures/use-cases', '98d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/indexers',
                component: ComponentCreator('/zh-CN/concepts/advanced/indexers', '884'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-indexer-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-indexer-framework', 'c80'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-lake-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-lake-framework', '40b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/specification',
                component: ComponentCreator('/zh-CN/concepts/advanced/specification', 'a4c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/vm',
                component: ComponentCreator('/zh-CN/concepts/advanced/vm', 'd83'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/epoch',
                component: ComponentCreator('/zh-CN/concepts/basics/epoch', '590'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/networks',
                component: ComponentCreator('/zh-CN/concepts/basics/networks', '126'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/overview',
                component: ComponentCreator('/zh-CN/concepts/basics/overview', '257'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/protocol',
                component: ComponentCreator('/zh-CN/concepts/basics/protocol', '510'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/runtime',
                component: ComponentCreator('/zh-CN/concepts/basics/runtime', '7e4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/technical_stuff',
                component: ComponentCreator('/zh-CN/concepts/basics/technical_stuff', 'b18'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/token-loss',
                component: ComponentCreator('/zh-CN/concepts/basics/token-loss', '7dc'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/tokens',
                component: ComponentCreator('/zh-CN/concepts/basics/tokens', '550'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/validators',
                component: ComponentCreator('/zh-CN/concepts/basics/validators', 'a18'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/data-storage',
                component: ComponentCreator('/zh-CN/concepts/data-flow/data-storage', '391'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/near-data-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/near-data-flow', 'a30'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/token-transfer-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/token-transfer-flow', 'c57'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/access-keys',
                component: ComponentCreator('/zh-CN/concepts/protocol/access-keys', '582'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/account-id',
                component: ComponentCreator('/zh-CN/concepts/protocol/account-id', 'acb'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/account-model',
                component: ComponentCreator('/zh-CN/concepts/protocol/account-model', 'fed'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/gas',
                component: ComponentCreator('/zh-CN/concepts/protocol/gas', '8f8'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/smartcontract',
                component: ComponentCreator('/zh-CN/concepts/protocol/smartcontract', 'aa3'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-anatomy',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-anatomy', '91e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-execution',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-execution', 'af7'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transactions',
                component: ComponentCreator('/zh-CN/concepts/protocol/transactions', 'eed'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/data-storage',
                component: ComponentCreator('/zh-CN/concepts/storage/data-storage', '7e4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-solutions',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-solutions', '8ea'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-staking',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-staking', 'f98'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/basics',
                component: ComponentCreator('/zh-CN/concepts/web3/basics', 'ef9'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/economics',
                component: ComponentCreator('/zh-CN/concepts/web3/economics', '863'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/intro',
                component: ComponentCreator('/zh-CN/concepts/web3/intro', '015'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/near',
                component: ComponentCreator('/zh-CN/concepts/web3/near', 'f7e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/nfts',
                component: ComponentCreator('/zh-CN/concepts/web3/nfts', '1d6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/welcome',
                component: ComponentCreator('/zh-CN/concepts/welcome', '37e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/develop/contracts/actions',
                component: ComponentCreator('/zh-CN/develop/contracts/actions', 'ef4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/anatomy',
                component: ComponentCreator('/zh-CN/develop/contracts/anatomy', '496'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/basics',
                component: ComponentCreator('/zh-CN/develop/contracts/basics', '348'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/crosscontract',
                component: ComponentCreator('/zh-CN/develop/contracts/crosscontract', 'd6d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/environment/',
                component: ComponentCreator('/zh-CN/develop/contracts/environment/', 'e28'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/introduction',
                component: ComponentCreator('/zh-CN/develop/contracts/introduction', 'a58'),
                exact: true
              },
              {
                path: '/zh-CN/develop/contracts/quickstart',
                component: ComponentCreator('/zh-CN/develop/contracts/quickstart', '59c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/bounty',
                component: ComponentCreator('/zh-CN/develop/contracts/security/bounty', '9cb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/callbacks',
                component: ComponentCreator('/zh-CN/develop/contracts/security/callbacks', 'c22'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/checklist',
                component: ComponentCreator('/zh-CN/develop/contracts/security/checklist', '932'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/frontrunning',
                component: ComponentCreator('/zh-CN/develop/contracts/security/frontrunning', '05a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/one-yocto',
                component: ComponentCreator('/zh-CN/develop/contracts/security/one-yocto', '21a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/random',
                component: ComponentCreator('/zh-CN/develop/contracts/security/random', '198'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/reentrancy',
                component: ComponentCreator('/zh-CN/develop/contracts/security/reentrancy', 'ece'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/storage',
                component: ComponentCreator('/zh-CN/develop/contracts/security/storage', '7a0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/sybil',
                component: ComponentCreator('/zh-CN/develop/contracts/security/sybil', '572'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/welcome',
                component: ComponentCreator('/zh-CN/develop/contracts/security/welcome', '985'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/serialization',
                component: ComponentCreator('/zh-CN/develop/contracts/serialization', 'acc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/storage',
                component: ComponentCreator('/zh-CN/develop/contracts/storage', 'a65'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/welcome',
                component: ComponentCreator('/zh-CN/develop/contracts/welcome', '856'),
                exact: true
              },
              {
                path: '/zh-CN/develop/contracts/whatisacontract',
                component: ComponentCreator('/zh-CN/develop/contracts/whatisacontract', '2ff'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/deploy',
                component: ComponentCreator('/zh-CN/develop/deploy', '7ce'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/github-overview',
                component: ComponentCreator('/zh-CN/develop/github-overview', '45b'),
                exact: true
              },
              {
                path: '/zh-CN/develop/integrate/backend-login',
                component: ComponentCreator('/zh-CN/develop/integrate/backend-login', '36b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/frontend',
                component: ComponentCreator('/zh-CN/develop/integrate/frontend', 'bd5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/frontend-components',
                component: ComponentCreator('/zh-CN/develop/integrate/frontend-components', '90c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/quickstart-frontend',
                component: ComponentCreator('/zh-CN/develop/integrate/quickstart-frontend', '92d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/rpc',
                component: ComponentCreator('/zh-CN/develop/integrate/rpc', '144'),
                exact: true
              },
              {
                path: '/zh-CN/develop/integrate/welcome',
                component: ComponentCreator('/zh-CN/develop/integrate/welcome', '705'),
                exact: true,
                sidebar: "integrate"
              },
              {
                path: '/zh-CN/develop/lake/primitives',
                component: ComponentCreator('/zh-CN/develop/lake/primitives', 'd44'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/develop/lake/structures/block',
                component: ComponentCreator('/zh-CN/develop/lake/structures/block', '764'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/chunk',
                component: ComponentCreator('/zh-CN/develop/lake/structures/chunk', '8b9'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/execution-outcome',
                component: ComponentCreator('/zh-CN/develop/lake/structures/execution-outcome', 'cf3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/receipt',
                component: ComponentCreator('/zh-CN/develop/lake/structures/receipt', 'a8e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/shard',
                component: ComponentCreator('/zh-CN/develop/lake/structures/shard', 'b60'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/state-change',
                component: ComponentCreator('/zh-CN/develop/lake/structures/state-change', 'f3a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/toc',
                component: ComponentCreator('/zh-CN/develop/lake/structures/toc', 'b4a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/transaction',
                component: ComponentCreator('/zh-CN/develop/lake/structures/transaction', 'd4f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lock',
                component: ComponentCreator('/zh-CN/develop/lock', '5d0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/monitor',
                component: ComponentCreator('/zh-CN/develop/monitor', 'ed8'),
                exact: true
              },
              {
                path: '/zh-CN/develop/prerequisites',
                component: ComponentCreator('/zh-CN/develop/prerequisites', '527'),
                exact: true
              },
              {
                path: '/zh-CN/develop/quickstart-guide',
                component: ComponentCreator('/zh-CN/develop/quickstart-guide', '528'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relayers/build-relayer',
                component: ComponentCreator('/zh-CN/develop/relayers/build-relayer', '309'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relayers/gas-station',
                component: ComponentCreator('/zh-CN/develop/relayers/gas-station', 'b0b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relayers/multichain-server',
                component: ComponentCreator('/zh-CN/develop/relayers/multichain-server', '251'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relayers/relayer-gas-example',
                component: ComponentCreator('/zh-CN/develop/relayers/relayer-gas-example', '70a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relevant-contracts/dao',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/dao', '953'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/ft',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/ft', '965'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/nft',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/nft', 'aef'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/oracles',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/oracles', '253'),
                exact: true
              },
              {
                path: '/zh-CN/develop/testing/integration-test',
                component: ComponentCreator('/zh-CN/develop/testing/integration-test', 'be3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/introduction',
                component: ComponentCreator('/zh-CN/develop/testing/introduction', 'bb6'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/kurtosis-localnet',
                component: ComponentCreator('/zh-CN/develop/testing/kurtosis-localnet', 'a89'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/unit-test',
                component: ComponentCreator('/zh-CN/develop/testing/unit-test', '368'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/upgrade',
                component: ComponentCreator('/zh-CN/develop/upgrade', 'e25'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/web3-apps/whatareweb3apps',
                component: ComponentCreator('/zh-CN/develop/web3-apps/whatareweb3apps', '7c4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/welcome',
                component: ComponentCreator('/zh-CN/develop/welcome', 'ac8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/whataredatasolutions',
                component: ComponentCreator('/zh-CN/develop/whataredatasolutions', '296'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/help',
                component: ComponentCreator('/zh-CN/help', 'c80'),
                exact: true
              },
              {
                path: '/zh-CN/integrator/accounts',
                component: ComponentCreator('/zh-CN/integrator/accounts', 'd43'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/balance-changes',
                component: ComponentCreator('/zh-CN/integrator/balance-changes', '1eb'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/create-transactions',
                component: ComponentCreator('/zh-CN/integrator/create-transactions', 'f5a'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/error-implementation',
                component: ComponentCreator('/zh-CN/integrator/errors/error-implementation', '9bf'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/introduction',
                component: ComponentCreator('/zh-CN/integrator/errors/introduction', 'aec'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/token-loss',
                component: ComponentCreator('/zh-CN/integrator/errors/token-loss', 'e86'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/exchange-integration',
                component: ComponentCreator('/zh-CN/integrator/exchange-integration', '5f6'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/faq',
                component: ComponentCreator('/zh-CN/integrator/faq', '94f'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/fungible-tokens',
                component: ComponentCreator('/zh-CN/integrator/fungible-tokens', '8ff'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/implicit-accounts',
                component: ComponentCreator('/zh-CN/integrator/implicit-accounts', '211'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/pagoda/alerts/intro',
                component: ComponentCreator('/zh-CN/pagoda/alerts/intro', '5a7'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/setup',
                component: ComponentCreator('/zh-CN/pagoda/alerts/setup', '651'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/webhooks',
                component: ComponentCreator('/zh-CN/pagoda/alerts/webhooks', '0d3'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/api',
                component: ComponentCreator('/zh-CN/pagoda/rpc/api', 'c2c'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/get-keys',
                component: ComponentCreator('/zh-CN/pagoda/rpc/get-keys', '2ae'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/intro',
                component: ComponentCreator('/zh-CN/pagoda/rpc/intro', '21b'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/setup',
                component: ComponentCreator('/zh-CN/pagoda/rpc/setup', '87d'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/stats',
                component: ComponentCreator('/zh-CN/pagoda/rpc/stats', '28e'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/primitives/dao',
                component: ComponentCreator('/zh-CN/primitives/dao', '4c7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/dao/bos/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/create-dao', '54f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/create-proposal', '3d8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/get-dao-list', '65f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/get-proposal-list', '47c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/vote-for-proposal', '051'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/create-dao', 'e92'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/create-proposal', '601'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/get-dao-list', 'ecd'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/get-proposal-list', '6f4'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/vote-for-proposal', '7a8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/create-dao', '123'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/create-proposal', 'ae3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/vote-for-proposal', 'f45'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/create-dao', 'bad'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/create-proposal', '2a3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/get-dao-list', '4ce'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/get-proposal-list', '017'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/vote-for-proposal', '652'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex',
                component: ComponentCreator('/zh-CN/primitives/dex', 'c43'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-deposit-balances', '367'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-pools', '310'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-price',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-price', '04e'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/swap', 'ad8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/get-deposit-balances', '190'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/get-pools', 'e16'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/swap', '9aa'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/get-deposit-balances', '3be'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/get-pools', '715'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/swap', '774'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-deposit-balances', '6e4'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-pools', 'c2b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-price',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-price', 'a4b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/swap', '987'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft',
                component: ComponentCreator('/zh-CN/primitives/ft', 'ac1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/ft/bos/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/attach-to-call', '496'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/check-balance', '7f8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/create',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/create', '4c9'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/get-metadata', '40d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/register',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/register', '383'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/send',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/send', '65c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/attach-to-call', 'e38'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/check-balance', '95a'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/create',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/create', 'd38'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/get-metadata', '169'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/register',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/register', '6f2'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/send',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/send', '953'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/smart-contract/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/smart-contract/attach-to-call', '9f5'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/smart-contract/send',
                component: ComponentCreator('/zh-CN/primitives/ft/smart-contract/send', '1be'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/attach-to-call', '447'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/check-balance', '24c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/create',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/create', 'b31'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/get-metadata', 'fe0'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/register',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/register', '7e3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/send',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/send', '577'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop', '451'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-ft-drop', 'f5f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-function-call-drop', '197'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-nft-drop', '7f8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/get-drop-id', 'acb'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/get-key-pairs', '3ac'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/simple-drop', '146'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/transfer-ft', '75b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/transfer-nft', 'c59'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-ft-drop', 'ff7'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-function-call-drop', '651'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-nft-drop', 'ac0'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/get-drop-id', '209'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/get-key-pairs', '2ad'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/simple-drop', '5c1'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/transfer-ft', '259'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/transfer-nft', '342'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-ft-drop', '93b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-function-call-drop', 'c19'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-nft-drop', 'bb4'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/get-drop-id', 'dd6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/get-key-pairs', '97f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/simple-drop', '604'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/transfer-ft', '781'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/transfer-nft', 'b21'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft',
                component: ComponentCreator('/zh-CN/primitives/nft', 'b66'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/nft/bos/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/buy', '4c9'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/list-for-sale', 'c61'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/mint', 'b77'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/query',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/query', '8fa'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/transfer', '2c3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/buy', '012'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/list-for-sale', 'b1c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/mint', '997'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/query',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/query', '2e2'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/transfer', 'ee3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/buy', 'f79'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/mint', '834'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/query',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/query', '979'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/transfer', '66f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/buy', 'd68'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/list-for-sale', 'd32'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/mint', '8cd'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/query',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/query', 'b02'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/transfer', '97d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/oracles',
                component: ComponentCreator('/zh-CN/primitives/oracles', 'f83'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/whatareprimitives',
                component: ComponentCreator('/zh-CN/primitives/whatareprimitives', '731'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/sdk/js/building/basics',
                component: ComponentCreator('/zh-CN/sdk/js/building/basics', 'd53'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/js/building/prototyping', '817'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/js/building/reproducible-builds', '48e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/cli/',
                component: ComponentCreator('/zh-CN/sdk/js/cli/', '650'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/payable-methods', '0dd'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/private-methods', 'ca9'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/public-methods', 'd76'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/collections', '25e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/near-bindgen', '547'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/nesting',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/nesting', 'fa1'),
                exact: true
              },
              {
                path: '/zh-CN/sdk/js/cross-contract/callbacks',
                component: ComponentCreator('/zh-CN/sdk/js/cross-contract/callbacks', '160'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/get-started',
                component: ComponentCreator('/zh-CN/sdk/js/get-started', '68e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/introduction',
                component: ComponentCreator('/zh-CN/sdk/js/introduction', '90d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/js/promises/create-account', 'eec'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/js/promises/deploy-contract', '62a'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/js/promises/intro', 'a2e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/js/promises/token-tx', '04f'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/integration-tests', '352'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/unit-tests', '57e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/best-practices',
                component: ComponentCreator('/zh-CN/sdk/rust/best-practices', '0b8'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/basics',
                component: ComponentCreator('/zh-CN/sdk/rust/building/basics', 'b5e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/post-processing',
                component: ComponentCreator('/zh-CN/sdk/rust/building/post-processing', '7d6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/rust/building/prototyping', '7e3'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/rust/building/reproducible-builds', 'e86'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/contract-mutability',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/contract-mutability', '909'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/payable-methods', 'f2b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/private-methods', 'fdb'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/public-methods', '7ef'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/serialization-interface',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/serialization-interface', 'ee7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-size',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-size', '40e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/collections', '59c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/near-bindgen', 'c76'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/nesting',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/nesting', '1b0'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/cross-contract/callbacks',
                component: ComponentCreator('/zh-CN/sdk/rust/cross-contract/callbacks', '12a'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/get-started',
                component: ComponentCreator('/zh-CN/sdk/rust/get-started', 'c02'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/introduction',
                component: ComponentCreator('/zh-CN/sdk/rust/introduction', 'c59'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/create-account', '23b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/deploy-contract', '867'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/intro', 'd9f'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/token-tx', 'b49'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/integration-tests', '316'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/unit-tests', '725'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/welcome',
                component: ComponentCreator('/zh-CN/sdk/welcome', 'ac6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/social/contract',
                component: ComponentCreator('/zh-CN/social/contract', 'a3c'),
                exact: true
              },
              {
                path: '/zh-CN/social/intro',
                component: ComponentCreator('/zh-CN/social/intro', '292'),
                exact: true
              },
              {
                path: '/zh-CN/social/standards',
                component: ComponentCreator('/zh-CN/social/standards', 'c5c'),
                exact: true
              },
              {
                path: '/zh-CN/social/tech',
                component: ComponentCreator('/zh-CN/social/tech', '3d2'),
                exact: true
              },
              {
                path: '/zh-CN/tools/explorer',
                component: ComponentCreator('/zh-CN/tools/explorer', '958'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/fastauth-sdk',
                component: ComponentCreator('/zh-CN/tools/fastauth-sdk', '716'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/tools/fastnear-api',
                component: ComponentCreator('/zh-CN/tools/fastnear-api', 'fa1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/indexer-for-explorer',
                component: ComponentCreator('/zh-CN/tools/indexer-for-explorer', 'e38'),
                exact: true
              },
              {
                path: '/zh-CN/tools/indexing',
                component: ComponentCreator('/zh-CN/tools/indexing', 'd4b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/account',
                component: ComponentCreator('/zh-CN/tools/near-api-js/account', '914'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/contract',
                component: ComponentCreator('/zh-CN/tools/near-api-js/contract', '58c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/cookbook',
                component: ComponentCreator('/zh-CN/tools/near-api-js/cookbook', '251'),
                exact: true
              },
              {
                path: '/zh-CN/tools/near-api-js/faq',
                component: ComponentCreator('/zh-CN/tools/near-api-js/faq', '5fd'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/quick-reference',
                component: ComponentCreator('/zh-CN/tools/near-api-js/quick-reference', 'f42'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/utils',
                component: ComponentCreator('/zh-CN/tools/near-api-js/utils', '6d3'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/wallet',
                component: ComponentCreator('/zh-CN/tools/near-api-js/wallet', 'c66'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli',
                component: ComponentCreator('/zh-CN/tools/near-cli', 'ba2'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli-rs',
                component: ComponentCreator('/zh-CN/tools/near-cli-rs', 'dd4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-lake',
                component: ComponentCreator('/zh-CN/tools/near-lake', 'd76'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/tools/realtime',
                component: ComponentCreator('/zh-CN/tools/realtime', '33e'),
                exact: true
              },
              {
                path: '/zh-CN/tools/remix-ide-plugin',
                component: ComponentCreator('/zh-CN/tools/remix-ide-plugin', '551'),
                exact: true
              },
              {
                path: '/zh-CN/tools/usecases',
                component: ComponentCreator('/zh-CN/tools/usecases', '596'),
                exact: true
              },
              {
                path: '/zh-CN/tools/wallet-selector',
                component: ComponentCreator('/zh-CN/tools/wallet-selector', '13b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/welcome',
                component: ComponentCreator('/zh-CN/tools/welcome', '948'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/add-functions-call',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/add-functions-call', '64b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests', 'f94'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/overview', 'd11'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/set-up-skeleton',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/set-up-skeleton', 'b8e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/simple-frontend',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/simple-frontend', '175'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/actions',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/actions', '584'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle', '5d6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/collections',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/collections', '606'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in', '25e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in-implementation',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in-implementation', 'd43'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/overview', '75f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/structs-enums',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/structs-enums', 'f55'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/access-key-solution',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/access-key-solution', 'ba8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/base64vecu8',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/base64vecu8', '932'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls', 'ec7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/linkdrop',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/linkdrop', '4f1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/overview', '84b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase', 'aef'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/advanced-xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/advanced-xcc', '88c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/blockvote-js',
                component: ComponentCreator('/zh-CN/tutorials/examples/blockvote-js', '7bc'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/coin-flip',
                component: ComponentCreator('/zh-CN/tutorials/examples/coin-flip', '2a9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/count-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/count-near', '572'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/donation',
                component: ComponentCreator('/zh-CN/tutorials/examples/donation', '170'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/escrow',
                component: ComponentCreator('/zh-CN/tutorials/examples/escrow', '5a7'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/factory',
                component: ComponentCreator('/zh-CN/tutorials/examples/factory', 'a56'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/frontend-multiple-contracts',
                component: ComponentCreator('/zh-CN/tutorials/examples/frontend-multiple-contracts', 'cc7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/guest-book',
                component: ComponentCreator('/zh-CN/tutorials/examples/guest-book', 'b59'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/hello-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/hello-near', 'd49'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/update-contract-migrate-state',
                component: ComponentCreator('/zh-CN/tutorials/examples/update-contract-migrate-state', '0ed'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/xcc', '486'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/circulating-supply',
                component: ComponentCreator('/zh-CN/tutorials/fts/circulating-supply', 'ec8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/defining-a-token',
                component: ComponentCreator('/zh-CN/tutorials/fts/defining-a-token', '172'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/fts/introduction', '1c8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/fts/marketplace', '56b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/fts/predeployed-contract', 'f35'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/registering-accounts',
                component: ComponentCreator('/zh-CN/tutorials/fts/registering-accounts', '36e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/simple-fts',
                component: ComponentCreator('/zh-CN/tutorials/fts/simple-fts', '03e'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/fts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/fts/skeleton', '48d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/transfers',
                component: ComponentCreator('/zh-CN/tutorials/fts/transfers', '643'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/credentials',
                component: ComponentCreator('/zh-CN/tutorials/indexer/credentials', '440'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/js-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/js-lake-indexer', '55c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/lake-start-options',
                component: ComponentCreator('/zh-CN/tutorials/indexer/lake-start-options', '5c7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/migrating-to-near-lake-framework',
                component: ComponentCreator('/zh-CN/tutorials/indexer/migrating-to-near-lake-framework', '24d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/near-lake-state-changes-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/near-lake-state-changes-indexer', '311'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/nft-indexer', '7db'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/python-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/python-lake-indexer', '48d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/python-nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/python-nft-indexer', '518'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/run-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/run-lake-indexer', 'aba'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/approvals', 'f75'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/core', '667'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/enumeration', '840'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/events', 'b6d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/introduction', '00b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/approvals', 'b0a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/core', '545'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/enumeration', 'b44'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/events', '8e4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/introduction', '708'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/marketplace', '5e0'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/minting', 'e35'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/predeployed-contract', '522'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/royalty',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/royalty', 'b95'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/skeleton', '412'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/upgrade-contract', 'be5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/marketplace', '4aa'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minecraft-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minecraft-nfts', '1ae'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting', 'af8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nft-frontend',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nft-frontend', '68a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nfts', 'fb7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/predeployed-contract', '303'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/royalty',
                component: ComponentCreator('/zh-CN/tutorials/nfts/royalty', '012'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/series',
                component: ComponentCreator('/zh-CN/tutorials/nfts/series', '63b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/skeleton', '6fb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/upgrade-contract', '004'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/welcome',
                component: ComponentCreator('/zh-CN/tutorials/welcome', '59e'),
                exact: true,
                sidebar: "tutorials"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
