---
id: skeleton
title: Skeleton and JavaScript Architecture
sidebar_label: Contract Architecture
---

> In this article, you'll learn about the basic architecture behind the NFT contract that you'll develop while following this _"Zero to Hero"_ series.
> You'll discover the contract's layout and you'll see how the JavaScript files are structured in order to build a feature-complete smart contract.




## Introduction

This tutorial presents the code skeleton for the NFT smart contract and its file structure.
You'll find how all the functions are laid out as well as the missing JS code that needs to be filled in.
Once every file and function has been covered, you'll go through the process of building the mock-up contract to confirm that everything is working correctly.

## File structure

Following a regular [JavaScript](https://www.javascript.com/) project, the file structure for this smart contract has:

- `package.json` file to define the packages and scripts used in the project.
- `src` folder where all the JavaScript source files are stored
- `build` folder where the compiled `wasm` will output to.

### Source files

| File                             | Description                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------- |
| [approval.ts](#approvalts)       | Has the internal functions that controls the access and transfers of non-fungible tokens. |
| [enumeration.ts](#enumerationts) | Contains the internal methods to query for NFT tokens and their owners.                        |
| [index.ts](#indexts)                 | Holds the exposed smart contract functions.                               |
| [metadata.ts](#metadatats)       | Defines the token and metadata structures.                                        |
| [mint.ts](#mintts)               | Contains the internal token minting logic.                                                    |
| [nft_core.ts](#nft_corets)       | Has the internal core logic that allows you to transfer NFTs between users.                       |
| [royalty.ts](#royaltyts)         | Contains the internal payout-related functions.                                               |

```
nft-tutorial-js
└── src
    market-contract
    nft-contract
    ├── approval.ts
    ├── enumeration.ts
    ├── index.ts
    ├── metadata.ts
    ├── mint.ts
    ├── nft_core.ts
    └── royalty.ts
```

:::tip
Explore the code in our [GitHub repository](https://github.com/near-examples/nft-tutorial-js/tree/1.skeleton).
:::

---

## `approval.ts`

> This allows people to approve other accounts to transfer NFTs on their behalf.

This file contains the internal logic that complies with the standard's [approvals management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension. Here is a breakdown of the methods and their functions:

| Method              | Description                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **internalNftApprove**     | Approves an account ID to transfer a token on your behalf. Called during **nft_approve**.                                                |
| **internalNftIsApproved** | Checks if the input account has access to approve the token ID. Called during **nft_is_approved**.                                            |
| **internalNftRevoke**      | Revokes a specific account from transferring the token on your behalf. Called during **nft_revoke**.                                     |
| **internalNftRevokeAll**  | Revokes all accounts from transferring the token on your behalf. Called during **nft_revoke_all**.                                         |

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
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}

//revoke all accounts from transferring the token on your behalf
export function internalNftRevokeAll({
    contract,
    tokenId
}:{ 
    contract: Contract, 
    tokenId: string 
}) {
    /*
        FILL THIS IN
    */
}
```

You'll learn more about these functions in the [approvals section](/tutorials/nfts/js/approvals) of the Zero to Hero series.

---

## `enumeration.ts`

> This file provides the internal functions needed to view information about NFTs, and follows the standard's [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) extension.

| Method                   | Description                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **internalNftTotalSupply**           | Returns the total amount of NFTs stored on the contract. Called during **nft_total_supply**.    |
| **internalNftTokens**           | Returns a paginated list of NFTs stored on the contract regardless of their owner. Called during **nft_tokens**.    |
| **internalNftSupplyForOwner** | Allows you view the total number of NFTs owned by any given user. Called during **nft_supply_for_owner**.                     |
| **internalNftTokensForOwner** | Returns a paginated list of NFTs owned by any given user. Called during **nft_tokens_for_owner**.                             |

```
//Query for the total supply of NFTs on the contract
export function internalTotalSupply({
    contract
}:{
    contract: Contract
}): number {
    /*
        FILL THIS IN
    */
}

//Query for nft tokens on the contract regardless of the owner using pagination
export function internalNftTokens({
    contract,
    fromIndex,
    limit
}:{ 
    contract: Contract, 
    fromIndex?: string, 
    limit?: number
}): JsonToken[] {
    /*
        FILL THIS IN
    */
}

//get the total supply of NFTs for a given owner
export function internalSupplyForOwner({
    contract,
    accountId
}:{
    contract: Contract, 
    accountId: string
}): number {
    /*
        FILL THIS IN
    */
}

//Query for all the tokens for an owner
export function internalTokensForOwner({
    contract,
    accountId,
    fromIndex,
    limit
}:{
    contract: Contract, 
    accountId: string, 
    fromIndex?: string, 
    limit?: number
}): JsonToken[] {
    /*
        FILL THIS IN
    */
}
```

You'll learn more about these functions in the [enumeration section](/tutorials/nfts/js/enumeration) of the tutorial series.

---

## `metadata.ts`

> This file is used to keep track of the information to be stored for tokens, and metadata.
> In addition, you can define a function to view the contract's metadata which is part of the standard's [metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) extension.

| Name              | Description                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **TokenMetadata** | This structure defines the metadata that can be stored for each token. (title, description, media, etc.       |
| **Token**         | This structure outlines what information will be stored on the contract for each token.                       |
| **JsonToken**     | When querying information about NFTs through view calls, the return information is stored in this JSON token. |
| **internalNftMetadata**  | This function allows users to query for the contact's internal metadata. Called during **nft_metadata**.                                           |

```
export class NFTContractMetadata {
    /*
        FILL THIS IN
    */
}

export class TokenMetadata {
    /*
        FILL THIS IN
    */
}

export class Token {
    /*
        FILL THIS IN
    */
}

//The Json token is what will be returned from view calls. 
export class JsonToken {
    /*
        FILL THIS IN
    */
}

//get the information for a specific token ID
export function internalNftMetadata({
    contract
}:{
    contract: Contract
}): NFTContractMetadata {
    /*
        FILL THIS IN
    */
}
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/js/minting) of the tutorial series.

---

## `mint.ts`

> Contains the internal token minting logic.

| Method       | Description                               |
| ------------ | ----------------------------------------- |
| **internalNftMint** | This function mints a non-fungible token. Called during **nft_mint**. |

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
    /*
        FILL THIS IN
    */
}
```

---

## `nft_core.ts`

> Core logic that allows you to transfer NFTs between users.

| Method                   | Description                                                                                                                                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **internalNftTransfer**         | Transfers an NFT to a receiver ID. Called during **nft_transfer**.                                                                                                                                                                                                                                                            |
| **internalNftTransferCall**    | Transfers an NFT to a receiver and calls a function on the receiver ID's contract. The function returns `true` if the token was transferred from the sender's account. Called during **nft_transfer_call**.                                                                                                                        |
| **internalNftToken**            | Allows users to query for the information about a specific NFT. Called during **nft_token**.                                                                                                                                                                                                                               |                                                                                                       |
| **internalNftResolveTransfer** | When you start the `nft_transfer_call` and transfer an NFT, the standard dictates that you should also call a method on the receiver's contract. If the receiver needs you to return the NFT to the sender (as per the return value of the `nft_on_transfer` method), this function allows you to execute that logic. Called during **nft_resolve_transfer**. |

```
//get the information for a specific token ID
export function internalNftToken({
    contract,
    tokenId
}:{ 
    contract: Contract, 
    tokenId: string 
}) {
    /*
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/js/minting) of the tutorial series.

---

## `royalty.ts`

> Contains the internal payout-related functions.

| Method                  | Description                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **internalNftPayout**          | This internal method calculates the payout for a given token. Called during **nft_payout**.                                                     |
| **internalNftTransferPayout** | Internal method to transfer the token to the receiver ID and return the payout object that should be paid for a given balance. Called during **nft_transfer_payout**. |

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
    /*
        FILL THIS IN
    */
}

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
    /*
        FILL THIS IN
    */
}
```

You'll learn more about these functions in the [royalty section](/tutorials/nfts/js/royalty) of the tutorial series.

---

## `index.ts`

> This file outlines the smart contract class and what information it stores and keeps track of. In addition, it exposes all public facing methods that are callable by the user.

| Method               | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| **init** | Constructor function used to initialize the contract with some metadata and default state. |
| **nft_mint** | Calls the internal mint function to mint an NFT. |
| **nft_token** | Calls the internal function to query for info on a specific NFT |
| **nft_transfer** | Calls the internal function to transfer an NFT  |
| **nft_transfer_call** | Calls the internal function to transfer an NFT and call `nft_on_transfer` on the receiver's contract |
| **nft_resolve_transfer** | Calls the internal function to resolve the transfer call promise.|
| **nft_is_approved** | Calls the internal function to check whether someone is approved for an NFT|
| **nft_approve** | Calls the internal function to approve someone to transfer your NFT|
| **nft_payout** | Calls the internal function to query for the payout object for an NFT|
| **nft_transfer_payout** | Calls the internal function to transfer an NFT and return the payout object. |
| **nft_revoke** | Calls the internal function to revoke someone access to transfer your NFT|
| **nft_revoke_all** | Calls the internal function to revoke everyone's access to transfer your NFT|
| **nft_total_supply** | Calls the internal function to query the total supply of NFTs on the contract.|
| **nft_tokens** | Calls the internal function to paginate through NFTs on the contract|
| **nft_tokens_for_owner** | Calls the internal function to paginate through NFTs for a given owner|
| **nft_supply_for_owner** | Calls the internal function to query for the total number of NFTs owned by someone.|
| **nft_metadata** | Calls the internal function to query for the contract's metadata|



```
@NearBindgen
export class Contract extends NearContract {
    /*
        FILL THIS IN
    */

    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id. 
    */
    constructor({
        owner_id, 
        metadata = {
            spec: "nft-1.0.0",
            name: "NFT Tutorial Contract",
            symbol: "GOTEAM"
        } 
    }) {
    /*
        FILL THIS IN
    */
    }

    default() {
        return new Contract({owner_id: ''})
    }

    /*
        MINT
    */
    @call
    nft_mint({ token_id, metadata, receiver_id, perpetual_royalties }) {
        return internalMint({ contract: this, tokenId: token_id, metadata: metadata, receiverId: receiver_id, perpetualRoyalties: perpetual_royalties });
    }

    /*
        CORE
    */
    @view
    //get the information for a specific token ID
    nft_token({ token_id }) {
        return internalNftToken({ contract: this, tokenId: token_id });
    }

    @call
    //implementation of the nft_transfer method. This transfers the NFT from the current owner to the receiver. 
    nft_transfer({ receiver_id, token_id, approval_id, memo }) {
        return internalNftTransfer({ contract: this, receiverId: receiver_id, tokenId: token_id, approvalId: approval_id, memo: memo });
    }

    @call
    //implementation of the transfer call method. This will transfer the NFT and call a method on the receiver_id contract
    nft_transfer_call({ receiver_id, token_id, approval_id, memo, msg }) {
        return internalNftTransferCall({ contract: this, receiverId: receiver_id, tokenId: token_id, approvalId: approval_id, memo: memo, msg: msg });
    }

    @call
    //resolves the cross contract call when calling nft_on_transfer in the nft_transfer_call method
    //returns true if the token was successfully transferred to the receiver_id
    nft_resolve_transfer({ authorized_id, owner_id, receiver_id, token_id, approved_account_ids, memo }) {
        return internalResolveTransfer({ contract: this, authorizedId: authorized_id, ownerId: owner_id, receiverId: receiver_id, tokenId: token_id, approvedAccountIds: approved_account_ids, memo: memo });
    }

    /*
        APPROVALS
    */
    @view
    //check if the passed in account has access to approve the token ID
    nft_is_approved({ token_id, approved_account_id, approval_id }) {
        return internalNftIsApproved({ contract: this, tokenId: token_id, approvedAccountId: approved_account_id, approvalId: approval_id });
    }

    @call
    //approve an account ID to transfer a token on your behalf
    nft_approve({ token_id, account_id, msg }) {
        return internalNftApprove({ contract: this, tokenId: token_id, accountId: account_id, msg: msg });
    }

    /*
        ROYALTY
    */
    @view
    //calculates the payout for a token given the passed in balance. This is a view method
    nft_payout({ token_id, balance, max_len_payout }) {
        return internalNftPayout({ contract: this, tokenId: token_id, balance: balance, maxLenPayout: max_len_payout });
    }

    @call
    //transfers the token to the receiver ID and returns the payout object that should be payed given the passed in balance. 
    nft_transfer_payout({ receiver_id, token_id, approval_id, memo, balance, max_len_payout }) {
        return internalNftTransferPayout({ contract: this, receiverId: receiver_id, tokenId: token_id, approvalId: approval_id, memo: memo, balance: balance, maxLenPayout: max_len_payout });
    }

    @call
    //approve an account ID to transfer a token on your behalf
    nft_revoke({ token_id, account_id }) {
        return internalNftRevoke({ contract: this, tokenId: token_id, accountId: account_id });
    }

    @call
    //approve an account ID to transfer a token on your behalf
    nft_revoke_all({ token_id }) {
        return internalNftRevokeAll({ contract: this, tokenId: token_id });
    }

    /*
        ENUMERATION
    */
    @view
    //Query for the total supply of NFTs on the contract
    nft_total_supply() {
        return internalTotalSupply({ contract: this });
    }

    @view
    //Query for nft tokens on the contract regardless of the owner using pagination
    nft_tokens({ from_index, limit }) {
        return internalNftTokens({ contract: this, fromIndex: from_index, limit: limit });
    }

    @view
    //get the total supply of NFTs for a given owner
    nft_tokens_for_owner({ account_id, from_index, limit }) {
        return internalTokensForOwner({ contract: this, accountId: account_id, fromIndex: from_index, limit: limit });
    }

    @view
    //Query for all the tokens for an owner
    nft_supply_for_owner({ account_id }) {
        return internalSupplyForOwner({ contract: this, accountId: account_id });
    }

    /*
        METADATA
    */
    @view
    //Query for all the tokens for an owner
    nft_metadata() {
        return internalNftMetadata(this);
    }
}
```

You'll learn more about these functions in the [minting section](/tutorials/nfts/js/minting) of the tutorial series.

---

## Building the skeleton

- If you haven't cloned the main repository yet, open a terminal and run:

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
```

- Next, switch to the `1.skeleton` branch. 
- Install the dependencies (including the JS SDK): `yarn`
- Build the contract with `yarn build`:

```sh
git clone https://github.com/near-examples/nft-tutorial-js/
cd nft-tutorial-js
git checkout 1.skeleton
yarn && yarn build
```

Once this finishes, the `nft-tutorial-js/build` directory should contain the `nft.wasm` smart contract!

Building the skeleton is useful to validate that everything works properly and that you'll be able to compile improved versions of this NFT contract in the upcoming tutorials.

---

## Conclusion

You've seen the layout of this NFT smart contract, and how all the functions are laid out across the different source files.
Using `yarn`, you've been able to compile the contract, and you'll start fleshing out this skeleton in the next [Minting tutorial](/tutorials/nfts/js/minting).

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- near-sdk-js: `0.4.0-5`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
