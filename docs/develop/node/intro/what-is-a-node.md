---
id: what-is-a-node
title: What is a Node
sidebar_label: What is a Node
---

NEAR Protocol runs on a collection of publicly maintained computers (or "nodes"). All nodes are running the same `nearcore` codebase with the latest releases available on [Github](https://github.com/near/nearcore/releases/). In the following section, we will introduce three types of nodes.

It is important to keep in mind all nodes runs the same codebase, but with different configurations. As such we have split up the instructions for running different nodes into different sections.

## Why run a Node?

You may decide to run a node of your own for a few reasons:

- To join a network as a validator running a "validator node". Running a validator node is a public good and you are effectively securing the NEAR network and earning rewards.
- To develop and deploy contracts on a node connected to `MainNet`, `TestNet` or `BetaNet` (†)
- To develop and deploy contracts on a local (independent and isolated) node (sometimes called "LocalNet"). (††)
- To quickly extract blockchain data that can be used for chain analytics

_( † ) `TestNet` is intended to operate as similarly to `MainNet`  as possible with only stable releases while `BetaNet` follows a weekly release cycle._

_( †† ) `LocalNet` would be the right choice if you prefer to avoid leaking information about your work during the development process since `TestNet` and `BetaNet` are *public* networks. `LocalNet` also gives you total control over accounts, economics and other factors for more advanced use cases (ie. making changes to `nearcore`)._
