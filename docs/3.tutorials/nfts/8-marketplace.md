---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---
import {Github} from "@site/src/components/codetabs"

In this tutorial, you'll learn the basics of an NFT marketplace contract where you can buy and sell non-fungible tokens for $NEAR. In the previous tutorials, you went through and created a fully fledged NFT contract that incorporates all the standards found in the [NFT standard](https://nomicon.io/Standards/NonFungibleToken).

---

## Introduction

Throughout this tutorial, you'll learn how a marketplace contract **could** work on NEAR. This is meant to be **an example** as there is no **canonical implementation**. Feel free to branch off and modify this contract to meet your specific needs.

```bash
cd market-contract/
```

This folder contains both the actual contract code and dependencies as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

---

## Understanding the contract

At first, the contract can be quite overwhelming but if you strip away all the fluff and dig into the core functionalities, it's actually quite simple. This contract was designed for only one thing - to allow people to buy and sell NFTs for NEAR. This includes the support for paying royalties, updating the price of your sales, removing sales and paying for storage.

Let's go through the files and take note of some of the important functions and what they do.

---

## lib.rs {#lib-rs}

This file outlines what information is stored on the contract as well as some other crucial functions that you'll learn about below.

### Initialization function {#initialization-function}

The first function you'll look at is the initialization function. This takes an `owner_id` as the only parameter and will default all the storage collections to their default values.

<Github language="rust" start="92" end="107" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

<hr className="subsection" />

### Storage management model {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. On the NFT contract, users attached $NEAR to the calls that needed storage paid for. For example, if someone was minting an NFT, they would need to attach `x` amount of NEAR to cover the cost of storing the data on the contract.

On this marketplace contract, however, the storage model is a bit different. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit as much NEAR as they want so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we've introduced a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji wants to list his NFT on the marketplace but has never paid for storage.
- He deposits exactly 0.01 NEAR using the `storage_deposit` method. This will cover 1 sale.
- He lists his NFT on the marketplace and is now using up 1 out of his prepaid 1 sales and has no more storage left. If he were to call `storage_withdraw`, nothing would happen.
- Dorian loves his NFT and quickly purchases it before anybody else can. This means that Benji's sale has now been taken down (since it was purchased) and Benji is using up 0 out of his prepaid 1 sales. In other words, he has an excess of 1 sale or 0.01 NEAR.
- Benji can now call `storage_withdraw` and will be transferred his 0.01 NEAR back. On the contract's side, after withdrawing, he will have 0 sales paid for and will need to deposit storage before trying to list anymore NFTs.

**Scenario B**

- Dorian owns one hundred beautiful NFTs and knows that he wants to list all of them.
- To avoid having to call `storage_deposit` everytime he wants to list an NFT, he calls it once. Since Dorian is a baller, he attaches 10 NEAR which is enough to cover 1000 sales. Then he lists his 100 NFTs and now he has an excess of 9 NEAR or 900 sales.
- Dorian needs the 9 NEAR for something else but doesn't want to take down his 100 listings. Since he has an excess of 9 NEAR, he can easily withdraw and still have his 100 listings. After calling `storage_withdraw` and being transferred 9 NEAR, he will have an excess of 0 sales.

With this behavior in mind, the following two functions outline the logic.

<Github language="rust" start="111" end="139" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />
<Github language="rust" start="144" end="175" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

In this contract, the storage required for each sale is 0.01 NEAR but you can query that information using the `storage_minimum_balance` function. In addition, if you wanted to check how much storage a given account has paid, you can query the `storage_balance_of` function.

With that out of the way, it's time to move onto the `sale.rs` file where you'll look at how NFTs are put for sale.

---

## sale.rs {#sale}

This file is responsible for the internal marketplace logic.

### Listing logic {#listing-logic}

In order to put an NFT on sale, a user should:

1. Approve the marketplace contract on an NFT token (by calling `nft_approve` method on the NFT contract)
2. Call the `list_nft_for_sale` method on the marketplace contract.

#### nft_approve
This method has to be called by the user to [approve our marketplace](5-approval.md), so it can transfer the NFT on behalf of the user. In our contract, we only need to implement the `nft_on_approve` method, which is called by the NFT contract when the user approves our contract.

In our case, we left it blank, but you could implement it to do some additional logic when the user approves your contract.

<Github language="rust" start="23" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/nft_callbacks.rs" />


#### list_nft_for_sale
The `list_nft_for_sale` method lists an nft for sale, for this, it takes the id of the NFT contract (`nft_contract_id`), the `token_id` to know which token is listed, the [`approval_id`](5-approval.md), and the price in yoctoNEAR at which we want to sell the NFT.

<Github language="rust" start="33" end="74" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

