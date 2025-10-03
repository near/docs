---
id: functions
title: External Interface
hide_table_of_contents: true
description: "Learn how to define your contract's interface."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs";
import CodeBlock from '@theme/CodeBlock';
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Smart contracts expose functions so users can interact with them. There are different types of functions including `read-only`, `private` and `payable`.

<ExplainCode languages="js,rust,python">

<Block highlights='{"js": "16-20,23-42,45-50,53-55,58-60", "rust": "24-34,37-62,64-75,77-79,81-83", "python": "4-22,25-62,65-94,97-99,102-104,107-121"}' fname="auction">

### Contract's Interface

All **public** functions in the contract are part of its **interface**. They can be called by anyone, and are the only way to interact with the contract.

</Block>

<Block highlights='{"rust": ""}' fname="auction" type='details'>

<details>
<summary> Exposing trait implementations </summary>

Functions can also be exposed through trait implementations. This can be useful if implementing a shared interface or standard for a contract. This code generation is handled very similarly to basic `pub` functions, but the `#[near]` macro only needs to be attached to the trait implementation, not the trait itself:

```rust
pub trait MyTrait {
    fn trait_method(&mut self);
}

#[near]
impl MyTrait for MyContractStructure {
    fn trait_method(&mut self) {
        // .. method logic here
    }
}
```

</details>

</Block>

<Block highlights='{"js":"15-20", "rust": "22-34", "python": "4-22"}' fname="auction">

### Initialization Functions

A contract can opt to have an initialization function. If present, this function must be called before any other to [initialize the contract](./storage.md).

</Block>

<Block highlights='{"js": "15"}' fname="auction">

#### `@initialize({ privateFunction: true })`

The initialization function is marked with the `@initialize` decorator.

</Block>

<Block highlights='{"rust": "22"}' fname="auction">

#### `#[init]`

The initialization function is marked with the `#[init]` macro.

</Block>

<Block highlights='{"python": "3"}' fname="auction">

#### `@init`

The initialization function is marked with the `@init` decorator in Python.

</Block>

<Block highlights='{"js":"22-42,44-50", "rust": "37-62,64-75", "python": "25-62,65-94"}' fname="auction">

### State Changing Functions

The functions that modify the [state](./storage.md) or perform [actions](./actions.md) need to be called by a user with a NEAR account, since a transaction is required to execute them.

</Block>

<Block highlights='{"js": "22,44"}' fname="auction">

#### `@call`

State changing functions are marked with the `@call` decorator.

</Block>

<Block highlights='{"rust": "37,64"}' fname="auction">

#### `&mut self`

State changing functions are those that take a **mutable** reference to `self` in Rust.

</Block>

<Block highlights='{"python": "24,64"}' fname="auction">

#### `@call`

State changing functions are marked with the `@call` decorator in Python.

</Block>

<Block highlights='{"js": "25,28,29", "rust": "40,45,46", "python": "109"}' fname="auction" type='info'>

:::tip

The SDK provides [contextual information](./environment.md), such as which account is calling the function, or what time it is.

:::

</Block>

<Block highlights='{"js":"52-55,57-60", "rust": "77-79,81-83", "python": "97-99,102-104,107-121"}' fname="auction">

### Read-Only Functions

Contract's functions can be read-only, meaning they don't modify the state. Calling them is free for everyone, and does not require to have a NEAR account.

</Block>

<Block highlights='{"js": "52,57"}' fname="auction">

#### `@view`

Read-only functions are marked with the `@view` decorator in TS/JS.

</Block>

<Block highlights='{"rust": "77,81"}' fname="auction">

#### `&self`

Read-only functions are those that take an **immutable** reference to `self` in Rust.

</Block>

<Block highlights='{"python": "96,101,106"}' fname="auction">

#### `@view`

Read-only functions are marked with the `@view` decorator in Python.

</Block>

<Block highlights='{"js":"15", "rust": "23", "python": "2"}' fname="auction">

### Private Functions

Many times you will want to have functions that **are exposed** as part of the contract's interface, but **should not be called directly** by users.

Besides initialization functions, [callbacks from cross-contract calls](./crosscontract.md) should always be `private`.

These functions are marked as `private` in the contract's code, and can only be called by the contract itself.

</Block>

<Block highlights='{"js": "15"}' fname="auction">

#### `decorator({privateFunction: true})`

Private functions are marked by setting `privateFunction: true` in the `@call` or `@initialize` decorators.

</Block>

<Block highlights='{"rust": "23"}' fname="auction">

#### [#private]

Private functions are marked using the `#[private]` macro in Rust.

