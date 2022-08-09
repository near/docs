---
id: quickstart-guide
title: Hello NEAR 👋
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Welcome! Let us guide you in starting and interacting with your first decentralized app (dApp) in NEAR. **Hello NEAR!** is a friendly dApp composed by two main components:  
  1. A smart contract that stores and retrieves a greeting message
  2. A simple web-based frontend that displays the greeting and enables to change it.

---

## Try Hello NEAR in Your Browser

A new browser window will open automatically with the code, give it a minute and the frontend will pop-up (make sure the pop-up window is not blocked).


| 🌐 JavaScript                                                                                                                                                     | 🦀 Rust                                                                                                                                                           | 🚀 AssemblyScript                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-rs.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-as.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> |

---

## Try Hello NEAR Locally
If you already have node installed, simply run:

```bash 
  npx create-near-app
```

Use the interactive menu to set up your first project folder.

Once the folder is ready, check the README! It will show you how to **build** your contract, **deploy** it, and **start** the frontend.

---

## Interacting With Hello NEAR

![img](/docs/assets/examples/hello-near.png)
*Frontend of Hello NEAR*

Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, change the greeting and see how our Hello NEAR app greets you!

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
            url="https://github.com/near-examples/hello-near-js/blob/master/contract/src/index.ts"
            start="6" end="33" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="9" end="43" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/hello-near-as/blob/main/contract/assembly/index.ts"
            start="9" end="23"/>
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/frontend/index.js`, which communicates with the contract through `/frontend/near-api.js`. You will notice in `/frontend/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/frontend/index.js"
            start="14" end="22" />
    <Github fname="near-api.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/frontend/near-api.js"
            start="1" end="25" />
  </Language>
</CodeTabs>

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. They are written in the
same language as the smart contract is. For AssemblyScript, you will find the test in the 
`__tests__` folder. If your contract is in Rust you will find the tests at the bottom of
each `.rs` file.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="53" end="71" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/hello-near-as/blob/main/contract/assembly/__tests__/main.spec.ts" />
  </Language>
</CodeTabs>

### Integration test

Integration tests can be written in both javascript and RUST. They work by deploying the contract in a sandbox and executing methods on it.
In this way, integration tests simulate interactions from users in a realistic scenario.
You will find the integration tests for `hello-near` in `integration-tests/`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-rs/blob/main/integration-tests/ts/main.ava.ts"
            start="26" end="37" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="tests.rs"
          url="https://github.com/near-examples/hello-near-rs/blob/main/integration-tests/rs/src/tests.rs"
          start="29" end="44" />
  </Language>
</CodeTabs>

---

## Moving Forward

That's it for our first quickstart tutorial. You have now seen a fully functional contract with
a minimal user interface and testing. Go ahead and check our [examples](https://near.dev) or proceed straight to the [Develop section](./contracts/anatomy.md) to know how to write your own contract.

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding!
