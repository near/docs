---
sidebar_position: 1
sidebar_label: Introduction
title: Pagoda RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The Pagoda RPC provides you with instant access to maintenance free, scalable NEAR infrastructure, powering you on the fastest path from ideas to launch.

Developers can interact with on-chain data and send different types of transactions to the network by utilizing the RPC endpoints.

In addition to the powerful node infrastructure, we also created the Pagoda RPC Stats page so that you can have visibility into your RPC usage and performances and take control of your project from the infrastructure level. What’s more? You can subscribe to the alerts from our Status page so that you can follow the health of Pagoda RPC real time. All accesbile via [Pagoda Console](https://console.pagoda.co/).

## Setup

### API Keys

- [Getting API keys](/rpc/get-keys)
- [Testing your API keys](/rpc/setup#test-your-api-keys)

### Tools

- [Postman](/rpc/setup#postman-setup) setup
- [Command-line (CLI)](/rpc/setup#command-line-setup) setup
- [JavaScript](/rpc/setup#javascript-setup) setup
- [Rust](/rpc/setup#rust-setup) setup

---

## RPC Endpoints - Quick Links

| API                                        | Description                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| [Access Keys](/rpc/endpoints/access-keys)        | Retrieve information about an account's access keys.                         |
| [Accounts / Contracts](/rpc/endpoints/contracts) | View details about accounts and contracts as well as perform contract calls. |
| [Block / Chunk](/rpc/endpoints/block-chunk)      | Query the network and get details about specific blocks or chunks.           |
| [Gas](/rpc/endpoints/gas)                        | Get gas price for a specific block or hash.                                  |
| [Protocol](/rpc/endpoints/protocol)              | Retrieve current genesis and protocol configuration.                         |
| [Network](/rpc/endpoints/network)                | Return status information for nodes and validators.                          |
| [Transactions](/rpc/endpoints/transactions)      | Send transactions and query their status.                                    |

:::tip
You can access the JSON RPC 2.0 endpoints using [Postman](/rpc/setup#postman-setup),
[JavaScript](/rpc/setup#javascript-setup), [Rust](/rpc/setup#rust-setup), and [CLI](/rpc/setup#command-line-setup).
:::
