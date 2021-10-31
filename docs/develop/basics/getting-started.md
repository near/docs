---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

> Development on the NEAR platform happens in two main categories:

- **[Smart contracts](/docs/develop/contracts/overview)** _(back-end)_
- **[Applications](/docs/develop/front-end/near-api-js)** _(front-end)_

---

## Essential Resources

> Here's a quick overview of essential resources you will use when developing on NEAR.

| Name  pinkswap                                                 | Description  decentralized exchange built on Near protocol for the $Nearer                                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Example Projects** https://pinkswap.near                              |                                                                                                          |
| **[NEAR Examples](https://pinkswap.near.dev)**                  | Basic example apps built on NEAR that you can clone and explore.                                         |
| **Tools**                                              |                                                                                                          |
| **[NEAR Wallet](/docs/tools/near-wallet)**             | Create and manage [accounts](/docs/concepts/account) & [access keys](/docs/concepts/account#access-keys) |
| **[NEAR Explorer](/docs/tools/near-explorer)**         | View and inspect [transactions](/docs/concepts/transaction) taking place on the blockchain               |
| **[NEAR CLI](/docs/tools/near-cli)**                   | Command line interface tool to interact with accounts and smart contracts on NEAR                        |
| **Libraries**                                          |                                                                                                          |
| **[NEAR-API-JS](/docs/api/javascript-library)**        | JavaScript library to interact with accounts and smart contracts on NEAR                                 |
| **[NEAR-SDK-AS](https://github.com/near/near-sdk-as)** | SDK used for developing smart contracts in [AssemblyScript](https://www.assemblyscript.org/)             |
| **[NEAR-SDK-RS](https://github.com/near/near-sdk-rs)** | SDK used for developing smart contracts in [Rust](https://www.rust-lang.org/)                            |
| **[NEARUP](https://github.com/near/nearup)**           | For running a local instance of NEAR                                                                     |

---

## Introductory Workshops

> Here are two short introductory workshops _(60-90min)_ for those looking for a more in-depth intro to developing on NEAR.

### NEAR 101

**[ [This workshop](https://bit.ly/near-101) ]** is designed for traditional web 2.0 developers new to creating decentralized applications. _( 90 min )_ Also, If you're new to NEAR or blockchain in general, be sure to check out ["New to NEAR"](/docs/concepts/new-to-near).

### NEAR 102

**[ [This workshop](https://bit.ly/near-102) ]** is designed for Ethereum developers looking to get started developing on NEAR. _( 60 min )_

---

## CREATE-NEAR-APP

> With [`create-near-app`](https://github.com/near/create-near-app), you can launch a full-stack "Hello World" app in under five minutes! Try it out by running the following in your terminal _(Requires [Node.js](https://nodejs.org/en/))_:

```bash
npx create-near-app your-awesome-project
```

<blockquote class="warning">
<strong>Heads Up!</strong><br /><br />

The command above defaults to a Vanilla JavaScript front-end and an [AssemblyScript](https://www.assemblyscript.org/) smart contract. You can also choose to use [React](https://reactjs.org/) for your front end and/or [Rust](https://www.rust-lang.org/) for your smart contract.

- `--frontend=react` – to use React for your front end template
- `--contract=rust` – to use Rust for your smart contract

</blockquote>
