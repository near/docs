---
id: naj-cookbook
title: API JS Cookbook
sidebar_label: Cookbook
---

> Common use cases for `near-api-js`.

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
async function calculateGas(
  account,
  contract,
  contractMethod,
  args,
  depositAmount
) {
  let gasBurnt = [];
  let tokensBurnt = [];
  const result = await account.functionCall({
    contractId: contract,
    methodName: contractMethod,
    args: args,
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(depositAmount),
  });
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
    tokens_burnt: tokensBurnt.reduce((acc, cur) => acc + cur, 0),
  };
}
```

## Account Creation

<!--DOCUSAURUS_CODE_TABS-->
<!--testnet-->

```js
const { connect, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";

const config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
};

if (process.argv.length !== 5) {
  console.info(
    " Please run command in the following format: \n node JS_FILENAME EXISTING_ACCOUNT.testnet NEW_ACCOUNT.testnet ED25519_PUBLIC_KEY"
  );
  process.exit(1);
}

createAccount(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5]
);

async function createAccount(
  creatorAccountId,
  newAccountId,
  newPublicKey,
  amount
) {
  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);

  return await creatorAccount.functionCall({
    contractId: "testnet",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: newPublicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
}
```

<!--mainnet-->

```js
const { connect, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";

const config = {
  networkId: "near",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
};

if (process.argv.length !== 6) {
  console.info(
    " Please run command in the following format: \n node JS_FILENAME EXISTING_ACCOUNT.near NEW_ACCOUNT.near ED25519_PUBLIC_KEY\n It will create an account with 3 Ⓝ if it's available"
  );
  process.exit(1);
}

createAccount(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5]
);

async function createAccount(
  creatorAccountId,
  newAccountId,
  newPublicKey,
  amount
) {
  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);

  return await creatorAccount.functionCall({
    contractId: "testnet",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: newPublicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Recent Transaction Info

## Read State without an Account
