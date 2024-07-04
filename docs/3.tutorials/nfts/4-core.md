---
id: core
title: Transfers
---
import {Github} from "@site/src/components/codetabs"

In this tutorial you'll learn how to implement NFT transfers as defined in the [core standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) into your smart contract.

We will define two methods for transferring NFTs:
- `nft_transfer`: that transfers ownership of an NFT from one account to another
- `nft_transfer_call`: that transfers an NFT to a "receiver" and calls a method on the receiver's account

:::tip Why two transfer methods?

`nft_transfer` is a simple transfer between two user, while `nft_transfer_call` allows you to **attach an NFT to a function call**

:::

---

## Introduction {#introduction}

Up until this point, you've created a simple NFT smart contract that allows users to mint tokens and view information using the [enumeration standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). Today, you'll expand your smart contract to allow for users to not only mint tokens, but transfer them as well.

As we did in the [minting tutorial](2-minting.md), let's break down the problem into multiple subtasks to make our lives easier. When a token is minted, information is stored in 3 places:

- **tokens_per_owner**: set of tokens for each account.
- **tokens_by_id**: maps a token ID to a `Token` object.
- **token_metadata_by_id**: maps a token ID to its metadata.

Let's now consider the following scenario. If Benji owns token A and wants to transfer it to Mike as a birthday gift, what should happen? First of all, token A should be removed from Benji's set of tokens and added to Mike's set of tokens.

If that's the only logic you implement, you'll run into some problems. If you were to do a `view` call to query for information about that token after it's been transferred to Mike, it would still say that Benji is the owner.

This is because the contract is still mapping the token ID to the old `Token` object that contains the `owner_id` field set to Benji's account ID. You still have to change the `tokens_by_id` data structure so that the token ID maps to a new `Token` object which has Mike as the owner.

With that being said, the final process for when an owner transfers a token to a receiver should be the following:

- Remove the token from the owner's set.
- Add the token to the receiver's set.
- Map a token ID to a new `Token` object containing the correct owner.

:::note
You might be curious as to why we don't edit the `token_metadata_by_id` field. This is because no matter who owns the token, the token ID will always map to the same metadata. The metadata should never change and so we can just leave it alone.
:::

At this point, you're ready to move on and make the necessary modifications to your smart contract.

---

## Modifications to the contract

Let's start our journey in the `nft-contract-skeleton/src/nft_core.rs` file.

### Transfer function {#transfer-function}

You'll start by implementing the `nft_transfer` logic. This function will transfer the specified `token_id` to the `receiver_id` with an optional `memo` such as `"Happy Birthday Mike!"`.

<Github language="rust" start="60" end="80" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

There are a couple things to notice here. Firstly, we've introduced a new function called `assert_one_yocto()`, which ensures the user has attached exactly one yoctoNEAR to the call. This is a [security measure](../../2.build/2.smart-contracts/security/one_yocto.md) to ensure that the user is signing the transaction with a [full access key](../../1.concepts/protocol/access-keys.md).

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internal_transfer` method. This will perform all the logic necessary to transfer an NFT.

<hr class="subsection" />

### Internal helper functions

Let's quickly move over to the `nft-contract/src/internal.rs` file so that you can implement the `assert_one_yocto()` and `internal_transfer` methods.

Let's start with the easier one, `assert_one_yocto()`.

#### assert_one_yocto

<Github language="rust" start="14" end="21" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

#### internal_transfer

It's now time to explore the `internal_transfer` function which is the core of this tutorial. This function takes the following parameters:

- **sender_id**: the account that's attempting to transfer the token.
- **receiver_id**: the account that's receiving the token.
- **token_id**: the token ID being transferred.
- **memo**: an optional memo to include.

The first thing we have to do is to make sure that the sender is authorized to transfer the token. In this case, we just make sure that the sender is the owner of the token. We do that by getting the `Token` object using the `token_id` and making sure that the sender is equal to the token's `owner_id`.

Second, we remove the token ID from the sender's list and add the token ID to the receiver's list of tokens. Finally, we create a new `Token` object with the receiver as the owner and remap the token ID to that newly created object.

We want to create this function within the contract implementation (below the `internal_add_token_to_owner` you created in the minting tutorial).

<Github language="rust" start="96" end="132" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

Now let's look at the function called `internal_remove_token_from_owner`. That function implements the functionality for removing a token ID from an owner's set.

In the remove function, we get the set of tokens for a given account ID and then remove the passed in token ID. If the account's set is empty after the removal, we simply remove the account from the `tokens_per_owner` data structure.

<Github language="rust" start="71" end="94" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

Your `internal.rs` file should now have the following outline:

```
internal.rs
├── hash_account_id
├── assert_one_yocto
├── refund_deposit
└── impl Contract
    ├── internal_add_token_to_owner
    ├── internal_remove_token_from_owner
    └── internal_transfer
