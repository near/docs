---
id: transaction
title: Transaction
sidebar_label: Transaction
---


## Overview

A transaction is the smallest unit of work that can be assigned to the network.  Work in this case means compute (ie. executing a function) or storage (ie. reading / writing data).


## Transaction Processing

### Actions

An `Action` must be one of 8 supported operations on the network
- `CreateAccount` to make a new account (for a person, company, contract, car, refrigerator, etc)
- `DeployContract` to deploy a new contract (with its own account)
- `FunctionCall` to invoke a method on a contract (with budget for compute and storage)
- `Transfer` to transfer tokens from one account to another
- `Stake` to express interest in becoming a proof-of-stake validator at the next available opportunity
- `AddKey` to add a key to an existing account (either `FullAccess` or `FunctionCall` access)
- `DeleteKey` to delete an existing key from an account
- `DeleteAccount` to delete an account (and transfer balance to a beneficiary account)

### Transactions

A `Transaction` is a collection of `Action`s augmented with critical information about their
- **origin** (ie. cryptographically signed by `signer`)
- **destination** or intention (ie. sent or applied to `receiver`)
- **recency** (ie. `block_hash` distance from most recent block is within acceptable limits)
- **uniqueness** (ie. `nonce` must be unique for a given `signer`'s `AccessKey`)

### SignedTransactions

A `SignedTransaction` is a `Transaction` cryptographically signed by the `signer` account mentioned above.

### Receipts

`Receipt`s are basically what NEAR calls `Action`s after they pass the boundary from outside (untrusted) to inside (trusted) the NEAR internal communications layer. Having been cryptographically verified as valid, recent and unique, a `Receipt` is an `Action` ready for processing on the blockchain.

By design, each `Account` lives on one and only one "home" shard in the system.  `Receipt`s are applied to the shard of the receiver.  If the `Receipt` is not originally received (via RPC) at its home shard then it is routed across the network to the proper shard for processing.  For example, `DeleteKey` is an `Action` that would never need to be routed to more than 1 shard while `Transfer` would always be routed to more than 1 shard unless both `signer` and `receiver` happen to have the same home shard.

### Finality Gadget

A "finality gadget" is a collection of rules that balances the *urgency* of maximizing blockchain "liveness" (ie. responsiveness / performance) with the *safety* needed to minimize the risk of accepting invalid transactions onto the blockchain.  One of these rules includes "waiting for a while" before finalizing (or sometimes reversing) transactions -- this amounts to waiting at least 3 blocks to finality and a few minutes (about 120 blocks) before irreversibility".

## Pictures and Code

### Life of a Transaction

```text
          ---.
  o--------o |     o------------------------o     o-------------------o
  | Action | |     |      Transaction       |     | SignedTransaction |
  o--------o |     |                        |     |                   |
             |     | o--------o             |     |  o-------------o  |
  o--------o |     | | Action |  signer     |     |  | Transaction |  |
  | Action | | --> | o--------o  receiver   | --> |  |             |  |  ---.
  o--------o |     | | Action |  block_hash |     |  |             |  |     |
             |     | o--------o  nonce      |     |  |             |  |     |
  o--------o |     | | Action |             |     |  |             |  |     |
  | Action | |     | o--------o             |     |  o-------------o  |     |
  o--------o |     o------------------------o     o-------------------o     |
          ---'                                                              |
                                                                            |
                              sent to network                               |
.---------------------------------------------------------------------------'
|                               <----------
|
|                                                             
|                                       XXX o--------------o  
|                                      XX   |   Receipt    |  
|    o--------------------------------o     |              |  
|    |                                |     |  o--------o  |  
|    |  1. Validation (block_hash)    |     |  | Action |  |  
'--> |  2. Verification (signer keys) |     |  o--------o  |  --.
     |  3. Routing (receiver)         |     |  | Action |  |    |
     |                                |     |  o--------o  |    |
     o--------------------------------o     |  | Action |  |    |
            transaction arrives        XX   |  o--------o  |    |
                                        XXX o--------------o    |
                                                                |
                                                                |
        applied locally OR propagated to other shards           |
.---------------------------------------------------------------'
|                               <----------
|
|
|              --.         .-------.  .--.  .---.         .--.  o--------------o
|    o---------o |         |       |  |  |  |   |         |  |  |              |
'--> | Receipt | |  Shard  |       |  |  |  |   |         |  |  |              |
     o---------o |    A    |       |  |  |  | F |         |  |  |              |
|              --'         |       |  |  |  | I |         |  |  |              |
|                          |       |  |  |  | N |         |  |  |              |
|              --.         |       |  |  |  | A |         |  |  |     Block    |
|    o---------o |         | Block |  |  |  | L |  o o o  |  |  |      (i)     |
'--> | Receipt | |         |  (i)  |  |  |  | I |         |  |  | irreversible |
     o---------o |         |       |  |  |  | Z |         |  |  |              |
|                |  Shard  |       |  |  |  | E |         |  |  |              |
|    o---------o |    B    |       |  |  |  | D |         |  |  |              |
'--> | Receipt | |         |       |  |  |  |   |         |  |  |              |
     o---------o |         |       |  |  |  |   |         |  |  |              |
               --'         '-------'  '--'  '---'         '--'  o--------------o
                          |                     |
                          '---------------------'
                            at least 3 blocks
                               to finality
                          |                                                    |
                          '----------------------------------------------------'
                                   about 120 blocks to irreversibility
```

### Source Code

The following samples should help to clarify the relationship between
- Actions
- Transactions
- SignedTransactions
- and Receipts

```rust
/// source: https://nomicon.io/RuntimeSpec/Actions.html
pub enum Action {
    CreateAccount(CreateAccountAction),
    DeployContract(DeployContractAction),
    FunctionCall(FunctionCallAction),
    Transfer(TransferAction),
    Stake(StakeAction),
    AddKey(AddKeyAction),
    DeleteKey(DeleteKeyAction),
    DeleteAccount(DeleteAccountAction),
}

/// source: https://nomicon.io/RuntimeSpec/Transactions.html
pub struct Transaction {
    /// An account on which behalf transaction is signed
    pub signer_id: AccountId,
    /// An access key which was used to sign a transaction
    pub public_key: PublicKey,
    /// Nonce is used to determine order of transaction in the pool.
    /// It increments for a combination of `signer_id` and `public_key`
    pub nonce: Nonce,
    /// Receiver account for this transaction. If
    pub receiver_id: AccountId,
    /// The hash of the block in the blockchain on top of which the given transaction is valid
    pub block_hash: CryptoHash,
    /// A list of actions to be applied
    pub actions: Vec<Action>,
}

/// source: https://nomicon.io/RuntimeSpec/Transactions.html
pub struct SignedTransaction {
    /// A transaction struct
    pub transaction: Transaction,
    /// A signature of a hash of the Borsh-serialized Transaction
    pub signature: Signature,
}

/// source: https://github.com/nearprotocol/nearcore/blob/master/core/primitives/src/receipt.rs
pub struct Receipt {
    /// An issuer account_id of a particular receipt.
    /// `predecessor_id` could be either `Transaction` `signer_id` or intermediate contract's `account_id`.
    pub predecessor_id: AccountId,
    /// `receiver_id` is a receipt destination.
    pub receiver_id: AccountId,
    /// An unique id for the receipt
    pub receipt_id: CryptoHash,
    /// A receipt type: ReceiptEnum::Action or ReceiptEnum::Data
    pub receipt: ReceiptEnum,
}
```
