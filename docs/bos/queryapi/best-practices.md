---
id: best-practices
title: Indexing best practices
sidebar_label: Best Practices
---

In this article you can find suggested best practices when building blockchain indexers using [QueryAPI](intro.md).
If you're planning to design a production-ready indexer, please check the recommendations for [indexing development](#indexing-development) and [database design](#database-design).

## Indexing development

This is the recommended workflow when building a new indexer using QueryAPI:

1. Start from a simple [`indexingLogic.js`](index-function.md) to get blockchain data dumped in a database, in a raw form. For example, start by getting the [FunctionCall](../../2.develop/contracts/actions.md#function-call)'s arguments from the smart contract that you want to index. Then, use the [GraphQL playground](index-function.md#mutations-in-graphql) to understand the raw dump and further analyze the data.

   ![Playground](/docs/assets/QAPIScreen.gif)

2. Once you have figured out a good logic to process the raw data, test the processing logic by [enabling debug mode](index-function.md#local-debug-mode) in the `indexingLogic.js` editor, and set a list of block heights that contains different cases that your processing logic must handle.

   ![QueryAPI Dashboard](/docs/assets/QAPIdebug.png)

3. Once your index logic extracts all data correctly as expected, fork the indexer, create new tables in a schema to organize structured data, and update the indexer logic to process and store structured data.

   :::tip
   Check the [next section](#) to learn how to design optimal database schemas for your indexer.
   :::

4. Make sure to `try {} catch {}` exceptions while processing each block. In the `catch` section, log exceptional blocks and debug them by enabling debug mode. (set the block `height` of the problematic blocks, and run a local debug)

```js
try {
  console.log("Creating a PostSnapshot");
  const mutationData = {
    post_snapshot,
  };
  await context.graphql(
    `
    mutation CreatePostSnapshot($post_snapshot: bo_near_devhub_v17_post_snapshots_insert_input!) {
      insert_bo_near_devhub_v17_post_snapshots_one(object: $post_snapshot) {post_id, block_height}
    }
    `,
    mutationData
  );
  console.log(
    `Post Snapshot with post_id ${post_id} at block_height ${block_height} has been added to the database`
  );
  return null;
} catch (e) {
  console.log(
    `Error creating Post Snapshot with post_id ${post_id} at block_height ${block_height}: ${e}`
  );
  return e;
}
```

5. You may have to do several iterations to fix all bugs in your indexer to process all the blocks correctly. In this case, you can fork the indexer, update the schema and `indexingLogic`, and try again. The new indexer can be named `YourIndexName_v2`, `YourIndexerName_v3`, `..._v4`, and so on.

6. Remember to clean out old, unused indexers. If you get `YourIndexerName_v8` to work, it’s helpful to delete `..._v7`, `..._v6`, so they can free resources taken from QueryAPI workers.

7. Whenever you add any changes to either the database schema or the `indexerLogic`, it’s a good idea to fork and deploy a new indexer. If not, your new indexing logic will re-run on old blocks, and if you don’t handle re-indexing in your `indexingLogic.js`, the same old data will be inserted again into the database, bringing further errors.

## Database design

Designing an optimal database schema depends on the type of indexer that you want to build.
Focusing on the two most common blockchain indexing use cases, you can consider:

- a database schema for an indexer doing blockchain analytics, reporting, business intelligence, and big-data queries.
- a database schema for an indexer built as a backend for a web3 dApp building interactive and responsive UIs, that tracks interactions over a specific smart contract.

### Schema for Blockchain analytics

- Consider using summary tables for precomputed analytics. Example:

```sql
CREATE TABLE summary_account_transactions_per_day (
    dim_signer_account_id TEXT NOT NULL,
    dim_transaction_date DATE NOT NULL,
    metric_total_transactions BIGINT NOT NULL,
    PRIMARY KEY (dim_signer_account_id, dim_transaction_date)
);

INSERT INTO summary_account_transactions_per_day (dim_signer_account_id, dim_transaction_date, metric_total_transactions)
SELECT
    t.signer_account_id AS dim_signer_account_id,
    t.transaction_date AS dim_transaction_date,
    COUNT(*) AS metric_total_transactions
FROM
    transactions t
WHERE
    t.transaction_date = CURRENT_DATE
GROUP BY
    t.signer_account_id, t.transaction_date
ON CONFLICT (dim_signer_account_id, dim_transaction_date)
DO UPDATE SET
    metric_total_transactions = EXCLUDED.metric_total_transactions;
```

### Schema for interactive UIs

- Indexing: Add indexes for efficient querying. Example:

```sql
CREATE INDEX idx_transactions_signer_account_id ON transactions(signer_account_id);
```

- Partitioning: Utilize partitioning for large tables.

```sql
CREATE TABLE transactions_partitioned_by_account_id (
    transaction_hash text NOT NULL,
    signer_account_id text NOT NULL,
    receipt_conversion_tokens_burnt numeric(45) NULL,
    PRIMARY KEY (signer_account_id, transaction_hash)
)
PARTITION BY LIST (signer_account_id);
```
