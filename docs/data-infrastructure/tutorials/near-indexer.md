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

The full source code for the indexer is available in the [GitHub repository](https://github.com/near-examples/near-indexer?tab=readme-ov-file).

---

## Initialization

To run the NEAR Indexer connected to a network we need to have node configs and keys prepopulated. Navigate to the directory where you cloned the example and run the following command to initialize the configuration for the desired network:

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

The above command should initialize necessary configs and keys to run `localnet/testnet/mainnet` in `~/.near/(localnet|testnet|mainnet)`.

The main configuration file for the node is `config.json`.

The above code will download the official genesis and config. The recommended config is accessible at:

- [testnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/rpc/config.json)
- [mainnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/rpc/config.json)

This configuration is intended for RPC nodes. Any extra settings required for the indexer should be manually added to the configuration file config.json in your --home-dir (e.g. ~/.near/testnet/config.json).

Configs for the specified network are in the --home-dir provided folder. We need to ensure that NEAR Indexer follows all the necessary shards, so set "tracked_shards_config": "AllShards" parameters in ~/.near/testnet/config.json. Hint: See the Tweaks section below to learn more about further configuration options.

After that we can run NEAR Indexer.

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

## Custom Settings

By default, nearcore is configured to do as little work as possible while still operating on an up-to-date state. Indexers may have different requirements, so there is no solution that would work for everyone, and thus we are going to provide you with the set of knobs you can tune for your requirements.

### Shards/Accounts to Track
As already has been mentioned above, the most common tweak you need to apply is listing all the shards you want to index data from; to do that, you should ensure that "tracked_shards_config" in the config.json lists all the shard UIDs:

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

## Parsing the Block Data

From the block data, we can access the transactions, their receipts and actions. In this example, we will look for FunctionCall actions on a specific contract and log the details of each call.

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/near-indexer/blob/main/src/main.rs"
        start="57" end="290" />

<MovingForwardSupportSection />