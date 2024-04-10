---
id: what-is
title: What is Data Infrastructure? 
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

NEAR offers ready-to-use solutions to access and monitor on-chain data easily. This is very useful to automate actions based on specific **events**, cache data to **reduce latency**, gather **usage data** of the blockchain, and even **study user preferences**.

![img](/docs/assets/welcome-pages/data-lake.png)

NEAR offers three main solutions to access and monitor on-chain data: [**BigQuery Public Dataset**](#bigquery-public-dataset), [**QueryAPI**](#queryapi-indexers-made-simple), and [**NEAR Lake**](#near-lake). Each of these solutions is designed to fit different needs and use cases, and can be used in combination to create a complete data infrastructure for your application.
 
---

## [BigQuery: Public Dataset](./big-query.md)
A large dataset with on-chain data publicly available on Google Cloud Platform. Obtain near real-time blockchain data using simple SQL queries. **All the data, zero setup**.

- Instant insights: Historic on-chain data queried at scale. No need to run your own infrastructure.
- Cost-effective: Eliminate the need to store and process bulk NEAR Protocol data. Query as little or as much data as you like.
- As easy as SQL: No prior experience with blockchain technology is required. Just bring a general knowledge of SQL to unlock insights.

<hr subclass="subsection" />

## [QueryAPI: Indexers Made Simple](./query-api/intro.md)

A fully managed solution to build indexer functions, extract on-chain data, and easily query it using GraphQL endpoints and subscriptions.

- Your data, your way: Decide how you want to store data. Design the tables and databases that better suit your needs.
- Indexers made simple: Create the logic of your indexer and we will execute it for you. Forget about infrastructure—focus on solutions.
- Plug & play to your app: Fetch your data from any application through our API. Leverage GraphQL to query exactly what you need.

<hr subclass="subsection" />

## [NEAR Lake](./lake-framework/near-lake.md)
A solution that watches over the NEAR network and stores all the events for your easy access.

- Cost-efficient solution: Cost-efficient solution for building self-hosted indexers in Rust, JavaScript, Python, Go and other languages
- Streamlined data management: Use NEAR Lake Framework to stream blocks to your server directly from NEAR Lake