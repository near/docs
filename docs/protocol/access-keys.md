---
id: access-keys
title: Access Keys
description: "Learn about NEAR's access key system with Full-Access Keys for complete account control and Function-Call Keys for restricted, shareable permissions to specific contracts."
---

In NEAR, users control their accounts using access keys, which can be full-access keys or function-call keys. Full-access keys allow complete control over the account, while function-call keys restrict actions to specific contracts. This system enables secure sharing of permissions and simplifies user interactions with applications.

:::tip

Learn more about the benefits of using multiple keys in our blog post: [Benefits of Function-Call Keys](/blog/benefits-of-multiple-keys)

---

## Access Keys

In most blockchains, users control their accounts by holding a single [`private key`](https://en.wikipedia.org/wiki/Public-key_cryptography) (a secret only they know) and using it to sign [transactions](./transactions.md).

![img](@site/static/assets/docs/welcome-pages/access-keys.png)

In NEAR we distinguish two types of Access Keys:

1. `Full-Access Keys`: Have full control over the account, and should **never be shared**
2. `Function-Call Keys`: Can only sign calls for specific contracts, and are **meant to be shared**

Every account in NEAR can hold **multiple keys**, and keys can be added or removed, allowing a
fine-grained control over the account's permissions.

---

## Function-Call Keys {#function-call-keys}

`Function-Call` keys can only sign transactions calling a **specific contract**, and do **not allow** to **attach NEAR tokens** to the call.

They are defined by three attributes:
1. `receiver_id`: The **only contract** which the key allows to call, no other contract can be called with this key
2. `method_names` (Optional): The contract's **methods** the key allows to call. If omitted, all contract's methods can be called
3. `allowance` (Optional): The **amount of NEAR** allowed to be spent on [gas](gas.md). If omitted, the key can consume **unlimited** gas

`Function Call Keys` are meant to be shared with applications, so third-parties can make contract calls in your name. This is useful in [multiple scenarios as we will see below](/blog/benefits-of-multiple-keys).

:::tip
`Function-Call` keys are secure to share, as they only permit calls to a specific contract and prohibit NEAR token transfers
:::

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
[Implicit accounts](./account-id.md#implicit-address) already have a `Full-Access Key` by default, while for [`named accounts`](./account-id.md#named-address) their first `Full-Access Key` is added on creation
:::

---

## Locked Accounts
If you remove all keys from an account, then the account will become **locked**, meaning that no external actor can perform transactions in the
account's name.

In practice, this means that only the account's smart contract can transfer assets, create sub-accounts, or update its code.

Locking an account is very useful when one wants to deploy a contract, and let the community be assured that only the contract is in control of the account.

:::warning
An account could still add keys to itself through a smart contract, effectively allowing the contract to unlock the account. Notice that this can only be done if the contract is deployed before the account is locked
:::
