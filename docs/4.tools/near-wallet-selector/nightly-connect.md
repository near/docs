---
id: nightly-connect
title: Nightly Connect
sidebar_label: Nightly Connect
---

# @near-wallet-selector/nightly-connect

This is the [Nightly Connect](https://connect.nightly.app/) package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/nightly-connect

# Using NPM.
npm install @near-wallet-selector/nightly-connect
```
Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";

const nightlyConnect = setupNightlyConnect({
  url: "wss://ncproxy.nightly.app/app",
  appMetadata: {
    additionalInfo: "",
    application: "NEAR Wallet Selector",
    description: "Example dApp used by NEAR Wallet Selector",
    icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png",
  },
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nightlyConnect],
});
```

## Options

- `appMetadata` (`object`): App metadata used to provide context of the dApp to the connected wallet.
- `url` (`string?`): URL address of Nightly Connect proxy.
- `timeout` (`number?`): Timeout of requests sent via proxy.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/nightly-connect.png`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
import nightlyConnectIconUrl from "@near-wallet-selector/nightly-connect/assets/nightly-connect.png";

const nightlyConnect = setupNightlyConnect({
  iconUrl: nightlyConnectIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
