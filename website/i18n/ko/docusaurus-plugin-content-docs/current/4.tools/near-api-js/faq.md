---
id: faq
title: NEAR JavaScript API에 대한 FAQ
sidebar_label: FAQ
---

커뮤니티에서 자주 묻는 질문 모음입니다.


## 일반 {#general}

### `near-api-js`를 정적 html 페이지에서 사용할 수 있나요? {#can-i-use-near-api-js-on-a-static-html-page}

CDN에서 스크립트를 로드할 수 있습니다.

```html
<script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
```

:::note 최신 버전을 로드했는지 확인하세요.

버전 목록은 [npmjs.com](https://www.npmjs.com/package/near-api-js)에 있습니다.

<details>
<summary>구현 예시</summary>
<p>

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <ul id="messages"></ul>
  <textarea id="text" placeholder="Add Message"></textarea>
  <button id="add-text">Add Text</button>
  <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
  <script>
    // connect to NEAR
    const near = new nearApi.Near({
      keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://testnet.mynearwallet.com/'
    });
    
    // connect to the NEAR Wallet
    const wallet = new nearApi.WalletConnection(near, 'my-app');

    // connect to a NEAR smart contract
    const contract = new nearApi.Contract(wallet.account(), 'guest-book.testnet', {
      viewMethods: ['getMessages'],
      changeMethods: ['addMessage']
    });

    const button = document.getElementById('add-text');
    if (!wallet.isSignedIn()) {
      button.textContent = 'SignIn with NEAR'
    }

    // call the getMessages view method
    contract.getMessages()
      .then(messages => {
        const ul = document.getElementById('messages');
        messages.forEach(message => {
          const li = document.createElement('li');
          li.textContent = `${message.sender} - ${message.text}`;
          ul.appendChild(li);
        })
      });

    // Either sign in or call the addMessage change method on button click
    document.getElementById('add-text').addEventListener('click', () => {
      if (wallet.isSignedIn()) {
        contract.addMessage({
          args: { text: document.getElementById('text').value },
          amount: nearApi.utils.format.parseNearAmount('1')
        })
      } else {
        wallet.requestSignIn({
          contractId: 'guest-book.testnet',
          methodNames: ['getMessages', 'addMessage']
        });
      }
    });
  </script>
</body>

</html>
```

</p>
</details>

---

### 어떤 프론트엔드 프레임워크에서 JavaScript API를 사용할 수 있나요?

JavaScript API는 프레임워크에 구애받지 않습니다. React, Vue, Angular 등과 같은 모든 프론트엔드 프레임워크를 사용할 수 있습니다.

[`create-near-app`](https://github.com/near/create-near-app)은 여러 템플릿으로 프로젝트를 빠르게 부트스트랩하는 데 사용될 수 있는 도구입니다.

    npx create-near-app

### React Native와 같은 모바일 JavaScript 프레임워크에서 JavaScript API를 사용할 수 있나요?

JavaScript API는 대부분의 JavaScript 런타임에서 사용할 수 있으며, 내부적으로는 NEAR의 [RPC API](/api/rpc/introduction)에 대한 추상화입니다. 그러나 지갑을 모든 곳에서 사용할 수는 없습니다. 예를 들어, React Native 앱에서는 앱의 웹 버전에서 지갑을 사용할 수 있지만, 기본 앱 배포에서는 작동하지 않습니다.

iOS 또는 Android 내 `WebView` 구성 요소에서 지갑을 사용할 수 있지만, 이는 `KeyStore`에 대해 `LocalStorage`를 사용하고, `WebView` 구성 요소 로딩를 관리할 때 스토리지를 유지하는 것은 사용자의 책임이라는 것을 기억하세요.

---

## 트랜잭션 {#transactions}

### 트랜잭션 상태 확인 방법

[요리책](/tools/near-api-js/cookbook)에서 트랜잭션에 대한 예를 참조하세요.

### near-api-js에 의해 트랜잭션이 서명되고 전송되는 방법

트랜잭션 데이터가 네트워크에 전달되고 최종적으로 블록에 포함되기 전에 관련된 몇 가지 단계가 있습니다. 다음 단계는 사용자 계정에서 트랜잭션을 생성, 서명 및 최종적으로 수행할 때 수행됩니다.

1. 사용자는 [`account.signAndSendTransaction` 메서드를](https://github.com/near/near-api-js/blob/f78616480ba84c73f681211fe6266bd2ed2b9da1/packages/near-api-js/src/account.ts#L200)를 사용하여 트랜잭션 객체를 생성합니다. 이 메서드는 Action 배열을 수락하고 트랜잭션 결과에 대한 객체를 반환합니다.
2. 트랜잭션은 [account.signTransaction 메서드](https://github.com/near/near-api-js/blob/f78616480ba84c73f681211fe6266bd2ed2b9da1/packages/near-api-js/src/account.ts#L204)를 사용하여 서명됩니다. 이 메서드는 Action 배열을 수락하고 서명된 트랜잭션 객체를 반환합니다.
3. 서명된 트랜잭션 객체는 [`account.connection.provider.sendTransaction` 메서드](https://github.com/near/near-api-js/blob/f78616480ba84c73f681211fe6266bd2ed2b9da1/packages/near-api-js/src/account.ts#L208)를 통해 네트워크로 전송됩니다. 이 메서드는 서명된 트랜잭션 객체를 수락하고 트랜잭션 해시를 반환합니다. 이 단계는 [트랜잭션 객체에 대한 borsh 직렬화를 수행](https://github.com/near/near-api-js/blob/f78616480ba84c73f681211fe6266bd2ed2b9da1/packages/near-api-js/src/providers/json-rpc-provider.ts#L80)하고 [base64로 인코딩된 직렬화된 트랜잭션 개체로 JSON RPC 메서드 `broadcast_tx_commit`](https://github.com/near/near-api-js/blob/f78616480ba84c73f681211fe6266bd2ed2b9da1/packages/near-api-js/src/providers/json-rpc-provider.ts#L81)를 호출합니다.

### 배치(Batch) 트랜잭션 전송 방법

`account`에서 `signAndSendTransaction({})` 메서드를 사용하여 트랜잭션을 일괄 전송할 수 있습니다. 이 메서드는 일련의 트랜잭션 작업을 수행하며, 하나가 실패하면 전체 작업이 실패합니다. 다음은 간단한 예입니다.

```js
const { connect, transactions, keyStores } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const CONTRACT_NAME = "spf.idea404.testnet";
const WASM_PATH = path.join(__dirname, "../build/uninitialized_nft.wasm");

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
  const args = { some_field: 1, another_field: "hello" };

  const balanceBefore = await account.getAccountBalance();
  console.log("Balance before:", balanceBefore);

  try {
    const result = await account.signAndSendTransaction({
      receiverId: CONTRACT_NAME,
      actions: [
        transactions.deployContract(fs.readFileSync(WASM_PATH)),  // Contract does not get deployed
        transactions.functionCall("new", Buffer.from(JSON.stringify(args)), 10000000000000, "0"),  // this call fails
        transactions.transfer("1" + "0".repeat(24)), // 1 NEAR is not transferred either
      ],
    });
    console.log(result);
  } catch (e) {
    console.log("Error:", e);
  }

  const balanceAfter = await account.getAccountBalance();
  console.log("Balance after:", balanceAfter);
}
```

```
Balance before: {
  total: '49987878054959838200000000',
  stateStaked: '4555390000000000000000000',
  staked: '0',
  available: '45432488054959838200000000'
}
Receipts: 2PPueY6gnA4YmmQUzc8DytNBp4PUpgTDhmEjRSHHVHBd, 3isLCW9SBH1MrPjeEPAmG9saHLj9Z2g7HxzfBdHmaSaG
    Failure [spf.idea404.testnet]: Error: {"index":1,"kind":{"ExecutionError":"Smart contract panicked: panicked at 'Failed to deserialize input from JSON.: Error(\"missing field `owner_id`\", line: 1, column: 40)', nft/src/lib.rs:47:1"}}
