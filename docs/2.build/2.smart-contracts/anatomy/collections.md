---
id: collections
title: Collections
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When deciding on data structures it is important to understand their tradeoffs. Choosing the wrong structure can create a bottleneck as the application scales, and migrating the state to the new data structures will come at a cost.

You can choose between two types of collections:

1. Native collections (e.g. `Array`, `Map`, `Set`), provided by the the language
2. SDK collections (e.g. `IterableMap`, `Vector`), provided by the NEAR SDK

Understanding how the contract stores and loads both types of collections is crucial to decide which one to use.

<details>

<summary> Native vs SDK Collections </summary> 

Use native collections for small amounts of data that need to be accessed all together, and SDK collections for large amounts of data that do not need to be accessed all together.

If your collection has up to 100 entries, it's acceptable to use the native collection, as it might be simpler since you don't have to manage prefixes as we do with SDK collections.

However, if your collection has 1,000 or more entries, it's better to use SDK collection. [This user test](https://github.com/volodymyr-matselyukh/near-benchmarking) shows that running the `contains` method on a native HashSet<i32> consumes 41% more gas compared to SDK IterableSet<i32>.

</details>

:::info How the State is Handled

Each time the contract is executed, the first thing it will do is to read the values and [deserialize](./serialization.md) them into memory, and after the function finishes, it will [serialize](./serialization.md) and write the values back to the database. That means the contract will load your native collections fully into memory before the contract's method execution. The method you invoke may not even use the loaded collection. This will have impact on GAS you spend for methods in your contract. So, using native collection which will have more than 100 entries as the top level property of your contract is a bad practice.

:::

---

## Native Collections

Native collections are those provided by the language:
- JS: `Array`, `Set`, `Map`, `Object` ...
- Rust: `Vector`, `HashMap`, `Set` ...

All entries in a native collection are **serialized into a single value** and **stored together** into the state. This means that every time a function execute, the SDK will read and **deserialize all entries** in the native collection.

<details>

<summary> Serialization & Storage Example </summary>

The array `[1,2,3,4]` will be serialized into the JSON string `"[1,2,3,4]"` in Javascript, and the Borsh byte-stream `[0,0,0,4,1,2,3,4]` in Rust before being stored

</details>

:::tip When to use them

Native collections are useful if you are planning to store smalls amounts of data that need to be accessed all together

:::

:::danger Keep Native Collections Small

As the native collection grows, deserializing it from memory will cost more and more gas. If the collections grows too large, your contract might expend all the gas trying to read its state, making it fail on each function call

:::

---

## SDK Collections

The NEAR SDKs expose collections that are optimized for random access of large amounts of data. SDK collections are instantiated using a "prefix", which is used as an index to split the data into chunks. This way, SDK collections can defer reading and writing to the store until needed.

These collections are built to have an interface similar to native collections.

<details>

<summary> Serialization & Storage Example </summary>

The sdk array `[1,2,3,4]` with prefix `"p"` will be stored as the string `"p"` in the contract's attribute, and create four entries in the contract's storage: `p-0:1`, `p-1:2`...

</details>


:::tip when to use them

SDK collections are useful when you are planning to store large amounts of data that do not need to be accessed all together

:::

<hr class="subsection" />

### Exposed Collections

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

