---
id: approvals
title: Approvals
sidebar_label: Approvals
---



In this tutorial you'll learn the basics of an approval management system which will allow you to grant others access to transfer NFTs on your behalf.

This is the backbone of all NFT marketplaces and allows for some complex yet beautiful scenarios to happen. If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial) and go to the `nft-contract-basic/` folder to follow along.

```bash
cd nft-contract-basic/
```

:::tip
If you wish to see the finished code for this _Approval_ tutorial, you can find it in the `nft-contract-approval/` folder.
:::

---

## Introduction

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). As we've been doing in the previous tutorials, let's break down the problem into smaller, more digestible, tasks.

Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension of the standard. We want a user to have the ability to:

- Grant other accounts access to transfer their NFTs on a per token basis.
- Check if an account has access to a specific token.
- Revoke a specific account the ability to transfer an NFT.
- Revoke **all** other accounts the ability to transfer an NFT.

If you look at all these goals, they are all on a per token basis. This is a strong indication that you should change the `Token` struct which keeps track of information for each token.

---

## Allow an account to transfer your NFT

Let's start by trying to accomplish the first goal. How can you grant another account access to transfer an NFT on your behalf?

The simplest way that you can achieve this is to add a list of approved accounts to the `Token` struct. When transferring the NFT, if the caller is not the owner, you could check if they're in the list.

Before transferring, you would need to clear the list of approved accounts since the new owner wouldn't expect the accounts approved by the original owner to still have access to transfer their new NFT.

<hr className="subsection" />

### The problem {#the-problem}

On the surface, this would work, but if you start thinking about the edge cases, some problems arise. Often times when doing development, a common approach is to think about the easiest and most straightforward solution. Once you've figured it out, you can start to branch off and think about optimizations and edge cases.

Let's consider the following scenario. Benji has an NFT and gives two separate marketplaces access to transfer his token. By doing so, he's putting the NFT for sale. Let's say he put the NFT for sale for 1 NEAR on both markets. The tokens list of approved account IDs would look like the following:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Josh then comes along and purchases the NFT on marketplace A for 1 NEAR. This would take the sale down from the marketplace A and clear the list of approved accounts. Marketplace B, however, still has the token listed for sale for 1 NEAR and has no way of knowing that the token was purchased on marketplace A by Josh. The new token struct would look as follows:

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

<hr className="subsection" />

### The solution {#the-solution}

Now that we've identified a problem with the original solution, let's think about ways that we can fix it. What would happen now if, instead of just keeping track of a list of approved accounts, you introduced a specific ID that went along with each approved account. The new approved accounts would now be a map instead of a list. It would map an account to its `approval id`.

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

The marketplace is inserted into the map and the next approval ID is incremented. From marketplace B's perspective it stores its original approval ID from when Benji put the NFT up for sale which has a value of 1. If Mike were to go and purchase the NFT on marketplace B for the original 1 NEAR sale price, the NFT contract should panic. This is because the marketplace is trying to transfer the NFT with an approval ID 1 but the token struct shows that it **should** have an approval ID of 2.

<hr className="subsection" />

### Expanding the `Token` and `JsonToken` structs

Now that you understand the proposed solution to the original problem of allowing an account to transfer your NFT, it's time to implement some of the logic. The first thing you should do is modify the `Token` and `JsonToken` structs to reflect the new changes. Let's switch over to the `nft-contract-basic/src/metadata.rs` file:

```
#[derive(BorshDeserialize, BorshSerialize)]
#[borsh(crate = "near_sdk::borsh")]
pub struct Token {
    //owner of the token
    pub owner_id: AccountId,
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    pub approved_account_ids: HashMap<AccountId, u64>,
    //the next approval ID to give out.
    pub next_approval_id: u64,
}

//The Json token is what will be returned from view calls.
#[derive(Serialize, Deserialize, NearSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonToken {
    //token ID
    pub token_id: TokenId,
    //owner of the token
    pub owner_id: AccountId,
    //token metadata
    pub metadata: TokenMetadata,
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    pub approved_account_ids: HashMap<AccountId, u64>,
}

```

