---
id: what-is
title: What is a Smart Contract?
sidebar_label: What is a Contract?
---

Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

![img](/docs/assets/welcome-pages/contracts-landing.png)

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that NEAR smart-contracts:
1. Have **limited** computational resources.
2. Interact with other contracts in an **asynchronous** way.
3. Deal with **real money**, for which security must be a top concern.

:::info HTTP Requests and Smart Contracts

Smart contracts **cannot perform HTTP requests**, meaning they can't fetch data from outside the NEAR network.

:::

---

## Where do contracts live?
Smart Contracts are deployed into [**NEAR accounts**](../../1.concepts/protocol/account-model.md). Any NEAR account can hold a contract, needing to pay for the **contract's code** and the **data it stores**. 

Once in an account, anyone can interact with the contract. Thanks to the underlying network structure, executing code from a contract is both **fast** (avg. 1.4s finality) and **cheap**. Moreover, **read-only** operations are **free for everyone**.

:::tip
Storing 100kb costs 1Ⓝ, so deploying a contract generally costs only a few $NEARs.
:::

---

## Development flow

Just like any piece of software, smart contracts have a development flow - starting with its creation and ending with monitoring it, all of which we cover in our documentation.

![img](/docs/assets/welcome-pages/contract-lifecycle.png)

The development flow can be summarized as follows:
- [**Scaffold**](../contracts/quickstart.md): The simplest way to create a project is by starting from a template.
- [**Build**](../contracts/welcome.md): To write a contract developers can choose between Javascript and Rust.
- [**Test**](../testing/introduction.md): Our Sandbox enables to simulate interactions with one or multiple contracts in a realistic environment.
- [**Deploy**](../deploy.md): After making sure the contract is secure, developers can deploy the contract into their accounts.
- [**Use**](https://mynearwallet.com): Any user can interact with the contract through their NEAR Wallet.
- [**Monitor**](../monitor.md): The contract's activity can be monitored through simple APIs.

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

Check our section on [primitives](../../7.primitives/whatareprimitives.md) to learn more about them

:::
