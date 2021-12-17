---
id: royalty
title: Royalty
sidebar_label: Royalty
---

In this tutorial you'll continue building your non-fungible token (NFT) smart contract, and learn how to implement the ability for NFTs to have royalties. This will allow people to get a percentage of the purchase price when an NFT is sold.

## Introduction

By now, you should have a fully fledged NFT contract, except for the royalties support.
To get started, either switch to the `5.approvals` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.

```bash
git checkout 5.approvals
```

:::tip
If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial/) and checkout the `5.approvals` branch to follow along.
:::

## Modifications to the contract

To include royalties in your NFT smart contract, let's start by adding the royalties to `src/metadata.rs`.
First, open the file and define the `Payout` type that you'll be returning as a part of the royalty standards.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/metadata.rs#L3-L8
```

Next, add `royalty` to the `Token` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

And add `royalty` to the `JsonToken` struct too:

```rust
pub royalty: HashMap<AccountId, u32>,
```

### Internal helper function

**royalty_to_payout**

To simplify the payout calculation, let's add a helper `royalty_to_payout` function to `src/internal.rs`.
This function will convert the `royalty_percentage` and `amount_to_pay` into a payout.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/internal.rs#L5-L8
```

### Royalties

**nft_payout**

Let's open the `src/royalty.rs` file, and add the `nft_payout` function to the `NonFungibleTokenCore` contract implementation.
This function will calculate the payout for a token given the passed in balance.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs#L23-L60
```

**nft_transfer_payout**

Next, let's fill in the `nft_transfer_payout` function that transfers the token to the receiver ID and returns the payout object that should be paid given the passed in balance.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs#L64-L125
```

### Perpetual royalties

To add support for perpetual royalties, let's edit the `src/mint.rs` file. First, add an optional parameter for perpetual royalties:

```rust
perpetual_royalties: Option<HashMap<AccountId, u32>>,
```

Next, edit the `Contract` implementation and create a `royalty` map to store the token. If perpetual royalties were passed into the function, insert the `account` and `amount` in the royalty map.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/mint.rs#L17-L28
```

Next, you can use the CLI to query the new `nft_payout` function and validate that it works correctly.

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the required logic for royalties, it's time to build and re-deploy the contract to your account.
Using the build script, deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile out/main.wasm --accountId $NFT_CONTRACT_ID
```

This should output a warning saying that the account has a deployed contract and will ask if you'd like to proceed. Simply type `y` and hit enter.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

Once the updated contract has been redeployed, you can test and see if the royalty feature work as expected.

### NFT payout

Let's calculate the payout for the `token-1` NFT, given a balance of 500N:

```bash
near view $NFT_CONTRACT_ID nft_payout '{"token_id": "token-1", "balance": 500, "max_len_payout": 100}'
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


## Conclusion

At this point you have everything you need for a fully functioning NFT contract to interact with marketplaces.
The last remaining standard that you could implement is the events standard. This allows indexers to know what functions are being called and make it easier and more reliable to keep track of information that can be used to populate the collectibles tab in the wallet for example.

:::info remember
If you want to see the finished code from this tutorial, you can checkout the `6.royalty` branch. 
:::

<!--
## Bonus track

Maybe extend the previous marketplace to introduce royalties now? Not sure.. 
-->
