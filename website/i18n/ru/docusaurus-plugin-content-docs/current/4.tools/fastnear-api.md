---
id: fastnear-api
title: FastNEAR API
sidebar_label: FastNEAR API
---

A fast RPC for the NEAR blockchain, based on [Redis](https://redis.io/) and [LMDB](https://www.symas.com/lmdb).

## About FastNEAR

[Fast-Near](https://github.com/fastnear/fast-near) aims to provide the fastest RPC implementation for NEAR Protocol using high-performance storage backends:

- in-memory storage in Redis.
- SSD optimized storage using LMDB.

It is optimized for `view` call performance and ease of deploy and scaling.

:::info Note about data sync
FastNear doesn't sync with the NEAR blockchain on its own. Data needs to be loaded either from [NEAR Lake](https://github.com/near/near-lake-indexer) or from [Near State Indexer](https://github.com/vgrichina/near-state-indexer).
:::

---

## FastNEAR API

The [FastNEAR API server](https://github.com/fastnear/fastnear-api-server-rs) provides a low-latency RPC API for wallets and explorers.

### Supported APIs

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
