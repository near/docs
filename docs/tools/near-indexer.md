---
id: near-indexer
title: NEAR Indexer
sidebar_label: NEAR Indexer
---

> The [NEAR Indexer Framework](https://github.com/near/nearcore/tree/master/chain/indexer) allows you to run a network node that listens for targeted information on the blockchain. For more information see [indexer](/docs/concepts/indexer) under our "Concepts" section.

---

## Setup

### Requirements

- [Rust.](https://www.rust-lang.org/) If not already installed, please [follow these instructions](https://docs.near.org/docs/tutorials/contracts/intro-to-rust#3-step-rust-installation).
- Minimunm hardware:
  - 4 CPU cores
  - 16GB RAM
  - 100GB SSD _(HDD will **not** work)_

### Creating your project

To create a new project with Rust, you will start by creating a new binary by running the following command in your terminal:

```bash
cargo new --bin example-indexer
```

Now change directory into your newly created project:

```bash
cd example-indexer
```

Inside this folder you will find:

- `Cargo.toml`
- `src` folder with a `main.rs` file inside

### Create Rust Toolchain

Next, you will need to create a Rust toolchain that mirrors the one in [`nearcore`](https://github.com/near/nearcore/blob/master/rust-toolchain):

To do this, run the following command in the root of your project: _(be sure to check the link above for the correct `nightly` version)_

```bash
echo nightly-2020-10-08 > rust-toolchain
```

### Add dependencies

**1) In your `Cargo.toml` file add `near-indexer` under [dependencies]:**

```toml
[dependencies]
near-indexer = { git = "https://github.com/near/nearcore" }
```

> **Note:** While it is fine to omit specific commit hash for this tutorial we highly recommend to freeze near-indexer dependency for specific commit from the `nearcore` repository. _(Example below)_

```toml
near-indexer = { git = "https://github.com/nearprotocol/nearcore", rev="29fcaf3b8c81a4c0371d105054ce251355382a77" }
```

**2) Add `actix`, `openssl-probe`, & `tokio`**

```toml
actix = "0.11.0-beta.1"
openssl-probe = { version = "0.1.2" }
tokio = { version = "1.1", features = ["sync"] }
```

**3) Once complete, your `Cargo.toml` dependencies should look something like this:**

```toml
[dependencies]
near-indexer = { git = "https://github.com/near/nearcore" }
actix = "0.11.0-beta.1"
openssl-probe = { version = "0.1.2" }
tokio = { version = "1.1", features = ["sync"] }
```

**4) Install and check dependencies**

Install and check dependencies by running:

```bash
cargo check
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

If the cargo check command fails with some errors it might be because of different versions of underlying dependencies. 

- A quick solution is to copy `Cargo.lock` from `nearcore` repository [ [here](https://raw.githubusercontent.com/near/nearcore/master/Cargo.lock) ]  and replace it with the contents of your project's `Cargo.lock` file.
- After this is complete, rerun `cargo check` to see if this resolves your errors.

</blockquote>

---

## Constructing `main.rs`

> Now that we have our basic setup, we need to update `main.rs`.  

In your preferred IDE, navigate to and open `src/main.rs`. Here you'll notice a generic function `main()`:

```rs
fn main() {
    println!("Hello, world!");
}
```

Clear the contents of this function and lets begin building your indexer logic!

### Indexer Config

- First we will configure our indexer by defining the `IndexerConfig` instance:

```rs
let indexer_config = near_indexer::IndexerConfig {
        home_dir: std::path::PathBuf::from(near_indexer::get_default_home()),
        sync_mode: near_indexer::SyncModeEnum::FromInterruption,
        await_for_node_synced: near_indexer::AwaitForNodeSyncedEnum::WaitForFullSync,
    };
```

_Note that the NEAR Indexer Framework re-exports `get_default_home()` from `nearcore` and resolves its path to `.near` located in your home directory. ( ~/.near )_

### Indexer Runtime

**2) Next we need to define an `Indexer` instance and start it immediately:**

```rs
actix::System::builder()
    .stop_on_panic(true)
    .run(move || {
        let indexer = near_indexer::Indexer::new(indexer_config);
        let stream = indexer.streamer();
        actix::spawn(listen_blocks(stream));
    })
    .unwrap();
