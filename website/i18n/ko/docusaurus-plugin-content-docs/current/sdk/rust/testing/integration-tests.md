---
sidebar_position: 2
---

import {Github} from "@site/src/components/codetabs"

# 통합 테스트(Integration Test)

## 단위 테스트(Unit Test) vs. 통합 테스트(Integration Test)

단위 테스트는 단일 함수 수준에서 기능이 예상대로 작동하는지 확인하는 데 유용합니다. 여기에는 `get_nth_fibonacci(n: u8)` 함수가 예상대로 작동하는지, 유효하지 않은 입력을 정상적으로 처리하는지 확인하는 것 등이 포함될 수 있습니다. 스마트 컨트랙트는 단위 테스트는 유사하게 퍼블릭 함수도 테스트할 수 있지만, 계정 간에 여러 호출이 있는 경우 제어되지 않을 수 있습니다. [단위 테스트](unit-tests.md) 섹션에서도 언급했듯이, 트랜잭션의 일부 측면을 시뮬레이션하기 위해 단위 테스트에서 사용되는 `VMContext` 객체가 존재합니다. 예를 들어 테스트 컨텍스트를 수정하여 `"bob.near"`의 `predecessor_account_id` 를 가지도록 할 수 있습니다. 단위 테스트의 한계는 토큰 전송과 같은 특정 상호 작용에서 분명해집니다. `"bob.near"`는 단순히 문자열이고 계정 객체가 아니기 떄문에, Alice가 Bob 6에게 NEAR(Ⓝ)를 보냈는지 확인하는 단위 테스트는 작성할 수 없습니다. 또한 교차 컨트랙트 호출(cross-contract call)을 실행하는 단위 테스트도 작성할 수 없습니다. 또한 블록체인에서 가스 사용 및 호출(또는 일련의 호출) 실행도 역시 프로파일링할 방법이 없습니다.

