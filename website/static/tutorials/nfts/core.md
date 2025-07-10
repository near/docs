---
id: core
title: Transfers
---



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

```
        //get the sender to transfer the token from the sender to the receiver
        let sender_id = env::predecessor_account_id();

        //call the internal transfer method
        self.internal_transfer(&sender_id, &receiver_id, &token_id, memo);
    }

    //implementation of the transfer call method. This will transfer the NFT and call a method on the receiver_id contract
    #[payable]
    fn nft_transfer_call(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        memo: Option<String>,
        msg: String,
    ) -> PromiseOrValue<bool> {
        //assert that the user attached exactly 1 yocto for security reasons.
        assert_one_yocto();

        //get the sender ID
        let sender_id = env::predecessor_account_id();

```

There are a couple things to notice here. Firstly, we've introduced a new function called `assert_one_yocto()`, which ensures the user has attached exactly one yoctoNEAR to the call. This is a [security measure](../../smart-contracts/security/one_yocto.md) to ensure that the user is signing the transaction with a [full access key](../../protocol/access-keys.md).

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internal_transfer` method. This will perform all the logic necessary to transfer an NFT.

<hr class="subsection" />

### Internal helper functions

Let's quickly move over to the `nft-contract/src/internal.rs` file so that you can implement the `assert_one_yocto()` and `internal_transfer` methods.

Let's start with the easier one, `assert_one_yocto()`.

#### assert_one_yocto

```
//used to make sure the user attached exactly 1 yoctoNEAR
pub(crate) fn assert_one_yocto() {
    assert_eq!(
        env::attached_deposit(),
        NearToken::from_yoctonear(1),
        "Requires attached deposit of exactly 1 yoctoNEAR",
    )
}

```

#### internal_transfer

It's now time to explore the `internal_transfer` function which is the core of this tutorial. This function takes the following parameters:

- **sender_id**: the account that's attempting to transfer the token.
- **receiver_id**: the account that's receiving the token.
- **token_id**: the token ID being transferred.
- **memo**: an optional memo to include.

The first thing we have to do is to make sure that the sender is authorized to transfer the token. In this case, we just make sure that the sender is the owner of the token. We do that by getting the `Token` object using the `token_id` and making sure that the sender is equal to the token's `owner_id`.

Second, we remove the token ID from the sender's list and add the token ID to the receiver's list of tokens. Finally, we create a new `Token` object with the receiver as the owner and remap the token ID to that newly created object.

We want to create this function within the contract implementation (below the `internal_add_token_to_owner` you created in the minting tutorial).

```
    //transfers the NFT to the receiver_id (internal method and can't be called directly via CLI).
    pub(crate) fn internal_transfer(
        &mut self,
        sender_id: &AccountId,
        receiver_id: &AccountId,
        token_id: &TokenId,
        memo: Option<String>,
    ) -> Token {
        //get the token object by passing in the token_id
        let token = self.tokens_by_id.get(token_id).expect("No token");

        //we make sure that the sender isn't sending the token to themselves
        assert_ne!(
            &token.owner_id, receiver_id,
            "The token owner and the receiver should be different"
        );

        //we remove the token from it's current owner's set
        self.internal_remove_token_from_owner(&token.owner_id, token_id);
        //we then add the token to the receiver_id's set
        self.internal_add_token_to_owner(receiver_id, token_id);

        //we create a new token struct 
        let new_token = Token {
            owner_id: receiver_id.clone(),
        };
        //insert that new token into the tokens_by_id, replacing the old entry 
        self.tokens_by_id.insert(token_id, &new_token);
        
        //if there was some memo attached, we log it. 
        if let Some(memo) = memo.as_ref() {
            env::log_str(&format!("Memo: {}", memo).to_string());
        }

        //return the previous token object that was transferred.
        token
    }
} 
```

Now let's look at the function called `internal_remove_token_from_owner`. That function implements the functionality for removing a token ID from an owner's set.

In the remove function, we get the set of tokens for a given account ID and then remove the passed in token ID. If the account's set is empty after the removal, we simply remove the account from the `tokens_per_owner` data structure.

```
    //remove a token from an owner (internal method and can't be called directly via CLI).
    pub(crate) fn internal_remove_token_from_owner(
        &mut self,
        account_id: &AccountId,
        token_id: &TokenId,
    ) {
        //we get the set of tokens that the owner has
        let mut tokens_set = self
            .tokens_per_owner
            .get(account_id)
            //if there is no set of tokens for the owner, we panic with the following message:
            .expect("Token should be owned by the sender");

        //we remove the the token_id from the set of tokens
        tokens_set.remove(token_id);

        //if the token set is now empty, we remove the owner from the tokens_per_owner collection
        if tokens_set.is_empty() {
            self.tokens_per_owner.remove(account_id);
        } else {
            //if the token set is not empty, we simply insert it back for the account ID. 
            self.tokens_per_owner.insert(account_id, &tokens_set);
        }
    }

