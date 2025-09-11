---
id: introduction
title: Building a Donation Smart Contract
sidebar_label: Introduction
description: "This tutorial will guide you through building a donation smart contract that handles NEAR tokens, tracks donations, and manages beneficiaries."
---

import {Github} from '@site/src/components/codetabs';

Learn how to build a complete donation system on NEAR that accepts, tracks, and manages token transfers. This tutorial demonstrates the fundamental concepts of handling tokens in NEAR smart contracts while building a practical application that users can interact with.

![Donation App Interface](/docs/assets/examples/donation.png)
_The donation app interface showing recent donations and donation form_

## How It Works

The donation smart contract acts as an intermediary that:

1. **Accepts NEAR tokens** from users through payable function calls
2. **Tracks donation history** by storing donor information and amounts
3. **Forwards tokens** to a designated beneficiary account
4. **Provides query methods** to retrieve donation statistics and history

The key advantage of this approach is transparent donation tracking while ensuring funds reach their intended destination immediately.

:::info

The complete source code for this tutorial is available in the [donation examples repository](https://github.com/near-examples/donation-examples). The contract is deployed on testnet at `donation.near-examples.testnet` for testing purposes.

:::

## What You Will Learn

In this tutorial, you will learn how to:

- [Set up your development environment](1-setup.md) for NEAR smart contract development
- [Build the donation contract](2-contract.md) with token handling capabilities
- [Implement donation tracking](3-tracking.md) and storage management
- [Create query methods](4-queries.md) to retrieve donation data
- [Deploy and test the contract](5-deploy.md) on NEAR testnet
- [Build a frontend interface](6-frontend.md) to interact with your contract

## Key Concepts Covered

Throughout this tutorial, you'll master these essential NEAR development concepts:

- **Token Transfers**: How to accept and forward NEAR tokens in smart contracts
- **Payable Functions**: Using `#[payable]` decorator to receive token deposits
- **Storage Management**: Efficiently storing and retrieving donation data
- **Error Handling**: Implementing robust error handling for financial operations
- **Testing**: Writing comprehensive tests for token-handling contracts
- **Frontend Integration**: Connecting a web interface to your smart contract

Let's start by setting up your development environment!