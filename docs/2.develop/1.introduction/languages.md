---
id: languages
title: Programming Languages
---

The NEAR platform supports writing contracts in Rust and AssemblyScript. Currently, the preferred programming language for writing smart contracts on NEAR is Rust.

### Rust
Rust is a programming language designed for performance and safety. It is syntactically similar to C++, but can guarantee memory safety without resorting to garbage collection. Rust has proven to be a mature and secure language, which makes it ideal to write smart contracts. Because of this, Rust is the preferred programming language for writing smart contracts on NEAR. While there might be a learning curve for those coming from web development, learning Rust is not complicated and highly rewarding in terms of security.

### Assembly Script
[AssemblyScript](broken) is a dialect of TypeScript programming language that compiles to WebAssembly. The syntaxis resembles JavaScript, but with strict and static typing. One can think of it as a mix of TypeScript's high level syntax and C's low-level capabilities. Thanks to this, the resulting WebAssembly modules can profit from predictable performance while guaranteeing a small binary size. However, this comes with the tradeoff of having to strictly type all variables and structures, and therefore not having `any`, `union` types or `undefined` variables.

:::caution
AssemblyScript is not recommended for writing financial contracts.
:::
