---
id: functions
title: External Interface
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import CodeBlock from '@theme/CodeBlock'
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Smart contracts expose functions so users can interact with them. There are different types of functions including `read-only`, `private` and `payable`.

<ExplainCode languages="js,rust">

<Block highlights='{"js": "14-17,20-39,42-44,47-49", "rust": "22-30,33-58,60-62,64-66"}' fname="auction">

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

<Block highlights='{"js":"13-17", "rust": "22-30"}' fname="auction">

### Initialization Functions
A contract can opt to have an initialization function. If present, this function must be called before any other to [initialize the contract](./storage.md).

</Block>

<Block highlights='{"js": "13"}' fname="auction">

#### `@initialize({ privateFunction: true })`
The initialization function is marked with the `@initialize` decorator.

</Block>

<Block highlights='{"rust": "20"}' fname="auction">

#### `#[init]`
Read-only functions are those that take an **immutable** reference to `self` in Rust.

</Block>

<Block highlights='{"js":"14-17", "rust": "33-58"}' fname="auction">

### State Changing Functions
The functions that modify the [state](./storage.md) or perform [actions](./actions.md) need to be called by a user with a NEAR account, since a transaction is required to execute them.

</Block>

<Block highlights='{"js": "19"}' fname="auction">

#### `@call`
State changing functions are marked with the `@call` decorator.

</Block>

<Block highlights='{"rust": "33"}' fname="auction">

#### `mut &self`
State changing functions are those that take a **mutable** reference to `self` in Rust.

</Block>

<Block highlights='{"js": "22,26", "rust": "36,42"}' fname="auction" type='info'>

:::tip

The SDK provides [contextual information](./environment.md), such as which account is calling the function, or what time it is.

:::

</Block>

<Block highlights='{"js":"42-44,47-49", "rust": "60-62,64-66"}' fname="auction">

### Read-Only Functions
Contract's functions can be read-only, meaning they don't modify the state. Calling them is free for everyone, and does not require to have a NEAR account.

</Block>

<Block highlights='{"js": "41,46"}' fname="auction">

#### `@view`
Read-only functions are marked with the `@view` decorator in TS/JS.

</Block>

<Block highlights='{"rust": "60,64"}' fname="auction">

#### `&self`
Read-only functions are those that take an **immutable** reference to `self` in Rust.

</Block>

<Block highlights='{"js":"13", "rust": "21"}' fname="auction">

### Private Functions
Many times you will want to have functions that **are exposed** as part of the contract's interface, but **should not be called directly** by users.

Besides initialization functions, [callbacks from cross-contract calls](./crosscontract.md) should always be `private`.

These functions are marked as `private` in the contract's code, and can only be called by the contract itself.

</Block>

<Block highlights='{"js": "13"}' fname="auction">

#### `decorator({privateFunction: true})`
Private functions are marked by setting `privateFunction: true` in the `@call` or `@initialization` decorators.

</Block>

<Block highlights='{"rust": "21"}' fname="auction">

#### [#private]
Private functions are marked using the `#[private]` macro in Rust.

</Block>

<Block highlights='{"js":"19,25", "rust": "32,41"}' fname="auction">

### Payable Functions
By default, functions will panic if the user attaches NEAR Tokens to the call. Functions that accept NEAR Tokens must be marked as `payable`.

Within the function, the user will have access to the [attached deposit](./environment.md).

</Block>

<Block highlights='{"js": "19,25"}' fname="auction">

#### `@call({payableFunction: true})`
Payable functions are marked by setting `payableFunction: true` in the `@call` decorator.

</Block>

<Block highlights='{"rust": "32,41"}' fname="auction">

#### [#payable]
Payable functions are marked using the `#[payable]` macro in Rust.

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


<Block highlights='{"rust": "9-11,13-15"}' fname="example">

### Pure Functions
Pure functions are a special kind of function that do not require to access data from the state.

They are useful to return hardcoded values on the contract.

</Block>

<File language="js" fname="auction" url="https://github.com/near-examples/auction-examples/blob/main/contract-ts/src/contract.ts" start="2" end="51" />

<File language="rust" fname="auction" url="https://github.com/near-examples/auction-examples/blob/main/contract-rs/src/lib.rs" start="2" end="68" />

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
  fn internal_helper(mut &self, params... ){
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

</ExplainCode>
