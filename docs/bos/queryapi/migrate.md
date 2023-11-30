---
id: migrate-from-near-lake
title: Migrate from NEAR Lake framework
sidebar_label: Migrate from Lake framework
---

In this article you'll learn how to migrate your [NEAR Lake Framework](../../1.concepts/3.advanced/near-lake-framework.md) JavaScript indexer to [Near QueryAPI](intro.md), a fully managed solution to build indexer functions,
extract on-chain data, store it in a database, and be able to query it using GraphQL endpoints.

:::info Supported languages
Currently QueryAPI only supports JavaScript, so if your indexer code uses TypeScript, Python, or Rust, you'll have to re-write your indexing logic in JS before you can migrate it.
:::

## Basic migration

Let's take a [basic JS indexer](../../3.tutorials/indexer/js-lake-indexer.md) built with NEAR Lake Framework as an example.
This indexer simply logs the Block height and the number of shards for each indexed block, using an [indexer handler](../../3.tutorials/indexer/js-lake-indexer.md#create-indexer-handler) function `handleStreamerMessage`.

Migrating this basic indexer to QueryAPI is simple. You only need to migrate the code from the `handleStreamerMessage` function:

```js
async function handleStreamerMessage(streamerMessage: types.StreamerMessage): Promise<void> {
    console.log(`
        Block #${streamerMessage.block.header.height}
        Shards: ${streamerMessage.shards.length}
    `);
}
```

### Migrating to QueryAPI

1. To start the migration process, [create a new indexer](../community/indexers.md#creating-an-indexer) using [QueryAPI](https://near.org/dataplatform.near/widget/QueryApi.App?view=create-new-indexer). You should see a similar interface like this:

![QueryAPI Indexer Dashboard](/docs/assets/QAPIScreen2.png)

2. Since QueryAPI keeps a compatibility layer with Lake Framework, you don't need to change any references to `streamerMessage` in your indexer function. Just change the function definition to:

```js
function handleStreamerMessage(streamerMessage) {
    // ... Lake framework indexer code
}
```

3. Next, add your migrated indexer function to the `getBlock(...)` method, and simply call your function passing `block.streamerMessage` as parameter:

```js
async function getBlock(block: Block) {
  // Add your code here

  function handleStreamerMessage(streamerMessage) {
    console.log(`
        Block #${streamerMessage.block.header.height}
        Shards: ${streamerMessage.shards.length}
    `);
    }

  handleStreamerMessage(block.streamerMessage);
}
```

That's all! The basic Lake Framework JS indexer has been migrated to QueryAPI, and you can test it out by using [Debug Mode](index-function.md#local-debug-mode). If you run the indexer using local debug mode, you should see an output like:

```
    Block #106812523
    Shards: 4
```

### Database storage

```sql
CREATE TABLE
  "basic_indexer" (
    "block_height" BIGINT NOT NULL,
    "shards" INTEGER NOT NULL,
    PRIMARY KEY ("block_height")
  );
```

## Advanced migration

For this example, let's take the TypeScript [NFT indexer](../../3.tutorials/indexer/nft-indexer.md) built with NEAR Lake Framework as reference. This indexer is watching for `nft_mint` [Events](https://nomicon.io/Standards/EventsFormat) and prints some relevant data about minted NFTs.

As with the previous example, moving this NFT indexer to QueryAPI requires to migrate the code from the `handleStreamerMessage` function. But since it was done in TypeScript, it also needs some additional work as it needs to re-written in JavaScript.

### Migrating to QueryAPI



### Database storage

```sql
CREATE TABLE
  "nfts" (
    "id" SERIAL NOT NULL,
    "marketplace" TEXT,
    "block_height" BIGINT,
    "block_timestamp" BIGINT,
    "receipt_id" TEXT,
    "receiver_id" TEXT,
    "nft_data" TEXT,
    PRIMARY KEY ("id", "block_height", "block_timestamp")
  );
``` 
