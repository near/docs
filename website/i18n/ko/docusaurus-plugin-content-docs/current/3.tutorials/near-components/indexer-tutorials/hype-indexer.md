---
id: hype-indexer
title: Hype 인덱서
sidebar_label: Hype 인덱서
---

:::info

NEAR QueryAPI is currently under development. Users who want to test-drive this solution need to be added to the allowlist before creating or forking QueryAPI indexers.

You can request access through [this link](http://bit.ly/near-queryapi-beta).

:::

## 개요

이 인덱서는 컨텐츠에 "PEPE" 또는 "DOGE"가 포함된 블록체인에서 발견되는 모든 새 게시물 또는 댓글에 대해 GraphQL 데이터베이스에서 사용자가 생성한 사전 정의된 `posts` 또는 `comments` 테이블에 새 행을 만듭니다. 이것은 두 개의 테이블을 지정하고, 특정 트랜잭션 유형과 해당 내용에 대한 블록체인 트랜잭션 데이터를 필터링하고, 데이터를 데이터베이스에 저장하는 방법을 보여주는 간단한 예입니다.

:::tip

This indexer can be found by [following this link](https://near.org/#/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=bucanero.near/hype-indexer).

:::

## 데이터베이스 스키마 정의

인덱서를 만드는 첫 번째 단계는 데이터베이스 스키마를 정의하는 것입니다. 이 작업은 코드 에디터에서 `schema.sql` 파일을 편집하여 수행합니다. 이 인덱서의 스키마는 다음과 같습니다:

```sql
CREATE TABLE
  "posts" (
    "id" TEXT NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE
  "comments" (
    "id" SERIAL NOT NULL,
    "post_id" TEXT NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
  );
```

이 스키마는 `posts`와 `comments`의 두 테이블을 정의합니다. `posts` 테이블에는 다음과 같은 열이 있습니다:

- `id`: a unique identifier for each row in the table
- `account_id `: 게시물을 만든 사용자의 계정 ID
- `block_height`: 게시물이 생성된 블록의 높이
- `block_message`: 게시물이 생성된 블록의 타임스탬프
- `recept_id `: 게시물을 생성한 트랜잭션의 receipt ID
- `content`: 게시물의 내용

`comments` 테이블에는 다음과 같은 열이 있습니다:

- `id`: a unique identifier for each row in the table
- `post_id`: 댓글이 달린 게시물의 아이디
- `account_id `: 댓글을 작성한 사용자의 계정 ID
- `block_height`: 댓글이 생성된 블록의 높이
- `block_message`: 댓글이 생성된 블록의 타임스탬프
- `recept_id `: 댓글을 생성한 트랜잭션의 receipt ID
- `content`: 댓글의 내용

## Defining the indexing logic

다음은 인덱싱 로직을 정의할 차례입니다. 이 작업은 코드 에디터에서 `indexingLogic.js` 파일을 편집하여 수행합니다. 이 인덱서의 로직은 두 부분으로 나눌 수 있습니다:

1. 특정 트랜잭션 유형에 대한 블록체인 트랜잭션 필터링
2. 필터링된 트랜잭션의 데이터를 데이터베이스에 저장

### Filtering Blockchain transactions

로직의 첫 번째 부분은 특정 유형의 트랜잭션에 대한 블록체인 트랜잭션을 필터링하는 것입니다. 이 작업은 `getBlock` 함수를 사용하여 수행됩니다. 이 함수는 블록과 컨텍스트를 사용하여 Promise를 반환합니다. 블록은 Near 프로토콜 블록이고, 컨텍스트는 상태를 검색하고 커밋하는 헬퍼 메서드 집합입니다. `getBlock` 함수는 블록체인의 모든 블록에 대해 호출됩니다.

이 인덱서의 `getBlock` 함수는 다음과 같습니다:

```js
import { Block } from "@near-lake/primitives";

async function getBlock(block: Block, context) {
  const SOCIAL_DB = "social.near";

  function base64decode(encodedValue) {
    let buff = Buffer.from(encodedValue, "base64");
    return JSON.parse(buff.toString("utf-8"));
  }

  function get_near_social_posts_comments(
    block_type = block,
    DB = SOCIAL_DB,
    decodeFunction = base64decode
  ) {
    const nearSocialPostsComments = block_type
      .actions()
      .filter((action) => action.receiverId === DB)
      .flatMap((action) =>
        action.operations
          .map((operation) => operation["FunctionCall"])
          .filter((operation) => operation?.methodName === "set")
          .map((functionCallOperation) => ({
            ...functionCallOperation,
            args: decodeFunction(functionCallOperation.args),
            receiptId: action.receiptId, // providing receiptId as we need it
          }))
          .filter((functionCall) => {
            const accountId = Object.keys(functionCall.args.data)[0];
            return (
              Object.keys(functionCall.args.data[accountId]).includes("post") ||
              Object.keys(functionCall.args.data[accountId]).includes("index")
            );
          })
      );
    return nearSocialPostsComments;
  }

  const nearSocialPostsComments = get_near_social_posts_comments();

  ... // Further filtering for posts/comments that contain "PEPE" or "DOGE" in the contents and saving the data to the database is done in the next section
}
```

다시, [`posts-indexer`](./posts-indexer.md) 또는 [`feed-indexer`](./feed-indexer.md)와 같이, 이 필터는 `FunctionCall` 유형의 트랜잭션을 네트워크 내 `social.near` 컨트랙트에 있는 `set` 메서드로 선택합니다. 또한 호출에 대한 데이터에서 `post` 또는 `index` 문자열을 검색합니다.

### Saving the data to the Database

로직의 두 번째 부분은 필터링된 트랜잭션의 데이터를 데이터베이스에 저장하는 것입니다. 또한 내용에 "PEPE" 또는 "DOGE"가 포함된 게시물 및 댓글에 대한 트랜잭션 필터링을 수행합니다.

이에 대한 로직은 다음과 같습니다:

```js
  ... // Logic for filtering blockchain transactions is above

  if (nearSocialPostsComments.length > 0) {
    const blockHeight = block.blockHeight;
    const blockTimestamp = Number(block.header().timestampNanosec);
    await Promise.all(
      nearSocialPostsComments.map(async (postAction) => {
        const accountId = Object.keys(postAction.args.data)[0];
        console.log(`ACCOUNT_ID: ${accountId}`);

        const isPost =
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("main");
        const isComment =
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("comment");

        if (isPost) {
          const isHypePost =
            postAction.args.data[accountId].post.main.includes("PEPE") ||
            postAction.args.data[accountId].post.main.includes("DOGE");
          if (!isHypePost) {
            return;
          }
          console.log("Creating a post...");
          const postId = `${accountId}:${blockHeight}`;
          await createPost(
            postId,
            accountId,
            blockHeight,
            blockTimestamp,
            postAction.receiptId,
            postAction.args.data[accountId].post.main
          );
        }
        if (isComment) {
          const commentString = JSON.parse(
            postAction.args.data[accountId].post.comment
          );
          const isHypeComment =
            commentString.includes("PEPE") || commentString.includes("DOGE");
          if (!isHypeComment) {
            return;
          }
          console.log("Creating a comment...");
          const postBlockHeight =
            postAction.args.data[accountId].post.blockHeight;
          const postId = `${accountId}:${postBlockHeight}`;
          await createComment(
            accountId,
            postId,
            blockHeight,
            blockTimestamp,
            postAction.receiptId,
            commentString
          );
        }
      })
    );
  }

  ... // Definitions for createPost and createComment are below
```

#### `createPost`

Creating a post is done by using the [`context.db.Posts.insert()`](../../../2.build/6.data-infrastructure/query-api/context.md) function:

```js
  async function createPost(
    postId,
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    postContent
  ) {
    try {
      const postObject = {
          id: postId,
          account_id: accountId,
          block_height: blockHeight,
          block_timestamp: blockTimestamp,
          receipt_id: receiptId,
          content: postContent,
      };
      await context.db.Posts.insert(postObject);
      console.log("Post created!");
    } catch (error) {
      console.error(error);
    }
  }
```

#### `createComment`

Creating a comment is done by using the [`context.db.Comments.insert()`](../../queryapi/context.md#insert) function:

```js
  async function createComment(
    accountId,
    postId,
    blockHeight,
    blockTimestamp,
    receiptId,
    commentContent
  ) {
    try {
      const commentObject = {
          account_id: accountId,
          post_id: postId,
          block_height: blockHeight,
          block_timestamp: blockTimestamp,
          receipt_id: receiptId,
          content: commentContent,
      };
      await context.db.Comments.insert(commentObject);
      console.log("Comment created!");
    } catch (error) {
      console.error(error);
    }
  }
```

## Querying data from the indexer

The final step is querying the indexer using the public GraphQL API. This can be done by writing a GraphQL query using the GraphiQL tab in the code editor.

For example, here's a query that fetches `posts` and `comments` from the _Hype Indexer_, ordered by `block_height`:

```graphql
query MyQuery {
  <user-name>_near_hype_indexer_posts(order_by: {block_height: desc}) {
    account_id
    block_height
    content
  }
  <user-name>_near_hype_indexer_comments(order_by: {block_height: desc}) {
    account_id
    block_height
    content
  }
}
```

Once you have defined your query, you can use the GraphiQL Code Exporter to auto-generate a JavaScript or NEAR Widget code snippet. The exporter will create a helper method `fetchGraphQL` which will allow you to fetch data from the indexer's GraphQL API. It takes three parameters:

- `operationsDoc`: A string containing the queries you would like to execute.
- `operationName`: The specific query you want to run.
- `variables`: Any variables to pass in that your query supports, such as `offset` and `limit` for pagination.

Next, you can call the `fetchGraphQL` function with the appropriate parameters and process the results.

Here's the complete code snippet for a NEAR component using the _Hype Indexer_:

```js
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

State.init({
data: []
});

const query = `query MyHypeQuery {
    <user-name>_near_hype_indexer_posts(order_by: {block_height: desc}) {
      account_id
      block_height
      content
    }
    <user-name>_near_hype_indexer_comments(order_by: {block_height: desc}) {
      account_id
      block_height
      content
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

fetchGraphQL(query, "MyHypeQuery", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data = result.body.data.<user-name>_near_hype_indexer_posts;
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
