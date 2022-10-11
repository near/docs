---
id: introduction
title: Introduction
sidebar_label: Getting Started
---

In order to start building a smart contract you need to first properly setup your computer.

In NEAR, smart contracts are written using the NEAR SDK which comes in two flavors: [Rust](../../4.tools/rs-sdk.md), and [JavaScript](../../4.tools/js-sdk.md).

---

## Prerequisites

To develop any smart contract you will need to you will to install Node.js. If you further want to use Rust as your main language, then you need to install `rustup` as well.

#### Node.js
Download and install [Node.js](https://nodejs.org/en/download/). We further recommend to install [yarn](https://yarnpkg.com): `npm install -g yarn`.

#### Rust and Wasm

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust. Then, add the `wasm32-unknown-unknown` toolchain which enables compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

```bash
# Get Rust in linux and MacOS
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```

---

## Setting Up Your Project

We recommend you to setup your project using our [quickstart tool](../quickstart.md), since this will install all the necessary packages.

```bash
npx create-near-app@latest
```
