---
id: whatiscontract
title: What is a Smart Contract?
sidebar_label: 💡 What is a Smart Contract?
---

## What is a Smart Contract?
Smart contracts are simple programs that live in a blockchain. As any modern application, smart contracts store data and expose methods to interact with them. They are written in human readable languages, and then compiled and deployed to a blockchain. Once deployed, any user from the blockchain (including other contracts) can interact with them.

In order to develop smart contracts it is not necessary to understand how a blockchain works. You can simply abstract away the underlying complexity and think of the blockchain as another execution environment. Particularly, it is sufficient to understand that you will be writing apps that execute in an environment with nice advantages but **important constraints**:

1. Computational resources are **limited**, prioritize data structures over brute force.

2. Interactions with other contracts are **asynchronous** and **independent**.

3. You will be dealing with **real money**, so security must be a top concern.

---

## Programming Languages
Smart Contracts in the NEAR are encoded in [Web Assembly](https://webassembly.org/). However, you don't need to write wasm, instead, you can use languages such as Rust and AssemblyScript, which then get compiled to Web Assembly.

While it is not necessary to be an expert in either language, we will assume you have a basic knowledge of at least one of them. If you never used any of them we recommend you to start [here with Rust](broken) and [here with assemblyscript](broken).

### 🦀 Rust
Rust is a programming language designed for performance and safety. It is syntactically similar to C++, but can guarantee memory safety without resorting to garbage collection. Rust has proven to be a mature and secure language, which makes it ideal to write smart contracts. Because of this, Rust is the preferred programming language for writing smart contracts on NEAR. While there might be a learning curve for those coming from web development, learning Rust is not complicated and highly rewarding in terms of security. Furthermore, the core contracts of NEAR (e.g. Fungible Token and DAOs) are currently only available in RUST.

### 🚀 AssemblyScript
[AssemblyScript](broken) is a dialect of TypeScript programming language that compiles to WebAssembly. The syntax resembles JavaScript, but with strict and static typing. One can think of it as a mix of TypeScript's high level syntax and C's low-level capabilities. Thanks to this, the resulting WebAssembly modules can profit from predictable performance while guaranteeing a small binary size. However, this comes with the tradeoff of having to strictly type all variables and structures, and therefore not having `any`, `union` types or `undefined` variables.

:::caution
AssemblyScript is not recommended for writing financial contracts.
:::