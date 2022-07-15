---
id: enumeration
title: Enumeration
sidebar_label: Enumeration
---

In the previous tutorials, you looked at ways to integrate the minting functionality into a skeleton smart contract. In order to get your NFTs to show in the wallet, you also had to deploy a patch fix that implemented one of the enumeration methods. In this tutorial, you'll expand on and finish the rest of the enumeration methods as per the [standard](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html)
Now you'll extend the NFT smart contract and add a couple of enumeration methods that can be used to return the contract's state.

## Introduction

As mentioned in the [Upgrade a Contract](/tutorials/nfts/upgrade-contract/) tutorial, you can deploy patches and fixes to smart contracts. This time, you'll use that knowledge to implement the `nft_total_supply`, `nft_tokens` and `nft_supply_for_owner` enumeration functions.

To get started, either switch to the `2.minting` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.
If you haven't cloned it yet, refer to the [Contract Architecture](/tutorials/nfts/skeleton#building-the-skeleton) to check out the repository.

```bash
git checkout 2.minting
```

:::tip
If you wish to see the finished code for this _Enumeration_ tutorial, you can find it on the `3.enumeration` branch.
:::

## Modifications to the contract

Let's start by opening the  `src/enumeration.rs` file and locating the empty `nft_total_supply` function. 

**nft_total_supply**

This function should return the total number of NFTs stored on the contract. You can easily achieve this functionality by simply returning the length of the `nft_metadata_by_id` data structure.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/3.enumeration/nft-contract/src/enumeration.rs#L5-L9
```

**nft_token**

This function should return a paginated list of `JsonTokens` that are stored on the contract regardless of their owners.
If the user provides a `from_index` parameter, you should use that as the starting point for which to start iterating through tokens; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching either the limit or the end of the list.

:::tip
Rust has useful methods for pagination, allowing you to skip to a starting index and taking the first `n` elements of an iterator.
:::

```rust reference
https://github.com/near-examples/nft-tutorial/blob/3.enumeration/nft-contract/src/enumeration.rs#L11-L27
```

**nft_supply_for_owner**

This function should look for all the non-fungible tokens for a user-defined owner, and return the length of the resulting set.
If there isn't a set of tokens for the provided `AccountID`, then the function shall return `0`.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/3.enumeration/nft-contract/src/enumeration.rs#L28-L43
```

Next, you can use the CLI to query these new methods and validate that they work correctly.

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the necessary logic for `nft_tokens_for_owner`, it's time to build and re-deploy the contract to your account. Using the build script, deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile out/main.wasm --accountId $NFT_CONTRACT_ID
```

This should output a warning saying that the account has a deployed contract and will ask if you'd like to proceed. Simply type `y` and hit enter.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

## Enumerating tokens

Once the updated contract has been redeployed, you can test and see if these new functions work as expected.

### NFT tokens

Let's query for a list of non-fungible tokens on the contract. Use the following command to query for the information of up to 50 NFTs starting from the 10th item:

```bash
near view $NFT_CONTRACT_ID nft_tokens '{"from_index": "10", "limit": 50}'
```

This command should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
[]
```

</p>
</details>

### Tokens by owner

To get the total supply of NFTs owned by the `goteam.testnet` account, call the `nft_supply_for_owner` function and set the `account_id` parameter:

```bash
near view $NFT_CONTRACT_ID nft_supply_for_owner '{"account_id": "goteam.testnet"}'
```

This should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
0
```

</p>
</details>

## Conclusion

In this tutorial, you have added two [new enumeration functions](/tutorials/nfts/enumeration#modifications-to-the-contract), and now you have a basic NFT smart contract with minting and enumeration methods in place. After implementing these modifications, you redeployed the smart contract and tested the functions using the CLI.

In the [next tutorial](/tutorials/nfts/core), you'll implement the core functions needed to allow users to transfer the minted tokens.

:::info Remember
If you want to see the finished code from this tutorial, you can checkout the `3.enumeration` branch. 
:::

<!--
## Bonus track

Have some sort of random NFT displayer frontend
-->
