---
id: royalty
title: Royalty
sidebar_label: Royalty
---



In this tutorial you'll continue building your non-fungible token (NFT) smart contract, and learn how to implement perpetual royalties into your NFTs. This will allow people to get a percentage of the purchase price when an NFT is sold.



## Introduction

By now, you should have a fully fledged NFT contract, except for the royalties support.
To get started, either switch to the `5.approval` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial-js/), or continue your work from the previous tutorials.

```bash
git checkout 5.approval
```

:::tip
If you wish to see the finished code for this _Royalty_ tutorial, you can find it on the `6.royalty` branch.
:::

## Thinking about the problem

In order to implement the functionality, you first need to understand how NFTs are sold. In the previous tutorial, you saw how someone with an NFT could list it on a marketplace using the `nft_approve` function by passing in a message that could be properly decoded. When a user purchases your NFT on the marketplace, what happens?

Using the knowledge you have now, a reasonable conclusion would be to say that the marketplace transfers the NFT to the buyer by performing a cross-contract call and invokes the NFT contract's `nft_transfer` method. Once that function finishes, the marketplace would pay the seller for the correct amount that the buyer paid.

Let's now think about how this can be expanded to allow for a cut of the pay going to other accounts that aren't just the seller.

### Expanding the current solution

Since perpetual royalties will be on a per-token basis, it's safe to assume that you should be changing the `Token` and `JsonToken` structs. You need some way of keeping track of what percentage each account with a royalty should have. If you introduce a map of an account to an integer, that should do the trick.

Now, you need some way to relay that information to the marketplace. This method should be able to transfer the NFT exactly like the old solution but with the added benefit of telling the marketplace exactly what accounts should be paid what amounts. If you implement a method that transfers the NFT and then calculates exactly what accounts get paid and to what amount based on a passed-in balance, that should work nicely.

