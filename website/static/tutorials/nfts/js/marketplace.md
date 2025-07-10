---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---

In this tutorial, you'll learn the basics of an NFT marketplace contract where you can buy and sell non-fungible tokens for $NEAR. In the previous tutorials, you went through and created a fully fledged NFT contract that incorporates all the standards found in the [NFT standard](https://nomicon.io/Standards/NonFungibleToken).



## Introduction

Throughout this tutorial, you'll learn how a marketplace contract could work on NEAR. This is meant to be an example and there is no canonical implementation. Feel free to branch off and modify this contract to meet your specific needs.

Using the same repository as the previous tutorials, if you checkout the `8.marketplace` branch, you should have the necessary files to complete the tutorial.

```bash
git checkout 8.marketplace
```

## File structure {#file-structure}

```
market-contract
└── src
    ├── internal.ts
    ├── index.ts
    ├── nft_callbacks.ts
    ├── sale.ts
    └── sale_views.ts
```

Usually, when doing work on multiple smart contracts that all pertain to the same repository, it's a good idea to structure them in their own folders as done in this tutorial. To make your work easier when building the smart contracts, we've also modified the repository's `package.json` file so that building both smart contracts can be easily done by running the following command.

```bash
yarn build
```
This will install the dependencies for both contracts and compile them to `wasm` files that are stored in the following directory.

```
nft-tutorial-js
└── build
    ├── nft.wasm
    └── market.wasm
```

## Understanding the contract

At first, the contract can be quite overwhelming but if you strip away all the fluff and dig into the core functionalities, it's actually quite simple. This contract was designed for only one thing - to allow people to buy and sell NFTs for NEAR. This includes the support for paying royalties, updating the price of your sales, removing sales and paying for storage.

Let's go through the files and take note of some of the important functions and what they do.

## index.ts {#index-ts}

This file outlines what information is stored on the contract as well as some other crucial functions that you'll learn about below.

### Constructor logic {#constructor-logic}

The first function you'll look at is the constructor function. This takes an `owner_id` as the only parameter and will default all the storage collections to their default values.

```
    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id. 
    */
    constructor({ owner_id }: { owner_id: string }) {
        super()
        this.ownerId = owner_id;
        this.sales = new UnorderedMap("sales");
        this.byOwnerId = new LookupMap("byOwnerId");
        this.byNftContractId = new LookupMap("byNftContractId");
        this.storageDeposits = new LookupMap("storageDeposits");
    }

```

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
- To avoid having to call `storage_deposit` everytime he wants to list an NFT, he calls it once. Since Dorian is a baller, he attaches 10 NEAR which is enough to cover 1000 sales. He now has an excess of 9 NEAR or 900 sales.
- Dorian needs the 9 NEAR for something else but doesn't want to take down his 100 listings. Since he has an excess of 9 NEAR, he can easily withdraw and still have his 100 listings. After calling `storage_withdraw` and being transferred 9 NEAR, he will have an excess of 0 sales.

With this behavior in mind, the following two functions outline the logic.

```
    /*
        STORAGE
    */
    @call
    //Allows users to deposit storage. This is to cover the cost of storing sale objects on the contract
    //Optional account ID is to users can pay for storage for other people.
    storage_deposit({ account_id }: { account_id?: string }) {
        //get the account ID to pay for storage for
        let storageAccountId = account_id || near.predecessorAccountId();

        //get the deposit value which is how much the user wants to add to their storage
        let deposit = near.attachedDeposit().valueOf();

        //make sure the deposit is greater than or equal to the minimum storage for a sale
        assert(deposit >= STORAGE_PER_SALE, `Requires minimum deposit of ${STORAGE_PER_SALE}`);

        //get the balance of the account (if the account isn't in the map we default to a balance of 0)
        let balance: string = this.storageDeposits.get(storageAccountId) as string || "0";
        //add the deposit to their balance
        let newBalance = BigInt(balance) + deposit;
        //insert the balance back into the map for that account ID
        this.storageDeposits.set(storageAccountId, newBalance.toString());
    }

    @call
    //Allows users to withdraw any excess storage that they're not using. Say Bob pays 0.01N for 1 sale
    //Alice then buys Bob's token. This means bob has paid 0.01N for a sale that's no longer on the marketplace
    //Bob could then withdraw this 0.01N back into his account. 
    storage_withdraw() {
        //make sure the user attaches exactly 1 yoctoNEAR for security purposes.
        //this will redirect them to the NEAR wallet (or requires a full access key). 
        assertOneYocto();

        //the account to withdraw storage to is always the function caller
        let ownerId = near.predecessorAccountId();
        //get the amount that the user has by removing them from the map. If they're not in the map, default to 0
        let amount: string = this.storageDeposits.remove(ownerId) as string || "0";
        
        //how many sales is that user taking up currently. This returns a set
        let sales = restoreOwners(this.byOwnerId.get(ownerId));
        //get the length of that set. 
        let len = 0;
        if (sales != null) {
            len = sales.len();
        }   
        
        //how much NEAR is being used up for all the current sales on the account 
        let diff = BigInt(len) * STORAGE_PER_SALE;
        //the excess to withdraw is the total storage paid - storage being used up.
        let amountLeft = BigInt(amount) - diff;

        //if that excess to withdraw is > 0, we transfer the amount to the user.
        if (amountLeft > 0) {
            const promise = near.promiseBatchCreate(ownerId);
            near.promiseBatchActionTransfer(promise, amountLeft)
        }

        //we need to add back the storage being used up into the map if it's greater than 0.
        //this is so that if the user had 500 sales on the market, we insert that value here so
        //if those sales get taken down, the user can then go and withdraw 500 sales worth of storage.
        if (diff > 0) {
            this.storageDeposits.set(ownerId, diff.toString());
        }
    }

```

