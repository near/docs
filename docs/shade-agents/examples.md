---
id: examples
title: What can you Build?
sidebar_label: What can you Build?
---

# What can you build with Shade Agents?

With their extensive list of features, Shade Agents enable a wide range of new use cases, enable many previously custodial apps to become non-custodial, and change how blockchain applications are designed. Some ideas have been laid out below:


### Agentic Protocols 

Shade agents enable a new paradigm where most of the logic for a web3 system is run in a verifiable off-chain environment. This allows for more flexibility in terms of computation, cost, privacy, and the data you have access to.

- A Yield Optimizer that earns optimal yield on assets across various DeFi protocols on different chains and that autonomously rebalances according to a verifiable algorithm.
- A private DAO agent on Ethereum Mainnet that takes votes confidentially and publishes the end result in a single transaction.
- A staking protocol that implements complex reward mechanics cheaply.


### Smart Contracts using LLMs

Shade Agents allow you to access LLMs from a smart contract that lives on any chain. The LLM and agent are both running in a TEE, so we know that the response from the agent is actually from an LLM and its response is a function of the provided inputs.

There are two main flows:

- The smart contract emits an event during a function call, the agent indexes this, uses the LLM to make a decision, and the agent calls a function on the contract with the result that is restricted to the agent's address.
- Users interact with the agent which makes decisions via the LLM and carries out certain on-chain actions based upon the decision (transfers, function calls, swaps, etc.).

With this, you could create:
- A DAO with an AI President that makes decisions based on aggregate user opinions, historical context, and user reputation formulated from on-chain and off-chain data.
- A decentralized social platform that uses an LLM to moderate content.
- A treasury that trades assets according to news, sentiment, and historical price.


### Custom Authentication 

Shade agents allow users to control accounts through ways other than a private key and have it be non-custodial. 

- A prediction market that lets you create new markets and place bets all from Twitter (X).
- A more secure social onboarding experience where you can log in via Google, Email, etc. 
- A Telegram bot for trading within a group chat.


### Flexible Oracles 

Since Shade Agents can access off-chain data and APIs, they make great flexible, quick-to-spin-up oracles.

- A custom data oracle where app developers list a number of different sources, a consensus mechanism (4 of 5 sources state the same data), and the frequency with which data is pushed (or on demand), which allows smart contracts to access any data verifiably.
- A prediction market resolver agent that uses an LLM to interpret multiple webpages and APIs to resolve markets quickly and accurately.
- Verifiable randomness oracle.
