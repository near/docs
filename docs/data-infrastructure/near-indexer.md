---
id: near-indexer
title: NEAR Indexer
description: "NEAR Indexer is a micro-framework that provides a stream of blocks recorded on the NEAR network. It is designed to handle real-time events on the blockchain."
---

# NEAR Indexer

As scaling dApps enter NEAR’s mainnet, an issue may arise: how do they quickly and efficiently access state from our deployed smart contracts, and cut out the cruft? Contracts may grow to have complex data structures and querying the network RPC may not be the optimal way to access state data.

The [NEAR Indexer](https://github.com/near/nearcore/tree/master/chain/indexer) is a micro-framework specifically designed to handle real-time events on the blockchain, allowing to capture and index streams of blocks in a customized manner.

With the NEAR Indexer, developers can perform both high-level data aggregation and low-level introspection of blockchain events.

:::tip

For those searching to not build their own indexer, the [NEAR Lake Framework](./near-lake-framework.md) provides a simpler way to access blockchain data in real-time

:::

---

## How It Works

The NEAR Indexer works by **running a node** and processing blocks as they are added to the blockchain. The framework provides a stream of blocks, allowing developers to subscribe and process these blocks in real-time.

:::tip

Learn how to run it following the [tutorial](./tutorials/near-indexer.md).

:::

---

## Comparison with [NEAR Lake Framework](./near-lake-framework.md)

Comparing to NEAR Lake Framework in terms of latency the NEAR Indexer is significantly faster as it reads data directly from the blockchain the same way as RPC nodes do.

Feature | Indexer Framework | Lake Framework
------- | ----------------- | --------------
Allows to follow the blocks and transactions in the NEAR Protocol | **Yes** | **Yes**<br />(but only mainnet and testnet networks)
Decentralized | **Yes** | No<br />(Pagoda Inc dumps the blocks to AWS S3)
Reaction time (end-to-end) | minimum 3.8s (estimated average 5-7s) | [minimum 3.9s (estimated average 6-8s)](./near-lake-framework.md#latency)
Reaction time (framework overhead only) | 0.1s | 0.2-2.2s
Estimated cost of infrastructure | [$500+/mo](https://near-nodes.io/rpc/hardware-rpc) | [**$20/mo**](./near-lake-framework.md#cost)
Ease of maintenance | Advanced<br />(need to follow every nearcore upgrade, and sync state) | **Easy**<br />(deploy once and forget)
How long will it take to start? | days (on mainnet/testnet) | **seconds**
Ease of local development | Advanced<br />(localnet is a good option, but testing on testnet/mainnet is too heavy) | **Easy**<br />(see [tutorials](./tutorials/near-lake-state-changes-indexer.md))
Programming languages that a custom indexer can be implemented with | Rust only | **Any**<br />(currently, helper packages are released in [Python](http://pypi.org/project/near-lake-framework), [JavaScript](https://www.npmjs.com/package/near-lake-framework), and [Rust](https://crates.io/crates/near-lake-framework))

---