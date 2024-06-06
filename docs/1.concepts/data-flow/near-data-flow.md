---
sidebar_label: "NEAR Data Flow"
---

# NEAR Data Flow


<iframe
 width="100%"
 height="500"
 src="https://www.youtube.com/embed/VSBJ-A69Km4"
 title="YouTube video player"
 frameborder="0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowfullscreen>
</iframe>


:::info Data flow

In this video we give a quick overview on the main concept of how the data flows across the NEAR Protocol blockchain.

:::

NEAR Protocol blockchain data flow might be a bit tricky at a glance. But it is pretty straightforward and follows well-defined rules. In this article, we are going to have a closer look at how the data flows in NEAR Protocol blockchain.

In fact, any blockchain flow can be represented as an infinity timeline that has a start but has no end.


![Blocks Timeline](/docs/flow/01-timeline.png)


And a block appears on that timeline with some interval. Each of these blocks holds the information about the previous one, thus, creating a *chain of blocks*.


NEAR Protocol has a sharded nature, meaning that more than one parallel network, called a [Shard](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx), can be live at any moment. And each Shard produces a chunk of a block at a given interval. A Block in NEAR Blockchain is a collection of the block chunks from all shards. Block chunk is shortened to [Chunk](../../2.build/6.data-infrastructure/lake-data-structures/chunk.mdx) in NEAR Protocol documentation.

Returning to the data flow itself. The best we can do is to imagine tracks like we could see in audio/video editing apps. Each Shard has its own set of tracks. The top track is for Chunks. They appear no matter what at a given interval, for NEAR Blockchain the interval is about one second. Chunks are being produced even if nothing is happening on the blockchain.

![Timeline as tracks](/docs/flow/02-tracks.png)

But what do we mean by saying something is happening? We mean that something has triggered some changes in the blockchain. And the most well-known method to trigger any changes is to send a [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) to the blockchain with instructions of what we want to change and who has requested those changes.

A transaction needs to be constructed, signed and sent to the blockchain. Once it is executed we expect to have a result - [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx). Oh, that is simple. But it’s not really accurate for NEAR Blockchain.

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

In the beginning there is a [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx), it contains instructions we want to be executed on the blockchain. Transaction is sent to NEAR Blockchain.

And yes, it is executed there immediately BUT the immediate result of the transaction execution is always just *an acknowledgement that it will be executed on the chain;* this internal execution request is known as [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx). You can think of the [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) as an internal transaction that exists to pass information across shards.

Let’s get back to the tracks to look at the example.

Assuming we have two accounts living on different [Shards](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx) **alice.near** and **bob.near**. **alice.near** creates a [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) to send a few tokens to **bob.near**. The [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) is immediately executed and the [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx) for the [Transaction](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) is always a [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx).

But this [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) cannot be executed here, because **bob.near** doesn’t live on the same Shard as **alice.near**, so **the Receipt must be executed on the receiver’s Shard**. So the Receipt is moving to the Shard where **bob.near** belongs to.

On the destination Shard the Receipt is executed and the process is considered as done.

:::info The explanation here is simplified

Please refer to the [Token transfer](token-transfer-flow.md) flow article

:::

So the final scheme will look like:

![Complete scheme of sending tokens from an account from one Shard to an account on another](/docs/flow/04-send-nears-flow.png)

## Summary

We have learnt the main principles of how data is flowing in NEAR Protocol. We have found out that [Transactions](../../2.build/6.data-infrastructure/lake-data-structures/transaction.mdx) execute and the [ExecutionOutcome](../../2.build/6.data-infrastructure/lake-data-structures/execution_outcome.mdx) of the Transaction is always a [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx).

Now we know that [Receipt](../../2.build/6.data-infrastructure/lake-data-structures/receipt.mdx) is a main internal asset for NEAR Protocol blockchain and it has a power of traveling between [Shards](../../2.build/6.data-infrastructure/lake-data-structures/shard.mdx). We learnt the NEAR Data flow on a simple example. Of course in real life with more complex transactions that involve cross-contract calls, there will be more Receipts and ExecutionOutcomes.

We hope this article is useful and you will be able to build your dApps and indexers easily with the knowledge of how data if flowing in NEAR Protocol.
