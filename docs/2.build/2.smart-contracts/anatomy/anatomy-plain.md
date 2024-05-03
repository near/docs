---
id: anatomy-plain-text
title: The Contract Class
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Your contract's logic and state (storage) is defined by the [main class](#near-bindgen), in which:

1. The attributes define the [contract's state](#defining-the-state)
2. The [initialization methods](#initializing-the-state) define how to initialize the contract's state
3. The public methods act as the contract's interface with the rest of the network

:::tip
This is the plain text version of [the anatomy page](./anatomy.md), if you prefer a more interactive version, check the original page.
:::

---

## Modules

Modules help you to organize your code and reuse third-party libraries.

The main module you will use in your contract will be the **NEAR SDK**, which: gives you access to the [execution environment](./environment.md), allows you to [call other contracts](./crosscontract.md), [transfer tokens](./actions.md), and much more.

<CodeTabs>
  <Language value="js" label="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
      start="1" end="3" />

</Language>

<Language value="rust"language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
      start="1" end="6" />

</Language>

</CodeTabs>

:::info Using external libraries

As a general rule of thumb for Rust, anything that supports `wasm32-unknown-unknown` will be compatible with your smart contract.
However, we do have a size limit for a compiled contract binary which is ~4.19 MB, so it is possible that certain large libraries will not be compatible.

:::

---

## Native Types

When writing contracts you have access to **all** the language's **native types**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```ts
number, bigint, string, [], {} ...
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
u8, u16, u32, u64, u128, i8, i16, i32, i64, i128, Vec<T>, HashMap<K,V> ...
```

</TabItem>

</Tabs>

:::tip
Always prefer **native** types in the contract's **interface**. The only exception is values larger than `52 bits` (such as `u64` and `u128`), for which string-like alternatives are preferred.
:::

:::warning
Always make sure to check for **underflow** and **overflow** errors. For Rust, simply add `overflow-checks=true` in your `Cargo`.
:::

---

## SDK Collections

Besides the native types, the NEAR SDK implements [collections](./storage.md) such as `Vector` and `UnorderedMap`
to help you store complex data in the contract's state.

<CodeTabs>
  <Language value="js" label="🌐 JavaScript" language="js">
    <Github fname="index.js"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-js/src/index.ts"
          start="8" end="11" />

</Language>

<Language value="rust"language="rust">
    <Github fname="lib.rs"
          url="https://github.com/near-examples/docs-examples/blob/main/storage-rs/contract/src/lib.rs" start="33" end="36"/>

</Language>

</CodeTabs>

:::tip
Always prefer **SDK collections** over native ones in the contract's **[attributes (state)](../anatomy/anatomy.md#defining-the-state)**.
:::

---

## Internal Structures

You can define and instantiate complex objects through classes and structures.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="model.ts" language="ts"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/model.ts"
      start="3" end="11" />

</TabItem>

<TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
      start="11" end="16" />

</TabItem>

</Tabs>

  🦀 Notice that the struct is decorated with multiple macros:

- `BorshDeserialize` & `BorshSerialize` allow the structure to be read and
      written into the contract's state
- `Serialize` & `Deserialize` allow the structure to be used as an input type and
      return type of the contract's methods.

:::tip

If you are curious on why the (de)serialization is needed read our [serialization documentation](./serialization.md)

:::

---

## Defining the Contract

The contract is just another class, with its own attributes and methods. To **differentiate it** from other
internal classes simply decorate it using the [`NEAR Bindgen` decorator/macro](#decorators--macros).

<CodeTabs>
  <Language value="js" label="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
      start="6" end="9" />

</Language>

<Language value="rust"language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
      start="13" end="16" />

</Language>

</CodeTabs>

Under the hood, the `NEAR Bindgen` decorator/macro traverses the class, generating the necessary code to:

1. Transform the code into a valid NEAR contract.
2. Expose public methods, so they can be called externally.
3. Serialize objects for internal storage and communication with external actors.

<hr className="subsection" />

### The State

Each account has its own state (storage), which **only they can modify** but [anyone can see](../../../4.tools/cli.md#near-view-state-near-view-state).

The state is defined and modified through the **main class' attributes**.

Contracts [**pay for their storage**](./storage.md#storage-cost) by locking part of their balance. Currently it costs **~1 Ⓝ** to store **100kb**

:::info Key-Value Storage

The contract actually uses a `key-value` storage to persist values. This however is abstracted from you
by the SDK through [serialization](./serialization.md).

:::

:::tip Prefer SDK Collections

When defining attributes, **always prefer [SDK collections](./storage.md)** over native ones, since they are optimized for [serialization](./serialization.md).

:::

---

## Initializing the State

There are two ways to initialize the account's state, and they can co-exist:

1. An **initialization method** that receives the attributes needed for the state
2. A **default state**, which will be used until `init` is invoked, or a method writes into the state

<hr className="subsection" />

### Initialization Method

To define an initialization method simply decorate it with the [initialization macro](#decorators--macros).

The method will now be able to define the initial state's values, raising an error if invoked
while **the state is already initialized**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
          start="11" end="14" />

:::info
To make the initialization mandatory use `@NearBindgen({requireInit: true})`
:::

:::caution
In JavaScript you **must always** define a [default state](#default-state)
:::

</TabItem>

<TabItem value="rust" label="🦀 Rust">

  <Github fname="lib.rs" language="rust"
          url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
          start="35" end="40" />

:::info
To make the initialization mandatory use `#[derive(PanicOnDefault)]` in the contract's structure
:::

</TabItem>

</Tabs>

<hr className="subsection" />

### Default State

Contracts can define a **default state** to use if no initialize method is called. This is, if any method is invoked
before an `init` happens, the contract will use the default values.

Once any method writes into the state, the state will be considered initialized.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
          start="6" end="9" />

  🌐 In JavaScript, the default state is defined by the initialization parameters in the class definition.

:::caution
In Javascript you **must always** assign values to **all the class' parameters**. This ensures they get correctly [deserialized](./serialization.md) to their intended type.
:::

</TabItem>

<TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="19" end="26" />

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

    @initialize({ ... })
    init({ ... }) { /* public `init` method */ }

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

<TabItem value="rust" label="🦀 Rust">

```rust
  #[near_bindgen]
  impl Contract {
    #[init]
    pub fn init( ... ) -> Self { /* public `init` method */ }
    pub fn get_message(&self, ... ) { /* public `view` method */ }
    pub fn add_message(&mut self, ... ) { /* public `call` method */ }
    fn internal_search(&self, ... ) { /* private internal method */ }

    #[private]
    pub fn set_owner(&mut self, ... ) { /* public, panics when caller is not the contract's account */ }
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

### Public Methods

Public methods can be categorized in three types: `init` methods, `view` methods, and `call` methods.

- **Init Methods**: They define how to initialize the state of the contract.
- **View Methods**: Do **not mutate** the state **nor call** other contracts. They can
be called for free by everyone, **without needing** a NEAR account.
- **Call Methods**: They can mutate the state and perform [actions](./actions.md) such
as calling other contracts.

:::caution
By default `view` methods have `200TGas` to execute, to increase this you can simply invoke them
as `call` methods.
:::

:::danger
By default `init` methods are public, make sure to [decorate them as `private`](#private-methods), or [batch call the initialization on deploy](../release/deploy.md#initializing-the-contract)
:::

<hr className="subsection" />

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

<TabItem value="rust" label="🦀 Rust">

```rust
  #[private]
  pub fn callback(&mut self, ... ){
    // this method can only be called by the contract's account
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

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

<TabItem value="rust" label="🦀 Rust">

```rust
  #[payable]
  pub fn deposit_and_stake(&mut self, ... ){
    // this method can receive money from the user
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

### Input & Return Types

The contract can receive and return any `native type`, including complex structures. However,
since contracts communicate through their interface [using JSON](./serialization.md):

- Always prefer **`native types`** over `SDK Collections` in the input & return types.
- Replace `u64`/`u128` for `strings` (`U64`/`U128` in the Rust SDK).