| SDK Collection | Native Equivalent | Description                                                                                                                                                                                      |
|----------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Vector`       | `Array`           | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                            |
| `LookupSet`    | `Set`             | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.     |
| `UnorderedSet` | `Set`             | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                    |
| `LookupMap`    | `Map`             | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contain any metadata about the elements in the map, so it is not iterable. |
| `UnorderedMap` | `Map`             | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                      |

</TabItem>

<TabItem value="rust" label="🦀 Rust">

| SDK collection                                | `std`&nbsp;equivalent             | Description                                                                                                                                                                                       |
|-----------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `store::Vector<T>`                            | `Vec<T>`                          | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                             |
| <code>store::LookupMap`<K,&nbsp;V>`</code>    | <code>HashMap`<K,&nbsp;V>`</code> | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contairn any metadata about the elements in the map, so it is not iterable. |
| <code>store::IterableMap`<K,&nbsp;V>`</code>  | <code>HashMap`<K,&nbsp;V>`</code> | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                       |
| <code>store::UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code> | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                       |
| `store::LookupSet<T>`                         | `HashSet<T>`                      | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.      |
| `store::IterableSet<T>`                       | `HashSet<T>`                      | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                     |
| `store::UnorderedSet<T>`                      | `HashSet<T>`                      | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                     |

</TabItem>

<TabItem value="rust-legacy" label="🦀 Rust (legacy)">

:::info Note

The `near_sdk::collections` is now deprecated in favor of `near_sdk::store`. To use `near_sdk::collections` you will have to use the [`legacy` feature](https://github.com/near-examples/storage-examples/blob/2a138a6e8915e08ce76718add3e36c04c2ea2fbb/collections-rs/legacy/Cargo.toml#L11).

:::

| SDK collection                                     | `std`&nbsp;equivalent              | Description                                                                                                                                                                                                                                        |
|----------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `collections::Vector<T>`                            | `Vec<T>`                           | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                                                                              |
| <code>collections::LookupMap`<K,&nbsp;V>`</code>    | <code>HashMap`<K,&nbsp;V>`</code>  | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contairn any metadata about the elements in the map, so it is not iterable.                                                  |
| <code>collections::UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code>  | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                                                                        |
| <code>collections::TreeMap`<K,&nbsp;V>`</code>      | <code>BTreeMap`<K,&nbsp;V>`</code> | An ordered equivalent of `UnorderedMap`. The underlying implementation is based on an [AVL tree](https://en.wikipedia.org/wiki/AVL_tree). This structure should be used when a consistent order is needed or accessing the min/max keys is needed. |
| `collections::LookupSet<T>`                         | `HashSet<T>`                       | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.                                                       |
| `collections::UnorderedSet<T>`                      | `HashSet<T>`                       | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                                                                      |
| `collections::LazyOption<T>`                       | `Option<T>`                        | Optional value in storage. This value will only be read from storage when interacted with. This value will be `Some<T>` when the value is saved in storage, and `None` if the value at the prefix does not exist.                                  |
</TabItem>

</Tabs>

<hr class="subsection" />

### Features
| Type           | Iterable | Clear All Values | Preserves Insertion Order | Range Selection |
|----------------|:--------:|:----------------:|:-------------------------:|:---------------:|
| `Vector`       |    ✅     |        ✅         |             ✅             |        ✅        |
| `LookupSet`    |          |                  |                           |                 |
| `UnorderedSet` |    ✅     |        ✅         |                           |        ✅        |
| `IterableSet`  |    ✅     |        ✅         |                           |        ✅        |
| `LookupMap`    |          |                  |                           |                 |
| `UnorderedMap` |    ✅     |        ✅         |                           |        ✅        |
| `IterableMap`  |    ✅     |        ✅         |                           |        ✅        |
| `TreeMap`      |    ✅     |        ✅         |             ✅             |        ✅        |

<hr class="subsection" />

### Complexity

| Type           | Access |  Insert  |  Delete  |  Search  | Traverse | Clear |
|----------------|:------:|:--------:|:--------:|:--------:|:--------:|:-----:|
| `Vector`       |  O(1)  |  O(1)\*  | O(1)\*\* |   O(n)   |   O(n)   | O(n)  |
| `LookupSet`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `UnorderedSet` |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `IterableSet`  |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `LookupMap`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `IterableMap`  |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `TreeMap`      |  O(1)  | O(log n) | O(log n) | O(log n) |   O(n)   | O(n)  |

_\* - to insert at the end of the vector using `push_back` (or `push_front` for deque)_
_\*\* - to delete from the end of the vector using `pop` (or `pop_front` for deque), or delete using `swap_remove` which swaps the element with the last element of the vector and then removes it._

---

## SDK Collections Cookbook

Let's see how to use the SDK collections in practice

<hr class="subsection" />

### Instantiation

All structures need to be initialized using a **unique `prefix`**, which will be used to index the collection's values in the account's state

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="6" end="21" />

:::tip

Do not forget to use the `schema` to define how your contract's state is structured

:::

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust" 
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lib.rs"
          start="24" end="47"/>

  :::tip

  Notice how we use `enums` to ensure all collections have a different prefix. Another advantage of using `enums` is that they are serialized into a single `byte` prefix. 

  :::

  </TabItem>

  <TabItem value="rust-legacy" label="🦀 Rust (legacy)">
    <Github fname="lib.rs" language="rust" 
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/lib.rs" start="33" end="62"/>

  :::tip

  Notice how we use `enums` to ensure all collections have a different prefix. Another advantage of using `enums` is that they are serialized into a single `byte` prefix. 

  :::

  </TabItem>

</Tabs>

:::danger

Be careful of not using the same prefix in two collections, otherwise, their storage space will collide, and you might overwrite information from one collection when writing in the other

:::

<hr className="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
            start="34" end="58" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="vector.rs" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/vector.rs" start="4" end="29"/>
  </TabItem>
  <TabItem value="rust-legacy" label="🦀 Rust (legacy)">
    <Github fname="vector.rs" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/vector.rs" start="6" end="31"/>
  </TabItem>
</Tabs>

<hr className="subsection" />

### LookupMap

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="97" end="116" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lookup_map.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lookup_map.rs" start="4" end="22"/>
  </TabItem>
</Tabs>

<hr className="subsection" />

### UnorderedMap / IterableMap

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="118" end="137" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="iterable_map.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/iterable_map.rs" start="4" end="29"/>
  </TabItem>
</Tabs>

<hr className="subsection" />

### LookupSet

Implements a [set](https://en.wikipedia.org/wiki/Set_(abstract_data_type)) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="60" end="74" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
      <Github fname="lookup_set.rs" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lookup_set.rs" start="4" end="18"/>
  </TabItem>

</Tabs>

<hr className="subsection" />

### UnorderedSet / IterableSet

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="76" end="95" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="iterable_set.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/iterable_set.rs" start="4" end="26"/>
  </TabItem>
</Tabs>

<hr className="subsection" />

### Tree

An ordered equivalent of Map. The underlying implementation is based on an [AVL](https://en.wikipedia.org/wiki/AVL_tree). You should use this structure when you need to: have a consistent order, or access the min/max keys.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="tree.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/tree.rs" start="6" end="24"/>
  </TabItem>
</Tabs>

<hr class="subsection" />

### LazyOption (Legacy)

LazyOptions are great to store large values (i.e. a wasm file), since its value will not be read from storage until it is interacted with.

It acts like an `Option` that can either hold a value or not and also requires a unique prefix (a key in this case)
like other persistent collections.

Compared to other collections, `LazyOption` only allows you to initialize the value during initialization.

---

## Nesting Collections

When nesting SDK collections, be careful to **use different prefixes** for all collections, including the nested ones.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    <Github fname="nested.ts" language="js"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts" start="140" end="182"/>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    <Github fname="nested.ts" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/nested.rs" start="4" end="30"/>

  :::tip

  Notice how we use `enums` that take a `String` argument to ensure all collections have a different prefix

  :::

  </TabItem>
</Tabs>


---

## Error prone patterns

Because the values are not kept in memory and are lazily loaded from storage, it's important to make sure if a collection is replaced or removed, that the storage is cleared. In addition, it is important that if the collection is modified, the collection itself is updated in state because most collections will store some metadata.

Some error-prone patterns to avoid that cannot be restricted at the type level are:

<Tabs>
<TabItem value="rust" label="🦀 Rust">

```rust
use near_sdk::store::UnorderedMap;

