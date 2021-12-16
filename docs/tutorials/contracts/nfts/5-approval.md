---
id: approvals
title: Approvals
sidebar_label: Approvals
---

In this tutorial you'll learn the basics of an approval management system which will allow you to grant others access to transfer NFTs on your behalf. This is the backbone of all NFT marketplaces and allows for some complex yet beautiful scenarios to happen. If you're joining us for the first time, feel free to clone [this repo](https://github.com/near-examples/nft-tutorial) and checkout the `4.core` branch to follow along.

## Introduction

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html). As we've been doing in the previous tutorials, let's break down the problem into smaller, more digestible, tasks. Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) extension of the standard. We want a user to have the ability to:

- Grant other accounts access to transfer their NFTs on a per token basis.
- Check if an account has access to a specific token.
- Revoke a specific account the ability to transfer an NFT.
- Revoke **all** other accounts the ability to transfer an NFT.

If we look at all these goals, they are all on a per token basis. This is a strong indication that we should be changing the `Token` struct which keeps track of information for each token.

## Allow an account to transfer your NFT

Let's start by trying to accomplish the first goal. How can you grant another account access to transfer an NFT on your behalf?

The simplest way that you can achieve this is to add a list of approved accounts to the `Token` struct. When transferring the NFT, if the caller in't the owner, you could check if they're in the list.

Before transferring, you would need to clear the list of approved accounts since the new owner wouldn't expect the accounts approved by the original owner to still have access to transfer their new NFT.

### The problem {#the-problem}

On the surface, this would work, but if you start thinking about the edge cases, some problems arise. Often times when doing development, a common approach is to think about the easiest and most straightforward solution. Once you've figured it out, you can start to branch off and think about optimizations and edge cases.

Let's consider the following scenario. Benji has an NFT and allows two separate marketplaces access to transfer his token. By doing so, he's putting the NFT for sale (more about that in the [marketplace integrations](#marketplace-integrations) section). Let's say he put the NFT for sale for 1 NEAR on both markets. The tokens list of approved account IDs would look like the following:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Josh then comes along and purchases the NFT on marketplace A for 1 NEAR. This would take the sale down from the marketplace and clear the list of approved accounts. Marketplace B, however, still has the token listed for sale for 1 NEAR and has no way of knowing that the token was purchased on marketplace A by Josh. The new token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: []
}
```

Let's say Josh is low on cash and wants to flip this NFT and put it for sale for 10 times the price on marketplace B. He goes to put it for sale and for whatever reason, the marketplace is built in a way that if you try to put a token up for sale twice, it keeps the old sale data. This would mean that from marketplace B's perspective, the token is still for sale for 1 NEAR (which was the price that Benji had originally listed it for).

Since Josh approved the marketplace to try and put it for sale, the token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

If Mike then comes along and purchases the NFT for only 1 NEAR on marketplace B, the marketplace would go to try and transfer the NFT and since technically, Josh approved the marketplace and it's in the list of approved accounts, the transaction would go through properly.

### The solution {#the-solution}

Now that we've identified a problem with the original solution, let's think about ways that we can fix it. What would happen if now, instead of just keeping track of a list of approved accounts, you introduced a specific ID that went along with each approved account. Thew new approved accounts would now be a map instead of a list. It would map an account to it's "approval id".

For this to work, you need to make sure that the approval ID is **always** a unique, new ID. If you set it as an integer that always increases by 1 whenever u approve an account, this should work. Let's consider the same scenario with the new solution.

Benji puts his NFT for sale for 1 NEAR on marketplace A and marketplace B by approving both marketplaces. The "next approval ID" would start off at 0 when the NFT was first minted and will increase from there. This would result in the following token struct:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: {
        marketplace A: 0
        marketplace B: 1
    }
    next_approval_id: 2
}
```

When Benji approved marketplace A, it took the original value of `next_approval_id` which started off at 0. The marketplace was then inserted into the map and the next approval ID was incremented. This process happened again for marketplace B and the next approval ID was again incremented where it's now 2.

Josh comes along and purchases the NFT on marketplace A for 1 NEAR. Notice how the next approval ID stayed at 2:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {}
    next_approval_id: 2
}
```

Josh then flips the NFT because he's once again low on cash and approves marketplace B:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {
        marketplace B: 2
    }
    next_approval_id: 3
}
```

