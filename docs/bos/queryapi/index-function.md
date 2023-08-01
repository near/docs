---
id: index-functions
title: Indexing Functions
sidebar_label: Indexing Functions
---

:::info
QueryAPI is a fully managed service that allows you to create and manage indexers on-chain seamlessly.
:::


## Indexing

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

Next, if you check out the database schema:

```sql title=schema.sql
CREATE TABLE
  "indexer_storage" (
    "function_name" TEXT NOT NULL,
    "key_name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    PRIMARY KEY ("function_name", "key_name")
  )
```

It's a very simple schema where you can store the `function_name`, `key_name`, and `value`.

:::tip
That's all this indexer function is doing: it sets the `height` value equal to the current block's height.
:::


<!-- ![QueryAPI Indexer Dashboard](/docs/assets/QAPIScreen2.png) -->


## Local Debug Mode

While you're iterating on your indexer development, it's critical to have some type of debugging
functionality to be able to test with, and the _Debug Mode_ is very helpful for that.

![QueryAPI Dashboard](/docs/assets/QAPIdebug.png)

For example, if you want to test the [simple indexer](#indexing) explained in the previous section
using the local debugging mode:

- Enable <kbd>Debug Mode</kbd> on the **Indexer Editor**
- Add a block to your debug list (e.g., `97779559`)
- Go into your web browser's Console
- Finally, click <kbd>Play</kbd>.


On your browser's Console, you should see the indexer's debug execution where it sets the `height` key to `97779559`:

![QueryAPI Indexer Dashboard](/docs/assets/QAPIdebuglog.png)

:::info Local tests
All debug mode tests are happening **locally**, so they do not reach the database.
All your queries and mutations will return empty objects.
:::

:::tip
So you can also click <kbd>Follow the Network</kbd> and it will show how your indexer logic works throughout.
:::

## Contract Filters

A contract filter is used by QueryAPI to do backend optimizations to
help do historical indexing faster.
While creating an indexer, when you define a contract filter,
QueryAPI will send any single transaction event that passes this filter to your indexer function
so you can index it.

If you only want to index events from a single contract, simply define the contract name on the **Contract Filter** text box.
In some cases you might want to either support indexing on multiple contracts,
or simply support every single contract that exists on the Near blockchain.

#### Single contract filter


For example, if you check out the [simple indexer](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=roshaan.near/demo-indexer&view=editor-window), you'll see that in this case
you have a `social.near` contract filter. 
In this example, the indexer is only concerned on indexing events from `social.near`'s contract.

#### Multiple contracts filter

For example, if you want to index all the contracts from AstroDAO, where there is an account created
for each and every different DAO, you should define `*.sputnik-dao.near` as the contract filter.
Likewise, if you want to get events from every contract on the blockchain, simply define `*` as the filter.

## Feed-indexer logic

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

![QueryAPI Indexer Dashboard](/docs/assets/QAPIgraphiql.png)

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

