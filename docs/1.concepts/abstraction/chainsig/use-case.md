---
id: use-cases
title: Use Cases
---

Chain signatures enable you to implement multichain and cross-chain workflows in a simple way. Let's take a look at a few possible use cases.

---

<!-- ## Oauth-controlled Blockchain accounts

On-boarding is a huge problem for decentralized applications. If you want widespread adoption you can't expect people to keep seed phrases safe in order to use an application.

An attractive way of managing Web3 accounts is to use familiar login methods. For example, one could:

1. Gatekeep the [`sign` method](./what-is.md#1-signing-up-for-the-mpc-service) requiring a [JWT Token](https://jwt.io/). 
    1. Users can embed the `payload` and `path` parameters in the Token's data
    2. NEAR contracts can validate the token's signature
2. Create a web service that validates the user's identity (e.g. with their email), and replies with a JWT Token on success
3. The user holding that token can interact with blockchain applications on Ethereum/Polygon/+++ via the NEAR contract for the duration of it's validity

Any method of controlling a NEAR account can also be used to control a cross-chain account.

:::info About JWT tokens
JSON Web Tokens are a standard RFC 7519 method for representing claims securely between two parties. They are used in this example to represent the claim that someone is the owner of an Oauth account.
:::

---  -->

## Cross-chain Zero-friction onboarding

Using unique features of the NEAR account model, [Keypom](https://keypom.xyz/) provides zero-friction onboarding and transactions on NEAR. They are generally used for NFT drops, FT drops, and ticketing.

A generic Keypom user-flow could be: 

1. The developer creates and funds a restricted NEAR account
2. The user receives a key with limited control of the account
3. The user uses the funded account to call controlled endpoints on NEAR
4. The user returns the remaining funds to the developer and their account is unlocked

:::tip
This allows easy on-boarding to decentralized apps. The accounts are initially restricted to prevent the user being able to simply withdraw the `NEAR` from the account. 
:::

<hr class="subsection" />

### Using Chain Signatures

With Chain Signatures you can do the same but across many chains, for example Polygon:

1. The developer creates a restricted NEAR account with a key
2. The account is funded with `NEAR` and `MATIC`
3. The user receives a key with limited control of the account
4. The user uses the funded account to sign payloads calling controlled endpoints on Polygon
5. The user returns the remaining funds to the developer and their account is unlocked

This allows developers to pay for users to use arbitrary contracts on arbitrary chains.

---

## Decentralized Clients

A big problem in decentralized applications is that while the smart contracts are tamper-proof, the clients that access them generally are not. This allows practically complete control over any user account provided they are using the frontend assets that you serve. This has security, trust, and regulatory implications.

When smart contracts can sign payloads you can start using [signed exchanges](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#name-introduction) (or polyfills) to require HTTP exchanges to be signed by a certain key. If it is not signed with this key the SSL certificate is considered invalid. This means that individual users cannot be served invalid frontends without it being generally observable and non repudiable.

---

## Communication with private NEAR Shards

Companies like [Calimero](https://www.calimero.network/) offer private NEAR shards. Currently, sending messages to and from these NEAR shards is troublesome. If each shard had the ability to sign their message queues, they could be securely sent from one shard to another. Thus you could communicate bidirectionally with any shard as easily as you can with a contract on your own shard.

:::tip
This could also simplify NEAR's sharding model, by treating each NEAR shard like one would a private shard.
:::
