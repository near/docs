---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---

In this tutorial, you'll learn the basics of an NFT marketplace contract where you can buy and sell NFTs for $NEAR. In the previous tutorials, you went through and created a fully fledged NFT contract that incorporates all the standards found in the Non-Fungible Tokens [standard](https://nomicon.io/Standards/NonFungibleToken/README.html). 

## Introduction

Throughout this tutorial, you'll learn how a marketplace contract might work on NEAR. This is meant to be an example and there is no canonical implementation. Feel free to branch off and modify this contract to meet your specific needs.

Using the same repository as the previous tutorials, if you checkout the `8.marketplace` branch, you should have the necessary files to complete the tutorial.

```bash
git checkout 8.marketplace
```

## File Structure
The changes that have been made include a new root level directory called `market-contract`. This contains both the build script, dependencies as well as the actual contract code as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

Often times when doing work on multiple smart contracts that all pertain to the same repository, it's a good idea to structure them in their own folders as done in this tutorial. To make your life easier when building the smart contracts, we've also modified the repo's `package.json` file so that building both smart contracts can be easily done by running the following command.

```bash
yarn build
```
This will install the dependencies for both contracts and compile them to wasm files that are stored in the following directory.

```
nft-tutorial
└── out
    ├── main.wasm
    └── market.wasm
```

## Understanding the contract

At first, the contract can be quite overwhelming but if you strip away all the fluff and dig into just the core functionalities, it's actually quite simple. This contract was designed for one and only one thing - to allow people to buy and sell NFTs for NEAR. This includes the support for paying royalties, updating the price of your sales, removing sales and paying for storage.

Let's go through the files and take note of some of the important functions and what they do.

## lib.rs

This file outlines what information is stored on the contract as well as some other crucial functions that you'll learn about below.

### Initialization function
The first function you'll look at is the initialization function. This takes an `owner_id` as the only parameter and will default all the storage collections to their default values.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/lib.rs#L93-L108
```

### Storage management model
Next, let's talk about the storage management model chosen for this contract. On the NFT contract, users attached $NEAR to the calls that needed storage paid for. For example, if someone was minting an NFT, they would need to attach `x` amount of NEAR to cover the cost of storing the data on the contract. 

On this marketplace contract, however, the storage model is a bit different. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit as much NEAR as they want so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as needed basis. 

Some of you might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we've introduced a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to help solidify the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

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
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/lib.rs#L110-L173
```

In this contract, the storage required for each sale is 0.01 NEAR but you can query that information using the `storage_minimum_balance` function. In addition, if you wanted to check how much storage a given account has paid, you can query the `storage_balance_of` function.

With that out of the way, it's time to move onto the `nft_callbacks.rs` file where you'll look at how NFTs are put for sale.

## nft_callbacks.rs

This file is responsible for the logic used to put NFTs for sale. If you remember from the [marketplaces](/docs/tutorials/contracts/nfts/approvals#marketplace-integrations)

## Conclusion

Everything is finished! ;) #devdocs4life
