---
id: quickstart
title: Hello Contract
sidebar_label: ⭐ Quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Hi! Let us guide you in starting and interacting with your first smart contract in NEAR: Hello NEAR Contract.

**Hello NEAR Contract** is a simple smart contract that stores and retrieves a greeting message. It uses two methods, `get_greeting` and `set_greeting`, as well as a temporary 
dev account to test out both methods.

---

## Create NEAR App
If you already have [Node.js](https://nodejs.org/en/download) installed, simply run:

```bash 
  npx create-near-app@latest
```

Use the interactive menu to set up your first project folder. For this guide we'll be using the `A Near Smart Contract` option.

Once the folder is ready, check the README. It will show you how to **build** and **deploy** the smart contract.


<CodeTabs>
  <Language value="🌐 JavaScript" language="js">

```bash 
  npm run build
  npm run deploy
```

  </Language>
  <Language value="🦀 Rust" language="rust">

```bash 
  ./build.sh
  ./deploy.sh
```

  </Language>
</CodeTabs>

Once the smart contract is deployed, you can set a new greeting using the provided temporary dev account found in `neardev/dev-account` or by using a testnet account. You can [sign up for a testnet account here](https://testnet.mynearwallet.com/create). 

We go over how testnet accounts are used in more detail in [other guides](../3.tutorials/crosswords/03-intermediate/03-linkdrop.md), but for now all you need to know is that you can use your testnet account anywhere an account ID is needed without having to worry about any real-world costs.

---

## Structure of the project

Now that you've deployed your first contract, let us take a closer look to its structure:

1. The smart contract code is in the `/contract` folder.
2. The compiled smart contract can be found in `/build/<your_project_name>.wasm`.
3. The account's name in which the contract was deployed is in `/neardev/dev-account`.

### Contract
The contract presents 2 methods: `set_greeting` and `get_greeting`. The first one stores a `String` in the contract's parameter `message`, while the second one retrieves it. By default, the contract returns the message `"Hello"`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/contract/src/contract.ts"
            start="3" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="9" end="43" />
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. This
project has **integration** tests. It creates a sandbox environment that takes the `.wasm` file for your contract and simulates creating users and running both methods on the contract.

Sandbox testing is important because it allows you test all methods on your contract in a secure and separate environment that imitates real world scenarios.

Before digging in their code, go ahead and execute them using the command `npm run test`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="lib.rs"
            url="https://github.com/near/create-near-app/blob/master/templates/sandbox-tests/sandbox-ts/src/main.ava.ts"
            start="33" end="44" />
  </Language>
</CodeTabs>

---

## Moving Forward

That's it for our first quickstart tutorial. You have now seen a fully functional contract and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./contracts/anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding!
