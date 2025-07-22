---
id: data-apis
title: Data APIs
description: "Explore community-built APIs for accessing NEAR Protocol on-chain data, including NearBlocks, FastNear, The Graph, PIKESPEAK, and other indexing solutions."
---

Members of the NEAR community have built a set of APIs to access and monitor on-chain data. These APIs are designed to be easy to use and can be accessed from any application through a simple API call.

- [NearBlocks API](#nearblocks-api): Query actions that happened on a NEAR account
- [FastNear API](#fastnear-api): Exposes low-latency APIs for wallets and explorers
- [The Graph](https://thegraph.com/docs/en/cookbook/near/): The Graph gives developers tools to process blockchain events and make the resulting data easily available via a GraphQL API, known individually as a subgraph. [Graph Node](https://github.com/graphprotocol/graph-node) is now able to process NEAR events, which means that NEAR developers can now build subgraphs to index their smart contracts.
- [PIKESPEAK API](https://pikespeak.ai): an enterprise-grade API where you can fetch blockchain events and aggregated analytics on wallets, validators, delegators, money transfers, dapps activity and more. [Documentation](https://doc.pikespeak.ai/)
- [Mintbase Indexer](https://mintbase.xyz/) A highly efficient and adaptable indexing solution developed to capture, process, and store NFT events throughout the NEAR ecosystem. This indexer provides developers with a streamlined and well-structured data stream, making it an optimal choice for constructing data-centric applications in the NFT space. By systematically monitoring and indexing a wide array of NFT-related events across various platforms and projects on NEAR, the Mintbase Indexer offers developers the necessary tools and data access to build innovative and practical applications. Furthermore, the indexed data can be conveniently queried using GraphQL, allowing for flexible and efficient data retrieval tailored to specific developer needs. [Documentation](https://docs.mintbase.xyz/dev/mintbase-graph)
- [SubQuery](https://academy.subquery.network/quickstart/quickstart_chains/near.html): SubQuery is a fast, flexible, and reliable open-source data indexer that provides you with custom APIs for your web3 project across NEAR and many other chains. NEAR developers will benefit from the superior SubQuery experience, including the open-source SDK, tools, [documentation](https://academy.subquery.network), and developer support that the SubQuery ecosystem provides. Additionally, NEAR is accommodated by [SubQuery’s Managed Service](http://managedservice.subquery.network/), which provides enterprise-level infrastructure hosting.

:::tip

We only include some examples on how to use these APIs. For more information, check each project's documentation

:::

---

## [NearBlocks API](https://api.nearblocks.io/api-docs/)

The NearBlocks API provides a simple way to query actions that happened on a NEAR account, such as function calls, token transfers, etc

```bash
# All the times **anyone** called "create_drop" on Keypom
https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop

# All the times that gagdiez.near called "create_drop" on Keypom
https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop&from=gagdiez.near
```


<details>
  <summary> Response </summary>

```json
{
  "txns": [
    {
      "predecessor_account_id": "gagdiez.near",
      "receiver_account_id": "v2.keypom.near",
      "receipt_kind": "ACTION",
      "receipt_outcome": {
        "status": true,
        ...
      },
      ...
    }
  ]
}
```

</details>

:::info More info

Find more information about the NearBlocks API in their [api page](https://api.nearblocks.io/api-docs/)

:::

---

## [FastNear API](https://fastnear.com/)

FastNear exposes low-latency APIs for wallets and explorers. Their API allows you to easily query the NEAR blockchain to get an account's assets, map keys into account IDs, explore a block's transactions, etc.

#### [Blockchain Data](https://github.com/fastnear/neardata-server/)

```bash
# Query last block produced
curl https://mainnet.neardata.xyz/v0/last_block/final
```

<details>
  <summary> Response </summary>

```json
  {
    "block": {
      "author": "aurora.pool.near",
      "header": {
        "height": 129311487,
        "prev_height": 129311486,
        ...
      }
    }
  }
```

</details>

#### [User Queries](https://github.com/fastnear/fastnear-api-server-rs)

```bash
# Query user's FTs
curl https://api.fastnear.com/v1/account/root.near/ft

# Query user's NFTs
curl https://api.fastnear.com/v1/account/root.near/ft

# Query all user's assets
curl https://api.fastnear.com/v1/account/root.near/full
```

<details>
  <summary> Response </summary>

```json
  {
    "account_id": "root.near",
    "tokens": [
      { "balance": "199462092", "contract_id": "the-token.near" },
      ...
    ]
  }
```

</details>

:::info More info

Find more information about the FastNear API on their [documentation page](https://docs.fastnear.com/)

:::
