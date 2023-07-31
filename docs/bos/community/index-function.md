---
id: index-functions
title: Indexing Functions
sidebar_label: Indexing Functions
---

:::info
QueryAPI is a fully managed service that allows you to create and manage indexers on-chain seamlessly.
:::


## Introduction

Let's review a [very simple indexer](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=roshaan.near/demo-indexer&view=editor-window), which will help you to understand
how the indexer's indexing logic works.

```js title=indexingLogic.js
import { Block } from "@near-lake/primitives";

/**
 * getBlock(block, context) applies your custom logic to a Block on Near and commits the data to a database.
 *
 * @param {block} Block - A Near Protocol Block
 * @param {context} - A set of helper methods to retrieve and commit state
 */
async function getBlock(block: Block, context) {
  const h = block.header().height;
  await context.set("height", h);
}
```

In the `getBlock()` function, you're given a block, which is a block on the Near blockchain, as
well as a `context` object, which gives you a set of helper methods to be able to commit
what you want to the database that QueryAPI has provisioned for you.

The code is going into the header of the `block`
and getting the block's `height`, and then is using the `context` object to set a key value store.

If you check out the database schema, there's a very simple schema where you can store the `function_name`, `key_name`, and `value`.
So that's all we do, we just set the height equal to the current height.

```sql title=schema.sql
CREATE TABLE
  "indexer_storage" (
    "function_name" TEXT NOT NULL,
    "key_name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    PRIMARY KEY ("function_name", "key_name")
  )
```

![QueryAPI Indexer Dashboard](/docs/assets/QAPIScreen2.png)


## Debugging Mode

![QueryAPI Dashboard](/docs/assets/QAPIdebug.png)


We can test this by going into Clicking Debug Mode here, clicking Inspect, going into Console,
and adding a block to our debug list, and clicking Play.
So as you can see, what happened in this given execution was that we were setting a key value
store and it set the height key to the following.
It's important to note that all of this stuff is happening locally, so it actually does
not reach out to the database in question.
So your queries and your mutations will return empty objects.
But while you're iterating on your indexer, it's very important to have some type of debugging
functionality to be able to test with, and this is very helpful for that.
So you can also click Follow the Network and it will see how your indexer logic works throughout.

## Contract Filters


If you check out the indexer editor, you'll see a contract filter field, and in this case
we have a social.near contract filter, which we use to do some backend optimizations to
help do historical indexing faster.
In this case, we're only concerned on indexing on social.near's contract.
But there's a lot of times where you might need to perhaps either support indexing on
multiple contracts, for example in the case for AstroDAO, where there is an account created
for each and every different DAO.
For example, NearWeek has a DAO in the form of the following.
So you have dots buttoning DAO down here, so you can have anything in the start, a wildcard,
and that's how we represent it ourselves too.
So if you give, while creating an indexer, if you give it the following contract filter,
it will send any single transaction event that passes this filter to your indexer function
so you can index it.
So that is basically every single DAO that lives on Sputnik DAO, or operates on Sputnik
DAO.
And you can also just simply do the following to support every single contract that exists
on Near and publish that as well.


## Feed-indexer logic


Now let's check out how the indexing logic for feed indexer works.
So we're given the same getBlock with the block and context object, but we'd only like
to work transactions on the social.near contract.
So what we do first is filter the contracts and get the data that we need and transform
it to something that we can work with.
So the first thing we do is get the block and go into the actions filter based off of
the receiver ID, and then we only are interested in set method calls on this function.
We decode the arguments because they're base64 encoded, as well as get the receipt ID.
And then we are only interested in those functions or calls that are setting some piece of arbitrary
data to the keys of post as well as index.
And so we end up with a post that hosts transactions, then we handle them based off of what they're
actually doing.
So in the transaction, we are creating a post, which we can figure out by doing this.
We'll send it to a handler that handles post creation.
If it's a comment creation, we'll handle it inside another function.
And all of this may seem very convoluted, which it may actually be, and it's something
that we're focusing on reducing the boilerplate for, as a lot of this might be the same from
indexer to indexer.
So the debugging functionality that we saw earlier is very helpful here to see if you're
actually getting the right transactions out as you expect.
So let's quickly check out the handle post creation handler and see what that's doing.
So we get all this data that we need to create a post entry into our post table.
Then we call context.graphql, which allows us to make arbitrary mutations and queries
to our database that we provision for you.
If you're interested in how to create GraphQL queries, there's a whole bunch of resources
online.
In this case, we are passing in our mutation data, which has a post object, and it's inserting
it inside Postgres, I mean, inside of Postgres using GraphQL.
But it's very easy to create these mutations.

## Mutations In GraphQL


If you go onto GraphQL Playground, go into the sidebar here.
Right now it's looking at queries you are interested in mutations.
So if you go and add new mutation, click plus, then we can do a whole bunch of actions here,
such as we are interested in only creating, inserting posts into our table.
So this is deleting posts, we're interested in creating or adding a post to our table.
So yeah, insert Roshan here, feed indexer post one.
This sounds about right, we are going to set some fields and select the returning data
that we want, and it's building our query on the mutation on the right.
And what you do is you can simply copy this and either in your JavaScript code make it
so that you pass actual data here manually, or you pass in, for example, the mutation
data object as a second parameter.
But anyways, that's a little bit about how you would create a post inside the database.
And let's quickly check this out, see if it actually works.
Let's go on near.org, we're going to take this post, we're going to copy the URL, get
the block ID that this was made at, and then let's go back to our indexer, click on debug
mode, add it, add it to our debug list, click on inspect element, inspect, and then let's
just play it and see what happened.
So it's running our indexer function on this block, and it found a post on it with this
account ID, so it's creating a post now and calling this GraphQL mutation with this object
and data passed into it, which seems to be about right.

## QueryAPI Docs


So that's a little bit about how the feed indexer works, you can find more information
on it actually on this piece of docs on near.org and see a little bit about the internals and
how it works and how to make queries and so on and so forth.
Let's quickly fork an indexer to discuss a bit about how historical packfill works and
how quick it is to get started with a new indexer.

