---
id: introduction
title: Contract State Migration
sidebar_label: Introduction
description: "Learn how to safely migrate contract state when updating smart contracts on NEAR Protocol."
---

When you update a smart contract that has existing state, you often need to migrate that state to match the new contract's structure. This tutorial shows you how to handle state migrations safely and effectively.

## What You'll Build

You'll learn three approaches to state migration:

1. **Basic Migration**: Manually migrate state using a dedicated `migrate` method
2. **Versioned State**: Use enums to version your state structures for seamless updates
3. **Self-Updating Contracts**: Build contracts that can update and migrate themselves

![State Migration Flow](https://docs.near.org/assets/images/state-migration.svg)

## Why State Migration Matters

When you deploy a new contract version over an existing one, the new code expects state in a specific format. If your state structure changed, you'll get deserialization errors:

```
panicked at 'Cannot deserialize the contract state.'
```

State migration solves this by transforming old state into the new format.

## Common State Changes

- **Adding fields**: New field in a struct
- **Removing fields**: Deleting unnecessary data
- **Restructuring**: Combining or splitting data structures
- **Type changes**: Changing field types (e.g., separate payment tracking to embedded payment)

## What You Will Learn

- [Implement basic state migration](1-basic-migration.md) with a migrate method
- [Use state versioning](2-versioned-state.md) with enums for easier updates
- [Build self-updating contracts](3-self-update.md) that migrate automatically
- [Test state migrations](4-testing.md) to ensure correctness

## Prerequisites

- Understanding of NEAR smart contracts
- Knowledge of Rust and Borsh serialization
- Familiarity with contract deployment

:::tip Repository

Complete code examples are in the [GitHub repository](https://github.com/near-examples/update-migrate-rust).

:::

Let's start with basic state migration!