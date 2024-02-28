---
id: actions
title: 전송 & Action
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

스마트 컨트랙트는 NEAR 전송 또는 다른 컨트랙트 호출과 같은 특정 `Actions`를 수행할 수 있습니다.

`Actions`의 중요한 속성은, 동일한 컨트랙트에서 작업할 때 일괄적으로 처리될 수 있다는 것입니다. **일괄 Action**은 한 단위로 작동합니다. 이는 동일한 [Receipt](../../1.concepts/basics/transactions/overview.md#receipt-receipt)에서 실행되며, **실패할** 경우 모두 **되돌려집니다**.

:::info `Actions`는 **동일한 컨트랙트**에 따라 행동하는 경우에만 일괄 처리될 수 있습니다. 컨트랙트에서 두 메서드를 일괄적으로 호출할 수 있지만, 서로 다른 컨트랙트에서 두 메서드를 일괄적으로 호출 할 수는 **없습니다**. :::

---

## NEAR Ⓝ 전송

컨트랙트에서 $NEAR를 네트워크의 다른 계정으로 보낼 수 있습니다. $NEAR 전송에 대한 가스 비용은 고정되어 있으며, 프로토콜의 기본 구성을 기반으로 합니다. 현재 비용은 `~0.45 TGas`입니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, NearPromise, call } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  @NearBindgen({})
  class Contract{
    @call({})
    transfer({ to, amount }: { to: AccountId, amount: bigint }) {
      NearPromise.new(to).transfer(amount);
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, AccountId, Promise, Balance};

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }

  #[near_bindgen]
  impl Contract {
    pub fn transfer(&self, to: AccountId, amount: Balance){
      Promise::new(to).transfer(amount);
    }
  }
  ```

  </TabItem>
</Tabs>

:::tip 전송이 실패하는 유일한 경우는 수신자 계정이 존재 하지 **않는** 경우입니다 . :::

:::caution
당신의 잔고가 컨트랙트 스토리지를 충당하는 데 사용된다는 점을 기억하세요. 돈을 보낼 때 항상 향후 스토리지 요구 사항을 만족할 수 있도록 충분한 금액을 남겨 두시기 바랍니다.
:::

---

## 함수 호출

스마트 컨트랙트는 다른 컨트랙트의 메서드를 호출할 수 있습니다. In the snippet bellow we call a method in a deployed [Hello NEAR](quickstart.md) contract, and check if everything went right in the callback.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, near, call, bytes, NearPromise } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  const HELLO_NEAR: AccountId = "hello-nearverse.testnet";
  const NO_DEPOSIT: bigint = BigInt(0);
  const CALL_GAS: bigint = BigInt("10000000000000");

  @NearBindgen({})
  class Contract {
    @call({})
    call_method({}): NearPromise {
      const args = bytes(JSON.stringify({ message: "howdy" }))

      return NearPromise.new(HELLO_NEAR)
      .functionCall("set_greeting", args, NO_DEPOSIT, CALL_GAS)
      .then(
        NearPromise.new(near.currentAccountId())
        .functionCall("callback", bytes(JSON.stringify({})), NO_DEPOSIT, CALL_GAS)
      )
      .asReturn()
    }

    @call({privateFunction: true})
    callback({}): boolean {
      let result, success;
    
      try{ result = near.promiseResult(0); success = true }
      catch{ result = undefined; success = false }
    
      if (success) {
        near.log(`Success!`)
        return true
      } else {
        near.log("Promise failed...")
        return false
      }
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, env, log, Promise, Gas, PromiseError};
  use serde_json::json;

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }

  const HELLO_NEAR: &str = "hello-nearverse.testnet";
  const NO_DEPOSIT: u128 = 0;
  const CALL_GAS: Gas = Gas(5_000_000_000_000);

  #[near_bindgen]
  impl Contract {
    pub fn call_method(&self){
      let args = json!({ "message": "howdy".to_string() })
                .to_string().into_bytes().to_vec();

      Promise::new(HELLO_NEAR.parse().unwrap())
      .function_call("set_greeting".to_string(), args, NO_DEPOSIT, CALL_GAS)
      .then(
        Promise::new(env::current_account_id())
        .function_call("callback".to_string(), Vec::new(), NO_DEPOSIT, CALL_GAS)
      );
    }

    pub fn callback(&self, #[callback_result] result: Result<(), PromiseError>){
      if result.is_err(){
          log!("Something went wrong")
      }else{
          log!("Message changed")
      }
    }
  }
  ```

  </TabItem>
