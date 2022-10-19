---
id: introduction
title: Prerequisites
---

To develop any smart contract you will need to you will to install Node.js. If you further want to use Rust as your main language, then you need to install `rustup` as well.

<hr class="subsection" />

## Node.js
Download and install [Node.js](https://nodejs.org/en/download/).

:::tip
We further recommend to install [yarn](https://yarnpkg.com) using `npm install -g yarn`.
:::

<hr class="subsection" />

## Rust and Wasm

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust. Then, add the `wasm32-unknown-unknown` toolchain which enables compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

```bash
# Installing Rust in Linux and MacOS
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```