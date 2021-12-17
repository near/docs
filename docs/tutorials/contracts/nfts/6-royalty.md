---
id: royalty
title: Royalty
sidebar_label: Royalty
---

In this tutorial you'll continue building your non-fungible token (NFT) smart contract, and learn how to implement perpetual royalties into your NFTs. This will allow people to get a percentage of the purchase price when an NFT is sold.

## Introduction

By now, you should have a fully fledged NFT contract, except for the royalties support.
To get started, either switch to the `5.approvals` branch from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.

```bash
git checkout 5.approvals
```

:::tip
If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial/) and checkout the `5.approvals` branch to follow along.
:::

## Thinking about the problem

In order to implement the functionality, you first need to understand how NFTs are sold. In the previous tutorial, you saw how someone with an NFT could list it on a marketplace using the `nft_approve` function by passing in a message that could be properly decoded. When a user purchases your NFT on the marketplace, what happens?

Using the knowledge you have now, a reasonable conclusion would be to say that the marketplace transfers the NFT to the buyer by performing a cross-contract call and invokes the NFT contracts `nft_transfer` method. Once that function finishes, the marketplace would pay the seller for the correct amount that the buyer paid.

Let's now think about how this can be expanded to allow for a cut of the pay going to other accounts that aren't just the seller.

### Expanding the current solution

Since perpetual royalties will be on a per-token basis, it's safe to assume that you should be changing the `Token` and `JsonToken` structs. You need some way of keeping track of what percentage each account with a royalty should have. If you introduce a map of an account to an integer, that should do the trick.

Now, you need some way to relay that information to the marketplace. This method should be able to transfer the NFT exactly like the old solution but with the added benefit of telling the marketplace exactly what accounts should be paid what amounts. If you implement a method that transfers the NFT and then calculates exactly what accounts get paid and to what amount based on a passed-in balance, that should work nicely.

This is what the [royalty standards](https://nomicon.io/Standards/NonFungibleToken/Royalties.html) outlined. Let's now move on and modify our smart contract to introduce this behavior.

## Modifications to the contract

The first thing you'll want to do is add the royalty information to the structs. Open the `nft-contract/src/metadata.rs` file and add `royalty` to the `Token` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

Second, you'll want to add `royalty` to the `JsonToken` struct as well:

```rust
pub royalty: HashMap<AccountId, u32>,
```

### Internal helper function

**royalty_to_payout**

To simplify the payout calculation, let's add a helper `royalty_to_payout` function to `src/internal.rs`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/internal.rs#L5-L8
```

If you were to use the `royalty_to_payout` function and pass in `2000` as the `royalty_percentage` and an `amount_to_pay` of 1 NEAR, it would return a value of 0.2 NEAR.

### Royalties

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.rs` file, and modify the `nft_payout` function as follows:

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs#L23-L60
```

This function will loop through the token's royalty map and take the balance and convert that to a payout using the `royalty_to_payout` function you created earlier. It will give the owner of the token whatever is left from the total royalties. As an example:

You have a token with the following royalty field:

```rust
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

```rust
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

```rust reference
https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs#L64-L125
```

### Perpetual royalties

To add support for perpetual royalties, let's edit the `src/mint.rs` file. First, add an optional parameter for perpetual royalties. This is what will determine what percentage goes to which accounts when the NFT is purchased. You will also need to create and insert the royalty to be put in the `Token` object:

```rust reference
https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/mint.rs#L6-L60
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
