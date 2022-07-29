---
id: meteor-wallet
title: Meteor Wallet
sidebar_label: Meteor Wallet
---

# @near-wallet-selector/meteor-wallet

This is the [Meteor Wallet](https://meteorwallet.app) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/meteor-wallet

# Using NPM.
npm install @near-wallet-selector/meteor-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

// Meteor for Wallet Selector can be setup without any params or it can take one optional param.
const meteorWallet = setupMeteorWallet({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [meteorWallet],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/meteor-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import meteorIconUrl from "@near-wallet-selector/meteor-wallet/assets/meteor-icon.png";

const meteorWallet = setupMeteorWallet({
  iconUrl: meteorIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
