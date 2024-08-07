---
id: quickstart
title: Hello WebApp
sidebar_label: Quickstart ✨
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Most interactions with the NEAR ecosystem can be grouped in 2 categories: 
1. Interacting with a [NEAR smart contract](./integrate-contracts.md).
2. Interacting with a [NEAR component](./integrate-components.md).

In this guide we will show you how to quickly spin-up an application where users can **login** using their wallets and interact with both **contracts** and **components**.

Furthermore, the application readily integrates a `Web3 wallet`, allowing people to use `Metamask` to interact with multi-chain components.

:::tip Searching to integrate NEAR in your App?
If you already have an application and want to integrate NEAR into it, we recommend you to first go through this guide and then check our documentation on [integrating NEAR to a frontend](./integrate-contracts.md)
:::

---

## Create NEAR App
If you already have [Node.js](https://nodejs.org/en/download) installed, simply run:

```bash 
  npx create-near-app@latest
```

Use the interactive menu to set up:
1. `A Near Gateway (Web App)`.
2. `NextJs + React`.

:::tip Using pnpm
While you can use our app with any package manager, we recommend you to skip the installation step and manually install the dependencies using `pnpm i`.
:::

Once the folder is ready - and all dependencies installed - you can start the development server using `pnpm`. 

```bash 
pnpm dev
```

Visit `http://localhost:3000` in your browser to view the dApp. Note that since the dApp uses NextJS the app might take longer to load the pages on first visit.

<details>
<summary> The app is not starting? </summary>

Make sure you are using **node >= v18**, you can easily switch versions using `nvm use 18`

</details>

---

## Landing Page

Once the app starts you will see the landing page, rendering a navigation bar that allows users to login using their NEAR wallet, and two pathways:

![img](/docs/assets/examples/hello-near-landing-page.png)
*Landing page of Hello NEAR Gateway*

Go ahead and sign in with your NEAR account. If you don't have one, you can create one on the fly.

<hr className="subsection" />

### Under the Hood

[Next.js](https://nextjs.org/) uses a template system, where each page is a React component.

Our app's template is defined at `./src/layout.js`. It does two things:

1. Initializes a [wallet selector](../../4.tools/wallet-selector.md), and stores it so other components can access it later.
2. Renders the navigation menu and the page's content.

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/layout.js" language="jsx" start="18" end="25" />

<details>
<summary>What is the wallet selector?</summary>

The wallet selector is a component that allows users to select their preferred Near wallet to login. Our application implements a `useInitWallet` hook, that initializes a wallet selector and stores it so other components can access it later.  

</details>

<hr className="subsection" />

### Navigation Bar & Login
The navigation bar implements buttons to `login` and `logout` users with their Near wallet.

The code for the navigation bar can be found at `./src/navigation.js`. The login and logout buttons are implemented by using the `signIn` and `signOut` methods from the wallet selector previously initialized:

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/components/navigation.js" language="jsx" start="10" end="23" />

---

## Interacting with NEAR

Now that you understand how the landing page works, we can move to the `Near Integration` page, which retrieves a greeting from the [hello.near-examples.testnet](https://testnet.nearblocks.io/address/hello.near-examples.testnet) contract.

![img](/docs/assets/examples/hello-near-gateway.png)
*View of the `Near Integration` page*

Login if you haven't done it yet and you will see a simple form that allows you to store a greeting in the smart contract.

<hr className="subsection" />

### Under the Hood
Interactions with NEAR are done using the `useStore` hook to retrieve the `wallet` we initialized on the `layout`. The wallet allows us to interact with the smart contract through the methods `viewMethod` and `callMethod`.

- `viewMethod` is used to call functions that are read-only
- `callMethod` is used to call functions that modify the state of the contract 

<Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/pages/hello-near/index.js" language="jsx" start="14" end="38" />

On load, the first `useEffect` hook will call the contract's `get_greeting` method and set the `greeting` state to the result.

If the user is logged in, the `storeGreeting` method will call the contract's `set_greeting` method and set the `greeting` state to the result.

---

## Interacting with a Component

Now let's take a look at the Components page. Go ahead and click on the card titled Web3 Components at the bottom on the page. Once you do you'll be taken to the screen below:

![img](/docs/assets/examples/hello-near-components.png)
*The Near Components Page*

If you're following along, you should already be logged into your NEAR account. If you aren't, go ahead and do so now.

You'll see that once you're logged in you are able to interact with the components that come included with the app.

:::info Ethereum Components
To interact with the Ethereum components (a Lido) you will need to have Metamask, or other web3 compatible wallets 
:::

:::warning Ethereum Mainnet
While the component's code is stored in the **Near testnet**, the Lido component is connected to the **Ethereum mainnet**.
:::

<hr className="subsection" />

### Under the Hood

The source code (located in `./src/hello-components/page.js`) shows us that the page is rendering components pulled from the SocialDB:

<CodeTabs>
  <TabItem value="page.js">
    <Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/pages/hello-components/index.js" start="27" end="36" language="jsx" />
  </TabItem>
  <TabItem value="vm-components.js">
      <Github url="https://github.com/near-examples/hello-near-examples/blob/master/frontend/src/components/vm-component.js" language="jsx" />
  </TabItem>
</CodeTabs>

Particularly, the `Component` in the main page are wrappers around the `Widget` component of the SocialVM.

---

## Moving Forward

That's it for our quickstart  tutorial. You have now seen a fully functional frontend that can talk with NEAR contracts and render Web3 components.

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding!
