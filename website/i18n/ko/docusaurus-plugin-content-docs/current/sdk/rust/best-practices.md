---
id: best-practices
title: "모범 사례"
---

# 모범 사례

## 오버플로우 검사 사용

일반적으로 정수 오버플로우에 대해서는 패닉하는 것이 도움이 됩니다. 이를 활성화하려면 `Cargo.toml` 파일에 다음을 추가하세요.

```toml
[profile.release]
overflow-checks = true
```

## 초기에 `require!` 사용

조치를 취하기 전에, `require!`를 사용하여 입력, 컨텍스트, 상태 및 액세스를 검증하세요. The earlier you panic, the more [gas](https://docs.near.org/concepts/protocol/gas) you will save for the caller.

```rust
#[nearn]
impl Contract {
    pub fn set_fee(&mut self, new_fee: Fee) {
        require!(env::predecessor_account_id() == self.owner_id, "Owner's method");
        new_fee.assert_valid();
        self.internal_set_fee(new_fee);
    }
}
```

**참고**: 패닉 메시지에서 디버그 정보를 원하거나 `4.0.0-pre.2` 전 SDK 버전을 사용 중인 경우, Rust의 `assert!` 매크로를 `require!` 대신 사용할 수 있습니다.

```rust
#[near]
impl Contract {
    pub fn set_fee(&mut self, new_fee: Fee) {
        assert_eq!(env::predecessor_account_id(), self.owner_id, "Owner's method");
        new_fee.assert_valid();
        self.internal_set_fee(new_fee);
    }
}
```

## `log!` 사용

디버깅 및 사용자 알림을 위해 로깅을 사용합니다.

형식화된 메시지가 필요한 경우, 다음 매크로를 사용할 수 있습니다.

```rust
log!("Transferred {} tokens from {} to {}", amount, sender_id, receiver_id);
```

이는 다음 메시지와 동일합니다.

```rust
env::log_str(format!("Transferred {} tokens from {} to {}", amount, sender_id, receiver_id).as_ref());
```

## `Promise` 반환

교차 컨트랙트 호출(Cross-Contract Call)을 수행하는 경우, 메서드가 새로 생성된 `Promise`를 반환하도록 하고 싶을 것입니다. 이를 통해 호출자(예: near-cli 또는 near-api-js 호출)는 Promise의 결과를 즉시 반환하는 대신 기다릴 수 있습니다. 또한 어떤 이유로 Promise가 실패하는 경우, Promise를 반환하면 호출자에게 실패에 대해 알리고, NEAR 익스플로러 및 기타 도구를 사용하여 전체 트랜잭션 체인을 실패로 표시할 수 있습니다. 이렇게 하면 체인의 첫 번째 또는 처음 몇 개의 트랜잭션이 성공하지만, 후속 트랜잭션이 실패할 때 긍정 오류(false-positives)를 방지할 수 있습니다.

예를 들어

```rust
#[near]
impl Contract {
    pub fn withdraw_100(&mut self, receiver_id: AccountId) -> Promise {
        Promise::new(receiver_id).transfer(100)
    }
}
```

## `near-sdk`로부터의 크레이트 재사용

`near-sdk`는 다음 크레이트를 다시 내보냅니다.

- `borsh`
- `base64`
- `bs58`
- `serde`
- `serde_json`

가장 일반적인 크레이트에는 내부 상태 직렬화 및 외부 JSON 직렬화를 위한 `serde`에 필요한 `borsh`가 포함됩니다.

`serde::Serialize` 구조체를 표시할 때, serde가 올바른 기본 크레이트를 가리키도록 `#[serde(crate = "near_sdk::serde")]`를 사용해야 합니다.

```rust
/// Main contract structure serialized with Borsh
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub pair: Pair,
}

/// Implements both `serde` and `borsh` serialization.
/// `serde` is typically useful when returning a struct in JSON format for a frontend.
#[near(serializers = [json, borsh])]
pub struct Pair {
    pub a: u32,
    pub b: u32,
}

#[near]
impl Contract {
    #[init]
    pub fn new(pair: Pair) -> Self {
        Self {
            pair,
        }
    }

    pub fn get_pair(self) -> Pair {
        self.pair
    }
}
```

## `std::panic!` vs `env::panic`

- `std::panic!`은 현재 스레드를 패닉 상태로 만듭니다. 이는 내부적으로 `format!`을 사용하므로, 인자를 취할 수 있습니다. SDK는 패닉 후크를 설정하여, `panic!`으로부터 생성된 `PanicInfo`를 문자열로 변환하고, 내부적으로 `env::panic`을 사용하여 이를 런타임에 보고합니다. 이는 패닉이 발생한 소스 코드의 줄 번호와 같은 추가 디버깅 정보를 제공할 수 있습니다.

- `env::panic`은 호스트 메서드를 직접 호출하여 컨트랙트를 패닉 상태로 만듭니다. 이는 전달된 메시지를 제외하고 다른 추가 디버깅 정보를 제공하지 않습니다.

## 작업 공간(Workspace) 사용

작업 공간을 사용하면, 워크플로우를 자동화하고 샌드박스 또는 테스트넷 환경에서 여러 컨트랙트 및 교차 컨트랙트 호출에 대한 테스트를 실행할 수 있습니다. [workspaces-rs](https://github.com/near/workspaces-rs) 또는 [workspaces-js](https://github.com/near/workspaces-js)에 대해 더 알아보세요.
