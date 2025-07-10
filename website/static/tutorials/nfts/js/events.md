---
id: events
title: Events
sidebar_label: Events
---



In this tutorial, you'll learn about the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and how to implement it in your smart contract.



## Introduction

To get started, either switch to the `6.royalty` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.

```bash
git checkout 6.royalty
```

:::tip
If you wish to see the finished code for this _Events_ tutorial, you can find it on the `7.events` branch.
:::

## Understanding the use case {#understanding-the-use-case}

Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles)? Originally, an indexer used to listen for any functions calls starting with `nft_` on your account. These contracts were then flagged on your account as likely NFT contracts. 

When you navigated to your collectibles tab, the wallet would then query all those contracts for the list of NFTs you owned using the `nft_tokens_for_owner` function you saw in the [enumeration tutorial](/tutorials/nfts/js/enumeration).

### The problem {#the-problem}

This method of flagging contracts was not reliable as each NFT-driven application might have its own way of minting or transferring NFTs. In addition, it's common for apps to transfer or mint many tokens at a time using batch functions. 

### The solution {#the-solution}

A standard was introduced so that smart contracts could emit an event anytime NFTs were transferred, minted, or burnt. This event was in the form of a log. No matter how a contract implemented the functionality, an indexer could now listen for those standardized logs.

As per the standard, you need to implement a logging functionality that gets fired when NFTs are transferred or minted. In this case, the contract doesn't support burning so you don't need to worry about that for now.

It's important to note the standard dictates that the log should begin with `"EVENT_JSON:"`. The structure of your log should, however, always contain the 3 following things: 

- **standard**: the current name of the standard (e.g. nep171)
- **version**: the version of the standard you're using (e.g. 1.0.0)
- **event**: a list of events you're emitting.

The event interface differs based on whether you're recording transfers or mints. The interface for both events is outlined below.

**Transfer events**:
- *Optional* - **authorized_id**: the account approved to transfer on behalf of the owner.
- **old_owner_id**: the old owner of the NFT.
- **new_owner_id**: the new owner that the NFT is being transferred to.
- **token_ids**: a list of NFTs being transferred.
- *Optional* - **memo**: an optional message to include with the event.

**Minting events**:
- **owner_id**: the owner that the NFT is being minted to.
- **token_ids**: a list of NFTs being transferred.
- *Optional* - **memo**: an optional message to include with the event.

### Examples {#examples}

In order to solidify your understanding of the standard, let's walk through three scenarios and see what the logs should look like.

#### Scenario A - simple mint

In this scenario, Benji wants to mint an NFT to Mike with a token ID `"team-token"` and he doesn't include a message. The log should look as follows.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token"]}
  ]
}
```

#### Scenario B - batch mint

In this scenario, Benji wants to perform a batch mint. He will mint an NFT to Mike, Damian, Josh, and Dorian. Dorian, however, will get two NFTs. Each token ID will be `"team-token"` followed by an incrementing number. The log is as follows.


```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token0"]},
    {"owner_id": "damian.testnet", "token_ids": ["team-token1"]},
    {"owner_id": "josh.testnet", "token_ids": ["team-token2"]}
    {"owner_id": "dorian.testnet", "token_ids": ["team-token3", "team-token4"]},
  ]
}
```

#### Scenario C - transfer NFTs

In this scenario, Mike is transferring both his team tokens to Josh. The log should look as follows.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_transfer",
  "data": [
    {"old_owner_id": "mike.testnet", "new_owner_id": "josh.testnet", "token_ids": ["team-token", "team-token0"], "memo": "Go Team!"}
  ]
}
```

## Modifications to the contract {#modifications-to-the-contract}

At this point, you should have a good understanding of what the end goal should be so let's get to work!

### Logging minted tokens {#logging-minted-tokens}

Since the contract will only be minting tokens in one place, it's trivial where you should place the log. Open the `nft-contract/src/mint.ts` file and navigate to the bottom of the file. This is where you'll construct the log for minting. Anytime someone successfully mints an NFT, it will now correctly emit a log.

