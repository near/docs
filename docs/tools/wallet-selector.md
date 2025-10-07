---
id: wallet-selector
title: Wallet Selector
sidebar_label: NEAR Wallet Selector
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

## Setup Wallet Selector

Optionally, you can install our [`modal-ui`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui) or [`modal-ui-js`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui-js) package for a pre-built interface that wraps the `core` API and presents the supported wallets:

```bash
npm install @near-wallet-selector/modal-ui
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupNearWallet()],
});

const modal = setupModal(selector, {
  contractId: "test.testnet",
});

modal.show();
```

:::info Required CSS

To integrate the Wallet Selector, you also need to include the required CSS:

```js
import "@near-wallet-selector/modal-ui/styles.css";
```

:::

---

## Setup React Hook

This package provides a React context and hook to easily integrate Wallet Selector into your React application.

Install the React hook package:

```bash
npm install @near-wallet-selector/react-hook \
@near-wallet-selector/modal-ui
```

Wrap your app with the provider:

```jsx
import "@near-wallet-selector/modal-ui/styles.css";

import { setupNearWallet } from "@near-wallet-selector/near-wallet";

import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";

const config = {
  network: "testnet",
  modules: [setupNearWallet()],
};

function App() {
  return (
    <WalletSelectorProvider config={config}>
      {/* Your app components */}
    </WalletSelectorProvider>
  );
}
```

---

## Reference

The API reference of the selector can be found [`here`](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md)

### Sign in

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
// NEAR Wallet.
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();
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

### Sign out

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signOut();
})();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signOut } = useWalletSelector();

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
```

</TabItem>
</Tabs>

### Get accounts

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.getAccounts();
  console.log(accounts); // [{ accountId: "test.testnet" }]
})();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { getAccount, signedAccountId } = useWalletSelector();
  const fetchAccountInfo = async (accountId) => {
    const account = await getAccount(signedAccountId);
    console.log(account);
  };
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  return <div>Check console for account info</div>;
};
```

</TabItem>
</Tabs>

### Verify Owner

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
// MyNearWallet
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.verifyOwner({
    message: "Test message",
  });
})();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { signMessage } = useWalletSelector();

  const handleVerifyOwner = async () => {
    try {
      const signedMessage = await signMessage({
        message: "Test message",
        recipient: "app.near",
        nonce: Buffer.from(Date.now().toString()),
      });
      console.log("Message signed:", signedMessage);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return <button onClick={handleVerifyOwner}>Verify Owner</button>;
};
```

</TabItem>
</Tabs>

### Sign and send transaction

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signAndSendTransaction({
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: "Hello World!" },
          gas: "30000000000000",
          deposit: "10000000000000000000000",
        },
      },
    ],
  });
})();
```

</TabItem>

<TabItem value="react-hook" label="React Hook">

```jsx
import { useWalletSelector } from "@near-wallet-selector/react-hook";

const MyComponent = () => {
  const { callFunction } = useWalletSelector();

  const handleTransaction = async () => {
    try {
      const result = await callFunction({
        contractId: "guest-book.testnet",
        method: "addMessage",
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

### Sign and send transactions

<Tabs groupId="wallet-selector-api">
<TabItem value="core-api" label="Wallet Selector">

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signAndSendTransactions({
    transactions: [
      {
        receiverId: "guest-book.testnet",
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: { text: "Hello World!" },
              gas: "30000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      },
    ],
  });
})();
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
          receiverId: "guest-book.testnet",
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "addMessage",
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
