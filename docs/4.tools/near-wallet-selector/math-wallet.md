---
id: math-wallet
title: Math Wallet
sidebar_label: Math Wallet
---

# @near-wallet-selector/math-wallet

This is the [Math Wallet](https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/math-wallet

# Using NPM.
npm install @near-wallet-selector/math-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";

// Math Wallet for Wallet Selector can be setup without any params or it can take one optional param.
const mathWallet = setupMathWallet({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [mathWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to [`/assets/math-wallet-icon.png`](https://github.com/near/wallet-selector/tree/main/packages/math-wallet/assets/math-wallet-icon.png).

## Assets

Assets such as icons can be found in the [`/assets`](https://github.com/near/wallet-selector/tree/main/packages/math-wallet/assets) directory of the package. Below is an example using Webpack:

```ts
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import mathWalletIconUrl from "@near-wallet-selector/math-wallet/assets/math-wallet-icon.png";

const mathWallet = setupMathWallet({
  iconUrl: mathWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
