---
id: minting
title: Minting
sidebar_label: Minting
---

This is the first of many tutorials in a series where we will be creating a complete NFT smart contract from scratch that conforms with all the standards found [here](https://nomicon.io/Standards/NonFungibleToken/README.html). Today you'll learn how to create the logic needed to mint NFTs and have them show up in your NEAR wallet. We will be modifying a bare-bones skeleton smart contract by filling in the necessary code snippets needed to add minting functionalities.
## Introduction

To get started, let's switch to the `1.skeleton` branch in our repo. If you don't have the repository cloned, refer to the INSERT_CONTRACT_ARCHITECTURE_LINK_HERE to get started. 

```
git checkout 1.skeleton
```

If you wish to see the finished code for the minting portion of the tutorial, that can be found on the `2.minting` branch.

## Modifications to the skeleton contract

In order to implement the logic needed for minting, we should break it up into smaller tasks and handle those one-by-one. Let's step back and think about the best way to do this by asking ourselves a simple question: what does it mean to mint an NFT? 

To mint an NFT, in the most simple way possible, a contract needs to be able to associate a token with an owner on the blockchain. This means we'll need a couple things:
- A way to keep track of tokens and other information on the contract.
- A way to store information for each token such as `metadata` (more on that later).
- A way to link a token with an owner.

That's it! We've now broken down the larger problem into some smaller, less daunting, subtasks. Let's start by tackling the first and work our way through the rest.

### Storing information on the contract

Let's navigate to `nft-contract/src/lib.rs` and fill in some of the code blocks. We need to be able to store important information on the contract such as the list of tokens that an account has. 

#### Contract Struct
The first thing we'll do is modify the contract struct as follows.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs#L25-L42
```

This allows us to get the information stored in these data structures from anywhere in our contract. We've created 3 token specific storages: 

- **tokens_per_owner**: allows us to keep track of the tokens owned by any account
- **tokens_by_id**: returns all the information about a specific token
- **tokens_per_owner**: returns just the metadata for a specific token

In addition, we'll keep track of the owner of the contract as well as the metadata for the contract.

You might be confused as to some of the types that are being used. In order to make the code more readable, we've introduced custom data types which I'll briefly outline below:

- **AccountId**: essentially just a string that ensures there are no special or breaking characters.
- **TokenId**: simply a string.

As for the `Token`, `TokenMetadata`, and `NFTMetadata` data types, those are structs that we'll define later in this tutorial.

#### Initialization Functions

Next, we'll create what's called an initialization function and we'll name it `new`. This will need to be invoked when we first deploy the contract. It will initialize all the contract's fields that we've defined above with default values. We'll only allow the `owner_id` and `metadata` fields to be customized and so we'll add them as parameters to the function.

This function will default all the collections to be empty and set the owner and metadata equal to what we pass in.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/2.minting/nft-contract/src/lib.rs#L86-L106
```

More often than not when doing development, we'll need to deploy contracts several times. You can imagine that it might get tedious to have to pass in metadata every single time we want to initialize our contract. For this reason, let's create a function that can initialize our contract with a set of default metadata. We'll call it `new_default_meta` and it'll only take the owner_id as a parameter.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs#L65-L79
```

What this function is actually doing is it's calling our previous `new` function and passing in the owner that we specify and also passes in some default metadata for us.

### Metadata and token information

Now that we've defined what information to store on the contract itself and we've defined some ways to initialize our contract, we now need to think about and define what information should go in the `Token`, `TokenMetadata`, and `NFTMetadata` data types.

Let's switch over to the `nft-contract/src/metadata.rs` file as this is where that information will go. If we look at the standards for metadata found in [nomicon](https://nomicon.io/Standards/NonFungibleToken/Metadata.html), we'll find all the necessary information that we need to store for both `TokenMetadata` and `NFTMetadata`. Simply fill in the following code. 

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs#L5-L32
```

This now leaves us with the `Token` struct and then something called a `JsonToken`. The `Token` struct will hold all the information directly related to the token excluding the metadata. The metadata, if you remember, is stored in a map on the contract in a data structured called `token_metadata_by_id`. This allows us to quickly get the metadata for any token by simply passing in the token's ID.

For the `Token` struct, we'll simply keep track of the owner for now.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs#L34-L38
```

The purpose of the `JsonToken` is to hold all the information for an NFT that we want to send back as JSON whenever someone does a view call. This means we'll want to store the owner, token ID, and metadata.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs#L40-L50
```

> **Tip:** Some of you might be thinking to yourselves "how come we don't just store all the information in the `Token` struct?". The reason behind this is that it's actually more efficient to construct the Json token on the fly only when we need it rather than storing all the information in the token struct. In addition, some operations might only need the metadata for a token and so having the metadata in a seperate data structure is more optimal. 

#### Function for querying contract metadata

Now that we've defined some of the types that were used in the previous section, let's move on and create our first view function `nft_metadata`. This will allow users to query for the contract's metadata as per the [metadata standard](https://nomicon.io/Standards/NonFungibleToken/Metadata.html).

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs#L52-L62
```

This function will get the `metadata` object from the contract which is of type `NFTMetadata` and will return it.

> **Tip:** Don't forget to add the return type `--> NFTMetadata` to the trait and implementation

Just like that, we've completed the first two tasks and are ready to move onto last part of the tutorial.

### Minting Logic

Now that all the information and types are defined, let's start brainstorming how the minting logic will play out. In the end, we need to link a `Token` and `TokenId` to a specific owner. Let's look back at the `lib.rs` file to see how we can accomplish this. There are a couple data structures that might be useful:  

```rust
//keeps track of all the token IDs for a given account
pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

//keeps track of the token struct for a given token ID
pub tokens_by_id: LookupMap<TokenId, Token>,

//keeps track of the token metadata for a given token ID
pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,
```

Looking at these data structures, we should do the following: 
- Add the token ID into the set of tokens that the receiver owns. This will be done on the `tokens_per_owner` field.
- Create a token object and map the token ID to that token object in the `tokens_by_id` field.
- Map the token ID to it's metadata using the `token_metadata_by_id`. 

With those steps outlined, it's important to take into consideration the storage costs of minting NFTs. Since we're adding bytes to the contract by creating entries in the data structures, the contract needs to cover the storage costs. If we just made it so any user could go and mint an NFT for free, that system could easily be abused and users could essentially "drain" the contract of all it's funds by minting thousands of NFTs. For this reason, we'll make it so that users need to attach a deposit to the call to cover the cost of storage. We'll measure the initial storage usage before anything was added and we'll measure the final storage usage after all the logic is finished. We'll then make sure that the user has attached enough $NEAR to cover that cost and we'll refund them if they've attached too much. 

Now that we've got a good understanding of how everything should play out, let's fill in the necessary code.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/mint.rs#L3-L45
```

You'll notice that we're using some internal methods such as `refund_deposit` and `internal_add_token_to_owner`. We've described the function of `refund_deposit` and as for `internal_add_token_to_owner`, this will add a token to the set of tokens an account owns for the contract's `tokens_per_owner` data structure. We'll create these functions in a file called `internal.rs`. Go ahead and create the file. Your new contract architecture should look as follows:

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── internal.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    └── royalty.rs
```

Let's add the following to our newly created internal file.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/internal.rs#L1-L63
```

Let's now quickly move to the `lib.rs` file and make the functions we just created invokable in other files. We'll add the internal crates and mod the file as shown below:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs#L10-L23
```

At this point, the core logic is all in place so that we can mint NFTs. We'll use the function `nft_mint` which takes the following parameters: 
- **token_id**: the ID of the token we're minting (as a string).
- **metadata**: the metadata for the token that we're minting (of type `TokenMetadata` which is found in the `metadata.rs` file).
- **receiver_id**: an optional parameter to specify who the owner of the token will be. If no receiver_id is specified, the token will be minted to the account that called the function.


Behind the scenes, the function will: 

1. Calculate the initial storage before adding anything to the contract
2. Create a `Token` object with the owner ID
3. Link the token ID to the newly created token object by inserting them into the `tokens_by_id` field.
4. Link the token ID to the passed in metadata by inserting them into the `token_metadata_by_id` field.
5. Add the token ID to the list of tokens that the owner owns by calling the `internal_add_token_to_owner` function. 
6. Calculate the final and net storage to make sure that the user has attached enough NEAR to the call in order to cover those costs.

### Querying for token information 

If we were to go ahead and deploy this contract, initialize it, and mint an NFT, we would have no way of knowing or querying for the information about the token we just minted. Let's quickly add a way to query for the information of a specific NFT. We'll move to the `nft-contract/src/nft_core.rs` file and edit the `nft_token` function.

Let's first add a return type onto the `nft_token` function. We'll want it to optionally return a `JsonToken`. It's optional since there may or may not be a token depending on what the user passes in for the token ID. 

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/nft_core.rs#L27-L28
```

We'll then fill in the actual logic for the function. It will take a token ID as a parameter and return the information for that token. The `JsonToken` contains the token ID, the owner ID, and the token's metadata.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/nft_core.rs#L103-L118
```

With that finished, it's finally time to build and deploy our contract so we can mint our first NFT.


## Interacting with our contract on-chain

Now that the logic for minting is complete and we've introduce a way to query for information about specific tokens, it's time to build and deploy our contract to the blockchain. 

This smart contract will be deployed to your NEAR account.

> **Note:** Please ensure that you deploy the contract to an account that has no pre-existing contract deployed to it already. It's easiest to simply create a new account or create a subaccount for this tutorial.

Log in to your newly created account with `near-cli` by running the following command in your terminal.

```bash
near login
```

To make this tutorial easier to copy/paste, we're going to set an environment variable for your account ID. In the command below, replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet` (or `.near` for `mainnet`):

```bash
export NFT_CONTRACT_ID="YOUR_ACCOUNT_NAME"
```

Test that the environment variable is set correctly by running:

```bash
echo $NFT_CONTRACT_ID
```

Verify that the correct account ID is printed in the terminal. If everything looks correct you can now deploy your contract.
In the root of your NFT project run the following command to deploy your smart contract.

```bash
near deploy --wasmFile res/non_fungible_token.wasm --accountId $ID
```

## Conclusion

Talk about how we minted an NFT, had it show up in the wallet, and explored upgrading the contract if we need to patch fix something. Talk about the enumeration standard and how we’re gonna move on and extend the tutorial to introduce enumerable methods. 

Talk about how if you wanna use the finished code for this tutorial you can checkout the `2.minting` branch. 

## Bonus track

We can link the blockcraft tutorial as a practical application / extension to the tutorial.
