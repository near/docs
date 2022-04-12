---
id: environment
title: Environment
sidebar_label: 🏞️ Environment
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainAs from "./example/main.as.md";
import MainRs from "./example/main.rs.md";

Every method execution has a environment associated. This is, when someone executes your method, you can have access to information such as:

1. Who called the method
2. How much money is attached to the call
3. How many computational resources are available
4. The current timestamp

---

## Snippet: The environment

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <MainAs></MainAs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <MainRs></MainRs>
  </TabItem>
</Tabs>

---

## Who is calling?

The environment has information on which user is calling your method, as well as your contract's account. This information is available to you through the `current_account`, `predecessor`, and `signer` parameters.

### Current Account
The `current_account` contains the address of your smart contract. This is very useful to allow certain public methods to be called only by the contract itself (i.e. [private callbacks](broken)).

### Predecessor and Signer
The `predecessor` is the account that called the method in the contract. Meanwhile, the `signer` is the account that *signed* the first transaction that derived in such method call.

During a simple transaction (no [cross-contract calls](broken)) the `predecessor` is the same as the `signer`. For example, if **alice.near** calls **contract.near**, from the contract's perspective **alice.near** is both the `signer` and the `predecessor`. However, if **contract.near** creates a [cross-contract call](broken), then the `predecessor` changes down the line. In the example bellow, when **pool.near** executes it would see  **contract.near** as the `predecessor` and **alice.near** as the `signer`.

![img](https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png)
*You can access information about the users interacting with your smart contract*

:::tip
In most scenarios you will **only need the predecessor**. However, there are situations in which the signer is very useful. For example, when adding [NFTs](broken) to [this marketplace](https://github.com/near-examples/nft-market/blob/main/contracts/market-simple/src/nft_callbacks.rs#L37) the contract checks that:
1. The `predecessor` is the `current_account`, i.e. the function is a [private callback](broken)
2. The `signer` is the NFT owner, i.e. the execution chain was originated by the owner of the NFT
:::

---

## Balances and Attached NEAR
During a method execution the environment gives you access to three token-related parameters, all expressed in [yocto nears](broken) (yN = 10**-24 N):

### Attached Deposit
`attached_deposit` represents the amount of yocto NEARs the user attached to the call. This amount gets deposited immediatly in your contract's account, and **is automatically returned to the** `predecessor` **if the method panics**.

:::warning
If you make a [cross-contract call](broken) and it panics, the money attached to that call returns to your contract. It is your duty to transfer the money back to the `predecessor` during the [callback](broken).
:::

### Account Balance
`account_balance` represents the balance of your contract (`current_account`). It includes the `attached_deposit`, since it was deposited when the method execution started.

If the contract has any locked TOKENs, they will appear in `account_locked_balance`.

---

### Storage Used

`storage_used` represents the amount of [storage](broken) that is currently being used by your contract.

---

## Telling the Time

The environment exposes three different ways to tell the pass of time, each representing a different dimension of the blockchain:

### Timestamp
The `timestamp` attribute represents the approximated UNIX timestamp at which this call was executed. It quantifies time passing in a human way, enabling to check if a specific date has passed or not.

### Current Epoch
The NEAR blockchain groups blocks in [Epochs](broken). The `current_epoch` attribute measures how many epochs have passed so far. It is very useful to coordinate with other contracts that measure time in epochs, such as the [validators](broken)

### Block Index
The `block_index` represents the number of the block in which this transaction will be added to the blockchain

---
## Gas
Your smart contract has a limited number of computational resources to use each on each call. Such resources are measured in [GAS](broken). Basically, each code instruction cost a certain amount of GAS, and if you ran out of it, the execution halts with the error message `Exceeded the prepaid gas`.

Through the environment you get access to two gas-related arguments.

### Prepaid GAS
`prepaid_gas` represents the amount of GAS the `predecessor` attached to this call. It cannot exceed the limit 300TGAS and a little is burn on each instruction.

### Used GAS
`used_gas` contains the amount of GAS that has been used so far. It is useful to estimate the GAS cost of running a method. 

:::tip
If you already [estimated the GAS](broken) a method needs, you can ensure it never runs out of GAS by using `assert`

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">

  ```ts
    const NEEDED: u64 = 40
    const TGAS: u64 = 1000000000000
    assert(context.prepaidGas > NEEDED * TGAS, `Please attach at least ${NEEDED} TGAS`)
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    const NEEDED: u64 = 40
    const TGAS: u64 = 1000000000000
    assert!(env::prepaid_gas > NEEDED * TGAS, format!("Please attach at least ${} TGAS", NEEDED))
  ```

  </TabItem>
</Tabs>

:::

:::warning
When doing [cross-contract calls](broken) always make sure that the callback has enough GAS to fully execute any error handling.
:::

### &nbsp;

---

## 🎞️📚 Additional Resources

These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code