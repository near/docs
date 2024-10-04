---
sidebar_label: "Ethereum Wallets on Near"
id: ethereum-wallets
---

import { Github } from "@site/src/components/codetabs"

# How to integrate Ethereum Wallets to Near DApps?

In this article we will describe how to add EVM wallets support to your Near app, which is already uses the [Near Wallet Selector](https://github.com/near/wallet-selector/).

To integrate Metamask and other EVM wallets you will need to:

1. Update the `Wallet Selector` and add the Web3Modal libraries (`wagmi`, `web3wallet`, `@near-wallet-selector/ethereum-wallets`)
2. Create configurations so the Ethereum wallets can communicate with our Near RPCs
3. Create a Web3Modal and connect it to the Near Wallet Selector
4. Initialize the Ethereum Wallets 

We will show how we added Ethereum Wallets support to our [**Hello Near Examples**](https://github.com/near-examples/hello-near-examples/tree/main/frontend). Let's go step-by-step with it!

:::info
AuroraLabs team has worked on this feature almost for a year now. You can learn more about it from [NEP-518](https://github.com/near/NEPs/issues/518).
:::

:::tip

This article was created by the AuroraLabs team, and appeared originally in the [official Aurora documentation](https://doc.aurora.dev/dev-reference/eth-wallets)

:::

---

## 1. Update Wallet Selector libraries

Lets start by updating the `package.json`, adding all the necessary libraries to support Ethereum wallets.

<hr class="subsection" />

### Wallet Selector Packages


In your `package.json`, add the `@near-wallet-selector/ethereum-wallets` package, and update **all** wallet selector packages to version `8.9.13` or above:

```json title="package.json"
  "dependencies": {
    ...
    "@near-wallet-selector/core": "^8.9.13",
    // highlight-next-line
    "@near-wallet-selector/ethereum-wallets": "^8.9.13",
    "@near-wallet-selector/here-wallet": "^8.9.13",
    "@near-wallet-selector/modal-ui": "^8.9.13",
    "@near-wallet-selector/my-near-wallet": "^8.9.13",
    ...
    }
```

<hr class="subsection" />

### Add Web3Modal libraries

[Web3Modal (also known as AppKit)](https://reown.com/appkit) is a standard way to integrate multiple wallets in Ethereum community.

It is based on [wagmi] hooks library for React. We will describe the React integration here, but if you are on another platform - just go [here](https://docs.reown.com/appkit/overview#get-started), and try using specific instructions suitable for you to install it.

```bash
npm install @web3modal/wagmi wagmi viem @tanstack/react-query
```

---

## 2. Add Near chain config with our RPCs

We updated the config file of our repo to add the chain information necessary for Metamask to communicate with our RPC.

<Github fname="config.js" language="js"
      url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/config.js"
      start="6" end="20" />

---

## 3. Add Web3Modal

First, let's create a new file to handle the Web3Modal (i.e. the modal shown when selecting the `Ethereum Wallets` on the `Wallet Selector`), and all the configs needed to setup the Ethereum Wallets.

<Github fname="web3modal.js" language="js"
      url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/web3modal.js" />

<details>
  <summary> Metadata </summary>

  You can pass a `metadata` object to the `walletConnect` connector. This object will be displayed in the EVM wallets, like MetaMask.

  ```js title="source/wallets/web3modal.js"
  const url = "http://localhost:3000";

  const metadata = {
    name: "Onboard to NEAR Protocol with EVM Wallet",
    description: "Discover NEAR Protocol with Ethereum and NEAR wallets.",
    url: url,
    icons: [`${url}/icon.svg`],
  };
  ```

  This tracks the app requesting the connection on the WalletConnect side. See more [here](https://wagmi.sh/core/api/connectors/walletConnect#metadata).

</details>

:::tip

Make sure to call `reconnect(wagmiConfig)` in your code, to persist the connection between the app and the wallet when the user refreshes the page

:::

<hr class="subsection" />

### Get `projectId`

Notice that the modal uses a `projectId`, which refers to your unique project on `Reown`. Let's get the Web3Modal `projectId` for your project:

1. Go to [Cloud Reown](https://cloud.reown.com/).
2. Register there.
3. Create a project on Cloud Reown.
4. You can copy your `projectId`:

![reown_projectid](https://doc.aurora.dev/assets/images/reown_projectid-dbd1cc5521998d2f16545598ac925a5e.png)

:::tip

You can read more about the `projectId` and how it works [here](https://docs.reown.com/appkit/react/core/installation#cloud-configuration).

:::

---

## 4. Setup Wallet Selector

The last step is to add the Ethereum Wallets selector to your Near Wallet Selector. Let's find your `setupWalletSelector` call and add `setupEthereumWallets` there:

```js showLineNumbers
import { setupWalletSelector } from '@near-wallet-selector/core';
import { wagmiConfig, web3Modal } from '@/wallets/web3modal';
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
```

<Github fname="web3modal.js" language="js" start="44" end="55" metastring="{10}"
      url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js" />


---

## 5. Use It!

That is it! Just re-build your project and click on login! You should see Ethereum Wallets option in your Near Selector:

![ethwallets_popup1](https://doc.aurora.dev/assets/images/ethwallets_popup1-b113d70e3578a75f0f996aa3bcdf43e9.png)

And after click to be able to choose the EVM wallet of your taste:

![ethwallets_popup2](https://doc.aurora.dev/assets/images/ethwallets_popup2-8484d037a465af5134f112fba6eef918.png)

---

## Resources

1. [Source code of the project above](https://github.com/near-examples/hello-near-examples/blob/main/frontend/)

2. [Example of the EVM account on the Near Testnet](https://testnet.nearblocks.io/address/0xe5acd26a443d2d62f6b3379c0a5b2c7ac65d9454) to see what happens in reality on-chain during the execution.

3. Details about how does it work are in [NEP-518](https://github.com/near/NEPs/issues/518)

4. [Recording of the Near Devs call](https://drive.google.com/file/d/1xGWN1yRLzFmRn1e29kbSiO2W1JsxuJH-/view?usp=sharing) with the EthWallets presentation.
