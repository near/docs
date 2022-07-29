---
id: nightly
title: Nightly
sidebar_label: Nightly
---

# @near-wallet-selector/nightly


This is the [Nightly](https://www.nightly.app) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/nightly

# Using NPM.
npm install @near-wallet-selector/nightly
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNightly } from "@near-wallet-selector/nightly";

// Nightly for Wallet Selector can be setup without any params or it can take one optional param.
const nightly = setupNightly({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png" //optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nightly],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to [`/assets/nightly.png`](https://github.com/near/wallet-selector/tree/main/packages/nightly/assets/nightly.png).

## Assets

Assets such as icons can be found in the [`/assets`](https://github.com/near/wallet-selector/tree/main/packages/nightly/assets) directory of the package. Below is an example using Webpack:

```ts
import { setupNightly } from "@near-wallet-selector/nightly";
import nightlyIconUrl from "@near-wallet-selector/nightly/assets/nightly.png";

const nightly = setupNightly({
  iconUrl: nightlyIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
