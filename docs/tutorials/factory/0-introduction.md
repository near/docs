---
id: introduction
title: Deploying Contracts from a Contract
sidebar_label: Introduction
description: "Learn how to build a factory contract that deploys other contracts using NEAR's global contracts feature."
---

A factory contract is a smart contract that can create sub-accounts and deploy contracts onto them. This pattern enables scalable application architectures where one contract can spawn many instances of another contract.

## What You'll Build

A factory contract that:
- Stores a reference to a global contract (by account ID or code hash)
- Creates sub-accounts of itself
- Deploys contracts onto those sub-accounts using global contracts
- Manages configuration like minimum deposit requirements

![Factory Pattern](https://docs.near.org/assets/images/factory-pattern.svg)

## How It Works

The factory leverages NEAR's **global contracts** feature to efficiently deploy contracts:

1. A global contract is deployed once and stored network-wide
2. The factory references this global contract by hash or deployer account
3. When creating sub-accounts, the factory deploys the global contract without storing duplicate bytecode
4. Each sub-account gets its own instance with independent state

:::info Global Contracts

Global contracts allow sharing contract code across the NEAR network, dramatically reducing deployment costs. Instead of paying storage for the same bytecode multiple times, you reference existing code.

Learn more in the [Global Contracts documentation](../../smart-contracts/global-contracts.md).

:::

## What You Will Learn

- [Set up a factory contract project](1-setup.md) with cargo-near
- [Implement the deploy method](2-deploy.md) to create sub-accounts and deploy contracts
- [Manage global contract references](3-manager.md) and configuration
- [Test your factory contract](4-testing.md) with near-workspaces

## Use Cases

Factory contracts are essential for:

- **Multisig Wallets**: Deploy individual multisig contracts for each user without 3N storage cost per deployment
- **Smart Contract Wallets**: Efficient user onboarding with chain signatures
- **Business Onboarding**: Companies deploying accounts for customers cost-effectively
- **DeFi Templates**: Sharing common contract patterns across protocols
- **DAO Instances**: Creating multiple DAO contracts from a single factory

## Prerequisites

- Basic knowledge of Rust and smart contracts
- Understanding of NEAR accounts and sub-accounts
- `cargo-near` installed ([installation guide](https://github.com/near/cargo-near#installation))
- NEAR CLI installed

:::tip Repository

The complete source code is available in the [GitHub repository](https://github.com/near-examples/factory-rust).

:::

Let's start by setting up the project structure!