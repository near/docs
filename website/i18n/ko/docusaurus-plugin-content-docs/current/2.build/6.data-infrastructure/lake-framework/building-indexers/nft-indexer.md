---
sidebar_label: NFT Indexer
---

# NFT 인덱서 구축

:::note Source code for the tutorial

[`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer): source code for this tutorial

:::

## 끝

This tutorial ends with a working NFT indexer built on top [NEAR Lake Framework JS](/concepts/advanced/near-lake-framework). The indexer is watching for `nft_mint` [Events](https://nomicon.io/Standards/EventsFormat) and prints some relevant data:

- `receiptId` of the [Receipt](https://docs.near.org/develop/lake/structures/receipt) where the mint has happened
- 마켓플레이스
- NFT 소유자 계정 이름
- 마켓플레이스 내 NFT로의 링크

The final source code is available on the GitHub [`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer)

## 목표

NEAR Protocol had introduced a nice feature [Events](https://nomicon.io/Standards/EventsFormat). The Events allow a contract developer to add standardized logs to the [`ExecutionOutcomes`](https://docs.near.org/develop/lake/structures/execution-outcome) thus allowing themselves or other developers to read those logs in more convenient manner via API or indexers.

The Events have a field `standard` which aligns with NEPs. In this tutorial we'll be talking about [NEP-171 Non-Fungible Token standard](https://github.com/near/NEPs/discussions/171).

In this tutorial our goal is to show you how you can "listen" to the Events contracts emit and how you can benefit from them.

As the example we will be building an indexer that watches all the NFTs minted following the [NEP-171 Events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) standard, assuming we're collectors who don't want to miss a thing. Our indexer should notice every single NFT minted and give us a basic set of data like: in what Receipt it was minted, and show us the link to a marketplace (we'll cover [Paras](https://paras.id) and [Mintbase](https://mintbase.io) in our example).

We will use JS version of [NEAR Lake Framework](/concepts/advanced/near-lake-framework) in this tutorial. Though the concept is the same for Rust, but we want to show more people that it's not that complex to build your own indexer.

## 준비

:::danger Credentials

Please, ensure you've the credentials set up as described on the [Credentials](credentials.md) page. Otherwise you won't be able to get the code working.

:::

You will need:

- `node`가 [설치 및 구성됨](https://nodejs.org/en/download/)

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

## NEAR Lake 프레임워크 설정

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

Now we need to create a callback function that we'll be called to handle [`StreamerMessage`](/build/data-infrastructure/lake-data-structures/toc) our indexer receives.

```ts title=index.ts
async function handleStreamerMessage(
  streamerMessage: types.StreamerMessage
): Promise<void> {

}
```

:::info Callback function requirements

In `near-lake-framework` JS library the handler have to be presented as a callback function. This function have to:

- 동기
- accept an argument of type [`StreamerMessage`](/build/data-infrastructure/lake-data-structures/toc)
- 아무것도 반환하지 않아야 함(`void`)

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

## 이벤트와 이를 감지할 수 있는 곳

First of all let's find out where we can catch the Events. We hope you are familiar with how the [Data Flow in NEAR Blockchain](/concepts/data-flow/near-data-flow), but let's revise our knowledge:

- Mint an NFT is an action in an NFT contract (doesn't matter which one)
- Actions are located in a [Receipt](https://docs.near.org/develop/lake/structures/receipt)
- A result of the Receipt execution is [ExecutionOutcome](https://docs.near.org/develop/lake/structures/execution-outcome)
- `ExecutionOutcome`는 따라서, 차례로 컨트랙트가 "출력"하는 로그를 잡습니다.
- [Events](https://nomicon.io/Standards/EventsFormat)는 로그 내에 존재합니다.

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

## 필요한 데이터만 포착

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

We have iterated through all the [Shards](https://docs.near.org/develop/lake/structures/shard) and collected the lists of all ExecutionOutcomes into a single list (in our case we don't care on which Shard did the mint happen)

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

1. ExecutionOutcomes를 진행 중입니다.
2. `receipt`(ID 및 수신자)와 이벤트를 포함하는 `events`가 담긴 객체 목록을 구성하고 있습니다.
3. 이벤트를 수집하기 위해, 정규 표현을 사용하여 이벤트를 구문 분석하려는 ExecutionOutcome의 로그를 반복하고 있습니다. `EventLogData`의 구문 분석에 실패하면 `undefined`를 반환합니다
4. 마지막으로 `events` 목록이 수집되면, `undefined`를 반환하는 것들을 필터링합니다.

Fine, so now we have only a list of our objects that contain some Receipt data and the list of successfully parsed `EventLogData`.

The goal for our indexer is to return the useful data about a minted NFT that follows NEP-171 standard. We need to drop irrelevant standard Events:

```ts title=index.ts
    .filter(relevantOutcome =>
      relevantOutcome.events.some(
        event => event.standard === "nep171" && event.event === "nft_mint"
      )
    )
```

## 거의 완료

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

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](credentials.md) part :)

:::

Not so fast! Remember we were talking about having the links to the marketplaces to see the minted tokens? We're gonna extend our data with links whenever possible. At least we're gonna show you how to deal with the NFTs minted on [Paras](https://paras.id) and [Mintbase](https://mintbase.io).

## Paras와 Mintbase에서 발행된 NFT 링크 제작

At this moment we have an array of objects we've crafted on the fly that exposes receipt, execution status and event logs. We definitely know that all the data we have at this moment are relevant for us, and we want to extend it with the links to that minted NFTs at least for those marketplaces we know.

We know and love Paras and Mintbase.

### Paras 토큰 URL

We did the research for you and here's how the URL to token on Paras is crafting:

```
https://paras.id/token/[1]::[2]/[3]
```

Where:

- [1] - Paras 컨트랙트 주소 (`x.paras.near`)
- [2] - `token_id`의 첫 번째 부분 (Paras의 `EventLogData.data`는 `token_ids` 키가 있는 객체 배열입니다. 해당 ID는 사이에 `:` 열이 있는 숫자들로 표현됩니다.)
- [3] - `token_id` 자체

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

### Mintbase 토큰 URL

And again we did the research for you:

```
https://www.mintbase.io/thing/[1]:[2]
```

Where:

- [1] - `meta_id` (Mintbase의 `EventLogData.data`는 `meta_id`를 포함하는 문자열화된 JSON 배열입니다.)
- [2] - 컨트랙트 계정 주소 저장(기본적으로 Receipt의 수신자 ID)

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

Mintbase turn, we hope [Nate](https://twitter.com/nategeier) and his team have [migrated to NEAR Lake Framework](../migrating-to-near-lake-framework.md) already, saying "Hi!" and crafting the link:

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

1. `marketplace` 변수 변경
2. 소유자 및 제작된 링크가 포함된 NFT 목록 수집

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

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](credentials.md) part :)

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

## 결론

What a ride, yeah? Let's sum up what we have done:

- [이벤트](https://nomicon.io/Standards/EventsFormat)에 대해 배웠습니다.
- 이제 이벤트를 팔로우하는 방법을 이해했습니다.
- 컨트랙트 개발자로서 이벤트를 사용하고 자신의 이벤트를 내보낼 수 있다는 사실을 알았으므로, 이제 해당 이벤트를 추적하는 인덱서를 만드는 방법에 대해 알게 되었습니다.
- NFT 민팅 프로세스를 자세히 살펴보았으며, 추가 실험을 통해 `nft_transfer` 이벤트를 추적하는 방법을 알아볼 수 있습니다.

The material from this tutorial can be extrapolated for literally any event that follows the [Events format](https://nomicon.io/Standards/EventsFormat)

Not mentioning you have a dedicated indexer to find out about the newest NFTs minted out there and to be the earliest bird to collect them.

Let's go hunt doo, doo, doo 🦈

:::note Source code for the tutorial

[`near-examples/near-lake-nft-indexer`](https://github.com/near-examples/near-lake-nft-indexer): source code for this tutorial

:::
