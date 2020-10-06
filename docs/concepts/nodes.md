---
id: nodes
title: Nodes
sidebar_label: Nodes
---

## What is a node?

NEAR Protocol runs on a collection of publicly maintained computers or "nodes". All nodes on a network perform and validate transactions, but differ in their ability to produce blocks.  

## Node types

For simplicities sake, NEAR has two main types of nodes: 
  - Producing nodes (aka "validator nodes")
  - Non-producing nodes (aka "regular nodes")

### Non-producing node ("regular node")

Anyone can run a "regular node" by following one of the methods mentioned in [this guide](/docs/local-setup/running-a-node). 

You may decide to run a node of your own for a few reasons:

  - To view, process, and validate transactions on `MainNet`, `TestNet` or `BetaNet` (†)
  - To view, process, and validate transactions on an independent / isolated local NEAR network (sometimes called "LocalNet"). (††)
  - To join `BetaNet` or `MainNet` as a producing node, aka "Validator Node" (see "[Running a Validator Node](/docs/validator/staking)")

  _( † ) `TestNet` is intended to operate as similarly to `MainNet`  as possible with only stable releases, while `BetaNet` follows a weekly release cycle._

_( †† ) `LocalNet` would be the right choice if you prefer to avoid leaking information about your work during the development process since `TestNet` and `BetaNet` are *public* networks. `LocalNet` also gives you total control over accounts, economics, and other factors for more advanced use cases (i.e. making changes to `nearcore`)._


### Producing node ("validator node")

Nodes that _can_ produce blocks, also referred to as "[Validator Nodes](/docs/validator/staking-overview)", undergo a more extensive vetting process including [staking](/docs/validator/staking).

To run a producing node, you must have a validator key and be included among the set of block producers. After each [epoch](/docs/concepts/epoch), "validator nodes" are shuffled and randomly selected for the next epoch. 

See "[How do I become a validator](/docs/validator/validator-faq#how-do-i-become-a-validator)" and [validator selection process](https://nomicon.io/Economics/README.html?validator-selection#validator-selection) for more information.

<blockquote class="warning">
<strong>Note</strong><br><br>

Non-producing nodes still validate every block and are very important to the network. This network of nodes, that view all transactions taking place, help us to be certain that the chain is correct and no invalid state transitions / forks are occurring.

</blockquote>

### Archival vs. Non-archival nodes

Both producing ("validator") and non-producing ("regular") nodes can be configured to be either archival or non-archival. All nodes are non-archival by default, but you can easily set your node to archival by updating your `config.json` changing `archive` to `true`.

Its important to note that:

 - Archival nodes store <strong>all</strong> data, from genesis to present. Anytime a new archival node is created, it begins by first syncing all data from genesis to current, then begins to record all future transactions. 

 - Non-archival nodes will do a state sync to a recent point, and will only validate from that point forward. They will continue to maintain a recent set of blocks locally, discarding older ones as the chain grows in height.
