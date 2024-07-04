---
id: enumeration
title: Enumeration
sidebar_label: Enumeration
---
import {Github} from "@site/src/components/codetabs"

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

<Github language="rust" start="5" end="9" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_token**

This function should return a paginated list of `JsonTokens` that are stored on the contract regardless of their owners.
If the user provides a `from_index` parameter, you should use that as the starting point for which to start iterating through tokens; otherwise it should start from the beginning. Likewise, if the user provides a `limit` parameter, the function shall stop after reaching either the limit or the end of the list.

:::tip
Rust has useful methods for pagination, allowing you to skip to a starting index and taking the first `n` elements of an iterator.
:::

<Github language="rust" start="11" end="26" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

**nft_supply_for_owner**

This function should look for all the non-fungible tokens for a user-defined owner, and return the length of the resulting set.
If there isn't a set of tokens for the provided `AccountID`, then the function shall return `0`.

<Github language="rust" start="28" end="43" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

Next, you can use the CLI to query these new methods and validate that they work correctly.

---

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the necessary logic for `nft_tokens_for_owner`, it's time to build and re-deploy the contract to your account. Using the cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

---

## Enumerating tokens

Once the updated contract has been redeployed, you can test and see if these new functions work as expected.

### NFT tokens

Let's query for a list of non-fungible tokens on the contract. Use the following command to query for the information of up to 50 NFTs starting from the 10th item:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_tokens json-args '{"from_index": "10", "limit": 50}' network-config testnet now
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

<hr class="subsection" />

### Tokens by owner

To get the total supply of NFTs owned by the `goteam.testnet` account, call the `nft_supply_for_owner` function and set the `account_id` parameter:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_supply_for_owner json-args '{"account_id": "goteam.testnet"}' network-config testnet now
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

---

## Conclusion

In this tutorial, you have added two [new enumeration functions](/tutorials/nfts/enumeration#modifications-to-the-contract), and now you have a basic NFT smart contract with minting and enumeration methods in place. After implementing these modifications, you redeployed the smart contract and tested the functions using the CLI.

In the [next tutorial](4-core.md), you'll implement the core functions needed to allow users to transfer the minted tokens.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
