---
id: prerequisites
title: Prerequisites
#sidebar_label: 💻 Prerequisites
---

In order to develop smart contracts you will need Node.js and Rust.

### Node.js
Download and install [Node.js](https://nodejs.org/en/download/). Then, install `yarn`: `npm install --global yarn`.

### Rust and Wasm

Follow [these instructions](https://doc.rust-lang.org/book/ch01-01-installation.html) for setting up Rust. Then, add the `wasm32-unknown-unknown` toolchain which enables compiling Rust to [Web Assembly (wasm)](https://webassembly.org/), the low-level language used by the NEAR platform.

#### Linux and MacOS:

```bash
# Get rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

# Add the wasm toolchain
rustup target add wasm32-unknown-unknown
```

---

## Using Apple M1 Machine (arm64) {#building-smart-contracts-on-apple-m1-arm64}

The architecture of Apple M1 machines (`arm64`) has been released recently, and many of the libraries on which we rely are
still not supporting it. Because of this, you might find some error while trying to develop smart contract on such a platform.
Here we list some of the workarounds you will need in order to successfully build NEAR contracts.

#### near-sdk-rs {#near-sdk-rs}

If you're trying to build a Rust smart contract on an Apple M1 (`arm64`), you'll get an `unsupported platform` error such as:

```text
npm ERR! code 1
npm ERR! path /Users/near/smart-contract/node_modules/near-vm
npm ERR! command failed
npm ERR! command sh -c node ./install.js
npm ERR! /Users/near/smart-contract/node_modules/near-vm/getBinary.js:17
npm ERR!     throw new Error(`Unsupported platform: ${type} ${arch}`);
npm ERR!     ^
npm ERR!
npm ERR! Error: Unsupported platform: Darwin arm64
```

You can solve it with [this workaround](https://t.me/neardev/13310):

```sh
rustup target add x86_64-apple-darwin
rustup default stable-x86_64-apple-darwin
```

This will force Rust to compile to `x86`, and your Mac will execute the binary using Rosetta 2.

#### near-sdk-as {#near-sdk-as}

If you cannot install `near-sdk-as` and you get an `Unsupported platform: Darwin arm64` error while trying to build an AssemblyScript smart contract on an Apple M1 (`arm64`):

```text
error /Users/near/guest-book/node_modules/near-vm: Command failed.
Exit code: 1
Command: node ./install.js
Arguments:
Directory: /Users/near/guest-book/node_modules/near-vm
Output:
/Users/near/guest-book/node_modules/near-vm/getBinary.js:17
    throw new Error(`Unsupported platform: ${type} ${arch}`);
    ^

Error: Unsupported platform: Darwin arm64
```

Use this command to install the dependencies without downloading the VM:

```sh
npm install --save-dev --ignore-scripts near-sdk-as
```

:::info
If everything else installs correctly, you can disregard this error. You should still be able to build, deploy, and run the AS smart contract.
:::