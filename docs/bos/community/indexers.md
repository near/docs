---
id: indexers
title: QueryAPI Indexers
sidebar_label: QueryAPI
---

With QueryAPI you can quickly create your own indexer by:

* Writing your own custom indexer function;
* Specifying the schema for your own custom hosted database and write to it with your indexer function;
* Retrieving that data through a GraphQL API.

### How it Works

This works by:

1. Writing the indexer name to the blockchain, registering its creation;
2. Creating the tables as specified in the schema to the GraphQL database, exposing a GraphQL endpoint to query the data;
3. Spinning up a cloud process that runs your indexer function, writing to the GraphQL database;

You can access the [NEAR QueryAPI by following this link](https://near.org/dataplatform.near/widget/QueryApi.App).

This should take you to a dashboard that looks like this:

![QueryAPI Dashboard](./assets/QAPIScreen.png)

## Creating an Indexer

Clicking on "Create New Indexer" will redirect you in-browser to a Component code editor that looks like this:

![QueryAPI Indexer Dashboard](./assets/QAPIScreen2.png)

This is the interface through which you can create a new Indexer. On here you can specify:

* the filtering, transforming logic in `indexingLogic.js`
* the database schema in `schema.sql`
* the GraphQL queries in `GraphiQL`
* the indexer name on Indexer Name
* from which block to start indexing on Specific Block Height or From Latest Block Height (selected by default)

### `IndexingLogic.js`

The indexer code editor is pre-populated with a template that looks like this:

```js
import { Block } from "@near-lake/primitives";
/**
 * Note: We only support javascript at the moment. We will support Rust, Typescript in a further release.
 */

/**
 * getBlock(block, context) applies your custom logic to a Block on Near and commits the data to a database.
 *
 * Learn more about indexers here:  https://docs.near.org/concepts/advanced/indexers
 *
 * @param {block} Block - A Near Protocol Block
 * @param {context} - A set of helper methods to retrieve and commit state
 */
async function getBlock(block: Block, context) {
  // Add your code here
  const h = block.header().height;
  await context.set("height", h);
}
```

This editor with this code shows the `indexingLogic.js` file that is selected. This logic in particular will perform the filtering of blockchain transactions, transforming and saving the data you specify to a GraphQL database you define in `schema.sql`.

:::tip Note

You will likely want to save the data you capture from your indexer to your defined tables in the GraphQL database. You can do this by inserting GraphQL mutation queries in your `indexingLogic.js` file. For example, if you have a table called `transactions` with columns `id`, `sender`, `receiver`, `amount`, `block_height`, you can insert a mutation query for one new element in the table like this:

```js
await context.graphql(`
  mutation MyMutation($transaction: some_table_insert_input!) {
    insert_<ACCOUNT_NAME>_near_transactions_one(
      object: $transaction
    ) {
      affected_rows
    }
  }
`);
```

Creating these queries within strings can be very difficult, especially considering that the table names vary depending on your indexer name and account ID. An easier way to do this would be by visiting the GraphQL Playground site and creating the queries there. You can then copy and paste them into your `indexingLogic.js` file as shown below:

![Alt Text](./assets/QAPIScreen.gif)

:::

### `schema.sql`

This tab in the editor will be pre-populated with a template that looks like this:

```sql
CREATE TABLE "indexer_storage" (
  "function_name" TEXT NOT NULL,
  "key_name" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  PRIMARY KEY ("function_name", "key_name")
);
```

This is the database schema that will be used to store the data you specify in `indexingLogic.js`. You can add more tables and columns to this schema as you see fit. They will be created as soon as you create the indexer.
Creating this default table will allow you to use the `context.set` helper method to write data. It takes two arguments: a key argument and a value argument,  which will be written to the `key_name` and `value` columns 
### `GraphiQL`

The GraphiQL tab in the editor will allow you to view the returned data from your GraphQL endpoint. This is best verified after you have created the indexer.

### Performing Queries on the Public GraphQL API

Once you have created your indexer, you can perform queries on the public GraphQL API. You can find the endpoint for your indexer by clicking on the "GraphQL Playground" button on "View Status" page of the indexer. **Note: Make sure you specify the `x-hasura-role` header as `<your_account_name>_near` using `_` instead of `.` in your account name.**

This will display all your account's created tables on the GraphQL Database on the left-hand viewer. You can then perform queries on the right-hand viewer. For example, if you have created a table called `transactions` with columns `id`, `sender`, `receiver`, `amount`, `block_height`, you can perform a query like this:

```graphql
query MyQuery {
  <your_account_name>_near_transactions {
    id
    sender
    receiver
    amount
    block_height
  }
}
```

You can fetch this data from your component in BOS by using the `fetch` function. To the URL shown in the GraphQL Playground interface with the headers displayed there, and the your query as above for the body. For example:

```js
asyncFetch(API_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "x-hasura-role": SEARCH_API_KEY
    },
    method: "POST",
  });
```
