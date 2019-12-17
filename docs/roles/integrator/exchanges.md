---
id: exchanges
title: Exchange Integration
sidebar_label: Exchange Integration
---


## Overview

The goal of this document is to help you learn how to enable your users to:

- Deposit NEAR to your exchange
- Withdraw NEAR from your exchange
- Trade NEAR with other currencies on your exchange


### Prerequisites

To support NEAR, exchanges must [run a node](#server-setup) and
ideally the node should track all shards. To specify tracked shards,
edit the `tracked_shards` field in `config.json`.

### Server Setup
[server-setup]: #server-setup

#### Testnet

There are two ways to start a node for testnet: running docker and compiling
from source code directly. For either approach, you need to download nearcore
repo:
```
git clone https://github.com/nearprotocol/nearcore.git
```

For running docker, simply run
```
./scripts/start_testnet.py
```

For compiling from source code, 

make sure you have `cargo` installed. For linux, install the following dependencies
```
sudo apt update
sudo apt install -y git binutils-dev libcurl4-openssl-dev zlib1g-dev libdw-dev libiberty-dev cmake gcc g++ python docker.io protobuf-compiler libssl-dev pkg-config clang llvm
```
and then run
```
./scripts/start_testnet.py --nodocker
```

#### Mainnet
TBD

## Blockchain

### Finality

<blockquote class="warning">
<strong>work in progress</strong> <span>Alex</span><br><br>

for reference see:

- [ [here](https://near.ai/nightshade) ] Nightshade whitepaper
- Finality Lunch & Learn session recording (I don't have access to this)
- [ [here](https://www.youtube.com/watch?v=k2ziZiZWquQ) ] NEAR Lunch and Learn Ep. 04: Nightshade: Consensus and finality


</blockquote>

### `/status` Endpoint

<blockquote class="warning">
<strong>work in progress</strong> <span>Frol</span><br><br>

for inspiration see:

- [ [here](https://docs.neo.org/docs/en-us/exchange/2.10.3/transaction.html) ] NEO's *Dealing with Asset Transactions*
- [ [here](https://dev-docs.ont.io/#/docs-en/exchange-API/Ontology+Exchange+Docking+Document?id=ont-and-ong-transfer) ] Ontology's *Exchange Integration Guide* SDK section

</blockquote>

## Accounts

### Accounts

<blockquote class="warning">
<strong>work in progress</strong> <span>Eugene</span><br><br>

for inspiration see:

- [ [here](https://xrpl.org/list-xrp-as-an-exchange.html) ] Stellar docs on Accounts

for reference see:

- [ [here](https://docs.google.com/document/d/1VRef627Y-Md1qAdRn0RFUojPxOs5nQmHyHBFYewwbZQ/edit) ] Runtime @ NEAR on gDrive
- [ [here](https://nomicon.io/Primitives/Account.html) ] Nearnomicon Account page
- [ [here](https://www.youtube.com/watch?v=2_Ekz7w6Eo4) ] NEAR Lunch and Learn Ep. 05: Accounts and Runtime

</blockquote>

### Access Keys

<blockquote class="warning">
<strong>work in progress</strong> <span>Eugene</span><br><br>

*Nearnomicon article in progress [here](https://nomicon.io/Primitives/AccessKey.html) (404)*

</blockquote>


### Events around accounts

<blockquote class="warning">
<strong>work in progress</strong> <span>Frol</span><br><br>

*Implementation WIP*

</blockquote>

### Create key pair (offline)

<blockquote class="warning">
<strong>work in progress</strong> <span>Vlad</span><br><br>

for reference see:

- [ [here](https://github.com/nearprotocol/nearlib/blob/master/test/key_pair.test.js) ] `nearlib` tests for key pairs

</blockquote>

## Transaction signing

### Life cycle of a transaction

<blockquote class="warning">
<strong>work in progress</strong> <span>Vlad & Eugene</span><br><br>

for reference see:

- [ [here](https://www.notion.so/nearprotocol/Life-of-transaction-6fd0b3a10586435eb7ce0141c252be98) ] Life of transaction
- [ [here](/docs/concepts/transaction) ] NEAR Docs key concepts: transaction

</blockquote>

### Creating transaction offline

<blockquote class="warning">
<strong>work in progress</strong> <span>Vlad</span><br><br>

for reference see:

- [ [here](https://github.com/nearprotocol/nearlib/issues/100#issuecomment-559857377) ] Github issue where Illia codes up an example of this for the docs
- [ [here](/docs/roles/developer/examples/nearlib/examples#cookbook-recipes) ] **same content as above** already integrated into these docs

</blockquote>

### Submitting transaction

<blockquote class="warning">
<strong>work in progress</strong> <span>Vlad</span><br><br>

for reference see:

- [ [here](https://github.com/nearprotocol/nearlib/blob/master/test/serialize.test.js) ] `nearlib` signer tests

</blockquote>


## Going Further

### Concepts

- See the [Nearnomicon](http://nomicon.io/) for an authoritative technical reference on the inner workings of the NEAR blockchain, it's primitives and runtime.
- Key concepts
  - [Account](/docs/concepts/account)
  - [Transaction](/docs/concepts/transaction)
