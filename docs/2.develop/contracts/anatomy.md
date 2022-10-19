---
id: anatomy
title: The Contract Class
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Your contract's logic and state (storage) is defined by the [main class](#near-bindgen), in which:
1. The attributes define the [contract's state](#defining-the-state)
2. The [initialization methods](#initializing-the-state) define how to initialize the contract's state
3. The public methods act as the contract's interface with the rest of the network

---

## Defining the Contract
The contract is just another class, with its own attributes and methods. To **differentiate it** from other
internal classes simply decorate it using the [`NEAR Bindgen` decorator/macro](#decorators--macros).

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
      start="5" end="9" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
      start="7" end="12" />
  </Language>
</CodeTabs>

Under the hood, the `NEAR Bindgen` decorator/macro traverses the class, generating the necessary code to:

1. Transform the code into a valid NEAR contract.
2. Expose public methods, so they can be called externally.
3. Serialize objects for internal storage and communication with external actors.

<hr class="subsection" />

### The State
Each account has its own state (storage), which **only they can modify** but [anyone can see](../../4.tools/cli.md#near-view-state-near-view-state).

The state is defined by the **main class' attributes** and also modified through them.

:::info Key-Value Storage
The contract actually uses a key-value storage to persist values. This however is abstracted from you
by the SDK through [serialization](./serialization.md).
:::

:::tip Prefer SDK Collections
When defining attributes, **always prefer [SDK collections](./storage.md)**
over native collections, since they are optimized for [serialization](./serialization.md).
:::

---

## Initializing the State
There are two ways to initialize the accounts's state, and they an co-exist:
1. An **initialization method** that receives the attributes needed for the state
2. A **default state**, which will be used until `init` in invoked, or a method writes into the state


<hr class="subsection" />

### Initialization Method
To define an initialization method simply decorate it with the [initialization macro](#decorators--macros).

The method will now be able to define the initial values of the state, raising an error if invoked
while **the state is already initialized**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
          start="10" end="13" />


:::info
To make the initialization mandatory use `@NearBindgen({requireInit: true})`
:::

:::caution
In Javascript you **must always** define a [default state](#default-state)
:::


  </TabItem>
  <TabItem value="🦀 Rust">

  <Github fname="lib.rs" language="rust"
          url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
          start="25" end="32" />

:::info
To make the initialization mandatory use `#[derive(PanicOnDefault)]` in the contract's structure
:::


  </TabItem>
  <TabItem value="🚀 AssemblyScript">

  ```ts
    // Public - init function, define the beneficiary of donations
    export function init(beneficiary: string): void {
      assert(context.predecessor == context.contractName, "Method new is private");
      set_beneficiary(beneficiary);
    }
  ```

  🚀 - AssemblyScript has no `#[init]` macro, and any method can be called multiple times. Limit this by adding a flag:

  ```ts
    const initialized: bool = storage.getPrimitive<bool>('init', false)
    assert(!initialized, "Already initialized")
    storage.set<bool>('init', true)
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Default State
Contracts can define a **default state** to use if no initialize method is called. This is, if any method is invoked
before an `init` happens, the contract will use the default values.

Once any method writes into the state, the state will be considered initialized.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
          start="6" end="8" />

  🌐 In JavaScript, the default state is defined by the initialization parameters in the class definition.


:::caution
In Javascript you **must always** give a value to **all parameters** of the class.
:::


  </TabItem>
  <TabItem value="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
            start="14" end="21" />
  </TabItem>
</Tabs>



---



## Interface 
All the **public methods** are exposed to the network as the contract's interface.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```ts
  @NearBindgen({})
  class Contract {

    @view({})
    get_message({ ...  }) { /* public `view` method */ }
  
    @call({})
    add_message({ ... }) { /* public `call` method */ }

    private internal_search( ... ) { /* private internal method */ }

    @call({privateFunction: true})
    set_owner({ ... }) { /* public, panics when caller is not the contract's account */ }
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  #[near_bindgen]
  impl Contract {
    pub fn get_message(&self, ... ) { /* public `view` method */ }
    pub fn add_message(&mut self, ... ) { /* public `call` method */ }
    fn internal_search(&self, ... ) { /* private internal method */ }

    #[private]
    pub fn set_owner(&mut self, ... ) { /* public, panics when caller is not the contract's account */ }
  }
  ```

  </TabItem>
  <TabItem value="🚀 AssemblyScript" >

  ```ts
  export function get_message({ ...  }) { ... }
  export function set_owner({ ... }) { ... }
  export function add_message({ ... }) { ... }
  private function internal_search( ... ) { ... }
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### View & Call Methods
Public methods can be categorized in two types: `view` methods, and `call` methods.

- **View Methods**: Do **not mutate** the state **nor call** other contracts. They can 
be called for free by everyone, **without needing** a NEAR account.
- **Call Methods**: They can mutate the state and perform [actions](./actions.md) such
as calling other contracts.

:::caution
By default `view` methods have `200TGas` to execute, to increase this you can simple invoke them
as `call` methods
:::

<hr class="subsection" />

### Private Methods
Sometimes you will want some methods to remain public, but only be callable by the contract's
account. Such is the case for example of [cross-contract callbacks](./crosscontract.md#callback-method).

For this, you can use the `private` macro/decorator.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```ts
  @call({privateFunction: true})
  callback( ... ){
    // this method can only be called by the contract's account
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  #[private]
  pub fn callback(&mut self, ... ){
    // this method can only be called by the contract's account
  }
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### Payable Methods
By default **all methods panic** if a user **attaches money** while calling them. To enable a
method to receive money use the payable decorator.
<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```ts
  @call({payableFunction: true})
  deposit_and_stake( ... ){
    // this method can receive money from the user
  }
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
  #[payable]
  pub fn deposit_and_stake(&mut self, ... ){
    // this method can receive money from the user
  }
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />


### Input & Return Types
The contract can receive and return any `native type`, including complex structures. However,
since contracts communicate through their interface [using JSON](./serialization.md):
- Always prefer **`native types`** over `SDK Collections` in the input & return types.
- Replace `u64`/`u128` for `strings` (`U64`/`U128` in the Rust SDK).
