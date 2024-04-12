---
id: feed-indexer
title: Social Feed Indexer
sidebar_label: Social Feed Indexer
---

:::info

NEAR QueryAPI is currently under development. Users who want to test-drive this solution need to be added to the allowlist before creating or forking QueryAPI indexers.

You can request access through [this link](http://bit.ly/near-queryapi-beta).

:::

## `feed-indexer` 실행

`indexingLogic.js` 인덱서는 데이터를 처리, 변환 및 기록하는 데 도움이 되는 함수들로 구성되어 있습니다. 블록체인에서 발생하는 트랜잭션 데이터를 처리하는 주요 로직은 다음과 같이 표시된 주석 아래에 있습니다:

```js
// Add your code here
```

스키마는 관련 트랜잭션의 데이터를 유지할 테이블에 대해서도 지정되며, 이는 `schema.sql` 탭에서 확인할 수 있습니다.

:::tip

This indexer can be found by [following this link](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=dataplatform.near/social_feed).

:::

## 스키마 정의

:::note

데이터베이스 테이블의 이름은 `roshaan_near_feed_messages`로 지정되며, 이는 `<account_name>_near_<indexer_name>_<table_name>` 형식을 따릅니다.

:::

### 스키마가 정의된 테이블 이름

```sql
CREATE TABLE
  "posts" (
    "id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    "content" TEXT NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    "accounts_liked" JSONB NOT NULL DEFAULT '[]',
    "last_comment_timestamp" DECIMAL(20, 0),
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE
  "comments" (
    "id" SERIAL NOT NULL,
    "post_id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0) NOT NULL,
    "content" TEXT NOT NULL,
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
  );

CREATE TABLE
  "post_likes" (
    "post_id" SERIAL NOT NULL,
    "account_id" VARCHAR NOT NULL,
    "block_height" DECIMAL(58, 0),
    "block_timestamp" DECIMAL(20, 0) NOT NULL,
    "receipt_id" VARCHAR NOT NULL,
    CONSTRAINT "post_likes_pkey" PRIMARY KEY ("post_id", "account_id")
  );

CREATE UNIQUE INDEX "posts_account_id_block_height_key" ON "posts" ("account_id" ASC, "block_height" ASC);

CREATE UNIQUE INDEX "comments_post_id_account_id_block_height_key" ON "comments" (
  "post_id" ASC,
  "account_id" ASC,
  "block_height" ASC
);

CREATE INDEX
  "posts_last_comment_timestamp_idx" ON "posts" ("last_comment_timestamp" DESC);

ALTER TABLE
  "comments"
ADD
  CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
  "post_likes"
ADD
  CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
```

스키마 정의에 선언된 테이블은 인덱서가 배포될 때 만들어집니다. 이 스키마 정의에서는 `posts`, `comments` 및 `post_like`의 세 개의 테이블이 생성됩니다. 그런 다음 각 키 종속성 및 외부 키 종속성에 대해 인덱스를 정의합니다.

## 주요 함수

주요 함수는 두 부분으로 설명할 수 있습니다. 첫 번째 부분은 파일 범위의 앞부분에 정의된 헬퍼 함수가 처리하는 관련 트랜잭션 데이터를 필터링하고, 두 번째 부분은 궁극적으로 애플리케이션에서 쿼리하기 위한 관련 데이터를 저장하기 위해 헬퍼 함수를 사용합니다.

### 관련 데이터 필터링

```js
const SOCIAL_DB = "social.near";

  const nearSocialPosts = block
    .actions()
    .filter((action) => action.receiverId === SOCIAL_DB)
    .flatMap((action) =>
      action.operations
        .map((operation) => operation["FunctionCall"])
        .filter((operation) => operation?.methodName === "set")
        .map((functionCallOperation) => {
          try {
            const decodedArgs = base64decode(functionCallOperation.args);
            return {
              ...functionCallOperation,
              args: decodedArgs,
              receiptId: action.receiptId,
            };
          } catch (error) {
            console.log(
              "Failed to decode function call args",
              functionCallOperation,
              error
            );
          }
        })
        .filter((functionCall) => {
          try {
            const accountId = Object.keys(functionCall.args.data)[0];
            return (
              Object.keys(functionCall.args.data[accountId]).includes("post") ||
              Object.keys(functionCall.args.data[accountId]).includes("index")
            );
          } catch (error) {
            console.log(
              "Failed to parse decoded function call",
              functionCall,
              error
            );
          }
        })
    );
```

먼저 인덱서가 수집한 트랜잭션의 수신 측에 있는 near 계정 ID를 `SOCIAL_DB = "social.near"`로 지정하고 나중에 이 검사에 대한 동일 연산자를 사용합니다. This way we only filter for transactions that are relevant to the `social.near` account ID for saving data on-chain.

그런 다음 필터링 로직은 `block.actions()`를 호출하여 시작합니다. 이 필터링의 출력은 나중에 헬퍼 함수에서 사용할 수 있도록 `nearSocialPosts` 변수에 저장됩니다. The `.filter()` line helps specify for transactions exclusively that have interacted with the SocialDB. `.flatMap()`은 트랜잭션 유형을 지정하고 트랜잭션 데이터에서 필터의 기준이 될 속성을 찾습니다.

Specifically, `.flatMap()` filters for `FunctionCall` call types, calling the `set` method of the SocialDB contract. 또한 함수 호출 인자 데이터에 `receptId`를 포함하고 `post` 또는 `index`를 포함하는 트랜잭션을 찾습니다.

### 필터링된 데이터 처리

```js
if (nearSocialPosts.length > 0) {
    console.log("Found Near Social Posts in Block...");
    const blockHeight = block.blockHeight;
    const blockTimestamp = block.header().timestampNanosec;
    await Promise.all(
      nearSocialPosts.map(async (postAction) => {
        const accountId = Object.keys(postAction.args.data)[0];
        console.log(`ACCOUNT_ID: ${accountId}`);

        // if creates a post
        if (
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("main")
        ) {
          console.log("Creating a post...");
          await handlePostCreation(
            ... // arguments required for handlePostCreation
          );
        } else if (
          postAction.args.data[accountId].post &&
          Object.keys(postAction.args.data[accountId].post).includes("comment")
        ) {
          // if creates a comment
          await handleCommentCreation(
            ... // arguments required for handleCommentCreation
          );
        } else if (
          Object.keys(postAction.args.data[accountId]).includes("index")
        ) {
          // Probably like or unlike action is happening
          if (
            Object.keys(postAction.args.data[accountId].index).includes("like")
          ) {
            console.log("handling like");
            await handleLike(
              ... // arguments required for handleLike
            );
          }
        }
      })
    );
  }
```

이 로직은 `nearSocialPosts`가 있을 경우에만 실행되며, 이 경우 먼저 데이터를 다루는(변환 및 유지) 것과 관련 있는 `blockHeight` 및`blockTimestamp` 변수부터 선언합니다. 그런 다음 모든 트랜잭션(또는 함수 호출)에 대한 처리가 비동기 실행에 대한 Promise로 연결됩니다.

모든 Promise 내에서 호출을 수행하는 `accountId`가 트랜잭션 데이터에서 먼저 추출됩니다. 그런 다음 트랜잭션 데이터의 속성에 따라 포스트 작성, 댓글 작성 등을 처리하는 로직이 있습니다.

## 헬퍼 함수

### `base64decode`

```js
function base64decode(encodedValue) {
    let buff = Buffer.from(encodedValue, "base64");
    return JSON.parse(buff.toString("utf-8"));
  }
```

이 함수는 Base64 형식으로 인코딩된 문자열을 디코딩합니다. 디코딩할 Base64 인코딩 문자열인 \*\*`encodedValue`\*\*이라는 단일 인자가 필요합니다. 이 함수는 디코딩된 문자열을 JavaScript 객체로 반환합니다. 특히:

1. **`Buffer.from()`** 메서드는 **`encodedValue`** 와 \*\*`"base64"`\*\*의 두 가지 인수를 사용하여 호출됩니다. 이렇게 하면 **`encodedValue`** 문자열에서 새 **`Buffer`** 객체가 생성되고 인코딩 형식이 Base64임을 지정합니다.
2. **`JSON.parse()`** 메서드는 **`Buffer`** 객체를 인자로 반환한 상태에서 호출됩니다. 이것은 **`Buffer`** 객체를 JSON 문자열로 파싱하고 JavaScript 객체를 반환합니다.
3. \*\* `toString()`\*\* 메서드는 **`Buffer`** 객체에서 \*\*`"utf-8"`\*\*을 인자로 하여 호출됩니다. 이는 **`Buffer`** 객체를 UTF-8 형식의 문자열로 변환합니다.
4. 결과 문자열은 JavaScript 객체로 반환됩니다.

### `handlePostCreation`

```js
async function handlePostCreation(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    content
  ) {
    try {
      const postData = {
        account_id: accountId,
        block_height: blockHeight,
        block_timestamp: blockTimestamp,
        content: content,
        receipt_id: receiptId,
      };

      // Call GraphQL mutation to insert a new post
      await context.db.Posts.insert(postData);

      console.log(`Post by ${accountId} has been added to the database`);
    } catch (e) {
      console.log(
        `Failed to store post by ${accountId} to the database (perhaps it is already stored)`
      );
    }
  }
```

스키마에 정의된 `posts` 테이블을 채우는 관련 데이터가 포함된 객체가 먼저 생성된 다음, graphQL `createPost()` 쿼리로 전달되어 테이블에 새 행을 만듭니다.

### `handleCommentCreation`

```js
async function handleCommentCreation(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    commentString
  ) {
    try {
      const comment = JSON.parse(commentString);
      const postAuthor = comment.item.path.split("/")[0];
      const postBlockHeight = comment.item.blockHeight;

      // find post to retrieve Id or print a warning that we don't have it
      try {
        // Call GraphQL query to fetch posts that match specified criteria
        const posts = await context.db.Posts.select(
          { account_id: postAuthor, block_height: postBlockHeight },
          1
        );
        console.log(`posts: ${JSON.stringify(posts)}`);
        if (posts.length === 0) {
          return;
        }

        const post = posts[0];

        try {
          delete comment["item"];
          const commentData = {
            account_id: accountId,
            receipt_id: receiptId,
            block_height: blockHeight,
            block_timestamp: blockTimestamp,
            content: JSON.stringify(comment),
            post_id: post.id,
          };
          // Call GraphQL mutation to insert a new comment
          await context.db.Comments.insert(commentData);

          // Update last comment timestamp in Post table
          const currentTimestamp = Date.now();
          await context.db.Posts.update(
            { id: post.id },
            { last_comment_timestamp: currentTimestamp }
          );
          console.log(`Comment by ${accountId} has been added to the database`);
        } catch (e) {
          console.log(
            `Failed to store comment to the post ${postAuthor}/${postBlockHeight} by ${accountId} perhaps it has already been stored. Error ${e}`
          );
        }
      } catch (e) {
        console.log(
          `Failed to store comment to the post ${postAuthor}/${postBlockHeight} as we don't have the post stored.`
        );
      }
    } catch (error) {
      console.log("Failed to parse comment content. Skipping...", error);
    }
  }