let mut m = UnorderedMap::<u8, String>::new(b"m");
m.insert(1, "test".to_string());
assert_eq!(m.len(), 1);
assert_eq!(m.get(&1), Some(&"test".to_string()));

// Bug 1: Should not replace any collections without clearing state, this will reset any
// metadata, such as the number of elements, leading to bugs. If you replace the collection
// with something with a different prefix, it will be functional, but you will lose any
// previous data and the old values will not be removed from storage.
m = UnorderedMap::new(b"m");
assert!(m.is_empty());
assert_eq!(m.get(&1), Some(&"test".to_string()));

// Bug 2: Should not use the same prefix as another collection
// or there will be unexpected side effects.
let m2 = UnorderedMap::<u8, String>::new(b"m");
assert!(m2.is_empty());
assert_eq!(m2.get(&1), Some(&"test".to_string()));

// Bug 3: forgetting to save the collection in storage. When the collection is attached to
// the contract state (`self` in `#[near]`) this will be done automatically, but if
// interacting with storage manually or working with nested collections, this is relevant.
use near_sdk::store::Vector;

// Simulate roughly what happens during a function call that initializes state.
{
    let v = Vector::<u8>::new(b"v");
    near_sdk::env::state_write(&v);
}

// Simulate what happens during a function call that just modifies the collection
// but does not store the collection itself.
{
    let mut v: Vector<u8> = near_sdk::env::state_read().unwrap();
    v.push(1);
    // The bug is here that the collection itself if not written back
}

let v: Vector<u8> = near_sdk::env::state_read().unwrap();
// This will report as if the collection is empty, even though the element exists
assert!(v.get(0).is_none());
assert!(
    near_sdk::env::storage_read(&[b"v".as_slice(), &0u32.to_le_bytes()].concat()).is_some()
);

// Bug 4 (only relevant for `near_sdk::store`): These collections will cache writes as well
// as reads, and the writes are performed on [`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html)
// so if the collection is kept in static memory or something like `std::mem::forget` is used,
// the changes will not be persisted.
use near_sdk::store::IterableSet;

let mut m: IterableSet<u8> = IterableSet::new(b"l");
m.insert(1);
assert!(m.contains(&1));

// This would be the fix, manually flushing the intermediate changes to storage.
// m.flush();
std::mem::forget(m);

