---
id: storage
title: State & Data Structures
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Each contract has its own state (storage), which **only they can modify** but [anyone can see](../../4.tools/cli.md#near-view-state-near-view-state).

A contract stores all its data in a `key-value` storage. This however is abstracted from you by the SDK through [serialization](./serialization.md).

:::info Contracts [pay for their storage](#storage-cost) by locking part of their balance. Currently it costs **~1 Ⓝ** to store **100KB**
:::
---

## Defining the State
The contract's state is defined by the [main class attributes](./anatomy.md#defining-the-contract), and accessed through them.

In the state you can store constants, native types, and complex objects. When in doubt, prefer to use [SDK collections](#data-structures) over native ones, because they are optimized for the [serialized key-value storage](./serialization.md#borsh-state-serialization).

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

## Data Structures
The NEAR SDK exposes a series of structures ([Vectors](#vector), [Sets](#set), [Maps](#map) and [Trees](#tree)) to simplify storing data in an efficient way.

:::info Instantiation All structures need to be initialized using a **unique `prefix`**, which will be used to identify the structure's keys in the [serialized state](./serialization.md#borsh-state-serialization)

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

<hr className="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the Rust and AS SDK's for a full reference on their interfaces.

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

<hr className="subsection" />

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

In the JS SDK, you can store and retrieve elements from a nested map or object, but first you need to construct or deconstruct the structure from state. This is a temporary solution until the improvements have been implemented to the SDK. Here is an example of how to do this:

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
<hr className="subsection" />

### Set

Implements a [set](https://en.wikipedia.org/wiki/Set_(abstract_data_type)) which persists in the contract's storage. Please refer to the Rust and AS SDK's for a full reference on their interfaces.

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

<hr className="subsection" />

### Tree

An ordered equivalent of Map. The underlying implementation is based on an [AVL](https://en.wikipedia.org/wiki/AVL_tree). You should use this structure when you need to: have a consistent order, or access the min/max keys.

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
Your contract needs to lock a portion of their balance proportional to the amount of data they stored in the blockchain. This means that:
- If more data is added and the **storage increases ↑**, then your contract's **balance decreases ↓**.
- If data is deleted and the **storage decreases ↓**, then your contract's **balance increases ↑**.

Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.

:::info You can save on smart contract storage if using NEAR Account IDs by encoding them using base32. Since they consist of `[a-z.-_]` characters with a maximum length of 64 characters, they can be encoded using 5 bits per character, with terminal `\0`. Going to a size of 65 * 5 = 325 bits from the original (64 + 4) * 8 = 544 bits. This is a 40% reduction in storage costs. :::

:::caution
An error will raise if your contract tries to increase its state while not having NEAR to cover for storage.
:::

:::warning Be mindful of potential [small deposit attacks](security/storage.md) :::
