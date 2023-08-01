---
id: example
title: QueryAPI Example
sidebar_label: End-to-end Example
---


:::info
QueryAPI is a fully managed service that allows you to create and manage indexers on-chain seamlessly.
:::

## Introduction

Let's quickly fork an indexer to discuss a bit about how historical backfill works and
how quick it is to get started with a new indexer.

## End-to-end Example 

We'll check out the widget activity feed indexer, which listens to widget creation events as
well as development events on on-chain, so whenever someone submits a on-chain event
to edit a widget component, we will get a notification for it.
So what happens here is very similar to what we did in the feed indexer example, but if
you take a look at our schema, it's very simple, we just have a widget activity table
with the account ID that made the update, the widget name, perhaps later we can add
bytes committed, but at the moment we don't actually support it in our code, we get the
block height where this update was made, the receipt ID and so on and so forth.
So now let's take a look at the code really quick, just we filter based on what we want,
we want to look at those transactions that are setting the widget key in the social graph
or in the object in the contract, and then we handle that transaction by making a mutation
to the database XO.
So let's just quickly check whether this works in debug mode.
I made a transaction or a transaction to update a widget at this address or at this block
height, and we're just going to go to console here and play it from here.
Let's see, so it didn't catch anything at this block, but in the next one it was trying
to add a mutation, so we'll just stop it here, but it was trying to add a mutation and the
mutation was for my, was because I was trying to edit a, or I committed some changes on
chain on a widget at this block height, and you can check it out, this receipt, and this
is the widget name.
So anyways, now let's try to fork this, so now that we know that this works, just go
to fork this indexer, let's name it something like copy, just because this is already on
my account, but if this wasn't on my account, there would be a big button saying fork here,
but at this moment, because we don't support schema migrations, you will need to, it'll
be a common step for you perhaps to fork your own indexers until we support that, so that's
why we have this functionality, but let's call it something dash copy.
A little bit about historical backfill, as you can see we have a field here to tell,
to let us know how far back you would like the indexing process to run.
We're still actively developing this feature and it's fairly limited at the moment in how
fast we are able to actually process this historical data.
One thing to remember is that we launched, we launched a real-time indexing process as
well as the historical indexing process simultaneously, so if your indexer requires historical indexing,
which many indexers do, you'll need to design your schema accordingly.
For example, you might enable upserts to your rows in your schema, so that if historical
indexing process tries to write a row that already exists in the database, it doesn't
throw an error, so just keep that in mind.
So yeah, we'll actually not try this at this moment, but we are doing social, we're trying
to hit social dot near for indexing purposes and we'll just fork our own index.
So as you can see we're trying to make a transaction of this contract and we add our code, our
schema, we don't have a start block height and let's just confirm it.
Now that we've created an indexer, let's check it out in action.
So we have our indexing logic here, our schema, and our GraphQL playground.
Let's craft a query that will allow us to check whether things worked.

## Create queries in Playground

We're going to get our schema and create a query so that we get the account ID, block
height, block timestamp, as well as the receipt ID and the widget name, and we will order
by block height in descending order.
So just created a query here, I just made a widget right now, so that's what it returned,
but we will go in the sandbox again and create a new widget.
Let's copy this, paste this here, and publish it.
And let's go back to our GraphQL playground and click play.
And as we can see we got our new widget event here and this will be getting all events in
the future as well.

![Query Playground](/docs/assets/QAPIScreen.gif)


## View Indexing Status + Logs



Now that we have that query and we know that our indexer is working, as well as we can
see the indexer status here, let's see events such as, let's go back, everything is provisioned
perfectly and it's been running okay.
We can see all kind of events or logs for data, so for example I had a little error
in what I wrote in the indexing logic, quickly went back and fixed it here and we can see
that it's running at the moment.
But let's create a boss widget out of this.


## Quickly create a BOS Widget from query


So we go to GraphQL, go to the query that we had earlier, go to the code exporter, get
some default code here, copy it, go to the sandbox, paste it.
Going to get rid of an error here and let's, so all this is doing is you can check it,
sets up some boilerplate code to make the GraphQL query, it has our query that we had
in our playground and then we call that query, extract the data and render it using this
render data function.
Let's hit preview, as you can see we have our two events or boss widget activity development
events here and you can create nice UIs over it which we have done so over here, widget
code which is based off of another similar indexer and as you can see it's got our events
here, seven minutes ago we made this commit on this widget and so on and so forth.
And the way this works is simply by, actually this code supports subscriptions and currently
near.org doesn't support subscriptions, web sockets I mean so if you would like to check
out or mess around with it you would need to check that out on near.social at this moment
and if we come here and check it out as you can see let's quickly actually go here, go
into near.org and commit some code.
Open a component, new component, open, return, hello there, that works.
Let's publish it quickly, then let's go to near.social as we can see we just got the
subscription or web socket connection was active in the background and it just picked
this up four seconds ago and we just made this widget.


## Known limitations

That was an overall demo of what query API can do at the moment but we are still in closed
beta as we have a few limitations to address.
Some of these limitations are that we only support JavaScript at the moment and we plan
on supporting Rust in the future.
We also do not support schema migrations so if you have an indexer whose schema needs
to change you may need to create a new indexer and do historical backfill on that new indexer
again.
Regarding historical backfill we have a limitation at the moment where we run your historical
backfill process as well as your real-time indexing feed process at the same time and
this puts the complexity on the indexer developer to have to keep that in mind just to be sure
that you don't have unintended side effects.
We also don't support all the ways that we would like to be able to operate your indexer
so that's stopping your indexer or restarting it whenever you would like to do that.
Then also regarding storage costs we do not charge you yet for storing your schema as
well as your indexer function at the moment.

## Roadmap

We do have a pretty exciting roadmap ahead to address some of these limitations as well
as support new features such as supporting NoSQL databases as well as supporting verification
proofs on the data that we index for you and also making an effort to open source all this
tooling so anyone can run this on their own servers.
That's a little bit about query API.

## Join The Closed Beta


If you would like to be part of the closed beta please reach out to Pavel or me on Telegram
for access and you can find resources that I mentioned throughout the video as well as
links in the description of the video and if you have any questions please reach out
to us on Telegram.

## Resources

Thank you so much everyone.



