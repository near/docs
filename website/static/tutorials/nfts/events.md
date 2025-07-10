---
id: events
title: Events
---



In this tutorial, you'll learn about the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and how to implement it in your smart contract.

---

## Understanding the use case {#understanding-the-use-case}

Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com/?tab=collectibles)? Originally, an indexer used to listen for any functions calls starting with `nft_` on your account. These contracts were then flagged on your account as likely NFT contracts.

When you navigated to your collectibles tab, the wallet would then query all those contracts for the list of NFTs you owned using the `nft_tokens_for_owner` function you saw in the [enumeration tutorial](3-enumeration.md).

<hr class="subsection" />

### The problem {#the-problem}

This method of flagging contracts was not reliable as each NFT-driven application might have its own way of minting or transferring NFTs. In addition, it's common for apps to transfer or mint many tokens at a time using batch functions.

<hr class="subsection" />

### The solution {#the-solution}

A standard was introduced so that smart contracts could emit an event anytime NFTs were transferred, minted, or burnt. This event was in the form of a log. No matter how a contract implemented the functionality, an indexer could now listen for those standardized logs.

As per the standard, you need to implement a logging functionality that gets fired when NFTs are transferred or minted. In this case, the contract doesn't support burning so you don't need to worry about that for now.

It's important to note the standard dictates that the log should begin with `"EVENT_JSON:"`. The structure of your log should, however, always contain the 3 following things:

- **standard**: the current name of the standard (e.g. nep171)
- **version**: the version of the standard you're using (e.g. 1.0.0)
- **event**: a list of events you're emitting.

The event interface differs based on whether you're recording transfers or mints. The interface for both events is outlined below.

**Transfer events**:
- *Optional* - **authorized_id**: the account approved to transfer on behalf of the owner.
- **old_owner_id**: the old owner of the NFT.
- **new_owner_id**: the new owner that the NFT is being transferred to.
- **token_ids**: a list of NFTs being transferred.
- *Optional* - **memo**: an optional message to include with the event.

**Minting events**:
- **owner_id**: the owner that the NFT is being minted to.
- **token_ids**: a list of NFTs being transferred.
- *Optional* - **memo**: an optional message to include with the event.

<hr class="subsection" />

### Examples {#examples}

In order to solidify your understanding of the standard, let's walk through three scenarios and see what the logs should look like.

#### Scenario A - simple mint

In this scenario, Benji wants to mint an NFT to Mike with a token ID `"team-token"` and he doesn't include a message. The log should look as follows.

```rust
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token"]}
  ]
}
```

#### Scenario B - batch mint

In this scenario, Benji wants to perform a batch mint. He will mint an NFT to Mike, Damian, Josh, and Dorian. Dorian, however, will get two NFTs. Each token ID will be `"team-token"` followed by an incrementing number. The log is as follows.


```rust
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token0"]},
    {"owner_id": "damian.testnet", "token_ids": ["team-token1"]},
    {"owner_id": "josh.testnet", "token_ids": ["team-token2"]}
    {"owner_id": "dorian.testnet", "token_ids": ["team-token3", "team-token4"]},
  ]
}
```

#### Scenario C - transfer NFTs

In this scenario, Mike is transferring both his team tokens to Josh. The log should look as follows.

```rust
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_transfer",
  "data": [
    {"old_owner_id": "mike.testnet", "new_owner_id": "josh.testnet", "token_ids": ["team-token", "team-token0"], "memo": "Go Team!"}
  ]
}
```

---

## Modifications to the contract {#modifications-to-the-contract}

At this point, you should have a good understanding of what the end goal should be so let's get to work! Open the repository and create a new file in the `nft-contract-basic/src` directory called `events.rs`. This is where your log structs will live.

If you wish to see the finished code of the events implementation, that can be found on the `nft-contract-events` folder.

### Creating the events file {#events-rs}

Copy the following into your file. This will outline the structs for your `EventLog`, `NftMintLog`, and `NftTransferLog`. In addition, we've added a way for `EVENT_JSON:` to be prefixed whenever you log the `EventLog`.

