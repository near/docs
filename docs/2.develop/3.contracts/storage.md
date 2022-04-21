---
id: storage
title: Storage
sidebar_label: 💾 Storage
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Smart contracts have their own storage, which only them can modify but [anyone can see](broken). At the lowest level, data is stored as key-value pairs. However, the SDKs provides common data structures to simplify handling data.

Smart contracts pay for the storage used by locking a part of their balance. Therefore, the **more data** your contract stores, the **more money** you need to cover the storage cost. Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.

:::caution
If your contract runs out of NEARs to cover the storage, the next time it tries to add data it will halt execution with the error `Not enough balance to cover storage`.
:::
---
## Constants and Attributes

The simplest way to store data is by defining constants in your code, or contract's attributes. See the SDKs for more information.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { storage, u128 } from "near-sdk-as"

    // Declare a constant
    const TGAS: u64 = 1000000000000

    function store(value: i32): void {
      storage.set<i32>("v32", value)
      storage.set<u128>("v128", u128.from(value))
    }

    // Returns the stored value if present, otherwise returns 0
    function get_i32(): i32{
      // i32 is a primitive of AS
      return storage.getPrimitive<i32>("v32", 0)
    }

    function get_u128(): u128{
      // u128 is an object, not a primitive of AS
      if(storage.contains("v128")){
        return storage.getSome<u128>("v128")
      }
      return u128.Zero
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near_sdk::{near_bindgen};
    use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

    near_sdk::setup_alloc!();

    const TGAS: u64 = 1000000000000;


    #[near_bindgen]
    impl Contract {
      // Public - get value of counter
      pub fn init(&self) -> Self { }

      pub fn set_value(&mut self, value: i32) {
          let self.value = value;
      }

      pub fn get_value(&mut self): i32 {
          return self.value;
      }
    }
  ```

  </TabItem>
</Tabs>

---

## Data Structures

Both [Rust SDK](https://github.com/near/near-sdk-rs/) and [AssemblyScript SDK](https://github.com/near/near-sdk-as/) expose a series of data structures to simplify handling and storing data. In this page we showcase how to use the most common ones: Vectors, Maps and Trees. For the complete documentation please refer to the SDK pages.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
  import {
    PersistentMap,
    PersistentVector,
    PersistentDeque
    PersistentSet,
    AVL_tree
  } from "near-sdk-as";
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
  use nearsdk::{
    Map,
    Vector,
    PersistentDeque
    PersistentSet,
    AVL_tree
  }
  ```

  </TabItem>
</Tabs>

:::caution
When initializing a data structure make sure to give it a **unique ID**, otherwise, it could point to other structure's key-value references.
:::

<hr class="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the RUST and AS SDK's for a full reference on their interfaces.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { PersistentVector } from "near-sdk-as";

    let vector = new PersistentVector<i32>("unique-id-vector1");

    function example_vector(value: i32){
      vector.push(value)
      vector.push(1)

      assert(vector.length == 2, "Incorrect length")
      assert(vector[0] == value, "Error saving value")
      
      let last_element: i32 = vector.pop()
      assert(vector.length == 1, "Error popping value")

      vector[0] = 3
      assert(vector[0] == 3, "Error updating value")
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust

  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Map

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the RUST and AS SDK's for a full reference on their interfaces.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { PersistentMap } from "near-sdk-as";
    let map = new PersistentMap<string, i32>("unique-id-map1");

    function example_map(key:string, value: i32){
      map.set(key, value)
      assert(map.contains(key), "Error setting key-value")
      
      let read_value: i32 = map.get(value)
      assert(read_value == value, "Wrong value obtained")

      map.delete(key)
      assert(!map.contains(key), "Error deleting")
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust

  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Tree

An ordered equivalent of UnorderedMap. The underlying implementation is based on an [AVL](https://en.wikipedia.org/wiki/AVL_tree). This structure should be used when a consistent order is needed or accessing the min/max keys is needed.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { AVLTree } from "near-sdk-as";

    let map = new AVLTree<string, i32>("unique-id-map2");

    function example_map(key:string, value: i32){
      map.set(key, value)
      assert(map.contains(key), "Error setting key-value")
      
      let read_value: i32 = map.get(value)
      assert(read_value == value, "Wrong value obtained")

      map.delete(key)
      assert(!map.contains(key), "Error deleting")
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust

  ```

  </TabItem>
</Tabs>

---

## Sybil Attacks

One line discussing Sybil Attacks and pointing to the [security section](security/storage.md)

---

## 🎞️📚 Additional Resources

These educational resources could help you to better understand the subject

### Videos

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/wC6CS7js-tc"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

### Blog Posts

### Code
