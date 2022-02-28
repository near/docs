---
id: new-to-near
title: New to NEAR?
sidebar_label: New to NEAR?
---

Welcome! If you have questions along the way, join our community on [Discord](http://near.chat/) and reach out! We're here to help.

## What is NEAR? {#what-is-near}

NEAR is a blockchain that has been built from the ground up to be high-performant, incredibly secure, and infinitely scalable all while supporting sustainability. 

Simply put, NEAR is a [layer one](https://blockchain-comparison.com/blockchain-protocols/), [sharded](https://near.org/blog/near-launches-nightshade-sharding-paving-the-way-for-mass-adoption), [proof-of-stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain built for usability and scalability.

## Why Build on NEAR? {#why-build-on-near}

- NEAR's [proof of stake](https://en.wikipedia.org/wiki/Proof_of_stake) network is sustainable and **[certified carbon-neutral!](https://near.org/blog/the-near-blockchain-is-climate-neutral/)**
- Almost infinitely scalable and resilient to short-term usage spikes through [sharding](https://near.org/blog/near-launches-nightshade-sharding-paving-the-way-for-mass-adoption). 
- [Human-readable account names](https://docs.near.org/docs/concepts/account) _(`alice.near` instead of `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`)_
- Fast. [~1.2 second](https://explorer.near.org/) block production time.
- 1000x lower transaction fees for users.
- 30% of gas fees are paid out to smart contract developers.
- Interoperable with Ethereum using [Rainbow Bridge](https://rainbowbridge.app/transfer) _(first trustless bridge ever created)_.
- EVM compatible with [Project Aurora](http://www.aurora.dev) _(Deploy your Solidity contracts with ease)_.
- Free educational courses with live teachers at [NEAR University](http://near.university).
- Project funding available through our [Grants Program](http://near.org/grants).

## How do I get started? {#how-do-i-get-started}

1. Create an [account](https://wallet.testnet.near.org/).
2. Choose a [starter project](http://near.dev/).
3. Check out the [NEAR Explorer](http://explorer.testnet.near.org).
4. Try out the [Developer Console](https://console.pagoda.co/).
4. Dive [into the docs](https://docs.near.org).
5. Enroll in [NEAR University](http://near.university).
5. [Join our Discord](http://near.chat)!

---

## Account Model

### Accounts

As mentioned earlier, NEAR uses human-readable account names such as `alice.near` or `bob.near` instead of a public hash such as`0x71C7656EC7ab88b098defB751B7401B5f6d8976F`. 


These accounts also have the permission to create subaccounts such as `nft.alice.near` or `example2.bob.near`. It's important to know that only the root account can create the subaccount. So only `alice.near` can create `nft.alice.near` and only `nft.alice.near` can create `example.nft.alice.near`. Note that `alice.near` ***does not*** have permission to create `example.nft.alice.near`. Only the direct parent account has permission to create a subaccount.

> For more information see the **[accounts section](/docs/concepts/account)**.

### Keys

On most blockchains, there is one [public/private key pair](https://en.wikipedia.org/wiki/Public-key_cryptography) per account. On NEAR, each account can have many key pairs associated with them which we call "Access Keys". There are two types of "Access Keys":

- [Full Access](/docs/concepts/account#full-access-keys) _(Grants full control to the account)_
- [Function Call](/docs/concepts/account#function-call-keys) _(Allows for only non-monetary transaction signing)_

Full access keys allow for full control of the account. You can send funds, create sub-accounts, delete the account, and more. Function call keys only allow for calling certain methods on a specific smart contract that **do not** allow the transferring of funds. These keys can be used by dApp developers to allow users to sign simple transactions that mutate state on the blockchain without having to constantly re-direct to the user's wallet to prompt for authorization. They can be widely or narrowly scoped depending on the use case.

> For more information see the **[access keys section](/docs/concepts/account#access-keys)**.

### Contracts

For each account, **only one** smart contract can be deployed. This is where [subaccounts](#/docs/concepts/account#subaccounts) can come in handy.


## What else can I explore? {#what-else-can-i-explore}

- [StackOverflow Questions](https://stackoverflow.com/tags/nearprotocol)
- [Lunch & Learn Series](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y)


## Stay Connected {#stay-connected}

- [ [ Chat](https://near.chat) ] with us!
- [ [Read](https://near.org/blog/) ] our blog.
- [ [Join](https://near.events/) ] us at upcoming events.
- [ [Participate](https://gov.near.org) ] in our governance.
