---
id: introduction
title: On-Chain Randomness with NEAR
sidebar_label: Introduction
description: "Learn how to implement secure and verifiable randomness in NEAR smart contracts through a practical coin flip game."
---

Generating random numbers on a blockchain is fundamentally different from traditional programming. While you might use `Math.random()` in JavaScript or `/dev/urandom` in Linux, blockchains require every node to agree on the same "random" value - making true randomness impossible. This tutorial will teach you how to implement secure, verifiable randomness in NEAR smart contracts.

## The Challenge of Blockchain Randomness

In a blockchain environment, randomness faces unique constraints:

- **Determinism**: All validators must compute identical results
- **Unpredictability**: Users shouldn't be able to predict outcomes before transactions
- **Manipulation Resistance**: Miners or validators shouldn't influence results

NEAR solves this through a Verifiable Random Function (VRF) that provides cryptographically secure randomness available directly in your smart contracts.

## How NEAR's Randomness Works

NEAR provides randomness through:
- **Rust**: `env::random_seed()` 
- **JavaScript**: `near.randomSeed()`

Both return a 32-byte array derived from:
- Block producer's cryptographic signature
- Previous epoch's random value  
- Block height and timestamp
- Network-specific constants

This ensures randomness that is unpredictable for users but deterministic for validators.

:::info
The complete source code for this tutorial is available in the [near-examples/coin-flip-examples](https://github.com/near-examples/coin-flip-examples) repository.

A live version is deployed on testnet at `coinflip.near-examples.testnet` for testing.
:::

## What You Will Build

You'll create a coin flip game that demonstrates:

- [Understanding randomness challenges](1-randomness-basics.md) on blockchain and NEAR's solution
- [Building a simple coin flip contract](2-basic-contract.md) with secure randomness
- [Testing randomness](3-testing-randomness.md) to ensure fairness and distribution
- [Advanced randomness patterns](4-advanced-patterns.md) for complex applications
- [Deploying and interacting](5-deployment.md) with your random contract

Let's start by understanding the fundamentals of [on-chain randomness](1-randomness-basics.md).