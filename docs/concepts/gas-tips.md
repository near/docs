---
id: gas-tips
title: Tips
sidebar_label: Tips
---

### Tip 1: `env::prepaid_gas()` and `env::used_gas()`

`env::prepaid_gas()` and `env::used_gas()` get reset inside each callback.  

To have a better understanding, check the example below:
```rust
#[ext_contract(ext_self)]
pub trait ExtSelf {
    fn callback_after_storage_balance_of();
}

pub fn check_storage_balance(
    &mut self,
    token_id: &AccountId,
    account_id: &AccountId,
) -> PromiseOrValue<()> {
    // .................
    // {block of code 1}
    // .................

    println!("\n{:?}\n{:?}", env::prepaid_gas(), env::used_gas());
    // prepaid_gas will be Gas(300_000_000_000_000) or whatever amount has been paid by the caller in anticipation for this call
    // used_gas will depend on the processing power consumed during {block of code 1}

    let callback = ext_self::callback_after_storage_balance_of(
        env::current_account_id(),
        0,
        Gas(15_000_000_000_000)
    );

    // .................
    // {block of code 2}
    // .................
}

pub fn callback_after_storage_balance_of() {
    println!("\n{:?}\n{:?}", env::prepaid_gas(), env::used_gas());
    // prepaid_gas will be Gas(15_000_000_000_000)
    // used_gas will be an amount very close to Gas(0) since no gas has been used in this function yet

    // ...............
    // {block of code}
    // ...............
}
```

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
