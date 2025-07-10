---
id: frontend-multiple-contracts
title: Frontend Interacting with Multiple Contracts
sidebar_label: FE w/ Multiple Contracts
---



This example showcases how to interact with multiple contracts from a single frontend.

Particularly, this example shows how to:

1. Query data from multiple contracts.
2. Call methods in multiple contracts simultaneously.

---

## Query Data from Multiple Contracts

To query multiple contracts simply perform multiple `view` calls:

<Language value="js" language="ts">
  ```
  const totalMessages = await wallet.viewMethod({method: 'total_messages', contractId: GUEST_ADDRESS })
  const from_index = (totalMessages > 4? totalMessages - 4: 0).toString();
  const latestMessages = await wallet.viewMethod({ method: 'get_messages', contractId: GUEST_ADDRESS, args: {from_index, limit: "4"} });

  // handle UI stuff
  update_UI(currentGreeting, from_index, latestMessages);
}

```
</Language>

---

## Dispatching Multiple Transactions

The `wallet` object enables to dispatch multiple transactions simultaneously. However, please notice that the transactions execute independently.

Dispatching multiple transactions at once is just a nice way to improve UX, because the user interacts with the wallet only once.

<Language value="js" language="ts">
  ```
  const guestTx = {
    receiverId: GUEST_ADDRESS,
    actions: [ // actions execute sequentially
      {
        type: 'FunctionCall',
        params: {
          methodName: 'add_message', args: { text: greeting.value },
          gas: THIRTY_TGAS, deposit: GUEST_DEPOSIT
        }
      },
    ]
  }

  const helloTx = {
    receiverId: HELLO_ADDRESS,
    actions: [ // if any action fails, they all rollback together
      {
        type: 'FunctionCall',
        params: {
          methodName: 'set_greeting', args: { greeting: greeting.value },
          gas: THIRTY_TGAS, deposit: NO_DEPOSIT
        }
      }
    ]
  }

  // Sign **independent** transactions: If one fails, the other **DOES NOT** revert
  await wallet.signAndSendTransactions({ transactions: [ helloTx, guestTx ] })
}
```
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

You can aggregate multiple [actions](../../smart-contracts/anatomy/actions.md) directed towards a same contract into a single transaction. Batched actions execute **sequentially**, with the added benefit that, if **one fails** then they **all** get reverted.

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
