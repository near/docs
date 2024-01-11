---
id: count-near
title: NEAR 숫자 세기
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 숫자 세기 예제는 숫자를 저장하고 `increment`, `decrement`, 그리고 `reset` 메서드를 공개하는 친근한 탈중앙화 앱입니다

![img](/docs/assets/examples/count-on-near-banner.png)

---

## 숫자 세기 시작
숫자 세기를 시작하는 두 가지 옵션이 있습니다.
1. **권장:** Gitpod(웹 기반 대화형 환경)를 통해 앱 사용
2. 프로젝트를 로컬로 복제


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

| Gitpod                                                                                                                                                            | 로컬로 복제                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/js-counter.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/js-counter.git` |

  </TabItem>

  <TabItem value="🦀 Rust">

| Gitpod                                                                                                                                                            | 로컬로 복제                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/rust-counter.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/rust-counter.git` |

  </TabItem>

</Tabs>

Gitpod를 선택하면 새 브라우저 창이 코드와 함께 자동으로 열립니다. 잠시 기다리면 프론트엔드가 팝업됩니다(팝업 창이 차단되지 않았는지 확인).

앱을 로컬에서 실행하는 경우, 앱을 복제한 디렉터리를 입력하고 `yarn`을 통해 의존성(dependency)을 설치하며, `yarn start`를 사용해 시작하면 됩니다.

```bash
cd counter
yarn
yarn deploy
yarn start
```
그러면 컨트랙트가 **컴파일**되어 `testnet` 네트워크의 **계정**에 **배포**됩니다. 완료되면 브라우저 창이 열립니다.

---

## 숫자 세기 앱과 상호 작용
계속해서 NEAR 계정으로 로그인하세요. 계정이 없는 경우 즉시 만들 수 있습니다. 로그인한 후 `+` 및 `-` 버튼을 사용하여 숫자를 높이거나 낮춥니다. 그런 다음 Gameboy 버튼을 사용하여 재설정하고 카운터가 눈을 깜박이게 만드세요!

![img](/docs/assets/examples/count-on-near.png) *Counter 앱의 프론트엔드*

---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다.
2. 스마트 컨트랙트 코드는 `/contract` 폴더에 있습니다.

### 컨트랙트
컨트랙트에는 `get_num`, `increment`, `decrement`, 그리고 `reset`이라는 네 가지 메서드가 있습니다. `get_num` 메서드는 현재 값을 반환하고, 나머지 메서드들은 값을 수정합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/js-counter/blob/master/contract/src/contract.ts"
            start="3" end="29" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="5" end="36" />
  </Language>
</CodeTabs>

### 프론트엔드
프론트엔드는 하나의 HTML 파일(`/index.html`)로 구성됩니다. 이 파일은 화면에 표시되는 구성 요소를 정의합니다.

웹사이트의 로직은 `/assets/js/index.js`에 존재하며 `/assets/js/near/utils.js`를 통해 컨트랙트와 통신합니다. 다음 코드에서 `/assets/js/index.js`를 확인할 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/js-counter/blob/master/frontend/index.js"
            start="10" end="21" />            
  </Language>
</CodeTabs>

위 코드에서, 앱이 시작될 때 사용자가 이미 로그인되어 있는지 확인하고 `signedInFlow()` 또는 `signedOutFlow()`를 실행함을 알 수 있습니다.

---

## 테스트

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. 이 프로젝트에는 단위(unit) 및 통합(integration)이라는 두 가지 유형의 테스트가 있습니다. 이에 대해 자세히 알아보기 전에, `yarn test` 명령을 통해 dApp에 있는 테스트를 수행하세요.

### 단위 테스트

단위 테스트는 스마트 컨트랙트 내 개별 함수를 확인합니다. 현재 Rust에서만 단위 테스트가 구현되어 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="48" end="69" />
  </Language>
</CodeTabs>

### 통합 테스트

통합 테스트는 일반적으로 Javascript로 작성됩니다. 그들은 자동으로 컨트랙트를 배포하고, 메서드를 실행합니다. 이러한 방식으로 통합 테스트는 현실적인 시나리오에서 사용자의 상호 작용을 시뮬레이션합니다. `integration-tests/`에서 `counter`에 대한 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/js-counter/blob/master/integration-tests/src/main.ava.ts"
            start="37" end="61" />
  </Language>
</CodeTabs>

---

## 더 알아보기

배울 수 있는 좋은 방법은 컨트랙트를 확장하는 것입니다. `increment` 및 `decrement`에 인자를 추가하여, 사용자가 변화시킬 값의 정도를 선택할 수 있도록 수정해 보세요. 이를 위해서는 [내부 구조](../../2.develop/contracts/anatomy.md) 및 [스토리지](../../2.develop/contracts/storage.md) 섹션의 지식을 사용해야 합니다.
