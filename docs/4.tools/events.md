---
id: realtime
title: Track Real Time Events
---

While developing a decentralized app you might want track specific events in real time. For example, you could want
to be informed each time a specific NFT marketplace makes a sell. For this to be possible you need:

1. A way for the contract to inform that an event took place.
2. A way to track such events in real time.

To tackle these challenges is that the [standard events format (NEP-297)](https://nomicon.io/Standards/EventsFormat) was created.
[NEP-297](https://nomicon.io/Standards/EventsFormat) defines a standard way for contracts to inform about an event. Since these
events are public, a service can then be built to track them in real time through the use of websocket.

---

## NEP-297 - Events
In NEAR, `Events` use the standard logs capability of contracts, since every log is forever stored in the blockchain. In this way,
Events are normal log entries that start with the `EVENT_JSON:` prefix, followed by a single valid JSON string. The JSON string
must codify an object with the following interface:

```ts
interface EventLogData {
    standard: string, // name of standard, e.g. nep171
    version: string, // e.g. 1.0.0
    event: string, // type of the event, e.g. nft_mint
    data?: unknown, // event data defined in the nep171
}
```

See the [NEP-297 page](https://nomicon.io/Standards/EventsFormat) for examples.

:::warning
There is a known limitation of 16kb strings when capturing logs
:::

---

## Listening to Events (Mainnet)

To listen to events in the `mainnet` simply connect to the secure websocket `wss://events.near.stream/ws`. There is no websocket **for `testnet`**.

As first message you will need to pass an object stating the type of events you want to filter for, and a limit if necessary. For example, here we filter for the `nft_mint` event in the `nft.nearapps.near` account.

```json
{
  secret: "ohyeahnftsss",
  filter: [{
    "account_id": "nft.nearapps.near",
    "status": "SUCCESS",
    "event": {
      "standard": "nep171",
      "event": "nft_mint",
    }
  }],
  fetch_past_events: 20,
}
```

:::caution
There is no websocket implemented for `testnet`, but you can run your own using this [modified indexer](https://github.com/evgenykuzyakov/indexer-tutorials/tree/master/example-indexer) to
populate a database with events, and then serve them using the [event-api project](https://github.com/evgenykuzyakov/event-api). 
:::

:::tip Reference implementation
If you need a reference implementation, [here is a project from Evgeny Kuzyakov](https://github.com/evgenykuzyakov/nft-mints)
that listens for **all** `nft_mint` and `nft_transfer` events in the NEAR network.
:::

---

## NEAR Lake Indexer

NEAR Lake is an indexer built on top of [NEAR Indexer Framework](https://near-indexers.io/docs/projects/near-indexer-framework) to watch the network and store all the events as JSON files on AWS S3.

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

We have created the [NEAR Lake Framework](https://near-indexers.io/docs/projects/near-lake-framework) to have a simple straightforward way to create an indexer on top of the data stored by NEAR Lake itself.

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
