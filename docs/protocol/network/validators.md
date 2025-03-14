---
id: validators
title: Validators
---

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


## Intro to Validators

[Validators](https://pages.near.org/papers/the-official-near-white-paper/#economics) are responsible for producing and validating blocks and chunks, ensuring the security and integrity of the NEAR network.

The hardware requirements for running a validator node vary depending on the staking position. Detailed specifications can be found here: [the hardware requirements](https://near-nodes.io/validator/hardware-validator).

You can view the list of currently active validators on platforms like [NEAR-STAKING](https://near-staking.com/stats). To become a validator, the minimum stake required is determined by the 300th largest staking proposal. If there are more than 300 proposals, the threshold will be set by the stake amount of the 300th proposal, as long as it exceeds the minimum threshold of 25,500 $NEAR. The current seat price to join the active validator set is updated in real-time on [NEAR BLOCKS](https://nearblocks.io/node-explorer). Any validator node with a stake greater than the current seat price can join the set of active validators.

<blockquote className="lesson">
<strong>Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?</strong><br /><br />

We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our <a href="https://github.com/near/wiki/blob/master/Archive/validators/about.md" target="_blank" rel="noopener noreferrer">Validator Quickstart</a> and <a href="https://github.com/near/wiki/blob/master/Archive/validators/faq.md" target="_blank" rel="noopener noreferrer">Staking FAQ</a>.
</blockquote>

## Block & Chunk producers
The top 100 validators are responsible for producing and validating blocks, as well as producing chunks. Under normal circumstances, each validator is assigned to a single shard, for which it produces chunks.

Block & Chunk producers are guaranteed a minimum annual reward of 4.5%. If less than 100% of the network’s tokens are staked, validators have the potential to earn even higher annual rewards.

## Chunk Validators

[Note] Block & Chunk producers also serve as chunk validators.

Non-top 100 validators take on the role of chunk validators, which has lower hardware and staking requirements, making it more accessible. This role helps expand the network's validator set, increasing opportunities to earn rewards and strengthen the security of the NEAR ecosystem.

Chunk validators do not track shards. Their responsibilities are focused solely on validating and endorsing chunks.

Like block and chunk producers, chunk validators are guaranteed a minimum of 4.5% annual rewards. If less than 100% of the network’s tokens are staked, chunk validators may earn even higher rewards. For more details on validator economics, check out [NEAR’s Economics Explained](https://near.org/blog/near-protocol-economics/).

## Dedicated Validator Documentation Site

If you'd like to further explore Validators and Nodes in general, you can visit the [Dedicated Validator Documentation Site](https://near-nodes.io/).

<blockquote className="lesson">
<strong>If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?</strong><br /><br />

No. We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerabilities can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.
</blockquote>
