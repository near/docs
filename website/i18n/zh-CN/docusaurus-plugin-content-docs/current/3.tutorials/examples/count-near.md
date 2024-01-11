---
id: count-near
title: Count on NEAR
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Our counter example is a friendly decentralized app that stores a number and exposes methods to `increment`, `decrement`, and `reset` it.

![img](/docs/assets/examples/count-on-near-banner.png)

---

## Starting the Counter
You have two options to start the Counter:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Clone the project locally .


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

</Tabs>

If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the frontend will pop up (ensure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd counter
yarn
yarn deploy
yarn start
```
Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Counter
Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, use the `+` and `-` buttons to increase and decrease the counter. Then, use the Gameboy buttons to reset it and make the counter blink an eye!

![img](/docs/assets/examples/count-on-near.png) *Frontend of the Counter*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 4 methods: `get_num`, `increment`, `decrement`, and `reset`. The method `get_num` retrieves the current value, and the rest modify it.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/js-counter/blob/master/contract/src/contract.ts"
            start="3" end="29" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="5" end="36" />
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through `/near-interface.js`. You will notice in `/assets/js/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/js-counter/blob/master/frontend/index.js"
            start="10" end="21" />            
  </Language>
</CodeTabs>

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this project you have two types of tests: unit and integration. Before digging in them, go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. Right now only Rust implements unit testing.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="48" end="69" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are generally written in javascript. They automatically deploy a new contract and execute methods on it. In this way, integration tests simulate interactions from users in a realistic scenario. You will find the integration tests for the `counter` in `tests/integration-tests`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/js-counter/blob/master/integration-tests/src/main.ava.ts"
            start="37" end="61" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand the contract. Modify it by adding a parameter to `increment` and `decrement`, so the user can choose by how much to change the value. For this, you will need to use knowledge from the [anatomy](../../2.develop/contracts/anatomy.md) and [storage](../../2.develop/contracts/storage.md) sections.
