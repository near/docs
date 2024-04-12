---
id: what-is
title: 스마트 컨트랙트란 무엇인가요?
sidebar_label: What is a Contract?
---

Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

![img](/docs/assets/welcome-pages/contracts-landing.png)

스마트 컨트랙트 블록체인이 어떻게 작동하는지 모르더라도 걱정하지 마세요. 개발자로서 NEAR 스마트 컨트랙트를 이해하는 것만으로도 충분합니다.

1. **제한적인** 컴퓨팅 리소스를 가지고 있습니다.
2. **비동기적인** 방식으로 다른 컨트랙트와 상호 작용합니다.
3. **실제 돈**을 다루기 때문에, 제일 중요한 것은 보안입니다.

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
