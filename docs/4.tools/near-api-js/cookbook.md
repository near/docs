---
id: cookbook
title: Common Use Cases
sidebar_label: Cookbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The repository contains [many recipes](https://github.com/near/near-api-js/tree/master/examples/cookbook) that you can readily use to solve common case scenarios.

| Name                                                                                                                                                                                                   | Description                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------------- |
| **ACCOUNTS**                                                                                                                                                                                           |                                                                                                             |
| [Create Account](https://github.com/near/near-api-js/tree/master/examples/cookbook/accounts/create-testnet-account.js)                                                                                 | Create [NEAR accounts](/concepts/basics/account) without using NEAR Wallet.                                 |
| [Access Key Rotation](https://github.com/near/near-api-js/tree/master/examples/cookbook/accounts/access-keys/)                                                                                         | Create and delete [access keys](/concepts/basics/account#access-keys) for added security.                   |
| **TRANSACTIONS**                                                                                                                                                                                       |                                                                                                             |
| [Get Transaction Status](https://github.com/near/near-api-js/tree/master/examples/cookbook/transactions/get-tx-status.js)                                                                              | Gets transaction status using a tx hash and associated account/contract ID.                                 |
| [Recent Transaction Details](https://github.com/near/near-api-js/tree/master/examples/cookbook/transactions/get-tx-detail.js)                                                                          | Get recent transaction details without using an [indexing](https://near-indexers.io/docs/projects/near-indexer-framework) service. |
| [Batch Transactions](https://github.com/near/near-api-js/tree/master/examples/cookbook/transactions/batch-transactions.js)                                                                             | Sign and send multiple [transactions](/concepts/basics/transactions/overview).                              |
| **UTILS**                                                                                                                                                                                              |                                                                                                             |
| [Deploy Contract](https://github.com/near/near-api-js/tree/master/examples/cookbook/utils/deploy-contract.js)                                                                                          | Deploys a smart contract using a pre-compiled WASM file.                                                    |
| [Calculate Gas](https://github.com/near/near-api-js/tree/master/examples/cookbook/utils/calculate-gas.js)                                                                                              | Calculate [gas burnt](/concepts/basics/transactions/gas) from any contract call.                            |
| [Read State w/o Account](https://github.com/near/near-api-js/tree/master/examples/cookbook/utils/get-state.js)                                                                                         | Read state of a contract without instantiating an account.                                                  |
| [Wrap](https://github.com/near/near-api-js/blob/master/examples/cookbook/utils/wrap-near.js) & [Unwrap](https://github.com/near/near-api-js/blob/master/examples/cookbook/utils/unwrap-near.js)  NEAR  | Wrap and unwrap NEAR using the `wrap.near` smart contract.                                                  |
| [Verify Signature](https://github.com/near/near-api-js/blob/master/examples/cookbook/utils/verify-signature.js)                                                                                        | Verify a key pair signature.                                                                                |
