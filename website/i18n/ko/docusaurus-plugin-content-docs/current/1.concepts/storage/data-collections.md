---
id: data-storage
title: "데이터 저장 / 수집"
sidebar_label: NEAR에 저장하기
---

NEAR 블록체인에 저장된 모든 데이터는 키/값 쌍으로 이루어집니다. 우리가 만든 SDK에는 데이터를 체인에 저장하는 데 도움이 되는 몇 가지 수집 방법이 있습니다.

- [Rust](https://www.rust-lang.org/) 스마트 컨트랙트를 위한 [`near-sdk-rs`](https://github.com/near/near-sdk-rs)
- [JavaScript](https://www.javascript.com/) 스마트 컨트랙트를 위한 [`near-sdk-js`](https://github.com/near/near-sdk-js)

스토리지 비용에 대한 자세한 내용은 [**스토리지 스테이킹**](/concepts/storage/storage-staking)을 참조하십시오.

---



## Rust 수집 자료형 {#rust-collection-types}

[`near-sdk-rs` 모듈 문서](https://docs.rs/near-sdk/latest/near_sdk/collections/)

| 자료형                                                           | 반복 가능 | 모든 값 지우기 | 삽입 순서 유지 | 범위 선택 |
| ------------------------------------------------------------- |:-----:|:--------:|:--------:|:-----:|
| [`Vector`](/concepts/storage/data-storage#vector)             |   ✅   |    ✅     |    ✅     |   ✅   |
| [`LookupSet`](/concepts/storage/data-storage#lookupset)       |       |          |          |       |
| [`UnorderedSet`](/concepts/storage/data-storage#unorderedset) |   ✅   |    ✅     |          |   ✅   |
| [`LookupMap`](/concepts/storage/data-storage#lookupmap)       |       |          |          |       |
| [`UnorderedMap`](/concepts/storage/data-storage#unorderedmap) |   ✅   |    ✅     |          |   ✅   |
| [`TreeMap`](/concepts/storage/data-storage#treemap)           |   ✅   |    ✅     |          |       |

---

### Big-O 표기법 {#big-o-notation-1}

> 아래 차트의 [Big-O 표기법](https://en.wikipedia.org/wiki/Big_O_notation) 값은 `near-sdk-rs`에서 볼 수 있는 다양한 수집 방법의 [시간 복잡도](https://en.wikipedia.org/wiki/Time_complexity)를 설명 합니다. These method complexities correlate with [gas](/concepts/protocol/gas) consumption on NEAR, helping you decide which collection to utilize in your project. 데이터 수집 방법에는 세 가지 유형이 있습니다.

- O(1) - _[상수시간](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)_
- O(n) - _[선형시간](https://en.wikipedia.org/wiki/Time_complexity#Linear_time)_
- O(log n) - _[로그시간](https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time)_

| 자료형                                                           |  접근  |    삽입    |      삭제      |    검색    | 순회(Traverse) |  삭제  |
| ------------------------------------------------------------- |:----:|:--------:|:------------:|:--------:|:------------:|:----:|
| [`Vector`](/concepts/storage/data-storage#vector)             | O(1) | O(1)\* | O(1)\*\* |   O(n)   |     O(n)     | O(n) |
| [`LookupSet`](/concepts/storage/data-storage#lookupset)       | O(1) |   O(1)   |     O(1)     |   O(1)   |     N/A      | N/A  |
| [`UnorderedSet`](/concepts/storage/data-storage#unorderedset) | O(1) |   O(1)   |     O(1)     |   O(1)   |     O(n)     | O(n) |
| [`LookupMap`](/concepts/storage/data-storage#lookupmap)       | O(1) |   O(1)   |     O(1)     |   O(1)   |     N/A      | N/A  |
| [`UnorderedMap`](/concepts/storage/data-storage#unorderedmap) | O(1) |   O(1)   |     O(1)     |   O(1)   |     O(n)     | O(n) |
| [`TreeMap`](/concepts/storage/data-storage#treemap)           | O(1) | O(log n) |   O(log n)   | O(log n) |     O(n)     | O(n) |

_\* - `push_back`(또는 deque에 대해 `push_front`)를 사용하여 벡터 맨 뒤에 삽입_

_\*\* - `pop` (또는 deque에 대해 `pop_front`)를 사용하여 벡터 맨 뒤 원소를 삭제하고, 또는 `swap_remove`를 사용하여 해당 요소를 벡터 맨 뒤 요소와 교체한 뒤 삭제_

---

### 가스 소모 예제 {#gas-consumption-examples-1}

> 아래의 예제는 위의 방법을 사용하여 키/값 쌍을 저장하고 검색하는 가스 소모의 차이점을 보여줍니다. 데이터 읽기/쓰기만 표시하기 위해 체인에서 런타임 환경을 회전시키는 가스 비용은 차감되었습니다.
> 
> [collection-examples-rs](https://github.com/near-examples/collection-examples-rs)를 방문하여 이를 재현하고 자신의 데이터 세트를 테스트할 수 있습니다.

![Rust Set Data Gas Chart](/docs/assets/rust-setData-gasBurnt.png)

![Rust Get Data Gas Chart](/docs/assets/rust-getData-gasBurnt.png)

---

### `Vector` {#vector}

> [vector](https://en.wikipedia.org/wiki/Array_data_structure) / 영구 배열을 구현합니다.
> 
> - 인덱스를 사용하여 반복할 수 있습니다.
> - 다음 맵을 사용합니다: 인덱스 -> 요소

[ [구현](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.TreeMap.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/vector.rs) ]

---

### `LookupSet` {#lookupset}

> 반복자(iterator) _없는_ 영구 집합을 구현합니다.
> 
> - 키를 반복할 수 없습니다.
> - 더 효율적인 읽기/쓰기가 가능합니다.

[ [구현](https://docs.rs/near-sdk/latest/near_sdk/collections/vector/struct.Vector.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_set.rs) ]

---

### `UnorderedSet` {#unorderedset}

> 반복자 _없이_ 영구 집합을 구현합니다.

[ [구현](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupSet.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/unordered_set.rs) ]

---

### `LookupMap` {#lookupmap}

> 영구 맵을 구현합니다.
> 
> - 키를 반복할 수 없습니다.
> - 값을 제거하고 추가할 때 순서를 유지하지 않습니다.
> - 읽기 및 쓰기 횟수가 효율적입니다.

- 데이터를 추가하려면:

```rust
pub fn add_lookup_map(&mut self, key: String, value: String) {
    self.lookup_map.insert(&key, &value);
}
```

- 데이터를 얻으려면:

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

[ [구현 문서](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.UnorderedSet.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/lookup_map.rs) ]

---

### `UnorderedMap` {#unorderedmap}

> 정렬되지 않은 맵핑을 구현합니다.
> 
> - 반복 가능합니다.
> - 값을 제거하고 추가할 때 순서를 유지하지 않습니다.
> - 모든 값을 지울 수 있습니다.

- 데이터를 추가하려면:

```rust
pub fn add_unordered_map(&mut self, key: String, value: String) {
    self.unordered_map.insert(&key, &value);
}
```

- 데이터를 얻으려면:

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

[ [구현](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupMap.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/tree/master/near-sdk/src/collections/unordered_map) ]

---

### `TreeMap` {#treemap}

> [AVL-tree](https://en.wikipedia.org/wiki/AVL_tree) 기반의 트리 맵을 구현합니다.
> 
> - 반복 가능합니다.
> - 순서를 유지합니다.
> - 모든 값을 지울 수 있습니다.
> - 자기 균형(Self Balancing)을 유지합니다.

- 데이터를 추가하려면:

```rust
pub fn add_tree_map(&mut self, key: String, value: String) {
    self.tree_map.insert(&key, &value);
}
```

- 데이터를 얻으려면:

```rust
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

[ [구현](https://docs.rs/near-sdk/latest/near_sdk/collections/unordered_map/struct.UnorderedMap.html) ]

[ [SDK 소스](https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/collections/tree_map.rs) ]

---

## NEAR의 스토리지 제한 사항

데이터를 온체인에 저장하려면 다음 사항에 유의해야 합니다:

- 스토리지 스테이킹 비용은 합산될 수 있습니다.
- 한 번에 업로드할 수 있는 양에는 4MB 제한이 있습니다.

예를 들어, 누군가가 NFT를 순전히 온체인(IPFS 또는 다른 탈중앙화 스토리지 솔루션이 아닌)에 넣기를 원한다고 가정해 보겠습니다. 거의 무제한의 스토리지가 있지만, 사용된 스토리지 100kb당 1 $NEAR를 지불해야 합니다(스토리지 스테이킹 참고).

사용자는 MAX_GAS 제약으로 인해, 컨트랙트 호출 당 4MB까지 업로드할 수 있도록 제한됩니다. 주어진 functionCall에 연결할 수 있는 최대 가스량은 300TGas입니다.
