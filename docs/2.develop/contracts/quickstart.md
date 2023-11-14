---
id: quickstart
title: Hello Contract 
sidebar_label: ⭐ Quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

[NEAR accounts](../../1.concepts/basics/accounts/introduction.md) can host programs known as smart contracts. Smart contracts can **store data**, and **expose methods** so other users and contracts interact with them. 

In this quickstart tutorial, we will guide you in creating your first smart contract in the NEAR testnet that **stores** and **retrieves** a greeting.

:::tip
This tutorial relies on the NEAR testnet, which uses free tokens with **no monetary value**.
:::

:::caution
This quickstart only deals with smart contracts, for creating frontends please check the [WebApp Quickstart](../integrate/quickstart.md)
:::

---

## Prerequisites

Before starting, make sure you have the following installed:
 
1. [Node.js](https://nodejs.org/en/download), to use our scaffolding tool.
2. [NEAR CLI](/tools/near-cli#installation), to deploy and interact with the contract.
3. (optional) [Rust](https://www.Rust-lang.org/tools/install), to create Rust contracts.

:::info NEAR-CLI
You can easily install the `near-cli` using `npm i -g near-cli`
:::

---

## Creating the Contract

Create a smart contract by running our `create-near-app` scaffolding tool. 

```bash 
  npx create-near-app@latest
```

![img](@site/static/docs/hello-near-contracts.gif)

Use the interactive menu to create a smart contract written in your preferred language (`typescript` or `Rust`).

<hr class="subsection" />

## Project Structure

The resulting folder structure will change slightly depending on the chosen language. Here is the general structure you can expect to see:

<Tabs>
  <TabItem value="🌐 JavaScript">

```bash
├── README.md
├── src
│   └── contract.ts # contract's code
├── sandbox-ts      # sanbox testing
│   ├── ava.config.cjs
│   ├── package.json
│   └── src
│       └── main.ava.ts
├── package.json    # package manager
└── tsconfig.json
```

  </TabItem>
  <TabItem value="🦀 Rust">

```bash
├── README.md
├── src
│   └── lib.rs # contract's code
├── sandbox-rs
│   ├── Cargo.toml
│   └── src
│       └── tests.rs
├── build.sh   # build script
├── test.sh    # test script
├── deploy.sh  # deploy script
├── .cargo
│   └── config
└── Cargo.toml # package manager
```

  </TabItem>
</Tabs>

<hr class="subsection" />

## The Contract
Your new smart contract stores a `greeting: string` attribute in their state, and exposes two methods to interact with it (`set_greeting`, `get_greeting`). 

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/contract/src/contract.ts"
            start="3" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="4" end="36" />
  </Language>
</CodeTabs>

There are 3 important things to notice:
1. The `get_greeting` method is a [`view`](./anatomy.md#public-methods) method, meaning it only reads from the contract and can be called for free by anyone.
2. By default, the contract is initialized with the `greeting` attribute set to `"Hello"`.
3. The `set_greeting` method is a [`change`](./anatomy.md#public-methods) method, meaning it modifies the contract's state and requires a user to sign a transaction in order to be executed.

<hr class="subsection" />

## Build and Deploy

The project readily contains scripts to simplify building the contract and deploying it in the NEAR testnet.

<Tabs>
  <TabItem value="🌐 JavaScript">

  ```bash
  npm run build
  npm run deploy
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```bash
  ./build.sh
  ./deploy.sh
  ```
  
  </TabItem>
</Tabs>

Behind the scenes, the `deploy` script is calling the `near-cli` tool to create a new random account, and deploying the contract into it.

Once the deploy finishes, you will see a message stating that the contract was deployed into an account of the form `dev-x-y`. Congrats! your contract now lives in the NEAR testnet network.

```bash
# Example result:
Done deploying to "dev-1699978612166-73552590363748"
```

---

## Interacting with the Contract

To interact with your deployed smart contract you can call its methods using the `near-cli` tool.

#### Get Greeting
The `get_greeting` method is a [`view`](./anatomy.md#public-methods) method, meaning it only reads from the contract's state, and thus can be call for **free**.

```bash
> near view <account> get_greeting

"Hello" # Response
```

#### Set Greeting
The `set_greeting` method is a [`change`](./anatomy.md#public-methods) method, meaning it modifies the contract's state, and thus requires a user to sign a transaction in order to be executed.

```bash
> near call <account> set_greeting '{"greeting": "Hola"}' --accountId <account>

Log: Saving greeting "Hola" # Response
```

In this case we are asking the account that stores the contract to call its own contract's method (`--accountId <account>`).

---

## SandBox Testing

When writing smart contracts it is very important to test all methods exhaustively. This project includes a **sandbox** in the folder, which helps testing the contract by deploying it in a realistic environment, and simulating calls to its methods.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-js/blob/master/integration-tests/src/main.ava.ts"
            start="32" end="43" />
  </Language>

  <Language value="🦀 Rust" language="rust">
    <Github fname="tests.rs"
            url="https://github.com/near/create-near-app/blob/master/templates/sandbox-tests/sandbox-rs/src/tests.rs"
            start="30" end="66" />
  </Language>
</CodeTabs>

To execute the sandbox testing, simply execute the following command:

<Tabs>
  <TabItem value="🌐 JavaScript">

  ```bash
  npm run test

  # Expected:
  # returns the default greeting ✅
  # changes the greeting ✅
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```bash
  ./test.sh

  # Expected:
  # Passed ✅ gets default greeting
  # Passed ✅ changes the greeting
  ```
  
  </TabItem>
</Tabs>

---

## Moving Forward

That's it for the quickstart tutorial. You have now seen a fully functional contract with a minimal user interface and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding! 🚀
