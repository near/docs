---
id: factory
title: 팩토리
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

팩토리는 자체적으로 컴파일된 컨트랙트를 저장하고 하위 계정(sub-account)에 배포하는 것을 자동화하는 스마트 컨트랙트입니다.

다음과 같은 두 가지의 팩토리의 예시가 있습니다.

1. [**토큰 팩토리**](https://github.com/near-examples/token-factory): [대체 가능한 토큰](../fts/0-intro.md) 컨트랙트를 생성하는 팩토리입니다.
2. . [**일반 팩토리**](https://github.com/near-examples/factory-rust): [기부 컨트랙트](./donation.md)를 생성하지만, 배포하는 컨트랙트를 변경할 수 있는 팩토리입니다.

:::info
In this page we will focus on the Donation factory, to learn more about the token factory visit its repository.
:::

---

## 일반 팩토리

[일반 팩토리](https://github.com/near-examples/factory-rust/)는 다음과 같은 컨트랙트 팩토리를 제공합니다.

1. 자신의 하위 계정을 생성하고 컨트랙트를 배포합니다 (`create_factory_subaccount_and_deploy`).
2. `update_stored_contract` 메서드를 사용하여 저장된 컨트랙트를 변경할 수 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/contract/src/deploy.rs"
            start="14" end="60" />
    <Github fname="update.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/contract/src/manager.rs"
            start="5" end="19" />
  </Language>
</CodeTabs>

---

## Quickstart

1. Make sure you have installed [rust](https://www.rust-lang.org/).
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<hr class="subsection" />

### 팩토리 구축 및 배포

다음을 실행하여 NEAR 테스트넷에서 컨트랙트를 자동으로 컴파일하고 배포할 수 있습니다.

```bash
./deploy.sh
```

완료되면 `neardev/dev-account` 파일을 확인하여 컨트랙트가 배포된 주소를 찾습니다.

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<hr class="subsection" />

### 저장된 컨트랙트를 하위 게정에 배포

`create_factory_subaccount_and_deploy`는 팩토리의 하위 계정을 만들고, 여기에 저장된 컨트랙트를 배포합니다.

```bash
near call <factory-account> create_factory_subaccount_and_deploy '{ "name": "sub", "beneficiary": "<account-to-be-beneficiary>"}' --deposit 1.24 --accountId <account-id> --gas 300000000000000
```

그러면 이는 `donation` 컨트랙트가 배포될 `sub.<factory-account>`를 생성할 것입니다.

```bash
near view sub.<factory-account> get_beneficiary
# expected response is: <account-to-be-beneficiary>
```

<hr class="subsection" />

### 저장된 컨트랙트 업데이트

`update_stored_contract`를 통해 팩토리가 저장하는 컴파일된 컨트랙트을 변경할 수 있습니다.

이 메서드의 흥미로운 점은, 선언된 매개 변수가 없지만 바이트 스트림으로 저장할 새 컨트랙트라는 입력을 받는다는 것입니다.

이를 사용하려면 저장하려는 컨트랙트를 `base64` 표현으로 바꾸고, 결과를 메서드에 대한 입력으로 전달해야 합니다.

```bash
# Use near-cli to update stored contract
export BYTES=`cat ./src/to/new-contract/contract.wasm | base64`
near call <factory-account> update_stored_contract "$BYTES" --base64 --accountId <factory-account> --gas 30000000000000
```

> 이는 호출의 인자가 `JSON` 객체이거나 `String Buffer`이기 때문에 작동 가능합니다.

---

## 팩토리 - 개념 & 한계

팩토리는 흥미로운 개념입니다. 여기서는 구현 측면과 제한 사항에 대해 자세히 설명합니다.

<hr class="subsection" />

### 자동으로 계정 생성

NEAR 계정은 자신의 하위 계정만 만들 수 있으므로, `factory`는 자체 하위 계정에서만 컨트랙트를 만들고 배포할 수 있습니다.

이는 다음을 의미합니다.

1. 팩토리는 `sub.factory.testnet`를 생성하고, 여기에 컨트랙트를 배포할 수 **있습니다**.
2. 팩토리는 **predecessor**의 하위 계정을 만들 수 `없습니다`.
3. 새 계정(예: `account.testnet`)을 만들 수 **있지만**, 거기에 컨트랙트를 배포할 순 **없습니다**.

`factory.testnet`은 `sub.factory.testnet`를 생성할 수 있지만, 생성 후에는 제어할 수 없다는 점을 기억하는 것이 중요합니다.

<hr class="subsection" />

### 업데이트 메서드

`update_stored_contracts`는 매우 짧게 구현되어 있습니다.

```rust
#[private]
pub fn update_stored_contract(&mut self) {
  self.code = env::input().expect("Error: No input").to_vec();
}
```

처음 볼 때 메서드는 입력 매개 변수를 사용하지 않는 것처럼 보이지만,코드의 유일한 행이 `env::input()`에서 읽히는 것을 볼 수 있습니다. 여기에서는, `update_stored_contract`가 **입력 역직렬화** 단계를 **우회**하는 일이 발생합니다.

`update_stored_contract(&mut self, new_code: Vec<u8>)`를 구현해서, 컴파일된 코드를 `Vec<u8>`로 저장할 수도 있지만, 그러면 컨트랙트에서 다음과 같은 일이 발생합니다.

1. 입력에서 `new_code` 변수가 역직렬화됩니다.
2. 이를 필터링하여, 정확하게 구축되었는지 확인합니다.

입력 데이터의 큰 스트림을 처리할 때(저장할 컴파일된 파일과 마찬가지로 `wasm`) 입력을 역직렬화/확인하는 이 프로세스는 트랜잭션에 대해 **전체 가스를 소모합니다**.
