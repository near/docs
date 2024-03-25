---
id: indexer-for-explorer
title: Indexer for Explorer (Deprecated)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

탈중앙화 앱을 개발하는 동안, 다음과 같이 컨트랙트에 대한 사용 정보를 쿼리할 수 있습니다.

1. Which users have called a specific method in my contract?
2. How much money and gas did they deposit?
3. Which transactions failed?

In order to simplify asking these questions is that we developed the [NEAR Indexer for Explorer](https://github.com/near/near-indexer-for-explorer).

Both `testnet` and `mainnet` networks have active instances that fill the database with all the data from the network starting from the genesis as [Explorer](https://nearblocks.io/) requires.

:::info GitHub 레퍼지토리

익스플로러용 NEAR 인덱서는 [NEAR 인덱서 마이크로프레임워크](https://near-indexers.io/docs/projects/near-indexer-framework) 위에 구축된 인덱서입니다. 이는 네트워크를 감시하고, 블록체인의 모든 데이터를 PostgreSQL 데이터베이스에 저장합니다. [이 GitHub 레퍼지토리](https://github.com/near/near-indexer-for-explorer)에서 소스 코드를 찾을 수 있습니다.

:::

---

## 쿼리 예제

### 메서드를 호출하는 트랜잭션
Query for all transactions that called `contribute` in the `v1.faucet.nonofficial.testnet` testnet account.

```sql
select r.predecessor_account_id, t.transaction_hash 
from receipts r, action_receipt_actions ara, transactions t
where r.receiver_account_id ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id
  and ara.action_kind = 'FUNCTION_CALL'
  and ara.args @> '{"method_name": "contribute"}'
  and t.transaction_hash = r.originated_from_transaction_hash
```

<hr className="subsection" />

### Users, Status, and Attached Money
`v1.faucet.nonofficial.testnet` 테스트넷 계정에서 `contribute`를 호출한 모든 사용자, 호출에 첨부된 금액, 그리고 트랜잭션 상태를 쿼리합니다.

```sql
select t.transaction_hash, eo.status, r.predecessor_account_id , ara.args -> 'deposit' as deposit
from receipts r, action_receipt_actions ara, transactions t, execution_outcomes eo
where r.receiver_account_id ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id and ara.action_kind = 'FUNCTION_CALL'
  and ara.args @> '{"method_name": "contribute"}'
  and t.transaction_hash = r.originated_from_transaction_hash
  and r.receipt_id = eo.receipt_id
```

<hr className="subsection" />

### 보낸 금액
`v1.faucet.nonofficial.testnet`에서 나가는 모든 전송 데이터를 쿼리합니다.

```sql
select r.receiver_account_id, ara.args -> 'deposit' as deposit  
from receipts r, action_receipt_actions ara
where r.predecessor_account_id  ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id and ara.action_kind = 'TRANSFER'
```

---

## NEAR Explorer sunsetting

Pagoda made a decision to sunset NEAR Explorer as a product. This means that `nearblocks.io` (and `explorer.testnet.near.org`) will become a landing page with a list of available alternatives, and the existing [nearblocks.io](https://nearblocks.io) will be hosted under a new domain name and will be transitioned to the community through DevHub. [Read more here](https://near.social/devgovgigs.near/widget/gigs-board.pages.Post?id=635).


### What exactly is being shut down?

You will lose access to databases with these URLs, or other Replicas you might have been given access to:
* `testnet.db.explorer.indexer.near.dev/testnet_explorer`
* `mainnet.db.explorer.indexer.near.dev/mainnet_explorer`


There is no plan to shut down any other data products, such as [NEAR Lake](https://docs.near.org/concepts/advanced/near-lake-framework) or [EnhancedAPI](https://www.pagoda.co/enhanced-api) at the moment.

### What is the timeline?

Postgres users will lose access to data on the 30th of November, Thursday (12:00 pm Pacific Time Zone). Please migrate to one of the options listed below instead.

### What does this mean for me?

If you are using the public Postgres Explorer Database, you will need to migrate to other solutions, depending on your use-case. You should start planning for it right now and reach out to [this Telegram group](https://nearbuilders.com/tg-data) to get help.

### What are the alternatives?

There are two major use-cases that you might be using Explorer DB for: analytics and real-time queries from web user interfaces.

#### Analytics Use-Case

This is if you use Explorer DB to build internal or external dashboards. Pagoda has been working with Google Web3 team to enable BigQuery public dataset that has a compatible schema with Explorer DB.

:::tip

Find more information about our [BigQuery solution here](../bos/queryapi/big-query.md).

:::

#### Web or API usage

This is if you make queries to Explorer DB in response to API requests that your users make on your application. There are various options that you can explore:
1. If you are working with token balances, including $NEAR, fungible or non-fungible tokens, consider using [Enhanced API](https://www.pagoda.co/enhanced-api) hosted by Pagoda, or run it yourself using https://github.com/near/near-enhanced-api-server and https://github.com/near/near-microindexers
2. Use NEAR QueryAPI – serverless indexers and GraphQL endpoints: https://near.org/s/p?a=nearpavel.near&b=97029570
3. Use NEAR Lake Indexer. Create an indexer using [Rust](https://github.com/near/near-lake-framework-rs), [JavaScript](https://github.com/near/near-lake-framework-js). There are other languages supported by community, [try this search](https://github.com/search?q=near-lake-framework&type=repositories).
4. Consider other indexer solutions built by the community

### Can I still continue using Explorer Database?

No, you won’t be able to continue using Public Explorer Database after the sunset. However you can start your own instance of https://github.com/near/near-indexer-for-explorer and reindex the history from scratch or use a latest backup. We will share a backup of Explorer DB in September if you want to run your own instance.


To run your own infra, you will need:
* **Indexer services:** We use two e2-medium instances on GCP for redundancy, with 2 vCPUs and 4GB of RAM.
* **A database:** We use Postgres version 11, with 8+ vCPUs, 52GB+ RAM and ~8TB of SSD storage. In addition, we recommend running an extra read-replica on a similar or more powerful machine.
