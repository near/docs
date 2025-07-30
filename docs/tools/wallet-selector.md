---
id: wallet-selector
title: Wallet Selector
sidebar_label: NEAR Wallet Selector
description: "NEAR Wallet Selector is a JavaScript/TypeScript library that enables users to connect to your dApp using their preferred wallet with a unified interface across the NEAR ecosystem."
---

The [Wallet Selector](https://github.com/near/wallet-selector) is a `JS`/`TS` library that lets users connect to your application using their preferred wallet. 

![Preview](/docs/assets/tools/wallet-selector-preview.png)
*Initial screen of [Wallet Selector](https://near.github.io/wallet-selector/)*

<details>
<summary> List of NEAR Wallets </summary>

Here is a list of user-friendly wallets that support the NEAR blockchain, you can find more at the [NEAR Wallets](https://wallet.near.org/) page.

- [HERE Wallet](https://www.herewallet.app/): Non-custodial mobile wallet with a friendly user interface and advanced features.

- [Meteor Wallet](https://wallet.meteorwallet.app/): Both a browser and extension wallet, with advanced NFT features.

- [Bitte Wallet](https://github.com/BitteProtocol/wallet): A passkey meta-transaction, browser wallet, with advanced NFT Tooling and AI features. If you're looking to integrate Bitte Wallet into your applications,
- [MyNearWallet](https://mynearwallet.com/): A browser based wallet that offers the same UI and features of `wallet.near.org`.

- [NEAR Mobile](https://nearmobile.app/): A non-custodial wallet that is easy to use and well designed to manage your crypto wherever you go.

- [Nightly Wallet](https://wallet.nightly.app/download): A mobile and extension wallet, with support for multiple ecosystems.

- [Sender Wallet](https://sender.org/): Security-audited mobile & extension wallet with 1M+ users, supporting NEAR & Aurora.

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

The easiest way to use NEAR Wallet Selector is to install the core package from the NPM registry, some packages may require near-api-js v0.44.2 or above check them at packages.

```bash
npm install near-api-js
```

```bash
npm install @near-wallet-selector/core
```

Next, you'll need to install the wallets you want to support:

```bash
npm install \
  @near-wallet-selector/near-wallet \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/sender \
  @near-wallet-selector/nearfi \
  @near-wallet-selector/here-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/nightly \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/ledger \
  @near-wallet-selector/wallet-connect \
  @near-wallet-selector/nightly-connect \
  @near-wallet-selector/default-wallets \
  @near-wallet-selector/coin98-wallet
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

```
import "@near-wallet-selector/modal-ui/styles.css"
```

:::

---

## Reference

The API reference of the selector can be found [`here`](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md)

### Sign in

```ts
// NEAR Wallet.
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();
```

### Sign out

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signOut();
})();
```

### Get accounts

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.getAccounts();
  console.log(accounts); // [{ accountId: "test.testnet" }]
})();
```

### Verify Owner

```ts
// MyNearWallet
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.verifyOwner({
    message: "Test message",
  });
})();
```

### Sign and send transaction

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

### Sign and send transactions

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
