---
id: skeleton
title: Skeleton and Rust Architecture
sidebar_label: Contract Architecture
---

In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.
You'll discover the contract's layout, and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/docs/develop/contracts/rust/intro) is a great place to start.
:::

## Introduction

This tutorial presents the code skeleton for the NFT smart contract and its file structure.
You'll find how all the functions are laid out, and the missing Rust code that needs to be filled in.
Once every file and function has been covered, you'll go through the process of building the mock-up contract to confirm that your Rust toolchain works as expected.

:::note
Return types have been removed from this code example so the contract can still compile properly.
:::

## File structure

Following a regular Rust project, the file structure for the smart contract has a `Cargo.toml` file to define the code dependencies, and a `src` folder where all the Rust source files are stored. A `target` folder will store the compiled `wasm` output, and the `build.sh` script has been added to provide a convenient way to compile the sources.

### Source files

- [approval.rs](#approvalrs): this file has the functions that controls the access and transfers of non-fungible tokens.
- [enumeration.rs](#enumerationrs): this file contains the methods to list NFT tokens and their owners.
- [lib.rs](#librs): this file holds the smart contract initialization functions.
- [metadata.rs](#metadatars): in this file you'll define the token and metadata structure.
- [mint.rs](#mintrs): this file holds the token minting logic.
- [nft_core.rs](#nft_corers): here you'll find the core logic that allows you to transfer NFTs between users.
- [royalty.rs](#royaltyrs): this file has the payout-related functions.

:::tip
You can check out this code example from our [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/1.skeleton/).
:::

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    └── royalty.rs
```

## `approval.rs`

This file contains the logic for the standard's [approvals management](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) extension.
This allows people to approve other accounts to transfer NFTs on their behalf.

- **nft_approve**: this function approves an account ID to transfer a token on your behalf.
- **nft_is_approved**: this method checks if the input account has access to approve the token ID.
- **nft_revoke**: this call revokes a specific account from transferring the token on your behalf.
- **nft_revoke_all**: this revokes all accounts from transferring the token on your behalf.
- **nft_on_approve**: this callback function, initiated during `nft_approve`, is a cross contract call to an external contract.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/approval.rs#L7-L36
```

You'll learn more about these functions in the [approvals section](/docs/tutorials/contracts/nfts/approvals) of the tutorial series.

## `enumeration.rs`

This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html) extension.

- **nft_tokens**: this function returns a paginated list of NFTs stored on the contract regardless of their owner.
- **nft_supply_for_owner**: this function allows you view the total number of NFTs owned by any given user.
- **nft_tokens_for_owner**: this function returns a paginated list of NFTs owned by any given user.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/enumeration.rs#L4-L33
```

You'll learn more about these functions in the [enumeration section](/docs/tutorials/contracts/nfts/enumeration) of the tutorial series.

## `lib.rs`

This file outlines what information the contract stores and keeps track of.

- **new_default_meta**: this function initializes the contract with default `metadata` so the user doesn't have to provide any input.
- **new**: this call initializes the contract with the user-provided `metadata`.

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/lib.rs#L45-L68
```

You'll learn more about these functions in the [minting section](/docs/tutorials/contracts/nfts/minting) of the tutorial series.

## `metadata.rs`

This file is used to keep track of the information to be stored for tokens, and metadata.
In addition, you can define a function to view the contract's metadata.
This is part of the standard's [metadata](https://nomicon.io/Standards/NonFungibleToken/Metadata.html) extension.

- **TokenMetadata**: this structure defines the metadata that can be stored for each token. This includes the title, description, media, and more.
- **Token**: this structure outlines what information will be stored on the contract for each token.
- **JsonToken**: when querying information about NFTs through view calls, the return information is stored in this JSON token..
- **nft_metadata**: this function allows users to query for the contact's internal metadata.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/metadata.rs#L10-L54
```

You'll learn more about these functions in the [minting section](/docs/tutorials/contracts/nfts/minting) of the tutorial series.

## `mint.rs`

- **nft_mint**: this function mints a non-fungible token.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/mint.rs#L4-L16
```

## `nft_core.rs`

- **nft_transfer**: this function transfers an NFT to a receiver ID.
- **nft_transfer_call**: this transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.
- **nft_token**: this function allows users to query for the information about a specific NFT.
- **nft_on_transfer**: this function is called by other contracts when an NFT is transferred to your contract account via the `nft_transfer_call` method. It returns `true` if the token should be returned back to the sender.
- **nft_resolve_transfer**: when you start the `nft_transfer_call` and transfer an NFT, the standard also calls a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/nft_core.rs#L8-L57
```

You'll learn more about these functions in the [minting section](/docs/tutorials/contracts/nfts/minting) of the tutorial series.

## `royalty.rs`

- **nft_payout**: this view method calculates the payout for a given token.
- **nft_transfer_payout**: this function transfers the token to the receiver ID and returns the payout object that should be paid for a given balance.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/royalty.rs#L3-L17
```

You'll learn more about these functions in the [royalty section](/docs/tutorials/contracts/nfts/royalty) of the tutorial series.

## Building the skeleton

If you haven't cloned the main repository yet, open a terminal and run:

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

Next, switch to the `1.skeleton` branch and build the contract with `yarn`:

```sh
cd nft-tutorial
git switch 1.skeleton
yarn build
```

> As mentioned previously, none of the functions listed in this tutorial have return values.
> All the return values have been stripped away so the contract can be compiled.

Since this source is just a skeleton you'll get many warnings about unused code, such as:

```
   Compiling nft_simple v0.1.0 (/Users/dparrino/near/nft-tutorial/nft-contract)
warning: unused imports: `LazyOption`, `LookupMap`, `UnorderedMap`, `UnorderedSet`
 --> src/lib.rs:3:29
  |
3 | use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
  |                             ^^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default
...
...
...
warning: constant is never used: `NO_DEPOSIT`
 --> src/nft_core.rs:6:1
  |
6 | const NO_DEPOSIT: Balance = 0;
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: `nft_simple` (lib) generated 50 warnings
    Finished release [optimized] target(s) in 22.58s
✨  Done in 22.74s.
```

Don't worry about these warnings, you're not going to deploy this contract yet.
Building the skeleton is useful to validate that your Rust toolchain works properly and that you'll be able to compile improved versions of this NFT contract in the upcoming tutorials.

## Conclusion

You've seen the layout of this NFT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [Minting tutorial](/docs/tutorials/contracts/nfts/minting).

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.56.0 (09c42c458 2021-10-18)`
  :::
