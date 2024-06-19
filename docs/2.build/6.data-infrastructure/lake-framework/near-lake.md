---
id: near-lake
sidebar_label: Lake Overview
title: NEAR Lake Indexer
---

NEAR Lake is an indexer built on top of [NEAR Indexer Framework](/concepts/advanced/near-indexer-framework) to watch the network and store all the event logs such as [FT Events](https://nomicon.io/Standards/Tokens/FungibleToken/Event) and [NFT Events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) as JSON files on AWS S3.

:::info GitHub repo

You can find the Lake Indexer source code in [this GitHub repository](https://github.com/near/near-lake-indexer/).

:::

### How it works

:::tip

[Pagoda Inc.](https://pagoda.co) runs NEAR Lake nodes to store the data in JSON format on AWS S3.
There is no need to run your own NEAR Lake unless you have specific reasons to do that.

:::

There are AWS S3 buckets created:

- `near-lake-data-testnet` (`eu-central-1` region)
- `near-lake-data-mainnet` (`eu-central-1` region)

All the buckets are set up the way the requester pays for the access. Anyone can read from these buckets by connecting to them with their own AWS credentials to be charged by Amazon.

### Data structure

The data structure used by Lake Indexer is the following:

```
    <block_height>/
      block.json
      shard_0.json
      shard_1.json
      ...
      shard_N.json
```

`<block_height>` is a 12-character-long [`u64`](https://doc.rust-lang.org/std/primitive.u64.html) string with leading zeros (e.g "000042839521"). See [this issue for reasoning](https://github.com/near/near-lake/issues/23).

`block_json` contains JSON-serialized `BlockView` struct. **NB!** this struct might change in the future, we will announce it

`shard_N.json` where N is [`u64`](https://doc.rust-lang.org/std/primitive.u64.html) starting from `0`. Represents the index number of the shard. In order to find out the expected number of shards in the block you can look in `block.json` at `.header.chunks_included`


### How to use it

We have created the [NEAR Lake Framework](/concepts/advanced/near-lake-framework) to have a simple straightforward way to create an indexer on top of the data stored by NEAR Lake itself.

:::info NEAR Lake Framework

You can check the NEAR Lake Framework release announcement on the [NEAR Governance Forum](https://gov.near.org/t/announcement-near-lake-framework-brand-new-word-in-indexer-building-approach/17668).

:::

We have prepared this video tutorial with a simple example to give you an overview and some practical ideas.

<iframe
 width="560"
 height="315"
 src="https://www.youtube.com/embed/GsF7I93K-EQ"
 title="NEAR Lake Indexer"
 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowfullscreen>
</iframe>
