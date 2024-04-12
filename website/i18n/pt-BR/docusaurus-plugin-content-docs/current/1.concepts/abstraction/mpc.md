---
id: mpc
title: Multi-Party Computation (MPC)
---

MPC, or multi-party computation, is about how multiple parties can do shared computations on private inputs without revealing the private data.

As an example, suppose two investors want to compare who holds more crypto tokens without revealing their account balances. MPC can solve this situation, by computing the function `f(x > y)`, where `x` and `y` are private inputs. Each person would submit a private value, and would get the function `x > y` result.

In general, MPC can be used to build all kinds of useful protocols, like threshold cryptography, dark pools, and private auctions. For example, MPC can be used to jointly encrypt a message, with the key split up among many different parties.

<details>
<summary> MPC versus key splitting</summary>
In secret sharing, the key has to get reassembled. At some point, some trusted party is going to have the entire key available to them. With MPC, the whole operation is done in MPC, meaning there's no point where the combined key could be extracted.
</details>

:::info
Want to learn more about multi-party computation? Check [this article](https://www.zellic.io/blog/mpc-from-scratch/).
:::

---

## MPC signature generation

- MPC nodes are doing a multistep process called signature generation.
- They are doing it by using user key shares derived from their root key shares.
- A root key is never reconstructed, but protocol allows to create signatures using it’s shares.

:::info
Using MPC, the root key is never reconstructed and it’s never available. User key is never reconstructed as well.
:::

## How MPC creates a new key

- Once MPC account verification is complete, a root key becomes available to sign a new signature that creates a new key
- This new key is created using [Additive Key Deriviation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation) (a mechanism for deriving many _sub-keys_ from a single _master key_)
- This new sub-key can now be used to sign a payload for a given account associated with a given blockchain
