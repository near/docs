---
id: posts-indexer
title: Posts 인덱서
sidebar_label: Posts 인덱서
---

:::info

NEAR QueryAPI is currently under development. Users who want to test-drive this solution need to be added to the allowlist before creating or forking QueryAPI indexers.

You can request access through [this link](http://bit.ly/near-queryapi-beta).

:::

## 개요

이 인덱서는 사용자가 GraphQL 데이터베이스에서 생성한 사전 정의된 `posts` 테이블에 블록체인에서 발견된 모든 새 게시물에 대해 새 행을 만듭니다. 이는 테이블을 지정하고, 특정 트랜잭션 유형에 대한 블록체인 트랜잭션 데이터를 필터링하며, 데이터를 데이터베이스에 저장하는 방법을 보여주는 간단한 예입니다.

:::tip

This indexer can be found by [following this link](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=bucanero.near/posts-example).

:::

## 데이터베이스 스키마 정의

인덱서를 만드는 첫 번째 단계는 데이터베이스 스키마를 정의하는 것입니다. 이 작업은 코드 에디터에서 `schema.sql` 파일을 편집하여 수행합니다. 이 인덱서의 스키마는 다음과 같습니다:

```sql
CREATE TABLE
  "posts" (
    "id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
  );
```

이 스키마는 열이 있는 `posts`라는 테이블을 정의합니다:

- `id`: a unique identifier for each row in the table
- `account_id`: the account ID of the user who created the post
- `block_height`: the height of the block in which the post was created
- `receipt_id`: the receipt ID of the transaction that created the post
- `content`: the content of the post
- `block_timestamp`: the timestamp of the block in which the post was created

## 인덱싱 로직 정의

다음은 인덱싱 로직을 정의할 차례입니다. 이 작업은 코드 에디터에서 `indexingLogic.js` 파일을 편집하여 수행합니다. 이 인덱서의 로직은 두 부분으로 나눌 수 있습니다:

1. 특정 트랜잭션 유형에 대한 블록체인 트랜잭션 필터링
2. 필터링된 트랜잭션의 데이터를 데이터베이스에 저장

### 블록체인 트랜잭션 필터링

로직의 첫 번째 부분은 특정 유형의 트랜잭션에 대한 블록체인 트랜잭션을 필터링하는 것입니다. 이 작업은 `getBlock` 함수를 사용하여 수행됩니다. 이 함수는 블록과 컨텍스트를 사용하여 Promise를 반환합니다. 블록은 Near 프로토콜 블록이고, 컨텍스트는 상태를 검색하고 커밋하는 헬퍼 메서드 집합입니다. `getBlock` 함수는 블록체인의 모든 블록에 대해 호출됩니다.

이 인덱서의 `getBlock` 함수는 다음과 같습니다:

```js
import { Block } from "@near-lake/primitives";

async function getBlock(block: Block, context) {
  function base64decode(encodedValue) {
    let buff = Buffer.from(encodedValue, "base64");
    return JSON.parse(buff.toString("utf-8"));
  }

  const SOCIAL_DB = "social.near";

  const nearSocialPosts = block
    .actions()
    .filter((action) => action.receiverId === SOCIAL_DB)
    .flatMap((action) =>
      action.operations
        .map((operation) => operation["FunctionCall"])
        .filter((operation) => operation?.method_name === "set")
        .map((functionCallOperation) => ({
          ...functionCallOperation,
          args: base64decode(functionCallOperation.args),
          receiptId: action.receiptId,
        }))
        .filter((functionCall) => {
          const accountId = Object.keys(functionCall.args.data)[0];
          return (
            Object.keys(functionCall.args.data[accountId]).includes("post") ||
            Object.keys(functionCall.args.data[accountId]).includes("index")
          );
        })
    );

  ... // Further logic for saving nearSocialPosts to the database
}
```

이 함수는 먼저 base64 인코딩 데이터를 디코딩하는 `base64decode`라는 헬퍼 함수를 정의합니다. It then defines a constant called `SOCIAL_DB` that is the name of the smart contract that stores the posts in NEAR. 그런 다음 특정 유형의 트랜잭션에 대한 블록체인 트랜잭션을 필터링합니다. 이것은 다음과 같이 수행됩니다:

1. `receiverId`가 `SOCIAL_DB` 데이터베이스인 트랜잭션에 대한 블록체인 트랜잭션 필터링
2. 필터링된 트랜잭션의 작업을 `FunctionCall` 작업에 맵핑
3. `FunctionCall` 작업을 `method_name`이 `set`인 작업에 대해 필터링
4. 필터링된 `FunctionCall` 작업을 `FunctionCall` 작업, `FunctionCall` 작업의 디코딩된 `args`, 트랜잭션의 `receiptId`를 포함하는 객체와 맵핑
5. 맵핑된 객체를 `args`가 `post` 또는 `index` 키를 포함하는 객체에 대해 필터링

이 함수는 `FunctionCall` 작업, `FunctionCall` 작업의 디코딩된 `args`, 트랜잭션의 `receiptId`를 포함하는 객체를 반환합니다. 이 배열은 `nearSocialPosts`라고 불립니다.

### 데이터베이스에 데이터 저장

로직의 두 번째 부분은 필터링된 트랜잭션의 데이터를 데이터베이스에 저장하는 것입니다. This is done by using the [`context.db.Posts.insert()`](../../queryapi/context.md#insert) function. The `context.db.Posts.insert()` function will be called for every filtered transaction as defined by the `.map()` function called on the array of `nearSocialPosts`.

The function for this indexer looks like this:

```js
  ... // Logic for filtering blockchain transactions, defining nearSocialPosts

  if (nearSocialPosts.length > 0) {
    const blockHeight = block.blockHeight;
    const blockTimestamp = Number(block.header().timestampNanosec);
    await Promise.all(
      nearSocialPosts.map(async (postAction) => {
        const accountId = Object.keys(postAction.args.data)[0];
        console.log(`ACCOUNT_ID: ${accountId}`);

        // create a post if indeed a post
        if (
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("main")
        ) {
          try {
            console.log("Creating a post...");
            const postData = {
                account_id: accountId,
                block_height: blockHeight,
                block_timestamp: blockTimestamp,
                receipt_id: postAction.receiptId,
                content: postAction.args.data[accountId].post.main,
            };
            await context.db.Posts.insert(postData);
            console.log(`Post by ${accountId} has been added to the database`);
          } catch (e) {
            console.error(`Error creating a post by ${accountId}: ${e}`);
          }
        }
      })
    );
  }
```

## Querying data from the indexer

The final step is querying the indexer using the public GraphQL API. This can be done by writing a GraphQL query using the GraphiQL tab in the code editor.

For example, here's a query that fetches `posts` from the _Posts Indexer_, ordered by `block_height`:

```graphql
query MyQuery {
  <user-name>_near_posts_indexer_posts(order_by: {block_height: desc}) {
    content
    block_height
    account_id
  }
}
```

Once you have defined your query, you can use the GraphiQL Code Exporter to auto-generate a JavaScript or NEAR Widget code snippet. The exporter will create a helper method `fetchGraphQL` which will allow you to fetch data from the indexer's GraphQL API. It takes three parameters:

- `operationsDoc`: A string containing the queries you would like to execute.
- `operationName`: The specific query you want to run.
- `variables`: Any variables to pass in that your query supports, such as `offset` and `limit` for pagination.

Next, you can call the `fetchGraphQL` function with the appropriate parameters and process the results.

Here's the complete code snippet for a NEAR component using the _Posts Indexer_:

```js
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

State.init({
data: []
});

const query = `query MyPostsQuery {
    <user-name>_near_posts_indexer_posts(order_by: {block_height: desc}) {
      content
      block_height
      account_id
    }
  }`

function fetchGraphQL(operationsDoc, operationName, variables) {
      return asyncFetch(
        QUERYAPI_ENDPOINT,
        {
          method: "POST",
          headers: { "x-hasura-role": `<user-name>_near` },
          body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
          }),
        }
      );
    }

fetchGraphQL(query, "MyPostsQuery", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data = result.body.data.<user-name>_near_posts_indexer_posts;
      State.update({ data })
      console.log(data);
    }
  }
});

const renderData = (a) => {
  return (
    <div key={JSON.stringify(a)}>
        {JSON.stringify(a)}
    </div>
  );
};

const renderedData = state.data.map(renderData);
return (
  {renderedData}
);
```


:::tip

To view a more complex example, see this widget which fetches posts with proper pagination: [Posts Widget powered By QueryAPI](https://near.org/edit/roshaan.near/widget/query-api-feed-infinite).

:::
