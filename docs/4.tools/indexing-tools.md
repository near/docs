---
id: indexing
title: Indexing Solutions on NEAR
sidebar_label: "🔎 Indexing Solutions"
---

# Indexing Solutions on NEAR

Here's a quick overview of Indexer projects on the NEAR ecosystem:

- [NEAR Indexer Framework](https://docs.near.org/concepts/advanced/near-indexer-framework): a micro-framework providing you with a "live" stream of blocks. Useful to handle on-chain real-time "events".

- [NEAR Indexer for Explorer](https://docs.near.org/tools/indexer-for-explorer): an indexer built on top of the indexer microframework. It watches and stores all events/data from the blockchain to a **PostgreSQL database**.
You can clone the [GitHub repository](https://github.com/near/near-indexer-for-explorer) and customize your own indexer solution.

- [NEAR Lake Framework](https://docs.near.org/concepts/advanced/near-lake-framework): a companion library to NEAR Lake. It allows you to build your own indexer that watches a stream of blocks **from a NEAR Lake data source** and allows you to **create your own logic to process that data**. Keep in mind this is **probably the one you want to use for future projects**, instead of the Indexer Framework. Read [why is better](https://docs.near.org/concepts/advanced/near-indexer-framework#why-is-it-better-than-near-indexer-framework).

- [NEAR Lake Indexer](https://docs.near.org/concepts/advanced/near-lake-framework): an indexer built on top of the indexer 
microframework. It watches the blockchain and stores all events/data from the blockchain as **JSON files on AWS S3 or S3 compatible storage**.

- [Pagoda NEAR Lake](https://docs.pagoda.co/near-lake): with this fully managed solution by [Pagoda Inc.](https://pagoda.co), you don't need to run your own NEAR Lake Nodes and AWS S3 buckets.

- [The Graph](https://thegraph.com/docs/en/cookbook/near/): development tools to process blockchain events and make the resulting data easily available via a GraphQL API, known individually as a subgraph. [Graph Node](https://github.com/graphprotocol/graph-node) is able to process NEAR events, which means that NEAR developers can build subgraphs to index their smart contracts.

- [GetBlock](https://getblock.io/explorers/near/blocks/): developer tools offering a simple and reliable API access to multiple blockchains including NEAR Protocol.

- [NearBlocks](https://api.nearblocks.io/api-docs/#/): build precise & reliable dApps with NearBlocks APIs.

- [NEAR Smart Events](https://nearsmart.events/): started during [METABUILD III](https://devpost.com/software/near-smart-events) hackathon, this tool lets you react to NEAR on-chain complex events, without using code.

- [Octopus Network NEAR Indexer](https://github.com/octopus-network/octopus-near-indexer-s3): an indexing solution based on NEAR Lake framework.

- [Covalent](https://www.covalenthq.com/docs/networks/aurora/): for [Aurora EVM](https://aurora.dev/) indexing, Covalent provides a unified API bringing visibility to billions of Web3 data points.
