---
id: frontend
title: 웹 프론트엔드 구축
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

컨트랙트가 배포되면, 웹 프론트엔드에서 컨트랙트와 상호작용하게 될 가능성이 높습니다.

프론트엔드를 만들기 위해선, 두 가지 도구를 활용합니다.
1. `Wallet Selector`: 사용자가 dApp에서 NEAR 지갑을 사용할 수 있도록 합니다.
2. `NEAR API JS`: NEAR RPC와 상호 작용하는 도구 세트입니다.

이러한 도구를 사용하여 다음 흐름을 구현합니다.
1. wallet selector를 **설정합니다**.
1. **시작할 때** wallet selector를 로드합니다.
2. 사용자에게 NEAR 지갑을 사용하여 **로그인**하도록 요청합니다.
2. 컨트랙트 내 **메서드를 호출합니다**.


---

## NEAR API JS 및 Wallet Selector 추가
`near-api-js` 및 `wallet-selector`를 사용하려면, 먼저 프로젝트에 이를 추가해야 합니다.

Wallet selector에는 선택할 수 있는 여러 지갑 패키지가 있습니다. [해당 웹사이트](https://github.com/near/wallet-selector#installation-and-usage)를 확인해 보세요.

```bash
npm install \
  near-api-js@^0.44.2 \
  @near-wallet-selector/core \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/ledger
```
<details>
<summary>일반 HTML에서의 사용</summary>

HTML 내 스크립트 태그로 `near-api-js`를 추가할 수 있습니다.

```js
<script src="https://cdn.jsdelivr.net/npm/near-api-js@0.44.2/dist/near-api-js.min.js" integrity="sha256-W5o4c5DRZZXMKjuL41jsaoBpE/UHMkrGvIxN9HcjNSY=" crossorigin="anonymous"></script>
```
</details>

---

## Wallet 객체 생성
이 예제에서 우리는 [`./near-wallet.js`](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js) 모듈을 구현할 것입니다. 단순화를 위해 `wallet selector`를 `Wallet` 객체로 추상화하였습니다.

지갑을 만드려면, 모듈에서 `Wallet` 객체를 가지고 와서 초기화하면 됩니다. 이 `wallet`은 나중에 사용자로 하여금 NEAR 내 모든 컨트랙트를 호출할 수 있도록 합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="2" end="8" />
  </Language>
</CodeTabs>

지갑을 인스턴스화할 때, **[함수 호출 키](../../1.concepts/basics/accounts/access-keys.md#function-call-keys-function-call-keys)를 생성**할지 여부를 선택할 수 있습니다.

키를 생성하면 dApp은 지정된 컨트랙트에서 사용자 대신 **non-payable 트랜잭션에 자동으로** 서명 할 수 있습니다.

### 사용자 정의 RPC 엔드포인트 설정

Wallet Selector와 함께 사용자 정의 RPC 엔드포인트를 사용하려면 사용자 정의 URL로 [네트워크 옵션](https://github.com/near/wallet-selector/tree/main/packages/core#options) 객체를 설정해야 합니다. 예를 들어:

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">

```js title="index.js"
const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;

const my_network = {
    networkId: "my-custom-network",
    nodeUrl: "https://rpc.custom-rpc.com",
    helperUrl: "https://helper.custom-helper.com",
    explorerUrl: "https://custom-explorer.com",
    indexerUrl: "https://api.custom-indexer.com",
  };

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS, network: my_network });
```

  </Language>
</CodeTabs>

:::tip

[여기](https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/selector.md)에서 전체 Wallet Selector API 참조를 찾을 수 있습니다.

:::

---

## 지갑 시작
이 예제에서는 항상 사용자가 로그인했는지 확인하고 조치를 취하는 것으로 시작하는 간단한 흐름을 구현합니다. 예제와 동일한 작업을 수행하는 것이 좋습니다.

이를 위해, `wallet.startUp()` 메서드를 호출하는 함수로 `window.onload` 메서드를 재정의합니다. 사용자가 이미 로그인한 경우에 해당 메서드가 반환됩니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="10" end="21" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
            start="36" end="52" />
  </Language>
</CodeTabs>

실제로 내부에서(`near-wallet` 탭 참조) wallet selector를 설정하고 사용자가 이미 로그인했는지 묻는 것을 볼 수 있습니다.

---

## view 메서드 호출
지갑이 가동되면 view 메서드, 즉 읽기 전용 작업을 수행하는 메서드 호출을 시작할 수 있습니다.

읽기 전용 특성으로 인해 view 메서드는 **자유롭게** 호출할 수 있으며, 사용자는 **로그인**되어 있을 **필요가 없습니다**.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="46" end="46" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
            start="68" end="81" />
  </Language>
</CodeTabs>

위의 스니펫은 view 메서드를 호출하는 방법을 보여줍니다. 실제로 내부에서 발생하는 작업을 보려면 `near-wallet` 탭으로 전환하세요. 실제로 `near-api-js`를 사용하여 RPC를 **직접 호출**하고 있습니다.

:::tip view 메서드 실행에는 기본적으로 200 TGAS가 듭니다.


---

## 사용자 로그인/로그아웃
non-view 메서드와 상호 작용하려면, 사용자는 먼저 NEAR 지갑을 사용하여 로그인해야 합니다.

로그인은 `wallet` 객체에 `signIn`을 요청하는 것만큼 간단하며, 로그아웃에도 동일하게 간단합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="25" end="26" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
            start="54" end="66" />
  </Language>
</CodeTabs>

사용자가 버튼을 클릭하면, 지갑을 선택하고 로그인하는 데 지갑을 사용하라는 메시지가 표시됩니다.

<hr class="subsection" />

### 함수 호출 키
`createAccessKeyFor` 매개변수에 대해 계정을 전달해 `Wallet`을 인스턴스화한 경우, 지갑은 [함수 호출 키](../../1.concepts/basics/accounts/access-keys.md#function-call-keys-function-call-keys)를 생성하여 웹의 로컬 스토리지에 저장합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="8" end="8" />
  </Language>
</CodeTabs>

기본적으로, 이러한 키를 사용하면 사용자에게 서명하라는 메세지를 **표시하지 않아도** **지정된** 컨트랙트 에서 최대 `0.25Ⓝ`의 가스를 소모하는 호출 메서드를 사용할 수 있습니다.

반대로, 만약 액세스 키를 생성하지 않는다면, 사용자는 모든 트랜잭션에 서명하라는 메시지를 받게 됩니다(`view methods`는 항상 무료이므로 이에 대한 호출은 제외).

:::tip 이는 **non-payable** 메서드에만 적용된다는 점에 유의하세요. 호출에 돈을 첨부하면, 사용자는 트랜잭션 컨펌을 위해 **항상** 지갑으로 리디렉션됩니다. :::

---

## 변경 메서드 호출
사용자가 로그인하면 변경 메서드 호출을 시작할 수 있습니다. 프로그래밍 방식으로 변경 메서드를 호출하는 것은 view 메서드를 호출하는 것과 비슷하지만, 이제 호출에 돈을 첨부하고 사용할 가스의 양을 지정할 수 있습니다.

호출에 돈을 첨부하도록 요청하면, 사용자가 트랜잭션을 수락하기 위해 NEAR 지갑으로 리디렉션된다는 점에 유의해야 합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/index.js"
            start="36" end="36" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
            start="83" end="103" />
  </Language>
</CodeTabs>

내부적으로(`near-wallet` 탭 ​​참조), **지갑**에게 **함수 호출 트랜잭션에 서명**하도록 요청하고 있음을 알 수 있습니다.

:::tip **모든** 컨트랙트에서 메소드를 호출할 때 `wallet`을 사용할 수 있음을 기억하세요. 함수 키 생성을 요청하지 않은 경우, 사용자에게는 트랜잭션을 확인하라는 메시지만 표시됩니다. :::

<hr class="subsection" />


### 지갑 리디렉션
변경 호출에 돈을 첨부하면, 사용자는 트랜잭션을 수락하기 위해 지갑으로 리디렉션됩니다. 수락 후 사용자는 귀하의 웹사이트로 돌아가고, 결과로 나오는 트랜잭션 해시는 URL의 일부로 전달됩니다(예: ``your-website.com/?transactionHashes=...`).

호출된 메서드가 결과를 반환한 경우, 트랜잭션 해시를 사용하여 네트워크에서 결과를 검색할 수 있습니다. [위의 예시](#connecting-to-a-contract)에서와 같이 `near` 객체를 만들었다고 가정하면, 다음과 같은 작업을 수행하여 결과를 조회합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
  <Github fname="index.js"
            url="https://github.com/near-examples/donation-js/blob/master/frontend/index.js"
            start="74" end="80" />
    <Github fname="utils.js"
            url="https://github.com/near-examples/donation-js/blob/master/frontend/near-wallet.js"
            start="105" end="113" />
  </Language>
</CodeTabs>

---
## 자료형 핸들링
컨트랙트에서 메서드를 호출하거나 결과를 수신할 때, 매개변수를 올바르게 인코딩/디코딩해야 합니다. 이를 위해서는 컨트랙트가 타임스탬프(u64)와 금액(u128)을 어떻게 인코딩하는지 아는 것이 중요합니다.

##### 시간
스마트 컨트랙트의 블록 타임스탬프는 나노초(예: 19자리 - `1655373910837593990`)를 사용하여 인코딩됩니다. 반대로 Javascript의 `Date.now()`는 밀리초 단위의 타임스탬프를 반환합니다(예: 13자리 - `1655373910837`). 시간 변수를 적절하게 처리하려면 밀리초와 나노초 간 변환이 올바르게 이루어져야 합니다.

##### 자금
스마트 컨트랙트는 항상 yocto NEAR(1Ⓝ = 10^24yocto) 단위로 이야기하고, 해당 값은 `string`으로 인코딩됩니다.
  - `near-api-js.utils.format.parseNearAmount(amount.toString())`를 사용하여 컨트랙트로 돈을 보내기 전에 NEAR를 yocto로 변환합니다.
  - `near-api-js.utils.format.formatNearAmount(amount)`를 사용하여 yoctoNEAR 형태의 응답 결과를 NEAR 단위로 변환합니다

:::tip 컨트랙트가 `U128` 대신 `Balance`를 반환하면, `string` 대신 `number`의 "과학적 표기법"을 받게 될 것입니다(예: `"1000000"` 대신 `10^6`). 이 경우, 다음과 같이 값을 NEAR로 변환할 수 있습니다.
```js
function formatAmount(amount) {
  let formatted = amount.toLocaleString('fullwide', { useGrouping: false })
  formatted = utils.format.formatNearAmount(formatted)
  return Math.floor(formatted * 100) / 100
}
```

:::



---

## NEAR API JS 이용
NEAR API JS는 단순히 컨트랙트에서 메서드를 호출하는 작업만으로 제한되지 않습니다. 사실, 이를 통해 웹 앱에서 더 풍부한 사용자 경험을 제공할 수 있습니다. 이러한 주제를 깊이 다루지는 않겠지만, NEAR API JS를 사용하면 다음과 같은 작업도 가능하다는 사실을 아는 것이 중요합니다.

- **[메세지 서명 및 검증](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/verify-signature.js)**: 메시지가 사용자에 의해 생성되었음을 증명하는 데 매우 유용합니다.
- **[배치 트랜잭션 만들기](https://github.com/near/near-api-js/tree/master/packages/cookbook/transactions/batch-transactions.js)**: 여러 [작업](/develop/contracts/actions)(예: 여러 메서드 호출)을 연결할 수 있습니다. 트랜잭션 중 하나가 실패하면 모두 되돌려집니다.
- **[계정 생성](https://github.com/near/near-api-js/tree/master/packages/cookbook/accounts/create-testnet-account.js)**: 사용자를 위한 계정을 배포하세요!

웹앱을 강화하는 방법을 알아보려면 [설명서](/tools/near-api-js/cookbook)를 확인하세요 .