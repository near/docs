---
id: guest-book
title: Guest Book
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

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
  <TabItem value="🚀 AssemblyScript" >

  | Gitpod                                                                                                                                                          | Clone locally                                   |
  | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🚀 `https://github.com/near-examples/guest-book` |

  </TabItem>
  <TabItem value="🦀 Rust">

  | Gitpod              | Clone locally         |
  | ------------------- | --------------------- |
  | Not Implemented yet | 🦀 Not Implemented yet |

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
3. The compiled smart contract can be found in `/out/main.wasm`.
4. The account's name in which the contract was deployed is in `/neardev/dev-account`.

### Contract
The contract presents 2 methods: `addMessage` and `getMessage`.

<CodeTabs>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/guest-book/blob/update_to_current_format/contract/assembly/main.ts"/>
  </Language>
</CodeTabs>

### Frontend
The frontend is composed by a single HTML file (`/index.html`) and uses REACT. Check `/App.js` and `/index.js` to understand how
components are displayed in the screen.

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
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/guest-book/blob/update_to_current_format/contract/assembly/__tests__/guestbook.spec.ts"
            start="18" end="37" />
  </Language>
</CodeTabs>

### Integration test

Integration tests are written in typescript and Rust. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the Guest Book in the `integration-tests`
folder.