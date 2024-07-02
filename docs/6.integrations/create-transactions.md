---
id: create-transactions
title: Create Transactions
sidebar_label: Create a Transaction
---

To construct & process transactions you will need our API JavaScript library: [`near-api-js`](/build/web3-apps/integrate-contracts). There are many ways to create transactions but for this example we'll show you two ways to create a simple token transfer transaction.

- [HIGH LEVEL](#high-level----create-a-transaction) - _easiest way to create a transaction_
- [LOW LEVEL](#low-level----create-a-transaction) - _performs the exact same transaction as above, but deconstructs the entire process for those curious about each step_

At the core, all transactions require the following:

- `signerId` _(account ID of the transaction originator)_
- `signerPublicKey`
- `receiverId` _(account ID of the transaction recipient)_
- `nonceForPublicKey` _(each time a key is used the nonce value should be incremented by 1)_
- `actions` _( [[click here]](/concepts/protocol/transactions#action) for supported arguments)_
- `blockHash` _(a current block hash (within 24hrs) to prove the transaction was recently created)_

See [Transaction Class](https://near.github.io/near-api-js/classes/near_api_js.transaction.Transaction.html) for a more in depth outline.

---

## HIGH LEVEL -- Create a transaction

### Setup

1. Clone the [transaction-examples](https://github.com/near-examples/transaction-examples) repository by running:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. Follow [setup instructions](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)

### Imports

In [`send-tokens-easy.js`](https://github.com/near-examples/transaction-examples/blob/9e999253aafa2c3e3b537810a0b8ce7596c3506c/send-tokens-easy.js#L1-L5) we use two dependencies:

1. [NEAR API JavaScript library](https://github.com/near/near-api-js)
2. [`dotenv`](https://www.npmjs.com/package/dotenv) (used to load environment variables for private key)

```js
const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils } = nearAPI;
require("dotenv").config();
```

The second line above deconstructs several utilities from nearAPI that you will use to interact with the blockchain.

- `connect` - create a connection to NEAR passing configuration variables
- `KeyPair` - creates a keyPair from the private key you'll provide in an `.env` file
- `keyStores` - stores the keyPair that you will create from the private key and used to sign Transactions
- `utils` - used to format NEAR amounts

### Accounts & Network

Next, you'll need to enter the `accountId` of the `sender` and `receiver`, as well as the `networkId` (`betanet`, `testnet`, or `mainnet`).

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

### Formatting Token Amounts

When sending NEAR tokens (Ⓝ) during a transaction, the amount needs to be converted into [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ or (10^-24).

- To perform this you will use the [`near-api-js`](https://github.com/near/near-api-js) method [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63) (located in `utils/format`)

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

### Create a Key Store

In order to sign transactions you will need to create a "Key Store" that will hold a [full access key](/concepts/protocol/access-keys#full-access-keys) to sign your transactions. There are several ways to accomplish this, but for this example we will use a private key stored in either an `.env` file in your project or an environment variable exported globally.

- If you created the account using [`near-cli`](/tools/near-cli) or ran [`near login`](/tools/near-cli#for-accounts) in your terminal, your private key can be found in a `.json` file located in `/HOME/.near-credentials`.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - In your browser's dev tools... `Application` >> `Storage` >> `Local Storage`

```js
// sets up an empty keyStore object in memory using near-api-js
const keyStore = new keyStores.InMemoryKeyStore();
// creates a keyPair from the private key provided in your .env file
const keyPair = KeyPair.fromString(process.env.SENDER_PRIVATE_KEY);
// adds the key you just created to your keyStore which can hold multiple keys (must be inside an async function)
await keyStore.setKey(networkId, sender, keyPair);
```

### Setting up a connection to NEAR

Now create a connection to NEAR using a configuration object that will contain your `networkId` setup earlier as well as your `keyStore`.

```js
// configuration used to connect to NEAR
const prefix = (networkId === "testnet") ? "testnet" : "www";

const config = {
  networkId,
  keyStore,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: `https://wallet.${networkId}.near.org`,
  helperUrl: `https://helper.${networkId}.near.org`,
  explorerUrl: `https://${prefix}.nearblocks.io`,
};

// connect to NEAR! :)
const near = await connect(config);
// create a NEAR account object
const senderAccount = await near.account(sender);
```

You'll notice the last line uses your NEAR connection to create a `senderAccount` object that you'll use to perform the transaction.

### Create, Sign, & Send Transaction

Now that everything is setup, creating the transaction is a single line of code.

```js
const result = await senderAccount.sendMoney(receiver, amount);
```

This simple command constructs, signs, and sends a token transfer transaction on the NEAR blockchain. There is no need to create a `result` variable aside from inspecting the response details from your transaction and even create a link to [NearBlocks Explorer](https://testnet.nearblocks.io/) to view a GUI version of the transaction details.

---

## LOW LEVEL -- Create a Transaction

### Setup

1. Clone the [transaction-examples](https://github.com/near-examples/transaction-examples) repository by running:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. Follow [setup instructions](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)

---

### Imports

In [`send-tokens-deconstructed.js`](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L1-L4) we use three dependencies:

1. [NEAR API JavaScript library](https://github.com/near/near-api-js)
2. [`js-sha256`](https://www.npmjs.com/package/js-sha256) (cryptographic hashing algorithm)
3. [`dotenv`](https://www.npmjs.com/package/dotenv) (used to load environment variables)

```js
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");
require("dotenv").config();
```

---

### Accounts & Network

Next, you'll need to enter the `accountId` of the `sender` and `receiver`, as well as the `networkId` (`betanet`, `testnet`, or `mainnet`).

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

---

### Formatting Token Amounts

When sending NEAR tokens (Ⓝ) during a transaction, the amount needs to be converted into [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ or (10^-24).

- To perform this you will use the [`near-api-js`](https://github.com/near/near-api-js) method [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63) (located in `utils/format`)

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

---

### Setting up a connection to NEAR

In this example, we will create a NEAR RPC `provider` that allows us to interact with the chain via [RPC endpoints](/api/rpc/introduction).

```js
const provider = new nearAPI.providers.JsonRpcProvider(
  `https://rpc.${networkId}.near.org`
);
```

---

### Access Keys

To sign a transaction to send NEAR Ⓝ, we will need a `FullAccess` key to the sender's account.

- If you created the account using [`near-cli`](/tools/near-cli) or ran [`near login`](/tools/near-cli#for-accounts) in your terminal, your private key can be found in a `.json` file located in `/HOME/.near-credentials`.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - In your browser's dev tools... `Application` >> `Storage` >> `Local Storage`

Once you have access to the private key of the sender's account, create an environment variable `SENDER_PRIVATE_KEY` or hard code it as a string on [line 18](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L18) of `send-tokens.js`.

- With this `privateKey`, we can now construct a `keyPair` object to sign transactions.

```js
const privateKey = process.env.SENDER_PRIVATE_KEY;
const keyPair = nearAPI.KeyPair.fromString(privateKey);
```

---

### Transaction Requirements

As stated before, all transactions require six parts:

1. [`signerId`](#1-signerid)
2. [`signerPublicKey`](#2-signerpublickey)
3. [`receiverId`](#3-receiverid)
4. [`nonceForPublicKey`](#4-nonceforpublickey)
5. [`actions`](/concepts/protocol/transactions#action)
6. [`blockHash`](#6-blockhash)

### 1 `signerId`

- The `signerId` is the account ID of the transaction originator.
- This value is passed as a string (ex. `'example.testnet'` or `'bob.near'`)

### 2 `signerPublicKey`

- The `signerPublicKey` is required to be an object with two key value pairs: `keyType` and `data`.

```js
PublicKey = {
  keyType: 0,
  data: Uint8Array(32)[
    (190,
    150,
    152,
    145,
    232,
    248,
    128,
    151,
    167,
    165,
    128,
    46,
    20,
    231,
    103,
    142,
    39,
    56,
    152,
    46,
    135,
    1,
    161,
    180,
    94,
    212,
    195,
    201,
    73,
    190,
    70,
    242)
  ],
};
```

- This can be constructed by calling `getPublicKey()` using the `keyPair` we [setup earlier](#access-keys).

```js
const publicKey = keyPair.getPublicKey();
```

### 3 `receiverId`

- The `receiverId` is the account ID of the transaction recipient.
- This value is passed as a string (ex. `'example.testnet'` or `'bob.near'`)
- The certain cases, the `signerId` and the `receiverId` can be the same account.

### 4 `nonceForPublicKey`

- A unique number or `nonce` is required for each transaction signed with an access key.
- To ensure a unique number is created for each transaction, the current `nonce` should be queried and then incremented by 1.
- Current nonce can be retrieved using the `provider` we [created earlier](#setting-up-a-connection-to-near).

```js
const accessKey = await provider.query(
  `access_key/${sender}/${publicKey.toString()}`,
  ""
);
```

- now we can create a unique number for our transaction by incrementing the current `nonce`.

```js
const nonce = ++accessKey.nonce;
```

### 5 `actions`

- There are currently eight supported `Action` types. [[see here]](/concepts/protocol/transactions#action)
- For this example, we are using `Transfer`
- This transfer action can be created using the [imported `nearAPI` object](#imports) and the [formatted Ⓝ amount](#formatting-token-amounts) created earlier.

```js
const actions = [nearAPI.transactions.transfer(amount)];
```

[[click here]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L70-L72) to view source for `transfer()`.

### 6 `blockHash`

- Each transaction requires a current block hash (within 24hrs) to prove that the transaction was created recently.
- Hash must be converted to an array of bytes using the `base_decode` method found in [`nearAPI`](#imports).

```js
const recentBlockHash = nearAPI.utils.serialize.base_decode(
  accessKey.block_hash
);
```

[[click here]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/serialize.ts#L16-L17) to view source for `base_decode()`.

---

### Constructing the Transaction

With all of our [required arguments](#transaction-requirements), we can construct the transaction.

- Using [`nearAPI`](#imports), we call on `createTransaction()` to perform this task.

```js
const transaction = nearAPI.transactions.createTransaction(
  sender,
  publicKey,
  receiver,
  nonce,
  actions,
  recentBlockHash
);
```

[[click here]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L95-L110) to view source code for the Transaction class

---

### Sign Transaction

Now that the transaction is created, we sign it before sending it to the NEAR blockchain. At the lowest level, there are four steps to this process.

1. Using [`nearAPI`](#imports), we call on `serialize()` to serialize the transaction in [Borsh](https://borsh.io/).

```js
const serializedTx = nearAPI.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA.Transaction,
  transaction
);
```

2. Hash the serialized transaction using a `sha256` cryptographic hashing algorithm.

```js
const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
```

3. Create a signature with the `keyPair`.

```js
const signature = keyPair.sign(serializedTxHash);
```

4. Construct the signed transaction using `near-api-js` [SignedTransaction class](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L112-L123).

```js
const signedTransaction = new nearAPI.transactions.SignedTransaction({
  transaction,
  signature: new nearAPI.transactions.Signature({
    keyType: transaction.publicKey.keyType,
    data: signature.signature,
  }),
});
```

### Send Transaction

Final step is to encode and send the transaction.

- First we serialize transaction into [Borsh](https://borsh.io/), and store the result as `signedSerializedTx`. _(required for all transactions)_
- Then we send the transaction via [RPC call](/api/rpc/introduction) using the `sendJsonRpc()` method nested inside [`near`](#setting-up-connection-to-near).

```js
// encodes transaction to serialized Borsh (required for all transactions)
const signedSerializedTx = signedTransaction.encode();
// sends transaction to NEAR blockchain via JSON RPC call and records the result
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

### Transaction Results

Detailed transaction results of the transaction are returned in the following format:

```bash
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'sender.testnet',
    public_key: 'ed25519:8RazSLHvzj4TBSKGUo5appP7wVeqZNQYjP9hvhF4ZKS2',
    nonce: 57,
    receiver_id: 'receiver.testnet',
    actions: [ [Object] ],
    signature: 'ed25519:2sK53w6hybSxX7qWShXz6xKnjnYRUW7Co3evEaaggNW6pGSCNPvx7urY4akwnzAbxZGwsKjx8dcVm73qbitntJjz',
    hash: 'EgGzB73eFxCwZRGcEyCKedLjvvgxhDXcUtq21SqAh79j'
  },
  transaction_outcome: {
    proof: [ [Object] ],
    block_hash: 'J6cFDzAFkuknHMCEYW2uPQXDvCfSndkJmADVEWJbtTwV',
    id: 'EgGzB73eFxCwZRGcEyCKedLjvvgxhDXcUtq21SqAh79j',
    outcome: {
      logs: [],
      receipt_ids: [Array],
      gas_burnt: 223182562500,
      tokens_burnt: '22318256250000000000',
      executor_id: 'sender.testnet',
      status: [Object]
    }
  },
  receipts_outcome: [
    {
      proof: [Array],
      block_hash: 'FSS7UzTpMr4mUm6aw8MmzP6Q7wnQs35VS8vYm1R461dM',
      id: '3LjBxe2jq1s7XEPrYxihp4rPVdyHAbYfkcdJjUEVijhJ',
      outcome: [Object]
    },
    {
      proof: [Array],
      block_hash: '4XBio5dM5UGYjJgzZjgckfVgMZ9uKGbTkt8zZi5webxw',
      id: 'AXFA4kwiYfruKQ4LkD1qZA8P7HoAvtFwGqwQYdWtWNaW',
      outcome: [Object]
    }
  ]
}
Transaction Results:  {
  signer_id: 'sender.testnet',
  public_key: 'ed25519:8RazSLHvzj4TBSKGUo5appP7wVeqZNQYjP9hvhF4ZKS2',
  nonce: 57,
  receiver_id: 'receiver.testnet',
  actions: [ { Transfer: [Object] } ],
  signature: 'ed25519:2sK53w6hybSxX7qWShXz6xKnjnYRUW7Co3evEaaggNW6pGSCNPvx7urY4akwnzAbxZGwsKjx8dcVm73qbitntJjz',
  hash: 'EgGzB73eFxCwZRGcEyCKedLjvvgxhDXcUtq21SqAh79j'
}
```

For detailed information on transaction receipts [[click here]](https://nomicon.io/RuntimeSpec/Receipts.html)

- To view the transaction in [NearBlocks Explorer](https://testnet.nearblocks.io/), enter the `hash` located under `transaction` / `Transaction Results`.
- In addition, you can create a link in JS using the `networkId` and `result.transaction.hash`.

```js
const prefix = (networkId === "testnet") ? "testnet." : "";
const transactionLink = `https://${prefix}nearblocks.io/txns/${result.transaction.hash}`;
```

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"><h8>Ask it on StackOverflow!</h8></a>
:::

Happy Coding! 🚀
