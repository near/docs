---
id: crosscontract
title: Cross-Contract Calls
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs'

Cross-contract calls allow your contract to interact with other deployed contracts. This is useful for:

1. Querying information from another contract.
2. Executing a method in another contract.

#### Cross-Contract Calls are **Independent**
The method in which you make the call and the method in which you receive the result are different.

#### Cross-Contract Calls are **Asynchronous**
There is a delay between the call and the callback in which everyone can still interact with your contract.

---

## Snippet: Querying Information

While making your contract, it is likely that you will want to query information from another contract. Below, you can see a basic example in which we query the greeting message from our [Hello NEAR](quickstart.md) example.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/contract/src/contract.ts"
            start="17" end="39" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/lib.rs"
            start="24" end="49" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/external.rs" />
  </Language>
</CodeTabs>

---

## Snippet: Sending Information
Calling another contract passing information is also a common scenario. Bellow you can see a method that interacts with the [Hello NEAR](quickstart.md) example to change its greeting message.

<CodeTabs>
<Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/contract/src/contract.ts"
            start="41" end="64" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/lib.rs"
            start="51" end="74" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/external.rs" />
  </Language>
</CodeTabs>

---

## Promises
Cross-contract calls work by creating two promises in the network:
1. A promise to execute code in the external contract (`Promise.create`).
2. A promise to call back a **different** method in your contract with the result (`Promise.then`).

Both promises take the same arguments:
<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    
  ```ts
  NearPromise.new("external_address").functionCall("method", JSON.stringify(arguments), DEPOSIT, GAS);
  ```

  </Language>
  <Language value="🦀 Rust" language="rust">

  ```rust
  external_trait::ext("external_address")
  .with_attached_deposit(DEPOSIT)
  .with_static_gas(GAS)
  .method(arguments);
  ```

  </Language>
</CodeTabs>

   - The address of the contract you want to interact with
   - The method that you want to execute
   - The (**encoded**) arguments to pass to the method
   - The amount of GAS to use (deducted from the **attached Gas**)
   - The amount of NEAR to attach (deducted from **your contract’s balance**)

:::tip Notice that the callback could be made to **any** contract. This means that, if you want, the result could be potentially handled by another contract. :::

:::caution The fact that you are creating a Promise means that both the cross-contract call and callback will **not execute immediately**. In fact:
- The cross-contract call will execute 1 or 2 blocks after your method finishes **correctly**.
- The callback will then execute 1 or 2 blocks after the **external** method finishes (**correctly or not**) :::

---

## Callback Method
If your method finishes correctly, then eventually your callback method will execute. This will happen whether the external contract finishes **successfully or not**. We repeat, if your original method finishes correctly, then your callback will **always execute**.

In the callback method you will have access to the result, which contains two important arguments:
- `status`: Telling if the external method finished successfully or not
- `buffer`: Having the value returned by the external method (if any)

:::tip The callback methods in your contract must be public, so it can be called when the second promise executes. However, they should be only callable by **your contract**. Always make sure to make it private by asserting that the `predecessor` is `current_account_id`. In rust this can be achieved using the `#[private]` decorator. :::

### Checking Execution Status
<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/contract/src/contract.ts"
            start="31" end="38" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/lib.rs"
            start="67" end="73" />
  </Language>
</CodeTabs>

### Successful Execution
In case the call finishes successfully, the resulting object will have a `status` of 1, and the `buffer` will have the encoded result (if any). In order to recover the result you need to decode it from the resulting `buffer`:

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-hello-js/blob/master/contract/src/contract.ts"
            start="31" end="31" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.ts"
            url="https://github.com/near-examples/cross-contract-hello-rust/blob/main/contract/src/lib.rs"
            start="47" end="47" />
  </Language>
</CodeTabs>

### Failed Execution
If the external method fails (i.e. it panics), then your callback will be **executed anyway**. Here you need to **manually rollback** any changes made in your contract during the original call. Particularly:

1. If the contract attached NEAR to the call, the funds are sent back to **the contract's account**.
2. If the original method made any state changes (i.e. changed or stored data), they **won't be automatically reverted**.

:::warning If your original method finishes correctly then the callback executes **even if the external method panics**. Your state will **not** rollback automatically, and $NEAR will **not** be returned to the signer automatically. Always make sure to check in the callback if the external method failed, and manually rollback any operation if necessary. :::

---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The method in which you make the call and method for the callback are **independent**.
- There is a **delay between the call and the callback**, in which people can still interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Make sure you don't leave the contract in a exploitable state between the call and the callback.
2. Manually rollback any changes to the state in the callback if the external call failed.

We have a whole [security section](./security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning Not following these basic security guidelines could expose your contract to exploits. Please check the [security section](./security/callbacks.md), and if still in doubt, [join us in Discord](https://near.chat). :::
