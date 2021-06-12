---
id: what-is-a-node
title: What is a Node
sidebar_label: What is a Node
description: What is a NEAR Node and Why Run a Node
---

NEAR Protocol runs on a collection of publicly maintained computers (or "nodes"). All nodes are running the same `nearcore` codebase with the latest releases available on [Github](https://github.com/near/nearcore/releases/). In the following section, we will introduce three types of nodes.

It is important to keep in mind all nodes run the same codebase, with different configurations. As such, we have split up the documentation for running different types of node into sections specific to the type of nodes.

## Why run a Node?

You may decide to run a node of your own for a few reasons:

- To join a network as a validator running a validator node. Running a validator node is a public good and you are effectively securing the NEAR network and earning rewards.
- To run applications that heavily depend on RPC performance and/or availability.
- To develop and deploy contracts on a local (independent and isolated) node (sometimes called "localnet"). (†)
- To quickly extract blockchain data that can be used for chain analytics, block explorer, etc.

_( † ) `localnet` would be the right choice if you prefer to avoid leaking information about your work during the development process since `testnet` and `betanet` are *public* networks. `localnet` also gives you total control over accounts, economics and other factors for more advanced use cases (ie. making changes to `nearcore`)._

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
