---
sidebar_label: Token Transfer
---

# Token Transfer flow

In the [previous article](near-data-flow.md) we saw an example of token transfer between accounts found in different shards. That example was simplified and missed a few steps in the process. That was intentional, to keep the article and the video short yet explanatory, in order to give you a bigger picture for understanding concepts.

In this article we're going to have a look at the same data flow, but in detail and we will consider two additional scenarios:

- Token transfer between accounts found in different shards
- Token transfer between accounts found in the same shard

You may be asking what was missing in the previous explanation. The short answer is: **Gas Refunds** or simply **Refunds**.

If you don't know what **Gas** is, please [first read the article about Gas](https://docs.near.org/concepts/protocol/gas) from our docs.

As for *Refunds*, here's a quote from the [Gas](https://docs.near.org/concepts/protocol/gas) article:

> Attach extra gas; get refunded!
>
> ...
>
> - If you attach more gas than needed, you'll get refunded
>
> ...
>
> *From NEAR Protocol docs [Gas. Attach extra gas; get refunded!](https://docs.near.org/concepts/protocol/gas#attach-extra-gas-get-refunded)*


:::note What refunds mean in terms of data flow

It means that literally every Transaction includes a refund.

:::

OK, this should be enough for introduction, now let's move on to examples.


## Token transfer between accounts found in different shards

Basically it is an extension of the example from the [NEAR Data Flow](near-data-flow.md) article.

Assume we have two accounts **alice.near** and **bob.near**. They belong to different [Shards](/build/data-infrastructure/lake-data-structures/shard). **alice.near** sends a few tokens to **bob.near**.

A [Transaction](/build/data-infrastructure/lake-data-structures/transaction) signed by **alice.near** is sent to the network. It is immediately executed, [ExecutionOutcome](/build/data-infrastructure/lake-data-structures/execution-outcome) is the output or result from converting the transaction into a [Receipt](/build/data-infrastructure/lake-data-structures/receipt).

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

During the above process **alice.near**, the sender, was charged a fee (gas). The [Receipt](/build/data-infrastructure/lake-data-structures/receipt) created as result of the [Transaction](/build/data-infrastructure/lake-data-structures/transaction) follows these rules:

1. It will be executed not earlier than next [Block](/build/data-infrastructure/lake-data-structures/block)
2. It **must** be executed on the receiver's [Shard](/build/data-infrastructure/lake-data-structures/shard)

So, in our case the receiver is **bob.near** and that account belongs to a different [Shard](/build/data-infrastructure/lake-data-structures/shard) that's why the [Receipt](/build/data-infrastructure/lake-data-structures/receipt) moves to the receiver's Shard and is put in the execution queue.

In our example the Receipt is executed in the very next Block.

![The Receipt is executed in the next Block](/docs/flow/04-send-nears-flow.png)

Almost done. Remember the refund? So the [ExecutionOutcome](/build/data-infrastructure/lake-data-structures/execution-outcome) for the Receipt will be another Receipt that is refunding the Gas to the sender. **bob.near** has received tokens from **alice.near**. Now, **alice.near** becomes the receiver for a new (and last) Receipt (keep in mind the sender in this Receipt is always **system**).

Keep in mind rule #2: the Receipt must be executed on the receiver's Shard. So this Receipt moves to the Shard where **alice.near** belongs to. And it is the last execution in this process.

![Complete scheme of Token transfer between the accounts from different Shards](/docs/flow-token-transfer/01-diff-shards-complete.png)

This is it. Tokens have been transferred from the account on one Shard to the account on a different Shard, and the initial sender, **alice.near**, received a refund of Gas.


## Token transfer between accounts found on the same shard

Let's have a look at the example where both accounts are on the same [Shard](/build/data-infrastructure/lake-data-structures/shard). The process is the same as in the previous example, except there are no Receipts moving from one Shard to another.

A [Transaction](/build/data-infrastructure/lake-data-structures/transaction) signed by **alice.near** is sent to the network. It is immediately executed, [ExecutionOutcome](/build/data-infrastructure/lake-data-structures/execution-outcome) is the result of converting the transaction into a [Receipt](/build/data-infrastructure/lake-data-structures/receipt).

![Transaction execution](/docs/flow/03-tx-outcome-receipt.png)

The Receipt is already on the receiver's Shard, so it is put in the execution queue of the next [Block](/build/data-infrastructure/lake-data-structures/block). It is executed in the next Block, and the [ExecutionOutcome](/build/data-infrastructure/lake-data-structures/execution-outcome) result is a new Receipt with the refund to the initial sender, **alice.near**. 
The Same rules apply to this Receipt, it is put into the execution queue and executed in the next Block.

![Complete scheme of Token transfer between the account from the same Shards](/docs/flow-token-transfer/02-same-shard-complete.png)

This is it. You may wonder why the process is overcomplicated for the same Shard case. The answer is: **the same rules are always applied**. Also, this mechanism allows to build the NEAR Protocol data flow by only one set of rules, no matter how many Shards exist. Also, we avoid a lot of "ifs" and we don't have to keep in mind different corner cases because the process always follows the same rules.