m = IterableSet::new(b"l");
assert!(!m.contains(&1));
```

<hr class="subsection" />

### Nesting Errors

By extension of the error-prone patterns to avoid mentioned in the [collections section](./collections.md#error-prone-patterns), it is important to keep in mind how these bugs can easily be introduced into a contract when using nested collections.

Some issues for more context:
- https://github.com/near/near-sdk-rs/issues/560
- https://github.com/near/near-sdk-rs/issues/703

The following cases are the most commonly encountered bugs that cannot be restricted at the type level (only relevant for `near_sdk::collections`, not `near_sdk::store`):

```rust
use near_sdk::borsh::{self, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedSet};
use near_sdk::BorshStorageKey;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    Root,
    Nested(u8),
}

// Bug 1: Nested collection is removed without clearing it's own state.
let mut root: LookupMap<u8, UnorderedSet<String>> = LookupMap::new(StorageKey::Root);
let mut nested = UnorderedSet::new(StorageKey::Nested(1));
nested.insert(&"test".to_string());
root.insert(&1, &nested);

// Remove inserted collection without clearing it's sub-state.
let mut _removed = root.remove(&1).unwrap();

// This line would fix the bug:
// _removed.clear();

// This collection will now be in an inconsistent state if an empty UnorderedSet is put
// in the same entry of `root`.
root.insert(&1, &UnorderedSet::new(StorageKey::Nested(1)));
let n = root.get(&1).unwrap();
assert!(n.is_empty());
assert!(n.contains(&"test".to_string()));

// Bug 2: Nested collection is modified without updating the collection itself in the outer collection.
//
// This is fixed at the type level in `near_sdk::store` because the values are modified
// in-place and guarded by regular Rust borrow-checker rules.
root.insert(&2, &UnorderedSet::new(StorageKey::Nested(2)));

let mut nested = root.get(&2).unwrap();
nested.insert(&"some value".to_string());

// This line would fix the bug:
// root.insert(&2, &nested);

let n = root.get(&2).unwrap();
assert!(n.is_empty());
assert!(n.contains(&"some value".to_string()));
```

</TabItem>
</Tabs>

---

## Pagination

Persistent collections such as `IterableMap/UnorderedMap`, `IterableSet/UnorderedSet` and `Vector` may
contain more elements than the amount of gas available to read them all.
In order to expose them all through view calls, we can use pagination.



<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    With JavaScript this can be done using iterators with [`toArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray) and [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

    ```ts
      /// Returns multiple elements from the `UnorderedMap`.
      /// - `from_index` is the index to start from.
      /// - `limit` is the maximum number of elements to return.
      @view({})
      get_updates({ from_index, limit }: { from_index: number, limit:number }) {
        return this.status_updates.toArray().slice(from_index, limit);
      }
    ```
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    With Rust this can be done using iterators with [`Skip`](https://doc.rust-lang.org/std/iter/struct.Skip.html) and [`Take`](https://doc.rust-lang.org/std/iter/struct.Take.html). This will only load elements from storage within the range.

    ```rust
      #[near(contract_state)]
      #[derive(PanicOnDefault)]
      pub struct Contract {
          pub status_updates: IterableMap<AccountId, String>,
      }

      #[near]
      impl Contract {
          /// Retrieves multiple elements from the `IterableMap`.
          /// - `from_index` is the index to start from.
          /// - `limit` is the maximum number of elements to return.
          pub fn get_updates(&self, from_index: usize, limit: usize) -> Vec<(AccountId, String)> {
              self.status_updates
                  .iter()
                  .skip(from_index)
                  .take(limit)
                  .collect()
          }
      }
    ```
  </TabItem>
</Tabs>

---

## Storage Cost
Your contract needs to lock a portion of their balance proportional to the amount of data they stored in the blockchain. This means that:
- If more data is added and the **storage increases ↑**, then your contract's **balance decreases ↓**.
- If data is deleted and the **storage decreases ↓**, then your contract's **balance increases ↑**. 

Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.

:::info

You can save on smart contract storage if using NEAR Account IDs by encoding them using base32. Since they consist of `[a-z.-_]` characters with a maximum length of 64 characters, they can be encoded using 5 bits per character, with terminal `\0`. Going to a size of 65 * 5 = 325 bits from the original (64 + 4) * 8 = 544 bits. This is a 40% reduction in storage costs

:::

:::caution

Your contract will panic if you try to store data but don't have NEAR to cover its storage cost

:::

:::warning

Be mindful of potential [small deposit attacks](../security/storage.md)

:::

---

## Storage Constraints on NEAR

For storing data on-chain it’s important to keep in mind the following:

- There is a 4mb limit on how much you can upload at once

Let’s say for example, someone wants to put an NFT purely on-chain (rather than IPFS or some other decentralized storage solution) you’ll have almost an unlimited amount of storage but will have to pay 1 $NEAR per 100kb of storage used.

Users will be limited to 4MB per contract call upload due to MAX_GAS constraints. The maximum amount of gas one can attach to a given functionCall is 300TGas.
