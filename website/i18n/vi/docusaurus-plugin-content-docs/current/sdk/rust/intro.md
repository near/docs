---
id: get-started
---

# Bắt đầu

## Install Rust and Wasm toolchain

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust.

To install Rust on Linux or MacOS, use the following command:

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

source $HOME/.cargo/env
```

Then, add the `wasm32-unknown-unknown` toolchain. This toolchain is required because the contracts that we will build will be compiled to [Wasm](https://webassembly.org/) to run on the NEAR blockchain.

```bash
rustup target add wasm32-unknown-unknown
```

## Create a new project

The best way to create a new NEAR app connected with a frontend is through [create-near-app](https://github.com/near/create-near-app). When initializing the project, your option are `npx create-near-app <projectName> [--frontend next|vanilla|none] [--contract rs|ts|none --tests rs|ts|none]`.

```bash
npx create-near-app my-project --contract rs --frontend none --tests rs
```

If you only wish to develop and deploy a Rust contract, the [status message example](https://github.com/near-examples/rust-status-message) is great to use as a template or through [cargo-generate](https://github.com/cargo-generate/cargo-generate).

To initialize a new project with `cargo-generate`, run the following commands:

```bash
cargo install cargo-generate --features vendored-openssl

cargo generate --git https://github.com/near-examples/rust-status-message --name my-project
cd my-project
```

If you would like to generate a new crate manually with `cargo new --lib <crate-name>`, make sure you include the following configuration in the generated `Cargo.toml`:

```toml
[dependencies]
near-sdk = "4.0.0"

[lib]
crate-type = ["cdylib"]

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
```
