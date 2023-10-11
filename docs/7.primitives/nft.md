---
id: nft
title: NFT Primitive
hide_table_of_contents: false
---
import {FeatureList, Column, Feature} from "@site/components/featurelist"
import ContactUs from '@site/components/ContactUs.mdx';

This page will contain all you need to know about NFT Primitives

### TODO

[ ] Gather things from the ecosystem (Paras, Mintbase, ...)

[ ] Have a comprehensive list of what people will expect to find

[ ] Etc.
 
---

Introductory words
- [What is an NFT?](#what-is-an-nft)
- [How to create NFT collection](#how-to-create-nft-collection)
- [How to request NFT related data](#how-to-request-nft-related-data)
  - [Marketplaces API](#marketplaces-api)
    - [Paras](#paras)
      - [Get list of user tokens](#get-list-of-user-tokens)
      - [Get list of user collections](#get-list-of-user-collections)
      - [Get token data](#get-token-data)
    - [Mintbase](#mintbase)
      - [Get list of user tokens](#get-list-of-user-tokens-1)
      - [Get list of user collections](#get-list-of-user-collections-1)
      - [Get token data](#get-token-data-1)
  - [Pagoda API](#pagoda-api)
  - [Indexers](#indexers)
  - [Blockchain](#blockchain)
- [How to use NFT from a BOS](#how-to-use-nft-from-a-bos)
- [How to use NFT from a Web App](#how-to-use-nft-from-a-web-app)
- [How to use NFT from a Smart Contract](#how-to-use-nft-from-a-smart-contract)
  - [How Does it Work?](#how-does-it-work)
- [Examples](#examples)

## What is an NFT?

---

## How to create NFT collection

---

## How to request NFT related data

One of the most popular task related with NFT is getting list of user's tokens. Let's look at different ways to do this.

### Marketplaces API

There are several NFT marketplaces in the NEAR ecosystem. Typically, each marketplace provides an API for developers. APIs allow to request various data - user NFTs, collections data, tokens, etc. However, you need to remember that every marketplace has an indexer in its architecture. They can implement their own indexer or use a third-party one. Therefore, the results of seemingly identical requests to the API of different marketplaces may be different.

Developers can use their APIs for getting 

:::info NFT & Marketplaces
Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.
:::

#### Paras

##### Get list of user tokens
Describe method https://api-v2-mainnet.paras.id/token?owner_id=cryptogarik.near&__skip=0&__limit=300

##### Get list of user collections
Describe method https://api-v2-mainnet.paras.id/owned-collections?accountId=cryptogarik.near

##### Get token data
Describe method https://api-v2-mainnet.paras.id/token/x.paras.near::1/1:2

:::info
See the [Paras API documentation](https://parashq.github.io/) for the full list of available methods.
:::

#### Mintbase

Mintbase works with GraphQL queries to their API.

##### Get list of user tokens
Describe method mb_views_nft_owned_tokens_ (and mb_views_nft_owned_tokens_aggregate)

##### Get list of user collections
Describe method _NEED_TO_FIND_

##### Get token data
Describe method _NEED_TO_FIND_

:::info
See the [Mintbase API documentation](https://docs.mintbase.xyz/dev/mintbase-graph) for the full list of available methods.
:::

:::tip
Mintbase provides [Mintbase JS SDK](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) with methods to get data from blockchain, interact with Mintbase contracts, etc.
:::

### Pagoda API

Pagoda is Web3 Startup Platform. They build all the tools developers need to build, launch, and grow their Web3 startup. Including API to interact with NFT.

For example, if you want to get user collections overview:
Describe method https://docs.pagoda.co/api#/paths/accounts-account_id--NFT/get

Or you need to retrieve NFT contract metadata:
Describe method https://docs.pagoda.co/api#/paths/nep171-metadata-contract_account_id/get

Get NFT history
Describe method https://docs.pagoda.co/api#/paths/NFT-contract_account_id---token_id--history/get

### Indexers
Unfortunately, there is no free public indexer with NFT events support yet.

You can run your own NFT indexer following [the tutorial for JavaScript](https://docs.near.org/tutorials/indexer/nft-indexer) or [the tutorial for Python](https://docs.near.org/tutorials/indexer/python-nft-indexer).

Or you can try multichain [indexer.xyz](https://www.indexer.xyz/).

### Blockchain

How to interact with NFT from smart contracts is described below. Here you can find a few tips how to use [near-cli](https://docs.near.org/tools/near-cli) and call methods of NFT contracts.

```near-cli``` is useful when you need to do something manually. Using ```near-cli``` you can make anything on NEAR blockchain - create NFT series, mint NFT, get token data from smart contracts.

```bash
# Getting the price of a specific token series based on the provided series id.
near view paras-token-v2.testnet nft_get_series_price '{"token_series_id":"3"}'
```

If you want to interact with NFT smart contracts using ```near-cli```, you need to know contract id (like ```paras-token-v2.testnet```), its methods and parameters.

```bash
# Calling a mint method from nft-contract
near call <nft-contract> nft_mint '{"token_id": "<token-unique-id>", "receiver_id": "<nft-owner-account>", "token_metadata": {"title": "<title>", "description": "<description>", "media": "<url>" }, "royalties": {"<account>" : <percentage>, "<account>" : <percentage>}}' --accountId <your-account>
```

---

## How to use NFT from a BOS

The Blockchain Operating System (BOS) simplifies building, deploying and accessing decentralized frontends. As with any frontend, you can request data from various APIs. See [How to request NFT related data](#how-to-request-nft-related-data).

But BOS differs from classic web applications by the ability to reuse components created by other developers. It means that you can use or fork and customize any existing widget on BOS.

Some widgets that may be useful:
- [NFT Marketplace by Mintbase](https://near.org/near/widget/ComponentDetailsPage?src=mintbase.near/widget/nft-marketplace) - the component shows the way how to use Mintbase API and build NFT marketplace.

- [NFT Selector](https://near.org/near/widget/ComponentDetailsPage?src=minorityprogrammers.near/widget/NFTSelector) - list of NFTs of the currently logged-in user based on Mintbase API. Also, this components shows the way how to reuse components which were developed by other contributors.

- [NFT Transfer](https://near.org/near/widget/ComponentDetailsPage?src=onboarder.near/widget/NFT-Transfer) - widget allows you to transfer any of your NFTs to any valid address.

- [List to Market](https://near.org/near/widget/ComponentDetailsPage?src=mintbase.near/widget/ListToMarket) - put up user NFTs for sale on Mintbase Market.

- [NFT Holders](https://near.org/near/widget/ComponentDetailsPage?src=hack.near/widget/verified.holders) - list of the NFT collection holders based on data from NFT contract.

---

## How to use NFT from a Web App

In order to interact with NFT from your Web App you can request data from various APIs from your app. See [How to request NFT related data](#how-to-request-nft-related-data).

Moreover, there are few SDKs you might find useful.

1. [JavaScript API](https://docs.near.org/tools/near-api-js/quick-reference) - the library is also known as ```near-api-js```. Using this library on the client side developer can interact with NEAR blockchain, send tokens, deploy contracts, manage accounts and keys, call smart contract methods, etc.

:::tip
Paras provides an example [how to use ```near-api-js``` with Paras contract](https://docs.paras.id/using-near-api-js).
:::

2. [Mintbase JS SDK](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) - allows interact with smart contracts, manage wallet connections, get blockchain data, upload metadata to storage, manage keys, etc.

---

## How to use NFT from a Smart Contract

If you want to create your own NFT contract this resources might be useful:
- [Example implementation](https://github.com/near-examples/NFT) of a NFT contract (in Rust) which uses [near-contract-standards](https://github.com/near/near-sdk-rs/tree/master/near-contract-standards) and workspaces-js and -rs tests.

- [NFT Zero to Hero Tutorial](https://docs.near.org/tutorials/nfts/introduction) explores every aspect of the [NEP-171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md) standard including an NFT marketplace.

But what if you need to get information about a NFT inside your smart contract?

There is a short example how to do it. Public function ```add_token_series``` saves data about a particular token series in your contract. Function accepts only the string id parameter and gets details from NFT contract. In that case it is a Paras contract.

```rust	
pub fn add_token_series(&mut self, id: String) {
  assert_eq!(self.owner_ids.contains(&env::predecessor_account_id()), true, "ERR_NO_ACCESS");

  let log_message = format!("Token series id: {:?}", id);
  env::log(log_message.as_bytes());

  ext_paras_receiver::nft_get_series_single(
    id,
    &"paras-token-v2.testnet".to_string(), //contract account to make the call to
    0, //attached deposit
    30_000_000_000_000,
  );

  //we then resolve the promise and call nft_resolve_transfer on our own contract
  .then(ext_self::resolve_paras_token_series(
    &env::current_account_id(), //contract account to make the call to
    0, //attached deposit
    30_000_000_000_000, //GAS attached to the call
  ));
}

pub fn resolve_paras_token_series(&mut self) {
  let log_message = format!("Get token series cross-contract callback");
  env::log(log_message.as_bytes());

  match env::promise_result(0) {
    PromiseResult::NotReady => unreachable!(),
    PromiseResult::Failed => env::panic(b"Unable to get user tokens"),
    PromiseResult::Successful(result) => {
      let token_series = near_sdk::serde_json::from_slice::<TokenSeriesJson>(&result).unwrap();

      let log_message = format!("User tokens: {:?}", token_series);
      env::log(log_message.as_bytes());

      self.tokens_series.insert(&token_series.token_series_id, &token_series);
    },
  }
}
```

### How Does it Work?
Describe step by step.

:::info
  [Cross contract calls](https://docs.near.org/tutorials/examples/xcc)
:::

---

## Examples

Should we build and add some 