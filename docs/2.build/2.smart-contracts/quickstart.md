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

---

## Prerequisites

Before starting, make sure to setup your development environment.

<details>
<summary>Working on Windows?</summary>

  See our blog post [getting started on NEAR using Windows](/blog/getting-started-on-windows) for a step-by-step guide on how to setup WSL and your environment

</details>

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```bash
# Install Node.js using nvm (more option in: https://nodejs.org/en/download)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install latest

# Install NEAR CLI to deploy and interact with the contract
npm i -g near-cli
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```bash
# Install Rust: https://www.rust-lang.org/tools/install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Contracts will be compiled to wasm, so we need to add the wasm target
rustup target add wasm32-unknown-unknown

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

# Install cargo near to help building the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
```

</TabItem>

</Tabs>

:::tip Testnet Account

There is no need to have a `testnet` account to follow this tutorial.

However, if you want to create one, you can do so through [a wallet](https://testnet.mynearwallet.com), and use it from the `near-cli` by invoking `near login`.

:::

---

## Creating the Contract

Create a smart contract by using one of the scaffolding tools and following their instructions:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">


```bash
  npx create-near-app@latest
```

![img](@site/static/docs/hello-near-ts.gif)
_Creating a project using `create-near-app`_

This will generate a project with the following structure:

```bash
├── sandbox-test    # sanbox testing
│   └── main.ava.js
├── src             # contract's code
│   └── contract.ts
├── README.md
├── package.json    # package manager
└── tsconfig.json
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```bash
  cargo near new <project_name>
```

![img](@site/static/docs/hello-near-rs.gif)
_Creating a project using `cargo near new`_

This will generate a project with the following structure:

```bash
├── src        # contract's code
│   └── lib.rs 
├── test       # sandbox testing
│   └── test_basics.rs 
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

</TabItem>

</Tabs>


---

## The Contract

The `Hello World` smart contract stores a greeting on its state, and exposes two methods to interact with it:
1. `set_greeting`: to change the greeting
2. `get_greeting`: to fetch the greeting 

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Language value="js" language="js">
        <Github fname="index.js"
                url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
                start="4" end="18" />
    </Language>
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    <Language value="Rust" language="rust">
        <Github fname="lib.rs"
                url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
                start="4" end="32" />
    </Language>
  </TabItem>
</Tabs>

:::tip

After finishing this tutorial, check our [contract's anatomy](./anatomy/anatomy.md) page to learn more about the contract's structure

:::

---

## Build and Test

Building and testing the contract is as simple as running two commands.

<CodeTabs>
<Language value="js" language="js">

```bash
npm run build
npm run test

# Expected:
# returns the default greeting ✅
# changes the greeting ✅
````

<details>
<summary> Failing tests? </summary>

Make sure that you are using `node v18`, `v20` or `v22`. You can always use: `nvm use 18` to switch to `node v20`

</details>

</Language>

<Language value="rust" language="rust">

```bash
cargo near build
cargo test

# Expected:
# Passed ✅ gets default greeting
# Passed ✅ changes the greeting
```

</Language>

</CodeTabs>

In the background, these commands are calling the build tools for each language and invoking the [Sandbox](./testing/integration-test.md) tests from the `sandbox-ts/rs` directory.

:::tip Sandbox
Testing the contracts within a Sandbox allows you to understand how the contract will behave once deployed to the network while having total control over the testing environment.
:::

---

## Create a Testnet Account

Now that we know the contract is passing the tests, let's create a testnet account in which to deploy the contract.

While there are different ways to create accounts in NEAR, in this quickstart we will use the `cargo-near` tool to create a new random [`named account`](/concepts/protocol/account-id).


<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

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

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```bash
# Create a new testnet account with a random name
cargo near create-dev-account use-random-account-id autogenerate-new-keypair save-to-legacy-keychain network-config testnet create

# Create a new testnet account
# Replace <lovely-event.testnet> with a custom name
cargo near create-dev-account use-specific-account-id lovely-event.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
````

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

</TabItem>

</Tabs>


:::tip

Here we are creating a random account since we do not care about the account's name. Remember that you can create a named account through any wallet (i.e. [MyNearWallet](https://testnet.mynearwallet.com)) and then use it from the `near-cli` by invoking `near login`.

:::

---

## Deploy the Contract

Having our account created, we can now deploy the contract into it:

<Tabs>

<TabItem value="near-cli">
  ```bash
  near deploy <created-account> build/release/hello.wasm
  ```

</TabItem>

<TabItem value="near-cli-rs">
  ```bash
  near contract deploy <created-account> use-file ./target/wasm32-unknown-unknown/release/contract_rs.wasm without-init-call network-config testnet sign-with-keychain send
  ```

</TabItem>

</Tabs>

**Congrats**! your contract now lives in the NEAR testnet network.

---

## Interacting with the Contract

To interact with your deployed smart contract, you can call its methods using the `near-cli` or `near-cli-rs` tools.

### Get Greeting

The `get_greeting` method is a [`view`](./anatomy/anatomy.md#public-methods) method, meaning it only reads from the contract's state, and can thus be called for **free**.

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

The `set_greeting` method is a [`change`](./anatomy/anatomy.md#public-methods) method, meaning it modifies the contract's state, and thus requires a user to sign a transaction in order to be executed.

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

---

## Moving Forward

That's it for the quickstart tutorial. You have now seen a fully functional contract with a minimal user interface and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./anatomy/anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate to join us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding! 🚀

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`
- near-cli-rs: `0.8.1`
- cargo-near: `0.6.1`

:::
