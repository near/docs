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
    component: ComponentCreator('/zh-CN/', '8ff'),
    routes: [
      {
        path: '/zh-CN/',
        component: ComponentCreator('/zh-CN/', 'f0b'),
        routes: [
          {
            path: '/zh-CN/',
            component: ComponentCreator('/zh-CN/', '301'),
            routes: [
              {
                path: '/zh-CN/',
                component: ComponentCreator('/zh-CN/', '251'),
                exact: true
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
                path: '/zh-CN/build/chain-abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/chain-signatures', '6cd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/data-availability',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/data-availability', 'd22'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/fastauth-sdk',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/fastauth-sdk', '2eb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/meta-transactions',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/meta-transactions', '96f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station', 'de5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server', '1bb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example', '5f5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/wallet',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/wallet', '75d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/what-is',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/what-is', 'e03'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/big-query',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/big-query', 'e00'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/block',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/block', '86e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/chunk',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/chunk', '07e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/execution-outcome',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/execution-outcome', 'bf7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/receipt',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/receipt', 'a56'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/shard',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/shard', 'c28'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/state-change',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/state-change', '431'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/toc',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/toc', '154'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-data-structures/transaction',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/transaction', '1f5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer', 'dfe'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer', 'edd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/primitives',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/primitives', 'b0d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer', 'a2a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer', 'd8d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework', '817'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake', '1ea'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer', 'd7a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/credentials',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/credentials', '44b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options', '985'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer', '8fd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/best-practices',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/best-practices', '461'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/context-object',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/context-object', 'ab4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/how-it-works',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/how-it-works', '130'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/index-functions',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/index-functions', '285'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/indexers',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/indexers', '382'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/intro',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/intro', '8a5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake', '88e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/query-data',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/query-data', 'c4e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/what-is',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/what-is', 'bbc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/bos-components',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/bos-components', '754'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/builtin-components',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/builtin-components', 'f15'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/near',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/near', '8bf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/notifications',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/notifications', '481'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/social',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/social', 'af4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/state',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/state', '04a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/web-methods',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/web-methods', '5eb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/bos-gateway',
                component: ComponentCreator('/zh-CN/build/near-components/bos-gateway', '3f8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/dev-environment',
                component: ComponentCreator('/zh-CN/build/near-components/dev-environment', '0ef'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/what-is',
                component: ComponentCreator('/zh-CN/build/near-components/what-is', 'e22'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao', 'f0e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/create-dao', '1d3'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/create-proposal', 'e12'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/get-dao-list', 'd8e'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/get-proposal-list', '6aa'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/bos/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/bos/vote-for-proposal', '891'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/create-dao', '5cf'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/create-proposal', '1af'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/get-dao-list', 'e22'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/get-proposal-list', 'c96'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/near-cli/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/near-cli/vote-for-proposal', 'e53'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-dao', 'c84'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-proposal', '0f7'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal', 'b27'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/create-dao',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/create-dao', '1e3'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/create-proposal', 'bd2'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/get-dao-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/get-dao-list', '369'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/get-proposal-list',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/get-proposal-list', 'f7d'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/web-app/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/web-app/vote-for-proposal', '508'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex',
                component: ComponentCreator('/zh-CN/build/primitives/dex', '054'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-deposit-balances', '428'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-pools', 'b32'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/get-price',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/get-price', 'bec'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/bos/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/bos/swap', 'a7b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/get-deposit-balances', '4bf'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/get-pools', '56b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/near-cli/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/near-cli/swap', '205'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-deposit-balances', '871'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-pools', '93c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/swap', '9bf'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-deposit-balances',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-deposit-balances', '536'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-pools', 'a1f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/get-price',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/get-price', '7d5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/web-app/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/web-app/swap', '274'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft',
                component: ComponentCreator('/zh-CN/build/primitives/ft', '470'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/attach-to-call', 'd1a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/check-balance', '9e5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/create', 'e42'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/get-metadata', 'a22'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/register', '5c4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/bos/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/bos/send', '9d5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/attach-to-call', '78d'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/check-balance', '29f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/create', '9df'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/get-metadata', '118'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/register', '8d1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/near-cli/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/near-cli/send', '8d6'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/smart-contract/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/smart-contract/attach-to-call', 'ffa'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/smart-contract/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/smart-contract/send', '8f1'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/attach-to-call',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/attach-to-call', '355'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/check-balance',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/check-balance', '867'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/create',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/create', '860'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/get-metadata',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/get-metadata', 'd86'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/register',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/register', '70f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/ft/web-app/send',
                component: ComponentCreator('/zh-CN/build/primitives/ft/web-app/send', '803'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop', '04d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/create-ft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/create-ft-drop', '7c4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/create-function-call-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/create-function-call-drop', '299'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/create-nft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/create-nft-drop', '16a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/get-drop-id',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/get-drop-id', '86f'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/get-key-pairs',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/get-key-pairs', '2f5'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/simple-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/simple-drop', 'c22'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/transfer-ft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/transfer-ft', 'fda'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/bos/transfer-nft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/bos/transfer-nft', 'ca4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/create-ft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/create-ft-drop', 'c02'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/create-function-call-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/create-function-call-drop', '362'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/create-nft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/create-nft-drop', '66c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/get-drop-id',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/get-drop-id', '08d'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/get-key-pairs',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/get-key-pairs', 'd85'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/simple-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/simple-drop', '219'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/transfer-ft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/transfer-ft', '0bb'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/near-cli/transfer-nft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/near-cli/transfer-nft', '164'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/create-ft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/create-ft-drop', '611'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/create-function-call-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/create-function-call-drop', 'bcd'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/create-nft-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/create-nft-drop', '787'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/get-drop-id',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/get-drop-id', '94e'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/get-key-pairs',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/get-key-pairs', 'be6'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/simple-drop',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/simple-drop', 'a0a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/transfer-ft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/transfer-ft', 'e22'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/linkdrop/web-app/transfer-nft',
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop/web-app/transfer-nft', '089'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft',
                component: ComponentCreator('/zh-CN/build/primitives/nft', '666'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/buy', '4f8'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/list-for-sale', '1d4'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/mint', 'a74'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/query', 'c67'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/bos/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/bos/transfer', 'cdd'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/buy', 'ada'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/list-for-sale', 'f3c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/mint', '3c7'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/query', 'c71'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/near-cli/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/near-cli/transfer', 'e91'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/buy', '7de'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/mint', '7bf'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/query', 'bbc'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/transfer', '09d'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/buy',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/buy', '9e6'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/list-for-sale',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/list-for-sale', '81a'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/mint', '461'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/query', '193'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/web-app/transfer',
                component: ComponentCreator('/zh-CN/build/primitives/nft/web-app/transfer', '11c'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/oracles',
                component: ComponentCreator('/zh-CN/build/primitives/oracles', '33c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/primitives/what-is',
                component: ComponentCreator('/zh-CN/build/primitives/what-is', 'c33'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/', '62a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/actions',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/actions', 'f94'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/basics',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/basics', '4d7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/crosscontract',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/crosscontract', '95a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/environment',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/environment', '010'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/serialization',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/serialization', 'd52'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/storage',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/storage', '727'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/quickstart',
                component: ComponentCreator('/zh-CN/build/smart-contracts/quickstart', 'c3b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/deploy',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/deploy', '8ce'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/lock',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/lock', '6ac'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/upgrade',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/upgrade', '0b6'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/bounty',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/bounty', '9fe'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/callbacks',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/callbacks', 'b50'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/checklist',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/checklist', 'e7b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/frontrunning',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/frontrunning', '944'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/one-yocto',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/one-yocto', '3be'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/random',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/random', '648'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/reentrancy',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/reentrancy', '1f6'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/storage',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/storage', '556'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/sybil',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/sybil', '51f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/security/welcome',
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/welcome', '932'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/integration-test',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/integration-test', '262'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/introduction',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/introduction', '4f0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/kurtosis-localnet',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/kurtosis-localnet', '035'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/unit-test',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/unit-test', '83c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/what-is',
                component: ComponentCreator('/zh-CN/build/smart-contracts/what-is', 'd0b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/backend/',
                component: ComponentCreator('/zh-CN/build/web3-apps/backend/', '481'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/integrate-components',
                component: ComponentCreator('/zh-CN/build/web3-apps/integrate-components', 'db4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/integrate-contracts',
                component: ComponentCreator('/zh-CN/build/web3-apps/integrate-contracts', '5b0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/quickstart',
                component: ComponentCreator('/zh-CN/build/web3-apps/quickstart', '68e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/what-is',
                component: ComponentCreator('/zh-CN/build/web3-apps/what-is', '7a0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/welcome',
                component: ComponentCreator('/zh-CN/build/welcome', 'f34'),
                exact: true,
                sidebar: "build"
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
                path: '/zh-CN/help',
                component: ComponentCreator('/zh-CN/help', 'c3e'),
                exact: true
              },
              {
                path: '/zh-CN/integrations/accounts',
                component: ComponentCreator('/zh-CN/integrations/accounts', 'f49'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/balance-changes',
                component: ComponentCreator('/zh-CN/integrations/balance-changes', '6f4'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/create-transactions',
                component: ComponentCreator('/zh-CN/integrations/create-transactions', 'e54'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/error-implementation',
                component: ComponentCreator('/zh-CN/integrations/errors/error-implementation', '5ae'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/introduction',
                component: ComponentCreator('/zh-CN/integrations/errors/introduction', '73e'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/errors/token-loss',
                component: ComponentCreator('/zh-CN/integrations/errors/token-loss', '37a'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/exchange-integration',
                component: ComponentCreator('/zh-CN/integrations/exchange-integration', 'c13'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/faq',
                component: ComponentCreator('/zh-CN/integrations/faq', 'e3c'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/fungible-tokens',
                component: ComponentCreator('/zh-CN/integrations/fungible-tokens', '932'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/implicit-accounts',
                component: ComponentCreator('/zh-CN/integrations/implicit-accounts', 'b41'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/pagoda/alerts/intro',
                component: ComponentCreator('/zh-CN/pagoda/alerts/intro', '046'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/setup',
                component: ComponentCreator('/zh-CN/pagoda/alerts/setup', '3f6'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/alerts/webhooks',
                component: ComponentCreator('/zh-CN/pagoda/alerts/webhooks', '1a3'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/api',
                component: ComponentCreator('/zh-CN/pagoda/rpc/api', 'a83'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/get-keys',
                component: ComponentCreator('/zh-CN/pagoda/rpc/get-keys', '05a'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/intro',
                component: ComponentCreator('/zh-CN/pagoda/rpc/intro', '98b'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/setup',
                component: ComponentCreator('/zh-CN/pagoda/rpc/setup', 'a21'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/zh-CN/pagoda/rpc/stats',
                component: ComponentCreator('/zh-CN/pagoda/rpc/stats', 'a93'),
                exact: true,
                sidebar: "pagoda"
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
                path: '/zh-CN/tools/explorer',
                component: ComponentCreator('/zh-CN/tools/explorer', '958'),
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
                path: '/zh-CN/tutorials/near-components/bos-loader',
                component: ComponentCreator('/zh-CN/tutorials/near-components/bos-loader', 'f4f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ds-components',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ds-components', 'b57'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js', '10a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js-best-practices',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js-best-practices', '71b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/feed-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/feed-indexer', '391'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/hype-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/hype-indexer', 'cb5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer', 'ab7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer', '45a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/interaction',
                component: ComponentCreator('/zh-CN/tutorials/near-components/interaction', '3b7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/lido',
                component: ComponentCreator('/zh-CN/tutorials/near-components/lido', 'd9d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/push-notifications',
                component: ComponentCreator('/zh-CN/tutorials/near-components/push-notifications', '6b6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/queryapi-websockets',
                component: ComponentCreator('/zh-CN/tutorials/near-components/queryapi-websockets', '61f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/using-iframes',
                component: ComponentCreator('/zh-CN/tutorials/near-components/using-iframes', '48a'),
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
