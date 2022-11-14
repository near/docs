---
id: indexing
title: NEAR Indexer for Explorer
sidebar_label: "Indexing Solutions"
---

# Indexing Solutions on NEAR

Here's a quick overview of Indexer projects on the NEAR ecosystem:

- [NEAR Indexer Framework](https://docs.near.org/concepts/advanced/near-indexer-framework): a micro-framework providing you with a "live" stream of blocks. Useful to handle on-chain real-time "events".

- [NEAR Indexer for Explorer](https://docs.near.org/tools/indexer-for-explorer): an indexer built on top of the indexer microframework. It watches and stores all events/data from the blockchain to a **PostgreSQL database**.
You can clone the [GitHub repository](https://github.com/near/near-indexer-for-explorer) and customize your own indexer solution.

- [NEAR Lake Framework](https://docs.near.org/concepts/advanced/near-lake-framework): a companion library to NEAR Lake. It allows you to build your own indexer that watches a stream of blocks **from a NEAR Lake data source** and allows you to **create your own logic to process that data**. Keep in mind this is **probably the one you want to use for future projects**, instead of the Indexer Framework. Read [why is better](https://docs.near.org/concepts/advanced/near-indexer-framework#why-is-it-better-than-near-indexer-framework).

- [NEAR Lake Indexer](https://docs.near.org/concepts/advanced/near-lake-framework): an indexer built on top of the indexer 
microframework. It watches the blockchain and stores all events/data from the blockchain as **JSON files on AWS S3 or S3 compatible storage**.

- [The Graph](https://thegraph.com/docs/en/cookbook/near/): The Graph gives developers tools to process blockchain events and make the resulting data easily available via a GraphQL API, known individually as a subgraph. [Graph Node](https://github.com/graphprotocol/graph-node) is now able to process NEAR events, which means that NEAR developers can now build subgraphs to index their smart contracts.

- [Nearscope](https://nearscope.net/): a node validator explorer.

- [Stats Gallery](https://stats.gallery/): Investigate your NEAR account.

- [DappLooker](https://dapplooker.com/): analyze and query NEAR blockchain data, build dashboards to visualize data and share with your community.

- [Octopus Network NEAR Indexer](https://github.com/octopus-network/octopus-near-indexer-s3)

<!--
Create a section that lists all indexing solutions:
- NEAR Lake as a framework that anyone can run
- NEAR Lake as a hosted service by Pagoda Console
- NEAR Indexer for explorer repo (users can clone)

it should contain TheGraph, KitWallet's, Covalent for Aurora and what NearBlocks, FiNER are building. Enhanced API is also part of that.
-->
