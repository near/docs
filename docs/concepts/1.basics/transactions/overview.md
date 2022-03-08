---
id: overview
title: Overview
---

A transaction is the smallest unit of work that can be assigned to the network. Work in this case means compute (ie. executing a function) or storage (ie. reading / writing data).

## Transaction Processing {#transaction-processing}

### Transaction {#transaction}

A `Transaction` is a collection of `Actions` that describe what should be done at the destination (the `receiver` account).

Each `Transaction` is augmented with critical information about its:

- **origin** (ie. cryptographically signed by `signer`)
- **destination** or intention (ie. sent or applied to `receiver`)
- **recency** (ie. `block_hash` from recent block is within acceptable limits ... [1 epoch](/docs/concepts/epoch))
- **uniqueness** (ie. `nonce` must be unique for a given `signer` `AccessKey`)

### Action {#action}

An `Action` is a composable unit of operation that, together with zero or more other `Actions`, defines a sensible `Transaction`. There are currently 8 supported `Action` types:

- `CreateAccount` to make a new account (for a person, contract, refrigerator, etc)
- `DeleteAccount` to delete an account (and transfer balance to a beneficiary account)
- `AddKey` to add a key to an account (either `FullAccess` or `FunctionCall` access)
- `DeleteKey` to delete an existing key from an account
- `Transfer` to move tokens from one account to another
- `Stake` to express interest in becoming a validator at the next available opportunity
- `DeployContract` to deploy a contract
- `FunctionCall` to invoke a method on a contract (including budget for compute and storage)

### Receipt {#receipt}

A `Receipt` is the only actionable object in the system. When we talk about "processing a transaction" on the NEAR platform, this eventually means "applying receipts" at some point.

A good mental model is to think of a `Receipt` as a paid message to be executed at the destination (`receiver`). And a `Transaction` is an externally issued request to create the `Receipt` (there is a 1 to 1 relationship).

There are several ways of creating `Receipts`:

- issuing a `Transaction`
- returning a promise (related to cross-contract calls)
- issuing a refund

You can find more about the technical details of `Receipts` in the [NEAR nomicon](https://nomicon.io/RuntimeSpec/Receipts.html)

### Atomicity {#atomicity}

Since transactions are converted to receipts before they are applied, it suffices to talk about receipt atomicity.
Receipt execution is atomic, meaning that either all the actions are successfully executed or none is.
However, one caveat is that a function call transaction, unlike other transactions, can spawn an indefinite amount of
receipts and while each receipt is atomic, the success or failure of one receipt doesn't necessarily affect the status
of other receipts spawned by the same transaction.

### Transaction Status {#transaction-status}

The status of a transaction can be queried through [rpc](/docs/api/rpc). An example of the query result looks like

```javascript
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'near',
    public_key: 'ed25519:5zset1JX4qp4PcR3N9KDSY6ATdgkrbBW5wFBGWC4ZjnU',
    nonce: 51,
    receiver_id: 'transfer-vote.near',
    actions: [
      { Transfer: { deposit: '50000000000000000000000000' } },
      [length]: 1
    ],
    signature: 'ed25519:37rcwcjDBWWAaaRYCazHY72sfDbmudYvtmEBHMFmhYEfWD3mbrgrtYs5nVh9gzRUESELRDET9g72LnAD2BWdSgKu',
    hash: 'EL9cEcoiF1ThH1HXrdE5LBuJKzSe6dRr7tia61fohPrP'
  },
  transaction_outcome: {
    proof: [ [length]: 0 ],
    block_hash: 'dvwSabiWzRjfQamZCEMeguxxXL4885JGU87xfjoPWR2',
    id: 'EL9cEcoiF1ThH1HXrdE5LBuJKzSe6dRr7tia61fohPrP',
    outcome: {
      logs: [ [length]: 0 ],
      receipt_ids: [ '6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y', [length]: 1 ],
      gas_burnt: 223182562500,
      tokens_burnt: '22318256250000000000',
      executor_id: 'near',
      status: {
        SuccessReceiptId: '6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [ [length]: 0 ],
      block_hash: '6evPKFQRw1E3gH9L1d59mz7GahsbnqsdYwcZQo8hpFQB',
      id: '6LrHPazG3DTcKkd4TjqbgajqmbcAfyoTG383Cft5SZ5Y',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ '7NMpF9ZGwSj48bpvJK2xVobJkTasEkakazTKi2zotHR4', [length]: 1 ],
        gas_burnt: 223182562500,
        tokens_burnt: '22318256250000000000',
        executor_id: 'transfer-vote.near',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [ [length]: 0 ],
      block_hash: 'Gm6TFS1ZxmA45itVj8a7vE8yJF8V5hXeNF1EhEVr7GVS',
      id: '7NMpF9ZGwSj48bpvJK2xVobJkTasEkakazTKi2zotHR4',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'near',
        status: { SuccessValue: '' }
      }
    },
    [length]: 2
  ]
}
```

where it displays the overall status of the transaction, the outcomes of the transaction, and the outcome of the receipts
generated by this transaction.

The `status` field is an object with a single key. There can be four types of key:

- `SucccessValue`. This indicates that the receipt has been successfully executed and the value of the key
  is the return value (can only be nonempty when it is the result of a function call receipt).
- `SuccessReceiptId`. This indicates that either a transaction has been successfully converted to a receipt or a receipt is
  successfully processed and generated another receipt. The value of this key is the id of the newly generated receipt.
- `Failure` This indicates that the transaction or receipt has failed during execution.
- `Unknown` This indicates that the transaction or receipt hasn't been processed yet.

NOTE: for receipts, `SuccessValue` and `SuccessReceiptId` comes from the execution of the last action. The results of other
action executions in the same receipt are not returned. However, if any action execution failed, the execution of the receipt
stops and the failure is returned., meaning that `status` would be `Failure`. And if the last action is not a function call and it's successfully executed, the result will be an empty `SuccessValue`

The top level `status` indicates the overall status of the transaction. This indicates whether all actions in the transaction
have been successfully executed. However, one caveat is that the successful execution of the
function call does not necessarily mean that the receipts spawned from the function call are all successfully executed.
For example,

```rust
pub fn transfer(receiver_id: String) {
    Promise::new(receiver_id).transfer(10);
}
```

this function schedules a promise, but its return value is unrelated to the promise that it has scheduled. So even if the
promise fails, potentially because `receiver_id` does not exist, a transaction that calls this function will still have
`SuccessValue` in the overall `status`. One can check the status of each of the receipts generated by going through
`receipt_outcomes` in the same query result.

### Finality {#finality}

The finality of a transaction is closely tied to the finality of the block in which the transaction is included in.
However, they are not necessarily the same because often times, one is concerned with whether the receipts, not the
transaction itself, are final since receipt execution is where most of the work is done. To be sure of the finality of
a transaction, one can simply query the transaction and check if all the block hashes of the transactions and receipts
generated from the transaction are final.

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
