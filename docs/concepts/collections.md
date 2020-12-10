---
id: collections
title: Storage Collections
sidebar_label: Storage Collections
---

***everything is key/value on the blockchain***

all about the storage :) u4 (4 bytes) / u128 (128 bytes)  

| Type | Digits |
| ------ | ----------- |
| u8     | 3           |
| u16    | 5           |
| u32    | 10          |
| u64    | 20          |  larger than 53bits in json gets fucked up turn into string U
| u128   | 39          |

Collection Types (AssemblyScript)

PersistentVector  - friends (allows duplicates, faster )
PersistentMap - grades
PersistentUnorderedMap - roll call for students
PersistentSet  - shopping list (no duplicates)
PersistentDeque - 

avlTree autoBalances data
AVLTree
- persistentMap
- persistentVector

Vector

- small arrays for very small amount of data (0-8 items)
- quicker to find items in vector than map

Map

- quicker with 5 - 30 elements

hashMap quicker than map for lookups
