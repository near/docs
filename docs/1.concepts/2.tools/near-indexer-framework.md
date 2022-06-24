---
id: near-indexer-framework
title: NEAR Indexer Framework
sidebar_label: NEAR Indexer Framework
---

> NEAR Indexer is a micro-framework, which provides you with a stream of blocks that are recorded on NEAR network. It is useful to handle real-time "events" on the chain.

---

## Rationale {#rationale}

As scaling dApps enter NEAR’s mainnet, an issue may arise: how do they quickly and efficiently access state from our deployed smart contracts, and cut out the cruft? Contracts may grow to have complex data structures and querying the network RPC may not be the optimal way to access state data. The NEAR Indexer Framework allows for streams to be captured and indexed in a customized manner. The typical use-case is for this data to make its way to a relational database. Seeing as this is custom per project, there is engineering work involved in using this framework.

NEAR Indexer is already in use for several new projects, namely, we index all the events for NEAR Blockchain Explorer, and we also dig into Access Keys and index all of them for NEAR Wallet passphrase recovery and multi-factor authentication. With NEAR Indexer you can do high-level aggregation as well as low-level introspection of all the events inside the blockchain.

We are going to build more Indexers in the future, and will also consider building Indexer integrations with streaming solutions like Kafka, RabbitMQ, ZeroMQ, and NoSQL databases. Feel free to join our [discussions](https://github.com/near/nearcore/discussions/categories/node-public-interfaces).

See the [example](https://github.com/near/nearcore/tree/master/tools/indexer/example) for further technical details. Or visit a tutorials on [how to create your indexer](/docs/tutorials/near-indexer)

## How to set up and test NEAR Indexer {#how-to-set-up-and-test-near-indexer}

Before you proceed, make sure you have the following software installed:

- [rustup](https://rustup.rs/) or Rust version that is mentioned in `rust-toolchain` file in the root of nearcore project.

### localnet {#localnet}

Clone [nearcore](https://github.com/near/nearcore)

To run the NEAR Indexer connected to a network we need to have configs and keys prepopulated. To generate configs for localnet do the following

```bash
$ git clone git@github.com:nearprotocol/nearcore.git
$ cd nearcore/tools/indexer/example
$ cargo run --release -- --home-dir ~/.near/localnet init
```

The above commands should initialize necessary configs and keys to run localnet in `~/.near/localnet`.

```bash
$ cargo run --release -- --home-dir ~/.near/localnet/ run
```

After the node is started, you should see logs of every block produced in your localnet. Get back to the code to implement any custom handling of the data flowing into the indexer.

Use [near-cli](https://github.com/near/near-cli) to submit transactions. For example, to create a new user you run the following command:

```
$ env NEAR_ENV=local near --keyPath ~/.near/localnet/validator_key.json create_account new-account.test.near --masterAccount test.near
```


### testnet / betanet {#testnet--betanet}

To run the NEAR Indexer connected to testnet or betanet we need to have configs and keys prepopulated, you can get them with the NEAR Indexer Example like above with a little change. Follow the instructions below to run non-validating node (leaving account ID empty).

```bash
$ cargo run --release -- --home-dir ~/.near/testnet init --chain-id testnet --download
```

The above code will download the official genesis config and generate necessary configs. You can replace `testnet` in the command above to different network ID `betanet`.

**NB!** `nearcore` doesn't fill `boot_nodes` in the generated config and doesn't have the way to pass it through command. See [corresponding issue](https://github.com/near/nearcore/issues/3156). For now we need to download a config file with filled necessary fields manually:
 - [testnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json)
 - [betanet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/betanet/config.json)
 - [mainnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json)

Replace `config.json` in your `--home-dir` (e.g. `~/.near/testnet/config.json`) with downloaded one.

Configs for the specified network are in the `--home-dir` provided folder. We need to ensure that NEAR Indexer follows all the necessary shards, so `"tracked_shards"` parameters in `~/.near/testnet/config.json` needs to be configured properly. For example, with a single-sharded network, you just add the shard #0 to the list:

```
...
"tracked_shards": [0],
...
```

Hint: See the Tweaks section below to learn more about further configuration options.

After that we can run NEAR Indexer.


```bash
$ cargo run --release -- --home-dir ~/.near/testnet run
```

After the network is synced, you should see logs of every block produced in Testnet. Get back to the code to implement any custom handling of the data flowing into the indexer.

## Tweaks {#tweaks}

By default, nearcore is configured to do as little work as possible while still operating on an up-to-date state. Indexers may have different requirements, so there is no solution that would work for everyone, and thus we are going to provide you with the set of knobs you can tune for your requirements.

As already has been mentioned in this README, the most common tweak you need to apply is listing all the shards you want to index data from; to do that, you should ensure that `"tracked_shards"` in the `config.json` lists all the shard IDs, e.g. for the current betanet and testnet, which have a single shard:

```
...
"tracked_shards": [0],
...
```


You can choose Indexer Framework sync mode by setting what to stream:
 - `LatestSynced` - Real-time syncing, always taking the latest finalized block to stream
 - `FromInterruption` - Starts syncing from the block NEAR Indexer was interrupted last time
 - `BlockHeight(u64)` - Specific block height to start syncing from

 Refer to `main()` function in [Indexer Example](https://github.com/near/nearcore/blob/master/tools/indexer/example/src/main.rs)

 You need to choose Indexer Framework streaming mode by providing `AwaitForNodeSyncedEnum` to the `IndexerConfig` in order to start indexer. Possible options are:
- `WaitForFullSync` - The node will wait for syncing process to complete before it start streaming
- `StreamWhileSyncing` - The node will stream the data once it is available on the node (useful in case of archival node to make indexer working while your node is syncing)

Indexer Framework also exposes access to the internal APIs (see `Indexer::client_actors` method), so you can fetch data about any block, transaction, etc, yet by default, nearcore is configured to remove old data (garbage collection [[GC](/concepts/basics/epoch)]), so querying the data that was observed a more than 5 epochs before may return an error saying that the data is not found. If you only need blocks streaming, you don't need this tweak, but if you need access to the historical data right from your Indexer, consider updating `"archive"` setting in `config.json` to `true`:

```
...
"archive": true,
...
```

Please, see [Syncing] section to speed up the process of getting NEAR Indexer working.

## Syncing {#syncing}

Whenever you run NEAR Indexer for any network except localnet you'll need to sync with the network. This is required because it's a natural behavior of [nearcore](https://github.com/near/nearcore) node and NEAR Indexer is a wrapper for the regular `nearcore` node. In order to work and index the data your node must be synced (have the data all other nodes have) with the network. This process can take a while, so we suggest to download a fresh backup of the `data` folder and put it in you `--home-dir` of your choice (by default it is `~/.near`)

Running your NEAR Indexer node on top of a backup data will reduce the time of syncing process because your node will download only a missing data and it will take reasonable time.

All the backups can be downloaded from the public S3 bucket which contains latest daily snapshots. Please download on the [Node Data Snapshots](https://near-nodes.io/intro/node-data-snapshots).

## Running NEAR Indexer as archival node {#running-near-indexer-as-archival-node}

It's not necessary but in order to index everything in the network it is better to do it from the genesis. `nearcore` node is running in non-archival mode by default. That means that the node keeps data only for [5 last epochs](/concepts/basics/epoch). In order to index data from the genesis we need to turn the node in archival mode.

To do it we need to update `config.json` located in `--home-dir` of your choice (by default it is `~/.near`).

Find next keys in the config and update them as following:

```json
{
  ...
  "archive": true,
  "tracked_shards": [0],
  ...
}
```

The syncing process in archival mode can take a lot of time, so it's better to download a backup provided by NEAR and put it in your `data` folder. After that your node will need to sync only missing data and it should take reasonable time.

All the backups can be downloaded from the public S3 bucket which contains latest daily snapshots. Please download on the [Node Data Snapshots](https://near-nodes.io/intro/node-data-snapshots).

See [Running an archival node](/docs/roles/integrator/exchange-integration#running-an-archival-node) for reference


## Creating your indexer {#creating-your-indexer}

As you see NEAR Indexer Framework is a tool, it's not an indexer itself. It is used to create your own indexer. You can find some tutorials about it in the docs:
- [Creating example indexer](/docs/tutorials/near-indexer)


## Who is using NEAR Indexer? {#who-is-using-near-indexer}

*This list is not exhaustive, feel free to submit your project by sending a pull request.*

- [Flux Capacitor](https://github.com/fluxprotocol/flux-capacitor)
- [Indexer for NEAR Explorer](https://github.com/near/near-indexer-for-explorer)
- [Indexer for NEAR Wallet](https://github.com/near/near-indexer-for-wallet)
