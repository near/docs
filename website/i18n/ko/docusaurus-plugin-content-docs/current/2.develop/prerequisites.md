---
id: prerequisites
title: 전제 조건
---

스마트 컨트랙트를 개발할 때 Javascript를 사용하면 Node.js를, Rust를 사용하면 rust 툴체인을 설치해야 합니다.

---

## Developing Contracts in Rust

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust. Then, add the `wasm32-unknown-unknown` toolchain which enables compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

```bash
# Get Rust in linux and MacOS
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```

---

