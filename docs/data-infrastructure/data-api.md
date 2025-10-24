---
id: data-apis
title: Data APIs
description: "Explore community-built APIs for accessing on-chain data"
---

import Card from '@site/src/components/UI/Card';

If you are building a decentralized applications, chances are that you will need to query on-chain data. Since building a full indexer is not always feasible, the community has created a set of APIs that you can use to query data from the NEAR blockchain.

These APIs provide a simple way to access on-chain data without having to run your own indexer or node. They are designed to be easy to use and provide a wide range of functionality, from querying account balances to exploring transactions and blocks.

---

## FastNEAR API

The [FastNEAR API](https://github.com/fastnear/fastnear-api-server-rs?tab=readme-ov-file#api-v1) allows to easily query the NEAR blockchain to get an account's assets, map keys into account IDs, explore a block's transactions, etc.

Possible use cases include:
- Querying all assets of an account (including fungible and non-fungible tokens)
- Querying the last block produced
- Mapping Public Key to Account ID
- Mapping Full Access Public Key to Account ID
- Knowing a user's staking pools (validators)
- Querying the top holders of a token

<br />

#### Examples

```bash
# Query user's FTs
curl https://api.fastnear.com/v1/account/root.near/ft

# Query user's NFTs
curl https://api.fastnear.com/v1/account/root.near/nft

# Query all user's assets
curl https://api.fastnear.com/v1/account/root.near/full
```

---

## NearBlocks API

[NearBlocks API](https://api.nearblocks.io/api-docs/) provides an endpoint to query actions that happened on a NEAR account, possible use cases include:

- Query an account balance
- Query all function calls to specific contract
- Get total NEAR supply and circulating supply
- Query the number of total transactions on NEAR 

<br />

#### Examples

```bash
# All the transactions where somebody called `create_drop` on Keypom
curl -X GET "https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop"

# All the times that `gagdiez.near` called `create_drop` on Keypom
curl -X GET "https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop&from=gagdiez.near"
```

---

## Pikespeak API

The [Pikespeak API](https://doc.pikespeak.ai/) allows you to fetch blockchain events and aggregated analytics on wallets, validators, delegators, money transfers, dApps activity, and more.

Use case includes:
- Querying account balances
- Querying the most active wallets
- Querying historic account events

_To access the Pikespeak API you'll need to [register and create an account](https://pikespeak.ai/plans). Once you're registered, under the [`My Account`](https://pikespeak.ai/myaccount) page you can get your API key_

<br />

#### Examples

```sh
# Check the account balance for `root.near`:
curl -X GET https://api.pikespeak.ai/account/balance/root.near -H "accept: application/json" -H "x-api-key: YOUR-PIKESPEAK-API-KEY"

# Most active wallets NEAR senders
curl -X GET https://api.pikespeak.ai/hot-wallets/near -H "accept: application/json" -H "x-api-key: YOUR-PIKESPEAK-API-KEY"

# Get historic account events for `keypom.near`
curl -X GET https://api.pikespeak.ai/event-historic/keypom.near -H "accept: application/json" -H "x-api-key: YOUR-PIKESPEAK-API-KEY"
```

---

## The Graph

[The Graph](https://thegraph.com/docs/en/cookbook/near/) gives developers tools to process blockchain events and make the resulting data easily available via a GraphQL API, known individually as a subgraph. [Graph Node](https://github.com/graphprotocol/graph-node) is now able to process NEAR events, which means that NEAR developers can now build subgraphs to index their smart contracts.

---
## SubQuery

[SubQuery](https://academy.subquery.network/quickstart/quickstart_chains/near.html): A fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across NEAR and many other chains