---
id: setup
title: Project Setup and Structure
sidebar_label: Project Setup
---

import {Github} from "@site/src/components/codetabs"

Let's set up a factory contract project that can deploy contracts using NEAR's global contracts feature.

## Create the Project

Initialize a new Rust project:

```bash
cargo new factory-contract --lib
cd factory-contract
```

## Configure Cargo.toml

Set up the dependencies and build configuration:

<Github fname="Cargo.toml"
    url="https://github.com/near-examples/factory-rust/blob/main/Cargo.toml"
    start="1" end="28" />

Key dependencies:
- `near-sdk` with `global-contracts` feature enables global contract functionality
- `bs58` for decoding base58-encoded code hashes
- `near-workspaces` for integration testing

## Rust Toolchain

Configure the Rust toolchain for WASM compilation:

<Github fname="rust-toolchain.toml"
    url="https://github.com/near-examples/factory-rust/blob/main/rust-toolchain.toml"
    start="1" end="4" />

## Project Structure

Create the following file structure:

```
factory-contract/
├── Cargo.toml
├── rust-toolchain.toml
├── src/
│   ├── lib.rs        # Main contract logic
│   └── manager.rs    # Configuration management
└── tests/
    └── workspaces.rs # Integration tests
```

## Contract State

Define the contract state that stores the global contract reference:

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="7" end="13" />

The `GlobalContractId` enum allows referencing a global contract in two ways:
- **AccountId**: Reference the account that deployed the global contract
- **CodeHash**: Reference the global contract by its code hash directly

## Initialize the Factory

Set up the default state:

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="15" end="29" />

By default:
- References the global Fungible Token contract on testnet
- Requires minimum 0.2 NEAR deposit for sub-account creation

## Build the Contract

Compile the contract to WASM:

```bash
cargo near build
```

This creates an optimized WASM file in `target/near/`.

## Deploy to Testnet

Create a testnet account and deploy:

```bash
# Create a dev account
cargo near create-dev-account

# Deploy the contract
cargo near deploy <your-dev-account>
```

Your factory is now deployed and ready to create sub-accounts!

## Understanding Global Contract References

### By Account ID

When you reference a global contract by account ID:

```rust
GlobalContractId::AccountId("ft.globals.primitives.testnet".parse().unwrap())
```

The factory will look up the most recent global contract deployed by that account.

### By Code Hash

When you reference a global contract by hash:

```rust
GlobalContractId::CodeHash("3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX".to_string())
```

The factory directly uses that specific contract code, regardless of who deployed it.

:::tip Which to Use?

- **AccountId**: Use when you trust the deployer and want automatic updates
- **CodeHash**: Use when you need a specific, immutable version of the contract

:::

Next, we'll implement the core deployment functionality that creates sub-accounts and deploys contracts.