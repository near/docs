---
id: introduction
title: Building a Donation Smart Contract
sidebar_label: Introduction
description: "This tutorial will guide you through building a donation smart contract that handles NEAR token transfers, tracks donations, and manages beneficiaries."
---

Learn how to build a smart contract that accepts NEAR token donations, tracks contributors, and automatically forwards funds to beneficiaries. This tutorial covers the essential patterns for handling token transfers in NEAR Protocol smart contracts.

## How It Works

The donation contract demonstrates key concepts in NEAR token handling:

- **Payable Methods**: Functions that can receive NEAR tokens with transactions
- **Token Transfers**: Automatically forwarding received tokens to beneficiaries
- **Storage Management**: Tracking donation history while managing storage costs
- **View Methods**: Querying donation data without gas fees

:::info

The complete source code for this tutorial is available in the [GitHub repository](https://github.com/near-examples/donation-examples). 

The repository contains:
- **contract-rs/**: Rust implementation of the donation contract
- **contract-ts/**: TypeScript implementation of the donation contract  
- **frontend/**: Next.js frontend application

A deployed contract is available on testnet at `donation.near-examples.testnet` for testing.

:::

## What You Will Learn

In this tutorial, you will learn how to:

- [Set up the donation contract structure](1-setup.md) with proper initialization
- [Handle token transfers](2-donations.md) using payable methods and storage management  
- [Query donation data](3-queries.md) with efficient view methods
- [Deploy and test](4-testing.md) your contract on NEAR testnet
- [Build a frontend](5-frontend.md) to interact with your donation contract

## Prerequisites

Before starting, make sure you have:

- Basic understanding of smart contracts
- [NEAR CLI](https://docs.near.org/tools/near-cli) installed
- A NEAR testnet account
- Node.js 18+ (for TypeScript examples)
- Rust toolchain (for Rust examples)

## Contract Overview

The donation contract includes these core features:

```rust
pub struct Contract {
    pub beneficiary: AccountId,           // Who receives donations
    pub donations: IterableMap<AccountId, NearToken>, // Track donor contributions
}
```

**Key Methods:**
- `donate()` - Payable method to accept NEAR tokens
- `get_beneficiary()` - View current beneficiary
- `get_donations()` - List all donations with pagination
- `number_of_donors()` - Count total unique donors

This tutorial will walk you through implementing each component step-by-step, with examples in both Rust and TypeScript.