```

댓글을 저장하거나 작성하려면 먼저 관련 게시물을 가져옵니다. 게시물을 찾을 수 없으면 댓글이 생성되지 않습니다. graphQL DB에 생성된 게시물이 있는 경우, `mutationData` 객체는 `comments` 테이블에 행을 추가하는 `createComment()` graphQL 쿼리에 대해 생성됩니다. 이 행이 추가되면 `posts` 테이블의 관련 행이 이 댓글의 타임스탬프로 업데이트됩니다.

### `handleLike`

```js
async function handleLike(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    likeContent
  ) {
    try {
      const like = JSON.parse(likeContent);
      const likeAction = like.value.type; // like or unlike
      const [itemAuthor, _, itemType] = like.key.path.split("/", 3);
      const itemBlockHeight = like.key.blockHeight;
      console.log("handling like", receiptId, accountId);
      switch (itemType) {
        case "main":
          try {
            const posts = await context.db.Posts.select(
              { account_id: itemAuthor, block_height: itemBlockHeight },
              1
            );
            if (posts.length == 0) {
              return;
            }

            const post = posts[0];
            switch (likeAction) {
              case "like":
                await _handlePostLike(
                  post.id,
                  accountId,
                  blockHeight,
                  blockTimestamp,
                  receiptId
                );
                break;
              case "unlike":
                await _handlePostUnlike(post.id, accountId);
                break;
            }
          } catch (e) {
            console.log(
              `Failed to store like to post ${itemAuthor}/${itemBlockHeight} as we don't have it stored in the first place.`
            );
          }
          break;
        case "comment":
          // Comment
          console.log(`Likes to comments are not supported yet. Skipping`);
          break;
        default:
          // something else
          console.log(`Got unsupported like type "${itemType}". Skipping...`);
          break;
      }
    } catch (error) {
      console.log("Failed to parse like content. Skipping...", error);
    }
  }
