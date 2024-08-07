---
id: what-is
title: What is a Smart Contract?
sidebar_label: What is a Contract?
---

Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

![img](/docs/assets/welcome-pages/contracts-landing.png)

Developers can choose between using Javascript or Rust to write smart contracts in NEAR. Indistinctly from the language chosen, the contract will be compiled into WebAssembly, from which point it can be deployed and executed on the NEAR platform.

<details>

<summary> New to Smart Contract Development? </summary>

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that NEAR smart-contracts:
1. Have **limited** computational resources.
2. Interact with other contracts in an **asynchronous** way.
3. Deal with **real money**, for which security must be a top concern.

</details>

---

## Where do contracts live?
Smart Contracts are deployed into [**NEAR accounts**](../../1.concepts/protocol/account-model.md). Any NEAR account can hold a contract, needing to pay for the **contract's code** and the **data it stores**. 

Once in an account, anyone can interact with the contract. Thanks to the underlying network structure, executing code from a contract is both **fast** (avg. 1.4s finality) and **cheap**. Moreover, **read-only** operations are **free for everyone**.

:::tip
Storing 100kb costs 1Ⓝ, so deploying a contract generally costs only a few $NEARs.
:::

---

## What can they do?

Smart contracts have **complete control over the account**, and thus can perform **any action on its behalf**. For example, contracts can:
- Transfer $NEAR Tokens 
- Call methods on other contracts
- Create new accounts and deploy contracts on them
- Update their own code

Besides, smart contracts can store data in the account's storage. This allows contracts to create almost any type of application, from simple games to complex financial systems.

:::danger What contracts cannot do
- Smart contracts cannot **access the internet**, so they cannot make HTTP requests or access external data 
- Smart contracts cannot **execute automatically**, they need to be called by an external account
:::

---

## What are they used for?
Smart contracts are useful to create **decentralized applications**. Some traditional examples include:
- [Decentralized Autonomous Organizations](https://dev.near.org/nearcatalog.near/widget/Index?cat=dao), where users create and vote proposals
- [Marketplaces](https://dev.near.org/nearcatalog.near/widget/Index?cat=marketplaces), where users create and commercialize digital art pieces
- [Decentralized exchanges](https://dev.near.org/nearcatalog.near/widget/Index?cat=exchanges), where users can trade different currencies
- [And many more...](https://dev.near.org/nearcatalog.near/widget/Index)

For instance, you can easily create a crowdfunding contract that accepts $NEAR. If the goal is met in time, the creator can claim the funds. Otherwise, the backers are refunded.

---

## Development flow

Just like any piece of software, smart contracts have a development flow - starting with its creation and ending with monitoring it, all of which we cover in our documentation.

![img](/docs/assets/welcome-pages/contract-lifecycle.png)
 "build/building-smart-contracts/testing/introduction",
The development flow can be summarized as follows:
- [**Scaffold**](./quickstart.md): The simplest way to create a project is by starting from a template.
- [**Build**](./anatomy/anatomy.md): Write a contract using Rust or Javascript.
- [**Test**](./testing/introduction.md): Our Sandbox enables to simulate interactions with one or multiple contracts in a realistic environment.
- [**Deploy**](./release/deploy.md): After making sure the contract is secure, developers can deploy the contract into their accounts.
- [**Use**](https://mynearwallet.com): Any user can interact with the contract through their NEAR Wallet.
- [**Monitor**](../6.data-infrastructure/what-is.md): The contract's activity can be monitored through simple APIs.

#### Supported Languages
During the whole cycle, developers can choose between [JavaScript](https://www.learn-js.org/) and [Rust](https://www.rust-lang.org/), allowing them to use their favorite language at each step of their journey.

<details>

<summary> Other languages </summary>

Theoretically, you can use any language that compiles to Wasm for developing NEAR smart contract. However, in order to have a user-friendly experience we would need to provide a library that wraps around low-level runtime APIs, while also offering other high-level functionalities.

We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.

</details>

---

## Contract primitives
Contract primitives such as FT, NFT, and DAOs are fundamental building blocks that can be combined to create awesome user experiences such as reward tokens, decision-making tools, and marketplaces. 

:::tip

Check our section on [primitives](../5.primitives/what-is.md) to learn more about them

:::
