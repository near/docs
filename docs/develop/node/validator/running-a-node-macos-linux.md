---
id: running-a-node
title: Run a Node on Linux and MacOS
sidebar_label: Run a Node (Linux and MacOS)
description: How to run a NEAR node using nearup on Linux and MacOS, with or without using Docker
---

This doc is written for developers, sysadmins, DevOps, or curious people who want to know how to run a NEAR node using `nearup` on Linux and MacOS, with or without using Docker.


## `nearup` Installation {#nearup-installation}
You can install `nearup` by following the instructions at https://github.com/near/nearup.

<blockquote class="info">
<strong>Heads up</strong><br /><br />

The README for `nearup` (linked above) may be **all you need to get a node up and running** in `testnet` and `localnet`. `nearup` is exclusively used to launch NEAR `testnet` and `localnet` nodes. `nearup` is not used to launch `mainnet` nodes.  See [Deploy Node on Mainnet](deploy-on-mainnet) for running a node on `mainnet`.

</blockquote>

The steps in the rest of this document will require `nearup`


## Running a Node using Docker {#running-a-node-using-docker}

### Install Docker {#install-docker}

By default we use Docker to run the client.

Follow these instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

### Running `nearup` with Docker {#running-nearup-with-docker}

<blockquote class="warning">
Note: `nearup` and `neard` are running inside the container. You have to mount the ~/.near folder to ensure you don't lose your data which should live on the host.
</blockquote>

Once `nearup` and Docker are installed (by following instructions in previous section), run:

```sh
docker run -v $HOME/.near:/root/.near -p 3030:3030 --name nearup nearprotocol/nearup run testnet
```


_(If you prefer to use `localnet` then just replace `testnet` with `localnet` in the command above)_


You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. Validators should use the account ID of the account you want to stake with. See [staking](/docs/validator/staking) if you would like to become a validator.

```text
Enter your account ID (leave empty if not going to be a validator):
```


#### Running in detached mode {#running-in-detached-mode}

To run `nearup` in docker's detached (non-blocking) mode, you can add `-d` to the `docker run` command,

```
docker run -v $HOME/.near:/root/.near -p 3030:3030 -d --name nearup nearprotocol/nearup run testnet
```

#### Execute `nearup` commands in container {#execute-nearup-commands-in-container}

To execute other `nearup` commands like `logs`, `stop`, `run`, you can use `docker exec`,

```
docker exec nearup nearup logs
docker exec nearup nearup stop
docker exec nearup nearup run {testnet/localnet}
```

(The container is running in a busy wait loop, so the container won't die.)

#### `nearup` logs {#nearup-logs}

To get the `neard` logs run:

```
docker exec nearup nearup logs
```

or,

```
docker exec nearup nearup logs --follow
```

To get the `nearup` logs run:

```
docker logs -f nearup
```

![text-alt](/docs/assets/docker-logs.png)


| Legend   |                                                            |
| :------- | :--------------------------------------------------------- |
| `# 7153` | BlockHeight                                                |
| `V/1`    | `V` (validator) or  `—`  (regular node) / Total Validators |
| `0/0/40` | connected peers / up to date peers / max peers             |



## Compiling and Running a Node without Docker {#compiling-and-running-a-node-without-docker}

Alternatively, you can build and run a node without Docker by compiling `neard` locally and pointing `nearup` to the compiled binaries. Steps in this section provide details of how to do this.

For Mac OS, make sure you have developer tools installed and then use `brew` to install extra tools:

```text
brew install cmake protobuf clang llvm
```

For Linux, install these dependencies:

```text
apt update
apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
```

Then clone the repo:

```text
git clone https://github.com/near/nearcore.git
cd nearcore
```
Checkout the version you wish to build:

```bash
git checkout <version>
```

You can then run:

```bash
make neard
```

This will compile the `neard` binary for the version you have checked out, it will be available under `target/release/neard`.

Note that compilation will need over 1 GB of memory per virtual core
the machine has. If the build fails with processes being killed, you
might want to try reducing number of parallel jobs, for example:
`CARGO_BUILD_JOBS=8 make neard`.

NB. Please ensure you build releases through `make` rather than `cargo
build --release`.  The latter skips some optimisations (most notably
link-time optimisation) and thus produces a less efficient executable.

Finally:
On MacOS or Linux

```bash
nearup run testnet --binary-path path/to/nearcore/target/release
```

If you want to run `localnet` instead of `testnet`, then replace `testnet` with `localnet` in the command above.

You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. Validators should use the account ID of the account you want to stake with. See [staking](/docs/validator/staking) if you would like to become a validator.

```text
Enter your account ID (leave empty if not going to be a validator):
```

## Running a Node on GCP {#running-a-node-on-gcp}

Create a new instance, following the [Hardware requirements](hardware).

Add firewall rules to allow traffic to 24567 port from all IPs (0.0.0.0/0)

SSH into the machine (there is "SSH" button in the console or use `gcloud ssh` command) and run:

```text
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
```

## Success Message {#success-message}

Once you have followed the steps for running a node with Docker or of Compiling without Docker, you should see messages similar to as shown below:


```text
Using local binary at path/to/nearcore/target/release
Our genesis version is up to date
Starting NEAR client...
Node is running!
To check logs call: `nearup logs` or `nearup logs --follow`
```

or

```text
Using local binary at path/to/nearcore/target/release
Our genesis version is up to date
Stake for user 'stakingpool.youraccount.testnet' with 'ed25519:6ftve9gm5dKL7xnFNbKDNxZXkiYL2cheTQtcEmmLLaW'
Starting NEAR client...
Node is running!
To check logs call: `nearup logs` or `nearup logs --follow`
```

## Starting a node from backup {#starting-a-node-from-backup}
Using data backups allows you to sync your node quickly by using public tar backup files. There are two types of backups for available for both `testnet` and `mainnet`:
- regular 
- archival 

### Archive links {#archive-links}

`mainnet` 
  - [regular](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/rpc/data.tar)
  - [archival](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/archive/data.tar)

`testnet`
  - [regular](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/rpc/data.tar)
  - [archival](https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/archive/data.tar)

Starting node using `neard` backup data 

```bash
./neard init --chain-id <chain-id> --download-genesis
cd ~/.near/data
wget -c <link-above> -O - | tar -xf
rm data.tar
./neard run
```

Starting node using `nearup` backup data:

```bash
nearup run <chain-id> && sleep 30 && nearup stop
cd ~/.near/<chain-id>/data
rm ./* # clean up old DB files to avoid corruption
wget -c <link-above> -O - | tar -xf
rm data.tar
nearup run <chain-id> 
```

( `<chain-id>` corresponds to `testnet` or `mainnet` )

**Note:** Default location for `neard` data is `~/.near/data`. `nearup` stores data by default in `~/.near/<chain-id>/data.`

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>