```

<hr class="subsection" />

### Transfer call function {#transfer-call-function}

The idea behind the `nft_transfer_call` function is to transfer an NFT to a receiver while calling a method on the receiver's contract all in the same transaction.

This way, we can effectively **attach an NFT to a function call**.

<Github language="rust" start="82" end="126" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

The function will first assert that the caller attached exactly 1 yocto for security purposes. It will then transfer the NFT using `internal_transfer` and start the cross contract call. It will call the method `nft_on_transfer` on the `receiver_id`'s contract, and create a promise to call back `nft_resolve_transfer` with the result. This is a very common workflow when dealing with [cross contract calls](../../2.build/2.smart-contracts/anatomy/crosscontract.md).

As dictated by the core standard, the function we are calling (`nft_on_transfer`) needs to return a boolean stating whether or not you should return the NFT to it's original owner.

<Github language="rust" start="146" end="201" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

If `nft_on_transfer` returned true or the called failed, you should send the token back to it's original owner. On the contrary, if false was returned, no extra logic is needed.

As for the return value of our function `nft_resolve_transfer`, the standard dictates that the function should return a boolean indicating whether or not the receiver successfully received the token or not.

This means that if `nft_on_transfer` returned true, you should return false. This is because if the token is being returned its original owner, the `receiver_id` didn't successfully receive the token in the end. On the contrary, if `nft_on_transfer` returned false, you should return true since we don't need to return the token and thus the `receiver_id` successfully owns the token.

With that finished, you've now successfully added the necessary logic to allow users to transfer NFTs. It's now time to deploy and do some testing.

---

## Redeploying the contract {#redeploying-contract}

Using cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

:::tip
If you haven't completed the previous tutorials and are just following along with this one, simply create an account and login with your CLI using `near login`. You can then export an environment variable `export NFT_CONTRACT_ID=YOUR_ACCOUNT_ID_HERE`.
:::

---

## Testing the new changes {#testing-changes}

Now that you've deployed a patch fix to the contract, it's time to move onto testing. Using the previous NFT contract where you had minted a token to yourself, you can test the `nft_transfer` method. If you transfer the NFT, it should be removed from your account's collectibles displayed in the wallet. In addition, if you query any of the enumeration functions, it should show that you are no longer the owner.

Let's test this out by transferring an NFT to the account `benjiman.testnet` and seeing if the NFT is no longer owned by you.

<hr class="subsection" />

### Testing the transfer function

:::note
This means that the NFT won't be recoverable unless the account `benjiman.testnet` transfers it back to you. If you don't want your NFT lost, make a new account and transfer the token to that account instead.
:::

If you run the following command, it will transfer the token `"token-1"` to the account `benjiman.testnet` with the memo `"Go Team :)"`. Take note that you're also attaching exactly 1 yoctoNEAR by using the `--depositYocto` flag.

:::tip
If you used a different token ID in the previous tutorials, replace `token-1` with your token ID.
:::

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

If you now query for all the tokens owned by your account, that token should be missing. Similarly, if you query for the list of tokens owned by `benjiman.testnet`, that account should now own your NFT.

<hr class="subsection" />

### Testing the transfer call function

Now that you've tested the `nft_transfer` function, it's time to test the `nft_transfer_call` function. If you try to transfer an NFT to a receiver that does **not** implement the `nft_on_transfer` function, the contract will panic and the NFT will **not** be transferred. Let's test this functionality below.

First mint a new NFT that will be used to test the transfer call functionality.

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Now that you've minted the token, you can try to transfer the NFT to the account `no-contract.testnet` which as the name suggests, doesn't have a contract. This means that the receiver doesn't implement the `nft_on_transfer` function and the NFT should remain yours after the transaction is complete.

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_transfer_call json-args '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

If you query for your tokens, you should still have `token-2` and at this point, you're finished!

---

## Conclusion

In this tutorial, you learned how to expand an NFT contract past the minting functionality and you added ways for users to transfer NFTs. You [broke down](#introduction) the problem into smaller, more digestible subtasks and took that information and implemented both the [NFT transfer](#transfer-function) and [NFT transfer call](#transfer-call-function) functions. In addition, you deployed another [patch fix](#redeploying-contract) to your smart contract and [tested](#testing-changes) the transfer functionality.

In the [next tutorial](5-approval.md), you'll learn about the approval management system and how you can approve others to transfer tokens on your behalf.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
