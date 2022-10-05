---
sidebar_position: 5
---

# NEAR Lake Indexer

:::note GitHub repo

https://github.com/near/near-lake-indexer/

:::

![NEAR Lake pushes the data to AWS S3](/docs/intro/near-lake.png)


## Description

NEAR Lake is an indexer built on top of [NEAR Indexer Framework](./near-indexer-framework) to watch the network and store all the events as JSON files on AWS S3.

## History

We used to have [NEAR Indexer for Explorer](./near-indexer-for-explorer) watching the network and storing all the events in a PostgreSQL database. Unfortunately, in time, PostgreSQL became the main bottleneck for us. So after some brainstorming/research sessions, we decided to go with a SingleStore database instead.

Knowing the fact that [NEAR Explorer](https://explorer.near.org) is not the only project that uses the [Indexer for Explorer](./near-indexer-for-explorer)'s database, we wanted to come up with a concept that will allow us to cover even more projects that can benefit from the data from NEAR Protocol.

That's why we decided to store the data from the blockchain as JSON files on an AWS S3 bucket that can be used as a data source for different projects.

As "Indexer for Explorer Remake" project we are going to have `near-lake` as a data writer. There's going to be another project that will read from AWS S3 bucket and will store all the data in SingleStore database. This will replace [NEAR Indexer for Explorer](./near-indexer-for-explorer) PostgreSQL database at some moment and will become the main source for NEAR Explorer.

## How it works

:::note

Pagoda Inc. runs NEAR Lake nodes to store the data in JSON format on AWS S3

There is no need to run NEAR Lake by your own unless you have specific reasons to do that.

:::

There are AWS S3 buckets created:

- `near-lake-data-testnet` (`eu-central-1` region)
- `near-lake-data-mainnet` (`eu-central-1` region)

All the buckets are set up the way the requester pays for the access. Anyone can read from these buckets by connecting to them with their own AWS credentials to be charged by Amazon.

### Data structure

The data structure we use is the following:

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


## How to use it

We have created [NEAR Lake Framework](./near-lake-framework) to have a simple straightforward way to create an indexer on top of the data stored by NEAR Lake itself.

:::tip NEAR Lake Framework announcement

We have announced the release of NEAR Lake Framework on NEAR Governance Forum.

Please, read the post [there](https://gov.near.org/t/announcement-near-lake-framework-brand-new-word-in-indexer-building-approach/17668).

:::
