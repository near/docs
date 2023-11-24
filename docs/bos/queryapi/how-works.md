---
id: how-it-works
title: How QueryAPI works
sidebar_label: How it works
---

QueryApi is a streaming indexer implementation that executes custom indexing logic written by developers on the NEAR blockchain.
QueryApi allows hosted execution of complex queries (ones that can’t be answered by a [simple RPC](../../5.api/rpc/introduction.md) or [Enhanced API](https://docs.pagoda.co/api) call), data hosting, and its exposure via GraphQL endpoints.


## Components involved 

The QueryApi implementation integrates many different components in a single and streamlined solution.
In a high-level overview, the main components are:

:::info Components
`NEAR Protocol` -> `NEAR Lake` -> `Coordinator` -> `Runner` -> `Database` -> `API`
:::


### Detailed overview

An in-depth, detailed overview of the QueryApi components:

[![QueryAPI](/docs/qapi-components.png)](/docs/qapi-components.png)


### Description

- **Protocol:** the underlying NEAR Layer-1 Blockchain, where data `Blocks` and `Chunks` are produced.
- **NEAR Lake:** an indexer which watches the Layer-1 network and stores all the events as JSON files on AWS S3. Changes are indexed as new `Blocks` arrive.
- **Coordinator:** the QueryApi coordinator indexer filters matching data `Blocks`, runs historical processing threads, and queues developer's JS code to be indexed with these matched blocks.
- **Runner:** executes the user's indexer code, which outputs the data to the database.
- **Database:** a Postgres database where the developer's indexer data is stored, using a logical DB per user, and a logical schema per indexer function.
- **API:** a Hasura server running on Google Cloud Platform exposes a GraphQL endpoint so users can access their data from anywhere.


## Provisioning

### Low Level Summary

There are two main pieces to provisioning: Postgres and Hasura.

### Postgres

The dynamic piece in this is the user provided `schema` file, which uses Data Definition Language (DDL) to describe the structure of the users database. The `schema` DDL will be executed within a new Postgres Schema named after the account + function name, i.e. `morgs_near_my_function`. Each schema exists within a separate virtual database for that account, named after the account, i.e. `morgs_near`.

### Hasura

After creating the new schema, Hasura is configured to expose this schema via a GraphQL endpoint. First, the database is added as a datasource to Hasura. By default, all tables are hidden, so to expose them they must be "tracked". 

Foreign keys in Postgres allow for nested queries via GraphQL, for example a `posts` table may have a foreign relationship to a `comments` table, this enables us to query the comments relating to a post within a single query. Again, these are not enabled by default, so must be "tracked".

Finally, necessary permissions are added to the tables. These permissions control which GraphQL operations will be exposed. For example, the `select` permission allows all queries, and `delete` will expose all delete mutations. A role, named after the account, is used to group these permissions. Specifying the role in the GraphQL request applies these permissions to that request, preventing access to other users data.

### High Level Steps

In summary, provisioning consists of the following steps:
1. Create `database`, named after account, if necessary
2. Add `database` to Hasura
3. Create `schema` in `database`
4. Run DDL in `schema`
5. Track all tables in `schema` in Hasura
6. Track all foreign key relationships in `schema` in Hasura
7. Add all permissions to all tables in `schema`

To check if an Indexer has been provisioned, we check if both the `database` and `schema` exist. This check is what prevents us from attempting to provision an already provisioned indexer. But is also what prevents us from completing previously failed steps.

## Who hosts QueryAPI

[Pagoda Inc.](https://pagoda.co) runs and manages all the infrastructure of QueryAPI, including NEAR Lake nodes to store the data in JSON format on AWS S3.

- NEAR Lake indexing is hosted on AWS S3 buckets.
- Coordinator and Runners are hosted on GCP.
- Hasura GraphQL API server is hosted on GCP.

:::caution Pricing
QueryAPI is currently free. Pagoda doesn't charge for storage of your indexer code and data as well as running the indexer, but usage pricing will be introduced once QueryApi is out of beta.
:::
