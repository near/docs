---
id: create-transactions
title: Create Transactions
sidebar_label: Create Transactions
---
To construct & process transactions you will need our API JavaScript library: [`near-api-js`](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction).

  - All transactions require the following:
      - `signerId` _(account ID of the transaction originator)_
      - `signerPublicKey`
      - `receiverId` _(account ID of the transaction recipient)_
      - `nonceForPublicKey` _(each time a key is used the nonce value should be incremented by 1)_
      - `actions` _( [[ click here ]](/docs/concepts/transaction#action) for supported arguments)_
      - `blockHash` _(a current block hash (within 12hrs) to prove the transaction was recently created)_

  See [Transaction Class](https://near.github.io/near-api-js/classes/_transaction_.transaction.html) for a more in depth outline.
___

# Create a "token transfer" transaction

## Setup
1) Clone the [transaction-examples](https://github.com/near-examples/transaction-examples) repository by running:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2) Follow [setup instructions](https://github.com/near-examples/transaction-examples/blob/master/readme.MD#prerequisites)
___

## Imports
In the first two lines of code in [`send-tokens.js`](https://github.com/near-examples/transaction-examples/blob/master/send-tokens.js#L1-L2), we:
  1) Importing the NEAR API JavaScript library
  2) Importing helper functions found in [`utils.js`](https://github.com/near-examples/transaction-examples/blob/master/utils.js)

```js
const nearAPI = require('near-api-js');
const { setupNear, formatAmount } = require('./utils');
```
___

## Setting up connection to NEAR
[`utils.js`](https://github.com/near-examples/transaction-examples/blob/master/utils.js) has two key components to connect and perform transactions on NEAR.
  1) Constructing a `keyStore` object using `.json` key pairs found in `/$HOME/near-credentials`.

```js
const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
  `${process.env.HOME}/.near-credentials`
  );
```
  2) `setupNear()` constructs an object that will allow us to connect and interact with the NEAR blockchain. 
  
  - This function takes an an argument of `env` for the network environment. 
  - `testnet` is setup by default, but you can modify this in [`send-tokens.js`](https://github.com/near-examples/transaction-examples/blob/master/send-tokens.js#L5).

```js
function setupNear(env){
  const config = getConfig(env);
  return new nearAPI.Near({
    keyStore: keyStore,
    networkId: config.networkId,
    nodeUrl: config.nodeUrl,
    walletUrl: config.walletUrl,
    helperUrl: config.helperUrl,
    explorerUrl: config.explorerUrl,
  });  
};
```
  **Note**: `setupNear()` retrieves network configuration settings from [`config.js`](https://github.com/near-examples/transaction-examples/blob/master/config.js) based on the argument passed. Also note that we use the `keyStore` created earlier to construct this new object.
___

## Formatting token amounts
When sending NEAR tokens (Ⓝ) during a transaction, the amount needs to be converted into [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ or (10^-24).

 - In `utils.js`, `formatAmount()` performs this conversion using `near-api-js` [cleanup & format method](https://github.com/near/near-api-js/blob/master/src/utils/format.ts#L53-L63). 
 - [`BigInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) is also used here, which allows for JavaScript to handle a number of this size. 

```js
function formatAmount(amount) {
  return BigInt(nearAPI
    .utils
    .format
    .parseNearAmount(amount.toString())
    );
};
```
___

## Transaction Requirements
As stated before, all transactions require six parts:

  1) [`signerId`](/docs/tutorials/create-transactions#1-signerid) 
  2) [`signerPublicKey`](/docs/tutorials/create-transactions#2-signerpublickey)
  3) [`receiverId`](/docs/tutorials/create-transactions#3-receiverid)
  4) [`nonceForPublicKey`](/docs/tutorials/create-transactions#4-nonceforpublickey)
  5) [`actions`](/docs/concepts/transaction#action)
  6) [`blockHash`](/docs/tutorials/create-transactions#6-blockhash)

### 1 `signerId`
- The `signerId` is the account ID of the transaction originator. 
- This value is passed as a string (ex. `'example.testnet'` or `'bob.near'`)

### 2 `signerPublicKey`
- The `signerPublicKey` is required to be an object with two key value pairs: `keyType` and `data`.

```js
PublicKey = {
  keyType: 0,
  data: Uint8Array(32) [
    190, 150, 152, 145, 232, 248, 128,
    151, 167, 165, 128,  46,  20, 231,
    103, 142,  39,  56, 152,  46, 135,
      1, 161, 180,  94, 212, 195, 201,
     73, 190,  70, 242
  ]
}
```
- This can be constructed by calling `getPublicKey()` using the `near` object [we setup earlier](/docs/tutorials/create-transactions#setting-up-connection-to-near).

```js
  const publicKey = await near.connection.signer.getPublicKey(sender, networkId);
```

### 3 `receiverId`
- The `receiverId` is the account ID of the transaction recipient. 
- This value is passed as a string (ex. `'example.testnet'` or `'bob.near'`)
- The certain cases, the `signerId` and the `receiverId` can be the same account.

### 4 `nonceForPublicKey`
- A unique number or `nonce` is required for each transaction performed with a public key.
- To ensure a unique number is created for each transaction, the current `nonce` should be queried and then incremented by 1.
- Current nonce can be queried using the `near` object we created with [`setupNear()`](/docs/tutorials/create-transactions#setting-up-connection-to-near).

```js
const accessKey = await near.connection.provider.query(
  `access_key/${sender}/${publicKey.toString()}`, ''
  );
```
- now we can create a unique number for our transaction by incrementing the current `nonce`.

```js
const nonce = ++accessKey.nonce;
 ```

### 5 `actions`
- There are currently eight supported `Action` types. [[ see here ]](/docs/concepts/transaction#action)
- For this example, we are using `Transfer`
- This transfer action can be created using the [imported `nearAPI` object](/docs/tutorials/create-transactions#imports) and the [formatted Ⓝ amount](/docs/tutorials/create-transactions#formatting-token-amounts) created earlier.

```js
const actions = [nearAPI.transactions.transfer(amount)];
```
 [[ click here ]](https://github.com/near/near-api-js/blob/master/src/transaction.ts#L70-L72) to view source for `transfer()`.

### 6 `blockHash`
- Each transaction requires a current block hash (within 12hrs) to prove that the transaction was created recently.
- Hash must be converted to an array of bytes using the `base_decode` method found in [`nearAPI`](/docs/tutorials/create-transactions#imports).

```js
const recentBlockHash = nearAPI.utils.serialize.base_decode(accessKey.block_hash)
```
[[ click here ]](https://github.com/near/near-api-js/blob/master/src/utils/serialize.ts#L16-L17) to view source for `base_decode()`.

___

## Constructing the transaction
With all of our [required arguments](/docs/tutorials/create-transactions#transaction-requirements), we can construct the transaction.
  - Using [`nearAPI`](/docs/tutorials/create-transactions#imports), we call on `createTransaction()` to perform this task.

```js
const tx = nearAPI.transactions.createTransaction(
  sender, 
  publicKey, 
  receiver, 
  nonce, 
  actions, 
  recentBlockHash
  );
```
 [[ click here ]](https://github.com/near/near-api-js/blob/master/src/transaction.ts#L95-L110) to view source code for the Transaction class
___

## Sign Transaction
Now that the transaction is created, we sign it before sending it to the NEAR blockchain.
  - Using [`nearAPI`](/docs/tutorials/create-transactions#imports), we call on `signTransaction()` to perform this task.
  - This method takes:
    - `tx` _([transaction](/docs/tutorials/create-transactions#constructing-the-transaction) we just created)_
    - `signerObject` _(this is nested in the `near` object we created earlier with [`setupNear()`](/docs/tutorials/create-transactions#setting-up-connection-to-near))_
    - `senderID` _(account ID of the signer / sender passed as a string)_
    - `networkID` _(network we want to connect to (`testnet` is default))_
```js
const [txHash, signedTx] = await nearAPI.transactions.signTransaction(
  tx, 
  near.connection.signer, 
  sender, 
  networkId
  );
```

## Send transaction
Final step is to encode and send the transaction.
  - First we serialize transaction into [BORSH](https://borsh.io/), and store the result as `bytes`. _(required for all transactions)_
  - Then we send the transaction via [RPC call](/docs/api/rpc) using the `sendJsonRpc()` method nested inside [`near`](/docs/tutorials/create-transactions#setting-up-connection-to-near).
```js
// encodes transaction to serialized BORSH (required for all transactions)  
const bytes = signedTx.encode();
// sends transaction to NEAR blockchain via JSON RPC call and records the result
const result = await near.connection.provider.sendJsonRpc(
  'broadcast_tx_commit', 
  [Buffer.from(bytes).toString('base64')]
  );
```

## Transaction results
Transaction results are returned in the following format:

```bash
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'nearkat.testnet',
    public_key: 'ed25519:8RazSLHvzj4TBSKGUo5appP7wVeqZNQYjP9hvhF4ZKS2',
    nonce: 57,
    receiver_id: 'joshford.testnet',
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
      executor_id: 'nearkat.testnet',
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
  signer_id: 'nearkat.testnet',
  public_key: 'ed25519:8RazSLHvzj4TBSKGUo5appP7wVeqZNQYjP9hvhF4ZKS2',
  nonce: 57,
  receiver_id: 'joshford.testnet',
  actions: [ { Transfer: [Object] } ],
  signature: 'ed25519:2sK53w6hybSxX7qWShXz6xKnjnYRUW7Co3evEaaggNW6pGSCNPvx7urY4akwnzAbxZGwsKjx8dcVm73qbitntJjz',
  hash: 'EgGzB73eFxCwZRGcEyCKedLjvvgxhDXcUtq21SqAh79j'
}
```
- View the transaction in [NEAR Explorer](https://explorer.testnet.near.org/) by entering the `hash` located under `transaction` / `Transaction Results`.
- In addition, you can construct a link by concatenating `networkId` and `result.transaction.hash`

```js
const transactionLink = `https://explorer.${networkId}.near.org/transactions/${result.transaction.hash}`
```
