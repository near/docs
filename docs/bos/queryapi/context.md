---
id: context-object
title: QueryAPI Context object
sidebar_label: Context object
---

## General Purpose

The `context` object is a global object made available to developers. It provides helper methods aimed at allowing developers to interact with things outside their coding environment. Crucially, these involve the database and GraphQL endpoint spun up along with the indexer, as well as allowing API calls. Also, pretty much every method here is async, hence why all examples have the await keyword in front of the function call. 

Also, many of the formatting and changes in this document are coming from a PR, which is in progress. Once it is merged, these changes will be available in Dev. Specifically, autocomplete and the `context.db.TableName.methodName` format are the changes in question. 


## Main Methods


### GraphQL

When an indexer is published, the DDL supplied is used to spin up a Postgres database. This database is hooked up to Hasura, which is a data platform which supplies a GraphQL endpoint which can be used to interact with the postgres database that was spun up. 
Making calls to the Hasura GraphQL endpoint requires an API call, which is restricted in the environment. So, the GraphQL method allows calls to the endpoint related to the indexer. 

That said, the method was previously the only way to interact with the database. Now, the DB methods provide for simpler functionality. The graphQL method is better suited for more complex queries and mutations. Also, more information about graphQL calls can be [found here](https://graphql.org/learn/queries/).

#### Input

```js
await context.graphql(operation, variables) 
```

The operation is a string formatted to match a graphQL query. The variables are any data objects used in the query.
 
#### Example

```js
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
  `mutation createPost($post: dataplatform_near_social_feed_posts_insert_input!){
    insert_dataplatform_near_social_feed_posts_one(
    object: $post
    ) {
      account_id
      block_height
    }
  }`,
  mutationData
);
```

The above is a snippet from the social feed indexer. In this one, we have a mutation (which mutates or changes data in the database, as opposed to a query which merely reads) called createPost. The mutation name can be anything. We specify a variable post and execute a graphQL method which inserts the post object and returns account_id and block_height from the newly inserted object. Finally, we pass in mutationData as the variable, which is automatically linked to post since its the only field. There are other examples of context.graphql in the social_feed indexers. 

### Set

Each indexer by default has a table called indexer_storage. It has a field for key and value, functioning like a key value store. This table can, of course, be removed from the DDL before publishing. However, it kept, the set method is an easy way to set some value for a key in that table. This method is used in the default code to set the height on each invocation. 

#### Input

```js
await context.set(key, value)
```

#### Example

```js
const h = block.header().height;
await context.set("height", h);
```

### Log

Code written by developers is executed on our GCP compute instance. Therefore, things like `console.log` are surfaced to the machine itself. So, in order to surface console.log statements not only to the machine but also back to the user under Indexer Status, we need to write these logs to the logging table, which is separate from the developer’s schema. This actually happens in the runner. We map console.log statements in the developers code to instead call this function. So, for the developer, they can simply use `console.log`, and we take care of the rest. As far as I know, there is no reason the customer should need to use this. 
FetchFromSocialApi
Calls to APIs are restricted in QueryAPI because making calls requires establishing identity, usually. We don’t support secrets yet (e.g. identity tokens) as those would end up stored on the blockchain, which is not secure. So, until that is implemented we don’t provide a generic fetch method. However, social API doesn’t require a secret, and has some potential uses. So, we allow calls to it through this method. 

#### Input

```js
await context.fetchFromSocialApi(path, options)
```

The path is a resource from the social API that the developer is targeting. Options are where the rest of the call is placed (headers, method, body, and so on). 

#### Example

```js
const response = await context.fetchFromSocialApi("/index", {
  method: "POST",
  headers: {
    ["Content-Type"]: "application/json",
  },
  body: JSON.stringify({
    action: "post",
    key: "main",
    options: {
    limit: 1,
    order: "desc",
  },
  }),
});
```

This snippet is from the social_lag indexer. 

## DB

The DB object is a subobject under context. It is accessed through `context.db`. Previously, the graphql method was the only way to interact with the database. However, writing graphql queries and mutations is pretty complicated and overkill for simpler interactions. So, simpler interactions are instead made available through the db subobject. This object is built by reading the schema written by the developer, parsing its information, and generating methods for each table. See below for what methods are generated for each table. The format to access the below methods is as follows: `context.db.[tableName].[methodName]`. Concrete examples are also given below. 

One thing to note is that the process where the code is read is not fully featured. If `ALTER TABLE ALTER COLUMN` is used, for example, in the schema, it will fail to parse. Should this failure occur, the context object will still be generated but db methods will be unavailable. An error will appear on the developer’s page saying types were not generated. 
DB Methods
All of the below methods, except for upsert, are used in social_feed_test under darunrs.near. However, keep in mind the current code actually uses the outdated call structure. My active PR will switch to the new method of `context.db.TableName.methodName` instead of `context.db.methodName_tableName`. Also the PR implements autocomplete too. 

### Methods

### Insert

This method allows for inserting one or more objects into the table which preceded the method call. The inserted objects are then returned back with all of their information. Later on, we may implement returning specific fields but for now, we are returning them all. This goes for all methods. 

#### Input

```js
await context.db.TableName.insert(objects)
```

Objects can be a single object or an array of them. 

#### Example

```js
const insertPostData = {
  account_id: accountId,
  block_height: blockHeight,
  block_timestamp: blockTimestamp,
  content: content,
  receipt_id: receiptId
};
// Insert new post to Posts table
await context.db.Posts.insert(insertPostData);
```

In this example, we insert a single object. But, if you wanted multiple, then you just pass in an array with multiple objects. Such as [ insertPostDataA, insertPostDataB ]. 

### Select

This method returns rows which match the criteria included in the call. For now, we only support explicit match. For example, providing { colA: valueA, colB: valueB } means that rows where colA and colB match those values EXACTLY will be returned. We can implement more functionality into it in the future but for now, that is the limitation. There is also a limit parameter which specifies how many objects to get MAX. There are no guarantees on ordering. If there are 10 and the limit is 5, any of them might be returned. 

#### Input

```js
await context.db.TableName.select(fieldsToMatch, limit = null)
```

The fieldsToMatch is an object which contains column names: value, where the value will need to be an exact match for that column. The limit parameter defaults to null, which means no limit. If a value is provided, it overrides the null and is set to whatever was passed in. All matching rows up to the limit are returned. 

#### Example

```js
const posts = await context.db.Posts.select(
  {
    account_id: postAuthor,
    block_height: postBlockHeight
  },
  1
);
```

In this example, any rows in the posts table where the account_id column value matches postAuthor AND block_height matches postBlockheight will be returned. 

### Update

This method updates all rows that match the whereObj values by setting the updateObj values. It then returns all impacted rows. The whreObj is subject to the same restrictions as the select’s whereObj. 

#### Input

```js
await context.db.TableName.update(whereObj, updateObj)
```

#### Example

```js
await context.db.Posts.update(
  {id: post.id}, 
  {last_comment_timestamp: currentTimestamp});
```

In this example, any rows in the posts table where the id column matches the value post.id will have their last_comment_timestamp column value overwritten to the value of currentTimestamp. All impacted rows are then returned.

### Upsert

Upsert is a combination of insert and update. First, the insert operation is performed. However, if the object already exists, then the update portion is called instead. As a result, the input to the function are objects to be inserted, a conflictColumns object which specifies which column values must conflict for the update operation to occur, and an updateColumns which specifies which columns have their values overwritten by the incoming object’s values. The conflictColumns and updateColumns parameters are both arrays. As usual, all impacted rows are returned. 

#### Input

```js
await context.db.upsert(objects, conflictColumns, updateColumns)
```

The Objects parameter is either one or an array of objects. The other two parameters are arrays of strings. The strings *should* correspond to column names for that table. 

#### Example

```js
const insertPostDataA = {
  id: postId
  account_id: accountIdA,
  block_height: blockHeightA,
  block_timestamp: blockTimeStampA
};


const insertPostDataB = {
  id: postId
  account_id: accountIdB,
  block_height: blockHeightB,
  block_timestamp: blockTimeStampB
};
// Insert new post to Posts table
await context.db.Posts.upsert(
  [ insertPostDataA, insertPostDataB ], 
  [‘account_id’, ‘id’], 
  [‘block_height’, ‘block_timestamp’);
```

In this example, two objects are being inserted. However, if a row already exists in the table where the account_id and id are the same, then block_height and block_timestamp would be overwritten in those rows to the value in the object in the call which is conflicting. 

### Delete

This method deletes all objects in the row which exactly match the object passed in. Obviously caution should be taken when using this method. I currently only support AND and exact match, just like in the select method here. That doubles as a safety measure against accidentally deleting a bunch of data. Later on, I may add more functionality related to matching, as well as limits. All deleted rows ARE returned so you can always insert them back if you get back more rows than expected or something. Or reindex your indexer I guess. 

#### Input

```js
await context.db.TableName.delete(whereObj)
```

As stated, only a single object is allowed. 

#### Example

```js
await context.db.delete_post_likes(
  { 
    account_id: likeAuthorAccountId, 
    post_id: postId
  }
);
```

In this example, any rows where account_id and post_id match the supplied value are deleted. All deleted rows are returned. 

### Auto Complete

The above methods are generated when the schema is read. The tables in the schema are parsed and methods set under each table name. This makes using the object more intuitive and declarative. In addition to that, typescript types are generated which represent the table itself. These types are set as the parameter’s types. This provides autocomplete and strong typing in the IDE. These restrictions are not enforced on the runner side and are instead mainly as a suggestion to help guide the developer to use the methods in a way that is deemed correct by us. Here’s some screenshots of autocomplete and strong typing in action: 


