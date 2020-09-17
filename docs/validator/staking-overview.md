---
id: staking-overview
title: Staking Orientation
sidebar_label: Orientation
---

## Welcome

This section introduces you to the process of staking and running your validator node.

NEAR Protocol uses Proof-of-Stake (PoS) to secure its blockchain. We call _Validators_ (with capital `V`) the community of node operators that take care of the [blockchain consensus](../integrator/faq#which-consensus-algorithm-does-near-use). Technically, the _validator nodes_ (lowercase `v`) are servers that aggregate transactions into blocks, execute them, and maintain the latest state of the blockchain. The owners of these nodes, the _Validators_, get rewards for their service at the end every epoch (\~12 hours).

All Validators must _stake_ a certain amount of NEAR tokens, which become a collateral against dishonest behavior. _Staked tokens_ can't be spent: if a dishonest Validator attacks the blockchain consensus, the protocol progressively destroys their stake, until they cease the attack (see [slashing](validator-faq#what-is-a-slashing-behavior)).
Staked tokens can be _unlocked_ anytime, but remain unspendable for three epochs, even after the validator node goes offline or decides to stop validating.

NEAR protocol automatically picks the best validators by an auction. Anyone running a validator node can participate by staking their tokens. At the end of every epoch, NEAR automatically selects the nodes with the biggest stake, making them eligible to receive the rewards. Essentially, Validators stake their tokens, take care of the blockchain, and receive back additional tokens as a reward.

Validators can increase their stake, thus their rewards, by asking for _delegation_. Delegation is the opportunity for all token holders to stake in partnership with a Validator, leasing a small portion of their validator node. _Delegators_ can lock their funds into a _staking pool_, and receive rewards at the end of every epoch, minus the fees paid to the Validator.

## I want to be a Delegator!
If you want to get staking rewards, but you don't want to run your own validator node, spend time to know how NEAR economics work, and what makes a good Validator. Good starting points are:

1. Understand the economics of Proof of Stake from a Validator point of view: [Economics of a Validator](/docs/validator/economics)
2. Look at the Validators on the [block explorer](https://explorer.near.org/nodes/validators), and gather information on their reliability, fees and their current stake.
3. Beware of the software risks, a bug could make your funds unspendable or take your rewards to zero. Always verify what Validators offer to you, and check if they use the [core contracts](https://github.com/near/core-contracts), or their own smart contracts.
4. Join the Validators community at [https://near.chat] to ask questions and get to meet them. And if you see something suspicious, contact NEAR moderators immediately

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    NEAR Protocol doesn't punish Delegators. So, if your favorite Validator screws up and get slashed, you will only lose a few rewards, and your stake will remain untouched.
</blockquote>


## I want to be a Validator!



## Heads up! Stake Wars is back!

Stake Wars is NEAR's incentivized testnet for professional validators.

NEAR’s [MainNet](https://explorer.near.org/) recently launched into its first phase, called “POA” ([see full roadmap](https://near.ai/mainnet-roadmap)). This means that a small handful of validating nodes are currently being run by the core team. In order to progress to the next phase, “MainNet: Restricted”, the operation of the network will be handed off to a large group of node operators called validators. 

The goal of Stake Wars: Episode II is to onboard those validators, test the stability of the system, and begin introducing some of the unique aspects of NEAR’s delegation in preparation for the next phase of MainNet itself.

If you want to know more about this opportunity, read the [Stake Wars Episode II blog post](https://near.org/blog/stake-wars-episode-ii/).

## The Process to Become Validator

1. Understand the economics of Proof of Stake, and how do they work for NEAR validators. Please go to the economics section on [Economics of a Validator](/docs/validator/economics)

2. To begin validating, please go to the technical section on [Staking and becoming a Validator](/docs/validator/staking).

3. You are still here? If you want to learn more about NEAR, have a look at

    * [The Beginner’s Guide to the NEAR Blockchain](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) to get a high level overview on NEAR.
    * [The NEAR Whitepaper](https://near.org/papers/the-official-near-white-paper) to see the big picture.
    * [Economics in Sharded Blockchain](https://near.org/papers/economics-in-sharded-blockchain/) to know more about the incentives structure of NEAR.
    * [Sharding Design: Nightshade](https://near.org/papers/nightshade) to gain a more detailed understanding of our consensus mechanism.

4. If anything is unclear or you get stuck, please head over to our official chat on [Slack](https://near.chat) in the channels `#community-validator-announcement` and `#community-validator-troubleshooting`.
Alternatively, if you just want to chat with fellow validators, we are still keeping our [Telegram group](https://t.me/near_validators) and [Discord](https://discord.gg/ZMPr3VB) up and running, but NEAR core team participation will be limited. 