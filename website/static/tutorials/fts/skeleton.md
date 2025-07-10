---
id: skeleton
title: Skeleton and Rust Architecture
sidebar_label: Contract Architecture
---

In this article, you'll learn about the basic architecture behind the FT contract that you'll develop while following this _"Zero to Hero"_ series. You'll discover the contract's layout and you'll see how the Rust files are structured in order to build a feature-complete smart contract.

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](../../smart-contracts/quickstart.md) is a great place to start.
:::

---

## Introduction

This tutorial presents the code skeleton for the FT smart contract and its file structure.
You'll find how all the functions are laid out as well as the missing Rust code that needs to be filled in.
Once every file and function has been covered, you'll go through the process of building the mock-up contract to confirm that your Rust toolchain works as expected.

---

## Files structure

The repository comes with many different folders. Each folder represents a different milestone of this tutorial starting with the skeleton folder and ending with the finished contract folder. If you step into any of these folders, you'll find that they each follow a regular [Rust](https://www.rust-lang.org/) project. The file structure for these smart contracts have:

- `Cargo.toml` file to define the code dependencies (similar to `package.json` in JavaScript and node projects)
- `src` folder where all the Rust source files are stored
- `target` folder where the compiled `wasm` will output to.

<hr className="subsection" />

### Source files