```js
// Construct the mint log as per the events standard.
let nftMintLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_mint",
    data: [
        {
            // Owner of the token.
            owner_id: token.owner_id,
            // Vector of token IDs that were minted.
            token_ids: [tokenId],
        }
    ]
}

// Log the json.
near.log(`EVENT_JSON:${JSON.stringify(nftMintLog)}`);
```

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

    // Construct the mint log as per the events standard.
    let nftMintLog = {
        // Standard name ("nep171").
        standard: NFT_STANDARD_NAME,
        // Version of the standard ("nft-1.0.0").
        version: NFT_METADATA_SPEC,
        // The data related with the event stored in a vector.
        event: "nft_mint",
        data: [
            {
                // Owner of the token.
                owner_id: token.owner_id,
                // Vector of token IDs that were minted.
                token_ids: [tokenId],
            }
        ]
    }
    
    // Log the json.
    near.log(`EVENT_JSON:${JSON.stringify(nftMintLog)}`);

    //calculate the required storage which was the used - initial TODO
    let requiredStorageInBytes = near.storageUsage().valueOf() - initialStorageUsage.valueOf();

    //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
    refundDeposit(requiredStorageInBytes);
}
```

### Logging transfers {#logging-transfers}

Let's open the `nft-contract/src/internal.ts` file and navigate to the `internalTransfer` function. This is the location where you'll build your transfer logs. Whenever an NFT is transferred, this function is called and so you'll correctly be logging the transfers.

```js
// Construct the transfer log as per the events standard.
let nftTransferLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_transfer",
    data: [
        {
            // The optional authorized account ID to transfer the token on behalf of the old owner.
            authorized_id: authorizedId,
            // The old owner's account ID.
            old_owner_id: token.owner_id,
            // The account ID of the new owner of the token.
            new_owner_id: receiverId,
            // A vector containing the token IDs as strings.
            token_ids: [tokenId],
            // An optional memo to include.
            memo,
        }
    ]
}

// Log the serialized json.
near.log(`EVENT_JSON:${JSON.stringify(nftTransferLog)}`);
```
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
        //we copy over the royalties from the previous token
        royalty: token.royalty,
    });

    //insert that new token into the tokens_by_id, replacing the old entry 
    contract.tokensById.set(tokenId, newToken);

    //if there was some memo attached, we log it. 
    if (memo != null) {
        near.log(`Memo: ${memo}`);
    }

    // Default the authorized ID to be None for the logs.
    let authorizedId;

    //if the approval ID was provided, set the authorized ID equal to the sender
    if (approvalId != null) {
        authorizedId = senderId
    }

    // Construct the transfer log as per the events standard.
    let nftTransferLog = {
        // Standard name ("nep171").
        standard: NFT_STANDARD_NAME,
        // Version of the standard ("nft-1.0.0").
        version: NFT_METADATA_SPEC,
        // The data related with the event stored in a vector.
        event: "nft_transfer",
        data: [
            {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id: authorizedId,
                // The old owner's account ID.
                old_owner_id: token.owner_id,
                // The account ID of the new owner of the token.
                new_owner_id: receiverId,
                // A vector containing the token IDs as strings.
                token_ids: [tokenId],
                // An optional memo to include.
                memo,
            }
        ]
    }

    // Log the serialized json.
    near.log(JSON.stringify(nftTransferLog));

    //return the previous token object that was transferred.
    return token
}
```

This solution, unfortunately, has an edge case which will break things. If an NFT is transferred via the `nft_transfer_call` function, there's a chance that the transfer will be reverted if the `nft_on_transfer` function returns `true`. Taking a look at the logic for `nft_transfer_call`, you can see why this is a problem.

When `nft_transfer_call` is invoked, it will: 
- Call `internalTransfer` to perform the actual transfer logic.
- Initiate a cross-contract call and invoke the `nft_on_transfer` function.
- Resolve the promise and perform logic in `internalResolveTransfer`.
    - This will either return true meaning the transfer went fine or it will revert the transfer and return false.

