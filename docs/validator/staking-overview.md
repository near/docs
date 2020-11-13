---
id: staking-overview
title: Staking Orientation
sidebar_label: Orientation
---

## Welcome

This section introduces you to staking principles and running your validating node.

NEAR Protocol uses Proof-of-Stake (PoS) to secure its blockchain. _Validators_ represent the community of node operators that take care of the [blockchain consensus](../roles/integrator/faq#which-consensus-algorithm-does-near-use). Technically, the _validating nodes_ are servers that aggregate transactions into blocks, execute them, and maintain the latest state of the blockchain. The owners of these nodes, the _Validators_, get rewards for their service at the end of every epoch (\~12 hours).

All Validators must _stake_ a certain amount of NEAR tokens, which represent a collateral against their dishonest behavior. _Staked tokens_ can't be spent: if a dishonest Validator attacks the blockchain consensus, the protocol progressively destroys their stake (see [slashing](staking-faq#what-is-a-slashing-behavior)).
Staked tokens can be _unlocked_ anytime, but remain unspendable for three epochs, even after the validating node goes offline or decides to stop validating.

NEAR protocol automatically picks the best validators with an auction. Anyone running a validating node can participate by staking their tokens. At the end of every epoch, NEAR automatically selects the nodes with the biggest stake, making them eligible to generate new blocks and get rewards. If the stake is too small, the validating node will not receive a _validator seat_ and will work as a normal relay node, waiting for the next epoch (see the [market dynamics](economics#understand-market-dynamics) from the validator economics page).

Validators can increase their stake, thus their rewards, by asking for _delegation_. Delegation is the opportunity for all token holders to stake in partnership with a Validator, leasing a small portion of their validating node. _Delegators_ can lock their funds into a [_staking pool_](https://github.com/near/core-contracts), and receive rewards at the end of every epoch, minus the fees paid to the Validator.

NEAR rewards are predictable, and proportional to your stake. The protocol generates new tokens at a rate of \~5% of the total supply (annualized) and most of them are rewards. As an example, if the total supply is 1 billion tokens, and the annualized rewards are \~4.5%, all Validators will share 45 million NEAR tokens (see the [economics page](/docs/validator/economics) for more details). Regardless if you are Validator or Delegator, the bigger the stake you provide, the higher your cut of those rewards.


## For Delegators
If you want staking rewards, but you don't want to run your own validating node, spend anyway some time to know NEAR economics and what it takes to become a great Validator. Good starting points are:

1. Understand the [Economics of a Validator](/docs/validator/economics)
2. Look at the current Validators on the [block explorer](https://explorer.near.org/nodes/validators). Gather information on their reliability, fees and current stake.
4. Properly plan your tokens custody, starting from the [available custody options](../tokens/token-custody).
5. Verify what Validators offer to you, asking if they use the [staking pool](https://github.com/near/core-contracts) from NEAR Core Contracts, or their own smart contracts.
6. If you are proficient with command-line interface, look at the [delegation page](/docs/validator/delegation) for a list of low-level commands you can use to stake.
7. Join the Validators channels on [Discord](https://near.chat) to ask questions and meet NEAR staking community.

<blockquote class="info">
    <strong>did you know?</strong><br><br>
    NEAR Protocol doesn't punish Delegators. So, if your favorite Validator screws up and get slashed, you will only lose a few rewards, and your stake will remain untouched.
</blockquote>


## For Validators
You are decided to see how deep the rabbit hole goes? No worries!
NEAR is like many other Proof of Stake networks: keep your servers online \~100% of the time, be always ready to update your node, participate in the community.
However, you have important differentiation factors, such as staking via smart contracts; planned protocol upgrades without hard forks; gas fees that burn tokens instead of giving rewards.

You can find additional material below:

1. Understand the [Economics of a Validator](/docs/validator/economics)
2. Check the basic [staking commands](/docs/validator/staking)
3. Deploy your staking pool from the [core contracts](https://github.com/near/core-contracts)


You are still here? If you want to learn more about NEAR, have a look at
* [The Beginner’s Guide to the NEAR Blockchain](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) to get a high level overview on NEAR.
* [The NEAR Whitepaper](https://near.org/papers/the-official-near-white-paper) to see the big picture.
* [Economics in Sharded Blockchain](https://near.org/papers/economics-in-sharded-blockchain/) to know more about the incentives structure of NEAR.
* [Sharding Design: Nightshade](https://near.org/papers/nightshade) to gain a more detailed understanding of the consensus mechanism.

If anything is unclear or you get stuck, please head over to our official chat on [Discord](https://near.chat), and join the validators section. 

<blockquote class="warning">
	<strong>Heads up!</strong><br><br>
	Once you open the Discord link above, you must complete an automated verification and enable your role as "validator", otherwise you'll not be able to send messages in the validator channels.
</blockquote>


## Stake Wars is back!

Stake Wars is NEAR's incentivized testnet for professional validators.

NEAR’s [MainNet](https://explorer.near.org/) entered its second phase, called “MainNet: Restricted” ([see full roadmap](https://near.org/blog/mainnet-roadmap/)). This means that a small group of validating nodes are currently running the network, and voting to enable inflation and rewards. In order to progress to the next phase, “MainNet: Community governed", the operation of the network will require Validators to collect staking and vote on-chain. 

The goal of Stake Wars: Episode II is to onboard those validators, test the stability of the system, and begin introducing some of the unique aspects of NEAR’s delegation in preparation for the next phase of MainNet itself.

If you want to know more about this opportunity, read the [Stake Wars Episode II blog post](https://near.org/blog/stake-wars-episode-ii/).

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
