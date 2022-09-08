---
id: overview
title: Quick Overview
---

Lets start with a quick overview of the different elements that compose the NEAR blockchain.

---

## Accounts

NEAR uses human-readable account names such as `alice.near` or `bob.near` instead of a public hash such as`0x71C7656EC7ab88b098defB751B7401B5f6d8976F`. 

These accounts also have the permission to create subaccounts such as `nft.alice.near` or `example2.bob.near`. It's important to know that only the root account can create the subaccount. So only `alice.near` can create `nft.alice.near` and only `nft.alice.near` can create `example.nft.alice.near`. Note that `alice.near` ***does not*** have permission to create `example.nft.alice.near`. Only the direct parent account has permission to create a subaccount.

:::tip
For more information see the **[accounts section](/concepts/basics/accounts/model)**.
:::

<hr class="subsection" />

## Keys

On most blockchains, there is one [public/private key pair](https://en.wikipedia.org/wiki/Public-key_cryptography) per account. On NEAR, each account can have many key pairs associated with them which we call "Access Keys". There are two types of "Access Keys":

- [Full Access](/concepts/basics/accounts/access-keys#full-access-keys) _(Grants full control to the account)_
- [Function Call](/concepts/basics/accounts/access-keys#function-call-keys) _(Allows for only non-monetary transaction signing)_

Full access keys allow for full control of the account. You can send funds, create sub-accounts, delete the account, and more. Function call keys only allow for calling certain methods on a specific smart contract that **do not** allow the transferring of funds. These keys can be used by dApp developers to allow users to sign simple transactions that mutate state on the blockchain without having to constantly re-direct to the user's wallet to prompt for authorization. They can be widely or narrowly scoped depending on the use case.

:::tip
For more information see the **[access keys section](/concepts/basics/accounts/access-keys)**.
:::

<hr class="subsection" />

### Contracts

Every NEAR account can hold **a** smart contract, which is a small piece of logic embedded directly in the account. Smart contracts in NEAR can be developed using either Javascript or [Rust](https://www.rust-lang.org/). Smart contracts that have been deployed can be [updated](/sdk/rust/building/prototyping) at any time but not removed. This is where [sub-accounts](#concepts/basics/accounts/model#subaccounts) can come in handy. NEAR allows users to organize and create a hierarchy for their accounts. 

As an example, benji could have the root account `benji.near`. He then stores all his NFT contracts as sub-accounts of `nft.benji.near`. For example, he worked on a cool lazy minting contract deployed to `lazy.nft.benji.near`. This not only allows for better organization but it allows developers to easily delete and re-create accounts in order to clear state.

:::tip
For more information see a guide on **[deploying contracts](/sdk/rust/promises/deploy-contract)**.
:::

<hr class="subsection" />

### Storage

Any information that is stored on NEAR is accounted for using a mechanism called [storage staking](/concepts/storage/storage-staking). In short, an account must maintain a certain balance that is locked in order to cover the cost of storage. If that storage is released, the funds become available once again. This is why named account IDs on NEAR cost an initial deposit to create. If you attempt to store state on-chain without having the necessary balance in your account to cover the cost, an error will be thrown which will tell you to add more NEAR to your account.

:::tip
For more information on storage staking, see the **[storage staking section](/concepts/storage/storage-staking)**.
:::