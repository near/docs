---
id: create-transactions
title: Tạo Các Transaction
sidebar_label: Tạo Transaction
---

Để tạo & xử lý các transaction bạn sẽ cần đến thư viện API JavaScript của chúng tôi: [`near-api-js`](/develop/integrate/frontend). Có rất nhiều cách để tạo các transaction nhưng trong ví dụ này chúng tôi sẽ chỉ cho bạn hai cách để tạo một transaction đơn giản để transfer token.

- [HIGH LEVEL](#high-level----create-a-transaction) - _Cách dễ dàng nhất để tạo một transaction_
- [LOW LEVEL](#low-level----create-a-transaction) - _thực hiện chính xác những gì transaction ở trên đang làm, nhưng sẽ đi vào chi tiết từng bước cụ thể của toàn bộ quy trình cho những ai quan tâm_

Về cốt lõi, tất cả các transaction yêu cầu những phần sau:

- `signerId` _(account ID của người khởi tạo transaction)_
- `signerPublicKey`
- `receiverId` _(account ID của người nhận transaction)_
- `nonceForPublicKey` _(mỗi lần key được sử dụng, giá trị nonce này sẽ được tăng lên 1)_
- `actions` _( [[click here]](/concepts/protocol/transactions#action) for supported arguments)_
- `blockHash` _(hash của block hiện tại (trong vòng 24 giờ) để chứng minh transaction đó vừa được tạo)_

See [Transaction Class](https://near.github.io/near-api-js/classes/near_api_js.transaction.Transaction.html) for a more in depth outline.

---

## HIGH LEVEL -- Create a transaction

### Setup

1. Clone repository [transaction-examples](https://github.com/near-examples/transaction-examples) bằng cách chạy:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. Follow [setup instructions](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)

### Imports

Trong file [`send-tokens-easy.js`](https://github.com/near-examples/transaction-examples/blob/9e999253aafa2c3e3b537810a0b8ce7596c3506c/send-tokens-easy.js#L1-L5) chúng ta sử dụng hai dependency:

1. [Thư viện API JavaScript của NEAR](https://github.com/near/near-api-js)
2. [`dotenv`](https://www.npmjs.com/package/dotenv) (dùng để load những environment variable cho private key)

```js
const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils } = nearAPI;
require("dotenv").config();
```

Dòng thứ hai ở trên phân giải môt vài tiện ích trong nearAPI, mà bạn sẽ sử dụng chúng để thao tác với blockchain.

- `connect` - truyền vào các variable thiết lập để tạo kết nối tới NEAR
- `KeyPair` - tạo một keyPair từ private key mà bạn sẽ đưa vào trong một file `.env`
- `keyStores` - lưu trữ keyPair mà bạn sẽ tạo từ private key và dùng nó để sign các Transaction
- `utils` - được dùng để format các khoản tiền trong NEAR

### Accounts & Network

Tiếp theo, bạn sẽ cần điền `accountId` của `sender` và `receiver`, cũng như là `networkId` (`betanet`, `testnet`, hoặc `mainnet`).

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

### Formatting Token Amounts

Khi gửi các NEAR token (Ⓝ) trong một transaction, khoản tiền này cần được chuyền thành [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ hay (10^-24).

- Để làm điều này bạn sẽ dùng method [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63) của [`near-api-js`](https://github.com/near/near-api-js) (nằm tại `utils/format`)

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

### Create a Key Store

In order to sign transactions you will need to create a "Key Store" that will hold a [full access key](/concepts/protocol/access-keys#full-access-keys) to sign your transactions. Có một vài cách để hoàn tất việc này, nhưng trong ví dụ này chúng ta sẽ sử dụng private key đã được lưu trong file `.env` trong project của bạn, hoặc một environment variable được export toàn cục.

- Nếu bạn đã tạo account bằng cách dùng [`near-cli`](/tools/near-cli) hoặc đã chạy [`near login`](/tools/near-cli#for-accounts) trong terminal của bạn, thì private key của bạn có thể được tìm thấy trong file `.json` nằm tại `/HOME/.near-credentials`.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - Trong dev tools của browser... `Application` >> `Storage` >> `Local Storage`

```js
// thiết lập một object keyStore trống trong memory bằng near-api-js
const keyStore = new keyStores.InMemoryKeyStore();
// tạo một keyPair từ private key được cung cấp trong file .env của bạn
const keyPair = KeyPair.fromString(process.env.SENDER_PRIVATE_KEY);
// thêm key bạn vừa tạo vào keyStore của bạn, nó có thể giữ nhiều key (phải nằm trong một async function)
await keyStore.setKey(networkId, sender, keyPair);
```

### Setting up a connection to NEAR

Bây giờ tạo một kết nối tới NEAR sử dụng một configuration object, nó sẽ chứa `networkId` đã được cài đặt trước đó cũng như `keyStore` của bạn.

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
// tạo một object NEAR account
const senderAccount = await near.account(sender);
```

Bạn sẽ báo cho dòng cuối sử dụng kết nối tới NEAR của bạn để tạo một object `senderAccount` mà bạn sẽ dùng để thực hiện một transaction.

### Create, Sign, & Send Transaction

Bây giờ bạn đã cài đặt mọi thứ, khởi tạo transaction bằng chỉ bằng một dòng code.

```js
const result = await senderAccount.sendMoney(receiver, amount);
```

Command đơn giản này sẽ khởi tạo, sign, và gửi một transaction về việc transfer token trên NEAR blockchain. There is no need to create a `result` variable aside from inspecting the response details from your transaction and even create a link to [NearBlocks Explorer](https://testnet.nearblocks.io/) to view a GUI version of the transaction details.

---

## LOW LEVEL -- Create a Transaction

### Setup

1. Clone repository [transaction-examples](https://github.com/near-examples/transaction-examples) bằng cách chạy:

```bash
git clone https://github.com/near-examples/transaction-examples.git
```

2. Follow [setup instructions](https://github.com/near-examples/transaction-examples/blob/master/README.md#prerequisites)

---

### Imports

Trong file [`send-tokens-deconstructed.js`](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L1-L4) chúng ta sử dụng ba dependency:

1. [Thư viện API JavaScript của NEAR](https://github.com/near/near-api-js)
2. [`js-sha256`](https://www.npmjs.com/package/js-sha256) (giải thuật hash mã hóa)
3. [`dotenv`](https://www.npmjs.com/package/dotenv) (dùng để load các environment variable)

```js
const nearAPI = require("near-api-js");
const sha256 = require("js-sha256");
require("dotenv").config();
```

---

### Accounts & Network

Tiếp theo, bạn sẽ cần điền `accountId` của `sender` và `receiver`, cũng như là `networkId` (`betanet`, `testnet`, hoặc `mainnet`).

```js
const sender = "sender.testnet";
const receiver = "receiver.testnet";
const networkId = "testnet";
```

---

### Formatting Token Amounts

Khi gửi các NEAR token (Ⓝ) trong một transaction, khoản tiền này cần được chuyền thành [Yocto](https://en.wikipedia.org/wiki/Yocto-) Ⓝ hay (10^-24).

- Để làm điều này bạn sẽ dùng method [`parseNearAmount()`](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/format.ts#L53-L63) của [`near-api-js`](https://github.com/near/near-api-js) (nằm tại `utils/format`)

```js
const amount = nearAPI.utils.format.parseNearAmount("1.5");
```

---

### Setting up a connection to NEAR

Trong ví dụ này, chúng ta sẽ tạo một NEAR RPC `provider`, nó sẽ cho phép chúng ta tương tác với chain thông qua [các RPC endpoint](/api/rpc/introduction).

```js
const provider = new nearAPI.providers.JsonRpcProvider(
  `https://rpc.${networkId}.near.org`
);
```

---

### Access Keys

Để sign một transaction để gửi NEAR Ⓝ, chúng ta cần một `FullAccess` key vào account của người gửi.

- Nếu bạn đã tạo account bằng cách dùng [`near-cli`](/tools/near-cli) hoặc đã chạy [`near login`](/tools/near-cli#for-accounts) trong terminal của bạn, thì private key của bạn có thể được tìm thấy trong file `.json` nằm tại `/HOME/.near-credentials`.
- If you created an account using [NEAR Wallet](https://testnet.mynearwallet.com/), your key will be found in your browser's `Local Storage`.
  - Trong dev tools của browser... `Application` >> `Storage` >> `Local Storage`

Một khi bạn có quyền truy cập vào private key của account người gửi, tạo một environment variable `SENDER_PRIVATE_KEY` hoặc hard code nó trong một string như trong [dòng 18](https://github.com/near-examples/transaction-examples/blob/master/send-tokens-deconstructed.js#L18) của file `send-tokens.js`.

- Với `privateKey` này, chúng ta có thể khởi tạo một object `keyPair` để sign các transaction.

```js
const privateKey = process.env.SENDER_PRIVATE_KEY;
const keyPair = nearAPI.KeyPair.fromString(privateKey);
```

---

### Transaction Requirements

Như đã nêu ở trên, tất cả các transaction yêu cầu sáu phần sau:

1. [`signerId`](#1-signerid)
2. [`signerPublicKey`](#2-signerpublickey)
3. [`receiverId`](#3-receiverid)
4. [`nonceForPublicKey`](#4-nonceforpublickey)
5. [`actions`](/concepts/protocol/transactions#action)
6. [`blockHash`](#6-blockhash)

### 1 `signerId`

- `signerId` là một account ID của người khởi tạo transaction.
- Giá trị này được truyền vào dưới dạng một string (ví dụ: `'example.testnet'` hoặc `'bob.near'`)

### 2 `signerPublicKey`

- `signerPublicKey` được yêu cầu dưới dạng một object với hai cặp key value: `keyType` and `data`.

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

- Điều này có thể được khởi tạo bằng cách gọi method `getPublicKey()` sử dụng variable `keyPair` mà chúng ta [đã cài đặt trước đó](#access-keys).

```js
const publicKey = keyPair.getPublicKey();
```

### 3 `receiverId`

- `receiverId` là account ID của người nhận transaction.
- Giá trị này được truyền vào dưới dạng một string (ví dụ: `'example.testnet'` hoặc `'bob.near'`)
- Trong một số trường hợp nhất định, `signerId` và `receiverId` có thể là cùng một account.

### 4 `nonceForPublicKey`

- Một số duy nhất hoặc một giá trị `nonce` được yêu cầu cho mỗi transaction, được sign bởi một access key.
- Để đảm bảo chỉ một số duy nhất được tạo ra cho mỗi transaction, giá trị `nonce` hiện tại phải được query và sau đó tăng lên 1.
- Giá trị nonce hiện tại có thể nhận được bằng cách sử dụng variable `provider` mà chúng ta [đã tạo trước đó](#setting-up-a-connection-to-near).

```js
const accessKey = await provider.query(
  `access_key/${sender}/${publicKey.toString()}`,
  ""
);
```

- bây giờ chúng ta có thể tạo một số duy nhất cho transaction của chúng ta bằng cách tăng giá trị `nonce` hiện tại.

```js
const nonce = ++accessKey.nonce;
```

### 5 `actions`

- Hiện tại, có tám loại `Action` được hỗ trợ. [[see here]](/concepts/protocol/transactions#action)
- Trong ví dụ này, chúng ta sử dụng `Transfer`
- Action transfer này có thể được tạo bằng cách sử dụng [object `nearAPI` đã được import](#imports) và[amount Ⓝ đã được format](#formatting-token-amounts) được tạo ra trước đó.

```js
const actions = [nearAPI.transactions.transfer(amount)];
```

[[bấm vào đây]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L70-L72) để xem source của method `transfer()`.

### 6 `blockHash`

- Mỗi transaction yêu cầu một hash của block hiện tại (trong 24 giờ) để chứng mình rằng transaction này vừa được tạo.
- Hash phải được chuyển thành một byte array bằng các dùng method `base_decode` nằm trong [`nearAPI`](#imports).

```js
const recentBlockHash = nearAPI.utils.serialize.base_decode(
  accessKey.block_hash
);
```

[[bấm vào đây]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/utils/serialize.ts#L16-L17) để view source của method `base_decode()`.

---

### Constructing the Transaction

Bây giờ, chúng ta có thể tạo transaction bằng tất cả [các tham số yêu cầu](#transaction-requirements) ở trên.

- Sử dụng [`nearAPI`](#imports), chúng ta call method `createTransaction()` để thực hiện công việc này.

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

[[bấm vào đây]](https://github.com/near/near-api-js/blob/d4d4cf1ac3182fa998b1e004e6782219325a641b/src/transaction.ts#L95-L110) để xem source code của class Transaction

---

### Sign Transaction

Bây giờ transaction đã được tạo ra, chúng ta sign nó trước khi gửi nó đến NEAR blockchain. Ở tầng thấp nhất, có bốn bước cho quá trình này.

1. Sử dụng [`nearAPI`](#imports), chúng ta call method `serialize()` để serialize transaction bằng [Borsh](https://borsh.io/).

```js
const serializedTx = nearAPI.utils.serialize.serialize(
  nearAPI.transactions.SCHEMA.Transaction,
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

### Send Transaction

Bước cuối cùng là encode và gửi transaction này.

- Đầu tiên chúng ta serialize transaction bằng [Borsh](https://borsh.io/), và lưu kết quả trong variable `signedSerializedTx`. _(bắt buộc với tất cả các transaction)_
- Sau đó chúng ta gửi transaction thông qua một [RPC call](/api/rpc/introduction) sử dụng method `sendJsonRpc()` nằm trong [`near`](#setting-up-connection-to-near).

```js
// encode transaction bằng Borsh serialize (bắt buộc với tất cả các transaction)
const signedSerializedTx = signedTransaction.encode();
// gửi transaction tới NEAR blockchain thông qua JSON RPC call và ghi lại kết quả
const result = await provider.sendJsonRpc("broadcast_tx_commit", [
  Buffer.from(signedSerializedTx).toString("base64"),
]);
```

### Transaction Results

Các kết quả chi tiết của transction được trả về dưới dạng sau:

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

Để biết thêm thông tin chi tiết của các transaction receipt [[bấm vào đây]](https://nomicon.io/RuntimeSpec/Receipts.html)

- To view the transaction in [NearBlocks Explorer](https://testnet.nearblocks.io/), enter the `hash` located under `transaction` / `Transaction Results`.
- Hơn nữa, bạn có thể tạo một link trong JS bằng cách sử dụng `networkId` và `result.transaction.hash`.

```js
const prefix = (networkId === "testnet") ? "testnet." : "";
const transactionLink = `https://${prefix}nearblocks.io/txns/${result.transaction.hash}`;
```

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>Ask it on StackOverflow!</h8></a>
:::

Happy Coding! 🚀