The function first checks if the user has [enough storage available](#storage-management-model-storage-management-model), and makes two calls in parallel to the NFT contract. The first is to check if this marketplace contract is authorized to transfer the NFT. The second is to make sure that the caller (`predecessor`) is actually the owner of the NFT, otherwise, anyone could call this method to create fake listings. This second call is mostly a measure to avoid spam, since anyways, only the owner could approve the marketplace contract to transfer the NFT.

Both calls return their results to the `process_listing` function, which executes the logic to store the sale object on the contract.

#### process_listing

The `process_listing` function will receive if our marketplace is authorized to list the NFT on sale, and if this was requested by the NFTs owner. If both conditions are met, it will proceed to check if the user has enough storage, and store the sale object on the contract.

<Github language="rust" start="264" end="344" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr class="subsection" />

### Sale object {#sale-object}

It's important to understand what information the contract is storing for each sale object. Since the marketplace has many NFTs listed that come from different NFT contracts, simply storing the token ID would not be enough to distinguish between different NFTs. This is why you need to keep track of both the token ID and the contract by which the NFT came from. In addition, for each listing, the contract must keep track of the approval ID it was given to transfer the NFT. Finally, the owner and sale conditions are needed.

<Github language="rust" start="5" end="20" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Removing sales {#removing-sales}

In order to remove a listing, the owner must call the `remove_sale` function and pass the NFT contract and token ID. Behind the scenes, this calls the `internal_remove_sale` function which you can find in the `internal.rs` file. This will assert one yoctoNEAR for security reasons.

<Github language="rust" start="76" end="87" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Updating price {#updating-price}

In order to update the list price of a token, the owner must call the `update_price` function and pass in the contract, token ID, and desired price. This will get the sale object, change the sale conditions, and insert it back. For security reasons, this function will assert one yoctoNEAR.

<Github language="rust" start="90" end="118" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### Purchasing NFTs {#purchasing-nfts}

For purchasing NFTs, you must call the `offer` function. It takes an `nft_contract_id` and `token_id` as parameters. You must attach the correct amount of NEAR to the call in order to purchase. Behind the scenes, this will make sure your deposit is greater than the list price and call a private method `process_purchase` which will perform a cross-contract call to the NFT contract to invoke the `nft_transfer_payout` function. This will transfer the NFT using the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) standard that you learned about and it will return the `Payout` object which includes royalties.

The marketplace will then call `resolve_purchase` where it will check for malicious payout objects and then if everything went well, it will pay the correct accounts.

<Github language="rust" start="121" end="151" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

---

## sale_view.rs {#sale_view-rs}

The final file is [`sale_view.rs`](https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale_view.rs) file. This is where some of the enumeration methods are outlined. It allows users to query for important information regarding sales.

---

## Deployment and Initialization

Next, you'll deploy this contract to the network.

```bash
export MARKETPLACE_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $MARKETPLACE_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the build script, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $MARKETPLACE_CONTRACT_ID with-init-call new json-args '{"owner_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting and approving

Let's mint a new NFT token and approve a marketplace contract:

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_approve json-args '{"token_id": "token-1", "account_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

<hr className="subsection" />

### Listing NFT on sale

```bash
near contract call-function as-transaction $MARKETPLACE_CONTRACT_ID list_nft_for_sale json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "token_id": "token-1", "approval_id": 0, "msg": "{\"sale_conditions\": \"1\"}"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

<hr className="subsection" />

### Total supply {#total-supply}

To query for the total supply of NFTs listed on the marketplace, you can call the `get_supply_sales` function. An example can be seen below.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_sales json-args {} network-config testnet now
```

<hr className="subsection" />

### Total supply by owner {#total-supply-by-owner}

To query for the total supply of NFTs listed by a specific owner on the marketplace, you can call the `get_supply_by_owner_id` function. An example can be seen below.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
```

<hr className="subsection" />

### Total supply by contract {#total-supply-by-contract}

To query for the total supply of NFTs that belong to a specific contract, you can call the `get_supply_by_nft_contract_id` function. An example can be seen below.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
```

<hr className="subsection" />

### Query for listing information {#query-listing-information}

To query for important information for a specific listing, you can call the `get_sale` function. This requires that you pass in the `nft_contract_token`. This is essentially the unique identifier for sales on the market contract as explained earlier. It consists of the NFT contract followed by a `DELIMITER` followed by the token ID. In this contract, the `DELIMITER` is simply a period: `.`.  An example of this query can be seen below.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sale json-args '{"nft_contract_token": "'$NFT_CONTRACT_ID'.token-1"}' network-config testnet now
```

In addition, you can query for paginated information about the listings for a given owner by calling the `get_sales_by_owner_id` function.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
```

Finally, you can query for paginated information about the listings that originate from a given NFT contract by calling the `get_sales_by_nft_contract_id` function.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
```

---

## Conclusion

In this tutorial, you learned about the basics of a marketplace contract and how it works. You went through the [lib.rs](#lib-rs) file and learned about the [initialization function](#initialization-function) in addition to the [storage management](#storage-management-model) model.

You went through the [NFTs listing process](#listing-logic). In addition, you went through some important functions needed after you've listed an NFT. This includes [removing sales](#removing-sales), [updating the price](#updating-price), and [purchasing NFTs](#purchasing-nfts).

Finally, you went through the enumeration methods found in the [`sale_view`](#sale_view-rs) file. These allow you to query for important information found on the marketplace contract.

You should now have a solid understanding of NFTs and marketplaces on NEAR. Feel free to branch off and expand on these contracts to create whatever cool applications you'd like. In the [next tutorial](9-series.md), you'll learn how to take the existing NFT contract and optimize it to allow for:
- Lazy Minting
- Creating Collections
- Allowlisting functionalities
- Optimized Storage Models

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
