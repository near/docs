---
id: naj-cookbook
title: API JS Cookbook
sidebar_label: Cookbook
---

> Common usecases for `near-api-js`

## Access Key Rotation

> [Access keys](/docs/concepts/account#access-keys) are unique on the NEAR platform as you can have as many keys as you like. Sometimes users practice "rotating keys" or adding new keys and deleting old ones. Here are snippets for creating and deleting access keys.

### Create New Full Access Key

<!--DOCUSAURUS_CODE_TABS-->
<!--Browser-->

```js
import * as nearAPI from "near-api-js";
const { KeyPair, keyStore, connect } = nearAPI;

const keyPair = KeyPair.fromRandom("ed25519");
const publicKey = keyPair.publicKey.toString();
const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.addKey(publicKey);
}

main();
```

<!--Node-->

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStore, connect } = nearAPI;

const keyPair = KeyPair.fromRandom("ed25519");
const publicKey = keyPair.publicKey.toString();
const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.addKey(publicKey);
}

main();
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Create Function Access Key

<!--DOCUSAURUS_CODE_TABS-->
<!--Browser-->

```js
import * as nearAPI from "near-api-js";
const { KeyPair, keyStore, connect } = nearAPI;

const keyPair = KeyPair.fromRandom("ed25519");
const publicKey = keyPair.publicKey.toString();
const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.addKey(
    publicKey, // public key for new account
    "example-account.testnet", // contract this key is allowed to call (optional)
    "example_method", // methods this key is allowed to call (optional)
    "2500000000000" // allowance key can use to call methods (optional)
  );
}

main();
```

<!--Node-->

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStore, connect } = nearAPI;

const keyPair = KeyPair.fromRandom("ed25519");
const publicKey = keyPair.publicKey.toString();
const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.addKey(
    publicKey, // public key for new account
    "example-account.testnet", // contract this key is allowed to call (optional)
    "example_method", // methods this key is allowed to call (optional)
    "2500000000000" // allowance key can use to call methods (optional)
  );
}

main();
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Delete Access Key

<!--DOCUSAURUS_CODE_TABS-->
<!--Browser-->

```js
import * as nearAPI from "near-api-js";
const { keyStore, connect } = nearAPI;

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
}

main();
```

<!--Node-->

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStore, connect } = nearAPI;

const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

async function main() {
  const near = await connect(config);
  const account = await near.account("example-account.testnet");
  await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
}

main();
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Calculate Gas

> `calculateGas()` returns `gas_burnt` and `tokens_burnt` from a contract function call by looping through the `result` receipts. 

```js
async function calculateGas(contract, contractMethod, args) {
  let gasBurnt = [];
  let tokensBurnt = [];
  const result = await account.functionCall(
    contract,
    contractMethod,
    args,
    MAX_GAS
  );
  gasBurnt.push(result.transaction_outcome.outcome.gas_burnt);
  tokensBurnt.push(formatNEAR(result.transaction_outcome.outcome.tokens_burnt));
  for (let i = 0; i < result.receipts_outcome.length; i++) {
    gasBurnt.push(result.receipts_outcome[i].outcome.gas_burnt);
    tokensBurnt.push(
      formatNEAR(result.receipts_outcome[i].outcome.tokens_burnt)
    );
  }
  return {
    gas_burnt: gasBurnt.reduce((acc, cur) => acc + cur, 0),
    tokens_burnt: tokensBurnt.reduce((acc, curr) => acc + curr, 0),
  };
}
```

## Account Creation

## Recent Transaction Info

## Read State without an Account