```

_The `Indexer` instance requires a runtime to work and because Rust does not have one by default, we will use `actix` as a runtime dependency._

### Block Listener

- Create `listen_blocks()`:

```rs
async fn listen_blocks(mut stream: tokio::sync::mpsc::Receiver<near_indexer::StreamerMessage>) {
    while let Some(streamer_message) = stream.recv().await {
        eprintln!("{:#?}", streamer_message);
    }
}
```

_This function listens for the creation of new blocks and prints details to the console each time one is discovered. This works by passing a mutable variable `stream` that has a `Receiver` type from `tokio::sync::mpsc`. The `stream` variable has a method `recv()` that you will use in a while loop that determines if a new block was "received" and what action you want to take once one is discovered. In this case we are simply printing to the console._

### Code Review

- `main.rs` should now look like the code block below with two separate functions: `main()` and `listen_blocks`

```rs
fn main() {
  let indexer_config = near_indexer::IndexerConfig {
        home_dir: std::path::PathBuf::from(near_indexer::get_default_home()),
        sync_mode: near_indexer::SyncModeEnum::FromInterruption,
        await_for_node_synced: near_indexer::AwaitForNodeSyncedEnum::WaitForFullSync,
    };

  actix::System::builder()
    .stop_on_panic(true)
    .run(move || {
        let indexer = near_indexer::Indexer::new(indexer_config);
        let stream = indexer.streamer();
        actix::spawn(listen_blocks(stream));
    })
    .unwrap();
}

async fn listen_blocks(mut stream: tokio::sync::mpsc::Receiver<near_indexer::StreamerMessage>) {
    while let Some(streamer_message) = stream.recv().await {
        eprintln!("{:#?}", streamer_message);
    }
}
```

### Test

- Run `cargo check` to ensure you setup everything correctly before proceeding to connecting to a network.

---

## Configure Network

> If you connect to `testnet` or `mainnet` your node will need to be fully synced with the network. This means the node will need to download **all the blocks** and apply **all the changes** to _your_ instance of the blockchain state. Because this process can take anywhere from a few hours to a few days we will connect to a `localnet` so you can get your indexer up and running in a matter of minutes.

### Setup

The node will need three things:

1) Configs
2) Network's genesis file
3) Key to run the node

All of this can be generated via nearcore's `neard` crate, but an easier way is to use the exposed `init_configs` from NEAR Indexer Framework. This will create a folder that keeps the database of the blockchain state and whenever you sync your node this data folder will be the same as the other nodes on the network.

<blockquote class="warning">
<strong>heads up</strong><br><br>

A regular node runs with the archival option disabled by default in its `config.json`. This means that the node has a "garbage collector" enabled which removes old data from storage after five [epochs](/docs/concepts/epoch) or approx. 2.5 days. An [archival node](/docs/roles/integrator/exchange-integration#running-an-archival-node) means that the garbage collector is disabled and **all** of the data is kept on the node.

You don't necessarily need to have an archival node for your indexer. In most cases you can live a happy life along with the garbage collector while you store necessary data in a separate database (either relational or nosql) much like we do with [NEAR Indexer for Wallet](https://github.com/near/near-indexer-for-wallet). However, an archival node may be necessary if you want to build an indexer which needs to find and save all transactions related to specific accounts from the beginning of the chain (from genesis).

</blockquote>

### Generating Configs

> A typical setup is to generate configs for `localnet` whenever you pass `init`, and start the indexer whenever you pass `run` as a command line argument.

- To start, add the following line at the the beginning of the `main()` function:

```rs
let args: Vec<String> = std::env::args().collect();
```

- Now create a `home_dir` variable that you will use in a few places. Add this line right after the previous one:

```rs
let home_dir = std::path::PathBuf::from(near_indexer::get_default_home());
```

- Next add a condition to check if you pass either `init` or `run` as an argument:

```rs
match args[1].as_str() {
    "init" => {},
    "run" => {},
    _ => panic!("ERROR: You have to pass `init` or `run` arg."),
}
```

- Inside the `init` code block add the `init_configs` function:

```rs
match args[1].as_str() {
    "init" => near_indexer::init_configs(
      &home_dir,
      Some("localnet"),
      None,
      None,
      1,
      false,
      None,
      true,
      None,
    );,
    "run" => {},
    _ => panic!("ERROR: You have to pass `init` or `run` arg."),
}

