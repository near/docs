---
id: indexing
title: Indexing Solutions on NEAR
sidebar_label: Indexing Solutions
description: "Indexers track NEAR blockchain data, process transactions, and enable fast queries for apps and explorers."
---

Indexers are services that are constantly listening to the blockchain, processing the transactions and storing them in a database that can be easily queried.

Indexers are used by apps that need to access blockchain data efficiently, such as wallets and explorers.

- [BigQuery](../data-infrastructure/big-query.md): Blockchain data indexing in NEAR Public Lakehouse is for anyone wanting to understand blockchain data.

- [NEAR Lake Framework](../data-infrastructure/lake-framework/near-lake.md): a companion library to NEAR Lake. It allows you to build your own indexer that watches a stream of blocks **from a NEAR Lake data source** and allows you to **create your own logic to process that data**. Keep in mind this is **the one you want to use for future projects**, instead of the Indexer Framework. Read [why it is better](/data-infrastructure/lake-framework/near-lake-framework#how-does-it-compare-to-near-indexer-framework).

- [Indexer.xyz Multichain Indexer](https://indexer.xyz/): Indexer.xyz is an application layer that you can build your NFT or DeFi applications entirely on top of. In addition to raw transaction indexing, Indexer.xyz provides you with a standardized GraphQL API layer to easily tap into transactions across contracts and chains.

- [The Graph](https://thegraph.com/docs/en/cookbook/near/): development tools to process blockchain events and make the resulting data easily available via a GraphQL API, known individually as a subgraph. [Graph Node](https://github.com/graphprotocol/graph-node) is able to process NEAR events, which means that NEAR developers can build subgraphs to index their smart contracts.

- [GetBlock](https://getblock.io/explorers/near/blocks/): developer tools offering a simple and reliable API access to multiple blockchains including NEAR Protocol.

- [NearBlocks](https://api.nearblocks.io/api-docs/#/): build precise & reliable dApps with NearBlocks APIs.

- [Covalent](https://www.covalenthq.com/docs/networks/aurora/): for [Aurora EVM](https://aurora.dev/) indexing, Covalent provides a unified API bringing visibility to billions of Web3 data points.

- [NEAR Indexer Framework](https://github.com/near/nearcore/tree/master/chain/indexer): a micro-framework providing you with a "live" stream of blocks. Useful to handle on-chain real-time `events`.

- [NEAR Indexer for Explorer](https://github.com/near/near-indexer-for-explorer): an indexer built on top of the indexer microframework. It watches and stores all events/data from the blockchain to a **PostgreSQL database**.
  You can clone the [GitHub repository](https://github.com/near/near-indexer-for-explorer) and customize your own indexer solution.

- [SubQuery](https://academy.subquery.network/quickstart/quickstart_chains/near.html): is an end to end multi-blockchain indexing solution that provides NEAR developers with fast, flexible, universal, open source and decentralized APIs for web3 projects. The [NEAR starter project](https://github.com/subquery/near-subql-starter/tree/main/Near/near-starter) provides a template for developers to get up and running within minutes.
