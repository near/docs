---
id: overview
title: Overview
sidebar_label: Overview
description: "A brief overview of the Verifiable AI DAO example built using the Shade Agent Framework that walks through NEAR native deployments, using yield and resume with Shade Agents and leveraging verifiable AI."
---

import { TryDemo } from '@site/src/components/TryDemo';

# Verifiable AI DAO

In this example, you'll explore how to build a `fully verifiable AI DAO` using the Shade Agent Framework. The Verifiable AI DAO is a DAO smart contract that uses a Shade Agent with a verifiable LLM to vote on governance proposals according to its predefined manifesto, to create transparent, AI-driven governance that is decentralized and auditable from end-to-end.

<TryDemo 
  url="https://verifiable-ai-dao.vercel.app/" 
  text="Try the live demo"
/>

This example also serves as a `template` for building `yield and resume-based Shade Agents`. This is a smart contract that, when called, halts its execution for the verified agent to complete some logic and resume the transaction when it has a result, enabled by NEAR's asynchronous design. This pattern allows the agent and LLM become a part of the contract, enabling smart contracts with extended capabilities of a backend server that can make API calls and use LLM inference. This is especially useful when making cross-contract calls to smart contracts that use yield and resume, allowing you to receive the result in the callback - for example, an on-demand oracle.

---

## What You'll Learn

This example demonstrates how key components of the Shade Agent Framework work together with NEAR's broader tech stack to create a product that is `decentralized and verifiable throughout the entire stack`. The example covers:
- **NEAR-native Shade Agent**: How to develop a Shade Agent that operates exclusively on the NEAR blockchain
- **Yield and Resume Pattern**: Building a Shade Agent that uses the yield and resume pattern
- **Verifiable AI Integration**: Implementing a Shade Agent that uses NEAR AI's verifiable/private inference

---

## Required knowledge 

To understand this example, you should have familiarity with these concepts:
- [Shade Agents](../../introduction.md) 
- [NEAR Smart Contracts](../../../../smart-contracts/what-is.md)
- [Custom Agent Contracts](../../custom-agent-contract.md)

---

## Getting Started

The complete source code for this example is available in the [verifiable-ai-dao repository](https://github.com/NearDeFi/verifiable-ai-dao).

Continue to the [Agent Contract section](./dao-agent-contract.md) to get started and learn about implementing yield and resume-based agent contracts.