```

- For the `run` code block move the previous indexer start logic like so:

```rs
match args[1].as_str() {
    "init" => near_indexer::init_configs(
      &home_dir,
      Some("localnet"),
      None,
      None,
      1,
      false,
      None,
      true,
      None,
    );,
    "run" => {
          let indexer_config = near_indexer::IndexerConfig {
            home_dir: std::path::PathBuf::from(near_indexer::get_default_home()),
            sync_mode: near_indexer::SyncModeEnum::FromInterruption,
            await_for_node_synced: near_indexer::AwaitForNodeSyncedEnum::WaitForFullSync,
            };
    },
    _ => panic!("ERROR: You have to pass `init` or `run` arg."),
}

```

- If you like, you can refactor the code a bit by creating a `command` variable leaving your final `main()` function looking something like this:

```rs
fn main() {
    let args: Vec<String> = std::env::args().collect();
    let home_dir = std::path::PathBuf::from(near_indexer::get_default_home());

    let command = args.get(1)
        .map(|arg| arg.as_str())
        .expect("You need to provide a command: `init` or `run` as arg");

    match command {
        "init" => near_indexer::init_configs(
        &home_dir,
        Some("localnet"),
        None,
        None,
        1,
        false,
        None,
        true,
        None,
    ),
        "run" => {
            let indexer_config = near_indexer::IndexerConfig {
              home_dir: std::path::PathBuf::from(near_indexer::get_default_home()),
              sync_mode: near_indexer::SyncModeEnum::FromInterruption,
              await_for_node_synced: near_indexer::AwaitForNodeSyncedEnum::WaitForFullSync,
              };

    actix::System::builder()
        .stop_on_panic(true)
        .run(move || {
            let indexer = near_indexer::Indexer::new(indexer_config);
            let stream = indexer.streamer();
            actix::spawn(listen_blocks(stream));
        })
        .unwrap();
        }
        _ => panic!("You have to pass `init` or `run` arg"),
    };
}
```

### Initialize configurations

- Last step in in configuring your network is to initialize. To do this, simply run:

```bash
cargo run --init
```

## Run the Indexer

- You're ready to start the Indexer! To run enter the following command in your terminal:

```bash
cargo run -- run
```

- Ouch! You most likely got the following error:

```bash
thread 'main' panicked at 'Indexer should track at least one shard. 
Tip: You may want to update /Users/joshford/.near/config.json with `"tracked_shards": [0]`
            ', /Users/joshford/.cargo/git/checkouts/nearcore-5bf7818cf2261fd0/d7b0ca4/chain/indexer/src/lib.rs:65:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
