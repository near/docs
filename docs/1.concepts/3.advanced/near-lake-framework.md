---
sidebar_label: "Lake Framework"
---

# NEAR Lake Framework

:::note GitHub repo

https://github.com/near/near-lake-framework/

:::

## Description

NEAR Lake Framework is an ecosystem of library companions to [NEAR Lake](/build/data-infrastructure/lake-framework/near-lake). They allow you to build your own indexer that subscribes to the stream of blocks from the [NEAR Lake](/build/data-infrastructure/lake-framework/near-lake) data source and create your own logic to process the NEAR Protocol data in the programming languages of your choice (at the moment, there are implementations in [Python](http://pypi.org/project/near-lake-framework), [JavaScript](https://www.npmjs.com/package/near-lake-framework), and [Rust](https://crates.io/crates/near-lake-framework)).

:::tip NEAR Lake Framework announcement

We have announced the release of NEAR Lake Framework on NEAR Governance Forum.

Please, read the post [here](https://gov.near.org/t/announcement-near-lake-framework-brand-new-word-in-indexer-building-approach/17668).

:::


## How does it compare to [NEAR Indexer Framework](near-indexer-framework.md)?

Feature | Indexer Framework | Lake Framework
------- | ----------------- | --------------
Allows to follow the blocks and transactions in the NEAR Protocol | **Yes** | **Yes**<br />(but only mainnet and testnet networks)
Decentralized | **Yes** | No<br />(Pagoda Inc dumps the blocks to AWS S3)
Reaction time (end-to-end) | [minimum 3.8s (estimated average 5-7s)](near-indexer-framework.md#limitations) | [minimum 3.9s (estimated average 6-8s)](#limitations)
Reaction time (framework overhead only) | 0.1s | 0.2-2.2s
Estimated cost of infrastructure | [$500+/mo](https://near-nodes.io/rpc/hardware-rpc) | [**$20/mo**](#what-is-the-cost-of-running-a-custom-indexer-based-on-near-lake)
Ease of maintenance | Advanced<br />(need to follow every nearcore upgrade, and sync state) | **Easy**<br />(deploy once and forget)
How long will it take to start? | days (on mainnet/testnet) | **seconds**
Ease of local development | Advanced<br />(localnet is a good option, but testing on testnet/mainnet is too heavy) | **Easy**<br />(see [tutorials](/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer))
Programming languages that a custom indexer can be implemented with | Rust only | **Any**<br />(currently, helper packages are released in [Python](http://pypi.org/project/near-lake-framework), [JavaScript](https://www.npmjs.com/package/near-lake-framework), and [Rust](https://crates.io/crates/near-lake-framework))


## Limitations

Lake Framework relies on the data being dumped to AWS S3 from [NEAR Lake Indexer](https://github.com/near/near-lake-indexer) which is based on [NEAR Indexer Framework](near-indexer-framework.md). Thus, Lake Framework is centralized around AWS S3 storage and also around maintainers of NEAR Lake Indexer nodes (Pagoda Inc). This is the tradeoff you might still want to take given all the other benefits mentioned above.

Indexers based on the Lake Framework inherit [the latency characteristics of Indexer Framework](near-indexer-framework.md#limitations) and extra latency of dumping to and reading from AWS S3, which is estimated to add at least 50ms delay while writing to S3, and 50ms on polling and reading from S3 (to make the polling cost-efficient, we default to polling only every 2s, so in the worst case you may observe an additional 2-second latency). Thus, Lake Framework adds 0.1-2.1s latency on top of Indexer Framework. Yet, again, most of the latency is there due to the finalization delay and both Indexer Framework and Lake Framework add quite a minimum overhead.

## What is the cost of running a custom indexer based on NEAR Lake?

Indexers based on NEAR Lake consume 100-500MB of RAM depending on the size of the preloading queue, it does not require any storage, and it can potentially run even on Raspberry PI.

Getting the blockchain data from S3 will cost around $18.15 per month as NEAR Lake configured S3 buckets in such a way that the reader is paying the costs.

### AWS S3 cost breakdown

Assuming NEAR Protocol produces exactly 1 block per second (which is really not, the average block production time is 1.3s). A full day consists of 86400 seconds, that's the max number of blocks that can be produced.

According the [Amazon S3 prices](https://aws.amazon.com/s3/pricing/?nc1=h_ls) `list` requests are charged for $0.005 per 1000 requests and `get` is charged for $0.0004 per 1000 requests.

Calculations (assuming we are following the tip of the network all the time):

```
86400 blocks per day * 5 requests for each block / 1000 requests * $0.0004 per 1k requests = $0.173 * 30 days = $5.19
```
**Note:** 5 requests for each block means we have 4 shards (1 file for common block data and 4 separate files for each shard)

And a number of `list` requests we need to perform for 30 days:

```
86400 blocks per day / 1000 requests * $0.005 per 1k list requests = $0.432 * 30 days = $12.96

$5.19 + $12.96 = $18.15
```

Note, the price depends on the number of shards.

## Examples & Tutorials

- [`near-examples/near-lake-raw-printer`](https://github.com/near-examples/near-lake-raw-printer): simple example of a data printer built on top of NEAR Lake Framework
- [`near-examples/near-lake-accounts-watcher`](https://github.com/near-examples/near-lake-accounts-watcher): source code for a video tutorial on how to use the NEAR Lake Framework
- [`near-examples/indexer-tx-watcher-example-lake`](https://github.com/near-examples/indexer-tx-watcher-example-lake) indexer example that watches for transaction for specified accounts/contracts build on top of NEAR Lake Framework

:::note Tutorials

See [Tutorials page](/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer)

:::
