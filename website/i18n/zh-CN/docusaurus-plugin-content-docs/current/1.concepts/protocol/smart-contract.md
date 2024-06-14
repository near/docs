---
id: smartcontract
title: Smart Contract
---

Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

![Smart Contract](@site/static/docs/assets/welcome-pages/contracts-landing.png)

Developers can choose between using Javascript or Rust to write smart contracts in NEAR. Indistinctly from the language chosen, the contract will be compiled into WebAssembly, from which point it can be deployed and executed on the NEAR platform.

:::tip Want to build a smart contract?
Check our [**Quickstart Guide**](../../2.build/2.smart-contracts/quickstart.md) to build your first smart contract in NEAR.
:::

---

## What can Smart Contract Do?

Smart contracts have complete control over the account, and thus can perform any action on its behalf. For example, contracts can:

- Transfer $NEAR Tokens
- Call methods on themselves or **other contracts**
- Create new accounts and deploy contracts on them
- Update their own code

Besides, smart contracts can store data in the account's storage. This allows contract's to create almost any type of application, from simple games to complex financial systems.

:::danger What contracts cannot do

- Smart contracts cannot **access the internet**, so they cannot make HTTP requests or access external data
- Smart contracts cannot **execute automatically**, they need to be called by an external account
  :::

---

## What are Contract's Used for?

Smart contracts are useful to create **decentralized applications**. Some traditional examples include:

- [Decentralized Autonomous Organizations](https://near.org/nearcatalog.near/widget/Index?cat=dao), where users create and vote proposals
- [Marketplaces](https://near.org/nearcatalog.near/widget/Index?cat=marketplaces), where users create and commercialize digital art pieces
- [Decentralized exchanges](https://near.org/nearcatalog.near/widget/Index?cat=exchanges), where users can trade different currencies
- [And many more...](https://near.org/nearcatalog.near/widget/Index)

For instance, you can easily create a crowdfunding contract that accepts $NEAR. If the goal is met in time, the creator can claim the funds. Otherwise, the backers are refunded.

---

## Contract's Storage

Smart contract stores data in the account's state. The contract's storage is organized as **key-value pairs** encoded using either [JSON](https://www.json.org/json-en.html) or [Borsh](https://borsh.io) serialization. This allows to store any type of data efficiently, from simple numbers to complex objects.

Since the data occupies space in the network, smart contracts need to **pay for the storage they use**. For this, accounts automatically lock a portion of their balance each time new data is stored in the contract. This means that:

- If data is added to the contract's storage the account's **balance decreases ↓**.
- If data is deleted the account's **balance increases ↑**.

Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.

:::tip
:::tip
Serializing and deserializing the storage happens automatically through our SDK tools, so you can focus on coding the logic of the contract
:::
:::
