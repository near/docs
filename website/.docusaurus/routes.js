import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-CN/blog',
    component: ComponentCreator('/zh-CN/blog', '227'),
    exact: true
  },
  {
    path: '/zh-CN/blog/archive',
    component: ComponentCreator('/zh-CN/blog/archive', 'a8b'),
    exact: true
  },
  {
    path: '/zh-CN/blog/reorganizing-docs',
    component: ComponentCreator('/zh-CN/blog/reorganizing-docs', '9d0'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags',
    component: ComponentCreator('/zh-CN/blog/tags', '958'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/docusaurus',
    component: ComponentCreator('/zh-CN/blog/tags/docusaurus', '185'),
    exact: true
  },
  {
    path: '/zh-CN/blog/tags/updates',
    component: ComponentCreator('/zh-CN/blog/tags/updates', '834'),
    exact: true
  },
  {
    path: '/zh-CN/blog/we-have-a-blog',
    component: ComponentCreator('/zh-CN/blog/we-have-a-blog', 'dc2'),
    exact: true
  },
  {
    path: '/zh-CN/search',
    component: ComponentCreator('/zh-CN/search', '4e2'),
    exact: true
  },
  {
    path: '/zh-CN/',
    component: ComponentCreator('/zh-CN/', 'f2e'),
    routes: [
      {
        path: '/zh-CN/',
        component: ComponentCreator('/zh-CN/', '58d'),
        routes: [
          {
            path: '/zh-CN/',
            component: ComponentCreator('/zh-CN/', '2e1'),
            routes: [
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
                component: ComponentCreator('/zh-CN/api/rpc/introduction', 'e31'),
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
                component: ComponentCreator('/zh-CN/api/rpc/providers', '937'),
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
                component: ComponentCreator('/zh-CN/api/rpc/transactions', '752'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/zh-CN/build/chain-abstraction/chain-signatures',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/chain-signatures', 'caf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/data-availability',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/data-availability', 'f88'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/fastauth-sdk',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/fastauth-sdk', '2a7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/meta-transactions',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/meta-transactions', '12f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/gas-station', '414'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/multichain-server', '6d2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example', '74a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/nft-chain-keys',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/nft-chain-keys', 'ba5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/wallet',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/wallet', '62b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/chain-abstraction/what-is',
                component: ComponentCreator('/zh-CN/build/chain-abstraction/what-is', '442'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/big-query',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/big-query', 'b1a'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-data-structures/receipt', '176'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer', 'f8d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/nft-indexer', '533'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer', '720'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework', 'f84'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake', 'e3c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer', 'e0a'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options', 'c82'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/best-practices', 'd00'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/context-object',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/context-object', 'df9'),
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
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/index-functions', 'b02'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/indexers',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/indexers', '9fa'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/intro',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/intro', '6dc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/migrate-from-near-lake', 'c1d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/data-infrastructure/query-api/query-data',
                component: ComponentCreator('/zh-CN/build/data-infrastructure/query-api/query-data', '842'),
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
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/bos-components', 'bac'),
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
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/notifications', 'd0e'),
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
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/state', '31a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/anatomy/web-methods',
                component: ComponentCreator('/zh-CN/build/near-components/anatomy/web-methods', '5a0'),
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
                component: ComponentCreator('/zh-CN/build/near-components/dev-environment', 'fa8'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/near-components/what-is',
                component: ComponentCreator('/zh-CN/build/near-components/what-is', '3d4'),
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
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-dao', 'c4b'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/create-proposal', '580'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/zh-CN/build/primitives/dao/smart-contract/vote-for-proposal', 'ae6'),
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
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-deposit-balances', 'b9d'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/get-pools', 'b25'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/zh-CN/build/primitives/dex/smart-contract/swap', '7c5'),
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
                component: ComponentCreator('/zh-CN/build/primitives/ft', '32a'),
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
                component: ComponentCreator('/zh-CN/build/primitives/ft/smart-contract/send', 'cf7'),
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
                component: ComponentCreator('/zh-CN/build/primitives/linkdrop', '4e8'),
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
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/buy', 'daa'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/mint', '0ff'),
                exact: true
              },
              {
                path: '/zh-CN/build/primitives/nft/smart-contract/query',
                component: ComponentCreator('/zh-CN/build/primitives/nft/smart-contract/query', '1c0'),
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
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/', 'b02'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/actions',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/actions', '0fd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/collections',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/collections', '754'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/crosscontract',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/crosscontract', '8f7'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/environment',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/environment', 'fb3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/functions',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/functions', '73b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/serialization',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/serialization', '18b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/storage',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/storage', 'e79'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/anatomy/types',
                component: ComponentCreator('/zh-CN/build/smart-contracts/anatomy/types', '63f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/quickstart',
                component: ComponentCreator('/zh-CN/build/smart-contracts/quickstart', 'e02'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/release/deploy',
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/deploy', 'adf'),
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
                component: ComponentCreator('/zh-CN/build/smart-contracts/release/upgrade', '926'),
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
                component: ComponentCreator('/zh-CN/build/smart-contracts/security/checklist', 'ae1'),
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
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/integration-test', '6c6'),
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
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/kurtosis-localnet', '750'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/testing/unit-test',
                component: ComponentCreator('/zh-CN/build/smart-contracts/testing/unit-test', '659'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/smart-contracts/what-is',
                component: ComponentCreator('/zh-CN/build/smart-contracts/what-is', 'b3a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/backend/',
                component: ComponentCreator('/zh-CN/build/web3-apps/backend/', 'bda'),
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
                component: ComponentCreator('/zh-CN/build/web3-apps/integrate-contracts', 'ade'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/quickstart',
                component: ComponentCreator('/zh-CN/build/web3-apps/quickstart', 'e8c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/zh-CN/build/web3-apps/what-is',
                component: ComponentCreator('/zh-CN/build/web3-apps/what-is', 'cee'),
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
                component: ComponentCreator('/zh-CN/concepts/abstraction/chain-signatures', '24d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/abstraction/introduction',
                component: ComponentCreator('/zh-CN/concepts/abstraction/introduction', '24e'),
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
                component: ComponentCreator('/zh-CN/concepts/abstraction/mpc', '9ae'),
                exact: true
              },
              {
                path: '/zh-CN/concepts/abstraction/relayers',
                component: ComponentCreator('/zh-CN/concepts/abstraction/relayers', '476'),
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
                component: ComponentCreator('/zh-CN/concepts/advanced/indexers', '74a'),
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
                component: ComponentCreator('/zh-CN/concepts/advanced/near-lake-framework', 'e09'),
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
                component: ComponentCreator('/zh-CN/concepts/data-flow/near-data-flow', '793'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/data-flow/token-transfer-flow',
                component: ComponentCreator('/zh-CN/concepts/data-flow/token-transfer-flow', '08f'),
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
                component: ComponentCreator('/zh-CN/concepts/protocol/account-id', '7d4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/account-model',
                component: ComponentCreator('/zh-CN/concepts/protocol/account-model', '4f6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/gas',
                component: ComponentCreator('/zh-CN/concepts/protocol/gas', '06a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/smartcontract',
                component: ComponentCreator('/zh-CN/concepts/protocol/smartcontract', '2cf'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-anatomy',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-anatomy', '945'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/protocol/transaction-execution',
                component: ComponentCreator('/zh-CN/concepts/protocol/transaction-execution', '251'),
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
                component: ComponentCreator('/zh-CN/concepts/storage/storage-staking', '41a'),
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
                component: ComponentCreator('/zh-CN/concepts/web3/near', 'bce'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/web3/nfts',
                component: ComponentCreator('/zh-CN/concepts/web3/nfts', 'ec2'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/concepts/welcome',
                component: ComponentCreator('/zh-CN/concepts/welcome', '57f'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/zh-CN/help',
                component: ComponentCreator('/zh-CN/help', 'c8c'),
                exact: true
              },
              {
                path: '/zh-CN/integrations/accounts',
                component: ComponentCreator('/zh-CN/integrations/accounts', '698'),
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
                component: ComponentCreator('/zh-CN/integrations/create-transactions', '9d9'),
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
                component: ComponentCreator('/zh-CN/integrations/errors/token-loss', '9f6'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/exchange-integration',
                component: ComponentCreator('/zh-CN/integrations/exchange-integration', 'ebb'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/faq',
                component: ComponentCreator('/zh-CN/integrations/faq', 'ba7'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/fungible-tokens',
                component: ComponentCreator('/zh-CN/integrations/fungible-tokens', '707'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/zh-CN/integrations/implicit-accounts',
                component: ComponentCreator('/zh-CN/integrations/implicit-accounts', '32f'),
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
                component: ComponentCreator('/zh-CN/pagoda/alerts/webhooks', '252'),
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
                component: ComponentCreator('/zh-CN/pagoda/rpc/setup', '738'),
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
                component: ComponentCreator('/zh-CN/sdk/js/building/basics', 'd53'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/sdk/js/building/prototyping',
                component: ComponentCreator('/zh-CN/sdk/js/building/prototyping', '800'),
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
                component: ComponentCreator('/zh-CN/sdk/js/introduction', '767'),
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
                component: ComponentCreator('/zh-CN/sdk/js/promises/deploy-contract', 'c9d'),
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
                component: ComponentCreator('/zh-CN/sdk/rust/building/prototyping', 'b64'),
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
                component: ComponentCreator('/zh-CN/sdk/rust/introduction', '581'),
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
                component: ComponentCreator('/zh-CN/sdk/rust/promises/deploy-contract', '8ec'),
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
                component: ComponentCreator('/zh-CN/sdk/welcome', '7bf'),
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
                component: ComponentCreator('/zh-CN/tools/indexer-for-explorer', 'f80'),
                exact: true
              },
              {
                path: '/zh-CN/tools/indexing',
                component: ComponentCreator('/zh-CN/tools/indexing', 'cc6'),
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
                component: ComponentCreator('/zh-CN/tools/near-api-js/faq', 'b84'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/near-api-js/quick-reference',
                component: ComponentCreator('/zh-CN/tools/near-api-js/quick-reference', 'e46'),
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
                component: ComponentCreator('/zh-CN/tools/near-cli', 'e87'),
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
                path: '/zh-CN/tools/wallets',
                component: ComponentCreator('/zh-CN/tools/wallets', '098'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tools/welcome',
                component: ComponentCreator('/zh-CN/tools/welcome', 'cf4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/zh-CN/tutorials/crosswords/basics/add-functions-call',
                component: ComponentCreator('/zh-CN/tutorials/crosswords/basics/add-functions-call', '7bc'),
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
                component: ComponentCreator('/zh-CN/tutorials/examples/advanced-xcc', '553'),
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
                component: ComponentCreator('/zh-CN/tutorials/examples/coin-flip', '640'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/count-near',
                component: ComponentCreator('/zh-CN/tutorials/examples/count-near', 'b7a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/donation',
                component: ComponentCreator('/zh-CN/tutorials/examples/donation', '5e1'),
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
                component: ComponentCreator('/zh-CN/tutorials/examples/frontend-multiple-contracts', '953'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/guest-book',
                component: ComponentCreator('/zh-CN/tutorials/examples/guest-book', '279'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/update-contract-migrate-state',
                component: ComponentCreator('/zh-CN/tutorials/examples/update-contract-migrate-state', 'a0d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/examples/xcc',
                component: ComponentCreator('/zh-CN/tutorials/examples/xcc', '604'),
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
                component: ComponentCreator('/zh-CN/tutorials/fts/introduction', 'd78'),
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
                component: ComponentCreator('/zh-CN/tutorials/fts/skeleton', '123'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/fts/transfers',
                component: ComponentCreator('/zh-CN/tutorials/fts/transfers', '48b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/blog-posts',
                component: ComponentCreator('/zh-CN/tutorials/near-components/blog-posts', '17c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/bos-loader',
                component: ComponentCreator('/zh-CN/tutorials/near-components/bos-loader', 'a0e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ds-components',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ds-components', '3a4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js', 'aa1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/ethers-js-best-practices',
                component: ComponentCreator('/zh-CN/tutorials/near-components/ethers-js-best-practices', '781'),
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
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/hype-indexer', '6a8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/nft-indexer', 'bbb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/zh-CN/tutorials/near-components/indexer-tutorials/posts-indexer', 'a45'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/interaction',
                component: ComponentCreator('/zh-CN/tutorials/near-components/interaction', '92f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/near-components/lido',
                component: ComponentCreator('/zh-CN/tutorials/near-components/lido', '0d2'),
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
                component: ComponentCreator('/zh-CN/tutorials/near-components/queryapi-websockets', 'e31'),
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
                component: ComponentCreator('/zh-CN/tutorials/nfts/introduction', '305'),
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
                component: ComponentCreator('/zh-CN/tutorials/nfts/js/introduction', 'c4f'),
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
                component: ComponentCreator('/zh-CN/tutorials/nfts/minting-nfts', '5c9'),
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
                component: ComponentCreator('/zh-CN/tutorials/nfts/skeleton', '46d'),
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
                path: '/zh-CN/tutorials/templates/blog',
                component: ComponentCreator('/zh-CN/tutorials/templates/blog', '5b3'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/templates/marketplace',
                component: ComponentCreator('/zh-CN/tutorials/templates/marketplace', '7a1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/zh-CN/tutorials/templates/minter',
                component: ComponentCreator('/zh-CN/tutorials/templates/minter', '34e'),
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
                component: ComponentCreator('/zh-CN/', 'ccb'),
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
