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

# How to speed up rust compilation time

This describes on how to improve nearcore compilation time without having to
modify Cargo.toml. It's possible to override Cargo.toml setting by setting
`RUSTFLAGS` variable and also by adding a compilation cache by overriding
`RUSTC_WRAPPER`.


### Default build
```bash
# cargo clean; time RUSTFLAGS= RUSTC_WRAPPER= cargo build -p neard --release
real	8m59.257s user	40m11.663s sys	2m8.809s
# touch */*/*/*.rs; time RUSTFLAGS= RUSTC_WRAPPER= cargo build -p neard --release
real	5m44.904s user	15m53.672s sys	0m16.913s
```

### Turn off linking time optimization
This option may have some small performance impact.
```bash
# cargo clean; time RUSTFLAGS='-C lto=off' RUSTC_WRAPPER= cargo build -p neard --release
real	6m25.495s user	40m54.353s sys	2m43.932s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off' RUSTC_WRAPPER= cargo build -p neard --release
real	1m38.721s user	7m45.446s sys	0m11.767s
```

### Use LLD linker
Requires installing lld linker.
```bash
# cargo clean; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld' RUSTC_WRAPPER= cargo build -p neard --release
real	5m57.307s user	37m28.079s sys	2m27.664s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld' RUSTC_WRAPPER= cargo build -p neard --release
real	1m26.627s user	7m12.705s sys	0m7.900s

```

### Experimental share-generics feature
Works only with nightly compiler.
```bash
# cargo clean; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER= cargo build -p neard --release
real	4m35.538s user	29m17.550s sys	2m6.262s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER= cargo build -p neard --release
real	0m53.101s user	3m52.850s sys	0m7.317s
```

### Parallelize building individual cargo packages
It's recommended to set `codegen-units` to a number not exceeding number of CPU cores available.
```bash
# cargo clean; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER= cargo build -p neard --release
real	4m42.485s user	28m47.223s sys	2m18.833s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER= cargo build -p neard --release
real	0m51.620s user	4m13.180s sys	0m11.254s
```

### Cache results from previous compilations using sccache
Requires installing sscache. If you want to compile sccache with `cargo
install sccache` make sure you use stable version of Rust.
```bash
# cargo clean; rm -rf ~/.cache/sccache/; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6 -C inline-threshold=25 -C debuginfo=2' RUSTC_WRAPPER=sccache cargo build -p neard --release
real	5m46.282s user	6m27.426s sys	0m56.159s
# cargo clean; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER=sccache cargo build -p neard --release
real	1m14.038s user	5m25.992s sys	0m57.247s
```

## Summary

### Setting for building release binary with debug symbols and reduced inlining (recommended if you plan to run a node)
```bash
# time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6 -C inline-threshold=25 -C debuginfo=2' RUSTC_WRAPPER=sccache cargo build -p neard --release
real	1m30.039s user	5m50.652s sys	1m2.509s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6 -C inline-threshold=25 -C debuginfo=2' RUSTC_WRAPPER= cargo build -p neard --release
real	0m58.641s user	5m19.715s sys	0m24.249s

```

### Setting for building release binary without debug symbols
```bash
# time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER=sccache cargo build -p neard --release
real	1m14.038s user	5m25.992s sys	0m57.247s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER= cargo build -p neard --release
real	0m49.682s user	4m22.074s sys	0m13.259s

```

### Setting for building without optimizations (recommended for Intellij/CLion)
Building this way cuts down build time, but the node will likely be too slow to run. This is useful in case you need
to build package to run tests or do build withing CLion/Intellij.

```bash
# time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER=sccache cargo build -p neard
real	1m36.723s user	5m9.578ssys	1m7.941s
# touch */*/*/*.rs; time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6' RUSTC_WRAPPER= cargo build -p neard
real	0m14.469s user	0m20.697s sys	0m6.694s
```

## Installation guide

### sccache
Follow guide at https://github.com/mozilla/sccache to install sccache.
If you are unable to install sccache you can remove `RUSTC_WRAPPER` option.

### lld

For ubuntu use:
```
sudo apt update
sudo apt install lld
```

For other systems follow link at https://lld.llvm.org/
If you can't install lld, you can remove option `-C link-arg=-fuse-ld=lld`.

## Clion/Intellij with Rust plugin
Currently Rust plugin doesn't support passing enviroment variables to cargo.
Your best option is to either modify Cargo.toml or replace
`$HOME/.cargo/bin/cargo` with a bash script, which sets proper
environment variables.

## Command line - bash/zsh
You can add the following lines to `.bashrc`, `.bash_profile`, `.zshrc` depending on your OS and terminal that you use.
```
export RUSTFLAGS="-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6 -C debuginfo=0"
export RUSTC_WRAPPER="sccache"
export SCCACHE_CACHE_SIZE="30G"
```
