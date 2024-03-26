---
id: coin-flip
title: 동전 던지기
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

동전 던지기는 플레이어가 동전 던지기의 결과를 추측하는 게임입니다. 이는 난수를 구현하는 가장 간단한 컨트랙트 중 하나입니다.

![img](/docs/assets/examples/coin-flip.png)

---

## 게임 시작하기
예제를 시작하는 두 가지 옵션이 있습니다.
1. **권장:** Gitpod(웹 기반 대화형 환경)를 통해 앱 사용
2. Clone the project locally.

| Gitpod                    | Clone locally                                             |
| ------------------------- | --------------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-examples.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | `https://github.com/near-examples/coin-flip-examples.git` |


Gitpod를 선택하면 새 브라우저 창이 코드와 함께 자동으로 열립니다. 잠시 기다리면 프론트엔드가 팝업됩니다(팝업 창이 차단되지 않았는지 확인).

If you are running the app locally, you should build and deploy a contract (JavaScript or Rust version) and a client manually.

---

## 게임과 상호 작용하기
계속해서 NEAR 계정으로 로그인하십시오. 계정이 없는 경우 즉시 만들 수 있습니다. 로그인한 후 `tails`와 `heads` 버튼을 통해 다음 동전 던지기 결과를 추측해 보세요.

![img](/docs/assets/examples/coin-flip.png) *게임의 프론트엔드*

---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다
2. The smart contract code in Rust is in the `/contract-rs` folder.
3. The smart contract code in JavaScript is in the `/contract-ts` folder.

:::note
Both Rust and JavaScript versions of the contract implement the same functionality.
:::

### 컨트랙트
컨트랙트는 `flip_coin`과 `points_of`의 두 가지 메서드를 가지고 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="49" end="81" />
  </Language>
</CodeTabs>

### 프론트엔드
프론트엔드는 하나의 HTML 파일(`/index.html`)로 구성됩니다. 이 파일은 화면에 표시되는 구성 요소를 정의합니다.

웹사이트의 로직은 `/assets/js/index.js`에 존재하며 `wallet`를 통해 컨트랙트와 통신합니다. 다음 코드에서 `/assets/js/index.js`를 확인할 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/frontend/index.js"
            start="10" end="19" />            
  </Language>
</CodeTabs>

위 코드에서, 앱이 시작될 때 사용자가 이미 로그인되어 있는지 확인하고 `signedInFlow()` 또는 `signedOutFlow()`를 실행함을 알 수 있습니다.

---

## 테스트

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. In this project you have integration tests. Before digging into them, go ahead and perform the tests present in the dApp through the command `yarn test` for the JavaScript version, or `./test.sh` for the Rust version.

### 통합 테스트

Integration tests can be written in both Rust and JavaScript. 이는 자동으로 컨트랙트를 배포하고, 메서드를 실행합니다. 이러한 방식으로 통합 테스트는 현실적인 시나리오에서 사용자의 상호 작용을 시뮬레이션합니다. You will find the integration tests for the `coin-flip` in `contract-ts/integration-tests` (for the JavaScript contract) and `contract-rs/sandbox-rs` (for the Rust contract).

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/integration-tests/src/main.ava.ts"
            start="32" end="57" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/sandbox-rs/src/tests.rs"
            start="27" end="83" />
  </Language>
</CodeTabs>

---

## 랜덤성에 대한 참고 사항

블록체인의 랜덤성은 복잡한 주제이기에, 그것에 대해 읽고 조사하는 것이 좋습니다. [이에 대한 보안 페이지](../../2.develop/contracts/security/random.md)에서 이를 시작할 수 있습니다.
