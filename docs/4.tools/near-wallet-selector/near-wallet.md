---
id: near-wallet
title: Near Wallet
sidebar_label: Near Wallet
---

# @near-wallet-selector/near-wallet

This is the [NEAR Wallet](https://wallet.near.org/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/near-wallet

# Using NPM.
npm install @near-wallet-selector/near-wallet
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

// NEAR Wallet for Wallet Selector can be setup without any params or it can take two optional params.
const nearWallet = setupNearWallet({
  walletUrl: "https://wallet.testnet.near.org",
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nearWallet],
});
```

## Options

- `walletUrl` (`string?`): Wallet URL used to redirect when signing transactions. This parameter is required when using custom network configuration.
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/near-wallet-icon.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import nearWalletIconUrl from "@near-wallet-selector/near-wallet/assets/near-wallet-icon.png";

const nearWallet = setupNearWallet({
  iconUrl: nearWalletIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
