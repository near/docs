---
id: widget
title: QueryAPI Widget
sidebar_label: BOS Component
---



## QueryAPI Widget


[`QueryApi.App`](https://near.org/#/dataplatform.near/widget/QueryApi.App) is the widget's name and it's hosted under `dataplatform.near`.
Here you can see all the indexers that exist and are for the public.
As you can see, there's a whole bunch of them here.
I've made a few myself.
If you would like to create a new indexer, simply click [**Create New Indexer**](https://near.org/#/dataplatform.near/widget/QueryApi.App/?view=create-new-indexer).

![QueryAPI Dashboard](/docs/assets/QAPIScreen.png)

## Indexers Stored On-Chain

Right now we're going to be checking out an indexer that powers the near.org's main feed
of posts.
Let's click [**View indexer**](https://near.org/dataplatform.near/widget/QueryApi.App?selectedIndexerPath=dataplatform.near/feed-indexer&view=editor-window) to see all the details.

What it's doing in the background is making an RPC query to [`queryapi.dataplatform.near`](https://stats.gallery/mainnet/queryapi.dataplatform.near/contract?t=week),
where we host a contract that stores all of your indexer logic as well as your schemas.
If you go into read indexer function, you can see a `roshaan.near` as well as the
feed indexer.
It's giving me the code that I committed on chain.
This is my code as well as my schema, which we use to provision your database, as well
as a filter.
Here we can see that we are creating an indexer for social.near, so we will forward all blocks
that have transactions to do with social.near to your indexing logic.
So you can index that contract.

## BOS Feed Indexer


Now that this is loaded up, you can see we have a view to edit our code as we choose
to do so.
We have the schema, which we use to provision your database.
Here we have a post table that we create with all the basic information we might need, block
height to figure out when it happened, receipt ID so we can view it on chain, the content,
store accounts that have liked that post, and then we have a comments table, which we
have similar information about as well as storing the post ID, which the comment was
made on, and we have post likes, then we create some unique or primary keys on our tables,
and then we create some indexes to have some queries be optimized, such as we would like
to query the post that have been just recently commented on, and we do that by creating a
index on last comment timestamp on the post table, so we always have that available to
us.
And then we have a GraphQL tab, which we can use to really quickly test whether our data
is coming in and in what form.
So here we are making a query to a table called Prashant underscore near feed indexer post.
So the way we name things for schemas is that we use the account ID who created the indexer,
a lowercase, and we replace dots and any special characters with underscore, and then
we have the indexer name itself, it's called feed indexer, then we have the table that
we're targeting, we're targeting the post table, and you can hit play here and view
it here.
You can also come into the side here and click on code exporter to get some boilerplate code
to start off with, which will take your query and just make it so that you can view it in
the boss.
So it would give you something like this and you can view the same exact query in your
browser and then slowly but surely you can change it into something like this code here,
which also makes a query here on the same indexer targeting the post table, but also
it is accessing another table, the comments table.
If you remember, we created a foreign key to match the posts and the IDs of the comments
together, and this is a really cool feature of GraphQL, which allows you to stitch multiple
tables together in one nice query.
So not only here with this query we're getting all the posts, but we're getting all the comments
related to that post in just one call, which is pretty cool.
All we do here is we make that query, then render the items and view it inside an infinite
scroll and we end up with something like this, and if we head to near.org, we can reload
the page and hopefully see the last post here as well.


