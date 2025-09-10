---
id: overview
title: Overview
sidebar_label: Overview
description: "TODO"
---

# Verifiable AI DAO

In this example, we'll explore how to build a `verifiable AI DAO` using the Shade Agent Framework.

The DAO has a manifesto that is set by the admin that states how the DAO should decide which proposals to approve and which to deny. Anyone can submit a proposal to the DAO. Once submitted, the Shade Agent will use an LLM to vote on the proposal. The agent will then respond to the contract with an `Approved` or `Rejected` decision and a reason for the decision. The DAO voting process is simply an LLM that uses the proposal and manifesto to vote, but this could be extended to take into account sentiment online and use advanced reasoning.

:::tip Live Demo
Try the live demo here.
:::

This example is not just a learning tool but also serves as a great `template for building yield and resume-based Shade Agents` - that being a smart contract that, when called, halts its execution for the agent to complete some logic and resume the transaction when it has a result, enabled by NEAR's asynchronous design. This way, the agent and LLM become a part of the contract, and you can now build smart contracts with similar trust assumptions that have the extended capabilities of a backend server (can call APIs, use LLMs, etc.).

---

## What You'll Learn

This example covers several key components of the Shade Agent Framework along with NEAR's tech stack in general and how they can work together to create a product that is `decentralized and verifiable throughout the whole stack`. This example covers:
- **NEAR-native Shade Agent**: How to develop a Shade Agent that operates exclusively on NEAR Protocol
- **Yield and Resume Pattern**: Building a Shade Agent that uses the yield and resume model
- **Verifiable AI Integration**: Implementing a Shade Agent that uses verifiable inference


## Getting Started

All the code referenced in this example can be found in this [repo](https://github.com/NearDeFi/verifiable-ai-dao).

Head over to the [Agent Contract section](./agent-contract.md) to learn about implementing yield and resume-based agent contracts.

