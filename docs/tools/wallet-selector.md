---
id: wallet-selector
title: Wallet Selector
sidebar_label: NEAR Wallet Selector
description: "A single library to connect all NEAR Wallets." 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Wallet Selector](https://github.com/near/wallet-selector) is a `JS`/`TS` library that lets users connect to your application using their preferred wallet.

![Preview](/docs/assets/tools/wallet-selector.png)
_Initial screen of [Wallet Selector](https://near.github.io/wallet-selector/)_

<details>
<summary> List of NEAR Wallets </summary>

Here is a list of user-friendly wallets that support the NEAR blockchain, you can find more at the [NEAR Wallets](https://wallet.near.org/) page.

- [Bitget Wallet](https://web3.bitget.com/): A multi-chain wallet supporting NEAR and other blockchains with comprehensive DeFi features.

- [Coin98 Wallet](https://coin98.com/): A multi-chain wallet and DeFi gateway supporting NEAR and 40+ blockchains.

- [Hot Wallet](https://hot-labs.org/): A browser-based wallet optimized for development and testing environments.

- [Intear Wallet](https://intear.tech/): A NEAR-focused wallet with seamless integration capabilities.

- [Math Wallet](https://mathwallet.org/): A multi-platform wallet supporting NEAR and multiple blockchain networks.

- [Meteor Wallet](https://wallet.meteorwallet.app/): Both a browser and extension wallet, with advanced NFT features.

- [NEAR Mobile](https://nearmobile.app/): A non-custodial wallet that is easy to use and well designed to manage your crypto wherever you go.

- [OKX Wallet](https://www.okx.com/web3): A comprehensive Web3 wallet supporting NEAR and multiple chains with built-in DeFi access.

- [Ramper Wallet](https://www.ramper.xyz/): A user-friendly wallet with social login features supporting NEAR.

- [Sender Wallet](https://sender.org/): Security-audited mobile & extension wallet with 1M+ users, supporting NEAR & Aurora.

- [Unity Wallet](https://www.unitywallet.app/): A wallet designed for seamless NEAR blockchain integration.

- [WELLDONE Wallet](https://welldonestudio.io/): A multi-chain extension wallet that gives you control over all your assets from a single platform.

</details>

---

## Unlocking the wallet ecosystem

Wallet Selector makes it easy for users to interact with dApps by providing an abstraction over various wallets and wallet types within the NEAR ecosystem.

:::info

You can check the current list of supported wallets in the [README.md](https://github.com/near/wallet-selector/blob/main/README.md) file of near/wallet-selector repository.

:::

---

## Install

The easiest way to use NEAR Wallet Selector is to install the core package from the NPM registry, some packages may require near-api-js v5.1.1 or above check them at packages.

```bash
npm install near-api-js
```

```bash
npm install @near-wallet-selector/core
```

Next, you'll need to install the wallets you want to support:

```bash
npm install \
  @near-wallet-selector/modal-ui \
  @near-wallet-selector/bitget-wallet \
  @near-wallet-selector/coin98-wallet \
  @near-wallet-selector/ethereum-wallets \
  @near-wallet-selector/hot-wallet \
  @near-wallet-selector/intear-wallet \
  @near-wallet-selector/ledger \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/meteor-wallet-app \
  @near-wallet-selector/near-mobile-wallet \
  @near-wallet-selector/okx-wallet \
  @near-wallet-selector/ramper-wallet \
  @near-wallet-selector/sender \
  @near-wallet-selector/unity-wallet \
  @near-wallet-selector/welldone-wallet
```

---

## Setup

The wallet selector can be set up in two ways: by using its `core` API, or by importing its `React context/hooks` into your app:


<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

  ```ts
  import "@near-wallet-selector/modal-ui/styles.css";
  import { setupWalletSelector } from "@near-wallet-selector/core";
  import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
  // import other wallets you want to support

  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [
      setupMeteorWallet(),
      /// add other setup functions
    ],
  });

  // Subscribe to changes in the selected account
  walletSelector.then(async (selector) => {
    selector.subscribeOnAccountChange(async (signedAccount) => { ... });
  });
  ```

</TabItem>

<TabItem value="react-hook" label="React Hook">

  Install the React hook package:

  ```bash
  npm install @near-wallet-selector/react-hook 
  ```

Wrap your app with the provider:

  ```jsx
  import "@near-wallet-selector/modal-ui/styles.css";
  import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";
  import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
  // import other wallets you want to support

  const config = {
    network: "testnet",
    modules: [
      setupMeteorWallet()
      // add other setup functions
      ],
    createAccessKeyFor: "hello.near-examples.testnet",
  };

  function App() {
    return (
      <WalletSelectorProvider config={config}>
        {/* Your app components */}
      </WalletSelectorProvider>
    );
  }
  ```

</TabItem>
</Tabs>

---

## Sign in

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

To sign in, you will need to create a modal instance and call the `show()` method:

```ts
  import { setupModal } from "@near-wallet-selector/modal-ui";

  const modal = setupModal(selector, {
    contractId: "hello.near-examples.testnet",
  });

  modal.show();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signIn } = useWalletSelector();

  const handleSignIn = () => {
    signIn();
  };

  return <button onClick={handleSignIn}>Sign In</button>;
};
```

</TabItem>
</Tabs>

---

## Sign out

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
  const wallet = await selector.wallet();
  await wallet.signOut();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signOut } = useWalletSelector();

  const handleSignOut = async () => {
    await signOut();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
```

</TabItem>
</Tabs>

---

## Get accounts

You can easily query the signed-in accounts (either one or `none`):

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
const wallet = await selector.wallet();
const accounts = await wallet.getAccounts();
console.log(accounts); // [{ accountId: "test.testnet" }]
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signedAccountId } = useWalletSelector();

  if (signedAccountId) {
    return <div>Signed in as {signedAccountId}</div>;
  } else {
    return <div>Not signed in</div>;
  }
};
```

</TabItem>
</Tabs>

---

## Get Balance

The React hook exposes a method that can be used to get the balance of the currently signed-in account:

<Tabs groupId="wallet-selector-api">
<TabItem value="react-hook" label="React Hook">

```jsx
const { getBalance } = useWalletSelector();

const balance = await getBalance();
```

</TabItem>
</Tabs>

---

## Verify Message

In NEAR, users can sign messages with their private keys to prove ownership of their accounts. This is useful for various purposes, such as authentication, authorization, and data integrity.

The wallet selector provides a `signNep413Message` method that allows users to sign messages in a standardized way, following the [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) specification.


<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
// MyNearWallet
const wallet = await selector.wallet();
const signedMessage = await wallet.signNep413Message({
  message: "Test message",
  accountId: "example.testnet",
  recipient: "app.near",
  nonce: Buffer.from(Date.now().toString()),
});
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signNep413Message } = useWalletSelector();

  const signedMessage = await signNep413Message({
    message: "Test message",
    accountId: "example.testnet",
    recipient: "app.near",
    nonce: Buffer.from(Date.now().toString()),
  });

  console.log("Message signed:", signedMessage);
};
```

</TabItem>
</Tabs>

---

## Call a Read-Only Method

Smart contracts often expose read-only methods that allow users to query data without modifying the contract's state. These methods are typically used to fetch information such as balances, configurations, or other relevant data.

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

In order to call a read-only method you will need to use `near-api-js`, as the core wallet selector does not provide this functionality out of the box.

```ts
import { JsonRpcProvider } from "@near-js/providers";

const provider = new JsonRpcProvider({
  url: "https://free.rpc.fastnear.com",
});

const viewFunction = async ({
  contractId,
  method,
  args = {},
}: ViewMethodParams) => {
  const res = await provider.callFunction(
    "hello.near-examples.testnet",
    "get_greeting",
    {}
  );

  return JSON.parse(Buffer.from(res.result).toString());
};
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { viewFunction } = useWalletSelector();

  const handleViewMethod = async () => {
    try {
      const result = await viewFunction({
        contractId: "guestbook.near-examples.testnet",
        method: "get_messages",
        args: {},
      });
      console.log("View result:", result);
    } catch (error) {
      console.error("View method failed:", error);
    }
  };

  return <button onClick={handleViewMethod}>Call View Method</button>;
};
```

</TabItem>
</Tabs>

---

## Sign and Send a Transaction

You can use the wallet selector to sign and send transactions to the NEAR blockchain. This is useful for performing actions that modify the state of a smart contract, such as transferring tokens, updating data, or executing specific functions.

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
import { actionCreators } from "@near-js/transactions";

const wallet = await selector.wallet();
await wallet.signAndSendTransaction({
  receiverId: 'guestbook.near-examples.testnet',
  actions: [
    actionCreators.functionCall(
      "add_message",
      { text: "Hello World!" },
      "30000000000000",
      "10000000000000000000000",
    )
  ],
});
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signAndSendTransaction, callFunction } = useWalletSelector();

  const handleTransaction = async () => {
    try {
      const result = await callFunction({
        contractId: "guestbook.near-examples.testnet",
        method: "add_message",
        args: { text: "Hello World!" },
        gas: "30000000000000",
        deposit: "10000000000000000000000",
      });
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return <button onClick={handleTransaction}>Send Transaction</button>;
};
```

</TabItem>
</Tabs>

## Sign and send transactions

You can use the wallet selector to sign and send multiple transactions in parallel with a single request. 

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
const wallet = await selector.wallet();
await wallet.signAndSendTransactions({
  transactions: [
    {
      receiverId: "guestbook.near-examples.testnet",
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "add_message",
            args: { text: "Hello World!" },
            gas: "30000000000000",
            deposit: "10000000000000000000000",
          },
        },
      ],
    },
  ],
});
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signAndSendTransactions } = useWalletSelector();

  const handleBatchTransactions = async () => {
    try {
      const transactions = [
        {
          receiverId: "guestbook.near-examples.testnet",
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "add_message",
                args: { text: "Hello World!" },
                gas: "30000000000000",
                deposit: "10000000000000000000000",
              },
            },
          ],
        },
      ];

      const results = await signAndSendTransactions({ transactions });
      console.log("Batch results:", results);
    } catch (error) {
      console.error("Batch transaction failed:", error);
    }
  };

  return (
    <button onClick={handleBatchTransactions}>Send Batch Transactions</button>
  );
};
```

</TabItem>
</Tabs>
