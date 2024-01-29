---
sidebar_position: 2
---

# 콜백

NEAR 프로토콜은 작업 증명(Proof-of-Work) 블록체인과 다르게 작동하는 샤딩된 지분 증명(Proof-of-Stake) 블록체인입니다. 기본 Rust(Wasm으로 컴파일됨) 스마트 컨트랙트 상호 작용할 때, 교차 컨트랙트 호출(cross-contract call)은 비동기식입니다. 콜백은 교차 컨트랙트 호출의 결과를 가져오거나, 교차 컨트랙트 호출이 성공했는지 실패했는지 알려주는 데 사용됩니다.

교차 컨트랙트 호출을 작성하는 기술에는 [높은 수준](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/high-level/src/lib.rs) 및 [낮은 수준](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/low-level/src/lib.rs)의 두 가지 기술이 있습니다. 이 문서는 주로 높은 수준의 접근 방식에 중점을 둘 것입니다. 위에 링크된 것처럼, Rust SDK 레퍼지토리에는 이를 보여주는 두 가지 예시가 있습니다. 이러한 예는 "자체"로의 교차 컨트랙트 호출을 사용합니다. 높은 수준의 접근 방식을 보여주는 두 가지 예를 보여 드리겠습니다.

## 계산기 예시

`#[ext_contract(...)]` 구문을 사용하여 교차 컨트랙트 호출을 수행할 수 있는 헬퍼 매크로가 있습니다. 이는 Rust 특성을 가져와 정적 메서드가 있는 모듈로 변환합니다. 이러한 각각의 정적 메서드는 Trait에 의해 정의된 위치 인자와, `receiver_id`, 첨부된 보증금 및 가스의 양을 사용하여 새 `Promise`를 반환합니다.


:::info

If the function returns the promise, then it will delegate the return value and status of transaction execution, but if you return a unit type (`()`, `void`, `nothing`), then the `Promise` result will not influence the transaction status.

:::

예를 들어 계산기 컨트랙트의 Trait을 정의해 보겠습니다.

```rust
#[ext_contract(ext_calculator)]
trait Calculator {
    fn mult(&self, a: U64, b: U64) -> U128;

    fn sum(&self, a: U128, b: U128) -> U128;
}
```

이는 다음 코드와 동일합니다.

```rust
mod ext_calculator {
    pub fn mult(a: U64, b: U64, receiver_id: &AccountId, deposit: Balance, gas: Gas) -> Promise {
        Promise::new(receiver_id.clone())
            .function_call(
                b"mult",
                json!({ "a": a, "b": b }).to_string().as_bytes(),
                deposit,
                gas,
            )
    }

    pub fn sum(a: U128, b: U128, receiver_id: &AccountId, deposit: Balance, gas: Gas) -> Promise {
        // ...
    }
}
```

계산기가 `calc.near`에 배포되었다고 가정하고, 다음을 사용할 수 있습니다.

```rust
#[near_bindgen]
impl Contract {
    pub fn sum_a_b(&mut self, a: U128, b: U128) -> Promise {
        let calculator_account_id: AccountId = "calc.near".parse().unwrap();
        // Call the method `sum` on the calculator contract.
        // Any unused GAS will be attached since the default GAS weight is 1.
        // Attached deposit is defaulted to 0.
        ext_calculator::ext(calculator_account_id)
            .sum(a, b)
    }
}
```

## 허용 목록 예시

다음으로 계정이 목록에 있는지 여부를 반환하는 허용 목록 스마트 컨트랙트에 대해, 교차 컨트랙트 호출을 하는 간단한 예시를 살펴보겠습니다.

