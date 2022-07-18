---
id: skeleton
title: Skeleton and Rust Architecture
sidebar_label: Contract Architecture
---

> In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.
> You'll discover the contract's layout and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/develop/quickstart-guide) is a great place to start.
:::

---

## Introduction

This tutorial presents the code skeleton for the NFT smart contract and its file structure.
You'll find how all the functions are laid out as well as the missing Rust code that needs to be filled in.
Once every file and function has been covered, you'll go through the process of building the mock-up contract to confirm that your Rust toolchain works as expected.

## File structure

Following a regular [Rust](https://www.rust-lang.org/) project, the file structure for this smart contract has:

- `Cargo.toml` file to define the code dependencies (similar to `package.json`)
- `src` folder where all the Rust source files are stored
- `target` folder where the compiled `wasm` will output to
- `build.sh` script that has been added to provide a convenient way to compile the source code

### Source files

| File                             | Description                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------- |
| [approval.rs](#approvalrs)       | Has the functions that controls the access and transfers of non-fungible tokens. |
| [enumeration.rs](#enumerationrs) | Contains the methods to list NFT tokens and their owners.                        |
| [lib.rs](#librs)                 | Holds the smart contract initialization functions.                               |
| [metadata.rs](#metadatars)       | Defines the token and metadata structure.                                        |
| [mint.rs](#mintrs)               | Contains token minting logic.                                                    |
| [nft_core.rs](#nft_corers)       | Core logic that allows you to transfer NFTs between users.                       |
| [royalty.rs](#royaltyrs)         | Contains payout-related functions.                                               |

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

:::tip
Explore the code in our [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/1.skeleton/).
:::

---

## `approval.rs`

> This allows people to approve other accounts to transfer NFTs on their behalf.

This file contains the logic that complies with the standard's [approvals management](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) extension. Here is a breakdown of the methods and their functions:

| Method              | Description                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **nft_approve**     | Approves an account ID to transfer a token on your behalf.                                                |
| **nft_is_approved** | Checks if the input account has access to approve the token ID.                                           |
| **nft_revoke**      | Revokes a specific account from transferring the token on your behalf.                                    |
| **nft_revoke_all**  | Revokes all accounts from transferring the token on your behalf.                                          |
| **nft_on_approve**  | This callback function, initiated during `nft_approve`, is a cross contract call to an external contract. |

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/approval.rs#L4-L33
```

You'll learn more about these functions in the [approvals section](/tutorials/nfts/approvals) of the Zero to Hero series.

---

## `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html) extension.

| Method                   | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **nft_total_supply**           | Returns the total amount of NFTs stored on the contract |
| **nft_tokens**           | Returns a paginated list of NFTs stored on the contract regardless of their owner. |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user.                  |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user.                          |

```rust reference
https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/enumeration.rs#L4-L44
```

You'll learn more about these functions in the [enumeration section](/tutorials/nfts/enumeration) of the tutorial series.

---

## `lib.rs`

> This file outlines what information the contract stores and keeps track of.

| Method               | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **new_default_meta** | Initializes the contract with default `metadata` so the user doesn't have to provide any input. |
| **new**              | Initializes the contract with the user-provided `metadata`.                                     |

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/lib.rs#L45-L71
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/minting) of the tutorial series.

---

## `metadata.rs`

> This file is used to keep track of the information to be stored for tokens, and metadata.
> In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/NonFungibleToken/Metadata.html) extension.

| Name              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token. (title, description, media, etc.       |
| **Token**         | This structure outlines what information will be stored on the contract for each token.                       |
| **JsonToken**     | When querying information about NFTs through view calls, the return information is stored in this JSON token. |
| **nft_metadata**  | This function allows users to query for the contact's internal metadata.                                      |

```rust reference
https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/metadata.rs#L10-L55
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/minting) of the tutorial series.

---

## `mint.rs`

> Contains token minting logic.

| Method       | Description                               |
| ------------ | ----------------------------------------- |
| **nft_mint** | This function mints a non-fungible token. |

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/mint.rs#L4-L16
```

---

## `nft_core.rs`

> Core logic that allows you to transfer NFTs between users.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **nft_transfer**         | Transfers an NFT to a receiver ID.                                                                                                                                                                                                                                                            |
| **nft_transfer_call**    | Transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.                                                                                                                        |
| **nft_token**            | Allows users to query for the information about a specific NFT.                                                                                                                                                                                                                               |
| **nft_on_transfer**      | Called by other contracts when an NFT is transferred to your contract account via the `nft_transfer_call` method. It returns `true` if the token should be returned back to the sender.                                                                                                       |
| **nft_resolve_transfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard also calls a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic. |

```rust reference
https://github.com/near-examples/nft-tutorial/blob/1.skeleton/nft-contract/src/nft_core.rs#L7-L56
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/minting) of the tutorial series.

---

## `royalty.rs`

> Contains payout-related functions.

| Method                  | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **nft_payout**          | This view method calculates the payout for a given token.                                                     |
| **nft_transfer_payout** | Transfers the token to the receiver ID and returns the payout object that should be paid for a given balance. |

```rust reference
https://github.com/near-examples/nft-tutorial/tree/1.skeleton/nft-contract/src/royalty.rs#L3-L17
```

You'll learn more about these functions in the [royalty section](/tutorials/nfts/royalty) of the tutorial series.

---

## Building the skeleton

- If you haven't cloned the main repository yet, open a terminal and run:

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

- Next, switch to the `1.skeleton` branch and build the contract with `yarn`:

```sh
cd nft-tutorial
git switch 1.skeleton
yarn build
```

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

---

## Conclusion

You've seen the layout of this NFT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [Minting tutorial](/tutorials/nfts/minting).

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.6.0`
- near-sdk-rs: `4.0.0`
:::
