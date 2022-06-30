---
id: overview
title: Transactions
sidebar_label: Overview
---

NEAR is asynchronous by design. While it opens a wide range of possibilities for smart contracts implementations, it may also add to confusion among beginners and newcomers from other blockchain platforms.
Transactions in NEAR may contain actions that do asynchronous work, in such cases keep in mind the possible outcomes of success or failure of the transaction. For example, if a transaction contains a cross-contact call, it may be marked as successful, but the other contract execution might fail. This article covers possible scenarios for this.

A transaction is the smallest unit of work that can be assigned to the network. "Work" in this case means compute (executing a function) or storage (reading/writing data). A transaction is composed of one or more`Action`s. A transactions with more than one action is referred to as "batch transaction". Since transactions are the smallest units of work, they are also atomic, but again, asynchronous actions do not necessarily cascade their success or failure the whole transaction.

There is also a concept of `Receipt`s, which are either "request to apply an `Action`" or "result of the `Action`". All cross-contract communication is done through receipts. An action may result in one or more receipts. The Blockchain may be seen as a series of Transactions, but it's also a series of Receipts. 

:::tip
You can use <a href="https://explorer.near.org/">NEAR Blockchain Explorer</a> to inspect and see all actions and receipts related to a transaction.
:::


An in depth documentation about transactions can be found in [NEAR Protocol Specifications (nomicon.io)](https://nomicon.io/RuntimeSpec/Transactions).
On this page we give an overview of the important aspects of transactions on NEAR.

## Transaction {#transaction}

A `Transaction` is a collection of `Actions` that describe what should be done at the destination (the `receiver` account).

Each `Transaction` is augmented with critical information about its:

- **origin** (cryptographically signed by `signer`)
- **destination** or intention (sent or applied to `receiver`)
- **recency** (`block_hash` from recent block within acceptable limits - [1 epoch](../epoch))
- **uniqueness** (`nonce` must be unique for a given `signer` `AccessKey`)

## Action {#action}

An `Action` is a composable unit of operation that, together with zero or more other `Actions`, defines a sensible `Transaction`. There are currently 8 supported `Action` types:

- `FunctionCall` to invoke a method on a contract (and optionally attach a budget for compute and storage)
- `Transfer` to move tokens from between accounts
- `DeployContract` to deploy a contract
- `CreateAccount` to make a new account (for a person, contract, refrigerator, etc.)
- `DeleteAccount` to delete an account (and transfer the balance to a beneficiary account)
- `AddKey` to add a key to an account (either `FullAccess` or `FunctionCall` access)
- `DeleteKey` to delete an existing key from an account
- `Stake` to express interest in becoming a validator at the next available opportunity

You can find more about the technical details of `Action`s in the [NEAR nomicon](https://nomicon.io/RuntimeSpec/Actions).

## Receipt {#receipt}

A `Receipt` is the only actionable object in the system. Therefore, when we talk about "processing a transaction" on the NEAR platform, this eventually means "applying receipts" at some point.

A good mental model is to think of a `Receipt` as a paid message to be executed at the destination (`receiver`). And a `Transaction` is an externally issued request to create the `Receipt` (there is a 1-to-1 relationship).

There are several ways of creating `Receipts`:

- issuing a `Transaction`
- returning a promise (related to cross-contract calls)
- issuing a refund

You can find more about the technical details of `Receipts` in the [NEAR nomicon](https://nomicon.io/RuntimeSpec/Receipts).

## Transaction Atomicity {#atomicity}

Since transactions are converted to receipts before they are applied, it suffices to talk about receipt atomicity.
Receipt execution is atomic, meaning that either all the actions are successfully executed or none are.
However, one caveat is that a function call transaction, unlike other transactions, can spawn an indefinite amount of receipts, and while each receipt is atomic, the success or failure of one receipt doesn't necessarily affect the status of other receipts spawned by the same transaction.

:::info
  When designing a smart contract, you should always consider the asynchronous nature of NEAR Protocol.
:::

## Transaction Status {#transaction-status}

You can query the status of a transaction through [RPC API](/api/rpc/setup). An example of the query result looks like this:

```json
{
  "status": { "SuccessValue": "" },
  "transaction": {
    "actions": [
      { "Transfer": { "deposit": "50000000000000000000000000" } }
    ],
    "hash": "EL9cEcoiF1ThH1HXrdE5LBuJKzSe6dRr7tia61fohPrP",
    "nonce": 51,
    "public_key": "ed25519:5zset1JX4qp4PcR3N9KDSY6ATdgkrbBW5wFBGWC4ZjnU",
    "receiver_id": "transfer-vote.near",
    "signature": "ed25519:37rcwcjDBWWAaaRYCazHY72sfDbmudYvtmEBHMFmhYEfWD3mbrgrtYs5nVh9gzRUESELRDET9g72LnAD2BWdSgKu",
    "signer_id": "near"
  },
  "transaction_outcome": {
    "block_hash": "dvwSabiWzRjfQamZCEMeguxxXL4885JGU87xfjoPWR2",
    "id": "EL9cEcoiF1ThH1HXrdE5LBuJKzSe6dRr7tia61fohPrP",
    "outcome": {
      "executor_id": "near",
      "gas_burnt": 223182562500,
      "logs": [],
      "metadata": { "gas_profile": null, "version": 1 },
      "receipt_ids": [
        "6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y"
      ],
      "status": {
        "SuccessReceiptId": "6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y"
      },
      "tokens_burnt": "22318256250000000000"
    },
    "proof": []
  },
  "receipts_outcome": [
    {
      "block_hash": "6evPKFQRw1E3gH9L1d59mz7GahsbnqsdYwcZQo8hpFQB",
      "id": "6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y",
      "outcome": {
        "executor_id": "transfer-vote.near",
        "gas_burnt": 223182562500,
        "logs": [],
        "metadata": { "gas_profile": null, "version": 1 },
        "receipt_ids": [
          "7NMpF9ZGwSj48bpvJK2xVobJkTasEkakazTKi2zotHR4"
        ],
        "status": { "SuccessValue": "" },
        "tokens_burnt": "22318256250000000000"
      },
      "proof": []
    },
    {
      "block_hash": "Gm6TFS1ZxmA45itVj8a7vE8yJF8V5hXeNF1EhEVr7GVS",
      "id": "7NMpF9ZGwSj48bpvJK2xVobJkTasEkakazTKi2zotHR4",
      "outcome": {
        "executor_id": "near",
        "gas_burnt": 0,
        "logs": [],
        "metadata": { "gas_profile": null, "version": 1 },
        "receipt_ids": [],
        "status": { "SuccessValue": "" },
        "tokens_burnt": "0"
      },
      "proof": []
    }
  ]
}
```

The query result displays:
- the overall status of the transaction,
- the outcomes of the transaction,
- and the outcome of the receipts generated by this transaction.

The `status` field appears at:
- the top-level, where it indicates whether all actions in the transaction have been successfully executed,
- under `transaction_outcome`, where it indicates whether the transaction has been successfully converted to a receipt,
- under `receipts_outcome` for each receipt, where it indicates whether the receipt has been successfully executed.

The `status` is an object with a single key, one of the following four:

- `status: { SuccessValue: 'val or empty'}` - the receipt or transaction has been successfully executed. If it's the result of a function call receipt, the value is the return value of the function, otherwise the value is empty.
- `status: { SuccessReceiptId: 'id_of_generated_receipt' }` - either a transaction has been successfully converted to a receipt, or a receipt is successfully processed and generated another receipt. The value of this key is the id of the newly generated receipt.
- `status: { Failure: {} }'` - transaction or receipt has failed during execution. The value will include error reason.
- `status: { Unknown: '' }'` - the transaction or receipt hasn't been processed yet.

NOTE: for receipts, `SuccessValue` and `SuccessReceiptId` come from the last action's execution. The results of other action executions in the same receipt are not returned. However, if any action fails, the receipt's execution stops, and the failure is returned, meaning that `status` would be `Failure`. And if the last action is not a function call and it's successfully executed, the result will be an empty `SuccessValue`

The top-level `status` indicates whether all actions in the transaction have been successfully executed. However, one caveat is that the successful execution of the function call does not necessarily mean that the receipts spawned from the function call are all successfully executed.

For example:

```rust
pub fn transfer(receiver_id: String) {
    Promise::new(receiver_id).transfer(10);
}
```

This function schedules a promise, but its return value is unrelated to that promise. So even if the promise fails, potentially because `receiver_id` does not exist, a transaction that calls this function will still have `SuccessValue` in the overall `status`. You can check the status of each of the receipts generated by going through `receipt_outcomes` in the same query result.

## Finality {#finality}

Transaction finality is closely tied to the finality of the block in which the transaction is included.
However, they are not necessarily the same because often, one is concerned with whether the receipts, not the transaction itself, are final since receipt execution is where most of the work is done. Therefore, to verify the finality of a transaction, you can query the transaction and check if all the block hashes of the transactions and receipts generated from the transaction are final.

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
