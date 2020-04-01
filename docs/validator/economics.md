---
id: economics
title: The Economics of a Validator
sidebar_label: Understanding Economics
---
## Overview

NEAR is a sharded, developer-friendly, proof-of-stake blockchain. With the increase of users and their transactions, NEAR dynamically introduces additional shards. Each shard allows a fixed number of *seats*, with validators randomly assigned to one (or more) of them over time. Every validator needs at least one *seat* to access the protocol rewards (see [Nightshade documentation pages](../technical/nightshade.md) for technical details).

As a validator, you need to secure three classes of resources:
1. NEAR tokens to stake
2. Nodes infrastructure
3. Continuous operation


## 1. NEAR tokens to stake

NEAR Protocol determines validators before every new `epoch`, electing them by the size of their stake. Current validators are enrolled automatically and the end of the `epoch`, by *re-staking* their tokens plus the accrued rewards; new validators may replace an existing one if they offer a higher stake.

You can obtain a validator *seat* by:
- Staking your NEAR tokens
- Receiving third-party NEAR tokens via delegation

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    A large enough stake can obtain more than one seat, multiplying your rewards. 
</blockquote>

### Stake your NEAR tokens

Use [NEAR Shell](../development/near-clitool.md) to issue your staking transaction and generate your `proposal` to become a validator. At the end of the `epoch`, if your proposal is large enough, your node will become a validator - and will begin to generate rewards after one more epoch. If needed, you can increase your `proposal` anytime by signing a larger staking transaction using the same *stakingKey*.

### Receive third-party NEAR tokens via delegation

NEAR Protocol provides *smart contracts* for delegators who want to stake $NEAR tokens without running a node. Therefore, every validator may implement its staking smart contract, or use the ones made available by NEAR Protocol or the community. 
This option is still work in progress, so please follow the [NEP on GitHub](https://github.com/nearprotocol/NEPs/blob/staking-contract/text/0000-staking-contract.md) for specifications and features discussion.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    In the beginning, the network will run on a limited number of shards, with all validators competing for a limited number of seats. With 40% of the total supply at stake (400 million out of 1 billion $NEAR tokens) and 100 seats available, every validator will need at least 4 million $NEAR tokens to take one seat.
</blockquote>


## 2. Nodes infrastructure

Once you obtained your stake in $NEAR, you need to setup the infrastructure to serve the network.
At a high level, your nodes must provide:
- Availability
- Consistency

### Availability

NEAR Protocol doesn't enforce slashing for downtime. However, validators failing to be online get *kicked out* and lose rewards.
More in detail, the protocol requires your nodes to provide a `MINIMUM_THRESHOLD` of signatures, in a number proportional to the median block producer in the `epoch`, multiplied by the number of *seats* assigned to your node. If your node uptime falls below `90 %`, it will be *kicked out* at the end of the epoch, and you will have to submit its staking `proposal` again.
In practical terms, if your node goes offline for too long, you have to:
- Re-stake your `proposal` again before the end of the failed epoch, and (if your `proposal` succeed),
- Wait for one more `epoch`, which is needed to sync the node with the assigned shard

With 730 epochs per year (one every 12 hours), you will miss at least 24 hours of potential rewards.

### Consistency

Validators must submit a *valid state* to the blockchain, or their stake will get slashed. Beware that validators may be slashed if any fallback systems intervene by mistake, generating blocks with the same key across different nodes. Therefore, as a validator, you need a reliable solution that maintains consistency across different datacenters and geographies.
There are many more slashing conditions, with documentation that is work in progress, please refer to the [EpochManager specs](https://github.com/nearprotocol/NEPs/pull/37) if you want to know more.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    At the launch of MainNet, NEAR will have no slashing. Therefore, consistency requirements will be initially lower
</blockquote>


## 3. Continuous operation

Validators must keep the operations up and running by:
1. Setting the *Service Level Objectives*
2. Understanding market dynamics

### Setting the Service Level Objectives

As mentioned above, there's no slashing for downtime. However, any new release of the node should be locally tested and deployed with minimum interruptions, to avoid the risks of getting *kicked out*. Allocating resources on infrastructure-as-code can increase efficiency and profitability, making ongoing maintenance easier.
On top of ordinary maintenance, your operations will require an incident/response playbook, to promptly resolve any infrastructure failure or emergency updates.


### Understand market dynamics

NEAR validators are subject to market and game-theory dynamics, relating to:
1. The total of NEAR tokens at stake
2. The distribution of the stake across validators
3. Protocol fees and inflation

**Total of NEAR tokens at stake**
NEAR mints 5% new tokens every year, of which 1/10 go to the treasury (0.05% of the total supply) and the rest to validators. Therefore, the initial supply of 1 billion NEAR will generate 45 million tokens (4.5% of 1 billion) in stake rewards.
The reward is fixed regardless of the total amount at stake:
- A relatively small stake of 100 million $NEAR tokens (10% of 1 billion) will compensate the network with a nominal return of 45% (45 million NEAR for a stake of 100 million), thus attracting more staking.
- On the other hand, a large stake of 720 million $NEAR (72% of 1 billion) will return 6.25% in rewards (45 million NEAR for a stake of 720 million), which may lead the network to unlock some $NEAR tokens and use them in other applications.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    The protocol automatically re-stakes your rewards at the end of each epoch, so you may expect up to 4.5% of additional stake every year.
</blockquote>

**Distribution of the stake across validators**
At the end of every `epoch`, NEAR Protocol assigns seats to validators: the calculation is based on the `proposal` in $NEAR tokens, and the total number of *seats* available - which is `100` per shard. 

By monitoring the `proposals`, validators can consistently estimate the stake in $NEAR per each *seat*.
This number can be obtained by dividing the total at stake by the number of seats:

| - | - | - |
| Total $NEAR at stake | Total seats | $NEAR per-seat |
| 400 million | 100 | 4 million |
| 400 million | 400 | 1 million |
| 400 million | 800 | 0.25 million |

More details can be found in the validators section of the [Economics White Paper](https://nearprotocol.com/papers/economics-in-sharded-blockchain/#validators)

**Protocol fees and inflation**
NEAR Protocol's rewards follow the formula `total_supply * 0.05/730` of NEAR tokens at the end of every `epoch` (producing up to 5% of new tokens per year). However, the protocol *burns* `tx_fees + state_rent` at the end of each block. Therefore, while rewards increase `total_supply` of $NEAR tokens, the fees *reduce* it. 

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    Inflation decreases proportionally to collected fees. Therefore, if fees overcome newly created tokens, the total supply will decrease.
</blockquote>


## Conclusions

In the beginning, a small number of shards will require a larger stake, privileging professional validators and organizations that will allocate significant resources to NEAR Protocol.
As the network grows, the number of *seats* will increase with the number of shards. Therefore, the minimum stake necessary to become validators, since the seat price selection mechanics will allow for a long tail of validators to come on board.


## Additional links:

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
- [Economics in Sharded Blockchain](https://nearprotocol.com/papers/economics-in-sharded-blockchain/#validators)
- [Economic specs on NEAR Nomicon](https://nomicon.io/Economics/README.html)