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

Following a regular Rust project, the file structure for the smart contract has a `Cargo.toml` file to define the code dependencies, and a `src` folder where all the Rust source files are stored. The `res` folder stores the compiled `wasm` output, and the `build.sh` script has the required commands to compile the sources.

### Source files

- [approval.rs](#approvalrs): this file has the functions that controls the access and transfers of non-fungible tokens.
- [enumeration.rs](#enumerationrs): this file contains the methods to list NFT tokens and their owners.
- [lib.rs](#librs): this file holds the smart contract initialization functions.
- [metadata.rs](#metadatars): in this file you'll define the token and metadata structure.
- [mint.rs](#mintrs): this file holds the token minting logic.
- [nft_core.rs](#nft_corers): here you'll find the core logic that allows you to transfer NFTs between users.
- [royalty.rs](#royaltyrs): this file has the payout-related functions.

:::tip
You can check out this code example from our [GitHub repository](ttps://github.com/near-examples/nft-tutorial/tree/1.skeleton/).
:::

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
├── res
│   └── nft_simple.wasm
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

- **nft_approve**: this function approves an account ID to transfer a token on your behalf.
- **nft_is_approved**: this method checks if the input account has access to approve the token ID.
- **nft_revoke**: this call revokes a specific account from transferring the token on your behalf.
- **nft_revoke_all**: this revokes all accounts from transferring the token on your behalf.
- **nft_on_approve**: this callback function, initiated during `nft_approve`, is a cross contract call to an external contract.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/approval.rs#L7-L36
```

## `enumeration.rs`

- **nft_tokens**: this function queries for NFT tokens on the contract regardless of the owner. This call uses pagination.
- **nft_supply_for_owner**: this call gets the total supply of NFTs for a given owner.
- **nft_tokens_for_owner**: this method queries all non-fungible tokens for a specific owner.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/enumeration.rs#L4-L33
```

## `lib.rs`

- **new_default_meta**: this function initializes the contract with default `metadata` so the user doesn't have to provide any input.
- **new**: this call initializes the contract with the user-provided `metadata`. 

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/lib.rs#L45-L68
```

## `metadata.rs`

- **TokenMetadata**: this structure defines the token's metadata.
- **Token**: this structure defines the token.
- **JsonToken**: this JSON token is what will be returned from `nft_metadata` view calls.
- **nft_metadata**: this view call returns the contract metadata.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/metadata.rs#L7-L48
```

## `mint.rs`

- **nft_mint**: this function mints a non-fungible token.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/mint.rs#L4-L16
```

## `nft_core.rs`

- **nft_transfer**: this function transfers an NFT to a receiver ID.
- **nft_transfer_call**: this transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.
- **nft_token**: this function gets information about the input NFT token.
- **nft_on_transfer**: this method is stored on the receiver contract that is called via cross contract call when `nft_transfer_call` is called. Returns `true` if the token should be returned back to the sender.
- **nft_resolve_transfer**: Resolves the promise of the cross contract call to the receiver contract this is stored on THIS contract and is meant to analyze what happened in the cross contract call when nft_on_transfer was called as part of the `nft_transfer_call` method.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/nft_core.rs#L8-L57
```

## `royalty.rs`

- **nft_payout**: this view method calculates the payout for a given token.
- **nft_transfer_payout**: this function transfers the token to the receiver ID and returns the payout object that should be paid for a given balance.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/royalty.rs#L3-L17
```

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

As this source is just a skeleton you'll get many warnings about unused code, such as:

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

Don't worry about these warnings, you're not going to deploy this contract anyways.
Building the skeleton is useful to validate that your Rust toolchain works properly and that you'll be able to compile improved versions of this NFT contract in the upcoming tutorials.

## Conclusion

You've seen the layout of this NFT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [Minting tutorial](/docs/tutorials/contracts/nfts/minting).



:::note Versioning for this article
At the time of this writing, this example works with the following versions:
- rustc: `1.56.0 (09c42c458 2021-10-18)`
:::