Error: ServerTransactionError: {"index":1,"kind":{"ExecutionError":"Smart contract panicked: panicked at 'Failed to deserialize input from JSON.: Error(\"missing field `owner_id`\", line: 1, column: 40)', nft/src/lib.rs:47:1"}}
    at parseResultError (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/utils/rpc_errors.js:31:29)
    at Account.<anonymous> (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/account.js:156:61)
    at Generator.next (<anonymous>)
    at fulfilled (/Users/dennis/Code/naj-test/node_modules/near-api-js/lib/account.js:5:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  type: 'FunctionCallError',
  context: undefined,
  index: 1,
  kind: {
    ExecutionError: 'Smart contract panicked: panicked at \'Failed to deserialize input from JSON.: Error("missing field `owner_id`", line: 1, column: 40)\', nft/src/lib.rs:47:1'
  },
  transaction_outcome: {
    block_hash: '5SUhYcXjXR1svCxL5BhCuw88XNdEjKXqWgA9X4XZW1dW',
    id: 'SKQqAgnSN27fyHpncaX3fCUxWknBrMtxxytWLRDQfT3',
    outcome: {
      executor_id: 'spf.idea404.testnet',
      gas_burnt: 4839199843770,
      logs: [],
      metadata: [Object],
      receipt_ids: [Array],
      status: [Object],
      tokens_burnt: '483919984377000000000'
    },
    proof: [ [Object], [Object], [Object], [Object], [Object] ]
  }
}
Balance after: {
  total: '49985119959346682700000000',
  stateStaked: '4555390000000000000000000',
  staked: '0',
  available: '45429729959346682700000000'
}

