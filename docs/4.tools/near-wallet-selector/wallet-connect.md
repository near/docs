---
id: wallet-connect
title: Wallet Connect
sidebar_label: Wallet Connect
---

# @near-wallet-selector/wallet-connect

This is the [WalletConnect](https://walletconnect.com/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @near-wallet-selector/wallet-connect

# Using NPM.
npm install @near-wallet-selector/wallet-connect
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";

const walletConnect = setupWalletConnect({
  projectId: "c4f79cc...",
  metadata: {
    name: "NEAR Wallet Selector",
    description: "Example dApp used by NEAR Wallet Selector",
    url: "https://github.com/near/wallet-selector",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  chainId: "near:testnet",
  iconUrl: "https://yourdomain.com/yourwallet-icon.png",
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [walletConnect],
});
```

## Options

- `projectId` (`string`): Project ID required to instantiate the client. More details can be found [here](https://docs.walletconnect.com/2.0/api/project-id).
- `metadata` (`object`): Metadata used to provide context of the dApp to the connected wallet. More details can be found [here](https://docs.walletconnect.com/2.0/protocol/tech-spec#participant-metadata).
- `chainId` (`string?`): Chain ID for requests. Defaults to `"near:<networkId>` unless using custom network configuration.
- `iconUrl` (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to [`/assets/wallet-connect-icon.png`](https://github.com/near/wallet-selector/tree/main/packages/wallet-connect/assets/wallet-connect-icon.png).

## Assets

Assets such as icons can be found in the [`/assets`](https://github.com/near/wallet-selector/tree/main/packages/wallet-connect/assets) directory of the package. Below is an example using Webpack:

```ts
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import walletConnectIconUrl from "@near-wallet-selector/wallet-connect/assets/wallet-connect-icon.png";

const walletConnect = setupWalletConnect({
  iconUrl: walletConnectIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
