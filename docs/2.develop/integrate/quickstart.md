---
id: quickstart-frontend
title: Hello WebApp
sidebar_label: ⭐ Spin up a WebApp
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Most interactions with the NEAR ecosystem can be grouped in one of 3 categories: 
1. Interacting with a [NEAR smart contract](/develop/contracts/quickstart).
2. Interacting with a [NEAR component](/bos/tutorial/quickstart).

In this guide we will show you how to quickly spin-up an application were users can **login** using their wallets and interact with both **contracts** and **components**.

Furthermore, the application readily integrates a `Web3 wallet`, allowing people to login with `Metamask` to use multi-chain components

:::tip Already have an app?

If you already have an app, we recommend you to go through this guide and then see the our documentation on [integrating NEAR to a frontend](./frontend.md)
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

## Interacting With Your dApp

Once the app starts you will see the screen below:

![img](/docs/assets/examples/hello-near-landing-page.png)
*Landing page of Hello NEAR Gateway*

The app is divided into two sections:

1. Near Integration: which directly communicates with a NEAR smart contract through the user's wallet.
2. Web3 Components: which embeds 3 components that interact with the NEAR and Ethereum.

<hr class="subsection" />

### Smart Contract Interaction

We'll start by looking at the Near frontend integration. When you click on the Near Integration card you'll be taken to the frontend below: 

![img](/docs/assets/examples/hello-near-gateway.png)
*Frontend of Hello NEAR*

Now go ahead and sign in with your NEAR account. If you don't have one, you will be able to create one in the moment.

Once logged in, change the greeting and see how the contract greets you!

<hr class="subsection" />

#### How does it work?

Now that you understand what the frontend does, let us take a closer look at the `./src/pages/hello-near/page.js` file.

The file defines the main component to be rendered, namely `HelloNear`, which calls the `useWallet` hook to import the methods needed to interact with the smart contract:

```jsx
  const { signedAccountId, viewMethod, callMethod } = useWallet();
```

- `signedAccountId`: If defined, means that the user has logged in with their Near wallet.
- `viewMethod`: Used to make read-only calls to the contract.
- `callMethod`: Which asks the user to sign a transaction in order to interact with the contract.

Note that the code for the login button is not found along with the frontend code. That is because it is shared by both the Gateway and the Hello Near frontend and can be found all throughout the app. You can find that code in the `components/navigation.js` file.

You can learn more about how the wallet selector are set up in our [tools documentation](../../4.tools/wallet-selector.md). 

### Frontend

Those are then used to set the state and set up a helper function that is passed down to the save button.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near/create-near-app/blob/master/templates/frontend/next/src/app/hello-near/page.js"
            start="12" end="32" />
  </Language>
</CodeTabs>

### Logic

The frontend's query logic lives in `wallets/wallet-selector.js`, which communicates with the contract through the Wallet API. You can find those queries in the `useInitWallet` hook in the following code:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near/create-near-app/blob/master/templates/frontend/next/src/wallets/wallet-selector.js"
            start="82" end="112" />
  </Language>
</CodeTabs>

The methods are then set in the `useWallet` hook's state so they can be accessed by the frontend. 

## Interacting with Web3 Components

Now let's take a look at the gateway. Go ahead and click on the card titled Web3 Components at the bottom on the page. Once you do you'll be taken to the screen below:

![img](/docs/assets/examples/hello-near-components.png)
*Frontend of Hello Components*

If you're following along, you should already be logged into your NEAR account. If you aren't, go ahead and do so now.

You'll see that once you're logged in you are able to interact with the components that come included with the app.

## Structure of a Gateway

Now that you've interacted with some simple components in a gateway, let us take a closer look at it's structure:

1. The code for the container that holds the components can be found in the `hello-components/page.js` file.
2. The wrapper of each individual components lives in the `components/vm-components.js` file.
3. The component map with the link to each component in the BOS can found in the `config.js` file.

Note that, like in the Near Integration example above, the code for the login button is not found along with the frontend code. That is because it is shared by both the Gateway and the Hello Near frontend and can be found all throughout the app. You can find that code in the components/navigation.js file.

### Gateway

The gateway itself is pretty simple. As can be seen in the `hello-components/page.js`, all the gateway is doing is rendering components that themselves are using custom React components pulled form the Near Social VM API so they can display components from the BOS:

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near/create-near-app/blob/master/templates/frontend/next/src/components/vm-component.js"
            start="9" end="26" />
  </Language>
</CodeTabs>

In the code above, the `Widget` component is being imported from the Near Social VM and is then handed the link to the component we're trying to render form the BOS.

## Moving Forward

That's it for our first quickstart dApp tutorial. You have now seen a fully functional frontend integration and a simple gateway that can render Web3 components.

In the following sections we dive deeper into what are [BOS components](../../bos/overview.md), how to [make your own gateway](../../bos/tutorial/gateway.md), and what are some of the [built-in components](../../bos/components.md).

If you have any questions, do not hesitate in joining us on [Discord](https://near.chat). We regularly host Office Hours, in which you can join our voice channel and ask questions.

Happy coding!