```

[요리책](/tools/near-api-js/cookbook)에서 배치 트랜잭션의 예를 찾을 수도 있습니다.

---

## 계정 {#accounts}

### `Account`와 `ConnectedWalletAccount`의 차이점은 무엇인가요?

NEAR의 지갑은 웹 기반이기 때문에 지갑과의 상호 작용은 웹 브라우저 환경에서만 가능합니다. `Account`와 `ConnectedWalletAccount`의 차이점은 주로 트랜잭션에 서명하는 방식에 관한 것입니다. `ConnectedWalletAccount`은 지갑을 사용하여 트랜잭션을 승인합니다. 내부적으로 `ConnectedWalletAccount`는 `Account` 내 몇 가지 메서드를 상속하고 덮어씁니다.

### 암시적 계정(Implicit Account)은 어떻게 생성하나요?

이에 대해서는 [암시적 계정](https://docs.near.org/integrator/implicit-accounts)에 대한 문서에서 읽을 수 있습니다.

---

## 컨트랙트 {#contracts}

### 가스/보증금은 어떻게 첨부하나요? {#how-do-i-attach-gas--a-deposit}

[컨트랙트가 인스턴스화되면](/tools/near-api-js/quick-reference#load-contract), 컨트랙트를 호출하고 첨부된 가스의 양을 지정할 수 있습니다.

```js
await contract.method_name(
  {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  "300000000000000", // attached GAS (optional)
  "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
);
```

---

## 일반적인 에러 {#common-errors}

### RPC 에러

RPC 엔드포인트에서 발생하고 JavaScript API가 전파하는 전체 오류 메시지에 대해서는 [목록](https://github.com/near/near-api-js/blob/16ba17251ff7d9c8454261001cd6b87e9a994789/packages/near-api-js/src/res/error_messages.json)을 참조하십시오.

### 누락된 컨트랙트 메서드 {#missing-contract-method}

클라이언트 측에서 `Contract` 인스턴스를 구성할 때, 컨트랙트 메서드를 지정해야 합니다. 철자가 틀리거나 일치하지 않거나 메서드 이름이 누락된 경우 누락된 메서드에 대한 오류가 표시됩니다.

다음은 메서드가 누락되거나 잘못된 몇 가지 경우를 나타낸 것입니다.
- 생성자(constructor)에서 지정하지 않은 메서드를 호출할 때.
- 블록체인의 컨트랙트에 존재하지 않는 메서드를 호출하는 경우(그러나 클라이언트 측 생성자(constructor)에서 지정한 경우).
- `viewMethods`와 `changeMethods`가 일치하지 않을 때.

예를 들어, 다음 컨트랙트 코드를 살펴보겠습니다. 그것은 하나의 `view`와 하나의 `call` 메서드를 포함합니다:

```js
@NearBindgen
class MyContract extends NearContract {
  constructor() { super(); }

  @view
  method_A_view(): string {
    return 'Hi';
  }

  @call
  method_B_call(): void {}
}
```

#### 누락된 메세지에 대한 클라이언트 측 에러

##### `TypeError: contract.METHOD_NAME is not a function`

다음 컨트랙트 생성자는 `method_A_view`만 선언하고, `method_B_call`를 선언하지 않았습니다.
```js
const contract = await new nearAPI.Contract(
  walletConnection.account(), 'guest-book.testnet',
  {
    viewMethods: ['method_A_view'], // <=== Notice this
    changeMethods: [], // <=== Notice this
    sender: walletConnection.getAccountId(),
  }
);

// This will work because we declared `method_A_view` in constructor
await contract.method_A_view();

// This will throw `TypeError: contract.method_B_call is not a function` 
// because we didn't declare `method_B_call` in constructor, 
// even if it exists in the real contract.
await contract.method_B_call();

// This will also throw `TypeError: contract.method_C is not a function`,
// not because `method_C` doesn't exist on the contract, but because we didn't declare it
// in the client-side constructor.
await contract.method_C();
```

#### 누락된 메서드에 대한 RPC 에러

##### `wasm execution failed with error: FunctionCallError(MethodResolveError(MethodNotFound))`

이 예제에서 메서드를 지정하고 호출하였지만, 이 메서드는 블록체인에 존재하지 않습니다.
```js
}
);
// We did specify `method_C` name in constructor, so this function exists on client-side `contract` instance,
// but a method with this name does not exist on the actual contract on the blockchain.
  const contract = await new nearAPI.Contract(
  // ...
  // Even though the method exists on the actual blockchain contract,
// we didn't specify `method_A_view` in the contract's client-side constructor.
{
    viewMethods: ["method_C"], // <=== method_C doesn't exist on the contract above
    changeMethods: [],
    // ...
await contract.method_A_view();
// This will return an error from RPC call `FunctionCallError(MethodResolveError(MethodNotFound))`
// and will throw it on the client-side
await contract.method_C();

// Notice: if we call `method_A_view` we get `TypeError: contract.method_A_view is not a function`.
```

##### `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`

마지막 경우는 `viewMethods`와 `changeMethods`가 일치하지 않는 경우입니다.

위 컨트랙트에서 우리는 다음과 같이 선언했습니다.
- `@view` 메서드 - `method_A_view`
- `@call` 메서드 -`method_B_call`

클라이언트 쪽 생성자에서 컨트랙트의 `@view` 메서드 이름은 `viewMethods` 아래에 지정되어야 하고, 컨트랙트의 `@call` 메서드 이름은 `changeMethods` 아래에 지정되어야 합니다. 자료형이 일치하지 않으면 오류가 발생합니다.

예를 들어:
```js
const contract = await new nearAPI.Contract(
  // ...
  // `method_A_veiw` should be declared under `viewMethods` and in our example here we declare it under `changeMethods`.
  }
);

// This will return an error from RPC call and throw:
// `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`
// This error indicates that we are trying to call a state-changing method but declare it as a read-only method in client-side.
await contract.method_A_view();
await contract.method_B_call();

// The following behavior is undefined and might not work as expected.
{
    viewMethods: ['method_B_call'], // <=== here should be `method_A_view`
    changeMethods: ['method_A_view'], // <=== and here should be `method_B_call`
    // ...
```

### Class `{X}` is missing in schema: publicKey

현재 JavaScript API 라이브러리에는 `import`를 두 번 이상 사용하면 네임스페이스 충돌이 발생할 수 있다는 알려진 문제가 있습니다.

임시 해결 방법: 예를 들자면, 테스트를 실행할 때 다시 가져오지 않도록 합니다.

---

### `regeneratorRuntime` 가 정의되지 않음 {#regeneratorruntime-is-not-defined}

You are probably using [Parcel](https://parceljs.org/) like we do in [other examples](https://github.com/near-examples). 기본 JS 파일(아마도 `index.js`)의 맨 위에 아래와 같은 줄이 있는지 확인하세요. (대부분의 경우 `index.js`)

```js
import "regenerator-runtime/runtime";
```

- 또한 `package.json`에서 의존성(dependency) 확인을 통해, 이를 위한 의존성이 프로젝트 내에 모두 추가되어 있는지 확인하세요. 찾을 수 없는 경우 터미널에서 다음과 같은 명령어를 실행하여 설치할 수 있습니다.

```bash
npm install regenerator-runtime --save-dev
```

---

### `Node.js` 사용했을 때 발생하는 창 오류 {#window-error-using-nodejs}

브라우저용 키 저장소(Key tore)를 사용하고 있을 수 있습니다. 대신 [파일시스템(filesystem) 키](/tools/near-api-js/quick-reference#key-store) 또는 개인 키 문자열을 사용하세요.

**브라우저 키 저장소**

```js
const { keyStores } = require("near-api-js");
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
```

**브라우저 키 저장소:**

```js
const { keyStores } = require("near-api-js");
const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);
```
