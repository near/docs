---
id: introduction
title: Deploy Contracts from Contracts
sidebar_label: Introduction
description: "Learn how to implement the factory pattern on NEAR to programmatically deploy smart contracts from within other smart contracts."
---

The factory pattern is one of the most powerful design patterns in smart contract development. It allows you to deploy and manage multiple contract instances programmatically, automating what would otherwise be a manual process.

## How It Works

A factory contract stores compiled bytecode and can create new sub-accounts, then deploy that stored code to those accounts. This enables you to:

- Deploy many instances of the same contract type
- Standardize contract deployment parameters
- Reduce gas costs through code reuse
- Automate contract creation workflows

:::info

The complete source code for this tutorial is available in the [GitHub repository](https://github.com/near-examples/factory-rust).

You can also interact with a deployed factory at `factory-example.testnet` on testnet.

:::

## What You Will Learn

In this tutorial, you will learn how to:

- [Build a factory contract](1-factory-contract.md) that stores and deploys contract code
- [Deploy your factory](2-deploy-factory.md) and upload initial contract bytecode
- [Create contract instances](3-create-instances.md) using the factory
- [Update the stored contract](4-update-contract.md) for future deployments

## Prerequisites

- Basic understanding of NEAR smart contracts
- Rust development environment set up
- NEAR CLI installed and configured
- A NEAR testnet account with some balance

## Account Limitations

Before we begin, it's important to understand NEAR's account creation rules:

**What factories can do:**
- Create sub-accounts of themselves (e.g., `factory.testnet` → `instance1.factory.testnet`)
- Deploy contracts to their own sub-accounts
- Manage stored contract bytecode

**What factories cannot do:**
- Create sub-accounts for other accounts
- Deploy contracts to accounts they don't own
- Control sub-accounts after creation (they become independent)

This means your factory at `factory.testnet` can create `dao1.factory.testnet` but cannot create `dao1.alice.testnet`.

Ready to get started? Let's [build your first factory contract](1-factory-contract.md)!