통합 테스트는 교차 컨트랙트 호출, 적절한 사용자 계정, 상태에 대한 액세스, 구조화된 실행 결과 등을 포함하는 종단 간 테스트 기능을 제공합니다. NEAR에서는 로컬에서 실행되는 블록체인 또는 테스트넷에서 이러한 유형의 테스트를 위해 [Rust](https://github.com/near/workspaces-rs)와 [JavaScript](https://github.com/near/workspaces-js)의 `workspaces` 라이브러리를 모두 사용할 수 있습니다.

## 통합 테스트 사용 사례

다음과 같은 경우 통합 테스트를 사용할 수 있습니다.

- 교차 컨트랙트 호출이 존재합니다.
- 잔액이 변경된 사용자가 여러 명 있습니다.
- 온체인에서 가스 사용 및 실행 결과에 대한 정보를 수집하고 싶습니다.
- 스마트 컨트랙트 로직의 사용 사례 실행 흐름이 예상대로 작동한다고 주장하려고 합니다.
- 주어진 실행 패턴이 (예상대로) 작동하지 않는다고 주장하려고 합니다.

## 설정

단위 테스트(컨트랙트 내 `src/lib.rs` 파일에 있는 경우가 많음)와 달리, Rust의 통합 테스트는 `/tests`라고 하는 `/src`와 동일한 수준의 별도 디렉토리에 있습니다([자세히 보기](https://doc.rust-lang.org/cargo/reference/cargo-targets.html#integration-tests)). 아래의 이 폴더 구조를 참조하세요.

```sh
├── Cargo.toml                  ⟵ contains `dependencies` for contract and `dev-dependencies` for workspaces-rs tests
├── src
│  └── lib.rs                   ⟵ contract code
├── target
└── tests                       ⟵ integration test directory
   └── integration-tests.rs     ⟵ integration test file
```

:::info 이러한 테스트는 자체 `/tests` 디렉토리에 배치할 필요가 없습니다. 대신 테스트 사례 내에서 직렬화를 위해 내보내지 않은 자료형을 사용할 수 있으므로, 유익할 수 있는 `/src` 디렉토리에 배치할 수 있습니다. :::

이 프로젝트의 `Cargo.toml`에 대한 샘플 구성은 다음과 같습니다.

```toml
[package]
name = "fungible-token-wrapper"
version = "0.0.2"
authors = ["Near Inc <hello@nearprotocol.com>"]
edition = "2021"

[dev-dependencies]
anyhow = "1.0"
near-primitives = "0.5.0"
near-sdk = "4.0.0"
near-units = "0.2.0"
serde_json = "1.0"
tokio = { version = "1.14", features = ["full"] }
workspaces = "0.4.1"

# remember to include a line for each contract
fungible-token = { path = "./ft" }
defi = { path = "./test-contract-defi" }

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
overflow-checks = true

[workspace]
# remember to include a member for each contract
members = [
  "ft",
  "test-contract-defi",
]
```

위의 `integration-tests.rs` 파일에는 통합 테스트가 포함됩니다. 이는 테스트 `Cargo.toml` 파일이 있는 디렉토리에서 다음 명령으로 실행할 수 있습니다.

    cargo test --test integration-tests

## 예시 비교

### 단위 테스트

동일한 작업을 수행하는 매우 간단한 단위 테스트와 통합 테스트를 살펴보겠습니다. 일반적으로 이와 같이 중복된 작업을 하진 않지만(통합 테스트는 범위가 더 넓기 때문에), 유익할 것입니다.

시뮬레이션 테스트를 시연하기 위해 `near-sdk-rs` 레퍼지토리 내의 [대체 가능한 토큰 예제](https://github.com/near/near-sdk-rs/blob/master/examples/fungible-token)의 스니펫을 사용할 것입니다.

먼저 `test_transfer` 메서드의 기능을 테스트하는 이 단위 테스트에 주목하세요.

<Github language="rust" start="100" end="165" url="https://github.com/near/near-sdk-rs/blob/6d4045251c63ec875dc55f43b065b33a36d94792/examples/fungible-token/ft/src/lib.rs" />

The test above sets up the testing context, instantiates the test environment through `get_context()`, calls the `test_transfer` method, and performs the `storage_deposit()` initialization call (to register with the fungible token contract) and the `ft_transfer()` fungible token transfer call.

Let's look at how this might be written with workspaces tests. The snippet below is a bit longer as it demonstrates a couple of things worth noting.

### 작업 공간 테스트

<Github language="rust" start="25" end="115" url="https://github.com/near/near-sdk-rs/blob/master/examples/fungible-token/tests/workspaces.rs" />

위의 테스트에서, 대체 가능한 토큰 예제에 대한 컴파일된 스마트 컨트랙트 `.wasm` 파일(`/out` 디렉토리로 컴파일됨)은 환경에 dev-deploy(새로 생성된 계정)되었습니다. 계정 생성에 사용된 환경의 결과로, `ft_contract` 계정이 생성됩니다. 이 특정 파일의 형식에는 하나의 테스트 진입점(`main`)만 있으며, 모든 테스트는 `#[tokio::test]`로 선언됩니다. 테스트는 실행 간에 상태를 공유하지 않습니다.

`test_total_supply`의 레이아웃을 확인하세요. `.call()`은 필요한 가스를 이를 수행하는 계정에서 얻습니다. 단위 테스트와 달리, `init()` 중 초기화된 환경에 의해 컨텍스트가 제공되므로, 호출 전에 시뮬레이션이 수행되지 않습니다. 모든 호출은 이 환경과 상호 작용하여 상태를 가져오거나 변경합니다.

:::info **함정**: 통합 테스트를 실행하기 전에 컨트랙트를 컴파일해야 합니다. 작업 공간 테스트는 `.wasm` 파일을 사용하여 컨트랙트를 네트워크에 배포하기 때문입니다. 스마트 컨트랙트 코드가 변경되면, 이러한 테스트를 다시 실행하기 전에 스마트 컨트랙트를 다시 빌드해야 합니다. :::

:::note, 실행 사이에 상태를 유지하려는 경우, 하나의 함수 내에서 여러 테스트를 호출하여 `workspaces::sandbox()` 호출에서 작업자를 전달할 수 있습니다. :::

## 도움 되는 스니펫

### 계정 생성

<Github language="rust" start="13" end="20" url="https://github.com/near-examples/auction-examples/blob/main/contract-rs/tests/test_basics.rs" />

:::note 다음과 같이 컨트랙트를 배포하지 않고도 `dev_account`를 생성할 수 있습니다.

<Github language="rust" start="7" end="8" url="https://github.com/near/workspaces-rs/blob/8f12f3dc3b0251ac3f44ddf6ab6fc63003579139/workspaces/tests/create_account.rs" />

:::

### 헬퍼 함수 생성

<Github language="rust" start="148" end="161" url="https://github.com/near-examples/nft-tutorial/blob/7fb267b83899d1f65f1bceb71804430fab62c7a7/integration-tests/rs/src/helpers.rs" />

### 스푸닝 - Mainnet/Testnet에서 존재하는 상태 및 컨트랙트 풀링(Pulling)

이 예는 테스트넷 컨트랙트에서 로컬 샌드박스 환경으로 상태를 스푸닝(데이터 복사)하는 것을 보여줍니다.

<Github language="rust" start="64" end="122" url="https://github.com/near/workspaces-rs/blob/c14fe2aa6cdf586028b2993c6a28240f78484d3e/examples/src/spooning.rs" />

전체 예제는 [examples/src/spooning.rs](https://github.com/near/workspaces-rs/blob/main/examples/src/spooning.rs) 예제를 참조하세요.

### 빨리 감기 - 미래 블록으로

`workspaces` 테스트는 블록체인의 상태를 미래로 보낼 수 있는 기능을 제공합니다. 즉, 시간에 민감한 데이터가 필요한 컨트랙트는 샌드박스의 블록이 생성될 때까지 앉아서 기다릴 필요가 없습니다. 시간을 빨리 돌리고 싶다면, `worker.fast_forward`를 호출하면 됩니다.

<Github language="rust" start="12" end="44" url="https://github.com/near/workspaces-rs/blob/c14fe2aa6cdf586028b2993c6a28240f78484d3e/examples/src/fast_forward.rs" />

전체 예제를 보려면 [examples/src/fast_forward.rs](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs)를 살펴보세요.

### 에러 핸들링

<Github language="rust" start="199" end="225" url="https://github.com/near-examples/FT/blob/98b85297a270cbcb8ef3901c29c17701e1cab698/integration-tests/rs/src/tests.rs" />

:::note `Err(msg)` 반환 또한 구현 가능합니다(또한 틀림없이 더 간단할 것입니다). :::

### 배치(Batch) 트랜잭션

```rust title="Batch Transaction - workspace-rs"
let res = contract
    .batch(&worker)
    .call(
        Function::new("ft_transfer_call")
            .args_json((defi_contract.id(), transfer_amount, Option::<String>::None, "10"))?
            .gas(300_000_000_000_000 / 2)
            .deposit(1),
    )
    .call(
        Function::new("storage_unregister")
            .args_json((Some(true),))?
            .gas(300_000_000_000_000 / 2)
            .deposit(1),
    )
    .transact()
    .await?;
```

### 로그 검사

```rust title="Logs - workspaces-rs"
assert_eq!(
    res.logs()[1],
    format!("Closed @{} with {}", contract.id(), initial_balance.0 - transfer_amount.0)
);
```

Receipt 결과를 검토하면 다음과 같습니다.

```rust title="Logs - workspaces-rs"
let outcome = &res.receipt_outcomes()[5];
assert_eq!(outcome.logs[0], "The account of the sender was deleted");
assert_eq!(outcome.logs[2], format!("Account @{} burned {}", contract.id(), 10));
```

### 가스 프로파일링

`CallExecutionDetails::total_gas_burnt`는 Receipt를 포함하여 호출 실행으로 연소된 모든 가스를 포함합니다. 이것은 훨씬 더 일반적으로 사용되는 개념이므로, 표면(surface) 수준 API로 공개됩니다.

```rust title="Gas (all) - workspaces-rs"
println!("Burnt gas (all): {}", res.total_gas_burnt);
```

트랜잭션 자체에 의해 실제로 가스를 소각하고 싶다면, 다음과 같이 할 수 있습니다.

```rust title="Gas (transaction) - workspaces-rs"
println!("Burnt gas (transaction): {}", res.outcome().gas_burnt);
```

각 Receipt에 의해 소각된 가스를 보려면 다음과 같이 할 수 있습니다.

```rust title="Gas (receipt) - workspaces-rs"
for receipt in res.receipt_outcomes() {
   println!("Burnt gas (receipt): {}", receipt.gas_burnt);
}
```
