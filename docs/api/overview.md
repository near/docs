---
id: overview
title: NEAR APIs
sidebar_label: Overview
---

Take a look at the different available APIs to help you build amazing apps on NEAR.

## RPC API

[NEAR RPC API](/docs/api/rpc) provides a simple JSON RPC 2.0 API to interact with the NEAR blockchain.

| API | Description |
|-----|-------------|
| [Access Keys](/docs/api/rpc/access-keys) | Retrieve information about an account's access keys. |
| [Accounts / Contracts](/docs/api/rpc/contracts) | View details about accounts and contracts as well as perform contract calls. |
| [Block / Chunk](/docs/api/rpc/block-chunk) | Query the network and get details about specific blocks or chunks. |
| [Gas](/docs/api/rpc/gas) | Get gas price for a specific block or hash. |
| [Protocol](/docs/api/rpc/protocol) | Retrieve current genesis and protocol configuration. |
| [Network](/docs/api/rpc/network) | Return status information for nodes and validators. |
| [Transactions](/docs/api/rpc/transactions) | Send transactions and query their status. |
| [Sandbox](/docs/api/rpc/sandbox) | Patch state on a local sandbox node. |

> **Tip:** You can access the JSON RPC 2.0 endpoints using [Postman](/docs/api/rpc#postman-setup),
> [JavaScript](/docs/api/rpc#javascript-setup), and [HTTPie](/docs/api/rpc#httpie-setup).

## REST Server

[NEAR REST API Server](/docs/api/rest-server/overview) is a project that allows you create your own simple
REST API server that interacts with the NEAR blockchain.

| Route                                      | Description                                                                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [CONTRACTS](/docs/api/rest-server/contracts)                              |  Deploy, view, and call smart contracts on NEAR.         |
| [UTILS](/docs/api/rest-server/utils)                                  |    Init accounts, create sub-accounts, and view key pairs.                                                 |
| [NFTs](/docs/api/rest-server/nfts)                            |        Mint, view, and transfer NFTs.                                       |
