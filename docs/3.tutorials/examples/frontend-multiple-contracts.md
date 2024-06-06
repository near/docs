---
id: frontend-multiple-contracts
title: Frontend Interacting with Multiple Contracts
sidebar_label: Frontend & Multiple Contracts
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This example showcases how to interact with multiple contracts from a single frontend.

Particularly, this example shows how to:

1. Query data from multiple contracts.
2. Call methods in multiple contracts simultaneously.

---

## Query Data from Multiple Contracts

To query multiple contracts simply perform multiple `view` calls:

<Language value="js" language="ts">
  <Github fname="index.js"
        url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
        start="70" end="76" />
</Language>

---

## Dispatching Multiple Transactions

The `wallet` object enables to dispatch multiple transactions simultaneously. However, please notice that the transactions execute independently.

Dispatching multiple transactions at once is just a nice way to improve UX, because the user interacts with the wallet only once.

<Language value="js" language="ts">
  <Github fname="index.js"
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="35" end="62" />
</Language>

In this example, the user signs two independent transactions:

1. A transaction to call `set_greeting` in our [Hello NEAR example](https://github.com/near-examples/hello-near-examples)
2. A transaction to call `add_message` in our [GuestBook example](https://github.com/near-examples/guest-book-examples)

:::caution
Even when the user accepts signing the transactions at the same time, the
transactions remain **independent**. This is, if one fails, the other is **NOT** rolled back.
:::

---

## Batch Actions

You can aggregate multiple [actions](../../2.build/2.smart-contracts/anatomy/actions.md) directed towards a same contract into a single transaction. Batched actions execute **sequentially**, with the added benefit that, if **one fails** then they **all** get reverted.

```js
  // Register a user and transfer them FT on a single take
  const REGISTER_DEPOSIT = "1250000000000000000000";

  const ftTx = {
    receiverId: FT_ADDRESS,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: 'storage_deposit',
          args: { account_id: "<receiver-account>" },
          gas: THIRTY_TGAS, deposit: REGISTER_DEPOSIT
        }
      },
      {
        type: 'FunctionCall',
        params: {
          methodName: 'ft_transfer',
          args: { receiver_id: "<receiver-account>", amount: amount_in_yocto },
          gas: THIRTY_TGAS, deposit: 1 }
      }
    ]
  }

  // Ask the wallet to sign and send the transaction
  await wallet.signAndSendTransactions({ transactions: [ ftTx ] })
```
