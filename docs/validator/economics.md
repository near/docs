---
id: economics
title: The Economics of a Validator
sidebar_label: Understanding Economics
---
## Overview

NEAR is a sharded, developer-friendly, proof-of-stake blockchain. It will use a technique called "dynamic sharding" that splits the network so that much of the computation is actually being done in parallel. Therefore, the total number of validators and their assigned shards will change over time, based on the network usage (see [Nightshade documentation pages](../technical/nightshade.md)).
Each shard offers a fixed number of *seats*, and validators are randomly assigned to one (or more) of them at the end of every `epoch`. Therefore, the more the shards, the higher the number of available *seats*.

As a validator, you need to secure three classes of resources:
1. NEAR tokens to stake
2. Nodes infrastructure
3. Continuous operation


## 1. NEAR tokens to stake

NEAR validators are elected at the end of each `epoch`, and get ordered by the size of their stake. Current validators are re-elected automatically, by *re-staking* their tokens plus the accrued rewards; new validators may replace an existing one if they offer a more significant stake.

As a validator, you receive one *seat* (or more) by:
- Staking your NEAR tokens
- Staking delegated NEAR tokens

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    In the beginning, the network will run on a limited number of shards, with all validators competing for a limited number of seats.
    As a simple rule-of-thumb, a staking of 40% of the total supply (400 million out of 1 billion NEAR tokens) with 100 validator seats available will need an average of 4 million NEAR tokens per elected validator.
</blockquote>

### Stake your NEAR tokens

Use [NEAR Shell](../development/near-clitool.md) to issue a staking transaction. The protocol will add your transaction to the `proposals` until the end of the epoch. Then, if your offer is sufficient, your node will become a validator after one more epoch. You will be able to monitor the `proposals`, and eventually top-up your bid, to increase the odds of obtaining a seat.

### Stake delegated NEAR tokens

NEAR leverages *smart contracts* for delegation. Therefore, every validator should implement its staking contract, or use one already offered by the community. 
This option is still work in progress, so please follow the [NEP on GitHub](https://github.com/nearprotocol/NEPs/blob/staking-contract/text/0000-staking-contract.md) for the specifications, and the 'Riskless Delegation' discussion on [NEAR's Commonwealth](https://commonwealth.im/near/proposal/discussion/357-riskless-delegation-aka-tezos-delegation).


## 2. Nodes infrastructure

Once you obtained NEAR tokens to stake, you need an infrastructure to securely serve the network.
At the beginning of each epoch, every validator is assigned one of these roles:
- Chunk Producer, for collecting transactions and applying them to the state
- Block Producers, for generating the single blocks containing the current chunks 
- Fishermen (aka 'hidden' validators), for challenging the state to verify the work of other validators

Whether the case, every validator must provide **availability** and **consistency**.

### Availability

The protocol expects a number of validating signatures proportional to the number of *seats*. If a validator falls below the `MINIMUM_THRESHOLD` of `90 %`, it will be *kicked out* at the end of the epoch and will have to stake again its `proposal`.
In practical terms, you have wait the end of your failed epoch, submit again your `proposal` in the next epoch, and wait one more epoch to sync with the shard state - which at 730 epochs per year means losing at least 24 hours of rewards. As a result, validators may want multiple redundant nodes (over multiple locations) and fallback connectivity.

### Consistency

Each validator must submit a *valid state* to the blockchain, otherwise, the stake will be slashed. Beware that validators get slashed also if their fallback systems are triggered by mistake: if more than one node try to sign the same block using the same key, funds will be lost. Therefore, as a validator you need a reliable solution if nodes use the same key across different datacenters and geographies.


## 3. Continuous operation

Validators must keep the infrastructure up and running by:
1. Keeping the nodes updated, to maintain the *service level objectives*
2. Holding their role of validator by leveraging market dynamics

### Maintain Service Level Objectives

Achieving 90% of uptime is not sufficient: any new release of the node should be tested and applied without interruptions. Leveraging infrastructure-as-code usually simplifies ongoing maintenance, increasing tne efficiency and profitability at the cost of higher upfront investments.
On top of ordinary maintenance, your operations will require an incident/response playbook, such that any critical failure of the nodes can be promptly resolved by the team.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    The smaller the stake, the higher is the risk of missing the MINIMUM_THRESHOLD and being kicked out.
    Given 100 validator seats available, and 43,200 blocks per epoch, a small validator with two seats will have to validate 90% of 864 blocks (2% of 43,200). Missing more than 85 blocks will trigger the availability fault.
    On the other hand, a larger validator with ten seats will have to validate 90% of 4320 blocks (10% of 43,200), leaving a longer time margin to fix any issue.
</blockquote>

### Leverage market dynamics

NEAR validators are subject to market and game-theory dynamics, relating to:
1. The total of NEAR tokens at stake
2. The median distribution of the stake across validators
3. Protocol fees and inflation
4. Exchange value of NEAR tokens
5. Opportunity cost of other PoS tokens

**Total of NEAR tokens at stake**
NEAR mints 5% new tokens every year as staking rewards. Therefore, the initial supply of 1 billion NEAR will generate 50 million tokens (5% of 1 billion) in validator rewards.
This reward is fixed, regardless of the stake:
- A relatively small stake of 100 million (10% of 1 billion) will generate a nominal return of 50% (50 million NEAR for a stake of 100 million), thus attracting more staking.
- On the other hand, a large stake of 800 million (80% of 1 billion) will return 6.25% in rewards (50 million NEAR for a stake of 800 million), which may become too low to lock so many tokens.

<blockquote class="info">
	<strong>did you know?</strong><br><br>
	The protocol automatically re-stakes your rewards at the end of each epoch, so you may expect 5% of inflation as additional stake every year.
</blockquote>

**Median distribution of the stake**
A high median will have less validators with large stakes, thus introducing higher barriers of entry for your `proposal`. On the other hand, a low median decreases the needed stake, introducing more turnaround and competition between validators. You may expect the latter, with delegators sharing their stake across multiple validators, to hedge risks.

**Protocol fees and inflation**
In detail, the protocol mints `total_supply * 0.05/730` NEAR tokens at the end of every epoch (achieving 5% of inflation per year). However, the protocol will burn the costs of `tx_fees + state_rent` at the end of each block. Essentially, rewards increase the `total_supply`, while fees reduce it. 
More specifically, the protocol will mint new tokens at the end of each epoch, using the remainder of `total_supply` minus the aggregated `tx_fees + state_rent` from every new block created.

<blockquote class="info">
	<strong>did you know?</strong><br><br>
	Beyond a certain level of usage, the protocol will burn more tokens than minting new ones, decreasing the total supply.
</blockquote>

**Exchange value of NEAR tokens**
Validators pay operating expenses in local currency, therefore they may have to exchange their NEAR rewards. Most Proof-of-Work miners face similar problems (e.g. energy bills and maintenance personnel), so we can apply the same principles: an appreciating token leaves more operating margin and opens opportunities for new validators, while a depreciating token may 'squeeze out' the least efficient validators.
Since rewards are fixed, this can be considered a *zero-sum game*, where an appreciating token introduces additional validators and competition, and a depreciating token reduces their number and centralizes the network.

**Opportunity cost of other PoS tokens**
Assuming zero barriers to acquire or exchange PoS tokens, every delegator will measure inflation and the returns of their stake across multiple Proof-of-Stake ledgers. Therefore, you have to assume a staking return threshold, which may require to adjust your delegation fees to stay in the market.
Therefore, the total stake on NEAR Protocol will be influenced by nominal inflation and rewards of other PoS tokens.


## Additional links:

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
- [NEAR nomicon](https://nomicon.io)