---
id: indexer
title: NEAR Indexer
sidebar_label: Indexer
---

> NEAR Indexer is a library included with [nearcore](https://github.com/near/nearcore) that allows you to run a node on the network which listens for targeted information on the blockchain.

The [NEAR Indexer Framework](https://github.com/near/nearcore/tree/master/chain/indexer) provides the logic of polling a node for blocks produced in a network then aggregating and streaming these blocks to a listener.

To better understand this, blockchain data is optimized for serialized writes, one block at a time, as the chain is being created. Querying the blockchain for data about a specific block or account is a fairly stragightforward or "narrow" query. However, querying data across many blocks can be cumbersome because we have to aggregate results from multiple single-block queries. We can consider these "wide" queries.

An indexer listens to the stream of data as it's being written on chain and can then be immediately filtered and processed to detect interesting events or patterns. This same stream of data can then be written to a permanent database for later data analysis using a convenient query language like SQL.

One example that highlights the need for a wide query is when you use a seed phrase to recover one or more accounts. Since a seed phrase essentially represents a signing key pair, the recovery is for **all** accounts that share the associated public key. Therefore, when a seed phrase is used to recover an account via [NEAR Wallet](https://wallet.near.org/), the query requires that **all accounts** with a matching public key are found and recovered.

The easiest way to achieve this "wide query" is to utilize a database that has been filled by an indexing service. For this purpose we’ve built the [NEAR Indexer for wallet](https://github.com/near/near-indexer-for-wallet) which listens to all actions on chain that might create or delete [access keys](/docs/concepts/account#access-keys) and stores them into a relational database for easier querying of accounts.
