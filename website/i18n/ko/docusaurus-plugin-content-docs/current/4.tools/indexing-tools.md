---
id: indexing
title: NEAR 내 인덱싱 솔루션
sidebar_label: "Indexing Solutions"
---

# NEAR 내 인덱싱 솔루션

다음은 NEAR 생태계의 인덱서 프로젝트에 대한 간략한 개요입니다.

- [QueryAPI](../2.build/6.data-infrastructure/query-api/intro.md): Near QueryAPI is a fully managed solution to build indexer functions, extract on-chain data, store it in a database, and be able to query it using GraphQL endpoints.

- [BigQuery](../2.build/6.data-infrastructure/big-query.md): Blockchain data indexing in NEAR Public Lakehouse is for anyone wanting to understand blockchain data.

- [NEAR Lake Framework](../2.build/6.data-infrastructure/lake-framework/near-lake.md): a companion library to NEAR Lake. 이를 통해 **NEAR Lake 데이터 소스**에서 블록 스트림을 감시하는 고유한 인덱서를 구축하고 **해당 데이터를 처리하는 고유한 로직을 생성**할 수 있습니다. Keep in mind this is **the one you want to use for future projects**, instead of the Indexer Framework. Read [why it is better](https://docs.near.org/concepts/advanced/near-indexer-framework#why-is-it-better-than-near-indexer-framework).

- [Indexer.xyz 멀티체인 인덱서](https://indexer.xyz/): Indexer.xyz는 NFT 또는 DeFi 애플리케이션을 구축할 수 있는 애플리케이션 레이어입니다. 원시 트랜잭션 인덱싱 외에도, Indexer.xyz는 컨트랙트와 체인 간의 트랜잭션을 쉽게 활용할 수 있는 표준화된 GraphQL API 레이어를 제공합니다.

- [Pagoda NEAR Lake](https://docs.pagoda.co/near-lake): [Pagoda Inc.](https://pagoda.co)의 완전 관리형 솔루션을 사용하면, 자체 NEAR Lake 노드 및 AWS S3 버킷을 실행할 필요가 없습니다.

- [The Graph](https://thegraph.com/docs/en/cookbook/near/): 블록체인 이벤트를 처리하고 subgraph로 알려진 GraphQL API를 통해 결과 데이터를 쉽게 사용할 수 있도록 하는 개발 도구입니다. [Graph 노드](https://github.com/graphprotocol/graph-node)는 NEAR 이벤트를 처리할 수 있습니다. 즉, NEAR 개발자는 subgraph를 만들어 스마트 컨트랙트를 인덱싱할 수 있습니다.

- [GetBlock](https://getblock.io/explorers/near/blocks/): NEAR 프로토콜을 포함한 여러 블록체인에 대한 간단하고 안정적인 API 액세스를 제공하는 개발자 도구입니다.

- [NearBlocks](https://api.nearblocks.io/api-docs/#/): NearBlocks API로 정확하고 안정적인 dApp을 구축하세요.

- [Octopus 네트워크 NEAR 인덱서](https://github.com/octopus-network/octopus-near-indexer-s3): NEAR Lake 프레임워크 기반의 인덱싱 솔루션입니다.

- [Covalent](https://www.covalenthq.com/docs/networks/aurora/): [Aurora EVM](https://aurora.dev/) 인덱싱을 위해, Covalent는 수십억 개의 Web3 데이터 포인트에 대한 가시성을 제공하는 통합 API를 제공합니다.

- [NEAR 인덱서 프레임워크](https://docs.near.org/concepts/advanced/near-indexer-framework): 블록의 "라이브" 스트림을 제공하는 마이크로 프레임워크입니다. Useful to handle on-chain real-time `events`.

- [NEAR Indexer for Explorer](https://github.com/near/near-indexer-for-explorer): an indexer built on top of the indexer microframework. 블록체인에서 **PostgreSQL 데이터베이스**로의 모든 이벤트/데이터를 감시하고 저장합니다. [GitHub 레퍼지토리](https://github.com/near/near-indexer-for-explorer)를 복제해서 고유한 인덱서 솔루션을 만들 수도 있습니다.

- [SubQuery](https://academy.subquery.network/quickstart/quickstart_chains/near.html): is an end to end multi-blockchain indexing solution that provides NEAR developers with fast, flexible, universal, open source and decentralized APIs for web3 projects. The [NEAR starter project](https://github.com/subquery/near-subql-starter/tree/main/Near/near-starter) provides a template for developers to get up and running within minutes.
