---
id: protocol
title: The NEAR Protocol
---

A simple way to think about NEAR is as a cloud-based infrastructure, as the ones currently available from major tech companies. However, instead of being controlled by a single entity, the NEAR cloud is supported by independent people running their own infrastructure around the world.

So, instead of a company-operated cloud, **NEAR is a community-operated cloud**.

In a nutshell, there are 3 main actors interacting to form the NEAR ecosystem:
1. The **users**, developing and consuming services in the NEAR network.
2. The **blockchain**, working as the persistent storage for the network.
3. The **validators**, operating the computers (a.k.a. nodes) that form the decentralized network.

<!-- To set the stage, we're building a "base-layer blockchain," or a layer-one, meaning that it's on the same level of the ecosystem as projects like Ethereum or Cosmos. That means everything in the ecosystem is built on the NEAR blockchain, including your application. -->

<hr class="subsection" />

## User Accounts
Users can have one or multiple [accounts](account.md), each defined by 

1. An address (e.g. `alice.near`).
2. A set of [Access Keys](account.md#access-keys-access-keys) to handle permissions.
3. Optionally, a piece of executable code (a smart contract).

### Account Functionality
Users can then use their account to perform two primary actions in the NEAR ecosystem:

1. **Transferring money**: Users can transfer the native NEAR token, or community-built ones (e.g. $AURORA, $USN). Transfers are instantaneous and have negligible fees.
2. **Executing applications**: Users can further use tokens to execute [decentralized apps](https://awesomenear.com) that live in the blockchain, known as smart contracts.

<hr class="subsection" />

## Validators
The NEAR network is decentralized, meaning that multiple people collaborate in order to keep it safe. We call such people **validators**.

In order to make sure that all the transactions in the network are valid, i.e. that nobody is trying to steal money, the validators follow a specific consensus
mechanism.

Currently, there are a few well-known consensus mechanisms to keep a blockchain working correctly and resistant to attacks.
NEAR Protocol uses a version of **Proof-of-Stake**, particularly [Thresholded Proof of Stake](https://near.org/blog/thresholded-proof-of-stake/).

In Proof-of-Stake, users show support to specific network validators by delegating NEAR tokens to them. This process is known as **staking**. The main idea is that, if a validator has a large amount of tokens delegated is because the community trusts them.

### Securing the Network
Validators have two main jobs. The first is to validate and execute transactions, aggregating them in the blocks that form the blockchain. Their second job is to oversee other validators, making sure no one produces an invalid block or creates an alternative chain (eg. with the goal of creating a double spend).

If a validator is caught misbehaving, then they get "slashed", meaning that their stake (or part of it) is burned.

In the NEAR networks, an attempt to manipulate the chain would mean taking control over the majority of the validators at once, so that the malicious activity won't be flagged. However, this would require putting a huge sum of capital at risk, since an unsuccessful attack would mean slashing your staked tokens.

### Validator's Economy
In exchange for servicing the network, validators are rewarded with a target number of NEAR every epoch. The target value is computed in such a way that, on an annualized basis, it will be 4.5% of the total supply.

All transaction fees (minus the part which is allocated as the rebate for contracts) which are collected within each epoch are burned by the system. The inflationary reward is paid out to validators at the same rate regardless of the number of fees collected or burned. 

---

## Want to dig deeper?
Here are some of the best **introductory videos**:
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] Blockchain 101 Onramp: Deconstructing the Blockchain Ecosystem
- [ [watch](https://www.youtube.com/watch?v=Gd-aNfDqgQY&feature=youtu.be&t=1100) ] What are Decentralized Applications and How Do They Work?
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] The Design of Blockchain-Based Apps
- [ [watch](https://www.youtube.com/watch?v=bBC-nXj3Ng4) ] But how does Bitcoin actually work? *by 3Blue1Brown*

And you can read more in these **educational resources**:
- [ [read](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) ] The Beginner’s Guide to the NEAR Blockchain
- [ [read](https://medium.com/@trentmc0/blockchain-infrastructure-landscape-a-first-principles-framing-92cc5549bafe) ] Blockchain Infrastructure Landscape: A First Principles Framing
