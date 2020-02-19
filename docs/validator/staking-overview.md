---
id: staking-overview
title: Validator Quickstart
sidebar_label: Orientation
---

## Welcome

This section introduces you to the validation process and some additional resources.

NEAR Protocol is a Proof-of-Stake (PoS) blockchain, and validators are nodes that manage any new transactions, adding them to new blocks. Every new block provides revenues for the validator in form of NEAR tokens, which are sourced from transaction fees and protocol rewards. In order to become a validator, a node must stake a certain amount of NEAR tokens, which are used as a collateral against "equivocation", which means the malicious creation of multiple rival blocks at the same time. The tokens at stake cannot be spent until the validation cycle, called epoch, is over.

The protocol automatically elects validators issuing an auction for each epoch: nodes bidding with the highest stake become validators, while any insufficient stake will be returned right before the epoch is ready to begin, and become again available to be spent. 

**Important** to note: As a validator you do not have to know about the underlying blockchain infrastructure. Once you have set-up a validator node, it runs all processes automatically. Meaning, that you do not have to interfere with the node and you are only required to set up one node to start validating.

## The Process

1. To get started validating please go to the next section on [Staking and becoming a Validator](../validator/staking.md).

2. You are still here? If you want to learn more about NEAR, have a look at

    * [The Beginner’s Guide to the NEAR Blockchain](https://nearprotocol.com/blog/the-beginners-guide-to-the-near-blockchain/) to get a high level overview on NEAR.
    * [Nightshade](../technical/nightshade.md) to gain a more detailed understanding of our consensus mechanism.
    * [Economics in Sharded Blockchain](https://nearprotocol.com/wp-content/uploads/2019/10/Economics_in_Sharded_Blockchain.pdf) to know more about the incentives structure of NEAR.

3. If anything is unclear, you get stuck, or you just want to chat with fellow validators, please head over to our [Telegram group](https://t.me/near_validators). There we have a dedicated validator channel to answer all of your questions.
