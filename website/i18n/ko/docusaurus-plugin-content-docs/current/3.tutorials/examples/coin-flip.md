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
2. 프로젝트를 로컬로 복제


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

| Gitpod                                                                                                                                                            | 로컬로 복제                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------  |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/coin-flip-js.git` |

  </TabItem>

</Tabs>

Gitpod를 선택하면 새 브라우저 창이 코드와 함께 자동으로 열립니다. 잠시 기다리면 프론트엔드가 팝업됩니다(팝업 창이 차단되지 않았는지 확인).

앱을 로컬에서 실행하는 경우, 앱을 복제한 디렉터리를 입력하고 `yarn`을 통해 의존성(dependency)을 설치하며, `yarn start`를 사용해 시작하면 됩니다.

```bash
cd coin-flip-js
yarn
yarn deploy
yarn start
```
그러면 컨트랙트가 **컴파일**되어 `testnet` 네트워크의 **계정**에 **배포**됩니다. 완료되면 브라우저 창이 열립니다.

---

## 게임과 상호 작용하기
계속해서 NEAR 계정으로 로그인하십시오. 계정이 없는 경우 즉시 만들 수 있습니다. 로그인한 후 `tails`와 `heads` 버튼을 통해 다음 동전 던지기 결과를 추측해 보세요.

![img](/docs/assets/examples/coin-flip.png) *게임의 프론트엔드*

---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다
2. 스마트 컨트랙트 코드는 `/contract` 폴더에 있습니다.

### 컨트랙트
컨트랙트는 `flip_coin`과 `points_of`의 두 가지 메서드를 가지고 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/contract/src/contract.ts"
            start="23" end="56" />
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

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. 이 프로젝트에는 단위(unit) 및 통합(integration)이라는 두 가지 유형의 테스트가 있습니다. 이에 대해 자세히 알아보기 전에, `yarn test` 명령을 통해 dApp에 있는 테스트를 수행하세요.

### 통합 테스트

통합 테스트는 일반적으로 Javascript로 작성됩니다. 이는 자동으로 컨트랙트를 배포하고, 메서드를 실행합니다. 이러한 방식으로 통합 테스트는 현실적인 시나리오에서 사용자의 상호 작용을 시뮬레이션합니다. `integration-tests/`에서 `coin-flip`에 대한 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-workshop-js/blob/main/integration-tests/src/main.ava.ts"
            start="32" end="56" />
  </Language>
</CodeTabs>

---

## 랜덤성에 대한 참고 사항

블록체인의 랜덤성은 복잡한 주제이기에, 그것에 대해 읽고 조사하는 것이 좋습니다. [이에 대한 보안 페이지](../../2.develop/contracts/security/random.md)에서 이를 시작할 수 있습니다.
