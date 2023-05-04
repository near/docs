---
id: environment
title: Environment
#sidebar_label: 🏞️ Environment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import TableAs from "./table.as.md";
import TableRs from "./table.rs.md";
import TableJs from "./table.js.md";

import TableAsFunc from "./table-func.as.md";
import TableRsFunc from "./table-func.rs.md";
import TableJsFunc from "./table-func.js.md";

Every method execution has an environment associated with information such as:

1. Who called the method
2. How much money is attached to the call
3. How many computational resources are available
4. The current timestamp
5. Helper functions for Public Key derivation, for example

---

## Environment Variables

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">
    <TableJs></TableJs>
  </TabItem>
  <TabItem value="🦀 Rust">
    <TableRs></TableRs>
  </TabItem>
  <TabItem value="🚀 AssemblyScript" >
    <TableAs></TableAs>
  </TabItem>
</Tabs>

---

## Who is Calling? Who am I?

The environment gives you access to 3 important users: the `current_account`, the `predecessor`, and the `signer`.

### Current Account

The `current_account` contains the address in which your contract is deployed. This is very useful to implement ownership, e.g. making a public method only callable by the contract itself.

### Predecessor and Signer

The `predecessor` is the account that called the method in the contract. Meanwhile, the `signer` is the account that _signed_ the initial transaction.

During a simple transaction (no [cross-contract calls](../crosscontract.md)) the `predecessor` is the same as the `signer`. For example, if **alice.near** calls **contract.near**, from the contract's perspective, **alice.near** is both the `signer` and the `predecessor`. However, if **contract.near** creates a [cross-contract call](../crosscontract.md), then the `predecessor` changes down the line. In the example below, when **pool.near** executes, it would see **contract.near** as the `predecessor` and **alice.near** as the `signer`.

![img](https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png)
*You can access information about the users interacting with your smart contract*

:::tip
In most scenarios you will **only need to know the predecessor**. However, there are situations in which the signer is very useful. For example, when adding [NFTs](../../relevant-contracts/nft.md) into [this marketplace](https://github.com/near-examples/nft-tutorial/blob/7fb267b83899d1f65f1bceb71804430fab62c7a7/market-contract/src/nft_callbacks.rs#L42), the contract checks that the `signer`, i.e. the person who generated the transaction chain, is the NFT owner.
:::

---

## Balances and Attached NEAR
The environment gives you access to 3 token-related parameters, all expressed in yoctoNEAR (1 Ⓝ = 10<sup>24</sup>yⓃ):

### Attached Deposit
`attached_deposit` represents the amount of yoctoNEAR the predecessor attached to the call. 

This amount is **already deposited** in your contract's account, and is **automatically returned** to the `predecessor` if your **method panics**.

:::warning
If you make a [cross-contract call](../crosscontract.md) and it panics, the funds are sent back to **your contract**. See how to handle this situation in the [callback section](../crosscontract.md#failed-execution)
:::

### Account Balance

`account_balance` represents the balance of your contract (`current_account`).

It includes the `attached_deposit`, since it was deposited when the method execution started.

If the contract has any locked $NEAR, it will appear in `account_locked_balance`.

---

### Storage Used

`storage_used` represents the amount of [storage](../storage.md) that is currently being used by your contract.

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

Your contract has a **limited number of computational resources** to use on each call. Such resources are measured in [Gas](/concepts/basics/transactions/gas).

Gas can be thought of as wall time, where 1 PetaGas (1_000 TGas) is ~1 second of compute time.

Each code instruction costs a certain amount of Gas, and if you run out of it, the execution halts with the error message `Exceeded the prepaid gas`.

The environment gives you access to two gas-related arguments: `prepaid_gas` and `used_gas`.

### Prepaid Gas
`prepaid_gas` represents the amount of Gas the `predecessor` attached to this call. It cannot exceed the limit 300TGas (300 * 10<sup>12</sup> Gas).

### Used Gas
`used_gas` contains the amount of Gas that has been used so far. It is useful to estimate the Gas cost of running a method.

:::warning
During [cross-contract calls](/develop/contracts/crosscontract) always make sure the callback has enough Gas to fully execute.
:::

:::tip
If you already [estimated the Gas](/concepts/basics/transactions/gas#accurate-estimates-with-automated-tests) a method needs, you can ensure it never runs out of Gas by using `assert`

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🦀 Rust">

  ```rust
  const REQUIRED_GAS: Gas = Gas(20_000_000_000_000); // 20 TGas
  assert!(env::prepaid_gas() >= REQUIRED_GAS, "Please attach at least 20 TGas");
  ```
  </TabItem>
</Tabs>
:::

---

## Environment Functions

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">
    <TableJsFunc></TableJsFunc>
  </TabItem>
  <TabItem value="🦀 Rust">
    <TableRsFunc></TableRsFunc>
  </TabItem>
  <TabItem value="🚀 AssemblyScript" >
    <TableAsFunc></TableAsFunc>
  </TabItem>
</Tabs>

:::info 
In the JS SDK, `throw new Error("message")` mimics the behavior of Rust's `env::panic_str("message")`.
:::

---