</Tabs>

:::warning 위에 표시된 스니펫은 다른 메서드를 호출하는 낮은 수준의 방법입니다. [교차 컨트랙트 호출 섹션](crosscontract.md)에 설명된 방식대로 다른 컨트랙트를 호출하는 것이 좋습니다 . :::

---

## 하위 계정 생성
`user.near`라는 컨트랙트를 예로 들면, `sub.user.near`라는 하위 계정을 만들 수 있습니다.

각 계정에는 자체 키가 있으므로, 컨트랙트는 하위 계정을 제어할 수 **없습니다**.

하위 계정은 계정을 구성하는 데 유용합니다(예시 : `dao.project.near`, `token.project.near`).


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({payableFunction:true})
    create({prefix}:{prefix: String}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, env, Promise, Balance};

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }
                            
  const MIN_STORAGE: Balance = 1_000_000_000_000_000_000_000; //0.001Ⓝ

  #[near_bindgen]
  impl Contract {
    pub fn create(&self, prefix: String){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE);
    }
  }
  ```

  </TabItem>
</Tabs>

:::tip
  스니펫에서 스토리지를 위해 새 계정에 자금을 전송하고 있다는 것을 참고하세요.
:::

:::caution 컨트랙트 내에서 계정을 생성하면 기본적으로 키가 없습니다. 계정에 키를 명시적으로 [추가](#키-추가)하지 않거나 생성 시 [컨트랙트를 배포](#컨트랙트-배포)하지 않으면 계정은 [잠기게](../../1.concepts/basics/accounts/access-keys.md#locked-accounts) 됩니다. :::

<hr className="subsection" />

#### 다른 계정 생성
계정은 자신의 직접적인 하위 계정만 만들 수 있습니다.

컨트랙트에서 `.mainnet` 또는 `.testnet` 계정을 만들려면, 컨트랙트에서 `near` 또는 `testnet` 루트 컨트랙트의 `create_account` 메서드를 [호출](#함수-호출)해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, near, call, bytes, NearPromise } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1820000000000000000000"); //0.00182Ⓝ
  const CALL_GAS: bigint = BigInt("28000000000000");

  @NearBindgen({})
  class Contract {
    @call({})
    create_account({account_id, public_key}:{account_id: String, public_key: String}) {
      const args = bytes(JSON.stringify({ 
        "new_account_id": account_id,
        "new_public_key": public_key 
      }))

      NearPromise.new("testnet")
      .functionCall("create_account", args, MIN_STORAGE, CALL_GAS);
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, Promise, Gas, Balance };
  use serde_json::json;

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }

  const CALL_GAS: Gas = Gas(28_000_000_000_000);
  const MIN_STORAGE: Balance = 1_820_000_000_000_000_000_000; //0.00182Ⓝ

  #[near_bindgen]
  impl Contract {
    pub fn create_account(&self, account_id: String, public_key: String){
      let args = json!({
                  "new_account_id": account_id,
                  "new_public_key": public_key,
                }).to_string().into_bytes().to_vec();

      // Use "near" to create mainnet accounts
      Promise::new("testnet".parse().unwrap())
      .function_call("create_account".to_string(), args, MIN_STORAGE, CALL_GAS);
    }
  }
  ```

  </TabItem>
</Tabs>

---

## 컨트랙트 배포

