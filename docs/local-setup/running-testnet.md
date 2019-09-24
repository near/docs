---
id: running-testnet
title: Running a node
sidebar_label: Running a node
---

## Intro

This will teach you how to set up a node that syncs with the official TestNet. You can take a look at the core code found here: [https://github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore)

If you want to run a node, and then become a validator, read below and then follow these instructions:

## Setup

By default we use Docker to run the client \(with auto-updating via watchtower to upgrade the node to the new versions automatically\).

Follow next instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

The following instructions will only work once you're running Docker on your machine.

_NOTE: We don't recommend this unless you're contributing to `nearcore` or you know what you're trying to do, but you can run a node without docker by adding the `--local` flag to the start testnet script found below. See how to do this under_ [_Compile TestNet without Docker_](./#compile-testnet-without-docker)_._

## Running official TestNet node with Docker

To run locally, clone the `nearcore` repo. 

```bash
git clone https://github.com/nearprotocol/nearcore.git
```

`cd` into it...

```bash
cd nearcore
```

and then run `./scripts/start_testnet.py`

On MacOS

```bash
./scripts/start_testnet.py
```

On Ubuntu

```bash
sudo ./scripts/start_testnet.py
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

If you're interested in becoming a validator, take a look at: 


## Compile TestNet without Docker

Alternatively, you can build and run validator on this machine without docker by using the `--local` flag. This will install Rust and compile the binary.

For Mac OS, make sure you have developer tools installed \(like git\) and then use `brew` to install extra tools:

```text
brew install cmake protobuf
```

For Linux install next dependencies:

```text
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler
```

Then run the script:

```bash
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
```

Finally:  
On MacOS

```bash
./scripts/start_testnet.py --local
```

On Ubuntu

```bash
sudo ./scripts/start_testnet.py --local
```

## Running official TestNet on GCP

Create new instance, with at least:

* 2 vCPU and 3.75 GB of RAM.
* Select Ubuntu 18.04 LTS or later.
* Allocate 100GB of persistent storage.

Add firewall rules to allow traffic to 24567 port from all IPs \(0.0.0.0/0\)

SSH into the machine \(there is "SSH" button in the console or use gcloud ssh command\).

Run:

```bash
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler
```

Now run commands from [_Running TestNet Node with Docker_](./#running-official-testnet-node-with-docker).