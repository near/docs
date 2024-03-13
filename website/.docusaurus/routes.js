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
    component: ComponentCreator('/zh-CN/', '3cd'),
    routes: [
      {
        path: '/zh-CN/',
        component: ComponentCreator('/zh-CN/', '79f'),
        routes: [
          {
            path: '/zh-CN/',
            component: ComponentCreator('/zh-CN/', '7ce'),
            routes: [
              {
                path: '/zh-CN/abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/abstraction/chain-signatures', 'b84'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/abstraction/chain-signatures/wallet',
                component: ComponentCreator('/zh-CN/abstraction/chain-signatures/wallet', '225'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/abstraction/what-is',
                component: ComponentCreator('/zh-CN/abstraction/what-is', 'b83'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/api/rpc/access-keys',
                component: ComponentCreator('/zh-CN/api/rpc/access-keys', 'c54'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/block-chunk',
                component: ComponentCreator('/zh-CN/api/rpc/block-chunk', 'd6e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/contracts',
                component: ComponentCreator('/zh-CN/api/rpc/contracts', '87f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/gas',
                component: ComponentCreator('/zh-CN/api/rpc/gas', 'd66'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/introduction',
                component: ComponentCreator('/zh-CN/api/rpc/introduction', 'ba8'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/maintenance-windows',
                component: ComponentCreator('/zh-CN/api/rpc/maintenance-windows', '582'),
                exact: true
              },
              {
                path: '/zh-CN/api/rpc/network',
                component: ComponentCreator('/zh-CN/api/rpc/network', 'd39'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/protocol',
                component: ComponentCreator('/zh-CN/api/rpc/protocol', 'e1a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/providers',
                component: ComponentCreator('/zh-CN/api/rpc/providers', '077'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/setup',
                component: ComponentCreator('/zh-CN/api/rpc/setup', '619'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/transactions',
                component: ComponentCreator('/zh-CN/api/rpc/transactions', 'aed'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/bos/api/builtin-components',
                component: ComponentCreator('/zh-CN/bos/api/builtin-components', '009'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/near',
                component: ComponentCreator('/zh-CN/bos/api/near', '19c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/notifications',
                component: ComponentCreator('/zh-CN/bos/api/notifications', 'efe'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/primitives',
                component: ComponentCreator('/zh-CN/bos/api/primitives', '952'),
                exact: true
              },
              {
                path: '/zh-CN/bos/api/social',
                component: ComponentCreator('/zh-CN/bos/api/social', '773'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/state',
                component: ComponentCreator('/zh-CN/bos/api/state', '50c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/api/web-methods',
                component: ComponentCreator('/zh-CN/bos/api/web-methods', '3ca'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/community/indexers',
                component: ComponentCreator('/zh-CN/bos/community/indexers', '13d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/dev/bos-loader',
                component: ComponentCreator('/zh-CN/bos/dev/bos-loader', '772'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/dev/intro',
                component: ComponentCreator('/zh-CN/bos/dev/intro', '474'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/dev/vscode',
                component: ComponentCreator('/zh-CN/bos/dev/vscode', '870'),
                exact: true,
                sidebar: "integrate"
              },
              {
                path: '/zh-CN/bos/overview',
                component: ComponentCreator('/zh-CN/bos/overview', 'd7a'),
                exact: true
              },
              {
                path: '/zh-CN/bos/queryapi/best-practices',
                component: ComponentCreator('/zh-CN/bos/queryapi/best-practices', 'f06'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/big-query',
                component: ComponentCreator('/zh-CN/bos/queryapi/big-query', '0d2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/bos-components',
                component: ComponentCreator('/zh-CN/bos/queryapi/bos-components', '1a7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/context-object',
                component: ComponentCreator('/zh-CN/bos/queryapi/context-object', 'c20'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/how-it-works',
                component: ComponentCreator('/zh-CN/bos/queryapi/how-it-works', '134'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/index-functions',
                component: ComponentCreator('/zh-CN/bos/queryapi/index-functions', '249'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/intro',
                component: ComponentCreator('/zh-CN/bos/queryapi/intro', '074'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/migrate-from-near-lake',
                component: ComponentCreator('/zh-CN/bos/queryapi/migrate-from-near-lake', 'ec5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/queryapi/query-data',
                component: ComponentCreator('/zh-CN/bos/queryapi/query-data', '604'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/bos-gateway',
                component: ComponentCreator('/zh-CN/bos/tutorial/bos-gateway', 'f6c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/ds-components',
                component: ComponentCreator('/zh-CN/bos/tutorial/ds-components', 'aa0'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/ethers-js',
                component: ComponentCreator('/zh-CN/bos/tutorial/ethers-js', '76b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/ethers-js-best-practices',
                component: ComponentCreator('/zh-CN/bos/tutorial/ethers-js-best-practices', 'e65'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/feed-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/feed-indexer', 'd57'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/hype-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/hype-indexer', '496'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/nft-indexer', 'f36'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/zh-CN/bos/tutorial/indexer-tutorials/posts-indexer', '5d2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/interaction',
                component: ComponentCreator('/zh-CN/bos/tutorial/interaction', 'ac7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/lido',
                component: ComponentCreator('/zh-CN/bos/tutorial/lido', '3a9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/push-notifications',
                component: ComponentCreator('/zh-CN/bos/tutorial/push-notifications', '64a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/queryapi-websockets',
                component: ComponentCreator('/zh-CN/bos/tutorial/queryapi-websockets', '0f8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/bos/tutorial/quickstart',
                component: ComponentCreator('/zh-CN/bos/tutorial/quickstart', '750'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/bos/tutorial/using-iframes',
                component: ComponentCreator('/zh-CN/bos/tutorial/using-iframes', '7be'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/concepts/abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/concepts/abstraction/chain-signatures', '219'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/introduction',
                component: ComponentCreator('/zh-CN/concepts/abstraction/introduction', 'ddf'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/meta-transactions',
                component: ComponentCreator('/zh-CN/concepts/abstraction/meta-transactions', 'c5d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/mpc',
                component: ComponentCreator('/zh-CN/concepts/abstraction/mpc', '82b'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/abstraction/relayers',
                component: ComponentCreator('/zh-CN/concepts/abstraction/relayers', '4f7'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/signatures/use-cases',
                component: ComponentCreator('/zh-CN/concepts/abstraction/signatures/use-cases', '4fc'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/indexers',
                component: ComponentCreator('/zh-CN/concepts/advanced/indexers', '3d7'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-indexer-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-indexer-framework', '021'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-lake-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-lake-framework', '477'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/specification',
                component: ComponentCreator('/zh-CN/concepts/advanced/specification', '637'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/vm',
                component: ComponentCreator('/zh-CN/concepts/advanced/vm', '08f'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/accounts/access-keys',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/access-keys', '14e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/accounts/account-id',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/account-id', 'a7b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/accounts/creating-accounts',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/creating-accounts', '37b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/accounts/model',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/model', 'ebf'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/accounts/smartcontract',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/smartcontract', '84c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/accounts/state',
                component: ComponentCreator('/zh-CN/concepts/basics/accounts/state', '10b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/actors',
                component: ComponentCreator('/zh-CN/concepts/basics/actors', '806'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/epoch',
                component: ComponentCreator('/zh-CN/concepts/basics/epoch', '58b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/networks',
                component: ComponentCreator('/zh-CN/concepts/basics/networks', '0da'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/overview',
                component: ComponentCreator('/zh-CN/concepts/basics/overview', '6bd'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/protocol',
                component: ComponentCreator('/zh-CN/concepts/basics/protocol', '35c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/runtime',
                component: ComponentCreator('/zh-CN/concepts/basics/runtime', '0b3'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/technical_stuff',
                component: ComponentCreator('/zh-CN/concepts/basics/technical_stuff', 'ae3'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/basics/token-loss',
                component: ComponentCreator('/zh-CN/concepts/basics/token-loss', '46a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/tokens',
                component: ComponentCreator('/zh-CN/concepts/basics/tokens', '6ec'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/transactions/gas',
                component: ComponentCreator('/zh-CN/concepts/basics/transactions/gas', 'e2a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/transactions/gas-advanced',
                component: ComponentCreator('/zh-CN/concepts/basics/transactions/gas-advanced', '79c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/transactions/overview',
                component: ComponentCreator('/zh-CN/concepts/basics/transactions/overview', '9b0'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/validators',
                component: ComponentCreator('/zh-CN/concepts/basics/validators', 'da6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/data-storage',
                component: ComponentCreator('/zh-CN/concepts/data-flow/data-storage', '3de'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/near-data-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/near-data-flow', 'b23'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/token-transfer-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/token-transfer-flow', '9d4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/data-storage',
                component: ComponentCreator('/zh-CN/concepts/storage/data-storage', '745'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-solutions',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-solutions', 'e9d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-staking',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-staking', '01c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/basics',
                component: ComponentCreator('/zh-CN/concepts/web3/basics', '148'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/economics',
                component: ComponentCreator('/zh-CN/concepts/web3/economics', '9ea'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/intro',
                component: ComponentCreator('/zh-CN/concepts/web3/intro', '99c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/near',
                component: ComponentCreator('/zh-CN/concepts/web3/near', '478'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/nfts',
                component: ComponentCreator('/zh-CN/concepts/web3/nfts', '362'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/welcome',
                component: ComponentCreator('/zh-CN/concepts/welcome', 'ca0'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/data-availability/arbitrum',
                component: ComponentCreator('/zh-CN/data-availability/arbitrum', '7dd'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/blob-contract',
                component: ComponentCreator('/zh-CN/data-availability/blob-contract', '88c'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/cdk-integration',
                component: ComponentCreator('/zh-CN/data-availability/cdk-integration', '98d'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/integrations',
                component: ComponentCreator('/zh-CN/data-availability/integrations', '32a'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/light-client',
                component: ComponentCreator('/zh-CN/data-availability/light-client', '8ad'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/optimism',
                component: ComponentCreator('/zh-CN/data-availability/optimism', '308'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/rpc',
                component: ComponentCreator('/zh-CN/data-availability/rpc', '523'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/data-availability/welcome',
                component: ComponentCreator('/zh-CN/data-availability/welcome', '370'),
                exact: true,
                sidebar: "data-availability"
              },
              {
                path: '/zh-CN/develop/contracts/actions',
                component: ComponentCreator('/zh-CN/develop/contracts/actions', 'a20'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/anatomy',
                component: ComponentCreator('/zh-CN/develop/contracts/anatomy', 'e77'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/basics',
                component: ComponentCreator('/zh-CN/develop/contracts/basics', '0ae'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/crosscontract',
                component: ComponentCreator('/zh-CN/develop/contracts/crosscontract', 'd78'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/environment/',
                component: ComponentCreator('/zh-CN/develop/contracts/environment/', '127'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/introduction',
                component: ComponentCreator('/zh-CN/develop/contracts/introduction', '1d6'),
                exact: true
              },
              {
                path: '/zh-CN/develop/contracts/quickstart',
                component: ComponentCreator('/zh-CN/develop/contracts/quickstart', '3a1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/bounty',
                component: ComponentCreator('/zh-CN/develop/contracts/security/bounty', '480'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/callbacks',
                component: ComponentCreator('/zh-CN/develop/contracts/security/callbacks', 'ef0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/checklist',
                component: ComponentCreator('/zh-CN/develop/contracts/security/checklist', 'ec7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/frontrunning',
                component: ComponentCreator('/zh-CN/develop/contracts/security/frontrunning', 'cda'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/one-yocto',
                component: ComponentCreator('/zh-CN/develop/contracts/security/one-yocto', '5d2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/random',
                component: ComponentCreator('/zh-CN/develop/contracts/security/random', 'dfa'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/reentrancy',
                component: ComponentCreator('/zh-CN/develop/contracts/security/reentrancy', '1f8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/storage',
                component: ComponentCreator('/zh-CN/develop/contracts/security/storage', 'a20'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/sybil',
                component: ComponentCreator('/zh-CN/develop/contracts/security/sybil', '4c0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/security/welcome',
                component: ComponentCreator('/zh-CN/develop/contracts/security/welcome', 'f3b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/serialization',
                component: ComponentCreator('/zh-CN/develop/contracts/serialization', 'c17'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/storage',
                component: ComponentCreator('/zh-CN/develop/contracts/storage', '9df'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/contracts/welcome',
                component: ComponentCreator('/zh-CN/develop/contracts/welcome', '913'),
                exact: true
              },
              {
                path: '/zh-CN/develop/contracts/whatisacontract',
                component: ComponentCreator('/zh-CN/develop/contracts/whatisacontract', '562'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/deploy',
                component: ComponentCreator('/zh-CN/develop/deploy', 'dfe'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/github-overview',
                component: ComponentCreator('/zh-CN/develop/github-overview', '7f4'),
                exact: true
              },
              {
                path: '/zh-CN/develop/integrate/backend-login',
                component: ComponentCreator('/zh-CN/develop/integrate/backend-login', 'df7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/frontend',
                component: ComponentCreator('/zh-CN/develop/integrate/frontend', '086'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/frontend-components',
                component: ComponentCreator('/zh-CN/develop/integrate/frontend-components', 'd68'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/quickstart-frontend',
                component: ComponentCreator('/zh-CN/develop/integrate/quickstart-frontend', '13d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/integrate/rpc',
                component: ComponentCreator('/zh-CN/develop/integrate/rpc', '67d'),
                exact: true
              },
              {
                path: '/zh-CN/develop/integrate/welcome',
                component: ComponentCreator('/zh-CN/develop/integrate/welcome', '98a'),
                exact: true,
                sidebar: "integrate"
              },
              {
                path: '/zh-CN/develop/lake/primitives',
                component: ComponentCreator('/zh-CN/develop/lake/primitives', '676'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/develop/lake/structures/block',
                component: ComponentCreator('/zh-CN/develop/lake/structures/block', '232'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/chunk',
                component: ComponentCreator('/zh-CN/develop/lake/structures/chunk', '0eb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/execution-outcome',
                component: ComponentCreator('/zh-CN/develop/lake/structures/execution-outcome', 'b89'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/receipt',
                component: ComponentCreator('/zh-CN/develop/lake/structures/receipt', 'ddb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/shard',
                component: ComponentCreator('/zh-CN/develop/lake/structures/shard', '54c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/state-change',
                component: ComponentCreator('/zh-CN/develop/lake/structures/state-change', 'bcc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/toc',
                component: ComponentCreator('/zh-CN/develop/lake/structures/toc', '97d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lake/structures/transaction',
                component: ComponentCreator('/zh-CN/develop/lake/structures/transaction', '138'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/lock',
                component: ComponentCreator('/zh-CN/develop/lock', 'fae'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/monitor',
                component: ComponentCreator('/zh-CN/develop/monitor', '677'),
                exact: true
              },
              {
                path: '/zh-CN/develop/prerequisites',
                component: ComponentCreator('/zh-CN/develop/prerequisites', '481'),
                exact: true
              },
              {
                path: '/zh-CN/develop/quickstart-guide',
                component: ComponentCreator('/zh-CN/develop/quickstart-guide', '0de'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relayers/build-relayer',
                component: ComponentCreator('/zh-CN/develop/relayers/build-relayer', 'a6b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relayers/gas-station',
                component: ComponentCreator('/zh-CN/develop/relayers/gas-station', 'f29'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relayers/multichain-server',
                component: ComponentCreator('/zh-CN/develop/relayers/multichain-server', '1d2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/relevant-contracts/dao',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/dao', '177'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/ft',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/ft', 'b46'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/nft',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/nft', 'e8f'),
                exact: true
              },
              {
                path: '/zh-CN/develop/relevant-contracts/oracles',
                component: ComponentCreator('/zh-CN/develop/relevant-contracts/oracles', 'cf2'),
                exact: true
              },
              {
                path: '/zh-CN/develop/testing/integration-test',
                component: ComponentCreator('/zh-CN/develop/testing/integration-test', '726'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/introduction',
                component: ComponentCreator('/zh-CN/develop/testing/introduction', 'ccd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/kurtosis-localnet',
                component: ComponentCreator('/zh-CN/develop/testing/kurtosis-localnet', 'ac8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/testing/unit-test',
                component: ComponentCreator('/zh-CN/develop/testing/unit-test', '30c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/upgrade',
                component: ComponentCreator('/zh-CN/develop/upgrade', '1f0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/web3-apps/whatareweb3apps',
                component: ComponentCreator('/zh-CN/develop/web3-apps/whatareweb3apps', '15b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/welcome',
                component: ComponentCreator('/zh-CN/develop/welcome', 'b99'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/develop/whataredatasolutions',
                component: ComponentCreator('/zh-CN/develop/whataredatasolutions', 'e3f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/integrator/accounts',
                component: ComponentCreator('/zh-CN/integrator/accounts', '38d'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/balance-changes',
                component: ComponentCreator('/zh-CN/integrator/balance-changes', 'ec5'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/create-transactions',
                component: ComponentCreator('/zh-CN/integrator/create-transactions', '7a2'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/error-implementation',
                component: ComponentCreator('/zh-CN/integrator/errors/error-implementation', '608'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/introduction',
                component: ComponentCreator('/zh-CN/integrator/errors/introduction', 'e47'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/errors/token-loss',
                component: ComponentCreator('/zh-CN/integrator/errors/token-loss', '005'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/exchange-integration',
                component: ComponentCreator('/zh-CN/integrator/exchange-integration', 'bad'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/faq',
                component: ComponentCreator('/zh-CN/integrator/faq', 'a20'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/fungible-tokens',
                component: ComponentCreator('/zh-CN/integrator/fungible-tokens', '8b1'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrator/implicit-accounts',
                component: ComponentCreator('/zh-CN/integrator/implicit-accounts', 'd39'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/primitives/dao',
                component: ComponentCreator('/zh-CN/primitives/dao', '1a4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/dao/bos/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/create-dao', 'bc6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/create-proposal', '580'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/get-dao-list', 'b56'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/get-proposal-list', '821'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/bos/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/bos/vote-for-proposal', 'f52'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/create-dao', '937'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/create-proposal', 'efc'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/get-dao-list', '416'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/get-proposal-list', '171'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/near-cli/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/near-cli/vote-for-proposal', 'dcc'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/create-dao', '921'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/create-proposal', 'a1c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/smart-contract/vote-for-proposal', 'cee'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/create-dao',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/create-dao', 'f7d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/create-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/create-proposal', 'a3f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/get-dao-list',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/get-dao-list', '13f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/get-proposal-list',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/get-proposal-list', 'd17'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dao/web-app/vote-for-proposal',
                component: ComponentCreator('/zh-CN/primitives/dao/web-app/vote-for-proposal', 'd87'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex',
                component: ComponentCreator('/zh-CN/primitives/dex', 'c56'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-deposit-balances', '99e'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-pools', 'fa0'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/get-price',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/get-price', 'd20'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/bos/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/bos/swap', 'ab4'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/get-deposit-balances', '66f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/get-pools', '0ae'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/near-cli/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/near-cli/swap', '0ca'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/get-deposit-balances', '4bd'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/get-pools', 'd41'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/smart-contract/swap', '60b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-deposit-balances',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-deposit-balances', 'd4f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-pools',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-pools', '1aa'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/get-price',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/get-price', 'ff9'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/dex/web-app/swap',
                component: ComponentCreator('/zh-CN/primitives/dex/web-app/swap', '26a'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft',
                component: ComponentCreator('/zh-CN/primitives/ft', 'b66'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/ft/bos/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/attach-to-call', '020'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/check-balance', '67d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/create',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/create', 'b22'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/get-metadata', '693'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/register',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/register', '7e1'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/bos/send',
                component: ComponentCreator('/zh-CN/primitives/ft/bos/send', '037'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/attach-to-call', '611'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/check-balance', '9c6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/create',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/create', 'e66'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/get-metadata', '223'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/register',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/register', '686'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/near-cli/send',
                component: ComponentCreator('/zh-CN/primitives/ft/near-cli/send', 'e20'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/smart-contract/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/smart-contract/attach-to-call', '38c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/smart-contract/send',
                component: ComponentCreator('/zh-CN/primitives/ft/smart-contract/send', 'cd7'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/attach-to-call',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/attach-to-call', 'afe'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/check-balance',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/check-balance', '5f9'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/create',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/create', '116'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/get-metadata',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/get-metadata', '287'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/register',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/register', '66c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/ft/web-app/send',
                component: ComponentCreator('/zh-CN/primitives/ft/web-app/send', '4ae'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop', '051'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-ft-drop', 'c92'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-function-call-drop', 'ab2'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/create-nft-drop', 'b25'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/get-drop-id', '82f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/get-key-pairs', '796'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/simple-drop', '16b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/transfer-ft', '9ec'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/bos/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/bos/transfer-nft', 'a9a'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-ft-drop', 'e32'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-function-call-drop', '5f6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/create-nft-drop', '0d0'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/get-drop-id', 'b9c'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/get-key-pairs', 'e5f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/simple-drop', 'fe4'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/transfer-ft', 'cfe'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/near-cli/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/near-cli/transfer-nft', '658'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-ft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-ft-drop', '917'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-function-call-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-function-call-drop', '794'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/create-nft-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/create-nft-drop', 'dc8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/get-drop-id',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/get-drop-id', 'b17'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/get-key-pairs',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/get-key-pairs', 'eb1'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/simple-drop',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/simple-drop', 'c4b'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/transfer-ft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/transfer-ft', '59d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/linkdrop/web-app/transfer-nft',
                component: ComponentCreator('/zh-CN/primitives/linkdrop/web-app/transfer-nft', 'ab3'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft',
                component: ComponentCreator('/zh-CN/primitives/nft', 'ff4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/nft/bos/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/buy', 'bd6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/list-for-sale', 'e76'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/mint', 'a63'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/query',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/query', 'f4f'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/bos/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/bos/transfer', '3c8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/buy', '943'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/list-for-sale', '943'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/mint', 'a39'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/query',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/query', '1c2'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/near-cli/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/near-cli/transfer', '4a8'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/buy', 'c96'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/mint', '548'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/query',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/query', '573'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/smart-contract/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/smart-contract/transfer', '047'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/buy',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/buy', '493'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/list-for-sale',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/list-for-sale', '7cf'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/mint',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/mint', 'bc6'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/query',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/query', '491'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/nft/web-app/transfer',
                component: ComponentCreator('/zh-CN/primitives/nft/web-app/transfer', '24d'),
                exact: true
              },
              {
                path: '/zh-CN/primitives/oracles',
                component: ComponentCreator('/zh-CN/primitives/oracles', '415'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/primitives/whatareprimitives',
                component: ComponentCreator('/zh-CN/primitives/whatareprimitives', '705'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/sdk/js/building/basics',
                component: ComponentCreator('/zh-CN/sdk/js/building/basics', '130'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/js/building/prototyping', 'ec6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/js/building/reproducible-builds', '5b7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/cli/',
                component: ComponentCreator('/zh-CN/sdk/js/cli/', '1bd'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/payable-methods', '7ea'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/private-methods', '4df'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/public-methods', '81e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/collections', 'ca4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/near-bindgen', '722'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/nesting',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/nesting', '96c'),
                exact: true
              },
              {
                path: '/zh-CN/sdk/js/cross-contract/callbacks',
                component: ComponentCreator('/zh-CN/sdk/js/cross-contract/callbacks', '27a'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/get-started',
                component: ComponentCreator('/zh-CN/sdk/js/get-started', 'e25'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/introduction',
                component: ComponentCreator('/zh-CN/sdk/js/introduction', '6d0'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/js/promises/create-account', '21b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/js/promises/deploy-contract', 'baf'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/js/promises/intro', 'cd4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/js/promises/token-tx', 'fca'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/integration-tests', '16c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/unit-tests', '67b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/best-practices',
                component: ComponentCreator('/zh-CN/sdk/rust/best-practices', 'da7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/basics',
                component: ComponentCreator('/zh-CN/sdk/rust/building/basics', '693'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/post-processing',
                component: ComponentCreator('/zh-CN/sdk/rust/building/post-processing', 'f72'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/rust/building/prototyping', 'ed0'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/rust/building/reproducible-builds', '73e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/contract-mutability',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/contract-mutability', '06e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/payable-methods', 'adf'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/private-methods', '305'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/public-methods', '39d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/serialization-interface',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/serialization-interface', '802'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-size',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-size', 'f08'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/collections', '01e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/near-bindgen', '0db'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/nesting',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/nesting', 'cf1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/cross-contract/callbacks',
                component: ComponentCreator('/zh-CN/sdk/rust/cross-contract/callbacks', 'f76'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/get-started',
                component: ComponentCreator('/zh-CN/sdk/rust/get-started', '3de'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/introduction',
                component: ComponentCreator('/zh-CN/sdk/rust/introduction', 'bb1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/create-account', '8b2'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/deploy-contract', 'ccc'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/intro', '13b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/token-tx', 'ac6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/integration-tests', '885'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/unit-tests', 'b8d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/welcome',
                component: ComponentCreator('/zh-CN/sdk/welcome', '3a8'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/social/contract',
                component: ComponentCreator('/zh-CN/social/contract', '0e5'),
                exact: true
              },
              {
                path: '/zh-CN/social/intro',
                component: ComponentCreator('/zh-CN/social/intro', 'fd6'),
                exact: true
              },
              {
                path: '/zh-CN/social/standards',
                component: ComponentCreator('/zh-CN/social/standards', 'f5b'),
                exact: true
              },
              {
                path: '/zh-CN/social/tech',
                component: ComponentCreator('/zh-CN/social/tech', '808'),
                exact: true
              },
              {
                path: '/zh-CN/tools/explorer',
                component: ComponentCreator('/zh-CN/tools/explorer', '074'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/fastauth-sdk',
                component: ComponentCreator('/zh-CN/tools/fastauth-sdk', '6ad'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/tools/indexer-for-explorer',
                component: ComponentCreator('/zh-CN/tools/indexer-for-explorer', 'fc7'),
                exact: true
              },
              {
                path: '/zh-CN/tools/indexing',
                component: ComponentCreator('/zh-CN/tools/indexing', 'ce6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/account',
                component: ComponentCreator('/zh-CN/tools/near-api-js/account', 'fb5'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/contract',
                component: ComponentCreator('/zh-CN/tools/near-api-js/contract', '8f4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/cookbook',
                component: ComponentCreator('/zh-CN/tools/near-api-js/cookbook', 'f40'),
                exact: true
              },
              {
                path: '/zh-CN/tools/near-api-js/faq',
                component: ComponentCreator('/zh-CN/tools/near-api-js/faq', 'd6e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/quick-reference',
                component: ComponentCreator('/zh-CN/tools/near-api-js/quick-reference', 'c3d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/utils',
                component: ComponentCreator('/zh-CN/tools/near-api-js/utils', 'b95'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/wallet',
                component: ComponentCreator('/zh-CN/tools/near-api-js/wallet', 'a14'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli',
                component: ComponentCreator('/zh-CN/tools/near-cli', '0ec'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli-rs',
                component: ComponentCreator('/zh-CN/tools/near-cli-rs', '01f'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-lake',
                component: ComponentCreator('/zh-CN/tools/near-lake', '8f3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/tools/realtime',
                component: ComponentCreator('/zh-CN/tools/realtime', '7e1'),
                exact: true
              },
              {
                path: '/zh-CN/tools/remix-ide-plugin',
                component: ComponentCreator('/zh-CN/tools/remix-ide-plugin', 'b07'),
                exact: true
              },
              {
                path: '/zh-CN/tools/usecases',
                component: ComponentCreator('/zh-CN/tools/usecases', 'b55'),
                exact: true
              },
              {
                path: '/zh-CN/tools/wallet-selector',
                component: ComponentCreator('/zh-CN/tools/wallet-selector', 'a9c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/welcome',
                component: ComponentCreator('/zh-CN/tools/welcome', '957'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/add-functions-call',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/add-functions-call', 'af9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests', '58f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/overview', 'b39'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/set-up-skeleton',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/set-up-skeleton', 'edf'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/simple-frontend',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/simple-frontend', '20d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/actions',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/actions', '4cb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle', '1a8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/collections',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/collections', 'ee6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in', '7fd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in-implementation',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in-implementation', '5bb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/overview', '3a8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/structs-enums',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/structs-enums', '140'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/access-key-solution',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/access-key-solution', '0ba'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/base64vecu8',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/base64vecu8', 'f88'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls', '77a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/linkdrop',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/linkdrop', 'f6e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/overview', '8b1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase', '395'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/advanced-xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/advanced-xcc', '156'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/blockvote-js',
                component: ComponentCreator('/zh-CN/tutorials/examples/blockvote-js', 'de1'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/coin-flip',
                component: ComponentCreator('/zh-CN/tutorials/examples/coin-flip', '788'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/count-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/count-near', '82f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/donation',
                component: ComponentCreator('/zh-CN/tutorials/examples/donation', 'f4a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/escrow',
                component: ComponentCreator('/zh-CN/tutorials/examples/escrow', '024'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/factory',
                component: ComponentCreator('/zh-CN/tutorials/examples/factory', 'e9e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/frontend-multiple-contracts',
                component: ComponentCreator('/zh-CN/tutorials/examples/frontend-multiple-contracts', '7ef'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/guest-book',
                component: ComponentCreator('/zh-CN/tutorials/examples/guest-book', 'f1f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/hello-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/hello-near', 'ad5'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/examples/update-contract-migrate-state',
                component: ComponentCreator('/zh-CN/tutorials/examples/update-contract-migrate-state', 'ddb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/xcc', 'b71'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/circulating-supply',
                component: ComponentCreator('/zh-CN/tutorials/fts/circulating-supply', '061'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/defining-a-token',
                component: ComponentCreator('/zh-CN/tutorials/fts/defining-a-token', '8b1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/fts/introduction', '949'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/fts/marketplace', 'bae'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/fts/predeployed-contract', '91c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/registering-accounts',
                component: ComponentCreator('/zh-CN/tutorials/fts/registering-accounts', 'e76'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/simple-fts',
                component: ComponentCreator('/zh-CN/tutorials/fts/simple-fts', 'cfb'),
                exact: true
              },
              {
                path: '/zh-CN/tutorials/fts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/fts/skeleton', '8dd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/transfers',
                component: ComponentCreator('/zh-CN/tutorials/fts/transfers', '9df'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/credentials',
                component: ComponentCreator('/zh-CN/tutorials/indexer/credentials', 'f93'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/js-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/js-lake-indexer', '002'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/lake-start-options',
                component: ComponentCreator('/zh-CN/tutorials/indexer/lake-start-options', 'ab1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/migrating-to-near-lake-framework',
                component: ComponentCreator('/zh-CN/tutorials/indexer/migrating-to-near-lake-framework', '258'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/near-lake-state-changes-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/near-lake-state-changes-indexer', '286'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/nft-indexer', '345'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/python-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/python-lake-indexer', 'cc1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/python-nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/python-nft-indexer', '4fe'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/indexer/run-lake-indexer',
                component: ComponentCreator('/zh-CN/tutorials/indexer/run-lake-indexer', '357'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/approvals', 'd19'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/core', '664'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/enumeration', 'd66'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/events', '035'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/introduction', 'c24'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/approvals', 'a71'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/core', '476'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/enumeration', 'bbf'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/events', 'ef9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/introduction', '85c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/marketplace', '61f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/minting', 'db5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/predeployed-contract', '76b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/royalty',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/royalty', '06e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/skeleton', '4ea'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/upgrade-contract', 'ce1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/marketplace', 'aa3'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minecraft-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minecraft-nfts', 'c21'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting', '4cb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nft-frontend',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nft-frontend', '860'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nfts', 'dd0'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/predeployed-contract', 'b2f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/royalty',
                component: ComponentCreator('/zh-CN/tutorials/nfts/royalty', '3cd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/series',
                component: ComponentCreator('/zh-CN/tutorials/nfts/series', 'e8d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/skeleton', 'afb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/upgrade-contract', '4b7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/welcome',
                component: ComponentCreator('/zh-CN/tutorials/welcome', '8b5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/',
                component: ComponentCreator('/zh-CN/', '16a'),
                exact: true
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
