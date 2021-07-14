---
id: run-archival-node-without-nearup
title: Run an Archival Node without nearup
sidebar_label: Run a Node without nearup
description: How to run an Archival Node without nearup
---

<blockquote class="info">
<strong>Heads up</strong><br><br>

Running an archival node is very similar to running a [validator node](/docs/develop/node/validator/running-a-node) as both types of node use the same `nearcore` release. The main difference for running an archival node is a modification to the `config.json` by changing `archive` to `true`. See below for more details.

</blockquote>


## Prerequisites

- [Rust](https://www.rust-lang.org/). If not already installed, please [follow these instructions](https://docs.near.org/docs/tutorials/contracts/intro-to-rust#3-step-rust-installation).
- [Git](https://git-scm.com/)
- Installed developer tools:
  - MacOS
    ```bash
    $ brew install cmake protobuf clang llvm
    ```
  - Linux
    ```bash
    $ apt update
    $ apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
    ```
---

### Choosing your `nearcore` version

When building your NEAR node you will have two branch options to choose from depending on your desired use:

- `master` : _(**Experimental**)_
  - Use this if you want to play around with the latest code and experiment. This branch is not guaranteed to be in a fully working state and there is absolutely no guarantee it will be compatible with the current state of *mainnet* or *testnet*.
- [`Latest stable release`](https://github.com/near/nearcore/tags) : _(**Stable**)_
  - Use this if you want to run a NEAR node for *mainnet*. For *mainnet*, please use the latest stable release. This version is used by mainnet validators and other nodes and is fully compatible with the current state of *mainnet*.
- [`Latest release candidates`](https://github.com/near/nearcore/tags) : _(**Release Candidates**)_
  - Use this if you want to run a NEAR node for *tesnet*. For *testnet*, we first release a RC version and then later make that release stable. For testnet, please run the latest RC version.


## `testnet`

### 1. Clone `nearcore` project from GitHub

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ git fetch origin --tags
```

Checkout to the branch you need if not `master` (default). Latest release is recommended. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases).

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile `nearcore` binary

In the `nearcore` folder run the following commands:

```bash
$ make release
```

This will start the compilation process. It will take some time depending on your machine power _(e.g. i9 8-core CPU, 32 GB RAM, SSD takes approximately 25 minutes)_

By the way, if you’re familiar with Cargo, you could wonder why not
run `cargo build -p neard --release` instead.  While this will produce
a binary, the result will be a less optimised version.  On technical
level, this is because building via `make neard` enables link-time
optimisation which is disabled by default.

The binary path is `target/release/neard`

### 3. Initialize working directory

In order to work properly, the NEAR node requires a working directory and a couple of configuration files.

- `config.json` - Configuration parameters which are responsive for how the node will work.
- `genesis.json` - A file with all the data the network started with at genesis. This contains initial accounts, contracts, access keys, and other records which represents the initial state of the blockchain.
- `node_key.json` -  A file which contains a public and private key for the node. Also includes an optional `account_id` parameter which is required to run a validator node (not covered in this doc).
- `data/` -  A folder in which a NEAR node will write it's state.

Generate the initial required working directory by running:

```bash
$ ./target/release/neard --home ~/.near init --chain-id testnet --download
```

> You can skip the `--home` argument if you are fine with the default working directory in `~/.near`. If not, pass your preferred location.

This command will create the required directory structure and will generate `config.json`, `node_key.json`, and `genesis.json` for `testnet` network.

> **Heads up**
> The genesis file for `testnet` is big (6GB +) so this command will be running for a while and no progress will be shown.


### 4. Replacing the `config.json`

The generated `config.json` will be missing a `boot_nodes` parameter (it is empty) so we will need to replace it with a full one. You can do this one of two ways:

1. Download `config.json` [here](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json) and replace it in your working dir (`~/.near/config.json`).

or

2. Run the following commands:

```bash
$ rm ~/.near/config.json
$ wget https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json -P ~/.near/
```

### Configuration Update

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have only 1 (indexed [0]) shard and that shard is tracked. In the future, there will be the possibility to track different or multiple shards.

```
{
  ...
  "archive": true,
  "tracked_shards": [0],
  ...
}
```

Please make sure that the node is not running while changing the `config.json`.

Once the config has been changed, you can restart the node and the node will start syncing new archival data. In the case where you want the full archival history, you can delete the data dir and start the node from scratch syncing full history or use one of the latest backups containing the data directory snapshot which can be copied under the near home dir (default: ~/.near/data).


### 5. Get data backup

The node is ready to be started however you must first sync up with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading backups in one of two ways by downloading the latest archival data backup from a public S3 bucket.

| Network | URL                                                                                         |
| ------- | ------------------------------------------------------------------------------------------- |
| testnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/archive/data.tar |


1. Download and unpack the [tar file](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar) to `~/.near`.

or

2. Run the following commands:

```bash
$ wget https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar -P ~/.near/
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run the node
To start your node simply run the following command:

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console. It will download a bit of missing data since the last backup was performed but it shouldn't take much time.


## `mainnet`

### 1. Clone `nearcore` project from GitHub

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ git fetch origin --tags
```

Next, checkout the release branch you need (recommended) if you will not be using the default `master` branch. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases) for the latest release.

For more information on choosing between `master` and latest release branch [ [click here](/docs/develop/node/validator/compile-and-run-a-node#choosing-your-nearcore-version) ].

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile `nearcore` binary

In the `nearcore` folder run the following commands:

```bash
$ make release
```

This will start the compilation process and will take some time depending on your machine's CPU power. _(e.g. i9 8-core CPU, 32 GB RAM, SSD takes approximately 25 minutes)_

By the way, if you’re familiar with Cargo, you could wonder why not
run `cargo build -p neard --release` instead.  While this will produce
a binary, the result will be a less optimised version.  On technical
level, this is because building via `make neard` enables link-time
optimisation which is disabled by default.

The binary path is `target/release/neard`

### 3. Initialize working directory

In order to work NEAR node requires to have working directory and a couple of configuration files.

- `config.json` - Configuration parameters which are responsive for how the node will work.
- `genesis.json` - A file with all the data the network started with at genesis. This contains initial accounts, contracts, access keys, and other records which represents the initial state of the blockchain.
- `node_key.json` -  A file which contains a public and private key for the node. Also includes an optional `account_id` parameter which is required to run a validator node (not covered in this doc).
- `data/` -  A folder in which a NEAR node will write it's state.

Generate the initial required working directory by running:

```bash
$ ./target/release/neard --home ~/.near init --chain-id mainnet --download
```

> You can skip the `--home` argument if you are fine with the default working directory in `~/.near`. If not, pass your preferred location.

This command will create the required directory structure by generating a `config.json`, `node_key.json`, and downloads a `genesis.json` for `mainnet`.


### 4. Replacing the `config.json`

The generated `config.json` will be missing a `boot_nodes` parameter (it is empty) so we will need to replace it with a full one. You can do this one of two ways:

1. Download `config.json` [here](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json) and replace it in your working dir (`~/.near/config.json`).

or

2. Run the following commands:

```bash
$ rm ~/.near/config.json
$ wget https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json -P ~/.near/
```

### Configuration Update

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have only 1 (indexed [0]) shard and that shard is tracked. In the future, there will be the possibility to track different or multiple shards.

```
{
  ...
  "archive": true,
  "tracked_shards": [0],
  ...
}
```

Please make sure that the node is not running while changing the `config.json`.

Once the config has been changed, you can restart the node and the node will start syncing new archival data. In the case where you want the full archival history, you can delete the data dir and start the node from scratch syncing full history or use one of the latest backups containing the data directory snapshot which can be copied under the near home dir (default: ~/.near/data).


### 5. Get data backup

The node is ready to be started however you must first sync up with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading backups in one of two ways by downloading the latest archival data backup from a public S3 bucket.

| Network | URL                                                                                         |
| ------- | ------------------------------------------------------------------------------------------- |
| mainnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/archive/data.tar |


1. Download and unpack the [tar file](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar) to `~/.near`.

or

2. Run the following commands:

```bash
$ wget https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar -P ~/.near/
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run the node
To start your node simply run the following command:

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running and you can see log outputs in your console. It will download a bit of missing data since the last backup was performed but it shouldn't take much time.


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
