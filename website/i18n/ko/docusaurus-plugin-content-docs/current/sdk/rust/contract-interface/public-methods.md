---
sidebar_position: 1
---

# 퍼블릭 메서드 자료형

메서드는 컴파일된 WASM 바이트코드에서 메서드를 공개하는 [`#[near_bindgen]` 매크로](../contract-structure/near-bindgen.md) 내의 `pub` 식별자를 사용하여 외부에서 호출할 수 있습니다.

외부에서 호출해야 하는 메서드만 public으로 표시하는 것이 중요합니다. 자신을 호출하는 컨트랙트가 필요한 경우, 함수를 공개로 표시하고 [`#[private]` 주석](private-methods.md)을 추가하여 컨트랙트 자체가 아닌 다른 곳에서 호출하면 패닉이 발생하도록 할 수 있습니다.

기본 사용법은 다음과 같습니다.

```rust
#[near_bindgen]
impl MyContractStructure {
    pub fn some_method(&mut self) {
        // .. method logic here
    }
}
```

이는 WASM 바이너리에서 `some_method`를 공개하고 외부에서 호출될 수 있도록 허용합니다.

<details>
  <summary>펼쳐서 생성된 코드 보기</summary>

```rust
#[cfg(target_arch = "wasm32")]
#[no_mangle]
pub extern "C" fn some_method() {
    near_sdk::env::setup_panic_hook();
    if near_sdk::env::attached_deposit() != 0 {
        near_sdk::env::panic("Method some_method doesn\'t accept deposit".as_bytes());
    }
    let mut contract: MyContractStructure = near_sdk::env::state_read().unwrap_or_default();
    contract.some_method();
    near_sdk::env::state_write(&contract);
}
```
</details>

## 특성 구현 공개

함수는 특성 구현을 통해 공개될 수도 있습니다. 이는 컨트랙트에 대한 공유 인터페이스 또는 표준을 구현하는 경우 유용할 수 있습니다. 이 코드 생성은 기본 `pub` 함수와 매우 유사하게 처리되지만, 여기서 `#[near_bindgen]` 매크로는 특성 자체가 아니라 특성 구현에만 연결되면 됩니다.

```rust
pub trait MyTrait {
    fn trait_method(&mut self);
}

#[near_bindgen]
impl MyTrait for MyContractStructure {
    fn trait_method(&mut self) {
        // .. method logic here
    }
}
```

이 예제에서 생성된 코드는 메서드 이름이 다른 것을 제외하고 이전 예제와 동일합니다.

<details>
  <summary>펼쳐서 생성된 코드 보기</summary>

```rust
#[cfg(target_arch = "wasm32")]
#[no_mangle]
pub extern "C" fn trait_method() {
    near_sdk::env::setup_panic_hook();
    if near_sdk::env::attached_deposit() != 0 {
        near_sdk::env::panic("Method trait_method doesn\'t accept deposit".as_bytes());
    }
    let mut contract: MyContractStructure = near_sdk::env::state_read().unwrap_or_default();
    contract.trait_method();
    near_sdk::env::state_write(&contract);
}
```
</details>
