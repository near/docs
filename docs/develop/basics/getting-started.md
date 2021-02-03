---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

Here is a quick overview of essential resources you will use when developing on NEAR.

| Name                                                   | Description                                                                                              |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **[NEAR Examples](https://near.dev)**                  | assortment of example projects built on NEAR that you can clone and explore                              |
| **[NEAR Wallet](/docs/tools/near-wallet)**             | create and manage [accounts](/docs/concepts/account) & [access keys](/docs/concepts/account#access-keys) |
| **[NEAR Explorer](/docs/tools/near-explorer)**         | view and inspect [transactions](/docs/concepts/transaction) taking place on the blockchain               |
| **[NEAR CLI](/docs/tools/near-cli)**                   | command line interface tool to interact with accounts and smart contracts on NEAR                        |
| **[NEAR-API-JS](/docs/develop/front-end/near-api-js)** | JavaScript library to interact with accounts and smart contracts on NEAR                                 |
| **[NEAR-SDK-AS](https://github.com/near/near-sdk-as)** | SDK used for developing smart contracts in [AssemblyScript](https://www.assemblyscript.org/)             |
| **[NEAR-SDK-RS](https://github.com/near/near-sdk-rs)** | SDK used for developing smart contracts in [Rust](https://www.rust-lang.org/)                            |
| **[NEARUP](https://github.com/near/nearup)**           | for running a local instance of NEAR                                                                     |

Development on the NEAR platform falls into two main categories:

- **[Applications](/docs/develop/basics/getting-started/#developing-applications)** _(front-end)_
- **[Smart contracts](/docs/develop/basics/getting-started/#developing-smart-contracts)** _(back_end)_

With [`create-near-app`](/docs/develop/basics/getting-started/#create-near-app) you can launch a full stack "Hello World" app in under five minutes! Test it out by running the following in your terminal: _(Requires [Node.js](https://nodejs.org/en/))_

```bash
npx create-near-app your-awesome-project
```

If you're new to NEAR or blockchain in general, be sure to check out ["New to NEAR"](/docs/concepts/new-to-near).

---

## Developing Applications

> To develop applications that interact with smart contracts on NEAR we have developed a JavaScript library [`near-api-js`](/docs/develop/front-end/near-api-js) that interacts with [JSON RPC endpoints](/docs/develop/front-end/rpc).

---

## Developing Smart Contracts

> Smart Contracts are the backend of your application that runs code and stores data on the blockchain. All smart contracts on NEAR must be compiled to [WebAssembly](https://webassembly.org/) or simply WASM. Currently, we support two languages [AssemblyScript](https://www.assemblyscript.org/) and [Rust](https://www.rust-lang.org/) with custom software development kits (SDKs) to assist in their creation.

### AssemblyScript

`near-sdk-as`

- [Documentation](https://near.github.io/near-sdk-as)

### Rust

`near-sdk-rs`

- [Documentation](https://docs.rs/near-sdk)

---

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> <h8>Ask it on StackOverflow!</h8></a>
