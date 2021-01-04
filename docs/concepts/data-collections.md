---
id: data-storage
title: Data Storage / Collections
sidebar_label: Data Storage / Collections
---

## Collections Overview

All data stored on the NEAR blockchain uses key / value pairs. There are many different ways to store your key value pairs on chain using two software development kits we've created.

- [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/) smart contracts
- [`near-sdk-rs`](https://github.com/near/near-sdk-rs) for [Rust](https://www.rust-lang.org/) smart contracts

## AssemblyScript Collection Types

| Type                                                                          | Key Performance | Iterable | Clear all values | Preserves order | Self balances |
| ----------------------------------------------------------------------------- | --------------- | -------- | ---------------- | --------------- | ------------- |
| [`PersistentVector`](/docs/concepts/collections#persistentvector)             |                 |          |                  |                 |               |
| [`PersistentSet`](/docs/concepts/collections#persistentset)                   |                 |          |                  |                 |               |
| [`PersistentMap`](/docs/concepts/collections#persistentmap)                   |                 |          |                  |                 |               |
| [`PersistentUnorderedMap`](/docs/concepts/collections#persistentunorderedmap) |                 | X        | X                |                 |               |
| [`PersistentDeque`](/docs/concepts/collections#persistentdeque)               |                 |          |                  |                 |               |
| [`AVLTree`](/docs/concepts/collections#avltree)                               |                 | X        | X                | X               | X             |

[`near-sdk-as` overview source](https://github.com/near/near-sdk-as/tree/master/sdk-core/assembly/collections)

### `PersistentVector`

Built on top of the [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts) classIt implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) -- a persistent array.

To create a vector:

```ts
let vec = new PersistentVector<string>("v"); // choose a unique prefix per account
```

To use the vector:

```ts
vec.push(value);
vec.pop(value);
vec.length;
```

**Note:**
Since all data stored on the blockchain is kept in a single key-value store under the contract account,
you must always use a unique storage prefix for different collections to avoid data collision.

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentVector.ts)

### `PersistentSet`

A vector class that implements a persistent array.

map each element to its index in another vector

```ts
{
  hash_of_value1: index_of_value1,
  hash_of_value2: index_of_value2,
  hash_of_value3: index_of_value3,
}

[
 value1,
 value2,
 value3
]
```

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentSet.ts)

### `PersistentMap`

This class is one of several convenience collections built on top of the `Storage` class
exposed by the NEAR platform. It implements a map -- a persistent unordered map.

To create a map

```ts
let map = new PersistentMap<string, string>("m"); // choose a unique prefix per account
```

To use the map

```ts
map.set(key, value);
map.get(key);
```


- The Map doesn't store keys, so if you need to retrieve them, include keys in the values.

- Since all data stored on the blockchain is kept in a single key-value store under the contract account,
  you must always use a unique storage prefix for different collections to avoid data collision.

@typeParam K The generic type parameter `K` can be any [valid AssemblyScript type](https://docs.assemblyscript.org/basics/types).
@typeParam V The generic type parameter `V` can be any [valid AssemblyScript type](https://docs.assemblyscript.org/basics/types).

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentMap.ts)

### `PersistentUnorderedMap`

Creates or restores a persistent unordered map with a given storage prefix.
Always use a unique storage prefix for different collections.

Example

```ts
let map = new PersistentUnorderedMap<string, string>("m"); // note the prefix must be unique (per NEAR account)
```

[`near-sdk-as` source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentUnorderedMap.ts)

### `PersistentDeque`

This class is one of several convenience collections built on top of the `Storage` class
exposed by the NEAR platform. It implements queue -- a persistent bidirectional queue
(aka double-ended queue or deque)

To create a deque:

```ts
let dq = new PersistentDeque<string>("q"); // choose a unique prefix per account
```

To use the deque

```ts
dq.pushFront(value);
dq.popBack();
```

IMPORTANT NOTE:
Since all data stored on the blockchain is kept in a single key-value store under the contract account,
you must always use a unique storage prefix for different collections to avoid data collision.

[near-sdk-as source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/persistentDeque.ts)

### `AVLTree`

[near-sdk-as source](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/collections/avlTree.ts)

## Rust Collection Types

| Type                                                        | Iterable | Clear all values | Preserves order | Self balances |
| ----------------------------------------------------------- | -------- | ---------------- | --------------- | ------------- |
| [`vector`](/docs/concepts/collections#vector)               |          |                  |                 |               |
| [`lookup_set`](/docs/concepts/collections#lookup_set)       |          |                  |                 |               |
| [`unordered_set`](/docs/concepts/collections#unordered_set) |          |                  |                 |               |
| [`lookup_map`](/docs/concepts/collections#lookup_map)       |          |                  |                 |               |
| [`unordered_map`](/docs/concepts/collections#unordered_map) | X        | X                |                 |               |
| [`tree_map`](/docs/concepts/collections#tree_map)           | X        | X                | X               | X             |

### `vector`

A vector implemented on a trie. Unlike standard vector does not support insertion and removal of an element results in the last element being placed in the empty position. An iterable implementation of vector that stores its content on the trie.
Uses the following map: index -> element.

[info](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/vector.rs)

### `lookup_set`

A persistent set without iterators. Unlike `near_sdk::collections::LookupSet` this set doesn't store values separately in a vector, so it can't iterate over the values. But it makes this implementation more efficient in the number of reads and writes. An non-iterable implementation of a set that stores its content directly on the trie.

[info](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_set.rs)

### `unordered_set`

info

### `lookup_map`

A persistent map without iterators. Unlike `near_sdk::collections::UnorderedMap` this map doesn't store keys and values separately in vectors, so it can't iterate over keys. But it makes this map more efficient in the number of reads and writes.

[info](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_map.rs)

### `unordered_map`

info

### `tree_map`

info
