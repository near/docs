---
id: run-archival-node-without-nearup
title: Run an Archival Node (without nearup)
sidebar_label: Run a Node (without nearup)
description: How to run an Archival Node without nearup
---

The following instructions are applicable across localnet, testnet, and mainnet. Note: We do not use nearup on mainnet.

If you are looking to learn how to compile and run a NEAR Archival node natively for one of the following networks, this guide is for you.

- [`testnet`](/docs/develop/node/archival/run-archival-node-without-nearup#testnet)
- [`mainnet`](/docs/develop/node/archival/run-archival-node-without-nearup#mainnet)


<blockquote class="info">
<strong>Heads up</strong><br /><br />

Running an archival node is very similar to running a [validator node](/docs/develop/node/validator/running-a-node) as both types of node use the same `nearcore` release. The main difference for running an archival node is a modification to the `config.json` by changing `archive` to `true`. See below for more details.

</blockquote>


## Prerequisites {#prerequisites}

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
    $ apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm cargo
    ```
---

### Choosing your `nearcore` version {#choosing-your-nearcore-version}

When building your NEAR node you will have two branch options to choose from depending on your desired use:

- `master` : _(**Experimental**)_
  - Use this if you want to play around with the latest code and experiment. This branch is not guaranteed to be in a fully working state and there is absolutely no guarantee it will be compatible with the current state of *mainnet* or *testnet*.
- [`Latest stable release`](https://github.com/near/nearcore/tags) : _(**Stable**)_
  - Use this if you want to run a NEAR node for *mainnet*. For *mainnet*, please use the latest stable release. This version is used by mainnet validators and other nodes and is fully compatible with the current state of *mainnet*.
- [`Latest release candidates`](https://github.com/near/nearcore/tags) : _(**Release Candidates**)_
  - Use this if you want to run a NEAR node for *tesnet*. For *testnet*, we first release a RC version and then later make that release stable. For testnet, please run the latest RC version.


## `testnet` {#testnet}

### 1. Clone `nearcore` project from GitHub {#1-clone-nearcore-project-from-github}

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ cd nearcore
$ git fetch origin --tags
```

Checkout to the branch you need if not `master` (default). Latest release is recommended. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases).

```bash
$ git checkout tags/1.23.0 -b mynode
```

### 2. Compile `nearcore` binary {#2-compile-nearcore-binary}

In the `nearcore` folder run the following commands:

```bash
$ make release
```

This will start the compilation process. It will take some time
depending on your machine power (e.g. i9 8-core CPU, 32 GB RAM, SSD
takes approximately 25 minutes). Note that compilation will need over
1 GB of memory per virtual core the machine has. If the build fails
with processes being killed, you might want to try reducing number of
parallel jobs, for example: `CARGO_BUILD_JOBS=8 make release`.

By the way, if you’re familiar with Cargo, you could wonder why not
run `cargo build -p neard --release` instead.  While this will produce
a binary, the result will be a less optimized version.  On technical
level, this is because building via `make neard` enables link-time
optimisation which is disabled by default.

The binary path is `target/release/neard`

### 3. Initialize working directory {#3-initialize-working-directory}

The NEAR node requires a working directory with a couple of configuration files. Generate the initial required working directory by running:

```bash
$ ./target/release/neard --home ~/.near init --chain-id testnet --download-genesis --download-config
```

> You can specify trusted boot nodes that you'd like to use by pass in a flag during init: `--boot-nodes ed25519:4k9csx6zMiXy4waUvRMPTkEtAS2RFKLVScocR5HwN53P@34.73.25.182:24567,ed25519:4keFArc3M4SE1debUQWi3F1jiuFZSWThgVuA2Ja2p3Jv@34.94.158.10:24567,ed25519:D2t1KTLJuwKDhbcD9tMXcXaydMNykA99Cedz7SkJkdj2@35.234.138.23:24567,ed25519:CAzhtaUPrxCuwJoFzceebiThD9wBofzqqEMCiupZ4M3E@34.94.177.51:24567`

> You can skip the `--home` argument if you are fine with the default working directory in `~/.near`. If not, pass your preferred location.

This command will create the required directory structure and will generate `config.json`, `node_key.json`, and `genesis.json` for `testnet` network.
- `config.json` - Configuration parameters which are responsive for how the node will work.
- `genesis.json` - A file with all the data the network started with at genesis. This contains initial accounts, contracts, access keys, and other records which represents the initial state of the blockchain.
- `node_key.json` -  A file which contains a public and private key for the node. Also includes an optional `account_id` parameter which is required to run a validator node (not covered in this doc).
- `data/` -  A folder in which a NEAR node will write it's state.

> **Heads up**
> The genesis file for `testnet` is big (6GB +) so this command will be running for a while and no progress will be shown.


### 4. Replacing the `config.json` {#4-replacing-the-configjson}

From the generated `config.json`, there two parameters to modify:
- `boot_nodes`: If you had not specify the boot nodes to use during init in Step 3, the generated `config.json` shows an empty array, so we will need to replace it with a full one specifying the boot nodes.
- `tracked_shards`: In the generated `config.json`, this field is an empty empty. You will have to replace it to `"tracked_shards": [0]`

To replace the `config.json`, run the following commands:

```bash
$ rm ~/.near/config.json
$ wget https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json -P ~/.near/
```

### Configuration Update {#configuration-update}

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have 4 shards. To track all 4 shards, use `"tracked_shards": [0]`. In the future, there will be the possibility to track different or multiple shards.

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


### 5. Get data backup {#5-get-data-backup}

The node is ready to be started. However, you must first sync up with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading backups in one of two ways:

1. Download and untar on the fly

```
mkdir -p ~/.near/data && cd ~/.near/data
wget -c  https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/archive/data.tar -O - | tar -xf -
```

2. Download first and untar locally

```
$ wget https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/archive/data.tar -P ~/.near/
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run the node {#6-run-the-node}
To start your node simply run the following command:

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console. It will download a bit of missing data since the last backup was performed but it shouldn't take much time.


## `mainnet` {#mainnet}

### 1. Clone `nearcore` project from GitHub {#1-clone-nearcore-project-from-github-1}

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ cd nearcore
$ git fetch origin --tags
```

Next, checkout the release branch you need (recommended) if you will not be using the default `master` branch. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases) for the latest release.

