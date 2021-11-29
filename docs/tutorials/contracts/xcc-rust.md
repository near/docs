---
id: xcc-rust
title: Rust Cross Contract Calls Explored
sidebar_label: Rust - Exploration
---

When a signed transaction comes into the `runtime`, it is converted into an `ActionReceipt` ([code here](https://github.com/near/nearcore/blob/2ca2684ad7cf400b5c617f62ac118aa105f16193/runtime/runtime/src/lib.rs#L1130)). Next, the `runtime` processes the `ActionReceipt` and then applies each action inside the receipt ([code here](https://github.com/near/nearcore/blob/2ca2684ad7cf400b5c617f62ac118aa105f16193/runtime/runtime/src/lib.rs#L500)).

If the action is a function call, then the function is run ([code here](https://github.com/near/nearcore/blob/2ca2684ad7cf400b5c617f62ac118aa105f16193/runtime/runtime/src/actions.rs#L136)) with the `near-vm-logic` (NEAR bindings) injected (See the [Runtime Diagram](https://nomicon.io/images/runtime_architecture.svg) and [Bindings Specification](https://nomicon.io/RuntimeSpec/Components/BindingsSpec/BindingsSpec.html)).

When a cross contract call is made, the `env::promise_batch_create` function is invoked and a new `ActionReceipt` is created ([code here](https://github.com/near/nearcore/blob/d336b3fc1b9dc2167aa2eb9a89e24e4a2a09e27d/runtime/near-vm-logic/src/logic.rs#L1205)).

When a callback is registered, the `env::promise_batch_then` function is invoked and another `ActionReceipt` is created ([code here](https://github.com/near/nearcore/blob/d336b3fc1b9dc2167aa2eb9a89e24e4a2a09e27d/runtime/near-vm-logic/src/logic.rs#L1263)). This time, however, the `ActionReceipt` is created with `receipt_dependencies`, which means the `ActionReceipt` will be postponed until an associated `DataReceipt` is received ([code here](https://github.com/near/nearcore/blob/2ca2684ad7cf400b5c617f62ac118aa105f16193/runtime/runtime/src/lib.rs#L840)).

## Low Level {#low-level}

We can see this process a bit clearer if we use the low-level [Promise Bindings](https://nomicon.io/RuntimeSpec/Components/BindingsSpec/PromisesAPI.html) to make cross contract calls.

```rust
pub fn my_method(&self) {
    // Create a new promise, which will create a new (empty) ActionReceipt
    let promise_id = env::promise_batch_create(
        "wrap.testnet".to_string(), // the recipient of this ActionReceipt (contract account id)
    );

    // attach a function call action to the ActionReceipt
    env::promise_batch_action_function_call(
        promise_id,       // associate the function call with the above Receipt via promise_id
        b"ft_balance_of", // the function call will invoke the ft_balance_of method on the wrap.testnet
        &json!({ "account_id": "rnm.testnet".to_string() }) // method arguments
            .to_string()
            .into_bytes(),
        0,                 // amount of yoctoNEAR to attach
        5_000_000_000_000, // gas to attach
    );

    // Create another promise, which will create another (empty) ActionReceipt.
    // This time, the ActionReceipt is dependent on the previous receipt
    let callback_promise_id = env::promise_batch_then(
        promise_id, // postpone until a DataReceipt associated with promise_id is received
        env::current_account_id(), // the recipient of this ActionReceipt (&self)
    );

    // attach a function call action to the ActionReceipt
    env::promise_batch_action_function_call(
        callback_promise_id, // associate the function call with callback_promise_id
        b"my_callback",      // the function call will be a callback function
        b"{}",               // method arguments
        0,                   // amount of yoctoNEAR to attach
        5_000_000_000_000,   // gas to attach
    );

    // return the resulting DataReceipt from callback_promise_id as the result of this function
    env::promise_return(callback_promise_id);
}
```

## Mid Level {#mid-level}

`near-sdk-rs` provides some intermediate syntax that can help abstract away from all the low level Promise Bindings ([SDK Promise Documentation](https://docs.rs/near-sdk/latest/near_sdk/struct.Promise.html)). Internally `env::promise_batch_create` and `env::promise_batch_then` are still being used ([code here](https://github.com/near/near-sdk-rs/blob/0507deb84da77d83833a4db2563b76e8fe5d0b12/near-sdk/src/promise.rs#L112)).

```rust
pub fn my_method(&self) -> Promise {
    // Create a new promise, which will create a new (empty) ActionReceipt
    // Internally this will use env:promise_batch_create
    let cross_contract_call = Promise::new(
        "wrap.testnet".to_string(), // the recipient of this ActionReceipt (contract account id)
    )
    // attach a function call action to the ActionReceipt
    .function_call(
        b"ft_balance_of".to_vec(), // the function call will invoke the ft_balance_of method on the wrap.testnet
        json!({ "account_id": "rnm.testnet".to_string() }) // method arguments
            .to_string()
            .into_bytes(),
        0,                 // amount of yoctoNEAR to attach
        5_000_000_000_000, // gas to attach
    );

    // Create another promise, which will create another (empty) ActionReceipt.
    let callback = Promise::new(
        env::current_account_id(), // the recipient of this ActionReceipt (&self)
    )
    .function_call(
        b"my_callback".to_vec(), // the function call will be a callback function
        b"{}".to_vec(),          // method arguments
        0,                       // amount of yoctoNEAR to attach
        5_000_000_000_000,       // gas to attach
    );

    // Make the callback ActionReceipt dependent on the cross_contract_call ActionReceipt
    // callback will now remain postponed until cross_contract_call finishes
    cross_contract_call.then(callback)
}
```

## High Level {#high-level}

Ultimately, `near-sdk-rs` abstracts away from all the internal `Receipt` and `Promise` details. Instead, using the `ext_contract` macro a developer can define the interface of a contract and then use that interface to make cross contract calls. Under the hood, the `Promise::new` method is used to create a `Promise` and eventually create an `ActionReceipt` with either `env::promise_batch_create` or `env::promise_batch_then` ([code here](https://github.com/near/near-sdk-rs/blob/9d99077c6acfde68c06845f2a1eb2b5ed7983401/near-sdk-core/src/code_generator/trait_item_method_info.rs#L21)).

```rust
// define an interface for the other contract
#[ext_contract(ext_ft)]
trait FungibleToken {
    fn ft_balance_of(&self, account_id: String) -> U128;
}

// define an interface for callbacks
#[ext_contract(ext_self)]
trait SelfContract {
    fn my_callback(&self) -> String;
}

// ...

pub fn my_method_high(&self) -> Promise {
    // This creates a new ActionReceipt with a function call action
    // Ultimately this uses env:promise_batch_create via Promise::new
    ext_ft::ft_balance_of(
        "rnm.testnet".to_string(), // method arguments (ft_balance_of takes an account id)
        &"wrap.testnet",           // the recipient of this ActionReceipt (contract account id)
        0,                         // amount of yoctoNEAR to attach
        5_000_000_000_000,         // gas to attach
    )
    // Make the ext_self::my_callback ActionReceipt dependent on the ext_ft::ft_balance_of ActionReceipt
    .then(ext_self::my_callback(
        &env::current_account_id(),
        0,                 // amount of yoctoNEAR to attach
        5_000_000_000_000, // gas to attach
    ))
}
```
