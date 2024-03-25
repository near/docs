---
id: advanced-xcc
title: 복잡한 교차 컨트랙트 호출(Cross Contract Call)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 예제는 복잡한 교차 컨트랙트 호출의 3가지 인스턴스를 나타냅니다. 특히 다음과 같은 것들을 보여줍니다.
1. How to batch multiple function calls to a same contract.
2. 각각 다른 자료형을 반환하는 여러 컨트랙트를 병렬로 호출하는 방법.
3. 콜백에서 응답을 처리하는 다양한 방법.

---

## 일괄 Action

동일한 컨트랙트에 대한 여러 작업을 하나의 트랜잭션으로 모을 수 있습니다. 일괄 Action은 순차적으로 실행되며, 하나가 실패 하면 **모두** 되돌려진다는 추가 이점이 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/batch_actions.rs"
            start="7" end="19" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
          start="67" end="80" />
  </Language>
</CodeTabs>

#### Getting the Last Response
In this case, the callback has access to the value returned by the **last action** from the chain.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/batch_actions.rs"
            start="21" end="34" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="callback"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="82" end="93" />
    <Github fname="promiseResult"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="127" end="145" />
  </Language>
</CodeTabs>

---

## Calling Multiple Contracts

A contract can call multiple other contracts. 이렇게 하면 모두 병렬로 실행되는 여러 트랜잭션이 생성됩니다. If one of them fails the rest **ARE NOT REVERTED**.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/multiple_contracts.rs"
            start="18" end="56" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
          start="95" end="111" />
  </Language>
</CodeTabs>

#### Getting All Responses
In this case, the callback has access to an **array of responses**, which have either the value returned by each call, or an error message.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/multiple_contracts.rs"
            start="58" end="91" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="callback"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="113" end="125" />
    <Github fname="promiseResult"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="127" end="145" />
  </Language>
</CodeTabs>

---

## Multiple Calls - Same Result Type

This example is a particular case of the previous one ([2. 여러 컨트랙트 호출](#2-calling-multiple-contracts)) 의 특별한 경우입니다. 이는 단순히 `promise_result` 어레이에 직접 액세스하여 결과를 확인하는 다른 방법을 보여줍니다.

이 경우, 동일한 자료형을 반환하는 여러 컨트랙트를 호출합니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/similar_contracts.rs"
            start="18" end="31" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
          start="95" end="111" />
  </Language>
</CodeTabs>

#### 모든 응답 가져오기
이 경우 콜백은 다시 **응답 배열**에 액세스하여, 결과를 반복해서 확인할 수 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/xcc-advanced/blob/main/contract/src/similar_contracts.rs"
            start="33" end="61" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="callback"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="113" end="125" />
    <Github fname="promiseResult"
      url="https://github.com/garikbesson/cross-contract-hello-js/blob/batch_actions/contract/src/contract.ts"
      start="127" end="145" />
  </Language>
</CodeTabs>