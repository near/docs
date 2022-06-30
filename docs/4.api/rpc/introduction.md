---
id: introduction
sidebar_label: 🏠 Home
title: NEAR RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome! If you want to interact directly with the NEAR RPC API you have come to the right place. The NEAR RPC API is the
interface used to talk with the NEAR network. For example, tools such as the [NEAR API JS](../../3.tools/near-api-js/cookbook.md)
are actually just an abstractions to simplify making RPC calls.

## Table of Resources

| API                                        | Description                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| [Access Keys](/api/rpc/access-keys)        | Retrieve information about an account's access keys.                         |
| [Access Keys](/api/rpc/access-keys)        | Retrieve information about an account's access keys.                         |
| [Accounts / Contracts](/api/rpc/contracts) | View details about accounts and contracts as well as perform contract calls. |
| [Block / Chunk](/api/rpc/block-chunk)      | Query the network and get details about specific blocks or chunks.           |
| [Gas](/api/rpc/gas)                        | Get gas price for a specific block or hash.                                  |
| [Protocol](/api/rpc/protocol)              | Retrieve current genesis and protocol configuration.                         |
| [Network](/api/rpc/network)                | Return status information for nodes and validators.                          |
| [Transactions](/api/rpc/transactions)      | Send transactions and query their status.                                    |
| [Sandbox](/api/rpc/sandbox)                | Patch state on a local sandbox node.                                         |

:::tip
You can access the JSON RPC 2.0 endpoints using [Postman](/api/rpc/setup#postman-setup),
[JavaScript](/api/rpc/setup#javascript-setup), and [HTTPie](/api/rpc/setup#httpie-setup).
:::