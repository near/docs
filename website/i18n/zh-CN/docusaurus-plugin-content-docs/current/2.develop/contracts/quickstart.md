---
id: quickstart
title: Hello Contract
sidebar_label: Quickstart ✨
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

[NEAR accounts](../../1.concepts/protocol/account-model.md) can host programs known as smart contracts. Smart contracts can **store data**, and **expose methods** so other users and contracts interact with them.

In this quickstart tutorial, we will guide you in creating your first smart contract in the NEAR **testnet** that stores and retrieves a greeting.

***

## Prerequisites

<CodeTabs>
<Language value="🌐 JavaScript" language="js">

Before starting, make sure you have the following installed:

1. [Node.js](https://nodejs.org/en/download), to use our scaffolding tool.
2. [NEAR CLI](/tools/near-cli#installation), to deploy and interact with the contract.

:::tip Easy Install

- **NEAR-CLI:** Install `near-cli` tools using

  ```
  npm i -g near-cli
  ```

:::

</Language>

<Language value="🦀 Rust" language="rust">

Before starting, make sure you have the following installed:

1. [NEAR CLI-RS](/tools/near-cli-rs), to deploy and interact with the contract.
2. [cargo-near](https://github.com/near/cargo-near), to easily create testnet accounts.
3. [Rust](https://www.Rust-lang.org/tools/install), to create Rust contracts.
4. [Node.js](https://nodejs.org/en/download)(Optional), to install the tools.

:::tip Easy Install

- **NEAR-CLI-RS:** Install both `near-cli-rs` and `cargo-near` tools using

  ```bash
  # Using node
  npm i -g near-cli-rs cargo-near

  # Using macOS, Linux, WSL
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
  ```

  :::

</Language>

</CodeTabs>

:::info Testnet Account

There is no need to have a `testnet` account to follow this tutorial.

However, if you want to create one, you can do so through [a wallet](https://testnet.mynearwallet.com), and use it from the `near-cli` by invoking `near login`.

:::

***

## Creating the Contract

<CodeTabs>
<Language value="🌐 JavaScript" language="js">

Create a smart contract by running our `create-near-app` scaffolding tool and following the interactive menu.

```bash
  npx create-near-app@latest
```

![img](@site/static/docs/hello-near-ts.gif)
_create-near-app in action_

The resulting folder structure will change slightly depending on the chosen language. Here is the general structure you can expect to see:

```bash
├── sandbox-ts      # sanbox testing
│   ├── src
│   ├──  └── main.ava.ts
│   ├── ava.config.cjs
│   └── package.json
├── src
│   └── contract.ts # contract's code
├── package.json    # package manager
├── README.md
└── tsconfig.json
```

</Language>

<Language value="🦀 Rust" language="rust">

Create a smart contract by running our `create-near-app` scaffolding tool and following the interactive menu.

```bash
  cargo near new <project_name>
```

![img](@site/static/docs/hello-near-rs.gif)
_create-near-app in action_

The resulting folder structure will change slightly depending on the chosen language. Here is the general structure you can expect to see:

```bash
├── src
│   └── lib.rs # contract's code
├── test 
│   └── test_basics.rs # testing code
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

</Language>

</CodeTabs>

***

## The Contract

Your new smart contract stores a `greeting: string` attribute in their state, and exposes two methods to interact with it (`set_greeting`, `get_greeting`).

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
            start="4" end="18" />

</Language>

<Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="6" end="35" />

</Language>

</CodeTabs>

There are 3 important things to notice:

1. The `get_greeting` method is a [`view`](./anatomy.md#public-methods) method, meaning it only reads from the contract and can be called for free by anyone.
2. By default, the contract is initialized with the `greeting` attribute set to `"Hello"`.
3. The `set_greeting` method is a [`change`](./anatomy.md#public-methods) method, meaning it modifies the contract's state and requires a user to sign a transaction in order to be executed.

## Build and Test

Building and testing the contract is as simple as running two commands.

<CodeTabs>
<Language value="🌐 JavaScript" language="js">

```bash
npm run build
npm run test

# Expected:
# returns the default greeting ✅
# changes the greeting ✅
```

</Language>

<Language value="🦀 Rust" language="rust">

```bash
cargo build
cargo test

# Expected:
# Passed ✅ gets default greeting
# Passed ✅ changes the greeting
```

</Language>

</CodeTabs>

<details>
<summary> Failing tests? </summary>

If the tests are failing, make sure that you are using `node v16` and the `toolchain v1.69` in `rust`. You can always use

- `nvm use 16` to switch to `node v16`
- `rustup default 1.68` to switch to `toolchain v1.69`

</details>

In the background, these commands are calling the build tools for each language and invoking the [Sandbox](../testing/integration.md) tests from the `sandbox-ts/rs` directory.

:::tip Sandbox
Testing the contracts within a Sandbox allows you to understand how the contract will behave once deployed to the network while having total control over the testing environment.
:::

***

## Create a Testnet Account

Now that we know the contract is passing the tests, let's create a testnet account in which to deploy the contract.

While there are different ways to create accounts in NEAR, in this quickstart we will use the `cargo-near` tool to create a new random [`named account`](/concepts/protocol/account-id).

<CodeTabs>

<Language value="🌐 JavaScript" language="js">

```bash
# Create a new testnet account
# Replace <created-account> with a custom name
near create-account <created-account> --useFaucet
```

<details>
<summary> Example Result </summary>

```bash
> near create-account lovely-event.testnet --useFaucet
# Console response
New account "lovely-event.testnet" created successfully. # Response
```

</details>

</Language>

<Language value="🦀 Rust" language="rust">

```bash
# Create a new testnet account with a random name
cargo-near near create-dev-account use-random-account-id autogenerate-new-keypair save-to-legacy-keychain network-config testnet create

# Create a new testnet account
# Replace <created-account> with a custom name
cargo-near near create-dev-account use-specific-account-id lovely-event.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
```

<details>
<summary> Example Result </summary>

```bash
# If you want to create account with a random name
> cargo-near near create-dev-account use-random-account-id autogenerate-new-keypair save-to-legacy-keychain network-config testnet create

New account "lovely-event.testnet" created successfully. # Response

# If you want to create account with a custom name
> cargo-near near create-dev-account use-specific-account-id lovely-event.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

New account "lovely-event.testnet" created successfully. # Response
```

</details>

</Language>

</CodeTabs>

:::tip

Here we are creating a random account since we do not care about the account's name. Remember that you can create a named account through any wallet (i.e. [MyNearWallet](https://testnet.mynearwallet.com)) and then use it from the `near-cli` by invoking `near login`.

:::

***

## Deploy the Contract

Having our account created, we can now deploy the contract into it:

<CodeTabs>

<Language value="🌐 JavaScript" language="js">
  ```bash
  near deploy <created-account> build/release/hello.wasm
  ```

</Language>

<Language value="🦀 Rust" language="rust">
  ```bash
  near contract deploy <created-account> use-file ./target/wasm32-unknown-unknown/release/contract_rs.wasm without-init-call network-config testnet sign-with-keychain send
  ```

</Language>

</CodeTabs>

**Congrats**! your contract now lives in the NEAR testnet network.

***

## Interacting with the Contract

To interact with your deployed smart contract, you can call its methods using the `near-cli` or `near-cli-rs` tools.

### Get Greeting

The `get_greeting` method is a [`view`](./anatomy.md#public-methods) method, meaning it only reads from the contract's state, and can thus be called for **free**.

<Tabs>

<TabItem value="near-cli">

```bash
> near view <created-account> get_greeting

"Hello" # Response
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
> near contract call-function as-read-only <created-account> get_greeting json-args {} network-config testnet now

"Hello" # Response
```

</TabItem>

</Tabs>

### Set Greeting

The `set_greeting` method is a [`change`](./anatomy.md#public-methods) method, meaning it modifies the contract's state, and thus requires a user to sign a transaction in order to be executed.

<Tabs>

<TabItem value="near-cli">

```bash
> near call <created-account> set_greeting '{"greeting": "Hola"}' --accountId <created-account>

Log: Saving greeting "Hola" # Response
```

In this case we are asking the account that stores the contract to call its own contract's method (`--accountId <created-account>`).

</TabItem>

<TabItem value="near-cli-rs">

```bash
> near contract call-function as-transaction <created-account> set_greeting json-args '{"greeting": "Hola"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <created-account> network-config testnet sign-with-keychain send

Log: Saving greeting "Hola" # Response
```

In this case, we are asking the account that stores the contract to call its own contract's method (`sign-as <created-account>`).

</TabItem>

</Tabs>

***

## Moving Forward

That's it for the quickstart tutorial. You have now seen a fully functional contract with a minimal user interface and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate to join us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding! 🚀
