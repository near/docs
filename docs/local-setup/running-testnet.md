---
id: running-testnet
title: Running a node
sidebar_label: Running a node
---

<blockquote class="warning">
<strong>heads up</strong><br><br>

We have temporarily disabled connecting to TestNet.  This limitation may affect your ability to follow the instructions on this page.  Please [find us online](http://near.chat) if you have questions.

</blockquote>

## Intro

This will teach you how to set up a node that syncs with the official TestNet/BetaBet. You can take a look at the core code found here: [https://github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore)

If you want to run a node, and then become a validator, read below and then follow these instructions.


## `nearup` Installation
The steps in this document will require `nearup` to run the node. You can install `nearup` by following the instructions at https://github.com/near/nearup (follow instructions under prerequisites and install sections).


## Setup

By default we use Docker to run the client \(with auto-updating via watchtower to upgrade the node to the new versions automatically\).

Follow next instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

The instructions in next section  will only work once you're running Docker on your machine.

_NOTE: You can run a node without docker by adding the `--nodocker` flag to the nearup command and specifying the compiled binary path. See how to do this under [Compiling and Running Official Node \(TestNet/BetaNet\) without Docker](/docs/local-setup/running-testnet.md#compiling-and-running-official-node-testnetbetanet-without-docker).

## Running Official Node (TestNet/BetaNet) with Docker

We will be using BetaNet for sample commands in the rest of the document. If you wish to use TestNet then you can replace the `betanet` on command line with `testnet`. BetaNet is the weekly release and TestNet has the stable releases.

Once `nearup` and Docker are installed (by following instructions in previous section), just run:

```
nearup betanet
```

You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. **Validators should use the account ID of the account you want to stake with:**

```bash
Enter your account ID (leave empty if not going to be a validator):
```

A node will then start in the background inside the docker. To check the logs inside the docker, run `docker logs --follow nearcore`.

![text-alt](assets/docker-logs.png)

**Legend:**
**\# 7153** \| BlockHeight
**V/1** \| _'V'_ \(validator\) or _'—'_ \(regular node\) / Total Validators
**0/0/40** \| connected peers / up to date peers / max peers

If you're interested in becoming a validator, take a look at [staking](/docs/validator/staking).


## Compiling and Running Official Node (TestNet/BetaNet) without Docker

Alternatively, you can build and run validator on this machine without docker by compiling `nearcore` locally and pointing `nearup` to the compiled bianries' location. Steps in this section provide details of how to do this.

For Mac OS, make sure you have developer tools installed \(like git\) and then use `brew` to install extra tools:

```text
brew install cmake protobuf clang llvm
```

For Linux install next dependencies:

```text
apt update
apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
```

Then run the script:

```bash
git clone -b beta https://github.com/nearprotocol/nearcore.git
cd nearcore
```
For BetaNet we are cloning the code from `beta` branch in the `git` command above. If you wish to run the node with TestNet you can take out the branch parameter i.e. `-b beta` which will clone the code from `master` branch. 

Build the binaries using:
```bash
cargo build -p neard release
```
This command will create the binaries in `path/to/nearcore/target/release` folder. If you use `debug` instead of `release` in the command above the binaries are created in `path/to/nearcore/target/debug` folder.

Finally:
On MacOS or Linux

```bash
nearup betanet --nodocker --binary-path path/to/nearcore/target/release
```

if you want to run TestNet instead of BetaNet then replace `betanet` with `testnet` in the command above.


You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. **Validators should use the account ID of the account you want to stake with:**

```bash
Enter your account ID (leave empty if not going to be a validator):
```

## Running Official Node on GCP

Create new instance, with at least:

* 2 vCPU and 3.75 GB of RAM (We recommend n1-standard-2).
* Select Ubuntu 18.04 LTS or later.
* Allocate 100GB of persistent storage.

Add firewall rules to allow traffic to 24567 port from all IPs \(0.0.0.0/0\)

SSH into the machine \(there is "SSH" button in the console or use gcloud ssh command\).

Run:

```bash
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

