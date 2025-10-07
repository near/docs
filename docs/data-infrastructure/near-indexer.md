---
id: near-indexer
title: NEAR Indexer
description: "NEAR Indexer is a micro-framework that provides a stream of blocks recorded on the NEAR network. It is designed to handle real-time events on the blockchain."
---

# NEAR Indexer

The NEAR Indexer is a micro-framework that delivers a stream of blocks recorded on the NEAR network. It is specifically designed to handle real-time events on the blockchain.

:::note GitHub repo

https://github.com/near/nearcore/tree/master/chain/indexer

:::

---

## Rationale

As scaling dApps enter NEAR’s mainnet, an issue may arise: how do they quickly and efficiently access state from our deployed smart contracts, and cut out the cruft? Contracts may grow to have complex data structures and querying the network RPC may not be the optimal way to access state data. The NEAR Indexer Framework allows for streams to be captured and indexed in a customized manner. The typical use-case is for this data to make its way to a relational database. Seeing as this is custom per project, there is engineering work involved in using this framework.

With the NEAR Indexer, developers can perform both high-level data aggregation and low-level introspection of blockchain events.

:::note
[Data Lake](./near-lake-framework.md#data-lake) which is a source of data for [NEAR Lake Framework](./near-lake-framework.md) is feeded by a running the [NEAR Lake Indexer](https://github.com/aurora-is-near/near-lake-indexer) that is built on top of NEAR Indexer.
:::

---

## How It Works

The NEAR Indexer works by running a node that processes blocks as they are added to the blockchain. It provides a stream of these blocks, allowing developers to subscribe to and process them in real-time.

Learn how to run it following the [tutorial](./tutorials/near-indexer.md).

---

## Latency
Comparing to [NEAR Lake Framework](./near-lake-framework.md) in terms of latency the NEAR Indexer is significantly faster as it reads data directly from the blockchain the same way as RPC nodes do.

:::info
The full comparison table you can find [here](near-lake-framework.md#comparison-with-near-indexer-framework).
:::
