---
sidebar_position: 4
---

# 컨트랙트 배포

다음과 같은 몇 가지 이유로 스마트 컨트랙트가 후속 스마트 컨트랙트 코드를 배포하기를 원할 수 있습니다.

* The contract acts as a Factory, a pattern where a parent contract creates many child contracts ([Mintbase](https://www.mintbase.io/) does this to create a new NFT store for anyone who wants one; [Rainbow Bridge](https://near.org/bridge/) does this to deploy separate Fungible Token contracts for [each bridged token](https://github.com/aurora-is-near/rainbow-token-connector/blob/ce7640da144f000e0a93b6d9373bbc2514e37f3b/bridge-token-factory/src/lib.rs#L311-L341))
* 컨트랙트가 [코드를 자체적으로 업데이트합니다](../../../2.develop/upgrade.md#programmatic-update)(`deploy` 자체 호출).
* 사용자(`your-app.user1.near`, `your-app.user2.near` 등)에 대한 앱별 하위 계정(subaccount)을 생성하고, 각각에 동일한 컨트랙트를 배포하는 "사용자 한 명당 하나의 컨트랙트" 시스템을 구현할 수 있습니다. 이것은 현재 NEAR의 [스토리지 수수료](https://docs.near.org/concepts/storage/storage-staking)로 인해 엄청나게 비싸지만, 향후 최적화될 수 있습니다. 그렇다면 이러한 종류의 "샤딩된 앱 디자인"은 컨트랙트 표준 및 앱 메커니즘에 대한 보다 확장 가능하고 사용자 중심적인 접근 방식이 될 수 있습니다. 이 패러다임에 대한 초기 실험은 [Meta NEAR](https://github.com/metanear)라고 불립니다.

목표가 Mintbase 또는 Rainbow Bridge와 같은 기본 컨트랙트의 하위 계정에 배포하는 것이라면, 계정도 생성해야 합니다. 따라서 마지막 몇 페이지의 개념을 결합하면 다음이 필요합니다.

```rust
const CODE: &[u8] = include_bytes!("./path/to/compiled.wasm");

Promise::new("subaccount.example.near".parse().unwrap())
    .create_account()
    .add_full_access_key(env::signer_account_pk())
    .transfer(3_000_000_000_000_000_000_000_000) // 3e24yN, 3N
    .deploy_contract(CODE.to_vec())
```

전체 컨트랙트는 다음과 같이 `code`를 `include_bytes!`로 하드코딩하지 않고, 인자로 전달하는 단순한 방법을 보여줍니다.

```rust
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise};

const INITIAL_BALANCE: Balance = 3_000_000_000_000_000_000_000_000; // 3e24yN, 3N

#[near_bindgen]
pub struct Contract {}

#[near_bindgen]
impl Contract {
    #[private]
    pub fn create_child_contract(prefix: AccountId, code: Vec<u8>) -> Promise {
        let subaccount_id = AccountId::new_unchecked(
          format!("{}.{}", prefix, env::current_account_id())
        );
        Promise::new(subaccount_id)
            .create_account()
            .add_full_access_key(env::signer_account_pk())
            .transfer(INITIAL_BALANCE)
            .deploy_contract(code)
    }
}
```

이것이 단순한 접근 방식인 이유는 무엇일까요? 이는 4MB 트랜잭션 크기 제한으로 인해 문제가 발생할 수 있기 때문입니다. 위의 함수는 전체 컨트랙트를 역직렬화하고 힙 영역에 할당합니다. 따라서 많은 상황에서는 `include_bytes!` 접근 방식이 선호됩니다. 컴파일된 Wasm을 인자로 첨부해야 하는 경우, [Sputnik DAO v2](https://github.com/near-daos/sputnik-dao-contract/blob/a8fc9a8c1cbde37610e56e1efda8e5971e79b845/sputnikdao2/src/types.rs#L74-L142)에서 사용하는 접근 방식을 복사할 수 있습니다.
