---
id: quickstart-frontend
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

### Frontend
The frontend is composed by a single HTML file (`frontend/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `frontend/index.js`, which communicates with the contract through `frontend/near-interface.js`. You will notice in `/frontend/index.js` the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="11" end="21" />
  </Language>
</CodeTabs>

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.