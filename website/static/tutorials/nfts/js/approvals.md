---
id: approvals
title: Approvals
sidebar_label: Approvals
---



In this tutorial you'll learn the basics of an approval management system which will allow you to grant others access to transfer NFTs on your behalf. This is the backbone of all NFT marketplaces and allows for some complex yet beautiful scenarios to happen. If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial) and checkout the `4.core` branch to follow along.




```bash
git checkout 4.core
```

:::tip
If you wish to see the finished code for this _Approval_ tutorial, you can find it on the `5.approval` branch.
:::

## Introduction

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). As we've been doing in the previous tutorials, let's break down the problem into smaller, more digestible, tasks. Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension of the standard. We want a user to have the ability to:

- Grant other accounts access to transfer their NFTs on a per token basis.
- Check if an account has access to a specific token.
- Revoke a specific account the ability to transfer an NFT.
- Revoke **all** other accounts the ability to transfer an NFT.

If you look at all these goals, they are all on a per token basis. This is a strong indication that you should change the `Token` struct which keeps track of information for each token.

## Allow an account to transfer your NFT

Let's start by trying to accomplish the first goal. How can you grant another account access to transfer an NFT on your behalf?

The simplest way that you can achieve this is to add a list of approved accounts to the `Token` struct. When transferring the NFT, if the caller is not the owner, you could check if they're in the list.

Before transferring, you would need to clear the list of approved accounts since the new owner wouldn't expect the accounts approved by the original owner to still have access to transfer their new NFT.

### The problem {#the-problem}

On the surface, this would work, but if you start thinking about the edge cases, some problems arise. Often times when doing development, a common approach is to think about the easiest and most straightforward solution. Once you've figured it out, you can start to branch off and think about optimizations and edge cases.

