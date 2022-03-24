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


Cross-contract calls allow you to send and ask information from another deployed contract. This is useful when you need to:

1. Send information to another contract
2. Query information from another contract
3. Use another contract to perform an action

---

## Example: Querying Information

Querying information from another contract is a common scenario. Lets write a method that, given an `account_id`, queries how much NEAR they have staked in a specific validator.

<Tabs className="language-tabs">
  <TabItem value="as" label="AS - Assemblyscript">
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

## Initiating a Cross-Contract Call

A cross-contract call starts when we create a promise to call a method in another contract, specifying: 
   - The address of the contract we want to call
   - The method we want to call
   - The (encoded) arguments
   - The amount of NEAR to attach (deducted from our contract’s balance)
   - The amount of GAS to use (deducted from the attached Gas)

:::caution
The promise will not execute immediately, but 1 to 2 blocks after **our** method finishes **correctly**.
:::

---

## Callback

If we are querying information or using another contract, then we will want to act upon the cross-contract call result. In such a case, we can create a callback promise (using the `then` keyword). As with the previous promise, we need to specify:
  - The address of the contract we want to call
  - The method we want to call
  - The (encoded) arguments
  - The amount of NEAR to attach (will be deducted from our contract’s balance)
  - The amount of GAS to use (deducted from the attached Gas)

The method that created the promises and the method that handles the callback are always different and execute independently. During the callback, we must check if the external method finalized successfully or not, and act accordingly.

:::caution
The callback will not execute immediately, but 1 or 2 blocks after the **external** method finishes (**correctly or not**)
:::

---

## Security Concerns

While writing cross-contract calls there is a significant aspects to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

1. The method in which you make the call and method for the callback are **independent**.
2. Between the call and the callback people could interact with the contract

Lets see the most common scenarios for an exploit or attack and how to mitigate them.


### 1. User's Money
If a user calls a method in your contract with attached money, and your contract raises an exception (i.e. it fails), the money goes automatically back to the user. However, if your contract performs a cross-contract call and the call fails, then the money goes back to your contract, **not the user**. In this case, you must manually return the money during the callback by making a [transfer](transfer).

![img](https://miro.medium.com/max/1400/1*Hp4TOcaBqm9LS0wkgWw3nA.png)
*If the user attached money, we need to manually return it in the callback*

:::caution
Make sure you pass have enough GAS in the callback to make the transfer
:::

### 2. Async Callbacks
Between a cross-contract call and its callback **any method of your contract can be executed**. Not taking this into account is one of the main sources of exploits. It is so common that it has its own name: [reentrancy attacks](reentrancyattacks).

Imagine that we develop a `deposit_and_stake` with the following **wrong logic**: (1) The user sends us money, (2) we add it to its balance, (3) we try to stake it in a validator, (4) if the staking fails, we remove the balance in the callback. Then, a user could schedule a call to withdraw between (2) and (4), and, if the staking failed, we would send money twice to the user.

![img](https://miro.medium.com/max/1400/1*VweWHQYGLBa70uceiWHLQA.png)
*Between a cross-contract call and the callback anything could happen*

Luckily for us the solution is rather simple. Instead of immediately adding the money to our user’s balance, we wait until the callback. There we check, and if the staking went well, then we add it to their balance.

![img](https://miro.medium.com/max/1400/1*o0YVDCp_7l-L3njJMGhU4w.png)
*Correct way to handle deposits in a cross-contract call*