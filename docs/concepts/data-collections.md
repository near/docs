---
id: data-storage
title: Data Storage / Collections
sidebar_label: Data Storage / Collections
---

## Overview

> All data stored on the NEAR blockchain is done in key / value pairs. There are several collection methods in the SDKs we've created that will help you store your data on chain.
>
> - [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/) smart contracts
> - [`near-sdk-rs`](https://github.com/near/near-sdk-rs) for [Rust](https://www.rust-lang.org/) smart contracts

---

## AssemblyScript Collection Types

| Type                                                                           | Iterable | Clear all values | Preserves order |
| ------------------------------------------------------------------------------ | :------: | :--------------: | :-------------: |
| [`PersistentVector`](/docs/concepts/data-storage#persistentvector)             |     x     |         x         |        x         |
| [`PersistentSet`](/docs/concepts/data-storage#persistentset)                   |          |                  |                 |
| [`PersistentMap`](/docs/concepts/data-storage#persistentmap)                   |          |                  |                 |
| [`PersistentUnorderedMap`](/docs/concepts/data-storage#persistentunorderedmap) |    X     |        X         |                 |
| [`PersistentDeque`](/docs/concepts/data-storage#persistentdeque)               |          |         x         |                 |
| [`AVLTree`](/docs/concepts/data-storage#avltree)                               |    X     |        X         |        X        |

[`near-sdk-as`](https://github.com/near/near-sdk-as/tree/master/sdk-core/assembly/collections)

> The examples below show differences in gas burnt storing key/value pairs using the above methods. To test this and your own sample data, visit [collection-examples-as](https://github.com/near-examples/collection-examples-rs).

<img align="left" src="/docs/assets/assembly_collections_gas.png">

---

### `PersistentVector`

> Implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) / persistent array built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) class.
>
> Uses the following map: index -> element.

- To create:

```ts
import { PersistentVector } from "near-sdk-as";
let vector = new PersistentVector<string>("v"); // choose a unique prefix per collection
```

- To use:

```ts
vector.push(value);
vector.pop(value);
vector.length;
```

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentVector.ts) ]

---

### `PersistentSet`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) class, this implements a persistent set without iterators.
>
> - is not iterable
> - more efficient in the number of reads and writes

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentSet.ts) ]

---

### `PersistentMap`

> Implements a map built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts).

- To create:

```ts
import { PersistentMap } from "near-sdk-as";
let map = new PersistentMap<string, string>("pmap"); // choose a unique prefix per collection
```

- To use:

```ts
map.set(key, value);
map.getSome(key);
```

**Note:** The Map doesn't store keys, so if you need to retrieve them, include keys in the values.

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentMap.ts) ]

---

### `PersistentUnorderedMap`

> Implements an unordered map built on top of the [`PersistentMap`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentMap.ts) class and a [`PersistentVector`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentVector.ts), which stores the keys of the map.  These keys are initially in the order they are inserted, however, a deleted key is swapped with the last key.

- To create:

```ts
import { PersistentUnorderedMap } from "near-sdk-as";
let map = new PersistentUnorderedMap<string, string>("umap"); // note the prefix must be unique per collection
```

- To use:

```ts
map.set(key, value);
map.getSome(key);
```

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentUnorderedMap.ts) ]

---

### `PersistentDeque`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) class, this implements a persistent bidirectional queue / double-ended queue / deque.

- To create:

```ts
import { PersistentDeque } from "near-sdk-as";
let dq = new PersistentDeque<string>("deque"); // choose a unique prefix per collection
```

- To use:

```ts
dq.pushFront(value);
dq.popBack();
```

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentDeque.ts) ]

---

### `AVLTree`

