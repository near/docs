---
id: crosscontract
title: Cross-Contract Calls
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Your contract can interact with other deployed contracts, **querying** information and **executing functions** on them.

Since NEAR is a sharded blockchain, its cross-contract calls behave differently than calls do in other chains. In NEAR. cross-contract calls are asynchronous and independent.

:::info Cross-Contract Calls are **Independent**

You will need two independent functions: one to make the call, and another to receive the result

:::

:::info Cross-Contract Calls are **Asynchronous**

There is a delay between the call and the callback execution, usually of **1 or 2 blocks**. During this time, the contract is still active and can receive other calls.

:::

---

## Snippet: Querying Information

While making your contract, it is likely that you will want to query information from another contract. Below, you can see a basic example in which we query the greeting message from our [Hello NEAR](../quickstart.md) example.

<CodeTabs>
<Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="18" end="52" />

</Language>

<Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="22" end="51" />
            <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external.rs"
            start="2" end="12" />

</Language>

</CodeTabs>

---

## Snippet: Sending Information
Calling another contract passing information is also a common scenario. Below you can see a function that interacts with the [Hello NEAR](../quickstart.md) example to change its greeting message.

<CodeTabs>
<Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="54" end="87" />

</Language>

<Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="53" end="80" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external.rs"
            start="2" end="12" />

</Language>

</CodeTabs>

---

## Promises
Cross-contract calls work by creating two promises in the network:
1. A promise to execute code in the external contract (`Promise.create`)
2. Optional: A promise to call another function with the result (`Promise.then`)

Both promises will contain the following information:

- The address of the contract you want to interact with
- The function that you want to execute
- The (**encoded**) arguments to pass to the function
- The amount of GAS to use (deducted from the **attached Gas**)
- The amount of NEAR to attach (deducted from **your contract’s balance**)

:::tip

The callback can be made to **any** contract. Meaning that the result could potentially be handled by another contract

:::


<hr class="subsection" />

### Creating a Cross Contract Call

To create a cross-contract call with a callback, create two promises and use the `.then` method to link them:


<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

    ```ts
    NearPromise.new("external_address").functionCall("function_name", JSON.stringify(arguments), DEPOSIT, GAS)
    .then(
      // this function is the callback
      NearPromise.new(near.currentAccountId()).functionCall("callback_name", JSON.stringify(arguments), DEPOSIT, GAS)
    );
    ```

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

    There is a helper macro that allows you to make cross-contract calls with the syntax `#[ext_contract(...)]`. It takes a Rust Trait and converts it to a module with static methods. Each of these static methods takes positional arguments defined by the Trait, then the `receiver_id`, the attached deposit and the amount of gas and returns a new `Promise`.

    ```rust
    #[ext_contract(external_trait)]
    trait Contract {
        fn function_name(&self, param1: T, param2: T) -> T;
    }

    external_trait::ext("external_address")
    .with_attached_deposit(DEPOSIT)
    .with_static_gas(GAS)
    .function_name(arguments)
    .then(
      // this is the callback
      Self::ext(env::current_account_id())
      .with_attached_deposit(DEPOSIT)
      .with_static_gas(GAS)
      .callback_name(arguments)
    );

    ```

<details>
<summary> Gas </summary> 

You can attach an unused GAS weight by specifying the `.with_unused_gas_weight()` method but it is defaulted to 1. The unused GAS will be split amongst all the functions in the current execution depending on their weights. If there is only 1 function, any weight above 1 will result in all the unused GAS being attached to that function. If you specify a weight of 0, however, the unused GAS will **not** be attached to that function. If you have two functions, one with a weight of 3, and one with a weight of 1, the first function will get `3/4` of the unused GAS and the other function will get `1/4` of the unused GAS.

</details>

  </TabItem>
</Tabs>

:::info

If a function returns a promise, then it will delegate the return value and status of transaction execution, but if you return a value or nothing, then the `Promise` result will not influence the transaction status

