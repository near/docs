---
id: global-contracts
title: Global Contracts
sidebar_label: Introduction
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
- [By Account](#reference-by-account)
- [By Hash](#reference-by-hash)


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

## Deploying a Global Contract

Global contracts can be deployed in 2 ways: either by their [hash](#reference-by-hash) or by the owner [account ID](#reference-by-account).
Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account ID the owner can redeploy the contract updating it for all its users.

Global contracts can be deployed using [`NEAR CLI`](#deploy-with-cli) or by code using [NEAR APIs](#deploy-with-api).

:::info
Note that deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::

### Deploy with CLI

The process is similar to [deploying a regular contract](./release/deploy.md#deploying-the-contract) but `deploy-as-global` command should be used instead of `deploy`.

<Tabs groupId="cli-tabs">
  <TabItem value="by-hash" label="By Hash">

  ```bash
  near contract deploy-as-global use-file <route_to_wasm> as-global-hash <account_id> network-config testnet sign-with-keychain send
  ```
  </TabItem>

  <TabItem value="by-account-id" label="By Account Id">

  ```bash
  near contract deploy-as-global use-file <route_to_wasm> as-global-account-id <account_id> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Deploy with API

You can also deploy a global contract using NEAR's JavaScript and Rust APIs.
Check the [NEAR API reference documentation](../tools/near-api.md#deploy-a-global-contract) for complete code examples.

## Using a Global Contract

A previously deployed global contract can be attached to any NEAR account using [`NEAR CLI`](#using-cli) or by code using [NEAR APIs](#using-api).

### Using CLI

Use `near deploy` command. Such a contract behaves exactly like a regular contract.

<Tabs groupId="cli-tabs">
  <TabItem value="by-hash" label="By Hash">

  ```bash
  # Using global contract deployed by <global_contract_hash> hash
  near contract deploy <account_id> use-global-hash <global_contract_hash> without-init-call network-config testnet
  ```
  </TabItem>

  <TabItem value="by-account-id" label="By Account Id">

  ```bash
  # Using global contract deployed by <global_contract_account_id> account id
  near contract deploy <account_id> use-global-account-id <global_contract_account_id> without-init-call network-config testnet
  ```
  </TabItem>
</Tabs>

### Using API

You can also use a deployed global contract using NEAR's JavaScript and Rust APIs.
Check the [NEAR API reference documentation](../tools/near-api.md#use-a-global-contract) for complete code examples.
