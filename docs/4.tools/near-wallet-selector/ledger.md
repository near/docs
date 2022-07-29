---
id: ledger
title: Ledger
sidebar_label: Ledger
---

# @near-wallet-selector/ledger

This is the [Ledger](https://www.ledger.com/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/ledger

# Using NPM.
npm install @near-wallet-selector/ledger
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";

// Ledger for Wallet Selector can be setup without any params or it can take one optional param.
const ledger = setupLedger({
  iconUrl: "https://yourdomain.com/yourwallet-icon.png"
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [ledger],
});
```

## Options
- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to [`/assets/ledger-icon.png`](https://github.com/near/wallet-selector/tree/main/packages/ledger/assets/ledger-icon.png).

## Assets

Assets such as icons can be found in the [`/assets`](https://github.com/near/wallet-selector/tree/main/packages/ledger/assets) directory of the package. Below is an example using Webpack:

```ts
import { setupLedger } from "@near-wallet-selector/ledger";
import ledgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";

const ledger = setupLedger({
  iconUrl: ledgerIconUrl
});
```

## Known issues
Existing dApps with Ledger support integrated may encounter this error `Device is already open`, it means your current integration and this package are conflicting and two ledger instances are being created. Avoid this scenario by supporting only this package. 

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
