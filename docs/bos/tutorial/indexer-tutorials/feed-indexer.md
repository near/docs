---
id: feed-indexer
title: BOS Feed Indexer
sidebar_label: BOS Feed Indexer
---

This indexer can be found by [following this link](https://near.org/#/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=roshaan.near/feed-indexer&view=editor-window).

## Running `feed-indexer`

The indexer `indexingLogic.js` is comprised of functions that help handle, transform and record data. The main logic for handling transaction data as it occurs from the blockchain can be found underneath the comment marked:

```jsx
// Add your code here
```

A schema is also specified for the tables in which data from relevant transactions is to be persisted, this can be found in the `schema.sql` tab.

## Schema Definition

:::note

Note that database tables are named as `roshaan_near_feed_indexer_posts` which follows the format `<account_name>_near_<indexer_name>_<table_name>`.

:::

### Schema-Defined Table Names


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

The tables declared in the schema definition are created when the indexer is deployed. In this schema definition, three tables are created: `posts`, `comments` and `post_likes`. Indexes are then defined for each and then foreign key dependencies.

## Main Function

The main function can be explained in two parts. The first filters relevant transactional data for processing by the helper functions defined earlier in the file scope, the second part uses the helper functions to ultimately save the relevant data to for querying by applications.

### Filtering for Relevant Data

```jsx
const SOCIAL_DB = "social.near";

  const nearSocialPosts = block
    .actions()
    .filter((action) => action.receiverId === SOCIAL_DB)
    .flatMap((action) =>
      action.operations
        .map((operation) => operation["FunctionCall"])
        .filter((operation) => operation?.methodName === "set")
        .map((functionCallOperation) => ({
          ...functionCallOperation,
          args: base64decode(functionCallOperation.args),
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
```

We first designate the near account ID that is on the receiving end of the transactions picked up by the indexer, as `SOCIAL_DB = "social.near"` and later with the equality operator for this check. This way we only filter for transactions that are relevant to the NEAR BOS that uses the `social.near` account ID for saving data on-chain.

The filtering logic then begins by calling `block.actions()` where `block` is defined within the `@near-lake/primtives` package. The output from this filtering is saved in a `nearSocialPosts` variable for later use by the helper functions. The `.filter()` line helps specify for transactions exclusively that have interacted with the BOS data storage. `.flatMap()` specifies the types of transaction and looks for attributes in the transaction data on which to base the filter.

Specifically, `.flatMap()` filters for `FunctionCall` call types, calling the `set` method of the BOS contract. In addition, we look for transactions that include a `receiptId` and include either `post` or `index` in the function call argument data.

### Processing Filtered Data

```jsx
if (nearSocialPosts.length > 0) {
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
            await handleLike(
              ... // arguments required for handleLike
            );
          }
        }
      })
    );
```

This logic is only entered if there are any `nearSocialPosts`, in which case it first declares the `blockHeight` and `blockTimestamp` variables that will be relevant when handling (transforming and persisting) the data. Then the processing for every transaction (or function call) is chained as a promise for asynchronous execution.

Within every promise, the `accountId` performing the call is extracted from the transaction data first. Then, depending on the attributes in the transaction data, there is logic for handling post creation, comment creation, or a like/unlike.

## Helper Functions

### `base64decode`

```jsx
function base64decode(encodedValue) {
    let buff = Buffer.from(encodedValue, "base64");
    return JSON.parse(buff.toString("utf-8"));
  }
```

This function decodes a string that has been encoded in Base64 format. It takes a single argument, **`encodedValue`**, which is the Base64-encoded string to be decoded. The function returns the decoded string as a JavaScript object. Specifically:

1. The **`Buffer.from()`** method is called with two arguments: **`encodedValue`** and **`"base64"`**. This creates a new **`Buffer`** object from the **`encodedValue`** string and specifies that the encoding format is Base64.
2. The **`JSON.parse()`** method is called with the **`Buffer`** object returned by the **`Buffer.from()`** method as its argument. This parses the **`Buffer`** object as a JSON string and returns a JavaScript object.
3. The **`toString()`** method is called on the **`Buffer`** object with **`"utf-8"`** as its argument. This converts the **`Buffer`** object to a string in UTF-8 format.
4. The resulting string is returned as a JavaScript object.

### `handlePostCreation`

```jsx
async function handlePostCreation(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    content
  ) {
    try {
      // Define mutationData object with post data
      const mutationData = {
        post: {
          account_id: accountId,
          block_height: blockHeight,
          block_timestamp: blockTimestamp,
          content: content,
          receipt_id: receiptId,
        },
      };

      // Call GraphQL mutation to insert a new post
      await context.graphql(
        `mutation createPost($post: roshaan_near_feed_indexer_posts_insert_input!){
          insert_roshaan_near_feed_indexer_posts_one(
            object: $post
          ) {
            account_id
            block_height
          }
        }`,
        mutationData
      );

      console.log(`Post by ${accountId} has been added to the database`);
    } catch (e) {
      console.log(
        `Failed to store post by ${accountId} to the database (perhaps it already stored)`
      );
    }
  }
```

An object containing the relevant data to populate the `posts` table defined in the schema is created first to then be passed into the graphQL `createPost()` query that creates a new row in the table.

### `handleCommentCreation`

```jsx
async function handleCommentCreation(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    commentString
  ) {
    const comment = JSON.parse(commentString);
    const postAuthor = comment.item.path.split("/")[0];
    const postBlockHeight = comment.item.blockHeight;

    // find post to retrieve Id or print a warning that we don't have it
    try {
      // Call GraphQL query to fetch posts that match specified criteria
      const posts = await context.graphql(
        `query getPosts($accountId: String = "$accountId", $blockHeight: numeric = "$blockHeight"){
          roshaan_near_feed_indexer_posts(
            where: {
              account_id: {_eq: $accountId},
              block_height: {_eq: $blockHeight}
            },
            limit: 1
          ) {
            account_id
            accounts_liked
            block_height
            block_timestamp
            content
            id
          }
        }`,
        {
          accountId: postAuthor,
          blockHeight: postBlockHeight,
        }
      );
      console.log(`posts: ${JSON.stringify(posts)}`);
      if (posts.roshaan_near_feed_indexer_posts.length === 0) {
        return;
      }

      const post = posts.roshaan_near_feed_indexer_posts[0];

      try {
        delete comment["item"];
        const mutationData = {
          comment: {
            account_id: accountId,
            receipt_id: receiptId,
            block_height: blockHeight,
            block_timestamp: blockTimestamp,
            content: JSON.stringify(comment),
            post_id: post.id,
          },
        };
        // Call GraphQL mutation to insert a new comment
        await context.graphql(
          `mutation createComment($comment: roshaan_near_feed_indexer_comments_insert_input!){
            insert_roshaan_near_feed_indexer_comments_one(
              object: $comment
            ) {
              account_id
              receipt_id
              block_height
              block_timestamp
              content
              post_id
            }
          }`,
          mutationData
        );

        // Update last comment timestamp in Post table
        const currentTimestamp = Date.now();
        await context.graphql(
          `mutation SetLastCommentUpdated {
          update_roshaan_near_feed_indexer_posts(
            where: {id: {_eq: ${post.id}}}
            _set: {last_comment_timestamp: ${currentTimestamp}}
          )
          {
            returning {
              id
            }
          }
        }`,
          {}
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
  }
```

To save or create a comment the relevant post is fetched first. If no posts are found the comment will not be created. If there is a post created in the graphQL DB, the `mutationData` object is constructed for the `createComment()` graphQL query that adds a row to the `comments` table. Once this row has been added, the relevant row in the `posts` table is updated to this comment’s timestamp.

### `handleLike`

```jsx
async function handleLike(
    accountId,
    blockHeight,
    blockTimestamp,
    receiptId,
    likeContent
  ) {
    const like = JSON.parse(likeContent);
    const likeAction = like.value.type; // like or unlike
    const [itemAuthor, _, itemType] = like.key.path.split("/", 3);
    const itemBlockHeight = like.key.blockHeight;
    switch (itemType) {
      case "main":
        try {
          const posts = await context.graphql(
            `query getPosts($accountId: String = "$accountId", $blockHeight: numeric = "$blockHeight"){
            roshaan_near_feed_indexer_posts(
              where: {
                account_id: {_eq: $accountId},
                block_height: {_eq: $blockHeight}
              },
              limit: 1
            ) {
              account_id
              accounts_liked
              block_height
              block_timestamp
              content
              id
            }
          }`,
            {
              accountId: itemAuthor,
              blockHeight: itemBlockHeight,
            }
          );
          if (posts.roshaan_near_feed_indexer_posts.length == 0) {
            return;
          }

          const post = posts.roshaan_near_feed_indexer_posts[0];
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
            default:
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
  }
```

As with `handleCommentCreation` , first the relevant post is sought from the DB store. If the relevant post is found, the logic proceeds to handling the like being either a like or a dislike.

### `_handlePostLike`

```jsx
async function _handlePostLike(
    postId,
    likeAuthorAccountId,
    likeBlockHeight,
    blockTimestamp,
    receiptId
  ) {
    try {
      const posts = await context.graphql(
        `query getPosts($postId: Int!) {
        roshaan_near_feed_indexer_posts(where: { id: { _eq: $postId } }) {
          id
          account_id
          block_height
          block_timestamp
          content
          accounts_liked
        }
      }`,
        { postId: postId }
      );
      if (posts.roshaan_near_feed_indexer_posts.length == 0) {
        return;
      }
      const post = posts.roshaan_near_feed_indexer_posts[0];
      let accountsLiked =
        post.accounts_liked.length === 0
          ? post.accounts_liked
          : JSON.parse(post.accounts_liked);

      if (accountsLiked.indexOf(likeAuthorAccountId) === -1) {
        accountsLiked.push(likeAuthorAccountId);
      }

      // Call GraphQL mutation to update a post's liked accounts list
      await context.graphql(
        `mutation updatePost($postId: Int!, $likedAccount: jsonb){
        update_roshaan_near_feed_indexer_posts(
          where: {id: {_eq: $postId}}
          _set: {accounts_liked: $likedAccount}
        ) {
          returning {
          id
        }
        }
      }`,
        {
          postId: postId,
          likedAccount: JSON.stringify(accountsLiked),
        }
      );

      const postLikeMutation = {
        postLike: {
          post_id: postId,
          account_id: likeAuthorAccountId,
          block_height: likeBlockHeight,
          block_timestamp: blockTimestamp,
          receipt_id: receiptId,
        },
      };
      // Call GraphQL mutation to insert a new like for a post
      await context.graphql(
        `mutation InsertLike($postLike: roshaan_near_feed_indexer_post_likes_insert_input!) {
        insert_roshaan_near_feed_indexer_post_likes_one(object: $postLike) {
          post_id
        }
      }`,
        postLikeMutation
      );
    } catch (e) {
      console.log(`Failed to store like to in the database: ${e}`);
    }
  }
```

As with `handleLike`, the relevant `post` is first sought from the graphQL DB table defined in `schema.sql`. If a post is found, the `accountsLiked` array is defined from the post’s previous array plus the additional account that has performed the like account in `accountsLiked.push(likeAuthorAccountId)`. The graphQL query then updates the `posts` table to include this information. Lastly, the `postLikeMutation` object is created with the required data for adding a new row to the `post_likes` table.

### `_handlePostUnlike`

```jsx
async function _handlePostUnlike(postId, likeAuthorAccountId) {
    try {
      const posts = await context.graphql(
        `query getPosts($postId: Int!) {
        roshaan_near_feed_indexer_posts(where: { id: { _eq: $postId } }) {
          id
          account_id
          block_height
          block_timestamp
          content
          accounts_liked
        }
      }`,
        { postId: postId }
      );
      if (posts.roshaan_near_feed_indexer_posts.length == 0) {
        return;
      }
      const post = posts.roshaan_near_feed_indexer_posts[0];
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
        await context.graphql(
          `mutation updatePost($postId: Int!, $likedAccount: jsonb){
          update_roshaan_near_feed_indexer_posts(
            where: {id: {_eq: $postId}}
            _set: {accounts_liked: $likedAccount}
          ) {
            returning {
            id
          }
          }
        }`,
          {
            postId: postId,
            likedAccount: JSON.stringify(accountsLiked),
          }
        );
      }
      // Call GraphQL mutation to delete a like for a post
      await context.graphql(
        `mutation deletePostLike($accountId: String!, $postId: Int!){
          delete_roshaan_near_feed_indexer_post_likes(
            where: {
              _and: [
                {account_id: {_eq: $accountId}},
                {post_id: {_eq: $postId}}
              ]
            }
          ) {
            returning {
              post_id
              account_id
            }
          }
        }`,
        {
          accountId: likeAuthorAccountId,
          postId: postId,
        }
      );
    } catch (e) {
      console.log(`Failed to delete like from the database: ${e}`);
    }
  }
```

Here we also search for an existing relevant post in the `posts` table and if one has been found, the `accountsLiked` is defined as to update it removing the account ID of the account that has performed the like action. Then a graphQL `delete` query is called to remove the like from the `post_likes` table.
