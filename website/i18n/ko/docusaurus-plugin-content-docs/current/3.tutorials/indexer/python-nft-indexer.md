---
sidebar_label: "Python용 NFT 인덱서"
---

# Python용 NFT 인덱서 구축


:::note Source code for the tutorial

[`frolvanya/near-lake-nft-indexer`](https://github.com/frolvanya/near-lake-nft-indexer): source code for this tutorial

:::

## 목표

This tutorial ends with a working NFT indexer built on top [NEAR Lake Framework for Python](https://near-indexers.io/docs/projects/near-lake-framework). The indexer is watching for `nft_mint` [Events](https://nomicon.io/Standards/EventsFormat) and prints some relevant data:
- `receipt_id` of the [Receipt](https://docs.near.org/develop/lake/structures/receipt) where the mint has happened
- 마켓플레이스
- NFT 소유자 계정 이름
- 마켓플레이스 내 NFT로의 링크

The final source code is available on the GitHub [`frolvanya/near-lake-nft-indexer`](https://github.com/frolvanya/near-lake-nft-indexer)

## 동기

NEAR Protocol had introduced a nice feature [Events](https://nomicon.io/Standards/EventsFormat). The Events allow a contract developer to add standardized logs to the [`ExecutionOutcomes`](https://docs.near.org/develop/lake/structures/execution-outcome) thus allowing themselves or other developers to read those logs in more convenient manner via API or indexers.

The Events have a field `standard` which aligns with NEPs. In this tutorial we'll be talking about [NEP-171 Non-Fungible Token standard](https://github.com/near/NEPs/discussions/171).

In this tutorial our goal is to show you how you can "listen" to the Events contracts emit and how you can benefit from them.

As the example we will be building an indexer that watches all the NFTs minted following the [NEP-171 Events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) standard, assuming we're collectors who don't want to miss a thing. Our indexer should notice every single NFT minted and give us a basic set of data like: in what Receipt it was minted, and show us the link to a marketplace (we'll cover [Paras](https://paras.id) and [Mintbase](https://mintbase.io) in our example).

We will use Python version of [NEAR Lake Framework](https://near-indexers.io/docs/projects/near-lake-framework) in this tutorial. Though the concept is the same for Rust, but we want to show more people that it's not that complex to build your own indexer.

## 준비

:::danger Credentials

Please, ensure you've the credentials set up as described on the [Credentials](credentials.md) page. Otherwise you won't be able to get the code working.

:::

Let's create our project folder

```bash
mkdir lake-nft-indexer && cd lake-nft-indexer
touch main.py
```

## NEAR Lake 프레임워크 설정

In the `main.py` let's import `stream` function and `near_primitives` from `near-lake-framework`:

```python title=main.py
from near_lake_framework import near_primitives, LakeConfig, streamer
```

Add the main function

```python title=main.py
async def main():
    print("Starting NFT indexer")
```

Add the instantiation of `LakeConfig` below:

```python title=main.py
config = LakeConfig.mainnet()
config.start_block_height = 69030747
config.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
config.aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
```

Just a few words on the config, function `mainnet()` has set `s3_bucket_name`, `s3_region_name` for mainnet. You can go to [NEAR Explorer](https://nearblocks.io) and get **the most recent** block height to set `config.start_block_height`.

Let's call `streamer` function with the `config`

```python title=main.py
stream_handle, streamer_messages_queue = streamer(config)
while True:
    streamer_message = await streamer_messages_queue.get()
```


And an actual start of our indexer in the end of the `main.py`

```python title=main.py
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

The final `main.py` at this moment should look like the following:

```python title=main.py
from near_lake_framework import LakeConfig, streamer, near_primitives
async def main():
    print("Starting NFT indexer")

    config = LakeConfig.mainnet()
    config.start_block_height = 69030747
    config.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
    config.aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")

    stream_handle, streamer_messages_queue = streamer(config)
    while True:
        streamer_message = await streamer_messages_queue.get()

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

Now we need to create a callback function that we'll be called to handle [`StreamerMessage`](https://near-indexers.io/docs/data-flow-and-structures/structures/toc) our indexer receives.

```python title=main.py
async def handle_streamer_message(streamer_message: near_primitives.StreamerMessage):
    pass
```

## 이벤트와 이를 감지할 수 있는 곳

First of all let's find out where we can catch the Events. We hope you are familiar with how the [Data Flow in NEAR Blockchain](https://near-indexers.io/docs/data-flow-and-structures/flow/near-data-flow), but let's revise our knowledge:
- NFT 발행은 NFT 컨트랙트 내의 action입니다(어떤 컨트랙트던 간에).
- Actions are located in a [Receipt](https://docs.near.org/develop/lake/structures/receipt)
- A result of the Receipt execution is [ExecutionOutcome](https://docs.near.org/develop/lake/structures/execution-outcome)
- `ExecutionOutcome`는 따라서, 차례로 컨트랙트가 "출력"하는 로그를 잡습니다.
- [Events](https://nomicon.io/Standards/EventsFormat)는 로그 내에 존재합니다.

This leads us to the realization that we can watch only for ExecutionOutcomes and ignore everything else `StreamerMessage` brings us.


## 필요한 데이터만 포착

Inside the callback function `handle_streamer_message` we've prepared in the [Preparation](#preparation) section let's start filtering the data we need:

```python title=main.py
async def handle_streamer_message(streamer_message: near_primitives.StreamerMessage):
    for shard in streamer_message.shards:
        for receipt_execution_outcome in shard.receipt_execution_outcomes:
            for log in receipt_execution_outcome.execution_outcome.outcome.logs:
                pass
```

We have iterated through the logs of all ExecutionOutcomes of [Shards](https://docs.near.org/develop/lake/structures/shard) (in our case we don't care on which Shard did the mint happen)

Now we want to deal only with those ExecutionOutcomes that contain logs of Events format. Such logs start with `EVENT_JSON:` according to the [Events docs](https://nomicon.io/Standards/EventsFormat#events).

```python title=main.py
async def handle_streamer_message(streamer_message: near_primitives.StreamerMessage):
    for shard in streamer_message.shards:
        for receipt_execution_outcome in shard.receipt_execution_outcomes:
            for log in receipt_execution_outcome.execution_outcome.outcome.logs:
                if not log.startswith("EVENT_JSON:"):
                    continue
                try:
                    parsed_log = json.loads(log[len("EVENT_JSON:") :])
                except json.JSONDecodeError:
                    print(
                        f"Receipt ID: `{receipt_execution_outcome.receipt.receipt_id}`\nError during parsing logs from JSON string to dict"
                    )
                    continue
```

Let us explain what we are doing here:

1. ExecutionOutcomes 내 로그를 확인 중입니다.
2. 이벤트 형식의 로그를 포함하는 ExecutionOutcomes를 필터링하고 있습니다.
3. 이벤트를 수집하기 위해, `json.loads`을 사용하여 이벤트를 파싱하려는 ExecutionOutcome의 로그를 반복하고 있습니다.

The goal for our indexer is to return the useful data about a minted NFT that follows NEP-171 standard. We need to drop irrelevant standard Events:

```python title=main.py
    if (
        parsed_log.get("standard") != "nep171"
        or parsed_log.get("event") != "nft_mint"
    ):
        continue
```

## 거의 완료

So far we have collected everything we need corresponding to our requirements.

The final look of the `handle_streamer_message` function:

```python title=main.py
async def handle_streamer_message(streamer_message: near_primitives.StreamerMessage):
    for shard in streamer_message.shards:
        for receipt_execution_outcome in shard.receipt_execution_outcomes:
            for log in receipt_execution_outcome.execution_outcome.outcome.logs:
                if not log.startswith("EVENT_JSON:"):
                    continue
                try:
                    parsed_log = json.loads(log[len("EVENT_JSON:") :])
                except json.JSONDecodeError:
                    print(
                        f"Receipt ID: `{receipt_execution_outcome.receipt.receipt_id}`\nError during parsing logs from JSON string to dict"
                    )
                    continue

                if (
                    parsed_log.get("standard") != "nep171"
                    or parsed_log.get("event") != "nft_mint"
                ):
                    continue

                print(parsed_log)
```

Now let's call `handle_streamer_message` inside the loop in `main` function

```python title=main.py
await handle_streamer_message(streamer_message)
```

And if we run our indexer we will be catching `nft_mint` event and print logs in the terminal.

```bash
python3 main.py
```

:::note

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](credentials.md) part :)

:::

Not so fast! Remember we were talking about having the links to the marketplaces to see the minted tokens? We're gonna extend our data with links whenever possible. At least we're gonna show you how to deal with the NFTs minted on [Paras](https://paras.id) and [Mintbase](https://mintbase.io).

## Paras와 Mintbase에서 발행된 NFT 링크 제작

At this moment we have an access to logs that follows NEP-171 standard. We definitely know that all the data we have at this moment are relevant for us, and we want to extend it with the links to that minted NFTs at least for those marketplaces we know.

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

### Mintbase 토큰 URL

And again we did the research for you:

```
https://www.mintbase.io/thing/[1]:[2]
```

Where:

- [1] - `meta_id` ( Mintbase의 `EventLogData.data`는 `meta_id`를 포함하는 문자열화된 JSON 배열입니다.)
- [2] - 컨트랙트 계정 주소 저장(기본적으로 Receipt의 수신자 ID)

Example:

```
https://www.mintbase.io/thing/70eES-icwSw9iPIkUluMHOV055pKTTgQgTiXtwy3Xus:vnartistsdao.mintbase1.near
```

Let's start crafting the links:

```python title=main.py
def format_paras_nfts(data, receipt_execution_outcome):
    links = []

    for data_element in data:
        for token_id in data_element.get("token_ids", []):
            first_part_of_token_id = token_id.split(":")[0]
            links.append(
                f"https://paras.id/token/{receipt_execution_outcome.receipt.receiver_id}::{first_part_of_token_id}/{token_id}"
            )

    return {"owner": data[0].get("owner_id"), "links": links}

def format_mintbase_nfts(data, receipt_execution_outcome):
    links = []
    for data_block in data:
        try:
            memo = json.loads(data_block.get("memo"))
        except json.JSONDecodeError:
            print(
                f"Receipt ID: `{receipt_execution_outcome.receipt.receipt_id}`\nMemo: `{memo}`\nError during parsing Mintbase memo from JSON string to dict"
            )
            return

        meta_id = memo.get("meta_id")
        links.append(
            f"https://www.mintbase.io/thing/{meta_id}:{receipt_execution_outcome.receipt.receiver_id}"
        )

    return {"owner": data[0].get("owner_id"), "links": links}
```

We're going to print the receipt_id, so you would be able to search for it on [NEAR Explorer](https://nearblocks.io), marketplace name and the list of links to the NFTs along with the owner account name.

```python title=main.py
if receipt_execution_outcome.receipt.receiver_id.endswith(
    ".paras.near"
):
    output = {
        "receipt_id": receipt_execution_outcome.receipt.receipt_id,
        "marketplace": "Paras",
        "nfts": format_paras_nfts(
            parsed_log["data"], receipt_execution_outcome
        ),
    }
```

A few words about what is going on here. If the Receipt's receiver account name ends with `.paras.near` (e.g. `x.paras.near`) we assume it's from Paras marketplace, so we are changing the corresponding variable.

Mintbase turn, we hope [Nate](https://twitter.com/nategeier) and his team have [migrated to NEAR Lake Framework](migrating-to-near-lake-framework.md) already, saying "Hi!" and crafting the link:

```python title=main.py
    elif re.search(
        ".mintbase\d+.near", receipt_execution_outcome.receipt.receiver_id
    ):
        output = {
            "receipt_id": receipt_execution_outcome.receipt.receipt_id,
            "marketplace": "Mintbase",
            "nfts": format_mintbase_nfts(
                parsed_log["data"], receipt_execution_outcome
            ),
        }
    else:
        continue
```

Almost the same story as with Paras, but a little bit more complex. The nature of Mintbase marketplace is that it's not a single marketplace! Every Mintbase user has their own store and a separate contract. And it looks like those contract addresses follow the same principle they end with `.mintbaseN.near` where `N` is number (e.g. `nate.mintbase1.near`).

After we have defined that the ExecutionOutcome receiver is from Mintbase we are doing the same stuff as with Paras:

1. `marketplace` 변수 변경
2. 소유자 및 제작된 링크가 포함된 NFT 목록 수집

And make it print the output to the terminal:

```python title=main.py
print(json.dumps(output, indent=4))
```

All together:

```python title=main.py
def format_paras_nfts(data, receipt_execution_outcome):
    links = []

    for data_element in data:
        for token_id in data_element.get("token_ids", []):
            first_part_of_token_id = token_id.split(":")[0]
            links.append(
                f"https://paras.id/token/{receipt_execution_outcome.receipt.receiver_id}::{first_part_of_token_id}/{token_id}"
            )

    return {"owner": data[0].get("owner_id"), "links": links}


def format_mintbase_nfts(data, receipt_execution_outcome):
    links = []
    for data_block in data:
        try:
            memo = json.loads(data_block.get("memo"))
        except json.JSONDecodeError:
            print(
                f"Receipt ID: `{receipt_execution_outcome.receipt.receipt_id}`\nMemo: `{memo}`\nError during parsing Mintbase memo from JSON string to dict"
            )
            return

        meta_id = memo.get("meta_id")
        links.append(
            f"https://www.mintbase.io/thing/{meta_id}:{receipt_execution_outcome.receipt.receiver_id}"
        )

    return {"owner": data[0].get("owner_id"), "links": links}


async def handle_streamer_message(streamer_message: near_primitives.StreamerMessage):
    for shard in streamer_message.shards:
        for receipt_execution_outcome in shard.receipt_execution_outcomes:
            for log in receipt_execution_outcome.execution_outcome.outcome.logs:
                if not log.startswith("EVENT_JSON:"):
                    continue
                try:
                    parsed_log = json.loads(log[len("EVENT_JSON:") :])
                except json.JSONDecodeError:
                    print(
                        f"Receipt ID: `{receipt_execution_outcome.receipt.receipt_id}`\nError during parsing logs from JSON string to dict"
                    )
                    continue

                if (
                    parsed_log.get("standard") != "nep171"
                    or parsed_log.get("event") != "nft_mint"
                ):
                    continue

                if receipt_execution_outcome.receipt.receiver_id.endswith(
                    ".paras.near"
                ):
                    output = {
                        "receipt_id": receipt_execution_outcome.receipt.receipt_id,
                        "marketplace": "Paras",
                        "nfts": format_paras_nfts(
                            parsed_log["data"], receipt_execution_outcome
                        ),
                    }
                elif re.search(
                    ".mintbase\d+.near", receipt_execution_outcome.receipt.receiver_id
                ):
                    output = {
                        "receipt_id": receipt_execution_outcome.receipt.receipt_id,
                        "marketplace": "Mintbase",
                        "nfts": format_mintbase_nfts(
                            parsed_log["data"], receipt_execution_outcome
                        ),
                    }
                else:
                    continue

                print(json.dumps(output, indent=4))
```

And not that's it. Run the indexer to watch for NFT minting and never miss a thing.

```bash
python3 main.py
```

:::note

Having troubles running the indexer? Please, check you haven't skipped the [Credentials](credentials.md) part :)

:::

Example output:

```
{
    "receipt_id": "8rMK8rxb3WmFcSfM3ahFoeeoBF92pad3tpsqKoSWurr2",
    "marketplace": "Mintbase",
    "nfts": {
        "owner": "vn-artists-dao.near",
        "links": [
            "https://www.mintbase.io/thing/aqdCBHB9_2XZY7pwXRRu5rGDeLQl7Q8KgNud1wKgnGo:vnartistsdao.mintbase1.near"
        ]
    }
}
{
    "receipt_id": "ArRh94Fe1LKF9yPrAdzrMozWoxMVQbEW2Z2Zf4fsSsce",
    "marketplace": "Paras",
    "nfts": {
        "owner": "eeaeb516e0945893ac01eaf547f499abdbd344831c5fcbefa1a5c0a9f303cc5c",
        "links": [
            "https://paras.id/token/x.paras.near::432714/432714:1"
        ]
    }
}
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

