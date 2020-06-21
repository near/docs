---
id: how-to-upgrade
title: How to upgrade your node
sidebar_label: Node Upgrades
---

## Overview

There are in general two types of node upgrades: ones that change the protocol and ones that do not. From the perspective
of a validator, the two types of upgrades follow a similar pattern that is unique to NEAR.

## Zero-downtime Upgrade

To upgrade their node to a new binary (whether it changes the protocol or not), validators can use the following process:
* Spin up a new node that runs the new binary that they want to upgrade into with the same account id but 
a new validator key.
* After the node has synced, stake with the new validator key. For validator who run the staking pool, it suffices to
update the staking public key of the staking pool.
* After two epochs, the new node will become a validator and the old node can be safely shutdown.

## Why does it work?

Zero-downtime upgrade hinges on the following properties that NEAR has:
* Protocol upgrade is backward compatible. More specifically, Protocol version `X` and Protocol version `X-1` must be
fully compatible with each other. 
* Protocol upgrade is asynchronous. Validators vote for protocol changes by running the binary that implements the new
protocol. For more details, check out [this page](https://github.com/nearprotocol/NEPs/blob/master/specs/ChainSpec/Upgradability.md).
* Validator is identified by the `(account_id, validator_key)` pair. It means that there can be multiple nodes associated
with the same account running in the network at the same time, even though only one of them is a validating node. This
allows validators to seamlessly switch nodes without having to suffer any downtime.

## Alternatives

Due to security concerns, some validators may not want to rotate validator keys. There are two alternative approaches in
this case with different tradeoffs.

### Sync and Swap

This approach requires syncing a new node and then swapping the data folder. More specifically,

* Spin up a new node that runs the new binary. Wait until it is synced.
* Shutdown the old node. Mount the data folder from the new node.
* Start the old node with the new binary.

The downtime in this approach, while nonzero, should be tolerably small.

### Stop and Restart

A simpler approach would be to stop the node and restart with the new binary. While seemingly straightforward, this approach
can incur more downtime than desired due to the potential need for data migration. If the new binary has a different
database version than the current storage, it will run data migration after opening the database and depending on the amount
of data in storage as well as the scope of the format change, this process can take a while. However, if the new binary
has the same database version, this approach is better as it does not require spinning up any new node. 

 
