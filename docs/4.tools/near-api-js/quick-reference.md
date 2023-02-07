---
id: quick-reference
title: Using JavaScript API to interact with NEAR
sidebar_label: Using JavaScript API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Quick Reference

- [Installation](#install)
- [Interacting with the Wallet](naj-wallet.md)
- [Accounts](naj-account.md)
- [Contracts](naj-contract.md)
- [Utilities](naj-utils.md)

## What is `near-api-js`

`near-api-js` is a complete library to interact with the NEAR blockchain. You can use it in the browser, or in Node.js runtime.

You'll typically first create a connection to NEAR with [`connect`](#connect) using a [`KeyStore`](#key-store).
With the connection object you now can:
- Interact with the [Wallet](naj-wallet.md) in a browser.
- Instantiate an [Account](naj-account.md) object to:
  - Send tokens
  - Deploy contracts
  - Inspect, create or delete accounts
  - Manage keys for accounts.
- Instantiate a [Contract](naj-contract.md) object to call smart contract methods.

The library also contains some [utility functions](naj-utils.md).

:::tip
To quickly get started with integrating NEAR in a web browser, read our [Web Frontend integration](/develop/integrate/frontend) article.
:::

:::info
Note the difference between `near-api-js` and `near-sdk-js`:

The JavaScript _SDK_ is a library for developing smart contracts. It contains classes and functions you use to write your smart contract code.

The JavaScript _API_ is a complete library for all possible commands to interact with NEAR. It’s a wrapper for the RPC endpoints, a library to interact with NEAR Wallet in the browser, and a tool for keys management.
:::

---

## Install {#install}

Include `near-api-js` as a dependency in your package.

```bash
npm i --save near-api-js
```

## Import {#import}

You can use the API library in the browser, or in Node.js runtime. Some features are available only in one of the environments.
For example, the `WalletConnection` is only for the browser, and there are different `KeyStore` providers for each environment.

<Tabs>
<TabItem value="Browser" label="Browser" default>

```js
import * as nearAPI from "near-api-js";
```

</TabItem>
<TabItem value="Node" label="Node">

```js
const nearAPI = require("near-api-js");
```

</TabItem>
</Tabs>

## Key Store {#key-store}

If you sign transactions, you need to create a _Key Store_. In the browser, the LocalStorage KeyStore will be used once you ask your user to Sign In with the Wallet.

<Tabs>
<TabItem value="browser" label="Using Browser" default>

```js
// creates keyStore using private key in local storage

const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
```


[<span class="typedoc-icon typedoc-icon-class"></span> Class `BrowserLocalStorageKeyStore`](https://near.github.io/near-api-js/classes/key_stores_browser_local_storage_key_store.BrowserLocalStorageKeyStore)

</TabItem>
<TabItem value="dir" label="Using Credentials Directory">

```js
// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/tools/cli#near-login

const { keyStores } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `UnencryptedFileSystemKeyStore`](https://near.github.io/near-api-js/classes/key_stores_unencrypted_file_system_keystore.UnencryptedFileSystemKeyStore)

</TabItem>
<TabItem value="file" label="Using a File">

```js
// creates keyStore from a provided file
// you will need to pass the location of the .json key pair

const { KeyPair, keyStores } = require("near-api-js");
const fs = require("fs");
const homedir = require("os").homedir();

const ACCOUNT_ID = "near-example.testnet";  // NEAR account tied to the keyPair
const NETWORK_ID = "testnet";
// path to your custom keyPair location (ex. function access key for example account)
const KEY_PATH = '/.near-credentials/near-example-testnet/get_token_price.json';

const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
const myKeyStore = new keyStores.InMemoryKeyStore();
myKeyStore.setKey(NETWORK_ID, ACCOUNT_ID, KeyPair.fromString(credentials.private_key));
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/key_stores_in_memory_key_store.InMemoryKeyStore)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/utils_key_pair.KeyPair)

</TabItem>
<TabItem value="key" label="Using a private key string">

```js
// creates keyStore from a private key string
// you can define your key here or use an environment variable

const { keyStores, KeyPair } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY =
  "by8kdJoJHu7uUkKfoaLd2J2Dp1q1TigeWMG123pHdu9UREqPcshCM223kWadm";
// creates a public / private key pair using the provided private key
const keyPair = KeyPair.fromString(PRIVATE_KEY);
// adds the keyPair you created to keyStore
await myKeyStore.setKey("testnet", "example-account.testnet", keyPair);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/key_stores_in_memory_key_store.InMemoryKeyStore)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/utils_key_pair.KeyPair)

</TabItem>
</Tabs>

## Connecting to NEAR {#connect}

The object returned from `connect` is your entry-point for all commands in the API.
To sign a transaction you'll need a [`KeyStore`](#key-store) to create a connection.

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="mainnet" label="MainNet">

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "mainnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="betanet" label="BetaNet">

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "betanet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.betanet.near.org",
  walletUrl: "https://wallet.betanet.near.org",
  helperUrl: "https://helper.betanet.near.org",
  explorerUrl: "https://explorer.betanet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="localnet" label="LocalNet">

```js
const { connect } = nearAPI;
const connectionConfig = {
  networkId: "local",
  nodeUrl: "http://localhost:3030",
  walletUrl: "http://localhost:4000/wallet",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
</Tabs>

[<span class="typedoc-icon typedoc-icon-module"></span> Module `connect`](https://near.github.io/near-api-js/modules/connect)
