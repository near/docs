---
id: what-can-you-build
title: What can you Build?
sidebar_label: What can you Build?
description: "Explore the features of Shade Agents and what they enable you to build, including Agentic Protocols, autonomous yield optimizers, and verifiable oracles."
---

With their extensive list of features, Shade Agents unlock a wide range of new use cases, enable many previously centralized apps to become decentralized, and change how blockchain applications are designed. 

## Shade Agent Features

Shade Agents are:
- **Non-custodial** - No one entity controls the private keys of the agent (MPC signing). 

- **Verifiable** - Agent code is known and executes as expected; no one can tamper with the agent.

- **Multichain** - Can hold any crypto asset and sign transactions on any chain.

- **AI Powered** - Can verifiably access LLMs. 

- **Confidential** - Inputs and state of the agent can be private. 

- **Flexible** - Interact with off-chain data and APIs beyond blockchain VM limits.

- **Low cost** - Run intensive computation cheaply without gas limits (~20% TEE overhead compared to standard servers).

---

## Agentic Protocols 

Shade Agents enable a new paradigm of decentralized applications where a component of the logic for a protocol is run in a verifiable off-chain environment. This allows for more flexibility in terms of computation, cost, privacy, and the data you have access to. Agentic Protocols are designed to be autonomous, proactive, and intelligent.

- A Yield Optimizer that earns optimal yield on assets across various DeFi protocols on different chains and autonomously rebalances according to a verifiable algorithm to get users the best rate, always.
- A staking protocol that can implement complex reward mechanics.
- A private DAO agent on Ethereum Mainnet that takes votes confidentially and publishes the end result in a single transaction.
- A smart contract that can verifiably book users' plane tickets by calling the contract with funds and passing secrets (passport information and email address) to the agent directly.

---

## Flexible Oracles 

Since Shade Agents can access off-chain data and APIs, they make great cheap, flexible, quick-to-spin-up oracles.

- A custom data oracle where app developers list a number of different sources, a consensus mechanism (4 of 5 sources state the same data), and the frequency with which data is pushed (or on demand), which allows smart contracts to access any data verifiably.
- A prediction market resolver agent that uses an LLM to interpret multiple webpages and APIs to resolve markets quickly and accurately.
- Verifiable randomness oracle.

---

## Smart Contracts using LLMs

Shade Agents allow you to access LLMs from a smart contract that lives on any chain. The LLM and agent are both running in a TEE, so one can verify that the response from the agent is actually from an LLM and its response is a function of the provided inputs.

There are two main flows:

1) The smart contract emits an event during a function call, the agent indexes this, uses the LLM to make a decision, and the agent calls a function on the contract with the result that is restricted to the agent's address.
2) Users interact with the agent which makes decisions via the LLM and carries out certain on-chain actions based upon the decision (transfers, function calls, swaps, etc.).

With this, you could create:
- A DAO with an AI President that makes decisions based on aggregate user opinions, historical context, and user reputation formulated from on-chain and off-chain data.
- A decentralized social platform that uses an LLM to moderate content.
- A treasury that trades assets according to news, sentiment, and historical price.

---

## Custom Authentication 

Shade agents allow users to control accounts through ways other than a private key and have it be non-custodial. 

- A prediction market that lets you create new markets and place bets all from Twitter (X).
- A more secure social onboarding experience where you can log in via Google, Email, etc. 
- A Telegram bot for trading within a group chat.