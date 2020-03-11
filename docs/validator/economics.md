---
id: economics
title: The Economics of a Validator
sidebar_label: Understanding Economics
---

## Overview

NEAR is a sharded, developer-friendly, proof-of-stake blockchain. It uses a technique called “dynamic sharding” that splits the network so that much of the computation is actually being done in parallel. Therefore, the total number of validators and their assigned shards can change over time, based on the network usage (see [Nightshade documentation pages](../technical/nightshade.md) for technical details on its future work).
The bigger the stake of a validator, the larger the number of shards assigned to it, therefore the need for storage, bandwidth and computing power are proportional to the size of your operations.

Successful validators need to secure the following resources:
- A sufficient amount of NEAR tokens to stake.
- A reliable infrastructure for block production.
- A playbook of practices to ensure continuity.


## NEAR tokens to stake:

NEAR validators are elected at the end of each `epoch`, ordered by the size of their stake (technically, the ordered array `validatorAssignments`). Existing validators are re-elected automatically, by *re-staking* their tokens plus the accrued rewards. New validators may replace an existing one if they offer a larger stake (or in case of availability fault, see below in the [Service Level Objectives](#Service-Level-Objectives) section).

You may source tokens to become a validator by:
1. Staking your own NEAR tokens
2. Staking with delegated NEAR tokens

<blockquote class="warning">
	<strong>heads up</strong><br><br>
	At the beginning, the network will run on a limited number of shards. Therefore, it will reduce the computational needs for its largest nodes, but will have more competition, increasing the minimum amount of NEAR tokens to become a validator.
	As a simple rule-of-thumb, a staking of 40% of the total supply (400 million out of 1 billion NEAR tokens), and 100 validator seats available, will potentially need at least 4 million NEAR tokens to be elected (assuming uniform distribution across the seats).
</blockquote>

### 1. Stake your own NEAR tokens

Once you obtained enough tokens, use [NEAR Shell](../development/near-clitool.md) to issue a staking transaction. The protocol will add your transaction to the `proposals` until the end of the epoch. Then, if your offer is high enough, your node will become a validator after one more epoch.

### 2. Stake with delegated NEAR tokens

NEAR Protocol doesn't enforce delegation at the protocol level. Instead, it allows the creation of *smart contracts* that can be used by any token holder, opening infinite opportunities for your staking business.
At the current stage, this option is still very new and a work in progress, so please follow the [NEP repository on GitHub](https://github.com/nearprotocol/NEPs/blob/staking-contract/text/0000-staking-contract.md) for the specifications, and the 'Riskless Delegation' discussion on [Commonwealth](https://commonwealth.im/near/proposal/discussion/357-riskless-delegation-aka-tezos-delegation) to understand the incentives for delegators.


## Build the infrastructure:

Once you defined the amount of NEAR tokens you need, you need an infrastructure that can securely serve the network. NEAR's validators have three main roles:
1. Chunk Producers are responsible to collect transactions and apply them to the state
2. Block Producers generate a single block containing all the current chunks 
3. Fishermen (aka 'hidden' validators) challenge the state of any chunk to verify their validity

There are no specific requirements to run a validator node, however expect to put in place multiple instances, in order to provide the required availability and consistency to the network, and reduce your risks.

### Availability

Each validator must generate a minimum amount of chunks/blocks per epoch, proportionally to its stake and the number of *seats* won during the election. If this amount is below the `MINIMUM_THRESHOLD` (as of today, `90%`), the validator will be *kicked out* for availability fault at the end of the epoch.
As an example, a validator with 1% of the total stake will have to sign at least 0.9% of chunks/blocks during an epoch, otherwise it will lose the status of validator at the end of it. When this happens, the validator must send a new staking transaction, get included in the `proposals`, and wait the entire election cycle - losing at least 24 hours of rewards.
Therefore, validators may want a system that can be available >90% of the time, with multiple redundant nodes and fallback connectivity.


### Consistency

Each validator must submit a *valid state* to the blockchain, otherwise its stake will get slashed (with the subsequent loss of funds). Such episodes may happen involuntarily if a highly available system uses more than one node at the same time, and submits by error the same block more than once.


## Maintaining the operations:

Validators must keep the service up and running for them and their delegators. This goal is achieved by:
1. Keep the infrastructure updated, to maintain the *service level objectives*
2. Maintain the role of validator, by understanding the market dynamics

### Service Level Objectives

There are two main aspects to take care of:
- Keep the node up to date, such that any software update is tested and applied without any service interruption. Having infrastructure-as-code and DevOps might simplify in the long term, at the cost of higher overhead if an update changes the node APIs.
- Build and maintain an incident/response playbook, such that any failure of the nodes is promptly addressed and resolved.  

### Understanding the market dynamics

## Additional links:

- [Nightshade Documentation](../technical/nightshade.md)
- [Sharding in Plain English](https://www.citusdata.com/blog/2018/01/10/sharding-in-plain-english/)
