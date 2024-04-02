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
2. Clone the project locally.

| Gitpod                                                                                                                                                            | Clone locally                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------  |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-examples.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | `https://github.com/near-examples/coin-flip-examples.git` |


If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the front-end will pop up (ensure the pop-up window is not blocked).

If you are running the app locally, you should build and deploy a contract (JavaScript or Rust version) and a client manually.

---

## Interacting With the Counter
Go ahead and log in with your NEAR account. If you don't have one, you can create one on the fly. Once logged in, use the `tails` and `heads` buttons to try to guess the next coin flip outcome.

![img](/docs/assets/examples/coin-flip.png)
*Frontend of the Game*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code in Rust is in the `/contract-rs` folder.
3. The smart contract code in JavaScript is in the `/contract-ts` folder.

:::note
Both Rust and JavaScript versions of the contract implement the same functionality.
:::

### Contract
The contract presents 2 methods: `flip_coin`, and `points_of`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="49" end="81" />
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

When writing smart contracts, it is very important to test all methods exhaustively. In this
project you have integration tests. Before digging into them, go ahead and perform the tests present in the dApp through the command `yarn test` for the JavaScript version, or `./test.sh` for the Rust version.

### Integration test

Integration tests can be written in both Rust and JavaScript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the `coin-flip`
in `contract-ts/sandbox-ts` (for the JavaScript contract) and `contract-rs/tests` (for the Rust contract).

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-ts/main.ava.ts"
            start="32" end="57" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs"
            start="27" end="83" />
  </Language>
</CodeTabs>

---

## A Note On Randomness

Randomness in the blockchain is a complex subject. We recommend you to read and investigate about it.
You can start with our [security page on it](../../2.develop/contracts/security/random.md).

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
