---
id: compile-and-run-a-node
title: Compile and run a node
sidebar_label: Compile and run a node
---

# How to compile and run nearcore

This doc is written for developers, sysadmins, devops or curious people who want to know how to compile and run a regular NEAR node natively (without containerization) for one of the network:
- mainnet
- testnet
- localnet

## Prerequisites

- [Rust](https://www.rust-lang.org/). If not already installed, please [follow these instructions](https://docs.near.org/docs/tutorials/contracts/intro-to-rust#3-step-rust-installation).
- [Git](https://git-scm.com/)

### Recommended hardware:
- 4 CPU cores
- 16GB RAM
- 100GB SSD (HDD will be enough for localet only)


## How to use this document

This document is separated into section by network name. Though all the sections have almost the same steps with the same text. We found it more handy in the way you can copy-paste commands and get a node running.

### A few words on choosing a version of nearcore to build and run

Depending on the purpose you are running NEAR node for you may consider to choose the branch:

- `master` if you want to play around with the latest code and experiment. This branch is not guaranteed to be in fully working state and absolutely no guarantee it will be compatible with current state of *mainnet* or *testnet*.
- [Latest release branch](https://github.com/near/nearcore/releases) if you want to run NEAR node for *mainnet* or *tesnet*. This version is used by validators and other nodes and fully compatible with current state of *mainnet* or *testnet*.

## Localnet

### 1. Clone nearcore project from GitHub

You need to clone [`nearcore`](https://github.com/near/nearcore)

```bash
$ git clone https://github.com/near/nearcore
$ cd nearcore
```

Checkout to the branch you need if not `master` (default)

```bash
$ git checkout master
```

### 2. Compile nearcore binary

In the `nearcore` folder run the commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process, it will take some time depending on your machine power (e.g. i9 8-core CPU, 32 GB RAM, SSD it takes approximately 25 minutes)

The binary path is `nearcore/target/release/neard`

### 3. Initialize working directory

In order to work NEAR node requires to have working directory and a couple of configuration files.

- `config.json` with a lot of parameters which responsive for how the node will work
- `genesis.json` a file with all the data the network had started with. In contains initial accounts, contracts, access keys and other records which represents the initial state of the blockchain
- `node_key.json` a file which contains public and private key for the node. Also includes optional `account_id` parameter which is required to run validator node (not covered in this doc)
- `data/` folder in which NEAR node will write the state.
- `validator_key.json` a file which containet public and private key for local `test.near` account which belongs to the only local network validator.

Initially the required working directory needs to be generated. The command to generate it looks like:

```bash
$ ./target/release/neard --home ~/.near init --chain-id localnet
```

> You can skip `--home` argument if you are fine with default working directory in `~/.near` or pass different path

This command will create the required directory structure, will generate `config.json`, `node_key.json`, `validator_key.json` and `genesis.json` for localnet network.

### 4. Run a node

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console.


## testnet

### 1. Clone nearcore project from GitHub

You need to clone [`nearcore`](https://github.com/near/nearcore)

```bash
$ git clone https://github.com/near/nearcore
$ git fetch origin --tags
$ cd nearcore
```

Checkout to the branch you need if not `master` (default). Latest release is recommended. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases). Current latest is `1.19.0`

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile nearcore binary

In the `nearcore` folder run the commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process, it will take some time depending on your machine power (e.g. i9 8-core CPU, 32 GB RAM, SSD it takes approximately 25 minutes)

The binary path is `nearcore/target/release/neard`

### 3. Initialize working directory

In order to work NEAR node requires to have working directory and a couple of configuration files.

- `config.json` with a lot of parameters which responsive for how the node will work
- `genesis.json` a file with all the data the network had started with. In contains initial accounts, contracts, access keys and other records which represents the initial state of the blockchain
- `node_key.json` a file which contains public and private key for the node. Also includes optional `account_id` parameter which is required to run validator node (not covered in this doc)
- `data/` folder in which NEAR node will write the state.

Initially the required working directory needs to be generated. The command to generate it looks like:

```bash
$ ./target/release/neard --home ~/.near init --chain-id testnet --download
```

> You can skip `--home` argument if you are fine with default working directory in `~/.near` or pass different path

This command will create the required directory structure, will generate `config.json` and `node_key.json`, will download `genesis.json` for testnet network.

> **Heads up**
> The genesis file for the testnet is big (6GB +) so this command will be running for a while, no progress will be shown.

### 4. Replacing the `config.json`

Generated `config.json` is missing `boot_nodes` parameter (it is empty) so we will need to replace it by full one. The file can be downloaded:

- Download `config.json` https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json and replace it in your working dir (`~/.near/config.json`)

Or run the commands:

```bash
$ rm ~/.near/config.json
$ wget ~/.near/config.json https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/config.json
```

### 5. Get data backup

The node is ready to be started. However the first thing to do is to sync up with the netowk. It means your node needs to download all the headers and blocks like other nodes in the network have. This process might be speed up drastically by using backups.

Download and unpack the tar to `~/.near` https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar

Or run the commands

```bash
$ wget ~/.near/data.tar https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run a node

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console. It will download a bit of missing data since the backup was done but it shouldn't take much time.


## mainnet

### 1. Clone nearcore project from GitHub

You need to clone [`nearcore`](https://github.com/near/nearcore)

```bash
$ git clone https://github.com/near/nearcore
$ git fetch origin --tags
$ cd nearcore
```

Checkout to the branch you need if not `master` (default). Latest release is recommended. Please check the [releases page on GitHub](https://github.com/near/nearcore/releases). Current latest is `1.19.0`

```bash
$ git checkout tags/1.19.0 -b mynode
```

### 2. Compile nearcore binary

In the `nearcore` folder run the commands:

```bash
$ cargo build --release --package neard --bin neard
```

This will start the compilation process, it will take some time depending on your machine power (e.g. i9 8-core CPU, 32 GB RAM, SSD it takes approximately 25 minutes)

The binary path is `nearcore/target/release/neard`

### 3. Initialize working directory

In order to work NEAR node requires to have working directory and a couple of configuration files.

- `config.json` with a lot of parameters which responsive for how the node will work
- `genesis.json` a file with all the data the network had started with. In contains initial accounts, contracts, access keys and other records which represents the initial state of the blockchain
- `node_key.json` a file which contains public and private key for the node. Also includes optional `account_id` parameter which is required to run validator node (not covered in this doc)
- `data/` folder in which NEAR node will write the state.

Initially the required working directory needs to be generated. The command to generate it looks like:

```bash
$ ./target/release/neard --home ~/.near init --chain-id mainnet --download
```

> You can skip `--home` argument if you are fine with default working directory in `~/.near` or pass different path

This command will create the required directory structure, will generate `config.json` and `node_key.json`, will download `genesis.json` for mainnet network.


### 4. Replacing the `config.json`

Generated `config.json` is missing `boot_nodes` parameter (it is empty) so we will need to replace it by full one. The file can be downloaded:

- Download `config.json` https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json and replace it in your working dir (`~/.near/config.json`)

Or run the commands:

```bash
$ rm ~/.near/config.json
$ wget ~/.near/config.json https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json
```

### 5. Get data backup

The node is ready to be started. However the first thing to do is to sync up with the netowk. It means your node needs to download all the headers and blocks like other nodes in the network have. This process might be speed up drastically by using backups.

Download and unpack the tar to `~/.near` https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar

Or run the commands

```bash
$ wget ~/.near/data.tar https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```

### 6. Run a node

```bash
$ ./target/release/neard --home ~/.near run
```

That's all. The node is running you can see log outputs in your console. It will download a bit of missing data since the backup was done but it shouldn't take much time.
