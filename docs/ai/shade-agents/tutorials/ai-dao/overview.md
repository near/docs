---
id: overview
title: Overview
sidebar_label: Overview
description: "A brief overview of the Verifiable AI DAO tutorial built using the Shade Agent Framework that walks through NEAR native deployments, using yield and resume with Shade Agents and leveraging verifiable AI."
---

import { TryDemo } from '@site/src/components/TryDemo';

:::warning
The Verifiable AI DAO tutorial uses an old version of the Shade Agent Framework, which contains known critical vulnerabilities and has a different architecture.

No representations or warranties are made regarding security, correctness, or fitness for any purpose. Use of this software is entirely at your own risk.

The tutorial will be updated to use the latest version of the Shade Agent Framework in the future.
:::

In this tutorial, you'll explore how to build a `fully verifiable AI DAO` using the Shade Agent Framework. The Verifiable AI DAO is a DAO smart contract that uses a Shade Agent with a verifiable LLM to vote on governance proposals according to its predefined manifesto, to create transparent, AI-driven governance that is decentralized and auditable from end-to-end.

This tutorial also serves as a `template` for building `yield and resume-based Shade Agents`. This is a smart contract that, when called, halts its execution for the verified agent to complete some logic and resume the transaction when it has a result, enabled by NEAR's asynchronous design. This pattern allows the agent and LLM become a part of the contract, enabling smart contracts with extended capabilities of a backend server that can make API calls and use LLM inference. This is especially useful when making cross-contract calls to smart contracts that use yield and resume, allowing you to receive the result in the callback - for example, an on-demand oracle.

---

## What You'll Learn

This tutorial demonstrates how key components of the Shade Agent Framework work together with NEAR's broader tech stack to create a product that is `decentralized and verifiable throughout the entire stack`. The tutorial covers:
- **NEAR-native Shade Agent**: How to develop a Shade Agent that operates exclusively on the NEAR blockchain
- **Yield and Resume Pattern**: Building a Shade Agent that uses the yield and resume pattern
- **Verifiable AI Integration**: Implementing a Shade Agent that uses NEAR AI's verifiable/private inference

---

## Required Knowledge 

To understand this tutorial, you should have familiarity with these concepts:
- [Shade Agents](../../getting-started/introduction.md) 
- [NEAR Smart Contracts](../../../../smart-contracts/what-is.md)

---

## Getting Started

The complete source code for this tutorial is available in the [verifiable-ai-dao repository](https://github.com/NearDeFi/verifiable-ai-dao).

Continue to the [Agent Contract section](./dao-agent-contract.md) to get started and learn about implementing yield and resume-based agent contracts.