You'll then need to initialize both the `approved_account_ids` and `next_approval_id` to their default values when a token is minted. Switch to the `nft-contract-basic/src/mint.rs` file and when creating the `Token` struct to store in the contract, let's set the next approval ID to be 0 and the approved account IDs to be an empty map:

```
            }
        }

        //specify the token struct that contains the owner ID
        let token = Token {
            owner_id: token_owner_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
```

<hr className="subsection" />

### Approving accounts

Now that you've added the support for approved account IDs and the next approval ID on the token level, it's time to add the logic for populating and changing those fields through a function called `nft_approve`. This function should approve an account to have access to a specific token ID. Let's move to the `nft-contract-basic/src/approval.rs` file and edit the `nft_approve` function:

```
    #[payable]
    fn nft_approve(&mut self, token_id: TokenId, account_id: AccountId, msg: Option<String>) {
        /*
            assert at least one yocto for security reasons - this will cause a redirect to the NEAR wallet.
            The user needs to attach enough to pay for storage on the contract
        */
        assert_at_least_one_yocto();

        //get the token object from the token ID
        let mut token = self.tokens_by_id.get(&token_id).expect("No token");

        //make sure that the person calling the function is the owner of the token
        assert_eq!(
            &env::predecessor_account_id(),
            &token.owner_id,
            "Predecessor must be the token owner."
        );

        //get the next approval ID if we need a new approval
        let approval_id: u64 = token.next_approval_id;

        //check if the account has been approved already for this token
        let is_new_approval = token
            .approved_account_ids
            //insert returns none if the key was not present.
            .insert(account_id.clone(), approval_id)
            //if the key was not present, .is_none() will return true so it is a new approval.
            .is_none();

        //if it was a new approval, we need to calculate how much storage is being used to add the account.
        let storage_used = if is_new_approval {
            bytes_for_approved_account_id(&account_id)
        //if it was not a new approval, we used no storage.
        } else {
            0
        };

        //increment the token's next approval ID by 1
        token.next_approval_id += 1;
        //insert the token back into the tokens_by_id collection
        self.tokens_by_id.insert(&token_id, &token);

        //refund any excess storage attached by the user. If the user didn't attach enough, panic.
        refund_deposit(storage_used);

        //if some message was passed into the function, we initiate a cross contract call on the
        //account we're giving access to.
        if let Some(msg) = msg {
            // Defaulting GAS weight to 1, no attached deposit, and no static GAS to attach.
            ext_non_fungible_approval_receiver::ext(account_id)
                .nft_on_approve(token_id, token.owner_id, approval_id, msg)
                .as_return();
        }
    }

    //check if the passed in account has access to approve the token ID
    fn nft_is_approved(
        &self,
        token_id: TokenId,
```

