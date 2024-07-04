---
id: environment
title: Environment
#sidebar_label: 🏞️ Environment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Every method execution has an environment associated with information such as:

1. Who called the method
2. How much money is attached to the call
3. How many computational resources are available
4. The current timestamp
5. Helper functions for Public Key derivation, for example

---

## Environment Variables

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

| Variable Name          | SDK Variable                  | Description                                                                          |
|------------------------|-------------------------------|--------------------------------------------------------------------------------------|
| Predecessor            | `near.predecessorAccountId()` | Account ID that called this method                                                   |
| Current Account        | `near.currentAccountId()`     | Account ID of this smart contract                                                    |
| Signer                 | `near.signerAccountId()`      | Account ID that signed the transaction leading to this execution                     |
| Attached Deposit       | `near.attachedDeposit()`      | Amount in NEAR attached to the call by the predecessor                               |
| Account Balance        | `near.accountBalance()`       | Balance of this smart contract (including Attached Deposit)                          |
| Prepaid Gas            | `near.prepaidGas()`           | Amount of gas available for execution                                                |
| Timestamp              | `near.blockTimestamp()`       | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC) |
| Current Epoch          | `near.epochHeight()`          | Current epoch in the blockchain                                                      |
| Block Index            | `near.blockIndex()`           | Current block index (a.k.a. block height)                                            |
| Storage Used           | `near.storageUsage()`         | Current storage used by this smart contract                                          |
| Used Gas               | `near.usedGas()`              | Amount of gas used for execution                                                     |
| Signer Public Key      | `near.signerAccountPk()`      | Sender Public Key                                                                    |
| Account Locked Balance | `near.accountLockedBalance()` | Balance of this smart contract that is locked                                        |

</TabItem>

<TabItem value="rust" label="🦀 Rust">

| Variable Name          | SDK Variable                    | Description                                                                          |
|------------------------|---------------------------------|--------------------------------------------------------------------------------------|
| Predecessor            | `env::predecessor_account_id()` | Account ID that called this method                                                   |
| Current Account        | `env::current_account_id()`     | Account ID of this smart contract                                                    |
| Signer                 | `env::signer_account_id()`      | Account ID that signed the transaction leading to this execution                     |
| Attached Deposit       | `env::attached_deposit()`       | Amount in NEAR attached to the call by the predecessor                               |
| Account Balance        | `env::account_balance()`        | Balance of this smart contract (including Attached Deposit)                          |
| Prepaid Gas            | `env::prepaid_gas()`            | Amount of gas available for execution                                                |
| Timestamp              | `env::block_timestamp()`        | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC) |
| Current Epoch          | `env::epoch_height()`           | Current epoch in the blockchain                                                      |
| Block Index            | `env::block_index()`            | Current block index (a.k.a. block height)                                            |
| Storage Used           | `env::storage_usage()`          | Current storage used by this smart contract in bytes                                 |
| Storage Byte Cost      | `env::storage_byte_cost()`      | Current storage cost per byte in yoctoNEAR                                           |
| Used Gas               | `env::used_gas()`               | Amount of gas used for execution                                                     |
| Signer Public Key      | `env::signer_account_pk()`      | Sender Public Key                                                                    |
| Account Locked Balance | `env::account_locked_balance()` | Balance of this smart contract that is locked                                        |

</TabItem>

</Tabs>

---

## Who is Calling? Who am I?

The environment gives you access to 3 important users: the `current_account`, the `predecessor`, and the `signer`.

### Current Account

The `current_account` contains the address in which your contract is deployed. This is very useful to implement ownership, e.g. making a public method only callable by the contract itself.

### Predecessor and Signer

The `predecessor` is the account that called the method in the contract. Meanwhile, the `signer` is the account that _signed_ the initial transaction.

During a simple transaction (no [cross-contract calls](../anatomy/crosscontract.md)) the `predecessor` is the same as the `signer`. For example, if **alice.near** calls **contract.near**, from the contract's perspective, **alice.near** is both the `signer` and the `predecessor`. However, if **contract.near** creates a [cross-contract call](../anatomy/crosscontract.md), then the `predecessor` changes down the line. In the example below, when **pool.near** executes, it would see **contract.near** as the `predecessor` and **alice.near** as the `signer`.

