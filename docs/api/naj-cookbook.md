---
id: naj-cookbook
title: API JS Cookbook
sidebar_label: Cookbook
---

> Common use cases for [`near-api-js`](https://github.com/near/near-api-js). Reference repository can be found [ [here](http://github.com/near-examples/cookbook) ]

## Access Key Rotation

> [Access keys](/docs/concepts/account#access-keys) are unique on the NEAR platform as you can have as many keys as you like. Sometimes users practice "rotating keys" or adding new keys and deleting old ones. Here are snippets for creating and deleting access keys.

### Create New Full Access Key

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStores, connect } = nearAPI;
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "example.testnet";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

createFullAccessKey(ACCOUNT_ID);

async function createFullAccessKey(accountId) {
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  const near = await connect(config);
  const account = await near.account(accountId);
  await keyStore.setKey(config.networkId, publicKey, keyPair);
  await account.addKey(publicKey);
}
```

### Create Function Access Key

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStore, connect } = nearAPI;
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "example.testnet";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

addFunctionAccessKey(ACCOUNT_ID);

async function addFunctionAccessKey(accountId) {
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  const near = await connect(config);
  const account = await near.account(accountId);
  await keyStore.setKey(config.networkId, publicKey, keyPair);
  await account.addKey(
    publicKey, // public key for new account
    "example-account.testnet", // contract this key is allowed to call (optional)
    "example_method", // methods this key is allowed to call (optional)
    "2500000000000" // allowance key can use to call methods (optional)
  );
}
```

### Delete Access Key

```js
const nearAPI = require("near-api-js");
const { KeyPair, keyStore, connect } = nearAPI;

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "example.testnet";
const PUBLIC_KEY = "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  networkId: "testnet",
  keyStore,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

deleteAccessKey(ACCOUNT_ID, PUBLIC_KEY);

async function deleteAccessKey(accountId, publicKey) {
  const near = await connect(config);
  const account = await near.account(accountId);
  await account.deleteKey(publicKey);
}
```

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
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
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
    "Please run command in the following format: \n node create-account CREATOR_ACCOUNT.testnet NEW_ACCOUNT.testnet AMOUNT"
  );
  process.exit(1);
}

createAccount(process.argv[2], process.argv[3], process.argv[4]);

async function createAccount(creatorAccountId, newAccountId, amount) {
  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(config.networkId, newAccountId, keyPair);

  return await creatorAccount.functionCall({
    contractId: "testnet",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
}
```

<!--mainnet-->

```js
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";

const config = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
};

if (process.argv.length !== 5) {
  console.info(
    "Please run command in the following format: \n node create-account CREATOR_ACCOUNT.near NEW_ACCOUNT.near AMOUNT"
  );
  process.exit(1);
}

createAccount(process.argv[2], process.argv[3], process.argv[4]);

async function createAccount(creatorAccountId, newAccountId, amount) {
  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  await keyStore.setKey(config.networkId, newAccountId, keyPair);

  return await creatorAccount.functionCall({
    contractId: "near",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    gas: "300000000000000",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Read State without an Account

```js
const nearAPI = require("near-api-js");
const provider = new nearAPI.providers.JsonRpcProvider(
  "https://rpc.testnet.near.org"
);

getState();

async function getState() {
  const rawResult = await provider.query(
    `call/guest-book.testnet/getMessages`,
    "AQ4" // Base 58 of '{}'
  );
  const res = JSON.parse(
    rawResult.result.map((x) => String.fromCharCode(x)).join("")
  );
  console.log(res);
}
```

## Batch Transactions

```js
const fs = require("fs");
const nearAPI = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_NAME = "contract.example.testnet";
const WHITELIST_ACCOUNT_ID = "lockup-whitelist.example.testnet";
const WASM_PATH = "./wasm-files/staking_pool_factory.wasm";
const TRANSFER_AMOUNT = "50000000000000000000000000";

const config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
};

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
  credentialsPath
);

sendTxs();

async function sendTxs() {
  const near = await nearAPI.connect({ ...config, keyStore });
  const account = await near.account("example.testnet");
  const newArgs = { staking_pool_whitelist_account_id: WHITELIST_ACCOUNT_ID };
  const result = await account.signAndSendTransaction({
    receiverId: CONTRACT_NAME,
    actions: [
      nearAPI.transactions.createAccount(),
      nearAPI.transactions.transfer(TRANSFER_AMOUNT),
      nearAPI.transactions.deployContract(fs.readFileSync(WASM_PATH)),
      nearAPI.transactions.functionCall(
        "new",
        Buffer.from(JSON.stringify(newArgs)),
        10000000000000,
        "0"
      ),
    ],
  });

  console.log(result);
}
```

## Recent Transaction Info

```js

```
