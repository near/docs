---
id: introduction
sidebar_label: Home
title: NEAR RPC API
---



The RPC API allows you to communicate directly with the NEAR network. For example,
tools such as [near-api](../../tools/near-api.md) are just abstractions making RPC calls.

<hr className="subsection" />

## RPC Providers

There are multiple [RPC providers which you can choose from](./providers.md). These providers will work as intermediaries to help you interact with the NEAR network.

## Node Snapshots

⚠️ **FREE SNAPSHOT SERVICE BY FASTNEAR WILL BE DEPRECATGED STARTING JUNE 1ST, 2025. We strongly recommend all node operators to use [Epoch Sync](https://near-nodes.io/intro/node-epoch-sync) when possible.**

If you're looking for node snapshots  in order to set up a validator node or RPC, you can download the latest NEAR blockchain state from:

- [Allnodes](https://www.publicnode.com/snapshots#near)
- [FastNEAR](https://docs.fastnear.com/docs/snapshots)

<hr className="subsection" />

## NEAR RPC - Quick Links

| API                                                 | Description                                                                  |
|-----------------------------------------------------|------------------------------------------------------------------------------|
| [Access Keys](/api/rpc/access-keys)                 | Retrieve information about an account's access keys.                         |
| [Accounts / Contracts](/api/rpc/contracts)          | View details about accounts and contracts as well as perform contract calls. |
| [Block / Chunk](/api/rpc/block-chunk)               | Query the network and get details about specific blocks or chunks.           |
| [Gas](/api/rpc/gas)                                 | Get gas price for a specific block or hash.                                  |
| [Protocol](/api/rpc/protocol)                       | Retrieve current genesis and protocol configuration.                         |
| [Network](/api/rpc/network)                         | Return status information for nodes and validators.                          |
| [Transactions](/api/rpc/transactions)               | Send transactions and query their status.                                    |

:::tip
You can access the JSON RPC 2.0 endpoints using [Postman](/api/rpc/setup#postman-setup),
[JavaScript](/api/rpc/setup#javascript-setup), and [HTTPie](/api/rpc/setup#httpie-setup).
:::
