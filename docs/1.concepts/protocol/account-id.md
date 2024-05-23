---
id: account-id
title: Address (Account ID)
---

NEAR accounts are identified by a unique address, which take one of two forms:
1. [**Implicit addresses**](#implicit-address), which are 64 characters long (e.g. `fb9243ce...`)
2. [**Named addresses**](#named-address), which are simpler to remember and act as domains (e.g. `alice.near`)

:::tip Searching to create an account?
You have multiple ways to create an account, you can [sign-up using your email](https://dev.near.org/signup) (note: email-based accounts currently have limited ability to transfer funds or sign transactions), get a mobile wallet through [telegram](https://web.telegram.org/k/#@herewalletbot), or create a [web wallet](https://app.mynearwallet.com).
:::

---

## Implicit Address
Implicit accounts are denoted by a 64 character address, which corresponds to a unique public/private key-pair. Who controls the [private key](./access-keys.md) of the implicit account controls the account.

For example:
- The private key: `ed25519:4x1xiJ6u3sZF3NgrwPUCnHqup2o...`
- Corresponds to the public key: `ed25519:CQLP1o1F3Jbdttek3GoRJYhzfT...`
- And controls the account: `a96ad3cb539b653e4b869bd7cf26590690e8971...`

Implicit accounts always *exist*, and thus do not need to be created. However, in order to use the account you will still need to fund it with NEAR tokens (or get somebody to pay the gas for your transaction).

<details>

<summary> 🧑‍💻 Technical: How to obtain a key-pair  </summary>

The simplest way to obtain a public / private key that represents an account is using the [NEAR CLI](../../4.tools/cli.md)

```bash
near generate-key

# Output
# Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
# Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
# Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
```

</details>

---

## Named Address
In NEAR, users can register **named accounts** (e.g. `bob.near`) which are simpler to share and remember.

Another advantage of named accounts is that they can create **sub-accounts** of themselves, effectively working as domains:

1. The [`registrar`](https://nearblocks.io/address/registrar) account can create top-level accounts (e.g. `near`, `sweat`, `kaiching`).
2. The `near` account can create sub-accounts such as `bob.near` or `alice.near`
3. `bob.near` can create sub-accounts of itself, such as `app.bob.near`
4. Accounts cannot create sub-accounts of other accounts
    - `near` **cannot** create `app.bob.near`
    - `account.near` **cannot** create `sub.another-account.near`
5. Accounts have **no control** over their sub-account, they are different entities

Anyone can create a `.near` or `.testnet` account, you just to call the `create_account` method of the corresponding top-level account - `testnet` on testnet, and `near` on mainnet.

<details>

<summary> 🧑‍💻 Technical: How to create a named account  </summary>

Named accounts are created by calling the `create_account` method of the network's top-level account - `testnet` on testnet, and `near` on mainnet. 

```bash
near call testnet create_account '{"new_account_id": "new-acc.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId funding-account.testnet
```

We abstract this process in the [NEAR CLI](../../4.tools/cli.md) with the following command:

```bash
near create_account new-acc.testnet --useAccount funding-account.testnet --publicKey ed25519:<data>
```

You can use the same command to create sub-accounts of an existing named account:

```bash
near create_account sub-acc.new-acc.testnet --useAccount new-acc.testnet
```

</details>

:::tip
Accounts have **no control** over their sub-accounts, they are different entities. This means that `near` cannot control `bob.near`, and `bob.near` cannot control `sub.bob.near`.
:::
