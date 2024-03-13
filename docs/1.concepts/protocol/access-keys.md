---
id: access-keys
title: Access Keys
---
In all blockchains, users control their accounts by holding a `private key` (a secret only they know) and using it to sign [transactions](../transactions/overview.md).

![img](@site/static/docs/assets/welcome-pages/access-keys.png)

NEAR accounts present the **unique** feature of being able to hold multiple [Access Keys](https://en.wikipedia.org/wiki/Public-key_cryptography), each with its **own set of permissions**. We distinguish two types of Keys:

1. `Full-Access Keys`: Have full control over the account, and should **never be shared**
2. `Function-Call Keys`: Can sign calls to specific contract, and are **meant to be shared**

<br />


---

## Full-Access Keys {#full-access-keys}
As the name suggests, `Full-Access` keys have full control of an account, meaning they can be used to sign [transactions](../transactions.md) doing any action in your account's behalf:

1. Transfer NEAR Ⓝ
2. Delete your account or create sub-accounts of it
3. Add or remove Access Keys
4. Deploy a smart contract in the account
5. Call methods on any contract

You should never share your `Full-Access`, otherwise you are giving **total control over the account**.

:::tip
The **first** Full-Access Key of an account is added when the account is **created**
:::

---

## Function-Call Keys {#function-call-keys}

`Function-Call` keys can only sign transactions calling a **specific contract**, and do **not allow** to **attach NEAR tokens** to the call. They are defined by three attributes:
1. `receiver_id`: The **contract** which the key allows to call. No other contract can be called using this key
2. `method_names` (Optional): The contract's **methods** the key allows to call. If omitted, all methods can be called
3. `allowance` (Optional): The **amount of NEAR** allowed to be spent on [gas](../transactions/gas.md). If omitted, the key can consume **unlimited** as gas

Function-Call keys have the main purpose of being shared, so third-parties can make contract calls in your name. This is useful in [multiple scenarios as we will see below](#benefits-of-function-call-keys).

:::tip 
`Function-Call` keys can be shared safely, since they can only use it to call a specific contract, and cannot transfer NEAR tokens
:::

---

## Benefits of Function-Call Keys

`Function Call Keys` allow you to grant **limited access** to third-parties. These type of keys are quite unique to NEAR, for which it is useful to talk about the use-cases they enable.

### Improving UX
The most common use case for `Function-Call` keys is to enable an application to sign transactions for you, so they **don't** need to **interrupt your experience** asking to sign a transaction.

Imagine that you are building a game that keeps the user's score on a smart contract. In other chains, you would need to interrupt the user's experience to ask them to sign a transaction each time the game wants to update the score.

In NEAR, you can ask the user to create a `Function-Call` key for the game's contract, and share it with the game. This way, the game can now sign transactions in the user's name, without needing to interrupt the gameplay.

Sharing this key is safe for the user, because even in the case of somebody stealing it, they would only be able to call the score-keeping method, and nothing else.

<hr class="subsection" />

### Simple Onboarding

Another common use-case of `Function-Call` keys is to enable **onboarding** new users. It works as follows: You first create a contract that has a method called `create_account`. You can program the method so - when executed - it creates a new account and then transfers some tokens to it.

You can then create a `Function-Call` key for this method, and share it with your friends. They can then use it to create an account and claim some tokens, without needing to know anything about blockchain.

:::tip
This is the basic principle behind [NEAR Drops](../../7.primitives/linkdrop.md), a way to distribute assets to a large number of users
:::

<hr class="subsection" />

### Rotating / Recovering Keys
Having multiple keys means that you can easily change them. If you think any of your keys could be compromised, you can simply remove them or swap them with a new one. Just as how you can change your password on any website.

You could also implement a key-recovery [contract](smart-contract.md) in your account, and create a "recovery key" for someone you trust. Such a key could only be used to start the recovery.

When needed, that third-party component could trigger the recovery process, helping to create a new full-access key for you.

---

## Locked Accounts
If you remove all keys from an account, then the account will become **locked**, meaning that no external actor can perform transactions in the
account's name.

In practice, this means that only the account's smart contract can transfer assets, create sub-accounts, or update its code.

Locking an account is very useful when one wants to deploy a contract, and let the community be assured that only the contract is in control of the account.

:::warning
An account could still add keys to itself through a smart contract, effectively allowing the contract to unlock the account. Notice that this can only be done if the contract is deployed before the account is locked
:::