---
id: hello-near
title: Hello NEAR
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

**Hello NEAR!** is a friendly decentralized App that stores a greeting message. It is one of the simplest
smart contracts you can create in NEAR, and the perfect gateway to introduce yourself in the world of smart
contracts.

![img](/docs/assets/examples/hello-near-banner.png)

---

## Starting Hello NEAR

You have two options to start Hello NEAR:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Start the project locally by using `create-near-app`, our node-based utility.

#### Gitpod
Hello NEAR is available in gitpod. When selecting one, a new tab will open in your browser with a web-based IDE. Give it a minute to compile and deploy the contract, and then a frontend will pop-up for you to interact with the app (make sure the pop-up window is not blocked).

| 🌐 JavaScript                                                                                                                                                      |  🦀 Rust                                                                                                                                                           | 🚀 AssemblyScript | 
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-rust.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> |<a href="https://gitpod.io/#https://github.com/near-examples/hello-near-as.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> |


#### Create Near App (node)
Hello NEAR can be created locally with the help of `create-near-app`. Follow the snippet bellow to create a local project.

```bash
npx create-near-app@latest
```

and follow the instructions that appear on the screen.

---

## Interacting With Hello NEAR
Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, change the greeting and see how our Hello NEAR app greets you!


![img](/docs/assets/examples/hello-near.png)
*Frontend of Hello NEAR*


---

## Structure of a dApp
Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 2 methods: `set_greeting` and `get_greeting`. The first one stores a `string` in the contract's parameter `greeting`, while the second one retrieves it. By default, the contract returns the message `"Hello"`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/hello-near-js/blob/master/contract/src/contract.ts"
            start="3" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="23" end="36" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/hello-near-as/blob/main/contract/assembly/index.ts"
            start="9" end="23"/>
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through `/near-interface.js`. You will notice in `/assets/js/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="10" end="21" />
  </Language>
</CodeTabs>


It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. Right now only rust implements unit testing. 

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="46" end="58" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/hello-near-as/blob/main/contract/assembly/__tests__/main.spec.ts" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are generally written in javascript. They automatically deploy your contract and execute methods on it. In this way, integration tests simulate interactions from users in a realistic scenario. You will find the integration tests for `hello-near` in `integration-tests/`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-js/blob/master/integration-tests/src/main.ava.ts"
            start="32" end="43" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand the contract. Modify it so that you store one greeting message
**per user**. For this, you will need to use knowledge from the [environment](../../2.develop/contracts/environment/environment.md)
and [storage](../../2.develop/contracts/storage.md) sections. You can also use the [guest book](guest-book.md)
example, since it does something similar.