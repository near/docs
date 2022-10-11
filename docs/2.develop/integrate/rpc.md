---
id: rpc
title: Remote Procedural Call
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Here we will only briefly mention how to use the NEAR RPC.
If you want to find the full documentation on NEAR RPC please follow this link.

---

## View Methods

View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

- method: `query`
- params:
  - `request_type`: `call_function`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `method_name`: `name_of_a_example.testnet_method`
  - `args_base64`: `method_arguments_base_64_encoded`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "call_function",
  finality: "final",
  account_id: "dev-1588039999690",
  method_name: "get_num",
  args_base64: "e30=",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "result": [48],
    "logs": [],
    "block_height": 17817336,
    "block_hash": "4qkA4sUUG8opjH5Q9bL5mWJTnfR4ech879Db1BZXbx6P"
  },
  "id": "dontcare"
}
```

:::tip
View methods have by default 200 TGAS for execution
:::


**Note**: `[48]` is an array of bytes, to be specific it is an ASCII code of `0`.`near-sdk-rs` and `near-sdk-js` return JSON-serialized results.

</p>
</details>

:::info What could go wrong?
If you encounter a error please check [the RPC docs](../../5.api/rpc/contracts.md#what-could-go-wrong)
:::

---

## Change Methods
Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call, since that account will expend GAS in the call.

Since calls to change methods need to be signed by an account, you will first need to create and sign the transaction that you want to send to the RPC.
For this, you currently need to make heavy use of `near-api-js`. Particularly, you need to:

1. Create a transaction using the `near-api-js.transactions` module.
2. Sign the transaction using the `near-api-js.KeyStore.KeyPair`
3. Send the signed transaction to the RPC.


### Create Transaction

In order yo create a transaction you will use `near-api-js.transactions.createTransaction` which takes as input:

1. `signerId`: the account ID of the transaction originator.
2. `signerPublicKey`: the signer public key, see bellow.
3. `receiverId`: the account ID of the transaction recipient.
4. `nonceForPublicKey`: a unique number, see bellow
5. `actions`: An [action](../contracts/actions.md), built from `near-api-js.transactions`.
6. [`blockHash`](/integrator/create-transactions#6-blockhash)


####  `signerPublicKey`
The public key of the signer must be encoded as an object with two key value pairs: keyType and data.
Here is one possible way to get it:

```js
const privateKey = "private-key-here";
const keyPair = nearAPI.utils.key_pair.KeyPairEd25519.fromString(privateKey);
const publicKey = keyPair.getPublicKey()
```

####  `nonceForPublicKey`
A unique number or `nonce` is required for each transaction signed with an access key. To ensure a unique number is created for each transaction, the current `nonce` should be queried and then incremented by 1.

```js

const provider = new near-api-js.providers.JsonRpcProvider(
  `https://rpc.testnet.near.org`
);
const accessKey = await provider.query(
  `access_key/influencer.testnet/${publicKey.getPublicKey().toString()}`,
  ""
);

const nonce = accessKey.nonce + 1;
```

#### `blockHash`
Each transaction requires a current block hash (within 24hrs) to prove that the transaction was created recently. The hash must be converted to an array of bytes using the `base_decode` method found in `near-api-js`.

```js
const recentBlockHash = near-api-js.utils.serialize.base_decode(
  accessKey.block_hash
);
```


### Sign Transaction {#sign-transaction}

Now that the transaction is created, we sign it before sending it to the NEAR blockchain. At the lowest level, there are four steps to this process.

1. Using [`nearAPI`](/integrator/create-transactions#imports), we call on `serialize()` to serialize the transaction in [Borsh](https://borsh.io/).

```js
const serializedTx = near-api-js.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA,
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

### Send Transaction {#send-transaction}

Final step is to encode and send the transaction.

- First we serialize transaction into [Borsh](https://borsh.io/), and store the result as `signedSerializedTx`. _(required for all transactions)_
- Then we send the transaction via [RPC call](/api/rpc/setup) using the `sendJsonRpc()` method nested inside [`near`](/integrator/create-transactions#setting-up-connection-to-near).

```js
// encodes transaction to serialized Borsh (required for all transactions)
const signedSerializedTx = signedTransaction.encode();
// sends transaction to NEAR blockchain via JSON RPC call and records the result
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

<details>
<summary>Example response: </summary>

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
</details>
