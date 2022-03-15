---
id: introduction
title: Introduction
---

At some point you might want your contract to call functions on other existing contracts. This is what we call a _cross-contract call_. There are plenty of reasons to do perform a cross-contract call:

- You want to inform another contract that something has happened.
- You need information from another contract, e.g. querying how many tokens a user has.
- You need another contract to perform an action for you, such as staking tokens, minting NFTs, or making a transfer.

In other words, you use cross-contract calls each time you want to leverage a code library that others (or you) have written and released.

While writing cross-contract calls is not inherently hard, there is a significant aspects to keep in mind: on NEAR, all calls are **independent** and **asynchronous**. In other words:
The method in which your contract makes the call, and the one in which it receives the answer (callback) are **always different**.
There is an **extensive delay** between making the call and the callback. During such a delay anyone can execute a method in your contract before the callback is triggered.

When not dealt with properly, these scenarios can pose severe security threats, leading to a contract exploit or users losing their money. However, there is no reason to panic, since such scenarios are simple to detect and deal with. In fact, we will remind you of this in each of the following sections.

Cross contract calls can be categorized in two types: [basic calls](broken) (with no callback) and [calls with a callback](broken). Step into the next sections to learn more about them.