---
id: anatomy
title: Anatomy of a Contract
sidebar_label: Types, Classes & Modules
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"


When writing smart contracts you will leverage common programming concepts such as types, collections, modules, interfaces, objects and more.

While language-specific implementation may vary, the main anatomy of a smart contract usually follows the same patterns.

---

## First Example: A Donation Contract
Let's look at a simple contract whose main purpose is to allow users to donate $NEAR to a specific account. Particularly, the contract stores a `beneficiary` account, and exposes a method to give them money while keeping track of the donation.

Take a quick peek at the snippet bellow and then continue to the [modules](#modules) section.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/donation-js/blob/master/contract/src/index.ts"
            start="1" end="55" />
    <Github fname="model.js"
            url="https://github.com/near-examples/donation-js/blob/master/contract/src/model.ts" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
            start="1" end="74" />
    <Github fname="views.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/views.rs" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/index.ts"
            start="1" end="29" />
    <Github fname="model.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" />
  </Language>
</CodeTabs>

---

## Modules
When writing smart contracts you will leverage modules to organize your code, and reuse third-party libraries.

The main library you will see present in all contracts is the NEAR SDK. You can find it for example in the donation contract among the first lines:

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  ```js
    import { NearContract, NearBindgen, near, call, view, UnorderedMap, Vector } from 'near-sdk-js'
  ```

  </TabItem>
  <TabItem value="🦀 Rust">

  ```rust
    use near_sdk::collections::Vector;
    use near_sdk::{env, log, near_bindgen, AccountId, Promise, Balance};
  ```

  </TabItem>

  <TabItem value="🚀 AssemblyScript" >

  ```ts
    import { u128, context, logging, ContractPromiseBatch } from "near-sdk-as";
    import { STORAGE_COST, Donation, add_donation, get_donation,
            set_beneficiary, get_beneficiary, get_number_of_donation } from "./model";
  ```

  </TabItem>
</Tabs>

The NEAR SDK defines methods to, among other things:

1. Understand the [context of an execution](environment/environment.md) (e.g. who started it, how much money they sent, etc...).
2. Handle the [state (storage)](storage.md) of the smart contract.
3. [Transfer money](actions.md) to other users/contracts.
4. [Call methods in other contracts](crosscontract.md).

:::info Using external libraries
As a general rule of thumb for Rust, anything that supports `wasm32-unknown-unknown` will be compatible with your smart contract.
However, we do have a size limit for a compiled binary of a contract which is ~4.19 MB so it is possible that certain large libraries will not be compatible.
:::

---

## Contract's Interface
Smart contracts expose an interface so users in the blockchain can interact with them. A contract's interface is made of all the callable functions that live in the codebase.

<hr class="subsection" />

### Initialization Functions
When contracts are deployed to the blockchain, their variables must be initialized. There are two ways to initialize contracts: with an `init` method, or using a `default` initialization.

#### Init Method
`init` methods define the parameters needed to initialize the contract and need to be manually called. In general you will
want to make these methods private programmatically.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="index.ts" language="js"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/index.ts"
          start="10" end="14" />

  🌐 - In JavaScript you need to call the `init` method to invoke the contract's constructor.

  </TabItem>
  <TabItem value="🦀 Rust">

  <Github fname="lib.rs" language="rust"
          url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
          start="28" end="36" />

  🦀 - Notice that the `new` method has two macros at the top: `#[init]` and `#[private]`. `#[init]` limits the method to be callable only once, meanwhile `#[private]` makes the method only callable by the contract's account.

  </TabItem>

  <TabItem value="🚀 AssemblyScript">

  ```ts
    // Public - init function, define the beneficiary of donations
    export function init(beneficiary: string): void {
      assert(context.predecessor == context.contractName, "Method new is private");
      set_beneficiary(beneficiary);
    }
  ```

  🚀 - In AssemblyScript there is no `#[init]` macro. You can create one yourself, as in the example above, but be mindful that, as any other method, it could be called multiple times. You can force the function to work only once by adding the following code:

  ```ts
    const initialized: bool = storage.getPrimitive<bool>('init', false)
    assert(!initialized, "Already initialized")
    storage.set<bool>('init', true)
  ```

  </TabItem>
</Tabs>

#### Default Method
The `default` method defines the default parameters to initialize the contract. If any method is invoked before a call to `init` happens, then contract will use the `default` values.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="index.js" language="js"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/index.ts"
          start="16" end="16" />

  **Note:** The `default` method is still a work in progress in javascript.

  </TabItem>
  <TabItem value="🦀 Rust">

  <Github fname="lib.rs" language="rust"
          url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
          start="17" end="24" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Public and Private methods
All public methods that are exposed will be **callable by all users** in the blockchain. In the donation contract above, such methods are:

1. `donate`: A method in which the users attaches NEAR in to donate.
2. `get_donation_by_number`: Returns a recorded donation, stating how much a user donated.
3. `new`: Enables to initialize the contract with a specific `beneficiary`. This function is made private by enforcing that the caller is the contract account itself.

All the other private functions can only be called from within the contract itself.

---

## Contract's State (Storage)

Smart contracts store typed values and data structures within them. We cover this topic in depth on [Storage & Data Structures](storage.md), but basically:
1. The contracts natively handle `u8`, `u16`, `u32`, `u64`, `u128` and their signed counterparts.
2. The NEAR SDK exposes collections such as `Vector` and `Map` to simplify handling complex data.

In reality, contracts use a **key-value storage** and the SDK handles [serializing](#near-bindgen-and-serialization) objects for you. 

:::warning
Always make sure to check for **underflow** and **overflow** errors. For Rust, simply add `overflow-checks=true` in your `Cargo`.
:::

---

## NEAR Bindgen and Serialization

You might have notice in the donation example that some structures use the `NEAR Bindgen` decorator/macro and, in Rust, derive Borsh or serde serialization.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github url="https://github.com/near-examples/donation-js/blob/master/contract/src/index.ts" start="5" end="8" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs" start="10" end="15" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" start="4" end="10"/>
  </Language>
</CodeTabs>

The `NEAR Bindgen` decorator/macro generates the necessary code to:
1. Transform the code into a valid NEAR contract.
2. Expose public methods, so they can be called externally.
3. Serialize objects for internal storage and communication with external actors.

With respect to the serialization, it is important to know that:
1. In Javascript the storage is serialized using JSON, as well as the contract's input and output.  
2. In Rust, the objects are stored internally using Borsh, while the input/output is serialized using JSON.

:::tip
Contracts communicate using values encoded in JSON.
:::