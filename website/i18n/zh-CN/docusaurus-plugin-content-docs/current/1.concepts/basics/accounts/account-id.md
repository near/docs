---
id: account-id
title: Address (Account ID)
---

Every NEAR account is identified by a specific address. Based on their name, two types of accounts can be distinguished:
1. **Named accounts**, with human readable names such as `alice.near`.
2. **Implicit accounts**, referred by 64 chars (e.g. `98793cd91a3f870fb126f662858[...]`).

:::tip For an account name to be valid, it must adhere to the [specification's account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules). :::

---

## Implicit Accounts {#implicit-accounts}
Implicit accounts are similar to the classic Bitcoin/Ethereum accounts. They are defined by a 64 character address, which corresponds to a unique ED25519 key-pair.

For example:
- The public key in base58: `BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`
- Refers to the implicit account: `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`

:::tip Check our section on how to [create implicit accounts](creating-accounts.md#local-implicit-account) :::

---


## Named Accounts
In NEAR, users can register **named accounts** (e.g. `bob.near`) which are simpler to use and remember.

Moreover, named accounts can create **sub-accounts** of themselves, helping to better organize related-accounts. In this way, named accounts work as domains, particularly:
1. Only the [`registrar`](https://nearblocks.io/address/registrar) account can create short top-level accounts (< 32 char).
2. Anyone can create long (>= 32 chars) top-level accounts.
3. An account can only create **immediate** sub-accounts of itself.

In other words:
1. Only [`registrar`](https://nearblocks.io/address/registrar) can create short top-level accounts (e.g. `near`, `aurora`).
2. Anyone can create long top-level accounts, e.g. `verylongaccountnamethatis32chars`.
3. `near` can create `bob.near`, and `bob.near` can create `app.bob.near`.
4. `near` **cannot** create `app.bob.near`, and `test.near` **cannot** create `sub.example.near`.

Currently, **mainnet** accounts are sub-accounts of `.near` (`example.near`), and **testnet** accounts are sub-accounts of `testnet` (`example.testnet`).

:::info Accounts have **no control** over sub-accounts, since they do **NOT** share [access keys](access-keys.md) :::

:::tip Check our section on how to [create named accounts](creating-accounts.md#local-named-account) :::
