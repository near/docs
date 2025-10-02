---
id: what-is
title: What is Data Infrastructure?
description: "Explore NEAR's data infrastructure: Data APIs, BigQuery Public Dataset, and NEAR Lake for accessing, monitoring, and analyzing on-chain data"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

NEAR offers ready-to-use solutions to access and monitor on-chain data easily. This is very useful to automate actions based on specific **events**, cache data to **reduce latency**, gather **usage data** of the blockchain, and even **study user preferences**.

![img](/docs/assets/welcome-pages/6.data-infrastructure.png)

In NEAR you will find three main solutions to access and monitor on-chain data: [**Data APIs**](#data-apis), [**BigQuery Public Dataset**](#bigquery-public-dataset) and [**NEAR Lake**](#near-lake). Each of these solutions is designed to fit different needs and use cases, and can be used in combination to create a complete data infrastructure for your application.

---

## [Data APIs](./data-api.md)

Members of the NEAR community have built a set of APIs to access and monitor on-chain data. These APIs are designed to be easy to use and can be accessed from any application through a simple API call.

- User assets: Easily track all the assets that a user or a contract holds
- Monitor transactions: Get all the transactions of a user, a contract or a specific token
- Track on-chain events: Get all the events emitted by a contract, or a specific event type

<hr subclass="subsection" />

## [BigQuery: Public Dataset](./big-query.md)
A large dataset with on-chain data publicly available on Google Cloud Platform. Obtain near real-time blockchain data using simple SQL queries. **All the data, zero setup**.

- Instant insights: Historic on-chain data queried at scale. No need to run your own infrastructure.
- Cost-effective: Eliminate the need to store and process bulk NEAR Protocol data. Query as little or as much data as you like.
- As easy as SQL: No prior experience with blockchain technology is required. Just bring a general knowledge of SQL to unlock insights.

<hr subclass="subsection" />

## [NEAR Lake](./near-lake-framework.md)
A solution that watches over the NEAR network and stores all the events for your easy access.

- Cost-efficient solution: Cost-efficient solution for building self-hosted indexers in Rust, JavaScript, Python, Go and other languages
- Streamlined data management: Use NEAR Lake Framework to stream blocks to your server directly from NEAR Lake

---

## Conclusion

Data infrastructure is a key component of any blockchain application. It allows developers to access and monitor on-chain data easily, which is essential for building applications that interact with the blockchain.

NEAR offers a range of solutions to help developers build robust data infrastructure for their applications, including Data APIs, BigQuery Public Dataset, and NEAR Lake. By using these solutions in combination, developers can create a complete data infrastructure that meets their specific needs and use cases.