In this contract, the storage required for each sale is 0.01 NEAR but you can query that information using the `storage_minimum_balance` function. In addition, if you wanted to check how much storage a given account has paid, you can query the `storage_balance_of` function.

With that out of the way, it's time to move onto the `nft_callbacks.ts` file where you'll look at how NFTs are put for sale.

## nft_callbacks.ts {#nft_callbacks-ts}

This file is responsible for the logic used to put NFTs for sale. If you remember from the [marketplaces section](/tutorials/nfts/js/approvals#marketplace-integrations) of the approvals tutorial, when users call `nft_approve` and pass in a message, it will perform a cross-contract call to the `receiver_id`'s contract and call the method `nft_on_approve`. This `nft_callbacks.ts` file will implement that function.

### Listing logic {#listing-logic}

The market contract is expecting the message that the user passes into `nft_approve` on the NFT contract to be JSON stringified sale arguments. This outlines the sale price in yoctoNEAR for the NFT that is listed.

The `nft_on_approve` function is called via a cross-contract call by the NFT contract. It will make sure that the signer has enough storage to cover adding another sale. It will then attempt to get the sale conditions from the message and create the listing.

```
/// where we add the sale because we know nft owner can only call nft_approve
export function internalNftOnApprove({
    contract,
    tokenId,
    ownerId,
    approvalId,
    msg
}:{ 
    contract: Contract, 
    tokenId: string, 
    ownerId: string, 
    approvalId: number, 
    msg: string 
}) {
    // get the contract ID which is the predecessor
    let contractId = near.predecessorAccountId();
    //get the signer which is the person who initiated the transaction
    let signerId = near.signerAccountId();
    
    //make sure that the signer isn't the predecessor. This is so that we're sure
    //this was called via a cross-contract call
    assert(signerId != contractId, "this function can only be called via a cross-contract call");
    //make sure the owner ID is the signer. 
    assert(ownerId == signerId, "only the owner of the token can approve it");
    
    //we need to enforce that the user has enough storage for 1 EXTRA sale.  
    let storageAmount = contract.storage_minimum_balance();
    //get the total storage paid by the owner
    let ownerPaidStorage = contract.storageDeposits.get(signerId) || BigInt(0);
    //get the storage required which is simply the storage for the number of sales they have + 1 
    let signerStorageRequired = (BigInt(internalSupplyByOwnerId({contract, accountId: signerId})) + BigInt(1)) * BigInt(storageAmount); 
    
    //make sure that the total paid is >= the required storage
    assert(ownerPaidStorage >= signerStorageRequired, "the owner does not have enough storage to approve this token");
    
    //if all these checks pass we can create the sale conditions object.
    let saleConditions = JSON.parse(msg);
    if (!saleConditions.hasOwnProperty('sale_conditions') || Object.keys(saleConditions).length != 1) {
        near.panic("invalid sale conditions");
    }
    //create the unique sale ID which is the contract + DELIMITER + token ID
    let contractAndTokenId = `${contractId}${DELIMETER}${tokenId}`;
    
    //insert the key value pair into the sales map. Key is the unique ID. value is the sale object
    contract.sales.set(contractAndTokenId, new Sale({
        ownerId: ownerId, //owner of the sale / token
        approvalId: approvalId, //approval ID for that token that was given to the market
        nftContractId: contractId, //NFT contract the token was minted on
        tokenId: tokenId, //the actual token ID
        saleConditions: saleConditions.sale_conditions //the sale conditions 
    }));

    //Extra functionality that populates collections necessary for the view calls 
    //get the sales by owner ID for the given owner. If there are none, we create a new empty set
    let byOwnerId = contract.byOwnerId.get(ownerId) as UnorderedSet || new UnorderedSet(ownerId);
    //insert the unique sale ID into the set
    byOwnerId.set(contractAndTokenId);
    //insert that set back into the collection for the owner
    contract.byOwnerId.set(ownerId, byOwnerId);
    
    //get the token IDs for the given nft contract ID. If there are none, we create a new empty set
    let byNftContractId = contract.byNftContractId.get(contractId) as UnorderedSet || new UnorderedSet(contractId);
    //insert the token ID into the set
    byNftContractId.set(tokenId);
    //insert the set back into the collection for the given nft contract ID
    contract.byNftContractId.set(contractId, byNftContractId);

}
```

## sale.ts {#sale-ts}

Now that you're familiar with the process of both adding storage and listing NFTs on the marketplace, let's go through what you can do once a sale has been listed. The `sale.ts` file outlines the functions for updating the price, removing, and purchasing NFTs.

### Sale object {#sale-object}

It's important to understand what information the contract is storing for each sale object. Since the marketplace has many NFTs listed that come from different NFT contracts, simply storing the token ID would not be enough to distinguish between different NFTs. This is why you need to keep track of both the token ID and the contract by which the NFT came from. In addition, for each listing, the contract must keep track of the approval ID it was given to transfer the NFT. Finally, the owner and sale conditions are needed.

```
//struct that holds important information about each sale on the market
export class Sale {
    //owner of the sale
    owner_id: string;
    //market contract's approval ID to transfer the token on behalf of the owner
    approval_id: number;
    //nft contract where the token was minted
    nft_contract_id: string;
    //actual token ID for sale
    token_id: String;
    //sale price in yoctoNEAR that the token is listed for
    sale_conditions: string;
    
    constructor(
        {
            ownerId,
            approvalId,
            nftContractId,
            tokenId,
            saleConditions,
        }:{ 
            ownerId: string,
            approvalId: number,
            nftContractId: string,
            tokenId: String,
            saleConditions: string,
        }) {
        this.owner_id = ownerId;
        this.approval_id = approvalId;
        this.nft_contract_id = nftContractId;
        this.token_id = tokenId;
        this.sale_conditions = saleConditions;
    }
}

```

### Removing sales {#removing-sales}

In order to remove a listing, the owner must call the `remove_sale` function and pass the NFT contract and token ID. Behind the scenes, this calls the `internallyRemoveSale` function which you can find in the `internal.ts` file. This will assert one yoctoNEAR for security reasons.

```
//removes a sale from the market. 
export function internalRemoveSale({
    contract,
    nftContractId,
    tokenId
}:{ 
    contract: Contract, 
    nftContractId: string, 
    tokenId: string 
}) {
    //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
    assertOneYocto();
    
    //get the sale object as the return value from removing the sale internally
    let sale = internallyRemoveSale(contract, nftContractId, tokenId);

    //get the predecessor of the call and make sure they're the owner of the sale
    let ownerId = near.predecessorAccountId();

    //assert that the owner of the sale is the same as the caller of the function
    assert(ownerId == sale.owner_id, "only the owner of the sale can remove it");
}

```

### Updating price {#updating-price}

In order to update the list price of a token, the owner must call the `update_price` function and pass in the contract, token ID, and desired price. This will get the sale object, change the sale conditions, and insert it back. For security reasons, this function will assert one yoctoNEAR.

```
//updates the price for a sale on the market
export function internalUpdatePrice({
    contract,
    nftContractId,
    tokenId,
    price
}:{ 
    contract: Contract, 
    nftContractId: string, 
    tokenId: string, 
    price: string 
}) {
    //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
    assertOneYocto();

    //create the unique sale ID from the nft contract and token
    let contractAndTokenId = `${nftContractId}${DELIMETER}${tokenId}`;

    //get the sale object from the unique sale ID. If there is no token, panic. 
    let sale = contract.sales.get(contractAndTokenId) as Sale;
    if (sale == null) {
        near.panic("no sale");
    }

    assert(near.predecessorAccountId() == sale.owner_id, "only the owner of the sale can update it");
    //set the sale conditions equal to the passed in price
    sale.sale_conditions = price; 
    //insert the sale back into the map for the unique sale ID
    contract.sales.set(contractAndTokenId, sale);
}

```

### Purchasing NFTs {#purchasing-nfts}

For purchasing NFTs, you must call the `offer` function. It takes an `nft_contract_id` and `token_id` as parameters. You must attach the correct amount of NEAR to the call in order to purchase. Behind the scenes, this will make sure your deposit is greater than the list price and call a private method `processPurchase` which will perform a cross-contract call to the NFT contract to invoke the `nft_transfer_payout` function. This will transfer the NFT using the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) standard that you learned about and it will return the `Payout` object which includes royalties.

