---
id: workspaces-rs
title: NEAR Workspaces (Rust Edition)
sidebar_label: Workspaces Rust
---

<strong>Rust library for automating workflows and writing tests for NEAR smart contracts. This software is not final, and will likely change.</strong>

## Release notes

**Release notes and unreleased changes can be found in the [CHANGELOG](CHANGELOG.md)**

## Requirements

- Rust v1.56 and up
- MacOS (x86) or Linux (x86) for sandbox tests. Testnet is available regardless

### M1 MacOS

NOTE: Current version of `workspaces-rs` does not support use on M1 chip devices due to internal upgrades with wasmer. M1 users should use `workspaces-rs` version `0.1.1` until this problem gets resolved. Check the progress on this issue [here](https://github.com/near/workspaces-rs/issues/110).

Even with the above note, we can use `workspaces-rs` with version `0.1.1` on M1 by setting up rosetta plus our cross compile target:
```
softwareupdate --install-rosetta
rustup default stable-x86_64-apple-darwin
```

### WASM compilation not supported

`workspaces-rs`, the library itself, does not currently compile to WASM. Best to put this dependency in `[dev-dependencies]` section of `Cargo.toml` if we were trying to run this library alongside something that already does compile to WASM, such as `near-sdk-rs`.

## Simple Testing Case

A simple test to get us going and familiar with `workspaces` framework. Here, we will be going through the NFT contract and how we can test it with `workspaces-rs`.

### Setup -- Imports
First, we need to declare some imports for convenience.

```rust
// macro allowing us to convert human readable units to workspace units.
use near_units::parse_near;

// macro allowing us to convert args into JSON bytes to be read by the contract.
use serde_json::json;

// Additional convenient imports that allows workspaces to function readily.
use workspaces::prelude::*;
```

We will need to have our pre-compiled WASM contract ahead of time and know its path. In this showcase, we will be pointing to the example's NFT contract:

```rust
const NFT_WASM_FILEPATH: &str = "./examples/res/non_fungible_token.wasm";
```

NOTE: there is an unstable feature that will allow us to compile our projects during testing time as well. Take a look at the feature section [Compiling Contracts During Test Time](#compiling-contracts-during-test-time)

### Setup -- Setting up Sandbox and Deploying NFT Contract

This includes launching our sandbox, loading our wasm file and deploying that wasm file to the sandbox environment.

```rust

#[tokio::test]
async fn test_nft_contract() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let wasm = std::fs::read(NFT_WASM_FILEPATH)?;
    let contract = worker.dev_deploy(&wasm).await?;
```
Where
* `anyhow` - A crate that deals with error handling, making it more robust for developers.
* `worker` - Our gateway towards interacting with our sandbox environment.
* `contract`- The deployed contract on sandbox the developer interacts with.

Then we'll go directly into making a call into the contract, and initialize the NFT contract's metadata:
```rust
    let outcome = contract
        .call(&worker, "new_default_meta")
        .args_json(json!({
            "owner_id": contract.id(),
        }))?
        .transact()
        .await?;

    // outcome contains data like logs, receipts and transaction outcomes.
    println!("new_default_meta outcome: {:#?}", outcome);
```

Afterwards, let's mint an NFT via `nft_mint`. This showcases some extra arguments we can supply, such as deposit and gas:

```rust
    let deposit = 10000000000000000000000;
    let outcome = contract
        .call(&worker, "nft_mint")
        .args_json(json!({
            "token_id": "0",
            "token_owner_id": contract.id(),
            "token_metadata": {
                "title": "Olympus Mons",
                "dscription": "Tallest mountain in charted solar system",
                "copies": 1,
            },
        }))?
        .deposit(deposit)
        // nft_mint might consume more than default gas, so supply our own gas value:
        .gas(near_units::parse_gas("300 T"))
        .transact()
        .await?;

    println!("nft_mint outcome: {:#?}", outcome);
```
Then later on, we can view our minted NFT's metadata via our `view` call into `nft_metadata`:
```rust
    let result: serde_json::Value = contract
        .call(&worker, "nft_metadata")
        .view()
        .await?
        .json()?;

    println!("--------------\n{}", result);
    println!("Dev Account ID: {}", contract.id());
    Ok(())
}
```

## Examples

More standalone examples can be found in `examples/src/*.rs`.

To run the above NFT example, execute:
```
cargo run --example nft
```

## Features

### Choosing a network

```rust
#[tokio::main]  // or whatever runtime we want
async fn main() -> anyhow::Result<()> {
    // Create a sandboxed environment.
    // NOTE: Each call will create a new sandboxed environment
    let worker = workspaces::sandbox().await?;
    // or for testnet:
    let worker = workspaces::testnet().await?;
}
```

### Helper Functions

Need to make a helper function regardless of whatever Network?

```rust
use workspaces::prelude::*;
use workspaces::{Contract, DevNetwork, Network, Worker};

// Helper function that calls into a contract we give it
async fn call_my_func(worker: Worker<impl Network>, contract: &Contract) -> anyhow::Result<()> {
    // Call into the function `contract_function` with args:
    contract.call(&worker, "contract_function")
        .args_json(serde_json::json!({
            "message": msg,
        })?
        .transact()
        .await?;
    Ok(())
}

// Create a helper function that deploys a specific contract
// NOTE: `dev_deploy` is only available on `DevNetwork`s such sandbox and testnet.
async fn deploy_my_contract(worker: Worker<impl DevNetwork>) -> anyhow::Result<Contract> {
    worker.dev_deploy(&std::fs::read(CONTRACT_FILE)?).await
}
```

### Spooning - Pulling Existing State and Contracts from Mainnet/Testnet

This example will showcase spooning state from a testnet contract into our local sandbox environment.

We will first start with the usual imports:
```rust
use near_units::{parse_gas, parse_near};
use workspaces::network::Sandbox;
use workspaces::prelude::*;
use workspaces::{Account, AccountId, BlockHeight, Contract, Worker};
```

Then specify the contract name from testnet we want to be pulling:
```rust
const CONTRACT_ACCOUNT: &str = "contract_account_name_on_testnet.testnet";
```

Let's also specify a specific block ID referencing back to a specific time. Just in case our contract or the one we're referencing has been changed or updated:

```rust
const BLOCK_HEIGHT: BlockHeight = 12345;
```

Create a function called `pull_contract` which will pull the contract's `.wasm` file from the chain and deploy it onto our local sandbox. We'll have to re-initialize it with all the data to run tests.
```rust
async fn pull_contract(owner: &Account, worker: &Worker<Sandbox>) -> anyhow::Result<Contract> {
    let testnet = workspaces::testnet_archival();
    let contract_id: AccountId = CONTRACT_ACCOUNT.parse()?;
```

This next line will actually pull down the relevant contract from testnet and set an initial balance on it with 1000 NEAR.

Following that we will have to init the contract again with our own metadata. This is because the contract's data is to big for the RPC service to pull down, who's limits are set to 50mb.

```rust

    let contract = worker
        .import_contract(&contract_id, &testnet)
        .initial_balance(parse_near!("1000 N"))
        .block_height(BLOCK_HEIGHT)
        .transact()
        .await?;

    owner
        .call(&worker, contract.id(), "init_method_name")
        .args_json(serde_json::json!({
            "arg1": value1,
            "arg2": value2,
        }))?
        .transact()
        .await?;

    Ok(contract)
}
```

### Time Traveling

`workspaces` testing offers support for forwarding the state of the blockchain to the future. This means contracts which require time sensitive data do not need to sit and wait the same amount of time for blocks on the sandbox to be produced. We can simply just call `worker.fast_forward` to get us further in time:

```rust
#[tokio::test]
async fn test_contract() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let contract = worker.dev_deploy(WASM_BYTES);

    let blocks_to_advance = 10000;
    worker.fast_forward(blocks_to_advance);

    // Now, "do_something_with_time" will be in the future and can act on future time-related state.
    contract.call(&worker, "do_something_with_time")
        .transact()
        .await?;
}
```

For a full example, take a look at [examples/src/fast_forward.rs](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs).


### Compiling Contracts During Test Time

Note, this is an unstable feature and will very likely change. To enable it, add the `unstable` feature flag to `workspaces` dependency in `Cargo.toml`:

```toml
[dependencies]
workspaces = { version = "...", features = ["unstable"] }
```
Then, in our tests right before we call into `deploy` or `dev_deploy`, we can compile our projects:
```rust
#[tokio::test]
async fn test_contract() -> anyhow::Result<()> {
    let wasm = workspaces::compile_project("path/to/contract-rs-project").await?;

    let worker = workspaces::sandbox().await?;
    let contract = worker.dev_deploy(&wasm);
    ...
}
```

For a full example, take a look at [workspaces/tests/deploy_project.rs](https://github.com/near/workspaces-rs/blob/main/workspaces/tests/deploy_project.rs).
