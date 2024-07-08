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

[Validators](https://pages.near.org/papers/the-official-near-white-paper/#economics) are responsible for producing blocks and the security of the network.

Since Validators validate all shards, high requirements are set for running them (an 8-Core CPU with 16GB of RAM and 1 TB SSD of storage). The cost of running a block-producing validator node is estimated to be $330 per month for hosting. Please see our [hardware and cost estimates page](https://near-nodes.io/validator/hardware) for more info.

The current active Validators are available on the Explorer. The minimum seat price to become a block-producing validator is based on the 300th proposal. (If more than 300 proposals are submitted, the threshold will simply be the stake of the 300th proposal, provided that it’s larger than the minimum threshold of 25,500 $NEAR.) The current seat price to become a block-producing validator is updated live on the Explorer. Any validator nodes with stakes higher than the seat price can join the active set of Validators.

<blockquote className="lesson">
<strong>Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?</strong><br /><br />
  
We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our <a href="https://github.com/near/wiki/blob/master/Archive/validators/about.md" target="_blank" rel="noopener noreferrer">Validator Quickstart</a> and <a href="https://github.com/near/wiki/blob/master/Archive/validators/faq.md" target="_blank" rel="noopener noreferrer">Staking FA</a>.
</blockquote>

## Chunk-Only Validators

The Chunk-Only Producer is a more accessible role with lower hardware and token requirements. This new role will allow the network's validator number to grow, creating more opportunities to earn rewards and secure the NEAR Ecosystem. 

[Chunk-Only Producers](https://pages.near.org/papers/the-official-near-white-paper/#economics) are solely responsible for [producing chunks](https://pages.near.org/papers/nightshade/#nightshade) (parts of the block from a shard, see [Nightshade](https://near.org/papers/nightshade/) for more detail) in one shard (a partition on the network). Because Chunk-Only Producers only need to validate one shard, they can run the validator node on a 8-Core CPU, with 16GB of RAM, and 500 GB SSD of storage.

Like Validators, Chunk-Only Producers will receive, at minimum, 4.5% annual rewards. If less than 100% of the tokens on the network is staked, Chunk-Only Producers stand to earn even more annual rewards. For more details about the Validator’s economics, please check out [NEAR’s Economics Explained](https://near.org/blog/near-protocol-economics/).

## Dedicated Validator Documentation Site 

If you'd like to further explore Validators and Nodes in general, you can visit the [Dedicated Validator Documentation Site](https://near-nodes.io/).

<blockquote className="lesson">
<strong>If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?</strong><br /><br />
  
No. We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.
</blockquote>
