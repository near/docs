---
id: rpc
title: 원격 프로시저 호출
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


여기서는 NEAR RPC 사용 방법에 대해서만 간략하게 설명하겠습니다. NEAR RPC에 대한 전체 문서를 찾으려면 이 링크를 따르세요.

---

## View 메서드

View 메서드는 **읽기 전용** 작업을 수행하는 메서드입니다. 이러한 메서드를 호출하는 것은 무료이며, 호출에 사용되는 계정을 지정할 필요가 없습니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `call_function`
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)
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
<summary>응답 예시: </summary>
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
View 메서드는 기본적으로 실행에 200 TGAS가 듭니다
:::

**참고**: `[48]`은 바이트 배열이며, 구체적으로는 ASCII 코드 `0`입니다. `near-sdk-rs`와 `near-sdk-js`는 JSON 직렬화된 결과를 반환합니다.

</p>
</details>

:::info 무엇이 잘못될 수 있나요? 에러가 발생하면, [RPC 문서](../../5.api/rpc/contracts.md#what-could-go-wrong)를 확인하세요.

---

## Change 메서드
Change 메서드는 읽기 및 쓰기 작업을 모두 수행하는 방법입니다. 이러한 방법의 경우, 호출에 사용되는 계정을 지정해야 합니다. 해당 계정은 호출을 위해 가스를 소비하기 때문입니다.

메서드 Change 호출은 계정으로 서명해야 하므로 먼저 RPC로 보낼 트랜잭션을 만들고 서명해야 합니다. 이를 위해 현재 `near-api-js`를 많이 사용해야 합니다. 특히 다음을 수행해야 합니다:

1. `near-api-js.transactions` 모듈을 사용하여 트랜잭션을 만듭니다.
2. `near-api-js.KeyStore.KeyPair`를 사용하여 트랜잭션에 서명합니다.
3. 서명된 트랜잭션을 RPC로 보냅니다.


### 트랜잭션 생성

트랜잭션을 생성하려면 `near-api-js.transactions.createTransaction`을 사용합니다.

1. `signerId`: 트랜잭션 발신자의 계정 ID입니다.
2. `signerPublicKey`: 서명자 공개 키입니다. 아래를 참조하세요.
3. `receiverId`: 트랜잭션 수신자의 계정 ID입니다.
4. `nonceForPublicKey`: 고유 번호입니다. 아래를 참조하세요.
5. `actions`: `near-api-js.transactions`에서 빌드된[Action](../contracts/actions.md)입니다.
6. [`blockHash`](/integrator/create-transactions#6-blockhash)


#### `signerPublicKey`
서명자의 공개 키는 keyType과 data라는 두 개의 키 값 쌍을 가진 개체로 인코딩되어야 합니다. 한 가지 가능한 방법은 다음과 같습니다:

```js
const privateKey = "private-key-here";
const keyPair = nearAPI.utils.key_pair.KeyPairEd25519.fromString(privateKey);
const publicKey = keyPair.getPublicKey()
```

#### `nonceForPublicKey`
고유 번호 또는 `nonce`는 액세스 키로 서명된 각 트랜잭션에 필요합니다. 각 트랜잭션에 대해 고유한 번호가 생성되도록 하려면, 현재 `nonce`를 쿼리한 다음 1씩 증가시켜야 합니다.

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
트랜잭션이 최근에 생성되었음을 증명하기 위해, 각 트랜잭션에는 현재 블록 해시(24시간 이내)가 필요합니다. 해시는 `near-api-js` 에 있는 `base_decode` 메서드를 사용하여 바이트 배열로 변환해야 합니다.

```js
const recentBlockHash = near-api-js.utils.serialize.base_decode(
  accessKey.block_hash
);
```


### 트랜잭션 서명 {#sign-transaction}

이제 트랜잭션이 생성되었으므로, 이를 NEAR 블록체인으로 보내기 전에 서명합니다. 가장 낮은 수준에서 이 프로세스에는 4단계가 있습니다.

1. [`nearAPI`](/integrator/create-transactions#imports)를 사용하여, `serialize()`를 호출해 [Borsh](https://borsh.io/)에서 트랜잭션을 직렬화합니다.

```js
const serializedTx = nearAPI.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA,
  transaction
);
```

2. `sha256` 암호화 해싱 알고리즘을 사용하여 직렬화된 트랜잭션을 해시합니다.

```js
const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
```

3. `keyPair`로 서명을 생성합니다.

```js
const signature = keyPair.sign(serializedTxHash);
```

4. `near-api-js` [SignedTransaction 클래스](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L112-L123)를 사용하여 서명된 트랜잭션을 생성합니다.

```js
const signedTransaction = new nearAPI.transactions.SignedTransaction({
  transaction,
  signature: new nearAPI.transactions.Signature({
    keyType: transaction.publicKey.keyType,
    data: signature.signature,
  }),
});
```

### 트랜잭션 전송 {#send-transaction}

마지막 단계는 트랜잭션을 인코딩하고 전송하는 것입니다.

- 먼저 트랜잭션을 [Borsh](https://borsh.io/)로 직렬화하고, 결과를 `signedSerializedTx`으로 저장합니다. _(모든 트랜잭션에 필요)_
- 그런 다음, [`near`](/integrator/create-transactions#setting-up-connection-to-near) 내 중첩된 `sendJsonRpc()` 메서드를 사용한 [RPC 호출](/api/rpc/setup)을 통해 트랜잭션을 전송합니다.

```js
// encodes transaction to serialized Borsh (required for all transactions)
const signedSerializedTx = signedTransaction.encode();
// sends transaction to NEAR blockchain via JSON RPC call and records the result
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

<details>
<summary>응답 예시: </summary>

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
