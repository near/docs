---
id: running-testnet
title: Running a node
sidebar_label: Running a node
---

## Why?

NEAR Protocol runs on a collection of publicly maintained computers (or "nodes").

You may decide to run a node of your own for a few reasons:

- To develop and deploy contracts on a node connected to `MainNet`, `TestNet` or `BetaNet` (†)
- To develop and deploy contracts on a local (independent and isolated) node (sometimes called "LocalNet"). (††)
- To join a network as a validator running a "validator node" (see [staking](/docs/validator/staking))

_( † ) `TestNet` is intended to operate as closely (similarly) to `MainNet`  as possible with only stable releases while `BetaNet` follows a weekly release cycle._

_( †† ) `LocalNet` would be the right choice if you prefer to avoid leaking information about your work during the development process since `TestNet` and `BetaNet` are *public* networks. `LocalNet` also gives you total control over accounts, economics and other factors for more advanced use cases (ie. making changes to `nearcore`)._

## `nearup` Installation

You can install `nearup` by following the instructions at https://github.com/near/nearup.

<blockquote class="info">
<strong>heads up</strong><br><br>

The README for `nearup` (linked above) may be **all you need to get a node running**.

This page is made available to clarify a few points of confusion along the way for those who need it.

</blockquote>

The steps in the rest of this document will require `nearup`


## Running an Official Node using Docker

### Install Docker

By default we use Docker to run the client.

Follow these instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

NOTE: You can run a node without Docker by adding the `--nodocker` flag to the `nearup` command and specifying the compiled binary path. See how to do this in the next section: [Compiling and Running an Official Node without Docker](/docs/local-setup/running-testnet#compiling-and-running-official-node-testnetbetanet-without-docker).

### Running `nearup`


Once `nearup` and Docker are installed (by following instructions in previous section), just run:

```sh
nearup betanet
```

_(If you prefer to use `TestNet` then just replace `betanet` with `testnet` in the command above)_


You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. Validators should use the account ID of the account you want to stake with. See [staking](/docs/validator/staking) if you would like to become a validator.

```text
Enter your account ID (leave empty if not going to be a validator):
```

A node will then start in the background with Docker.

To check the logs inside Docker, run `docker logs --follow nearcore`.

![text-alt](assets/docker-logs.png)


| Legend   |                                                            |
| :------- | :--------------------------------------------------------- |
| `# 7153` | BlockHeight                                                |
| `V/1`    | `V` (validator) or  `—`  (regular node) / Total Validators |
| `0/0/40` | connected peers / up to date peers / max peers             |



## Compiling and Running Official Node without Docker

Alternatively, you can build and run a node without Docker by compiling `nearcore` locally and pointing `nearup` to the compiled binaries. Steps in this section provide details of how to do this.

For Mac OS, the `nearup` README [provides a guide](https://github.com/near/nearup#run-nearup-on-macos).

Make sure you have developer tools installed and then use `brew` to install extra tools:

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
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
```
Checkout the version you wish to build:

```bash
git checkout <version>
```

You can then run:

```bash
make release
```

This will compile all the binaries for the version you have checked out, including tools such as the `keypair-generator`; they will be available under `target/release/`.

If you are running a validator in production you may find it more efficient to just build `neard`. In which case, run the following after checking out the version:

```bash
cargo build -p neard --release
```

NB. Please ensure you include the `--release` flag. Omitting this will lead to an unoptimized binary being produced that is too slow for a validator to function effectively.

Finally:
On MacOS or Linux

```bash
nearup betanet --nodocker --binary-path path/to/nearcore/target/release
```

If you want to run `TestNet` instead of `BetaNet` then replace `betanet` with `testnet` in the command above.

You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. Validators should use the account ID of the account you want to stake with. See [staking](/docs/validator/staking) if you would like to become a validator.

```text
Enter your account ID (leave empty if not going to be a validator):
```

## Running Official Node on GCP

Create new instance, with at least:

* 2 vCPU and 3.75 GB of RAM (We recommend n1-standard-2).
* Select Ubuntu 18.04 LTS or later.
* Allocate 100GB of persistent storage.

Add firewall rules to allow traffic to 24567 port from all IPs (0.0.0.0/0)

SSH into the machine (there is "SSH" button in the console or use gcloud ssh command).

Run:

```text
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
```

## Success Message

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
Stake for user 'stakingpool.youraccount.betanet' with 'ed25519:6ftve9gm5dKL7xnFNbKDNxZXkiYL2cheTQtcEmmLLaW'
Starting NEAR client...
Node is running! 
To check logs call: `nearup logs` or `nearup logs --follow`
```
