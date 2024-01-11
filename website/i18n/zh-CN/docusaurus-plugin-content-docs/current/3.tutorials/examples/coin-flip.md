---
id: coin-flip
title: Coin Flip
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Coin Flip is a game where the player tries to guess the outcome of a coin flip. It is one of the simplest contracts implementing random numbers.

![img](/docs/assets/examples/coin-flip.png)

---

## Starting the Game
You have two options to start the example:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Clone the project locally .


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

| Gitpod                                                                                                                                                            | Clone locally                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------  |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/coin-flip-js.git` |

  </TabItem>

</Tabs>

If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the front-end will pop up (ensure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd coin-flip-js
yarn
yarn deploy
yarn start
```
Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Counter
Go ahead and log in with your NEAR account. If you don't have one, you can create one on the fly. Once logged in, use the `tails` and `heads` buttons to try to guess the next coin flip outcome.

![img](/docs/assets/examples/coin-flip.png) *Frontend of the Game*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 2 methods: `flip_coin`, and `points_of`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/contract/src/contract.ts"
            start="23" end="56" />
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through a `wallet`. You will notice in `/assets/js/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/frontend/index.js"
            start="10" end="19" />            
  </Language>
</CodeTabs>

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts, it is very important to test all methods exhaustively. In this project, you have two types: unit and integration tests. Before digging into them, go ahead and perform the tests present in the dApp through the command `yarn test`.

### Integration test

Integration tests are generally written in JavaScript. They automatically deploy a new contract and execute methods on it. In this way, integration tests simulate interactions from users in a realistic scenario. You will find the integration tests for the `coin-flip` in `tests/integration-tests`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/integration-tests/src/main.ava.ts"
            start="32" end="56" />
  </Language>
</CodeTabs>

---

## A Note On Randomness

Randomness in the blockchain is a complex subject. We recommend you to read and investigate about it. You can start with our [security page on it](../../2.develop/contracts/security/random.md).
