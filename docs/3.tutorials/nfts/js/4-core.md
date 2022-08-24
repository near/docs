---
id: core
title: Core
sidebar_label: Core
---

In this tutorial you'll learn how to implement the [core standards](https://nomicon.io/Standards/NonFungibleToken/Core.html) into your smart contract. If you're joining us for the first time, feel free to clone [this repo](https://github.com/near-examples/nft-tutorial) and checkout the `3.enumeration` branch to follow along.

```bash
git checkout 3.enumeration
```

:::tip
If you wish to see the finished code for this _Core_ tutorial, you can find it on the `4.core` branch.
:::

## Introduction {#introduction}

Up until this point, you've created a simple NFT smart contract that allows users to mint tokens and view information using the [enumeration standards](https://nomicon.io/Standards/NonFungibleToken/Enumeration.html). Today, you'll expand your smart contract to allow for users to not only mint tokens, but transfer them as well.

As we did in the [minting tutorial](/tutorials/nfts/js/minting), let's break down the problem into multiple subtasks to make our lives easier. When a token is minted, information is stored in 3 places:

- **tokensPerOwner**: set of tokens for each account.
- **tokensById**: maps a token ID to a `Token` object.
- **tokenMetadataById**: maps a token ID to its metadata.

Let's now consider the following scenario. If Benji owns token A and wants to transfer it to Mike as a birthday gift, what should happen? First of all, token A should be removed from Benji's set of tokens and added to Mike's set of tokens.

If that's the only logic you implement, you'll run into some problems. If you were to do a `view` call to query for information about that token after it's been transferred to Mike, it would still say that Benji is the owner.

This is because the contract is still mapping the token ID to the old `Token` object that contains the `owner_id` field set to Benji's account ID. You still have to change the `tokensById` data structure so that the token ID maps to a new `Token` object which has Mike as the owner.

With that being said, the final process for when an owner transfers a token to a receiver should be the following:

- Remove the token from the owner's set.
- Add the token to the receiver's set.
- Map a token ID to a new `Token` object containing the correct owner.

:::note
You might be curious as to why we don't edit the `tokenMetadataById` field. This is because no matter who owns the token, the token ID will always map to the same metadata. The metadata should never change and so we can just leave it alone.
:::

At this point, you're ready to move on and make the necessary modifications to your smart contract.

## Modifications to the contract

Let's start our journey in the `nft-contract/src/nft_core.ts` file.

### Transfer function {#transfer-function}

You'll start by implementing the `nft_transfer` logic. This function will transfer the specified `token_id` to the `receiver_id` with an optional `memo` such as `"Happy Birthday Mike!"`. The core logic will be found in the `internalNftTransfer` function.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts#L37-L64
```

There are a couple things to notice here. Firstly, we've introduced a new method called `assertOneYocto()`. This method will ensure that the user has attached exactly one yoctoNEAR to the call. If a function requires a deposit, you need a full access key to sign that transaction. By adding the one yoctoNEAR deposit requirement, you're essentially forcing the user to sign the transaction with a full access key.

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internalTransfer` method. This will perform all the logic necessary to transfer an NFT.

### Internal helper functions

Let's quickly move over to the `nft-contract/src/internal.ts` file so that you can implement the `assertOneYocto()` and `internalTransfer` methods.

Let's start with the easier one, `assertOneYocto()`.

#### assertOneYocto

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts#L38-L41
```

#### internal_transfer

It's now time to implement the `internalTransfer` function which is the core of this tutorial. This function will take the following parameters:

- **senderId**: the account that's attempting to transfer the token.
- **receiverId**: the account that's receiving the token.
- **tokenId**: the token ID being transferred.
- **memo**: an optional memo to include.

The first thing you'll want to do is to make sure that the sender is authorized to transfer the token. In this case, you'll just make sure that the sender is the owner of the token. You'll do that by getting the `Token` object using the `token_id` and making sure that the sender is equal to the token's `owner_id`.

Second, you'll remove the token ID from the sender's list and add the token ID to the receiver's list of tokens. Finally, you'll create a new `Token` object with the receiver as the owner and remap the token ID to that newly created object.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts#L80-L114
```

You've previously implemented functionality for adding a token ID to an owner's set but you haven't created the functionality for removing a token ID from an owner's set. Let's do that now by created a new function called `internalRemoveTokenFromOwner` which we'll place right above our `internalTransfer` and below the `internalAddTokenToOwner` function.

In the remove function, you'll get the set of tokens for a given account ID and then remove the passed in token ID. If the account's set is empty after the removal, you'll simply remove the account from the `tokensPerOwner` data structure.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts#L60-L78
```

With these internal functions complete, the logic for transferring NFTs is finished. It's now time to move on and implement `nft_transfer_call`, one of the most integral yet complicated functions of the standard.

### Transfer call function {#transfer-call-function}

Let's consider the following scenario. An account wants to transfer an NFT to a smart contract for performing a service. The traditional approach would be to use an approval management system, where the receiving contract is granted the ability to transfer the NFT to themselves after completion. You'll learn more about the approval management system in the [approvals section](/tutorials/nfts/js/approvals) of the tutorial series.

This allowance workflow takes multiple transactions. If we introduce a “transfer and call” workflow baked into a single transaction, the process can be greatly improved.

For this reason, we have a function `nft_transfer_call` which will transfer an NFT to a receiver and also call a method on the receiver's contract all in the same transaction.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts#L66-L125
```

The function will first assert that the caller attached exactly 1 yocto for security purposes. It will then transfer the NFT using `internalTransfer` and start the cross contract call. It will call the method `nft_on_transfer` on the `receiver_id`'s contract which returns a promise. After the promise finishes executing, the function `nft_resolve_transfer` is called. This is a very common workflow when dealing with cross contract calls. You first initiate the call and wait for it to finish executing. You then invoke a function that resolves the result of the promise and act accordingly.

In our case, when calling `nft_on_transfer`, that function will return whether or not you should return the NFT to it's original owner in the form of a boolean. This is logic will be executed in the `internalResolveTransfer` function.

```js reference
https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts#L127-L187
```

If `nft_on_transfer` returned true, you should send the token back to it's original owner. On the contrary, if false was returned, no extra logic is needed. As for the return value of `nft_resolve_transfer`, the standard dictates that the function should return a boolean indicating whether or not the receiver successfully received the token or not.

This means that if `nft_on_transfer` returned true, you should return false. This is because if the token is being returned to its original owner. The `receiver_id` didn't successfully receive the token in the end. On the contrary, if `nft_on_transfer` returned false, you should return true since we don't need to return the token and thus the `receiver_id` successfully owns the token.

With that finished, you've now successfully added the necessary logic to allow users to transfer NFTs. It's now time to deploy and do some testing.

## Redeploying the contract {#redeploying-contract}

Using the build script, build and deploy the contract as you did in the previous tutorials:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $NFT_CONTRACT_ID
```

This should output a warning saying that the account has a deployed contract and will ask if you'd like to proceed. Simply type `y` and hit enter.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

:::tip
If you haven't completed the previous tutorials and are just following along with this one, simply create an account and login with your CLI using `near login`. You can then export an environment variable `export NFT_CONTRACT_ID=YOUR_ACCOUNT_ID_HERE`.
:::

## Testing the new changes {#testing-changes}

Now that you've deployed a patch fix to the contract, it's time to move onto testing. Using the previous NFT contract where you had minted a token to yourself, you can test the `nft_transfer` method. If you transfer the NFT, it should be removed from your account's collectibles displayed in the wallet. In addition, if you query any of the enumeration functions, it should show that you are no longer the owner.

Let's test this out by transferring an NFT to the account `benjiman.testnet` and seeing if the NFT is no longer owned by you.

### Testing the transfer function

:::note
This means that the NFT won't be recoverable unless the account `benjiman.testnet` transfers it back to you. If you don't want your NFT lost, make a new account and transfer the token to that account instead.
:::

If you run the following command, it will transfer the token `"token-1"` to the account `benjiman.testnet` with the memo `"Go Team :)"`. Take note that you're also attaching exactly 1 yoctoNEAR by using the `--depositYocto` flag. 

:::tip
If you used a different token ID in the previous tutorials, replace `token-1` with your token ID.
:::

```bash
near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

If you now query for all the tokens owned by your account, that token should be missing. Similarly, if you query for the list of tokens owned by `benjiman.testnet`, that account should now own your NFT.

### Testing the transfer call function

Now that you've tested the `nft_transfer` function, it's time to test the `nft_transfer_call` function. If you try to transfer an NFT to a receiver that does **not** implement the `nft_on_transfer` function, the contract will panic and the NFT will **not** be transferred. Let's test this functionality below.

First mint a new NFT that will be used to test the transfer call functionality.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1
```

Now that you've minted the token, you can try to transfer the NFT to the account `no-contract.testnet` which as the name suggests, doesn't have a contract. This means that the receiver doesn't implement the `nft_on_transfer` function and the NFT should remain yours after the transaction is complete.

```bash
near call $NFT_CONTRACT_ID nft_transfer_call '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' --accountId $NFT_CONTRACT_ID --depositYocto 1 --gas 200000000000000
```

If you query for your tokens, you should still have `token-2` and at this point, you're finished!

## Conclusion

In this tutorial, you learned how to expand an NFT contract past the minting functionality and you added ways for users to transfer NFTs. You [broke down](#introduction) the problem into smaller, more digestible subtasks and took that information and implemented both the [NFT transfer](#transfer-function) and [NFT transfer call](#transfer-call-function) functions. In addition, you deployed another [patch fix](#redeploying-contract) to your smart contract and [tested](#testing-changes) the transfer functionality.

In the [next tutorial](/tutorials/nfts/js/approvals), you'll learn about the approval management system and how you can approve others to transfer tokens on your behalf.

<!--
## Bonus track

I’m not sure what we can do here - maybe some sort of gifting tutorial which the theme of NFT christmas presents? Haha (we can have josh’s testnet account be the grinch who tries to steal NFTs).
-->
