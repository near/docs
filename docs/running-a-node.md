---
description: Running a node and setting up staking.
---

# Running a node

## Intro

This will teach you how to set up a node that syncs with the official TestNet, or create an isolated network on your machine. You can take a look at the core code found here: [https://github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore)

## Setup

By default we use Docker to run the client \(with auto-updating via watchtower to upgrade the node to the new versions automatically\).

Follow next instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

The following instructions will only work once you're running Docker on your machine.

_NOTE: We don't recommend this unless you're contributing to `nearcore` or you know what you're trying to do. You can add a `--local` flag to the start testnet script found below to run outside of docker. See how to do this under Compile TestNet locally._

## Running official TestNet node locally

To run locally, clone the `nearcore` repo. 

```bash
git clone https://github.com/nearprotocol/nearcore.git
```

`cd` into it...

```bash
cd nearcore
```

and then run `./scripts/start_testnet.py`.

```bash
./scripts/start_testnet.py
```

You will then be prompted for an Account ID. You can leave this empty if you would just like to run a node. Validators should use the account ID of the account you want to stake with:

```bash
Enter your account ID (leave empty if not going to be a validator):
```

A node will then start in the background inside the docker. To check the logs inside the docker, run `docker logs --follow nearcore`.

## Compile TestNet locally

Alternatively, you can build and run validator on this machine, use `--local` flag to switch off the Docker. This will install Rust and compile the binary.

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
./scripts/start_testnet.py --local
```

## Staking on official TestNet

### Requirements

To stake, make sure you have an account with tokens

{% page-ref page="quick-start/create-a-near-account.md" %}

You will also need Near Shell, which which will require [nodejs/npm](https://www.npmjs.com/get-npm)  
Download Near Shell with npm: `npm i -g near-shell`

### Run a Node

From here, run a node following the instructions above. When prompted with an account ID, make sure to use the accountID of the account you want to stake with. You will be returned a public key used for staking:

`Stake for user 'thefutureisnear' with 'A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn'`

Make sure you copy this validator\_key as you will need it for the next step. You can also find this public key at `~/.near/validator_key.`

### Send a staking transaction

cd out of nearcore and create a staking project and authenticate near shell

```text
cd ..
near new_project staking
cd staking
near login
```

You will be prompted to navigate to a url to authenticate your staking account. Once done, enter that account ID in the shell:

```text
Please navigate to this url and follow the instructions to log in: 
https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key=FSgxX7YwuCveCeYqsSAB3sD8dgdy3XBWztCQcEjimpaN
Please enter the accountId that you logged in with:
```

Now you're ready to send the staking transaction.

```bash
  near stake <accountId> <staking public key> <amount to stake>
```

You should see a success message that looks something like:

```text
Staking 100000 on thefutureisnear with public key = A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn.
```

### Being chosen to become a validator

After this, you will need to wait the ~5 minute bonding period on TestNet to see if you have staked enough to become a validator. You can see you are a validator when in logs of the node when you see "V/" - where V means this node is currently a validator.

To learn more about how validators are chosen, take a look at the Validator FAQ \(coming soon\).

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

Now run commands from [_Running TestNet locally_](running-a-node.md#running-official-testnet-node-locally).

