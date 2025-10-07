---
id: listen-to-realtime-events
title: Listen to Realtime Events
description: "This tutorial will guide you through building an indexer using the NEAR Indexer Framework. The indexer will listen for FunctionCalls on a specific contract and log the details of each call."
---

import {Github} from "@site/src/components/UI/Codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this tutorial, we will build an indexer using the NEAR Indexer Framework. The indexer will listen realtime events from NEAR blockchain for FunctionCalls on a specific contract and log the details of each call.

To get our indexer up and running we will need two steps:

1. To [initialize](#initialization) the indexer
2. To [start it](#run)

The full source code for the indexer is available in the [GitHub repository](https://github.com/near-examples/near-indexer?tab=readme-ov-file).

---

## Initialization

In order for our indexer to process blocks it needs to join the NEAR network as a node. To do that, we need first to initialize it, which will download the blockchain `genesis` config, and create a `key` for our node to communicate with other nodes:

<Tabs groupId="code-tabs">
    <TabItem value="localnet" label="Localnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/localnet init
      ```
    </TabItem>
    <TabItem value="testnet" label="Testnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/testnet init --chain-id testnet --download-config rpc --download-genesis
      ```
    </TabItem>
    <TabItem value="mainnet" label="Mainnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/mainnet init --chain-id mainnet --download-config rpc --download-genesis
      ```
    </TabItem>
</Tabs>

Depending on the network we want to connect, the keys will be created in different folders (`~/.near/<network>`).

#### Config File

A configuration file (`~/.near/<network>/config.json`) is created automatically, whoever, it is recommended to replace with one of the following ones, intended for RPC nodes:

- [testnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/rpc/config.json)
- [mainnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/rpc/config.json)

:::note Configuration Options

See the [Custom Configuration](#custom-configuration) section below to learn more about further configuration options.

---

## Starting the Indexer

After we finish initializing the indexer, and configuring it, we can start it by running the following command:

<Tabs groupId="code-tabs">
    <TabItem value="localnet" label="Localnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/localnet run
      ```
    </TabItem>
    <TabItem value="testnet" label="Testnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/testnet run
      ```
    </TabItem>
    <TabItem value="mainnet" label="Mainnet" default>
      ```bash
        cargo run --release -- --home-dir ~/.near/mainnet run
      ```
    </TabItem>
</Tabs>

---

## Parsing the Block Data

From the block data, we can access the transactions, their receipts and actions. In this example, we will look for FunctionCall actions on a specific contract and log the details of each call.

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/near-indexer/blob/main/src/main.rs"
        start="57" end="290" />

---

## Custom Configuration

By default, nearcore is configured to do as little work as possible while still operating on an up-to-date state. Indexers may have different requirements, so you might need to tweak the configuration based on yours.

### Shards/Accounts to Track

We need to ensure that NEAR Indexer follows all the necessary shards, so by default the `"tracked_shards_config"` is set to `"AllShards"`. The most common tweak you might need to apply is listing to specific shards; to do that, lists all the shard UIDs you want to track in the `"tracked_shards_config"` section:

```json
...
"tracked_shards_config": {
       "Shards": [
              "s3.v3",
              "s4.v3"
       ]
},
...
```
Or, if you want to track specific accounts:

```json
...
"tracked_shards_config": {
       "Accounts": [
              "account_a",
              "account_b"
       ]
},
...
```

<hr class="subsection" />

### Sync Mode
You can choose Indexer Framework sync mode by setting what to stream:

- LatestSynced - Real-time syncing, always taking the latest finalized block to stream
- FromInterruption - Starts syncing from the block NEAR Indexer was interrupted last time
- BlockHeight(u64) - Specific block height to start syncing from.

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/near-indexer/blob/main/src/main.rs"
        start="268" end="268" />

<hr class="subsection" />

### Historical Data

Indexer Framework also exposes access to the internal APIs (see Indexer::client_actors method), so you can fetch data about any block, transaction, etc, yet by default, nearcore is configured to remove old data (garbage collection), so querying the data that was observed a few epochs before may return an error saying that the data is not found. If you only need blocks streaming, you don't need this tweak, but if you need access to the historical data right from your Indexer, consider updating "archive" setting in config.json to true:

```json
...
"archive": true,
...
```

<MovingForwardSupportSection />