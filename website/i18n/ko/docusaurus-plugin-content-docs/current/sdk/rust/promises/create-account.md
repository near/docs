---
sidebar_position: 3
---

# 계정 생성

여러 가지 이유로 컨트랙트에서 계정을 생성할 수 있습니다. 한 가지 예시로, 사용자를 [점진적으로 온보딩](https://www.youtube.com/watch?v=7mO4yN1zjbs&t=2s)하기 위해, 처음에는 NEAR의 전체 개념을 숨기고 자동으로 계정을 생성하려고 합니다(예: `user123.some-cool-game.near`와 같은 메인 컨트랙트의 하위 계정일 수 있음).

잔액이 없는 계정은 거의 사용할 수 없기 때문에, 이를 [이전 페이지](./token-tx.md)의 토큰 전송과 결합하고 싶을 것입니다. 또한 계정에 액세스 키를 제공해야 합니다. 그렇게 할 수 있는 방법은 다음과 같습니다.

```rust
Promise::new("subaccount.example.near".parse().unwrap())
    .create_account()
    .add_full_access_key(env::signer_account_pk())
    .transfer(250_000_000_000_000_000_000_000); // 2.5e23yN, 0.25N
```

전체 컨트랙트의 맥락에서

```rust
use near_sdk::{env, near, AccountId, Balance, Promise};

const INITIAL_BALANCE: Balance = 250_000_000_000_000_000_000_000; // 2.5e23yN, 0.25N

#[near(contract_state)]
pub struct Contract {}

#[near]
impl Contract {
    #[private]
    pub fn create_subaccount(prefix: AccountId) -> Promise {
        let subaccount_id = AccountId::new_unchecked(
          format!("{}.{}", prefix, env::current_account_id())
        );
        Promise::new(subaccount_id)
            .create_account()
            .add_full_access_key(env::signer_account_pk())
            .transfer(INITIAL_BALANCE)
    }
}
```

참고 사항:

* `add_full_access_key` – 이 예제는 이 함수 호출([`signer_account_pk`](https://docs.rs/near-sdk/3.1.0/near_sdk/env/fn.signer_account_id.html))을 요청한 원래 트랜잭션에 서명한 사람 또는 앱의 공개 키를 전달합니다. 계정이 사전 정의된 컨트랙트 함수 집합만을 호출할 수 있도록 허용하는 함수 호출 액세스 키를 추가하는 데에, [`add_access_key`](https://docs.rs/near-sdk/latest/near_sdk/struct.Promise.html#method.add_access_key)를 사용할 수도 있습니다.
* `#[private]` – 컨트랙트 자금을 사용하는 함수가 있는 경우, 어떤 방식으로든 이를 보호하고 싶을 것입니다. 이 예제에서는 간단한 [`#[private]`](../contract-interface/private-methods.md) 매크로를 사용하여 자금을 보호할 수 있습니다.
* `INITIAL_BALANCE` near-sdk-rs의 [`Balance`](https://docs.rs/near-sdk/3.1.0/near_sdk/type.Balance.html) 자료형을 사용합니다. 현재 이는 `u128`에 대한 단순한 별칭일 뿐이지만, 향후에는 [`Gas` 자료형에 대한 최근 변경 사항](https://github.com/near/near-sdk-rs/pull/471)과 유사한 추가 기능을 포함하도록 확장될 수 있습니다.
