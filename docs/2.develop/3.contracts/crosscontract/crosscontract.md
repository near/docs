---
id: crosscontract
title: Cross-Contract Calls
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import MainAs from "./example/main.as.md";
import ExternalAs from "./example/external.as.md";

import MainRs from "./example/main.rs.md";
import ExternalRs from "./example/external.rs.md";


Cross-contract calls allow you to interact with other deployed smart contracts. This is useful when you need to:

1. Send information to another contract
2. Query information from another contract
3. Use another contract to perform an action

---

## Snippet: Querying Information

Querying information from another contract is a common scenario. Lets write a method that queries how much an Account (`account_id`) has staked in a specific validator.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainAs></MainAs>
      </TabItem>
      <TabItem value="as-external" label="utils.ts">
        <ExternalAs></ExternalAs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainRs></MainRs>
      </TabItem>
      <TabItem value="as-external" label="utils.ts">
        <ExternalRs></ExternalRs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

---

## Promises
If you want your contract to interact with another deployed one you need to ask the network to make two [Promises](broken):
1. To execute code in the external contract (using `ContractPromise.create`).
2. To callback a **different** method in your smart contract with the result (using `ContractPromise.then`).

Both promises take the same arguments:
   - The address of the contract you want to interact with
   - The method name that you want to execute
   - The (encoded) arguments to pass to the method
   - The amount of GAS to use (deducted from the **attached Gas**)
   - The amount of NEAR to attach (deducted from **your contract’s balance**)

:::tip
Notice that the callback could be made to **any** contract. This means that, if you want, the result could be potentially handled by another contract.
:::

:::tip
Your callback must be public, however, most of the times you would want it to be private. You can make it private while keeping it public by asserting that the `predecessor` is `current_account`. In rust this is done automatically by adding the `#[private]` decorator.
:::

:::caution
The fact that you are creating a Promise means that both the cross-contract call and callback will **not execute immediately**. In fact:
- The cross-contract call will execute 1 or 2 blocks after your method finishes **correctly**.
- The callback will then execute 1 or 2 blocks after the **external** method finishes (**correctly or not**)
:::

:::warning
If your method finishes correctly then its state will be updated, and the callback will execute. **Even if the external method panics** your state will **not** rollback. Always make sure to check in the callback if the external method failed, and manually rollback any operation if necessary.
:::

---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The method in which you make the call and method for the callback are **independent**.
- Between the call and the callback people could interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Your callback method needs to be public, but you want to make sure only your contract can call it.
2. Make sure you don't leave the contract in a exploitable state between the call and the callback.
3. Manually rollback any changes to the state in the callback if the external call failed.

We have a whole [security section](../../5.security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning
Not following this basic security guidelines could expose your contract to exploits. Please check the [security section](../../5.security/callbacks.md), and if still in doubt, [join us in discord](near.chat).
:::


### &nbsp;
---
## 🎞️📚 Additional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code