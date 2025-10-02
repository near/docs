---
id: introduction
title: Data APIs
sidebar_label: Introduction
description: "Learn about Data APIs that let you query NEAR blockchain data without running an indexer."

---

If you are building a decentralized applications, chances are that you will need to query on-chain data. Since building a full indexer is not always feasible, the community has created a set of APIs that you can use to query data from the NEAR blockchain.

These APIs provide a simple way to access on-chain data without having to run your own indexer or node. They are designed to be easy to use and provide a wide range of functionality, from querying account balances to exploring transactions and blocks.

---

## [FastNEAR API](./fastnear-api.md)

[FastNEAR](https://fastnear.com/) allows to easily query the NEAR blockchain to get an account's assets, map keys into account IDs, explore a block's transactions, etc.

Possible use cases include:
- Querying all assets of an account (including fungible and non-fungible tokens)
- Querying the last block produced
- Mapping Public Key to Account ID
- Mapping Full Access Public Key to Account ID
- Knowing a user's staking pools (validators)
- Querying the top holders of a token

---

## [NearBlocks API](./nearblocks-api.md)

[NearBlocks](https://api.nearblocks.io/api-docs/) provides an endpoint to query actions that happened on a NEAR account, possible use cases include:

- Query an account balance
- Query all function calls to specific contract
- Get total NEAR supply and circulating supply
- Query the number of total transactions on NEAR 

---

## [Pikespeak API](./pikespeak-api.md)

[Pikespeak](https://pikespeak.ai) allows you to fetch blockchain events and aggregated analytics on wallets, validators, delegators, money transfers, dApps activity, and more.

Use case includes:
- Querying account balances
- Querying the most active wallets
- Querying historic account events

