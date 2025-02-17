---
id: storage
title: Million Small Deposits
---

On NEAR, your contract pays for the storage it uses. This means that the more data you store, the more balance you need to cover for storage. If you don't handle these costs correctly (e.g. asking the user to cover their storage usage), then a million little deposits can drain your contract of its funds.

Let's walk through an example:

1. You launch [a guest book app](../../../3.tutorials/examples/guest-book.md), deploying your app's smart contract to the account `example.near`
2. Visitors to your app can add messages to the guest book. This means your users will pay a small gas fee to **store** their message to your contract.
3. When a new message comes in, NEAR will check if `example.near` has enough balance to cover the new storage needs. If it does not, the transaction will fail.

Note that this can create an attack surface. If sending data to your guest book is inexpensive to the user while costing the contract owner significantly more, a malicious user can exploit the imbalance to make maintaining the contract prohibitively expensive.

One possible way to tackle this problem is asking the user to attach money to the call to cover the storage used by their message.

:::tip
Remember that you can release the *balance locked for storage* by simply deleting data from the contract.
:::
