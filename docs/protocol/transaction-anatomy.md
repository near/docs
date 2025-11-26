---
id: transaction-anatomy
title: Anatomy of a Transaction
description: "Learn about the structure and components of NEAR Protocol transactions, including signers, receivers, actions, and transaction validation fields."
---

This section explains the anatomy of a transaction in the NEAR Protocol, describing its structure, components, and the actions that can be performed within a transaction.

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
Each transaction has exactly one `Signer` and `Receiver`, but can have multiple `Actions`.
:::

:::info About nonce values
- When adding a key, the `nonce` is automatically assigned - particularly, it is given the value `block height * 10^6` - so the value in the `ADD_KEY` action is ignored
- A transaction is accepted only if the `nonce` value is in the range of:
  - `[(current_nonce_of_access_key + 1) .. (block_height * 10^6)]`
- Once a transaction is accepted, the access key's `nonce` is set to the `nonce` value of the included transaction
:::

---

## Actions

Each transaction can have **one or multiple** [`Actions`](https://nomicon.io/RuntimeSpec/Actions.html), which are the actual operations to be performed on the `Receiver` account. There are different types of actions that can be performed:

1. [`FunctionCall`](https://nomicon.io/RuntimeSpec/Actions.html#functioncallaction): to invoke a function on a contract (optionally attaching NEAR to the call)
2. [`Transfer`](https://nomicon.io/RuntimeSpec/Actions.html#transferaction): to transfer tokens to another account
3. [`DeployContract`](https://nomicon.io/RuntimeSpec/Actions.html#deploycontractaction): to deploy a contract in the account
4. [`DeployGlobalContract`](https://nomicon.io/RuntimeSpec/Actions.html#deployglobalcontractaction): registers a global contract referenced by its contract hash or by its account ID
5. [`UseGlobalContract`](https://nomicon.io/RuntimeSpec/Actions.html#useglobalcontractaction): uses a registered global contract by contract hash or account ID
6. [`CreateAccount`](https://nomicon.io/RuntimeSpec/Actions.html#createaccountaction): to create a new sub-account (e.g. `ana.near` can create `sub.ana.near`)
7. [`DeleteAccount`](https://nomicon.io/RuntimeSpec/Actions.html#deleteaccountaction): to delete the account (transferring the remaining balance to a beneficiary)
8. [`AddKey`](https://nomicon.io/RuntimeSpec/Actions.html#addkeyaction): to add a new key to the account (either `FullAccess` or `FunctionCall` access)
9. [`DeleteKey`](https://nomicon.io/RuntimeSpec/Actions.html#deletekeyaction): to delete an existing key from the account
10. [`DelegateActions`](https://nomicon.io/RuntimeSpec/Actions.html#delegate-actions): to create a meta-transaction
11. [`Stake`](https://nomicon.io/RuntimeSpec/Actions.html#stakeaction): special action to express interest in becoming a network validator

For example, `bob.near` can bundle the following actions in a single transaction:
- Create the account `contract.bob.near`
- Transfer 5 NEAR to `contract.bob.near`
- Deploy a contract in `contract.bob.near`
- Call the function `init` in `contract.bob.near`

The `Actions` are executed in the **order they are specified in the transaction**. If any of the **actions fails**, the transaction is discarded and none of the actions take effect.

:::warning One Receiver
Notice that all actions are performed on the same account. It is **not possible** to perform actions on multiple accounts in a single transaction, because transactions can have **only one receiver**
:::
