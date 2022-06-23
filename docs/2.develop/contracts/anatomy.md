---
id: anatomy
title: Anatomy of a Contract
#sidebar_label: 🧠 Anatomy of a Contract
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"


When writing smart contracts you will leverage programming concepts such as types, collections, modules, interfaces, and objects among others. While language-specific implementation may variate a little, the main anatomy of a smart contract always follows the same ideas.

---

## Anatomy of a Donation

Let's use as reference a simple contract, which main purpose is to enable donating money to someone. Particularly, the contract defines a `beneficiary` account on initialization and exposes a `donation` that forwards money while keeping track of the donation. Take a quick peek at the snippet bellow and then continue to the [modules](#modules) section.

:::tip
This contract is written for educational purposes only.
:::

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
            start="1" end="44" />
    <Github fname="model.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/index.ts"/>
    <Github fname="model.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" />
  </Language>
</CodeTabs>

<blockquote class="lesson">
<strong>Why is my call to `get` a value with default not passing type checks?</strong><br /><br />
  
You may need to use the TypeScript non-null assertion operator if you're trying to get a value, supplying a default and still failing type checks:

```ts
storage.get("my-var", "hello, default")!; // notice the ! at the end
```
</blockquote>

---

## Modules
When writing smart contracts you will leverage modules to organize your code, and reuse third-party libraries.

The main module you will be using to write smart contracts is the NEAR SDK. Indeed, the snippet above started by importing multiple elements from our SDK. 

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value={0} label="🦀 - Rust">

  ```rust
    use near_sdk::collections::Vector;
    use near_sdk::{env, log, near_bindgen, AccountId, Promise, Balance};
  ```

  </TabItem>

  <TabItem value={1} label="🚀 - AssemblyScript">

  ```ts
    import { u128, context, logging, ContractPromiseBatch } from "near-sdk-as";
    import { STORAGE_COST, Donation, add_donation, get_donation,
            set_beneficiary, get_beneficiary, get_number_of_donation } from "./model";
  ```

  </TabItem>
</Tabs>

The NEAR SDK defines methods to, among other things:

1. Understand the context of the call (e.g. who started it, how much money they sent).
2. Handle the state (storage) of the smart contract.
3. Transfer money to other users/contracts.
4. Interact with other smart contracts.

---
## Contract's Interface
Smart contracts expose an interface so users in the blockchain can interact with them. A contract's interface is made of all the public methods that live in the main file.

### Init
In RUST, Contracts have a public `init` method, which can only be called once. It enables to instantiate the contract with its first values. For example, in the snippet above,
the `init` function is used to define the `beneficiary` variable.

:::warning
In AssemblyScript there is no `init` method. You can create one yourself, as in the example above, but be mindful that, as any other method, it could be called multiple times. You can force the function to work only once by adding the following code:

```ts
  const initialized: bool = storage.getPrimitive<bool>('initialized', false)
  assert(!initialized, "Already initialized")
  storage.set<bool>('initialized', true)
```
:::

### Public and Private methods
All public methods that appear in the main file will be **accessible by all users** in the blockchain. In the snippet above, such methods are:

1. `init`: Enables to initialize the contract with a specific `beneficiary`.
2. `donate`: A method in which the users attaches NEARs in to donate.
3. `get_donation_by_number`: Returns a recorded donation, stating how much a user donated.

All the other methods remain private, and can only be called from within the contract.

---

## Typed Variables

Smart contracts store typed values within them. The data types available are: `u8`, `u16`, `u32`, `u64`, `u128`, and their signed counterparts. Furthermore, the SDKs expose collections such as `Vector` and `Map` to simplify handling data.

We cover this topic in depth on the [Storage](storage.md) section. Here, we will just notice two things. First, that you need to check for underflow and overflow errors. Second, that in RUST the contract's attributes are stored in `self`, in contrast with AssemblyScript where we need to explicitly rely on the `storage` object to store attributes.

:::tip
In RUST we are also relying in the `env::storage` object to store the contract's attributes. However, this gets abstracted away by the SDK.
:::

:::warning
Remember to check for possible underflow and overflows! In rust, you can do this by simply adding the `overflow-checks = true` flag in your `Cargo.toml`.
:::

---

## Classes and NEAR Bindgen

You might have notice in the examples that the classes are decorated with `nearbindgen` (and `serde` in Rust):

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" start="8" end="20" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" start="4" end="10"/>
  </Language>
</CodeTabs>

The `nearbindgen` decorator adds code to correctly serialize the classes in the contract's storage, and to expose public methods. For example, classes decorated in AssemblyScript gain methods serialize them into JSON. In rust, using `#[derive(BorshDeserialize, BorshSerialize, Default)]` enables to encode structures using [borsh](https://borsh.io), therefore optimizing storage.

:::tip
Did you know that contracts communicate with each other using values encoded in JSON?
:::

<blockquote class="lesson">
<strong>Can I use external libraries in my contract?</strong><br /><br />
  
Most libraries should still be usable. However, we do have a size limit for compiled binary of a contract so it is possible that certain large libraries will not be compatible.On the other hand, things like interaction with storage is done through our runtime API so it reduces a lot of effort on the back-end side of things.
</blockquote>

---

## Building Smart Contracts on an Apple M1 Machine (arm64) {#building-smart-contracts-on-apple-m1-arm64}

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

### &nbsp;
---
## 🎞️📚 Additional Resources
These educational resources could help you to better understand the subject

- [Ready Layer One Hackathon](https://www.youtube.com/watch?v=2mRpIRJ8IK0): A high level explanation for the different parts of a smart contract, given as part of an AssemblyScript workshop.