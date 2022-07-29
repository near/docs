---
id: wallet-utils
title: Wallet Utils
sidebar_label: Wallet Utils
---

# @near-wallet-selector/wallet-utils

This is the Wallet Utils package for NEAR Wallet Selector.

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
yarn add @near-wallet-selector/wallet-utils

# Using NPM.
npm install @near-wallet-selector/wallet-utils
```

Then use it in your custom wallet integration:

```ts
import { createAction } from "@near-wallet-selector/wallet-utils";

const action = createAction({
  type: "Transfer",
  params: {
    deposit: "10000000000000000000000",
  },
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