```
use std::fmt;

use near_sdk::serde::{Deserialize, Serialize};

/// Enum that represents the data type of the EventLog.
/// The enum can either be an NftMint or an NftTransfer.
#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "event", content = "data")]
#[serde(rename_all = "snake_case")]
#[serde(crate = "near_sdk::serde")]
#[non_exhaustive]
pub enum EventLogVariant {
    NftMint(Vec<NftMintLog>),
    NftTransfer(Vec<NftTransferLog>),
}

/// Interface to capture data about an event
///
/// Arguments:
/// * `standard`: name of standard e.g. nep171
/// * `version`: e.g. 1.0.0
/// * `event`: associate event data
#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct EventLog {
    pub standard: String,
    pub version: String,

    // `flatten` to not have "event": {<EventLogVariant>} in the JSON, just have the contents of {<EventLogVariant>}.
    #[serde(flatten)]
    pub event: EventLogVariant,
}

impl fmt::Display for EventLog {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_fmt(format_args!(
            "EVENT_JSON:{}",
            &serde_json::to_string(self).map_err(|_| fmt::Error)?
        ))
    }
}

/// An event log to capture token minting
///
/// Arguments
/// * `owner_id`: "account.near"
/// * `token_ids`: ["1", "abc"]
/// * `memo`: optional message
#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct NftMintLog {
    pub owner_id: String,
    pub token_ids: Vec<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub memo: Option<String>,
}

/// An event log to capture token transfer
///
/// Arguments
/// * `authorized_id`: approved account to transfer
/// * `old_owner_id`: "owner.near"
/// * `new_owner_id`: "receiver.near"
/// * `token_ids`: ["1", "12345abc"]
/// * `memo`: optional message
#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct NftTransferLog {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub authorized_id: Option<String>,

    pub old_owner_id: String,
    pub new_owner_id: String,
    pub token_ids: Vec<String>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub memo: Option<String>,
}

```

This requires the `serde_json` package which you can easily add to your `nft-contract-skeleton/Cargo.toml` file:

```
[dependencies]
near-sdk = { version = "5.11.0", features = ["legacy"] }
serde_json = "1.0.113"

```

<hr class="subsection" />

### Adding modules and constants {#lib-rs}

Now that you've created a new file, you need to add the module to the `lib.rs` file. In addition, you can define two constants for the standard and version that will be used across our contract.

```
use crate::internal::*;
pub use crate::metadata::*;
pub use crate::mint::*;
pub use crate::nft_core::*;
pub use crate::approval::*;
pub use crate::royalty::*;
pub use crate::events::*;

mod internal;
mod enumeration; 
mod metadata; 
mod mint; 
mod nft_core; 
mod approval; 
mod royalty;
mod events;

/// This spec can be treated like a version of the standard.
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";

```

<hr class="subsection" />

### Logging minted tokens {#logging-minted-tokens}

Now that all the tools are set in place, you can now implement the actual logging functionality. Since the contract will only be minting tokens in one place, open the `nft-contract-basic/src/mint.rs` file and navigate to the bottom of the file. This is where you'll construct the log for minting. Anytime someone successfully mints an NFT, it will now correctly emit a log.

```
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        token_owner_id: AccountId,
        token_metadata: TokenMetadata,
    ) {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: token_owner_id,
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
        refund_deposit(required_storage_in_bytes.into());
    }
}
```

<hr class="subsection" />

### Logging transfers {#logging-transfers}

Let's open the `nft-contract-basic/src/internal.rs` file and navigate to the `internal_transfer` function. This is the location where you'll build your transfer logs. Whenever an NFT is transferred, this function is called and so you'll correctly be logging the transfers.

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

        // Default the authorized ID to be None for the logs. // We will return here in the future when we study the approval functionality
        let mut authorized_id = None;

        // Construct the transfer log as per the events standard.
        let nft_transfer_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftTransfer(vec![NftTransferLog {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id,
                // The old owner's account ID.
                old_owner_id: token.owner_id.to_string(),
                // The account ID of the new owner of the token.
                new_owner_id: receiver_id.to_string(),
                // A vector containing the token IDs as strings.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_transfer_log.to_string());
        
        //return the previous token object that was transferred.
        token
    }
} 
```

This solution, unfortunately, has an edge case which will break things. If an NFT is transferred via the `nft_transfer_call` function, there's a chance that the transfer will be reverted if the `nft_on_transfer` function returns `true`. Taking a look at the logic for `nft_transfer_call`, you can see why this is a problem.

When `nft_transfer_call` is invoked, it will:
- Call `internal_transfer` to perform the actual transfer logic.
- Initiate a cross-contract call and invoke the `nft_on_transfer` function.
- Resolve the promise and perform logic in `nft_resolve_transfer`.
    - This will either return true meaning the transfer went fine or it will revert the transfer and return false.

If you only place the log in the `internal_transfer` function, the log will be emitted and the indexer will think that the NFT was transferred. If the transfer is reverted during `nft_resolve_transfer`, however, that event should **also** be emitted. Anywhere that an NFT **could** be transferred, we should add logs. Replace the `nft_resolve_transfer` with the following code.

```
            if let Ok(return_token) = near_sdk::serde_json::from_slice::<bool>(&value) {
                //if we need don't need to return the token, we simply return true meaning everything went fine
                if !return_token {
                    /*
                        since we've already transferred the token and nft_on_transfer returned false, we don't have to
                        revert the original transfer and thus we can just return true since nothing went wrong.
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

        /*
            We need to log that the NFT was reverted back to the original owner.
            The old_owner_id will be the receiver and the new_owner_id will be the
            original owner of the token since we're reverting the transfer.
        */
        let nft_transfer_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftTransfer(vec![NftTransferLog {
                // The optional authorized account ID to transfer the token on behalf of the old owner.
                authorized_id,
                // The old owner's account ID.
                old_owner_id: receiver_id.to_string(),
                // The account ID of the new owner of the token.
                new_owner_id: previous_owner_id.to_string(),
                // A vector containing the token IDs as strings.
                token_ids: vec![token_id.to_string()],
                // An optional memo to include.
                memo,
            }]),
        };

        //we perform the actual logging
        env::log_str(&nft_transfer_log.to_string());

        //return false
        false
    }
}

