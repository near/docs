---
id: introduction
sidebar_label: 🏠 Home
title: NEAR RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome! If you want to interact directly with the NEAR RPC API you have come to the right place. The NEAR RPC API is the
interface used to talk with the NEAR network. For example, tools such as the [NEAR API JS](/tools/near-api-js/quick-reference)
are actually just an abstractions to simplify making RPC calls.

<hr class="subsection" />

## Table of Resources

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
You can access the JSON RPC 2.0 endpoints using [Postman](/api/rpc/setup#postman-setup),
[JavaScript](/api/rpc/setup#javascript-setup), and [HTTPie](/api/rpc/setup#httpie-setup).
:::

<hr class="subsection" />

## Contact us

If you have any questions, or simply would want to chat with us, please do through one of our official channels. Also, jump into our Discord server and join our office hours every week-day!.

<br/>

<div class="container">
  <div class="row">
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/twitter.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Twitter</div>
          <small class="avatar__subtitle"><a href="https://twitter.com/@nearprotocol">@nearprotocol</a></small>
        </div>
      </div>
    </div>
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/discord.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Discord</div>
          <small class="avatar__subtitle"><a href="https://discord.gg/kwYjDn4yka">NEAR Protocol</a></small>
        </div>
      </div>
    </div>
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/zulip.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Zulip</div>
          <small class="avatar__subtitle"><a href="https://near.zulipchat.com/">Near Chat</a></small>
        </div>
      </div>
    </div>
  </div>
</div>