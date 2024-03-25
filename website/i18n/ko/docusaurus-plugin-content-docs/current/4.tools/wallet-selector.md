# NEAR 지갑 선택기

이는 사용자가 선호하는 지갑을 선택하여 NEAR 프로토콜과 쉽게 상호 작용할 수 있게 하는, 탐색하기 쉬운 도구입니다.

NEAR 재단이 2022년 3월에 출시한 이 간단한 도구는 NEAR 블록체인에서 사용자에게 "지갑 연결" 옵션이 제공될 때마다 나타납니다.

![Preview](/docs/assets/wallet-selector-preview.png) *[지갑 선택기](https://near.github.io/wallet-selector/) 초기 화면*

---

## 프레임워크 불가지론

[React](https://reactjs.org/) / [Next.js](https://nextjs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book-examples/) dApp can be found in the [`examples`](https://github.com/near/wallet-selector/tree/main/examples) directory. 개발자는 이를 사용하여 NEAR 지갑 선택기를 자신의 dApp에 통합하는 방법을 구체적으로 이해할 수 있습니다.

### 지갑 생태계 개방

지갑 선택기는 NEAR 생태계 내의 다양한 지갑 및 지갑 유형에 대한 추상화를 제공하여, 사용자가 dApp과 쉽게 상호 작용할 수 있도록 합니다.

:::info

현재 지원되는 지갑 목록은 near/wallet-selector 레퍼지토리의 [README.md](https://github.com/near/wallet-selector/blob/main/README.md) 파일에서 확인할 수 있습니다.

:::

NEAR의 개방적이고 포괄적인 접근 방식 덕분에, 다른 지갑 개발자는 지갑 선택기에 새 지갑을 추가하는 방법에 대한 [NEAR Github 레퍼지토리](https://github.com/near/wallet-selector)의 문서 및 지침에 따라 NEAR 생태계에 기여할 수 있습니다.

:::tip

지갑 선택기에 새 지갑을 포함하는 방법에 대해 자세히 알아보려면 이 [링크](https://github.com/near/wallet-selector/blob/main/CONTRIBUTING.md#listing-criteria-for-third-party-wallet-on-wallet-selector)에서 타사 지갑에 대한 리스팅 기준을 확인할 수 있습니다.

:::

## 설치

NEAR 지갑 선택기를 사용하는 가장 쉬운 방법은, NPM 레지스트리에서 핵심 패키지를 설치하는 것입니다. 일부 패키지에는 near-api-js v0.44.2 이상이 필요할 수 있습니다.

```bash
npm install near-api-js@^0.44.2
```

```bash
npm install @near-wallet-selector/core
```

다음으로 지원하려는 지갑을 설치해야 합니다.

```bash
npm install \
  @near-wallet-selector/near-wallet \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/sender \
  @near-wallet-selector/nearfi \
  @near-wallet-selector/here-wallet \
  @near-wallet-selector/math-wallet \
  @near-wallet-selector/nightly \
  @near-wallet-selector/meteor-wallet \
  @near-wallet-selector/ledger \
  @near-wallet-selector/wallet-connect \
  @near-wallet-selector/nightly-connect \
  @near-wallet-selector/default-wallets \
  @near-wallet-selector/coin98-wallet
```

## 지갑 선택기 설정

선택적으로 `core` API를 래핑하고 지원되는 지갑을 표시하는 미리 빌드된 인터페이스용 [`modal-ui`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui) 또는 [`modal-ui-js`](https://www.npmjs.com/package/@near-wallet-selector/modal-ui-js) 패키지를 설치할 수 있습니다

```bash
npm install @near-wallet-selector/modal-ui
```

그런 다음 이를 dApp에서 사용하세요.

```ts
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupNearWallet()],
});

const modal = setupModal(selector, {
  contractId: "test.testnet",
});

modal.show();
```

:::info Required CSS

To integrate the Wallet Selector, you also need to include the required CSS:

```
import "@near-wallet-selector/modal-ui/styles.css"
```

:::

## API 참조

선택기의 API 참조는 [여기](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md)에서 찾을 수 있습니다.

## 지갑 API

### 로그인

```ts
// NEAR Wallet.
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.signIn({ contractId: "test.testnet" });
})();
```

### 로그아웃

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signOut();
})();
```

### 계정 가져오기

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  const accounts = await wallet.getAccounts();
  console.log(accounts); // [{ accountId: "test.testnet" }]
})();
```

### 소유자 검증

```ts
// MyNearWallet
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.verifyOwner({
    message: "Test message",
  });
})();
```

### 한 개의 트랜잭션 서명 / 전송

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signAndSendTransaction({
    actions: [
      {
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: "Hello World!" },
          gas: "30000000000000",
          deposit: "10000000000000000000000",
        },
      },
    ],
  });
})();
```

### 여러 개의 트랜잭션 서명 / 전송

```ts
(async () => {
  const wallet = await selector.wallet("my-near-wallet");
  await wallet.signAndSendTransactions({
    transactions: [
      {
        receiverId: "guest-book.testnet",
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: { text: "Hello World!" },
              gas: "30000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      },
    ],
  });
})();
```
