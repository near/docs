---
id: royalty
title: Royalty
sidebar_label: Royalty
description: "In this tutorial you'll continue building your non-fungible token (NFT) smart contract, and learn how to implement perpetual royalties into your NFTs. This will allow people to get a percentage of the purchase price when an NFT is sold."
---
import {Github} from "@site/src/components/codetabs";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

<Github language="js" start="106" end="166" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/metadata.ts" />

### Internal helper function

**royaltyToPayout**

To simplify the payout calculation, let's add a helper `royaltyToPayout` function to `src/internal.ts`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

<Github language="js" start="13" end="16" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/internal.ts" />

If you were to use the `royaltyToPayout` function and pass in `2000` as the `royaltyPercentage` and an `amountToPay` of 1 NEAR, it would return a value of 0.2 NEAR.

### Royalties

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.ts` file, and modify the `internalNftPayout` function as shown.

<Github language="js" start="7" end="53" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/royalty.ts" />

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

<Github language="js" start="55" end="121" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/royalty.ts" />

### Perpetual royalties

To add support for perpetual royalties, let's edit the `src/mint.ts` file. First, add an optional parameter for perpetual royalties. This is what will determine what percentage goes to which accounts when the NFT is purchased. You will also need to create and insert the royalty to be put in the `Token` object:

<Github language="js" start="7" end="64" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/mint.ts" />

### Adding royalty object to struct implementations

Since you've added a new field to your `Token` and `JsonToken` structs, you need to edit your implementations accordingly. Move to the `nft-contract/src/internal.ts` file and edit the part of your `internalTransfer` function that creates the new `Token` object:

<Github language="js" start="150" end="158" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/internal.ts" />

Once that's finished, move to the `nft-contract/src/nft_core.ts` file. You need to edit your implementation of `internalNftToken` so that the `JsonToken` sends back the new royalty information.

<Github language="js" start="10" end="37" url="https://github.com/near-examples/nft-tutorial-js/blob/6.royalty/src/nft-contract/nft_core.ts" />

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
