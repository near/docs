---
id: transaction-anatomy
title: Anatomy of a Transaction
---

A transaction is a request from a user to the network to perform a set of actions. To create a transaction, the user must specify the following fields:

- `Signer`: the account that signs the transaction
- `Actions`: the set of actions to be performed (see below)
- `Receiver`: the account on which to perform the actions

In addition, a transaction has the following fields to ensure its integrity and validity:

- `PublicKey`: the public key used to sign the transaction (so the network can verify the signature)
- `Nonce`: a number that is incremented for each transaction sent by the `Signer`
- `BlockHash`: the hash of a recent block, to limit the time-validity of the transaction

Users create transactions and sign them with their private keys. Then, the **transaction and its signature** are broadcast together to the network, where they are validated and processed.

:::tip
Each transaction has exactly one `Signer` and `Receiver`, but can have multiple `Actions`
:::

---

## Actions
Each transaction can have **one or multiple** `Actions`, which are the actual operations to be performed on the `Receiver` account. There are 9 types of actions that can be performed:

1. `FunctionCall`: to invoke a function on a contract (optionally attaching NEAR to the call)
2. `Transfer`: to transfer tokens to another account
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
