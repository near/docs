---
id: basics
title: Modules, Types & Structs
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"


When writing smart contracts you will leverage common programming concepts such:
- [Modules](#modules)
- [Data types & Collections](#data-types)
- [Classes & Structures](#classes--structures)

---

## Modules
Modules help you to organize your code and reuse third-party libraries.

The main module you will use in your contract will be the **NEAR SDK**, which: gives you access to the [execution environment](./environment/environment.md), allows you to [call other contracts](./crosscontract.md), [transfer tokens](./actions.md), and much more.


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

:::info Using external libraries

As a general rule of thumb for Rust, anything that supports `wasm32-unknown-unknown` will be compatible with your smart contract.
However, we do have a size limit for a compiled contract binary which is ~4.19 MB, so it is possible that certain large libraries will not be compatible.

:::

---

## Native Types
When writing contracts you have access to **all** the language's **native types**.

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
Always prefer **native** types in the contract's **interface**. The only exception is values larger than `52 bytes` (such as `u64` and `u128`), for which string-like alternatives are preferred.
:::

:::warning
Always make sure to check for **underflow** and **overflow** errors. For Rust, simply add `overflow-checks=true` in your `Cargo`.
:::

---

## SDK Collections

Besides the native types, the NEAR SDK implements [collections](./storage.md) such as `Vector` and `UnorderedMap`
to help you store complex data in the contract's state.

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
Always prefer **SDK collections** over native ones in the contract's **[attributes (state)](./anatomy.md#defining-the-state)**.
:::

---

## Internal Structures

You can define and instantiate complex objects through classes and structures. 

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

  🦀 Notice that the class is decorated with multiple macros:
  - `BorshDeserialize` & `BorshSerialize` allow the structure to be read and
      written into the contract's state
  - `Serialize` & `Deserialize` allow the structure to be used as an input type and
      return type of the contract's methods. 

  :::tip
  If you are curious on why the (de)serialization is needed read our [serialization documentation](./serialization.md)
  :::


  </TabItem>
</Tabs>