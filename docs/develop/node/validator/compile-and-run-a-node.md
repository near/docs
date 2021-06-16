---
id: compile-and-run-a-node
title: Compile and Run without Container
sidebar_label: Compile and Run without Container
description: Compile and Run a NEAR Node without Container in localnet, testnet, and mainnet
---

This doc is written for developers, sysadmins, DevOps, or curious people who want to know how to compile and run a regular NEAR validator node natively (without containerization) for one of the following networks:

- [`localnet`](/docs/develop/node/validator/compile-and-run-a-node#localnet)
- [`testnet`](/docs/develop/node/validator/compile-and-run-a-node#testnet)
- [`mainnet`](/docs/develop/node/validator/compile-and-run-a-node#mainnet)

## Prerequisites

- [Rust](https://www.rust-lang.org/). If not already installed, please [follow these instructions](/docs/tutorials/contracts/intro-to-rust#3-step-rust-installation).
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

## How to use this document

This document is separated into sections by network ID. Although all of the sections have almost the exact same steps/text, we found it more helpful to create individual sections so you can easily copy-paste commands to quickly get your node running.

### Choosing your `nearcore` version

When building your NEAR node you will have two branch options to choose from depending on your desired use:

- `master` : _(**Experimental**)_
  - Use this if you want to play around with the latest code and experiment. This branch is not guaranteed to be in a fully working state and there is absolutely no guarantee it will be compatible with the current state of *mainnet* or *testnet*.
- [`Latest release branch`](https://github.com/near/nearcore/releases) : _(**Stable**)_
  - Use this if you want to run a NEAR node for *mainnet* or *tesnet*. This version is used by validators and other nodes and is fully compatible with the current state of *mainnet* or *testnet*.

## `localnet`

### 1. Clone `nearcore` project from GitHub

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ cd nearcore
```

Next, checkout the release branch you need if you will not be using the default `master` branch. [ [More info](/docs/develop/node/validator/compile-and-run-a-node#choosing-your-nearcore-version) ]

```bash
$ git checkout master
```

### 2. Compile `nearcore` binary

In the `nearcore` folder run the following commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process. It will take some time depending on your machine's cpu power. _(e.g. i9 8-core CPU, 32 GB RAM, SSD takes approximately 25 minutes)_

The binary path is `nearcore/target/release/neard`

### 3. Initialize working directory

In order to work properly, the NEAR node requires a working directory and a couple of configuration files.

- `config.json` - Configuration parameters which are responsive for how the node will work.
- `genesis.json` - A file with all the data the network started with at genesis. This contains initial accounts, contracts, access keys, and other records which represents the initial state of the blockchain.
- `node_key.json` -  A file which contains a public and private key for the node. Also includes an optional `account_id` parameter which is required to run a validator node (not covered in this doc).
- `data/` -  A folder in which a NEAR node will write its state.
- `validator_key.json` - A file which contains a public and private key for local `test.near` account which belongs to the only local network validator.

Generate the initial required working directory by running:

```bash
$ ./target/release/neard --home ~/.near init --chain-id localnet
```

> You can skip the `--home` argument if you are fine with the default working directory in `~/.near`. If not, pass your preferred location.

This command will create the required directory structure and will generate `config.json`, `node_key.json`, `validator_key.json`, and `genesis.json` for `localnet` network.

### 4. Run the node

To run your node, simply run the following command:

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console.


## `testnet`

### 1. Clone `nearcore` project from GitHub

First, clone the [`nearcore` repository](https://github.com/near/nearcore).

```bash
$ git clone https://github.com/near/nearcore
$ git fetch origin --tags
$ cd nearcore
```

Checkout to the branch you need if not `master` (default). Latest release is recommended. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases). Current latest is `1.19.0`

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile `nearcore` binary

In the `nearcore` folder run the following commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process. It will take some time depending on your machine power _(e.g. i9 8-core CPU, 32 GB RAM, SSD takes approximately 25 minutes)_

The binary path is `nearcore/target/release/neard`

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
$ wget ~/.near/config.json https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json
```

### 5. Get data backup

The node is ready to be started however you must first sync up with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading backups in one of two ways:

1. Download and unpack the [tar file](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar) to `~/.near`.

or

2. Run the following commands:

```bash
$ wget ~/.near/data.tar https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar
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
$ cd nearcore
```

Next, checkout the release branch you need (recommended) if you will not be using the default `master` branch. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases) for the latest release.

For more information on choosing between `master` and latest release branch [ [click here](/docs/develop/node/validator/compile-and-run-a-node#choosing-your-nearcore-version) ].

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile `nearcore` binary

In the `nearcore` folder run the following commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process and will take some time depending on your machine's CPU power. _(e.g. i9 8-core CPU, 32 GB RAM, SSD takes approximately 25 minutes)_

The binary path is `nearcore/target/release/neard`

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
$ wget ~/.near/config.json https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json
```

### 5. Get data backup

The node is ready to be started however the first thing you need to do is to sync up with the network. This means your node needs to download all of the headers and blocks that other nodes on the network have. This process can be sped up drastically by downloading backups one of two ways:

1. Download and unpack the [tar file](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar) to `~/.near`.

or

2. Run the following commands:

```bash
$ wget ~/.near/data.tar https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar
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
