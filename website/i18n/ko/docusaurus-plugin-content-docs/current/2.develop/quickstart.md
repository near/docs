---
id: quickstart-guide
title: Hello NEAR 👋
sidebar_label: '⭐ 빠른 시작'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

안녕하세요! NEAR: Hello NEAR에서 첫 번째 탈중앙화 앱(dApp)을 시작하고, 앱과 상호 작용하는 방법을 안내해 드리겠습니다.

**Hello NEAR**는 두 가지 요소로 구성된 친근한 dApp입니다.
  1. 인사 메세지를 저장하고 검색하는 스마트 컨트랙트
  2. 인사말을 표시하고 변경할 수 있는 간단한 웹 기반 프론트엔드

---

## Create NEAR App
If you already have [Node.js](https://nodejs.org/en/download) installed, simply run:

```bash 
  npx create-near-app@latest
```

Use the interactive menu to set up your first project folder, we recommend you to use `javascript`.

Once the folder is ready, check the README. It will show you how to **build** and **deploy** the smart contract, and **start** the frontend.

```bash 
  npm run build
  npm start
```

<details>
<summary>
Test it online with Gitpod
</summary>

새 브라우저 창이 코드와 함께 자동으로 열리고, 잠시 기다리면 프론트엔드에서 팝업 창이 생성됩니다(팝업 창이 차단되지 않았는지 확인하세요).


| 🌐 JavaScript              | 🦀 Rust                    |
| ------------------------- | ------------------------- |
| <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-js.git">Open in Gitpod</a> | <a href="https://gitpod.io/#https://github.com/near-examples/hello-near-rs.git">Open in Gitpod</a> |

</details>

---

## Hello NEAR와 상호작용하는 방법

앱이 실행되면 아래와 같은 화면이 나타납니다. 이제 NEAR 계정으로 로그인하세요. 없는 경우 즉시 만들 수 있습니다.

![img](/docs/assets/examples/hello-near.png) *Hello NEAR의 프론트엔드*

로그인한 후, 인사말을 변경하고 Hello NEAR 앱이 어떻게 인사하는지 확인해 보세요!


---

## dApp의 구조

이제 dApp이 무엇을 하는지 이해했으므로, 그 구조를 자세히 살펴보겠습니다.

1. 프론트엔드 코드는 `/frontend` 폴더에 있습니다.
2. 스마트 컨트랙트 코드는 `/contract` 폴더에 있습니다.
3. 컴파일된 스마트 컨트랙트는 `/out/main.wasm`에서 찾을 수 있습니다.
4. 컨트랙트가 배포된 계정의 이름은 `/neardev/dev-account`에 있습니다.

### 컨트랙트
컨트랙트에는 `set_greeting`과 `get_greeting`이라는 두 가지 메서드가 있습니다. 첫 번째는  컨트랙트의 매개변수 `message`에 `String`을 저장하고, 두 번째는 이를 검색하는 기능을 합니다. 기본적으로 컨트랙트는 `"Hello"`라는 메시지를 반환합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
            url="https://github.com/near-examples/hello-near-js/blob/master/contract/src/contract.ts"
            start="3" end="18" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="9" end="43" />
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. 이 프로젝트에는 **단위** 테스트(unit test)와 **통합** 테스트(integration test)가 모두 있습니다. Before digging in their code, go ahead and execute them using the command `npm run test`.

### 단위 테스트
단위 테스트는 스마트 컨트랙트의 각 함수를 확인합니다. 이는 스마트 컨트랙트와 동일한 언어로 작성됩니다. 컨트랙트가 Rust로 작성된 경우, 각 `.rs` 파일의 맨 아래에서 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/hello-near-rs/blob/main/contract/src/lib.rs"
            start="46" end="58" />
  </Language>
</CodeTabs>

### 통합 테스트

통합 테스트는 Javascript와 Rust로 작성할 수 있습니다. 이는 **샌드박스**에 컨트랙트를 배포하고 그 위에서 메서드를 실행하는 방식으로 동작합니다. 이를 통해, 통합 테스트는 현실적인 시나리오 상에서 사용자와의 상호 작용을 시뮬레이션합니다. `integration-tests/`에서 `hello-near`에 대한 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-js/blob/master/integration-tests/src/main.ava.ts"
            start="32" end="43" />
  </Language>
</CodeTabs>

---

## 더 알아보기

첫 번째 빠른 시작 튜토리얼은 여기까지입니다. You have now seen a fully functional contract with a minimal user interface and testing.

Go ahead and check other [examples](/tutorials/examples/guest-book) or proceed straight to the [Develop section](./contracts/anatomy.md) to know how to write your own contract.

질문이 있으시면 주저하지 마시고 [Discord](https://near.chat)에서 저희와 함께 하세요. 저희는 음성 채널에 참여하고 질문할 수 있는 Office Hours를 정기적으로 개최하고 있습니다.

즐거운 코딩 시간 되세요!
