---
sidebar_position: 3
---

# 프라이빗 메서드

## 콜백을 사용할 때

일반적으로 컨트랙트에 원격 교차 컨트랙트 호출(cross-contract call)에 대한 콜백이 있어야 하는 경우, 이 콜백 메서드는 컨트랙트 자체에서만 호출되어야 합니다. 이는 다른 사람이 이를 호출하고 상태를 엉망으로 만드는 것을 피하기 위한 것입니다. 매우 일반적인 패턴은 직접 호출자(predecessor 계정 ID)가 컨트랙트의 계정(현재 계정 ID)과 일치하는지 확인하는 assertion을 갖는 것입니다. `#[private]` 매크로는 이를 한 줄의 매크로로 만들어 단순화하고 가독성을 향상시킵니다.

Use this annotation within the [`near` macro](../contract-structure/near-bindgen.md) as follows:

```rust
#[private]
pub fn my_method(&mut self) {
    …
}
```

이는 다음과 같습니다.

```rust
pub fn my_method(&mut self ) {
    if near_sdk::env::current_account_id() != near_sdk::env::predecessor_account_id() {
        near_sdk::env::panic_str("Method method is private");
    }
...
}
```

이제 이 주석을 사용하면 컨트랙트 자체의 계정만 직접 또는 Promise를 통해 이 메서드를 호출할 수 있습니다.

## 내부 메서드 작성

모든 함수를 공개적으로 노출할 필요는 없습니다. 예를 들어 헬퍼 또는 유틸리티 함수에 대한 전용 메서드를 작성하는 것이 도움이 될 수 있습니다. 내부 메서드를 작성하는 방법에는 세 가지가 있습니다.

1. `pub fn` 대신 `fn` 사용합니다.

  ```rust
  fn helper_method(a: u8, b: u8) {
    …
  }
  ```

2. `pub(crate) fn`를 사용합니다. 이는 내부 메서드가 다른 모듈에 있을 때 유용할 수 있습니다.

  ```rust
  // Function that can be called in another Rust file
  pub(crate) fn get_first_name(account: Account) {
    …
  }
  ```

  퍼블릭/프라이빗 메서드에 관한 [공식 Rust 문서](https://doc.rust-lang.org/reference/visibility-and-privacy.html)에서 더 많은 정보를 얻을 수 있습니다.

3. 별도의 `impl` 블록

  Another way of not exporting methods is by having a separate `impl Contract` section, that is not marked with `#[near]`.

  ```rust
  #[near]
  impl Contract {
      pub fn increment(&mut self) {
          self.internal_increment();
      }
  }
  impl Contract {
      /// This methods is still not exported.
      pub fn internal_increment(&mut self) {
          self.counter += 1;
      }
  }
  ```
