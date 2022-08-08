---
id: model
title: Account Model
---

In order to join the NEAR ecosystem, users need to create an account. NEAR accounts are simple
to use and present a variety of advantages with respect to other blockchain ecosystems.

#### [Human-Readable Accounts](account-id.md)
NEAR leverages [human-readable accounts](account-id.md) to simplify remembering them. In this way, accounts have addresses such as `alice.near`
instead of long strings of random characters.

#### [Permissions Through Access Keys](access-keys.md)
NEAR accounts can have multiple [keys](access-keys.md), each with their own set of permissions. This allows to share individual keys
with third-parties, limiting their potential impact in your account, and allowing to replace any compromised key.

#### [Simple to Develop Smart Contracts](../smartcontracts/smartcontract.md)
NEAR accounts can optionally hold a small piece of software, known as a [smart contract](../smartcontracts/smartcontract.md). NEAR contracts are written in established languages
such as Rust or JavaScript.

---

## Comparison With Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|                   | Ethereum Wallet                                                                             | NEAR Account                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Public Identifier | Public Key (`0x123...`)                                                                     | Account ID (`alice.near`)                                                               |
| Secret Key        | Private Key (`0x456...`)                                                                    | Multiple Keypairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key   |
| Characteristics   | - Private key gives full access<br />- Account doesn't have to be created via a transaction | - Permission-based keypair<br />- Account ID must be created via blockchain transaction |
