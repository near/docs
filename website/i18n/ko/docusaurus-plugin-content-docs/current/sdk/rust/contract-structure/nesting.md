---
sidebar_position: 3
---

# 컬렉션 중첩(Nesting)

## 고유 접두사에 대한 기존 접근법

원래는 바이트 벡터로 변환된 짧은 한 글자 접두사를 사용하여, 생성자(constructor)에서 접두사를 하드코딩하였습니다. 중첩 컬렉션을 사용하는 경우 접두사를 수동으로 구성해야 합니다.

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet};
use near_sdk::{near_bindgen, AccountId};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub accounts: UnorderedMap<AccountId, UnorderedSet<String>>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            accounts: UnorderedMap::new(b"t"),
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_tokens(&self, account_id: &AccountId) -> Vec<String> {
        let tokens = self.accounts.get(account_id).unwrap_or_else(|| {
            // Constructing a unique prefix for a nested UnorderedSet from a concatenation
            // of a prefix and a hash of the account id.
            let prefix: Vec<u8> = [
                b"s".as_slice(),
                &near_sdk::env::sha256_array(account_id.as_bytes()),
            ]
            .concat();
            UnorderedSet::new(prefix)
        });
        tokens.to_vec()
    }
}
```

## 영구 컬렉션에 대한 고유 접두사 생성

[이 문서](../contract-structure/collections.md) 또는 [Rust 문서](https://docs.rs/near-sdk/latest/near_sdk/collections)에서 영구 컬렉션에 대해 자세히 읽어보세요.

영구 컬렉션의 모든 인스턴스에는 고유한 스토리지 접두사가 필요합니다. 접두사는 영구 스토리지에 데이터를 저장하기 위한 내부 키를 생성하는 데 사용됩니다. 이러한 내부 키는 충돌(`STATE` key와의 충돌 포함)을 방지하기 위해, 고유해야 합니다.

컨트랙트가 복잡해지면, 모두 기본 구조의 일부가 아니라 하위 구조 또는 중첩된 컬렉션의 일부로 여러 다른 컬렉션이 존재할 수 있습니다. 모두 고유한 접두사가 있어야 합니다.

스토리지 접두사 및 키를 추적하기 위해 `enum`을 도입할 수 있습니다. 그런 다음 borsh 직렬화를 사용하여 모든 컬렉션에 대해 고유한 접두사를 생성합니다. Borsh 직렬화를 사용하면 열거형(enum)이 1바이트만 사용하기 때문에, 수동으로 접두사를 구성하는 것만큼 효율적입니다.

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet};
use near_sdk::{env, near_bindgen, AccountId, BorshStorageKey, CryptoHash};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
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

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Accounts,
    SubAccount { account_hash: CryptoHash },
}

#[near_bindgen]
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

## 오류가 발생하기 쉬운 패턴

[컬렉션 섹션](./collections.md#error-prone-patterns)에서 언급한 오류가 발생하기 쉬운 패턴을 확장하여, 중첩 컬렉션을 사용할 때 이러한 버그가 컨트랙트에 어떻게 쉽게 도입될 수 있는지 염두에 두는 것이 중요합니다.

더 넓은 맥락에서 발생할 수 있는 몇 가지 문제는 다음과 같습니다.
- https://github.com/near/near-sdk-rs/issues/560
- https://github.com/near/near-sdk-rs/issues/703

다음 사례는 자료형 수준에서 제한할 수 없는, 가장 일반적으로 발생하는 버그입니다.

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