</Block>

<Block highlights='{"python": "2"}' fname="auction">

#### Private Functions in Python

In Python, you can create callbacks by using the `@callback` decorator, which is designed specifically for handling cross-contract call results. For general private functions that should only be called by the contract, you can use validation inside the function to check that the caller is the contract itself.

</Block>

<Block highlights='{"js":"22,28", "rust": "36,45", "python": "25"}' fname="auction">

### Payable Functions

By default, functions will panic if the user attaches NEAR Tokens to the call. Functions that accept NEAR Tokens must be marked as `payable`.

Within the function, the user will have access to the [attached deposit](./environment.md).

</Block>

<Block highlights='{"js": "22,28"}' fname="auction">

#### `@call({payableFunction: true})`

Payable functions are marked by setting `payableFunction: true` in the `@call` decorator.

</Block>

<Block highlights='{"rust": "36,45"}' fname="auction">

#### [#payable]

Payable functions are marked using the `#[payable]` macro in Rust.

</Block>

<Block  fname="auction">

#### Handling payments in Python

In Python, you need to check the deposit manually using the Context API. There isn't a specific decorator for payable functions, so you'll need to verify the deposit amount in your function code.

</Block>

<Block highlights='{"js":"3-5"}' fname="example">

### Internal Functions

All the functions we covered so far are part of the interface, meaning they can be called by an external actor.

However, contracts can also have private internal functions - such as helper or utility functions - that are **not exposed** to the outside world.

To create internal private methods in a JS contract, simply omit the `@view` and `@call` decorators.

</Block>

<Block highlights='{"rust": "5-7"}' fname="example">

### Internal Functions

All the functions we covered so far are part of the interface, meaning they can be called by an external actor.

However, contracts can also have private internal functions - such as helper or utility functions - that are **not exposed** to the outside world.

To create internal private methods in a Rust contract, do not declare them as public (`pub fn`).

</Block>

<Block highlights='{"python": "2-5"}' fname="example">

### Internal Functions

All the functions we covered so far are part of the interface, meaning they can be called by an external actor.

However, contracts can also have private internal functions - such as helper or utility functions - that are **not exposed** to the outside world.

To create internal private methods in a Python contract, simply define normal methods without the `@view`, `@call`, or `@init` decorators.

</Block>

<Block highlights='{"rust": "5-7"}' fname="example" type='details'>

  <details>
  <summary> Separate impl block </summary>

Another way of not exporting methods is by having a separate `impl Contract` section, that is not marked with `#[near]`.

```rust
#[near]
impl Contract {
    pub fn increment(&mut self) {
        self.internal_increment();
    }
}
impl Contract {
    /// This methods is still not exported.
    pub fn internal_increment(&mut self) {
        self.counter += 1;
    }
}
```

  </details>

</Block>

<Block highlights='{"rust": "9-11,13-15", "python": "12-15"}' fname="example">

### Pure Functions

Pure functions are a special kind of function that do not require to access data from the state.

They are useful to return hardcoded values on the contract.

</Block>

<File language="js" fname="auction" url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts" start="2" end="61" />

<File language="rust" fname="auction" url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs" start="2" end="84" />

<File language="python" fname="auction" url="https://github.com/r-near/near-py-examples/blob/main/auction.py" start="2" end="140" />

<CodeBlock language="js" fname="example">

```js
@NearBindgen({})
class Contract {
  helper_function(params... ){
    // this function cannot be called from the outside
  }

  @view({})
  interface_view(params...){
    // this function can be called from outside
  }

  @call({privateFunction: true}){
    // this function can be called from outside, but
    // only by the contract's account
  }
}
```

</CodeBlock>

<CodeBlock language="rust" fname="example">

```rs
const SOME_VALUE: u64 = 8;

#[near]
impl MyContractStructure {
  fn internal_helper(&mut self, params... ){
    // this function cannot be called from the outside
  }

  pub fn public_log(/* Parameters here */) {
      near_sdk::log!("inside log message");
  }

  pub fn return_static_u64() -> u64 {
      SOME_VALUE
  }
}
```

</CodeBlock>

<CodeBlock language="python" fname="example">

```python
class Contract:
    def helper_function(self, params...):
        # This function cannot be called from the outside
        # as it has no decorator
        pass

    @call
    def validate_owner(self):
        if Context.predecessor_account_id() != self.owner_id:
            raise Exception("Only the owner can call this method")

    @view
    def get_static_value(self):
        # This function returns a hardcoded value
        return 42
```

</CodeBlock>

</ExplainCode>
