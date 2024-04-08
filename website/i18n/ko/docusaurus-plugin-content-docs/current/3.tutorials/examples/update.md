---
id: update-contract-migrate-state
title: 자체 업그레이드 및 상태 마이그레이션
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

업데이트 및 [상태 마이그레이션](../../2.develop/upgrade.md)을 처리하는 방법에 대한 세 가지 예는 다음과 같습니다.
1. [State Migration](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates): How to implement a `migrate` method to migrate state between contract updates.
2. [State Versioning](https://github.com/near-examples/update-migrate-rust/tree/main/enum-updates): How to use readily use versioning on a state, to simplify updating it later.
3. [Self Update](https://github.com/near-examples/update-migrate-rust/tree/main/self-updates): How to implement a contract that can update itself.

---

## 상태 마이그레이션
The [State Migration example](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates) shows how to handle state-breaking changes between contract updates.

이는 두 가지 컨트랙트로 구성됩니다.
1. Base: A Guest Book where people can write messages.
2. 업데이트: 매개변수를 제거하고 내부 구조를 변경하는 업데이트입니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="migrate.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
            start="18" end="45" />
  </Language>
</CodeTabs>

#### 마이그레이션 메서드
마이그레이션 메서드는 현재 상태(`OldState`)를 역직렬화하고 메시지를 반복하여, `payment` 필드를 포함하는 새 `PostedMessage` 메시지로 업데이트합니다.

:::tip
Notice that migrate is actually an [initialization method](../../2.develop/contracts/anatomy.md#initialization-method) that ignores the existing state (`[#init(ignore_state)]`), thus being able to execute and rewrite the state.
:::

---

## 상태 버전 관리
The [State Versioning example](https://github.com/near-examples/update-migrate-rust/tree/main/enum-updates) shows how to use [Enums](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html) to implement state versioning on a contract.

버전 관리는 새 버전의 구조를 추가하기만 하면 되므로 컨트랙트 업데이트를 간소화합니다. 모든 버전이 공존할 수 있으므로, 기존 구조를 변경할 필요가 없습니다.

이는 두 컨트랙트로 구성됩니다.
1. 기본: 버전 관리된 `PostedMessages`(`PostedMessagesV1`)를 사용하는 방명록 컨트랙트
2. 업데이트: 새로운 버전의 `PostedMessages`(`PostedMessagesV2`)를 추가하는 업데이트

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="versioned_msg.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
            start="18" end="36" />
  </Language>
</CodeTabs>

---

## Self Update
The [Self Update example](https://github.com/near-examples/update-migrate-rust/tree/main/self-updates) shows how to implement a contract that can update itself.

It is composed by 2 contracts:
1. Base: A Guest Book were people can write messages, implementing a `update_contract` method.
2. 2. 업데이트: 매개변수를 제거하고 내부 구조를 변경하는 업데이트입니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="update.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/update.rs"
            start="10" end="31" />
  </Language>
</CodeTabs>
