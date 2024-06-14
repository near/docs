---
sidebar_position: 2
---

# 컨트랙트 가변성

컨트랙트 상태 가변성은 함수 매개변수에서 [`self`](https://doc.rust-lang.org/std/keyword.self.html) 사용되는 방식에 따라 자동으로 처리됩니다. Depending on which is used, the [`#[near]`](../contract-structure/near-bindgen.md) macro will generate the respective code to load/deserialize state for any function which uses `self` and serialize/store state only for when `&mut self` is used.

다음 시멘틱은 모든 [퍼블릭 메서드](public-methods.md)에 대해 일관적으로 적용됩니다.

## 읽기 전용 함수

트랜잭션이 끝날 때 기존 상태를 덮어쓰지 않는 불변 상태에 액세스하려면, `&self` 또는 `self`를 매개변수로 사용할 수 있습니다. 둘 다 동일한 코드를 생성하여 상태를 구조로 로드 및 역직렬화하고 함수를 호출하지만, 차이점은 `&self`거 변수에 대한 참조를 함수로 전달한다면, `self`는 변수 자체를 함수로 전달한다는 것입니다.

`&self` 대 `self`에 대한 자세한 내용은 [Rust 책의 이 섹션](https://doc.rust-lang.org/stable/book/ch05-03-method-syntax.html?highlight=capture%20self#defining-methods)을 참조하세요.

다음은 각각을 사용하는 몇 가지 예시입니다.

```rust
#[near(contract_state)]
#[derive(Default)]
pub struct MyContractStructure {
    integer: u64,
    message: String,
}

#[near]
impl MyContractStructure {
    pub fn get_values(self) -> (u64, String) {
        (self.integer, self.message)
    }
    pub fn log_state_string(&self) {
        near_sdk::env::log(self.message.as_bytes());
    }
}
```

모든 경우에 적용되는 간단한 지침은 없지만, 각 경우를 사용해야 하는 몇 가지 핵심 이유는 다음과 같습니다.

### self (소유한 값)

소유한 값을 함수로 이동하는 것은 유용할 수 있습니다. `self` 자체 또는 `self`의 필드가 함수 내에서 전달되는 경우, 데이터 `Clone`/`Copy`에 대한 필요성을 제거하기 때문입니다.

예시:

```rust
/// View method. More efficient, but can't be reused internally, because it consumes self.
pub fn get_owner_id(self) -> AccountId {
    self.owner_id
}
```

### &self (불변 참조)

이는 컨트랙트 상태를 읽기만 하거나, 변수의 [소유권](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)이 없는 다른 메서드에서 함수를 재사용하는 경우에 사용해야 합니다. 이는 구조체가 많은 양의 데이터를 단순히 참조하는 대신, 함수 범위로 이동하는 것을 방지하기 위해 많은 메모리를 사용하는 경우에도 유용할 수 있습니다.

예시:

```rust
/// View method. Requires cloning the account id. pub fn get_owner_id(&self) -> AccountId {
    self.owner_id.clone()
}
```

### 파생 데이터 반환

덜 일반적인 경우에는, 상태에 저장된 수정된 객체에서 파생된 객체를 반환하기 위해 읽기 전용 메서드를 사용하려고 할 수 있습니다. 아래는 이 개념의 데모입니다.

```rust
/// View method that "modifies" state, for code structure or computational
/// efficiency reasons. Changes state in-memory, but does NOT save the new
/// state. If called internally by a change method, WILL result in updated
/// contract state.
pub fn update_stats(&self, account_id: AccountId, score: U64) -> Account {
    let account = self.accounts.get(&account_id).unwrap_or_else(|| env::panic_str("ERR_ACCT_NOT_FOUND"));
    account.total += score;
    account
}
```

## 변경 가능한 함수(Mutable Function)

변경 가능한 함수를 사용하면 기존 상태를 로드하고 수정한 다음 함수 호출이 끝날 때 수정된 상태를 다시 작성할 수 있습니다. 이는 컨트랙트 상태를 수정하는 모든 트랜잭션에 사용해야 합니다. 직렬화된 컨트랙트 데이터는 `STATE` 키 아래의 영구 스토리지에 저장됩니다.

변경 가능한 함수의 예는 다음과 같습니다.

```rust
#[near(contract_state)]
#[derive(Default)]
pub struct MyContractStructure {
    integer: u64,
}
#[near]
impl MyContractStructure {
    pub fn modify_value(&mut self, new_value: u64) {
        self.integer = new_value;
    }
    pub fn increment_value(&mut self) {
        self.integer += 1;
    }
}
```

## 순수 함수

이러한 함수는 `self`를 전혀 사용하지 않으며, 스토리지에서 컨트랙트 상태를 읽거나 쓰지 않습니다. 퍼블릭 순수 함수를 사용하는 것은 매우 드물지만, 컨트랙트 코드에 포함된 데이터를 반환하거나 상태에 의존하지 않는 일부 정적인 공유 로직을 실행하는 경우 유용할 수 있습니다.

순수 함수의 몇 가지 예시는 다음과 같습니다.

```rust
const SOME_VALUE: u64 = 8;

#[near]
impl MyContractStructure {
    pub fn log_message(/* Parameters here */) {
        near_sdk::log!("inside log message");
    }
    pub fn log_u64(value: u64) {
        near_sdk::log!("{}", value);
    }
    pub fn return_static_u64() -> u64 {
        SOME_VALUE
    }
}
```
