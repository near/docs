---
id: rpc
title: Remote Procedural Call
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Here we will only briefly mention how to use the NEAR RPC. If you want to find the full documentation on NEAR RPC please follow this link.

---

## View Methods

View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

- method: `query`
- các param:
  - `request_type`: `call_function`
  - [`finality`](/docs/api/rpc#using-finality-param) _HOẶC_ [`block_id`](/docs/api/rpc#using-block_id-param)
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
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/docs/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
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

:::info What could go wrong? If you encounter a error please check [the RPC docs](../../5.api/rpc/contracts.md#what-could-go-wrong) :::

---

## Change Methods
Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call, since that account will expend GAS in the call.

Since calls to change methods need to be signed by an account, you will first need to create and sign the transaction that you want to send to the RPC. For this, you currently need to make heavy use of `near-api-js`. Particularly, you need to:

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


#### `signerPublicKey`
The public key of the signer must be encoded as an object with two key value pairs: keyType and data. Here is one possible way to get it:

```js
const privateKey = "private-key-here";
const keyPair = nearAPI.utils.key_pair.KeyPairEd25519.fromString(privateKey);
const publicKey = keyPair.getPublicKey()
```

#### `nonceForPublicKey`
Một số duy nhất hoặc một giá trị `nonce` được yêu cầu cho mỗi transaction, được sign bởi một access key. Để đảm bảo chỉ một số duy nhất được tạo ra cho mỗi transaction, giá trị `nonce` hiện tại phải được query và sau đó tăng lên 1.

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
Mỗi transaction yêu cầu một hash của block hiện tại (trong 24 giờ) để chứng mình rằng transaction này vừa được tạo. The hash must be converted to an array of bytes using the `base_decode` method found in `near-api-js`.

```js
const recentBlockHash = near-api-js.utils.serialize.base_decode(
  accessKey.block_hash
);
```


### Sign Transaction {#sign-transaction}

Bây giờ transaction đã được tạo ra, chúng ta sign nó trước khi gửi nó đến NEAR blockchain. Ở tầng thấp nhất, có bốn bước cho quá trình này.

1. Using [`nearAPI`](/integrator/create-transactions#imports), we call on `serialize()` to serialize the transaction in [Borsh](https://borsh.io/).

```js
const serializedTx = near-api-js.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA,
  transaction
);
```

2. Hash transaction đã được serialize sử dụng giải thuật hash mã hóa `sha256`.

```js
const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
```

3. Tạo một signature với `keyPair`.

```js
const signature = keyPair.sign(serializedTxHash);
```

4. Tạo một transaction đã sign bằng cách sử dụng [class SignedTransaction](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L112-L123) của `near-api-js`.

```js
const signedTransaction = new nearAPI.transactions.SignedTransaction({
  transaction,
  signature: new nearAPI.transactions.Signature({
    keyType: transaction.publicKey.keyType,
    data: signature.signature,
  }),
});
```

### Gửi Transaction {#send-transaction}

Bước cuối cùng là encode và gửi transaction này.

- Đầu tiên chúng ta serialize transaction bằng [Borsh](https://borsh.io/), và lưu kết quả trong variable `signedSerializedTx`. _(bắt buộc với tất cả các transaction)_
- Then we send the transaction via [RPC call](/api/rpc/setup) using the `sendJsonRpc()` method nested inside [`near`](/integrator/create-transactions#setting-up-connection-to-near).

```js
// encode transaction bằng Borsh serialize (bắt buộc với tất cả các transaction)
const signedSerializedTx = signedTransaction.encode();
// gửi transaction tới NEAR blockchain thông qua JSON RPC call và ghi lại kết quả
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

<details>
<summary>Ví dụ trả về: </summary>

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
