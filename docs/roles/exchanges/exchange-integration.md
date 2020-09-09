---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

# Information for Exchange Integrations

## Transactions
  - [Basics](https://docs.near.org/docs/concepts/transaction)
  - [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)
  - Constructing & Processing Transactions
      - To construct & process transactions in javascript you will need to use [`near-api-js`](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction).
      - First, begin by importing `near-api-js`
      - Then, using the [Transaction Class](https://near.github.io/near-api-js/classes/_transaction_.transaction.html), construct a transaction by passing the following arguments to `createTransaction`:
          - signerId (accountID of the transaction originator)
          - signerPublicKey
          - receiverId (accountID of the transaction recipient)
          - nonceForPublicKey
          - [actions](/docs/concepts/transaction#action)
          - blockHash
      - Once your transaction is created, you must then sign and send using your account to process the transaction.

      ```js
      const nearAPI = require("near-api-js");
      
      const signerId = "YOUR_ACCOUNT.testnet";
      const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
          "/home/username/.near-credentials/"
      );
      const near = await nearAPI.connect({
        deps: {
          keyStore,
        },
        nodeUrl: "https://rpc.testnet.near.org",
        networkId: "default"
      });  
      const account = await near.account(signerId);
      const transaction = nearAPI.transactions.createTransaction(signerId, signerPublicKey, receiverId, nonceForPublicKey, actions, blockHash);
      const result = account.signAndSendTransaction(receiverId, transaction)
      console.log('Transaction Result: ', result);
      ```

**Note:** NEAR requires transactions to be serialized in [Borsh](https://borsh.io/) which currently supports Rust, Javascript, & TypeScript.

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
