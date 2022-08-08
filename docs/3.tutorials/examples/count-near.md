---
id: count-near
title: 🧮 Count on NEAR
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Our counter example is a decentralized app that stores a number and exposes methods to `increment`,
`decrement`, and `reset` it. It also features a friendly frontend with a smiling handheld console.

![img](/docs/assets/examples/count-on-near-banner.png)

---

## Starting the Counter

You have two options to start the Counter. The first and recommended is to use the app through Gitpod, which will open a web-based interactive environment. The second option is to clone the repository locally, for which you will need to install all the [Prerequisites](../../2.develop/prerequisites.md).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

| Gitpod                                                                                                                                                            | Clone locally                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/js-counter.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/js-counter.git` |

  </TabItem>

  <TabItem value="🦀 Rust">

| Gitpod                                                                                                                                                            | Clone locally                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/rust-counter.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/rust-counter.git` |

  </TabItem>

  <TabItem value="🚀 AssemblyScript" >

  | Gitpod                                                                                                                                                       | Clone locally                                    |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
  | <a href="https://gitpod.io/#https://github.com/near-examples/counter.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🚀 `https://github.com/near-examples/counter.git` |


  </TabItem>
</Tabs>

If you choose Gitpod a new browser window will open automatically with the code, give it a minute and the frontend will pop-up (make sure the pop-up window is not blocked). If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd counter
yarn
yarn start
```
Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Counter
Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, use the `+` and `-` buttons to increase and decrease the counter. Then, use the Gameboy buttons to reset it and make the counter blink an eye!

![img](/docs/assets/examples/count-on-near.png)
*Frontend of the Counter*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.
3. The compiled smart contract can be found in `/out/main.wasm`.
4. The account's name in which the contract was deployed is in `/neardev/dev-account`.

### Contract
The contract presents 4 methods: `get_num`, `increment`, `decrement`, and `reset`. The method `get_num` retrieves the current value, and the rest modify it.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="5" end="39" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/counter/blob/master/contract/assembly/index.ts"/>
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through `/assets/js/near/utils.js`. You will notice in `/assets/js/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="index.js"
            url="https://github.com/near-examples/rust-counter/blob/master/frontend/assets/js/main.js"
            start="44" end="55" />
    <Github fname="utils.js"
            url="https://github.com/near-examples/rust-counter/blob/master/frontend/assets/js/near/utils.js"
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
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="52" end="87" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/counter/blob/master/contract/assembly/__tests__/main.spec.ts"
            start="5" end="44" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are generally written in javascript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the `counter`
in `tests/integration-tests`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/rust-counter/blob/master/integration-tests/ts/main.ava.ts"
            start="44" end="68" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand the contract. Modify it by adding a parameter to `increment` and `decrement`,
so the user can choose by how much to change the value. For this, you will need to use knowledge from the [anatomy](../../2.develop/contracts/anatomy.md)
and [storage](../../2.develop/contracts/storage.md) sections.