For more information on choosing between `master` and latest release branch [ [click here](/docs/develop/node/validator/compile-and-run-a-node#choosing-your-nearcore-version) ].

```bash
$ git checkout tags/1.22.0 -b mynode
```

### 2. Compile `nearcore` binary {#2-compile-nearcore-binary-1}

In the `nearcore` folder run the following commands:

```bash
$ make release
```

This will start the compilation process. It will take some time
depending on your machine power (e.g. i9 8-core CPU, 32 GB RAM, SSD
takes approximately 25 minutes). Note that compilation will need over
1 GB of memory per virtual core the machine has. If the build fails
with processes being killed, you might want to try reducing number of
parallel jobs, for example: `CARGO_BUILD_JOBS=8 make release`.

By the way, if you’re familiar with Cargo, you could wonder why not
run `cargo build -p neard --release` instead.  While this will produce
a binary, the result will be a less optimized version.  On technical
level, this is because building via `make neard` enables link-time
optimisation which is disabled by default.

The binary path is `target/release/neard`

### 3. Initialize working directory {#3-initialize-working-directory-1}

The NEAR node requires a working directory with a couple of configuration files. Generate the initial required working directory by running:

```bash
$ ./target/release/neard --home ~/.near init --chain-id mainnet --download-genesis --download-config
```

> You can specify trusted boot nodes that you'd like to use by pass in a flag during init: `--boot-nodes ed25519:86EtEy7epneKyrcJwSWP7zsisTkfDRH5CFVszt4qiQYw@35.195.32.249:24567,ed25519:BFB78VTDBBfCY4jCP99zWxhXUcFAZqR22oSx2KEr8UM1@35.229.222.235:24567,ed25519:Cw1YyiX9cybvz3yZcbYdG7oDV6D7Eihdfc8eM1e1KKoh@35.195.27.104:24567,ed25519:33g3PZRdDvzdRpRpFRZLyscJdbMxUA3j3Rf2ktSYwwF8@34.94.132.112:24567,ed25519:CDQFcD9bHUWdc31rDfRi4ZrJczxg8derCzybcac142tK@35.196.209.192:24567`

> You can skip the `--home` argument if you are fine with the default working directory in `~/.near`. If not, pass your preferred location.

This command will create the required directory structure by generating a `config.json`, `node_key.json`, and downloads a `genesis.json` for `mainnet`.
- `config.json` - Configuration parameters which are responsive for how the node will work.
- `genesis.json` - A file with all the data the network started with at genesis. This contains initial accounts, contracts, access keys, and other records which represents the initial state of the blockchain.
- `node_key.json` -  A file which contains a public and private key for the node. Also includes an optional `account_id` parameter which is required to run a validator node (not covered in this doc).
- `data/` -  A folder in which a NEAR node will write it's state.

### 4. Replacing the `config.json` {#4-replacing-the-configjson-1}

From the generated `config.json`, there two parameters to modify:
- `boot_nodes`: If you had not specify the boot nodes to use during init in Step 3, the generated `config.json` shows an empty array, so we will need to replace it with a full one specifying the boot nodes.
- `tracked_shards`: In the generated `config.json`, this field is an empty empty. You will have to replace it to `"tracked_shards": [0]`

To replace the `config.json`, run the following commands:

```bash
$ rm ~/.near/config.json
$ wget https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json -P ~/.near/
```

### Configuration Update {#configuration-update-1}

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have 4 shards. To track all 4 shards, use `"tracked_shards": [0]`. In the future, there will be the possibility to track different or multiple shards.

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


### 5. Get data backup {#5-get-data-backup-1}

The node is ready to be started. However, you must first sync up with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading backups in one of two ways:

1. Download and untar on the fly

```
mkdir -p ~/.near/data && cd ~/.near/data
wget -c  https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/archive/data.tar -O - | tar -xf -
```

2. Download first and untar locally

```
$ wget https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/archive/data.tar -P ~/.near/
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run the node {#6-run-the-node-1}
To start your node simply run the following command:

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running and you can see log outputs in your console. It will download a bit of missing data since the last backup was performed but it shouldn't take much time.


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
