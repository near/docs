# NEAR Wallet Selector

A new easy-to-navigate pop-up allows users to select their preferred wallet to easily interact with the NEAR protocol.
Launched in March 2022 by the NEAR Foundation, this simple modal will appear whenever users are given the option to “Connect Wallet” to the NEAR blockchain.

![Preview](../../assets/preview-img.gif)

## Framework agnostic!

[React](https://reactjs.org/) / [Next.js](https://nextjs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate NEAR Wallet Selector into your own dApp.

### Unlocking the wallet ecosystem

Wallet Selector makes it easy for users to interact with your dApp by providing an abstraction over various wallets within the NEAR ecosystem:

- [NEAR Wallet](https://www.npmjs.com/package/@near-wallet-selector/near-wallet) - Browser wallet.
- [My NEAR Wallet](https://www.npmjs.com/package/@near-wallet-selector/my-near-wallet) - Browser wallet.
- [Sender](https://www.npmjs.com/package/@near-wallet-selector/sender) - Injected wallet.
- [Math Wallet](https://www.npmjs.com/package/@near-wallet-selector/math-wallet) - Injected wallet.
- [Nightly](https://www.npmjs.com/package/@near-wallet-selector/nightly) - Injected wallet.
- [Meteor Wallet](https://www.npmjs.com/package/@near-wallet-selector/meteor-wallet) - Injected wallet.
- [Coin98 Wallet](https://www.npmjs.com/package/@near-wallet-selector/coin98-wallet) - Injected wallet.
- [Ledger](https://www.npmjs.com/package/@near-wallet-selector/ledger) - Hardware wallet.
- [WalletConnect](https://www.npmjs.com/package/@near-wallet-selector/wallet-connect) - Bridge wallet.
- [Nightly Connect](https://www.npmjs.com/package/@near-wallet-selector/nightly-connect) - Bridge wallet.
- [Here Wallet](https://www.npmjs.com/package/@near-wallet-selector/here-wallet) - Mobile wallet.
- [NearFi Wallet](https://www.npmjs.com/package/@near-wallet-selector/nearfi) - Mobile wallet.

Thanks to NEAR’s open and inclusive approach, other wallet developers will be able to contribute to the NEAR ecosystem.

## Install

The easiest way to use NEAR Wallet Selector is to install the core package from the NPM registry, some packages may require near-api-js v0.44.2 or above check them at packages.

```bash
npm install near-api-js@^0.44.2
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

## API Reference
The API reference of the selector can be found [`here`](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md)

## Wallet API
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
  const wallet = await selector.wallet("sender");
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
    actions: [{
      type: "FunctionCall",
      params: {
        methodName: "addMessage",
        args: { text: "Hello World!" },
        gas: "30000000000000",
        deposit: "10000000000000000000000",
      }
    }]
  });
})();
```
### Sign and send transactions
```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signAndSendTransactions({
    transactions: [{
      receiverId: "guest-book.testnet",
      actions: [{
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: "Hello World!" },
          gas: "30000000000000",
          deposit: "10000000000000000000000",
        }
      }]
    }]
  });
})();
```


