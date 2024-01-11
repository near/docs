---
id: workspaces-migration
sidebar_label: "작업 공간(Workspace) 이동"
title: "시뮬레이션 테스트에서 작업 공간로의 마이그레이션"
---

# 시뮬레이션 테스트에서 작업 공간으로의 마이그레이션

### 시뮬레이션 테스트 지원을 중단한 이유는 무엇인가요?

시뮬레이션 테스트는 다음과 같은 몇 가지 이유로 목적에 적합하지 않았습니다.

- `near-sdk-sim`는 출시할 의도가 없었던 Nearcore의 일부에 연결되고 있었습니다. 최신 버전에서는 해당 크레이트가 출시되지 않았기 때문에, `near-sdk-sim`은 현재 중복된 의존성을 사용하고 있습니다(유지 관리 어려움).
- 특정 방식으로 런타임의 하위 집합을 사용했기 때문에, 완전히 정확한 시뮬레이션은 아니었습니다. 우리는 이에 의존할 수 없습니다. 그리고 이에 따라, 소각된 가스를 정확하게 측정할 수 없었습니다. 또한, 프로토콜 기능과 같은 Nearcore의 모든 복잡성은 런타임과 일대일로 일치하지 않는데, 이는 런타임이 VM 로직 위에 빌드된 코드일 뿐이기 때문이었습니다. 사람들은 또한 테스트넷 배포를 위해 자체적인 자동화 스크립트를 작성해야 하므로, 테스트를 위해 워크플로우를 잘게 쪼개야만 하였습니다.
- 큰 크기의 의존성(dependency)(컴파일 시간이 크게 증가합니다)을 가지고 있었습니다.
- 이 전략에 한정되지는 않지만, 재구축해야 했을 가능성이 높았던 인간 공학적이지 않은 API를 사용하고 있었습니다.
- 병렬 트랜잭션을 쉽게 테스트할 수 없었습니다 - 현재 패턴은 트랜잭션이 성공할 때까지 블록을 처리하지만, 특정 조건들은 완전히 생성할 수 없었습니다. 이는 부분 시뮬레이션과 같은 특정 전략들을 구현할 수 없게 만들었습니다.

:::info 이 가이드에서는 near-sdk-sim `3.2.0`(더 이상 사용되지 않는 마지막 릴리스)에서 `workspaces-rs` `0.2.1`로 바꾼 상황을 가정합니다. near-sdk-sim이 더 이상 사용되지 않는다는 점을 감안할 때, API가 변경될 가능성은 매우 낮지만 향후 `workspaces-rs` 릴리스에서는 변경될 수 있습니다. 프로젝트를 최신 작업 공간 버전으로 마이그레이션하는 경우에도 이 가이드가 도움이 되기를 바랍니다. 작업 공간이 변경된 경우, 이 가이드를 사용하여 테스트를 `0.2.1`로 마이그레이션하고, `0.2.1` 이후 퍼블릭 API 변경점에 대한 릴리스 정보를 살펴본 다음 최신 작업 공간 버전으로 업그레이드하세요. :::

## 비동기 런타임 및 에러 핸들링

이 섹션에서는 테스트 서명으로만 작업할 것이므로, 이는 작성된 내용에 관계없이 거의 모든 NEAR 컨트랙트 테스트에 적용됩니다. 각 변경 사항을 하나씩 살펴보겠습니다. 현재 테스트가 어떻게 보이는지부터 시작하겠습니다.

```rust
#[test]
fn test_transfer() {
    ...
}
```

