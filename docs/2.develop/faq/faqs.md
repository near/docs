---
id: faqs
title: Frequently Asked Questions
sidebar_label: ❓ FAQs
---

---

## Common questions and issues {#common-questions-and-issues}

Here is where you can find what common errors and issues people troubleshoot as they build.

### Building smart contracts on Apple M1 (arm64) {#building-smart-contracts-on-apple-m1-arm64}

> **Note:** `arm64` is generally not supported by NEAR, but you should still be able to build smart
> contracts by following the provided workarounds.

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

> **Note:** if everything else installs correctly, you can disregard this error.
> You should still be able to build, deploy, and run the AS smart contract.

---

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
