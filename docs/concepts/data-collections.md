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

| Type                                                                          | Iterable | Clear all values | Preserves order | Self balances |
| ----------------------------------------------------------------------------- | :------: | :--------------: | :-------------: | :-----------: |
| [`PersistentVector`](/docs/concepts/data-storage#persistentvector)             |          |                  |                 |               |
| [`PersistentSet`](/docs/concepts/data-storage#persistentset)                   |          |                  |                 |               |
| [`PersistentMap`](/docs/concepts/data-storage#persistentmap)                   |          |                  |                 |               |
| [`PersistentUnorderedMap`](/docs/concepts/data-storage#persistentunorderedmap) |    X     |        X         |                 |               |
| [`PersistentDeque`](/docs/concepts/data-storage#persistentdeque)               |          |                  |                 |               |
| [`AVLTree`](/docs/concepts/data-storage#avltree)                               |    X     |        X         |        X        |       X       |

[`near-sdk-as` overview source](https://github.com/near/near-sdk-as/tree/master/sdk-core/assembly/collections)

> The examples below show differences in gas burnt storing key/value pairs using the above methods. To test this and your own sample data, visit [collection-examples-as](https://github.com/near-examples/collection-examples-rs).

<img align="left" src="/docs/assets/assembly_collections_gas.png"> 

---

### `PersistentVector`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) class, this implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) / persistent array.
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

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentVector.ts)

---

### `PersistentSet`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) class, this implements a persistent set without iterators. 
>
> - is not iterable
> - more efficient in the number of reads and writes

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentSet.ts)

---

### `PersistentMap`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) classIt implements a map.

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

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentMap.ts)

---

### `PersistentUnorderedMap`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) classIt implements a Unordered Map.

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

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentUnorderedMap.ts)

---

### `PersistentDeque`

> Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) classIt implements a persistent bidirectional queue / double-ended queue / deque.

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

[near-sdk-as source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentDeque.ts)

---

### `AVLTree`

> Implements a Tree Map based on [AVL-tree](https://en.wikipedia.org/wiki/AVL_tree)

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

[near-sdk-as source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/avlTree.ts)

---

## Rust Collection Types

| Type                                                        | Iterable | Clear all values | Preserves order | Self balances |
| ----------------------------------------------------------- | :------: | :--------------: | :-------------: | :-----------: |
| [`vector`](/docs/concepts/data-storage#vector)               |          |                  |                 |               |
| [`lookup_set`](/docs/concepts/data-storage#lookup_set)       |          |                  |                 |               |
| [`unordered_set`](/docs/concepts/data-storage#unordered_set) |    X     |                  |                 |               |
| [`lookup_map`](/docs/concepts/data-storage#lookup_map)       |          |                  |                 |               |
| [`unordered_map`](/docs/concepts/data-storage#unordered_map) |    X     |        X         |                 |               |
| [`tree_map`](/docs/concepts/data-storage#tree_map)           |    X     |        X         |        X        |       X       |

> The examples below show differences in gas burnt storing key/value pairs using the above methods. To test this and your own sample data, visit [collection-examples-rs](https://github.com/near-examples/collection-examples-rs).

<img align="left" src="/docs/assets/rust_collections_gas.png">

---

### `vector`

> Implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) / persistent array.
>
> - can not iterate
> - Uses the following map: index -> element.

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/vector.rs)

---

### `lookup_set`

> Implements a persistent set _without_ iterators.
>
> - can not iterate over keys
> - more efficient in reads / writes

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_set.rs)

---

### `unordered_set`

> Implements a persistent set _with_ iterators.

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_set.rs)

---

### `lookup_map`

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

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_map.rs)

---

### `unordered_map`

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

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_map.rs)

---

### `tree_map`

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

[`near-sdk-rs` source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/tree_map.rs)
