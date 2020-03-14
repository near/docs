---
id: economics
title: The Economics of a Validator
sidebar_label: Understanding Economics
---
## Overview

NEAR is a sharded, developer-friendly, proof-of-stake blockchain. Once fully deployed, its nodes will use a technique called 'dynamic sharding' that splits the network, so that much of the computation is done in parallel. With the increase of users and their transactions, NEAR will dynamically introduce additional shards.
Therefore, the total number of validators and their assigned shards will change over time, based on the network usage (see [Nightshade documentation pages](../technical/nightshade.md)).
However, each shard allows a fixed number of *seats*, with validators randomly assigned to one (or more) of them between every `epoch`. The more the shards, the higher the number of available *seats* - so, the more the *seats*, the larger the room for new validators.

As a validator, you need to secure three classes of resources:
1. NEAR tokens to stake
2. Nodes infrastructure
3. Continuous operation


## 1. NEAR tokens to stake

NEAR protocol determines validators before every new `epoch`, electing them by the size of their stake. Current validators are enrolled automatically and the end of the `epoch`, by *re-staking* their tokens plus the accrued rewards; new validators may replace an existing one if they offer a higher stake.

You can obtain a validator *seat* by:
- Staking your NEAR tokens
- Staking delegated NEAR tokens

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    A large enough stake can obtain more than one seat, multiplying your rewards. 
</blockquote>

### Stake your NEAR tokens

Use [NEAR Shell](../development/near-clitool.md) to append your staking transaction to the current `proposals`. At the end of the `epoch`, if your proposal is sufficient, your node will become a validator - and will begin to generate rewards after one more epoch. If needed, you can increase anytime your `proposal` by signing a larger staking transaction using the same *stakingKey*.

### Stake delegated NEAR tokens

NEAR leverages *smart contracts* for validators that offer delegation. Therefore, every validator may implement its staking contract, or use one made available from the community. 
This option is still work in progress, so please follow the [NEP on GitHub](https://github.com/nearprotocol/NEPs/blob/staking-contract/text/0000-staking-contract.md) for the specifications, and add your comments in the 'Riskless Delegation' discussion on [NEAR's Commonwealth](https://commonwealth.im/near/proposal/discussion/357-riskless-delegation-aka-tezos-delegation).

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    In the beginning, the network will run on a limited number of shards, with all validators competing for a limited number of seats.
    As a simple rule-of-thumb, distributing 40% of the total supply (400 million out of 1 billion NEAR tokens) between 100 seats will need an average of 4 million NEAR tokens per validator.
</blockquote>


## 2. Nodes infrastructure

Once you obtained your NEAR stake, you need to setup the infrastructure to serve NEAR network.
At a high level, your nodes must provide:
- Availability
- Consistency

### Availability

The protocol requires your nodes to provide a `MINIMUM_THRESHOLD` of signatures, proportional to the median block producer in the `epoch`, and the number of your *seats*. If your node falls below `90 %`, it will be *kicked out* at the end of the epoch, and you will have to issue a staking `proposal` again.
In practical terms, you have to:
- Re-stake your `proposal` again before the end of the failed epoch, and
- If your `proposal` succeed, wait for the next epoch, which is necessary to sync your node with the assigned shard

With 730 epochs per year, you will miss at least 24 hours of rewards - therefore plan redundancy over several locations, with eventual connectivity fallback.

### Consistency

Each validator must submit a *valid state* to the blockchain, or the stake will get slashed. Beware that validators may be slashed if any fallback systems intervene by mistake, and try to generate a chunk/block by using the same key across multiple nodes. Therefore, as a validator, you need a reliable solution that maintains consistency across different datacenters and geographies.
There are many more slashing conditions, with documentation in progress, please refer to the [EpochManager specs](https://github.com/nearprotocol/NEPs/pull/37) if you want to know more.


## 3. Continuous operation

Validators must keep the operations up and running by:
1. Setting the *Service Level Objectives*
2. Leveraging market dynamics

### Setting the Service Level Objectives

Achieving 90% of uptime is not sufficient: any new release of the node should be tested and applied without interruptions. Leveraging infrastructure-as-code usually simplifies ongoing maintenance, increasing efficiency and profitability at the cost of higher upfront investments.
On top of ordinary maintenance, your operations will require an incident/response playbook, to promptly resolve any infrastructure failure, as required by the `MINIMUM_THRESHOLD`.


### Leverage market dynamics

NEAR validators are subject to market and game-theory dynamics, relating to:
1. The total of NEAR tokens at stake
2. The median of the stake across validators
3. Protocol fees and inflation
4. The exchange value of NEAR tokens
5. The opportunity cost of other PoS tokens

**Total of NEAR tokens at stake**
NEAR rewards algorithm mint 5% new tokens every year. Therefore, the initial supply of 1 billion NEAR will generate 50 million tokens (5% of 1 billion) in stake rewards.
This reward is fixed, regardless of the stake:
- A relatively small stake of 100 million (10% of 1 billion) will generate a nominal return of 50% (50 million NEAR for a stake of 100 million), thus attracting more staking.
- On the other hand, a large stake of 800 million (80% of 1 billion) will return 6.25% in rewards (50 million NEAR for a stake of 800 million), which may become too low to lock so many tokens.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    The protocol automatically re-stakes your rewards at the end of each epoch, so you may expect up to 5% of additional stake every year.
</blockquote>

**Median of the stake across validators**
A high median will have fewer validators with large stakes, thus introducing higher barriers of entry for any new `proposal`. On the other hand, a low median decreases the needed stake, introducing more turnaround and competition between validators.
You may expect the latter, assuming that delegators will spread their stake across multiple validators to hedge risks.

**Protocol fees and inflation**
In detail, rewards follow the formula `total_supply * 0.05/730` of NEAR tokens at the end of every `epoch` (producing 5% of inflation per year). However, the protocol *burns* the costs of `tx_fees + state_rent` at the end of each block - such that rewards increase `total_supply` and fees reduce it. 
Specifically, the protocol mints new tokens at the end of each epoch, while burning `tx_fees + state_rent` at each block.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    Beyond a certain level of usage, the protocol will burn more tokens than minting new ones, decreasing NEAR's total supply.
</blockquote>

**Exchange value of NEAR tokens**
Validators pay operating expenses in their local currency, and they may have to exchange their NEAR rewards. Most Proof-of-Work miners face similar problems (e.g., energy bills and maintenance personnel), so we can apply the same principles: an appreciating token leaves more operating margin opening opportunities for new validators. On the other hand, a depreciating token may 'squeeze out' the least efficient validators, and centralize the stake.
Since rewards are fixed, this can be considered a *zero-sum game* influenced by the exchange value of the token.

**Opportunity cost of other PoS tokens**
Assuming zero barriers to acquire or exchange PoS tokens, every delegator will measure inflation, price fluctuations and potential returns of the same stake across multiple Proof-of-Stake ledgers. Therefore, you have to consider a return threshold, which may impose fee adjustments to stay in the market.

## Conclusions

In the beginning, financial commitment and complexity of operations will privilege professional validators and organizations that will allocate significant resources to NEAR protocol.
However, an appreciating token, driven by organic growth and the subsequent sharding dynamics, will open new opportunities for smaller operators - increasing decentralization and delegation opportunities for the stake in the network.


## Additional links:

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
- [Economic specs on NEAR Nomicon](https://nomicon.io/Economics/README.html)