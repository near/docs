---
id: providers
title: RPC Providers
---

There are multiple RPC providers from which you can choose from. These providers will work as intermediaries to help you interact with the NEAR network.
You'll experience different latency levels depending on the provider's location. You can potentially use multiple providers for redundancy and
balancing.

:::tip

If you want to use a custom RPC provider with NEAR Wallet Selector, [check this example](../../web3-apps/integrate-contracts.md#setting-customs-rpc-endpoints).

:::

## Mainnet

| Provider                                                                   | Endpoint Root                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [NEAR.org (deprecated)](setup.md)                                          | `https://rpc.mainnet.near.org`                               |
| [1RPC](https://docs.1rpc.io/overview/about-1rpc)                           | `https://1rpc.io/near`                                       |
| [All That Node](https://www.allthatnode.com/protocol/near.dsrv)            | `https://near-mainnet-rpc.allthatnode.com:3030`              |
| [ankr.com](https://www.ankr.com/docs/rpc-service/chains/chains-list/#near) | `https://rpc.ankr.com/near`                                  |
| [BlockPI Network](https://blockpi.io)                                      | `https://near.blockpi.network/v1/rpc/public`                 |
| [dRPC](https://drpc.org/)                                                  | `https://near.drpc.org`                                      |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.near.page`                                 |
| [FASTNEAR](https://fastnear.com)                                           | `https://free.rpc.fastnear.com`                              |
| [Gateway.fm](https://gateway.fm/)                                          | `https://rpc.near.gateway.fm/`                               |
| [GetBlock](https://getblock.io/nodes/near/)                                | `https://getblock.io/nodes/near/`                            |
| [Lava Network](https://www.lavanet.xyz/get-started/near)                   | `https://near.lava.build`                                    |
| [Lavender.Five Nodes](https://lavenderfive.com/)                           | `https://near.lavenderfive.com/`                             |
| [NodeReal](https://nodereal.io)                                            | `https://nodereal.io/api-marketplace/near-rpc`               |
| [NOWNodes](https://nownodes.io/)                                           | `https://near.nownodes.io/`                                  |
| [OMNIA](https://omniatech.io)                                              | `https://endpoints.omniatech.io/v1/near/mainnet/public`      |
| [QuickNode](https://www.quicknode.com/chains/near)                         | -                                                            |
| [Seracle](https://docs.seracle.com/)                                       | `https://api.seracle.com/saas/baas/rpc/near/mainnet/public/` |
| [Zeeve](https://www.zeeve.io/)                                             | -                                                            |

## Testnet

| Provider                                                                   | Endpoint Root                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [NEAR.org (deprecated)](setup.md)                                          | `https://rpc.testnet.near.org`                               |
| [FASTNEAR](https://fastnear.com)                                           | `https://test.rpc.fastnear.com`                              |

## RPC Failover

In `near-api-js` you can use [`FailoverRpcProvider`](../../4.tools/near-api.md#rpc-failover) to automatically switch RPC providers when one provider is experiencing downtime, or implement an RPC selection widget that allows users to add their own RPC provider.

As a user, if a dApp or wallet doesn't support RPC failover and the primary provider is down, you can use an RPC Selector browser extension to redirect all requests to an RPC provider of your choice.

## On NEAR.org RPC Deprecation

Please read the following announcement: [Future of Pagoda Services](/blog/2024-08-13-pagoda-services).

> The Infrastructure Committee feels that Pagoda's fully-subsidized near.org RPC service is getting in the way of decentralization efforts and is preventing high-quality commercial RPC offerings from gaining traction. If a NEAR core team continues to support a free-to-use near.org RPC service, it will be required to gradually lower its rate limits over the coming months to prevent abuse. In light of this proposed change, high-traffic near.org RPC users should start making plans to switch to other RPC providers.

### The current rate-limits of NEAR.org RPC endpoints

Starting December 1st, 2024:

* **RPC Mainnet**: 2000 requests/30s per IP
* **RPC Testnet**: 900 requests/30s per IP
* **Archival-RPC Mainnet**: 200 requests/30s IP
* **Archival-RPC Testnet**: 400 requests/30s per IP

Starting January 1st, 2025:

* **RPC Mainnet**: 500 requests/30s per IP or referrer
* **RPC Testnet**: 600 requests/30s per IP or referrer
* **Archival-RPC Mainnet**: 100 requests/30s per IP or referrer
* **Archival-RPC Testnet**: 200 requests/30s per IP or referrer

Starting February 1st, 2025

* **RPC Mainnet**: 150 req/30s per IP or referrer
* **RPC Testnet**: 300 requests/30s per IP or referrer
* **Archival-RPC Mainnet**: 20 requests/30s per IP or referrer
* **Archival-RPC Testnet**: 100 requests/30s per IP or referrer

:::note
Rate limits will be applied by IP or by the HTTP `Referer` header, whichever hits first. Frontend applications will likely be rate-limited by the referrer, while backend applications will likely be rate-limited by the IP address.
:::

