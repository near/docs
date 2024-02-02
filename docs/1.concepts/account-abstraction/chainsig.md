---
id: chain-signatures
title: Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Chain Signatures allows you to the method on multichain.near:

```rust
    pub fn sign(payload: [u8; 32], path: String) -> Signature {
```

The signature is calculated on the data payload using a user-provided key. The signature's public key is always the same, as long as the caller and the key path remain the same.

:::info
The signature is an ECDSA signature on the Secp256k1 curve.
:::

## Use cases

For the sake of clarity I've broken down the use cases into simple component parts, but practically we're going to be using all of these use cases in a single application.

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

<!--
## Future use cases

### Chain decryptable messages [^1]

Certain on chain keys allow the following flow:

1. The sender sends encrypted data onto the chain
2. When a receiver proves they have a right to the data it is re-encrypted with their key
3. The receiver then decrypts the data

This is useful for paid content, whatsapp messages and any private data on chain.

Apart from the obvious this also enables:
- **Secret-bid auctions with MEV protection** Users can submit bids that are encrypted at the end of the auction, the smart contract can decrypt all bids with a single evaluation.
- **Dead man’s switch**. Journalists or whistleblowers can ensure that compromising information in their possession is automatically published if they were to become incapacitated
- **One-time programs** Programs that can be executed only once on a single input, and that don’t leak anything about the program other than the result of the computation


### On Chain Domain Control[^2]

It may be possible to use DNSSEC & email signatures to control the DNS record and the sending of emails from a domain.

There are practical issues

[^1]: This might require BLS signatures and further work [description of one implementation exists here](https://eprint.iacr.org/2023/616.pdf)
[^2]: This is speculative
-->
