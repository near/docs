---
id: core
title: Core
sidebar_label: Core
---

In this tutorial you'll learn how to implement the [core standards](https://nomicon.io/Standards/NonFungibleToken/Core.html) into your smart contract. If you're joining us for the first time, feel free to clone [this repo](https://github.com/near-examples/nft-tutorial) and checkout the `3.enumeration` branch to follow along.

## Introduction

Up until this point, you've created a simple NFT smart contract that allows users to mint tokens and view information using the [enumeration standards](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html). Today, you'll expand your smart contract to allow for users to not only mint tokens, but transfer them as well.

As we did in the [minting tutorial](/docs/tutorials/contracts/nfts/minting), let's break down the problem into multiple subtasks to make our lives easier. As you saw before, when a token is minted, information is stored in 3 places:

- **tokens_per_owner**: set of tokens for each account.
- **tokens_by_id**: maps a token ID to a `Token` object.
- **token_metadata_by_id**: maps a token ID to it's metadata.

Let's now consider the following scenario. If Benji owns token A and wants to transfer it to Mike as a birthday gift, what should happen? Well first of all, token A should be removed from Benji's set of tokens and added to Mike's set of tokens.

If that's the only logic you implement, you'll run into some problems. If you were to do a view call to query for information about that token after it's been transferred to Mike, it would still say that Benji is the owner.

This is because the contract is still mapping the token ID to the old `Token` object that contains the `owner_id` field set to Benji's account ID. You still have to change the `tokens_by_id` data structure so that the token ID maps to a new `Token` object which has Mike as the owner.

With that being said, the final process for when an owner transfers a token to a receiver should be the following:

- Remove the token from the owner's set.
- Add the token to the receiver's set.
- Map a token ID to a new `Token` object containing the correct owner.

:::note
Some of you might be curious as to why we don't edit the `token_metadata_by_id` field. This is because no matter who owns the token, the token ID will always map to the same metadata. The metadata should never change and so we can just leave it alone.
:::

At this point, you're ready to move on and make the necessary modifications to your smart contract.

## Modifications to the contract

Let's start our journey in the `nft-contract/src/mint.rs` file. The first thing you need to do is add the necessary return types to each function. `nft_transfer` returns nothing, `nft_transfer_call` and `nft_on_transfer` return a promise, and `nft_resolve_transfer` returns a boolean.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/nft_core.rs#L1-L71
```

### Transfer function

It's now time to implement the `nft_transfer` logic. This function will transfer the specified `token_id` to the `receiver_id` with an optional `memo` such as `"Happy Birthday Mike!"`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/nft_core.rs#L76-L96
```

There's a couple things to notice here. Firstly, we've introduced a new method called `assert_one_yocto()`. This method will ensure that the user has attached exactly one yoctoNEAR to the call. If a function requires a deposit, you need a full access key to sign that transaction. By adding the one yoctoNEAR deposit requirement, you're essentially forcing the user to sign the transaction with a full access key.

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internal_transfer` method. This will perform all the logic necessary to transfer an NFT.

### Internal helper functions

Let's quickly move over to the `nft-contract/src/internal.rs` file so that you can implement the `assert_one_yocto()` and `internal_transfer` methods.

#### assert_one_yocto

Let's start with the easier one, `assert_one_yocto()`.

You can put this function anywhere in the `internal.rs` file but in our case, we'll put it after the `hash_account_id` function:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs#L14-L21
```

#### internal_transfer

It's now time to implement the meat and potatoes of this tutorial, the `internal_transfer` function. This function will take the following parameters:

- **sender_id**: the account that's attempting to transfer the token.
- **receiver_id**: the account that's receiving the token.
- **token_id**: the token ID being transferred.
- **memo**: an optional memo to include.

The first thing you'll want to do is make sure that the sender is authorized to transfer the token. In this case, you'll just make sure that the sender is the owner of the token. You'll do that by getting the `Token` object using the `token_id` and making sure that the sender is equal to the token's `owner_id`.

After that you'll remove the token ID from the sender's list and add the token ID to the receiver's list of tokens. Finally, you'll create a new `Token` object with the receiver as the owner and remap the token ID to that newly created object.

You'll want to create this function within the contract implementation (below the `internal_add_token_to_owner` you created in the minting tutorial).

```rust reference
https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs#L98-L138
```

You've previously implemented functionality for adding a token ID to an owner's set but you haven't created the functionality for removing a token ID from an owner's set. Let's do that now by created a new function called `internal_remove_token_from_owner` which we'll place right above our `internal_transfer` and below the `internal_add_token_to_owner` function.

In the remove function, you'll get the set of tokens for a given account ID and then remove the passed in token ID. If the account's set is empty after the removal, you'll simply remove the account from the `tokens_per_owner` data structure.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/4.core/nft-contract/src/internal.rs#L73-L96
```

Your `internal.rs` file should have the following outline:

```
internal.rs
├── hash_account_id
├── assert_one_yocto
├── refund_deposit
└── impl Contract
    ├── internal_add_token_to_owner
    ├── internal_remove_token_from_owner
    └── internal_transfer
```

We can then use the CLI to call the methods and show how to transfer NFTs to `benjiman.testnet` ;). We can then use the enumerable methods to show that the new owner is benjiman.testnet

## Conclusion

We talk about how we’ve added the ability for users to transfer NFTs and how if they want the finished code, they can checkout the 4.core branch. Briefly introduce the next tutorial which is aimed at allowing other accounts to transfer NFTs on your behalf.

## Bonus track

I’m not sure what we can do here - maybe some sort of gifting tutorial which the theme of NFT christmas presents? Haha (we can have josh’s testnet account be the grinch who tries to steal NFTs).
