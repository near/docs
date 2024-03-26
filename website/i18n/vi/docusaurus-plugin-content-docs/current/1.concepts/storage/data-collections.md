---
id: data-storage
title: "Data Storage / Các collection"
sidebar_label: Storage trên NEAR
---

Tất cả data lưu trữ trên NEAR blockchain được thực hiện theo cặp key / value. Có một số collection method trong SDK mà chúng tôi đã tạo sẽ giúp bạn lưu trữ data on chain.

- [`near-sdk-rs`](https://github.com/near/near-sdk-rs) for [Rust](https://www.rust-lang.org/) smart contracts
- [`near-sdk-js`](https://github.com/near/near-sdk-js) for [JavaScript](https://www.javascript.com/) smart contracts

For information on storage costs, please see [ **[storage staking](/concepts/storage/storage-staking)** ].

---



## Rust Collection Types {#rust-collection-types}

[`near-sdk-rs` module documentation](https://docs.rs/near-sdk/latest/near_sdk/collections/)

| Type                                                          | Iterable | Clear All Values | Preserves Insertion Order | Range Selection |
| ------------------------------------------------------------- |:--------:|:----------------:|:-------------------------:|:---------------:|
| [`Vector`](/concepts/storage/data-storage#vector)             |    ✅     |        ✅         |             ✅             |        ✅        |
| [`LookupSet`](/concepts/storage/data-storage#lookupset)       |          |                  |                           |                 |
| [`UnorderedSet`](/concepts/storage/data-storage#unorderedset) |    ✅     |        ✅         |                           |        ✅        |
| [`LookupMap`](/concepts/storage/data-storage#lookupmap)       |          |                  |                           |                 |
| [`UnorderedMap`](/concepts/storage/data-storage#unorderedmap) |    ✅     |        ✅         |                           |        ✅        |
| [`TreeMap`](/concepts/storage/data-storage#treemap)           |    ✅     |        ✅         |                           |                 |

---

### Chú thích Big-O {#big-o-notation-1}

> Các value [Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation) trong biểu đồ bên dưới mô tả [time complexity](https://en.wikipedia.org/wiki/Time_complexity) của nhiều collection method trong `near-sdk-rs`. These method complexities correlate with [gas](/concepts/protocol/gas) consumption on NEAR, helping you decide which collection to utilize in your project. Có 3 loại trong các collection method của chúng tôi:

- O(1) - _[constant](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)_
- O(n) - _[linear](https://en.wikipedia.org/wiki/Time_complexity#Linear_time)_
- O(log n) - _[logarithmic](https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time)_

| Type                                                          | Access |  Insert  |    Delete    |  Search  | Traverse | Clear |
| ------------------------------------------------------------- |:------:|:--------:|:------------:|:--------:|:--------:|:-----:|
| [`Vector`](/concepts/storage/data-storage#vector)             |  O(1)  | O(1)\* | O(1)\*\* |   O(n)   |   O(n)   | O(n)  |
| [`LookupSet`](/concepts/storage/data-storage#lookupset)       |  O(1)  |   O(1)   |     O(1)     |   O(1)   |   N/A    |  N/A  |
| [`UnorderedSet`](/concepts/storage/data-storage#unorderedset) |  O(1)  |   O(1)   |     O(1)     |   O(1)   |   O(n)   | O(n)  |
| [`LookupMap`](/concepts/storage/data-storage#lookupmap)       |  O(1)  |   O(1)   |     O(1)     |   O(1)   |   N/A    |  N/A  |
| [`UnorderedMap`](/concepts/storage/data-storage#unorderedmap) |  O(1)  |   O(1)   |     O(1)     |   O(1)   |   O(n)   | O(n)  |
| [`TreeMap`](/concepts/storage/data-storage#treemap)           |  O(1)  | O(log n) |   O(log n)   | O(log n) |   O(n)   | O(n)  |

_** - để xóa từ cuối vector thì dùng `pop` (hoặc `pop_front` để deque), hoặc khi xóa bằng `swap_remove` sẽ swap element với element cuối cùng của vector và sau đó remove nó._

_\*\* - to delete from the end of the vector using `pop` (or `pop_front` for deque), or delete using `swap_remove` which swaps the element with the last element of the vector and then removes it._

---

### Gas Consumption Examples {#gas-consumption-examples-1}

> Các ví dụ dưới đây cho thấy sự khác biệt trong việc việc đốt gas để lưu trữ và truy xuất các cặp key/value bằng cách sử dụng các method trên. Xin lưu ý rằng chi phí gas để khởi động runtime environment trên chain đã được lược bỏ, nhằm mục đích chỉ hiển thị dữ liệu đọc/ghi.
> 
> You can reproduce this and test out your own data set by visiting [collection-examples-rs](https://github.com/near-examples/collection-examples-rs).

![Rust Set Data Gas Chart](/docs/assets/rust-setData-gasBurnt.png)

![Rust Get Data Gas Chart](/docs/assets/rust-getData-gasBurnt.png)

---

### `Vector` {#vector}

> Implements a [vector](https://en.wikipedia.org/wiki/Array_data_structure) / persistent array.
> 
> - can iterate using index
> - Uses the following map: index -> element.

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/vector.rs) ]

[ [Implementation](https://docs.rs/near-sdk/latest/near_sdk/collections/vector/struct.Vector.html) ]

---

### `LookupSet` {#lookupset}

> Implements a persistent set _without_ iterators.
> 
> - can not iterate over keys
> - more efficient in reads / writes

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_set.rs) ]

[ [Implementation](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupSet.html) ]

---

### `UnorderedSet` {#unorderedset}

> Được build trên class [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts), điều này implement một persistent set mà không có các iterator.

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_set.rs) ]

[ [Implementation Docs](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.UnorderedSet.html) ]

---

### `LookupMap` {#lookupmap}

> Implement một map được build trên [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts).
> 
> - can not iterate over keys
> - does not preserve order when removing and adding values
> - efficient in number of reads and writes

- Để sử dụng:

```rust
pub fn add_lookup_map(&mut self, key: String, value: String) {
    self.lookup_map.insert(&key, &value);
}
```

- Để tạo:

```rust
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

[ [Implementation](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupMap.html) ]

---

### `UnorderedMap` {#unorderedmap}

> Implements an unordered map.
> 
> - iterable
> - does not preserve order when removing and adding values
> - is able to clear all values

- Để sử dụng:

```rust
pub fn add_unordered_map(&mut self, key: String, value: String) {
    self.unordered_map.insert(&key, &value);
}
```

- Để tạo:

```rust
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

[ [SDK source](https://github.com/near/near-sdk-rs/tree/master/near-sdk/src/collections/unordered_map) ]

[ [Implementation](https://docs.rs/near-sdk/latest/near_sdk/collections/unordered_map/struct.UnorderedMap.html) ]

---

### `TreeMap` {#treemap}

> Được build trên class [`Storage`](https://github.com/near/near-sdk-as/blob/master/sdk-core/assembly/storage.ts), nó implement một a persistent bidirectional queue / double-ended queue / deque.
> 
> - iterable
> - preserves order
> - able to clear all values
> - self balancing

- Để sử dụng:

```rust
pub fn add_tree_map(&mut self, key: String, value: String) {
    self.tree_map.insert(&key, &value);
}
```

- Để tạo:

```rust
map.set(key, value);
map.getSome(key);
```

[ [SDK source](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/tree_map.rs) ]

[ [Implementation](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.TreeMap.html) ]

---

## Storage Constraints on NEAR

For storing data on-chain it’s important to keep in mind the following:

- Can add up in storage staking costs
- There is a 4mb limit on how much you can upload at once

Let’s say for example, someone wants to put an NFT purely on-chain (rather than IPFS or some other decentralized storage solution) you’ll have almost an unlimited amount of storage but will have to pay 1 $NEAR per 100kb of storage used (see Storage Staking).

Users will be limited to 4MB per contract call upload due to MAX_GAS constraints. The maximum amount of gas one can attach to a given functionCall is 300TGas.
