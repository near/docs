---
id: economics
title: The Economics of a Validator
sidebar_label: Understanding Economics
---

## Overview

NEAR is a sharded, developer-friendly, proof-of-stake blockchain. It uses a technique called “dynamic sharding” that splits the network so that much of the computation is actually being done in parallel. Therefore, the total number of validators and their assigned shards can change over time, based on the network usage (see [Nightshade documentation pages](../technical/nightshade.md) for technical details).
The bigger the stake of a validator, the larger the number of shards assigned to it, therefore the need for storage, bandwidth and computing power are proportional to the size of your operations.

Successful validators need to secure the following resources:
- A sufficient amount of NEAR tokens to stake.
- A reliable infrastructure for block production.
- A playbook of practices to ensure continuity.


## NEAR tokens to stake:

NEAR validators are elected at the end of each `epoch`, ordered by the size of their stake (technically, the ordered array `validatorAssignments`). Existing validators are re-elected automatically, by *re-staking* their tokens plus the rewards accrued during the previous epochs. New validator may replace an existing one if they offer a larger stake (or in case of availability fault, see below in the [Service Level Objectives](#Service-Level-Objectives) section).

You may source the NEAR tokens needed to become a validator by:
1. Stake your own NEAR tokens
2. Stake with delegated NEAR tokens

<blockquote class="warning">
	<strong>heads up</strong><br><br>
	At the beginning, the network will run on a limited number of shards. Therefore, it will reduce the computational needs for its largest nodes, but will increase the amount of NEAR tokens necessary to become validator.
	As a simple rule-of-thumb, a staking of 40% of the total supply (400 million out of 1 billion NEAR tokens), and 100 seats available, each validator will potentially need at least 4 million NEAR tokens to be elected (assuming uniform distribution across the seats).
</blockquote>

### 1. Stake your own NEAR tokens

Once you obtained enough tokens, use [NEAR Shell](../development/near-clitool.md) to issue a staking transaction. The protocol will add your transaction to the `proposals` until the end of the epoch. Then, if your offer is high enough, your node will become a validator after one more epoch.

### 2. Stake with delegated NEAR tokens

NEAR Protocol doesn't enforce delegation at the protocol level. Instead, it allows the creation of *smart contracts* that can be used by any token holder, opening infinite opportunities for your staking business.
At the current stage, this option is still very new and a work in progress, so please follow the [NEP repository on GitHub](https://github.com/nearprotocol/NEPs/blob/staking-contract/text/0000-staking-contract.md) for the specifications, and the 'Riskless Delegation' discussion on [Commonwealth](https://commonwealth.im/near/proposal/discussion/357-riskless-delegation-aka-tezos-delegation) to understand the incentives alignment.


## Build the infrastructure:

Once you defined the amount of NEAR tokens you need, you have to have an infrastructure of nodes that can securely serve the network. NEAR's validators have three main roles:
- Chunk Producers are responsible to collect transactions and apply them to the state
- Block Producers generate a single block containing all the current chunks 
- Fishermen (aka 'hidden' validators) challenge the state of any chunk to verify their validity

There are no specific requirements to follow, however expect to put in place multiple nodes, in order to provide the required availability and consistency to the network, and reduce your risks.

### Availability

Each validator must generate a minimum amount of chunks/blocks per epoch, proportionally to its stake and the number of *seats* won during the election. If this amount is below the `MINIMUM_THRESHOLD` (as of today, `90%`), the validator will be *kicked out* for availability fault at the end of the epoch.

As an example, a validator with 1% of the total stake will have to sign at least 0.9% of chunks/blocks when asked, otherwise it will lose the status of validator at the end of the epoch. When this happens, the validator must send a new staking transaction, get included in the `proposals`, and wait the election cycle to get back to its status - losing at least 24 hours of rewards.

### Consistency

## Maintaining the operations:

### Service Level Objectives

### Understanding the market dynamics

## Additional links:

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
