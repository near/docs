---
id: actions
title: Transfers & Actions
#sidebar_label: ♟️ Actions
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Smart contracts can perform a variety of `Actions` such as transferring NEAR, or calling methods in other contracts.

An important property of `Actions` is that they can be batched together when they act on the same contract. **Batched actions** have the advantage of acting as a unit: they execute in the same [receipt](../../1.concepts/basics/transactions/overview.md#receipt-receipt), and if **any fails**, then they **all get reverted**.

:::info
`Actions` can be batched only when they act on the **same contract**. You can batch calling two methods on a contract,
but **cannot** call two methods on different contracts.
:::

---

## Transfer NEAR Ⓝ

You can send NEAR from the your contract to any other account on the network in the form of a promise. The Gas cost for transferring $NEAR is fixed and is based on the protocol's genesis config. Currently, it costs `~0.45 TGas`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call } from 'near-sdk-js'

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }
    
    @call
    transfer({ to, amount }: { to: string, amount: BigInt }) {
      let promise = near.promiseBatchCreate(to)
      near.promiseBatchActionTransfer(promise, amount)
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

:::tip
The only case where the transfer will fail is if the receiver account does **not** exist.
:::

:::caution
Remember that your balance is used to cover for the contract's storage. When sending money, make sure you always leave enough to cover for future storage needs.
:::

---

## Function Call

Your smart contract can call methods in another contract. In the snippet bellow we call a method
in a deployed [Hello NEAR](../quickstart.md) contract, and check if everything went
right in the callback.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call, bytes } from 'near-sdk-js'

  const HELLO_NEAR: string = "hello-nearverse.testnet";
  const NO_DEPOSIT: number = 0;
  const CALL_GAS: bigint = BigInt("5000000000000");

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }

    @call
    call_method() {
      const args = bytes(JSON.stringify({ message: "howdy" }))

      const call = near.promiseBatchCreate(HELLO_NEAR);
      near.promiseBatchActionFunctionCall(call, "set_greeting", args, NO_DEPOSIT, CALL_GAS);

      const then = near.promiseThen(call, near.currentAccountId(), "callback", bytes(JSON.stringify({})), NO_DEPOSIT, CALL_GAS);
      return near.promiseReturn(then);
    }

    @call
    callback() {
      if(near.currentAccountId() !== near.predecessorAccountId()){near.panic("This is a private method")};

      if (near.promiseResultsCount() == BigInt(1)) {
        near.log("Promise was successful!")
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

:::warning
The snippet showed above is a low level way of calling other methods. We recommend make calls to other contracts as explained in the [Cross-contract Calls section](crosscontract.md).
:::

---

## Create a Sub Account
Your contract can create sub accounts of itself, i.e. `<prefix>.<account-id>.near`.
Something important to remark is that an account does **NOT** have control over
its sub-accounts, since they have their own keys. A sub-account is exactly the same as a regular account but it just has a different name. They are useful for organizing your accounts
(e.g. `dao.project.near`, `token.project.near`).


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }

    @call
    create({prefix}={prefix: String}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      const promise = near.promiseBatchCreate(account_id)
      near.promiseBatchActionCreateAccount(promise)
      near.promiseBatchActionTransfer(promise, MIN_STORAGE)
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
  Notice that in the snippet we are transferring some money to the new account for storage
:::

:::caution
  When you create an account from within a contract, it has no keys by default. This means it cannot sign transactions and is essentially useless since it has no contract deployed to it. See the following section [adding keys](#add-keys) for more information.
:::

<hr class="subsection" />

#### Creating Other Accounts
If your contract wants to create another `mainnet` or `testnet` account, then it needs to [call](#function-call)
the `create_account` method of `near` or `testnet`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call, bytes } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1820000000000000000000"); //0.00182Ⓝ
  const CALL_GAS: bigint = BigInt("28000000000000");

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }

    @call
    create_account({account_id, public_key}={account_id: String, public_key: String}) {
      const args = bytes(JSON.stringify({ 
        "new_account_id": account_id,
        "new_public_key": public_key 
      }))

      const call = near.promiseBatchCreate("testnet");
      near.promiseBatchActionFunctionCall(call, "create_account", args, MIN_STORAGE, CALL_GAS);
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

## Deploy a Contract

If you just created an account using the previous action, then you can deploy a contract to it using a batch action. For this, you will need to pre-load the byte-code you want to deploy in your contract.

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

:::tip
If an account with a contract deployed does **not** have any access keys, this is known as a locked contract. When the account is locked, it cannot sign transactions therefore, actions can **only** be performed from **within** the contract code.
:::

---

## Add Keys

When you use actions to create a new account, the created account does not have any access keys, meaning that it **cannot sign transactions** (e.g. to update its contract, delete itself, transfer money).

There are two options for adding keys to the account:
1. `add_access_key`: adds a key that can only call specific methods on a specified contract.
2. `add_full_access_key`: adds a key that has full access to the account.

<br/>

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }

    @call
    create_hello({prefix, public_key}={prefix: String, public_key: String}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      const promise = near.promiseBatchCreate(account_id)
      near.promiseBatchActionCreateAccount(promise)
      near.promiseBatchActionTransfer(promise, MIN_STORAGE)
      near.promiseBatchActionAddKeyWithFullAccess(promise, public_key.toString(), 0)
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

Notice that what you actually add is a "public key". Whoever holds its private counterpart, i.e. the private-key, will be able to use the newly access key.

:::tip
If an account with a contract deployed does **not** have any access keys, this is known as a locked contract. When the account is locked, it cannot sign transactions therefore, actions can **only** be performed from **within** the contract code.
:::

---

## Delete Account

There are two scenarios in which you can use the `delete_account` action:
1. As the **last** action in a chain of actions.
2. To make your smart contract delete its own account.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
  import { NearContract, NearBindgen, near, call } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen
  class Contract extends NearContract {
    constructor() { super() }

    @call
    create_delete({prefix, beneficiary}={prefix: String, beneficiary: String}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      const promise = near.promiseBatchCreate(account_id)
      near.promiseBatchActionCreateAccount(promise)
      near.promiseBatchActionTransfer(promise, MIN_STORAGE)
      near.promiseBatchActionDeleteAccount(promise, beneficiary.toString())
    }

    @call
    self_delete({beneficiary}={beneficiary: String}) {
      const promise = near.promiseBatchCreate(near.currentAccountId())
      near.promiseBatchActionDeleteAccount(promise, beneficiary.toString())
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

:::warning Token Loss
If the beneficiary account does not exist a the funds will be [**dispersed among validators**](../../1.concepts/basics/token-loss.md).
:::

:::warning Token Loss
Do **not** use `delete` to try fund a new account. Since the account doesn't exist the tokens will be lost.
:::