첫 번째 큰 변화는 `workspaces-rs` API가 비동기식이라는 것입니다. 즉, 컨트랙트 함수 호출은 `Future` 특성을 구현하는 값을 반환하게 됩니다. 동기적인 환경에서는 호출 결과에 대해 작업할 수 없으므로, 만약 없다면 비동기 런타임을 추가해야 합니다. 이 가이드에서는 [`tokio`](https://tokio.rs/)를 사용할 예정 이지만 다른 대안(예 : [`async-std`](https://async.rs/), [`smol`](https://github.com/smol-rs/smol))도 사용할 수 있어야 합니다. 위의 테스트를 다음과 같이 다시 작성해 보세요.

```rust
#[tokio::test]
async fn test_transfer() {
    ...
}
```

:::warning 이제 `workspaces-rs`가 정확하게 가스를 측정하기 떄문에, 가스 리포트에 의존했던 sdk-sim으로 테스트된 기존 플로우는 더 이상 작동하지 않을 수 있습니다. 이를 `mainnet`에 배포할 예정이라면, 실사를 수행하길 바랍니다. :::

두 번째 변화는 `workspaces-rs`가 [`anyhow::Result`](https://docs.rs/anyhow/latest/anyhow/type.Result.html)를 확장하여 사용한다는 것입니다. 직접 `Result`에 대해 작업할 수도 있겠지만, 테스트가 `anyhow::Result<()>`를 반환하도록 하는 것이 좋습니다.

```rust
#[tokio::test]
async fn test_transfer() -> anyhow::Result<()> {
    ...
}
```

이렇게 하면 테스트 내부의 어느 곳에서나 `?`를 사용하여 모든 `anyhow::Result<R>` 자료형을 안전하게 `R`로 압축 해제할 수 있습니다(가이드 아래 부분에서 매우 유용할 것입니다). `anyhow::Result<R>`의 압축을 풀 수 없으면 테스트가 실패합니다

## 초기화 및 컨트랙트 배포

NEAR 시뮬레이터와 달리, `workspaces-rs`는 실제 NEAR 노드를 사용하고, 이를 통해 모든 호출을 수행합니다. 먼저 테스트를 실행할 네트워크를 결정해야 합니다.

- `sandbox` - 로컬 개발 및 테스트에만 관심이 있다면 완벽한 선택입니다. `workspaces-rs`는 격리된 NEAR 노드를 실행할 로컬 장치에서 [샌드박스](https://github.com/near/sandbox)를 인스턴스화합니다.
- `testnet` - 현실에 훨씬 더 가까운 환경입니다. 재정적 위험을 감수하지 않고 테스트넷에서 배포된 다른 컨트랙트와의 통합을 테스트할 수 있습니다.
- `mainnet` - 트랜잭션을 수행하는 것의 위험성으로 인해 기능의 양이 감소된 네트워크이지만, 배포 자동화 및 배포된 컨트랙트를 가져오는 데 여전히 유용할 수 있습니다.

이 가이드에서는 NEAR 시뮬레이터와 동일한 사용 사례를 다루기 때문에, `sandbox`에 집중할 것입니다. 그러나 물론 새로운 테스트/워크플로우를 작성할 때 다른 네트워크가 사용될 수 있는지 여부를 알아보아도 좋을 것입니다.

시뮬레이터를 초기화하고 컨트랙트를 배포하는 방법 중 하나는 다음과 같습니다(다른 방법은 다음 섹션에서 살펴볼 `deploy!` 매크로를 사용하는 것입니다).

```rust title="Deployment - near-sdk-sim"
use near_sdk_sim::{init_simulator, to_yocto};

near_sdk_sim::lazy_static_include::lazy_static_include_bytes! {
    WASM_BYTES => "res/contract.wasm",
}

const ID: &str = "contract-id";

...

let root = init_simulator(...);
let contract = root.deploy(&WASM_BYTES, ID.parse().unwrap(), to_yocto("5"));
```

`workspaces-rs`는 배포할 컨트랙트에 대한 계정 ID를 지정하는 방법을 제공하지만, 일반적으로 단일 테스트에서는 중요하지 않습니다. 임의의 개발자 계정을 생성하고 100N으로 이를 초기화하는 것이 괜찮다면, 위의 스니펫을 다음과 같이 바꿀 수 있습니다.

```rust title="Deployment - workspaces-rs"
let worker = workspaces::sandbox().await?;
let contract = worker.dev_deploy(include_bytes!("../res/contract.wasm")).await?;
```

만약 계정 ID에 관심이 있다면, 다음 스니펫을 사용하세요.

```rust title="Deployment - workspaces-rs (with explicit account id)"
let worker = workspaces::sandbox().await?;
let (_, sk) = worker.dev_generate().await;
let id: AccountId = "contract-id".parse()?;
let contract = worker
    .create_tla_and_deploy(
        id,
        sk,
        include_bytes!("../examples/res/non_fungible_token.wasm"),
    )
    .await?
    .result;
```

:::danger 'dev_deploy'는 초기 잔고를 제공할 수 없습니다. 우리가 테스트넷에서 개발자 계정을 생성하는 데 사용하는 헬퍼 컨트랙트 내 금액은 테스트넷이 제어하기 때문입니다. 따라서 간단하게 하기 위해, 이를 전혀 제공하지 않습니다(샌드박스 포함). 그러나 샌드박스에서 특정 잔고로 **하위 계정(subaccount)**을 만드는 것이 가능하며, 루트 계정을 가져와 다음과 같은 것들을 수행할 수 있습니다.

```rust title="Deployment - workspaces-rs (with initial balance)"
let root = worker.root_acount();
root.create_subaccount(...)
   .initial_balance(...)
   ...
```

:::

:::caution `init_simulator`가 선택적 제네시스 구성을 허용하는 데 사용되는 것을 눈치챘을 것입니다. 안타깝게도 `workspaces-rs`는 아직 이 기능을 지원하지 않지만, 우리는 해당 기능의 필요성을 이해하고 적절하게 설계하기 위해 노력하고 있습니다. [여기](https://github.com/near/workspaces-rs/issues/68)에서 사용 사례를 자유롭게 공유하세요. :::

## 트랜잭션 생성 및 View 호출

항상 그렇듯이, NEAR 시뮬레이터를 통해 호출을 생성하는 방법에 대해 살펴보겠습니다.

```rust title="Calls - near-sdk-sim"
// Example 1: No Macros
root.call(
    ft.account_id(),
    "ft_transfer",
    &json!({
        "receiver_id": alice.account_id(),
        "amount": U128::from(transfer_amount)
    })
    .to_string()
    .into_bytes(),
    300_000_000_000_000,
    1,
);

let root_balance: U128 = root.view(
    ft.account_id(),
    "ft_balance_of",
    &json!({
        "account_id": root.account_id()
    })
    .to_string()
    .into_bytes(),
)
.unwrap_json();

// Example 2: With Macros
call!(
    root,
    ft.ft_transfer(alice.account_id(), transfer_amount.into(), None),
    deposit = 1
    gas = 300_000_000_000_000
);

let root_balance: U128 = view!(ft.ft_balance_of(root.account_id())).unwrap_json();
```

예제 2의 `call!`과 `view!` 매크로가 컨트랙트 함수 호출을 Rust처럼 허용하고 있음에 유의하세요. NEAR 시뮬레이터와 달리, `workspaces-rs`는 배포된 컨트랙트에 대한 메타데이터를 저장하지 않으므로, 이와 같은 고급 구문도 지원하지 않습니다. 이는 ACI 구현이 준비되면 나중에 변경될 수 있지만, 이 섹션의 나머지 부분에서는 예제 1을 마이그레이션할 것입니다.

작업 공간에는 [빌더(builder)](https://doc.rust-lang.org/1.0.0/style/ownership/builders.html) 패턴을 통해 모든 유형의 호출을 수행하는 통합된 방법이 존재합니다. 일반적으로 호출은 다음과 같은 단계로 구성됩니다.

1. `Contract::call`을 호출하여 `CallBuilder` 생성
2. 컨트랙트에서 사용하고 있는 직렬화 알고리즘에 따라 `CallBuilder::args_json` 또는 `CallBuilder::args_borsh`를 사용하여 함수 호출 인자 전달
3. `CallBuilder::gas` 및 `CallBuilder::deposit`을 통해 가스 및 자금(필요한 경우) 구성
4. 어떤 종류의 호출을 원하는지에 따라 `CallBuilder::transaction` 또는 `CallBuilder::view`를 통해 빌더 사용, 호출 마무리

호출을 마이그레이션하고 싶다면 예제 1의 마이그레이션을 참조하세요.

```rust title="Calls - workspaces-rs"
contract
    .call(&worker, "ft_transfer")
    .args_json((alice.id(), transfer_amount, Option::<bool>::None))?
    .gas(300_000_000_000_000)
    .deposit(ONE_YOCTO)
    .transact()
    .await?;

let root_balance: U128 = contract
    .call(&worker, "ft_balance_of")
    .args_json((contract.id(),))?
    .view()
    .await?
    .json()?;
```

:::note 연속된 리스트를 나타내는 직렬화 가능한 유형으로 인자를 전달해야 합니다. 튜플은 일반적으로 동일하지 않은(heterogeneous) 데이터 유형들을 저장할 수 있는 특성으로 인해 가장 적합한 후보입니다(`(el,)`과 같이 닫는 괄호 앞에 쉼표를 배치하여 단항 튜플을 구성할 수 있음을 기억하세요). `json!()` 매크로를 통해 형식이 정해진 객체를 전달하는 것도 지원됩니다. :::

### 배치(Batch) 트랜잭션

`Contract::batch`를 호출하여 인스턴스화할 수 있는 배치 트랜잭션을 만들기 위해, 특수한 빌더가 존재합니다. 다음 스니펫은 두 번의 호출로 구성된 배치 트랜잭션을 만듭니다.

```rust title="Batch Transaction - near-sdk-sim"
let res = root
    .create_transaction(contract.account_id())
    .function_call(
        "ft_transfer_call".to_string(),
        json!({
            "receiver_id": defi_contract.account_id(),
            "amount": transfer_amount.to_string(),
            "msg": "10",
        })
        .to_string()
        .into_bytes(),
        300_000_000_000_000 / 2,
        1,
    )
    .function_call(
        "storage_unregister".to_string(),
        json!({
            "force": true
        })
        .to_string()
        .into_bytes(),
        300_000_000_000_000 / 2,
        1,
    )
    .submit();
```

여기에 주의해야 할 사항은 없으며, 스니펫은 다음과 같이 간단하게 매핑될 수 있습니다.

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

## 로그 검사

로그 검사를 위한 API는 NEAR 시뮬레이터에 있었던 것과 상당히 비슷하지만, 마이그레이션할 때 염두에 두어야 할 몇 가지 사항이 있습니다. [배치 트랜잭션](#배치batch-트랜잭션) 섹션에서 사용한 것과 동일한 트랜잭션을 가져와 해당 로그를 검사해 보겠습니다. 다음은 NEAR 시뮬레이터를 사용하여 트랜잭션이 특정 위치에 특정 메시지를 기록했는지 여부를 확인하는 방법입니다.

```rust title="Logs - near-sdk-sim"
assert_eq!(
    res.logs()[1],
    format!("Closed @{} with {}", contract.account_id(), initial_balance - transfer_amount)
);
```

`workspaces-rs` 내 같은 기능을 하는 부분도 언뜻 보기에 거의 동일하게 보일 수 있습니다.

```rust title="Logs - workspaces-rs"
assert_eq!(
    res.logs()[1],
    format!("Closed @{} with {}", contract.id(), initial_balance.0 - transfer_amount.0)
);
```

그러나, 실제로 사용 사례에 따라 다르게 작동할 수 있습니다. Near-sdk-sim 버전은 트랜잭션의 로그만 반환하는 반면, 작업 공간 버전은 트랜잭션 및 Receipt 결과의 모든 로그를 반환하기 때문입니다. 문자 그대로의 결과물을 원한다면, `res.outcome().logs`를 사용하세요.

또 다른 일반적인 사용 사례는 다음과 같이 Receipt 결과 로그를 검사하는 것입니다.

```rust title="Logs - nead-sdk-sim"
let outcome = res.get_receipt_results().remove(5).unwrap();

assert_eq!(outcome.logs()[0], "The account of the sender was deleted");
assert_eq!(
    outcome.logs()[2],
    format!("Account @{} burned {}", root.account_id(), 10)
);
```

이는 다음과 같이 간단하게 대체될 수 있습니다.

```rust title="Logs - workspaces-rs"
let outcome = &res.receipt_outcomes()[5];
assert_eq!(outcome.logs[0], "The account of the sender was deleted");
assert_eq!(outcome.logs[2], format!("Account @{} burned {}", contract.id(), 10));
```

## 가스 프로파일링

NEAR 시뮬레이터는 Nearcore만 미러링하도록 설계되었기 때문에 정확한 가스 추정을 할 수 없었지만, Nearcore에는 가스를 소비하는 추가 기능이 있습니다(예: 교차 컨트랙트 호출은 동일한 트랜잭션과 별도로 처리되며 추가 가스비가 발생). 워크스페이스는 여기에서 더 나은 경험을 제공하며, 테스트넷 및 메인넷에서 수행할 수 있는 작업들과 매우 잘 일치합니다. 이는 `mainnet`에 배포하기 전에 개발자가 가스 사용량을 정확하게 프로파일링할 수 있는 추가적인 이점을 제공합니다.

:::warning `workspaces-rs`는 현재 정확한 가스 측정을 사용하고 있기 때문에 이전에 가스 보고서에 의존하는 sdk-sim으로 테스트하던 일부 테스트 흐름이 더 이상 작동하지 않을 수 있습니다. `mainnet`에 배포할 계획이라면 실사를 수행해야 합니다. :::

다시 한 번 [배치 트랜잭션](#배치batch-트랜잭션) 예제로 돌아가서 주어진 트랜잭션에 의해 소각된 가스를 추정하는 방법을 살펴보겠습니다.

```rust title="Gas (transaction) - near-sdk-sim"
println!("Burnt gas (transaction): {}", res.gas_burnt());
```

[로그 검사](#로그-검사)와 마찬가지로, 다음과 같이 잘못 생각할 수 있습니다.

```rust title="Gas (all) - workspaces-rs"
println!("Burnt gas (all): {}", res.total_gas_burnt);
```

이는 해당하는 `workspaces-rs` 스니펫이지만, `CallExecutionDetails::total_gas_burnt`는 Receipt를 포함하여 호출 실행으로 연소된 모든 가스를 포함합니다. 이것은 훨씬 더 일반적으로 사용되는 개념이므로 표면(surface) 수준의 API로 공개되지만, 실제로 트랜잭션 자체에서 가스를 소각하고 싶다면 다음과 같이 할 수 있습니다.

```rust title="Gas (transaction) - workspaces-rs"
println!("Burnt gas (transaction): {}", res.outcome().gas_burnt);
```
