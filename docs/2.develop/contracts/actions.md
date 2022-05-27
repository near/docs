---
id: actions
title: Actions
#sidebar_label: ♟️ Actions
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Smart contracts can trigger a variety of actions on the blockchain such as:

1. Transfer NEAR tokens to another account
2. Deploy smart contracts on other accounts


## Transfer NEARs Ⓝ

You can send NEAR tokens from the Balance of your contract. Assuming your method finished correctly, transfers will always succeed.

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId}

    fn transfer(to: AccountId, amount: u128){
      Promise::new(to).transfer(amount);
    }
  ```

  </TabItem>
</Tabs>

:::caution
Make sure you don't drain your balance to cover for storage
:::

---

## Create a New Account

Your contract can create new accounts that are:
1. A sub-account of your contract (i.e. something.current_account_id)
2. An implicit account.

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId}

    const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;

    fn create(prefix: AccountId, amount: u128){
      let account_id: AccountId = (prefix + "." + &env::current_account_id().to_string()).parse().unwrap();
      Promise::new(account_id)
      .create_account()
      .transfer(5*ONE_NEAR);
    }
  ```

  </TabItem>
</Tabs>

:::tip
  Notice that in the snippet we are transferring some money to the new account for storage
:::

---

## Deploy a Contract

If you just created an account using the previous action, then you can deploy a contract on it. For this, you will need to pre-load the byte-code you want to deploy in your contract.

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId}
    const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
    const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

    fn create(prefix: AccountId){
      let account_id: AccountId = (prefix + "." + &env::current_account_id().to_string()).parse().unwrap();

      Promise::new(account_id)
      .create_account()
      .transfer(5*ONE_NEAR)
      .deploy_contract(HELLO_CODE.to_vec());
    }
  ```

  </TabItem>
</Tabs>

---

## Add Keys

When you use actions to create a new account they do not have keys. This means that the account you just created is locked, and **cannot sign transactions** (e.g. to update its contract, delete itself, transfer money). However, their code **can** still call other contracts and transfer money as part of a **cross-contract call** (since another person is the `signer`), but that's it.

To add functionality to the account you created, you need to add keys to it during creation. You have two options:
1. `add_access_key`: adds keys that only allow to call specific methods in a specific account.
2. `add_full_access_key`: adds keys that give full access to the account.

<br/>

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId, PublicKey}
    const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
    const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

    fn create(prefix: AccountId, public_key: PublicKey){
      let account_id: AccountId = (prefix + "." + &env::current_account_id().to_string()).parse().unwrap();

      Promise::new(account_id)
      .create_account()
      .transfer(5*ONE_NEAR)
      .deploy_contract(HELLO_CODE.to_vec())
      .add_full_access_key(public_key);
    }
  ```

  </TabItem>
</Tabs>

Notice that in the previous snippet what you actually add is a "public key". Whoever holds the counter private-key will be able to fully use the newly created account (or use it only to call specific methods in another contract if `add_access_key` is used).

---

## Function Call

Your smart contract can call methods in another contract.

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId, PublicKey}
    const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");
    const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
    const NO_DEPOSIT: u128 = 0;
    const CREATE_CALL_GAS: Gas = Gas(40_000_000_000_000);

    fn create(prefix: AccountId, public_key: PublicKey){
      let account_id: AccountId = (prefix + "." + &env::current_account_id().to_string()).parse().unwrap();
      let args = &json!({ "message": "howdy2".to_string() }).to_string().into_bytes();

      Promise::new(account_id)
      .create_account()
      .transfer(5*ONE_NEAR)
      .deploy_contract(HELLO_CODE.to_vec())
      .function_call("set_greeting".to_string(), args.to_vec(), NO_DEPOSIT, CREATE_CALL_GAS);
      }
  ```

  </TabItem>
</Tabs>

:::warning
The snippet showed above is a low level way of calling other methods. We recommend make calls to other contracts as explained in the [Cross-contract Calls section](crosscontract.md).
:::

## Delete Account

<Tabs className="language-tabs">
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{Promise, AccountId}

    fn delete(account: AccountId, beneficiary: AccountId){
      Promise::new(account_id).delete_account(beneficiary);
    }
  ```

  </TabItem>
</Tabs>

:::warning
The snippet showed above is a low level way of calling other methods. We recommend make calls to other contracts as explained in the [Cross-contract Calls section](crosscontract.md).
:::