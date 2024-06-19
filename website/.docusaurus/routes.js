import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-CN/blog',
    component: ComponentCreator('/zh-CN/blog', '2a5'),
    exact: true
  },
  {
    path: '/zh-CN/blog/archive',
    component: ComponentCreator('/zh-CN/blog/archive', 'a8b'),
    exact: true
  },
  {
    path: '/zh-CN/blog/getting-started-on-windows',
    component: ComponentCreator('/zh-CN/blog/getting-started-on-windows', '7b6'),
    exact: true
  },
  {
    path: '/zh-CN/blog/reorganizing-docs',
    component: ComponentCreator('/zh-CN/blog/reorganizing-docs', '86f'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags',
    component: ComponentCreator('/zh-CN/blog/tags', '958'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/docusaurus',
    component: ComponentCreator('/zh-CN/blog/tags/docusaurus', 'e60'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/getting-started',
    component: ComponentCreator('/zh-CN/blog/tags/getting-started', '753'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/protocol',
    component: ComponentCreator('/zh-CN/blog/tags/protocol', 'e4f'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/tutorial',
    component: ComponentCreator('/zh-CN/blog/tags/tutorial', '89e'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/updates',
    component: ComponentCreator('/zh-CN/blog/tags/updates', '58d'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/windows',
    component: ComponentCreator('/zh-CN/blog/tags/windows', '618'),
    exact: true
  },
  {
    path: '/zh-CN/blog/we-have-a-blog',
    component: ComponentCreator('/zh-CN/blog/we-have-a-blog', 'b84'),
    exact: true
  },
  {
    path: '/zh-CN/blog/yield-resume',
    component: ComponentCreator('/zh-CN/blog/yield-resume', 'b23'),
    exact: true
  },
  {
    path: '/zh-CN/search',
    component: ComponentCreator('/zh-CN/search', '4e2'),
    exact: true
  },
  {
    path: '/zh-CN/',
    component: ComponentCreator('/zh-CN/', '726'),
    routes: [
      {
        path: '/zh-CN/',
        component: ComponentCreator('/zh-CN/', 'ecc'),
        routes: [
          {
            path: '/zh-CN/',
            component: ComponentCreator('/zh-CN/', 'de1'),
            routes: [
              {
                path: '/zh-CN/api/rpc/access-keys',
                component: ComponentCreator('/zh-CN/api/rpc/access-keys', 'bbb'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/block-chunk',
                component: ComponentCreator('/zh-CN/api/rpc/block-chunk', '21a'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/contracts',
                component: ComponentCreator('/zh-CN/api/rpc/contracts', 'c46'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/gas',
                component: ComponentCreator('/zh-CN/api/rpc/gas', 'f10'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/introduction',
                component: ComponentCreator('/zh-CN/api/rpc/introduction', '60e'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/maintenance-windows',
                component: ComponentCreator('/zh-CN/api/rpc/maintenance-windows', 'cf1'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/network',
                component: ComponentCreator('/zh-CN/api/rpc/network', '0e0'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/protocol',
                component: ComponentCreator('/zh-CN/api/rpc/protocol', 'f94'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/providers',
                component: ComponentCreator('/zh-CN/api/rpc/providers', 'f1c'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/setup',
                component: ComponentCreator('/zh-CN/api/rpc/setup', 'f45'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/api/rpc/transactions',
                component: ComponentCreator('/zh-CN/api/rpc/transactions', '972'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/build/chain-abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/chain-signatures', '678'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/data-availability',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/data-availability', '809'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/fastauth-sdk',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/fastauth-sdk', '982'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/meta-transactions',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/meta-transactions', 'b26'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station', '403'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server', 'd6f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/overview',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/overview', '745'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example', 'b78'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/nft-chain-keys',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/nft-chain-keys', 'd04'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/wallet',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/wallet', '146'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/what-is',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/what-is', '77b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/big-query',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/big-query', 'ec2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/block',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/block', 'd2f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/chunk',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/chunk', 'c92'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/execution-outcome',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/execution-outcome', 'e91'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/receipt',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/receipt', '5fa'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/shard',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/shard', '434'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/state-change',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/state-change', 'dc3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/toc',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/toc', '034'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/transaction',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/transaction', 'f6e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer', 'ba7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer', '4df'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/primitives',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/primitives', 'f95'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer', '42b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer', '9d7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework', '4d8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake', 'bfb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer', '84a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/credentials',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/credentials', 'd07'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options', '51e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer', 'f71'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/best-practices',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/best-practices', '810'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/context-object',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/context-object', 'e53'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/how-it-works',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/how-it-works', '4d5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/index-functions',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/index-functions', '303'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/indexers',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/indexers', '924'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/intro',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/intro', '740'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake', 'ecf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/query-data',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/query-data', '5d1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/what-is',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/what-is', 'a0d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/bos-components',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/bos-components', '228'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/builtin-components',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/builtin-components', 'e5f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/near',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/near', '3fb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/notifications',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/notifications', '32d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/social',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/social', 'b94'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/state',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/state', 'a54'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/web-methods',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/web-methods', '67a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/bos-gateway',
                component: ComponentCreator('/zh-CN/build/near-components/bos-gateway', 'e29'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/dev-environment',
                component: ComponentCreator('/zh-CN/build/near-components/dev-environment', '720'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/what-is',
                component: ComponentCreator('/zh-CN/build/near-components/what-is', '676'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao', 'e0f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/create-dao', 'e3f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/create-proposal', '71c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/get-dao-list', '29c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/get-proposal-list', '4da'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/vote-for-proposal', '850'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/create-dao', 'c6a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/create-proposal', '84f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/get-dao-list', 'a0a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/get-proposal-list', '6e7'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/vote-for-proposal', '276'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-dao', 'efc'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-proposal', 'b8c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal', 'a77'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/create-dao', '535'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/create-proposal', 'e99'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/get-dao-list', '9e4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/get-proposal-list', '336'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/vote-for-proposal', 'c2b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex',
                component: ComponentCreator('/zh-CN/build/primitives/dex', 'b6a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-deposit-balances', 'df6'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-pools', '407'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-price',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-price', 'dad'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/swap', '7dd'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/get-deposit-balances', 'f5c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/get-pools', '2c1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/swap', '342'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-deposit-balances', '142'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-pools', '737'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/swap', '679'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-deposit-balances', '38b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-pools', 'd16'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-price',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-price', '2c1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/swap', 'c1c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft',
                component: ComponentCreator('/zh-CN/build/primitives/ft', 'f19'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/attach-to-call', '056'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/check-balance', 'eb4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/create', '31f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/get-metadata', '3d2'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/register', '3bc'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/send', '850'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/attach-to-call', '616'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/check-balance', '519'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/create', '3fb'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/get-metadata', '05e'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/register', 'f75'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/send', '9a1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/smart-contract/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/smart-contract/attach-to-call', '715'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/smart-contract/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/smart-contract/send', 'bd0'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/attach-to-call', '4b8'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/check-balance', '115'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/create', '8d3'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/get-metadata', 'e62'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/register', 'f59'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/send', 'c04'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop', 'e94'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/nft',
                component: ComponentCreator('/zh-CN/build/primitives/nft', 'cac'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/buy', 'ab5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/list-for-sale', '0dd'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/mint', '617'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/query', '2e3'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/transfer', 'b3c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/buy', 'b67'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/list-for-sale', '5c5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/mint', '2c2'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/query', '6fa'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/transfer', 'ac5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/buy', 'da1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/mint', '1d2'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/query', '65c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/transfer', 'a64'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/buy', '2a5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/list-for-sale', '1e7'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/mint', 'a7b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/query', '75f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/transfer', 'a96'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/oracles',
                component: ComponentCreator('/zh-CN/build/primitives/oracles', '5c3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/what-is',
                component: ComponentCreator('/zh-CN/build/primitives/what-is', 'c27'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/', 'a0b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/actions',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/actions', '90d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/collections',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/collections', '051'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/crosscontract',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/crosscontract', '924'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/environment',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/environment', '74a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/functions',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/functions', '90e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/serialization',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/serialization', '776'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/storage',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/storage', '5e9'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/types',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/types', '5a3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/quickstart',
                component: ComponentCreator('/zh-CN/build/smart-contracts/quickstart', 'cdf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/deploy',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/deploy', '5ff'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/lock',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/lock', 'd20'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/upgrade',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/upgrade', '74c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/bounty',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/bounty', '18d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/callbacks',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/callbacks', '47a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/checklist',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/checklist', '748'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/frontrunning',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/frontrunning', '9ca'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/one-yocto',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/one-yocto', '677'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/random',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/random', '303'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/reentrancy',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/reentrancy', 'c2b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/storage',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/storage', 'fb3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/sybil',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/sybil', 'bde'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/welcome',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/welcome', '414'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/integration-test',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/integration-test', '91d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/introduction',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/introduction', 'ff2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/kurtosis-localnet',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/kurtosis-localnet', 'eb3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/unit-test',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/unit-test', '57b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/what-is',
                component: ComponentCreator('/zh-CN/build/smart-contracts/what-is', '4cd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/backend/',
                component: ComponentCreator('/zh-CN/build/web3-apps/backend/', '7e9'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/integrate-components',
                component: ComponentCreator('/zh-CN/build/web3-apps/integrate-components', 'e37'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/integrate-contracts',
                component: ComponentCreator('/zh-CN/build/web3-apps/integrate-contracts', '424'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/quickstart',
                component: ComponentCreator('/zh-CN/build/web3-apps/quickstart', '42c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/what-is',
                component: ComponentCreator('/zh-CN/build/web3-apps/what-is', 'ce7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/welcome',
                component: ComponentCreator('/zh-CN/build/welcome', 'c7c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/concepts/abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/concepts/abstraction/chain-signatures', '491'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/introduction',
                component: ComponentCreator('/zh-CN/concepts/abstraction/introduction', 'c68'),
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
                path: '/zh-CN/concepts/abstraction/relayers',
                component: ComponentCreator('/zh-CN/concepts/abstraction/relayers', '6dd'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/signatures/use-cases',
                component: ComponentCreator('/zh-CN/concepts/abstraction/signatures/use-cases', '3af'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/indexers',
                component: ComponentCreator('/zh-CN/concepts/advanced/indexers', '236'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-indexer-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-indexer-framework', 'eb6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/advanced/near-lake-framework',
                component: ComponentCreator('/zh-CN/concepts/advanced/near-lake-framework', 'b09'),
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
                path: '/zh-CN/concepts/basics/epoch',
                component: ComponentCreator('/zh-CN/concepts/basics/epoch', '47a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/networks',
                component: ComponentCreator('/zh-CN/concepts/basics/networks', '5aa'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/protocol',
                component: ComponentCreator('/zh-CN/concepts/basics/protocol', '3e3'),
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
                path: '/zh-CN/concepts/basics/token-loss',
                component: ComponentCreator('/zh-CN/concepts/basics/token-loss', '972'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/tokens',
                component: ComponentCreator('/zh-CN/concepts/basics/tokens', '862'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/basics/validators',
                component: ComponentCreator('/zh-CN/concepts/basics/validators', '91a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/data-storage',
                component: ComponentCreator('/zh-CN/concepts/data-flow/data-storage', '479'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/near-data-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/near-data-flow', '090'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/token-transfer-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/token-transfer-flow', '1a0'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/access-keys',
                component: ComponentCreator('/zh-CN/concepts/protocol/access-keys', '90d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/account-id',
                component: ComponentCreator('/zh-CN/concepts/protocol/account-id', '7b3'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/account-model',
                component: ComponentCreator('/zh-CN/concepts/protocol/account-model', '029'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/gas',
                component: ComponentCreator('/zh-CN/concepts/protocol/gas', 'e76'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/smartcontract',
                component: ComponentCreator('/zh-CN/concepts/protocol/smartcontract', 'd27'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-anatomy',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-anatomy', 'be5'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-execution',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-execution', '9a9'),
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
                component: ComponentCreator('/zh-CN/concepts/storage/data-storage', 'da4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-solutions',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-solutions', '25e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/storage/storage-staking',
                component: ComponentCreator('/zh-CN/concepts/storage/storage-staking', '9be'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/basics',
                component: ComponentCreator('/zh-CN/concepts/web3/basics', '12b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/economics',
                component: ComponentCreator('/zh-CN/concepts/web3/economics', 'ca2'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/intro',
                component: ComponentCreator('/zh-CN/concepts/web3/intro', '694'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/near',
                component: ComponentCreator('/zh-CN/concepts/web3/near', 'f23'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/nfts',
                component: ComponentCreator('/zh-CN/concepts/web3/nfts', 'f36'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/welcome',
                component: ComponentCreator('/zh-CN/concepts/welcome', '2a6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/help',
                component: ComponentCreator('/zh-CN/help', '8e6'),
                exact: true
              },
              {
                path: '/zh-CN/integrations/accounts',
                component: ComponentCreator('/zh-CN/integrations/accounts', 'de3'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/balance-changes',
                component: ComponentCreator('/zh-CN/integrations/balance-changes', '8cb'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/create-transactions',
                component: ComponentCreator('/zh-CN/integrations/create-transactions', '6e6'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/error-implementation',
                component: ComponentCreator('/zh-CN/integrations/errors/error-implementation', '964'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/introduction',
                component: ComponentCreator('/zh-CN/integrations/errors/introduction', 'ce8'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/token-loss',
                component: ComponentCreator('/zh-CN/integrations/errors/token-loss', '432'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/exchange-integration',
                component: ComponentCreator('/zh-CN/integrations/exchange-integration', '948'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/faq',
                component: ComponentCreator('/zh-CN/integrations/faq', '86d'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/fungible-tokens',
                component: ComponentCreator('/zh-CN/integrations/fungible-tokens', '6cb'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/implicit-accounts',
                component: ComponentCreator('/zh-CN/integrations/implicit-accounts', '550'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/pagoda/alerts/intro',
                component: ComponentCreator('/zh-CN/pagoda/alerts/intro', '4dd'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/setup',
                component: ComponentCreator('/zh-CN/pagoda/alerts/setup', 'cd4'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/webhooks',
                component: ComponentCreator('/zh-CN/pagoda/alerts/webhooks', '5a4'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/api',
                component: ComponentCreator('/zh-CN/pagoda/rpc/api', '1a3'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/get-keys',
                component: ComponentCreator('/zh-CN/pagoda/rpc/get-keys', '38e'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/intro',
                component: ComponentCreator('/zh-CN/pagoda/rpc/intro', '33f'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/setup',
                component: ComponentCreator('/zh-CN/pagoda/rpc/setup', '375'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/stats',
                component: ComponentCreator('/zh-CN/pagoda/rpc/stats', '9e7'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/sdk/js/building/basics',
                component: ComponentCreator('/zh-CN/sdk/js/building/basics', '4e7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/js/building/prototyping', '939'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/js/building/reproducible-builds', '9f2'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/cli/',
                component: ComponentCreator('/zh-CN/sdk/js/cli/', '423'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/payable-methods', 'ae2'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/private-methods', '432'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/js/contract-interface/public-methods', '904'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/collections', '310'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/js/contract-structure/near-bindgen', 'ad2'),
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
                component: ComponentCreator('/zh-CN/sdk/js/cross-contract/callbacks', '6e7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/get-started',
                component: ComponentCreator('/zh-CN/sdk/js/get-started', '0cd'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/introduction',
                component: ComponentCreator('/zh-CN/sdk/js/introduction', '03e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/js/promises/create-account', '190'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/js/promises/deploy-contract', 'eff'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/js/promises/intro', 'cef'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/js/promises/token-tx', '653'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/integration-tests', 'aff'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/js/testing/unit-tests', 'ec5'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/best-practices',
                component: ComponentCreator('/zh-CN/sdk/rust/best-practices', '44d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/basics',
                component: ComponentCreator('/zh-CN/sdk/rust/building/basics', '205'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/post-processing',
                component: ComponentCreator('/zh-CN/sdk/rust/building/post-processing', '3f2'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/rust/building/prototyping', 'b6d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/building/reproducible-builds',
                component: ComponentCreator('/zh-CN/sdk/rust/building/reproducible-builds', 'c05'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/contract-mutability',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/contract-mutability', 'fd3'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/payable-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/payable-methods', '305'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/private-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/private-methods', '8d9'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/public-methods',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/public-methods', '230'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-interface/serialization-interface',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-interface/serialization-interface', '3dd'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-size',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-size', 'df0'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/collections',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/collections', '31e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/near-bindgen',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/near-bindgen', '28c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/contract-structure/nesting',
                component: ComponentCreator('/zh-CN/sdk/rust/contract-structure/nesting', 'c66'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/cross-contract/callbacks',
                component: ComponentCreator('/zh-CN/sdk/rust/cross-contract/callbacks', '3d7'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/get-started',
                component: ComponentCreator('/zh-CN/sdk/rust/get-started', 'f2e'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/introduction',
                component: ComponentCreator('/zh-CN/sdk/rust/introduction', '7e9'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/create-account',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/create-account', '8a1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/deploy-contract',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/deploy-contract', '3a3'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/intro',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/intro', '50c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/promises/token-tx',
                component: ComponentCreator('/zh-CN/sdk/rust/promises/token-tx', '163'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/integration-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/integration-tests', 'd58'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/rust/testing/unit-tests',
                component: ComponentCreator('/zh-CN/sdk/rust/testing/unit-tests', '83b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/welcome',
                component: ComponentCreator('/zh-CN/sdk/welcome', '7bf'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/explorer',
                component: ComponentCreator('/zh-CN/tools/explorer', '4f3'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/fastnear-api',
                component: ComponentCreator('/zh-CN/tools/fastnear-api', 'fa1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/indexing',
                component: ComponentCreator('/zh-CN/tools/indexing', 'ee8'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/account',
                component: ComponentCreator('/zh-CN/tools/near-api-js/account', 'a85'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/contract',
                component: ComponentCreator('/zh-CN/tools/near-api-js/contract', '85c'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/cookbook',
                component: ComponentCreator('/zh-CN/tools/near-api-js/cookbook', 'fb4'),
                exact: true
              },
              {
                path: '/zh-CN/tools/near-api-js/faq',
                component: ComponentCreator('/zh-CN/tools/near-api-js/faq', 'c93'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/quick-reference',
                component: ComponentCreator('/zh-CN/tools/near-api-js/quick-reference', 'c83'),
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
                component: ComponentCreator('/zh-CN/tools/near-api-js/wallet', '134'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli',
                component: ComponentCreator('/zh-CN/tools/near-cli', '168'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-cli-rs',
                component: ComponentCreator('/zh-CN/tools/near-cli-rs', 'c9b'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/wallet-selector',
                component: ComponentCreator('/zh-CN/tools/wallet-selector', '6f4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/wallets',
                component: ComponentCreator('/zh-CN/tools/wallets', '6ab'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/welcome',
                component: ComponentCreator('/zh-CN/tools/welcome', 'bd9'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/add-functions-call',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/add-functions-call', '4dd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/hashing-and-unit-tests', '9de'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/overview', '6a1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/set-up-skeleton',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/set-up-skeleton', '55b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/simple-frontend',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/simple-frontend', 'd66'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/actions',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/actions', 'ebc'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/adding-a-puzzle', '3fa'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/collections',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/collections', 'ed8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in', '64e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/logging-in-implementation',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/logging-in-implementation', 'bb9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/overview', '61e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/beginner/structs-enums',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/beginner/structs-enums', '70c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/access-key-solution',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/access-key-solution', 'd9f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/base64vecu8',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/base64vecu8', '8f5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/cross-contract-calls', '88b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/linkdrop',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/linkdrop', '114'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/overview',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/overview', 'efd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/intermediate/use-seed-phrase', '14d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/advanced-xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/advanced-xcc', '2fc'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/coin-flip',
                component: ComponentCreator('/zh-CN/tutorials/examples/coin-flip', 'e8b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/count-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/count-near', '39d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/donation',
                component: ComponentCreator('/zh-CN/tutorials/examples/donation', 'e96'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/factory',
                component: ComponentCreator('/zh-CN/tutorials/examples/factory', '3b7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/frontend-multiple-contracts',
                component: ComponentCreator('/zh-CN/tutorials/examples/frontend-multiple-contracts', 'a54'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/guest-book',
                component: ComponentCreator('/zh-CN/tutorials/examples/guest-book', 'c2d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/update-contract-migrate-state',
                component: ComponentCreator('/zh-CN/tutorials/examples/update-contract-migrate-state', '1e0'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/xcc', '435'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/circulating-supply',
                component: ComponentCreator('/zh-CN/tutorials/fts/circulating-supply', 'e0d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/defining-a-token',
                component: ComponentCreator('/zh-CN/tutorials/fts/defining-a-token', 'ce9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/fts/introduction', '619'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/fts/marketplace', '454'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/fts/predeployed-contract', 'f9f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/registering-accounts',
                component: ComponentCreator('/zh-CN/tutorials/fts/registering-accounts', '15a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/fts/skeleton', '250'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/transfers',
                component: ComponentCreator('/zh-CN/tutorials/fts/transfers', 'fac'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/blog-posts',
                component: ComponentCreator('/zh-CN/tutorials/near-components/blog-posts', '438'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/bos-loader',
                component: ComponentCreator('/zh-CN/tutorials/near-components/bos-loader', '604'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ds-components',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ds-components', '577'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js', '985'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js-best-practices',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js-best-practices', 'ff7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/feed-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/feed-indexer', 'ac6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/hype-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/hype-indexer', '4c4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer', '08e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer', '774'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/interaction',
                component: ComponentCreator('/zh-CN/tutorials/near-components/interaction', '1b8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/lido',
                component: ComponentCreator('/zh-CN/tutorials/near-components/lido', 'b59'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/push-notifications',
                component: ComponentCreator('/zh-CN/tutorials/near-components/push-notifications', '4a9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/queryapi-websockets',
                component: ComponentCreator('/zh-CN/tutorials/near-components/queryapi-websockets', '8f9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/using-iframes',
                component: ComponentCreator('/zh-CN/tutorials/near-components/using-iframes', '1b1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/approvals', 'c54'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/core', '8bc'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/enumeration', '707'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/events', '984'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/introduction', 'd63'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/approvals',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/approvals', 'c4a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/core',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/core', '0c9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/enumeration',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/enumeration', 'f08'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/events',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/events', 'cfc'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/introduction',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/introduction', '571'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/marketplace', '07c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/minting', 'eb5'),
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
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/royalty', '996'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/skeleton', '932'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/js/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/upgrade-contract', '03a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/nfts/marketplace', '994'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minecraft-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minecraft-nfts', 'baa'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting', '83e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nft-frontend',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nft-frontend', 'd4d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/minting-nfts',
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nfts', '2b7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/predeployed-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/predeployed-contract', '07c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/royalty',
                component: ComponentCreator('/zh-CN/tutorials/nfts/royalty', 'a3d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/series',
                component: ComponentCreator('/zh-CN/tutorials/nfts/series', '8b6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/skeleton',
                component: ComponentCreator('/zh-CN/tutorials/nfts/skeleton', '2b1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/nfts/upgrade-contract',
                component: ComponentCreator('/zh-CN/tutorials/nfts/upgrade-contract', 'de6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/templates/blog',
                component: ComponentCreator('/zh-CN/tutorials/templates/blog', '4c4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/templates/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/templates/marketplace', '32d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/templates/minter',
                component: ComponentCreator('/zh-CN/tutorials/templates/minter', '724'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/welcome',
                component: ComponentCreator('/zh-CN/tutorials/welcome', 'aa6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/',
                component: ComponentCreator('/zh-CN/', '415'),
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
