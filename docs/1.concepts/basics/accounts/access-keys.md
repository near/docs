---
id: access-keys
title: Access Keys
---
In blockchain, using an account actually refers to using a `private key` to sign [transactions](../transactions/overview.md).

NEAR Accounts have the unique feature of holding multiple [public/private key pairs](https://en.wikipedia.org/wiki/Public-key_cryptography),
called Access Keys, each with their **own set of permissions**.

Access Keys are similar to [OAuths](https://en.wikipedia.org/wiki/OAuth), enabling you to grant **limited access** over your account
to third-parties.

---

## Benefits of Access Keys
Imagine that you want to play a web3 game consisting of a web-app and a smart contract. In NEAR, you can provide the app with a key that only allows to
**call specific methods** in the game's contract.

Now the game can sign **game-related transactions** for you, without having to interrupt your gameplay.

If at any point you want to remove this permission, you can simply delete the Access Keys.

---

## Key Types

Currently, there are two types of access keys: `FullAccess` keys and `FunctionCall` keys.

<hr class="subsection" />

### Full Access Keys {#full-access-keys}
As the name suggests, `FullAccess` keys have full control of an account, similar to having administrator privileges on your operating system. 

Particularly, Full Access keys can be used to sign transactions doing [any action](https://nomicon.io/RuntimeSpec/Actions) in your account's behalf:

1. Create immediate [sub-accounts](account-id.md#rules-for-creating-named-accounts).
2. Delete your account (but **not** sub-accounts, since they have their own keys).
3. Add or remove Access Keys.
4. Deploy a smart contract in the account.
5. Call methods on any contract (yours or others).
6. Transfer NEAR Ⓝ.

If you hand a `FullAccess` to someone, they will have **total control over the account**.

:::tip
You **add the first** Full Access Key of the account when [the account is created](creating-accounts.md).
:::

<hr class="subsection" />

### Function Call Keys {#function-call-keys}

`FunctionCall` keys only have permission to call **non-payable** methods on contracts, i.e. methods that **do not** require you to attach NEAR Ⓝ.

`FunctionCall` keys are defined by three attributes:
1. `receiver_id`: The **contract** which the key allows to call. No other contract can be called using this key.
2. `method_names`: The contract's **methods** the key allows to call (Optional). If omitted, all methods may be called.
3. `allowance`: The **amount of Ⓝ** allowed to spend on [gas](../transactions/gas.md) (Optional). If omitted, the key will only be allowed to call view methods (read-only).

Function Call keys main purpose is to be handled to apps, so they can make contract calls in your name.

NEAR simplifies creating and giving `FunctionCall` keys to dApps by implementing a [**sign-in**](../../../2.develop/integrate/frontend.md#user-sign-in) process. Briefly, dApps
can ask you to sign-in using the [wallet](https://testnet.mynearwallet.com), which automatically creates and gives a `FunctionCall` key to the dApp.

With the `FunctionCall` key, the dApp will then be able to call specific methods **in your account's behalf**, with a default allowance of 0.25Ⓝ for gas.

If the dApps requests to transfer **any amount of tokens** with the `FunctionCall` key, the user will be once more prompt by the wallet to **authorize the transaction**.


---

## Locked Accounts
If you remove all keys from an account, then the account will become **locked**, meaning that no external actor can perform transactions in the
account's name.

In practice, this means that only the account's smart contract can transfer assets, create sub-accounts, or update its own code.

Locking an account is very useful when one wants to deploy a contract, and let the community be assured that only the contract is in control of the account.