Panic in Arbiter thread, shutting down system.
```

- Don't worry, this one is an easy fix!

  - Open your `config.json` located in the `.near` folder in the root of your home directory. _( ~/.near/config.json )_
  - In this file, locate: `"tracked_shards": []` and change the value to [0].
  - Save the file and try running your indexer again.

```bash
cargo run -- run
```

It’s alive! 🎉 

You should now see print to your terminal of `StreamerMessage` structures like the example below. :)

<details>
<summary>**Example Stream:**</summary>
<p>

```json
StreamerMessage {
    block: BlockView {
        author: "test.near",
        header: BlockHeaderView {
            height: 5,
            epoch_id: `11111111111111111111111111111111`,
            next_epoch_id: `4vf1hV5j63QLAPpiWQELXHAfJjHCgq1uooMrBNPMu5Uq`,
            hash: `4LdFTm4TfSvAEQBARvQ28VQqXNBhWruhSvxnBWxvFfVr`,
            prev_hash: `2QsMGwmLxg6QL615BPuX5nZttHnoGPDtKmmanxP92vBW`,
            prev_state_root: `CHAfu2kedNvLMKmK7gFx3knAp7URPnzw7GcEEnZWqzSJ`,
            chunk_receipts_root: `9ETNjrt6MkwTgSVMMbpukfxRshSD1avBUUa4R4NuqwHv`,
            chunk_headers_root: `9MJ7Lp84Sk1ky78u8naJJcHCyFnv8DUrfirtaxHvoRbA`,
            chunk_tx_root: `7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t`,
            outcome_root: `7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t`,
            chunks_included: 1,
            challenges_root: `11111111111111111111111111111111`,
            timestamp: 1612624576082671000,
            timestamp_nanosec: 1612624576082671000,
            random_value: `2bAoaYkYnBmvFtQCyu8VeE5JxfH8oTwYTrs5vZMtEZvF`,
            validator_proposals: [],
            chunk_mask: [
                true,
            ],
            gas_price: 1000000000,
            rent_paid: 0,
            validator_reward: 0,
            total_supply: 2050000000000000000000000000000000,
            challenges_result: [],
            last_final_block: `7ZJzz48xYV4oU7kkXfK6UjX7ydE5pJGzShGJUV8TX2YY`,
            last_ds_final_block: `2QsMGwmLxg6QL615BPuX5nZttHnoGPDtKmmanxP92vBW`,
            next_bp_hash: `EcqXCDTULxNaDncsiVU165HW7gMQNafzz5qekXgA6QdG`,
            block_merkle_root: `9yMLpVqRCSoFdB7ZvXRR344wcWBCodi6njCV95Vhqtfg`,
            approvals: [
                Some(
                    ed25519:RoMpcZtLWToDS6DEHmJXZUCYW8SLVyo8ZFgYTQLfNegtJjEd6CMSohhTZWJX2gqU637w2Xyfksezitu51D1vyLQ,
                ),
            ],
            signature: ed25519:3kpaw6bTxMRtxhhZQDqit9TCxaG6s4z91AgGN5Vp4fwkLcotUwVU7b1PivXKH361bj7kZ6wuhGsTLuvMd1HZraSN,
            latest_protocol_version: 42,
        },
        chunks: [
            ChunkHeaderView {
                chunk_hash: `FosjAojVKDzPqH9q9jTPJR7KciJ1TkWTnhCtM6pe8c9s`,
                prev_block_hash: `2QsMGwmLxg6QL615BPuX5nZttHnoGPDtKmmanxP92vBW`,
                outcome_root: `11111111111111111111111111111111`,
                prev_state_root: `HLi9RaXG8ejkiehaiSwDZ31zQ8gQGXJyf34RmXAER6EB`,
                encoded_merkle_root: `79Bt7ivt9Qhp3c6dJYnueaTyPVweYxZRpQHASRRAiyuy`,
                encoded_length: 8,
                height_created: 5,
                height_included: 5,
                shard_id: 0,
                gas_used: 0,
                gas_limit: 1000000000000000,
                rent_paid: 0,
                validator_reward: 0,
                balance_burnt: 0,
                outgoing_receipts_root: `H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4`,
                tx_root: `11111111111111111111111111111111`,
                validator_proposals: [],
                signature: ed25519:2aBb9sjzcNgaceVftvPrQMFVtQxKCZBjC7aGToqhQcJtnQQD1y8iBHq8NxsynYiuiYxHd22Tsznjz7emT4yk4Rjx,
            },
        ],
    },
    chunks: [
        IndexerChunkView {
            author: "test.near",
            header: ChunkHeaderView {
                chunk_hash: `FosjAojVKDzPqH9q9jTPJR7KciJ1TkWTnhCtM6pe8c9s`,
                prev_block_hash: `2QsMGwmLxg6QL615BPuX5nZttHnoGPDtKmmanxP92vBW`,
                outcome_root: `11111111111111111111111111111111`,
                prev_state_root: `HLi9RaXG8ejkiehaiSwDZ31zQ8gQGXJyf34RmXAER6EB`,
                encoded_merkle_root: `79Bt7ivt9Qhp3c6dJYnueaTyPVweYxZRpQHASRRAiyuy`,
                encoded_length: 8,
                height_created: 5,
                height_included: 0,
                shard_id: 0,
                gas_used: 0,
                gas_limit: 1000000000000000,
                rent_paid: 0,
                validator_reward: 0,
                balance_burnt: 0,
                outgoing_receipts_root: `H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4`,
                tx_root: `11111111111111111111111111111111`,
                validator_proposals: [],
                signature: ed25519:2aBb9sjzcNgaceVftvPrQMFVtQxKCZBjC7aGToqhQcJtnQQD1y8iBHq8NxsynYiuiYxHd22Tsznjz7emT4yk4Rjx,
            },
            transactions: [],
            receipts: [],
            receipt_execution_outcomes: [],
        },
    ],
    state_changes: [],
}
```

</details>

## Indexer examples

- [Flux Capacitor](https://github.com/fluxprotocol/flux-capacitor)
- [NEAR Explorer Indexer](https://github.com/near/near-indexer-for-explorer)
- [NEAR Wallet Indexer](https://github.com/near/near-indexer-for-wallet)


Did you create your own indexer?  Submit a PR and add it to the list!
