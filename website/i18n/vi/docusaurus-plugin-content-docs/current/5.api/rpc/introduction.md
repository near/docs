---
id: introduction
sidebar_label: Home
title: NEAR RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The RPC API allows you to communicate directly with the NEAR network. For example, tools such as [near-api-js](/tools/near-api-js/quick-reference) are just abstractions making RPC calls.

<hr className="subsection" />

## RPC Providers

There are multiple [RPC providers which you can choose from](./providers.md). These providers will work as intermediaries to help you interact with the NEAR network.

<hr className="subsection" />

## NEAR RPC - Quick Links

| API                                      | Mô ta                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| [Các RPC Endpoint](/api/rpc/access-keys) | Lấy thông tin về các access key của một account.                               |
| [Các RPC Endpoint](/api/rpc/contracts)   | Xem chi tiết về các account và contract giống như tiến hành các contract call. |
| [Block / Chunk](/api/rpc/block-chunk)    | Truy vấn network và lấy thông tin chi tiết về các block hoặc chunk nhất định.  |
| [Giới thiệu](/api/rpc/gas)               | Lấy gas price cho một block hoặc hash nhất định.                               |
| [Protocol](/api/rpc/protocol)            | Lấy thông tin của khối genesis hiện nay và protocol configuration.             |
| [Network](/api/rpc/network)              | Trả về thông tin trạng thái của các node và các validator.                     |
| [Tổng quan](/api/rpc/transactions)      | Send các transaction và truy vấn trạng thái của chúng.                         |

:::tip You can access the JSON RPC 2.0 endpoints using [Postman](/api/rpc/setup#postman-setup), [JavaScript](/api/rpc/setup#javascript-setup), and [HTTPie](/api/rpc/setup#httpie-setup). :::
