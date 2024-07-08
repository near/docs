---
id: skeleton
title: Skeleton and Rust Architecture
sidebar_label: Contract Architecture
---
import {Github} from "@site/src/components/codetabs"

In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.

You'll discover the contract's layout and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info Skeleton Contract
You can find the skeleton contract in our [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract-skeleton)
:::

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](../../2.build/2.smart-contracts/quickstart.md) is a great place to start.
:::

---

## Introduction

This tutorial presents the code skeleton for the NFT smart contract and its file structure.

Once every file and functions have been covered, we will guide you through the process of building the mock-up contract to confirm that your Rust setup works.

---

## File structure

Following a regular [Rust](https://www.rust-lang.org/) project, the file structure for this smart contract has:

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    ├── events.rs
    └── royalty.rs
```

- The file `Cargo.toml` defines the code dependencies
- The `src` folder contains all the Rust source files

<hr class="subsection" />

### Source files

Here is a brief description of what each source file is responsible for:

| File                             | Description                                                                     |
|----------------------------------|---------------------------------------------------------------------------------|
| [approval.rs](#approvalrs)       | Has the functions that controls the access and transfers of non-fungible tokens |
| [enumeration.rs](#enumerationrs) | Contains the methods to list NFT tokens and their owners                        |
| [lib.rs](#librs)                 | Holds the smart contract initialization functions                               |
| [metadata.rs](#metadatars)       | Defines the token and metadata structure                                        |
| [mint.rs](#mintrs)               | Contains token minting logic                                                    |
| [nft_core.rs](#nft_corers)       | Core logic that allows you to transfer NFTs between users.                      |
| [royalty.rs](#royaltyrs)         | Contains payout-related functions                                               |
| [events.rs](#events)             | Contains events related structures                                              |

:::tip
Explore the code in our [GitHub repository](https://github.com/near-examples/nft-tutorial/).
:::

---

## `approval.rs`

> This allows people to approve other accounts to transfer NFTs on their behalf.

This file contains the logic that complies with the standard's [approvals management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension. Here is a breakdown of the methods and their functions:

| Method              | Description                                                                                               |
|---------------------|-----------------------------------------------------------------------------------------------------------|
| **nft_approve**     | Approves an account ID to transfer a token on your behalf.                                                |
| **nft_is_approved** | Checks if the input account has access to approve the token ID.                                           |
| **nft_revoke**      | Revokes a specific account from transferring the token on your behalf.                                    |
| **nft_revoke_all**  | Revokes all accounts from transferring the token on your behalf.                                          |
| **nft_on_approve**  | This callback function, initiated during `nft_approve`, is a cross contract call to an external contract. |

<Github language="rust" start="4" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/approval.rs" />

You'll learn more about these functions in the [approvals section](/tutorials/nfts/approvals) of the Zero to Hero series.

---

## `enumeration.rs`

> This file provides the functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) extension.

| Method                   | Description                                                                        |
|--------------------------|------------------------------------------------------------------------------------|
| **nft_total_supply**     | Returns the total amount of NFTs stored on the contract                           |
| **nft_tokens**           | Returns a paginated list of NFTs stored on the contract regardless of their owner. |
| **nft_supply_for_owner** | Allows you view the total number of NFTs owned by any given user                  |
| **nft_tokens_for_owner** | Returns a paginated list of NFTs owned by any given user                          |

<Github language="rust" start="4" end="44" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/enumeration.rs" />

You'll learn more about these functions in the [enumeration section](/tutorials/nfts/enumeration) of the tutorial series.

---

## `lib.rs`

> This file outlines what information the contract stores and keeps track of.

| Method               | Description                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------|
| **new_default_meta** | Initializes the contract with default `metadata` so the user doesn't have to provide any input. |
| **new**              | Initializes the contract with the user-provided `metadata`.                                     |

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

<Github language="rust" start="47" end="73" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/lib.rs" />

You'll learn more about these functions in the [minting section](/tutorials/nfts/minting) of the tutorial series.

---

## `metadata.rs`

> This file is used to keep track of the information to be stored for tokens, and metadata.
> In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) extension.

| Name              | Description                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| **TokenMetadata** | This structure defines the metadata that can be stored for each token (title, description, media, etc.).      |
| **Token**         | This structure outlines what information will be stored on the contract for each token.                       |
| **JsonToken**     | When querying information about NFTs through view calls, the return information is stored in this JSON token. |
| **nft_metadata**  | This function allows users to query for the contact's internal metadata.                                      |

<Github language="rust" start="12" end="60" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/metadata.rs" />

You'll learn more about these functions in the [minting section](/tutorials/nfts/minting) of the tutorial series.

---

## `mint.rs`

> Contains the logic to mint the non-fungible tokens

| Method       | Description                               |
|--------------|-------------------------------------------|
| **nft_mint** | This function mints a non-fungible token. |

<Github language="rust" start="4" end="16" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/mint.rs" />

---

## `nft_core.rs`

> Core logic that allows to transfer NFTs between users.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **nft_transfer**         | Transfers an NFT to a receiver ID.                                                                                                                                                                                                                                                            |
| **nft_transfer_call**    | Transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account.                                                                                                                        |
| **nft_token**            | Allows users to query for the information about a specific NFT.                                                                                                                                                                                                                               |
| **nft_on_transfer**      | Called by other contracts when an NFT is transferred to your contract account via the `nft_transfer_call` method. It returns `true` if the token should be returned back to the sender.                                                                                                       |
| **nft_resolve_transfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard also calls a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic. |

<Github language="rust" start="7" end="56" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/nft_core.rs" />

You'll learn more about these functions in the [core section](/tutorials/nfts/core) of the tutorial series.

---

## `royalty.rs`

> Contains payout-related functions.

| Method                  | Description                                                                                                   |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| **nft_payout**          | This view method calculates the payout for a given token.                                                     |
| **nft_transfer_payout** | Transfers the token to the receiver ID and returns the payout object that should be paid for a given balance. |

<Github language="rust" start="3" end="17" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-skeleton/src/royalty.rs" />

You'll learn more about these functions in the [royalty section](/tutorials/nfts/royalty) of the tutorial series.

---

## `events.rs`

> Contains events-related structures.

| Method              | Description                                         |
|---------------------|-----------------------------------------------------|
| **EventLogVariant** | This enum represents the data type of the EventLog. |
| **EventLog**        | Interface to capture data about an event.           |
| **NftMintLog**      | An event log to capture token minting.              |
| **NftTransferLog**  | An event log to capture token transfer.             |

<Github language="rust" start="5" end="79" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/events.rs" />

You'll learn more about these functions in the [events section](/tutorials/nfts/events) of the tutorial series.

---

## Building the skeleton

If you haven't cloned the main repository yet, open a terminal and run:

```sh
git clone https://github.com/near-examples/nft-tutorial/
```

Next, go to the `nft-contract-skeleton/` folder and build the contract with `cargo-near`:

```sh
cd nft-tutorial
cd nft-contract-skeleton/
cargo near build
```

Since this source is just a skeleton you'll get many warnings about unused code, such as:

```
   Compiling nft_contract_skeleton v0.1.0 (/Users/near-examples/Documents/my/projects/near/examples/nft-tutorial/nft-contract-basic)
 │ warning: unused imports: `LazyOption`, `LookupMap`, `UnorderedMap`, `UnorderedSet`
 │  --> src/lib.rs:3:29
 │   |
 │ 3 | use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
 │   |                             ^^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^
 │   |
 │   = note: `#[warn(unused_imports)]` on by default
 │
 │ warning: unused import: `Base64VecU8`
 │  --> src/lib.rs:4:28
 │   |
 │ 4 | use near_sdk::json_types::{Base64VecU8, U128};
 │   |

 │ warning: `nft_contract_skeleton` (lib) generated 48 warnings (run `cargo fix --lib -p nft_contract_skeleton` to apply 45 suggestions)
 │     Finished release [optimized] target(s) in 11.01s
 ✓ Contract successfully built!
```

Don't worry about these warnings, you're not going to deploy this contract yet.
Building the skeleton is useful to validate that your Rust toolchain works properly and that you'll be able to compile improved versions of this NFT contract in the upcoming tutorials.

---

## Conclusion

You've seen the layout of this NFT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [Minting tutorial](2-minting.md).

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.76.0`
- near-sdk-rs: `5.1.0`
- cargo-near: `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
