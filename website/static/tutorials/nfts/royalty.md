---
id: royalty
title: Royalty
sidebar_label: Royalty
---



In this tutorial you'll continue building your non-fungible token (NFT) smart contract, and learn how to implement perpetual royalties into your NFTs. This will allow people to get a percentage of the purchase price when an NFT is sold.

## Introduction

By now, you should have a fully fledged NFT contract, except for the royalties support.
To get started, go to the `nft-contract-approval/` folder from our [GitHub repository](https://github.com/near-examples/nft-tutorial/), or continue your work from the previous tutorials.

```bash
cd nft-contract-approval/
```

:::tip
If you wish to see the finished code for this _Royalty_ tutorial, you can find it in the `nft-contract-royalty` folder.
:::

---

## Thinking about the problem

In order to implement the functionality, you first need to understand how NFTs are sold. In the previous tutorial, you saw how someone with an NFT could list it on a marketplace using the `nft_approve` function by passing in a message that could be properly decoded. When a user purchases your NFT on the marketplace, what happens?

Using the knowledge you have now, a reasonable conclusion would be to say that the marketplace transfers the NFT to the buyer by performing a cross-contract call and invokes the NFT contract's `nft_transfer` method. Once that function finishes, the marketplace would pay the seller for the correct amount that the buyer paid.

Let's now think about how this can be expanded to allow for a cut of the pay going to other accounts that aren't just the seller.

<hr class="subsection" />

### Expanding the current solution

Since perpetual royalties will be on a per-token basis, it's safe to assume that you should be changing the `Token` and `JsonToken` structs. You need some way of keeping track of what percentage each account with a royalty should have. If you introduce a map of an account to an integer, that should do the trick.

Now, you need some way to relay that information to the marketplace. This method should be able to transfer the NFT exactly like the old solution but with the added benefit of telling the marketplace exactly what accounts should be paid what amounts. If you implement a method that transfers the NFT and then calculates exactly what accounts get paid and to what amount based on a passed-in balance, that should work nicely.

This is what the [royalty standards](https://nomicon.io/Standards/NonFungibleToken/Payout) outlined. Let's now move on and modify our smart contract to introduce this behavior.

---

## Modifications to the contract

The first thing you'll want to do is add the royalty information to the structs. Open the `nft-contract-approval/src/metadata.rs` file and add `royalty` to the `Token` struct:

```rust
pub royalty: HashMap<AccountId, u32>,
```

Second, you'll want to add `royalty` to the `JsonToken` struct as well:

```rust
pub royalty: HashMap<AccountId, u32>,
```

<hr class="subsection" />

### Internal helper function

**royalty_to_payout**

To simplify the payout calculation, let's add a helper `royalty_to_payout` function to `src/internal.rs`. This will convert a percentage to the actual amount that should be paid. In order to allow for percentages less than 1%, you can give 100% a value of `10,000`. This means that the minimum percentage you can give out is 0.01%, or `1`. For example, if you wanted the account `benji.testnet` to have a perpetual royalty of 20%, you would insert the pair `"benji.testnet": 2000` into the payout map.

```
//convert the royalty percentage and amount to pay into a payout
pub(crate) fn royalty_to_payout(royalty_percentage: u128, amount_to_pay: NearToken) -> NearToken {
    amount_to_pay
        .saturating_mul(royalty_percentage)
        .saturating_div(10000)
```

If you were to use the `royalty_to_payout` function and pass in `2000` as the `royalty_percentage` and an `amount_to_pay` of 1 NEAR, it would return a value of 0.2 NEAR.

<hr class="subsection" />

### Royalties

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.rs` file, and modify the `nft_payout` function as shown.

```
    fn nft_payout(&self, token_id: TokenId, balance: NearToken, max_len_payout: u32) -> Payout {
        //get the token object
        let token = self.tokens_by_id.get(&token_id).expect("No token");

        //get the owner of the token
        let owner_id = token.owner_id;
        //keep track of the total perpetual royalties
        let mut total_perpetual = 0;
        //keep track of the payout object to send back
        let mut payout_object = Payout {
            payout: HashMap::new(),
        };
        //get the royalty object from token
        let royalty = token.royalty;

        //make sure we're not paying out to too many people (GAS limits this)
        assert!(
            royalty.len() as u32 <= max_len_payout,
            "Market cannot payout to that many receivers"
        );

        //go through each key and value in the royalty object
        for (k, v) in royalty.iter() {
            //get the key
            let key = k.clone();

            //only insert into the payout if the key isn't the token owner (we add their payout at the end)
            if key != owner_id {
                payout_object
                    .payout
                    .insert(key, royalty_to_payout(*v as u128, balance));
                total_perpetual += *v;
            }
        }

        // payout to previous owner who gets 100% - total perpetual royalties
        payout_object.payout.insert(
            owner_id,
            royalty_to_payout((10000 - total_perpetual).into(), balance),
        );

        //return the payout object
        payout_object
    }

    //transfers the token to the receiver ID and returns the payout object that should be payed given the passed in balance.
    #[payable]
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

```
    #[payable]
    fn nft_transfer_payout(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        approval_id: u64,
        memo: Option<String>,
        balance: NearToken,
        max_len_payout: u32,
    ) -> Payout {
        //assert that the user attached 1 yocto NEAR for security reasons
        assert_one_yocto();
        //get the sender ID
        let sender_id = env::predecessor_account_id();
        //transfer the token to the passed in receiver and get the previous token object back
        let previous_token =
            self.internal_transfer(&sender_id, &receiver_id, &token_id, Some(approval_id), memo);

        //refund the previous token owner for the storage used up by the previous approved account IDs
        refund_approved_account_ids(
            previous_token.owner_id.clone(),
            &previous_token.approved_account_ids,
        );

        //get the owner of the token
        let owner_id = previous_token.owner_id;
        //keep track of the total perpetual royalties
        let mut total_perpetual = 0;
        //keep track of the payout object to send back
        let mut payout_object = Payout {
            payout: HashMap::new(),
        };
        //get the royalty object from token
        let royalty = previous_token.royalty;

        //make sure we're not paying out to too many people (GAS limits this)
        assert!(
            royalty.len() as u32 <= max_len_payout,
            "Market cannot payout to that many receivers"
        );

        //go through each key and value in the royalty object
        for (k, v) in royalty.iter() {
            //get the key
            let key = k.clone();

            //only insert into the payout if the key isn't the token owner (we add their payout at the end)
            if key != owner_id {
                payout_object
                    .payout
                    .insert(key, royalty_to_payout(*v as u128, balance));
                total_perpetual += *v;
            }
        }

        // payout to previous owner who gets 100% - total perpetual royalties
        payout_object.payout.insert(
            owner_id,
            royalty_to_payout((10000 - total_perpetual).into(), balance),
        );

        //return the payout object
        payout_object
    }
}

```

<hr class="subsection" />

### Perpetual royalties

To add support for perpetual royalties, let's edit the `src/mint.rs` file. First, add an optional parameter for perpetual royalties. This is what will determine what percentage goes to which accounts when the NFT is purchased. You will also need to create and insert the royalty to be put in the `Token` object:

```
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        token_owner_id: AccountId,
        token_metadata: TokenMetadata,
        //we add an optional parameter for perpetual royalties
        perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // create a royalty map to store in the token
        let mut royalty = HashMap::new();

        // if perpetual royalties were passed into the function:
        if let Some(perpetual_royalties) = perpetual_royalties {
            //make sure that the length of the perpetual royalties is below 7 since we won't have enough GAS to pay out that many people
            assert!(
                perpetual_royalties.len() < 7,
                "Cannot add more than 6 perpetual royalty amounts"
            );

            //iterate through the perpetual royalties and insert the account and amount in the royalty map
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
            }
        }

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: token_owner_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
            //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
            royalty,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        self.token_metadata_by_id.insert(&token_id, &token_metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &token_id);

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
```

Next, you can use the CLI to query the new `nft_payout` function and validate that it works correctly.

### Adding royalty object to struct implementations

Since you've added a new field to your `Token` and `JsonToken` structs, you need to edit your implementations accordingly. Move to the `nft-contract/src/internal.rs` file and edit the part of your `internal_transfer` function that creates the new `Token` object:

```

        //we remove the token from it's current owner's set
        self.internal_remove_token_from_owner(&token.owner_id, token_id);
        //we then add the token to the receiver_id's set
        self.internal_add_token_to_owner(receiver_id, token_id);

        //we create a new token struct
        let new_token = Token {
            owner_id: receiver_id.clone(),
            //reset the approval account IDs
```

Once that's finished, move to the `nft-contract-approval/src/nft_core.rs` file. You need to edit your implementation of `nft_token` so that the `JsonToken` sends back the new royalty information.

```
            //we'll get the metadata for that token
            let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
            //we return the JsonToken (wrapped by Some since we return an option)
            Some(JsonToken {
                token_id,
                owner_id: token.owner_id,
                metadata,
                approved_account_ids: token.approved_account_ids,
                royalty: token.royalty,
            })
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}

#[near_bindgen]
impl NonFungibleTokenResolver for Contract {
```

---

## Deploying the contract {#redeploying-contract}

As you saw in the previous tutorial, adding changes like these will cause problems when redeploying. Since these changes affect all the other tokens and the state won't be able to automatically be inherited by the new code, simply redeploying the contract will lead to errors. For this reason, you'll create a new account again.

### Deployment and initialization

Next, you'll deploy this contract to the network.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  export ROYALTY_NFT_CONTRACT_ID=<accountId>
  near create-account $ROYALTY_NFT_CONTRACT_ID --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  export ROYALTY_NFT_CONTRACT_ID=<accountId>
  near account create-account sponsor-by-faucet-service $ROYALTY_NFT_CONTRACT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $ROYALTY_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

### Minting {#minting}

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"royalty-token"` and the receiver will be your new account. In addition, you're passing in a map with two accounts that will get perpetual royalties whenever your token is sold.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $ROYALTY_NFT_CONTRACT_ID nft_mint '{"token_id": "royalty-token", "metadata": {"title": "Royalty Token", "description": "testing out the new royalty extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' --gas 100000000000000 --deposit 0.1 --accountId $ROYALTY_NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $ROYALTY_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "royalty-token", "metadata": {"title": "Royalty Token", "description": "testing out the new royalty extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $ROYALTY_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

You can check to see if everything went through properly by calling one of the enumeration functions:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}' --networkId testnet
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
    "token_id": "royalty-token",
    "owner_id": "royalty.goteam.examples.testnet",
    "metadata": {
      "title": "Royalty Token",
      "description": "testing out the new royalty extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
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

Let's calculate the payout for the `"royalty-token"` NFT, given a balance of 100 yoctoNEAR. It's important to note that the balance being passed into the `nft_payout` function is expected to be in yoctoNEAR.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $ROYALTY_NFT_CONTRACT_ID nft_payout '{"token_id": "royalty-token", "balance": "100", "max_len_payout": 100}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $ROYALTY_NFT_CONTRACT_ID nft_payout json-args '{"token_id": "royalty-token", "balance": "100", "max_len_payout": 100}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This command should return an output similar to the following:

```js
{
  payout: {
    'josh.testnet': '5',
    'royalty.goteam.examples.testnet': '65',
    'mike.testnet': '10',
    'benjiman.testnet': '20'
  }
}
```

If the NFT was sold for 100 yoctoNEAR, josh would get 5, Benji would get 20, mike would get 10, and the owner, in this case `royalty.goteam.examples.testnet` would get the rest: 65.

## Conclusion

At this point you have everything you need for a fully functioning NFT contract to interact with marketplaces.
The last remaining standard that you could implement is the events standard. This allows indexers to know what functions are being called and makes it easier and more reliable to keep track of information that can be used to populate the collectibles tab in the wallet for example.

:::info remember
If you want to see the finished code from this tutorial, you can go to the `nft-contract-royalty` folder.
:::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`
- Royalties standard: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), version `2.0.0`

:::