The marketplace will then call `resolve_purchase` where it will check for malicious payout objects and then if everything went well, it will pay the correct accounts.

```
//place an offer on a specific sale. The sale will go through as long as your deposit is greater than or equal to the list price
export function internalOffer({
    contract,
    nftContractId,
    tokenId
}:{
    contract: Contract, 
    nftContractId: string, 
    tokenId: string
}) {
    //get the attached deposit and make sure it's greater than 0
    let deposit = near.attachedDeposit().valueOf();
    assert(deposit > 0, "deposit must be greater than 0");
 
    //get the unique sale ID (contract + DELIMITER + token ID)
    let contractAndTokenId = `${nftContractId}${DELIMETER}${tokenId}`;
    //get the sale object from the unique sale ID. If the sale doesn't exist, panic.
    let sale = contract.sales.get(contractAndTokenId) as Sale;
    if (sale == null) {
        near.panic("no sale");
    }

    //get the buyer ID which is the person who called the function and make sure they're not the owner of the sale
    let buyerId = near.predecessorAccountId();
    assert(buyerId != sale.owner_id, "you can't offer on your own sale");

    //get the u128 price of the token (dot 0 converts from U128 to u128)
    let price = BigInt(sale.sale_conditions);
    //make sure the deposit is greater than the price
    assert(deposit >= price, "deposit must be greater than or equal to price");
    
    //process the purchase (which will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties) 
    processPurchase({contract, nftContractId, tokenId, price: deposit.toString(), buyerId});
}

```

