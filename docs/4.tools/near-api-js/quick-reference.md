---
id: quick-reference
title: Interacting With NEAR Through JavaScript
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`near-api-js` is a complete library to interact with the NEAR blockchain. You can use it in the browser, or in Node.js runtime.

You'll typically first create a connection to NEAR with [`connect`](#connect). If you need to sign transaction, you also create a [`KeyStore`](#key-store).
With the connection object you now can:
- Interact with the [Wallet](naj-wallet.md) in a browser.
- Instantiate an [Account](naj-account.md) object to inspect, create or delete accounts, and also send tokens, deploy contracts and manage keys for accounts.
- Instantiate an [Contract](naj-contract.md) object to call smart contract methods.

The library also contains some [utils](naj-utils.md) functions.

:::tip
To quickly get started with integrating NEAR in a web browser, read our [Web Frontend integration](/develop/integrate/frontend) article.
:::

:::info
Note the difference between `near-api-js` and `near-sdk-js`:

The JavaScript _SDK_ is a library for developing smart contracts. It contains classes and functions you use to write your smart contract code.

The JavaScript _API_ is a complete library for all possible commands to interact with NEAR. It’s a wrapper for the RPC endpoints, a library to interact with NEAR Wallet in the browser, and a tool for keys management.
:::