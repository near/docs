---
id: xcc-rust-cheatsheet
title: Rust Cross Contract Calls Cheat Sheet
sidebar_label: Rust - Cheat Sheet
---

In Rust smart contracts, cross contract calls are made by:

1. defining traits
2. calling methods on the defined traits
3. Optional, registering callbacks with `.then`

## Defining a trait

A trait represents an existing contract's interface. It is where we define the methods we'll use in cross contract calls.

### Abstract Example

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_contract_b)]
trait ContractB {
    fn method_on_b(&self) -> String
    fn another_method_on_b(&self, some_arg: u64) -> U128;
    fn mutable_method_on_b(&mut self, some_arg: String);
}
```

### Fungible Token (NEP-141)

See the [NEP-141 Specification](https://nomicon.io/Standards/FungibleToken/Core.html) for more details.

```rust
use near_sdk::json::{U128};
use near_sdk::{ext_contract};

#[ext_contract(ext_ft)]
trait FungibleToken {
    // change methods
    fn ft_transfer(&mut self, receiver_id: String, amount: String, memo: Option<String>);
    fn ft_transfer_call(&mut self, receiver_id: String, amount: String, memo: Option<String>, msg: String) -> U128;

    // view methods
    fn ft_total_supply(&self) -> String;
    fn ft_balance_of(&self, account_id: String) -> String;
}
```

### Fungible Token Metadata (NEP-148)

See the [NEP-148 Specification](https://nomicon.io/Standards/FungibleToken/Metadata.html) for more details.

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_ft_metadata)]
trait FungibleTokenMetadata: FungibleToken {
    fn ft_metadata(&self) -> FungibleTokenMetadata;
}
```

### Non-Fungible Token (NEP-171)

See the [NEP-171 Specification](https://nomicon.io/Standards/NonFungibleToken/Core.html) for more details.

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_nft)]
trait NonFungibleToken {
    // change methods
    fn nft_transfer(&mut self, receiver_id: String, token_id: String, approval_id: Option<u64>, memo: Option<String>);
    fn nft_transfer_call(&mut self, receiver_id: String, token_id: String, approval_id: Option<u64>, memo: Option<String>, msg: String) -> bool;

    // view method
    fn nft_token(&self, token_id: String) -> Option<Token>;
}
```

### Non-Fungible Token Metadata (NEP-177)

See the [NEP-177 Specification](https://nomicon.io/Standards/NonFungibleToken/Metadata.html) for more details.

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_nft_metadata)]
trait NonFungibleTokenMetadata: NonFungibleToken {
    fn nft_metadata(&self) -> NFTContractMetadata;
}
```

### Non-Fungible Token Approval Management (NEP-178)

See the [NEP-178 Specification](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) for more details.

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_nft_approval)]
trait NonFungibleTokenApprovalManagement: NonFungibleToken {
    // change methods
    fn nft_approve(&mut self, token_id: String, account_id: String, msg: Option<String>);
    fn nft_revoke(&mut self, token_id: String, account_id: String);
    fn nft_revoke_all(&mut self, token_id: String);

    // view methods
    fn nft_is_approved(&self, token_id: String, approved_account_id: String, approval_id: Option<Number>) -> bool;
}
```

### Non-Fungible Token Enumeration (NEP-181)

See the [NEP-181 Specification](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html) for more details.

```rust
use near_sdk::json::{U128};
use near_sdk::{ext_contract};

#[ext_contract(ext_nft_enumeration)]
trait NonFungibleTokenApprovalManagement: NonFungibleToken {
    fn nft_total_supply(&self) -> U128;
    fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<Token>;
    fn nft_supply_for_owner(&self, account_id: String) -> String;
    fn nft_tokens_for_owner(&self, account_id: String, from_index: Option<U128>, limit: Option<u64>) -> Vec<Token>;
}
```

### Storage Management (NEP-145)

See the [NEP-145 Specification](https://nomicon.io/Standards/StorageManagement.html) for more details.

```rust
use near_sdk::json::{U128};
use near_sdk::{ext_contract};

#[ext_contract(ext_storage)]
trait StorageManagement {
    // change methods
    fn storage_deposit(&mut self, account_id: Option<String>, registration_only: Option<boolean>) -> StorageBalance;
    fn storage_withdraw(&mut self, amount: Option<String>) -> StorageBalance;
    fn storage_unregister(&mut self, force: Option<bool>) -> bool;

    // viw methods
    fn storage_balance_bounds(&self) -> StorageBalanceBounds;
    fn storage_balance_of(&self, account_id: String) -> Option<StorageBalance>;
}
```

### Callbacks

Just like cross contract calls, callbacks need to be defined in a trait. Even though the method is defined on the originating contract the callback function call still needs to be wrapped into a `Receipt`. See [Cross Contract Calls and Receipts](https://docs.near.org/docs/tutorials/contracts/xcc-receipts) for more details.

```rust
use near_sdk::{ext_contract};

