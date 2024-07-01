import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '860'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '245'),
    exact: true
  },
  {
    path: '/blog/bos-web-engine-sunset',
    component: ComponentCreator('/blog/bos-web-engine-sunset', '9ac'),
    exact: true
  },
  {
    path: '/blog/getting-started-on-windows',
    component: ComponentCreator('/blog/getting-started-on-windows', 'c31'),
    exact: true
  },
  {
    path: '/blog/reorganizing-docs',
    component: ComponentCreator('/blog/reorganizing-docs', '80a'),
    exact: true
  },
  {
    path: '/blog/sdks-unified',
    component: ComponentCreator('/blog/sdks-unified', '9f2'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '4c4'),
    exact: true
  },
  {
    path: '/blog/tags/bos',
    component: ComponentCreator('/blog/tags/bos', '330'),
    exact: true
  },
  {
    path: '/blog/tags/bwe',
    component: ComponentCreator('/blog/tags/bwe', 'dc6'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '8bc'),
    exact: true
  },
  {
    path: '/blog/tags/getting-started',
    component: ComponentCreator('/blog/tags/getting-started', '1dd'),
    exact: true
  },
  {
    path: '/blog/tags/protocol',
    component: ComponentCreator('/blog/tags/protocol', '2aa'),
    exact: true
  },
  {
    path: '/blog/tags/tutorial',
    component: ComponentCreator('/blog/tags/tutorial', 'a8f'),
    exact: true
  },
  {
    path: '/blog/tags/updates',
    component: ComponentCreator('/blog/tags/updates', '471'),
    exact: true
  },
  {
    path: '/blog/tags/vm-2',
    component: ComponentCreator('/blog/tags/vm-2', '5c9'),
    exact: true
  },
  {
    path: '/blog/tags/windows',
    component: ComponentCreator('/blog/tags/windows', '6b9'),
    exact: true
  },
  {
    path: '/blog/we-have-a-blog',
    component: ComponentCreator('/blog/we-have-a-blog', 'beb'),
    exact: true
  },
  {
    path: '/blog/yield-resume',
    component: ComponentCreator('/blog/yield-resume', 'a35'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '5de'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '406'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '5c3'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '3f8'),
            routes: [
              {
                path: '/api/rpc/access-keys',
                component: ComponentCreator('/api/rpc/access-keys', '507'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/block-chunk',
                component: ComponentCreator('/api/rpc/block-chunk', '8ab'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/contracts',
                component: ComponentCreator('/api/rpc/contracts', '57d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/gas',
                component: ComponentCreator('/api/rpc/gas', 'a6b'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/introduction',
                component: ComponentCreator('/api/rpc/introduction', '0e3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/maintenance-windows',
                component: ComponentCreator('/api/rpc/maintenance-windows', '09d'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/network',
                component: ComponentCreator('/api/rpc/network', '622'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/protocol',
                component: ComponentCreator('/api/rpc/protocol', 'cc3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/providers',
                component: ComponentCreator('/api/rpc/providers', '8d3'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/setup',
                component: ComponentCreator('/api/rpc/setup', '943'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/api/rpc/transactions',
                component: ComponentCreator('/api/rpc/transactions', '53f'),
                exact: true,
                sidebar: "api"
              },
              {
                path: '/build/chain-abstraction/chain-signatures',
                component: ComponentCreator('/build/chain-abstraction/chain-signatures', '4de'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/data-availability',
                component: ComponentCreator('/build/chain-abstraction/data-availability', 'e73'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/fastauth-sdk',
                component: ComponentCreator('/build/chain-abstraction/fastauth-sdk', 'dee'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/meta-transactions',
                component: ComponentCreator('/build/chain-abstraction/meta-transactions', '55b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/multichain-gas-relayer/gas-station',
                component: ComponentCreator('/build/chain-abstraction/multichain-gas-relayer/gas-station', 'd17'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/multichain-gas-relayer/multichain-server',
                component: ComponentCreator('/build/chain-abstraction/multichain-gas-relayer/multichain-server', '7ab'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/multichain-gas-relayer/overview',
                component: ComponentCreator('/build/chain-abstraction/multichain-gas-relayer/overview', '75f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example',
                component: ComponentCreator('/build/chain-abstraction/multichain-gas-relayer/relayer-gas-example', '080'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/nft-chain-keys',
                component: ComponentCreator('/build/chain-abstraction/nft-chain-keys', '3c5'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/wallet',
                component: ComponentCreator('/build/chain-abstraction/wallet', '093'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/chain-abstraction/what-is',
                component: ComponentCreator('/build/chain-abstraction/what-is', '410'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/big-query',
                component: ComponentCreator('/build/data-infrastructure/big-query', '756'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/block',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/block', '531'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/chunk',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/chunk', '7ec'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/execution-outcome',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/execution-outcome', '0c1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/receipt',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/receipt', '588'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/shard',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/shard', 'b60'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/state-change',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/state-change', '741'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/toc',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/toc', 'dca'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-data-structures/transaction',
                component: ComponentCreator('/build/data-infrastructure/lake-data-structures/transaction', 'af4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/building-indexers/js-lake-indexer', '527'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/building-indexers/nft-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/building-indexers/nft-indexer', '42c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/building-indexers/primitives',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/building-indexers/primitives', '860'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/building-indexers/python-lake-indexer', '186'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/building-indexers/python-nft-indexer', 'cbc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/migrating-to-near-lake-framework', '0cf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/near-lake',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/near-lake', 'dad'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer', '329'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/running-near-lake/credentials',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/running-near-lake/credentials', '6dc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/running-near-lake/lake-start-options', 'b3c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer',
                component: ComponentCreator('/build/data-infrastructure/lake-framework/running-near-lake/run-lake-indexer', '7f2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/best-practices',
                component: ComponentCreator('/build/data-infrastructure/query-api/best-practices', '10e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/context-object',
                component: ComponentCreator('/build/data-infrastructure/query-api/context-object', '6d1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/how-it-works',
                component: ComponentCreator('/build/data-infrastructure/query-api/how-it-works', 'a01'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/index-functions',
                component: ComponentCreator('/build/data-infrastructure/query-api/index-functions', '8df'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/indexers',
                component: ComponentCreator('/build/data-infrastructure/query-api/indexers', '47b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/intro',
                component: ComponentCreator('/build/data-infrastructure/query-api/intro', '848'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/migrate-from-near-lake',
                component: ComponentCreator('/build/data-infrastructure/query-api/migrate-from-near-lake', '23f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/query-api/query-data',
                component: ComponentCreator('/build/data-infrastructure/query-api/query-data', '8e2'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/data-infrastructure/what-is',
                component: ComponentCreator('/build/data-infrastructure/what-is', 'b67'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/bos-components',
                component: ComponentCreator('/build/near-components/anatomy/bos-components', 'ab0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/builtin-components',
                component: ComponentCreator('/build/near-components/anatomy/builtin-components', 'ba4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/near',
                component: ComponentCreator('/build/near-components/anatomy/near', 'dbf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/notifications',
                component: ComponentCreator('/build/near-components/anatomy/notifications', '34b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/social',
                component: ComponentCreator('/build/near-components/anatomy/social', 'cb3'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/state',
                component: ComponentCreator('/build/near-components/anatomy/state', '56a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/anatomy/web-methods',
                component: ComponentCreator('/build/near-components/anatomy/web-methods', '4f0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/bos-gateway',
                component: ComponentCreator('/build/near-components/bos-gateway', '37f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/dev-environment',
                component: ComponentCreator('/build/near-components/dev-environment', 'f94'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/near-components/what-is',
                component: ComponentCreator('/build/near-components/what-is', '33e'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/dao',
                component: ComponentCreator('/build/primitives/dao', 'e61'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/dao/bos/create-dao',
                component: ComponentCreator('/build/primitives/dao/bos/create-dao', '09b'),
                exact: true
              },
              {
                path: '/build/primitives/dao/bos/create-proposal',
                component: ComponentCreator('/build/primitives/dao/bos/create-proposal', '391'),
                exact: true
              },
              {
                path: '/build/primitives/dao/bos/get-dao-list',
                component: ComponentCreator('/build/primitives/dao/bos/get-dao-list', '36c'),
                exact: true
              },
              {
                path: '/build/primitives/dao/bos/get-proposal-list',
                component: ComponentCreator('/build/primitives/dao/bos/get-proposal-list', '628'),
                exact: true
              },
              {
                path: '/build/primitives/dao/bos/vote-for-proposal',
                component: ComponentCreator('/build/primitives/dao/bos/vote-for-proposal', '604'),
                exact: true
              },
              {
                path: '/build/primitives/dao/near-cli/create-dao',
                component: ComponentCreator('/build/primitives/dao/near-cli/create-dao', 'faa'),
                exact: true
              },
              {
                path: '/build/primitives/dao/near-cli/create-proposal',
                component: ComponentCreator('/build/primitives/dao/near-cli/create-proposal', 'a87'),
                exact: true
              },
              {
                path: '/build/primitives/dao/near-cli/get-dao-list',
                component: ComponentCreator('/build/primitives/dao/near-cli/get-dao-list', 'a77'),
                exact: true
              },
              {
                path: '/build/primitives/dao/near-cli/get-proposal-list',
                component: ComponentCreator('/build/primitives/dao/near-cli/get-proposal-list', '7d9'),
                exact: true
              },
              {
                path: '/build/primitives/dao/near-cli/vote-for-proposal',
                component: ComponentCreator('/build/primitives/dao/near-cli/vote-for-proposal', '5bf'),
                exact: true
              },
              {
                path: '/build/primitives/dao/smart-contract/create-dao',
                component: ComponentCreator('/build/primitives/dao/smart-contract/create-dao', 'cf4'),
                exact: true
              },
              {
                path: '/build/primitives/dao/smart-contract/create-proposal',
                component: ComponentCreator('/build/primitives/dao/smart-contract/create-proposal', 'f5e'),
                exact: true
              },
              {
                path: '/build/primitives/dao/smart-contract/vote-for-proposal',
                component: ComponentCreator('/build/primitives/dao/smart-contract/vote-for-proposal', '0af'),
                exact: true
              },
              {
                path: '/build/primitives/dao/web-app/create-dao',
                component: ComponentCreator('/build/primitives/dao/web-app/create-dao', '75e'),
                exact: true
              },
              {
                path: '/build/primitives/dao/web-app/create-proposal',
                component: ComponentCreator('/build/primitives/dao/web-app/create-proposal', '881'),
                exact: true
              },
              {
                path: '/build/primitives/dao/web-app/get-dao-list',
                component: ComponentCreator('/build/primitives/dao/web-app/get-dao-list', '80b'),
                exact: true
              },
              {
                path: '/build/primitives/dao/web-app/get-proposal-list',
                component: ComponentCreator('/build/primitives/dao/web-app/get-proposal-list', 'd13'),
                exact: true
              },
              {
                path: '/build/primitives/dao/web-app/vote-for-proposal',
                component: ComponentCreator('/build/primitives/dao/web-app/vote-for-proposal', 'f6b'),
                exact: true
              },
              {
                path: '/build/primitives/dex',
                component: ComponentCreator('/build/primitives/dex', 'eab'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/dex/bos/get-deposit-balances',
                component: ComponentCreator('/build/primitives/dex/bos/get-deposit-balances', '6f3'),
                exact: true
              },
              {
                path: '/build/primitives/dex/bos/get-pools',
                component: ComponentCreator('/build/primitives/dex/bos/get-pools', 'a60'),
                exact: true
              },
              {
                path: '/build/primitives/dex/bos/get-price',
                component: ComponentCreator('/build/primitives/dex/bos/get-price', 'c6e'),
                exact: true
              },
              {
                path: '/build/primitives/dex/bos/swap',
                component: ComponentCreator('/build/primitives/dex/bos/swap', '35c'),
                exact: true
              },
              {
                path: '/build/primitives/dex/near-cli/get-deposit-balances',
                component: ComponentCreator('/build/primitives/dex/near-cli/get-deposit-balances', '803'),
                exact: true
              },
              {
                path: '/build/primitives/dex/near-cli/get-pools',
                component: ComponentCreator('/build/primitives/dex/near-cli/get-pools', '935'),
                exact: true
              },
              {
                path: '/build/primitives/dex/near-cli/swap',
                component: ComponentCreator('/build/primitives/dex/near-cli/swap', '371'),
                exact: true
              },
              {
                path: '/build/primitives/dex/smart-contract/get-deposit-balances',
                component: ComponentCreator('/build/primitives/dex/smart-contract/get-deposit-balances', '0ee'),
                exact: true
              },
              {
                path: '/build/primitives/dex/smart-contract/get-pools',
                component: ComponentCreator('/build/primitives/dex/smart-contract/get-pools', '39f'),
                exact: true
              },
              {
                path: '/build/primitives/dex/smart-contract/swap',
                component: ComponentCreator('/build/primitives/dex/smart-contract/swap', '452'),
                exact: true
              },
              {
                path: '/build/primitives/dex/web-app/get-deposit-balances',
                component: ComponentCreator('/build/primitives/dex/web-app/get-deposit-balances', 'e9a'),
                exact: true
              },
              {
                path: '/build/primitives/dex/web-app/get-pools',
                component: ComponentCreator('/build/primitives/dex/web-app/get-pools', '6ac'),
                exact: true
              },
              {
                path: '/build/primitives/dex/web-app/get-price',
                component: ComponentCreator('/build/primitives/dex/web-app/get-price', '995'),
                exact: true
              },
              {
                path: '/build/primitives/dex/web-app/swap',
                component: ComponentCreator('/build/primitives/dex/web-app/swap', '01c'),
                exact: true
              },
              {
                path: '/build/primitives/ft',
                component: ComponentCreator('/build/primitives/ft', '563'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/ft/bos/attach-to-call',
                component: ComponentCreator('/build/primitives/ft/bos/attach-to-call', 'a81'),
                exact: true
              },
              {
                path: '/build/primitives/ft/bos/check-balance',
                component: ComponentCreator('/build/primitives/ft/bos/check-balance', '3af'),
                exact: true
              },
              {
                path: '/build/primitives/ft/bos/create',
                component: ComponentCreator('/build/primitives/ft/bos/create', '30b'),
                exact: true
              },
              {
                path: '/build/primitives/ft/bos/get-metadata',
                component: ComponentCreator('/build/primitives/ft/bos/get-metadata', '993'),
                exact: true
              },
              {
                path: '/build/primitives/ft/bos/register',
                component: ComponentCreator('/build/primitives/ft/bos/register', 'e0f'),
                exact: true
              },
              {
                path: '/build/primitives/ft/bos/send',
                component: ComponentCreator('/build/primitives/ft/bos/send', 'ea0'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/attach-to-call',
                component: ComponentCreator('/build/primitives/ft/near-cli/attach-to-call', 'dfd'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/check-balance',
                component: ComponentCreator('/build/primitives/ft/near-cli/check-balance', 'd86'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/create',
                component: ComponentCreator('/build/primitives/ft/near-cli/create', '17b'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/get-metadata',
                component: ComponentCreator('/build/primitives/ft/near-cli/get-metadata', '991'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/register',
                component: ComponentCreator('/build/primitives/ft/near-cli/register', '3d0'),
                exact: true
              },
              {
                path: '/build/primitives/ft/near-cli/send',
                component: ComponentCreator('/build/primitives/ft/near-cli/send', 'feb'),
                exact: true
              },
              {
                path: '/build/primitives/ft/smart-contract/attach-to-call',
                component: ComponentCreator('/build/primitives/ft/smart-contract/attach-to-call', '505'),
                exact: true
              },
              {
                path: '/build/primitives/ft/smart-contract/send',
                component: ComponentCreator('/build/primitives/ft/smart-contract/send', '828'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/attach-to-call',
                component: ComponentCreator('/build/primitives/ft/web-app/attach-to-call', '8fe'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/check-balance',
                component: ComponentCreator('/build/primitives/ft/web-app/check-balance', 'e09'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/create',
                component: ComponentCreator('/build/primitives/ft/web-app/create', 'd0c'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/get-metadata',
                component: ComponentCreator('/build/primitives/ft/web-app/get-metadata', 'c53'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/register',
                component: ComponentCreator('/build/primitives/ft/web-app/register', '839'),
                exact: true
              },
              {
                path: '/build/primitives/ft/web-app/send',
                component: ComponentCreator('/build/primitives/ft/web-app/send', 'e35'),
                exact: true
              },
              {
                path: '/build/primitives/linkdrop',
                component: ComponentCreator('/build/primitives/linkdrop', 'b77'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/nft',
                component: ComponentCreator('/build/primitives/nft', 'c2b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/nft/bos/buy',
                component: ComponentCreator('/build/primitives/nft/bos/buy', '7ea'),
                exact: true
              },
              {
                path: '/build/primitives/nft/bos/list-for-sale',
                component: ComponentCreator('/build/primitives/nft/bos/list-for-sale', '423'),
                exact: true
              },
              {
                path: '/build/primitives/nft/bos/mint',
                component: ComponentCreator('/build/primitives/nft/bos/mint', 'c36'),
                exact: true
              },
              {
                path: '/build/primitives/nft/bos/query',
                component: ComponentCreator('/build/primitives/nft/bos/query', 'd76'),
                exact: true
              },
              {
                path: '/build/primitives/nft/bos/transfer',
                component: ComponentCreator('/build/primitives/nft/bos/transfer', '95d'),
                exact: true
              },
              {
                path: '/build/primitives/nft/near-cli/buy',
                component: ComponentCreator('/build/primitives/nft/near-cli/buy', 'b80'),
                exact: true
              },
              {
                path: '/build/primitives/nft/near-cli/list-for-sale',
                component: ComponentCreator('/build/primitives/nft/near-cli/list-for-sale', '746'),
                exact: true
              },
              {
                path: '/build/primitives/nft/near-cli/mint',
                component: ComponentCreator('/build/primitives/nft/near-cli/mint', '4ef'),
                exact: true
              },
              {
                path: '/build/primitives/nft/near-cli/query',
                component: ComponentCreator('/build/primitives/nft/near-cli/query', '3f4'),
                exact: true
              },
              {
                path: '/build/primitives/nft/near-cli/transfer',
                component: ComponentCreator('/build/primitives/nft/near-cli/transfer', '8cf'),
                exact: true
              },
              {
                path: '/build/primitives/nft/smart-contract/buy',
                component: ComponentCreator('/build/primitives/nft/smart-contract/buy', '094'),
                exact: true
              },
              {
                path: '/build/primitives/nft/smart-contract/mint',
                component: ComponentCreator('/build/primitives/nft/smart-contract/mint', '552'),
                exact: true
              },
              {
                path: '/build/primitives/nft/smart-contract/query',
                component: ComponentCreator('/build/primitives/nft/smart-contract/query', '469'),
                exact: true
              },
              {
                path: '/build/primitives/nft/smart-contract/transfer',
                component: ComponentCreator('/build/primitives/nft/smart-contract/transfer', '63b'),
                exact: true
              },
              {
                path: '/build/primitives/nft/web-app/buy',
                component: ComponentCreator('/build/primitives/nft/web-app/buy', '50f'),
                exact: true
              },
              {
                path: '/build/primitives/nft/web-app/list-for-sale',
                component: ComponentCreator('/build/primitives/nft/web-app/list-for-sale', '0ec'),
                exact: true
              },
              {
                path: '/build/primitives/nft/web-app/mint',
                component: ComponentCreator('/build/primitives/nft/web-app/mint', '56a'),
                exact: true
              },
              {
                path: '/build/primitives/nft/web-app/query',
                component: ComponentCreator('/build/primitives/nft/web-app/query', '179'),
                exact: true
              },
              {
                path: '/build/primitives/nft/web-app/transfer',
                component: ComponentCreator('/build/primitives/nft/web-app/transfer', '409'),
                exact: true
              },
              {
                path: '/build/primitives/oracles',
                component: ComponentCreator('/build/primitives/oracles', 'd67'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/primitives/what-is',
                component: ComponentCreator('/build/primitives/what-is', 'f1b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/',
                component: ComponentCreator('/build/smart-contracts/anatomy/', '6cf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/actions',
                component: ComponentCreator('/build/smart-contracts/anatomy/actions', '317'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/best-practices',
                component: ComponentCreator('/build/smart-contracts/anatomy/best-practices', '3b4'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/collections',
                component: ComponentCreator('/build/smart-contracts/anatomy/collections', '17b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/crosscontract',
                component: ComponentCreator('/build/smart-contracts/anatomy/crosscontract', 'e10'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/environment',
                component: ComponentCreator('/build/smart-contracts/anatomy/environment', 'd6a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/functions',
                component: ComponentCreator('/build/smart-contracts/anatomy/functions', '95a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/reduce-size',
                component: ComponentCreator('/build/smart-contracts/anatomy/reduce-size', '347'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/reproducible-builds',
                component: ComponentCreator('/build/smart-contracts/anatomy/reproducible-builds', '3e0'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/serialization',
                component: ComponentCreator('/build/smart-contracts/anatomy/serialization', '8fd'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/serialization-protocols',
                component: ComponentCreator('/build/smart-contracts/anatomy/serialization-protocols', 'caf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/storage',
                component: ComponentCreator('/build/smart-contracts/anatomy/storage', '97d'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/anatomy/types',
                component: ComponentCreator('/build/smart-contracts/anatomy/types', '19a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/quickstart',
                component: ComponentCreator('/build/smart-contracts/quickstart', '37f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/release/deploy',
                component: ComponentCreator('/build/smart-contracts/release/deploy', 'a0b'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/release/lock',
                component: ComponentCreator('/build/smart-contracts/release/lock', 'b2f'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/release/upgrade',
                component: ComponentCreator('/build/smart-contracts/release/upgrade', 'f12'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/bounty',
                component: ComponentCreator('/build/smart-contracts/security/bounty', '821'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/callbacks',
                component: ComponentCreator('/build/smart-contracts/security/callbacks', 'd36'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/checklist',
                component: ComponentCreator('/build/smart-contracts/security/checklist', '9b9'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/frontrunning',
                component: ComponentCreator('/build/smart-contracts/security/frontrunning', '1eb'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/one-yocto',
                component: ComponentCreator('/build/smart-contracts/security/one-yocto', '550'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/random',
                component: ComponentCreator('/build/smart-contracts/security/random', 'faa'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/reentrancy',
                component: ComponentCreator('/build/smart-contracts/security/reentrancy', '4bc'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/storage',
                component: ComponentCreator('/build/smart-contracts/security/storage', 'e43'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/sybil',
                component: ComponentCreator('/build/smart-contracts/security/sybil', 'b8a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/security/welcome',
                component: ComponentCreator('/build/smart-contracts/security/welcome', '379'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/testing/integration-test',
                component: ComponentCreator('/build/smart-contracts/testing/integration-test', '6f1'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/testing/introduction',
                component: ComponentCreator('/build/smart-contracts/testing/introduction', '57a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/testing/kurtosis-localnet',
                component: ComponentCreator('/build/smart-contracts/testing/kurtosis-localnet', 'c73'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/testing/unit-test',
                component: ComponentCreator('/build/smart-contracts/testing/unit-test', '387'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/smart-contracts/what-is',
                component: ComponentCreator('/build/smart-contracts/what-is', '07a'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/backend/',
                component: ComponentCreator('/build/web3-apps/backend/', 'f42'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/frontend',
                component: ComponentCreator('/build/web3-apps/frontend', 'f38'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/integrate-components',
                component: ComponentCreator('/build/web3-apps/integrate-components', '006'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/integrate-contracts',
                component: ComponentCreator('/build/web3-apps/integrate-contracts', 'c22'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/quickstart',
                component: ComponentCreator('/build/web3-apps/quickstart', 'c65'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/web3-apps/what-is',
                component: ComponentCreator('/build/web3-apps/what-is', 'ccf'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/build/welcome',
                component: ComponentCreator('/build/welcome', 'f4c'),
                exact: true,
                sidebar: "build"
              },
              {
                path: '/concepts/abstraction/chain-signatures',
                component: ComponentCreator('/concepts/abstraction/chain-signatures', '706'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/abstraction/introduction',
                component: ComponentCreator('/concepts/abstraction/introduction', '9e0'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/abstraction/meta-transactions',
                component: ComponentCreator('/concepts/abstraction/meta-transactions', '55d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/abstraction/relayers',
                component: ComponentCreator('/concepts/abstraction/relayers', 'fe4'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/abstraction/signatures/use-cases',
                component: ComponentCreator('/concepts/abstraction/signatures/use-cases', '229'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/advanced/indexers',
                component: ComponentCreator('/concepts/advanced/indexers', '0e5'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/advanced/near-indexer-framework',
                component: ComponentCreator('/concepts/advanced/near-indexer-framework', 'b45'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/advanced/near-lake-framework',
                component: ComponentCreator('/concepts/advanced/near-lake-framework', 'c73'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/advanced/specification',
                component: ComponentCreator('/concepts/advanced/specification', '7d9'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/epoch',
                component: ComponentCreator('/concepts/basics/epoch', 'd2f'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/networks',
                component: ComponentCreator('/concepts/basics/networks', '490'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/protocol',
                component: ComponentCreator('/concepts/basics/protocol', '2cf'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/runtime',
                component: ComponentCreator('/concepts/basics/runtime', '915'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/token-loss',
                component: ComponentCreator('/concepts/basics/token-loss', '20d'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/tokens',
                component: ComponentCreator('/concepts/basics/tokens', '8f3'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/basics/validators',
                component: ComponentCreator('/concepts/basics/validators', 'e69'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/data-flow/data-storage',
                component: ComponentCreator('/concepts/data-flow/data-storage', '0dd'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/data-flow/near-data-flow',
                component: ComponentCreator('/concepts/data-flow/near-data-flow', '33b'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/data-flow/token-transfer-flow',
                component: ComponentCreator('/concepts/data-flow/token-transfer-flow', '8f3'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/access-keys',
                component: ComponentCreator('/concepts/protocol/access-keys', '585'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/account-id',
                component: ComponentCreator('/concepts/protocol/account-id', 'd5c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/account-model',
                component: ComponentCreator('/concepts/protocol/account-model', '5aa'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/gas',
                component: ComponentCreator('/concepts/protocol/gas', '728'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/smartcontract',
                component: ComponentCreator('/concepts/protocol/smartcontract', '858'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/transaction-anatomy',
                component: ComponentCreator('/concepts/protocol/transaction-anatomy', '33f'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/transaction-execution',
                component: ComponentCreator('/concepts/protocol/transaction-execution', '8ce'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/protocol/transactions',
                component: ComponentCreator('/concepts/protocol/transactions', 'fc6'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/storage/storage-solutions',
                component: ComponentCreator('/concepts/storage/storage-solutions', '19c'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/storage/storage-staking',
                component: ComponentCreator('/concepts/storage/storage-staking', 'd41'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/web3/basics',
                component: ComponentCreator('/concepts/web3/basics', '74e'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/web3/economics',
                component: ComponentCreator('/concepts/web3/economics', 'c62'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/web3/intro',
                component: ComponentCreator('/concepts/web3/intro', '4ec'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/web3/near',
                component: ComponentCreator('/concepts/web3/near', 'b5a'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/web3/nfts',
                component: ComponentCreator('/concepts/web3/nfts', '7e7'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/concepts/welcome',
                component: ComponentCreator('/concepts/welcome', '8c7'),
                exact: true,
                sidebar: "concepts"
              },
              {
                path: '/help',
                component: ComponentCreator('/help', 'ea2'),
                exact: true
              },
              {
                path: '/integrations/accounts',
                component: ComponentCreator('/integrations/accounts', '465'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/balance-changes',
                component: ComponentCreator('/integrations/balance-changes', 'e73'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/create-transactions',
                component: ComponentCreator('/integrations/create-transactions', '652'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/errors/error-implementation',
                component: ComponentCreator('/integrations/errors/error-implementation', 'f34'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/errors/introduction',
                component: ComponentCreator('/integrations/errors/introduction', '944'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/errors/token-loss',
                component: ComponentCreator('/integrations/errors/token-loss', '848'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/exchange-integration',
                component: ComponentCreator('/integrations/exchange-integration', '959'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/faq',
                component: ComponentCreator('/integrations/faq', '373'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/fungible-tokens',
                component: ComponentCreator('/integrations/fungible-tokens', 'e07'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/integrations/implicit-accounts',
                component: ComponentCreator('/integrations/implicit-accounts', '472'),
                exact: true,
                sidebar: "exchanges"
              },
              {
                path: '/pagoda/alerts/intro',
                component: ComponentCreator('/pagoda/alerts/intro', '8c5'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/alerts/setup',
                component: ComponentCreator('/pagoda/alerts/setup', '4ee'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/alerts/webhooks',
                component: ComponentCreator('/pagoda/alerts/webhooks', '6c6'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/rpc/api',
                component: ComponentCreator('/pagoda/rpc/api', '36a'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/rpc/get-keys',
                component: ComponentCreator('/pagoda/rpc/get-keys', '0b9'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/rpc/intro',
                component: ComponentCreator('/pagoda/rpc/intro', 'd7f'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/rpc/setup',
                component: ComponentCreator('/pagoda/rpc/setup', '149'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/pagoda/rpc/stats',
                component: ComponentCreator('/pagoda/rpc/stats', '7c4'),
                exact: true,
                sidebar: "pagoda"
              },
              {
                path: '/tools/explorer',
                component: ComponentCreator('/tools/explorer', '5ab'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/fastnear-api',
                component: ComponentCreator('/tools/fastnear-api', '3aa'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/indexing',
                component: ComponentCreator('/tools/indexing', '122'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/account',
                component: ComponentCreator('/tools/near-api-js/account', 'bae'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/contract',
                component: ComponentCreator('/tools/near-api-js/contract', '770'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/cookbook',
                component: ComponentCreator('/tools/near-api-js/cookbook', 'e9a'),
                exact: true
              },
              {
                path: '/tools/near-api-js/faq',
                component: ComponentCreator('/tools/near-api-js/faq', '084'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/quick-reference',
                component: ComponentCreator('/tools/near-api-js/quick-reference', '646'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/utils',
                component: ComponentCreator('/tools/near-api-js/utils', '07d'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-api-js/wallet',
                component: ComponentCreator('/tools/near-api-js/wallet', 'ba4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-cli',
                component: ComponentCreator('/tools/near-cli', '426'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/near-cli-rs',
                component: ComponentCreator('/tools/near-cli-rs', '3f6'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/sdk',
                component: ComponentCreator('/tools/sdk', '8bf'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/wallet-selector',
                component: ComponentCreator('/tools/wallet-selector', '7d1'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/wallets',
                component: ComponentCreator('/tools/wallets', '52f'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tools/welcome',
                component: ComponentCreator('/tools/welcome', '9b4'),
                exact: true,
                sidebar: "tools"
              },
              {
                path: '/tutorials/crosswords/basics/add-functions-call',
                component: ComponentCreator('/tutorials/crosswords/basics/add-functions-call', '25b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/basics/hashing-and-unit-tests',
                component: ComponentCreator('/tutorials/crosswords/basics/hashing-and-unit-tests', 'fc0'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/basics/overview',
                component: ComponentCreator('/tutorials/crosswords/basics/overview', '206'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/basics/set-up-skeleton',
                component: ComponentCreator('/tutorials/crosswords/basics/set-up-skeleton', '993'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/basics/simple-frontend',
                component: ComponentCreator('/tutorials/crosswords/basics/simple-frontend', '1c8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/actions',
                component: ComponentCreator('/tutorials/crosswords/beginner/actions', '0f1'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/adding-a-puzzle',
                component: ComponentCreator('/tutorials/crosswords/beginner/adding-a-puzzle', 'fb8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/collections',
                component: ComponentCreator('/tutorials/crosswords/beginner/collections', '210'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/logging-in',
                component: ComponentCreator('/tutorials/crosswords/beginner/logging-in', '871'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/logging-in-implementation',
                component: ComponentCreator('/tutorials/crosswords/beginner/logging-in-implementation', 'c64'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/overview',
                component: ComponentCreator('/tutorials/crosswords/beginner/overview', '683'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/beginner/structs-enums',
                component: ComponentCreator('/tutorials/crosswords/beginner/structs-enums', '9f4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/access-key-solution',
                component: ComponentCreator('/tutorials/crosswords/intermediate/access-key-solution', '9c9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/base64vecu8',
                component: ComponentCreator('/tutorials/crosswords/intermediate/base64vecu8', 'cd4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/cross-contract-calls',
                component: ComponentCreator('/tutorials/crosswords/intermediate/cross-contract-calls', '855'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/linkdrop',
                component: ComponentCreator('/tutorials/crosswords/intermediate/linkdrop', 'ebf'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/overview',
                component: ComponentCreator('/tutorials/crosswords/intermediate/overview', '4e2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/crosswords/intermediate/use-seed-phrase',
                component: ComponentCreator('/tutorials/crosswords/intermediate/use-seed-phrase', 'c5a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/advanced-xcc',
                component: ComponentCreator('/tutorials/examples/advanced-xcc', '056'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/coin-flip',
                component: ComponentCreator('/tutorials/examples/coin-flip', 'eb9'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/count-near',
                component: ComponentCreator('/tutorials/examples/count-near', '400'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/donation',
                component: ComponentCreator('/tutorials/examples/donation', '9ee'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/factory',
                component: ComponentCreator('/tutorials/examples/factory', 'd15'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/frontend-multiple-contracts',
                component: ComponentCreator('/tutorials/examples/frontend-multiple-contracts', '0a4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/guest-book',
                component: ComponentCreator('/tutorials/examples/guest-book', '839'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/update-contract-migrate-state',
                component: ComponentCreator('/tutorials/examples/update-contract-migrate-state', '61a'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/examples/xcc',
                component: ComponentCreator('/tutorials/examples/xcc', '87e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/circulating-supply',
                component: ComponentCreator('/tutorials/fts/circulating-supply', 'b53'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/defining-a-token',
                component: ComponentCreator('/tutorials/fts/defining-a-token', '573'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/introduction',
                component: ComponentCreator('/tutorials/fts/introduction', '479'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/marketplace',
                component: ComponentCreator('/tutorials/fts/marketplace', 'ee5'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/predeployed-contract',
                component: ComponentCreator('/tutorials/fts/predeployed-contract', '513'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/registering-accounts',
                component: ComponentCreator('/tutorials/fts/registering-accounts', '9ce'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/skeleton',
                component: ComponentCreator('/tutorials/fts/skeleton', '51e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/fts/transfers',
                component: ComponentCreator('/tutorials/fts/transfers', 'fc4'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/blog-posts',
                component: ComponentCreator('/tutorials/near-components/blog-posts', '803'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/bos-loader',
                component: ComponentCreator('/tutorials/near-components/bos-loader', 'dd2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/ds-components',
                component: ComponentCreator('/tutorials/near-components/ds-components', '06e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/ethers-js',
                component: ComponentCreator('/tutorials/near-components/ethers-js', '6ec'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/ethers-js-best-practices',
                component: ComponentCreator('/tutorials/near-components/ethers-js-best-practices', 'a50'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/indexer-tutorials/feed-indexer',
                component: ComponentCreator('/tutorials/near-components/indexer-tutorials/feed-indexer', '391'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/indexer-tutorials/hype-indexer',
                component: ComponentCreator('/tutorials/near-components/indexer-tutorials/hype-indexer', 'a71'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/indexer-tutorials/nft-indexer',
                component: ComponentCreator('/tutorials/near-components/indexer-tutorials/nft-indexer', '212'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/indexer-tutorials/posts-indexer',
                component: ComponentCreator('/tutorials/near-components/indexer-tutorials/posts-indexer', '2c7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/interaction',
                component: ComponentCreator('/tutorials/near-components/interaction', '431'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/lido',
                component: ComponentCreator('/tutorials/near-components/lido', '3b2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/push-notifications',
                component: ComponentCreator('/tutorials/near-components/push-notifications', 'e1c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/queryapi-websockets',
                component: ComponentCreator('/tutorials/near-components/queryapi-websockets', '885'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/near-components/using-iframes',
                component: ComponentCreator('/tutorials/near-components/using-iframes', '4fd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/approvals',
                component: ComponentCreator('/tutorials/nfts/approvals', '97b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/core',
                component: ComponentCreator('/tutorials/nfts/core', '5c8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/enumeration',
                component: ComponentCreator('/tutorials/nfts/enumeration', '97c'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/events',
                component: ComponentCreator('/tutorials/nfts/events', '40b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/introduction',
                component: ComponentCreator('/tutorials/nfts/introduction', 'f88'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/approvals',
                component: ComponentCreator('/tutorials/nfts/js/approvals', '759'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/core',
                component: ComponentCreator('/tutorials/nfts/js/core', '55f'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/enumeration',
                component: ComponentCreator('/tutorials/nfts/js/enumeration', '1ea'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/events',
                component: ComponentCreator('/tutorials/nfts/js/events', '4be'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/introduction',
                component: ComponentCreator('/tutorials/nfts/js/introduction', '1d8'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/marketplace',
                component: ComponentCreator('/tutorials/nfts/js/marketplace', '65b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/minting',
                component: ComponentCreator('/tutorials/nfts/js/minting', '5ab'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/predeployed-contract',
                component: ComponentCreator('/tutorials/nfts/js/predeployed-contract', 'cd6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/royalty',
                component: ComponentCreator('/tutorials/nfts/js/royalty', '0ec'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/skeleton',
                component: ComponentCreator('/tutorials/nfts/js/skeleton', '5bd'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/js/upgrade-contract',
                component: ComponentCreator('/tutorials/nfts/js/upgrade-contract', '27d'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/marketplace',
                component: ComponentCreator('/tutorials/nfts/marketplace', '94e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/minecraft-nfts',
                component: ComponentCreator('/tutorials/nfts/minecraft-nfts', '561'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/minting',
                component: ComponentCreator('/tutorials/nfts/minting', '182'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/minting-nft-frontend',
                component: ComponentCreator('/tutorials/nfts/minting-nft-frontend', '824'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/minting-nfts',
                component: ComponentCreator('/tutorials/nfts/minting-nfts', 'a9e'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/predeployed-contract',
                component: ComponentCreator('/tutorials/nfts/predeployed-contract', 'bd6'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/royalty',
                component: ComponentCreator('/tutorials/nfts/royalty', '146'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/series',
                component: ComponentCreator('/tutorials/nfts/series', 'a71'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/skeleton',
                component: ComponentCreator('/tutorials/nfts/skeleton', '7fb'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/nfts/upgrade-contract',
                component: ComponentCreator('/tutorials/nfts/upgrade-contract', 'f8b'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/templates/blog',
                component: ComponentCreator('/tutorials/templates/blog', '8f7'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/templates/marketplace',
                component: ComponentCreator('/tutorials/templates/marketplace', '705'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/templates/minter',
                component: ComponentCreator('/tutorials/templates/minter', '240'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/tutorials/welcome',
                component: ComponentCreator('/tutorials/welcome', 'cc2'),
                exact: true,
                sidebar: "tutorials"
              },
              {
                path: '/',
                component: ComponentCreator('/', '9e1'),
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
