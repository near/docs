---
id: indexers
title: QueryAPI Indexing Example
sidebar_label: Getting Started
---

QueryAPI를 통해 다음과 같은 방식으로 자신만의 인덱서를 빠르게 생성할 수 있습니다:

- 커스텀 인덱서 함수를 작성하기;
- 커스텀 호스팅 데이터베이스에 대한 스키마를 지정하고 인덱서 함수를 사용하여 데이터베이스에 쓰기;
- GraphQL API를 통해 데이터 반환하기;

:::tip

You can watch a complete video walkthrough of Query API [following this link](https://www.youtube.com/watch?v=VwO6spk8D58).

:::

:::info

NEAR QueryAPI is currently under development. Users who want to test-drive this solution need to be added to the allowlist before creating or forking QueryAPI indexers.

You can request access through [this link](http://bit.ly/near-queryapi-beta).

:::

## How it Works

QueryAPI works by:

1. 인덱서 이름을 블록체인에 쓰고, 생성을 등록합니다;
2. GraphQL 데이터베이스에 스키마에 지정된 대로 테이블을 생성하고, GraphQL 엔드포인트를 노출시켜 데이터를 쿼리합니다;
3. 인덱서 함수를 실행하는 클라우드 프로세스를 돌려, GraphQL 데이터베이스에 씁니다;

[이 링크를 통해 NEAR QueryAPI](https://near.org/dataplatform.near/widget/QueryApi.App)에 접근할 수 있습니다.

This should take you to a dashboard that looks like this:

![QueryAPI 대시보드](/docs/assets/QAPIScreen.png)

:::tip Video Walkthrough

**Tip:** Watch the [QueryAPI widget introduction](https://www.youtube.com/watch?v=VwO6spk8D58\&t=109s).

:::

## Creating an Indexer

"Create New Indexer"를 클릭하면 브라우저가 다음과 같은 컴포넌트 코드 에디터로 리디렉션됩니다:

![QueryAPI 인덱서 대시보드](/docs/assets/QAPIScreen2.png)

이 인터페이스를 통해 새 인덱서를 만들 수 있습니다. 여기서 다음을 지정할 수 있습니다:

- `indexingLogic.js`의 필터링, 변환 로직
- `schema.graphql` 내 데이터베이스 스키마
- `GraphiQL` 내 GraphQL 쿼리
- Indexer Name에 있는 인덱서 이름
- from which block to start indexing

### Design Workflow

To design and create your indexer, you can follow this recommended workflow:

1. Using [nearblocks.io](https://nearblocks.io), find transactions to smart contracts that you want to index
2. Take the block `height` and put it into the [Debug Mode filter](index-function.md#local-debug-mode), open your browser's _Developer Console_, and hit <kbd>Play</kbd>
3. Inspect the block and write JavaScript code using [NEAR Lake Primitives](../lake-framework/building-indexers/primitives.md) to extract data from a `block` object. (This JS code will be your [`IndexingLogic.js`](#indexinglogicjs))
   > **Tip:** Use `context.log` for debugging to ensure you are getting the right results
4. Add more blocks for debugging, or start following the blockchain to see how new blocks are handled
5. Create tables that you need to store the data using Postgres [CREATE table syntax](https://www.postgresql.org/docs/current/sql-createtable.html). (This SQL code will be your [`schema.sql`](#schemasql))

:::tip Video Walkthrough

**Tip:** Watch the [introduction to indexing functions](https://www.youtube.com/watch?v=VwO6spk8D58\&t=411s).

:::

### `IndexingLogic.js`

인덱서 코드 에디터는 다음과 같은 템플릿으로 미리 채워집니다:

```js
import { Block } from "@near-lake/primitives";
/**
 * Note: We only support javascript at the moment. We will support Rust, Typescript in a further release.
 */

/**
 * getBlock(block, context) applies your custom logic to a Block on Near and commits the data to a database.
 *
 * Learn more about indexers here:  https://docs.near.org/concepts/advanced/indexers
 *
 * @param {block} Block - A Near Protocol Block
 * @param {context} - A set of helper methods to retrieve and commit state
 */
async function getBlock(block: Block, context) {
  // Add your code here
  const h = block.header().height;
  await context.set("height", h);
}
```

이 코드를 통해 에디터는 선택된 `indexingLogic.js` 파일을 표시합니다. 특히 이 로직은 사용자가 지정한 데이터를 `schema.sql`에 정의한 GraphQL 데이터베이스로 변환하고 저장하는 블록체인 트랜잭션의 필터링을 수행합니다.

:::info Saving data

인덱서에서 캡처한 데이터를 GraphQL 데이터베이스의 정의된 테이블에 저장할 수 있습니다. You can do this easily by using the [`context.db`](context.md#db) object [`insert`](context.md#insert) method.   예를 들어, `id`, `sender`, `receiver`, `receiver`, `amount`, `block_height`의 열이 있는 `transactions`라는 테이블이 있는 경우 테이블에 다음과 같이 새 요소 하나에 대한 변환 쿼리를 삽입할 수 있습니다:

```js
const tx = {
    block_height: h,
    sender: "senderId",
    receiver: "receiverId",
    amount: 100,
};

await context.db.Transactions.insert(tx);
```

:::

:::info Using GraphQL mutations

You can also insert elements using GraphQL mutation queries in your `indexingLogic.js` file:

```js
await context.graphql(`
  mutation MyMutation($transaction: some_table_insert_input!) {
    insert_<ACCOUNT_NAME>_near_transactions_one(
      object: $transaction
    ) {
      affected_rows
    }
  }
`);
```

Creating GraphQL queries within strings can be difficult, especially considering that the table names vary depending on your indexer name and account ID. GraphQL Playground 사이트를 방문하여 쿼리를 만드는 것이 더 쉬운 방법입니다.

> **Tip:** watch the video on how to [create queries in Playground](https://www.youtube.com/watch?v=VwO6spk8D58\&t=1207s).

:::

### `schema.sql`

에디터의 이 탭은 다음과 같은 템플릿으로 미리 채워집니다:

```sql
CREATE TABLE "indexer_storage" (
  "function_name" TEXT NOT NULL,
  "key_name" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  PRIMARY KEY ("function_name", "key_name")
);
```

이는 `indexingLogic.js`에서 지정한 데이터를 저장하는 데 사용되는 데이터베이스 스키마입니다. 적합하다고 판단되는 대로 이 스키마에 테이블과 열을 추가할 수 있습니다. 인덱서를 작성하는 즉시 생성될 것입니다.

Creating this default table will allow you to use the [`context.set`](context.md#set) helper method to write data. It takes two arguments: a key argument that accepts a string and a value argument,  which will be written to the `key_name` and `value` columns.

:::caution Note on schema migration
You are able to update `indexingLogic.js` after you have registered/created your indexer, but you are only allowed to specify `schema.sql` once before you submit your indexer. 스키마를 업데이트하려면 새 인덱서를 만들어야 합니다.
:::

### `GraphiQL`

에디터의 GraphiQL 탭을 사용하면 GraphQL 엔드포인트에서 반환된 데이터를 볼 수 있습니다. 인덱서를 작성한 후 확인하는 것이 가장 좋습니다.

:::tip Video Walkthrough

**Tip:** Watch how to [create mutations in GraphQL](https://www.youtube.com/watch?v=VwO6spk8D58\&t=781s).

:::

### Publishing

Clicking the <kbd>Publish</kbd> button will open the following pop-up. From here, you can configure the Indexer name, start block, and contract filter.

![Publishing QueryAPI Indexer](/docs/assets/QAPIPublish.png)

#### Start Block Options

- `Start from latest block`: Start indexing from the tip of the network. The exact block height is not guaranteed. Useful for testing indexing for events happening in real-time.
- `Continue from last processed block`: Update the configuration of the Indexer, and resume indexing from the last processed block. The block at which the configuration is updated is not guaranteed. Useful for fixing bugs encountered on specific blocks, adding additional logs, etc.
- `Start from block height`: Start indexing from the height specified, i.e., when the contract was deployed, or when a specific event occurs.

:::info
`Continue from last processed block` is only available for existing indexers. Updating the contract filter is disabled for this option, as it will create a backlog of blocks for two different contracts.
:::

:::warning
`Start from latest block` and `Start from block height` supersede the existing process. All queued blocks at the time of update will be cleared.
:::

## Performing Queries on the Public GraphQL API

In this section, we will provide a brief overview of how to query from a component in NEAR.

GraphQL API에서 가져올 수 있는 헬퍼 메소드를 만드는 것이 유용합니다. 이를 `fetchGraphQL`이라고 합시다. 이는 세 가지 매개변수를 받습니다:

1. `queryDoc`: 실행할 쿼리가 들어 있는 문자열입니다.
2. `queryName`: 실행할 특정 쿼리입니다.
3. `filename`: 페이지 번호에 대한 `offset` 및 `limit`와 같이 쿼리가 지원하는 전달할 변수입니다.

```javascript
function fetchGraphQL(queriesDoc, queryName, variables) {
  return asyncFetch(
    QUERY_API_ENDPOINT,
    {
      method: "POST",
      headers: { "x-hasura-role": `<your_account_name>_near` },
      body: JSON.stringify({
        queries: queriesDoc,
        variables: variables,
        operationName: queryName,
      }),
    }
  );
}
```

`fetchGraphQL` 함수를 사용하려면 먼저 원하는 쿼리를 포함하는 일련의 쿼리(예: `transactionQueryDoc`)를 정의합니다:

```javascript
const transactionQueriesDoc = `query TransactionsQuery {
  root_near_transactions {
    id
    sender
    receiver
    amount
    block_height
  }
}
...
query AnotherQuery {
  root_near_accounts {
    id
  }
}`;
```

다음으로 `fetchGraphQL` 함수를 적절한 파라미터와 함께 호출하여 결과를 처리합니다. 이 예에서는 트랜잭션 데이터를 가져오고 애플리케이션 상태를 업데이트합니다:

```javascript
fetchGraphQL(transactionQueriesDoc, "TransactionsQuery", {})
  .then((result) => {
    if (result.status === 200) {
      let data = result.body.data;
      if (data) {
        const transactions = data.root_near_transactions;
        // Perform any necessary operations on the fetched data
        ...
        // Update state with the new transactions data
        State.update({
          transactions: transactions,
        });
      }
    }
  });
```

We have just shown how to fetch data from the indexers that we have created from within NEAR. To view a more complex example, see this widget which fetches posts with proper pagination: [Posts Widget powered By QueryAPI](https://near.org/dataplatform.near/widget/QueryApi.Examples.Feed.Posts).

:::tip Video Walkthrough

**Tip:** Watch an [end-to-end example](https://www.youtube.com/watch?v=VwO6spk8D58\&t=943s).

:::