#[ext_contract(ext_self)]
trait MyContract {
    fn my_callback(&self) -> String;
}
```

Or from the [NEP-141 Rust Contract Standard](https://github.com/near/near-sdk-rs/blob/0507deb84da77d83833a4db2563b76e8fe5d0b12/near-contract-standards/src/fungible_token/core_impl.rs#L16):

```rust
#[ext_contract(ext_self)]
trait FungibleTokenResolver {
    fn ft_resolve_transfer(
        &mut self,
        sender_id: AccountId,
        receiver_id: AccountId,
        amount: U128,
    ) -> U128;
}
```

## Making Cross Contract Calls

We can make a cross contract call from contract `A` to contract `B` by using a predefined trait.

### Single promise

Since we return a promise from this method, the returned value from `ft_balance_of` will be returned from `my_method`.

```rust
pub fn my_method(&self) -> Promise {
    ext_ft::ft_balance_of(
        "some_account_id.near".to_string(), // ft_balance_of takes an account_id as a parameter
        &"wrap.near", // contract account id
        0, // yocto NEAR to attach
        5_000_000_000_000 // gas to attach
    )
}
```

If we don't want to return anything from our method we can place a `;` after the cross contract call (making the cross contract call a statement instead of an expression).

```rust
pub fn my_method(&self) {
    ext_ft::ft_balance_of(
        "some_account_id.near".to_string(), // ft_balance_of takes an account_id as a parameter
        &"wrap.near", // contract account id
        0, // yocto NEAR to attach
        5_000_000_000_000 // gas to attach
    );
}
```

### Single promise with a callback

Often, we'll want to do something with the returned value from the cross contract call. In these cases we'll need to register a callback using `.then`.

```rust
pub fn my_callback(&self) -> String {
  assert_eq!(
      env::promise_results_count(),
      1,
      "This is a callback method"
  );

  // handle the result from the cross contract call this method is a callback for
  match env::promise_result(0) {
    PromiseResult::NotReady => unreachable!(),-
    PromiseResult::Failed => "oops!".to_string(),
    PromiseResult::Successful(result) => {
        let balance = near_sdk::serde_json::from_slice::<U128>(&result).unwrap();
        if balance.0 > 100000 {
            "Wow!".to_string()
        } else {
            "Hmmmm".to_string()
        }
    },
  }
}

pub fn my_method(&self) -> Promise {
    ext_ft::ft_balance_of(
        "some_account_id.near".to_string(), // ft_balance_of takes an account_id as a parameter
        &"wrap.near", // contract account id
        0, // yocto NEAR to attach
        5_000_000_000_000 // gas to attach
    )
    .then(ext_self::my_callback(
        &env::current_account_id(), // this contract's account id
        0, // yocto NEAR to attach to the callback
        5_000_000_000_000 // gas to attach to the callback
    ))
}
```

### Multiple with callback

```rust
pub fn max(&self) -> U128 {
    assert_eq!(env::promise_results_count(), 2, "This is a callback method");

    // handle the result from the first cross contract call this method is a callback for
    let some_account_balance: u128 = match env::promise_result(0) {
        PromiseResult::NotReady => unreachable!(),
        PromiseResult::Failed => env::panic(b"Unable to make comparison"),
        PromiseResult::Successful(result) => near_sdk::serde_json::from_slice::<U128>(&result)
            .unwrap()
            .into(),
    };

    // handle the result from the second cross contract call this method is a callback for
    let another_account_balance: u128 = match env::promise_result(1) {
        PromiseResult::NotReady => unreachable!(),
        PromiseResult::Failed => env::panic(b"Unable to make comparison"),
        PromiseResult::Successful(result) => near_sdk::serde_json::from_slice::<U128>(&result)
            .unwrap()
            .into(),
    };

    if some_account_balance > another_account_balance {
        some_account_balance.into()
    } else {
        another_account_balance.into()
    }
}

pub fn my_method(&self) -> Promise {
    ext_ft::ft_balance_of(
        "some_account_id.testnet".to_string(), // ft_balance_of takes an account_id as a parameter
        &"wrap.testnet",            // contract account id
        0,                          // yocto NEAR to attach
        5_000_000_000_000,          // gas to attach
    )
    .and(ext_ft::ft_balance_of(
        "another_account_id.testnet".to_string(), // ft_balance_of takes an account_id as a parameter
        &"wrap.testnet",           // contract account id
        0,                         // yocto NEAR to attach
        5_000_000_000_000,         // gas to attach
    ))
    .then(ext_self::max(
        &env::current_account_id(), // this contract's account id
        0,                          // yocto NEAR to attach to the callback
        5_000_000_000_000,          // gas to attach to the callback
    ))
}
```
