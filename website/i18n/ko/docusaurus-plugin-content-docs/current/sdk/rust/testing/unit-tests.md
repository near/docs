---
sidebar_position: 1
---

# 단위 테스트(Unit Test)

컨트랙트 기능 테스트는 `cargo test` 프레임워크를 통해 수행할 수 있습니다. 이러한 테스트는 모의 블록체인으로 실행되며, 네트워크를 설정/배포하고 이 네트워크에서 직렬화된 트랜잭션에 서명하지 않고도 함수 호출을 직접 테스트할 수 있습니다.

기본 테스트 환경 설정과 테스트를 위한 공통 프레임워크는 다음과 같습니다.

```rust
#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::{testing_env, VMContext};

    fn get_context(is_view: bool) -> VMContext {
        VMContextBuilder::new()
            .signer_account_id("bob_near".parse().unwrap())
            .is_view(is_view)
            .build()
    }

    #[test]
    fn my_test() {
        let context = get_context(false);
        testing_env!(context);
        // ... Write test here
    }
}
```

여기서 `VMContextBuilder`는 모의 블록체인의 컨텍스트를 수정하여 트랜잭션이 실행되는 환경을 시뮬레이션할 수 있습니다. 이 컨텍스트로 수정할 수 있는 문서는 [여기](https://docs.rs/near-sdk/latest/near_sdk/struct.VMContext.html)에서 찾을 수 있습니다.

`testing_env!` 매크로는 `VMContextBuilder` 또는 수동으로 초기화되는 `VMContext`와 함께 블록체인 인터페이스를 초기화합니다.

:::info Note

이 `testing_env!`와 `VMContext`는 `wasm` 환경 외부의 테스트에만 사용됩니다. `wasm` 환경의 네트워크 내에서 구축된 컨트랙트를 실행할 때, 블록체인의 컨텍스트는 런타임의 호스트 함수를 통해 사용됩니다.

:::

읽기 전용 함수 호출을 테스트하려면, `VMContext`에서 `is_view`를 `true`로 설정하세요. 이는 상태를 읽기만 하는 함수 호출이 단위 테스트를 통해 상태를 수정하려고 시도하지 않는지 확인하는 테스트를 진행합니다. 위의 예에서는 컨텍스트를 읽기 전용으로 초기화하는 호출 `get_context`에 `true`가 전달되어야 합니다.

이 컨텍스트를 업데이트해야 할 때마다, `testing_env!`를 사용하고 싶을 것입니다. 예를 들어 위에서 언급한 것처럼 호출되거나 view 작업만 허용되는 함수를 시뮬레이션하기 위해 `predecessor_accound_id`를 시뮬레이션할 수 있습니다. 이 작업을 수행할 때마다, 새로운 모의 블록체인은 기존 상태를 유지하면서 초기화됩니다.
