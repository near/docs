---
id: factory-contract
title: Building a Factory Contract
sidebar_label: Build Factory Contract
description: "Create a smart contract that can store bytecode and deploy it to new sub-accounts."
---

import {Github} from "@site/src/components/codetabs"

A factory contract needs two core capabilities: storing contract bytecode and deploying it to new sub-accounts. Let's build this step by step.

## Contract Structure

First, let's look at the basic structure of our factory contract:

<Github fname="lib.rs"
        url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
        start="1" end="20" />

The factory contract stores the compiled bytecode in a `Vec<u8>` field. This bytecode will be deployed to each new sub-account we create.

## Core Deployment Method

The heart of our factory is the deployment method. This function creates a new sub-account and deploys our stored contract to it:

<Github fname="deploy.rs"
        url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
        start="14" end="45" />

Let's break down what this method does:

1. **Creates a sub-account** using the provided name
2. **Transfers the required deposit** to cover account creation and storage costs
3. **Deploys the stored contract code** to the new account
4. **Calls the initialization method** on the deployed contract

## Account Creation Promise

The `Promise::new()` chain handles the complex process of account creation and contract deployment:

<Github fname="deploy.rs"
        url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
        start="46" end="66" />

This promise chain:
- Creates the account with the specified initial balance
- Deploys the bytecode stored in `self.code`
- Calls the contract's initialization method

## Contract Management

We also need a way to update the stored contract code for future deployments:

<Github fname="manager.rs"
        url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
        start="5" end="19" />

The `#[private]` annotation ensures only the factory contract itself can update the stored bytecode.

## Why Direct Input Reading?

Notice the `env::input()` approach instead of regular parameter deserialization. This is a gas optimization:

- Standard deserialization would parse the entire WASM file from JSON
- For large contracts, this consumes the entire gas limit
- Direct input reading bypasses this overhead

## Initialization Method

Finally, we need an initialization method for when the factory is first deployed:

<Github fname="manager.rs"
        url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
        start="20" end="30" />

This sets up the factory with an initial contract to deploy. The factory owner can later update this stored contract.

## Cargo.toml Dependencies

Make sure your `Cargo.toml` includes the necessary dependencies:

```toml
[dependencies]
near-sdk = "4.1.1"
```

## Building the Contract

Compile your factory contract:

```bash
cargo build --target wasm32-unknown-unknown --release
```

The compiled WASM file will be in `target/wasm32-unknown-unknown/release/`.

Now that we have our factory contract built, let's [deploy it to testnet](2-deploy-factory.md) and upload our first contract template.