The marketplace is inserted into the map and the next approval ID is incremented. From marketplace B's perspective it stores it's original approval ID from when Benji put the NFT up for sale which has a value of 1. If Mike were to go and purchase the NFT on marketplace B for the original 1 NEAR sale price, the NFT contract should panic. This is because the marketplace is is trying to transfer the NFT with an approval ID 1 but the token struct shows that it **should** have an approval ID of 2.

### Expanding the Token and JsonToken structs

Now that you understand the proposed solution to our original problem of allowing an account to transfer your NFT, it's time to implement some of the logic. The first thing you should do is modify the `Token` and `JsonToken` structs to reflect the new changes. Let's switch over to the `nft-contract/src/metadata.rs` file:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/metadata.rs#L39-L61
```

You'll then need to initialize both the `approved_account_ids` and `next_approval_id` to their default values when a token is minted. Switch to the `nft-contract/src/mint.rs` file and when creating the `Token` struct to store in the contract, let's set the next approval ID to be 0 and the approved account IDs to be an empty map:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/mint.rs#L22-L29
```

### Approving accounts

Now that you've added the support for approved account IDs and the next approval ID on the token level, it's time to add the logic for populating and changing those fields through a function called `nft_approve`. This function should approve an account to have access to a specific token ID. Let's move to the `nft-contract/src/approval.rs` file and edit the `nft_approve` function:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L41-L101
```

The function will first assert that the user has attached **at least** one yoctoNEAR (which we'll implement soon). This is both for security and to cover storage. When someone approves an account ID, they're storing that information on the contract. As you saw in the [minting tutorial](/docs/tutorials/contracts/nfts/minting), you can either have the smart contract account cover the storage, or you can have the users cover that cost. The latter is more scalable and it's the approach you'll be working with throughout this tutorial.

After the assertion comes back with no problems, you get the token object and make sure that only the owner is calling this method. Only the owner should be able to allow other accounts to transfer their NFTs. You then get the next approval ID and insert the passed in account into the map with the next approval ID. If it's a new approval ID, storage must be paid. If it's not a new approval ID, no storage needs to be paid and only attaching 1 yoctoNEAR would be enough.

You then calculate how much storage is being used by adding that new account to the map and increment the tokens `next_approval_id` by 1. After inserting the token object back into the `tokens_by_id` map, you refund any excess storage.

You'll notice that the function contains an optional `msg` parameter. This message is actually the foundation of all NFT marketplaces on NEAR.

#### Marketplace Integrations {#marketplace-integrations}

If a message was provided into the function, you're going to perform a cross contract call to the account being given access. This cross contract call will invoke the `nft_on_approve` function which will parse the message and act accordingly. Let's consider a general use case.

We have a marketplace that expects it's sale conditions to be passed in through the message field. Benji approves the marketplace with the `nft_approve` function and passes in stringified JSON to the message which will outline sale conditions. These sale conditions could look something like the following:

```
sale_conditions: {
    price: 5
}
```

By leaving the message field type as just a string, this generalizes the process and allows users to input sale conditions for many different marketplaces. It is up to the person approving to pass in an appropriate message that the marketplace can properly decode and use. This is usually done through the marketplace's frontend app which would know how to construct the `msg` in a useful way.

#### Internal functions

Now that the core logic for approving an account is finished but you still need to implement the `assert_at_least_one_yocto` and `bytes_for_approved_account` functions. Move to the `nft-contract/src/internal.rs` file and copy the following function right below the `assert_one_yocto` function.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L52-L58
```

Next, you'll need to copy the logic for calculating how many bytes it costs to store an account ID. Place this function at the very top of the page:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L1-L9
```

Now that the logic for approving accounts is finished, you need to change the restrictions for transferring.

### Changing the restrictions for transferring NFTs

Currently, an NFT can **only** be transferred by its owner. You need to change that restriction so that people that have been approved can also transfer NFTs. In addition, you'll make it so that if an approval ID is passed, you can increase the security and check if both the account trying to transfer is in the approved list **and** they correspond to the correct approval ID. This is to address the problem we ran into earlier.

In the internal file, you need to change the logic of the `internal_transfer` method as that's where the restrictions are being made. Change the internal transfer function to be the following:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L135-L201
```

