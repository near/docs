---
id: how-it-works
title: How QueryAPI works
sidebar_label: How it works
---

QueryApi is a streaming indexer implementation that executes queries written by developers on the NEAR blockchain.
QueryApi allows hosted execution of complex queries (ones that can’t be answered by a [simple RPC](../../5.api/rpc/introduction.md) or [Enhanced API](https://docs.pagoda.co/api) call), hosting of the data, and its exposure via GraphQL endpoints.


## Components involved 

The QueryApi implementation integrates many different components in a single and streamlined solution.
In a high-level overview, the main components are:

:::info Components
`NEAR Protocol` -> `NEAR Lake` -> `Coordinator` -> `Database` -> `API`
:::


### Detailed overview

An in-depth, detailed overview of the QueryApi components:

[![QueryAPI](/docs/qapi-components.png)](/docs/qapi-components.png)


### Description

- **Protocol:** the underlying NEAR Layer-1 Blockchain, where data `Blocks` and `Chunks` are produced.
- **NEAR Lake:** an indexer which watches the Layer-1 network and stores all the events as JSON files on AWS S3. Changes are indexed as new `Blocks` arrive.
- **Coordinator**: the QueryApi coordinator indexer filters matching data `Blocks`, runs historical processing threads, and queues developer's JS code to be indexed with these matched blocks.
- **Database**: a Postgres database where filtered and indexed results are stored, using a Logical DB per user, and a Logical schema per indexer function.
- **API**: a Hasura server running on Google Cloud Platform exposes a GraphQL endpoint so users can access their data from anywhere.

## Who hosts QueryAPI

[Pagoda Inc.](https://pagoda.co) runs and manages all the infrastructure of QueryAPI, including NEAR Lake nodes to store the data in JSON format on AWS S3.

- NEAR Lake indexing is hosted on AWS S3 buckets.
- Hasura GraphQL API server is hosted on GCP.

:::caution Pricing
QueryAPI is currently free. Pagoda doesn't charge for storage of your indexer code and data as well as running the indexer, but usage pricing will be introduced once QueryApi is out of beta.
:::