Let's consider the following scenario. Benji has an NFT and gives two separate marketplaces access to transfer his token. By doing so, he's putting the NFT for sale (more about that in the [marketplace integrations](#marketplace-integrations) section). Let's say he put the NFT for sale for 1 NEAR on both markets. The token's list of approved account IDs would look like the following:

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

### The solution {#the-solution}

Now that we've identified a problem with the original solution, let's think about ways that we can fix it. What would happen now if, instead of just keeping track of a list of approved accounts, you introduced a specific ID that went along with each approved account. The new approved accounts would now be a map instead of a list. It would map an account to it's `approval id`.

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

The marketplace is inserted into the map and the next approval ID is incremented. From marketplace B's perspective it stores it's original approval ID from when Benji put the NFT up for sale which has a value of 1. If Mike were to go and purchase the NFT on marketplace B for the original 1 NEAR sale price, the NFT contract should panic. This is because the marketplace is trying to transfer the NFT with an approval ID 1 but the token struct shows that it **should** have an approval ID of 2.

### Expanding the `Token` and `JsonToken` structs

Now that you understand the proposed solution to the original problem of allowing an account to transfer your NFT, it's time to implement some of the logic. The first thing you should do is modify the `Token` and `JsonToken` structs to reflect the new changes. Let's switch over to the `nft-contract/src/metadata.ts` file:

```
export class Token {
    owner_id: string;
    approved_account_ids: { [accountId: string]: number };
    next_approval_id: number;

    constructor({ 
        ownerId, 
        approvedAccountIds, 
        nextApprovalId, 
    }:{ 
        ownerId: string, 
        approvedAccountIds: { [accountId: string]: number },
        nextApprovalId: number
    }) {
        //owner of the token
        this.owner_id = ownerId
        //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
        this.approved_account_ids = approvedAccountIds,
        //the next approval ID to give out. 
        this.next_approval_id = nextApprovalId
    }
}

//The Json token is what will be returned from view calls. 
export class JsonToken {
    token_id: string;
    owner_id: string;
    metadata: TokenMetadata;
    approved_account_ids: { [accountId: string]: number };

    constructor({ 
        tokenId, 
        ownerId, 
        metadata, 
        approvedAccountIds, 
    }:{
        tokenId: string,
        ownerId: string,
        metadata: TokenMetadata,
        approvedAccountIds: { [accountId: string]: number }
    }) {
        //token ID
        this.token_id = tokenId,
        //owner of the token
        this.owner_id = ownerId,
        //token metadata
        this.metadata = metadata,
        //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
        this.approved_account_ids = approvedAccountIds
    }
}

```

You'll then need to initialize both the `approved_account_ids` and `next_approval_id` to their default values when a token is minted. Switch to the `nft-contract/src/mint.ts` file and when creating the `Token` struct to store in the contract, let's set the next approval ID to be 0 and the approved account IDs to be an empty object:

```
    //specify the token struct that contains the owner ID 
    let token = new Token ({
        //set the owner ID equal to the receiver ID passed into the function
        ownerId: receiverId,
        //we set the approved account IDs to the default value (an empty map)
        approvedAccountIds: {},
        //the next approval ID is set to 0
        nextApprovalId: 0
    });

```

### Approving accounts

Now that you've added the support for approved account IDs and the next approval ID on the token level, it's time to add the logic for populating and changing those fields through a function called `nft_approve`. This function should approve an account to have access to a specific token ID. Let's move to the `nft-contract/src/approval.ts` file and edit the `internalNftApprove` function:

```
//approve an account ID to transfer a token on your behalf
export function internalNftApprove({
    contract,
    tokenId,
    accountId,
    msg
}:{ 
    contract: Contract, 
    tokenId: string, 
    accountId: string, 
    msg: string 
}) {
    /*
        assert at least one yocto for security reasons - this will cause a redirect to the NEAR wallet.
        The user needs to attach enough to pay for storage on the contract
    */
    assertAtLeastOneYocto();

    //get the token object from the token ID
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token");
    }
    //make sure that the person calling the function is the owner of the token
    assert(near.predecessorAccountId() === token.owner_id, "Predecessor must be the token owner");

    //get the next approval ID if we need a new approval
    let approvalId = token.next_approval_id;

    //check if the account has been approved already for this token
    let isNewApproval = token.approved_account_ids.hasOwnProperty(accountId);
    token.approved_account_ids[accountId] = approvalId;

    //if it was a new approval, we need to calculate how much storage is being used to add the account.
    let storageUsed = isNewApproval ? bytesForApprovedAccountId(accountId) : 0;

    //increment the token's next approval ID by 1
    token.next_approval_id += 1;
    //insert the token back into the tokens_by_id collection
    contract.tokensById.set(tokenId, token);

    //refund any excess storage attached by the user. If the user didn't attach enough, panic. 
    refundDeposit(BigInt(storageUsed));
    
    //if some message was passed into the function, we initiate a cross contract call on the
    //account we're giving access to. 
    if (msg != null) {
        // Initiating receiver's call and the callback
        const promise = near.promiseBatchCreate(accountId);
        near.promiseBatchActionFunctionCall(
            promise, 
            "nft_on_approve", 
            bytes(JSON.stringify({ 
                token_id: tokenId,
                owner_id: token.owner_id,
                approval_id: approvalId,
                msg
            })), 
            0, // no deposit 
            GAS_FOR_NFT_ON_APPROVE
        );

        near.promiseReturn(promise);
    }
}

```

The function will first assert that the user has attached **at least** one yoctoNEAR (which we'll implement soon). This is both for security and to cover storage. When someone approves an account ID, they're storing that information on the contract. As you saw in the [minting tutorial](/tutorials/nfts/js/minting), you can either have the smart contract account cover the storage, or you can have the users cover that cost. The latter is more scalable and it's the approach you'll be working with throughout this tutorial.

After the assertion comes back with no problems, you get the token object and make sure that only the owner is calling this method. Only the owner should be able to allow other accounts to transfer their NFTs. You then get the next approval ID and insert the passed in account into the map with the next approval ID. If it's a new approval ID, storage must be paid. If it's not a new approval ID, no storage needs to be paid and only attaching 1 yoctoNEAR would be enough.

You then calculate how much storage is being used by adding that new account to the map and increment the tokens `next_approval_id` by 1. After inserting the token object back into the `tokensById` map, you refund any excess storage.

You'll notice that the function contains an optional `msg` parameter. This message is actually the foundation of all NFT marketplaces on NEAR.

#### Marketplace Integrations {#marketplace-integrations}

If a message was provided into the function, you're going to perform a cross contract call to the account being given access. This cross contract call will invoke the `nft_on_approve` function which will parse the message and act accordingly. Let's consider a general use case.

We have a marketplace that expects it's sale conditions to be passed in through the message field. Benji approves the marketplace with the `nft_approve` function and passes in a stringified JSON to the message which will outline sale conditions. These sale conditions could look something like the following:

```json
sale_conditions: {
    price: 5
}
```

By leaving the message field type as just a string, this generalizes the process and allows users to input sale conditions for many different marketplaces. It is up to the person approving to pass in an appropriate message that the marketplace can properly decode and use. This is usually done through the marketplace's frontend app which would know how to construct the `msg` in a useful way.

#### Internal functions

Now that the core logic for approving an account is finished, you need to implement the `assertAtLeastOneYocto` and `bytesForApprovedAccountId` functions. Move to the `nft-contract/src/internal.ts` file and copy the following function right below the `assertOneYocto` function.

```
//Assert that the user has attached at least 1 yoctoNEAR (for security reasons and to pay for storage)
export function assertAtLeastOneYocto() {
    assert(near.attachedDeposit().valueOf() >= BigInt(1), "Requires attached deposit of at least 1 yoctoNEAR");
}

```

Next, you'll need to copy the logic for calculating how many bytes it costs to store an account ID. Place this function at the very top of the page:

```
//calculate how many bytes the account ID is taking up
export function bytesForApprovedAccountId(accountId: string): number {
    // The extra 4 bytes are coming from Borsh serialization to store the length of the string.
    return accountId.length + 4 + 8;
}

```

Now that the logic for approving accounts is finished, you need to change the restrictions for transferring.

### Changing the restrictions for transferring NFTs

Currently, an NFT can **only** be transferred by its owner. You need to change that restriction so that people that have been approved can also transfer NFTs. In addition, you'll make it so that if an approval ID is passed, you can increase the security and check if both the account trying to transfer is in the approved list **and** they correspond to the correct approval ID. This is to address the problem we ran into earlier.

In the `internal.ts` file, you need to change the logic of the `internalTransfer` method as that's where the restrictions are being made. Change the internal transfer function to be the following:

```
//transfers the NFT to the receiver_id (internal method and can't be called directly via CLI).
export function internalTransfer(contract: Contract, senderId: string, receiverId: string, tokenId: string, approvalId: number, memo: string): Token {
    //get the token object by passing in the token_id
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token found");
    }

    //if the sender doesn't equal the owner, we check if the sender is in the approval list
    if (senderId != token.owner_id) {
        //if the token's approved account IDs doesn't contain the sender, we panic
        if (!token.approved_account_ids.hasOwnProperty(senderId)) {
            near.panic("Unauthorized");
        }

        // If they included an approval_id, check if the sender's actual approval_id is the same as the one included
        if (approvalId != null) {
            //get the actual approval ID
            let actualApprovalId = token.approved_account_ids[senderId];
            //if the sender isn't in the map, we panic
            if (actualApprovalId == null) {
                near.panic("Sender is not approved account");
            }

            //make sure that the actual approval ID is the same as the one provided
            assert(actualApprovalId == approvalId, `The actual approval_id ${actualApprovalId} is different from the given approval_id ${approvalId}`);
        }
    }

    //we make sure that the sender isn't sending the token to themselves
    assert(token.owner_id != receiverId, "The token owner and the receiver should be different")

    //we remove the token from it's current owner's set
    internalRemoveTokenFromOwner(contract, token.owner_id, tokenId);
    //we then add the token to the receiver_id's set
    internalAddTokenToOwner(contract, receiverId, tokenId);

    //we create a new token struct 
    let newToken = new Token ({
        ownerId: receiverId,
        //reset the approval account IDs
        approvedAccountIds: {},
        nextApprovalId: token.next_approval_id,
    });

    //insert that new token into the tokens_by_id, replacing the old entry 
    contract.tokensById.set(tokenId, newToken);

    //if there was some memo attached, we log it. 
    if (memo != null) {
        near.log(`Memo: ${memo}`);
    }

    //return the previous token object that was transferred.
    return token
}
```

This will check if the sender isn't the owner and then if they're not, it will check if the sender is in the approval list. If an approval ID was passed into the function, it will check if the sender's actual approval ID stored on the contract matches the one passed in.

#### Refunding storage on transfer

While you're in the internal file, you're going to need to add methods for refunding users who have paid for storing approved accounts on the contract when an NFT is transferred. This is because you'll be clearing the `approved_account_ids` object whenever NFTs are transferred and so the storage is no longer being used.

```
//refund the storage taken up by passed in approved account IDs and send the funds to the passed in account ID. 
export function refundApprovedAccountIdsIter(accountId: string, approvedAccountIds: string[]) {
    //get the storage total by going through and summing all the bytes for each approved account IDs
    let storageReleased = approvedAccountIds.map(e => bytesForApprovedAccountId(e)).reduce((partialSum, a) => partialSum + a, 0);
    let amountToTransfer = BigInt(storageReleased) * near.storageByteCost().valueOf();
    
    // Send the money to the beneficiary (TODO: don't use batch actions)
    const promise = near.promiseBatchCreate(accountId);
    near.promiseBatchActionTransfer(promise, amountToTransfer)
}

//refund a map of approved account IDs and send the funds to the passed in account ID
export function refundApprovedAccountIds(accountId: string, approvedAccountIds: { [key: string]: number }) {
    //call the refundApprovedAccountIdsIter with the approved account IDs as keys
    refundApprovedAccountIdsIter(accountId, Object.keys(approvedAccountIds));
}

```

These will be useful in the next section where you'll be changing the `nft_core` functions to include the new approval logic.

### Changes to `nft_core.ts`

Head over to the `nft-contract/src/nft_core.ts` file and the first change that you'll want to make is to add an `approval_id` to the `internalTransfer` function. This is so that anyone trying to transfer the token that isn't the owner must pass in an approval ID to address the problem seen earlier. If they are the owner, the approval ID won't be used as we saw in the `internalTransfer` function.


For the `nft_transfer` function, the only change that you'll need to make is to pass in the approval ID into the `internalTransfer` function and then refund the previous tokens approved account IDs after the transfer is finished

```
//implementation of the nft_transfer method. This transfers the NFT from the current owner to the receiver. 
export function internalNftTransfer({
    contract,
    receiverId,
    tokenId,
    approvalId,
    memo,
}:{
    contract: Contract, 
    receiverId: string, 
    tokenId: string, 
    approvalId: number
    memo: string
}) {
    //assert that the user attached exactly 1 yoctoNEAR. This is for security and so that the user will be redirected to the NEAR wallet. 
    assertOneYocto();
    //get the sender to transfer the token from the sender to the receiver
    let senderId = near.predecessorAccountId();

    //call the internal transfer method and get back the previous token so we can refund the approved account IDs
    let previousToken = internalTransfer(
        contract,
        senderId,
        receiverId,
        tokenId,
        approvalId,
        memo,
    );

    //we refund the owner for releasing the storage used up by the approved account IDs
    refundApprovedAccountIds(
        previousToken.owner_id,
        previousToken.approved_account_ids
    );
}

```

Next, you need to do the same to `nft_transfer_call` but instead of refunding immediately, you need to attach the previous token's approved account IDs to `nft_resolve_transfer` instead as there's still the possibility that the transfer gets reverted.

```
//implementation of the transfer call method. This will transfer the NFT and call a method on the receiver_id contract
export function internalNftTransferCall({
    contract,
    receiverId,
    tokenId,
    approvalId,
    memo,
    msg
}:{
    contract: Contract,
    receiverId: string, 
    tokenId: string, 
    approvalId: number,
    memo: string,
    msg: string  
}) {
    //assert that the user attached exactly 1 yocto for security reasons. 
    assertOneYocto();
    //get the sender to transfer the token from the sender to the receiver
    let senderId = near.predecessorAccountId();

    //call the internal transfer method and get back the previous token so we can refund the approved account IDs
    let previousToken = internalTransfer(
        contract,
        senderId,
        receiverId,
        tokenId,
        approvalId,
        memo,
    );

    // Initiating receiver's call and the callback
    const promise = near.promiseBatchCreate(receiverId);
    near.promiseBatchActionFunctionCall(
        promise, 
        "nft_on_transfer", 
        bytes(JSON.stringify({ 
            sender_id: senderId,
            previous_owner_id: previousToken.owner_id,
            token_id: tokenId,
            msg
        })), 
        0, // no deposit 
        GAS_FOR_NFT_ON_TRANSFER
    );

    // We then resolve the promise and call nft_resolve_transfer on our own contract
    near.promiseThen(
        promise, 
        near.currentAccountId(), 
        "nft_resolve_transfer", 
        bytes(JSON.stringify({
            owner_id: previousToken.owner_id,
            receiver_id: receiverId,
            token_id: tokenId,
            approved_account_ids: previousToken.approved_account_ids
        })), 
        0, // no deposit 
        GAS_FOR_RESOLVE_TRANSFER
    );
    return near.promiseReturn(promise);
}

```

You'll also need to add the tokens approved account IDs to the `JsonToken` being returned by `nft_token`.

```
//get the information for a specific token ID
export function internalNftToken({
    contract,
    tokenId
}:{ 
    contract: Contract, 
    tokenId: string 
}) {
    let token = contract.tokensById.get(tokenId) as Token;
    //if there wasn't a token ID in the tokens_by_id collection, we return None
    if (token == null) {
        return null;
    }

    //if there is some token ID in the tokens_by_id collection
    //we'll get the metadata for that token
    let metadata = contract.tokenMetadataById.get(tokenId) as TokenMetadata;
    
    //we return the JsonToken
    let jsonToken = new JsonToken({
        tokenId: tokenId,
        ownerId: token.owner_id,
        metadata,
        approvedAccountIds: token.approved_account_ids
    });
    return jsonToken;
}

```

Finally, you need to add the logic for refunding the approved account IDs in `internalResolveTransfer`. If the transfer went through, you should refund the owner for the storage being released by resetting the tokens `approved_account_ids` field. If, however, you should revert the transfer, it wouldn't be enough to just not refund anybody. Since the receiver briefly owned the token, they could have added their own approved account IDs and so you should refund them if they did so.

```
//resolves the cross contract call when calling nft_on_transfer in the nft_transfer_call method
//returns true if the token was successfully transferred to the receiver_id
export function internalResolveTransfer({
    contract,
    authorizedId,
    ownerId,
    receiverId,
    tokenId,
    approvedAccountIds,
    memo
}:{
    contract: Contract,
    authorizedId: string,
    ownerId: string,
    receiverId: string,
    tokenId: string,
    approvedAccountIds: { [key: string]: number },
    memo: string    
}) {
    assert(near.currentAccountId() === near.predecessorAccountId(), "Only the contract itself can call this method");
    // Whether receiver wants to return token back to the sender, based on `nft_on_transfer`
    // call result.
    let result = near.promiseResult(0);
    if (typeof result === 'string') {
        //As per the standard, the nft_on_transfer should return whether we should return the token to it's owner or not
        //if we need don't need to return the token, we simply return true meaning everything went fine
        if (result === 'false') {
            /* 
                since we've already transferred the token and nft_on_transfer returned false, we don't have to 
                revert the original transfer and thus we can just return true since nothing went wrong.
            */
            //we refund the owner for releasing the storage used up by the approved account IDs
            refundApprovedAccountIds(ownerId, approvedAccountIds);
            return true;
        }
    }

    //get the token object if there is some token object
    let token = contract.tokensById.get(tokenId) as Token;
    if (token != null) {
        if (token.owner_id != receiverId) {
            //we refund the owner for releasing the storage used up by the approved account IDs
            refundApprovedAccountIds(ownerId, approvedAccountIds);
            // The token is not owner by the receiver anymore. Can't return it.
            return true;
        }
    //if there isn't a token object, it was burned and so we return true
    } else {
        //we refund the owner for releasing the storage used up by the approved account IDs
        refundApprovedAccountIds(ownerId, approvedAccountIds);
        return true;
    }

    //we remove the token from the receiver
    internalRemoveTokenFromOwner(contract, receiverId, tokenId);
    //we add the token to the original owner
    internalAddTokenToOwner(contract, ownerId, tokenId);

    //we change the token struct's owner to be the original owner 
    token.owner_id = ownerId

    //we refund the receiver any approved account IDs that they may have set on the token
    refundApprovedAccountIds(receiverId, token.approved_account_ids);
    //reset the approved account IDs to what they were before the transfer
    token.approved_account_ids = approvedAccountIds;

    //we inset the token b  ack into the tokens_by_id collection
    contract.tokensById.set(tokenId, token);

    //return false
    return false
}
```

With that finished, it's time to move on and complete the next task.

## Check if an account is approved

Now that the core logic is in place for approving and refunding accounts, it should be smooth sailing from this point on. You now need to implement the logic for checking if an account has been approved. This should take an account and token ID as well as an optional approval ID. If no approval ID was provided, it should simply return whether or not the account is approved.

If an approval ID was provided, it should return whether or not the account is approved and has the same approval ID as the one provided. Let's move to the `nft-contract/src/approval.ts` file and add the necessary logic to the `internalNftIsApproved` function.

```
//check if the passed in account has access to approve the token ID
export function internalNftIsApproved({
    contract,
    tokenId,
    approvedAccountId,
    approvalId
}:{ 
    contract: Contract, 
    tokenId: string,
    approvedAccountId: string, 
    approvalId: number 
}) {
    //get the token object from the token_id
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token");
    }

    //get the approval number for the passed in account ID
    let approval = token.approved_account_ids[approvedAccountId];

    //if there was no approval ID found for the account ID, we simply return false
    if (approval == null) {
        return false
    }

    //if there was some approval ID found for the account ID
    //if there was no approval_id passed into the function, we simply return true
    if (approvalId == null) {
        return true
    }

    //if a specific approval_id was passed into the function
    //return if the approval ID passed in matches the actual approval ID for the account
    return approvalId == approval;
}

```

Let's now move on and add the logic for revoking an account

## Revoke an account

The next step in the tutorial is to allow a user to revoke a specific account from having access to their NFT. The first thing you'll want to do is assert one yocto for security purposes. You'll then need to make sure that the caller is the owner of the token. If those checks pass, you'll need to remove the passed in account from the tokens approved account IDs and refund the owner for the storage being released.

```
//revoke a specific account from transferring the token on your behalf
export function internalNftRevoke({
    contract,
    tokenId,
    accountId
}:{ 
    contract: Contract, 
    tokenId: string, 
    accountId: string 
}) {
    //assert that the user attached exactly 1 yoctoNEAR for security reasons
    assertOneYocto();

    //get the token object using the passed in token_id
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token");
    }

    //get the caller of the function and assert that they are the owner of the token
    let predecessorAccountId = near.predecessorAccountId();
    assert(predecessorAccountId == token.owner_id, "only token owner can revoke");
     
    //if the account ID was in the token's approval, we remove it
    if (token.approved_account_ids.hasOwnProperty(accountId)) {
        delete token.approved_account_ids[accountId];
        
        //refund the funds released by removing the approved_account_id to the caller of the function
        refundApprovedAccountIdsIter(predecessorAccountId, [accountId]);
        
        //insert the token back into the tokens_by_id collection with the account_id removed from the approval list
        contract.tokensById.set(tokenId, token);
    }
}

```

## Revoke all accounts

The final step in the tutorial is to allow a user to revoke all accounts from having access to their NFT. This should also assert one yocto for security purposes and make sure that the caller is the owner of the token. You then refund the owner for releasing all the accounts in the map and then clear the `approved_account_ids`.

```
//revoke all accounts from transferring the token on your behalf
export function internalNftRevokeAll({
    contract,
    tokenId
}:{ 
    contract: Contract, 
    tokenId: string 
}) {
    //assert that the caller attached exactly 1 yoctoNEAR for security
    assertOneYocto();

    //get the token object from the passed in token ID
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token");
    }

    //get the caller and make sure they are the owner of the tokens
    let predecessorAccountId = near.predecessorAccountId();
    assert(predecessorAccountId == token.owner_id, "only token owner can revoke");

    //only revoke if the approved account IDs for the token is not empty
    if (token.approved_account_ids && Object.keys(token.approved_account_ids).length === 0 && Object.getPrototypeOf(token.approved_account_ids) === Object.prototype) {
        //refund the approved account IDs to the caller of the function
        refundApprovedAccountIds(predecessorAccountId, token.approved_account_ids);
        //clear the approved account IDs
        token.approved_account_ids = {};
        //insert the token back into the tokens_by_id collection with the approved account IDs cleared
        contract.tokensById.set(tokenId, token);
    }
}
```

With that finished, it's time to deploy and start testing the contract.

## Testing the new changes {#testing-changes}

Since these changes affect all the other tokens and the state won't be able to automatically be inherited by the new code, simply redeploying the contract will lead to errors. For this reason, it's best practice to create a sub-account and deploy the contract there.

### Creating a sub-account {#creating-sub-account}

Run the following command to create a sub-account `approval` of your main account with an initial balance of 25 NEAR which will be transferred from the original to your new account.

```bash
near create-account approval.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Next, you'll want to export an environment variable for ease of development:

```bash
export APPROVAL_NFT_CONTRACT_ID=approval.$NFT_CONTRACT_ID
```

Using the build script, build the deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $APPROVAL_NFT_CONTRACT_ID
```

### Initialization and minting {#initialization-and-minting}

Since this is a new contract, you'll need to initialize and mint a token. Use the following command to initialize the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID init '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID init json-args '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $APPROVAL_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"approval-token"` and the receiver will be your new account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --amount 0.1
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
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
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
    },
    "approved_account_ids": {}
  }
]
```

Notice how the approved account IDs are now being returned from the function? This is a great sign! You're now ready to move on and approve an account to have access to your token.

### Approving an account {#approving-an-account}

At this point, you should have two accounts. One stored under `$NFT_CONTRACT_ID` and the other under the `$APPROVAL_NFT_CONTRACT_ID` environment variable. You can use both of these accounts to test things out. If you approve your old account, it should have the ability to transfer the NFT to itself.

Execute the following command to approve the account stored under `$NFT_CONTRACT_ID` to have access to transfer your NFT with an ID `"approval-token"`. You don't need to pass a message since the old account didn't implement the `nft_on_approve` function. In addition, you'll need to attach enough NEAR to cover the cost of storing the account on the contract. 0.1 NEAR should be more than enough and you'll be refunded any excess that is unused.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' --accountId $APPROVAL_NFT_CONTRACT_ID --deposit 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $APPROVAL_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

If you call the same enumeration method as before, you should see the new approved account ID being returned.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}'
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
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": { "goteam.examples.testnet": 0 }
  }
]
```