```

`handleCommentCreation`와 마찬가지로 먼저 DB 저장소에서 관련 게시물을 찾습니다. 만약 관련 게시물을 찾으면, 로직은 이에 대해 좋아요 혹은 싫어요를 누를지에 대한 부분으로 넘어갑니다.

### `_handlePostLike`

```js
async function _handlePostLike(
    postId,
    likeAuthorAccountId,
    likeBlockHeight,
    blockTimestamp,
    receiptId
  ) {
    try {
      const posts = await context.db.Posts.select({ id: postId });
      if (posts.length == 0) {
        return;
      }
      const post = posts[0];
      let accountsLiked =
        post.accounts_liked.length === 0
          ? post.accounts_liked
          : JSON.parse(post.accounts_liked);

      if (accountsLiked.indexOf(likeAuthorAccountId) === -1) {
        accountsLiked.push(likeAuthorAccountId);
      }

      // Call GraphQL mutation to update a post's liked accounts list
      await context.db.Posts.update(
        { id: postId },
        { accounts_liked: JSON.stringify(accountsLiked) }
      );

      const postLikeData = {
        post_id: postId,
        account_id: likeAuthorAccountId,
        block_height: likeBlockHeight,
        block_timestamp: blockTimestamp,
        receipt_id: receiptId,
      };
      // Call GraphQL mutation to insert a new like for a post
      await context.db.PostLikes.insert(postLikeData);
    } catch (e) {
      console.log(`Failed to store like to in the database: ${e}`);
    }
  }
