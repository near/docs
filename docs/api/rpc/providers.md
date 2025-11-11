---
id: providers
title: RPC Providers
description: "Discover NEAR RPC providers for mainnet and testnet"
---

There are multiple RPC providers from which you can choose from. These providers will work as intermediaries to help you interact with the NEAR network.
You'll experience different latency levels depending on the provider's location. You can potentially use multiple providers for redundancy and
balancing.

:::tip

If you want to use a custom RPC provider with NEAR Wallet Selector, [check this example](../../web3-apps/tutorials/web-login/wallet-selector.md#custom-rpc).

:::

## Mainnet

| Provider                                                                   | Endpoint Root                                                | Free Tier          | Rate Limits (Free)            | Archival Node      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------ | ----------------------------- | ------------------ |
| [1RPC](https://docs.1rpc.io/)                                              | `https://1rpc.io/near`                                       | :heavy_check_mark: | Public access                 |                    |
| [All That Node](https://www.allthatnode.com/)                              | `https://allthatnode.com/protocol/near.dsrv`                 | ⚠️ Limited         | Contact provider              | :heavy_check_mark: |
| [ankr.com](https://www.ankr.com/docs/rpc-service/chains/chains-list/#near) | `https://rpc.ankr.com/near`                                  | :heavy_check_mark: | 200M credits/mo, 30 req/sec   |                    |
| [BlockPI Network](https://blockpi.io)                                      | `https://near.blockpi.network/v1/rpc/public`                 | :heavy_check_mark: | Public access                 |                    |
| [dRPC](https://drpc.org/)                                                  | `https://near.drpc.org`                                      | :heavy_check_mark: | 210M CU/mo, ~100 req/sec      |                    |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.near.page`                                 | :heavy_check_mark: | Public access                 |                    |
| [FASTNEAR](https://fastnear.com)                                           | `https://free.rpc.fastnear.com`                              | :heavy_check_mark: | Public access, [monitored](https://grafana.fastnear.com/public-dashboards/577b37c6cfe84b2bae23af471d27cade) | :heavy_check_mark: |
| [GetBlock](https://getblock.io/nodes/near/)                                | `https://getblock.io/nodes/near/`                            | ❌                  | Paid only                     |                    |
| [Grove](https://grove.city)                                                | `https://near.rpc.grove.city/v1/01fdb492`                    | :heavy_check_mark: | Public access                 | :heavy_check_mark: |
| [Lava Network](https://www.lavanet.xyz/get-started/near)                   | `https://near.lava.build:443`                                | :heavy_check_mark: | Up to 30 req/sec              | :heavy_check_mark: |
| [Intear RPC](https://github.com/INTEARnear)                                | `https://rpc.intea.rs`                                       | :heavy_check_mark: | Public access                 |                    |
| [Lavender.Five Nodes](https://lavenderfive.com/)                           | `https://near.lavenderfive.com/`                             | ⚠️ Limited         | Contact provider              |                    |
| [NodeReal](https://nodereal.io)                                            | `https://nodereal.io/api-marketplace/near-rpc`               | ❌                  | Paid only                     |                    |
| [NOWNodes](https://nownodes.io/)                                           | `https://near.nownodes.io/`                                  | ❌                  | Paid only                     |                    |
| [OMNIA](https://omniatech.io)                                              | `https://endpoints.omniatech.io/v1/near/mainnet/public`      | :heavy_check_mark: | Public access                 |                    |
| [QuickNode](https://www.quicknode.com/chains/near)                         | -                                                            | 🔵 Trial           | 10M credits trial             |                    |
| [Seracle](https://docs.seracle.com/)                                       | `https://api.seracle.com/saas/baas/rpc/near/mainnet/public/` | ⚠️ Limited         | Contact provider              |                    |
| [Shitzu](https://shitzuapes.xyz/)                                          | `https://rpc.shitzuapes.xyz`                                 | :heavy_check_mark: | Public access                 |                    |
| [Tatum](https://tatum.io/chain/near/)                                      | `https://near-mainnet.gateway.tatum.io/`                     | ⚠️ Limited         | Contact provider              |                    |
| [ZAN](https://zan.top/service/apikeys)                                     | `https://api.zan.top/node/v1/near/mainnet/`                  | ⚠️ Limited         | Contact provider              |                    |
| [Zeeve](https://www.zeeve.io/)                                             | -                                                            | ⚠️ Limited         | Contact provider              | :heavy_check_mark: |

**Legend:**
- ✅ **Free Tier**: Fully free with public access
- 🔵 **Trial**: Free trial period with credits
- ⚠️ **Limited**: Free tier available but with restrictions (contact provider for details)
- ❌ **Paid Only**: No free tier available

### Choosing the Right Provider

When selecting an RPC provider, consider the following factors:

**For Development & Testing:**
- **FASTNEAR**, **1RPC**, or **Lava Network** offer generous free tiers with good monitoring
- Testnet providers are ideal for development without worrying about rate limits

**For Production Applications:**
- **ankr.com**: 200M credits/month with clear limits (30 req/sec)
- **dRPC**: 210M compute units/month with ~100 req/sec
- **Lava Network**: Up to 30 req/sec without strict rate limits
- Consider multiple providers for redundancy (see [RPC Failover](#rpc-failover) below)

**For High-Volume Applications:**
- Paid tiers from **QuickNode**, **GetBlock**, or **NOWNodes**
- Consider running your own NEAR node for maximum control

**For Monitoring & Reliability:**
- Check [FastNear's Grafana dashboard](https://grafana.fastnear.com/public-dashboards/577b37c6cfe84b2bae23af471d27cade) for real-time performance metrics
- Use providers with archival nodes if you need historical data (older than 5 epochs/~2.5 days)

:::tip Performance Monitoring
FastNear maintains a [comprehensive Grafana dashboard](https://grafana.fastnear.com/public-dashboards/577b37c6cfe84b2bae23af471d27cade) with response times for most publicly and freemium available endpoints. Use this to compare performance across different regions and providers.
:::

## Testnet

| Provider                                                                   | Endpoint Root                                                | Free Tier          | Rate Limits (Free)            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------ | ----------------------------- |
| [FASTNEAR](https://fastnear.com)                                           | `https://test.rpc.fastnear.com`                              | :heavy_check_mark: | Public access, [monitored](https://grafana.fastnear.com/public-dashboards/577b37c6cfe84b2bae23af471d27cade) |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.testnet.page/account/testnet`              | :heavy_check_mark: | Public access                 |
| [FASTNEAR](https://fastnear.com)                                           | `https://rpc.testnet.fastnear.com`                           | :heavy_check_mark: | Public access                 |
| [dRPC](https://drpc.org/)                                                  | `https://near-testnet.drpc.org`                              | :heavy_check_mark: | 210M CU/mo, ~100 req/sec      |
| [Intear RPC](https://github.com/INTEARnear)                                | `https://testnet-rpc.intea.rs`                               | :heavy_check_mark: | Public access                 |
| [Lava Network](https://www.lavanet.xyz/get-started/near)                   | `https://neart.lava.build:443`                               | :heavy_check_mark: | Up to 30 req/sec              |
| [All That Node](https://www.allthatnode.com/)                              | `https://allthatnode.com/protocol/near.dsrv`                 | ⚠️ Limited         | Contact provider              |
| [ZAN](https://zan.top/service/apikeys)                                     | `https://api.zan.top/node/ws/v1/near/testnet`                | ⚠️ Limited         | Contact provider              |
| [QuickNode](https://www.quicknode.com/chains/near)                         | -                                                            | 🔵 Trial           | 10M credits trial             |
| [Tatum](https://tatum.io/chain/near/)                                      | `https://near-testnet.gateway.tatum.io/`                     | ⚠️ Limited         | Contact provider              |
| [Zeeve](https://www.zeeve.io/)                                             | -                                                            | ⚠️ Limited         | Contact provider              |

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