### Transferring an NFT as an approved account {#transferring-the-nft}

Now that you've approved another account to transfer the token, you can test that behavior. You should be able to use the other account to transfer the NFT to itself by which the approved account IDs should be reset. Let's test transferring the NFT with the wrong approval ID:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' --accountId $NFT_CONTRACT_ID --depositYocto 1
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
      " right: `1`: The actual approval_id 0 is different from the given approval_id 1', src/internal.ts:165:17"
  },
```

</p>
</details>

If you pass the correct approval ID which is `0`, everything should work fine.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' --accountId $NFT_CONTRACT_ID --depositYocto 1
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
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": {}
  }
]
```

Let's now test the approval ID incrementing across different owners. If you approve the sub-account that originally minted the token, the approval ID should be 1 now.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $APPROVAL_NFT_CONTRACT_ID nft_approve '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --deposit 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

Calling the view function again show now return an approval ID of 1 for the sub-account that was approved.
<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}'
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
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": { "approval.goteam.examples.testnet": 1 }
  }
]
```

</p>
</details>

With the testing finished, you've successfully implemented the approvals extension to the standard!

## Conclusion

Today you went through a lot of logic to implement the [approvals extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) so let's break down exactly what you did.

First, you explored the [basic approach](#allow-an-account-to-transfer-your-nft) of how to solve the problem. You then went through and discovered some of the [problems](/tutorials/nfts/js/approvals#the-problem) with that solution and learned how to [fix it](#the-solution).

After understanding what you should do to implement the approvals extension, you started to [modify](#expanding-the-token-and-jsontoken-structs) the JsonToken and Token structs in the contract. You then implemented the logic for [approving accounts](#approving-accounts) and saw how [marketplaces](#marketplace-integrations) are integrated.

After implementing the logic behind approving accounts, you went and [changed the restrictions](#changing-the-restrictions-for-transferring-nfts) needed to transfer NFTs. The last step you did to finalize the approving logic was to go back and edit the [nft_core](#changes-to-nft_corets) files to be compatible with the new changes.

At this point, everything was implemented in order to allow accounts to be approved and you extended the functionality of the [core standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) to allow for approved accounts to transfer tokens.

You implemented a view method to [check](#check-if-an-account-is-approved) if an account is approved and to finish the coding portion of the tutorial, you implemented the logic necessary to [revoke an account](#revoke-an-account) as well as [revoke all accounts](#revoke-all-accounts).

After this, the contract code was finished and it was time to move onto testing where you created a [subaccount](#creating-sub-account) and tested the [approving](/tutorials/nfts/js/approvals#approving-an-account) and [transferring](#transferring-the-nft) for your NFTs.

In the next tutorial, you'll learn about the royalty standards and how you can interact with NFT marketplaces.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Approval standard: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), version `1.0.0`

:::