This is what the [royalty standards](https://nomicon.io/Standards/NonFungibleToken/Payout) outlined. Let's now move on and modify our smart contract to introduce this behavior.

## Modifications to the contract

The first thing you'll want to do is add the royalty information to the structs. Open the `nft-contract/src/metadata.ts` file and add `royalty` to the `Token` and `JsonToken` structs:

```js
royalty: { [accountId: string]: number };
```

Second, you'll want to add `royalty` to the `JsonToken` struct as well:

```
export class Token {
    owner_id: string;
    approved_account_ids: { [accountId: string]: number };
    next_approval_id: number;
    royalty: { [accountId: string]: number };

    constructor({ 
        ownerId, 
        approvedAccountIds, 
        nextApprovalId, 
        royalty 
    }:{ 
        ownerId: string, 
        approvedAccountIds: { [accountId: string]: number }, 
        nextApprovalId: number, 
        royalty: { [accountId: string]: number } 
    }) {
        //owner of the token
        this.owner_id = ownerId,
        //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
        this.approved_account_ids = approvedAccountIds,
        //the next approval ID to give out. 
        this.next_approval_id = nextApprovalId,
        //keep track of the royalty percentages for the token in a hash map
        this.royalty = royalty
    }
}

//The Json token is what will be returned from view calls. 
export class JsonToken {
    token_id: string;
    owner_id: string;
    metadata: TokenMetadata;
    approved_account_ids: { [accountId: string]: number };
    royalty: { [accountId: string]: number };

    constructor({ 
        tokenId, 
        ownerId, 
        metadata, 
        approvedAccountIds, 
        royalty 
    }:{
        tokenId: string,
        ownerId: string,
        metadata: TokenMetadata,
        approvedAccountIds: { [accountId: string]: number },
        royalty: { [accountId: string]: number }
    }) {
        //token ID
        this.token_id = tokenId,
        //owner of the token
        this.owner_id = ownerId,
        //token metadata
        this.metadata = metadata,
        //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
        this.approved_account_ids = approvedAccountIds,
        //keep track of the royalty percentages for the token in a hash map
        this.royalty = royalty
    }
}

```

### Internal helper function

**royaltyToPayout**

To simplify the payout calculation, let's add a helper `royaltyToPayout` function to `src/internal.ts`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

```
//convert the royalty percentage and amount to pay into a payout (U128)
export function royaltyToPayout(royaltyPercentage: number, amountToPay: bigint): string {
    return (BigInt(royaltyPercentage) * BigInt(amountToPay) / BigInt(10000)).toString();
}

```

If you were to use the `royaltyToPayout` function and pass in `2000` as the `royaltyPercentage` and an `amountToPay` of 1 NEAR, it would return a value of 0.2 NEAR.

### Royalties

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.ts` file, and modify the `internalNftPayout` function as shown.

```
//calculates the payout for a token given the passed in balance. This is a view method
export function internalNftPayout({
    contract,
    tokenId,
    balance,
    maxLenPayout
}:{
    contract: Contract, 
    tokenId: string,
    balance: bigint, 
    maxLenPayout: number,
}): { payout: {[key: string]: string }} {
    //get the token object
    let token = contract.tokensById.get(tokenId) as Token;
    if (token == null) {
        near.panic("no token");
    }

    //get the owner of the token
    let ownerId = token.owner_id;
    //keep track of the total perpetual royalties
    let totalPerpetual = 0;
    //keep track of the payout object to send back
    let payoutObj: { [key: string]: string } = {};
    //get the royalty object from token
    let royalty = token.royalty;

    //make sure we're not paying out to too many people (GAS limits this)
    assert(Object.keys(royalty).length <= maxLenPayout, "Market cannot payout to that many receivers");
    
    //go through each key and value in the royalty object
    Object.entries(royalty).forEach(([key, value], index) => {
        //only insert into the payout if the key isn't the token owner (we add their payout at the end)
        if (key != ownerId) {
            payoutObj[key] = royaltyToPayout(value, balance);
            totalPerpetual += value;
        }
    });

    // payout to previous owner who gets 100% - total perpetual royalties
    payoutObj[ownerId] = royaltyToPayout(10000 - totalPerpetual, balance);

    //return the payout object
    return {
        payout: payoutObj
    }
}

```

This function will loop through the token's royalty map and take the balance and convert that to a payout using the `royaltyToPayout` function you created earlier. It will give the owner of the token whatever is left from the total royalties. As an example:

You have a token with the following royalty field:

```js
Token {
    owner_id: "damian",
    royalty: {
        "benji": 1000,
        "josh": 500,
        "mike": 2000
    }
}
```

If a user were to call `nft_payout` on the token and pass in a balance of 1 NEAR, it would loop through the token's royalty field and insert the following into the payout object:

```js
Payout {
    payout: {
        "benji": 0.1 NEAR,
        "josh": 0.05 NEAR,
        "mike": 0.2 NEAR
    }
}
```

At the very end, it will insert `damian` into the payout object and give him `1 NEAR - 0.1 - 0.05 - 0.2 = 0.65 NEAR`.

**nft_transfer_payout**

Now that you know how payouts are calculated, it's time to create the function that will transfer the NFT and return the payout to the marketplace.

```
//transfers the token to the receiver ID and returns the payout object that should be payed given the passed in balance. 
export function internalNftTransferPayout({
    contract,
    receiverId,
    tokenId,
    approvalId,
    memo,
    balance,
    maxLenPayout
}:{
    contract: Contract, 
    receiverId: string, 
    tokenId: string,
    approvalId: number,
    memo: string,
    balance: bigint,
    maxLenPayout: number,
}): { payout: {[key: string]: string }} {
    //assert that the user attached 1 yocto NEAR for security reasons
    assertOneYocto();
    //get the sender ID
    let senderId = near.predecessorAccountId();
    //transfer the token to the passed in receiver and get the previous token object back
    let previousToken: Token = internalTransfer(
        contract,
        senderId,
        receiverId,
        tokenId,
        approvalId,
        memo,
    );

    //refund the previous token owner for the storage used up by the previous approved account IDs
    refundApprovedAccountIds(
        previousToken.owner_id,
        previousToken.approved_account_ids,
    );

    //get the owner of the token
    let ownerId = previousToken.owner_id;
    //keep track of the total perpetual royalties
    let totalPerpetual = 0;
    //keep track of the payout object to send back
    let payoutObj: { [key: string]: string } = {};
    //get the royalty object from token
    let royalty = previousToken.royalty;

    //make sure we're not paying out to too many people (GAS limits this)
    assert(Object.keys(royalty).length <= maxLenPayout, "Market cannot payout to that many receivers");
    
    //go through each key and value in the royalty object
    Object.entries(royalty).forEach(([key, value], index) => {
        //only insert into the payout if the key isn't the token owner (we add their payout at the end)
        if (key != ownerId) {
            payoutObj[key] = royaltyToPayout(value, balance);
            totalPerpetual += value;
        }
    });

    // payout to previous owner who gets 100% - total perpetual royalties
    payoutObj[ownerId] = royaltyToPayout(10000 - totalPerpetual, balance);

    //return the payout object
    return {
        payout: payoutObj
    }
}
```

### Perpetual royalties

To add support for perpetual royalties, let's edit the `src/mint.ts` file. First, add an optional parameter for perpetual royalties. This is what will determine what percentage goes to which accounts when the NFT is purchased. You will also need to create and insert the royalty to be put in the `Token` object:

```
export function internalMint({
    contract,
    tokenId,
    metadata,
    receiverId,
    perpetualRoyalties
}:{ 
    contract: Contract, 
    tokenId: string, 
    metadata: TokenMetadata, 
    receiverId: string 
    perpetualRoyalties: {[key: string]: number}
}): void {
    //measure the initial storage being used on the contract TODO
    let initialStorageUsage = near.storageUsage();

    // create a royalty map to store in the token
    let royalty: { [accountId: string]: number } = {}

    // if perpetual royalties were passed into the function: TODO: add isUndefined fn
    if (perpetualRoyalties != null) {
        //make sure that the length of the perpetual royalties is below 7 since we won't have enough GAS to pay out that many people
        assert(Object.keys(perpetualRoyalties).length < 7, "Cannot add more than 6 perpetual royalty amounts");
        
        //iterate through the perpetual royalties and insert the account and amount in the royalty map
        Object.entries(perpetualRoyalties).forEach(([account, amount], index) => {
            royalty[account] = amount;
        });
    }

    //specify the token struct that contains the owner ID 
    let token = new Token ({
        //set the owner ID equal to the receiver ID passed into the function
        ownerId: receiverId,
        //we set the approved account IDs to the default value (an empty map)
        approvedAccountIds: {},
        //the next approval ID is set to 0
        nextApprovalId: 0,
        //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
        royalty,
    });

    //insert the token ID and token struct and make sure that the token doesn't exist
    assert(!contract.tokensById.containsKey(tokenId), "Token already exists");
    contract.tokensById.set(tokenId, token)

    //insert the token ID and metadata
    contract.tokenMetadataById.set(tokenId, metadata);

    //call the internal method for adding the token to the owner
    internalAddTokenToOwner(contract, token.owner_id, tokenId)

    //calculate the required storage which was the used - initial TODO
    let requiredStorageInBytes = near.storageUsage().valueOf() - initialStorageUsage.valueOf();

    //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
    refundDeposit(requiredStorageInBytes);
}
```

### Adding royalty object to struct implementations

Since you've added a new field to your `Token` and `JsonToken` structs, you need to edit your implementations accordingly. Move to the `nft-contract/src/internal.ts` file and edit the part of your `internalTransfer` function that creates the new `Token` object:

```
    //we create a new token struct 
    let newToken = new Token ({
        ownerId: receiverId,
        //reset the approval account IDs
        approvedAccountIds: {},
        nextApprovalId: token.next_approval_id,
        //we copy over the royalties from the previous token
        royalty: token.royalty,
    });

```

Once that's finished, move to the `nft-contract/src/nft_core.ts` file. You need to edit your implementation of `internalNftToken` so that the `JsonToken` sends back the new royalty information.

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
        approvedAccountIds: token.approved_account_ids,
        royalty: token.royalty
    });
    return jsonToken;
}

```

Next, you can use the CLI to query the new `nft_payout` function and validate that it works correctly.

## Deploying the contract {#redeploying-contract}

As you saw in the previous tutorial, adding changes like these will cause problems when redeploying. Since these changes affect all the other tokens and the state won't be able to automatically be inherited by the new code, simply redeploying the contract will lead to errors. For this reason, you'll create a new sub-account again.

### Creating a sub-account

Run the following command to create a sub-account `royalty` of your main account with an initial balance of 25 NEAR which will be transferred from the original to your new account.

```bash
near create-account royalty.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Next, you'll want to export an environment variable for ease of development:

```bash
export ROYALTY_NFT_CONTRACT_ID=royalty.$NFT_CONTRACT_ID
```

Using the build script, build the deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $ROYALTY_NFT_CONTRACT_ID
```

### Initialization and minting {#initialization-and-minting}

Since this is a new contract, you'll need to initialize and mint a token. Use the following command to initialize the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $ROYALTY_NFT_CONTRACT_ID init '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' --accountId $ROYALTY_NFT_CONTRACT_ID
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $ROYALTY_NFT_CONTRACT_ID init json-args '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $ROYALTY_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"royalty-token"` and the receiver will be your new account. In addition, you're passing in a map with two accounts that will get perpetual royalties whenever your token is sold.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $ROYALTY_NFT_CONTRACT_ID nft_mint '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' --accountId $ROYALTY_NFT_CONTRACT_ID --amount 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $ROYALTY_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $ROYALTY_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

You can check to see if everything went through properly by calling one of the enumeration functions:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-read-only $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
    ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "royalty.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"
    },
    "approved_account_ids": {},
    "royalty": {
      "josh.testnet": 500,
      "benjiman.testnet": 2000,
      "mike.testnet": 1000
    }
  }
]
```

Notice how there's now a royalty field that contains the 3 accounts that will get a combined 35% of all sales of this NFT? Looks like it works! Go team :)

### NFT payout

Let's calculate the payout for the `"approval-token"` NFT, given a balance of 100 yoctoNEAR. It's important to note that the balance being passed into the `nft_payout` function is expected to be in yoctoNEAR.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $ROYALTY_NFT_CONTRACT_ID nft_payout '{"token_id": "approval-token", "balance": "100", "max_len_payout": 100}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-read-only $ROYALTY_NFT_CONTRACT_ID nft_payout json-args '{"token_id": "approval-token", "balance": "100", "max_len_payout": 100}' network-config testnet now
    ```
  </TabItem>
</Tabs>

This command should return an output similar to the following:

```bash
{
  payout: {
    'josh.testnet': '5',
    'royalty.goteam.examples.testnet': '65',
    'mike.testnet': '10',
    'benjiman.testnet': '20'
  }
}
```

If the NFT was sold for 100 yoctoNEAR, josh would get 5, benji would get 20, mike would get 10, and the owner, in this case `royalty.goteam.examples.testnet` would get the rest: 65.

## Conclusion

At this point you have everything you need for a fully functioning NFT contract to interact with marketplaces.
The last remaining standard that you could implement is the events standard. This allows indexers to know what functions are being called and makes it easier and more reliable to keep track of information that can be used to populate the collectibles tab in the wallet for example.

:::info remember
If you want to see the finished code from this tutorial, you can checkout the `6.royalty` branch.
:::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Royalties standard: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), version `2.0.0`

:::
