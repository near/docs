---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

# Exchange Integration

## Transaction Construction
  - NEAR requires transactions to be serialized in [Borsh](https://borsh.io/) which currently supports:
    - Rust
    - JavaScript
    - TypeScript
  <!-- Is documentation for transaction construction / ways to implement Borsh in non-supported language needed?-->

## Transaction Processing
 - [Runtime Specifications](https://nomicon.io/RuntimeSpec/README.html)
 - [Processing transactions](https://docs.near.org/docs/concepts/transaction#transaction-processing)

## Balance Changes
  -  Balance changes on accounts can be tracked by using our [changes endpoint](https://docs.near.org/docs/api/rpc-experimental#changes).
    **Note** Gas prices can change between blocks. Even for transactions with deterministic gas cost, the cost in NEAR could also be different.

## Account Creation
  - We support implicit account creation which allows exchanges to create accounts without paying for transactions. 
  - You can create an implicit account by following the steps in [this guide](/docs/roles/exchanges/implicit-accounts).

## Finality
 - RPC queries allow you to specify three types of desired finality; `optimistic`, `near-final`, and `final`.
 - Exchanges should only use [`final` finality](https://docs.near.org/docs/api/rpc-params#using-final-finality).
 - See [Blockchain Finality](https://docs.near.org/docs/roles/integrator/integrating#finality) for more information.
 <!-- Not sure if the last doc is relevant, as Bowen mentioned. -->

## Running an Archival Node
- Setting up an archival node is the same as a [regular node](https://docs.near.org/docs/local-setup/running-testnet), but modifying your `config.json` by changing `archive` to `true`.

## (Optional) Staking and Delegation
 <!-- - Some info can be found at https://github.com/nearprotocol/stakewars and https://github.com/near/core-contracts  -->
