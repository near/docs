---
id: enumeration
title: Enumeration
sidebar_label: Enumeration
---

In this tutorial, you'll build off the work you previously did to implement the minting and viewing functionality on a skeleton smart contract. 
Now you'll extend the NFT smart contract and add a couple of enumeration methods that can be used to return the contract's state.

## Introduction

As mentioned in the [Upgrade a Contract](/docs/tutorials/contracts/nfts/upgrade-contract/) tutorial, you can deploy patches and fixes to smart contracts. This time, you'll use that knowledge to implement the `nft_tokens` and `nft_supply_for_owner` enumeration functions.

To get started, switch to the `2.minting` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial/).
If you haven't cloned it yet, refer to the [Contract Architecture](/docs/tutorials/contracts/nfts/skeleton#building-the-skeleton) to check out the repository.

```bash
git checkout 2.minting
```

:::tip
If you wish to see the finished code for this _Enumeration_ tutorial, you can find it on the `3.enumeration` branch.
:::

## Modifications to the contract

To add the functions, start by opening the  `src/enumeration.rs` file, and look for the `nft_token` function place holder. 

**nft_token**

This function should look for NFT tokens stored on the contract regardless of the owner, and return a list using pagination.
If the user provides a `from_index` parameter, the function shall use it and start from there; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching the specified amount of tokens.

:::tip
For the pagination, Rust has useful methods for skipping to a starting index and taking the first `n` elements of an iterator.
:::

```rust reference
https://github.com/near-examples/nft-tutorial/tree/3.enumeration/nft-contract/src/enumeration.rs#L6-L24
```

**nft_supply_for_owner**

This function should look for all the non-fungible tokens for a user-defined owner, and return the length of the result set.
If there isn't a set of tokens for the provided `AccountID`, then the function shall return `0`.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/3.enumeration/nft-contract/src/enumeration.rs#L26-L41
```

Next, you can use the CLI to query these new methods and validate that they work correctly.

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the necessary logic for `nft_tokens_for_owner`, it's time to build and re-deploy the contract to your account. Using the build script, deploy the contract as you did in the previous tutorials:

```bash
yarn build
near deploy --wasmFile out/main.wasm --accountId $NFT_CONTRACT_ID
```

This should output a warning saying that the account has a deployed contract and will ask if you'd like to proceed. Simply type `y` and hit enter.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

## Enumerating tokens

Once the updated contract has been redeployed, you can test and see if these new functions work as expected.

### NFT tokens

To query the non-fungible tokens on the contract, and get up to `50` NFTs starting from the `10`th item, call the `nft_tokens` function with the following parameters:

```bash
near call $NFT_CONTRACT_ID nft_tokens '{"from_index": 10, "limit": 50}' --accountId $NFT_CONTRACT_ID
```

This command should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
[
]
```

</p>
</details>

### Tokens by owner

To get the total supply of NFTs owned by the `goteam.testnet` account, call the `nft_supply_for_owner` function and set the `account_id` parameter:

```bash
near call $NFT_CONTRACT_ID nft_supply_for_owner '{"account_id": "goteam.testnet"}' --accountId $NFT_CONTRACT_ID
```

This should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
[
]
```

</p>
</details>

## Conclusion

In this tutorial, you have added two [new enumeration functions](/docs/tutorials/contracts/nfts/enumeration#modifications-to-the-contract), and now you have a basic NFT smart contract with minting and enumeration methods in place. After implementing these modifications, you redeployed the smart contract and tested the functions using the CLI.

In the next tutorial, you'll implement the core functions needed to allow users to transfer the minted tokens.

:::info Remeber
If you want to see the finished code from this tutorial, you can checkout the `3.enumeration` branch. 
:::

<!--
## Bonus track

Have some sort of random NFT displayer frontend
-->
