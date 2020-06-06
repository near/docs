---
id: transaction
title: Transaction
sidebar_label: Transaction
---


## Overview

A transaction is the smallest unit of work that can be assigned to the network.  Work in this case means compute (ie. executing a function) or storage (ie. reading / writing data).


## Transaction Processing

### Transaction

A `Transaction` is a collection of `Actions` that describe what should be done at the destination (the `receiver` account).

Each `Transaction` is augmented with critical information about its:
- **origin** (ie. cryptographically signed by `signer`)
- **destination** or intention (ie. sent or applied to `receiver`)
- **recency** (ie. `block_hash` from recent block is within acceptable limits ... [1 epoch](/docs/concepts/epoch))
- **uniqueness** (ie. `nonce` must be unique for a given `signer` `AccessKey`)

### Action

An `Action` is a composable unit of operation that, together with zero or more other `Actions`, defines a sensible `Transaction`.  There are currently 8 supported `Action` types:

- `CreateAccount` to make a new account (for a person, contract, refrigerator, etc)
- `DeleteAccount` to delete an account (and transfer balance to a beneficiary account)
- `AddKey` to add a key to an account (either `FullAccess` or `FunctionCall` access)
- `DeleteKey` to delete an existing key from an account
- `Transfer` to move tokens from one account to another
- `Stake` to express interest in becoming a validator at the next available opportunity
- `DeployContract` to deploy a contract
- `FunctionCall` to invoke a method on a contract (including budget for compute and storage)


### Receipt

A `Receipt` is the only actionable object in the system. When we talk about "processing a transaction" on the NEAR platform, this eventually means "applying receipts" at some point.

A good mental model is to think of a `Receipt` as a paid message to be executed at the destination (`receiver`). And a `Transaction` is an externally issued request to create the `Receipt` (there is a 1 to 1 relationship).

There are several ways of creating `Receipts`:

- issuing a `Transaction`
- returning a promise (related to cross-contract calls)
- issuing a refund

You can find more about the technical details of `Receipts` in the [NEAR nomicon](https://nomicon.io/RuntimeSpec/Receipts.html)

### Finality Gadget

A "finality gadget" is a collection of rules that balances the *urgency* of maximizing blockchain "liveness" (ie. responsiveness / performance) with the *safety* needed to minimize the risk of accepting invalid transactions onto the blockchain.  One of these rules includes "waiting for a while" before finalizing (or sometimes reversing) transactions -- this amounts to waiting at least 3 blocks to finality and a few minutes (about 120 blocks) before irreversibility.

