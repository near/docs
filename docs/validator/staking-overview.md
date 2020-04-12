---
id: staking-overview
title: Validator Quickstart
sidebar_label: Orientation
---

## Welcome

This section introduces you to the validation process and some additional resources.

NEAR Protocol is a Proof-of-Stake (PoS) blockchain, and validators are nodes that aggregate transactions into blocks, execute them, and maintain the latest state of the blockchain. Validators are rewarded for participation for every epoch they are doing their work. A validator node must stake a certain amount of NEAR tokens, which are used to prevent Sybil attacks and as collateral against malicious behaviors. Staking protects the network from attacks like "double signing" (signing multiple blocks at the same height) and, generally, committing an invalid state transition of the blockchain. The tokens at stake are locked even after the validator goes offline or decides to stop validating. The stake becomes liquid only after a certain number of epochs, to prevent nothing-at-stake attacks within a short period of time.

The protocol automatically elects validators by issuing an auction for each epoch: new nodes can join by bidding a higher stake than existing ones, while funds from accounts that didn't provide sufficient amount will be returned at the end of the next epoch. 

**Important** to note: As a validator you do not have to know about the underlying blockchain infrastructure. Once you have set-up a validator node, it runs all processes automatically. Meaning, that you do not have to interfere with the node and you are only required to set up one node to start validating.

## The Process

1. Understand the economics of Proof of Stake, and how do they work for NEAR validators. Please go to the economics section on [Economics of a Validator](../validator/economics.md)

2. To begin validating, please go to the technical section on [Staking and becoming a Validator](../validator/staking.md).

3. You are still here? If you want to learn more about NEAR, have a look at

    * [The Beginner’s Guide to the NEAR Blockchain](https://nearprotocol.com/blog/the-beginners-guide-to-the-near-blockchain/) to get a high level overview on NEAR.
    * [The NEAR Whitepaper](https://nearprotocol.com/papers/the-official-near-white-paper) to see the big picture.
    * [Economics in Sharded Blockchain](https://nearprotocol.com/papers/economics-in-sharded-blockchain/) to know more about the incentives structure of NEAR.
    * [Sharding Design: Nightshade](https://nearprotocol.com/papers/nightshade) to gain a more detailed understanding of our consensus mechanism.

4. If anything is unclear, you get stuck, or you just want to chat with fellow validators, please head over to our [Telegram group](https://t.me/near_validators). There we have a dedicated validator channel to answer all of your questions.
