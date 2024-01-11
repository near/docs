---
id: donation
title: 기부
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 기부 예시는 돈을 추적하면서 계좌로 돈을 보낼 수 있게 합니다. 컨트랙트를 통해 돈을 받고 보내는 가장 간단한 예 중 하나이며, 탈중앙화 금융의 세계로 진입하기 위한 완벽한 관문입니다.

![img](/docs/assets/examples/donation.png)

---

## 기부 예제 시작하기

기부 예제를 시작하는 데는 두 가지 옵션이 있습니다. 첫 번째 권장 사항은 웹 기반 대화형 환경을 여는 Gitpod를 통해 앱을 사용하는 것입니다. 두 번째 옵션은 레퍼지토리를 로컬로 복제하는 것으로, 모든 [필수 구성 요소](../../2.develop/prerequisites.md)를 설치해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript" >

  | Gitpod                                                                                                                                                                               | 로컬로 복제                                                     |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/donation-js"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/donation-js.git` |

  </TabItem>
  <TabItem value="🦀 Rust">

| Gitpod                                                                                                                                                                               | 로컬로 복제                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/donation-rust"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/donation-rust.git` |

  </TabItem>

</Tabs>

Gitpod를 선택하면 새 브라우저 창이 코드와 함께 자동으로 열립니다. 프로젝트가 컴파일되고 결국 프론트엔드가 새 창/탭에서 열립니다(팝업 창이 차단되지 않았는지 확인).

앱을 로컬에서 실행하는 경우, 앱을 복제한 디렉터리를 입력하고 `yarn`으로 의존성(dependency)을 설치하며, `yarn start`를 사용해 시작합니다.

```bash
cd donation
yarn
yarn deploy
yarn start
```
그러면 컨트랙트가 **컴파일**되어 `testnet` 네트워크의 **계정**에 **배포**됩니다. 완료되면 브라우저 창이 열립니다.

---

## dApp과 상호 작용
계속해서 NEAR 계정으로 로그인하세요. 없는 경우 즉시 만들 수 있습니다. 로그인 후 기부할 NEAR 금액을 입력하고 기부 버튼을 누르면, 트랜잭션을 확인하기 위해 NEAR 지갑으로 리디렉션됩니다. 확인 후 기부 내역은 "최근 기부 내역"에 기재됩니다.

![img](/docs/assets/examples/donation.png) *기부 앱의 프론트엔드*

---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다.
2. 스마트 컨트랙트 코드는 `/contract` 폴더에 있습니다.

### 컨트랙트
컨트랙트는 돈을 기부하는 메서드(`donate`)와 기록된 기부금을 검색하는 메서드(예: `get_donation_by_number`)를 공개합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
            start="16" end="44" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-rust/blob/main/contract/src/donation.rs"
            start="21" end="50" />
  </Language>
</CodeTabs>

### 프론트엔드
프론트엔드는 하나의 HTML 파일(`/index.html`)로 구성됩니다. 이 파일은 화면에 표시되는 구성 요소를 정의합니다. 웹사이트의 로직은 `/assets/js/index.js`에 존재하며 `/assets/js/near/utils.js`를 통해 컨트랙트와 통신합니다.

기부 예제의 흥미로운 측면은, 트랜잭션을 수락하기 위해 NEAR 지갑으로 리디렉션된 후 결과를 검색하는 방법을 보여준다는 것입니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/donation-js/blob/master/frontend/index.js"
            start="74" end="81" />
    <Github fname="near-interface.js"
            url="https://github.com/near-examples/donation-js/blob/master/frontend/near-interface.js"
            start="29" end="32" />
    <Github fname="near-wallet.js"
            url="https://github.com/near-examples/donation-js/blob/master/frontend/near-wallet.js"
            start="105" end="113" />
  </Language>
</CodeTabs>

---

## 테스트

스마트 컨트랙트를 작성할 때, 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. 이 프로젝트에는 단위(unit) 및 통합(integration)이라는 두 가지 유형의 테스트가 있습니다. 이를 자세히 알아보기 전에 `yarn test` 명령을 통해 dApp에 있는 테스트를 수행하십시오.

### 단위 테스트

단위 테스트는 스마트 컨트랙트의 개별 함수를 확인합니다. 스마트 컨트랙트와 동일한 언어로 작성됩니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
            start="63" end="92" />
  </Language>
</CodeTabs>

### 통합 테스트

통합 테스트는 일반적으로 Javascript로 작성됩니다. 자동으로 새 컨트랙트를 배포하고 이에 대한 메서드를 실행합니다. 이러한 방식으로 통합 테스트는 현실적인 시나리오에서 사용자의 상호 작용을 시뮬레이션합니다. `tests/integration-tests`에서 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/donation-js/blob/master/integration-tests/src/main.ava.ts"
            start="50" end="73" />
  </Language>
</CodeTabs>

---

## 더 알아보기

배울 수 있는 좋은 메서드는 컨트랙트를 확장하는 것입니다. 돈을 즉시 보내는 대신 컨트랙트에 누적되도록 기부 예시를 수정해보세요. 그런 다음 돈을 회수하기 위해 호출할 수 있는 `beneficiary` 메서드를 만들어 보세요.
