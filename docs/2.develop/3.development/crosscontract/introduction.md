---
id: introduction
title: Cross-Contract Calls
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cross-contract calls allow you to send and ask information from another deployed contract. This is useful when you:

1. Need to send information to another contract
2. Need to query information from another contract
3. Need another contract to perform an action for you

---

## Example 

Imagine you are writting a contract were people deposit money 

<Tabs className="language-tabs">
<TabItem value="as" label="AS - Assemblyscript">

<Tabs className="file-tabs">
<TabItem value="as-main" label="main.ts">

```ts
export function deposit_and_stake(): void {
  // Make sure there is enough GAS to execute the callback
  assert(context.prepaidGas >= 80 * TGAS, "Please use at least 80Tgas")

  const amount: u128 = context.attachedDeposit

  // Deposit the money in a validator
  const promise: ContractPromise = ContractPromise.create(
    EXTERNAL_POOL, "deposit_and_stake", "{}", 12 * TGAS, amount
  )

  // Create a callback
  const args: UserAmountParams = new UserAmountParams(user, amount)

  const callbackPromise = promise.then(
    context.contractName, "deposit_and_stake_callback", args.encode(), 45 * TGAS
  )
}

export function deposit_and_stake_callback(user: string, amount: u128): void {
  // This is the callback, check the result from the 
  const response = get_callback_result()

  if (response.status == 1) {
    // We are sure that the deposit is staked in the validator
  } else {
    // It failed
    // You need to manually rollback any changes to the contract
    // and return the user's money
    ContractPromiseBatch.create(user).transfer(amount)
  }
}
```

</TabItem>

<TabItem value="as-external" label="external.ts">

```ts
export function deposit_and_stake(): void {
  // Make sure there is enough GAS to execute the callback
  assert(context.prepaidGas >= 80 * TGAS, "Please use at least 80Tgas")

  const amount: u128 = context.attachedDeposit

  // Deposit the money in a validator
  const promise: ContractPromise = ContractPromise.create(
    EXTERNAL_POOL, "deposit_and_stake", "{}", 12 * TGAS, amount
  )

  // Create a callback
  const args: UserAmountParams = new UserAmountParams(user, amount)

  const callbackPromise = promise.then(
    context.contractName, "deposit_and_stake_callback", args.encode(), 45 * TGAS
  )
}

export function deposit_and_stake_callback(user: string, amount: u128): void {
  // This is the callback, check the result from the 
  const response = get_callback_result()

  if (response.status == 1) {
    // We are sure that the deposit is staked in the validator
  } else {
    // It failed
    // You need to manually rollback any changes to the contract
    // and return the user's money
    ContractPromiseBatch.create(user).transfer(amount)
  }
}
```

</TabItem>

</Tabs>

</TabItem>
<TabItem value="rs" label="🦀 - Rust">

```rust
use near_sdk::{ext_contract, log, near_bindgen, env, PromiseResult};

pub fn cache_pool_party_reserve(&mut self) -> Promise {
  // Function that gets information from Pool Party
  poolparty_contract::get_pool_info(
      &POOL_PARTY_ACCOUNT,
      NO_DEPOSIT,
      20*TGAS
  ).then(this_contract::cache_pool_party_reserve_callback(
      &env::current_account_id(),
      NO_DEPOSIT,
      5*TGAS,
  ))
}

#[private]
pub fn cache_pool_party_reserve_callback(&mut self) -> bool {
  // Callback
  if !external::did_promise_succeded() {
      log!("No result found on callback");
      return false;
  }

  // Get response, return false if failed
  let pool_info: PoolInfo = match env::promise_result(0) {
      PromiseResult::Successful(value) => near_sdk::serde_json::from_slice::<PoolInfo>(&value).unwrap(),
      _ => { log!("Getting info from Pool Party failed"); return false; },
  };
}
```
</TabItem>

</Tabs>

---

# Security Concerns

While writing cross-contract calls is not inherently hard, there is a significant aspects to keep in mind: on NEAR, all calls are **independent** and **asynchronous**. In other words:
The method in which your contract makes the call, and the one in which it receives the answer (callback) are **always different**.
There is an **extensive delay** between making the call and the callback. During such a delay anyone can execute a method in your contract before the callback is triggered.

When not dealt with properly, these scenarios can pose severe security threats, leading to a contract exploit or users losing their money. However, there is no reason to panic, since such scenarios are simple to detect and deal with. In fact, we will remind you of this in each of the following sections.

Cross contract calls can be categorized in two types: [basic calls](broken) (with no callback) and [calls with a callback](broken). Step into the next sections to learn more about them.