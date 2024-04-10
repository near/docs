---
id: access-keys
title: Access Keys
---
In all blockchains, users control their accounts by holding a `private key` (a secret only they know) and using it to sign [transactions](./transactions.md).

![img](@site/static/docs/assets/welcome-pages/access-keys.png)

NEAR accounts present the **unique** feature of being able to hold multiple [Access Keys](https://en.wikipedia.org/wiki/Public-key_cryptography), each with its **own set of permissions**. We distinguish two types of Keys:

1. `Full-Access Keys`: Have full control over the account, and should **never be shared**
2. `Function-Call Keys`: Can sign calls to specific contract, and are **meant to be shared**

---

## Full-Access Keys {#full-access-keys}
As the name suggests, `Full-Access` keys have full control of an account, meaning they can be used to sign [transactions](transactions.md) doing any action in your account's behalf:

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
3. `allowance` (Optional): The **amount of NEAR** allowed to be spent on [gas](gas.md). If omitted, the key can consume **unlimited** as gas

Function-Call keys have the main purpose of being shared, so third-parties can make contract calls in your name. This is useful in [multiple scenarios as we will see below](#benefits-of-function-call-keys).

:::tip 
`Function-Call` keys are secure to share, as they only permit calls to a specific contract and prohibit NEAR token transfers.
:::

---

## Benefits of Function-Call Keys

`Function Call Keys` allows you to provide **restricted access** to third parties. This key type, unique to NEAR, enables several use-cases worth discussing.

### Enhancing User Experience
The most common use case for `Function-Call` keys is to allow an application to sign transactions on the user's behalf.

Imagine you are developing a game that records the user's score on a smart contract. On other chains, you would have to disrupt the user's experience to request transaction signatures each time the game needs to update the score.

With NEAR, you can request the user to generate a `Function-Call` key for the game's contract and share it with the game. This way, the game can sign transactions in the user's name, eliminating gameplay interruptions.

Sharing this key is safe for the user, because even in the case of somebody stealing it, they would only be able to call the score-keeping method, and nothing else.

<hr class="subsection" />

### Simple Onboarding

Another common use-case of `Function-Call` keys is to simplify the **onboarding** process for new users. It works as follows:

First create a contract that has a method called `create_account`. This method should only be callable by the contract itself and, when executed, should create a new account and transfer some tokens to it.

You can then create multiple `Function-Call` in the contract's account, that only allow to call `create_account`. Drop these keys to your friends, so they can call the method, and easily create an account with some tokens.

:::tip
This is the basic principle behind [NEAR Drops](../../2.build/5.primitives/linkdrop.md), a way to distribute assets to a large number of users
:::

<hr class="subsection" />

### Key Rotation and Recovery

The presence of multiple keys allows for easy **rotation** and **recovery**. If you suspect a key might be compromised, you can promptly remove it or replace it with a new one, similar to changing your password on a website.

You can also establish a key-recovery contract in your account and generate a "recovery key" for a trusted party. This key would only be used to initiate the recovery process.

In case of necessity, the trusted party can trigger the recovery process, assisting in the creation of a new full-access key for you.

---

## Locked Accounts
If you remove all keys from an account, then the account will become **locked**, meaning that no external actor can perform transactions in the
account's name.

In practice, this means that only the account's smart contract can transfer assets, create sub-accounts, or update its code.

Locking an account is very useful when one wants to deploy a contract, and let the community be assured that only the contract is in control of the account.

:::warning
An account could still add keys to itself through a smart contract, effectively allowing the contract to unlock the account. Notice that this can only be done if the contract is deployed before the account is locked
:::