교차 컨트랙트 호출의 일반적인 패턴은, 외부 스마트 컨트랙트에서 메서드를 호출하고, `.then` 구문을 사용하여 콜백을 지정한 다음 Promise의 결과 또는 상태를 검색하는 것입니다. 콜백은 일반적으로 호출하는 스마트 컨트랙트 내부에 있습니다. 콜백 함수에 사용되는 특수 매크로는 [#[private]](https://docs.rs/near-sdk-core/latest/near_sdk_core/struct.AttrSigInfo.html#structfield.is_private)입니다. 아래 예에서 이 패턴을 볼 수 있습니다.

다음 예제에서는 높은 수준의 교차 컨트랙트 접근 방식을 사용하여, 콜백에 대한 두 가지 일반적인 접근 방식을 보여줍니다. 높은 수준의 교차 컨트랙트 호출을 작성할 때 호출되는 스마트 컨트랙트에 대한 인터페이스로 특수한 [특성](https://doc.rust-lang.org/rust-by-example/trait.html)이 설정됩니다.

```rust
#[ext_contract(ext_allowlist)]
pub trait ExtAllowlist {
    fn is_allowlisted(staking_pool_account_id: AccountId) -> bool;
}
```

특성을 생성한 후, 계정 `mike.testnet`이 허용 목록에 있는지 묻는 허용 목록 스마트 컨트랙트에 대해 교차 컨트랙트 호출을 하는 두 가지 간단한 함수를 보여줍니다. 이러한 메서드는 서로 다른 접근 방식을 사용하여 `true`를 반환할 것입니다. 먼저 메서드를 살펴본 다음, 콜백 내 차이점을 살펴보겠습니다. 이 예에서는 단순화를 위해 값이 하드코딩되어 있습니다.

```rust
pub const XCC_GAS: Gas = Gas(20000000000000);
fn get_allowlist_contract() -> AccountId {
    "allowlist.demo.testnet".parse().unwrap()
}
fn get_account_to_check() -> AccountId {
    "mike.testnet".parse().unwrap()
}
```

```rust
#[near_bindgen]
impl Contract {
    pub fn xcc_use_promise_result() -> Promise {
        // Call the method `is_allowlisted` on the allowlisted contract. Static GAS is only attached to the callback.
        // Any unused GAS will be split between the function call and the callback since both have a default unused GAS weight of 1
        // Attached deposit is defaulted to 0 for both the function call and the callback.
        ext_allowlist::ext(get_allowlist_contract())
            .is_allowlisted(get_account_to_check())
            .then(
                Self::ext(env::current_account_id())
                .with_static_gas(XCC_GAS)
                .callback_promise_result()
            )
    }

    pub fn xcc_use_arg_macro(&mut self) -> Promise {
        // Call the method `is_allowlisted` on the allowlisted contract. Attach static GAS equal to XCC_GAS only for the callback.
        // Any unused GAS will be split between the function call and the callback since both have a default unused GAS weight of 1
        // Attached deposit is defaulted to 0 for both the function call and the callback.
        ext_allowlist::ext(get_allowlist_contract())
            .is_allowlisted(get_account_to_check())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(XCC_GAS)
                    .callback_arg_macro()
            )
    }
```

`ext_allowlist::ext()`로 시작하여, `ext()`에 전달된 계정에서 메서드를 호출하기 위해 특성을 사용하고 있음을 보여줍니다. 그런 다음 호출에 첨부할 가스의 기본 양을 지정하는 데에 `with_static_gas()`를 사용합니다. 그런 다음 `is_allow_listed()` 메서드를 호출하고, 연결하려는 매개변수를 전달합니다.

이러한 함수 호출을 수행할 때 주의해야 할 몇 가지 사항이 있습니다.
1. `.with_attached_deposit()` 메서드를 지정하여 yoctoⓃ 단위로 Ⓝ 보증금을 호출에 첨부할 수 있지만, 기본값은 0입니다(1 Ⓝ = 1000000000000000000000000 yoctoⓃ 또는 1^24 yoctoⓃ).
2. `.with_static_gas()` 메서드를 지정하여 고정된 양의 가스를 첨부할 수 있지만, 기본값은 0입니다.
3. `.with_unused_gas_weight()` 메서드를 지정하여 미사용 가스 가중치를 첨부할 수 있지만, 기본값은 1입니다. 미사용 가스는 해당 가중치에 따라 현재 실행 중인 모든 함수 간에 분배됩니다. 함수가 1개만 있는 경우, 가중치가 1보다 크면 사용하지 않은 모든 가스가 해당 함수로 전달됩니다. 그러나 가중치를 0으로 지정하면, 사용하지 않는 가스는 해당 함수에 전달되지 않습니다. 가중치가 3인 함수와 가중치가 1인 함수가 두 개 있는 경우, 첫 번째 함수는 사용하지 않은 가스의 `3/4`을 가져오고, 다른 함수는 사용하지 않은 가스의 `1/4`를 가져옵니다.

위 스니펫의 두 메서드는 매우 유사하지만, 스마트 컨트랙트에서 각각 `callback_promise_result`와 `callback_arg_macro`라는 콜백을 호출한다는 점은 다릅니다. 이 두 콜백은 값을 얻는 방법에 대해 보여줍니다.

```rust
#[private]
pub fn callback_arg_macro(#[callback_unwrap] val: bool) -> bool {
    val
}

#[private]
pub fn callback_promise_result() -> bool {
    assert_eq!(env::promise_results_count(), 1, "ERR_TOO_MANY_RESULTS");
    match env::promise_result(0) {
        PromiseResult::NotReady => unreachable!(),
        PromiseResult::Successful(val) => {
            if let Ok(is_allowlisted) = near_sdk::serde_json::from_slice::<bool>(&val) {
                is_allowlisted
            } else {
                env::panic_str("ERR_WRONG_VAL_RECEIVED")
            }
        },
        PromiseResult::Failed => env::panic_str("ERR_CALL_FAILED"),
    }
}
```

첫 번째 메서드는 인자에 매크로를 사용하여 값을 원하는 값으로 변환합니다. 이 접근 방식에서 값을 캐스팅할 수 없으면 패닉이 발생합니다. 오류를 정상적으로 처리하려면 첫 번째 방법을 사용하거나, 대신 `#[callback_result]` 매크로를 사용할 수 있습니다. 이에 대한 예는 아래에서 볼 수 있습니다.

```rust
#[private]
pub fn handle_callbacks(
    // New pattern, will gracefully handle failed callback results
    #[callback_result] b: Result<u8, near_sdk::PromiseError>,
) {
    if b.is_err() {
        // ...
    }
}
```

두 번째 메서드는 Promise 결과에서 값을 가져오고, 기본적으로 `#[callback_result]` 매크로의 확장된 버전입니다.

이게 끝입니다! 교차 컨트랙트 호출을 수행하고 결과를 수신하는 방법을 이해하는 것은 NEAR에서 스마트 컨트랙트를 개발하는 데 중요한 부분입니다. 교차 컨트랙트 호출 사용에 대한 두 가지 흥미로운 예시는 [대체 가능한 토큰(FT)](https://github.com/near-examples/FT) 및 [대체 불가능 토큰(NFT)](https://github.com/near-examples/NFT) 예제에서 찾을 수 있습니다.
