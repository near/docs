---
id: my-near-wallet
title: My Near Wallet
sidebar_label: My Near Wallet
---

# @near-wallet-selector/my-near-wallet

This is the [My NEAR Wallet](https://mynearwallet.com/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v0.44.2 or above:

```bash
# Using Yarn
yarn add near-api-js@^0.44.2

# Using NPM.
npm install near-api-js@^0.44.2
```
```bash
# Using Yarn
yarn add @near-wallet-selector/my-near-wallet

# Using NPM.
npm install @near-wallet-selector/my-near-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

// My NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const myNearWallet = setupMyNearWallet({
  walletUrl: "https://testnet.mynearwallet.com",
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [myNearWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required for custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to [`/assets/my-near-wallet-icon.png`](https://github.com/near/wallet-selector/tree/main/packages/my-near-wallet/assets/my-near-wallet-icon.png).

## Assets

Assets such as icons can be found in the [`/assets`](https://github.com/near/wallet-selector/tree/main/packages/my-near-wallet/assets) directory of the package. Below is an example using Webpack:

```ts
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import myNearWalletIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

const myNearWallet = setupMyNearWallet({
  iconUrl: myNearWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
