---
id: xcc
title: 교차 컨트랙트 호출(Cross Contract Call)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 예제는 가능한 가장 간단한 교차 컨트랙트 호출을 수행합니다. 인사말을 설정하고 검색하기 위해 [Hello NEAR](hello-near.md) 예제를 호출합니다. 이는 교차 컨트랙트 호출에 대한 가장 간단한 예 중 하나이며, 상호 작용 컨트랙트의 세계로 들어가는 완벽한 관문입니다.

:::info Advanced Cross-Contract Calls Check the tutorial on how to perform cross-contract calls [in batches and in parallel](./advanced-xcc) :::

---

## 프로젝트 시작
프로젝트 사용을 시작하는 데는 두 가지 옵션이 있습니다. 첫 번째 권장 사항은 웹 기반 대화형 환경을 여는 Gitpod를 통해 앱을 사용하는 것입니다. 두 번째 옵션은 레퍼지토리를 로컬로 복제하는 것으로, 모든 [필수 구성 요소](../../2.develop/prerequisites.md)를 설치해야 합니다.


<Tabs className="language-tabs" groupId="code-tabs">

  <TabItem value="🌐 JavaScript"> 

  | Gitpod                                                                                                                                                                                           | 로컬로 복제                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/cross-contract-hello-js"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/cross-contract-hello-js.git` |

  </TabItem>

  <TabItem value="🦀 Rust">

  | Gitpod                                                                                                                                                                                           | 로컬로 복제                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/cross-contract-hello-rust"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/cross-contract-hello-rust.git` |

  </TabItem>
</Tabs>

---

### 컨트랙트와 상호 작용
이 예제에는 프론트엔드가 없으므로, [NEAR CLI](../../4.tools/cli.md)를 통해 상호 작용합니다.

<!-- Expand on this explanation adding snippets  -->
README.md를 확인하세요. 간단히 말해서 다음과 같은 것들을 수행해야 합니다.

#### 1. 컨트랙트 구축 및 배포
다음을 실행하여 NEAR 테스트넷에서 컨트랙트를 자동으로 컴파일하고 배포할 수 있습니다.

```bash
./contract/deploy.sh
```

완료되면, `neardev/dev-account` 파일을 확인하여 컨트랙트가 배포된 주소를 찾습니다.

```bash
cat ./contract/neardev/dev-account # e.g. dev-1659899566943-21539992274727
```

#### 2. 인사 가져오기

`query_greeting`은 `hello-nearverse.testnet`에서 `get_greeting()` 메서드를 호출하여 교차 컨트랙트 호출을 실행합니다.

`Call` 메서드는 NEAR 계정을 통해서만 호출할 수 있습니다. 계정은 트랜잭션에 대해 가스를 지불해야 하기 때문입니다.

```bash
# Use near-cli to ask the contract to query the greeting
near call <dev-account> query_greeting --accountId <dev-account>
```

---

### 컨트랙트
컨트랙트는 인사말을 쿼리하고 변경하는 메서드를 공개합니다. 이러한 메서드는 `hello-near` 예제에서 `get_greeting` 및 `set_greeting` 호출만 수행합니다.

<CodeTabs>
<Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/contract/src/contract.ts"
            start="17" end="39" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/lib.rs"
            start="24" end="49" />
  </Language>
</CodeTabs>

---

## 테스트

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 매우 중요합니다. 이 프로젝트에는 단위(unit) 및 통합(integration)이라는 두 가지 유형의 테스트가 있습니다. 이에 대해 자세히 알아보기 전에, `yarn test` 명령을 통해 dApp에 있는 테스트를 수행하세요.

### 단위 테스트

단위 테스트는 스마트 컨트랙트 내 개별 함수를 확인합니다. 현재 Rust에서만 단위 테스트가 구현되어 있습니다.

이 예제는 교차 컨트랙트 호출을 처리하므로, 단위 테스트에서는 `initialize` 메서드만 작동 여부를 테스트합니다. 이는 단위 테스트가 컨트랙트 간 호출을 테스트할 수 **없기** 때문입니다.

### 통합 테스트

특히 이 프로젝트에서 통합 테스트는 먼저 `hello-near` 컨트랙트를 배포합니다. 그런 다음 교차 컨트랙트 호출이 메시지를 올바르게 설정하고 검색하는지 테스트합니다. `integration-tests/`에서 통합 테스트를 찾을 수 있습니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/integration-tests/src/main.ava.ts"
            start="9" end="59" />
  </Language>
</CodeTabs>

---

## 더 알아보기

배울 수 있는 좋은 방법은 컨트랙트를 확장하는 것입니다. [방명록](guest-book.md) 컨트랙트를 사용하도록 교차 컨트랙트 예제를 수정합니다! 이런 식으로 돈을 붙이는 교차 컨트랙트 호출을 시도할 수 있습니다. [콜백을 올바르게 처리](../../2.develop/contracts/crosscontract.md#callback-method)하고, 오류가 발생한 경우 사용자에게 금액을 반환해야 합니다.

### 고급 교차 컨트랙트 호출
컨트랙트 여러 교차 컨트랙트 호출을 동시에 수행할 수 있고, 이를 병렬로 실행되는 Promise 생성 혹은 배치(Batch) 트랜잭션으로 수행할 수 있습니다. Check the [advanced cross contract calls tutorial](./advanced-xcc) to learn more.