This will check if the the sender isn't the owner and then if they're not, it will check if the sender is in the approval list. If an approval ID was passed into the function, it will check if the sender's actual approval ID stored on the contract matches the one passed in.

#### Refunding storage on transfer

While you're in the internal file, you're going to need to add methods for refunding users who have paid for storing approved accounts on the contract when an NFT is transferred. This is because you'll be clearing the `approved_account_ids` map whenever NFTs are transferred and so the storage is no longer being used.

Right below the `bytes_for_approved_account_id` function, copy the following two functions:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/internal.rs#L11-L32
```

These will be useful in the next section where you'll be changing the `nft_core` functions to include the new approval logic.

### Changes to nft_core.rs

Head over to the `nft-contract/src/nft_core.rs` file and the first change that you'll want to make is to add an `approval_id` to both the `nft_transfer` and `nft_transfer_call` functions. This is so that anyone trying to transfer the token that isn't the owner must pass in an approval ID to address the problem seen earlier. If they are the owner, the approval ID won't be used as we saw in the `internal_transfer` function.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L8-L29
```

You'll then need to add an `approved_account_ids` map to the parameters of `nft_resolve_transfer`. This is so that you can refund the list if the transfer went through properly.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L48-L79
```

Moving over to `nft_transfer`, the only change that you'll need to make is to pass in the approval ID into the `internal_transfer` function and then refund the previous tokens approved account IDs after the transfer is finished

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L84-L113
```

Next, you need to do the same to `nft_transfer_call` but instead of refunding immediately, you need to attach the previous tokens approved account IDs to `nft_resolve_transfer` instead as there's still the possibility that the transfer gets reverted .

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L115-L160
```

You'll also need to add the tokens approved account IDs to the `JsonToken` being returned by `nft_token`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L162-L179
```

Finally, you need to add the logic for refunding the approved account IDs in `nft_resolve_transfer`. If the the transfer went through, you should refund the owner for the storage being released by resetting the tokens `approved_account_ids` field. If, however, you should revert the transfer, it wouldn't be enough to just not refund anybody. Since the receiver briefly owned the token, they could have added their own approved account IDs and so you should refund them if they did so.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/nft_core.rs#L185-L249
```

With that finished, it's time to move on and complete the next task.

## Check if an account is approved

Now that the core logic is in place for approving and refunding accounts, it should be smooth sailing from this point on. You now need to implement the logic for checking if an account has been approved. This should take an account and token ID as well as an optional approval ID. If no approval ID was provided, it should simply return whether or not the account is approved.

If an approval ID was provided, it should return whether or not the account is approved and has the same approval ID as the one provided. Let's move to the `nft-contract/src/approval.rs` file and add the boolean return type to the function `nft_is_approved`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L11-L17
```

Next, you need to add the actual logic:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L103-L130
```

Let's now move on and add the logic for revoking an account

## Revoke an account

The next step in the tutorial is to allow a user to revoke a specific account from having access to their NFT. The first thing you'll want to do is assert one yocto for security purposes. You'll then need to make sure that the caller is the owner of the token. If those checks pass, you'll need to remove the passed in account from the tokens approved account IDs and refund the owner for the storage being released.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L132-L156
```

## Revoke all accounts

The final step in the tutorial is to allow a user to revoke all accounts from having access to their NFT. This should also assert one yocto for security purposes and make sure that the caller is the owner of the token. You then refund the owner for releasing all the accounts in the map and then clear the `approved_account_ids`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/5.approval/nft-contract/src/approval.rs#L158-L179
```

With that finished, it's time to deploy and start testing the contract.

We can get them to approve another account ID (maybe a second one they create) and allow them to approve that account and transfer the token on behalf of the original owner.

## Conclusion

We can talk about how this will be the core behavior used in the marketplace as we will allow the market to transfer the token on our behalf once it is sold. For users that want the finished code, they can checkout the `5.approvals` branch.

## Bonus track

Perhaps we can have a simple marketplace tutorial where NFTs are purchased without royalties? Maybe we can have this tutorial as the start and then we introduce royalties into the marketplace as an extension to the royalty tutorial?
