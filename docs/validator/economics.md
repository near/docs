---
id: economics
title: The Economics of a Validator
sidebar_label: Validator Economics
---
## Overview

NEAR Protocol is a Proof-of-Stake (PoS) blockchain. As a validator there are three major considerations:
1. NEAR tokens to stake
2. Understanding economic implications of running a node
3. Maintaining validator seat

## 1. NEAR tokens to stake

NEAR Protocol determines validators every new `epoch`, electing them based on their stake. Already elected validators are re-enrolled by automatically *re-staking* their tokens plus the accrued rewards; new validators are elected if their stake is above dynamically determined *seatPrice*.

To obtain required tokens, you either can own them yourself or borrow via a stake delegation mechanism.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    The reward is proportional to the stake, independently of how many discrete seats are taken by given validator.
</blockquote>

### Stake your NEAR tokens

Use [NEAR CLI](/docs/development/near-cli) to issue your staking transaction and generate your `proposal` to become a validator. At the end of the `epoch`, if your proposal is above the *seatPrice*, your node will become a validator - and will begin to generate rewards after one more epoch. You can increase your `proposal` anytime by signing a larger staking transaction.

You can check current validators, upcoming validators and proposals via `validators` method on the RPC:

```bash
$ http post https://rpc.betanet.near.org jsonrpc=2.0 id=123 method=validators params:='[null]'
{
    ...
    "result": {
        "current_fisherman": ...
        "current_proposals": ...
        "current_validators": ...
        "next_fisherman": ...
        "next_validators": ...
        "prev_epoch_kickout": []
    }
}
```

### Borrow NEAR tokens via stake delegation

In NEAR Protocol token holders can lend their $NEAR to validators using *smart contracts* receiving percentage of reward validators capturing (also called delegation). Therefore, every validator can implement its staking smart contract, or use the ones made available by NEAR Protocol or the community. 
This option is still work in progress, so please follow the [NEP on GitHub](https://github.com/nearprotocol/NEPs/pull/27) for specifications and features discussion.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    In the beginning, the network will run on a limited number of shards, with all validators competing for a limited number of seats. As an example, with 40% of the total supply at stake (400 million out of 1 billion $NEAR) and 100 seats available, every validator will need 4 million $NEAR to take one seat.
</blockquote>


## 2. Economic implications of running a node

To actually operate the node and be able to become a validator, you need to setup the infrastructure.
At a high level, your setup must provide:
- Availability
- Consistency

### Availability

NEAR Protocol doesn't enforce slashing for downtime. However, validators failing to provide a minimum threshold of chunks and blocks within each epoch get *kicked out* and lose rewards for that epoch.

In practical terms, if your node goes offline for too long and gets kicked out, you have to:
- Re-stake, by sending staking transaction before the end of the failed epoch, and (if you staked enough and your `proposal` was selected),
- Wait for one more `epoch` as selection is done for epoch after next.

With 730 epochs per year (one every 12 hours), you miss at least 24 hours of potential rewards.

To ensure availability, your node infrastructure should be able to withstand possible attacks of malicious agents, such as DDOS, connection spam and more.

### Consistency

Validators must follow protocol by producing valid blocks and chunks. Deviating from protocol, like producing alternative blocks or chunks that commit to invalid state transitions, will get their stake slashed.

A common issue among validators comes from running mulitple nodes which have access to the same private key. In case of misconfiguration, their setup can sign twice the same blocks. Therefore, as a validator, if you are running across different datacenters you must reliably maintain consistency. It is worth doing risk analysis on balancing consistency and availability.

For more information on slashing, [see specification](https://nomicon.io/Economics/README.html#slashing).

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    At the launch of MainNet, NEAR will have no slashing. Therefore, consistency requirements will be initially lower.
</blockquote>


## 3. Maintaining validator seat

Validators must keep the operations up and running by:
- Adopting the *Service Level Objectives*
- Understanding market dynamics

### Adopt the Service Level Objectives

As mentioned above, there's no slashing for downtime. However, any new release of the node should be locally tested and deployed with minimum interruptions, to avoid the risks of getting *kicked out*. Allocating resources on infrastructure-as-code can increase efficiency and profitability, making ongoing maintenance easier.
On top of ordinary maintenance, your operations will require an incident/response playbook, to promptly resolve any infrastructure failure or emergency updates.

### Understand market dynamics

NEAR validators are subject to market and game-theory dynamics, relating to:
1. The total of NEAR tokens at stake
2. The distribution of the stake across validators
3. Transaction fees and inflation

**Total of NEAR tokens at stake**
NEAR mints 5% new tokens every year, of which 10% go to the treasury, and the rest is split between validators. Therefore, the initial supply of 1 billion NEAR will generate roughly 45 million tokens (4.5% of 1 billion) in stake rewards in the first year.

The reward is fixed regardless of the total amount at stake:
- A relatively small stake of 100 million $NEAR tokens (10% of 1 billion) will compensate the network with a nominal return of 45% (45 million NEAR for a stake of 100 million), thus attracting more staking.
- On the other hand, a large stake of 720 million $NEAR (72% of 1 billion) will return 6.25% in rewards (45 million NEAR for a stake of 720 million), which may lead the network to unlock some $NEAR tokens and use them in other applications.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    The protocol automatically re-stakes with the validator rewards at the end of each epoch. Meaning the amount staked will be constantly growing if not withdrawn by the validator / staking contract.
</blockquote>

**Distribution of the stake across validators**
At the end of every `epoch`, NEAR Protocol assigns seats to validators for epoch after next: the calculation is based on the `proposal` in $NEAR, and the total number of *seats* available - which is `100` per shard. 

By monitoring the `proposals`, validators can consistently estimate the stake in $NEAR per each *seat*.

Let's say you observe a set of proposals (and rollovers from previous epoch):

| Validator | Stake                | # Seats |
| --------- | -------------------- | ------- |
| V1        | 1,000,000            | 48      |
| V2        | 500,000              | 24      |
| V3        | 300,000              | 14      |
| V4        | 300,000              | 14      |
| ---       | seat price is 20,500 | ---     |
| V5        | 20,000               | 0       |

The *seat price* given this proposals is determined by finding such integer number that if you divide each validator's stake with rounding down (e.g. V5 20,000 / 20,500 with rounding down will be 0) - you will get required number of seats. This determines who will get their seat(s) and who's funds will be returned back to them.

The *seat price* for current epoch can be obtained by dividing the total at stake by the number of seats, for example at 400 million $NEAR at stake and 100 total seats, the *seat price* will be 4 million.

More details can be found in the validators section of the [Economics White Paper](https://near.org/papers/economics-in-sharded-blockchain/#validators)

**Transaction fees and inflation**
NEAR Protocol's rewards follow the formula `total_supply * 0.045/730` of NEAR tokens at the end of every `epoch`. However, the protocol *burns* `tx_fees` at the end of each block. Therefore, while rewards increase `total_supply` of $NEAR tokens, the fees *reduce* it. 

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    Inflation decreases proportionally to collected fees. Therefore, if fees overcome newly created tokens, the total supply will start decreasing.
</blockquote>

## Additional links

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
- [Economics in Sharded Blockchain](https://near.org/papers/economics-in-sharded-blockchain/#validators)
- [Economic specs on NEAR Nomicon](https://nomicon.io/Economics/README.html)
- [Validator method on the JSON RPC APIs](../interaction/rpc#validators)