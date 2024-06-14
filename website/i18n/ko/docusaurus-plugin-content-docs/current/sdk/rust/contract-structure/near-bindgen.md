---
sidebar_position: 1
---

# near

The `#[near]` macro is used on a `struct` and the function implementations to generate the necessary code to be a valid NEAR contract and expose the intended functions to be able to be called externally.

예를 들어 간단한 counter 컨트랙트에서 매크로는 다음과 같이 적용됩니다.

```rust
use near_sdk::near;

#[near(contract_state)]
#[derive(Default)]
pub struct Counter {
    value: u64,
}

#[near]
impl Counter {
    pub fn increment(&mut self) {
        self.value += 1;
    }

    pub fn get_count(&self) -> u64 {
        self.value
    }
}
```

이 예에서 `Counter` 구조체는 스마트 컨트랙트 상태와 `BorshSerialize`와 `BorshDeserialize`를 구현하는 모든 것을 나타냅니다(심지어 `collections`도 포함). 함수가 호출될 때마다, 상태가 로드되고 역직렬화되므로, 로드되는 데이터 양을 가능한 한 최소화하는 것이 중요합니다.

`#[near]` also annotates the `impl` for `Counter` and this will generate any necessary boilerplate to expose the functions. 명심해야 할 중요한 핵심 상호 작용은 다음과 같습니다.
- 모든 `pub` 함수는 모든 계정/컨트랙트에서 외부적으로 호출할 수 있습니다.
  - 자세한 내용은 [공용 메서드](../contract-interface/public-methods.md)를 참조하세요.
- `self`는 [컨트랙트의 가변성(mutability)](../contract-interface/contract-mutability.md)을 제어하기 위해 여러 가지 방법으로 사용될 수 있습니다:
  - `&self` 또는 `self`를 취하는 함수는 읽기 전용이고, 업데이트된 상태를 스토리지에 쓰지 않습니다.
  - `&mut self`를 취하는 함수는 상태 변경을 허용하고, 함수 호출이 끝날 때 항상 상태를 다시 기록합니다.
- 공개된 함수는 `self`가 함수 매개변수에 포함되지 않은 경우 상태에 대한 읽기 및 쓰기를 생략할 수 있습니다.
  - 이는 일부 정적 기능 또는 컨트랙트 코드에 포함된 데이터 반환에 유용할 수 있습니다.
- 함수에 반환 값이 있으면, 이는 `env::value_return`를 통해 결과적으로 직렬화되고 연결됩니다.


## 초기화 메서드

기본적으로 컨트랙트의 `Default::default()` 구현은 컨트랙트를 초기화하는 데 사용됩니다. 다음 `#[init]` 주석과 함께 매개변수를 사용하거나 사용자 정의 논리를 수행하는 사용자 정의 초기화 함수가 있을 수 있습니다.

```rust
#[near]
impl Counter {
    #[init]
    pub fn new(value: u64) -> Self {
        log!("Custom counter initialization!");
        Self { value }
    }
}
```

모든 컨트랙트는 `Default`를 구현하게 되어 있습니다. 기본 구현이 사용되는 것을 금지하려면 `PanicOnDefault` 파생 매크로를 사용할 수 있습니다.

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Counter {
    // ...
}
```

## 지불 메서드

메서드 호출을 통해 토큰을 전송할 수 있도록 메서드에 `#[payable]` 주석을 달 수 있습니다. 자세한 내용은 [지불 메서드](../contract-interface/payable-methods.md)를 참조하세요.

함수를 지불 가능한 것으로 선언하려면, 다음과 같이 `#[payable]` 주석을 사용하세요.

```rust
#[payable]
pub fn my_method(&mut self) {
...
}
```

## 프라이빗 메서드

컨트랙트가 약속을 통해 자체적으로 메서드를 호출할 수 있도록 일부 메서드를 노출해야 하지만, 다른 컨트랙트에서 호출하는 것은 허용하지 않으려고 합니다. 이를 위해 `#[private]` 주석을 사용하여, 이 메서드가 외부에서 호출될 때 패닉하도록 합니다. 자세한 내용은 [프라이빗 메서드](../contract-interface/private-methods.md)를 참조하세요.

이 주석은 다음을 통해 모든 메서드에 적용할 수 있습니다.

```rust
#[private]
pub fn my_method(&mut self) {
...
}
```

:::info Interaction with other macros

When `near` is built for the wasm32 target, it generates the external NEAR contract bindings.  To achieve this it is actually generating another function with the signature `pub extern "C" fn function_name()` that first deserializes the contract struct from NEAR storage and then calls the `contract.function_name(parameter1, parameter2, ...)`.  If you have annotated your function with any attribute-like macros, these are then executed _twice_.  Specifically if the attribute like macro makes any modification to the function signature, or inserts any code that depends on the contract struct (in the form of `&self`, `&mut self`, or `self`) this will fail in the second invocation, because the externally exposed function does not have any concept of this struct.  It is possible to detect this by checking which build target you are building for and limit the execution of the macro to operate only on the first pass.

:::
