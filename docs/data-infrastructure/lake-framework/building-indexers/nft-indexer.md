---
sidebar_label: NFT Indexer
description: "This tutorial will guide you through building a simple NFT indexer using the JavaScript version of the NEAR Lake Framework JS. The indexer will listen for nft_mint events and print relevant data about newly minted NFTs."
---

This tutorial will guide you through building a simple NFT indexer using the JavaScript version of the [NEAR Lake Framework JS](/data-infrastructure/lake-framework/near-lake-framework). The indexer will listen for `nft_mint` events and print relevant data about newly minted NFTs.

The indexer is watching for `nft_mint` [Events](https://nomicon.io/Standards/EventsFormat) and prints some relevant data:
- `receiptId` of the [Receipt](/data-infrastructure/lake-data-structures/receipt) where the mint has happened
- Marketplace
- NFT owner account name
- Links to the NFTs on the marketplaces

The final source code is available on the GitHub [`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer)

:::note Source code for the tutorial

[`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer): source code for this tutorial

:::


## Motivation

NEAR Protocol had introduced a nice feature [Events](https://nomicon.io/Standards/EventsFormat). The Events allow a contract developer to add standardized logs to the [`ExecutionOutcomes`](/data-infrastructure/lake-data-structures/execution-outcome) thus allowing themselves or other developers to read those logs in more convenient manner via API or indexers.

The Events have a field `standard` which aligns with NEPs. In this tutorial we'll be talking about [NEP-171 Non-Fungible Token standard](https://github.com/near/NEPs/discussions/171).

In this tutorial our goal is to show you how you can "listen" to the Events contracts emit and how you can benefit from them.

As the example we will be building an indexer that watches all the NFTs minted following the [NEP-171 Events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) standard, assuming we're collectors who don't want to miss a thing. Our indexer should notice every single NFT minted and give us a basic set of data like: in what Receipt it was minted, and show us the link to a marketplace (we'll cover Paras and [Mintbase/Bitte](https://bitte.ai/) in our example).

We will use JS version of [NEAR Lake Framework](/data-infrastructure/lake-framework/near-lake-framework) in this tutorial. Though the concept is the same for Rust, but we want to show more people that it's not that complex to build your own indexer.

## Preparation

:::danger Credentials

Please, ensure you've the credentials set up as described on the [Credentials](../running-near-lake/credentials.md) page. Otherwise you won't be able to get the code working.

:::

You will need:

- `node` [installed and configured](https://nodejs.org/en/download/)

Let's create our project folder

```bash
mkdir lake-nft-indexer && cd lake-nft-indexer
```

Let's add the `package.json`

```json title=package.json
{
  "name": "lake-nft-indexer",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc && node index.js"
  },
  "dependencies": {
    "near-lake-framework": "^1.0.2"
  },
  "devDependencies": {
    "typescript": "^4.6.4"
  }
}
```

You may have noticed we've added `typescript` as a dev dependency. Let's configure the TypeScript. We'll need to create `tsconfig.json` file for that

```json title=tsconfig.json
{
  "compilerOptions": {
    "lib": [
      "ES2019",
      "dom"
    ]
  }
}
```

:::warning ES2019 edition

Please, note the `ES2019` edition used. We require it because we are going to use `.flatMap()` and `.flat()` in our code. These methods were introduces in `ES2019`. Though you can use even more recent

:::

Let's create empty `index.ts` in the project root and thus finish the preparations.

```bash
npm install
```

Now we can start a real work.


## Set up NEAR Lake Framework

In the `index.ts` let's import `startStream` function and `types` from `near-lake-framework`:

```ts title=index.ts
import { startStream, types } from 'near-lake-framework';
```

Add the instantiation of `LakeConfig` below:

```ts title=index.js
const lakeConfig: types.LakeConfig = {
  s3BucketName: "near-lake-data-mainnet",
  s3RegionName: "eu-central-1",
  startBlockHeight: 66264389,
};
```

Just a few words on the config, we have set `s3BucketName` for mainnet, default `s3RegionName` and a fresh-ish block height for `startBlockHeight`. You can go to [NEAR Explorer](https://nearblocks.io) and get **the freshest** block height for your setup. Though you can use the same as we do.

Now we need to create a callback function that we'll be called to handle [`StreamerMessage`](/data-infrastructure/lake-data-structures/toc) our indexer receives.

```ts title=index.ts
async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {

}
```

:::info Callback function requirements

In `near-lake-framework` JS library the handler have to be presented as a callback function. This function have to:
- be asynchronous
- accept an argument of type [`StreamerMessage`](/data-infrastructure/lake-data-structures/toc)
- return nothing (`void`)

:::

And an actual start of our indexer in the end of the `index.ts`

```ts title=index.ts
(async () => {
  await startStream(lakeConfig, handleStreamerMessage);
})();
```

The final `index.ts` at this moment should look like the following:

```ts title=index.ts
import { startStream, types } from 'near-lake-framework';

const lakeConfig: types.LakeConfig = {
  s3BucketName: "near-lake-data-mainnet",
  s3RegionName: "eu-central-1",
  startBlockHeight: 66264389,
};

async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {

}

(async () => {
  await startStream(lakeConfig, handleStreamerMessage);
})();
```


## Events and where to catch them

First of all let's find out where we can catch the Events. We hope you are familiar with how the [Data Flow in NEAR Blockchain](/protocol/data-flow/near-data-flow), but let's revise our knowledge:
- Mint an NFT is an action in an NFT contract (doesn't matter which one)
- Actions are located in a [Receipt](/data-infrastructure/lake-data-structures/receipt)
- A result of the Receipt execution is [ExecutionOutcome](/data-infrastructure/lake-data-structures/execution-outcome)
- `ExecutionOutcome` in turn, catches the logs a contract "prints"
- [Events](https://nomicon.io/Standards/EventsFormat) built on top of the logs

This leads us to the realization that we can watch only for ExecutionOutcomes and ignore everything else `StreamerMessage` brings us.

Also, we need to define an interface to catch the Events. Let's copy the interface definition from the [Events Nomicon page](https://nomicon.io/Standards/EventsFormat#events) and paste it before the `handleStreamerMessage` function.

```ts title=index.ts
interface EventLogData {
  standard: string,
  version: string,
  event: string,
  data?: unknown,
};
```

## Catching only the data we need

Inside the callback function `handleStreamerMessage` we've prepared in the [Preparation](#preparation) section let's start filtering the data we need:

```ts title=index.ts
async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {
  const relevantOutcomes = streamerMessage
    .shards
    .flatMap(shard => shard.receiptExecutionOutcomes)

}
```

We have iterated through all the [Shards](/data-infrastructure/lake-data-structures/shard) and collected the lists of all ExecutionOutcomes into a single list (in our case we don't care on which Shard did the mint happen)

Now we want to deal only with those ExecutionOutcomes that contain logs of Events format. Such logs start with `EVENT_JSON:` according to the [Events docs](https://nomicon.io/Standards/EventsFormat#events).

Also, we don't require all the data from ExecutionOutcome, let's handle it:

```ts title=index.ts
async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {
  const relevantOutcomes = streamerMessage
    .shards
    .flatMap(shard => shard.receiptExecutionOutcomes)
    .map(outcome => ({
      receipt: {
        id: outcome.receipt.receiptId,
        receiverId: outcome.receipt.receiverId,
      },
      events: outcome.executionOutcome.outcome.logs.map(
        (log: string): EventLogData => {
          const [_, probablyEvent] = log.match(/^EVENT_JSON:(.*)$/) ?? []
          try {
            return JSON.parse(probablyEvent)
          } catch (e) {
            return
          }
        }
      )
      .filter(event => event !== undefined)
    }))

}
```

Let us explain what we are doing here:

1. We are walking through the ExecutionOutcomes
2. We are constructing a list of objects containing `receipt` (it's id and the receiver) and `events` containing the Events
3. In order to collect the Events we are iterating through the ExecutionOutcome's logs trying to parse Event using regular expression. We're returning `undefined` if we fail to parse `EventLogData`
4. Finally once `events` list is collected we're filtering it dropping the `undefined`

Fine, so now we have only a list of our objects that contain some Receipt data and the list of successfully parsed `EventLogData`.

The goal for our indexer is to return the useful data about a minted NFT that follows NEP-171 standard. We need to drop irrelevant standard Events:

```ts title=index.ts
    .filter(relevantOutcome =>
      relevantOutcome.events.some(
        event => event.standard === "nep171" && event.event === "nft_mint"
      )
    )
```

## Almost done

So far we have collected everything we need corresponding to our requirements.

We can print everything in the end of the `handleStreamerMessage`:

```ts title=index.ts
  relevantOutcomes.length && console.dir(relevantOutcomes, { depth: 10 })
```

The final look of the `handleStreamerMessage` function:

```ts title=index.ts
async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {
  const relevantOutcomes = streamerMessage
    .shards
    .flatMap(shard => shard.receiptExecutionOutcomes)
    .map(outcome => ({
      receipt: {
        id: outcome.receipt.receiptId,
        receiverId: outcome.receipt.receiverId,
      },
      events: outcome.executionOutcome.outcome.logs.map(
        (log: string): EventLogData => {
          const [_, probablyEvent] = log.match(/^EVENT_JSON:(.*)$/) ?? []
          try {
            return JSON.parse(probablyEvent)
          } catch (e) {
            return
          }
        }
      )
      .filter(event => event !== undefined)
    }))
    .filter(relevantOutcome =>
      relevantOutcome.events.some(
        event => event.standard === "nep171" && event.event === "nft_mint"
      )
    )

  relevantOutcomes.length && console.dir(relevantOutcomes, { depth: 10 })
}

```

And if we run our indexer we will be catching `nft_mint` event and print the data in the terminal.

```bash
npm run start
```

:::note

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](../running-near-lake/credentials.md) part :)

:::

Not so fast! Remember we were talking about having the links to the marketplaces to see the minted tokens? We're gonna extend our data with links whenever possible. At least we're gonna show you how to deal with the NFTs minted on [Paras](https://paras.id) and [Mintbase/Bitte](https://bitte.ai/).

## Crafting links to Paras and Mintbase for NFTs minted there

At this moment we have an array of objects we've crafted on the fly that exposes receipt, execution status and event logs. We definitely know that all the data we have at this moment are relevant for us, and we want to extend it with the links to that minted NFTs at least for those marketplaces we know.

We know and love Paras and Mintbase.

### Paras token URL

We did the research for you and here's how the URL to token on Paras is crafting:

```
https://paras.id/token/[1]::[2]/[3]
```

Where:

- [1] - Paras contract address (`x.paras.near`)
- [2] - First part of the `token_id` (`EventLogData.data` for Paras is an array of objects with `token_ids` key in it. Those IDs represented by numbers with column `:` between them)
- [3] - `token_id` itself

Example:

```
https://paras.id/token/x.paras.near::387427/387427:373
```

Let's add the interface for later use somewhere after `interface EventLogData`:

```ts
interface ParasEventLogData {
  owner_id: string,
  token_ids: string[],
};
```

### Mintbase token URL

And again we did the research for you:

```
https://www.mintbase.io/thing/[1]:[2]
```

Where:

- [1] - `meta_id` (`EventLogData.data` for Mintbase is an array of stringified JSON that contains `meta_id`)
- [2] - Store contract account address (basically Receipt's receiver ID)

Example:

```
https://www.mintbase.io/thing/70eES-icwSw9iPIkUluMHOV055pKTTgQgTiXtwy3Xus:vnartistsdao.mintbase1.near
```

Let's add the interface for later use somewhere after `interface EventLogData`:

```ts
interface MintbaseEventLogData {
  owner_id: string,
  memo: string,
}
```

Now it's a perfect time to add another `.map()`, but it might be too much. So let's proceed with a forloop to craft the output data we want to print.

```ts title=index.ts
let output = []
for (let relevantOutcome of relevantOutcomes) {
  let marketplace = "Unknown"
  let nfts = []


}
```

We're going to print the marketplace name, Receipt id so you would be able to search for it on [NEAR Explorer](https://nearblocks.io) and the list of links to the NFTs along with the owner account name.

Let's start crafting the links. Time to say "Hi!" to [Riqi](https://twitter.com/hdriqi) (just because we can):

```ts title=index.ts
let output = []
  for (let relevantOutcome of relevantOutcomes) {
    let marketplace = "Unknown"
    let nfts = []
    if (relevantOutcome.receipt.receiverId.endsWith(".paras.near")) {
      marketplace = "Paras"
      nfts = relevantOutcome.events.flatMap(event => {
        return (event.data as ParasEventLogData[])
          .map(eventData => ({
            owner: eventData.owner_id,
            links: eventData.token_ids.map(
              tokenId => `https://paras.id/token/${relevantOutcome.receipt.receiverId}::${tokenId.split(":")[0]}/${tokenId}`
            )
           })
        )
      })
    }
```

A few words about what is going on here. If the Receipt's receiver account name ends with `.paras.near` (e.g. `x.paras.near`) we assume it's from Paras marketplace, so we are changing the corresponding variable.

After that we iterate over the Events and its `data` using the `ParasEventLogData` we've defined earlier. Collecting a list of objects with the NFTs owner and NFTs links.

Mintbase turn, we hope [Nate](https://twitter.com/nategeier) and his team have [migrated to NEAR Lake Framework](../../lake-framework/migrating-to-near-lake-framework.md) already, saying "Hi!" and crafting the link:

```ts title=index.ts
  } else if (relevantOutcome.receipt.receiverId.match(/\.mintbase\d+\.near$/)) {
      marketplace = "Mintbase"
      nfts = relevantOutcome.events.flatMap(event => {
        return (event.data as MintbaseEventLogData[])
          .map(eventData => {
          const memo = JSON.parse(eventData.memo)
          return {
            owner: eventData.owner_id,
            links: [`https://mintbase.io/thing/${memo["meta_id"]}:${relevantOutcome.receipt.receiverId}`]
          }
        })
      })
    }
```

Almost the same story as with Paras, but a little bit more complex. The nature of Mintbase marketplace is that it's not a single marketplace! Every Mintbase user has their own store and a separate contract. And it looks like those contract addresses follow the same principle they end with `.mintbaseN.near` where `N` is number (e.g. `nate.mintbase1.near`).

After we have defined that the ExecutionOutcome receiver is from Mintbase we are doing the same stuff as with Paras:

1. Changing the `marketplace` variable
2. Collecting the list of NFTs with owner and crafted links

And if we can't determine the marketplace, we still want to return something, so let's return Events data as is:

```ts title=index.ts
  } else {
    nfts = relevantOutcome.events.flatMap(event => event.data)
  }
```

It's time to push the collected data to the `output`

```ts title=index.ts
  output.push({
    receiptId: relevantOutcome.receipt.id,
    marketplace,
    nfts,
  })
```

And make it print the output to the terminal:

```ts title=index.ts
if (output.length) {
  console.log(`We caught freshly minted NFTs!`)
  console.dir(output, { depth: 5 })
}
```

All together:

```ts title=index.ts
  let output = []
  for (let relevantOutcome of relevantOutcomes) {
    let marketplace = "Unknown"
    let nfts = []
    if (relevantOutcome.receipt.receiverId.endsWith(".paras.near")) {
      marketplace = "Paras"
      nfts = relevantOutcome.events.flatMap(event => {
        return (event.data as ParasEventLogData[])
          .map(eventData => ({
            owner: eventData.owner_id,
            links: eventData.token_ids.map(
              tokenId => `https://paras.id/token/${relevantOutcome.receipt.receiverId}::${tokenId.split(":")[0]}/${tokenId}`
            )
           })
        )
      })
    } else if (relevantOutcome.receipt.receiverId.match(/\.mintbase\d+\.near$/)) {
      marketplace = "Mintbase"
      nfts = relevantOutcome.events.flatMap(event => {
        return (event.data as MintbaseEventLogData[])
          .map(eventData => {
          const memo = JSON.parse(eventData.memo)
          return {
            owner: eventData.owner_id,
            links: [`https://mintbase.io/thing/${memo["meta_id"]}:${relevantOutcome.receipt.receiverId}`]
          }
        })
      })
    } else {
      nfts = relevantOutcome.events.flatMap(event => event.data)
    }
    output.push({
      receiptId: relevantOutcome.receipt.id,
      marketplace,
      createdOn,
      nfts,
    })
  }
  if (output.length) {
    console.log(`We caught freshly minted NFTs!`)
    console.dir(output, { depth: 5 })
  }
```

OK, how about the date and time of the NFT mint? Let's add to the beginning of the `handleStreamerMessage` function

```ts title=index.ts
const createdOn = new Date(streamerMessage.block.header.timestamp / 1000000)
```

Update the `output.push()` expression:

```ts title=index.ts
output.push({
  receiptId: relevantOutcome.receipt.id,
  marketplace,
  createdOn,
  nfts,
})
```

And not that's it. Run the indexer to watch for NFT minting and never miss a thing.

```bash
npm run start
```

:::note

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](../running-near-lake/credentials.md) part :)

:::

Example output:

```
We caught freshly minted NFTs!
[
  {
    receiptId: '2y5XzzL1EEAxgq8EW3es2r1dLLkcecC6pDFHR12osCGk',
    marketplace: 'Paras',
    createdOn: 2022-05-24T09:35:57.831Z,
    nfts: [
      {
        owner: 'dccc.near',
        links: [ 'https://paras.id/token/x.paras.near::398089/398089:17' ]
      }
    ]
  }
]
We caught freshly minted NFTs!
[
  {
    receiptId: 'BAVZ92XdbkAPX4DkqW5gjCvrhLX6kGq8nD8HkhQFVt5q',
    marketplace: 'Mintbase',
    createdOn: 2022-05-24T09:36:00.411Z,
    nfts: [
      {
        owner: 'chiming.near',
        links: [
          'https://mintbase.io/thing/HOTcn6LTo3qTq8bUbB7VwA1GfSDYx2fYOqvP0L_N5Es:vnartistsdao.mintbase1.near'
        ]
      }
    ]
  }
]
```

## Conclusion

What a ride, yeah? Let's sum up what we have done:

- You've learnt about [Events](https://nomicon.io/Standards/EventsFormat)
- Now you understand how to follow for the Events
- Knowing the fact that as a contract developer you can use Events and emit your own events, now you know how to create an indexer that follows those Events
- We've had a closer look at NFT minting process, you can experiment further and find out how to follow `nft_transfer` Events

The material from this tutorial can be extrapolated for literally any event that follows the [Events format](https://nomicon.io/Standards/EventsFormat)

Not mentioning you have a dedicated indexer to find out about the newest NFTs minted out there and to be the earliest bird to collect them.

Let's go hunt doo, doo, doo 🦈

:::note Source code for the tutorial

[`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer): source code for this tutorial

:::
