---
id: nearcore
title: NearCore
sidebar_label: NearCore
---
## Compile from source

**1. Dependencies**

Install Rust:

```bash
curl https://sh.rustup.rs -sSf | sh
rustup component add clippy-preview
rustup default nightly
```

Install development dependencies (OS-dependent):

_Ubuntu_:

```bash
sudo apt install make clang
```

**2. Clone repository**

We would need to copy the entire repository:

```bash
git clone https://github.com/near/nearcore
cd nearcore
```

**3. Compile and run**

Navigate to the root of the repository, and run:

```bash
cargo run --package neard --bin neard -- init
cargo run --package neard --bin neard -- run
```

This will setup a local chain with `init` and will run the node.

You can now check the status of the node with `http` tool \(`brew install httpie` or `apt install httpie` or configure CURL for POST requests\) via RPC:

```bash
http get http://localhost:3030/status
http post http://localhost:3030/ method=query jsonrpc=2.0 id=1 params:='["account/test.near", ""]'
```

See full list of RPC endpoints [here](api/rpc.md)

Unfortunately, transactions needs to be signed and encoded in base64, which is hard to do from the command line. Use `near-cli` tool to manage keys and send transactions \(`npm install -g near-cli`\).

## Code Style

We follow style enforced by [rustfmt](https://github.com/rust-lang/rustfmt). Therefore before submitting code make sure you ran it on your code. Also, please make sure you have our [rustfmt config](https://github.com/near/nearcore/blob/master/rustfmt.toml) in your `~/.config/rustfmt/` directory.

If you are using CLion IDE you can configure it to run rustfmt automatically every time your file is saved to the disk. Go to `Preferences→Languages & Frameworks→Rust→Rustfmt` and check `Run rustfmt on Save`.

## Testing

To run NEARCore node in the testing mode, for example to test it or for development of `near-api-js` or `near-cli` you can use scripts that sets up special tests-only local testnet:

```bash
./scripts/start_localnet.py
```

This sets up a new single node testnet, with predetermined private key of the validator and turns on "fast" mode of block production to make development and testing easy.

### Logging

Many times in development of the node it's useful to see detailed logs about what is happening. `neard` binary has `--verbose` mode to show more details about what is happening:

```bash
cargo run --package neard --bin neard -- --verbose=true run
```

You can also use the `RUST_LOG` environment variable, with `env_logger` [semantics](https://docs.rs/env_logger/0.6.0/env_logger/#enabling-logging) to override the log level for specific targets. `RUST_LOG` can also be used in integration tests which spawn runnable apps.

If you want to change what is logged in verbose mode / non-verbose mode, for example to add new target \(e.g. `info!(target: "my target", "hello")`\), modify `neard/src/main.rs` in `init_logging` function.

## Operations

This section describes how to prepare releases and publish docker files for NEAR core client.

### Build docker container

To build docker image run from the root:

```bash
make docker-nearcore
```

This will build an image with `nearcore` name.

### Publishing Docker files

To publish docker image, use

```bash
sudo docker tag nearcore <your username>/mynearcore:<version>
sudo docker push <your username>/mynearcore:<version>

sudo docker tag nearcore <your username>/mynearcore:latest
sudo docker push <your username>/mynearcore:latest
```

Official image is published at `nearprotocol/nearcore`

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
