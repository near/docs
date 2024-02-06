---
id: whatisacontract
title: What is a Smart Contract?
sidebar_label: What is a Smart Contract?
---

Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that NEAR smart-contracts:
1. Have **limited** computational resources.
2. Interact with other contracts in an **asynchronous** way.
3. Deal with **real money**, for which security must be a top concern.

:::info HTTP Requests and Smart Contracts
Smart contracts **cannot perform HTTP requests**, meaning they can't fetch data from outside the NEAR network.
:::

---

## Where do Contracts Live?
Smart Contracts are deployed into [**NEAR accounts**](../../1.concepts/basics/accounts/introduction.md). Any NEAR account can hold a contract, needing to pay for the **contract's code** and the **data it stores**. Since storage is cheap (0.01Ⓝ per kb) deploying a contract generally costs just a few cents.

![img](/docs/assets/welcome-pages/contract-landing.png)

Once in an account, anyone can interact with the contract. Thanks to the underlying network structure, executing code from a contract is both **fast** (avg. 1.4s finality) and **cheap**. Moreover, **read-only** operations are **free for everyone**.

---

## Life Cycle of a Contract

Just like any piece of software, smart contracts have a “life cycle” - starting with its creation and ending with monitoring it, all of which we cover in our documentation.

![img](/docs/assets/welcome-pages/contract-lifecycle.png)

- [**Scaffold**](../contracts/quickstart.md): The simplest way to create a project is by starting from a template.
- [**Build**](../contracts/): To write a contract developers can choose between Javascript and Rust.
- [**Test**](../testing/introduction.md): Our Sandbox enables to simulate interactions with one or multiple contracts in a realistic environment.
- [**Deploy**](../deploy.md): After making sure the contract is secure, developers can deploy the contract into their accounts.
- [**Use**](https://mynearwallet.com): Any user can interact with the contract through their NEAR Wallet.
- [**Monitor**](../monitor.md): The contract's activity can be monitored through simple APIs.

During the whole cycle, developers can choose between [JavaScript](https://www.learn-js.org/) and [Rust](https://www.rust-lang.org/), allowing them to use their favorite language at each step of their journey.

<details>
<summary> Other languages </summary>
Theoretically, you can use any language that compiles to Wasm for developing NEAR smart contract. However, in order to have a user-friendly experience we would need to provide a library that wraps around low-level runtime APIs, while also offering other high-level functionalities.

We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.
</details>

---

## Contract Primitives
Contract primitives are the fundamental building blocks that can be combined to create a fully functional application. Blockchain primitives include Fungible Tokens (FT), Non Fungible Tokens (NFT), Decentralized Autonomous organizations (DAO), Link Drops and more.

- [Fungible Tokens (FT)](/primitives/ft): Fungible token is representation of an asset on a blockchain that is interchangeable. Besides the native NEAR token, users can issue their own fungible tokens or use those that are already present in the ecosystem and created by other users or projects.

- [Non Fungible Tokens (NFT)](/primitives/nft): In contrast with fungible tokens, non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

- [Decentralized Autonomous organizations (DAO)](/primitives/dao): Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision making, and funding are coordinated by publicly voting on proposals through a smart contract.

- [LinkDrops](/primitives/linkdrop): LinkDrops are an easy way to distribute digital assets (NFTs, FTs) via links. You provide a link for users and they can claim your drop.

