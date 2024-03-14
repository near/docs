---
id: transactions
title: Transactions
---

Users interact with NEAR by creating transactions. Specifically, user's use their account's [private keys](./access-keys.md) to sign transactions, which are then broadcasted and processed by the network.

![](@site/static/docs/assets/welcome-pages/data-lake.png)

A transaction is composed of one or more [`Actions`](#actions), and each action costs a deterministic amount of [gas units](#gas). This gas units are translated into a cost in NEAR tokens, which the user must pay for the transaction to be processed.

:::tip
You can use an <a href="https://nearblocks.io/">Explorer</a> to inspect transactions in the NEAR network
:::

---

## Anatomy of a Transaction

A transaction is a request from a user to the network to perform a set of actions. To create a transaction, the user must specify the following fields:

- `Signer`: the account that signs the transaction
- `Actions`: the set of actions to be performed (see bellow)
- `Receiver`: the account on which to perform the actions

In addition, a transaction has the following fields to ensure its integrity and validity:

- `PublicKey`: the public key used to sign the Transaction (so the network can verify the signature)
- `Nonce`: a number that is incremented for each transaction sent by the `Signer`
- `BlockHash`: the hash of a recent block, to limit the time-validity of the transaction

Users create transactions and sign them with their private keys. Then, the **transaction and its signature** are broadcasted together to the network, where they are validated and processed.

:::tip
Each transaction has exactly one `Signer` and `Receiver`, but can have multiple `Actions`
:::

---

## Actions
Each transaction can have **one or multiple** `Actions`, which are the actual operations to be performed on the `Receiver` account. There are 9 types of actions that can be performed:

1. `FunctionCall`: to invoke a function on a contract (optionally attaching NEAR to the call)
2. `Transfer`: to transfer tokens to another accounts
3. `DeployContract`: to deploy a contract in the account
4. `CreateAccount`: to create a new sub-account (e.g. `ana.near` can create `sub.ana.near`)
5. `DeleteAccount`: to delete the account (transferring the remaining balance to a beneficiary)
6. `AddKey`: to add a new key to the account (either `FullAccess` or `FunctionCall` access)
7. `DeleteKey`: to delete an existing key from the account
8. `DelegateActions`: to create a meta-transaction
9. `Stake`: special action to express interest in becoming a network validator

For example, `bob.near` can bundle the following actions in a single transaction:
- Create the account `contract.bob.near`
- Transfer 5 NEAR to `contract.bob.near`
- Deploy a contract in `contract.bob.near`
- Call the function `init` in `contract.bob.near`

The `Actions` are executed in the **order they are specified in the transaction**. If any of the **actions fails**, the transaction is discarded and none of the actions take effect.

:::warning One Receiver
Notice that all actions are performed on the same account. It is **not possible** to perform actions on multiple accounts in a single transaction, because transactions can have **only one receiver**
:::

---

## Receipts
`Transactions` are constructed by users to express the intent of performing actions in the network. Once in the network, transactions are converted into `Receipts`, which are the actual actionable objects.

`Receipts` can be thought as paid messages flying through the network, were each states "the user wants to perform `<these actions on a recipient>`, and has already payed the gas fee to execute it".

:::tip
Each transaction results in two receipts: one with the action and one with the result. The only exception is for `FunctionCall` actions, which can spawn more receipts with cross-contract calls.
:::

---

## Transaction Status & Finality
Most transactions take on average 1-2 blocks to be processed by the network. However, notice that a transaction could spawn a chain of function calls. In such cases, the transaction will finish in 1-2 blocks, but each spawned receipt (one per call) will take 1-2 blocks to be processed.

Once all receipts are processed, the receipts will have one of the following status:

- `Success`: the receipt was executed successfully
- `Failed`: the receipt was not executed successfully
- `Unknown`: the receipt is not known by the network

The status of a transaction is determined by the status of its first receipt. If any of the following receipts (created from function calls) fails, the transaction will still be successful.

<details>

<summary> Status Examples </summary>

#### Example: Transaction with Transfer

1. `bob.near` creates a transaction to transfer 10 NEAR to `alice.near`
2. The transaction is transformed into a receipt
3. The receipt fails because `bob.near` does not have enough balance
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
3. The account is not created because `bob.near` does not have enough balance
4. The transaction is marked as successful ⛔

#### Example: Calling a Function
1. `bob.near` creates a transaction to call the function `cross-call` in `contract.near`
2. The transaction is transformed into one receipt
3. The function `cross-call` creates a promise to call the function `external-call` in `external.near`
4. The function finishes correctly and the transaction is marked as successful ✅
5. A new receipt is created to call the function `external-call` in `external.near`
5. The function `external-call` fails
6. The original transaction is still marked as successful ✅ because the first receipt was successful

</details>