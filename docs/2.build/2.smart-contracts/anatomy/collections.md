---
id: collections
title: Collections
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When deciding on data structures to use for the data of the application, it is important to understand the tradeoffs of data structures in your smart contract.

Choosing the wrong structure can create a bottleneck as the application scales, and migrating the state to the new data structures will come at a cost.

You can choose between two types of collections:

1. Native collections (e.g. `Array`, `Map`, `Set`), provided by the the language
2. SDK collections (e.g. `UnorderedMap`, `Vector`), provided by the NEAR SDK

Since the SDK reads all the contract's attributes when a function is executed - and writes them back when it finishes - understanding how the SDK stores and loads both types of collections is crucial to decide which one to use.


:::tip

Use native collections for small amounts of data that need to be accessed all together, and SDK collections for large amounts of data that do not need to be accessed all together

:::

:::info

Contracts store all their data in a `key-value` database. The SDK handles this database, and stores values [serialized in JSON or Borsh](./serialization.md)

:::

---

## Native Collections

Native collections are those provided by the language:
- JS: `Array`, `Set`, `Map`
- Rust: `Vector`, `HashMap`, `Set`

All entries in a native collection are serialized into a single value and stored together into the state. This means that every time a function execute, the SDK will read and deserialize all entries in the native collection.

<details>

<summary> Serialization & Storage Example </summary>

The array `[1,2,3,4]` will be serialized into the JSON string `"[1,2,3,4]"` in Javascript, and the Borsh byte-stream `[0,0,0,4,1,2,3,4]` in Rust before being stored

</details>

:::tip When to use them

Native collections are useful if you are planning to store smalls amounts of data that need to be accessed all together

:::

:::warning Keep Native Collections Small

As the collection grows, reading and writing it will cost more and more gas. If the collections grows too large, your contract might end up expending all its available gas in reading/writing the state, thus becoming unusable

:::

---

## SDK Collections

The NEAR SDKs expose collections that are optimized to store large amounts of data in the contract's state. These collections are built to have an interface similar to native collections.

SDK collections are instantiated using a "prefix", which is used as an index to split the data into chunks. This way, SDK collections can defer reading and writing to the store until needed.

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
| `LookupMap`    | `Map`             | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contain any metadata about the elements in the map, so it is not iterable. |
| `UnorderedMap` | `Map`             | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                      |
| `LookupSet`    | `Set`             | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.     |
| `UnorderedSet` | `Set`             | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                    |

</TabItem>

<TabItem value="rust" label="🦀 Rust">

:::info Note

The `near_sdk::collections` will be moving to `near_sdk::store` and have updated APIs. If you would like to access these updated structures as they are being implemented, enable the `unstable` feature on `near-sdk`.

:::


