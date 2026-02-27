---
id: framework-overview
title: Framework Overview
sidebar_label: Framework Overview
description: "Learn about the core components of the Shade Agent Framework with a high-level overview of each of its parts."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

The **Shade Agent Framework** is a platform for creating Web3 agents and off-chain services that are **verifiable**, **trust-minimized**, and **decentralized**. It leverages **on-chain signing** to allow agents to hold assets and sign transactions on most blockchains and implement strict **guardrails** to prevent unauthorized actions.

It includes the **Shade Agent API**, the **Shade Agent CLI**, and an **agent contract reference implementation**. The framework aims to abstract most of the underlying TEE and blockchain interactions so you can focus on building your application.

---

## Architecture Overview

A **Shade Agent** has two main parts: the **agent** (off-chain) and the **agent contract** (on-chain). The agent is a backend service that runs in a TEE (or locally in dev) and holds your business logic; it uses the Shade Agent API to register and interact with the agent contract. The agent contract is a NEAR smart contract that decides who can act as an agent (via attestations, approved measurements, and PPIDs), enforces guardrails, and gives valid agents access to on-chain signing via chain signatures (MPC signing). One agent contract can have many registered agents - for example, several instances running the same code for redundancy, or different agents for different tasks.

By default, agents are deployed to Phala Cloud, but you can deploy them to other TEE providers that support Dstack.

---

## Shade Agent API

The Shade Agent API is a **TypeScript/JavaScript** library that connects your agent to the Shade Agent Framework. It abstracts TEE complexity and simplifies calls to the agent contract. You can learn more about the Shade Agent API on the [API page](../reference/api.md).

---

## Shade Agent CLI

The Shade Agent CLI makes it easy to deploy a Shade Agent. Including building and deploying your agent contract, building and publishing your agent's Docker image, and deploying the agent to Phala Cloud. You can learn more about the Shade Agent CLI on the [CLI page](../reference/cli.md).

---

## Agent Contract Reference Implementation

A walkthrough of the agent contract reference implementation is available on the [Agent Contract Reference Implementation page](../reference/agent-contract.md). It contains the fundamental agent contract logic which you can use as a starting point for your own agent contract.

---

Now that you have an overview of the framework, here are some great sections to explore next:
1. Framework components: [API](../reference/api.md), [CLI](../reference/cli.md), and [Agent Contract Reference Implementation](../reference/agent-contract.md).
2. [Tutorials and Templates](../tutorials/tutorials-overview.md) - get up and running with different Shade Agent architectures and use cases as quickly as possible, and learn how to build apps in full.
3. [What can you build?](../concepts/what-can-you-build.md) - learn about the different types of applications you can build with Shade Agents.
4. [Terminology](../concepts/terminology.md) - learn the key terms and concepts used in the Shade Agent Framework.
5. [Security Considerations](../concepts/security.md) - check your agent abides by best practices.

<SigsSupport />