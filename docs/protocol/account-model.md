---
id: account-model
title: NEAR Accounts
sidebar_label: Overview
---

Users participate in the NEAR ecosystem through their NEAR accounts. These accounts are identified by a [unique address](./account-id.md), can optionally hold a [smart contract](../smart-contracts/what-is.md), and are controlled through [Access Keys](./access-keys.md).

By signing [transactions](./transactions.md) with their account, users can:

1. Send and receive **digital assets** (such as tokens or collectibles)
2. Create and interact with on-chain applications known as **smart contracts**
3. Control accounts in **other chains** (such as Ethereum or Bitcoin) ✨
4. Help onboard new users by **covering the costs** of their transactions (gas fees)

:::tip Want to create an account?
You have multiple ways to create an account, you can [sign-up using your email](https://dev.near.org/signup), get a mobile wallet through [telegram](https://web.telegram.org/k/#@herewalletbot), or create a [web wallet](https://wallet.meteorwallet.app)
:::

---

## Account Model Overview

Let's take a closer look at the different elements that compose the NEAR account model.

![img](@site/static/docs/assets/welcome-pages/accounts.png)


#### [Account ID](account-id.md)
NEAR **natively** implements two types of accounts:
1. **Named accounts** such as `alice.near`, which are simple to remember and share
2. **Implicit accounts** such as `0xfb9243ce...`, which are derived from a private key

#### [Permissions Through Access Keys](access-keys.md)
NEAR accounts can have multiple [keys](access-keys.md), each with their own set of permissions:
- You can easily swap keys if one gets compromised
- You can use keys as authorization tokens for third-party applications

#### [Simple to Develop Smart Contracts](../smart-contracts/what-is.md)
NEAR accounts can optionally hold an application - known as a [smart contract](../smart-contracts/what-is.md) - which can be written in Javascript or Rust.

---

## Comparison With Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|                 | Ethereum Account         | NEAR Account                                                                           |
|-----------------|--------------------------|----------------------------------------------------------------------------------------|
| Account ID      | Public Key (`0x123...`)  | - Native named accounts (`alice.near`) <br />- Implicit accounts (`0x123...`)          |
| Secret Key      | Private Key (`0x456...`) | Multiple key-pairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key |
| Smart Contracts | Synchronous execution    | Asynchronous execution                                                                 |
| Gas Fees        | In the order of dollars  | In the order of tenths of a cent                                                       |
| Block Time      | ~12 seconds              | ~1.3 second                                                                            |
