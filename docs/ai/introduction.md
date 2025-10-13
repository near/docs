---
id: introduction
title: AI and NEAR
sidebar_label: Introduction
description: "Introduction to NEAR's User-Owned AI vision, featuring Shade Agents, NEAR AI, and Bitte Protocol."
---

NEAR's vision is to create a future of **User-Owned AI**, where AI and agents serve their users, not corporations. For this vision to become a reality, AI must protect user data, prioritize the user's interests, and operate on a sustainable, user-aligned economic model. The NEAR ecosystem has multiple technologies to enable User-Owned AI.

![img](/assets/docs/welcome-pages/9.near-nodes.png)

---

## Shade Agents

[Shade Agents](./shade-agents/getting-started/introduction.md) are an AI agent framework to create verifiable agents that can control accounts across multiple blockchains with the assurance that the agent cannot lose access to its accounts and that its private keys will never be revealed. They are the first truly **verifiable**, **non-custodial**, **multichain AI agents** with no single point of failure.

Current Web3 agents fall into one of two camps:
1. They are trustless and verifiable by creating and using a private key within a trusted execution environment (TEE), but if the TEE goes down, the accounts and funds are lost.
2. The accounts are persistent, but the agents are centralized.

Shade Agents provide verifiability, non-custody, and persistent accounts by operating in TEEs and implementing decentralized key management. Any agent running with the same code inside a TEE can access the same accounts.

These agents can autonomously sign transactions across any chain, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations, offering the flexibility and performance of Web2 with the verifiability of Web3.


:::info
Shade Agents power [Agentic Protocols](./shade-agents/concepts/what-can-you-build#agentic-protocols): a new type of decentralized application designed to be autonomous, proactive, and intelligent.
:::

---

## NEAR AI

[NEAR AI](https://docs.near.ai/) is building **agent network infrastructure** to support User-Owned Agents. Their work includes:
- Monetizable open-source AI agents
- Agent-to-agent communication
- End-to-end confidential iterations with agents

Agents are accessible through the [NEAR AI Assistant](https://chat.near.ai/chat), a single interface that intelligently selects the most appropriate agents to handle user requests and connects multiple agents together for more complex tasks. The assistant can take actions for the user, has integrated payments, and can dynamically generate frontends on the fly based on user requests.

---

## Bitte Protocol

[Bitte Protocol](https://docs.bitte.ai/agents/build-agent) is a framework for creating AI agents that interact with smart contracts on NEAR and other chains via natural language. Bitte agents are quick and easy to get started with, you can build an agent for a smart contract in a couple of hours with little prior knowledge of agents. 
