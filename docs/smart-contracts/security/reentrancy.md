---
id: reentrancy
title: Reentrancy Attacks
description: "Learn about reentrancy attacks in NEAR smart contracts and how to prevent them with proper security measures and coding practices."
---

Between a cross-contract call and its callback **any method of your contract can be executed**. Not taking this into account is one of the main sources of exploits. It is so common that it has its own name: **reentrancy attacks**.

Always make sure to keep your state in a consistent state after a method finishes executing. Assume that:

- Any method could be executed between a method execution and its callback.
- The same method could be executed again before the callback kicks in.

---

### Example
Imagine that we develop a `deposit_and_stake` with the following **wrong logic**: (1) The user sends us money, (2) we add it to its balance, (3) we try to stake it in a validator, (4) if the staking fails, we remove the balance in the callback. Then, a user could schedule a call to withdraw between (2) and (4), and, if the staking failed, we would send money twice to the user.

![img](https://miro.medium.com/max/1400/1*VweWHQYGLBa70uceiWHLQA.png)
*Between a cross-contract call and the callback anything could happen*

Luckily for us the solution is rather simple. Instead of immediately adding the money to our user’s balance, we wait until the callback. There we check, and if the staking went well, then we add it to their balance.

![img](https://miro.medium.com/max/1400/1*o0YVDCp_7l-L3njJMGhU4w.png)
*Correct way to handle deposits in a cross-contract call*