---
sidebar_position: 1
sidebar_label: Introduction
title: Pagoda RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning

Please be advised that these tools and services will be discontinued and stop serving traffic on December 9th, 2024.

:::

## Overview

The Pagoda RPC provides you with instant access to maintenance free, scalable NEAR infrastructure, powering you on the fastest path from ideas to launch.

Developers can interact with on-chain data and send different types of transactions to the network by utilizing the RPC endpoints.

In addition to the powerful node infrastructure, we also created the Pagoda RPC Stats page so that you can have visibility into your RPC usage and performances and take control of your project from the infrastructure level. What’s more? You can subscribe to the alerts from our Status page so that you can follow the health of Pagoda RPC real time. All accessible via [Pagoda Console](https://console.pagoda.co/).

## Setup

### API Keys

- [Getting API keys](get-keys.md)
- [Testing your API keys](setup.md#test-your-api-keys)

### Tools

- [Postman](setup.md#postman-setup) setup
- [Command-line (CLI)](setup.md#command-line-setup) setup
- [JavaScript](setup.md#javascript-setup) setup
- [Rust](setup.md#rust-setup) setup

---

## RPC Endpoints - Quick Links

| API                                        | Description                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| [Access Keys](/api/rpc/access-keys)        | Retrieve information about an account's access keys.                         |
| [Accounts / Contracts](/api/rpc/contracts) | View details about accounts and contracts as well as perform contract calls. |
| [Block / Chunk](/api/rpc/block-chunk)      | Query the network and get details about specific blocks or chunks.           |
| [Gas](/api/rpc/gas)                        | Get gas price for a specific block or hash.                                  |
| [Protocol](/api/rpc/protocol)              | Retrieve current genesis and protocol configuration.                         |
| [Network](/api/rpc/network)                | Return status information for nodes and validators.                          |
| [Transactions](/api/rpc/transactions)      | Send transactions and query their status.                                    |

:::tip

You can access the JSON RPC 2.0 endpoints using [Postman](setup.md#postman-setup),
[JavaScript](setup.md#javascript-setup), [Rust](setup.md#rust-setup), and [CLI](setup.md#command-line-setup).

:::
