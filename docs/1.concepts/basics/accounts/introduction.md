---
id: model
title: Account Model
---

In order to join the NEAR ecosystem, users need to create an account. NEAR accounts are unique when compared to other blockchain ecosystems.

#### [Human-Readable Accounts](account-id.md)
NEAR leverages [human-readable accounts](account-id.md) to simplify remembering them. In this way, accounts have addresses such as `alice.near`
instead of long strings of random characters.

#### [Permissions Through Access Keys](access-keys.md)
NEAR accounts can have multiple [keys](access-keys.md), each with their own set of permissions. This allows to grant specific authorizations to third-parties, while keeping the option to revoke them at any time.

#### [Simple to Develop Smart Contracts](/concepts/basics/accounts/smartcontract)
NEAR accounts can optionally hold a simple program, known as a [smart contract](smartcontract.md). In NEAR, developers can create smart contracts using languages such as Javascript or Rust. 

#### [Mutable State (Storage)](state.md)
NEAR accounts have a state (storage) which can mutate when the user or the account's contract performs a transaction.

---

## Comparison With Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|                   | Ethereum Wallet                                                                             | NEAR Account                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Public Identifier | Public Key (`0x123...`)                                                                     | Account ID (`alice.near`)                                                               |
| Secret Key        | Private Key (`0x456...`)                                                                    | Multiple Keypairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key   |
| Characteristics   | - Private key gives full access<br />- Account doesn't have to be created via a transaction | - Permission-based keypair<br />- Account ID must be created via blockchain transaction |
