---
id: introduction
title: Connecting Frontend to Multiple Contracts
sidebar_label: Introduction
description: "Learn how to build a frontend application that interacts with multiple NEAR smart contracts simultaneously."
---

Building applications that interact with multiple smart contracts is a common pattern in Web3 development. This tutorial demonstrates how to query data from and send transactions to multiple NEAR contracts from a single frontend application.

## What You'll Build

A web application that simultaneously interacts with two deployed contracts:
- **Hello NEAR** (`hello.near-examples.testnet`) - stores and retrieves greeting messages
- **Guest Book** (`guestbook.near-examples.testnet`) - manages a list of messages with optional premium features

![Multiple Contracts Interface](https://github.com/near-examples/frontend-multiple-contracts/raw/main/src/assets/img-for-github.png)

## How It Works

The application uses the NEAR Wallet Selector to authenticate users and enables them to:

1. **View data** from both contracts simultaneously without authentication
2. **Send transactions** to multiple contracts in a single wallet interaction
3. **Batch actions** within the same contract for atomic operations

:::info Repository

The complete source code is available in the [GitHub repository](https://github.com/near-examples/frontend-multiple-contracts).

The contracts are already deployed on testnet:
- Hello NEAR: `hello.near-examples.testnet`
- Guest Book: `guestbook.near-examples.testnet`

:::

## What You Will Learn

- [Set up the project structure](1-setup.md) with wallet integration
- [Query multiple contracts](2-query.md) to read data
- [Send transactions to multiple contracts](3-transactions.md) simultaneously
- [Batch actions within a contract](4-batch-actions.md) for atomic operations

## Prerequisites

- Basic knowledge of JavaScript/TypeScript
- Understanding of NEAR accounts and transactions
- Node.js and npm installed

Let's get started by setting up the project!