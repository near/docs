---
id: intro
title: QueryAPI Overview
sidebar_label: Introduction
---


Near QueryAPI is a fully managed solution to build indexer functions,
extract on-chain data, store it in a database, and be able to query it using GraphQL endpoints.

## Indexing complexity

Blockchain Indexers are known to be difficult to create, maintain, and operate.
You have to focus on the business logic of your indexer, while you also have to
take care of everything else around it.
Common indexing challenges include:

#### Creation

- Design Database Schema and provision it with correct configurations for security, data retention, and performance. 
- Write and test indexer code that interacts with the database 
- Deploy Indexer to a Cloud provider. Ensure network permissions firewalls, PCs, or other network-related settings are setup correctly. 
- Create an API endpoint to retrieve data from your database for your fronted applications 

#### Maintenance

- Monitor performance of your database and scale it as needed 
- Manage permissions and access to database with changing requirements 

#### Operation

- Re-index data due to issues and updates. Ensuring that production environments don't get disrupted. 
- Perform database schema migrations
- Scale the API as your application grows 
- Keep up with all the underlying blockchain nodes and upgrades

## QueryAPI

A dedicated team member could be needed to deal with all these challenges.

Running indexers is a complex and comprehensive set of processes, and
we try to cover most (or all) of these needs using Near QueryAPI, which is an open-source solution for creating, managing, and exploring other indexers.


### BOS Widget

`Queryapi.app` is the widget's name and it's hosted under `dataplatform.near`.
Here you can see all the indexers that exist and are for the public.
As you can see, there's a whole bunch of them here.
I've made a few myself.
If you would like to create a new indexer, simply click here.
Right now we're going to be checking out an indexer that powers the near.org's main feed
of posts.
Let's click view indexer to see all the details.

