---
id: gas-common-issues
title: Common Issues and Tips
sidebar_label: Common Issues and Tips
---

### Issue 1: `Exceeded the prepaid gas` failure

Let's consider the following block of code:

```rust
// Gas needed for common operations.
pub const GAS_FOR_COMMON_OPERATIONS: Gas = Gas(30_000_000_000_000);

// Gas reserved for the current function.
pub const GAS_RESERVED_FOR_CURRENT_CALL: Gas = Gas(20_000_000_000_000);

#[ext_contract(ext_storage_management)]
pub trait StorageManagement {
    fn storage_balance_of(&self, account_id: AccountId) -> Option<StorageBalance>;
}

#[ext_contract(ext_self)]
pub trait ExtSelf {
    fn callback_after_storage_balance_of() -> U128;
}

pub fn check_storage_balance(
    &mut self,
    token_id: &AccountId,
    account_id: &AccountId,
) -> PromiseOrValue<()> {
    // .................
    // {block of code 1}
    // .................

    let call = ext_storage_management::storage_balance_of(
        account_id.clone(),
        token_id.clone(),
        0,
        GAS_FOR_COMMON_OPERATIONS,
    );
    let REMAINING_GAS: Gas = env::prepaid_gas() - env::used_gas();
    let callback = ext_self::callback_after_storage_balance_of(
        env::current_account_id(),
        0,
        REMAINING_GAS
    );
    call.then(callback);

    // .................
    // {block of code 2}
    // .................
}
```

Legend:
- `check_storage_balance` represents the current call.
- `storage_balance_of` represents a cross-contract call made from the current call.
- `callback_after_storage_balance_of` represents the callback that will get executed once a response is received from `storage_balance_of`.
- `env::prepaid_gas()` represents the gas paid by the caller to execute the `check_storage_balance` call. If the caller doesn't specify any value for the gas, a default value of `300_000_000_000_000` will automatically be deducted from his NEAR wallet.
- `env::used_gas()` represents the gas used so far. It takes into account all the gas that got spent since the beginning of the `check_storage_balance` call.

At first glance, everything looks good, but if we are calling `check_storage_balance` with `300_000_000_000_000` gas, we are running into the following error:
```rust
status: Failure(Action #0: Exceeded the prepaid gas.)
```

The error seems to occur while executing `callback_after_storage_balance_of`. This is particularly odd, giving the fact that we allocate `REMAINING_GAS` to this callback which is a huge amount of gas that should cover all the costs.

So why is this happening? To find out, let's check how much gas is consumed at different points in time:

```rust
pub fn check_storage_balance(
    &mut self,
    token_id: &AccountId,
    account_id: &AccountId,
) -> PromiseOrValue<()> {
    // .................
    // {block of code 1}
    // .................

    let gas_before_call = env::used_gas();
    let call = ext_storage_management::storage_balance_of(
        account_id.clone(),
        token_id.clone(),
        0,
        GAS_FOR_COMMON_OPERATIONS,
    );
    let gas_before_callback = env::used_gas();
    let REMAINING_GAS: Gas = env::prepaid_gas() - env::used_gas();
    let callback = ext_self::callback_after_storage_balance_of(
        env::current_account_id(),
        0,
        REMAINING_GAS
    );
    let gas_after_callback = env::used_gas();
    call.then(callback);
    panic!(
        "\n{:?}\n{:?}\n{:?}\n{:?}",
        env::prepaid_gas(),
        gas_before_call,
        gas_before_callback,
        gas_after_callback
    );

    // .................
    // {block of code 2}
    // .................
}
```

When panicking, the following result is displayed:
```rust
status: Failure(Action #0: Smart contract panicked: panicked at '
Gas(300000000000000)
Gas(1653585699141)
Gas(1680501847233)
Gas(1782487215252)')
```
where:
```
Gas(300000000000000) is the prepaid gas: 300_000_000_000_000 
Gas(1653585699141) is the gas before the first call: 1_653_585_699_141
Gas(1680501847233) is the gas after the first call and before the callback: 1_680_501_847_233
Gas(1782487215252) is the gas after the callback: 1_782_487_215_252')
```

To our surprise, neither the gas allocated for the first call (`GAS_FOR_COMMON_OPERATIONS`) nor the gas allocated for the callback (`REMAINING_GAS`) are taken into consideration when calling `env::used_gas()` in the current function. Otherwise, `gas_before_callback` would be equal to `gas_before_call + GAS_FOR_COMMON_OPERATIONS` and `gas_after_callback` would be `300_000_000_000_000` since we allocate all the remaining gas to the callback.  
With this information in mind, we can explain why the error happens. When `callback_after_storage_balance_of` gets executed, we don't have enough gas available because `GAS_FOR_COMMON_OPERATIONS` got consumed by the `storage_balance_of` call, but it was not tracked by `env::used_gas()`.  

To fix it, make the following change:

```rust
    let REMAINING_GAS: Gas =
        env::prepaid_gas() - env::used_gas() - GAS_FOR_COMMON_OPERATIONS;
    let callback = ext_self::callback_after_storage_balance_of(
        env::current_account_id(),
        0,
        REMAINING_GAS
    );
```

Now everything should be good, right? Wrong. If we call our `check_storage_balance` function, we still run into:
```rust
status: Failure(Action #0: Exceeded the prepaid gas.)
```

This happens because we allocated all the remaining gas to the callback, not taking into consideration the last part of the function which is `{block of code 2}`. Since the callback is async, `{block of code 2}` gets executed before the callback and it needs some gas for processing. When the time comes to execute the callback, we no longer have the promissed gas (`env::prepaid_gas() - env::used_gas() - GAS_FOR_COMMON_OPERATIONS`) because `{block of code 2}` also consumed some.

To address this issue, make the following change:
```rust
    let REMAINING_GAS: Gas = env::prepaid_gas()
        - env::used_gas()
        - GAS_FOR_COMMON_OPERATIONS
        - GAS_RESERVED_FOR_CURRENT_CALL;
    let callback = ext_self::callback_after_storage_balance_of(
        env::current_account_id(),
        0,
        REMAINING_GAS
    );
```

As you can see, we reserve some amount of gas (`GAS_RESERVED_FOR_CURRENT_CALL`) for any computations that might happen after creating the callback. As long as `{block of code 2}` does not consume more gas than `GAS_RESERVED_FOR_CURRENT_CALL`, we should have enough gas to execute the callback and avoid any `Exceeded the prepaid gas` errors.

### Tip 1: `env::prepaid_gas()` and `env::used_gas()`

`env::prepaid_gas()` and `env::used_gas()` get reset inside each callback.  

To have a better understanding, check the example below:
```rust
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
