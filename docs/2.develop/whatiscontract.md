---
id: whatisacontract
title: What is a Smart Contract?
---

Smart contracts are simple programs that live in a blockchain. As any modern application, smart contracts store data and expose methods to interact with them.
They are written in human readable languages, then compiled and deployed to the blockchain. Once deployed, any user (including other contracts) can interact
with them.

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that smart-contracts:

1. Have **limited** computational resources.

2. Interact with other contracts in an **asynchronous** way.

3. Deal with **real money**, for which security must be a top concern.

---

## Programming Languages

Smart Contracts in the NEAR blockchain are encoded using [WebAssembly](https://webassembly.org/). However, you don't need to write WebAssembly, instead, you will use high-level languages such as Javascript, Rust and AssemblyScript, and use our SDK to get then compiled to Web Assembly.

While it is not necessary to be an expert in either language, during these docs we will assume you have a basic knowledge of at least one of them. If you never used Rust we recommend you [to start here](https://doc.rust-lang.org/book/title-page.html). For Assemblyscript [start here](https://www.assemblyscript.org/introduction.html).

<hr class="subsection" />


### Other Languages
Theoretically, you can use any language that compiles to Wasm for developing NEAR smart contract. However, in order to have a user-friendly experience we would need
to provide a library that wraps around low-level runtime APIs, while also offering other high-level functionalities.

We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.
If you have a language you love, take a look a our [JSON RPC API](/api/rpc/setup), the primary interface for interacting with the blockchain. You can refer to
[`near-api-js`, our JavaScript library.](https://github.com/near/near-api-js/) for inspiration and reference on the abstractions we use for
JavaScript developers.
