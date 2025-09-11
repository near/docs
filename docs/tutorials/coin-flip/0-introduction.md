---
id: introduction
title: Building a Coin Flip Game with Secure Randomness
sidebar_label: Introduction
description: "Learn how to implement secure and fair randomness in NEAR smart contracts through a practical coin flip game tutorial."
---

Generating truly random numbers in blockchain applications is one of the most challenging aspects of smart contract development. Unlike traditional applications where you can use `Math.random()` or system entropy, blockchain requires all nodes to reach consensus on the same result - making randomness both critical and complex.

This tutorial will guide you through building a **Coin Flip Game** on NEAR Protocol, teaching you how to handle randomness securely and fairly using NEAR's built-in Verifiable Random Function (VRF).

## The Challenge of Blockchain Randomness

In traditional programming, generating randomness seems straightforward:

```javascript
// ❌ This won't work on blockchain!
const outcome = Math.random() > 0.5 ? 'heads' : 'tails';
```

But on a blockchain, this approach fails because:

- **Consensus Requirement**: Every validator must compute the same result
- **Predictability**: Malicious actors could manipulate predictable inputs
- **Determinism**: The same inputs must always produce the same outputs

## NEAR's Solution: Verifiable Random Function

NEAR Protocol solves this elegantly with a **Verifiable Random Function (VRF)** that provides:

- **Security**: Cryptographically secure and manipulation-resistant
- **Consistency**: All nodes get the same random seed per block
- **Simplicity**: Easy-to-use APIs in both Rust and JavaScript
- **No External Dependencies**: Built directly into the protocol

## What You'll Build

By the end of this tutorial, you'll have created a fully functional coin flip game where:

- Players guess "heads" or "tails"
- Correct guesses earn points, wrong guesses lose points
- All randomness is cryptographically secure and fair
- The contract handles edge cases and validates inputs

## What You'll Learn

This tutorial covers:

1. [Understanding NEAR's randomness system](1-understanding-randomness.md)
2. [Setting up your development environment](2-setup.md)  
3. [Building the smart contract](3-contract.md)
4. [Implementing secure random logic](4-randomness-implementation.md)
5. [Testing your contract](5-testing.md)
6. [Advanced randomness patterns](6-advanced-patterns.md)

## Prerequisites

Before starting, you should have:

- Basic understanding of NEAR Protocol
- Familiarity with either Rust or JavaScript
- NEAR CLI installed ([installation guide](https://docs.near.org/tools/near-cli))
- A NEAR testnet account

:::info Complete Code Repository

The complete source code for this tutorial is available in the [GitHub repository](https://github.com/near-examples/coin-flip-randomness-tutorial).

You can also interact with the deployed contract on testnet at `coin-flip.examples.testnet`.

:::

## Why This Matters

Understanding randomness on NEAR opens doors to building:

- **Gaming Applications**: Dice games, card shuffles, loot drops
- **DeFi Protocols**: Lotteries, random reward distributions  
- **NFT Projects**: Random trait generation, mystery boxes
- **Governance Tools**: Random jury selection, tie-breaking

Let's dive in and start building your first randomness-powered dApp on NEAR!