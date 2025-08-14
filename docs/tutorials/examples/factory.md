---
id: factory
title: How to Deploy Contracts Using a Factory
description: "Step-by-step tutorial on creating a factory contract that deploys other smart contracts on NEAR"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

## Introduction

A factory contract automates the deployment of other smart contracts. In this tutorial, you'll learn:

- How to store compiled contracts in a factory
- The proper way to deploy contracts to sub-accounts
- How to update stored contracts efficiently

> 🏭 **Real-world Use Cases**: Token launch platforms, DAO factories, and multi-contract dApps

---

## Core Concepts

### 1. How Factory Contracts Work

A NEAR factory contract:
1. Stores compiled WASM contracts
2. Creates sub-accounts automatically
3. Deploys contracts with one transaction

### 2. Account Creation Rules

Key limitations:
- Can only create direct sub-accounts (e.g., `sub.factory.testnet`)
- Cannot create arbitrary accounts (e.g., `some-other.testnet`)
- No control over sub-accounts after creation

---

## Implementation Walkthrough

### 1. Factory Contract Methods

The two critical methods you'll implement:

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
            start="14" end="66" />
    <Github fname="manager.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
            start="5" end="19" />
  </Language>
</CodeTabs>

#### Key Features:
- `create_factory_subaccount_and_deploy`: Combines account creation and deployment
- `update_stored_contract`: Uses raw bytes to avoid gas-heavy deserialization

---

## Step-by-Step Guide

### 1. Build and Deploy the Factory

```bash
./deploy.sh