The function will first assert that the user has attached **at least** one yoctoNEAR (which we'll implement soon). This is both for security and to cover storage. When someone approves an account ID, they're storing that information on the contract. As you saw in the [minting tutorial](/tutorials/nfts/minting), you can either have the smart contract account cover the storage, or you can have the users cover that cost. The latter is more scalable and it's the approach you'll be working with throughout this tutorial.

After the assertion comes back with no problems, you get the token object and make sure that only the owner is calling this method. Only the owner should be able to allow other accounts to transfer their NFTs. You then get the next approval ID and insert the passed in account into the map with the next approval ID. If it's a new approval ID, storage must be paid. If it's not a new approval ID, no storage needs to be paid and only attaching 1 yoctoNEAR would be enough.

You then calculate how much storage is being used by adding that new account to the map and increment the tokens `next_approval_id` by 1. After inserting the token object back into the `tokens_by_id` map, you refund any excess storage.

You'll notice that the function contains an optional `msg` parameter. This message can be used by NFT marketplaces. If a message was provided into the function, you're going to perform a cross contract call to the account being given access. This cross contract call will invoke the `nft_on_approve` function which will parse the message and act accordingly.

It is up to the approving person to provide a properly encoded message that the marketplace can decode and use. This is usually done through the marketplace's frontend app which would know how to construct the `msg` in a useful way.

<hr className="subsection" />

### Internal functions

Now that the core logic for approving an account is finished, you need to implement the `assert_at_least_one_yocto` and `bytes_for_approved_account` functions. Move to the `nft-contract/src/internal.rs` file and copy the following function right below the `assert_one_yocto` function.

```
        NearToken::from_yoctonear(1),
        "Requires attached deposit of exactly 1 yoctoNEAR",
    )
}

//Assert that the user has attached at least 1 yoctoNEAR (for security reasons and to pay for storage)
pub(crate) fn assert_at_least_one_yocto() {
    assert!(
```

Next, you'll need to copy the logic for calculating how many bytes it costs to store an account ID. Place this function at the very top of the page:

```
use crate::*;
use near_sdk::CryptoHash;
use std::mem::size_of;

//calculate how many bytes the account ID is taking up
pub(crate) fn bytes_for_approved_account_id(account_id: &AccountId) -> u128 {
    // The extra 4 bytes are coming from Borsh serialization to store the length of the string.
    account_id.as_str().len() as u128 + 4 + size_of::<u128>() as u128
}

```

Now that the logic for approving accounts is finished, you need to change the restrictions for transferring.


#### Changing the restrictions for transferring NFTs

Currently, an NFT can **only** be transferred by its owner. You need to change that restriction so that people that have been approved can also transfer NFTs. In addition, you'll make it so that if an approval ID is passed, you can increase the security and check if both the account trying to transfer is in the approved list **and** they correspond to the correct approval ID. This is to address the problem we ran into earlier.

In the `internal.rs` file, you need to change the logic of the `internal_transfer` method as that's where the restrictions are being made. Change the internal transfer function to be the following:

```
        }
    }

    //transfers the NFT to the receiver_id (internal method and can't be called directly via CLI).
    pub(crate) fn internal_transfer(
        &mut self,
        sender_id: &AccountId,
        receiver_id: &AccountId,
        token_id: &TokenId,
        //we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
    ) -> Token {
        //get the token object by passing in the token_id
        let token = self.tokens_by_id.get(token_id).expect("No token");

        //if the sender doesn't equal the owner, we check if the sender is in the approval list
        if sender_id != &token.owner_id {
            //if the token's approved account IDs doesn't contain the sender, we panic
            if !token.approved_account_ids.contains_key(sender_id) {
                env::panic_str("Unauthorized");
            }

            // If they included an approval_id, check if the sender's actual approval_id is the same as the one included
            if let Some(enforced_approval_id) = approval_id {
                //get the actual approval ID
                let actual_approval_id = token
                    .approved_account_ids
                    .get(sender_id)
                    //if the sender isn't in the map, we panic
                    .expect("Sender is not approved account");

                //make sure that the actual approval ID is the same as the one provided
                assert_eq!(
                    actual_approval_id, &enforced_approval_id,
                    "The actual approval_id {} is different from the given approval_id {}",
                    actual_approval_id, enforced_approval_id,
                );
            }
        }

        //we make sure that the sender isn't sending the token to themselves
        assert_ne!(
            &token.owner_id, receiver_id,
            "The token owner and the receiver should be different"
        );

        //we remove the token from it's current owner's set
        self.internal_remove_token_from_owner(&token.owner_id, token_id);
        //we then add the token to the receiver_id's set
        self.internal_add_token_to_owner(receiver_id, token_id);

        //we create a new token struct
        let new_token = Token {
            owner_id: receiver_id.clone(),
            //reset the approval account IDs
            approved_account_ids: Default::default(),
            next_approval_id: token.next_approval_id,
        };
        //insert that new token into the tokens_by_id, replacing the old entry
        self.tokens_by_id.insert(token_id, &new_token);

        //if there was some memo attached, we log it.
        if let Some(memo) = memo.as_ref() {
            env::log_str(&format!("Memo: {}", memo).to_string());
        }

        // Default the authorized ID to be None for the logs.
        let mut authorized_id = None;
        //if the approval ID was provided, set the authorized ID equal to the sender
        if approval_id.is_some() {
            authorized_id = Some(sender_id.to_string());
        }

        // Construct the transfer log as per the events standard.
        let nft_transfer_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftTransfer(vec![NftTransferLog {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id,
                // The old owner's account ID.
                old_owner_id: token.owner_id.to_string(),
                // The account ID of the new owner of the token.
                new_owner_id: receiver_id.to_string(),
                // A vector containing the token IDs as strings.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_transfer_log.to_string());

        //return the previous token object that was transferred.
```

This will check if the sender isn't the owner and then if they're not, it will check if the sender is in the approval list. If an approval ID was passed into the function, it will check if the sender's actual approval ID stored on the contract matches the one passed in.

<hr className="subsection" />

#### Refunding storage on transfer

While you're in the internal file, you're going to need to add methods for refunding users who have paid for storing approved accounts on the contract when an NFT is transferred. This is because you'll be clearing the `approved_account_ids` map whenever NFTs are transferred and so the storage is no longer being used.

Right below the `bytes_for_approved_account_id` function, copy the following two functions:

```
//refund the storage taken up by passed in approved account IDs and send the funds to the passed in account ID.
pub(crate) fn refund_approved_account_ids_iter<'a, I>(
    account_id: AccountId,
    approved_account_ids: I, //the approved account IDs must be passed in as an iterator
) -> Promise
where
    I: Iterator<Item = &'a AccountId>,
{
    //get the storage total by going through and summing all the bytes for each approved account IDs
    let storage_released = approved_account_ids
        .map(bytes_for_approved_account_id)
        .sum();
    //transfer the account the storage that is released
    Promise::new(account_id).transfer(env::storage_byte_cost().saturating_mul(storage_released))
}

//refund a map of approved account IDs and send the funds to the passed in account ID
pub(crate) fn refund_approved_account_ids(
    account_id: AccountId,
    approved_account_ids: &HashMap<AccountId, u64>,
```

These will be useful in the next section where you'll be changing the `nft_core` functions to include the new approval logic.

<hr className="subsection" />

### Changes to `nft_core.rs`

Head over to the `nft-contract-basic/src/nft_core.rs` file and the first change that you'll want to make is to add an `approval_id` to both the `nft_transfer` and `nft_transfer_call` functions. This is so that anyone trying to transfer the token that isn't the owner must pass in an approval ID to address the problem seen earlier. If they are the owner, the approval ID won't be used as we saw in the `internal_transfer` function.

```
    //transfers an NFT to a receiver ID
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
    );

    // Transfers an NFT to a receiver and calls the
    //  function `nft_on_transfer` on their contract.
    fn nft_transfer_call(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
        msg: String,
    ) -> PromiseOrValue<bool>;

    //get information about the NFT token passed in
```

You'll then need to add an `approved_account_ids` map to the parameters of `nft_resolve_transfer`. This is so that you can refund the list if the transfer went through properly.

```
#[ext_contract(ext_self)]
trait NonFungibleTokenResolver {
    /*
        resolves the promise of the cross contract call to the receiver contract
        this is stored on THIS contract and is meant to analyze what happened in the cross contract call when nft_on_transfer was called
        as part of the nft_transfer_call method
    */
    fn nft_resolve_transfer(
        &mut self,
        //we introduce an authorized ID for logging the transfer event
        authorized_id: Option<String>,
        previous_owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce the approval map so we can keep track of what the approvals were before the transfer
        approved_account_ids: HashMap<AccountId, u64>,
        //we introduce a memo for logging the transfer event
        memo: Option<String>,
    ) -> bool;
}

```

Moving over to `nft_transfer`, the only change that you'll need to make is to pass in the approval ID into the `internal_transfer` function and then refund the previous tokens approved account IDs after the transfer is finished

```
    #[payable]
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
    ) {
        //assert that the user attached exactly 1 yoctoNEAR. This is for security and so that the user will be redirected to the NEAR wallet.
        assert_one_yocto();
        //get the sender to transfer the token from the sender to the receiver
        let sender_id = env::predecessor_account_id();

        //call the internal transfer method and get back the previous token so we can refund the approved account IDs
        let previous_token =
            self.internal_transfer(&sender_id, &receiver_id, &token_id, approval_id, memo);

        //we refund the owner for releasing the storage used up by the approved account IDs
        refund_approved_account_ids(
            previous_token.owner_id.clone(),
            &previous_token.approved_account_ids,
        );
    }

    //implementation of the transfer call method. This will transfer the NFT and call a method on the receiver_id contract
    #[payable]
    fn nft_transfer_call(
        &mut self,
        receiver_id: AccountId,
```

Next, you need to do the same to `nft_transfer_call` but instead of refunding immediately, you need to attach the previous token's approved account IDs to `nft_resolve_transfer` instead as there's still the possibility that the transfer gets reverted.

```
        token_id: TokenId,
        //we introduce an approval ID so that people with that approval ID can transfer the token
        approval_id: Option<u64>,
        memo: Option<String>,
        msg: String,
    ) -> PromiseOrValue<bool> {
        //assert that the user attached exactly 1 yocto for security reasons.
        assert_one_yocto();

        //get the sender ID
        let sender_id = env::predecessor_account_id();

        //transfer the token and get the previous token object
        let previous_token = self.internal_transfer(
            &sender_id,
            &receiver_id,
            &token_id,
            approval_id,
            memo.clone(),
        );

        //default the authorized_id to none
        let mut authorized_id = None;
        //if the sender isn't the owner of the token, we set the authorized ID equal to the sender.
        if sender_id != previous_token.owner_id {
            authorized_id = Some(sender_id.to_string());
        }

        // Initiating receiver's call and the callback
        // Defaulting GAS weight to 1, no attached deposit, and static GAS equal to the GAS for nft on transfer.
        ext_non_fungible_token_receiver::ext(receiver_id.clone())
            .with_static_gas(GAS_FOR_NFT_ON_TRANSFER)
            .nft_on_transfer(
                sender_id,
                previous_token.owner_id.clone(),
                token_id.clone(),
                msg,
            )
            // We then resolve the promise and call nft_resolve_transfer on our own contract
            .then(
                // Defaulting GAS weight to 1, no attached deposit, and static GAS equal to the GAS for resolve transfer
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_RESOLVE_TRANSFER)
                    .nft_resolve_transfer(
                        authorized_id, // we introduce an authorized ID so that we can log the transfer
                        previous_token.owner_id,
                        receiver_id,
                        token_id,
                        previous_token.approved_account_ids,
                        memo, // we introduce a memo for logging in the events standard
                    ),
            )
            .into()
    }

    //get the information for a specific token ID
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken> {
        //if there is some token ID in the tokens_by_id collection
        if let Some(token) = self.tokens_by_id.get(&token_id) {
```

You'll also need to add the tokens approved account IDs to the `JsonToken` being returned by `nft_token`.

```
            //we'll get the metadata for that token
            let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
            //we return the JsonToken (wrapped by Some since we return an option)
            Some(JsonToken {
                token_id,
                owner_id: token.owner_id,
                metadata,
                approved_account_ids: token.approved_account_ids,
            })
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}

#[near_bindgen]
impl NonFungibleTokenResolver for Contract {
```

Finally, you need to add the logic for refunding the approved account IDs in `nft_resolve_transfer`. If the transfer went through, you should refund the owner for the storage being released by resetting the tokens `approved_account_ids` field. If, however, you should revert the transfer, it wouldn't be enough to just not refund anybody. Since the receiver briefly owned the token, they could have added their own approved account IDs and so you should refund them if they did so.

```
    fn nft_resolve_transfer(
        &mut self,
        //we introduce an authorized ID for logging the transfer event
        authorized_id: Option<String>,
        previous_owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce the approval map so we can keep track of what the approvals were before the transfer
        approved_account_ids: HashMap<AccountId, u64>,
        //we introduce a memo for logging the transfer event
        memo: Option<String>,
    ) -> bool {
        // Whether receiver wants to return token back to the sender, based on `nft_on_transfer`
        // call result.
        if let PromiseResult::Successful(value) = env::promise_result(0) {
            //As per the standard, the nft_on_transfer should return whether we should return the token to it's owner or not
            if let Ok(return_token) = near_sdk::serde_json::from_slice::<bool>(&value) {
                //if we need don't need to return the token, we simply return true meaning everything went fine
                if !return_token {
                    /*
                        since we've already transferred the token and nft_on_transfer returned false, we don't have to
                        revert the original transfer and thus we can just return true since nothing went wrong.
                    */
                    //we refund the owner for releasing the storage used up by the approved account IDs
                    refund_approved_account_ids(previous_owner_id, &approved_account_ids);
                    return true;
                }
            }
        }

        //get the token object if there is some token object
        let mut token = if let Some(token) = self.tokens_by_id.get(&token_id) {
            if token.owner_id != receiver_id {
                //we refund the owner for releasing the storage used up by the approved account IDs
                refund_approved_account_ids(previous_owner_id, &approved_account_ids);
                // The token is not owner by the receiver anymore. Can't return it.
                return true;
            }
            token
        //if there isn't a token object, it was burned and so we return true
        } else {
            //we refund the owner for releasing the storage used up by the approved account IDs
            refund_approved_account_ids(previous_owner_id, &approved_account_ids);
            return true;
        };

        //if at the end, we haven't returned true, that means that we should return the token to it's original owner
        log!(
            "Return {} from @{} to @{}",
            token_id,
            receiver_id,
            previous_owner_id
        );

        //we remove the token from the receiver
        self.internal_remove_token_from_owner(&receiver_id.clone(), &token_id);
        //we add the token to the original owner
        self.internal_add_token_to_owner(&previous_owner_id, &token_id);

        //we change the token struct's owner to be the original owner
        token.owner_id = previous_owner_id.clone();

        //we refund the receiver any approved account IDs that they may have set on the token
        refund_approved_account_ids(receiver_id.clone(), &token.approved_account_ids);
        //reset the approved account IDs to what they were before the transfer
        token.approved_account_ids = approved_account_ids;

        //we inset the token back into the tokens_by_id collection
        self.tokens_by_id.insert(&token_id, &token);

        /*
            We need to log that the NFT was reverted back to the original owner.
            The old_owner_id will be the receiver and the new_owner_id will be the
            original owner of the token since we're reverting the transfer.
        */
        let nft_transfer_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftTransfer(vec![NftTransferLog {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id,
                // The old owner's account ID.
                old_owner_id: receiver_id.to_string(),
                // The account ID of the new owner of the token.
                new_owner_id: previous_owner_id.to_string(),
                // A vector containing the token IDs as strings.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo,
            }]),
        };

        //we perform the actual logging
        env::log_str(&nft_transfer_log.to_string());

        //return false
        false
```

With that finished, it's time to move on and complete the next task.

---

## Check if an account is approved

Now that the core logic is in place for approving and refunding accounts, it should be smooth sailing from this point on. You now need to implement the logic for checking if an account has been approved. This should take an account and token ID as well as an optional approval ID. If no approval ID was provided, it should simply return whether or not the account is approved.

If an approval ID was provided, it should return whether or not the account is approved and has the same approval ID as the one provided. Let's move to the `nft-contract-basic/src/approval.rs` file and add the necessary logic to the `nft_is_approved` function.

```
        approval_id: Option<u64>,
    ) -> bool {
        //get the token object from the token_id
        let token = self.tokens_by_id.get(&token_id).expect("No token");

        //get the approval number for the passed in account ID
        let approval = token.approved_account_ids.get(&approved_account_id);

        //if there was some approval ID found for the account ID
        if let Some(approval) = approval {
            //if a specific approval_id was passed into the function
            if let Some(approval_id) = approval_id {
                //return if the approval ID passed in matches the actual approval ID for the account
                approval_id == *approval
            //if there was no approval_id passed into the function, we simply return true
            } else {
                true
            }
            //if there was no approval ID found for the account ID, we simply return false
        } else {
            false
        }
    }

    //revoke a specific account from transferring the token on your behalf
    #[payable]
    fn nft_revoke(&mut self, token_id: TokenId, account_id: AccountId) {
        //assert that the user attached exactly 1 yoctoNEAR for security reasons
        assert_one_yocto();
```

Let's now move on and add the logic for revoking an account

---

## Revoke an account

The next step in the tutorial is to allow a user to revoke a specific account from having access to their NFT. The first thing you'll want to do is assert one yocto for security purposes. You'll then need to make sure that the caller is the owner of the token. If those checks pass, you'll need to remove the passed in account from the tokens approved account IDs and refund the owner for the storage being released.

```
        //get the token object using the passed in token_id
        let mut token = self.tokens_by_id.get(&token_id).expect("No token");

        //get the caller of the function and assert that they are the owner of the token
        let predecessor_account_id = env::predecessor_account_id();
        assert_eq!(&predecessor_account_id, &token.owner_id);

        //if the account ID was in the token's approval, we remove it and the if statement logic executes
        if token.approved_account_ids.remove(&account_id).is_some() {
            //refund the funds released by removing the approved_account_id to the caller of the function
            refund_approved_account_ids_iter(predecessor_account_id, [account_id].iter());

            //insert the token back into the tokens_by_id collection with the account_id removed from the approval list
            self.tokens_by_id.insert(&token_id, &token);
        }
    }

    //revoke all accounts from transferring the token on your behalf
    #[payable]
    fn nft_revoke_all(&mut self, token_id: TokenId) {
        //assert that the caller attached exactly 1 yoctoNEAR for security
        assert_one_yocto();

        //get the token object from the passed in token ID
        let mut token = self.tokens_by_id.get(&token_id).expect("No token");
        //get the caller and make sure they are the owner of the tokens
```

---

## Revoke all accounts

The final step in the tutorial is to allow a user to revoke all accounts from having access to their NFT. This should also assert one yocto for security purposes and make sure that the caller is the owner of the token. You then refund the owner for releasing all the accounts in the map and then clear the `approved_account_ids`.

```
        let predecessor_account_id = env::predecessor_account_id();
        assert_eq!(&predecessor_account_id, &token.owner_id);

        //only revoke if the approved account IDs for the token is not empty
        if !token.approved_account_ids.is_empty() {
            //refund the approved account IDs to the caller of the function
            refund_approved_account_ids(predecessor_account_id, &token.approved_account_ids);
            //clear the approved account IDs
            token.approved_account_ids.clear();
            //insert the token back into the tokens_by_id collection with the approved account IDs cleared
            self.tokens_by_id.insert(&token_id, &token);
        }
    }
}

```

With that finished, it's time to deploy and start testing the contract.

---

## Testing the new changes {#testing-changes}

Since these changes affect all the other tokens and the state won't be able to automatically be inherited by the new code, simply redeploying the contract will lead to errors. For this reason, it's best practice to create a new account and deploy the contract there.

<hr className="subsection" />

### Deployment and initialization

Next, you'll deploy this contract to the network.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  export APPROVAL_NFT_CONTRACT_ID=<accountId>
  near create-account $APPROVAL_NFT_CONTRACT_ID --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  export APPROVAL_NFT_CONTRACT_ID=<accountId>
  near account create-account sponsor-by-faucet-service $APPROVAL_NFT_CONTRACT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $APPROVAL_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting {#minting}

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"approval-token"` and the receiver will be your new account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $APPROVAL_NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $APPROVAL_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

You can check to see if everything went through properly by calling one of the enumeration functions:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

Notice how the approved account IDs are now being returned from the function? This is a great sign! You're now ready to move on and approve an account to have access to your token.

<hr className="subsection" />

### Approving an account {#approving-an-account}

At this point, you should have two accounts. One stored under `$NFT_CONTRACT_ID` and the other under the `$APPROVAL_NFT_CONTRACT_ID` environment variable. You can use both of these accounts to test things out. If you approve your old account, it should have the ability to transfer the NFT to itself.

Execute the following command to approve the account stored under `$NFT_CONTRACT_ID` to have access to transfer your NFT with an ID `"approval-token"`. You don't need to pass a message since the old account didn't implement the `nft_on_approve` function. In addition, you'll need to attach enough NEAR to cover the cost of storing the account on the contract. 0.1 NEAR should be more than enough and you'll be refunded any excess that is unused.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you call the same enumeration method as before, you should see the new approved account ID being returned.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "goteam.examples.testnet": 0 }
  }
]
```

<hr className="subsection" />

### Transferring an NFT as an approved account {#transferring-the-nft}

Now that you've approved another account to transfer the token, you can test that behavior. You should be able to use the other account to transfer the NFT to itself by which the approved account IDs should be reset. Let's test transferring the NFT with the wrong approval ID:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' --gas 100000000000000 --depositYocto 1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<details>
<summary>Example response: </summary>
<p>

```bash
kind: {
    ExecutionError: "Smart contract panicked: panicked at 'assertion failed: `(left == right)`\n" +
      '  left: `0`,\n' +
      " right: `1`: The actual approval_id 0 is different from the given approval_id 1', src/internal.rs:165:17"
  },
```

</p>
</details>

If you pass the correct approval ID which is `0`, everything should work fine.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' --gas 100000000000000 --depositYocto 1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you again call the enumeration method, you should see the owner updated and the approved account IDs reset.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

Let's now test the approval ID incrementing across different owners. If you approve the account that originally minted the token, the approval ID should be 1 now.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

Calling the view function again show now return an approval ID of 1 for the account that was approved.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
  ```
  </TabItem>
</Tabs>

<details>
<summary>Example response: </summary>
<p>

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "approval.goteam.examples.testnet": 1 }
  }
]
```

</p>
</details>

With the testing finished, you've successfully implemented the approvals extension to the standard!

---

## Conclusion

Today you went through a lot of logic to implement the [approvals extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) so let's break down exactly what you did.

First, you explored the [basic approach](#allow-an-account-to-transfer-your-nft) of how to solve the problem. You then went through and discovered some of the [problems](#the-problem) with that solution and learned how to [fix it](#the-solution).

After understanding what you should do to implement the approvals extension, you started to [modify](#expanding-the-token-and-jsontoken-structs) the JsonToken and Token structs in the contract. You then implemented the logic for [approving accounts](#approving-accounts).

After implementing the logic behind approving accounts, you went and [changed the restrictions](#changing-the-restrictions-for-transferring-nfts) needed to transfer NFTs. The last step you did to finalize the approving logic was to go back and edit the [nft_core](#changes-to-nft_corers) files to be compatible with the new changes.

At this point, everything was implemented in order to allow accounts to be approved and you extended the functionality of the [core standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) to allow for approved accounts to transfer tokens.

You implemented a view method to [check](#check-if-an-account-is-approved) if an account is approved and to finish the coding portion of the tutorial, you implemented the logic necessary to [revoke an account](#revoke-an-account) as well as [revoke all accounts](#revoke-all-accounts).

After this, the contract code was finished and it was time to move onto testing where you created an [account](#deployment-and-initialization) and tested the [approving](#approving-an-account) and [transferring](#transferring-the-nft) for your NFTs.

In the [next tutorial](6-royalty.md), you'll learn about the royalty standards and how you can interact with NFT marketplaces.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Approval standard: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), version `1.1.0`

:::
