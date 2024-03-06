---
id: model
title: The NEAR Account Model
sidebar_label: Overview
---

Users interact with the NEAR ecosystem through accounts. These accounts are identified by a [unique ID](./account-id.md), hold $NEAR tokens, are controlled through [Access Keys](./access-keys.md), and can optionally hold a [smart contract](./smartcontract.md).

![img](@site/static/docs/assets/welcome-pages/accounts.png)

NEAR accounts are the main way to interact with the NEAR Ecosystem. We will cover all use cases in the documentation, but as an overview, users can:

1. Send and receive tokens (such as $NEAR, or any other token on the NEAR blockchain)
2. Request to sign transactions in other blockchains (such as Ethereum)
3. Collect and drop digital assets
4. Interact with applications known as smart contracts
5. Deploy their own smart contracts so other accounts interact with them

:::tip Create an Account!
You have multiple ways to create an account, you can [sign-up using your email](https://near.org/), get a mobile wallet through [telegram](https://web.telegram.org/k/#@herewalletbot), or create a [web wallet](https://app.mynearwallet.com).
:::

---

## Account Model Overview 

Let's take a closer look at the different elements that compose the NEAR account model.

#### [Account ID](account-id.md)
NEAR implements two types of accounts IDs: [named accounts](account-id.md) such as `alice.near`, which are simple to remember and share, and alphanumeric IDs (`fb9243ce...`) - as other chains do.

#### [Permissions Through Access Keys](access-keys.md)
NEAR accounts can have multiple [keys](access-keys.md), each with their own set of permissions. This allows to swap keys if one gets compromised, and to use keys as authorization tokens for third-parties.

#### [Simple to Develop Smart Contracts](/concepts/basics/accounts/smartcontract)
NEAR accounts can optionally hold a simple program, known as a [smart contract](smartcontract.md). In NEAR, developers can create smart contracts using languages such as Javascript or Rust. 

#### [Mutable State (Storage)](state.md)
NEAR accounts have a state (storage) which can mutate when the user or the account's contract performs a transaction.

---

## Comparison With Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|                   | Ethereum Wallet                                                                             | NEAR Account                                                                            |
|-------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Public Identifier | Public Key (`0x123...`)                                                                     | Named IDs (`alice.near`) and implicit accounts (Public Key `0x123...`)                  |
| Secret Key        | Private Key (`0x456...`)                                                                    | Multiple key-pairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key  |
| Characteristics   | - Private key gives full access<br />- Account doesn't have to be created via a transaction | - Permission-based keypair<br />- Account ID must be created via blockchain transaction |
