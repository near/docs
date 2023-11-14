---
id: whatisacontract
title: What is a Smart Contract?
sidebar_label: What is a Smart Contract?
---

Smart contracts are simple programs that live in the NEAR network. As any modern application, smart contracts store data and expose methods to interact with them.

They are written in human-readable languages, then compiled and deployed to an account where everyone can interact with them.

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that NEAR smart-contracts:
1. Have **limited** computational resources.
2. Interact with other contracts in an **asynchronous** way.
3. Deal with **real money**, for which security must be a top concern.

:::info HTTP Requests and Smart Contracts
Smart contracts **cannot perform HTTP requests**, meaning they can't retrieve data from outside the NEAR network. However, they can receive data from any outside source. If needed, you can set up a server to regularly feed them data (this is in short how [Oracles](../relevant-contracts/oracles.md) work).
:::

---

## Programming Languages
Developers can choose between using [JavaScript](../../sdk/js/js-sdk.md) or [Rust](../../sdk/rust/rs-sdk.md) to write smart contracts in NEAR.

Indistinctly from the language chosen, the NEAR SDK will help you to compile the contract into WebAssembly, from which point it can be deployed and executed on the NEAR platform.

While it is not necessary to be an expert in either language, during these docs we will assume you have a basic knowledge of at least one of them.

:::caution The [JS-SDK](https://github.com/near/near-sdk-js/releases/) is currently in Alpha

The JavaScript runtime has not been fully audited. For creating smart contracts that hold value please use [`near-sdk-rs`](https://github.com/near/near-sdk-rs). 

:::


### Other Languages
Theoretically, you can use any language that compiles to Wasm for developing NEAR smart contract. However, in order to have a user-friendly experience we would need
to provide a library that wraps around low-level runtime APIs, while also offering other high-level functionalities.

We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.
