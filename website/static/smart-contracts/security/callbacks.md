---
id: callbacks
title: Cross-Contract Calls
---

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The method in which you make the call and method for the callback are **independent**.
- Between the call and the callback, people could interact with the contract.

This has important implications on how you should handle the callbacks. Particularly:

1. Your callback method needs to be public, but you want to make sure only your contract can call it.
2. Make sure you don't leave the contract in a exploitable state between the call and the callback.
3. Manually rollback any changes to the state in the callback if the external call failed.

---

## Private Callbacks
In order for your contract to call itself when a cross-contract call is done, you need to make the callback method public. However, most of the times you would want it to be private. You can make it private while keeping it public by asserting that the `predecessor` is `current_account`. In rust this is done automatically by adding the `#[private]` decorator.

---

## User's Money
When a method panics, the money attached to that transaction returns to the `predecessor`. This means that, if you make a cross-contract call and it fails, then the money **returns to your contract**. If the money came from a user calling your contract, then you should transfer it back during the callback.

![img](https://miro.medium.com/max/1400/1*Hp4TOcaBqm9LS0wkgWw3nA.png)
*If the user attached money, we need to manually return it in the callback*

:::caution
Make sure you pass have enough GAS in the callback to make the transfer
:::

---

## Async Callbacks
Between a cross-contract call and its callback **any method of your contract can be executed**. Not taking this into account is one of the main sources of exploits. It is so common that it has its own name: reentrancy attacks.

Imagine that we develop a `deposit_and_stake` with the following **wrong logic**: (1) The user sends us money, (2) we add it to its balance, (3) we try to stake it in a validator, (4) if the staking fails, we remove the balance in the callback. Then, a user could schedule a call to withdraw between (2) and (4), and, if the staking failed, we would send money twice to the user.

![img](https://miro.medium.com/max/1400/1*VweWHQYGLBa70uceiWHLQA.png)
*Between a cross-contract call and the callback anything could happen*

Luckily for us the solution is rather simple. Instead of immediately adding the money to our user’s balance, we wait until the callback. There we check, and if the staking went well, then we add it to their balance.

![img](https://miro.medium.com/max/1400/1*o0YVDCp_7l-L3njJMGhU4w.png)
*Correct way to handle deposits in a cross-contract call*