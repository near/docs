---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---

In this tutorial, you'll learn the basics of how an NFT marketplace contract works and how you can modify it to allow for purchasing NFTs using Fungible Tokens. In the previous tutorials, you went through and created a fully fledged FT contract that incorporates all the standards found in the [FT standard](https://nomicon.io/Standards/Tokens/FungibleToken/Core). 

## Introduction

Throughout this tutorial, you'll learn how a marketplace contract could work on NEAR. This is meant to be an example and there is no canonical implementation. Feel free to branch off and modify this contract to meet your specific needs.

Using the same repository as the previous tutorials, if you visit the `market-contract` directory, you should have the necessary files to complete the tutorial.

## File structure {#file-structure}

This directory contains both the build script, dependencies as well as the actual contract code as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── external.rs
    ├── ft_balances.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

Let's start by building both the finished FT contract and the marketplace contract. Make sure you're in the root directory and run the following command in your terminal:


```bash
yarn build && cd market-contract && ./build.sh && cd ..
```
This will install the dependencies for the marketplace contract as well as the FT contract. In addition, it will compile them to `wasm` such that your `ft-tutorial/out` directory looks like this:

```
ft-tutorial
└── out
    ├── contract.wasm
    ├── nft-contract.wasm
    └── market.wasm
```

Note that there's also a pre-build nft contract wasm file in the directory which you'll use to place the NFTs for sale.

## Understanding the contract

The marketplace contract used in this tutorial is a modified version of the contract created at the end of the NFT zero to hero tutorial. If you'd like to learn about the backbone of how the NFTs are put for sale and the process by which they are minted / sold, check out the [NFT zero to hero tutorial](/docs/tutorials/nfts/marketplace).

The core functionalities are the same in the sense that both this contract and the marketplace contract built in the NFT zero to hero have the following features:
- Users can put NFTs for sale and specify sale conditions
- Users must pay for storage deposit to put NFTs for sale and they can withdraw the storage at any time
- Users can update the price of an NFT or remove the sale entirely
- Buyers can purchase the NFTs by calling `offer`.

The only difference is that this marketplace has removed the ability to purchase NFTs for `$NEAR` and instead allows users to buy them with Fungible Tokens. The fungible token is specified when the contract is initialized and only **1 type of fungible token** can be used to purchase NFTs. You can't, for example, offer 100 Team Tokens for an NFT and 5000 Mike Tokens for another.

In addition, the marketplace does **not** support royalties. This is because FT transfers are less Gas efficient than regular $NEAR transfers. In addition, each user would have to be registered and it's much easier to say "hey seller, make sure you're registered before your NFT is sold" rather than enforcing that the seller and **all** accounts in the payout object are registered. When an NFT is sold, the entire price is sent directly to the seller.

### Purchasing Flow

In order to purchase an NFT, the contract utilizes the "transfer and call" workflow that the FT contract provides. The marketplace contract implements the `ft_on_transfer` method that is called whenever someone transfers FTs to the marketplace contract.

The marketplace keeps track of a balance for each user that outlines how many FTs they've sent to the contract. Each time `ft_on_transfer` is called, the marketplace contract will update the balance for the user. When that user wishes to purchase an NFT, they call `offer` and pass in the amount of tokens they're willing to spend. The marketplace will then decrement from their balance and transfer the NFT to the buyer / send the FTs to the seller.

It's important to note that the seller **must** be registered in the FT contract before a sale is made otherwise the `ft_transfer` method will panic and the seller won't receive any tokens.

## Looking at the Code

Most of the code is the same as what's been outlined in the [NFT zero to hero tutorial](/docs/tutorials/nfts/marketplace) but we'll go through a refresher in case you're new or have forgotten some of the details.

### Main Library File

Starting at the `lib.rs` file, this outlines what information is stored on the contract as well as some other crucial functions that you'll learn about below.

### Initialization function {#initialization-function}

