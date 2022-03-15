---
id: signer_predecessor
title: Who is Calling Me?
---

Users will interact with your smart contract by calling the different methods that you implement. In order to identify who is calling your method the functions `predecessor()`, `signer()` and `current account()` ([Rust docs](broken), [AS docs](broken)) come handy. 

- The `predecessor` is the account that invoqued the method being executed.
- The `current account` is the account that contains the code being executed.
- The `signer` is the account name that signed the **initial** transaction, which eventually resulted in the current method call.

In order to clarify, lets illustrate with an scenario:

![Illustration](https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png))


In the example, user.near calls a method in poolparty.near, which derives into a [cross-contract](broken) call and a [callback](broken) (we will talk about those later). When the code in poolparty.deposit_and_stake() executes, user.near is both the predecessor and the signer. However, when the validator.deposit() code executes, we see that for them poolparty.near is the predecessor and user.near the signer. This is because poolparty.near evoked directly the method, but user.near made the initial call, which resulted in that code being executed. Finally, when the callback in poolparty.deposit_callback() executes we see that, again, poolparty.near is the predecessor, and user.near is the signer. Why? Because poolparty.near is the one that is scheduled to callback itself once the validator finishes!

The reality is that, in almost every scenario you will **only need to use the `predecessor`**. However, remember that when your callback executes, the information on which user interacted with your original method is lost. This is because the predecessor is now your contract!. In order to recover it, the best is to pass the user as an argument to your callback method.

While in most scenarios you will only use the predecessor, there are situations in which knowing the signer is very useful. For example, in Matt’s nft-marketplace the function to add NFT to the market needs to make sure that: 1. the function was executed in a cross-contract, 2. The execution chain was originated by the owner of the NFT!


