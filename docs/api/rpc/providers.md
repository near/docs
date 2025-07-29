---
id: providers
title: RPC Providers
description: "Comprehensive list of NEAR RPC providers for mainnet and testnet, including public endpoints, archival nodes, and information about the deprecation of NEAR.org RPC endpoints."
---

There are multiple RPC providers from which you can choose from. These providers will work as intermediaries to help you interact with the NEAR network.
You'll experience different latency levels depending on the provider's location. You can potentially use multiple providers for redundancy and
balancing.

:::tip

If you want to use a custom RPC provider with NEAR Wallet Selector, [check this example](../../web3-apps/integrate-contracts.md#setting-customs-rpc-endpoints).

:::

## Mainnet

| Provider                                                                   | Endpoint Root                                                | Public Endpoint    | Archival Node      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------ | ------------------ |
| [1RPC](https://1rpc.io/)                                                    | `https://1rpc.io/near`                                       | :heavy_check_mark: |                    |
| [All That Node](https://www.allthatnode.com/)                              | `https://allthatnode.com/protocol/near.dsrv`                 |                    | :heavy_check_mark: |
| [ankr.com](https://www.ankr.com/docs/rpc-service/chains/chains-list/#near) | `https://rpc.ankr.com/near`                                  |                    |                    |
| [BlockPI Network](https://blockpi.io)                                      | `https://near.blockpi.network/v1/rpc/public`                 | :heavy_check_mark: |                    |
| [dRPC](https://drpc.org/)                                                  | `https://near.drpc.org`                                      | :heavy_check_mark: |                    |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.near.page`                                 | :heavy_check_mark: |                    |
| [FASTNEAR](https://fastnear.com)                                           | `https://free.rpc.fastnear.com`                              | :heavy_check_mark: | :heavy_check_mark: |
| [GetBlock](https://getblock.io/nodes/near/)                                | `https://getblock.io/nodes/near/`                            |                    |                    |
| [Grove](https://grove.city)                                                | `https://near.rpc.grove.city/v1/01fdb492`                     | :heavy_check_mark: | :heavy_check_mark: |
| [Lava Network](https://www.lavanet.xyz/get-started/near)                   | `https://near.lava.build:443`                                | :heavy_check_mark: | :heavy_check_mark: |
| [Lavender.Five Nodes](https://lavenderfive.com/)                           | `https://near.lavenderfive.com/`                             |                    |                    |
| [NodeReal](https://nodereal.io)                                            | `https://nodereal.io/api-marketplace/near-rpc`               |                    |                    |
| [NOWNodes](https://nownodes.io/)                                           | `https://near.nownodes.io/`                                  |                    |                    |
| [OMNIA](https://omniatech.io)                                              | `https://endpoints.omniatech.io/v1/near/mainnet/public`      | :heavy_check_mark: |                    |
| [QuickNode](https://www.quicknode.com/chains/near)                         | -                                                            |                    |                    |
| [Seracle](https://docs.seracle.com/)                                       | `https://api.seracle.com/saas/baas/rpc/near/mainnet/public/` |                    |                    |
| [Tatum](https://tatum.io/chain/near/)                                      | `https://near-mainnet.gateway.tatum.io/`                     |                    |                    |
| [Zeeve](https://www.zeeve.io/)                                             | -                                                            | :heavy_check_mark: | :heavy_check_mark: |

## Testnet

| Provider                                                                   | Endpoint Root                                                | Public Endpoint    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------ |
| [FASTNEAR](https://fastnear.com)                                           | `https://test.rpc.fastnear.com`                              | :heavy_check_mark: | 
| [All That Node](https://www.allthatnode.com/)                              | `https://allthatnode.com/protocol/near.dsrv`                 |                    |
| [dRPC](https://drpc.org/)                                                  | `https://near-testnet.drpc.org`                              | :heavy_check_mark: |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.testnet.page/account/testnet`              | :heavy_check_mark: |
| [FASTNEAR](https://fastnear.com)                                           | `https://rpc.testnet.fastnear.com`                           | :heavy_check_mark: |
| [Lava Network](https://www.lavanet.xyz/get-started/near)                   | `https://neart.lava.build:443`                               | :heavy_check_mark: |
| [QuickNode](https://www.quicknode.com/chains/near)                         | -                                                            |                    |
| [Tatum](https://tatum.io/chain/near/)                                      | `https://near-testnet.gateway.tatum.io/`                     |                    |
| [Zeeve](https://www.zeeve.io/)                                             | -                                                            |                    |



## RPC Failover

In `near-api-js` you can use [`FailoverRpcProvider`](../../tools/near-api.md#rpc-failover) to automatically switch RPC providers when one provider is experiencing downtime, or implement an RPC selection widget that allows users to add their own RPC provider.

As a user, if a dApp or wallet doesn't support RPC failover and the primary provider is down, you can use an RPC Selector browser extension to redirect all requests to an RPC provider of your choice.

## On NEAR.org RPC Deprecation

Please read the following announcement: [Deprecation of NEAR.org and Pagoda.co RPC Endpoints](https://near.org/blog/deprecation-of-near-org-and-pagoda-co-rpc-endpoints/).

> After careful consideration and approval by the Infrastructure Committee, NEAR will implement a phased deprecation of the free public RPC endpoints under `near.org` and `pagoda.co`, beginning June 1, 2025. This deprecation aims to create a more sustainable and decentralized ecosystem, and follows [Pagoda winding down operations](https://near.org/blog/ecosystem-update-announcing-near-one-chain-abstraction-spinouts) and decentralizing its functions into NEAR ecosystem teams and committees.

All public RPC endpoints under the `near.org` and `pagoda.co` domains, including both regular and archival endpoints, will undergo a gradual deprecation through increasingly restricted rate limits. These changes will affect all of the following endpoints:

- `rpc.*.near.org`
- `archival-rpc.*.near.org`
- `rpc.*.pagoda.co`
- `archival-rpc.*.pagoda.co`
- Additional related endpoints (v2, internal, beta)

### Rate-limits of NEAR.org RPC endpoints

New 10 minutes rate-limits will be implemented to prevent production usage of the RPC endpoints.

The deprecation will occur in three phases:

### Phase 1: Beginning June 1st, 2025
- RPC Mainnet: 120 RPM, 600 requests per 10 minutes
- RPC Testnet: 120 RPM, 600 requests per 10 minutes
- Archival-RPC Mainnet: 16 RPM, 80 requests per 10 minutes
- Archival-RPC Testnet: 80 RPM, 400 requests per 10 minutes

### Phase 2: Beginning July 1st, 2025
- RPC Mainnet: 60 RPM, 150 requests per 10 minutes
- RPC Testnet: 60 RPM, 150 requests per 10 minutes
- Archival-RPC Mainnet: 8 RPM, 20 requests per 10 minutes
- Archival-RPC Testnet: 40 RPM, 100 requests per 10 minutes

### Phase 3: Beginning August 1st, 2025
- RPC Mainnet: 30 RPM, 75 requests per 10 minutes
- RPC Testnet: 30 RPM, 75 requests per 10 minutes
- Archival-RPC Mainnet: 4 RPM, 10 requests per 10 minutes
- Archival-RPC Testnet: 20 RPM, 50 requests per 10 minutes

After August 1st, FastNear will continue to maintain these endpoints with the final reduced rate limits to prevent complete breakage of legacy tools, but they will be considered fully deprecated.

**We strongly recommend that all developers migrate away from these endpoints entirely by June 1st, 2025.**

After this date, any large-scale backend usage may be blocked by IP address. The short-term burst limits combined with tight per-minute restrictions will make these endpoints unsuitable for continuous usage.
