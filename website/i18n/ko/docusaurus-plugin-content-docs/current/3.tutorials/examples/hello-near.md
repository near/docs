---
id: hello-near
title: Hello NEAR
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

**Hello NEAR!**는 인사말 메시지를 저장하는 친숙한 탈중앙화 앱입니다. NEAR에서 생성할 수 있는 가장 간단한 스마트 컨트랙트 중 하나이며, 스마트 컨트랙트의 세계에 자신을 소개할 수 있는 완벽한 관문입니다.

![img](/docs/assets/examples/hello-near-banner.png)

---

## Hello NEAR 시작하기

Hello NEAR를 시작하는 두 가지 옵션이 있습니다.

1. **권장:** Gitpod(웹 기반 대화형 환경)를 통해 앱 사용
2. 노드 기반 유틸리티인 `create-near-app`를 사용하여 로컬에서 프로젝트 시작

#### Gitpod

Hello NEAR는 gitpod에서 사용할 수 있습니다. 아래에서 한 가지를 선택하면 웹 기반 IDE와 함께 브라우저에서 새 탭이 열립니다. 컨트랙트를 컴파일하고 배포하는 데 잠시 시간을 주면 앱과 상호작용할 수 있는 프론트엔드가 팝업됩니다(팝업 창이 차단되지 않았는지 확인).

| 🌐 JavaScript              | 🦀 Rust                    |
| ------------------------- | ------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Gitpod에서 열기" /></a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-rust.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Gitpod에서 열기" /></a> |

#### Near 앱 만들기 (node)

Hello NEAR는 `create-near-app`의 도움으로 로컬에서 생성할 수 있습니다. 로컬 프로젝트를 생성하려면 아래 스니펫을 입력하세요.

```bash
npx create-near-app@latest
```

그리고 화면에 나타나는 지시를 따릅니다.

---

## Hello NEAR와 상호 작용하기

계속해서 NEAR 계정으로 로그인하세요. 계정이 없는 경우 즉시 만들 수 있습니다. 로그인한 후 인사말을 변경하고 Hello NEAR 앱이 어떻게 인사하는지 확인하세요!

![img](/docs/assets/examples/hello-near.png) *Hello NEAR의 프론트엔드*

---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다.
2. 스마트 컨트랙트 코드는 `/contract` 폴더에 있습니다.

### 컨트랙트

컨트랙트는 `set_greeting`과 `get_greeting` 두 가지 메서드가 존재합니다. 첫 번째는 컨트랙트의 매개변수 `greeting`에 `string`를 저장하고, 두 번째는 이를 검색합니다. 기본적으로 컨트랙트는 `"Hello"` 메시지를 반환합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
            start="4" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="21" end="33" />
  </Language>
</CodeTabs>

### Frontend

The frontend is composed by a single HTML file (`/index.html`). 이 파일은 화면에 표시되는 구성 요소를 정의합니다.

웹사이트의 로직은 `/assets/js/index.js`에 존재하며 `/near-interface.js`를 통해 컨트랙트와 통신합니다. 다음 코드에서 `/assets/js/index.js`를 확인할 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/frontend/index.js"
            start="11" end="21" />
  </Language>
</CodeTabs>

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## 테스트

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. 이 프로젝트에는 단위(unit) 및 통합(integration)이라는 두 가지 유형의 테스트가 있습니다. 이에 대해 자세히 알아보기 전에, `yarn test` 명령을 통해 dApp에 있는 테스트를 수행하세요.

### 단위 테스트

단위 테스트는 스마트 컨트랙트 내 개별 함수를 확인합니다. 현재 Rust에서만 단위 테스트가 구현되어 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="43" end="61" />
  </Language>
</CodeTabs>

### 통합 테스트

통합 테스트는 일반적으로 Javascript로 작성됩니다. 그들은 자동으로 컨트랙트를 배포하고, 메서드를 실행합니다. 이러한 방식으로 통합 테스트는 현실적인 시나리오에서 사용자의 상호 작용을 시뮬레이션합니다. `integration-tests/`에서 `hello-near`에 대한 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/sandbox-ts/src/main.ava.ts"
            start="33" end="44" />
  </Language>
</CodeTabs>

---

## 더 알아보기

배울 수 있는 좋은 방법은 컨트랙트를 확장하는 것입니다. **사용자 당** 하나의 인사말 메시지를 저장하도록 수정해 보세요. 이를 위해서는 [환경](../../2.develop/contracts/environment/environment.md) 및 [스토리지](../../2.develop/contracts/storage.md) 섹션의 지식을 사용해야 합니다. [방명록](guest-book.md) 예제도 유사한 작업을 수행하므로, 이를 사용할 수도 있습니다.
