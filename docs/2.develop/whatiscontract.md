---
id: whatiscontract
title: 💡 What is a Smart Contract?
---

Smart contracts are simple programs that live in a blockchain. As any modern application, smart contracts store data and expose methods to interact with them. They are written in human readable languages, then compiled and deployed to the blockchain. Once deployed, any user (including other contracts) can interact with them.

Do not worry if you don't know how smart-contract blockchains work. As a developer, it is sufficient to understand that smart-contracts:

1. Have **limited** computational resources.

2. Interact with other contracts in an **asynchronous** way.

3. Deal with **real money**, for which security must be a top concern.

---

## Programming Languages

Smart Contracts in the NEAR blockchain are encoded using [WebAssembly](https://webassembly.org/). However, you don't need to write WebAssembly, instead, you can use high-level languages such as Rust and AssemblyScript, which then get compiled to Web Assembly.

While it is not necessary to be an expert in either language, during these docs we will assume you have a basic knowledge of at least one of them. If you never used any we recommend you to start [here with Rust](https://doc.rust-lang.org/book/title-page.html) and [here with AssemblyScript](https://www.assemblyscript.org/introduction.html).

<hr class="subsection" />

### Rust

Rust is a programming language designed for performance and safety. It is syntactically similar to C++, but can guarantee memory safety without resorting to garbage collection. Rust has proven to be a mature and secure language, which makes it ideal to write smart contracts. Because of this, **Rust is the preferred programming language for writing smart contracts on NEAR**. While there might be a learning curve for those coming from web development, learning Rust enables to write safer and faster contracts. Furthermore, core contracts such as Fungible Tokens and DAOs are currently only available in RUST.

<hr class="subsection" />

### AssemblyScript

[AssemblyScript](https://www.assemblyscript.org/) is a dialect of TypeScript programming language that compiles to WebAssembly. The syntax resembles JavaScript, but with strict and static typing. One can think of it as a mix of TypeScript's high level syntax and C's low-level capabilities. Thanks to this, the resulting WebAssembly modules can profit from predictable performance while guaranteeing a small binary size. However, this comes with the tradeoff of having to strictly type all variables and structures, and therefore not having `any`, `union` types or `undefined` variables.

:::caution
Because of its maturity and safety features, we strongly recommend to use Rust when writing financial contracts.
:::