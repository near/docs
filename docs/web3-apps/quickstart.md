---
id: quickstart
title: Your First Web3 App
sidebar_label: Quickstart
description: "Quick guide to create a Web3 frontend application with NEAR integration - build a React/Next.js app where users can login with wallets and interact with smart contracts."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from '@site/src/components/UI/Codetabs';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this guide we will show you how to quickly spin up a frontend where users can **login** using their wallets and interact with a **contract**.

:::tip Searching to integrate NEAR in your App?

If you already have an application and want to integrate NEAR into it, we recommend you to first go through this guide and then check our documentation on [integrating NEAR to a frontend](./tutorials/wallet-login.md)

:::

---

## Template Setup
If you already have [Node.js](https://nodejs.org/en/download) installed, you can use `create-near-app` to quickly setup a template:

```bash
  npx create-near-app@latest

  # ✔ What do you want to build? › Web Application
  # ✔ Select a framework for your frontend › Next.js (Classic)
  # ✔ Name your project (we will create a directory with that name) … near-template
  # ✔ Run 'npm install' now? … yes
```

Once the folder is ready - and all dependencies installed - you can start the development server using `pnpm`.

```bash
cd near-template # go to your project folder
npm run dev
```

Visit `http://localhost:3000` in your browser to view the dApp. Note that since the dApp uses NextJS the app might take longer to load the pages on first visit.

<details>
<summary> The app is not starting? </summary>

Make sure you are using **node >= v22**, you can easily switch versions using `nvm use 22`

</details>

:::tip Framework
In this tutorial we are using the **Next.js** framework with the "classic" page-based routing, but you can select other frameworks such as Vite when creating the app
:::

---

## Landing Page

Once the app starts you will see the landing page, rendering a navigation bar that allows users to login using their NEAR wallet. You can then navigate to the docs or the `Near Integration` page (which we will do).

![img](/assets/docs/tutorials/examples/hello-near-landing-page.png)
*Landing page of Hello NEAR Gateway*

Go ahead and sign in with your NEAR account. If you don't have one, you can create one on the fly.

<hr className="subsection" />

### Context Provider

[Next.js](https://nextjs.org/) uses a template system, where each page is a React component. Our main logic is defined at `./src/pages/_app.js`, which:

1. Creates a `NearProvider` that wraps the entire application to provide NEAR functionality
2. Renders the navigation menu and the page's content

<Github url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/pages/_app.tsx" language="jsx" />

<details>
<summary>What is NEAR Connect Hooks?</summary>

NEAR Connect is a library that allows users to select their preferred NEAR wallet to login, our application uses **hooks** that wrap its functionality to make it easier to use

</details>

<hr className="subsection" />

### Navigation Bar
The navigation bar implements a button to allow users to `login` and `logout` with their NEAR wallet. The main logic comes from the `useNearWallet` hook, which exposes all wallet related functionality.

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/components/navigation.tsx" language="jsx" />

---

## Interacting with NEAR

Now that you understand how the landing page works, we can move to the `Near Integration` page, which retrieves a greeting from the [hello.near-examples.testnet](https://testnet.nearblocks.io/address/hello.near-examples.testnet) contract.

![img](/assets/docs/tutorials/examples/hello-near-gateway.png)
*View of the `Near Integration` page*

Login if you haven't done it yet and you will see a simple form that allows you to store a greeting in the smart contract.

<hr className="subsection" />

### Function Call Hooks
Just like the [navigation bar](#navigation-bar), we use the `useNearWallet` hook to get functions that allow us to call methods on the contract:

- `viewFunction` is used to call functions that are read-only
- `callFunction` is used to call functions that modify the state of the contract

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/pages/hello-near/index.tsx" language="jsx" start="11" end="11" />

#### Calling Read-Only Methods

For example, when we want to fetch the current greeting stored in the contract, we use `viewFunction` inside a `useEffect` hook:

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/pages/hello-near/index.tsx" language="jsx" start="17" end="19" />

#### Calling Change Methods
On the other hand, when the user submits a new greeting, we use `callFunction` to send a transaction to the contract:

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/pages/hello-near/index.tsx" language="jsx" start="25" end="37" />

---

## Moving Forward

That's it for our quickstart tutorial. You have now seen a fully functional frontend that can talk with NEAR contracts and render Web3 components.

<MovingForwardSupportSection />
