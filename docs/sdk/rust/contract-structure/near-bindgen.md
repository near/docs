---
sidebar_position: 1
---

# near_bindgen

The `#[near_bindgen]` macro is used on a `struct` and the function implementations to generate the necessary code to be a valid NEAR contract and expose the intended functions to be able to be called externally.

For example, on a simple counter contract, the macro will be applied as such:

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct Counter {
    value: u64,
}

#[near_bindgen]
impl Counter {
    pub fn increment(&mut self) {
        self.value += 1;
    }

    pub fn get_count(&self) -> u64 {
        self.value
    }
}
```

In this example, the `Counter` struct represents the smart contract state and anything that implements `BorshSerialize` and `BorshDeserialize` can be included, even `collections`, which will be covered in the next section. Whenever a function is called, the state will be loaded and deserialized, so it's important to keep this amount of data loaded as minimal as possible.

`#[near_bindgen]` also annotates the `impl` for `Counter` and this will generate any necessary boilerplate to expose the functions. The core interactions that are important to keep in mind:
- Any `pub` functions will be callable externally from any account/contract.
  - For more information, see [public methods](../contract-interface/public-methods.md)
- `self` can be used in multiple ways to control the [mutability of the contract](../contract-interface/contract-mutability.md):
  - Functions that take `&self` or `self` will be read-only and do not write the updated state to storage
  - Functions that take `&mut self` allow for mutating state, and state will always be written back at the end of the function call
- Exposed functions can omit reading and writing to state if `self` is not included in the function params
  - This can be useful for some static functionality or returning data embedded in the contract code
- If the function has a return value, it will be serialized and attached as a result through `env::value_return`

<!-- TODO include link to near_bindgen docs, when they aren't empty -->

## Initialization Methods

By default, the `Default::default()` implementation of a contract will be used to initialize a contract. There can be a custom initialization function which takes parameters or performs custom logic with the following `#[init]` annotation:

```rust
#[near_bindgen]
impl Counter {
    #[init]
    pub fn new(value: u64) -> Self {
        log!("Custom counter initialization!");
        Self { value }
    }
}
```

All contracts are expected to implement `Default`. If you would like to prohibit the default implementation from being used, the `PanicOnDefault` derive macro can be used:

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Counter {
    // ...
}
```

## Payable Methods

Methods can be annotated with `#[payable]` to allow tokens to be transferred with the method invocation. For more information, see [payable methods](../contract-interface/payable-methods.md).

To declare a function as payable, use the `#[payable]` annotation as follows:

```rust
#[payable]
pub fn my_method(&mut self) {
...
}
```

## Private Methods

Some methods need to be exposed to allow the contract to call a method on itself through a promise, but want to disallow any other contract to call it. For this, use the `#[private]` annotation to panic when this method is called externally. See [private methods](../contract-interface/private-methods.md) for more information.

This annotation can be applied to any method through the following:

```rust
#[private]
pub fn my_method(&mut self) {
...
}
```
