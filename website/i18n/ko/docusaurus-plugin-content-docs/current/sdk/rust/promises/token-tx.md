---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# $NEAR 전송

여러 가지 이유로 컨트랙트에서 토큰을 보낼 수 있습니다.

* 컨트랙트는 [스토리지 표준](https://nomicon.io/Standards/StorageManagement.html)과 같은 것을 사용하며, 등록 취소 시 사용자에게 보증금을 반환해야 합니다.
* 사용자는 컨트랙트에 수수료를 지불하고, 컨트랙트는 나중에 이러한 수수료를 관리자에게 지불하거나, 사용자에게 재배포하거나, 사용자가 투표하는 원인에 대해 지불합니다.
* 기타 등등!

블록체인은 우리에게 프로그래밍 가능한 돈을 제공하며, 여기서 핵심은 스마트 컨트랙트가 토큰을 보내는 기능입니다.

NEAR는 이를 쉽게 만듭니다. NEAR 토큰 전송은 스마트 컨트랙트에서 보낼 수 있는 가장 간단한 트랜잭션입니다. 필요한 것은 다음과 같습니다.

```rust
let amount: u128 = 1_000_000_000_000_000_000_000_000; // 1 $NEAR as yoctoNEAR
let account_id: AccountId = "example.near".parse().unwrap();

Promise::new(account_id).transfer(amount);
```

전체 컨트랙트 및 함수 호출의 맥락에서, 이는 다음과 같을 수 있습니다.

```rust
use near_sdk::{json_types::U128, near, AccountId, Promise};

#[near(contract_state)]
pub struct Contract {}

#[near]
impl Contract {
    pub fn pay(amount: U128, to: AccountId) -> Promise {
        Promise::new(to).transfer(amount.0)
    }
}
```

Most of this is boilerplate you're probably familiar with by now – imports, setting up [`near(contract_state)`](../contract-structure/near-bindgen.md), [borsh](../contract-interface/serialization-interface.md), etc. 전송 자체와 관련된 몇 가지 흥미로운 세부 정보는 다음과 같습니다.

* `U128`(대문자 `U`): 여기에 정의된 `pay` 메서드는 JSON을 입력으로 받아들이고, JS의 숫자는 [`2^53-1`보다 클 수 없으므로](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), JSON을 JS로 역직렬화하는 것과의 호환성을 위해 정수를 10진수 문자열로 직렬화합니다. `transfer` 메서드가 [yocto](https://en.wikipedia.org/wiki/Yocto-)NEAR 단위로 숫자를 받기 때문에, `2^53-1`보다 훨씬 더 큰 숫자가 필요할 수 있습니다.

  함수가 입력으로 `U128`을 받으면, 호출자가 숫자를 문자열로 지정해야 함을 의미합니다. near-sdk-rs는 이를 `U128` 자료형으로 변환하여 U128 Rust의 기본 [`u128`](https://doc.rust-lang.org/std/primitive.u128.html)로 래핑합니다. 기본 `u128`은 `transfer(amount.0)`에서 사용되는 `.0`으로 검색할 수 있습니다.

* `AccountId`: 이는 제공된 문자열이 올바른 형식의 NEAR 계정 ID인지 자동으로 확인하고, 그렇지 않은 경우 유용한 오류와 함께 패닉합니다.

* `Promise` 반환 : 이를 통해 NEAR 익스플로러, near-cli, near-api-js 및 기타 도구가 전체 트랜잭션 체인이 성공했는지 여부를 올바르게 결정할 수 있습니다. 함수가 `Promise`를 반환하지 않으면, near-cli와 같은 도구는 함수 호출 직후에 이를 반환할 것입니다. 그런 다음 `transfer`가 실패하더라도, 함수 호출은 성공한 것으로 간주됩니다. You can see an example of this behavior [here](/tutorials/examples/advanced-xcc).

Using near-cli or near-cli-rs, someone could invoke this function with a call like:

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  near call <contract> pay '{"amount": "1000000000000000000000000", "to": "example.near"}' --accountId benjiman.near
  ```
  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  near contract call-function as-transaction <contract> pay json-args '{"amount": "1000000000000000000000000", "to": "example.near"}' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as benjiman.near network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>
