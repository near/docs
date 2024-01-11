---
id: introduction
title: Điều kiện cần
---

To develop a smart contract you will need to install [Node.js](https://nodejs.org/en/download/).

:::tip We further recommend to install [yarn](https://yarnpkg.com) using `npm install -g yarn`. :::

---

### Rust
If you prefer to use Rust as your main language, then you need to install `rustup` as well.

Follow the instructions bellow to [setup Rust](https://doc.rust-lang.org/book/ch01-01-installation.html), also adding the toolchain to compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

```bash
# Installing Rust in Linux and MacOS
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```