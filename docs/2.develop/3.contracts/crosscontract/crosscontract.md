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

:::caution
The fact that you are creating a Promise means that both the cross-contract call and callback will **not execute immediately**. In fact:
- The cross-contract call will execute 1 or 2 blocks after your method finishes **correctly**.
- The callback will then execute 1 or 2 blocks after the **external** method finishes (**correctly or not**)
:::

:::warning
If your method finishes correctly then its state will be updated, and the callback will execute. **Even if the external method panics** your state will **not** rollback. Always make sure to check in the callback if the external method failed, and manually rollback any operation if necessary.
:::

---

## Important Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

1. The method in which you make the call and method for the callback are **independent**.
2. Between the call and the callback people could interact with the contract

This has important implications on how you should handle the callbacks.

<hr class="subsection" />

### User's Money
When a method panics, the money attached to that transaction returns to the `predecessor`. This means that, if you make a cross-contract call and it fails, then the money **returns to your contract**. If the money came from a user calling your contract, then you must transfer it back during the callback.

![img](https://miro.medium.com/max/1400/1*Hp4TOcaBqm9LS0wkgWw3nA.png)
*If the user attached money, we need to manually return it in the callback*

:::caution
Make sure you pass have enough GAS in the callback to make the transfer
:::

<hr class="subsection" />

### Async Callbacks
Between a cross-contract call and its callback **any method of your contract can be executed**. Not taking this into account is one of the main sources of exploits. It is so common that it has its own name: [reentrancy attacks](reentrancyattacks).

Imagine that we develop a `deposit_and_stake` with the following **wrong logic**: (1) The user sends us money, (2) we add it to its balance, (3) we try to stake it in a validator, (4) if the staking fails, we remove the balance in the callback. Then, a user could schedule a call to withdraw between (2) and (4), and, if the staking failed, we would send money twice to the user.

![img](https://miro.medium.com/max/1400/1*VweWHQYGLBa70uceiWHLQA.png)
*Between a cross-contract call and the callback anything could happen*

Luckily for us the solution is rather simple. Instead of immediately adding the money to our user’s balance, we wait until the callback. There we check, and if the staking went well, then we add it to their balance.

![img](https://miro.medium.com/max/1400/1*o0YVDCp_7l-L3njJMGhU4w.png)
*Correct way to handle deposits in a cross-contract call*

### &nbsp;
---
## 🎞️📚 Aditional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code