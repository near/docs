---
id: create-transactions
title: 트랜잭션 생성
sidebar_label: 트랜잭션 생성
---

트랜잭션을 구성하고 처리하려면 API JavaScript 라이브러리 [`near-api-js`](/develop/integrate/frontend)가 필요합니다. 트랜잭션을 생성하는 방법에는 여러 가지가 있지만, 이 예제에서는 간단한 토큰 전송 트랜잭션을 생성하는 두 가지 방법을 소개합니다.

- [고수준](#high-level----create-a-transaction) - _트랜잭션을 생성하는 가장 쉬운 방법입니다._
- [저수준](#low-level----create-a-transaction) - _위와 똑같은 트랜잭션을 수행하지만, 각 단계가 궁금한 사람들을 위해 전체 프로세스를 분해합니다._

기본적으로 모든 트랜잭션에는 다음이 필요합니다.

- `signerId` _(트랜잭션 주체의 계정 ID)_
- `signerPublicKey`
- `receiverId` _(트랜잭션 수신자의 계정 ID)_
- `nonceForPublicKey` _(키가 사용될 때마다 nonce 값이 1씩 증가해야 함)_
- `actions` _( [[click here]](/concepts/protocol/transactions#action) for supported arguments)_
- `blockHash` _(트랜잭션이 최근에 생성되었음을 증명하기 위한 현재 블록 해시(24시간 이내))_

See [Transaction Class](https://near.github.io/near-api-js/classes/near_api_js.transaction.Transaction.html) for a more in depth outline.

---

## HIGH LEVEL -- Create a transaction

### Setup

1. 다음 명령을 실행하여 [transaction-examples](https://github.com/near-examples/transaction-examples) 레퍼지토리를 복제합니다.

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. [설정 지침](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)을 따르세요.

### Imports

[`send-tokens-easy.js`](https://github.com/near-examples/transaction-examples/blob/9e999253aafa2c3e3b537810a0b8ce7596c3506c/send-tokens-easy.js#L1-L5)에서 우리는 두 가지 의존성(dependency)을 사용합니다.

1. [NEAR API JavaScript 라이브러리](https://github.com/near/near-api-js)
2. [`dotenv`](https://www.npmjs.com/package/dotenv) (개인 키에 대한 환경 변수를 로드하는 데 사용)

```js
const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils } = nearAPI;
require("dotenv").config();
```

위의 두 번째 줄은 블록체인과 상호 작용하는 데 사용할 nearAPI의 여러 유틸리티를 다음과 같이 분해합니다.

- `connect` - NEAR에 대한 연결을 생성해 구성 변수 전달
- `KeyPair` - `.env` 파일에 제공할 개인 키에서 keyPair 생성
- `keyStores` - 개인 키에서 생성하고 트랜잭션 서명에 사용할 키 쌍 저장
- `utils` - NEAR 토큰 단위을 지정하는 데 사용

### Accounts & Network

다음으로, `networkId` (`betanet`, `testnet`, 또는 `mainnet`) 뿐만 아니라 `sender`와 `receiver`의 `accountId`를 입력해야 합니다.

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

### Formatting Token Amounts

트랜잭션 중 NEAR 토큰(Ⓝ)을 보낼 때, 금액을 [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ 또는 (10^-24)로 변환해야 합니다.

- 이를 수행하려면, [`near-api-js`](https://github.com/near/near-api-js) 메서드 [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63)(`utils/format`에 있음)를 사용합니다.

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

### Create a Key Store

In order to sign transactions you will need to create a "Key Store" that will hold a [full access key](/concepts/protocol/access-keys#full-access-keys) to sign your transactions. 이를 수행하는 방법에는 여러 가지가 있지만, 이 예제에서는 프로젝트의 `.env` 파일 또는 전역으로 내보낸 환경 변수에 저장된 개인 키를 사용합니다.

- [`near-cli`](/tools/near-cli)를 사용하여 계정을 생성했거나 터미널에서 [`near login`](/tools/near-cli#for-accounts)을 실행한 경우, 개인 키는 `/HOME/.near-credentials`에 있는 `.json` 파일에서 찾을 수 있습니다.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - 브라우저 개발자 도구에서... `Application` >> `Storage` >> `Local Storage`

```js
// sets up an empty keyStore object in memory using near-api-js
const keyStore = new keyStores.InMemoryKeyStore();
// creates a keyPair from the private key provided in your .env file
const keyPair = KeyPair.fromString(process.env.SENDER_PRIVATE_KEY);
// adds the key you just created to your keyStore which can hold multiple keys (must be inside an async function)
await keyStore.setKey(networkId, sender, keyPair);
```

### Setting up a connection to NEAR

이제 `keyStore`뿐만 아니라 `networkId` 설정을 더 일찍 포함할 구성 객체를 사용하여 NEAR에 대한 연결을 생성합니다.

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

마지막 줄은 NEAR 연결을 사용하여 트랜잭션을 수행하는 데 사용할 `senderAccount` 객체를 생성하고 있습니다.

### Create, Sign, & Send Transaction

이제 모든 것이 설정되었으므로 한 줄의 코드로 트랜잭션을 생성할 수 있습니다.

```js
const result = await senderAccount.sendMoney(receiver, amount);
```

이 간단한 명령은 NEAR 블록체인에서 토큰 전송 트랜잭션을 구성, 서명 및 전송합니다. There is no need to create a `result` variable aside from inspecting the response details from your transaction and even create a link to [NearBlocks Explorer](https://testnet.nearblocks.io/) to view a GUI version of the transaction details.

---

## LOW LEVEL -- Create a Transaction

### Setup

1. 다음 명령어로 [transaction-examples](https://github.com/near-examples/transaction-examples) 레퍼지토리를 복제하세요:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. [설정 지침](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)을 따릅니다.

---

### Imports

[`send-tokens-deconstructed.js`](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L1-L4)에서, 우리는 세 가지 의존성을 사용합니다.

1. [NEAR API JavaScript 라이브러리](https://github.com/near/near-api-js)
2. [`js-sha256`](https://www.npmjs.com/package/js-sha256) (암호 해싱 알고리즘)
3. [`dotenv`](https://www.npmjs.com/package/dotenv) (환경 변수 로드에 사용)

```js
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");
require("dotenv").config();
```

---

### Accounts & Network

다음으로, `networkId` (`betanet`, `testnet`, 또는 `mainnet`) 뿐만 아니라 `sender`와 `receiver`의 `accountId`를 입력해야 합니다.

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

---

### Formatting Token Amounts

트랜잭션 중 NEAR 토큰(Ⓝ)을 보낼 때, 금액을 [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ 또는 (10^-24)로 변환해야 합니다.

- 이를 수행하려면, [`near-api-js`](https://github.com/near/near-api-js) 메서드 [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63)(`utils/format`에 있음)를 사용합니다.

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

---

### Setting up a connection to NEAR

이 예에서는, [RPC 엔드포인트](/api/rpc/introduction)를 통해 체인과 상호 작용할 수 있는 NEAR RPC `provider`를 생성합니다.

```js
const provider = new nearAPI.providers.JsonRpcProvider(
  `https://rpc.${networkId}.near.org`
);
```

---

### Access Keys

NEAR Ⓝ를 보내기 위한 트랜잭션에 서명하려면, 발신자 계정에 대한 `FullAccess` 키가 필요합니다.

- [`near-cli`](/tools/near-cli)를 사용하여 계정을 생성했거나 터미널에서 [`near login`](/tools/near-cli#for-accounts)을 실행한 경우, 개인 키는 `/HOME/.near-credentials`에 있는 `.json` 파일에서 찾을 수 있습니다.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - 브라우저 개발자 도구에서... `Application` >> `Storage` >> `Local Storage`

보낸 사람 계정의 개인 키에 대한 액세스 권한이 있으면, 환경 변수 `SENDER_PRIVATE_KEY`를 만들거나, `send-tokens.js`의 [18번째 줄](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L18)에 이를 문자열로 하드 코딩합니다.

- 이 `privateKey`로, 우리는 이제 `keyPair` 객체를 구성해 트랜잭션에 서명할 수 있습니다.

```js
const privateKey = process.env.SENDER_PRIVATE_KEY;
const keyPair = nearAPI.KeyPair.fromString(privateKey);
```

---

### Transaction Requirements

앞에서 언급했듯이, 모든 트랜잭션에는 6가지 부분이 필요합니다.

1. [`signerId`](#1-signerid)
2. [`signerPublicKey`](#2-signerpublickey)
3. [`receiverId`](#3-receiverid)
4. [`nonceForPublicKey`](#4-nonceforpublickey)
5. [`actions`](/concepts/protocol/transactions#action)
6. [`blockHash`](#6-blockhash)

### 1 `signerId`

- `signerId`는 트랜잭션 발신자의 계정 ID입니다.
- 이 값은 문자열로 전달됩니다(예: `'example.testnet'` 또는 `'bob.near'`).

### 2 `signerPublicKey`

- `signerPublicKey`는 `keyType`과 `data`라는 두 개의 키-값 쌍을 가진 객체입니다.

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

- 이는 [이전에 설정한](#access-keys) `keyPair`를 사용해 `getPublicKey()`를 호출하는 방식으로 구성할 수 있습니다.

```js
const publicKey = keyPair.getPublicKey();
```

### 3 `receiverId`

- `receiverId`는 트랜잭션 수신자의 계정 ID입니다.
- 이 값은 문자열로 전달됩니다(예: `'example.testnet'` 또는 `'bob.near'`).
- 경우에 따라, `signerId`와 `receiverId`는 같은 계정일 수 있습니다.

### 4 `nonceForPublicKey`

- 고유 번호 또는 `nonce`는 액세스 키로 서명된 각 트랜잭션에 필요합니다.
- 각 트랜잭션에 대해 고유한 번호가 생성되도록 하려면, 현재 `nonce`를 쿼리한 다음 1씩 증가시켜야 합니다.
- 현재 논스(nonce)는 [이전에 만든](#setting-up-a-connection-to-near) `provider`를 사용하여 검색할 수 있습니다.

```js
const accessKey = await provider.query(
  `access_key/${sender}/${publicKey.toString()}`,
  ""
);
```

- 이제 현재 `nonce`를 증가시킴으로써, 트랜잭션에 고유 번호를 생성할 수 있습니다.

```js
const nonce = ++accessKey.nonce;
```

### 5 `actions`

- 현재 지원되는 `Action` 유형은 8가지가 있습니다. [[see here]](/concepts/protocol/transactions#action)
- 이 예제에서는, `Transfer`를 사용합니다.
- 이 Transfer Action은 [가져온 `nearAPI` 객체](#imports)와 이전에 만든 [단위 지정된 Ⓝ 금액](#formatting-token-amounts)을 사용하여 생성할 수 있습니다.

```js
const actions = [nearAPI.transactions.transfer(amount)];
```

`transfer()`에 대한 소스 코드를 보려면 [[여기를 클릭하세요]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L70-L72).

### 6 `blockHash`

- 트랜잭션이 최근에 생성되었음을 증명하기 위해, 각 트랜잭션에는 현재 블록 해시(24시간 이내)가 필요합니다.
- 해시는 [`nearAPI`](#imports)에 있는 `base_decode` 메서드를 사용하여 바이트 배열로 변환해야 합니다.

```js
const recentBlockHash = nearAPI.utils.serialize.base_decode(
  accessKey.block_hash
);
```

`base_decode()`에 대한 소스 코드를 보려면, [[여기를 클릭하세요]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/serialize.ts#L16-L17).

---

### Constructing the Transaction

[필요한 모든 인자](#transaction-requirements)를 사용하여 트랜잭션을 구성할 수 있습니다.

- [`nearAPI`](#imports)를 사용하여, `createTransaction()`를 호출해 이 작업을 수행하도록 합니다.

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

트랜잭션 클래스에 대한 소스 코드를 보려면, [[여기를 클릭하세요]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L95-L110).

---

### Sign Transaction

이제 트랜잭션이 생성되었으므로, 이를 NEAR 블록체인으로 보내기 전에 서명합니다. 가장 낮은 수준에서 이 프로세스에는 4단계가 있습니다.

1. [`nearAPI`](#imports)를 사용하여, `serialize()`를 호출해 [Borsh](https://borsh.io/)에서 트랜잭션을 직렬화합니다.

```js
const serializedTx = nearAPI.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA.Transaction,
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

### Send Transaction

마지막 단계는 트랜잭션을 인코딩하고 전송하는 것입니다.

- 먼저 트랜잭션을 [Borsh](https://borsh.io/)로 직렬화하고, 결과를 `signedSerializedTx`으로 저장합니다. _(모든 트랜잭션에 필요)_
- 그런 다음, [`near`](#setting-up-connection-to-near) 내 중첩된 `sendJsonRpc()` 메서드를 사용한 [RPC 호출](/api/rpc/introduction)을 통해 트랜잭션을 전송합니다.

```js
// encodes transaction to serialized Borsh (required for all transactions)
const signedSerializedTx = signedTransaction.encode();
// sends transaction to NEAR blockchain via JSON RPC call and records the result
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

### Transaction Results

트랜잭션의 자세한 결과는 다음 형식으로 반환됩니다.

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

트랜잭션 Receipt에 대한 자세한 내용을 알고 싶다면, [[여기를 클릭하세요]](https://nomicon.io/RuntimeSpec/Receipts.html).

- To view the transaction in [NearBlocks Explorer](https://testnet.nearblocks.io/), enter the `hash` located under `transaction` / `Transaction Results`.
- 또한, `networkId`와 `result.transaction.hash`를 사용하여 JS에서 링크를 만들 수 있습니다.

```js
const prefix = (networkId === "testnet") ? "testnet." : "";
const transactionLink = `https://${prefix}nearblocks.io/txns/${result.transaction.hash}`;
```

:::tip 질문이 있으신가요? <a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>StackOverflow에 물어보세요!</h8></a>
:::

즐거운 코딩 되세요! 🚀
