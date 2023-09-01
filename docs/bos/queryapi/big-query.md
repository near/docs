---
id: big-query
title: BigQuery
sidebar_label: BigQuery
---

# near-public-lakehouse

NEAR Public Lakehouse

This repository contains the source code for ingesting NEAR Protocol data stored as JSON files in AWS S3 by [near-lake-indexer](https://github.com/near/near-lake-indexer). The data is loaded in a streaming fashion using Databricks Autoloader into raw/bronze tables, and transformed with Databricks Delta Live Tables streaming jobs into cleaned/enriched/silver tables.

The silver tables are also copied into the GCP BigQuery Public Dataset.

# Architecture

![Architecture](/docs/Architecture.png "Architecture")
Note: [Databricks Medallion Architecture](https://www.databricks.com/glossary/medallion-architecture)

# What is NEAR Protocol?

NEAR is a user-friendly, carbon-neutral blockchain, built from the ground up to be performant, secure, and infinitely scalable. It's a layer one, sharded, proof-of-stake blockchain designed with usability in mind. In simple terms, NEAR is blockchain for everyone.

# Data Available

The current data that we are providing was inspired by [near-indexer-for-explorer](https://github.com/near/near-indexer-for-explorer/).
We plan to improve the data available in the NEAR Public Lakehouse making it easier to consume by denormalizing some tables.

The tables available in the NEAR Public Lakehouse are:

- **blocks**: A structure that represents an entire block in the NEAR blockchain. Block is the main entity in NEAR Protocol blockchain. Blocks are produced in NEAR Protocol every second.
- **chunks**: A structure that represents a chunk in the NEAR blockchain. Chunk of a Block is a part of a Block from a Shard. The collection of Chunks of the Block forms the NEAR Protocol Block. Chunk contains all the structures that make the Block: Transactions, Receipts, and Chunk Header.
- **transactions**: Transaction is the main way of interraction between a user and a blockchain. Transaction contains: Signer account ID, Receiver account ID, and Actions.
- **execution_outcomes**: Execution outcome is the result of execution of Transaction or Receipt. In the result of the Transaction execution will always be a Receipt.
- **receipt_details**: All cross-contract (we assume that each account lives in its own shard) communication in Near happens through Receipts. Receipts are stateful in a sense that they serve not only as messages between accounts but also can be stored in the account storage to await DataReceipts. Each receipt has a predecessor_id (who sent it) and receiver_id the current account.
- **receipt_origin**: Tracks the transaction that originated the receipt.
- **receipt_actions**: Action Receipt represents a request to apply actions on the receiver_id side. It could be derived as a result of a Transaction execution or another ACTION Receipt processing. Action kind can be: ADD_KEY, CREATE_ACCOUNT, DELEGATE_ACTION, DELETE_ACCOUNT, DELETE_KEY, DEPLOY_CONTRACT, FUNCTION_CALL, STAKE, TRANSFER.
- **receipts (view)**: It's recommended to select only the columns and partitions (block_date) needed to avoid unnecessary query costs. This view join the receipt details, the transaction that originated the receipt and the receipt execution outcome.
- **account_changes**: Each account has an associated state where it stores its metadata and all the contract-related data (contract's code + storage).

# Examples

- Queries: How many unique users do I have for my smart contract per day?

```sql
SELECT
  r.block_date collected_for_day,
  COUNT(DISTINCT r.transaction_signer_account_id)
FROM `bigquery-public-data.crypto_near_mainnet_us.receipt_actions` ra
  INNER JOIN `bigquery-public-data.crypto_near_mainnet_us.receipts` r ON r.receipt_id = ra.receipt_id
WHERE ra.action_kind = 'FUNCTION_CALL'
  AND ra.receipt_receiver_account_id = 'near.social' -- change to your contract
GROUP BY 1
ORDER BY 1 DESC;
```

# How to get started?

1. Login into your [Google Cloud Account](https://console.cloud.google.com/).
2. Open the [NEAR Protocol BigQuery Public Dataset](https://console.cloud.google.com/marketplace/product/bigquery-public-data/crypto-near-mainnet).
3. Click in the [VIEW DATASET](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=crypto_near_mainnet_us&page=dataset) button.
4. Click in the "+" to create a new tab and write your query, click in the "RUN" button, and check the "Query results" below the query.
5. Done :)

# How much it costs?

- NEAR pays for the storage and doesn't charge you to use the public dataset. To learn more about BigQuery public datasets check this [page](https://cloud.google.com/bigquery/public-data).
- Google GCP charges for the queries that you perform on the data. For example, in today's price "Sep 1st, 2023" the On-demand (per TB) query pricing is $6.25 per TB where the first 1 TB per month is free. Please check the official Google's page for detailed pricing info, options, and best practices [here](https://cloud.google.com/bigquery/pricing#analysis_pricing_models).

**Note:** You can check how much data it will query before running it in the BigQuery console UI. Again, since BigQuery uses a columnar data structure and partitions, it's recommended to select only the columns and partitions (block_date) needed to avoid unnecessary query costs.

![Query Costs](/docs/BQ_Query_Cost.png "BQ Query Costs")

# References

- https://cloud.google.com/bigquery/public-data
- https://cloud.google.com/bigquery/pricing#analysis_pricing_models

- https://docs.gcp.databricks.com/ingestion/auto-loader/index.html
- https://www.databricks.com/product/delta-live-tables

- https://docs.near.org/concepts/basics/protocol
- https://docs.near.org/concepts/data-flow/near-data-flow
- https://near-indexers.io/docs/data-flow-and-structures/structures/transaction#actionview
- https://nomicon.io/RuntimeSpec/Receipts
- https://nomicon.io/
- https://github.com/near/near-lake-indexer
- https://github.com/near/near-indexer-for-explorer/