| File                             | Description                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------- |
| [ft_core.rs](#ft_corers)       | Contains the logic for transferring and controlling FTs. This file represents the implementation of the [core](https://nomicon.io/Standards/Tokens/FungibleToken/Core) standard. |              |
| [lib.rs](#librs)                 | Holds the smart contract initialization functions and dictates what information is kept on-chain.                               |
| [metadata.rs](#metadatars)       | Defines the metadata structure. This file represents the implementation of the [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Metadata) extension of the standard.                                      |
| [storage.rs](#storagers)               | Contains the logic for registration and storage.  This file represents the implementation of the [storage management](https://nomicon.io/Standards/StorageManagement) standard.                                                   |

```
skeleton
├── Cargo.lock
├── Cargo.toml
└── src
    ├── ft_core.rs
    ├── lib.rs
    ├── metadata.rs
    └── storage.rs
```

:::tip
Explore the code in our [GitHub repository](https://github.com/near-examples/ft-tutorial/tree/main/1.skeleton).
:::

---

## `ft_core.rs`

Core logic that allows you to transfer FTs between users and query for important information.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ft_transfer**         | Transfers a specified amount of FTs to a receiver ID.|
| **ft_transfer_call**    | Transfers a specified amount of FTs to a receiver and attempts to perform a cross-contract call on the receiver’s contract to execute the `ft_on_transfer` method. The implementation of this `ft_on_transfer` method is up to the contract writer. You’ll see an example implementation in the marketplace section of this tutorial. Once `ft_on_transfer` finishes executing, `ft_resolve_transfer` is called to check if things were successful or not.|
| **ft_total_supply**            | Returns the total amount of fungible tokens in circulation on the contract. |
| **ft_balance_of**            | Returns how many fungible tokens a specific user owns.|
| **ft_on_transfer**      | Method that lives on a receiver's contract. It is called when FTs are transferred to the receiver's contract account via the `ft_transfer_call` method. It returns how many FTs should be refunded back to the sender. |
| **ft_resolve_transfer** | Invoked after the `ft_on_transfer` is finished executing. This function will refund any FTs not used by the receiver contract and will return the net number of FTs sent to the receiver after the refund (if any). |

```
impl FungibleTokenCore for Contract {
    #[payable]
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: NearToken, memo: Option<String>) {
        /*
            FILL THIS IN
        */
    }

    #[payable]
    fn ft_transfer_call(
        &mut self,
        receiver_id: AccountId,
        amount: NearToken,
        memo: Option<String>,
        msg: String,
    ) -> PromiseOrValue<NearToken> {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    fn ft_total_supply(&self) -> U128 {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    fn ft_balance_of(&self, account_id: AccountId) -> NearToken {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}

#[ext_contract(ext_ft_receiver)]
pub trait FungibleTokenReceiver {
    /// Called by fungible token contract after `ft_transfer_call` was initiated by
    /// `sender_id` of the given `amount` with the transfer message given in `msg` field.
    /// The `amount` of tokens were already transferred to this contract account and ready to be used.
    ///
    /// The method must return the amount of tokens that are *not* used/accepted by this contract from the transferred
    /// amount. Examples:
    /// - The transferred amount was `500`, the contract completely takes it and must return `0`.
    /// - The transferred amount was `500`, but this transfer call only needs `450` for the action passed in the `msg`
    ///   field, then the method must return `50`.
    /// - The transferred amount was `500`, but the action in `msg` field has expired and the transfer must be
    ///   cancelled. The method must return `500` or panic.
    ///
    /// Arguments:
    /// - `sender_id` - the account ID that initiated the transfer.
    /// - `amount` - the amount of tokens that were transferred to this account in a decimal string representation.
    /// - `msg` - a string message that was passed with this transfer call.
    ///
    /// Returns the amount of unused tokens that should be returned to sender, in a decimal string representation.
    fn ft_on_transfer(
        &mut self,
        sender_id: AccountId,
        amount: NearToken,
        msg: String,
    ) -> PromiseOrValue<NearToken>;
}

#[near_bindgen]
impl Contract {
    // Finalize an `ft_transfer_call` chain of cross-contract calls.
    //
    // The `ft_transfer_call` process:
    //
    // 1. Sender calls `ft_transfer_call` on FT contract
    // 2. FT contract transfers `amount` tokens from sender to receiver
    // 3. FT contract calls `ft_on_transfer` on receiver contract
    // 4+. [receiver contract may make other cross-contract calls]
    // N. FT contract resolves promise chain with `ft_resolve_transfer`, and may
    //    refund sender some or all of original `amount`
    //
    // Requirements:
    // * Contract MUST forbid calls to this function by any account except self
    // * If promise chain failed, contract MUST revert token transfer
    // * If promise chain resolves with a non-zero amount given as a string,
    //   contract MUST return this amount of tokens to `sender_id`
    //
    // Arguments:
    // * `sender_id`: the sender of `ft_transfer_call`
    // * `receiver_id`: the `receiver_id` argument given to `ft_transfer_call`
    // * `amount`: the `amount` argument given to `ft_transfer_call`
    //
    // Returns a string representing a string version of an unsigned 128-bit
    // integer of how many total tokens were spent by sender_id. Example: if sender
    // calls `ft_transfer_call({ "amount": "100" })`, but `receiver_id` only uses
    // 80, `ft_on_transfer` will resolve with `"20"`, and `ft_resolve_transfer`
    // will return `"80"`.
    #[private]
    pub fn ft_resolve_transfer(
        &mut self,
        sender_id: &AccountId,
        receiver_id: AccountId,
        amount: NearToken,
    ) -> NearToken {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}

```

You'll learn more about these functions in the [circulating supply](/tutorials/fts/circulating-supply) and [transfers](/tutorials/fts/transfers) sections of the tutorial series.

---

## `lib.rs`

This file outlines what information the contract stores and keeps track of.

| Method               | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **new_default_meta** | Initializes the contract with default `metadata` so the user doesn't have to provide any input. In addition, a total supply is passed in which is sent to the owner. |
| **new**              | Initializes the contract with the user-provided `metadata` and total supply.                                     |

:::info Keep in mind
The initialization functions (`new`, `new_default_meta`) can only be called once.
:::

```
impl Contract {
    /// Initializes the contract with the given total supply owned by the given `owner_id` with
    /// default metadata (for example purposes only).
    #[init]
    pub fn new_default_meta(owner_id: AccountId, total_supply: U128) -> Self {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    /// Initializes the contract with the given total supply owned by the given `owner_id` with
    /// the given fungible token metadata.
    #[init]
    pub fn new(
        owner_id: AccountId,
        total_supply: U128,
        metadata: FungibleTokenMetadata,
    ) -> Self {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}
```

You'll learn more about these functions in the [define a token](2-define-a-token.md) section of the tutorial series.

---

## `metadata.rs`

This file is used to outline the metadata for the Fungible Token itself.
In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Metadata) extension.

| Name              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **FungibleTokenMetadata** | This structure defines the metadata for the fungible token.       |
| **ft_metadata**  | This function allows users to query for the token's metadata.                                      |

```
pub struct FungibleTokenMetadata {
    /*
        FILL THIS IN
    */
}

pub trait FungibleTokenMetadataProvider {
    // View call for returning the contract metadata
    fn ft_metadata(&self) -> FungibleTokenMetadata;
}

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}

```

You'll learn more about these functions in the [define a token](2-define-a-token.md) section of the tutorial series.

---

## `storage.rs`

Contains the registration logic as per the [storage management](https://nomicon.io/Standards/StorageManagement) standard.

| Method                  | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **storage_deposit**          | Payable method that receives an attached deposit of Ⓝ for a given account. This will register the user on the contract. |
| **storage_balance_bounds** | Returns the minimum and maximum allowed storage deposit required to interact with the contract. In the FT contract's case, min = max.|
| **storage_balance_of** | Returns the total and available storage paid by a given user. In the FT contract's case, available is always 0 since it's used by the contract for registration and you can't overpay for storage.  |

```
    #[allow(unused_variables)]
    #[payable]
    fn storage_deposit(
        &mut self,
        account_id: Option<AccountId>,
        registration_only: Option<bool>,
    ) -> StorageBalance {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    fn storage_balance_bounds(&self) -> StorageBalanceBounds {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }

    fn storage_balance_of(&self, account_id: AccountId) -> Option<StorageBalance> {
        /*
            FILL THIS IN
        */
        todo!(); //remove once code is filled in.
    }
}

```

:::tip
You'll learn more about these functions in the [storage](4.storage.md) section of the tutorial series.
:::

## Building the skeleton

If you haven't cloned the main repository yet, open a terminal and run:

```sh
git clone https://github.com/near-examples/ft-tutorial/
```

Next, build the skeleton contract with the build script found in the `1.skeleton/build.sh` file.

```sh
cd ft-tutorial/1.skeleton
cargo near build
```

Since this source is just a skeleton you'll get many warnings about unused code, such as:

```
   = note: `#[warn(dead_code)]` on by default

warning: constant is never used: `GAS_FOR_RESOLVE_TRANSFER`
 --> src/ft_core.rs:5:1
  |
5 | const GAS_FOR_RESOLVE_TRANSFER: Gas = Gas(5_000_000_000_000);
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: constant is never used: `GAS_FOR_FT_TRANSFER_CALL`
 --> src/ft_core.rs:6:1
  |
6 | const GAS_FOR_FT_TRANSFER_CALL: Gas = Gas(25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER.0);
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

warning: `fungible-token` (lib) generated 25 warnings
    Finished release [optimized] target(s) in 1.93s
✨  Done in 2.03s.
```

Don't worry about these warnings, you're not going to deploy this contract yet.
Building the skeleton is useful to validate that your Rust toolchain works properly and that you'll be able to compile improved versions of this FT contract in the upcoming tutorials.

---

## Conclusion

You've seen the layout of this FT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [section](/tutorials/fts/circulating-supply) of the tutorial.

---

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-sdk-rs: `5.1.0` (with enabled `legacy` feature)
- cargo-near: `0.13.2`
:::