```

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

```
        //transfer the token and get the previous token object
        let previous_token =
            self.internal_transfer(&sender_id, &receiver_id, &token_id, memo.clone());

        // Initiating receiver's call and the callback
        // Defaulting GAS weight to 1, no attached deposit, and static GAS equal to the GAS for nft on transfer.
        ext_non_fungible_token_receiver::ext(receiver_id.clone())
            .with_static_gas(GAS_FOR_NFT_ON_TRANSFER)
            .nft_on_transfer(
                sender_id,
                previous_token.owner_id.clone(),
                token_id.clone(),
                msg,
            )
            // We then resolve the promise and call nft_resolve_transfer on our own contract
            .then(
                // Defaulting GAS weight to 1, no attached deposit, and static GAS equal to the GAS for resolve transfer
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_RESOLVE_TRANSFER)
                    .nft_resolve_transfer(previous_token.owner_id, receiver_id, token_id),
            )
            .into()
    }

    //get the information for a specific token ID
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken> {
        //if there is some token ID in the tokens_by_id collection
        if let Some(token) = self.tokens_by_id.get(&token_id) {
            //we'll get the metadata for that token
            let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
            //we return the JsonToken (wrapped by Some since we return an option)
            Some(JsonToken {
                token_id,
                owner_id: token.owner_id,
                metadata,
            })
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}

#[near_bindgen]
impl NonFungibleTokenResolver for Contract {
    //resolves the cross contract call when calling nft_on_transfer in the nft_transfer_call method
```

The function will first assert that the caller attached exactly 1 yocto for security purposes. It will then transfer the NFT using `internal_transfer` and start the cross contract call. It will call the method `nft_on_transfer` on the `receiver_id`'s contract, and create a promise to call back `nft_resolve_transfer` with the result. This is a very common workflow when dealing with [cross contract calls](../../smart-contracts/anatomy/crosscontract.md).

As dictated by the core standard, the function we are calling (`nft_on_transfer`) needs to return a boolean stating whether or not you should return the NFT to its original owner.

```
                    */
                    return true;
                }
            }
        }

        //get the token object if there is some token object
        let mut token = if let Some(token) = self.tokens_by_id.get(&token_id) {
            if token.owner_id != receiver_id {
                // The token is not owner by the receiver anymore. Can't return it.
                return true;
            }
            token
        //if there isn't a token object, it was burned and so we return true
        } else {
            return true;
        };

        //if at the end, we haven't returned true, that means that we should return the token to it's original owner
        log!(
            "Return {} from @{} to @{}",
            token_id,
            receiver_id,
            previous_owner_id
        );

        //we remove the token from the receiver
        self.internal_remove_token_from_owner(&receiver_id, &token_id);
        //we add the token to the original owner
        self.internal_add_token_to_owner(&previous_owner_id, &token_id);

        //we change the token struct's owner to be the original owner
        token.owner_id = previous_owner_id.clone();
        //we inset the token back into the tokens_by_id collection
        self.tokens_by_id.insert(&token_id, &token);

        //return false
        false
    }
}

```

If `nft_on_transfer` returned true or the called failed, you should send the token back to its original owner. On the contrary, if false was returned, no extra logic is needed.

As for the return value of our function `nft_resolve_transfer`, the standard dictates that the function should return a boolean indicating whether or not the receiver successfully received the token or not.

This means that if `nft_on_transfer` returned true, you should return false. This is because if the token is being returned its original owner, the `receiver_id` didn't successfully receive the token in the end. On the contrary, if `nft_on_transfer` returned false, you should return true since we don't need to return the token and thus the `receiver_id` successfully owns the token.

With that finished, you've now successfully added the necessary logic to allow users to transfer NFTs. It's now time to deploy and do some testing.

---

## Redeploying the contract {#redeploying-contract}

Using cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
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

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' --gas 100000000000000 --depositYocto 1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you now query for all the tokens owned by your account, that token should be missing. Similarly, if you query for the list of tokens owned by `benjiman.testnet`, that account should now own your NFT.

<hr class="subsection" />

### Testing the transfer call function

Now that you've tested the `nft_transfer` function, it's time to test the `nft_transfer_call` function. If you try to transfer an NFT to a receiver that does **not** implement the `nft_on_transfer` function, the contract will panic and the NFT will **not** be transferred. Let's test this functionality below.

First mint a new NFT that will be used to test the transfer call functionality.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

Now that you've minted the token, you can try to transfer the NFT to the account `no-contract.testnet` which as the name suggests, doesn't have a contract. This means that the receiver doesn't implement the `nft_on_transfer` function and the NFT should remain yours after the transaction is complete.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_transfer_call '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' --gas 100000000000000 --depositYocto 1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_transfer_call json-args '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you query for your tokens, you should still have `token-2` and at this point, you're finished!

---

## Conclusion

In this tutorial, you learned how to expand an NFT contract past the minting functionality and you added ways for users to transfer NFTs. You [broke down](#introduction) the problem into smaller, more digestible subtasks and took that information and implemented both the [NFT transfer](#transfer-function) and [NFT transfer call](#transfer-call-function) functions. In addition, you deployed another [patch fix](#redeploying-contract) to your smart contract and [tested](#testing-changes) the transfer functionality.

In the [next tutorial](5-approvals.md), you'll learn about the approval management system and how you can approve others to transfer tokens on your behalf.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
