---
id: account-id
title: Address (Account ID)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR accounts are identified by a unique address, which takes one of two forms:
1. [**Implicit address**](#implicit-address), which are 64 characters long (e.g. `fb9243ce...`)
2. [**Named address**](#named-address), which act as domains (e.g. `alice.near`)

:::tip Searching to create an account?
You have multiple ways to create an account, you can [sign-up using your email](https://dev.near.org/signup), get a mobile wallet through [telegram](https://web.telegram.org/k/#@herewalletbot), or create a [web wallet](https://wallet.meteorwallet.app/wallet).
:::

---

## Implicit Address
Implicit accounts are denoted by a 64 character address, which corresponds to a unique public/private key-pair. Who controls the [private key](./access-keys.md) of the implicit account controls the account.

For example:
- The private key: `ed25519:4x1xiJ6u3sZF3NgrwPUCnHqup2o...`
- Corresponds to the public key: `ed25519:CQLP1o1F3Jbdttek3GoRJYhzfT...`
- And controls the account: `a96ad3cb539b653e4b869bd7cf26590690e8971...`

Implicit accounts always *exist*, and thus do not need to be created. However, in order to use the account you will still need to fund it with NEAR tokens (or get a relayer to pay your transaction's [gas](./gas.md)).

:::tip

In NEAR, you can delete the private key of an implicit account, which effectively locks the account and prevents anyone to control it

:::

<details>

<summary> 🧑‍💻 Technical: How to obtain a key-pair  </summary>

The simplest way to obtain a public / private key that represents an account is using the [NEAR CLI](../4.tools/cli.md)

```bash
near account create-account fund-later use-auto-generation save-to-folder ~/.near-credentials/implicit

# The file "~/.near-credentials/implicit/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json" was saved successfully

# Here is your console command if you need to script it or re-run:
#     near account create-account fund-later use-auto-generation save-to-folder ~/.near-credentials/implicit
```

</details>

---

## Named Address
Users can register **named accounts** (e.g. `bob.near`) which are easy to remember and share.

An awesome feature of named accounts is that they can create **sub-accounts** of themselves, effectively working as domains:

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

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call testnet create_account '{"new_account_id": "new-acc.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId funding-account.testnet --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction testnet create_account json-args '{"new_account_id": "new-acc.testnet", "new_public_key": "ed25519:<data>"}' prepaid-gas '100.0 Tgas' attached-deposit '0.00182 NEAR' sign-as funding-account.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

We abstract this process in the [NEAR CLI](../4.tools/cli.md) with the following command:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near create-account new-acc.testnet --useAccount funding-account.testnet --publicKey ed25519:<data>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near account create-account fund-myself new-acc.testnet '1 NEAR' use-manually-provided-public-key ed25519:<data> sign-as funding-account.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

You can use the same command to create sub-accounts of an existing named account:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near create-account sub-acc.new-acc.testnet --useAccount new-acc.testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near account create-account fund-myself sub-acc.new-acc.testnet '1 NEAR' autogenerate-new-keypair save-to-keychain sign-as new-acc.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

</details>

:::tip
Accounts have **no control** over their sub-accounts, they are different entities. This means that `near` cannot control `bob.near`, and `bob.near` cannot control `sub.bob.near`.
:::
