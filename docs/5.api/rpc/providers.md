---
id: providers
title: RPC Providers
---

There are multiple RPC providers from which you can choose from. These providers will work as intermediaries to help you interact with the NEAR network.
You'll experience different latency levels depending on the provider's location. You can potentially use multiple providers for redundancy and
balancing.

:::tip

If you want to use a custom RPC provider with NEAR Wallet Selector, [check this example](../../2.build/4.web3-apps/integrate-contracts.md#setting-customs-rpc-endpoints).

:::

## Mainnet

| Provider                                                                   | Endpoint Root                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [NEAR](setup.md)                                                           | `https://rpc.mainnet.near.org`                               |
| [Pagoda](https://www.pagoda.co/console)                                    | `https://rpc.mainnet.pagoda.co`                              |
| [1RPC](https://docs.1rpc.io/overview/about-1rpc)                           | `https://1rpc.io/near`                                       |
| [All That Node](https://docs.allthatnode.com/protocols/near/)              | `https://near-mainnet-rpc.allthatnode.com:3030`              |
| [ankr.com](https://www.ankr.com/docs/rpc-service/chains/chains-list/#near) | `https://rpc.ankr.com/near`                                  |
| [BlockPi](https://chains.blockpi.io/#/near)                                | `https://public-rpc.blockpi.io/http/near`                    |
| [dRPC](https://drpc.org/)                                                  | `https://near.drpc.org`                                      |
| [fast-near web4](https://github.com/vgrichina/fast-near)                   | `https://rpc.web4.near.page`                                 |
| [FASTNEAR Free](https://twitter.com/fast_near/status/1779578631318368269)  | `https://free.rpc.fastnear.com`                              |
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
| [NEAR](setup.md)                                                           | `https://rpc.testnet.near.org`                               |
| [Pagoda](https://www.pagoda.co/console)                                    | `https://rpc.testnet.pagoda.co`                              |

## RPC Failover

In `near-api-js` you can use [`FailoverRpcProvider`](../../4.tools/near-api-js/quick-reference.md#rpc-failover) to automatically switch RPC providers when one provider is experiencing downtime, or implement an RPC selection widget that allows users to add their own RPC provider.

As a user, if a dApp or wallet doesn't support RPC failover and the primary provider is down, you can use an RPC Selector browser extension to redirect all requests to an RPC provider of your choice.
