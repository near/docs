---
id: bos-components
title: Historical data
sidebar_label: Handling Historical data
---

Building components that handle historical blockchain data require dedicated solutions that manage the data and reduce the latency of requests, as it's not possible to scan the whole blockchain when a user makes a request.

A simple solution for developers building on NEAR is using [QueryAPI](../environment.md), a fully managed solution to build indexer functions, extract on-chain data, store it in a database, and be able to query it using GraphQL endpoints.

:::tip
Learn more about QueryAPI in this [QueryAPI Overview](../environment.md) article.
:::

---

## Tutorials

For a technical implementation deep-dive, check these QueryAPI tutorials:

  - [Posts Indexer tutorial](../../../3.tutorials/near-components/indexer-tutorials/posts-indexer.md): this indexer creates a new row in a pre-defined database for every new Social post found on the blockchain.
  - [Hype Indexer tutorial](../../../3.tutorials/near-components/indexer-tutorials/hype-indexer.md): this indexer creates a new row in a pre-defined database for every new Social post or comment found on the blockchain that contains either `PEPE` or `DOGE` in the contents.
  - [Social Feed Indexer tutorial](../../../3.tutorials/near-components/indexer-tutorials/feed-indexer.md): this indexer keeps track of new posts, comments, and likes on Social, so a social feed can be rendered quickly.

---

## GraphQL queries 

Using [QueryAPI's GraphiQL](../../6.data-infrastructure/query-api/index-function.md#mutations-in-graphql) tab, you can access the GraphiQL Explorer that provides a user friendly GraphQL playground, where you can view and create queries and mutations based on the DB schema that you defined for the indexer.

![QueryAPI Indexer Dashboard](/docs/assets/QAPIgraphiql.png)

You can easily set some fields and select the returning data
that you want, and the tool will build a query on the mutation panel on the right.
Then you can copy the resulting query, either in your JavaScript code so that you pass actual
data manually, or you pass in the mutation data object as a second parameter.

For example, if you go and add a new mutation, click <kbd>+</kbd>, then you can do a bunch of actions here, such as creating, deleting, or inserting posts into your table.

![Playground](/docs/assets/QAPIScreen.gif)

If you want to test your mutation, using [Debug Mode](../../6.data-infrastructure/query-api/index-function.md#local-debug-mode) you can add a specific
block to the list, and then play it to see how it works. 
Based on the indexer logic you defined, you'll get a call to the GraphQL mutation with the object
and data passed into it.

:::tip Video Walkthrough

**Tip:** watch the video on how to [create mutations in GraphQL](https://www.youtube.com/watch?v=VwO6spk8D58&t=781s).

:::

---

## Generate a NEAR component using Playground

Creating a NEAR component from a GraphQL query is simple when using QueryAPI's GraphQL Playground. Just follow these steps:

- go to the GraphiQL tab
- select the query that you want to use
- click on the <kbd>Show GraphiQL Code Exporter</kbd> button
- get some default code here, copy it,
- go to the NEAR sandbox, paste it.

This will set up some boilerplate code to execute the GraphQL query, add the query that you had
in your playground and then call that query, extract the data and render it using the
render data function.

Once you have the NEAR component code, you can test it out by going to [Jutsu](https://app.jutsu.ai/),
pasting the generated code, and enabling <kbd>Live Preview</kbd>.
Next, you can create a nice UI over this boilerplate code, and publish your new NEAR component.

#### Component Examples

- [Activity Feed widget](https://near.org/near/widget/ComponentDetailsPage?src=roshaan.near/widget/user-activity-feed&tab=source) running on [dev.near.org](https://dev.near.org)
