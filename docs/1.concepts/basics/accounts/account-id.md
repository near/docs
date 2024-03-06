---
id: account-id
title: Address (Account ID)
---

In NEAR we distinguish two types of [accounts](../introduction.md):
1. **Named accounts**, with human readable names such as `alice.near`.
2. **Implicit accounts**, referred by 64 chars (e.g. `98793cd91a3f870fb126f662858[...]`).

:::tip
For an account name to be valid, it must adhere to the [specification's account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules).
:::

---

## Implicit Accounts {#implicit-accounts}
Implicit accounts are similar to the classic Bitcoin/Ethereum accounts. They are defined by a 64 character address, which corresponds to a unique ED25519 key-pair.

For example:
- The public key: `ed25519:2Ad9ZyUACRMjWQoj6xJNNXjnY1stZeB1zTkqan9v3mKa`
- Refers to the implicit account: `1152c95d4de26f206a15aeb485902d0120dd...`

In order to control an implicit account, you need to know its corresponding private key (or passphrase).

<details>

<summary> Technical Question: How to obtain the keys that represent an implicit account? </summary>

The simplest way to obtain a public / private key that represents an account is using the [NEAR CLI](../../../4.tools/cli.md)

```bash
near generate-key --saveImplicit

# Output
# Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
# Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
# Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
```

</details>

---


## Named Accounts
In NEAR, users can register **named accounts** (e.g. `bob.near`) which are simpler to use and remember.

Moreover, named accounts can create **sub-accounts** of themselves, helping to better organize related-accounts.
In this way, named accounts work as domains. This is how it works:

1. The [`registrar`](https://nearblocks.io/address/registrar) account can create top-level accounts (e.g. `near`, `sweat`, `kaiching`).
2. The `near` account can create sub-accounts, such as `bob.near`
3. `bob.near` can create sub-accounts of itself, such as `app.bob.near`
4. Accounts cannot create sub-accounts of other accounts
    - `near` **cannot** create `app.bob.near`
    - `account.near` **cannot** create `sub.another-account.near`
5. Accounts have **no** control whatsoever over their sub-account

:::info
Accounts have **no control** over sub-accounts, since they do **NOT** share [access keys](access-keys.md)
:::

:::tip
Currently, mainstream **mainnet** accounts are sub-accounts of `.near` (`example.near`), and **testnet** accounts are sub-accounts of `testnet` (`example.testnet`).
:::

<details>

<summary> How can I obtain a named account? </summary>

The simplest way to create a named account is by [signing-up using your email](https://near.org/), or by interacting with the [wallet bot on telegram](https://web.telegram.org/k/#@herewalletbot).

</details>