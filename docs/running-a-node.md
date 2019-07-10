---
description: Running a node and a validator
---

# Running a node

## Running official TestNet locally

By default we use Docker to run the client \(with auto-updating via watchtower to upgrade the node to the new versions automatically\).

Follow next instructions to install Docker on your machine:

* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

To run locally, clone the repo and use `./scripts/start_testnet.py`.

```bash
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
./scripts/start_testnet.py
```

This will ask you for account id to run validator on \(if you want to just run a node, you can pass empty\). Will print the public key that should be used for staking. And will start node in background inside the docker.

If you want to check the logs inside the docker, you can use `docker logs --follow nearcore`.

Alternatively, you can build and run validator on this machine, just use `--local` flag to switch off the Docker. This will install Rust and compile the binary.

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

Now run commands from _Running TestNet locally_.

## Staking on official TestNet

For staking, you first run the node following instructions above. Use account id that you want to stake with when `start_testnet` will ask you for account id.

Note, you need to create account and fund it with tokens before you can stake. In the case of the official TestNet, you can create account via [https://wallet.nearprotocol.com](https://wallet.nearprotocol.com) or by asking on [https://near.chat](https://near.chat) to send you tokens.

After that to become the validator, you need to do next steps \(you will need to have [nodejs/npm installed](https://www.npmjs.com/get-npm)\):

* `npm install https://github.com/nearprotocol/near-shell#nightshade`
* `near-shell stake <your account> <staking public key from when you started> <amount to stake>`

  After this, you need to wait ~5 minutes for bonding period on the TestNet to become validator. You can see you are a validator when in logs of the node when you see "V/" - where V means this node is currently a validator.

