---
id: update-contract-migrate-state
title: 자체 업그레이드 및 상태 마이그레이션
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

업데이트 및 [상태 마이그레이션](../../2.develop/upgrade.md)을 처리하는 방법에 대한 세 가지 예는 다음과 같습니다.
1. [상태 마이그레이션](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/basic-updates): 컨트랙트 업데이트 간에 상태를 마이그레이션하는 `migrate` 메서드를 구현하는 방법입니다.
2. [상태 버전 관리](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/enum-updates): 나중에 업데이트를 단순화하기 위해 상태에서 쉽게 버전을 관리하는 방법입니다.
3. [자체 업데이트](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/self-updates): 스스로 업데이트할 수 있는 컨트랙트를 구현하는 방법입니다.

---

## 상태 마이그레이션
[상태 마이그레이션 예제](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/basic-updates)는 컨트랙트 업데이트 간 상태 변경을 처리하는 방법을 보여줍니다.

이는 두 가지 컨트랙트로 구성됩니다.
1. 기본: 방명록에 사람들이 메시지를 작성할 수 있었습니다.
2. 업데이트: 매개변수를 제거하고 내부 구조를 변경하는 업데이트입니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="migrate.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/basic-updates/update/src/migrate.rs"
            start="20" end="44" />
  </Language>
</CodeTabs>

#### 마이그레이션 메서드
마이그레이션 메서드는 현재 상태(`OldState`)를 역직렬화하고 메시지를 반복하여, `payment` 필드를 포함하는 새 `PostedMessage` 메시지로 업데이트합니다.

:::tip
마이그레이션은 실제로 기존 상태([#init(ignore_state)])를 무시하는 [초기화 방법](../../2.develop/contracts/anatomy.md#initialization-method)이므로, 상태를 실행하고 다시 작성할 수 있습니다.
:::

---

## 상태 버전 관리
[상태 버전 관리 예제](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/enum-updates)는 [열거형(Enums)](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)를 사용하여 컨트랙트에서 상태 버전 관리를 구현하는 방법에 대해 보여줍니다.

버전 관리는 새 버전의 구조를 추가하기만 하면 되므로 컨트랙트 업데이트를 간소화합니다. 모든 버전이 공존할 수 있으므로, 기존 구조를 변경할 필요가 없습니다.

이는 두 컨트랙트로 구성됩니다.
1. 기본: 버전 관리된 `PostedMessages`(`PostedMessagesV1`)를 사용하는 방명록 컨트랙트
2. 업데이트: 새로운 버전의 `PostedMessages`(`PostedMessagesV2`)를 추가하는 업데이트

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="versioned_msg.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/enum-updates/update/src/versioned_msg.rs"
            start="22" end="40" />
  </Language>
</CodeTabs>

---

## 자체 업데이트
[자체 업데이트 예제](https://github.com/near-examples/update-migrate-rust/tree/main/contracts/self-updates)는 자체적으로 업데이트할 수 있는 컨트랙트를 구현하는 방법을 보여줍니다.

이는 두 가지 컨트랙트로 구성됩니다.
1. 기본: 방명록은 `update_contract` 메서드를 구현해, 사람들이 메시지를 작성할 수 있었습니다.
2. 2. 업데이트: 매개변수를 제거하고 내부 구조를 변경하는 업데이트입니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="update.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/contracts/self-updates/base/src/update.rs"
            start="10" end="28" />
  </Language>
</CodeTabs>