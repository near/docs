---
id: naj-cookbook
title: NEAR-API-JS Cookbook
sidebar_label: Cookbook
---

> Common use cases for [`near-api-js`](https://github.com/near/near-api-js).

<img style="float: left; max-width: 25px; margin-right: 4px;" src="../assets/icons/GitHub.png">

[ [GitHub reference repository](http://github.com/near-examples/cookbook) ] - All examples below can be found in this reference repo for ease of use.

---

## Overview

| Name                                                      | Description                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **ACCOUNTS**                                              |                                                                                             |
| [Create Account](#create-account)                         | Create [NEAR accounts](/docs/concepts/account) without using NEAR Wallet.                   |
| [Access Key Rotation](#access-key-rotation)               | Create and delete [access keys](/docs/concepts/account#access-keys) for added security.     |
| **TRANSACTIONS**                                          |                                                                                             |
| [Recent Transaction Details](#recent-transaction-details) | Get recent transaction details without using an [indexing](/docs/concepts/indexer) service. |
| [Batch Transactions](#batch-transactions)                 | Sign and send multiple [transactions](/docs/concepts/transaction).                          |
| **UTILS**                                                 |                                                                                             |
| [Calculate Gas](#calculate-gas)                           | Calculate [gas burnt](/docs/concepts/gas) from any contract call.                           |
| [Read State w/o Account](#read-state-without-an-account)  | Read state of a contract without instantiating an account.                                  |
| [Wrap & Unwrap NEAR](#wrap-and-unwrap-near)                   | Wrap and unwrap NEAR using the `wrap.near` smart contract.                                  |

---

## Accounts

### Create Account

> Programmatically create NEAR accounts without using NEAR Wallet.

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

---

### Access Key Rotation

> [Access keys](/docs/concepts/account#access-keys) are unique on the NEAR platform as you can have as many keys as you like. Sometimes users practice "rotating keys" or adding new keys and deleting old ones. Here are snippets for creating and deleting access keys.

#### Create New Full Access Key

> Creates a new [full access key](/docs/concepts/account#full-access-keys) for a given account.

```js
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "example.testnet";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
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

#### Create Function Access Key

> Creates a [function access key](/docs/concepts/account#function-call-keys) for a given account/contract.

```js
const { KeyPair, keyStore, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_ID = "example.testnet";
const AUTHORIZED_CONTRACT = "example-contract.testnet";
const METHODS = ["example_method"];
const ALLOWANCE = "2500000000000";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

addFunctionAccessKey(CONTRACT_ID, AUTHORIZED_CONTRACT, METHODS, ALLOWANCE);

async function addFunctionAccessKey(
  contractId,
  authorizedContract,
  methods,
  allowance
) {
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.publicKey.toString();
  const near = await connect(config);
  const account = await near.account(contractId);
  await keyStore.setKey(config.networkId, publicKey, keyPair);
  await account.addKey(publicKey, authorizedContract, methods, allowance);
}
```

#### Delete Access Key

> Deletes an access key by passing an `accountId` and `publicKey` for the key to be deleted.

```js
const { KeyPair, keyStore, connect } = require("near-api-js");

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "example.testnet";
const PUBLIC_KEY = "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

deleteAccessKey(ACCOUNT_ID, PUBLIC_KEY);

async function deleteAccessKey(accountId, publicKey) {
  const near = await connect(config);
  const account = await near.account(accountId);
  await account.deleteKey(publicKey);
}
```

---

## Transactions

### Recent Transaction Details

> Allows you to inspect chunks and transaction details for recent blocks without having to use an [indexer](/docs/concepts/indexer).

```js
const { connect, keyStores } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// block hash of query start (oldest block)
const START_BLOCK_HASH = "GZ8vKdcgsavkEndkDWHCjuhyqSR2TGnp9VDZbTzd6ufG";
// block hash of query end (newest block)
const END_BLOCK_HASH = "8aEcKhF7N1Jyw84e6vHW6Hzp3Ep7mSXJ6Rvnsy5qGJPF";
// contract ID or account ID you want to find transactions details for
const CONTRACT_ID = "relayer.ropsten.testnet";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

getTransactions(START_BLOCK_HASH, END_BLOCK_HASH, CONTRACT_ID);

async function getTransactions(startBlock, endBlock, accountId) {
  const near = await connect(config);

  // creates an array of block hashes for given range
  const blockArr = [];
  let blockHash = endBlock;
  do {
    const currentBlock = await getBlockByID(blockHash);
    blockArr.push(currentBlock.header.hash);
    blockHash = currentBlock.header.prev_hash;
    console.log("working...", blockHash);
  } while (blockHash !== startBlock);

  // returns block details based on hashes in array
  const blockDetails = await Promise.all(
    blockArr.map((blockId) =>
      near.connection.provider.block({
        blockId,
      })
    )
  );

  // returns an array of chunk hashes from block details
  const chunkHashArr = blockDetails.flatMap((block) =>
    block.chunks.map(({ chunk_hash }) => chunk_hash)
  );

  //returns chunk details based from the array of hashes

  const chunkDetails = await Promise.all(
    chunkHashArr.map((chunk) => {
      return near.connection.provider.chunk(chunk);
    })
  );

  // checks chunk details for transactions
  // if there are transactions in the chunk we
  // find ones associated with passed accountId
  const transactions = chunkDetails.flatMap((chunk) =>
    (chunk.transactions || []).filter((tx) => tx.signer_id === accountId)
  );

  //creates transaction links from matchingTxs
  const txsLinks = transactions.map((txs) => ({
    method: txs.actions[0].FunctionCall.method_name,
    link: `https://explorer.testnet.near.org/transactions/${txs.hash}`,
  }));
  console.log("MATCHING TRANSACTIONS: ", transactions);
  console.log("TRANSACTION LINKS: ", txsLinks);
}

async function getBlockByID(blockID) {
  const near = await connect(config);
  const blockInfoByHeight = await near.connection.provider.block({
    blockId: blockID,
  });
  return blockInfoByHeight;
}
```

---

### Batch Transactions

> Allows you to sign and send multiple transactions with a single call.

```js
const { connect, transactions } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_NAME = "contract.example.testnet";
const WHITELIST_ACCOUNT_ID = "lockup-whitelist.example.testnet";
const WASM_PATH = "./wasm-files/staking_pool_factory.wasm";
const TRANSFER_AMOUNT = "50000000000000000000000000";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
  credentialsPath
);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

sendTxs();

async function sendTxs() {
  const near = await connect(config);
  const account = await near.account("example.testnet");
  const newArgs = { staking_pool_whitelist_account_id: WHITELIST_ACCOUNT_ID };
  const result = await account.signAndSendTransaction({
    receiverId: CONTRACT_NAME,
    actions: [
      transactions.createAccount(),
      transactions.transfer(TRANSFER_AMOUNT),
      transactions.deployContract(fs.readFileSync(WASM_PATH)),
      transactions.functionCall(
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

---

## Utils

### Calculate Gas

> Calculate the gas and tokens burnt from any contract call by looping through the `result` receipts.

```js
const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();
const chalk = require("chalk");

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "near-example.testnet";
const CONTRACT_ID = "guest-book.testnet";
const METHOD_NAME = "addMessage";
const MAX_GAS = "300000000000000";
const ATTACHED_DEPOSIT = "0";

const args = {
  text: "Howdy!",
};

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

calculateGas(CONTRACT_ID, METHOD_NAME, args, ATTACHED_DEPOSIT);

async function calculateGas(contractId, methodName, args, depositAmount) {
  const near = await connect(config);
  const account = await near.account(ACCOUNT_ID);
  const result = await account.functionCall({
    contractId,
    methodName,
    args,
    gas: MAX_GAS,
    attachedDeposit: utils.format.parseNearAmount(depositAmount),
  });
  const { totalGasBurned, totalTokensBurned } = result.receipts_outcome.reduce(
    (acc, receipt) => {
      acc.totalGasBurned += receipt.outcome.gas_burnt;
      acc.totalTokensBurned += utils.format.formatNearAmount(
        receipt.outcome.tokens_burnt
      );
      return acc;
    },
    {
      totalGasBurned: result.transaction_outcome.outcome.gas_burnt,
      totalTokensBurned: utils.format.formatNearAmount(
        result.transaction_outcome.outcome.tokens_burnt
      ),
    }
  );

  console.log(
    chalk`{white ------------------------------------------------------------------------ }`
  );
  console.log(
    chalk`{bold.green RESULTS} {white for: [ {bold.blue ${METHOD_NAME}} ] called on contract: [ {bold.blue ${CONTRACT_ID}} ]}`
  );
  console.log(
    chalk`{white ------------------------------------------------------------------------ }`
  );
  console.log(
    chalk`{bold.white Gas Burnt}     {white |}  {bold.yellow ${totalGasBurned}}`
  );
  console.log(
    chalk`{bold.white Tokens Burnt}  {white |}  {bold.yellow ${totalTokensBurned}}`
  );
  console.log(
    chalk`{white ------------------------------------------------------------------------ }`
  );

  return {
    totalTokensBurned,
    totalGasBurned,
  };
}
```

### Read State without an Account

> Allows you to query the JSON RPC provider _without_ having to instantiate a NEAR account.

```js
// demonstrates how to query the state without setting
// up an account. (View methods only)
const { providers } = require("near-api-js");
//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");

getState();

async function getState() {
  const rawResult = await provider.query({
    request_type: "call_function",
    account_id: "guest-book.testnet",
    method_name: "getMessages",
    args_base64: "e30=",
    finality: "optimistic",
  });

  // format result
  const res = JSON.parse(Buffer.from(rawResult.result).toString());
  console.log(res);
}
```

### Wrap and Unwrap NEAR

> Wrap and unwrap NEAR using the wrap.near smart contract.

```js
const { connect, keyStores, transactions, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const WRAP_NEAR_CONTRACT_ID = "wrap.near";

const credentialsPath = path.join(homedir, ".near-credentials");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
};

// Wrap 1 NEAR to wNEAR
wrapNear("example.near", "1");

// Unwrap 1 wNEAR to NEAR
unwrapNear("example.near", "1");

async function wrapNear(accountId, wrapAmount) {
  const near = await connect(config);
  const account = await near.account(accountId);

  const actions = [
    transactions.functionCall(
      "near_deposit", // contract method to deposit NEAR for wNEAR
      {},
      30000000000000, // attached gas
      utils.format.parseNearAmount(wrapAmount) // amount of NEAR to deposit and wrap
    ),
  ];

  // check if storage has been paid (the account has a wNEAR account)
  const storage = await account.viewFunction(
    WRAP_NEAR_CONTRACT_ID,
    "storage_balance_of",
    { account_id: accountId }
  );

  // if storage hasn't been paid, pay for storage (create an account)
  if (!storage) {
    actions.unshift(
      transactions.functionCall(
        "storage_deposit", // method to create an account
        {},
        30000000000000, // attached gas
        1250000000000000000000 // account creation costs 0.00125 NEAR for storage
      )
    );
  }

  // send batched transaction
  return account.signAndSendTransaction({
    receiverId: WRAP_NEAR_CONTRACT_ID,
    actions,
  });
}

async function unwrapNear(accountId, unwrapAmount) {
  const near = await connect(config);
  const account = await near.account(accountId);

  return account.functionCall({
    contractId: WRAP_NEAR_CONTRACT_ID,
    methodName: "near_withdraw", // method to withdraw wNEAR for NEAR
    args: { amount: utils.format.parseNearAmount(unwrapAmount) },
    attachedDeposit: "1", // attach one yoctoNEAR
  });
}
```
