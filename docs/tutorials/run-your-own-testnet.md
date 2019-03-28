---
name: Run your own TestNet
route: /tutorials/run-your-own-testnet
menu: Tutorials
description: >-
  An overview of how to run a local alphanet cluster using docker as well as a walkthrough of deploying your own alphanet cluster to Google Cloud.
---

# Run a local TestNet or deploy to Google Cloud

## Running a local TestNet in different terminals

Navigate to the root of the project. To start the network from a new state remove the storage:

```text
rm -rf test1 test2
```

We are going to be using test1 and test2 folders for the storage of the corresponding nodes. So make sure both of them have generated keypairs:

```text
cargo run --package keystore -- keygen --test-seed alice.near -p test1/storage/keystore/
cargo run --package keystore -- keygen --test-seed bob.near -p test2/storage/keystore/
```

Launch the boot node:

```text
cargo run --release -- --addr 127.0.0.1:3000 --rpc_port 3030 --base-path=test1 --test-network-key-seed 1 --chain-spec-file ./node/configs/res/poa_testnet_chain.json -a alice.near -k 4mhK4txd8Z5r71iCZ41UguSHuHFKUeCXPHv646DbQPYi
```

The boot node will print the string that we can use to boot from it. For example:

```text
To boot from this node: 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
```

Launch the second node using the first one as the boot:

```text
cargo run --release -- --addr 127.0.0.1:3001 --rpc_port 3031 --base-path=test2 --test-network-key-seed 2 --chain-spec-file ./node/configs/res/poa_testnet_chain.json --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY -a bob.near -k 22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV
```

Submit account creation transaction on one node:

```text
pynear create_account jason 1 --public-key 22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV
```

Verify that the account was created by checking it on the other node:

```text
pynear view_account -a jason -u http://127.0.0.1:3031/
```

### Running more nodes locally

This subsection explains how one can run more than two nodes locally. First, start with the clean storage:

```text
rm -rf test1 test2 test3 test4
```

Generate the spec file:

```text
cargo run --package alphanet --bin generate_test_spec -- -n 4 -c node/configs/res/mynet_chain.json
```

Generate keys for each node:

```text
cargo run --package keystore -- keygen --test-seed near.0 -p test1/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.1 -p test2/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.2 -p test3/storage/keystore/
cargo run --package keystore -- keygen --test-seed near.3 -p test4/storage/keystore/
```

In separate terminals run:

```text
cargo run -- --addr 127.0.0.1:3000 --rpc_port 3030 --base-path=test1 --test-network-key-seed 1 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.0 -k 82M8LNM7AzJHhHKn6hymVW1jBzSwFukHp1dycVcU7MD
cargo run -- --addr 127.0.0.1:3001 --rpc_port 3031 --base-path=test2 --test-network-key-seed 2 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.1 -k CTVkQMjLyr4QzoXrTDVzfCUp95sCJPwLJZ34JTiekxMV --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
cargo run -- --addr 127.0.0.1:3002 --rpc_port 3032 --base-path=test3 --test-network-key-seed 3 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.2 -k EJ1DMa6s2ngC5GtZb3Z2DZzat2xFZ34j15VLY37dcdXX --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
cargo run -- --addr 127.0.0.1:3003 --rpc_port 3033 --base-path=test4 --test-network-key-seed 4 --chain-spec-file ./node/configs/res/mynet_chain.json -a near.3 -k 3DToePHssYc75SsxZgzgVLwXE8XQXKjdpdL7CT7D34UE --boot-nodes 127.0.0.1:3000/GuMriipt4yUXfkZL2z3zLPbYaozkZG6zjV6vg4QruEvY
```

## Running a local TestNet cluster via docker

Follow instructions for installing docker [here](https://docs.docker.com/install/#supported-platforms)

Navigate to the root of `nearprotocol/nearcore`. To start a local alphanet, execute the following script.

```bash
./ops/local_alphanet.sh
```

When the script finishes executing, you can access the following:

* NEARStudio at localhost:80
* HTTP interface of a node at localhost:3030

## Deploying an alphanet cluster to Google Cloud Platform

Note: This will require your payment information. However, you can start a 365 day free trial with $300 of credits. Be sure to remove your payment information after testing, if you do not wish to continue with Google Cloud Platform.

1\) Visit the [compute engine](https://console.cloud.google.com/compute) page and sign up for a free trial.

2\) Choose to enable billing.

3\) Follow instructions for installing and initializing gcloud CLI [here](https://cloud.google.com/sdk/docs/quickstarts)

4\) Navigate to the root of `nearprotocol/nearcore` and execute the following:

```bash
./ops/deploy_alphanet.sh
```

To look up the IP's of the running instances, run:

```bash
gcloud compute instances list
```

You can now follow [these instructions](../quick_start/expert.md) to interact with it or deploying apps / sending transactions.