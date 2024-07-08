---
sidebar_label: "Python tutorial"
---

# NEAR Lake indexer basic tutorial


:::info Source code for the tutorial

[`frolvanya/near-lake-raw-printer`](https://github.com/frolvanya/near-lake-raw-printer): source code for the tutorial on how to create an indexer that prints block height and number of shards

:::

Recently we have [published a Python version of the NEAR Lake Framework](https://pypi.org/project/near-lake-framework/) on pypi.org

We want to empower you with a basic tutorial on how to use the Python Package. Let's get started!


## Create a project

Create an indexer project:

```bash
mkdir near-lake-raw-printer && cd near-lake-raw-printer
touch main.py
```

## Install dependencies

Install `near-lake-framework`

```bash
pip3 install near-lake-framework
```

## Import `near-lake-framework`

In the `main.py` file let's import the necessary dependencies:

```python title=main.py
from near_lake_framework import near_primitives, LakeConfig, streamer
```

We've imported the main function `streamer`, which will be called to actually run the indexer, `near_primitives`, and `LakeConfig` type we need to construct.

## Create a config

Add the instantiation of `LakeConfig` below:

```python title=main.py
config = LakeConfig.mainnet()
config.start_block_height = 69030747
config.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
config.aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
```

Just a few words on the config, function `mainnet()` has set `s3_bucket_name`, `s3_region_name` for mainnet.
You can go to [NEAR Explorer](https://nearblocks.io) and get **the most recent** block height to set `config.start_block_height`.

## Starting the stream

Let's call `streamer` function with the `config`:

```python title=main.py
stream_handle, streamer_messages_queue = streamer(config)
while True:
    streamer_message = await streamer_messages_queue.get()
    print(f"Block #{streamer_message.block.header.height} Shards: {len(streamer_message.shards)}")
```

And an actual start of our indexer in the end of the `main.py`

```python title=main.py
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

## All together

```python title=main.py
import asyncio
import os

from near_lake_framework import LakeConfig, streamer, near_primitives

async def main():    
    config = LakeConfig.mainnet()
    config.start_block_height = 69030747
    config.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
    config.aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")

    stream_handle, streamer_messages_queue = streamer(config)
    while True:
        streamer_message = await streamer_messages_queue.get()
        print(f"Block #{streamer_message.block.header.height} Shards: {len(streamer_message.shards)}")

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

That's it. Now we run `main.py`

```bash
python3 main.py
```

You should see something like the following:

```bash
Received 400 blocks from S3
Block #69030747 Shards: 4
Block #69030748 Shards: 4
Block #69030749 Shards: 4
Block #69030750 Shards: 4
Block #69030751 Shards: 4
Block #69030752 Shards: 4
Block #69030753 Shards: 4
Block #69030754 Shards: 4
```

You can stop the indexer by pressing CTRL+C

:::danger Credentials

To be able to access the data from [NEAR Lake](/build/data-infrastructure/lake-framework/near-lake) you need to provide credentials. Please, see the [Credentials](../../lake-framework/running-near-lake/credentials.md) article

:::

You can find the [source code for this tutorial on the GitHub](https://github.com/frolvanya/near-lake-raw-printer).
