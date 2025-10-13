---
id: near-lake-framework
title: NEAR Lake Framework
description: "NEAR Lake Framework is an ecosystem of library companions to NEAR Lake. They allow you to build your own indexer that subscribes to the stream of blocks from the NEAR Lake data source and create your own logic to process the NEAR Protocol data in the programming languages of your choice (at the moment, there are implementations in Python, JavaScript, and Rust)."
---

NEAR Lake Framework is an ecosystem of library companions that read data from the [`NEAR Data Lake`](#data-lake). They allow you to build your own indexer by simply subscribing to the stream of blocks that is being constantly pushed to the [NEAR Lake](#data-lake)

<iframe
 width="100%"
 height="400px"
 src="https://www.youtube.com/embed/GsF7I93K-EQ"
 title="NEAR Lake Indexer"
 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowfullscreen>
</iframe>
*Example of a simple indexer built on top of NEAR Lake Framework*

You can create your own logic to process the NEAR Protocol data in the programming languages of your choice:
- [Python](http://pypi.org/project/near-lake-framework)
- [JavaScript](https://github.com/near/near-lake-framework-js)
- [Rust](https://crates.io/crates/near-lake-framework)

:::note GitHub repo

https://github.com/near/near-lake-framework/

:::

---

## Data Lake

The NEAR Lake is a set of AWS S3 buckets which are constantly receiving new blocks from a [running indexer](https://github.com/aurora-is-near/near-lake-indexer) maintained by [Aurora](https://aurora.dev)

Events such as [FT Events](https://github.com/near/NEPs/tree/master/neps/nep-0300.md) and [NFT Events](https://github.com/near/NEPs/tree/master/neps/nep-0256.md) are constantly being written as JSON files in two AWS S3 buckets:

- `near-lake-data-testnet` (`eu-central-1` region)
- `near-lake-data-mainnet` (`eu-central-1` region)

Both buckets are set up the way the requester pays for the access. Anyone can read from these buckets by connecting to them with their own AWS credentials to be charged by Amazon.

---

## Latency

Indexers based on the Lake Framework inherit [the latency characteristics of a NEAR Indexer](https://github.com/near/nearcore/tree/master/chain/indexer) **plus an extra 0.1-2.1s latency** of dumping to and reading from AWS S3.

:::tip

Most of the latency is there due to the finalization delay and both Indexer Framework and Lake Framework add quite a minimum overhead.

:::

---

## Cost

Indexers based on NEAR Lake consume 100-500MB of RAM depending on the size of the preloading queue, it does not require any storage, and it can potentially run even on Raspberry PI.

Getting the blockchain data from S3 will cost around $30,16 per month as NEAR Lake configured S3 buckets in such a way that **the reader is paying the costs**.

<details>

<summary> AWS S3 Cost Breakdown </summary>

Assuming NEAR Protocol produces 1 block every 600ms, on a full day the network can create up to 144000 blocks (86400s / 600ms per block).

According to the [Amazon S3 prices](https://aws.amazon.com/s3/pricing/?nc1=h_ls) `list` requests are charged for $0.005 per 1000 requests and `get` is charged for $0.0004 per 1000 requests.

Calculations (assuming we are following the tip of the network all the time):

```
144000 blocks per day * 10 requests for each block / 1000 requests * $0.0004 per 1k requests = $0.576 * 30 days = $17.20
```

**Note:** 10 requests for each block means we have 9 shards (1 file for common block data and 9 separate files for each shard)

And a number of `list` requests we need to perform for 30 days:

```
144000 blocks per day / 1000 requests * $0.005 per 1k list requests = $0.72 * 30 days = $21.60

$17,20 + $21,60 = $30,16
```

</details>

---

## Comparison with [NEAR Indexer Framework](https://github.com/near/nearcore/tree/master/chain/indexer)

NEAR Lake Framework is reading data from AWS S3, while the NEAR Indexer is running a full node and reading data from the blockchain directly in real time.

Feature | Indexer Framework | Lake Framework
------- | ----------------- | --------------
Allows to follow the blocks and transactions in the NEAR Protocol | **Yes** | **Yes**<br />(but only mainnet and testnet networks)
Decentralized | **Yes** | No<br />(Pagoda Inc dumps the blocks to AWS S3)
Reaction time (end-to-end) | minimum 3.8s (estimated average 5-7s) | [minimum 3.9s (estimated average 6-8s)](#latency)
Reaction time (framework overhead only) | 0.1s | 0.2-2.2s
Estimated cost of infrastructure | [$500+/mo](https://near-nodes.io/rpc/hardware-rpc) | [**$20/mo**](#cost)
Ease of maintenance | Advanced<br />(need to follow every nearcore upgrade, and sync state) | **Easy**<br />(deploy once and forget)
How long will it take to start? | days (on mainnet/testnet) | **seconds**
Ease of local development | Advanced<br />(localnet is a good option, but testing on testnet/mainnet is too heavy) | **Easy**<br />(see [tutorials](./tutorials/near-lake-state-changes-indexer.md))
Programming languages that a custom indexer can be implemented with | Rust only | **Any**<br />(currently, helper packages are released in [Python](http://pypi.org/project/near-lake-framework), [JavaScript](https://www.npmjs.com/package/near-lake-framework), and [Rust](https://crates.io/crates/near-lake-framework))

---

## Examples & Tutorials

- [`near-examples/near-lake-raw-printer`](https://github.com/near-examples/near-lake-raw-printer): simple example of a data printer built on top of NEAR Lake Framework
- [`near-examples/near-lake-accounts-watcher`](https://github.com/near-examples/near-lake-accounts-watcher): source code for a video tutorial on how to use the NEAR Lake Framework
- [`near-examples/indexer-tx-watcher-example-lake`](https://github.com/near-examples/indexer-tx-watcher-example-lake) indexer example that watches for transaction for specified accounts/contracts build on top of NEAR Lake Framework

:::note Tutorials

See [Tutorials page](./tutorials/near-lake-state-changes-indexer.md)

:::
