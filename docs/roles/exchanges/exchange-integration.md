---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

# Information for Exchange Integrations

## Transactions
  - [Basics](https://docs.near.org/docs/concepts/transaction)
  - [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)
  - Constructing
      - To construct a transaction in javascript you will need to use [`near-api-js`](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction).
      - First, begin by importing `near-api-js` into your project.
      - Then, using the [Transaction Class](https://near.github.io/near-api-js/classes/_transaction_.transaction.html), create your transaction by passing the following arguments to the `createTransaction` method:
          - signerId (accountID of the transaction originator)
          - signerPublicKey
          - receiverId (accountID of the transaction recipient)
          - nonceForPublicKey
          - [actions](/docs/concepts/transaction#action)
          - blockHash
      ```js
      const nearAPI = require("near-api-js");

      const transaction = nearAPI.transactions.createTransaction(signerId, signerPublicKey, receiverId, nonceForPublicKey, actions, blockHash);
      ```

**Note:** NEAR requires transactions to be serialized in [Borsh](https://borsh.io/) which currently supports Rust, Javascript, & Typescript.

## Balance Changes
  -  Balance changes on accounts can be tracked by using our [changes endpoint](https://docs.near.org/docs/api/rpc-experimental#changes).

**Note:** Gas prices can change between blocks. Even for transactions with deterministic gas cost, the cost in NEAR could also be different.

## Account Creation
  - We support implicit account creation which allows exchanges to create accounts without paying for transactions. 
  - You can create an implicit account by following the steps in [this guide](/docs/roles/exchanges/implicit-accounts).

## Finality
 - RPC queries allow you to specify three types of desired finality; `optimistic`, `near-final`, and `final`.
 - Exchanges should only use [`final` finality](https://docs.near.org/docs/api/rpc-params#using-final-finality).
 - See [Blockchain Finality](https://docs.near.org/docs/roles/integrator/integrating#finality) for more information.

## Running an Archival Node
- Setting up an archival node is the same as a [regular node](https://docs.near.org/docs/local-setup/running-testnet), but modifying your `config.json` by changing `archive` to `true`.

## Staking and Delegation
- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)  
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)
