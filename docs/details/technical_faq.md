---
name: Technical FAQ
route: /faq
menu: Introduction
---

# Technical FAQ

Here you'll find answers to common questions about the technical aspects of NEAR Protocol and the development tools around it.

## General

### What is the difference between NEAR and ETH 2.0?

Ethereum's [2.0/Serenity spec](https://github.com/ethereum/eth2.0-specs) has many similarities to NEAR. Both specify a sharded blockchain with a beacon chain to tie the shards together. There are some key differences.

The best place to explore this topic is in Alex Skidanov's [blog post](https://medium.com/nearprotocol/why-doesnt-near-just-replicate-ethereum-serenity-design-3e2cfa2f960c).

As a quick and incomplete reference, some key differences are:

* NEAR uses a [Thresholded Proof of Stake](https://medium.com/nearprotocol/thresholded-proof-of-stake-67b74e616a92) system designed to optimize for greater participation in the staking process.  Ethereum sets a hard cap of 32 ETH minimum on participation.
* NEAR's consensus algorithm, called Nightshade \([see spec](https://www.overleaf.com/read/qnmdxkvyrhrm)\), is more similar to [Tendermint](https://tendermint.com/).
* NEAR's economic model doesn't rely on developers paying tokens for each transaction's gas usage like Ethereum does, it is more similar to the "hold tokens for access" approach of EOS.

## Consensus and Security

### What consensus is used?

We use custom BFT \(Byzantine Fault Tolerant\) consensus called Nightshade \([see spec](https://www.overleaf.com/read/qnmdxkvyrhrm)\) that is very simple, and leaderless.

### What is different about Nightshade from other consensuses?

The closest common consensus to Nightshade is [Tendermint](http://www.tendermint.com). Both are very simple, and, under normal circumstances, reach consensus in just two rounds of communication.

There are key differences between Nightshade and Tendermint. In Tendermint, if the proposer is offline for T seconds \(T=3 in Cosmos\), there are no new blocks produced until it moves to the next proposer. Nightshade has no timeouts and is leaderless.

[Casper CBC](https://github.com/ethereum/cbc-casper) with LMD Ghost is also a great consensus, but with the settings that are usually proposed, it only guarantees finality when there are less than 25% malicious actors, not 33% like Tendermint or Nightshade.

### What Sybil resistance is used?

We use Proof of Stake to ensure that members who participate in the consensus have something at stake, thus ensuring their good behavior and preventing sybil attacks on that vector. Our particular flavor of PoS is called "[Thresholded Proof of Stake](https://medium.com/nearprotocol/thresholded-proof-of-stake-67b74e616a92)" and it allows us to distribute this stake among the broadest possible set of participants for a given period. This is design to disincentivize delegation and pooling and promote real decentralization of validators.

### What are the important security thresholds?

When one entity controls &gt; 1/3 of the total stake which secures the network, they can begin to cause some trouble.

When one entity controls &gt; 2/3 of the total stake which secures the network, they can arbitrarily change state and effectively control the network.

