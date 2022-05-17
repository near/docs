---
id: prerequisites
title: Prerequisites
#sidebar_label: 💻 Prerequisites
---

In order to develop smart contracts you will need Git, Node.js and RUST.

### 🌐 Git
Git comes pre-installed in most unix systems (such as Linux and MacOs). In case your computer does not have it, you can download it from their [official website](https://git-scm.com/downloads)

### 🚀 Node.js
Download and install [Node.js](https://nodejs.org/en/download/). Then, install `yarn`: `npm install --global yarn`.

### 🦀 Rust and Wasm

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust. Then, add the `wasm32-unknown-unknown` toolchain which enables compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

#### Linux and MacOS:

```bash
# Get rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```