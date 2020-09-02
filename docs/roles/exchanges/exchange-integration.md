---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

# Exchange Integration Requirements

## 1) Ability to construct transactions
  - Transactions need to be serialized in [Borsh](https://borsh.io/).
  - Currently we support Borsh in Rust, JavaScript, and TypeScript. 
  - If an exchange has a specific language that they must use to integrate with the rest of their system, they need to implement [Borsh](https://borsh.io/) in that language.
  - See [processing transactions](https://docs.near.org/docs/concepts/transaction#transaction-processing) for more information.
  <!-- Is the above doc relevant to this? Also, do we need a doc explaining how to construct transactions? -->

## 2) Understand balance changes precisely 
  - Exchanges need to be able to track balance change on accounts precisely for accounting and auditing purposes.
  - We can recommend that they use the [changes endpoint](https://docs.near.org/docs/api/rpc-experimental#changes) to query state changes.
    **Note** Gas price can change between blocks and even for transactions with deterministic. The gas cost the cost in NEAR can also be different.

## 3) Account creation
  - We now (soon) support implicit account creation which allows exchanges to create accounts without paying for transactions. 
  - Follow the status of this feature [here](https://github.com/nearprotocol/NEPs/pull/71).

## 4) Transaction processing
 - Exchanges must understand when a transaction is submitted, what possible results are, and what errors can be returned. 
 - See [NEAR Platform Errors](https://docs.near.org/docs/roles/integrator/errors/introduction#near-platform-errors) for more information.
 <!-- Is this doc all that is necessary for now? -->

## 5) Finality
 - RPC queries allow to specify three types of desired finality; `optimistic`, `near-final`, and `final`.
 - As an exchange, you would only want to use [`final` finality](https://docs.near.org/docs/api/rpc-params#using-final-finality) in your RPC queries.
 - For further information, see our documentation on [Blockchain Finality](https://docs.near.org/docs/roles/integrator/integrating#finality).
 <!-- Not sure if the last doc is relevant, as Bowen mentioned. -->

## 6) Running an archival node
 - Exchanges usually need to have all the historical data of the chain and therefore it is recommended that they run an archival node.
 <!-- Recommended or Required?  Also, we have no documentation on how to run an archival node -->

## (Optional) Staking and delegation
 - An exchange may want to support delegation for their users. 
 <!-- Documentation Needed! Some info can be found at https://github.com/nearprotocol/stakewars and https://github.com/near/core-contracts  -->
