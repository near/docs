---
id: storage
title: Storage
#sidebar_label: 💾 Storage
---
import {CodeBlock} from '@theme/CodeBlock'
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Smart contracts have their own storage, which only they can modify but [anyone can see](../../4.tools/cli.md#near-view-state-near-view-state). At the lowest level, data is stored as key-value pairs. However, the SDKs abstracts this away, and provide common structures to simplify handling data.

<CodeTabs>
  <Language value="🌐 Javascript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="1" end="19" />
  </Language>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="41"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts" />
  </Language>
</CodeTabs>

---

## Attributes and Constants
You can store constants and define contract's attributes.

<CodeTabs>
  <Language value="🌐 Javascript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="4" end="19" />
  </Language>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="11" end="24"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="10" end="29" />
  </Language>
</CodeTabs>

---

## Data Structures

All our SDK expose a series of data structures to simplify handling and storing data. In this page we showcase how to use the most common ones: Vectors, Sets, Maps and Trees. For the complete documentation please refer to the SDK pages.

:::caution
When initializing a data structure make sure to give it a **unique ID**, otherwise, it could point to other structure's key-value references.
:::

<hr class="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the Rust and AS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="🌐 Javascript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="31" end="34" />
  </Language>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="vector.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/vector.rs" start="12" end="30"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
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
  <Language value="🌐 Javascript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="39" end="43" />
  </Language>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="map.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/map.rs" start="9" end="24"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
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
  <Language value="🌐 Javascript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="48" end="52" />
  </Language>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="set.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/set.rs" start="9" end="16"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
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
  <Language value="🦀 - Rust" language="rust">
    <Github fname="tree.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/tree.rs" start="9" end="16"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="tree.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/__tests__/tree.spec.ts" start="5" end="11"/>
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/storage-as/contract/assembly/index.ts"
            start="1" end="11" />
  </Language>
</CodeTabs>

---

## Paying for Storage

Smart contracts pay for the storage used by locking a part of their balance. Therefore, the **more data** your contract stores, the **more money** you need to cover the storage cost. Currently, it cost approximately **1 Ⓝ** to store **100kb** of data. Be mindful of always having enough balance to cover your storage, and of potential [small deposit attacks](security/storage.md)


:::caution
If your contract runs out of NEAR to cover the storage, the next time it tries to add data it will halt execution with the error `Not enough balance to cover storage`.
:::
