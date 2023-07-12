---
id: posts-indexer
title: Posts Indexer
sidebar_label: Posts Indexer
---

:::info

NEAR QueryAPI is currently under development. Users who want to test-drive this solution need to be added to the allowlist before creating or forking QueryAPI indexers. 

You can request access through [this link](https://near.org/dev-queryapi.dataplatform.near/widget/NearQueryApi).

:::

## Overview

This indexer creates a new row in a pre-defined `posts` table created by the user in the GraphQL database for every new post found on the blockchain. This is a simple example that shows how to specify a single table, filter blockchain transaction data for a specific type of transaction, and save the data to the database.

:::tip

This indexer can be found by [following this link](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=somepublicaddress.near/postsexample&view=indexer-status).

:::

## Defining the Database Schema

The first step to creating an indexer is to define the database schema. This is done by editing the `schema.sql` file in the code editor. The schema for this indexer looks like this:

```sql
CREATE TABLE
  "posts" (
    "id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
  );
```

This schema defines a table called `posts` with columns:

- `id`: a unique identifier for each row in the table
- `account_id`: the account ID of the user who created the post
- `block_height`: the height of the block in which the post was created
- `receipt_id`: the receipt ID of the transaction that created the post
- `content`: the content of the post
- `block_timestamp`: the timestamp of the block in which the post was created

## Defining the Indexing Logic

The next step is to define the indexing logic. This is done by editing the `indexingLogic.js` file in the code editor. The logic for this indexer can be divided into two parts:

1. Filtering blockchain transactions for a specific type of transaction
2. Saving the data from the filtered transactions to the database

### Filtering Blockchain Transactions

The first part of the logic is to filter blockchain transactions for a specific type of transaction. This is done by using the `getBlock` function. This function takes in a block and a context and returns a promise. The block is a Near Protocol block, and the context is a set of helper methods to retrieve and commit state. The `getBlock` function is called for every block on the blockchain.

The `getBlock` function for this indexer looks like this:

```js
import { Block } from "@near-lake/primitives";

async function getBlock(block: Block, context) {
  function base64decode(encodedValue) {
    let buff = Buffer.from(encodedValue, "base64");
    return JSON.parse(buff.toString("utf-8"));
  }

  const SOCIAL_DB = "social.near";

  const nearSocialPosts = block
    .actions()
    .filter((action) => action.receiverId === SOCIAL_DB)
    .flatMap((action) =>
      action.operations
        .map((operation) => operation["FunctionCall"])
        .filter((operation) => operation?.method_name === "set")
        .map((functionCallOperation) => ({
          ...functionCallOperation,
          args: base64decode(functionCallOperation.args),
          receiptId: action.receiptId,
        }))
        .filter((functionCall) => {
          const accountId = Object.keys(functionCall.args.data)[0];
          return (
            Object.keys(functionCall.args.data[accountId]).includes("post") ||
            Object.keys(functionCall.args.data[accountId]).includes("index")
          );
        })
    );

  ... // Further logic for saving nearSocialPosts to the database
}
```

This function first defines a helper function called `base64decode` that decodes base64 encoded data. It then defines a constant called `SOCIAL_DB` that is the name of the database that stores the posts from the BOS. It then filters the blockchain transactions for a specific type of transaction. This is done by:

1. Filtering the blockchain transactions for transactions where the `receiverId` is the `SOCIAL_DB` database
2. Mapping the operations of the filtered transactions to the `FunctionCall` operation
3. Filtering the `FunctionCall` operations for operations where the `method_name` is `set`
4. Mapping the filtered `FunctionCall` operations to an object that contains the `FunctionCall` operation, the decoded `args` of the `FunctionCall` operation, and the `receiptId` of the transaction
5. Filtering the mapped objects for objects where the `args` contain a `post` or `index` key

This function returns an array of objects that contain the `FunctionCall` operation, the decoded `args` of the `FunctionCall` operation, and the `receiptId` of the transaction. This array is called `nearSocialPosts`.

### Saving the Data to the Database

The second part of the logic is to save the data from the filtered transactions to the database. This is done by using the `context.graphql` function. This function takes in a string for the graphQL query and returns a promise. The `context.graphql` function will be called for every filtered transaction as defined by the `.map()` function called on the array of `nearSocialPosts`.

The `context.graphql` function for this indexer looks like this:

```js
  ... // Logic for filtering blockchain transactions, defining nearSocialPosts

  if (nearSocialPosts.length > 0) {
    const blockHeight = block.blockHeight;
    const blockTimestamp = block.header().timestampNanosec;
    await Promise.all(
      nearSocialPosts.map(async (postAction) => {
        const accountId = Object.keys(postAction.args.data)[0];
        console.log(`ACCOUNT_ID: ${accountId}`);

        // create a post if indeed a post
        if (
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("main")
        ) {
          try {
            console.log("Creating a post...");
            const mutationData = {
              post: {
                account_id: accountId,
                block_height: blockHeight,
                block_timestamp: blockTimestamp,
                receipt_id: postAction.receiptId,
                content: postAction.args.data[accountId].post.main,
              },
            };
            await context.graphql(`
              mutation CreatePost($post: PostInput!) {
                insert_somepublicaddress_near_postsexample_posts_one(
                  object: $post
                ) {
                  account_id
                  block_height
                }
              }`,
              mutationData
            );
            console.log(`Post by ${accountId} has been added to the database`);
          } catch (e) {
            console.error(`Error creating a post by ${accountId}: ${e}`);
          }
        }
      })
    );
  }
```
