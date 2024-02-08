---
id: guest-book
title: Guest Book
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Our Guest Book example is a simple app composed by two main components:

  1. A smart contract that stores messages from users, allowing to attach money to them.
  2. A simple web-based frontend that displays the last 10 messages posted.

![img](/docs/assets/examples/guest-book.png)

---

## Starting the Project

You have two options to start using the project. The first and recommended is to use the app through Gitpod, which will open a web-based interactive environment. The second option is to clone the repository locally, for which you will need to install all the [Prerequisites](../../2.develop/prerequisites.md).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript" >

  | Gitpod                                                                                                                                                          | Clone locally                                   |
  | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/guest-book-js` |

  </TabItem>
  <TabItem value="🦀 Rust">

  | Gitpod              | Clone locally         |
  | ------------------- | --------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book-rust.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a>  | 🦀 `https://github.com/near-examples/guest-book-rust` |

  </TabItem>
</Tabs>

If you choose Gitpod a new browser window will open automatically with the code, give it a minute and the frontend will pop-up (make sure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd guest-book
yarn
yarn deploy
yarn start
```

Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Guest Book

![img](/docs/assets/examples/guest-book.png)
*Frontend of the Guest Book app*

Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in,
you will be able to sign a message in the guest book. You can further send some money alongside your message. If you attach
more than 0.01Ⓝ then your message will be marked as "premium".

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract

The contract presents 2 methods: `add_message` and `get_message`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-ts/src/contract.ts"
            start="4" end="27" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-rs/src/lib.rs"
            start="29" end="52" />
  </Language>
  
</CodeTabs>

### Frontend

The frontend is composed by a single HTML file (`/index.html`) and uses REACT. Check `/App.js` and `/index.js` to understand how
components are displayed in the screen.

You will notice in `/assets/js/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/guest-book-examples/blob/main/frontend/index.js"
            start="17" end="27" />
  </Language>
</CodeTabs>

It setups the necessary variables and starts the app.

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
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-rs/src/lib.rs"
            start="64" end="87" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are generally written in JavaScript. They automatically deploy your contract and execute methods on it. In this way, integration tests simulate interactions between the contract and the users in a realistic scenario. You will find the integration tests for `hello-near` in `integration-tests/`.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/guest-book-examples/blob/main/contract-ts/sandbox-ts/src/main.ava.ts"
            start="39" end="64" />
  </Language>
</CodeTabs>
