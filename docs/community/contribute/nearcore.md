---
id: contribute-nearcore
title: Contribute to nearcore
sidebar_label: NearCore Contributions
---

## Compile from source {#compile-from-source}

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
sudo apt install cmake clang
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
cargo run -p neard -- init
cargo run -p neard -- run
```

This will setup a local chain with `init` and will run the node.

You can now check the status of the node with `http` tool \(`brew install httpie` or `apt install httpie` or configure CURL for POST requests\) via RPC:

```bash
http get http://localhost:3030/status
http post http://localhost:3030/ method=query jsonrpc=2.0 id=1 params:='["account/test.near", ""]'
```

See full list of RPC endpoints [here](/docs/api/rpc)

Unfortunately, transactions needs to be signed and encoded in base64, which is hard to do from the command line. Use `near-cli` tool to manage keys and send transactions \(`npm install -g near-cli`\).

## Code Style {#code-style}

We follow style enforced by [rustfmt](https://github.com/rust-lang/rustfmt). Therefore before submitting code make sure you ran it on your code. Also, please make sure you have our [rustfmt config](https://github.com/near/nearcore/blob/master/rustfmt.toml) in your `~/.config/rustfmt/` directory.

If you are using CLion IDE you can configure it to run rustfmt automatically every time your file is saved to the disk. Go to `Preferences→Languages & Frameworks→Rust→Rustfmt` and check `Run rustfmt on Save`.

## Testing {#testing}

To run NEARCore node in the testing mode, for example to test it or for development of `near-api-js` or `near-cli` you can use commands that sets up special tests-only local testnet:

```bash
cargo run -p neard -- localnet -v1
cargo run -p neard -- run
```

This sets up a new single node testnet, with predetermined private key of the validator and turns on "fast" mode of block production to make development and testing easy.

### Logging {#logging}

Many times in development of the node it's useful to see detailed logs about what is happening. `neard` binary has `--verbose` mode to show more details about what is happening:

```bash
cargo run -p neard -- --verbose= run
```

You can also use the `RUST_LOG` environment variable, with `env_logger` [semantics](https://docs.rs/env_logger/0.6.0/env_logger/#enabling-logging) to override the log level for specific targets. `RUST_LOG` can also be used in integration tests which spawn runnable apps.

If you want to change what is logged in verbose mode / non-verbose mode, for example to add new target \(e.g. `info!(target: "my target", "hello")`\), modify `neard/src/main.rs` in `init_logging` function.

## Operations {#operations}

This section describes how to prepare releases and publish docker files for NEAR core client.

### Build docker container {#build-docker-container}

To build docker image run from the root:

```bash
make docker-nearcore
```

This will build an image with `nearcore` name.

### Publishing Docker files {#publishing-docker-files}

To publish docker image, use

```bash
sudo docker tag nearcore <your username>/mynearcore:<version>
sudo docker push <your username>/mynearcore:<version>

