---
id: introduction
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

While making cross-contract calls there is one significant aspects to keep in mind: calls and callbacks are **independent** and **asynchronous**.

---

## Example 

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
The promise will be executed 1 to 2 blocks after **our method** finishes correctly.
:::

---

## Callback

If we are querying information or using another contract, then we will want to act upon the cross-contract call result. In such a case, we can create a callback promise (using the `then` keyword). As with the previous promise, we need to specify:
  - The address of the contract we want to call
  - The method we want to call
  - The (encoded) arguments
  - The amount of NEAR to attach (will be deducted from our contract’s balance)
  - The amount of GAS to use (deducted from the attached Gas)

In the most common

:::tip
You can create a callback to **any** contract, or even not create the callback.
:::

---

## Security Concerns

While writing cross-contract calls is not inherently hard, there is a significant aspects to keep in mind: on NEAR, all calls are **independent** and **asynchronous**. In other words:
The method in which your contract makes the call, and the one in which it receives the answer (callback) are **always different**.
There is an **extensive delay** between making the call and the callback. During such a delay anyone can execute a method in your contract before the callback is triggered.

When not dealt with properly, these scenarios can pose severe security threats, leading to a contract exploit or users losing their money. However, there is no reason to panic, since such scenarios are simple to detect and deal with. In fact, we will remind you of this in each of the following sections.

Cross contract calls can be categorized in two types: [basic calls](broken) (with no callback) and [calls with a callback](broken). Step into the next sections to learn more about them.