계정을 생성할 때 컨트랙트 배포 작업을 일괄 처리할 수도 있습니다. 해당 작업을 위해서, 컨트랙트에 배포하려는 바이트 코드를 미리 로드해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, env, Promise, Balance};

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_100_000_000_000_000_000_000_000; //1.1Ⓝ
  const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

  #[near_bindgen]
  impl Contract {
    pub fn create_hello(&self, prefix: String){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .deploy_contract(HELLO_CODE.to_vec());
    }
  }
  ```

  </TabItem>
</Tabs>

:::tip 컨트랙트가 배포된 계정에 액세스 키가 **없는** 경우 이를 잠긴 컨트랙트라고 합니다. 계정이 잠겨 있으면 트랜잭션에 서명할 수 없으므로 컨트랙트 코드 **내에서만** 작업을 수행 할 수 있습니다. :::

---

## 키 추가

Action를 사용하여 새 계정을 만들 때 생성된 계정에는 [액세스 키](../../1.concepts/basics/accounts/access-keys.md)가 없습니다. 즉, 이 경우 **트랜잭션에 서명할 수 없습니다**(예: 컨트랙트 업데이트, 계정 삭제, 송금).

계정에 키를 추가하려면, 다음 두 가지 옵션 중 하나를 사용하면 됩니다.
1. `add_access_key`: 지정된 컨트랙트에서 특정 메서드만 호출할 수 있는 키를 추가합니다.
2. `add_full_access_key`: 계정에 대한 전체 액세스 권한이 있는 키를 추가합니다.

<br/>

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'
  import { PublicKey } from 'near-sdk-js/lib/types'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({})
    create_hello({prefix, public_key}:{prefix: String, public_key: PublicKey}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
      .addFullAccessKey(public_key)
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, env, Promise, Balance, PublicKey};

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_100_000_000_000_000_000_000_000; //1.1Ⓝ
  const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

  #[near_bindgen]
  impl Contract {
    pub fn create_hello(&self, prefix: String, public_key: PublicKey){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .deploy_contract(HELLO_CODE.to_vec())
      .add_full_access_key(public_key);
    }
  }
  ```

  </TabItem>
</Tabs>

실제로 추가하는 것은 "공개 키"입니다. 즉, 개인 키를 보유한 사람은 새로운 액세스 키를 사용할 수 있습니다.

:::tip 컨트랙트가 배포된 계정에 액세스 키가 **없는** 경우 이를 잠긴 컨트랙트라고 합니다. 계정이 잠겨 있으면 트랜잭션에 서명할 수 없으므로, 컨트랙트 코드 **내에서만** 작업을 수행 할 수 있습니다. :::

---

## 계정 삭제

`delete_account` 작업은 다음 두 가지 시나리오에서 사용할 수 있습니다.
1. 일괄 Action의 **마지막** 작업으로 계정을 삭제합니다.
2. 스마트 컨트랙트로 하여금 자체 계정을 삭제하도록 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({})
    create_delete({prefix, beneficiary}:{prefix: String, beneficiary: AccountId}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
      .deleteAccount(beneficiary)
    }

    @call({})
    self_delete({beneficiary}:{beneficiary: AccountId}) {
      NearPromise.new(near.currentAccountId())
      .deleteAccount(beneficiary)
    }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  use near_sdk::{near_bindgen, env, Promise, Balance, AccountId};

  #[near_bindgen]
  #[derive(Default, BorshDeserialize, BorshSerialize)]
  pub struct Contract { }
                            
  const MIN_STORAGE: Balance = 1_000_000_000_000_000_000_000; //0.001Ⓝ

  #[near_bindgen]
  impl Contract {
    pub fn create_delete(&self, prefix: String, beneficiary: AccountId){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .delete_account(beneficiary);
    }

    pub fn self_delete(beneficiary: AccountId){
      Promise::new(env::current_account_id())
      .delete_account(beneficiary);
    }
  }
  ```

  </TabItem>
</Tabs>

:::tip
  스니펫에서는 스토리지를 위해 일부 자금을 새 계정으로 이체하고 있음에 유의하세요.
:::

:::warning 토큰 손실 새 계정에 자금을 조달하는 데 `delete`를 사용하지 **마세요**. 계정이 존재하지 않기 때문에, 토큰을 잃게 될 것입니다. :::
