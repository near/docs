---
id: fastnear-api
title: FastNEAR API
sidebar_label: FastNEAR API
---

[FastNEAR](https://fastnear.com/) provides high-performance infrastructure enabling seamless blockchain interactions.

## Overview

[FastNEAR](https://fastnear.com/) exposes low-latency APIs for wallets and explorers. Their API allows you to easily query the NEAR blockchain to get an account's assets, map keys into account IDs, explore a block's transactions, etc.

:::info More info

Find more information about the FastNear API in their [services page](https://fastnear.com/services).

:::

## RPC implementation

[Fast-Near](https://github.com/fastnear/fast-near) aims to provide the fastest RPC implementation for NEAR Protocol using high-performance storage backends:
 - in-memory storage in [Redis](https://redis.io/).
 - SSD optimized storage using [LMDB](https://www.symas.com/lmdb).

It is optimized for `view` call performance and ease of deploy and scaling.


:::note About data sync
FastNear doesn't sync with the NEAR blockchain on its own. Data needs to be loaded either from [NEAR Lake](https://github.com/near/near-lake-indexer) or from [Near State Indexer](https://github.com/vgrichina/near-state-indexer).
:::

---

## Endpoints

The [FastNEAR API server](https://github.com/fastnear/fastnear-api-server-rs) provides a low-latency RPC API for wallets and explorers.

- Mainnet: `https://api.fastnear.com`
- Testnet: `https://test.api.fastnear.com`

#### Public Key

- Public Key to Account ID mapping.
- Full Access Public Key to Account ID mapping.
- Any Public Key to Account ID mapping.

#### Account ID

- Account ID to delegated staking pools (validators).
- Account ID to fungible tokens (FT contracts).
- Account ID to non-fungible tokens (NFT contracts).

#### Token ID

- Token ID to top 100 accounts by balance (for FT contracts).


:::tip V1 API

[Click here](https://github.com/fastnear/fastnear-api-server-rs?tab=readme-ov-file#api-v1) to see the complete list of API endpoints and usage examples.

:::

## Examples

### [Blockchain Data](https://github.com/fastnear/neardata-server/)

- Query last block produced

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

### [User Queries](https://github.com/fastnear/fastnear-api-server-rs)

- Query user's FTs

```bash
# Query user's FTs
curl https://api.fastnear.com/v1/account/root.near/ft
```

<details>
  <summary> Response </summary>

```json
{"account_id":"root.near","tokens":[{"balance":"199462092","contract_id":"pixeltoken.near","last_update_block_height":null},...
```

</details>

---

- Query user's NFTs

```sh
# Query user's NFTs
curl https://api.fastnear.com/v1/account/root.near/nft
```

<details>
  <summary> Response </summary>

```json
{"account_id":"root.near","tokens":[{"contract_id":"nft.goodfortunefelines.near","last_update_block_height":null},...
```

</details>

---

- Query all user's assets

```sh
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
