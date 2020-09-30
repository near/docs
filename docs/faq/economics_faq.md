---
id: economics_faq
title: Economics FAQ
sidebar_label: Economics FAQ
---

Welcome to the Frequently Asked Questions. To contribute, use the `Edit` button on the right.

This is the Economics FAQ, where we'll answer common questions about the economics of NEAR.

For specific questions about the token distribution, please see [this blog post](https://near.org/blog/near-token-supply-and-distribution/).


## General Economics

### What are the basic denominations of NEAR?
*Last Updated: 20200103*

We use “NEAR” as a basic denomination. The plural is “NEAR”.
1 NEAR has 1e24 yotco-NEAR. Or 1000 milliNEAR, 1M microNEAR.
Total supply of NEAR at launch is 1 billion.


### Where can I learn more about your token economics?
*Last Updated: 20200803*

Please head over to our economics paper https://near.org/papers/economics-in-sharded-blockchain/ or, for a shorter version, see the economics blog post at https://near.org/blog/near-protocol-economics/.


### Can NEAR tokens be staked or delegated while locked?
*Last updated: 20200902*

Yes. They cannot be transferred while they are still locked but staking and delegation is possible.  For a full breakdown of token distribution and lockups, please see the [Token Distribution Post](https://near.org/blog/near-token-supply-and-distribution/).


### What are the advantages to receiving tokens prior to transfers being unrestricted? 
*Last updated: 20200902*

For tokenholders who are receiving tokens prior to "[Phase II](https://near.org/blog/mainnet-roadmap/)", you have the advantage of being able to set up your custody and staking options in advance and, importantly, to participate in the vote to unrestrict transfers.  There is no inflation prior to transfers being enabled, so there are no block rewards during that period (and thus no dilution for non-participating holders). 


### How much stake is required for a staking pool to work?
*Last updated: 20200902*

1/10th of the cost of a single seat is required for a staking pool to submit itself for the following epoch to participate in staking.  If it doesn't contain enough tokens, it unstakes everything and must be restaked.  

The pool can accumulate delegation in small amounts but won't be able to successfully submit staking transactions (there will be errors called `InsufficientStake` errors after each new delgation attempt) until the 1/10th threshold is reached.


### Is NEAR a *delegated* proof of stake network?
*Last updated: 20200930*

This is kind of a strange question because any proof of stake network that is a smart contract platform is also delegated. Why? Proof of stake has to have some sort of limits to the number of validators who are actively producing blocks because by definition they have to come to a stake-weighted agreement about the proper state of the chain and this requires networked communication and processing power. If the network is going to be sufficiently fast, these producers have to be either colocated (not decentralized) or limited in number to some degree.  This number can be small (eg just a handful) or it can be sharded and grow -- for example, in NEAR, there are 100 validator seats per shard, so this will grow to `100 * num_shards` as the number of shards grow. But it still has to be fundamentally limited somehow unless you can increase the speed of light (good luck).

If there are proof of stake networks which are also smart contract platforms and they don't explicitly enable delegation on the protocol level, it is easy to build smart contracts that create delegation synthetically. In fact, delegation through smart contracts is more flexible and powerful than delegation that takes place using a rigid set of protocol-level processes.  One advantage is that pool operators can heavily customize the characteristics of their pools (like bonuses for delegating over a long period of time or providing different amounts of tokens) rather than simply competing with other pools only on the price they charge.  This creates a more diverse, dynamic and balanced ecosystem.

So, to conclude, NEAR is a proof of stake network.  And there are delegation smart contracts which allow anyone holding tokens to help participate in securing the network and earn some rewards for doing so.  This is the same principle as any other POS smart contract platform, just implemented in a way that provides more flexibility than usual and thus makes NEAR more effective.

