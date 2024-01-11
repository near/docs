---
sidebar_position: 4
---

# 지불 메서드

메서드가 함수 호출과 함께 토큰 전송을 수락하도록 허용할 수 있습니다. 이것은 컨트랙트가 사용될 때 지불해야 하는 토큰의 수수료를 정의할 수 있도록 수행됩니다. 기본적으로 메서드는 지불할 수 없으며, 호출 중에 누군가가 토큰을 전송하려고 시도하면 패닉 상태가 됩니다. 이는 누군가가 함수 호출 중에 실수로 토큰을 전송하는 경우를 대비하여 안전상의 이유로 수행됩니다.

메소드를 지불 가능으로 선언하려면, 다음과 같이 [`near_bindgen` 매크로](../contract-structure/near-bindgen.md) 내에서 `#[payable]` 주석을 사용하세요.

```rust
#[payable]
pub fn my_method(&mut self) {
...
}
```

이렇게 하면 `my_method` 함수를 호출하고, 잔액을 컨트랙트로 이전할 수 있습니다.

예시:

```rust
#[near_bindgen]
impl Contract {
    #[payable]
    pub fn take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
    pub fn do_not_take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
}
```

이는 다음과 동일합니다.

```rust
#[near_bindgen]
impl Contract {
    pub fn take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
    pub fn do_not_take_my_money(&mut self) {
        if near_sdk::env::attached_deposit() != 0 {
            near_sdk::env::panic_str("Method do_not_take_my_money doesn't accept deposit");
        }
        near_sdk::env::log_str("Thanks!");
    }
}
```
