---
sidebar_position: 2
---

# 컬렉션

애플리케이션의 데이터에 사용할 데이터 구조를 결정할 때, 스토리지에 읽고 쓰는 데이터의 양을 최소화하는 것이 중요하지만 트랜잭션 비용을 최소화하기 위해 직렬화 및 역직렬화되는 데이터의 양도 최소화해야 합니다. 애플리케이션이 확장되고, 상태를 새 데이터 구조로 마이그레이션하면 비용이 발생하고, 병목 현상이 발생할 수 있으므로, 스마트 컨트랙트에서 데이터 구조의 장단점을 이해하는 것이 중요합니다.

`near-sdk` 내 컬렉션은 데이터를 청크로 분할하고 필요할 때까지 스토리지에 대한 읽기 및 쓰기를 연기하도록 설계되었습니다. 이러한 데이터 구조는 저수준 스토리지 상호 작용을 처리하고, [`std::collections`](https://doc.rust-lang.org/std/collections/index.html)와 유사한 API를 갖는 것을 목표로 합니다..

:::info 메모

`near_sdk::collections`는 `near_sdk::store`로 이동하여 업데이트된 API를 가질 예정입니다. 이는 구현 중이고, 이러한 업데이트된 구조에 액세스하려면 `near-sdk`에서 `unstable` 기능을 활성화하세요.

:::

`std::collections`를 사용할 때, 상태가 로드될 때마다 자료 구조의 모든 항목이 스토리지에서 지속적으로 읽고 역직렬화된다는 점을 염두에 두는 것이 중요합니다. 이것은 적지 않은 양의 데이터에 대해서도 큰 비용이 드는 작업이기 때문에, 사용되는 가스의 양을 최소화하기 위해 대부분의 경우 SDK 컬렉션을 사용해야 합니다.

최신 컬렉션과 관련된 문서는 [rust 문서](https://docs.rs/near-sdk/latest/near_sdk/collections/index.html)에서 찾을 수 있습니다.
<!-- TODO include/update link for store module to replace collections mod when docs updated -->

SDK에 존재하는 다음 데이터 구조는 다음과 같습니다.

| SDK 컬렉션                   | 해당하는 `std`                | 설명                                                                                                                                          |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `LazyOption<T>`     | `Option<T>`         | 스토리지의 선택적 값입니다. 이 값은 상호 작용할 때만 스토리지에서 읽어 옵니다. 이 값은 스토리지에 값이 저장되어 있으면 `Some<T>`, 접두사에 값이 존재하지 않는 경우 `None`입니다.                         |
| `Vector<T>`         | `Vec<T>`            | 확장 가능한 배열 유형입니다. 값은 메모리에서 샤딩되며, 동적으로 크기가 조정되고, 반복 및 인덱싱 가능한 값에 사용할 수 있습니다.                                                                  |
| <code>LookupMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code> | 이 구조는 컨트랙트에 사용할 수 있는 키-값 스토리지를 둘러싼 얇은 래퍼 역할을 합니다. 이 구조에는 맵의 요소에 대한 메타데이터가 포함되어 있지 않으므로 반복할 수 없습니다.                                          |
| <code>UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code> | 데이터 구조의 요소를 반복할 수 있도록 추가 데이터를 저장한다는 점을 제외하면, `LookupMap`과 유사합니다.                                                                            |
| <code>TreeMap`<K,&nbsp;V>`</code> | <code>BTreeMap`<K,&nbsp;V>`</code> | 정렬된 `UnorderedMap`입니다. 기본 구현은 [AVL 트리](https://en.wikipedia.org/wiki/AVL_tree)를 기반으로 합니다. 이 구조는 일관된 순서가 필요하거나, 최소/최대 키에 액세스해야 할 때 사용해야 합니다. |
| `LookupSet<T>`      | `HashSet<T>`        | `LookupMap`과 유사하지만 값을 저장하지 않는 집합입니다. 이는 값의 고유한 존재 여부를 확인하는 데 사용할 수 있습니다. 이 구조는 반복할 수 없으며, 값 조회에만 사용할 수 있습니다.                                |
| `UnorderedSet<T>`   | `HashSet<T>`        | 세트에 포함된 요소에 대한 추가 메타데이터를 저장하는 반복 가능한 자료형으로, `LookupSet`과 같습니다.                                                                              |

## 인메모리 `HashMap` vs 영구 `UnorderedMap`

- `HashMap`은 모든 데이터를 메모리에 보관합니다. 액세스하려면 컨트랙트에서 전체 맵을 역직렬화해야 합니다.
- `UnorderedMap`은 영구 스토리지에 데이터를 보관합니다. 요소에 액세스하려면 해당 요소를 역직렬화하기만 하면 됩니다.

`UnorderedMap` 사용 사례:

- **한 번의 함수 호출**로 컬렉션의 모든 요소를 ​​반복해야 합니다.
- 요소의 수는 작거나 고정되어 있습니다(예: 10개 미만).

`HashMap` 사용 사례:

- 컬렉션의 제한된 하위 집합(예: 호출당 하나 또는 두 개의 요소)에 액세스해야 합니다.
- 컬렉션을 메모리에 맞출 수 없습니다.

그 이유는, `HashMap`이 하나의 스토리지 작업으로 전체 컬렉션을 역직렬화(및 직렬화)하기 때문입니다. 전체 컬렉션에 액세스하는 것이 `N`개의 스토리지 작업을 통해 모든 요소에 액세스하는 것보다 가스 비용이 저렴합니다.

`UnorderedMap` 예시:

```rust
/// Using Default initialization.
#[near(contract_state)]
#[derive(Default)]
pub struct Contract {
    pub status_updates: HashMap<AccountId, String>,
}

#[near]
impl Contract {
    pub fn set_status(&mut self, status: String) {
        self.status_updates.insert(env::predecessor_account_id(), status);
        assert!(self.status_updates.len() <= 10, "Too many messages");
    }

    pub fn clear(&mut self) {
        // Effectively iterating through all removing them.
        self.status_updates.clear();
    }

    pub fn get_all_updates(self) -> HashMap<AccountId, String> {
        self.status_updates
    }
}
```

`HashMap` 예시:

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub status_updates: UnorderedMap<AccountId, String>,
}

#[near]
impl Contract {
    #[init]
    pub fn new() -> Self {
        // Initializing `status_updates` with unique key prefix.
        Self {
            status_updates: UnorderedMap::new(b"s".to_vec()),
        }
    }

    pub fn set_status(&mut self, status: String) {
        self.status_updates.insert(&env::predecessor_account_id(), &status);
        // Note, don't need to check size, since `UnorderedMap` doesn't store all data in memory.
    }

    pub fn delete_status(&mut self) {
        self.status_updates.remove(&env::predecessor_account_id());
    }

    pub fn get_status(&self, account_id: AccountId) -> Option<String> {
        self.status_updates.get(&account_id)
    }
}
```

## 오류가 발생하기 쉬운 패턴

값은 메모리에 보관되지 않고 스토리지에서 느리게 로드되기 때문에, 컬렉션이 교체되거나 제거되면 스토리지가 지워지는지 확인하는 것이 중요합니다. 또한 컬렉션이 수정되면 대부분의 컬렉션이 일부 메타데이터를 저장하기 때문에, 컬렉션 자체가 상태에서 업데이트되는 것이 중요합니다.

일부 패턴은 자료형 수준에서 제한할 수 없는 오류가 발생하기 쉽고, 해당 패턴은 다음과 같습니다.

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
use near_sdk::store::LookupSet;

let mut m: LookupSet<u8> = LookupSet::new(b"l");
m.insert(1);
assert!(m.contains(&1));

// This would be the fix, manually flushing the intermediate changes to storage.
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
// m.flush();
std::mem::forget(m);

m = LookupSet::new(b"l");
assert!(!m.contains(&1));
```

## 영구 컬렉션 페이지 매기기

`UnorderedMap`, `UnorderedSet` 그리고 `Vector`와 같은 영구 컬렉션에는 요소를 모두 읽을 수 있는 가스의 양보다 더 많은 요소가 포함될 수 있습니다. view 호출을 통해 모두 노출하기 위해, 페이지 매김을 사용할 수 있습니다.

이 작업은 [`Skip`](https://doc.rust-lang.org/std/iter/struct.Skip.html)과 [`Take`](https://doc.rust-lang.org/std/iter/struct.Take.html)를 포함한 반복자(iterator)를 사용하여 수행할 수 있습니다. 이는 범위 내의 스토리지에서 요소만 로드합니다.

`UnorderedMap`에 대한 페이지 매김 예시:

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

## `LookupMap` vs `UnorderedMap`

### 기능

- `UnorderedMap`은 키와 값에 대한 반복을 지원하고, 페이지 매김도 지원합니다. 내부적으로는 다음과 같은 구조를 가집니다.
    - 키와 인덱스 간 매핑
    - 키 벡터
    - 값 벡터
- `LookupMap`은 키에서 값으로의 매핑만 있습니다. 키 벡터가 없으면 키를 반복할 수 없습니다.

### 성능

`UnorderedMap`은 `LookupMap`에 비해 항목에 더 많은 저장 공간이 필요합니다.

- `UnorderedMap`은 값을 가져오기 위해 `2`개의 스토리지 읽기가 필요하고, 새 항목을 삽입하기 위해서는 `3`개의 스토리지 쓰기가 필요합니다.
- `LookupMap`은 값을 가져오기 위해 하나의 스토리지 읽기만 필요하고 값을 저장하기 위해 하나의 스토리지 쓰기만 필요합니다.

### 스토리지 공간

`LookupMap`은 `UnorderedMap`에 비해 성능이 더 좋고 데이터 저장량이 적습니다.

- `UnorderedMap`은 키를 두 번(첫 번째 맵에 한 번, 키 벡터에 한 번), 값을 한 번 저장합니다. 또한 벡터와 접두사의 길이를 저장하기 위한 상수가 더 높은 값을 가집니다.
- `LookupMap`은 키와 값을 한 번만 저장합니다.

## `LazyOption`

이는 단일 값만 저장하는 영구 컬렉션 자료형입니다. 목표는 컨트랙트가 필요할 때까지 주어진 값을 역직렬화하는 것을 방지하는 것입니다. 예시로는 view 호출에서 요청될 때만 필요한 메타데이터의 큰 blob을 들 수 있습니다. 그러나 이는 대부분의 컨트랙트 작업에는 필요하지 않습니다.

이는 값을 보유할 수 있거나 보유하지 않을 수 있는 `Option`처럼 작동하며, 다른 영구 컬렉션과 마찬가지로 고유한 접두사(이 경우 키)가 필요합니다.

다른 컬렉션과 비교했을 때, `LazyOption`만이 초기화 중 값을 초기화할 수 있게끔 허용합니다.

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub metadata: LazyOption<Metadata>,
}

#[near(serializers=[borsh, json])]
pub struct Metadata {
    data: String,
    image: Base64Vec,
    blobs: Vec<String>,
}

#[near]
impl Contract {
    #[init]
    pub fn new(metadata: Metadata) -> Self {
        Self {
            metadata: LazyOption::new(b"m", Some(metadata)),
        }
    }

    pub fn get_metadata(&self) -> Metadata {
        // `.get()` reads and deserializes the value from the storage. 
        self.metadata.get().unwrap()
    }
}
```
