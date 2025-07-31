---
id: global-contracts
title: Global Contracts
sidebar_label: Global Contract
description: "Learn how to deploy a Global contract and use it from another account."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've ever deployed the same contract code to multiple accounts, you’ve likely noticed that each deployment requires you to pay the full storage cost again.

Imagine that you want to deploy the same 500 KB contract to three accounts: each deployment pays 5 NEAR for the storage — a total of 15 NEAR is locked just to hold identical code.
[Global Contracts](../../smart-contracts/global-contracts.md) eliminates this redundancy by allowing the same contract code to be shared across multiple accounts, so storage cost is paid only once.

In this tutorial you'll learn how to deploy and use a [global contract by Account ID](#global-contract-by-account-id) or [by Hash](#global-contract-by-hash), depending on your needs.

:::info Global Contract types
- [By Account](../../smart-contracts/global-contracts.md#reference-by-account): an upgradable contract is published globally under a specific account ID.
- [By Hash](../../smart-contracts/global-contracts.md#reference-by-hash): an immutable contract is deployed globally and identified by its code hash.
:::

## Examples

:::tip Do you need a Global Contract?
Check these questions to decide [when to use a global contract](../../smart-contracts/global-contracts.md#when-to-use-global-contracts).
:::

### Global Contract by Account ID

For example, consider a **DAO Factory**: A tool that allows any user to deploy their own DAO governance instance.

Since the same contract is deployed many times by end users across different accounts, this clearly meets the threshold where [Global Contracts](../../smart-contracts/global-contracts.md) become financially efficient. Also, since upgradeability may be useful down the line (e.g. to patch bugs or extend functionality), it's a great case to use a [Global Contract by Account ID](../../smart-contracts/global-contracts.md#reference-by-account).

### Global Contract by Hash

Take for example an **NFT Collection Factory**: A service that lets users create their own NFT contracts with fixed metadata and royalty values.

Since each user deploys the same contract, but once deployed, it should never change (security and immutability are critical), this makes a perfect case to use a [Global Contract by Hash](../../smart-contracts/global-contracts.md#reference-by-hash).

## Deploying a Global Contract

Global contracts can be deployed in 2 ways: either by their [hash](#reference-by-hash) or by the owner [account ID](#reference-by-account).
Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account ID the owner can redeploy the contract updating it for all its users.

Global contracts can be deployed using [`NEAR CLI`](#deploy-with-cli) or by code using [NEAR APIs](#deploy-with-api).

:::info
Note that deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::

### Deploy with CLI

The process is similar to [deploying a regular contract](../../smart-contracts/release/deploy.md#deploying-the-contract) but `deploy-as-global` command should be used instead of `deploy`.

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
Check the [NEAR API reference documentation](../../tools/near-api.md#deploy-a-global-contract) for complete code examples.

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
Check the [NEAR API reference documentation](../../tools/near-api.md#use-a-global-contract) for complete code examples.
