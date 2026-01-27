---
id: transaction-execution
title: Lifecycle of a Transaction
description: "Learn how NEAR transactions are executed and finalized"
---

`Transactions` are constructed by users to express the intent of performing actions in the network. Once in the network, transactions are converted into `Receipts`, which are messages exchanged between network nodes.

On this page, we will explore the lifecycle of a transaction, from its creation to its final status.


:::tip Recommended Reading
To dig deeper into transaction routing, we recommend reading the [nearcore documentation](https://near.github.io/nearcore/architecture/how/tx_routing.html)
:::

---

## Receipts & Finality

Let's walk through the lifecycle of a complex transaction and see how it is processed by the network using blocks as **time units**.

#### Block #1: The Transaction Arrives
After a transaction arrives, the network takes one block to validate it and transform it into a single `Receipt` that contains all the [actions](./transaction-anatomy.md) to be executed.

While creating the `Receipt`, the `signer` gets $NEAR deducted from its balance to **pay for the gas** and **any attached NEAR**.

If the `signer` and `receiver` coincide - e.g. the `signer` is adding a Key - the `Receipt` is immediately processed in this first block and the transaction is considered final.

#### Block #2: The Receipt is Processed
If the `signer` and `receiver` differs - e.g. the `signer` transfers NEAR to the `receiver` - the `Receipt` is processed in a second block.

During this process a `FunctionCall` could span a **cross-contract call**, creating one or multiple new `Receipts`.

#### Block #3...: Function Calls
Each `Receipt` created from the function call take an additional block to be processed. Notice that, if those `Receipts` are `FunctionCall` they could spawn new `Receipts` and so on.

#### Final Block: Gas is Refunded
A final `Receipt` is processed in a new block, refunding any extra gas paid by the user.



<details>
<summary>Waiting for a Transaction</summary>
When using our libraries (or directly contacting the RPC), you can specify how long you want to wait for a transaction to be processed using a `wait_until` parameter. Let's explore the different stages of a transaction's lifecycle.

After a transaction is submitted, it first gets validated by the RPC node. If the transaction fails structural checks it will be immediately rejected. Otherwise, it enters the following lifecycle:

1. The transaction has been accepted by the RPC node and is waiting to be included in a block. If `wait_until = None`, the RPC will return a response at this stage. The transaction hasn’t started executing yet, though it will typically start in the next block.

2. Once the transaction reaches a validator, it ensures a signature matches signer access key and that the account is charged gas pre-payment, then updates access key nonce. The transaction is included in a chunk/block and converted into a single receipt for execution. If `wait_until = Included`, the RPC returns a response immediately indicating that the transaction has just started the execution (no execution results, logs, and outcomes are available at this point).

3. In the next blocks, the receipt will get executed and it may produce more receipts for cross-contract interactions. Once all receipts finish the execution, RPC returns a response if `wait_until = ExecutedOptimistic`.

4. The block that contains the transaction has been finalized. This may occur even sooner than receipts execution finishes (depending on how many cross-contract interactions there), and when it finishes, the RPC returns a response if `wait_until = IncludedFinal`.

5. Once the block that contains the transaction has been finalized and all receipts have completed execution (both `IncludedFinal` and `ExecutedOptimistic` are satisfied), then RPC returns a response if `wait_until = Executed`.

6. Once blocks containing the transaction and all of its receipts are finalized, the RPC returns a response at this point if `wait_until = Final`.

</details>

:::info
A transaction is considered **final** when all its receipts are processed.
:::

:::tip
Most transactions will just spawn a receipt to process the actions, and a receipt to refund the gas, being final in 1-3 blocks (~1-3 seconds):

- [One block](https://testnet.nearblocks.io/txns/8MAvH96aMfDxPb3kVDrgj8nvJS7CAXP1GgtiivKAMGkF#execution) if the `signer` and `receiver` coincide - e.g. when adding a key
- [Three blocks](https://testnet.nearblocks.io/txns/B7gxJNxav1A9WhWvaNWYLrSTub1Mkfj3tAudoASVM5tG#) if the `signer` and `receiver` differ, since the first block creates the `Receipt`, and the last reimburses gas

Function calls might take longer, as they can spawn multiple receipts. Network congestion can also increase the time to process a receipt and, thus, a transaction.
:::

---

## Transaction Status

As the `Receipts` of a `Transaction` are processed, they get a status:

- `Success`: the actions on the receipt were executed successfully
- `Failed`: an action on the receipt failed
- `Unknown`: the receipt is not known by the network

If an action in a `Receipt` fails, all the actions in that `Receipt` are rolled back. Notice that we are talking about the `Receipt` status, and not the `Transaction` status.

The status of a transaction is determined by its first receipt, which contains all its actions. If any of the actions in the first receipt fail, the transaction is marked as failed.

Notice that, it could happen that a transaction is marked as successful, but some of its receipt fails. This happens when a `FunctionCall` successfully spawns a new receipt, but the consequent function call fails. In this case, the transaction is marked as successful because the original function call was successful.

See the examples below for more details.

<details>

<summary> Status Examples </summary>

#### Example: Transaction with Transfer

1. `bob.near` creates a transaction to transfer 10 NEAR to `alice.near`
2. The transaction is converted into a receipt
3. The conversion fails because `bob.near` does not have enough balance
4. The transaction is marked as failed ⛔

#### Example: Deploying a Contract

1. `bob.near` creates a transaction to:
    - create the account `contract.bob.near`
    - transfer 5 NEAR to `contract.bob.near`
    - deploy a contract in `contract.bob.near`
2. The transaction is transformed into one receipt
3. The account is created, the money transfer and the contract deployed
4. The transaction is marked as successful ✅

#### Example: Deploying a Contract Fails

1. `bob.near` creates a transaction to:
    - create the account `contract.bob.near`
    - transfer 5 NEAR to `contract.bob.near`
    - deploy a contract in `contract.bob.near`
2. The transaction is transformed into one receipt
3. The account is created, but the transfer fails because `bob.near` does not have enough balance
4. The whole process is reverted (i.e. no account is created)
5. The transaction is marked as failed ⛔

#### Example: Calling a Function
1. `bob.near` creates a transaction to call the function `cross-call` in `contract.near`
2. The transaction is transformed into one receipt
3. The function `cross-call` creates a promise to call the function `external-call` in `external.near`
4. The function finishes correctly and the transaction is marked as successful ✅
5. A new receipt is created to call the function `external-call` in `external.near`
5. The function `external-call` fails
6. The original transaction is still marked as successful ✅ because the first receipt was successful

</details>

:::tip
You can check the status of a transaction using the [NearBlocks explorer](https://nearblocks.io/)
:::

---

## Nonce values

The `nonce` is a number that is incremented for each transaction sent by the transaction's `Signer`.
On a valid transaction, the `nonce` value should follow these rules:

- When adding a key, the `nonce` is automatically assigned - particularly, it is given the value `block height * 10^6` - so the value in the `ADD_KEY` action is ignored
- A transaction is accepted only if the `nonce` value is in the range of:
  - `[(current_nonce_of_access_key + 1) .. (block_height * 10^6)]`
- Once a transaction is accepted, the access key's `nonce` is set to the `nonce` value of the included transaction