> Implements a Tree Map based on [AVL-tree](https://en.wikipedia.org/wiki/AVL_tree)
> Keys are ordered are iterable.

- To create:

```ts
import { PersistentUnorderedMap } from "near-sdk-as";
map = new AVLTree<string, string>("avl"); // choose a unique prefix per account
```

- To use:

```ts
map.set(key, value);
map.getSome(key);
```

[ [SDK source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/avlTree.ts) ]

---

## Rust Collection Types

[`near-sdk-rs` module documentation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/)

| Type                                                       | Iterable | Clear all values | Preserves order |
| ---------------------------------------------------------- | :------: | :--------------: | :-------------: |
| [`Vector`](/docs/concepts/data-storage#vector)             |    X     |        X         |        X        |
| [`LookupSet`](/docs/concepts/data-storage#lookupset)       |          |                  |                 |
| [`UnorderedSet`](/docs/concepts/data-storage#unorderedset) |    X     |                  |                 |
| [`LookupMap`](/docs/concepts/data-storage#lookupmap)       |          |                  |                 |
| [`UnorderedMap`](/docs/concepts/data-storage#unorderedmap) |    X     |        X         |                 |
| [`TreeMap`](/docs/concepts/data-storage#treemap)           |    X     |        X         |        X        |

> The examples below show differences in gas burnt storing key/value pairs using the above methods. To test this and your own sample data, visit [collection-examples-rs](https://github.com/near-examples/collection-examples-rs).

<img align="left" src="/docs/assets/rust_collections_gas.png">

---

### `Vector`

> Implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) / persistent array.
>
> - can iterate using index
> - Uses the following map: index -> element.

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/vector.rs) ]

[ [Implementation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.Vector.html) ]

---

### `LookupSet`

> Implements a persistent set _without_ iterators.
>
> - can not iterate over keys
> - more efficient in reads / writes

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_set.rs) ]

[ [Implementation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.LookupSet.html) ]

---

### `UnorderedSet`

> Implements a persistent set _with_ iterators.

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_set.rs) ]

[ [Implementation Docs](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.UnorderedSet.html) ]

---

### `LookupMap`

> Implements an persistent map.
>
> - can not iterate over keys
> - does not preserve order when removing and adding values
> - efficient in number of reads and writes

- To add data:

```rs
pub fn add_lookup_map(&mut self, key: String, value: String) {
    self.lookup_map.insert(&key, &value);
}
```

- To get data:

```rs
pub fn get_lookup_map(&self, key: String) -> String {
    match self.lookup_map.get(&key) {
        Some(value) => {
            let log_message = format!("Value from LookupMap is {:?}", value.clone());
            env::log(log_message.as_bytes());
            value
        },
        None => "not found".to_string()
    }
}
```

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_map.rs) ]

[ [Implementation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.LookupMap.html) ]

---

### `UnorderedMap`

> Implements an unordered map.
>
> - iterable
> - does not preserve order when removing and adding values
> - is able to clear all values

- To add data:

```rs
pub fn add_unordered_map(&mut self, key: String, value: String) {
    self.unordered_map.insert(&key, &value);
}
```

- To get data:

```rs
pub fn get_unordered_map(&self, key: String) -> String {
    match self.unordered_map.get(&key) {
        Some(value) => {
            let log_message = format!("Value from UnorderedMap is {:?}", value.clone());
            env::log(log_message.as_bytes());
            value
        },
        // None => "Didn't find that key.".to_string()
        None => "not found".to_string()
    }
}
```

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_map.rs) ]

[ [Implementation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.LookupMap.html) ]

---

### `TreeMap`

> Implements a Tree Map based on [AVL-tree](https://en.wikipedia.org/wiki/AVL_tree).
>
> - iterable
> - preserves order
> - able to clear all values
> - self balancing

- To add data:

```rs
pub fn add_tree_map(&mut self, key: String, value: String) {
    self.tree_map.insert(&key, &value);
}
```

- To get data:

```rs
pub fn get_tree_map(&self, key: String) -> String {
    match self.tree_map.get(&key) {
        Some(value) => {
            let log_message = format!("Value from TreeMap is {:?}", value.clone());
            env::log(log_message.as_bytes());
            // Since we found it, return it (note implicit return)
            value
        },
        // did not find the entry
        // note: curly brackets after arrow are optional in simple cases, like other languages
        None => "not found".to_string()
    }
}
```

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/tree_map.rs) ]

[ [Implementation](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/struct.TreeMap.html) ]
