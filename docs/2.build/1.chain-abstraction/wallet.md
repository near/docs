---
id: wallet
title: Wallet Chain Key Rules 
---

## Overview

In this article you'll find details on how to parse and present multichain transactions to the user so they can take an informed decision about their wallet's assets, while minimizing the number of times the user has to consent.
You'll also learn how to ensure that a signature on one chain is not used to take a meaningful action on another chain.

### Key derivation

When signing using [chain signatures](./chain-signatures.md) each account has an unlimited number of keys. Each key's public key is derived from the account name and the key extension which is an arbitrary string. 

User's keys can be described as follow:

```
"david.near,"              A key with no extension
"david.near, "             A key with an extension of " "
"david.near,cold_wallet"   A key with an extension of "cold_wallet"
```

:::tip
If the keys aren't identical they have no relationship.
:::

### Ambiguous signatures

You're going to be potentially storing keys for users who hold assets on many chains. Different chains have different ways of serializing and signing transactions. Many chains take steps to ensure that their signatures are not valid signatures on other chains. EVM chains use `ChainID` to disambiguate signatures between different EVM chains. Dfinity uses a unique salt on the hash of the transaction.

Unfortunately, while this is a best practice, you can't guarantee that all chains do this. As such, a user could receive an innocent looking transaction on one chain that could be used to take a destructive action on another chain.

An apocryphal example:

```
Transaction: "7b73656e643a2022313030222c206e6f74652022227d"
Parsed SOL: claim free NFT
Parsed BTC: send 100 BTC to Attacker
```

The user would approve the `SOL` transaction but the attacker would also get the `BTC` transaction.

This can be solved by having unique keys for different chains. That way, even if an attacker makes you sign a transaction that is also valid in a foreign chain, no assets will be compromised.


## Serialization format

We're using the following format for our derivations paths.

```typescript
{
   chain: number, // SLIP-44 coin type unsigned integer
   domain: String, // The domain that owns this key
   meta: any, // Catch all data structure
}
```

This is encoded in canonical [JSON RFC 8785](https://www.rfc-editor.org/rfc/rfc8785).

:::info
If you are not using a field don't make it `null`, don't include the key instead.
:::

### User-defined fields

For user-defined fields, the `meta` field can include any data you like. 

:::tip
Do not add any extra fields at the top level, as that may clash with future versions of this specification. If needed, put them in the `meta` field instead.
:::

For example, a simple way of selecting alternate keys will be using an object with an `ID` field:

```typescript
{
    meta: {id: 10}, // Pick the tenth bitcoin key
    chain: 0,
}
```

### Examples

| Key | Description |
|-----|-------------|
| `{chain: 0, domain: "near.org"}` |  A bitcoin key used on `near.org` |
| `{chain: 0, meta: {id: 3}}`      |  Use the third bitcoin key |


## Example user flows

In the following examples, the messages are coming from the user's wallet frontend.

- [Using a domains bitcoin key](#using-a-domains-bitcoin-key)
- [Using a personal Bitcoin key](#using-a-personal-bitcoin-key)
- [Using a personal EVM key to sign a Binance transaction](#using-a-personal-evm-key-to-sign-a-binance-transaction)
- [Using an untyped domain key](#using-an-untyped-domain-key)
- [Using another domains Bitcoin key](#using-another-domains-bitcoin-key)

:::tip
Wallet developers should follow this user flow format.
:::

### Using a domains bitcoin key

An application at `near.org` wants to sign the Bitcoin transaction `Send 100 BTC` using the key `david.near,bitcoin,near.org,`.

```
Signed ✅
```

We sign the transaction without confirmation because the key is owned by `near.org`.

### Using a personal Bitcoin key

An application at `near.org` wants to sign the Bitcoin transaction `Send 100 BTC` using the key `david.near,bitcoin,`.

```
near.org would like to run the following Bitcoin transaction:

Send 100 BTC
[Accept] [Reject]
```

The user must make an informed decision about whether this is an action they would like to take.

```
Signed ✅
```

### Using a personal EVM key to sign a Binance transaction

An application at `near.org` wants to sign the Binance Smart Chain transaction `Send 100 BNB, ChainID 56` using the key `david.near,evm,`. The wallet knows this is a BSC transaction because of the corresponding `ChainID` (56) and because the `evm` key is being used.

```
near.org would like to run the following Binance Smart Chain transaction:

Send 100 BNB
[Accept] [Reject]
```

The user must make an informed decision about whether this is an action they would like to take.

```
Signed ✅
```

### Using an untyped domain key

An application at `near.org` wants to sign the Bitcoin transaction `Send 100 BTC` using the key `david.near,,near.org,`.

```
Signed ✅
```

While this is ill advised, it's still the domains key so the domain can still choose whether to sign something using it.

### Using another domains Bitcoin key

An application at `attacker.com` wants to sign the Bitcoin transaction `Send 100 BTC` using the key `david.near,bitcoin,near.org,`.

```
Attacker.com would like to sign a transaction using your credentials from near.org

Send 100 BTC

This is a suspicious transaction and likely not one you should accept
[Reject] [Accept (Are you sure!)]
```

The user must make an explicit decision to do something that is ill advised.

```
Signed ✅
```

The correct way for `attacker.com` to make this request is to somehow redirect the user to `near.org` and get the user to make a decision there.
