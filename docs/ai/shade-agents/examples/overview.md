---
id: overview
title: Templates and Examples
sidebar_label: Overview
description: "Review the list of our Shade Agent templates and examples."
---

This section provides templates and examples to help you get started building Shade Agents.

## Quickstart Template

The [Quickstart](../quickstart/deploying.md) provides a `basic template` for building your first `multichain` Shade Agent. It demonstrates the core components of the framework, walks you through the deployment process step by step, and shows how you can modify the example for your own use case on different chains. This is the recommended starting point for developers new to Shade Agents.

## AI DAO Example

The [Verifiable AI DAO](./ai-dao/overview.md) is a comprehensive example that demonstrates how to build a fully verifiable AI-powered DAO using the Shade Agent Framework. This example showcases advanced features, including:
- **NEAR-native Shade Agent**: How to develop a Shade Agent that operates exclusively on the NEAR Protocol
- **Yield and Resume Pattern**: Building a Shade Agent that uses the yield and resume pattern
- **Verifiable AI Integration**: Implementing a Shade Agent that uses NEAR AI's verifiable inference

This example serves as a great starting template for building `yield and resume-based Shade Agents`. This is a smart contract that, when called, halts its execution for the verified agent to complete some logic and resume the transaction when it has a result.