The first function you'll look at is the initialization function. This takes an `owner_id` as well as the `ft_id` as the parameters and will default all the storage collections to their default values. The `ft_id` outlines the account ID for the fungible token that the contract will allow.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/lib.rs#L94-L118
```

### Storage management model {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit a large amount of $NEAR so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we have a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji wants to list his NFT on the marketplace but has never paid for storage. 
- He deposits exactly 0.01 NEAR using the `storage_deposit` method. This will cover 1 sale.
- He lists his NFT on the marketplace and is now using up 1 out of his prepaid 1 sales and has no more storage left. If he were to call `storage_withdraw`, nothing would happen.
- Dorian loves his NFT and quickly purchases it before anybody else can. This means that Benji's sale has now been taken down (since it was purchased) and Benji is using up 0 out of his prepaid 1 sales. In other words, he has an excess of 1 sale or 0.01 NEAR.
- Benji can now call `storage_withdraw` and will be transferred his 0.01 NEAR back. On the contract's side, after withdrawing, he will have 0 sales paid for and will need to deposit storage before trying to list anymore NFTs.

**Scenario B**

- Dorian owns one hundred beautiful NFTs and knows that he wants to list all of them.
- To avoid having to call `storage_deposit` everytime he wants to list an NFT, he calls it once. Since Dorian is a baller, he attaches 10 NEAR which is enough to cover 1000 sales. He now has an excess of 9 NEAR or 900 sales.
- Dorian needs the 9 NEAR for something else but doesn't want to take down his 100 listings. Since he has an excess of 9 NEAR, he can easily withdraw and still have his 100 listings. After calling `storage_withdraw` and being transferred 9 NEAR, he will have an excess of 0 sales.

With this behavior in mind, the following two functions outline the logic.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/lib.rs#L120-L183
```

In this contract, the storage required for each sale is 0.01 NEAR but you can query that information using the `storage_minimum_balance` function. In addition, if you wanted to check how much storage a given account has paid, you can query the `storage_balance_of` function.

## FT Deposits

If you want to learn more about how NFTs are put for sale, check out the [NFT zero to hero tutorial](/docs/tutorials/nfts/marketplace). Once NFTs are put for sale, the owner has three options:
- Update the price of the NFT
- Remove the sale from the marketplace
- Wait for somebody to purchase it

In order to purchase NFTs, buyers need to deposit FTs in the contract and call the `offer` function. All the logic for FT deposits is outlined in the `src/ft_balances.rs` file. Starting with the `ft_on_approve` function, this is called when a user transfers FTs to the marketplace contract. The logic can be seen below.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/ft_balances.rs#L35-L72
```

Once FTs are deposited into the contract, users can either withdraw their FTs or they can use them to purchase NFTs. The withdrawing flow is outlined in the `ft_withdraw` function. It's important to note that you should decrement the user's balance **before** calling the `ft_transfer` function to avoid a common exploit scenario where a user spams the `ft_withdraw`. If you were to decrement their balance in the callback function (if the transfer was successful), they could spam the `ft_withdraw` during the time it takes the callback function to execute. A better pattern is to decrement their balance before the transfer and then if the promise was **unsuccessful*, revert the balance back to what it was before.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/ft_balances.rs#L74-L145
```

## Purchasing NFTs

Now that you're familiar with the process of both adding storage and depositing FTs on the marketplace, let's go through what you can do once a sale has been listed. The `src/sale.rs` file outlines the functions for updating the price, removing, and purchasing NFTs. In this tutorial, we'll focus **only** on the purchasing flow. If you'd like to learn about the sale objects, updating the price, and removing a sale, check out the [NFT zero to hero tutorial](/docs/tutorials/nfts/marketplace).

For purchasing NFTs, you must call the `offer` function. It takes an `nft_contract_id`, `token_id`, and the amount you wish to offer as parameters. Behind the scenes, this function will make sure your offer amount is greater than the list price and also that you have enough FTs deposited. It will then call a private method `process_purchase` which will perform a cross-contract call to the NFT contract to invoke the `nft_transfer` function where the NFT will be transferred to the seller. 

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/sale.rs#L67-L144
```

Once the transfer is complete, the contract will call `resolve_purchase` where it will check the status of the transfer.If the transfer succeeded, it will send the FTs to the seller. If the transfer didn't succeed, it will increment the buyer's FT balance (acting as a refund).


```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/sale.rs#L146-L192
```

## View Methods 

There are several view functions that the marketplace contract exposes. All of these functions are the same as the [NFT zero to hero tutorial](/docs/tutorials/nfts/marketplace) with the exception of one extra function we've added. In the `src/ft_balances.rs` file, we've added the `ft_balance_of` function. This function returns the balance of a given account.


## Conclusion

In this tutorial, you learned about the basics of a marketplace contract and how it works. You went through the [lib.rs](#lib-rs) file and learned about the [initialization function](#initialization-function) in addition to the [storage management](#storage-management-model) model. 

You then went through the [nft_callbacks](#nft_callbacks-rs) file to understand how to [list NFTs](#listing-logic). In addition, you went through some important functions needed for after you've listed an NFT. This includes [removing sales](#removing-sales), [updating the price](#updating-price), and [purchasing NFTs](#purchasing-nfts).

Finally, you went through the enumeration methods found in the [`sale_view`](#sale_view-rs) file. These allow you to query for important information found on the marketplace contract. 

You should now have a solid understanding of NFTs and marketplaces on NEAR. Feel free to branch off and expand on these contracts to create whatever cool applications you'd like. The world is your oyster! Thanks for joining on this journey and don't forget, **Go Team!**
