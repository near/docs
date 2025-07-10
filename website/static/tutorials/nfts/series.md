---
id: series
title: Customizing the NFT Contract
sidebar_label: Lazy Minting, Collections, and More!
---



In this tutorial, you'll learn how to take the [existing NFT contract](https://github.com/near-examples/nft-tutorial) you've been working with and modify it to meet some of the most common needs in the ecosystem. This includes:
- [Lazy Minting NFTs](#lazy-minting)
- [Creating Collections](#nft-collections-and-series)
- [Restricting Minting Access](#restricted-access)
- [Highly Optimizing Storage](#modifying-view-calls-for-optimizations)
- Hacking Enumeration Methods

---

## Introduction

Now that you have a deeper understanding of basic NFT smart contracts, we can start to get creative and implement more unique features. The basic contract works really well for simple use-cases but as you begin to explore the potential of NFTs, you can use it as a foundation to build upon.

A fun analogy would be that you now have a standard muffin recipe and it's now up to you to decide how to alter it to create your own delicious varieties, may I suggest blueberry perhaps.

Below we've created a few of these new varieties by showing potential solutions to the problems outlined above. As we demonstrate how to customize the basic NFT contract, we hope it activates your ingenuity thus introducing you to what's possible and helping you discover the true potential of NFTs. 💪

<hr class="subsection" />

### NFT Collections and Series

NFT Collections help solve two common problems when dealing with the basic NFT contract:
- Storing repeated data.
- Organizing data and code.

The concept of a collection in the NFT space has a very loose meaning and can be interpreted in many different ways. In our case, we'll define a collection as a set of tokens that share **similar metadata**. For example, you could create a painting and want 100 identical copies to be put for sale. In this case, all one hundred pieces would be part of the same *collection*. Each piece would have the same artist, title, description, media etc.

One of the biggest problems with the basic NFT contract is that you store similar data many times. If you mint NFTs, the contract will store the metadata individually for **every single token ID**. We can fix this by introducing the idea of NFT series, or NFT collection.

A series can be thought of as a bucket of token IDs that *all* share similar information. This information is specified when the series is **created** and can be the metadata, royalties, price etc. Rather than storing this information for **every token ID**, you can simply store it once in the series and then associate token IDs with their respective buckets.

<hr class="subsection" />

### Restricted Access

Currently, the NFT contract allows anyone to mint NFTs. While this works well for some projects, the vast majority of dApps and creators want to restrict who can create NFTs on the contract. This is why you'll introduce an allowlist functionality for both series and for NFTs. You'll have two data structures customizable by the contract owner:
- Approved Minters
- Approved Creators

If you're an approved minter, you can freely mint NFTs for any given series. You cannot, however, create new series.

On the other hand, you can also be an approved creator. This allows you to define new series that NFTs can be minted from. It's important to note that if you're an approved creator, you're not automatically an approved minter as well. Each of these permissions need to be given by the owner of the contract and they can be revoked at any time.

<hr class="subsection" />

### Lazy Minting

Lazy minting allows users to mint *on demand*. Rather than minting all the NFTs and spending $NEAR on storage, you can instead mint the tokens **when they are purchased**. This helps to avoid burning unnecessary Gas and saves on storage for when not all the NFTs are purchased. Let's look at a common scenario to help solidify your understanding:

Benji has created an amazing digital painting of the famous Go Team gif. He wants to sell 1000 copies of it for 1 $NEAR each. Using the traditional approach, he would have to mint each copy individually and pay for the storage himself. He would then need to either find or deploy a marketplace contract and pay for the storage to put 1000 copies up for sale. He would need to burn Gas putting each token ID up for sale 1 by 1.

After that, people would purchase the NFTs, and there would be no guarantee that all or even any would be sold. There's a real possibility that nobody buys a single piece of his artwork, and Benji spent all that time, effort and money on nothing.

Lazy minting would allow the NFTs to be *automatically minted on-demand*. Rather than having to purchase NFTs from a marketplace, Benji could specify a price on the NFT contract and a user could directly call the `nft_mint` function whereby the funds would be distributed to Benji's account directly.

Using this model, NFTs would **only** be minted when they're actually purchased and there wouldn't be any upfront fee that Benji would need to pay in order to mint all 1000 NFTs. In addition, it removes the need to have a separate marketplace contract.

With this example laid out, a high level overview of lazy minting is that it gives the ability for someone to mint "on-demand" - they're lazily minting the NFTs instead of having to mint everything up-front even if they're unsure if there's any demand for the NFTs. With this model, you don't have to waste Gas or storage fees because you're only ever minting when someone actually purchases the artwork.

---

## New Contract File Structure

Let's now take a look at how we've implemented solutions to the issues we've discussed so far.

In your locally cloned example of the [`nft-tutorial`](https://github.com/near-examples/nft-tutorial) check out the `main` branch and be sure to pull the most recent version.

```bash
git checkout main && git pull
```

You'll notice that there's a folder at the root of the project called `nft-series`. This is where the smart contract code lives. If you open the `src` folder, it should look similar to the following:

```
src
├── approval.rs
├── enumeration.rs
├── events.rs
├── internal.rs
├── lib.rs
├── metadata.rs
├── nft_core.rs
├── owner.rs
├── royalty.rs
├── series.rs
```

---

## Differences

You'll notice that most of this code is the same, however, there are a few differences between this contract and the basic NFT contract.

### Main Library File

Starting with `lib.rs`, you'll notice that the contract struct has been modified to now store the following information.

```diff
pub owner_id: AccountId,
+ pub approved_minters: LookupSet<AccountId>,
+ pub approved_creators: LookupSet<AccountId>,
pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,
pub tokens_by_id: UnorderedMap<TokenId, Token>,
- pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,
+ pub series_by_id: UnorderedMap<SeriesId, Series>,
pub metadata: LazyOption<NFTContractMetadata>,
```

As you can see, we've replaced `token_metadata_by_id` with `series_by_id` and added two lookup sets:

- **series_by_id**: Map a series ID (u64) to its Series object.
- **approved_minters**: Keeps track of accounts that can call the `nft_mint` function.
- **approved_creators**: Keeps track of accounts that can create new series.

<hr class="subsection" />

### Series Object {#series-object}
In addition, we're now keeping track of a new object called a `Series`.

```rust
pub struct Series {
    // Metadata including title, num copies etc.. that all tokens will derive from
    metadata: TokenMetadata,
    // Royalty used for all tokens in the collection
    royalty: Option<HashMap<AccountId, u32>>,
    // Set of tokens in the collection
    tokens: UnorderedSet<TokenId>,
    // What is the price of each token in this series? If this is specified, when minting,
    // Users will need to attach enough $NEAR to cover the price.
    price: Option<Balance>,
    // Owner of the collection
    owner_id: AccountId,
}
```

This object stores information that each token will inherit from. This includes:
- The [metadata](2-minting.md#metadata-and-token-info).
- The [royalties](6-royalty.md).
- The price.

:::caution
If a price is specified, there will be no restriction on who can mint tokens in the series. In addition, if the `copies` field is specified in the metadata, **only** that number of NFTs can be minted. If the field is omitted, an unlimited amount of tokens can be minted.
:::

We've also added a field `tokens` which keeps track of all the token IDs that have been minted for this series. This allows us to deal with the potential `copies` cap by checking the length of the set. It also allows us to paginate through all the tokens in the series.

<hr class="subsection" />

### Creating Series

`series.rs` is a new file that replaces the old [minting](2-minting.md) logic. This file has been created to combine both the series creation and minting logic into one.

```
    #[payable]
    pub fn create_series(
        &mut self,
        id: U64,
        metadata: TokenMetadata,
        royalty: Option<HashMap<AccountId, u32>>,
        price: Option<NearToken>,
    ) {
        // Measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // Ensure the caller is an approved creator
        let caller = env::predecessor_account_id();
        require!(
            self.approved_creators.contains(&caller) == true,
            "only approved creators can add a type"
        );

        // Check that the total royalty amount does not exceed 100%
        if !royalty.is_none() {
            let mut total_royalty = 0;

            for (_, v) in royalty.clone().unwrap().iter() {
                total_royalty += *v;
            }
            require!(total_royalty <= 100, "total royalty can't exceed 100%");
        }

        // Insert the series and ensure it doesn't already exist
        require!(
            self.series_by_id
                .insert(
                    &id.0,
                    &Series {
                        metadata,
                        royalty,
                        tokens: UnorderedSet::new(StorageKey::SeriesByIdInner {
                            // We get a new unique prefix for the collection
                            account_id_hash: hash_account_id(&format!("{}.{}", id.0, caller)),
                        }),
                        owner_id: caller,
                        price: price.map(|p| p),
                    }
                )
                .is_none(),
            "collection ID already exists"
        );

```

The function takes in a series ID in the form of a [u64](https://doc.rust-lang.org/std/primitive.u64.html), the metadata, royalties, and the price for tokens in the series. It will then create the [Series object](#series-object) and insert it into the contract's series_by_id data structure. It's important to note that the caller must be an approved creator and they must attach enough $NEAR to cover storage costs.

<hr class="subsection" />

### Minting NFTs

Next, we'll look at the minting function. If you remember from before, this used to take the following parameters:
- Token ID
- Metadata
- Receiver ID
- Perpetual Royalties

With the new and improved minting function, these parameters have been changed to just two:
- The series ID
- The receiver ID.

The mint function might look complicated at first but let's break it down to understand what's happening. The first thing it does is get the [series object](#series-object) from the specified series ID. From there, it will check that the number of copies won't be exceeded if one is specified in the metadata.

It will then store the token information on the contract as explained in the [minting section](2-minting.md#storage-implications) of the tutorial and map the token ID to the series. Once this is finished, a mint log will be emitted and it will ensure that enough deposit has been attached to the call. This amount differs based on whether or not the series has a price.

#### Required Deposit

As we went over in the [minting section](2-minting.md#storage-implications) of this tutorial, all information stored on the contract costs $NEAR. When minting, there is a required deposit to pay for this storage. For *this contract*, a series price can also be specified by the owner when the series is created. This price will be used for **all** NFTs in the series when they are minted. If the price is specified, the deposit must cover both the storage as well as the price.

If a price **is specified** and the user attaches more deposit than what is necessary, the excess is sent to the **series owner**. There is also *no restriction* on who can mint tokens for series that have a price. The caller does **not** need to be an approved minter.

If **no price** was specified in the series and the user attaches more deposit than what is necessary, the excess is *refunded to them*. In addition, the contract makes sure that the caller is an approved minter in this case.

:::info
Notice how the token ID isn't required? This is because the token ID is automatically generated when minting. The ID stored on the contract is `${series_id}:${token_id}` where the token ID is a nonce that increases each time a new token is minted in a series. This not only reduces the amount of information stored on the contract but it also acts as a way to check the specific edition number.
:::

```

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit(required_storage_in_bytes.into());
    }

    /// Mint a new NFT that is part of a series. The caller must be an approved minter.
    /// The series ID must exist and if the metadata specifies a copy limit, you cannot exceed it.
    #[payable]
    pub fn nft_mint(&mut self, id: U64, token_owner_id: AccountId) {
        // Measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // Get the series and how many tokens currently exist (edition number = cur_len + 1)
        let mut series = self.series_by_id.get(&id.0).expect("Not a series");

        // Check if the series has a price per token. If it does, ensure the caller has attached at least that amount
        let mut price_per_token = NearToken::from_yoctonear(0);
        if let Some(price) = series.price {
            price_per_token = price;
            require!(
                env::attached_deposit().ge(&price_per_token),
                "Need to attach at least enough to cover price"
            );
        // If the series doesn't have a price, ensure the caller is an approved minter.
        } else {
            // Ensure the caller is an approved minter
            let predecessor = env::predecessor_account_id();
            assert!(
                self.approved_minters.contains(&predecessor),
                "Not approved minter"
            );
        }

        let cur_len = series.tokens.len();
        // Ensure we haven't overflowed on the number of copies minted
        if let Some(copies) = series.metadata.copies {
            require!(
                cur_len < copies,
                "cannot mint anymore NFTs for the given series. Limit reached"
            );
        }

        // The token ID is stored internally as `${series_id}:${edition}`
        let token_id = format!("{}:{}", id.0, cur_len + 1);
        series.tokens.insert(&token_id);
        self.series_by_id.insert(&id.0, &series);

        //specify the token struct that contains the owner ID
        let token = Token {
            // Series ID that the token belongs to
            series_id: id.0,
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: token_owner_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        require!(
            self.tokens_by_id.insert(&token_id, &token).is_none(),
            "Token already exists"
        );

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
```

<hr class="subsection" />

### View Functions

Now that we've introduced the idea of series, more view functions have also been added.

:::info
Notice how we've also created a new struct `JsonSeries` instead of returning the regular `Series` struct. This is because the `Series` struct contains an `UnorderedSet` which cannot be serialized.

The common practice is to return everything **except** the `UnorderedSet` in a separate struct and then have entirely different methods for accessing the data from the `UnorderedSet` itself.
<!-- TODO: add a learn more here call to action -->
:::

```
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct JsonSeries {
    series_id: u64,
    // Metadata including title, num copies etc.. that all tokens will derive from
    metadata: TokenMetadata,
    // Royalty used for all tokens in the collection
    royalty: Option<HashMap<AccountId, u32>>,
    // Owner of the collection
    owner_id: AccountId,
}

#[near_bindgen]
```

The view functions are listed below.
- **[get_series_total_supply](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L92)**: Get the total number of series currently on the contract.
  - Arguments: None.

```
    pub fn get_series_total_supply(&self) -> U64 {
        U64(self.series_by_id.len())
    }

    // Paginate through all the series on the contract and return the a vector of JsonSeries
    pub fn get_series(&self, from_index: Option<U128>, limit: Option<u32>) -> Vec<JsonSeries> {
```

- **[get_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L97)**: Paginate through all the series in the contract and return a vector of `JsonSeries` objects.
  - Arguments: `from_index: String | null`, `limit: number | null`.

```
    pub fn get_series(&self, from_index: Option<U128>, limit: Option<u32>) -> Vec<JsonSeries> {
        //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));

        //iterate through each series using an iterator
        self.series_by_id
            .keys()
            //skip to the index we specified in the start variable
            .skip(start as usize)
            //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
            .take(limit.unwrap_or(50) as usize)
            //we'll map the series IDs which are strings into Json Series
            .map(|series_id| self.get_series_details(U64(series_id.clone())).unwrap())
            //since we turned the keys into an iterator, we need to turn it back into a vector to return
            .collect()
    }

    // get info for a specific series
```

- **[get_series_details](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L115)**: Get the `JsonSeries` details for a specific series.
  - Arguments: `id: number`.

```
    pub fn get_series_details(&self, id: U64) -> Option<JsonSeries> {
        //get the series from the map
        let series = self.series_by_id.get(&id.0);
        //if there is some series, we'll return the series
        if let Some(series) = series {
            Some(JsonSeries {
                series_id: id.0,
                metadata: series.metadata,
                royalty: series.royalty,
                owner_id: series.owner_id,
            })
        } else {
            //if there isn't a series, we'll return None
            None
        }
    }

    //get the total supply of NFTs on a current series
```

- **[nft_supply_for_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L133)**: View the total number of NFTs minted for a specific series.
  - Arguments: `id: number`.

```
    pub fn nft_supply_for_series(&self, id: U64) -> U64 {
        //get the series
        let series = self.series_by_id.get(&id.0);

        //if there is some series, get the length of the tokens. Otherwise return -
        if let Some(series) = series {
            U64(series.tokens.len())
        } else {
            U64(0)
        }
    }

    /// Paginate through NFTs within a given series
```

- **[nft_tokens_for_series](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L146)**: Paginate through all NFTs for a specific series and return a vector of `JsonToken` objects.
  - Arguments: `id: number`, `from_index: String | null`, `limit: number | null`.

```
    pub fn nft_tokens_for_series(
        &self,
        id: U64,
        from_index: Option<U128>,
        limit: Option<u32>,
    ) -> Vec<JsonToken> {
        // Get the series and its tokens
        let series = self.series_by_id.get(&id.0);
        let tokens = if let Some(series) = series {
            series.tokens
        } else {
            return vec![];
        };

        //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));

        //iterate through the tokens
        tokens
            .iter()
            //skip to the index we specified in the start variable
            .skip(start as usize)
            //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
            .take(limit.unwrap_or(50) as usize)
            //we'll map the token IDs which are strings into Json Tokens
            .map(|token_id| self.nft_token(token_id.clone()).unwrap())
            //since we turned the keys into an iterator, we need to turn it back into a vector to return
            .collect()
    }
}

```

:::info
Notice how with every pagination function, we've also included a getter to view the total supply. This is so that you can use the `from_index` and `limit` parameters of the pagination functions in conjunction with the total supply so you know where to end your pagination.
:::

<hr class="subsection" />

### Modifying View Calls for Optimizations

Storing information on-chain can be very expensive. As you level up in your smart contract development skills, one area to look into is reducing the amount of information stored. View calls are a perfect example of this optimization.

For example, if you wanted to relay the edition number for a given NFT in its title, you don't necessarily need to store this on-chain for every token. Instead, you could modify the view functions to manually append this information to the title before returning it.

To do this, here's a way of modifying the `nft_token` function as it's central to all enumeration methods.

```
    //get the information for a specific token ID
    fn nft_token(&self, token_id: TokenId) -> Option<JsonToken> {
        //if there is some token ID in the tokens_by_id collection
        if let Some(token) = self.tokens_by_id.get(&token_id) {
            // Get the series information
            let cur_series = self
                .series_by_id
                .get(&token.series_id)
                .expect("Not a series");
            // Get the metadata for the series
            let mut metadata = cur_series.metadata;

            // Get the edition number and series ID
            let split: Vec<&str> = token_id.split(":").collect();
            let edition_number = split[1];
            // If there is a title for the NFT, add the token ID to it.
            if let Some(title) = metadata.title {
                metadata.title = Some(format!("{} - {}", title, edition_number));
            } else {
                // If there is no title, we simply create one based on the series number and edition number
                metadata.title = Some(format!("Series {} : Edition {}", split[0], split[1]));
            }

            //we return the JsonToken (wrapped by Some since we return an option)
            Some(JsonToken {
                series_id: token.series_id,
                token_id,
                owner_id: token.owner_id,
                metadata,
                approved_account_ids: token.approved_account_ids,
                royalty: cur_series.royalty,
            })
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}
```

For example if a token had a title `"My Amazing Go Team Gif"` and the NFT was edition 42, the new title returned would be `"My Amazing Go Team Gif - 42"`. If the NFT didn't have a title in the metadata, the series and edition number would be returned in the form of `Series {} : Edition {}`.

While this is a small optimization, this idea is extremely powerful as you can potentially save on a ton of storage. As an example: most of the time NFTs don't utilize the following fields in their metadata.
- `issued_at`
- `expires_at`
- `starts_at`
- `updated_at`

As an optimization, you could change the token metadata that's **stored** on the contract to not include these fields but then when returning the information in `nft_token`, you could simply add them in as `null` values.

<hr class="subsection" />

### Owner File

The last file we'll look at is the owner file found at `owner.rs`. This file simply contains all the functions for getting and setting approved creators and approved minters which can only be called by the contract owner.

:::info
There are some other smaller changes made to the contract that you can check out if you'd like. The most notable are:
- The `Token` and `JsonToken` objects have been [changed](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/metadata.rs#L40) to reflect the new series IDs.
- All references to `token_metadata_by_id` have been [changed](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/enumeration.rs#L23) to `tokens_by_id`
- Royalty functions [now](https://github.com/near-examples/nft-tutorial/blob/main/nft-series/src/royalty.rs#L43) calculate the payout objects by using the series' royalties rather than the token's royalties.
:::

---

## Building the Contract

Now that you hopefully have a good understanding of the contract, let's get started building it. Run the following build command to compile the contract to wasm.

```bash
cargo near build
```

---

## Deployment and Initialization

Next, you'll deploy this contract to the network.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  export NFT_CONTRACT_ID=<accountId>
  near create-account $NFT_CONTRACT_ID --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  export NFT_CONTRACT_ID=<accountId>
  near account create-account sponsor-by-faucet-service $NFT_CONTRACT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Check if this worked correctly by echoing the environment variable.
```bash
echo $NFT_CONTRACT_ID
```
This should return your `<accountId>`. The next step is to initialize the contract with some default metadata.

```bash
cargo near deploy build-non-reproducible-wasm $NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

If you now query for the metadata of the contract, it should return our default metadata.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $NFT_CONTRACT_ID nft_metadata '{}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $NFT_CONTRACT_ID nft_metadata json-args {} network-config testnet now
  ```
  </TabItem>
</Tabs>

---

## Creating The Series

The next step is to create two different series. One will have a price for lazy minting and the other will simply be a basic series with no price. The first step is to create an owner [sub-account](/tools/near-cli#create) that you can use to create both series

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  export SERIES_OWNER=owner.$NFT_CONTRACT_ID

  near create-account $SERIES_OWNER --use-account $NFT_CONTRACT_ID --initial-balance 3 --network-id testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  export SERIES_OWNER=owner.$NFT_CONTRACT_ID

  near account create-account fund-myself $SERIES_OWNER '3 NEAR' autogenerate-new-keypair save-to-keychain sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Basic Series

You'll now need to create the simple series with no price and no royalties. If you try to run the following command before adding the owner account as an approved creator, the contract should throw an error.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID create_series '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' --gas 100000000000000 --deposit 1 --accountId $SERIES_OWNER --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID create_series json-args '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as $SERIES_OWNER network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

The expected output is an error thrown: `ExecutionError: 'Smart contract panicked: only approved creators can add a type`. If you now add the series owner as a creator, it should work.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID add_approved_creator '{"account_id": "'$SERIES_OWNER'"}' --gas 100000000000000 --accountId $SERIES_OWNER --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID add_approved_creator json-args '{"account_id": "'$SERIES_OWNER'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID create_series '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' --gas 100000000000000 --deposit 1 --accountId $SERIES_OWNER --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID create_series json-args '{"id": 1, "metadata": {"title": "SERIES!", "description": "testing out the new series contract", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}}' prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as $SERIES_OWNER network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you now query for the series information, it should work!

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $NFT_CONTRACT_ID get_series '{}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $NFT_CONTRACT_ID get_series json-args {} network-config testnet now
  ```
  </TabItem>
</Tabs>

Which should return something similar to:

```js
[
  {
    series_id: 1,
    metadata: {
      title: 'SERIES!',
      description: 'testing out the new series contract',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.nft_contract.testnet'
  }
]
```

<hr class="subsection" />

### Series With a Price

Now that you've created the first, simple series, let's create the second one that has a price of 1 $NEAR associated with it.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID create_series '{"id": 2, "metadata": {"title": "COMPLEX SERIES!", "description": "testing out the new contract with a complex series", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "price": "500000000000000000000000"}' --gas 100000000000000 --deposit 1 --accountId $SERIES_OWNER --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID create_series json-args '{"id": 2, "metadata": {"title": "COMPLEX SERIES!", "description": "testing out the new contract with a complex series", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "price": "500000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as $SERIES_OWNER network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you now paginate through the series again, you should see both appear.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $NFT_CONTRACT_ID get_series '{}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $NFT_CONTRACT_ID get_series json-args {} network-config testnet now
  ```
  </TabItem>

</Tabs>

Which has

```js
[
  {
    series_id: 1,
    metadata: {
      title: 'SERIES!',
      description: 'testing out the new series contract',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.nft_contract.testnet'
  },
  {
    series_id: 2,
    metadata: {
      title: 'COMPLEX SERIES!',
      description: 'testing out the new contract with a complex series',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    royalty: null,
    owner_id: 'owner.nft_contract.testnet'
  }
]
```

---

## Minting NFTs

Now that you have both series created, it's time to now mint some NFTs. You can either login with an existing NEAR wallet using [`near login`](/tools/near-cli#import) or you can create a sub-account of the NFT contract. In our case, we'll use a sub-account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  export BUYER_ID=buyer.$NFT_CONTRACT_ID

  near create-account $BUYER_ID --use-account $NFT_CONTRACT_ID --initial-balance 1 --network-id testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  export BUYER_ID=buyer.$NFT_CONTRACT_ID

  near account create-account fund-myself $BUYER_ID '1 NEAR' autogenerate-new-keypair save-to-keychain sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Lazy Minting

The first workflow you'll test out is [lazy minting](#lazy-minting) NFTs. If you remember, the second series has a price associated with it of 1 $NEAR. This means that there are no minting restrictions and anyone can try and purchase the NFT. Let's try it out.

In order to view the NFT in the NEAR wallet, you'll want the `receiver_id` to be an account you have currently available in the wallet site. Let's export it to an environment variable. Run the following command but replace `YOUR_ACCOUNT_ID_HERE` with your actual NEAR account ID.

```bash
export NFT_RECEIVER_ID=YOUR_ACCOUNT_ID_HERE
```
Now if you try and run the mint command but don't attach enough $NEAR, it should throw an error.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' --gas 100000000000000 --accountId $BUYER_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $BUYER_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

Run the command again but this time, attach 1.5 $NEAR.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' --gas 100000000000000 --deposit 1.5 --accountId $BUYER_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"id": "2", "receiver_id": "'$NFT_RECEIVER_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '1.5 NEAR' sign-as $BUYER_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

This should output the following logs.

```bash
Receipts: BrJLxCVmxLk3yNFVnwzpjZPDRhiCinNinLQwj9A7184P, 3UwUgdq7i1VpKyw3L5bmJvbUiqvFRvpi2w7TfqmnPGH6
	Log [nft_contract.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["2:1"]}]}
Transaction Id FxWLFGuap7SFrUPLskVr7Uxxq8hpDtAG76AvshWppBVC
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/FxWLFGuap7SFrUPLskVr7Uxxq8hpDtAG76AvshWppBVC
''
```

If you check the explorer link, it should show that the owner received on the order of `0.59305 $NEAR`.

<img width="80%" src="/docs/assets/nfts/explorer-payout-series-owner.png" />

<hr class="subsection" />

### Becoming an Approved Minter

If you try to mint the NFT for the simple series with no price, it should throw an error saying you're not an approved minter.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $BUYER_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $BUYER_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

Go ahead and run the following command to add the buyer account as an approved minter.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID add_approved_minter '{"account_id": "'$BUYER_ID'"}' --gas 100000000000000 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID add_approved_minter json-args '{"account_id": "'$BUYER_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

If you now run the mint command again, it should work.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $BUYER_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"id": "1", "receiver_id": "'$NFT_RECEIVER_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $BUYER_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Viewing the NFTs in the Wallet

Now that you've received both NFTs, they should show up in the NEAR wallet. Open the collectibles tab and search for the contract with the title `NFT Series Contract` and you should own two NFTs. One should be the complex series and the other should just be the simple version. Both should have ` - 1` appended to the end of the title because the NFTs are the first editions for each series.

<img width="80%" src="/docs/assets/nfts/series-wallet-collectibles.png" />

Hurray! You've successfully deployed and tested the series contract! **GO TEAM!**.

---

## Conclusion

In this tutorial, you learned how to take the basic NFT contract and iterate on it to create a complex and custom version to meet the needs of the community. You optimized the storage, introduced the idea of collections, created a lazy minting functionality, hacked the enumeration functions to save on storage, and created an allowlist functionality.

You then built the contract and deployed it on chain. Once it was on-chain, you initialized it and created two sets of series. One was complex with a price and the other was a regular series. You lazy minted an NFT and purchased it for `1.5 $NEAR` and then added yourself as an approved minter. You then minted an NFT from the regular series and viewed them both in the NEAR wallet.

Thank you so much for going through this journey with us! I wish you all the best and am eager to see what sorts of neat and unique use-cases you can come up with. If you have any questions, feel free to ask on our [Discord](https://near.chat) or any other social media channels we have. If you run into any issues or have feedback, feel free to use the `Feedback` button on the right.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
