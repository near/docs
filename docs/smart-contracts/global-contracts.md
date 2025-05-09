---
id: global-contracts
title: Global Contracts
sidebar_label: Global Contracts
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Global contracts allow smart contracts to be deployed once and reused by any account without incurring high storage costs.

---

## Deploying Global Contract

Global contract can be deployed in 2 ways: either by its hash or by owner account id.
Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account id the owner can redeploy the contract updating it for all its users.

Global contracts can be deployed using `NEAR CLI`.
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

:::info
Note that deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::

## Using Global Contract

Previously deployed global contract can be attached to any NEAR account using `NEAR CLI` `deploy` command. Such contract behaves exactly like a regular contract.

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

