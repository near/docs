---
id: collections
title: Data Storage / Collections
sidebar_label: Data Storage / Collections
---

## Collections Overview

All data stored on the NEAR blockchain uses key / value pairs. There are many different ways to store your key value pairs on chain using two software development kits we've created.

- [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/) smart contracts
- [`near-sdk-rs`](https://github.com/near/near-sdk-rs) for [Rust](https://www.rust-lang.org/) smart contracts

## AssemblyScript Collection Types

| Type                                                                          | Iterable | Clear all values | Preserves order | Self balances |
| ----------------------------------------------------------------------------- | -------- | ---------------- | --------------- | ------------- |
| [`PersistentVector`](/docs/concepts/collections#persistentvector)             |          |                  |                 |               |
| [`PersistentSet`](/docs/concepts/collections#persistentset)                   |          |                  |                 |               |
| [`PersistentMap`](/docs/concepts/collections#persistentmap)                   |          |                  |                 |               |
| [`PersistentUnorderedMap`](/docs/concepts/collections#persistentunorderedmap) | X        | X                |                 |               |
| [`PersistentDeque`](/docs/concepts/collections#persistentdeque)               |          |                  |                 |               |
| [`AVLTree`](/docs/concepts/collections#avltree)                               | X        | X                | X               | X             |

### `PersistentVector`

### `PersistentSet`

### `PersistentMap`

### `PersistentUnorderedMap`

### `PersistentDeque`

### `AVLTree`

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

### `lookup_set`

### `unordered_set`

### `lookup_map`

### `unordered_map`

### `tree_map`
