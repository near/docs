---
id: global-contracts
title: Global Contracts
description: "Global contracts allow smart contracts to be deployed once and reused by any account without incurring high storage costs."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Global contracts allow smart contracts to be deployed once and reused by any account without incurring high storage costs.
Rather than deploying duplicate contracts or routing messages inefficiently across shards, NEAR developers can now think modularly and universally: write once, use everywhere.

## Overview

If you've ever deployed the same contract code to multiple accounts, you’ve likely noticed that each deployment requires you to pay the full storage cost again — since the size of the WASM file determines how much `NEAR` is locked on the account.
With [NEP-0591](https://github.com/near/NEPs/blob/master/neps/nep-0591.md), which introduces Global Contracts, NEAR provides a highly strategic alternative that [solves this elegantly](#solution).

## Key Features

These are the features that make Global Contracts special:

- **Global Addressing**: These contracts are not tied to a specific account but instead use a unique global identifier. This enables any contract, user, or application on NEAR to call the contract from any shard instantly.

- **Immutable Logic**: The contract code is fixed once deployed, making it a trusted point of reference. This ensures consistency and security—ideal for system-critical protocols.

- **Shared Infrastructure**: Global contracts can act as canonical libraries, utility hubs, or standards for other contracts to rely on, simplifying development and reducing duplication.

- **Cross-Shard Superpowers**: Developers can build truly modular apps where parts of their stack reside on different shards but communicate via shared global logic with minimal latency or duplication.

### Use Cases

- **Standard Libraries**: Reusable components for math, string operations, or token interfaces.
- **DeFi Protocols**: Global contracts can anchor DEXs, lending markets, oracles—shared across all applications.
- **DAO Frameworks**: Shared governance modules that any DAO can plug into, ensuring consistency and reliability.
- **Identity & Credentials**: One global contract can manage decentralized identity verification and access management for the entire chain.
- **Multi-part dApps**: Complex applications can split responsibilities across shards while accessing a common logic core.

## Solution

Global Contracts solve the inefficiency of duplicate deployments by allowing the same contract code to be shared across multiple accounts, so storage cost is paid only once.

There are two ways to reference a global contract:
- **[By Account](#reference-by-account)**: an upgradable contract is published globally under a specific account ID.
- **[By Hash](#reference-by-hash)**: an immutable contract is deployed globally and identified by its code hash.


:::info
- The contract code is distributed across all shards in the Near Protocol network, not stored inside any specific account’s storage.
- The account is charged 10x more for deploying a Global Contract, at the rate 10 NEAR per 100KB.
- This amount is entirely burnt and cannot be recovered later, unlike regular deployments where Near is simply locked.
- The total fee is typically under 0.001 NEAR for a user to use a Global Contract, since only a few bytes are needed for the reference that is stored in the account's storage.
:::

### Reference by Account

When using a reference **by account**, the contract code is tied to another account. If that account later deploys a new version of the contract, your account will automatically start using the updated code, with no need for redeployment.

### Reference by Hash

When using a reference **by hash**, you reference the global contract by its immutable code hash. This ensures you're always using the exact same version, and it will never change unless you explicitly redeploy with a different hash.

## When to use Global Contracts

Ask yourself the following questions before deciding how to deploy your contracts:

- **_Are you working in a local environment?_**
  
  If you're just testing or building a prototype, [regular deployments](release/deploy.md) are simpler and more flexible. There's no need to burn tokens or register global references — just deploy and iterate.

- **_Is the contract supposed to be deployed on many accounts?_**

  If the same contract will be reused across many independent accounts — say, 10 or more — Global Contracts can significantly reduce overall cost and complexity. But if only a few accounts are involved, regular deployment remains the more economical choice.

- **_Are these accounts managed by your team?_**

  If all target accounts are under your infrastructure, you may prefer regular deployments for flexibility and cost recovery.
- **_Are there more than 10 accounts?_**

  Global Contracts become financially efficient when reused at scale. If you're deploying the same contract to more than 10 accounts, it's likely worth considering.

- **_Do you need to upgrade the contract across many accounts in one step, even if it requires burning tokens?_**

  If you want to be able to push updates to all deployed instances at once, then go with Global Contracts by Account ID, but keep in mind that the deployment cost is non-refundable.

- **_Does your use case require the contract to be permanently immutable?_**

  If the contract must never change, for example, due to security, compliance, or user trust, then using a Global Contract by Code Hash ensures immutability at the protocol level.

## Deploying a Global Contract

Global contracts can be deployed in 2 ways: either by their [hash](#reference-by-hash) or by the owner [account ID](#reference-by-account).
Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account ID the owner can redeploy the contract updating it for all its users.

Global contracts can be deployed using [`NEAR CLI`](../tutorials/examples/global-contracts.md#deployment) or by code using [NEAR APIs](../tools/near-api.md#deploy-a-global-contract). Check [this tutorial](../tutorials/examples/global-contracts.md) to learn how to deploy and use Global Contracts using CLI, JavaScript, or Rust.

:::info
Deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::

### About Contract updates

If a contract is expected to get upgrades from time to time, then it should be rolled out using the `Account Id` strategy. Using a Global Contract by `Hash` is for immutable contracts that are supposed to stay the same forever.

Keep in mind, when using a Global Contract by [account ID](#reference-by-account), the one that handles the contract update is the original account, so they're responsible for contract state upgrading too.
