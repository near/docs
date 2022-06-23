---
id: cookbook
title: Common Use Cases
sidebar_label: Cookbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Here we present a set of receipts that you can readily use to
solve common case scenarios.

## Overview {#overview}

| Name                                                      | Description                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **ACCOUNTS**                                              |                                                                                             |
| [Create Account](#create-account)                         | Create [NEAR accounts](/docs/concepts/account) without using NEAR Wallet.                   |
| [Access Key Rotation](#access-key-rotation)               | Create and delete [access keys](/docs/concepts/account#access-keys) for added security.     |
| **TRANSACTIONS**                                          |                                                                                             |
| [Get Transaction Status](#get-transaction-status)         | Gets transaction status using a tx hash and associated account/contract ID.                 |
| [Recent Transaction Details](#recent-transaction-details) | Get recent transaction details without using an [indexing](/docs/concepts/indexer) service. |
| [Batch Transactions](#batch-transactions)                 | Sign and send multiple [transactions](/docs/concepts/transaction).                          |
| **UTILS**                                                 |                                                                                             |
| [Deploy Contract](#deploy-contract)                       | Deploys a smart contract using a pre-compiled WASM file.                                    |
| [Calculate Gas](#calculate-gas)                           | Calculate [gas burnt](/docs/concepts/gas) from any contract call.                           |
| [Read State w/o Account](#read-state-without-an-account)  | Read state of a contract without instantiating an account.                                  |
| [Wrap & Unwrap NEAR](#wrap-and-unwrap-near)               | Wrap and unwrap NEAR using the `wrap.near` smart contract.                                  |
| [Verify Signature](#verify-signature)                     | Verify a key pair signature.                                                                |

---

## Accounts {#accounts}

### Create Account {#create-account}

> Programmatically create NEAR accounts without using NEAR Wallet.

<Tabs>
<TabItem value="testnet" label="testnet" default>

```js
const HELP = `Please run this script in the following format:
    node create-testnet-account.js CREATOR_ACCOUNT.testnet NEW_ACCOUNT.testnet AMOUNT
`;

const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

if (process.argv.length !== 5) {
  console.info(HELP);
  process.exit(1);
}

createAccount(process.argv[2], process.argv[3], process.argv[4]);

async function createAccount(creatorAccountId, newAccountId, amount) {
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

</TabItem>
<TabItem value="mainnet" label="mainnet">

```js
const HELP = `Please run this script in the following format:
  node create-mainnet-account.js CREATOR_ACCOUNT.near NEW_ACCOUNT.near AMOUNT"
`;

const { connect, KeyPair, keyStores, utils } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
};

if (process.argv.length !== 5) {
  console.info(HELP);
  process.exit(1);
}

createAccount(process.argv[2], process.argv[3], process.argv[4]);

async function createAccount(creatorAccountId, newAccountId, amount) {
  const near = await connect(config);
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

</TabItem>
</Tabs>

---

### Access Key Rotation {#access-key-rotation}

> [Access keys](/docs/concepts/account#access-keys) are unique on the NEAR platform as you can have as many keys as you like. Sometimes users practice "rotating keys" or adding new keys and deleting old ones. Here are snippets for creating and deleting access keys.

#### Create New Full Access Key {#create-new-full-access-key}

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

#### Create Function Access Key {#create-function-access-key}

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

#### Delete Access Key {#delete-access-key}

> Deletes an access key by passing an `accountId` and `publicKey` for the key to be deleted.

```js
const { keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// NOTE: replace "example.testnet" with your accountId
const ACCOUNT_ID = "example.testnet";
// NOTE: replace this PK with the one that you are trying to delete
const PUBLIC_KEY = "ed25519:4yLYjwC3Rd8EkhKwVPoAdy6EUcCVSz2ZixFtsCeuBEZD";
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

<blockquote class="lesson">
<strong>Is there a way to pass near-api-js a private key via environment variable?</strong><br /><br />
  
Yes, here it is in Node.js

```ts
const keypair = nearApi.utils.key_pair.KeyPair.fromString(
  process.env.PRIVATE_KEY
);
```
</blockquote>

---

## Transactions {#transactions}

### Get Transaction Status {#get-transaction-status}

> Demonstrates how to get the status of a transaction based on transaction hash and associated account/contract ID.

```js
const { providers } = require("near-api-js");

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  "https://archival-rpc.testnet.near.org"
);

const TX_HASH = "9av2U6cova7LZPA9NPij6CTUrpBbgPG6LKVkyhcCqtk3";
// account ID associated with the transaction
const ACCOUNT_ID = "sender.testnet";

getState(TX_HASH, ACCOUNT_ID);

async function getState(txHash, accountId) {
  const result = await provider.txStatus(txHash, accountId);
  console.log("Result: ", result);
}
```

### Recent Transaction Details {#recent-transaction-details}

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

// NOTE: we're using the archival rpc to look back in time for a specific set
// of transactions. For a full list of what nodes are available, visit:
// https://docs.near.org/docs/develop/node/intro/node-types
const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://archival-rpc.testnet.near.org",
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
    chunkHashArr.map(chunk => near.connection.provider.chunk(chunk))
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

### Batch Transactions {#batch-transactions}

> Allows you to sign and send multiple transactions with a single call.

```js
const { connect, transactions, keyStores } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// NOTE: replace "example" with your accountId
const CONTRACT_NAME = "contract.example.testnet";
const WHITELIST_ACCOUNT_ID = "whitelisted-account.example.testnet";
const WASM_PATH = "../utils/wasm-files/staking_pool_factory.wasm";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

sendTransactions();

async function sendTransactions() {
    const near = await connect({ ...config, keyStore });
    const account = await near.account(CONTRACT_NAME);
    const newArgs = { staking_pool_whitelist_account_id: WHITELIST_ACCOUNT_ID };
    const result = await account.signAndSendTransaction({
        receiverId: CONTRACT_NAME,
        actions: [
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

## Utils {#utils}

### Deploy Contract {#deploy-contract}

> Deploy a smart contract using a pre-compiled WASM file.

```js
const { keyStores, connect } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "near-example.testnet";
const WASM_PATH = "./wasm-files/status_message.wasm";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

deployContract(ACCOUNT_ID, WASM_PATH);

async function deployContract(accountId, wasmPath) {
  const near = await connect(config);
  const account = await near.account(accountId);
  const result = await account.deployContract(fs.readFileSync(wasmPath));
  console.log(result);
}
```

### Calculate Gas {#calculate-gas}

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

### Read State without an Account {#read-state-without-an-account}

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

### Wrap and Unwrap NEAR {#wrap-and-unwrap-near}

> Wrap and unwrap NEAR using the wrap.near smart contract.

```js
const HELP = `To convert N $NEAR to wNEAR,  run this script in the following format:
    node wrap-near.js YOU.near N
Note: runs on mainnet!`;

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

if (process.argv.length !== 4) {
  console.info(HELP);
  process.exit(1);
}

wrapNear(process.argv[2], process.argv[3]);

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
        utils.format.parseNearAmount('0.00125') // account creation costs 0.00125 NEAR for storage
      )
    );
  }

  // send batched transaction
  return account.signAndSendTransaction({
    receiverId: WRAP_NEAR_CONTRACT_ID,
    actions,
  });
}
```

### Verify Signature {#verify-signature}

> Verify a key pair signature.

```js
const { keyStores } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

const ACCOUNT_ID = "near-example.testnet";
const CREDENTIALS_DIR = ".near-credentials";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

verifySignature();

async function verifySignature() {
    const keyPair = await keyStore.getKey(config.networkId, ACCOUNT_ID);
    const msg = Buffer.from("hi");

    const { signature } = keyPair.sign(msg);

    const isValid = keyPair.verify(msg, signature);

    console.log("Signature Valid?:", isValid);

    return isValid;
}
```