sudo docker tag nearcore <your username>/mynearcore:latest
sudo docker push <your username>/mynearcore:latest
```

Official image is published at `nearprotocol/nearcore`

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>

## How to speed up rust compilation time

This describes on how to improve nearcore compilation time without having to
modify Cargo.toml. It's possible to override Cargo.toml setting by setting
`RUSTFLAGS` variable and also by adding a compilation cache by overriding
`RUSTC_WRAPPER`.

### Default build {#default-build}

```console
$ cargo clean
$ time RUSTFLAGS= RUSTC_WRAPPER= cargo build -p neard --release
real    2m13.773s
user    44m49.204s
sys     1m22.583s
$ touch */*/*/*.rs
$ time RUSTFLAGS= RUSTC_WRAPPER= cargo build -p neard --release
real    0m38.021s
user    9m37.045s
sys     0m5.302s
```

Note that historically link-time optimisation (LTO) was enabled in
Cargo.toml configuration.  However, it resulted in dramatic increase
in compilation time and memory usage during build and has been
disabled by default.  Explicitly disabling LTO (as previous versions
of this document suggested) is no longer necessary.  Still, just in
case to work with older checkouts, examples below will include `-C
lto=off`.

### Use LLD linker {#use-lld-linker}

Requires installing lld linker.

```console
$ cargo clean
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld' RUSTC_WRAPPER= cargo build -p neard --release
real    1m50.802s
user    36m50.251s
sys     1m19.069s
$ touch */*/*/*.rs
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld' RUSTC_WRAPPER= cargo build -p neard --release
real    0m28.951s
user    6m56.670s
sys     0m4.307s
```

### Experimental share-generics feature {#experimental-share-generics-feature}

Works only with nightly compiler.

```console
$ cargo clean
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER= cargo build -p neard --release
real    1m42.999s
user    33m31.341s
sys     1m25.773s
$ touch */*/*/*.rs
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER= cargo build -p neard --release
real    0m23.501s
user    4m30.597s
sys     0m3.804s
```

### Use system-provided rocksdb

By default, building `neard` will result in compiling `librocksdb`
which takes up some non-negligible amount of memory especially when
building on a system with many cores.  It’s possible to configure
build process to provide system-provided library instead.  This is
done by setting `ROCKSDB_LIB_DIR` environment variable to location
where `librocksdb.a` file is installed:

```console
$ cargo clean
$ time ROCKSDB_LIB_DIR=/usr/lib/x86_64-linux-gnu cargo build -p neard --release
real    1m31.014s
user    30m46.544s
sys     1m26.932s
$ touch */*/*/*.rs
$ time ROCKSDB_LIB_DIR=/usr/lib/x86_64-linux-gnu cargo build -p neard --release
real    0m35.061s
user    9m7.968s
sys     0m10.486s
```

Note that the system must provide a recent version of the library
which, depending on operating system you’re using, may require
installing packages from testing branches.  For example, on Debian it
requires installing `librocksdb-dev` from `experimental` version:

```bash
echo 'deb http://ftp.debian.org/debian experimental main contrib non-free' |
    sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt -t experimental install librocksdb-dev

ROCKSDB_LIB_DIR=/usr/lib/x86_64-linux-gnu
export ROCKSDB_LIB_DIR
```

### Cache results from previous compilations using sccache {#cache-results-from-previous-compilations-using-sccache}

Requires installing sscache. If you want to compile sccache with `cargo install sccache` make sure you use stable version of Rust.

```console
$ cargo clean
$ rm -rf ~/.cache/sccache/
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER=sccache cargo build -p neard --release
real    2m6.452s
user    3m24.797s
sys     0m30.919s
$ cargo clean
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER=sccache cargo build -p neard --release
real    0m24.292s
user    3m3.627s
sys     0m27.619s
```

## Summary {#summary}

### Setting for building release binary with debug symbols and reduced inlining {#setting-for-building-release-binary-with-debug-symbols-and-reduced-inlining}

```console
$ cargo clean
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C inline-threshold=25 -C debuginfo=2' RUSTC_WRAPPER=sccache cargo build -p neard --release
real    1m50.521s
user    3m39.398s
sys     0m32.069s
```

### Setting for building without optimizations (recommended for Intellij/CLion) {#setting-for-building-without-optimizations-recommended-for-intellijclion}

Building this way cuts down build time, but the node will likely be too slow to run. This is useful in case you need
to build package to run tests or do build within CLion/Intellij.

```console
$ cargo clean
$ time RUSTFLAGS='-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y' RUSTC_WRAPPER=sccache cargo build -p neard
real    1m18.198s
user    4m35.409s
sys     0m32.220s
```

## Installation guide {#installation-guide}

### sccache {#sccache}

Follow guide at https://github.com/mozilla/sccache to install sccache.
If you are unable to install sccache you can remove `RUSTC_WRAPPER` option.

### lld {#lld}

For ubuntu use:

```
sudo apt update
sudo apt install lld
```

For other systems follow link at https://lld.llvm.org/
If you can't install lld, you can remove option `-C link-arg=-fuse-ld=lld`.

## Clion/Intellij with Rust plugin {#clionintellij-with-rust-plugin}

Currently Rust plugin doesn't support passing environment variables to cargo.
Your best option is to either modify Cargo.toml or replace
`$HOME/.cargo/bin/cargo` with a bash script, which sets proper
environment variables.

## Command line - bash/zsh {#command-line---bashzsh}

You can add the following lines to `.bashrc`, `.bash_profile`, `.zshrc` depending on your OS and terminal that you use.

```
export RUSTFLAGS="-C lto=off -C link-arg=-fuse-ld=lld -Zshare-generics=y -C codegen-units=6 -C debuginfo=0"
export RUSTC_WRAPPER="sccache"
export SCCACHE_CACHE_SIZE="30G"
```
