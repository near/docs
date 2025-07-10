---
id: enumeration
title: Enumeration
sidebar_label: Enumeration
---



In the previous tutorials, you looked at ways to integrate the minting functionality into a skeleton smart contract. In order to get your NFTs to show in the wallet, you also had to deploy a patch fix that implemented one of the enumeration methods. In this tutorial, you'll expand on and finish the rest of the enumeration methods as per the [standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration).

Now you'll extend the NFT smart contract and add a couple of enumeration methods that can be used to return the contract's state.

---

## Introduction

As mentioned in the [Upgrade a Contract](2-upgrade.md) tutorial, you can deploy patches and fixes to smart contracts. This time, you'll use that knowledge to implement the `nft_total_supply`, `nft_tokens` and `nft_supply_for_owner` enumeration functions.

---

## Modifications to the contract

Let's start by opening the  `src/enumeration.rs` file and locating the empty `nft_total_supply` function.

**nft_total_supply**

This function should return the total number of NFTs stored on the contract. You can easily achieve this functionality by simply returning the length of the `nft_metadata_by_id` data structure.

```
    //Query for the total supply of NFTs on the contract
    pub fn nft_total_supply(&self) -> U128 {
        //return the length of the token metadata by ID
        U128(self.token_metadata_by_id.len().into())
    }

```

**nft_token**

This function should return a paginated list of `JsonTokens` that are stored on the contract regardless of their owners.
If the user provides a `from_index` parameter, you should use that as the starting point for which to start iterating through tokens; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching either the limit or the end of the list.

:::tip
Rust has useful methods for pagination, allowing you to skip to a starting index and taking the first `n` elements of an iterator.
:::

```
    //Query for nft tokens on the contract regardless of the owner using pagination
    pub fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<JsonToken> {
        //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));

        //iterate through each token using an iterator
        self.token_metadata_by_id
            .keys()
            //skip to the index we specified in the start variable
            .skip(start as usize)
            //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
            .take(limit.unwrap_or(50) as usize)
            //we'll map the token IDs which are strings into Json Tokens
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            //since we turned the keys into an iterator, we need to turn it back into a vector to return
            .collect()
    }
```

**nft_supply_for_owner**

This function should look for all the non-fungible tokens for a user-defined owner, and return the length of the resulting set.
If there isn't a set of tokens for the provided `AccountID`, then the function shall return `0`.

```

    //get the total supply of NFTs for a given owner
    pub fn nft_supply_for_owner(&self, account_id: AccountId) -> U128 {
        //get the set of tokens for the passed in owner
        let tokens_for_owner_set = self.tokens_per_owner.get(&account_id);

        //if there is some set of tokens, we'll return the length
        if let Some(tokens_for_owner_set) = tokens_for_owner_set {
            U128(tokens_for_owner_set.len().into())
        } else {
            //if there isn't a set of tokens for the passed in account ID, we'll return 0
            U128(0)
        }
    }

    //Query for all the tokens for an owner
    pub fn nft_tokens_for_owner(
```

Next, you can use the CLI to query these new methods and validate that they work correctly.

---

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the necessary logic for `nft_tokens_for_owner`, it's time to build and re-deploy the contract to your account. Using the cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

---

## Enumerating tokens

Once the updated contract has been redeployed, you can test and see if these new functions work as expected.

### NFT tokens

Let's query for a list of non-fungible tokens on the contract. Use the following command to query for the information of up to 50 NFTs starting from the 10th item:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $NFT_CONTRACT_ID nft_tokens '{"from_index": "10", "limit": 50}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $NFT_CONTRACT_ID nft_tokens json-args '{"from_index": "10", "limit": 50}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This command should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
[]
```

</p>
</details>

<hr class="subsection" />

### Tokens by owner

To get the total supply of NFTs owned by the `goteam.testnet` account, call the `nft_supply_for_owner` function and set the `account_id` parameter:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $NFT_CONTRACT_ID nft_supply_for_owner '{"account_id": "goteam.testnet"}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $NFT_CONTRACT_ID nft_supply_for_owner json-args '{"account_id": "goteam.testnet"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

<details>
<summary>Example response: </summary>
<p>

```json
0
```

</p>
</details>

---

## Conclusion

In this tutorial, you have added two [new enumeration functions](/tutorials/nfts/enumeration#modifications-to-the-contract), and now you have a basic NFT smart contract with minting and enumeration methods in place. After implementing these modifications, you redeployed the smart contract and tested the functions using the CLI.

In the [next tutorial](4-core.md), you'll implement the core functions needed to allow users to transfer the minted tokens.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