| SDK collection                         | `std`&nbsp;equivalent              | Description                                                                                                                                                                                                                                        |
|----------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LazyOption<T>`                        | `Option<T>`                        | Optional value in storage. This value will only be read from storage when interacted with. This value will be `Some<T>` when the value is saved in storage, and `None` if the value at the prefix does not exist.                                  |
| `Vector<T>`                            | `Vec<T>`                           | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                                                                              |
| <code>LookupMap`<K,&nbsp;V>`</code>    | <code>HashMap`<K,&nbsp;V>`</code>  | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contain any metadata about the elements in the map, so it is not iterable.                                                   |
| <code>UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code>  | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                                                                        |
| <code>TreeMap`<K,&nbsp;V>`</code>      | <code>BTreeMap`<K,&nbsp;V>`</code> | An ordered equivalent of `UnorderedMap`. The underlying implementation is based on an [AVL tree](https://en.wikipedia.org/wiki/AVL_tree). This structure should be used when a consistent order is needed or accessing the min/max keys is needed. |
| `LookupSet<T>`                         | `HashSet<T>`                       | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.                                                       |
| `UnorderedSet<T>`                      | `HashSet<T>`                       | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                                                                      |

</TabItem>

</Tabs>

<hr class="subsection" />

### Features
| Type           | Iterable | Clear All Values | Preserves Insertion Order | Range Selection |
|----------------|:--------:|:----------------:|:-------------------------:|:---------------:|
| `Vector`       |    ✅     |        ✅         |             ✅             |        ✅        |
| `LookupSet`    |          |                  |                           |                 |
| `UnorderedSet` |    ✅     |        ✅         |                           |        ✅        |
| `LookupMap`    |          |                  |                           |                 |
| `UnorderedMap` |    ✅     |        ✅         |                           |        ✅        |

<hr class="subsection" />

### Complexity

| Type           | Access |  Insert  |  Delete  |  Search  | Traverse | Clear |
|----------------|:------:|:--------:|:--------:|:--------:|:--------:|:-----:|
| `Vector`       |  O(1)  |  O(1)\*  | O(1)\*\* |   O(n)   |   O(n)   | O(n)  |
| `LookupSet`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `UnorderedSet` |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `LookupMap`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `UnorderedMap` |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `TreeMap`      |  O(1)  | O(log n) | O(log n) | O(log n) |   O(n)   | O(n)  |

_\* - to insert at the end of the vector using `push_back` (or `push_front` for deque)_
_\*\* - to delete from the end of the vector using `pop` (or `pop_front` for deque), or delete using `swap_remove` which swaps the element with the last element of the vector and then removes it._

---

## Collections Cookbook

### Instantiation

All structures need to be initialized using a **unique `prefix`**, which will be used to index the collection's values in the account's state

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="index.js" language="js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="8" end="11" />
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust" 
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs"
          start="33" end="38"/>

  :::tip

  Notice how we use `enums` to ensure all collections have a different prefix. Moreover, `enums` are very efficient since they get serialized into a single `byte` prefix. 

  :::

  </TabItem>

</Tabs>

:::warning

Because the values are not kept in memory and are lazily loaded from storage, it's important to make sure if a collection is replaced or removed, that the storage is cleared. In addition, it is important that if the collection is modified, the collection itself is updated in state because most collections will store some metadata.

:::


:::danger

Be careful of not using the same prefix in two collections, otherwise, their storage space will collide, and you might overwrite information from one collection when writing in the other

:::

<hr className="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="25" end="28" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="vector.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/vector.rs" start="12" end="30"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<hr className="subsection" />

### Map

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="33" end="37" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="map.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/map.rs" start="9" end="24"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<hr className="subsection" />

### Set

Implements a [set](https://en.wikipedia.org/wiki/Set_(abstract_data_type)) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="42" end="46" />
  </Language>
  <Language value="rust" language="rust">
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
  <Language value="rust" language="rust">
    <Github fname="tree.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/tree.rs" start="9" end="24"/>
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="7" end="24"/>
  </Language>
</CodeTabs>

<hr class="subsection" />

### `LazyOption`

It's a type of persistent collection that only stores a single value.
The goal is to prevent a contract from deserializing the given value until it's needed.
An example can be a large blob of metadata that is only needed when it's requested in a view call,
but not needed for the majority of contract operations.

It acts like an `Option` that can either hold a value or not and also requires a unique prefix (a key in this case)
like other persistent collections.

Compared to other collections, `LazyOption` only allows you to initialize the value during initialization.

---

## Nesting Collections

It is possible to nest collections. When nesting SDK collections, remember to **assign different prefixes to all collections** (including the nested ones).

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    While you can create nested maps, you first need to construct or deconstruct the structure from state. This is a temporary solution that will soon be automatically handled by the SDK.
  
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

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    In Rust the simplest way to avoid collisions between nested collections is by using `enums`

    ```rust
    use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
    use near_sdk::collections::{UnorderedMap, UnorderedSet};
    use near_sdk::{env, near, AccountId, BorshStorageKey, CryptoHash};

    #[near(contract_state)]
    pub struct Contract {
        pub accounts: UnorderedMap<AccountId, UnorderedSet<String>>,
    }

    impl Default for Contract {
        fn default() -> Self {
            Self {
                accounts: UnorderedMap::new(StorageKeys::Accounts),
            }
        }
    }

    #[near(serializers = [borsh])]
    pub enum StorageKeys {
        Accounts,
        SubAccount { account_hash: CryptoHash },
    }

    #[near]
    impl Contract {
        pub fn get_tokens(&self, account_id: &AccountId) -> Vec<String> {
            let tokens = self.accounts.get(account_id).unwrap_or_else(|| {
                UnorderedSet::new(StorageKeys::SubAccount {
                    account_hash: env::sha256_array(account_id.as_bytes()),
                })
            });
            tokens.to_vec()
        }
    }
    ```

  </TabItem>
</Tabs>


---

## Error prone patterns

Because the values are not kept in memory and are lazily loaded from storage, it's important to make sure if a collection is replaced or removed, that the storage is cleared. In addition, it is important that if the collection is modified, the collection itself is updated in state because most collections will store some metadata.

Some error-prone patterns to avoid that cannot be restricted at the type level are:

<Tabs>
  <TabItem value="js" label="🌐 JavaScript">
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  </TabItem>
</Tabs>

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
use near_sdk::store::LookupSet;

let mut m: LookupSet<u8> = LookupSet::new(b"l");
m.insert(1);
assert!(m.contains(&1));

// This would be the fix, manually flushing the intermediate changes to storage.
// m.flush();
std::mem::forget(m);

m = LookupSet::new(b"l");
assert!(!m.contains(&1));
```

<hr class="subsection" />

### Nesting Errors

By extension of the error-prone patterns to avoid mentioned in the [collections section](./collections.md#error-prone-patterns), it is important to keep in mind how these bugs can easily be introduced into a contract when using nested collections.

Some issues for more context:
- https://github.com/near/near-sdk-rs/issues/560
- https://github.com/near/near-sdk-rs/issues/703

The following cases are the most commonly encountered bugs that cannot be restricted at the type level:

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

// Bug 2 (only relevant for `near_sdk::collections`, not `near_sdk::store`): Nested
// collection is modified without updating the collection itself in the outer collection.
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

Persistent collections such as `UnorderedMap`, `UnorderedSet` and `Vector` may
contain more elements than the amount of gas available to read them all.
In order to expose them all through view calls, we can use pagination.

This can be done using iterators with [`Skip`](https://doc.rust-lang.org/std/iter/struct.Skip.html) and [`Take`](https://doc.rust-lang.org/std/iter/struct.Take.html). This will only load elements from storage within the range.

Example of pagination for `UnorderedMap`:

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub status_updates: UnorderedMap<AccountId, String>,
}

#[near]
impl Contract {
    /// Retrieves multiple elements from the `UnorderedMap`.
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