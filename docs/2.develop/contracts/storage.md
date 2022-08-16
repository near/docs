---
id: storage
title: Storage & Data Structures
#sidebar_label: 💾 Storage
---
import {CodeBlock} from '@theme/CodeBlock'
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Each contract has its own storage, which **only they can modify** but [anyone can see](../../4.tools/cli.md#near-view-state-near-view-state).

Contract's store data as key-value pairs, but our SDK enables to use **common data types** and **structures**.

Smart contracts [pay for their storage](#storage-cost) by locking a part of their balance (~**1 Ⓝ** per **100kb**).

---

## Attributes and Constants
You can store constants and define contract's attributes.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="4" end="19" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="11" end="24"/>
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="10" end="29" />
  </Language>
</CodeTabs>

---

## Data Structures

Our SDK exposes a series of data structures to simplify handling and storing data. 

The most common ones are [Vectors](#vector), [Sets](#set), [Maps](#map) and [Trees](#tree).

:::caution
Use **unique IDs** when initializing structures, otherwise they will point to the same key-value references.
:::

<hr class="subsection" />

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
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="vector.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/__tests__/vector.spec.ts" start="4" end="16"/>
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="1" end="11" />
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
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="map.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/__tests__/map.spec.ts" start="5" end="15"/>
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="1" end="11" />
  </Language>
</CodeTabs>

<hr class="subsection" />

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
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="map.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/__tests__/set.spec.ts" start="5" end="11"/>
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="1" end="11" />
  </Language>
</CodeTabs>

<hr class="subsection" />

### Tree

An ordered equivalent of Map. The underlying implementation is based on an [AVL](https://en.wikipedia.org/wiki/AVL_tree). You should use this structure when you need to: have a consistent order, or access the min/max keys.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="tree.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/tree.rs" start="9" end="16"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="tree.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/__tests__/tree.spec.ts" start="5" end="11"/>
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="1" end="11" />
  </Language>
</CodeTabs>

---

## Storage Cost
Your contract needs to lock a portion of their balance proportional to the amount of data they stored in the blockchain. This means that:
- If more data is added and the **storage increases ↑**, then your contract's **balance decreases ↓**.
- If data is deleted and the **storage decreases ↓**, then your contract's **balance increases ↑**. 

Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.

:::caution
An error will raise if your contract tries to increase its state while not having NEAR to cover for storage.
:::

:::warning
Be mindful of potential [small deposit attacks](security/storage.md)
:::