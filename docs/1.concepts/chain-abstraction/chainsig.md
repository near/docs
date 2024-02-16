---
id: signatures
title: Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Chain signatures unlock the ability for a single account to transact across multiple blockchain protocols, giving ownership of many accounts to one NEAR account.

This many-to-one ownership model is made possible through NEAR’s native account abstraction, which allows a nearly infinite number of keys to be associated with a single account. Chain Signatures leverages this ability to create keys for accounts on other blockchain platforms, enabling the NEAR account control of data and assets on different chains.

## How it works

Chain Signatures allows you to call the `sign()` method on `multichain.near`:

```rust
    pub fn sign(payload: [u8; 32], path: String) -> Signature {
```

The signature is calculated on the data payload using a user-provided key. The signature's public key is always the same, as long as the caller and the key path remain the same.

:::info
The signature is an ECDSA signature on the Secp256k1 curve.
:::

### Workflow

- A NEAR account requests a payload to be signed by a deployed [MPC](#multi-party-computation-mpc) smart contract
  > This request is performed by calling `sign` and passing the payload (hash from a message or transaction)
- A key is derived from the MPC root key using `account_id` and derivation path. (this ensures that it will be the same key if the two parameters are the same)
- Once the client gets the signature, it can send the transaction to a relayer
  > In a future release, an indexing service will listen to all `sign` events from the MPC contract and will trigger a multi-chain relayer

## Multi-party computation (MPC)

MPC, or multi-party computation, is about how multiple parties can do shared computations on private inputs without revealing the private data.

As an example, suppose two investors want to compare who holds more crypto tokens without revealing their account balances. MPC can solve this situation, by computing the function `f(x > y)`, where `x` and `y` are private inputs. Each person would submit a private value, and would get the function `x > y` result.

In general, MPC can be used to build all kinds of useful protocols, like threshold cryptography, dark pools, and private auctions. For example, MPC can be used to jointly encrypt a message, with the key split up among many different parties.

:::tip MPC versus key splitting

In secret sharing, the key has to get reassembled. At some point, some trusted party is going to have the entire key available to them. With MPC, the whole operation is done in MPC, meaning there's no point where the combined key could be extracted.
:::

:::info
Want to learn more about multi-party computation? Check [this article](https://www.zellic.io/blog/mpc-from-scratch/).
:::

### MPC signature generation

- MPC nodes are doing a multistep process called signature generation.
- They are doing it by using user key shares derived from their root key shares.
- A root key is never reconstructed, but protocol allows to create signatures using it’s shares.

:::info
Using MPC, the root key is never reconstructed and it’s never available. User key is never reconstructed as well.
:::

### How MPC creates a new key

- Once MPC account verification is complete, a root key becomes available to sign a new signature that creates a new key
- This new key is created using [Additive Key Deriviation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation) (a mechanism for deriving many _sub-keys_ from a single _master key_)
- This new sub-key can now be used to sign a payload for a given account associated with a given blockchain

## Use cases

Chain signatures enable you to implement multichain and cross-chain workflows in a simple way.
Take a look at a few possible use cases:

### Oauth-controlled Blockchain accounts

On-boarding is a huge problem for decentralized applications. If you want widespread adoption you can't expect people to keep seed phrases safe in order to use an application.

An attractive way of managing Web3 accounts is to use existing Web2 accounts to on-board users. This can be done in the following way:

1. Deploy a NEAR contract that allows the bearer of a user's [JWT token](https://jwt.io/) to sign a blockchain transaction (Ethereum, Polygon, Avalanche, and others)
2. The user validates their identity with a third-party receiving a JWT Token
3. The user holding that token can interact with blockchain applications on Ethereum/Polygon/+++ via the NEAR contract for the duration of it's validity

Any method of controlling a NEAR account can also be used to control a cross-chain account.

:::info About JWT tokens
JSON Web Tokens are a standard RFC 7519 method for representing claims securely between two parties. They are used in this example to represent the claim that someone is the owner of an Oauth account.
:::

### Cross-chain Zero-friction onboarding

Using unique features of the NEAR account model, [Keypom](https://keypom.xyz/) provides zero-friction onboarding and transactions on NEAR. They are generally used for NFT drops, FT drops, and ticketing.

A generic Keypom user-flow could be: 

1. The developer creates a restricted NEAR account
2. The account is funded with `NEAR`
3. The user receives a key with limited control of the account
4. The user uses the funded account to call controlled endpoints on NEAR
5. The user returns the remaining funds to the developer and their account is unlocked

:::tip
This allows easy on-boarding to decentralized apps. The accounts are initially restricted to prevent the user being able to simply withdraw the `NEAR` from the account. 
:::

#### Using Chain Signatures

With Chain Signatures you can do the same but across many chains, for example Polygon:

1. The developer creates a restricted NEAR account with a key
2. The account is funded with `NEAR` and `MATIC`
3. The user receives a key with limited control of the account
4. The user uses the funded account to sign payloads calling controlled endpoints on Polygon
5. The user returns the remaining funds to the developer and their account is unlocked

This allows developers to pay for users to use arbitrary contracts on arbitrary chains.

### Decentralized Clients

A big problem in decentralized applications is that while the smart contracts are tamper-proof, the clients that access them generally are not. This allows practically complete control over any user account provided they are using the frontend assets that you serve. This has security, trust, and regulatory implications.

When smart contracts can sign payloads you can start using [signed exchanges](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#name-introduction) (or polyfills) to require HTTP exchanges to be signed by a certain key. If it is not signed with this key the SSL certificate is considered invalid. This means that individual users cannot be served invalid frontends without it being generally observable and non repudiable.

### Communication with private NEAR Shards

Companies like [Calimero](https://www.calimero.network/) offer private NEAR shards. Currently, sending messages to and from these NEAR shards is troublesome. If each shard had the ability to sign their message queues, they could be securely sent from one shard to another. Thus you could communicate bidirectionally with any shard as easily as you can with a contract on your own shard.

:::tip
This could also simplify NEAR's sharding model, by treating each NEAR shard like one would a private shard.
:::
