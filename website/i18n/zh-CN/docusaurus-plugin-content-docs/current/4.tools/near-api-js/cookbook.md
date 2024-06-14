---
id: cookbook
title: Common Use Cases
sidebar_label: Cookbook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The repository contains [many recipes](https://github.com/near/near-api-js/blob/master/packages/cookbook) that you can readily use to solve common case scenarios.

| Name                                                                                                                                                                                                  | Description                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **ACCOUNTS**                                                                                                                                                                                          |                                                                                                                |
| [Create Account](https://github.com/near/near-api-js/blob/master/packages/cookbook/accounts/create-testnet-account.js)                                                                                | Create [NEAR accounts](/concepts/protocol/account-model) without using NEAR Wallet.                            |
| [Access Key Rotation](https://github.com/near/near-api-js/tree/master/packages/cookbook/accounts/access-keys)                                                                                         | Create and delete [access keys](/concepts/protocol/access-keys) for added security.                            |
| **TRANSACTIONS**                                                                                                                                                                                      |                                                                                                                |
| [Get Transaction Status](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/get-tx-status.js)                                                                             | Gets transaction status using a tx hash and associated account/contract ID.                                    |
| [Recent Transaction Details](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/get-tx-detail.js)                                                                         | Get recent transaction details without using an [indexing](/concepts/advanced/near-indexer-framework) service. |
| [Batch Transactions](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/batch-transactions.js)                                                                            | Sign and send multiple [transactions](/concepts/protocol/transactions).                                        |
| **UTILS**                                                                                                                                                                                             |                                                                                                                |
| [Deploy Contract](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/deploy-contract.js)                                                                                         | Deploys a smart contract using a pre-compiled WASM file.                                                       |
| [Calculate Gas](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/calculate-gas.js)                                                                                             | Calculate [gas burnt](/concepts/protocol/gas) from any contract call.                                          |
| [Read State w/o Account](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/get-state.js)                                                                                        | Read state of a contract without instantiating an account.                                                     |
| [Wrap](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/wrap-near.js) & [Unwrap](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/unwrap-near.js)  NEAR | Wrap and unwrap NEAR using the `wrap.near` smart contract.                                                     |
| [Verify Signature](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/verify-signature.js)                                                                                       | Verify a key pair signature.                                                                                   |
