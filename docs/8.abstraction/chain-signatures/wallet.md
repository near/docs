---
id: wallet
title: Wallet Chain Key Rules 
---

## Overview

In this article you'll find details on how to parse and present multichain transactions to the user so they can take an informed decision about their wallet's assets, while minimizing the number of times the user has to consent.
You'll also learn how to ensure that a signature on one chain is not used to take a meaningful action on another chain.

### Key derivation

When signing using [chain signatures](#) each account has an unlimited number of keys. Each key's public key is derived from the account name and the key extension which is an arbitrary string. 

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

This can be solved by having different keys for any chains that you can't prove could have ambiguous transactions. This means that while an attacker may create ambiguous transactions, it will only be for wallets without assets on the target chain.


## Structure

This is the chain signature key format structure:

```
| account | chain | domain | subkey |
"david.near,bitcoin,near.org,somedata"
```

### Examples

| Key | Description |
|-----|-------------|
| `david.near,,,`                |  Personal untyped key, probably never used by a client |
| `david.near,bitcoin,,`         |  Personal bitcoin key |
| `david.near,bitcoin,near.org,` |  A bitcoin key used on `near.org` |
| `david.near,,near.org,`        |  An untyped key used on `near.org` |


## Example user flows

- [Using a domains bitcoin key](#using-a-domains-bitcoin-key)
- [Using a personal Bitcoin key](#using-a-personal-bitcoin-key)
- [Using a personal EVM key to sign a Binance transaction](#using-a-personal-evm-key-to-sign-a-binance-transaction)
- [Using an untyped domain key](#using-an-untyped-domain-key)
- [Using another domains Bitcoin key](#using-another-domains-bitcoin-key)

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
