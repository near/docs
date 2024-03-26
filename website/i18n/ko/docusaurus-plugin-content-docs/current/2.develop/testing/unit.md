---
id: unit-test
title: 단위 테스트(Unit Testing)
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

단위 테스트를 사용하면 컨트랙트 메서드를 개별적으로 테스트할 수 있습니다. 이는 스토리지가 올바르게 업데이트되었는지 확인하고, 메서드가 예상 값을 반환하는지 확인하는 데 적합합니다. 이는 컨트랙트의 언어로 작성되고 로컬에서 실행됩니다.

[예제](https://github.com/near-examples/docs-examples) 중 하나를 템플릿으로 사용한 경우, 컨트랙트 폴더로 이동하여 `yarn test`를 사용하세요. 그렇지 않은 경우 템플릿 중 하나에서 필요한 노드 파일(예: `package.json`)을 복사하는 것이 좋습니다.

:::tip 각 프로젝트의 루트 폴더에서 `yarn test`를 실행하여 단위 테스트와 [통합](integration.md) 테스트를 모두 실행할 수 있습니다 :::
:::

---

## 스니펫 I: Counter 테스트

The tests in the [Counter Example](https://github.com/near-examples/counters) rely on basic functions to check that the `increment`, `decrement`, and `reset` methods work properly.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/src/lib.rs"
            start="50" end="71" />
  </Language>
</CodeTabs>

---

## Snippet II: Modifying the Context

While doing unit testing you can modify the [Environment variables](../contracts/environment/environment.md) through the `VMContextBuilder`. 이를 통해, 예를 들어 보증금 및 가스가 첨부된 다른 사용자의 호출을 시뮬레이션할 수 있습니다. Here we present a snippet on how we test the `donate` method from our [Donation Example](https://github.com/near-examples/donation-examples) by manipulating the `predecessor` and `attached_deposit`.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="59" end="117" />
  </Language>
</CodeTabs>

---

## ⚠️ 제한 사항

단위 테스트는 코드 무결성을 확인하고 격리된 메서드에서 기본적인 오류를 감지하는 데 유용합니다. 그러나 단위 테스트는 블록체인에서 실행되지 않기 때문에 감지할 수 없는 것이 많습니다. 단위 테스트는 다음과 같은 상황에 적합하지 않습니다.

- [가스](../contracts/environment/environment.md) 및 [스토리지](../contracts/storage.md) 사용량 테스트
- [전송](../contracts/actions.md) 테스트
- [교차 컨트랙트 호출(Cross-contract Call)](../contracts/crosscontract.md) 테스트
- 복잡한 상호 작용 테스트(예: 컨트랙트에 여러 사용자들이 자금을 예치하는 경우)

이러한 모든 경우에 대해서, [통합 테스트](integration.md)로 단위 테스트를 **보완**해야 합니다.
