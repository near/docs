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
To create an implicit account locally, it takes two steps: create a key-pair locally, and then you derive its address.
> Open your teminal/cmd to run the command that will allow you perform the steps stated above

#### 1. Create a ED25519 key-pair locally using [near cli](../../../4.tools/cli.md)

```bash
near generate-key my-new-account
```
> A new key-pair will be stored at `~/.near-credentials/testnet/my-new-account.json`.

#### 2. Convert the public_key to an account ID. {#converting-a-public-key-to-an-account-id}
Use [`near-cli`](../../../4.tools/cli.md) to convert the `public_key` from the `.json` file to its related NEAR account address.

> Open the javascript console of near-cli using the command below

```bash
near repl
```

```javascript
// Paste this code in the javascript console
const pk58 = 'ed25519:<data>'
nearAPI.utils.PublicKey.fromString(pk58).data.hexSlice()
```

The output string will be the account ID in hex (without `'`), for example `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`.

You can share this `id` with anyone to recieve Near tokens. At least **0.001Ⓝ** is needed to start using the account.

:::tip You can also use **other languages** to infer the implicit address, for example, in python you can use the `base58` package: `base58.b58decode(<data>).hex()` :::

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