```

In addition, you need to add an `authorized_id` and `memo` to the parameters for `nft_resolve_transfer` as shown below.

:::tip

We will talk more about this [`authorized_id`](./5-approvals.md) in the following chapter.

:::

```
        as part of the nft_transfer_call method
    */
    fn nft_resolve_transfer(
        &mut self,
        //we introduce an authorized ID for logging the transfer event
        authorized_id: Option<String>,
        previous_owner_id: AccountId,
        receiver_id: AccountId,
        token_id: TokenId,
        //we introduce a memo for logging the transfer event
        memo: Option<String>,
    ) -> bool;
}

#[near_bindgen]
impl NonFungibleTokenCore for Contract {
    //implementation of the nft_transfer method. This transfers the NFT from the current owner to the receiver.
    #[payable]
    fn nft_transfer(&mut self, receiver_id: AccountId, token_id: TokenId, memo: Option<String>) {
```


The last step is to modify the `nft_transfer_call` logic to include these new parameters:

```
        //transfer the token and get the previous token object
        let previous_token =
            self.internal_transfer(&sender_id, &receiver_id, &token_id, memo.clone());

        //default the authorized_id to none
        let mut authorized_id = None;

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
                    .nft_resolve_transfer(
                        authorized_id, // we introduce an authorized ID so that we can log the transfer
                        previous_token.owner_id,
                        receiver_id,
                        token_id,
                        memo, // we introduce a memo for logging in the events standard
                    ),
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
```

With that finished, you've successfully implemented the events standard and it's time to start testing.

---

## Deploying the contract {#redeploying-contract}

For the purpose of readability and ease of development, instead of redeploying the contract to the same account, let's create an account and deploy to that instead. You could have deployed to the same account as none of the changes you implemented in this tutorial would have caused errors.

### Deployment

Next, you'll deploy this contract to the network.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  export EVENTS_NFT_CONTRACT_ID=<accountId>
  near create-account $EVENTS_NFT_CONTRACT_ID --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  export EVENTS_NFT_CONTRACT_ID=<accountId>
  near account create-account sponsor-by-faucet-service $EVENTS_NFT_CONTRACT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $EVENTS_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr class="subsection" />

### Minting {#minting}

Next, you'll need to mint a token. By running this command, you'll mint a token with a token ID `"events-token"` and the receiver will be your new account. In addition, you're passing in a map with two accounts that will get perpetual royalties whenever your token is sold.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $EVENTS_NFT_CONTRACT_ID nft_mint '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $EVENTS_NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

You can check to see if everything went through properly by looking at the output in your CLI:

```bash
Doing account.functionCall()
Receipts: F4oxNfv54cqwUwLUJ7h74H1iE66Y3H7QDfZMmGENwSxd, BJxKNFRuLDdbhbGeLA3UBSbL8UicU7oqHsWGink5WX7S
	Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_mint","data":[{"owner_id":"events.goteam.examples.testnet","token_ids":["events-token"]}]}
Transaction Id 4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
''
```

You can see that the event was properly logged!

<hr class="subsection" />

### Transferring {#transferring}

You can now test if your transfer log works as expected by sending `benjiman.testnet` your NFT.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $EVENTS_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' --gas 100000000000000 --depositYocto 1 --accountId $EVENTS_NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

This should return an output similar to the following:

```bash
Doing account.functionCall()
Receipts: EoqBxrpv9Dgb8KqK4FdeREawVVLWepEUR15KPNuZ4fGD, HZ4xQpbgc8EfU3PiV72LvfXb2f3dVC1n9aVTbQds9zfR
	Log [events.goteam.examples.testnet]: Memo: Go Team :)
	Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_transfer","data":[{"authorized_id":"events.goteam.examples.testnet","old_owner_id":"events.goteam.examples.testnet","new_owner_id":"benjiman.testnet","token_ids":["events-token"],"memo":"Go Team :)"}]}
Transaction Id 4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
''
```

Hurray! At this point, your NFT contract is fully complete and the events standard has been implemented.

---

## Conclusion

Today you went through the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and implemented the necessary logic in your smart contract. You created events for [minting](#logging-minted-tokens) and [transferring](#logging-transfers) NFTs. You then deployed and tested your changes by [minting](#minting) and [transferring](#transferring) NFTs.

In the [next tutorial](8-marketplace.md), you'll look at the basics of a marketplace contract and how it was built.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Events standard: [NEP297 extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event), version `1.1.0`

:::
