---
id: transactions
title: Transactions
---

Users interact with NEAR by creating transactions. Specifically, users use their account's [private keys](./access-keys.md) to sign transactions, which are then broadcasted and processed by the network.

![](@site/static/docs/assets/welcome-pages/data-lake.png)

A transaction is composed of one or more [`Actions`](./transaction-anatomy.md), and each action costs a deterministic amount of [gas units](./gas.md). These gas units are translated into a cost in NEAR tokens, which the user must pay for the transaction to be processed.

:::tip
You can use an <a href="https://nearblocks.io/" target="_blank" rel="noopener noreferrer">Explorer</a> to inspect transactions in the NEAR network
:::
