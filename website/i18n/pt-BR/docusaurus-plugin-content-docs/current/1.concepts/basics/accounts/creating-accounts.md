---
id: creating-accounts
title: Creating Accounts
---

The simplest way to create NEAR accounts is through the [NEAR Wallet](https://mynearwallet.com/), however, you can also create accounts using local tools.

---

## The NEAR Wallet
The NEAR wallet is our web-based user-friendly wallet. You can readily use it without installing any software or add-ons (e.g browser extensions) on your devices.

#### Testnet
In **testnet** you can directly create [named accounts](account-id.md#named-accounts) such as `your-name.near`. Simply go to the [wallet](https://testnet.mynearwallet.com/create), pick a name of your choice, and you are ready to go. Remember to save your mnemonic phrase somewhere safe.

#### Mainnet
In the **mainnet** [wallet](https://mynearwallet.com/) you will be first given an [implicit account](account-id.md#implicit-accounts-implicit-accounts), which you need to fund. After that, you can use your [implicit account](account-id.md#implicit-accounts-implicit-accounts) to create a [named one](account-id.md#named-accounts).

---

## Local Implicit Account
We can create a implicit account with ED25519 key-pair locally using [near cli](../../../4.tools/cli.md)

```bash
near generate-key --saveImplicit
```

Example Output
```
Generated key pair with ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX public key
Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
Storing credentials for account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8 (network: testnet)
Saving key to '~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json'
```
> A new implicit account credentials will be stored at `~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json`.

You can share this `id` with anyone to receive Near tokens. At least **0.001Ⓝ** is needed to start using the account.

---

## Local Named Account
In order to create a named account you have to ask the relevant smart contract to create a sub-account for you: `near` in mainnet, and `testnet` in testnet.

You can use `near-cli` for this:

```bash
near call testnet create_account '{"new_account_id": "<account-name>.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId <account-with-funds>
```

> Notice that you need an **already funded** account, because you are making a contract call.

:::tip The public key that you pass will become the [Full Access key](access-keys.md#full-access-keys-full-access-keys) of the account. :::

:::info For **sub-accounts** check the [near-cli create-account](../../../4.tools/cli.md#near-create-account) docs. :::
