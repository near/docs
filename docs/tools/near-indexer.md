---
id: near-indexer
title: NEAR Indexer
sidebar_label: NEAR Indexer
---

> The [NEAR Indexer Framework](https://github.com/near/nearcore/tree/master/chain/indexer) allows you to run a network node that listens for targeted information on the blockchain. For more information see [indexer](/docs/concepts/index) under our "Concepts" section.

## Project Setup

### Pre-requisites

- If you haven't already, please [install Rust](https://docs.near.org/docs/tutorials/contracts/intro-to-rust#3-step-rust-installation)

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

- `src` folder with a `main.rs` file inside
- `cargo.toml`

### Create Rust Toolchain

Next, you will need to create a Rust toolchain that mirrors the one in [`nearcore`](https://github.com/near/nearcore/blob/master/rust-toolchain):

To do this, run the following command in the root of your project: _(be sure to check the link above for the correct `nightly` version)_

```bash
echo nightly-2020-10-08 > rust-toolchain
```

### Add dependencies

**1) In your `cargo.toml` file add `near-indexer` under [dependencies]:**

```toml
[dependencies]
near-indexer = { git = "https://github.com/near/nearcore" }
```

**Note:** While it is fine to omit specific commit hash for tutorial purpose we highly recommend to freeze near-indexer dependency for specific commit from `nearcore` repository. _(Example below)_

```toml
near-indexer = { git = "https://github.com/nearprotocol/nearcore", rev="29fcaf3b8c81a4c0371d105054ce251355382a77" }
```

**2) Add `actix`, `openssl-probe`, & `tokio`**

```toml
actix = "0.11.0-beta.1"
openssl-probe = { version = "0.1.2" }
tokio = { version = "1.1", features = ["sync"] }
```

**3) Once complete your `cargo.toml` dependencies should look something like this:**

```toml
[dependencies]
near-indexer = { git = "https://github.com/near/nearcore" }
actix = "0.11.0-beta.1"
openssl-probe = { version = "0.1.2" }
tokio = { version = "1.1", features = ["sync"] }
```

**4) Install and check dependencies**

To install these dependencies and check to make sure everything works run:

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

