---
id: anatomy
title: Anatomy of a Contract
#sidebar_label: 🧠 Anatomy of a Contract
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"


When writing smart contracts you will leverage common programming concepts such as types, collections, modules, interfaces, objects and more. While language-specific implementation may vary, the main anatomy of a smart contract usually follows the same patterns.

---

## Anatomy of a Donation

Let's look at a simple contract whose main purpose is to allow users to donate $NEAR to a specific account. Particularly, the contract keeps track of a `beneficiary` account and exposes a `donation` function that forwards the money and keeps track of the donation info. Take a quick peek at the snippet bellow and then continue to the [modules](#modules) section.  

:::tip
This contract is written for educational purposes only.
:::

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
            start="1" end="44" />
    <Github fname="model.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/index.ts"/>
    <Github fname="model.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" />
  </Language>
</CodeTabs>

---

## Modules
When writing smart contracts you will leverage imports to organize your code, and reuse third-party libraries.

The main library you will use while writing smart contracts is the NEAR SDK. This can be seen at the top of the donation smart contract.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value={0} label="🦀 - Rust">

  ```rust
    use near_sdk::collections::Vector;
    use near_sdk::{env, log, near_bindgen, AccountId, Promise, Balance};
  ```

  </TabItem>

  <TabItem value={1} label="🚀 - AssemblyScript">

  ```ts
    import { u128, context, logging, ContractPromiseBatch } from "near-sdk-as";
    import { STORAGE_COST, Donation, add_donation, get_donation,
            set_beneficiary, get_beneficiary, get_number_of_donation } from "./model";
  ```

  </TabItem>
</Tabs>

The NEAR SDK defines methods to, among other things:

1. Understand the context of a transaction (e.g. who started it, how much money they sent, etc...).
2. Handle the state (storage) of the smart contract.
3. Transfer money to other users/contracts.
4. Interact with other smart contracts.

---
## Contract's Interface
Smart contracts expose an interface so users in the blockchain can interact with them. A contract's interface is made of all the callable functions that live in the codebase.

### Initialization Functions
When smart contracts are deployed to the blockchain, the variables must be initialized with a starting value. This is done automatically by default but it's very common to overload this behavior by creating a custom initialization function.

For example, in the donation contract, a `beneficiary` account is stored on the contract as a string. When the contract is deployed, we wouldn't want that account to be defaulted to an empty string `""`. This is why we created the `new` method, which takes in an account ID as a parameter and sets the `beneficiary` variable. 

You can see that it has a macro `#[init]` at the top which essentially does all the hard work behind the scenes such as making sure the state hasn't been set yet when calling the function.

TODO: Add Rust init function code here

:::warning
In AssemblyScript there is no `#[init]` macro. You can create one yourself, as in the example above, but be mindful that, as any other method, it could be called multiple times. You can force the function to work only once by adding the following code:

```ts
  const initialized: bool = storage.getPrimitive<bool>('initialized', false)
  assert(!initialized, "Already initialized")
  storage.set<bool>('initialized', true)
```
:::

### Public and Private methods
All public methods that are exposed will be **callable by all users** in the blockchain. In the donation contract above, such methods are:

1. `donate`: A method in which the users attaches NEAR in to donate.
2. `get_donation_by_number`: Returns a recorded donation, stating how much a user donated.
3. `new`: Enables to initialize the contract with a specific `beneficiary`. This function is made private by enforcing that the caller is the contract account itself.

All the other private functions can only be called from within the contract itself.

---

## Typed Variables

Smart contracts store typed values within them. The data types available are: `u8`, `u16`, `u32`, `u64`, `u128`, and their signed counterparts. Furthermore, the SDKs expose collections such as `Vector` and `Map` to simplify handling data. We cover this topic in depth on the [Storage](storage.md) section. 

There are two things to be aware of at a high level when dealing with storage. First, underflow and overflow errors can occur and often it's a good idea to check when doing operations. Second, in Rust, the contract's attributes are stored in `Self`. With AssemblyScript, you need to explicitly rely on the `storage` object to store attributes.

:::tip
In Rust, we are also relying on the `env::storage` object to store the contract's state. This, however, gets abstracted away by the SDK.
:::

:::warning
Remember to check for possible underflow and overflows! In rust, you can do this by simply adding the `overflow-checks = true` flag in your `Cargo.toml`.
:::

---

## Classes, NEAR Bindgen and Serialization

You might have notice in the examples that some structs have the `#[near_bindgen]` macro and in Rust, derive Borsch serialization or serde serialization.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" start="8" end="20" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/model.ts" start="4" end="10"/>
  </Language>
</CodeTabs>

The `#[near_bindgen]` macro is used on a struct and the function implementations to generate the necessary code to be a valid NEAR contract and expose the intended functions to be able to be called externally.

Borsch serialization is needed for optimal internal state serialization and serde for external JSON serialization.

<blockquote class="lesson">
<strong>Can I use external libraries in my contract?</strong><br /><br />
  
Most libraries should still be usable. However, we do have a size limit for a compiled binary of a contract which is ~4.19 MB so it is possible that certain large libraries will not be compatible. As a general rule of thumb for Rust, anything that supports `wasm32-unknown-unknown` will be compatible with your smart contract.
</blockquote>