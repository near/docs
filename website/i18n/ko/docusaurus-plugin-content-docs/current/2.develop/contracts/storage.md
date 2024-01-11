---
id: storage
title: 상태 & 자료구조
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

각 컨트랙트에는 고유한 상태(스토리지)가 있으며, 이는 **해당 컨트랙트에 의해서만 수정 가능**하지만 [누구나 볼 수 있습니다](../../4.tools/cli.md#near-view-state-near-view-state).

컨트랙트는 모든 데이터를 `키-값` 스토리지에 저장합니다. 그러나 이는 SDK에 의한 [직렬화](./serialization.md)를 통해 추상화됩니다.

:::info 컨트랙트는 잔고의 일부를 잠그는 방식으로 [스토리지 비용을 지불](#storage-cost)합니다. 현재 **100KB**를 저장하는 데 **~1Ⓝ** 만큼의 비용이 듭니다.
:::
---

## 상태의 정의
컨트랙트의 상태는 [핵심 클래스 속성](./anatomy.md#defining-the-contract)에 의해 정의되며, 이를 통해 접근 가능합니다.

상태에는 상수, 기본 자료형 및 복합 객체를 저장할 수 있습니다. 확실하지 않은 경우 기본 컬렉션보다 [SDK 컬렉션](#data-structures)을 사용하는 것이 좋습니다. SDK 컬렉션은 [직렬화된 키-값 스토리지](./serialization.md#borsh-state-serialization)에 최적화되어 있기 때문입니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="6" end="12" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="14" end="24"/>
  </Language>
</CodeTabs>

---

## 자료구조
NEAR SDK는 효율적인 방식으로 데이터 저장 방식을 단순화하기 위해 자료구조([벡터](#vector), [집합](#set), [맵](#map) 및 [트리](#tree))를 사용합니다.

:::info 인스턴스화 모든 구조는 [직렬화된 상태](./serialization.md#borsh-state-serialization)에서 구조의 키를 식별하는 **고유한 `prefix`**를 사용하여 초기화해야 합니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="8" end="11" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="33" end="38"/>
  </Language>
</CodeTabs>
:::

<hr class="subsection" />

### 벡터

컨트랙트의 스토리지에 유지되는 [벡터/배열](https://en.wikipedia.org/wiki/Array_data_structure)을 구현합니다. Please refer to the Rust and AS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="25" end="28" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="vector.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/vector.rs" start="12" end="30"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<hr class="subsection" />

### Map

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and AS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="33" end="37" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="map.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/map.rs" start="9" end="24"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<details>
<summary>Nesting of Objects - Temporary Solution</summary>

In the JS SDK, you can store and retrieve elements from a nested map or object, but first you need to construct or deconstruct the structure from state. 이는 개선 사항이 SDK에 구현될 때까지 실행되는 임시 솔루션입니다. 다음은 이를 수행하는 방법의 예입니다.

```ts 
import { NearBindgen, call, view, near, UnorderedMap } from "near-sdk-js";

@NearBindgen({})
class StatusMessage {
  records: UnorderedMap;
  constructor() {
    this.records = new UnorderedMap("a");
  }

  @call({})
  set_status({ message, prefix }: { message: string; prefix: string }) {
    let account_id = near.signerAccountId();

    const inner: any = this.records.get("b" + prefix);
    const inner_map: UnorderedMap = inner
      ? UnorderedMap.deserialize(inner)
      : new UnorderedMap("b" + prefix);

    inner_map.set(account_id, message);

    this.records.set("b" + prefix, inner_map);
  }

  @view({})
  get_status({ account_id, prefix }: { account_id: string; prefix: string }) {
    const inner: any = this.records.get("b" + prefix);
    const inner_map: UnorderedMap = inner
      ? UnorderedMap.deserialize(inner)
      : new UnorderedMap("b" + prefix);
    return inner_map.get(account_id);
  }
}
```
</details>
<hr class="subsection" />

### 집합

컨트랙트 내 스토리지에 저장되는 [집합](https://en.wikipedia.org/wiki/Set_(abstract_data_type))을 구현합니다. 인터페이스에 대한 정보는 Rust 및 AS SDK를 참조하세요.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="42" end="46" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="set.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/set.rs" start="9" end="16"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<hr class="subsection" />

### 트리

맵에 순서를 부여한 자료구조입니다. 기본 구현은 [AVL](https://en.wikipedia.org/wiki/AVL_tree)을 기반으로 합니다. You should use this structure when you need to: have a consistent order, or access the min/max keys.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="tree.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/tree.rs" start="9" end="24"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

---

## Storage Cost
Your contract needs to lock a portion of their balance proportional to the amount of data they stored in the blockchain. 이는 다음을 의미합니다.
- 더 많은 데이터가 추가되어 **스토리지가 증가 ↑**하면, 컨트랙트 **잔고가 감소 ↓**합니다 .
- 데이터가 삭제되어 **스토리지가 감소 ↓**하면, 컨트랙트 **잔고가 증가 ↑**합니다 .

현재 **100kb**의 데이터를 저장하는 데 약 **1 Ⓝ**의 비용이 듭니다 .

:::info NEAR 계정 ID를 사용할 경우 base32를 사용하여 인코딩하여 스마트 컨트랙트 스토리지를 절약할 수 있습니다. 이들은 최대 64자 길이의 `[a-z.-_]` 문자로 구성되어 있기 때문에, 터미널 `\0`과 함께 문자당 5비트를 사용하여 인코딩할 수 있습니다. 그러면 원래 (64 + 4) * 8 = 544 비트에서 65 * 5 = 325 비트 크기로 줄어듭니다. 이는 스토리지 비용을 40% 절감한 것입니다. :::

:::caution
스토리지를 위한 NEAR가 없는 상황에서 컨트랙트가 상태에 데이터를 추가하려고 하면 오류가 발생합니다.
:::

:::warning 잠재적인 [소액 예금 공격](security/storage.md)에 유의하세요.