```

`handleLike`와 마찬가지로 관련 `post`는 `schema.sql`에 정의된 graphQL DB 테이블에서 먼저 검색됩니다. 게시물이 발견되면 `accountsLiked` 배열은 게시물의 이전 배열과 `accountsLiked.push(likeAuthorAccountId)` 내 좋아요 계정을 실행한 추가 계정에서 정의됩니다. 그런 다음 graphQL 쿼리는 이 정보를 포함하도록 `posts` 테이블을 업데이트합니다. 마지막으로, `postLikeMutation` 객체는 `post_like_like` 테이블에 새 행을 추가하는 데 필요한 데이터로 생성됩니다.

### `_handlePostUnlike`

```js
async function _handlePostUnlike(postId, likeAuthorAccountId) {
    try {
      const posts = await context.db.Posts.select({ id: postId });
      if (posts.length == 0) {
        return;
      }
      const post = posts[0];
      let accountsLiked =
        post.accounts_liked.length === 0
          ? post.accounts_liked
          : JSON.parse(post.accounts_liked);

      console.log(accountsLiked);

      let indexOfLikeAuthorAccountIdInPost =
        accountsLiked.indexOf(likeAuthorAccountId);
      if (indexOfLikeAuthorAccountIdInPost > -1) {
        accountsLiked.splice(indexOfLikeAuthorAccountIdInPost, 1);
        // Call GraphQL mutation to update a post's liked accounts list
        await context.db.Posts.update(
          { id: postId },
          { accounts_liked: JSON.stringify(accountsLiked) }
        );
      }
      // Call GraphQL mutation to delete a like for a post
      await context.db.PostLikes.delete({
        account_id: likeAuthorAccountId,
        post_id: postId,
      });
    } catch (e) {
      console.log(`Failed to delete like from the database: ${e}`);
    }
  }
```

여기서는 또한 `posts`테이블에서 기존 관련 게시물을 검색하고, 해당 게시물이 발견되면 `accountsLiked`는 동일한 작업을 수행한 계정의 계정 ID를 제거하여 업데이트하는 것으로 정의됩니다. 그런 다음 graphQL `delete` 쿼리를 호출하여 `post_likes` 테이블에서 like를 제거합니다.

## Querying data from the indexer

The final step is querying the indexer using the public GraphQL API. This can be done by writing a GraphQL query using the GraphiQL tab in the code editor.

For example, here's a query that fetches `likes` from the _Feed Indexer_, ordered by `block_height`:

```graphql
query MyQuery {
  <user-name>_near_feed_indexer_post_likes(order_by: {block_height: desc}) {
    account_id
    block_height
    post_id
  }
}
```

Once you have defined your query, you can use the GraphiQL Code Exporter to auto-generate a JavaScript or NEAR Widget code snippet. The exporter will create a helper method `fetchGraphQL` which will allow you to fetch data from the indexer's GraphQL API. It takes three parameters:

- `operationsDoc`: A string containing the queries you would like to execute.
- `operationName`: The specific query you want to run.
- `variables`: Any variables to pass in that your query supports, such as `offset` and `limit` for pagination.

Next, you can call the `fetchGraphQL` function with the appropriate parameters and process the results.

Here's the complete code snippet for a NEAR component using the _Feed Indexer_:

```js
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql/`;

State.init({
data: []
});

const query = `query MyFeedQuery {
    <user-name>_near_feed_indexer_post_likes(order_by: {block_height: desc}) {
      account_id
      block_height
      post_id
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

fetchGraphQL(query, "MyFeedQuery", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data = result.body.data.<user-name>_near_feed_indexer_post_likes;
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
