---
id: account-model
title: NEAR Accounts
sidebar_label: Overview
---

Users participate in the NEAR ecosystem through their NEAR accounts. These accounts are identified by a [unique address](./account-id.md), can optionally hold a [smart contract](../../2.build/2.smart-contracts/what-is.md), and are controlled through [Access Keys](./access-keys.md).

By signing [transactions](./transactions.md) with their account, users can:

1. Send and receive **digital assets** (such as tokens or collectibles)
2. Create and interact with on-chain applications known as **smart contracts**
3. Control accounts in **other chains** (such as Ethereum or Bitcoin) ✨
4. Help onboard new users by **covering the costs** of their transactions (gas fees)

:::tip Want to create an account?
You have multiple ways to create an account, you can [sign-up using your email](https://dev.near.org/signup) (note: email-based accounts currently have limited ability to transfer funds or sign transactions), get a mobile wallet through [telegram](https://web.telegram.org/k/#@herewalletbot), or create a [web wallet](https://app.mynearwallet.com).
:::

---

## Account Model Overview 

Let's take a closer look at the different elements that compose the NEAR account model.

![img](@site/static/docs/assets/welcome-pages/accounts.png)


#### [Account ID](account-id.md)
NEAR implements two types of accounts IDs: **named accounts** such as `alice.near`, which are simple to remember and share, and the classic alphanumeric IDs (`fb9243ce...`) that other chains also implement.

#### [Permissions Through Access Keys](access-keys.md)
NEAR accounts can have multiple [keys](access-keys.md), each with their own set of permissions. This allows to easily swap keys if one gets compromised, and to use keys as authorization tokens for third-parties.

#### [Simple to Develop Smart Contracts](../../2.build/2.smart-contracts/what-is.md)
NEAR accounts can optionally hold a simple program, known as a [smart contract](../../2.build/2.smart-contracts/what-is.md). In NEAR, developers can create smart contracts using languages such as Javascript or Rust. 

---

## Comparison With Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|                   | Ethereum Wallet                                                                             | NEAR Account                                                                            |
|-------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Public Identifier | Public Key (`0x123...`)                                                                     | Named IDs (`alice.near`) and implicit accounts (Public Key `0x123...`)                  |
| Secret Key        | Private Key (`0x456...`)                                                                    | Multiple key-pairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key  |
| Characteristics   | - Private key gives full access<br />- Account doesn't have to be created via a transaction | - Permission-based keypair<br />- Account ID must be created via blockchain transaction |