:::

:::caution

The Promises you are creating will **not execute immediately**. In fact, they will be queued in the network an:
- The cross-contract call will execute 1 or 2 blocks after your function finishes **correctly**.

:::

---

## Callback Function
If your function finishes correctly, then eventually your callback function will execute. This will happen whether the **external contract fails or not**.

In the callback function you will have access to the result, which will contain the status of the external function (if it worked or not), and the values in case of success.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="42" end="53" />

</Language>

<Language value="rust" language="rust">

  <Github fname="lib.rs"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
          start="37" end="51" />

</Language>

</CodeTabs>

:::info Callback with always execute

We repeat, if your function finishes correctly, then your callback will **always execute**. This will happen no matter if the external function finished correctly or not

:::

:::warning

Always make sure to have enough Gas for your callback function to execute 

:::

:::tip

Remember to mark your callback function as private using macros/decorators, so it can only be called by the contract itself

:::

<hr class="subsection" />

### What happens if the function I call fails?
If the external function fails (i.e. it panics), then your callback will be **executed anyway**. Here you need to **manually rollback** any changes made in your
contract during the original call. Particularly:

1. **Refund the predecessor** if needed: If the contract attached NEAR to the call, the funds are now back in **the contract's account**
2. **Revert any state changes**: If the original function made any state changes (i.e. changed or stored data), you need to manually roll them back. **They won't revert automatically**

:::warning
If your original function finishes correctly then the callback executes **even if the external function panics**. Your state will **not** rollback automatically,
and $NEAR will **not** be returned to the signer automatically. Always make sure to check in the callback if the external function failed, and manually rollback any
operation if necessary.
:::

---

## Concatenating Functions and Promises

✅ Promises can be concatenate using the `.and` operator: `P1.and(P2).and(P3).then(P4)`: `P1`, `P2`, and `P3` execute in parallel, after they finish, `P4` will execute and have access to all their results

⛔ You cannot **return** a joint promise without a callback: `return P1.and(P2)` is invalid since it misses the `then`

✅ You can concatenate `then` promises: `P1.then(P2).then(P3)`: `P1` executes, then `P2` executes with the result of `P1`, then `P3` executes with the result of `P2`

⛔ You cannot use an `and` within a `then`: `P1.then(P2.and(P3))` is invalid

⛔ You cannot use a `then` within a `then`: `P1.then(P2.then(P3))` is invalid

<hr class="subsection" />

### Multiple Functions, Same Contract

You can call multiple functions in the same external contract, which is known as a **batch call**.

An important property of batch calls is that they **act as a unit**: they execute in the same [receipt](../../../1.concepts/protocol/transactions.md#receipt-receipt), and if **any function fails**, then they **all get reverted**.

<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="batch_actions" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
        start="7" end="17" />

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

  <Github fname="lib.ts" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
        start="14" end="19" />

  </TabItem>
</Tabs>

:::tip

Callbacks only have access to the result of the **last function** in a batch call

:::

---

### Multiple Functions: Different Contracts

You can also call multiple functions in **different contracts**. These functions will be executed in parallel, and do not impact each other. This means that, if one fails, the others **will execute, and NOT be reverted**.

<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="lib.ts" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
        start="6" end="21" />

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

  <Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
        start="17" end="55" />

  </TabItem>
</Tabs>

:::tip

Callbacks have access to the result of **all functions** in a parallel call

:::


---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The function in which you make the call and function for the callback are **independent**.
- There is a **delay between the call and the callback**, in which people can still interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Make sure you don't leave the contract in a exploitable state between the call and the callback.
2. Manually rollback any changes to the state in the callback if the external call failed.

We have a whole [security section](../security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning
Not following these basic security guidelines could expose your contract to exploits. Please check the [security section](../security/callbacks.md), and if still in doubt, [join us in Discord](https://near.chat).
:::
