---
id: quickstart-guide
title: Hello NEAR 👋
sidebar_label: ⭐ Quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Hi! Let us guide you in starting and interacting with your first decentralized app (dApp) in NEAR: Hello NEAR.

**Hello NEAR** is a friendly dApp composed by two main components:  
  1. A smart contract that stores and retrieves a greeting message
  2. A simple web-based frontend that displays the greeting and enables to change it.

---

## Create NEAR App
If you already have [Node.js](https://nodejs.org/en/download) installed, simply run:

```bash 
  npx create-near-app@latest
```

Use the interactive menu to set up your first project folder, we recommend you to use `javascript`.

Once the folder is ready, check the README. It will show you how to **build** and **deploy** the smart contract, and **start** the frontend.

```bash 
  npm run build
  npm start
```

<details>
<summary>
Test it online with Gitpod
</summary>

A new browser window will open automatically with the code, give it a minute and the frontend will pop-up (make sure the pop-up window is not blocked).


| 🌐 JavaScript                                                                                      | 🦀 Rust                                                                                            |
|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-js.git">Open in Gitpod</a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-rs.git">Open in Gitpod</a> |

</details>

---

## Interacting With Hello NEAR

Once the app starts you will see the screen below. Now go ahead and sign in with your NEAR account. If you don't have one, you will be able to create one in the moment.

![img](/docs/assets/examples/hello-near.png)
*Frontend of Hello NEAR*

Once logged in, change the greeting and see how our Hello NEAR app greets you!


---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.
3. The compiled smart contract can be found in `/out/main.wasm`.
4. The account's name in which the contract was deployed is in `/neardev/dev-account`.

### Contract
The contract presents 2 methods: `set_greeting` and `get_greeting`. The first one stores a `String` in the contract's parameter `message`, while the second one retrieves it. By default, the contract returns the message `"Hello"`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
            start="3" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="9" end="43" />
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. This
project has both **unit** and **integration** tests. Before digging in their code,
go ahead and execute them using the command `npm run test`.

### Unit test
Unit tests check individual functions in the smart contract. They are written in the
same language than the smart contract. If your contract is in Rust you will find the tests at the bottom of
each `.rs` file.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="46" end="58" />
  </Language>
</CodeTabs>

### Integration test

Integration tests can be written in both Javascript and Rust. They work by deploying the contract in a **sandbox** and executing methods on it.
In this way, integration tests simulate interactions from users in a realistic scenario.
You will find the integration tests for `hello-near` in `integration-tests/`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-js/blob/master/integration-tests/src/main.ava.ts"
            start="32" end="43" />
  </Language>
</CodeTabs>

---

## Moving Forward

That's it for our first quickstart tutorial. You have now seen a fully functional contract with a minimal user interface and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./contracts/anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding!