![img](https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png)
*You can access information about the users interacting with your smart contract*

:::tip
In most scenarios you will **only need to know the predecessor**. However, there are situations in which the signer is very useful. For example, when adding [NFTs](../../5.primitives/nft.md) into [this marketplace](https://github.com/near-examples/nft-tutorial/blob/7fb267b83899d1f65f1bceb71804430fab62c7a7/market-contract/src/nft_callbacks.rs#L42), the contract checks that the `signer`, i.e. the person who generated the transaction chain, is the NFT owner.
:::

---

## Balances and Attached NEAR
The environment gives you access to 3 token-related parameters, all expressed in yoctoNEAR (1 Ⓝ = 10<sup>24</sup>yⓃ):

### Attached Deposit
`attached_deposit` represents the amount of yoctoNEAR the predecessor attached to the call. 

This amount is **already deposited** in your contract's account, and is **automatically returned** to the `predecessor` if your **method panics**.

:::warning
If you make a [cross-contract call](../anatomy/crosscontract.md) and it panics, the funds are sent back to **your contract**. See how to handle this situation in the [callback section](../anatomy/crosscontract.md#failed-execution)
:::

### Account Balance

`account_balance` represents the balance of your contract (`current_account`).

It includes the `attached_deposit`, since it was deposited when the method execution started.

If the contract has any locked $NEAR, it will appear in `account_locked_balance`.

---

### Storage Used

`storage_used` represents the amount of [storage](../anatomy/storage.md) that is currently being used by your contract.

:::tip
If you want to know how much storage a structure uses, print the storage before and after storing it.
:::

---

## Telling the Time

The environment exposes three different ways to tell the pass of time, each representing a different dimension of the underlying blockchain.

### Timestamp

The `timestamp` attribute represents the approximated **UNIX timestamp** at which this call was executed. It quantifies time passing in a human way, enabling to check if a specific date has passed or not.

### Current Epoch

The NEAR blockchain groups blocks in [Epochs](../../../1.concepts/basics/epoch.md). The `current_epoch` attribute measures how many epochs have passed so far. It is very useful to coordinate with other contracts that measure time in epochs, such as the [validators](../../../1.concepts/basics/validators.md).

### Block Index

The `block_index` represents the index of the block in which this transaction will be added to the blockchain.

---

## Gas

Your contract has a **limited number of computational resources** to use on each call. Such resources are measured in [Gas](/concepts/protocol/gas).

Gas can be thought of as wall time, where 1 PetaGas (1_000 TGas) is ~1 second of compute time.

Each code instruction costs a certain amount of Gas, and if you run out of it, the execution halts with the error message `Exceeded the prepaid gas`.

The environment gives you access to two gas-related arguments: `prepaid_gas` and `used_gas`.

### Prepaid Gas
`prepaid_gas` represents the amount of Gas the `predecessor` attached to this call. It cannot exceed the limit 300TGas (300 * 10<sup>12</sup> Gas).

### Used Gas
`used_gas` contains the amount of Gas that has been used so far. It is useful to estimate the Gas cost of running a method.

:::warning
During [cross-contract calls](./crosscontract.md) always make sure the callback has enough Gas to fully execute.
:::

:::tip

If you already [estimated the Gas](../../../1.concepts/protocol/gas.md#estimating-costs-for-a-call) a method needs, you can ensure it never runs out of Gas by using `assert`

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="rust" label="🦀 Rust">

```rust
const REQUIRED_GAS: Gas = Gas(20_000_000_000_000); // 20 TGas
assert!(env::prepaid_gas() >= REQUIRED_GAS, "Please attach at least 20 TGas");
```

</TabItem>

</Tabs>

:::

---

## Environment Functions

Besides environmental variables, the SDK also exposes some functions to perform basic cryptographic operations

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

| Function Name         | SDK method                                       | Description                                                                                                                                                                                                                                                                                                                      |
|-----------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SHA 256               | `near.sha256(value)`                             | Hashes a sequence of bytes using sha256.                                                                                                                                                                                                                                                                                         |
| Keccak 256            | `near.keccak256(value)`                          | Hashes a sequence of bytes using keccak256.                                                                                                                                                                                                                                                                                      |
| Keccak 512            | `near.keccak512(value)`                          | Hashes a sequence of bytes using keccak512.                                                                                                                                                                                                                                                                                      |
| RIPEMD 160            | `near.ripemd160(value)`                          | Hashes the bytes using the RIPEMD-160 hash function.                                                                                                                                                                                                                                                                             |
| EC Recover            | `near.ecrecover(hash, sig, v, malleabilityFlag)` | Recovers an ECDSA signer address from a 32-byte message `hash` and a corresponding `signature` along with `v` recovery byte. Takes in an additional flag to check for malleability of the signature which is generally only ideal for transactions. Returns 64 bytes representing the public key if the recovery was successful. |
| Log String            | `near.log(msg)`                                  | Logs the string message. This message is stored on chain.                                                                                                                                                                                                                                                                        |
| Validator Stake       | `near.validatorStake(accountId)`                 | For a given account return its current stake. If the account is not a validator, returns 0.                                                                                                                                                                                                                                      |
| Validator Total Stake | `near.validatorTotalStake()`                     | Returns the total stake of validators in the current epoch.                                                                                                                                                                                                                                                                      |

</TabItem>

<TabItem value="rust" label="🦀 Rust">

| Function Name         | SDK method                                              | Description                                                                                                                                                                                                                                                                                                                      |
|-----------------------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SHA 256               | `env::sha256(value)`                                    | Hashes a sequence of bytes using sha256.                                                                                                                                                                                                                                                                                         |
| Keccak 256            | `env::keccak256(value)`                                 | Hashes a sequence of bytes using keccak256.                                                                                                                                                                                                                                                                                      |
| Keccak 512            | `env::keccak512(value)`                                 | Hashes a sequence of bytes using keccak512.                                                                                                                                                                                                                                                                                      |
| SHA 256 (Array)       | `env::sha256_array(value)`                              | Hashes the bytes using the SHA-256 hash function. This returns a 32 byte hash.                                                                                                                                                                                                                                                   |
| Keccak 256 (Array)    | `env::keccak256_array(value)`                           | Hashes the bytes using the Keccak-256 hash function. This returns a 32 byte hash.                                                                                                                                                                                                                                                |
| Keccak 512 (Array)    | `env::keccak512_array(value)`                           | Hashes the bytes using the Keccak-512 hash function. This returns a 64 byte hash.                                                                                                                                                                                                                                                |
| RIPEMD 160 (Array)    | `env::ripemd160_array(value)`                           | Hashes the bytes using the RIPEMD-160 hash function. This returns a 20 byte hash.                                                                                                                                                                                                                                                |
| EC Recover            | `env::ecrecover(hash, signature, v, malleability_flag)` | Recovers an ECDSA signer address from a 32-byte message `hash` and a corresponding `signature` along with `v` recovery byte. Takes in an additional flag to check for malleability of the signature which is generally only ideal for transactions. Returns 64 bytes representing the public key if the recovery was successful. |
| Panic String          | `env::panic_str(message)`                               | Terminates the execution of the program with the UTF-8 encoded message.                                                                                                                                                                                                                                                          |
| Log String            | `env::log_str(message)`                                 | Logs the string message. This message is stored on chain.                                                                                                                                                                                                                                                                        |
| Validator Stake       | `env::validator_stake(account_id)`                      | For a given account return its current stake. If the account is not a validator, returns 0.                                                                                                                                                                                                                                      |
| Validator Total Stake | `env::validator_total_stake()`                          | Returns the total stake of validators in the current epoch.                                                                                                                                                                                                                                                                      |

</TabItem>

</Tabs>

:::info 
In the JS SDK, `throw new Error("message")` mimics the behavior of Rust's `env::panic_str("message")`.
:::

---