If you only place the log in the `internalTransfer` function, the log will be emitted and the indexer will think that the NFT was transferred. If the transfer is reverted during `internalResolveTransfer`, however, that event should **also** be emitted. Anywhere that an NFT **could** be transferred, we should add logs. Replace the `internalResolveTransfer` with the following code.

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

    /*
        We need to log that the NFT was reverted back to the original owner.
        The old_owner_id will be the receiver and the new_owner_id will be the
        original owner of the token since we're reverting the transfer.
    */

    // Construct the transfer log as per the events standard.
    let nftTransferLog = {
        // Standard name ("nep171").
        standard: NFT_STANDARD_NAME,
        // Version of the standard ("nft-1.0.0").
        version: NFT_METADATA_SPEC,
        // The data related with the event stored in a vector.
        event: "nft_transfer",
        data: [
            {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id: authorizedId,
                // The old owner's account ID.
                old_owner_id: receiverId,
                // The account ID of the new owner of the token.
                new_owner_id: ownerId,
                // A vector containing the token IDs as strings.
                token_ids: [tokenId],
                // An optional memo to include.
                memo,
            }
        ]
    }

    // Log the serialized json.
    near.log(JSON.stringify(nftTransferLog));

    //return false
    return false
}
```

With that finished, you've successfully implemented the events standard and it's time to start testing.

## Deploying the contract {#redeploying-contract}

For the purpose of readability and ease of development, instead of redeploying the contract to the same account, let's create a sub-account and deploy to that instead. You could have deployed to the same account as none of the changes you implemented in this tutorial would have caused errors.

### Creating a sub-account

Run the following command to create a sub-account `events` of your main account with an initial balance of 25 NEAR which will be transferred from the original to your new account.

```bash
near create-account events.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Next, you'll want to export an environment variable for ease of development:

```bash
export EVENTS_NFT_CONTRACT_ID=events.$NFT_CONTRACT_ID
```

Using the build script, build the deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $EVENTS_NFT_CONTRACT_ID
```

### Initialization and minting {#initialization-and-minting}

Since this is a new contract, you'll need to initialize and mint a token. Use the following command to initialize the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $EVENTS_NFT_CONTRACT_ID init '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID init json-args '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"events-token"` and the receiver will be your new account. In addition, you're passing in a map with two accounts that will get perpetual royalties whenever your token is sold.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $EVENTS_NFT_CONTRACT_ID nft_mint '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID --amount 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

You can check to see if everything went through properly by looking at the output in your CLI:

```bash
Doing account.functionCall()
Receipts: F4oxNfv54cqwUwLUJ7h74H1iE66Y3H7QDfZMmGENwSxd, BJxKNFRuLDdbhbGeLA3UBSbL8UicU7oqHsWGink5WX7S
	Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_mint","data":[{"owner_id":"events.goteam.examples.testnet","token_ids":["events-token"]}]}
Transaction Id 4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
''
```

You can see that the event was properly logged!

### Transferring {#transferring}

You can now test if your transfer log works as expected by sending `benjiman.testnet` your NFT.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $EVENTS_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' --accountId $EVENTS_NFT_CONTRACT_ID --depositYocto 1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

```bash
Doing account.functionCall()
Receipts: EoqBxrpv9Dgb8KqK4FdeREawVVLWepEUR15KPNuZ4fGD, HZ4xQpbgc8EfU3PiV72LvfXb2f3dVC1n9aVTbQds9zfR
	Log [events.goteam.examples.testnet]: Memo: Go Team :)
	Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_transfer","data":[{"authorized_id":"events.goteam.examples.testnet","old_owner_id":"events.goteam.examples.testnet","new_owner_id":"benjiman.testnet","token_ids":["events-token"],"memo":"Go Team :)"}]}
Transaction Id 4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
''
```

Hurray! At this point, your NFT contract is fully complete and the events standard has been implemented.

## Conclusion

Today you went through the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and implemented the necessary logic in your smart contract. You created events for [minting](#logging-minted-tokens) and [transferring](#logging-transfers) NFTs. You then deployed and [tested](#initialization-and-minting) your changes by minting and transferring NFTs.

In the next tutorial, you'll look at the basics of a marketplace contract and how it was built.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Events standard: [NEP297 extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event), version `1.0.0`

:::
