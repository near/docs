---
id: introduction
sidebar_label: Home
title: NEAR RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ContactUs from '@site/components/ContactUs.mdx';

The RPC API allows you to communicate directly with the NEAR network. For example,
tools such as [near-api-js](/tools/near-api-js/quick-reference) are just abstractions making RPC calls.

## Free Public RPC

NEAR offers free public peer-to-peer rpc to all developers. Dozens of providers are collated under a single, unified endpoint for ease of use and immediate access. 🔥 Learn [more](iprpc#endpoints-)!

<hr class="subsection" />


## RPC Providers

There are multiple [RPC providers which you can choose from](./providers.md). These providers will work as intermediaries to help you interact with the NEAR network.

<hr class="subsection" />

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
| [Maintenance Windows](/api/rpc/maintenance-windows) | Query the maintenance windows in current epoch for a validator.              |

:::tip
You can access the JSON RPC 2.0 endpoints using [Postman](/api/rpc/setup#postman-setup),
[JavaScript](/api/rpc/setup#javascript-setup), and [HTTPie](/api/rpc/setup#httpie-setup).
:::

<hr class="subsection" />

<ContactUs />