## sale_view.ts {#sale_view-ts}

The final file we'll go through is the `sale_view.ts` file. This is where some of the enumeration methods are outlined. It allows users to query for important information regarding sales.

### Total supply {#total-supply}

To query for the total supply of NFTs listed on the marketplace, you can call the `get_supply_sales` function. An example can be seen below.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_sales
```

### Total supply by owner {#total-supply-by-owner}

To query for the total supply of NFTs listed by a specific owner on the marketplace, you can call the `get_supply_by_owner_id` function. An example can be seen below.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id '{"account_id": "benji.testnet"}'
```

### Total supply by contract {#total-supply-by-contract}

To query for the total supply of NFTs that belong to a specific contract, you can call the `get_supply_by_nft_contract_id` function. An example can be seen below.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet"}'
```

### Query for listing information {#query-listing-information}

To query for important information for a specific listing, you can call the `get_sale` function. This requires that you pass in the `nft_contract_token`. This is essentially the unique identifier for sales on the market contract as explained earlier. It consists of the NFT contract followed by a `DELIMITER` followed by the token ID. In this contract, the `DELIMITER` is simply a period: `.`.  An example of this query can be seen below.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sale '{"nft_contract_token": "fayyr-nft.testnet.token-42"}'
```

In addition, you can query for paginated information about the listings for a given owner by calling the `get_sales_by_owner_id` function.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id '{"account_id": "benji.testnet", "from_index": "5", "limit": 10}'
```

Finally, you can query for paginated information about the listings that originate from a given NFT contract by calling the `get_sales_by_nft_contract_id` function.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet, "from_index": "5", "limit": 10}'
```

## Conclusion

In this tutorial, you learned about the basics of a marketplace contract and how it works. You went through the [index.ts](#index-ts) file and learned about the initialization function in addition to the [storage management](#storage-management-model) model.

You then went through the [nft_callbacks](#nft_callbacks-ts) file to understand how to [list NFTs](#listing-logic). In addition, you went through some important functions needed for after you've listed an NFT. This includes [removing sales](#removing-sales), [updating the price](#updating-price), and [purchasing NFTs](#purchasing-nfts).

Finally, you went through the enumeration methods found in the [`sale_view`](#sale_view-ts) file. These allow you to query for important information found on the marketplace contract.

You should now have a solid understanding of NFTs and marketplaces on NEAR. Feel free to branch off and expand on these contracts to create whatever cool applications you'd like. The world is your oyster! Thanks for joining on this journey and don't forget, **Go Team!**

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
