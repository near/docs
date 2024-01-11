---
id: basics
title: 모듈, 자료형 및 구조
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"


스마트 컨트랙트를 작성할 때, 다음과 같은 일반적인 프로그래밍 개념을 활용합니다.
- [모듈](#modules)
- [자료형 & 컬렉션](#data-types)
- [클래스 & 구조](#classes--structures)

---

## 모듈
모듈은 코드를 구성하고, 남이 만든 라이브러리를 재사용하는 데 도움이 됩니다.

이 컨트랙트에서 사용할 기본 모듈은 **NEAR SDK**로, 이를 통해 [실행 환경](./environment/environment.md)에 대한 액세스를 제공하고 [다른 컨트랙트를 호출](./crosscontract.md)하며 [토큰을 전송](./actions.md)하는 등의 작업을 수행할 수 있습니다.


<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
      start="1" end="3" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
      start="1" end="6" />
  </Language>
</CodeTabs>

:::info 외부 라이브러리 사용

Rust에서 `wasm32-unknown-unknown`를 지원하는 거의 모든 것들은 스마트 컨트랙트와 호환됩니다. 그러나 컴파일된 컨트랙트 바이너리의 크기는 ~4.19MB로 제한되어 있으므로, 몇몇 대형 라이브러리는 호환되지 않을 수 있습니다.

:::

---

## 기본 자료형
컨트랙트 작성 시 **모든** 언어의 **기본 자료형**에 액세스할 수 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```ts
  number, bigint, string, [], {} ...
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  u8, u16, u32, u64, u128, i8, i16, i32, i64, i128, Vec<T>, HashMap<K,V> ...
  ```

  </TabItem>
</Tabs>

:::tip
컨트랙트의 **인터페이스**에서는 항상 **기본 자료형**을 선호합니다. 유일한 예외는 `52 바이트`보다 큰 값이라서 (예: `u64` 및 `u128`), 문자열과 같은 대안이 더 나을 경우입니다.
:::

:::warning
**언더플로우** 및 **오버플로우** 오류를 항상 확인하세요. Rust의 경우 `Cargo`에 `overflow-checks=true`를 추가하기만 하면 됩니다.
:::

---

## SDK 컬렉션

기본 자료형 외에도, NEAR SDK는 복잡한 데이터를 컨트랙트 상태에 저장하는 데 도움이 되는 `Vector`와 `UnorderedMap` 등의 [컬렉션](./storage.md)을 구현합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="8" end="11" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="33" end="36"/>
  </Language>
</CodeTabs>

:::tip
항상 컨트랙트의 **[속성 (상태)](./anatomy.md#defining-the-state)**에서는 기본 컬렉션보다 **SDK 컬렉션**을 선호합니다.
:::

---

## 내장 자료 구조

클래스와 구조를 통해 복잡한 개체를 정의하고 인스턴스화할 수 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">
    <Github fname="model.ts" language="ts"
      url="https://github.com/near-examples/donation-js/blob/master/contract/src/model.ts"
      start="3" end="11" />
  </TabItem>
  <TabItem value="🦀 Rust">
    <Github fname="lib.rs" language="rust"
      url="https://github.com/near-examples/donation-rust/blob/main/contract/src/donation.rs"
      start="11" end="16" />

  🦀 클래스에는 여러 매크로들이 들어가 있습니다:
  - `BorshDeserialize` & `BorshSerialize`는 구조를 읽어서 컨트랙트 상태로 사용할 수 있도록 해줍니다.  
  - `Serialize` & `Deserialize`는 구조를 컨트랙트 메서드의 입력 자료형 및 반환 자료형으로 사용할 수 있도록 합니다. 

  :::tip

  If you are curious on why the (de)serialization is needed read our [serialization documentation](./serialization.md)


:::


  </TabItem>

</Tabs>
