---
id: near-cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

> [`near-cli`](https://github.com/near/near-cli) is a [NodeJS](https://nodejs.org/) command line interface that utilizes [`near-api-js`](https://github.com/near/near-api-js) to connect to and interact with the NEAR blockchain.

---

## Overview {#overview}

_Click on a command for more information and examples._

**Access Keys**

| Command                                                       | Description                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`near login`](/tools/near-cli#near-login)               | stores a full access key locally using [NEAR Wallet](https://wallet.testnet.near.org/)                            |
| [`near keys`](/tools/near-cli#near-keys)                 | displays all access keys and their details for a given account                                                    |
| [`near generate-key`](/tools/near-cli#near-generate-key) | generates a local key pair **or** shows public key & [implicit account](/concepts/basics/implicit-accounts) |
| [`near add-key`](/tools/near-cli#near-add-key)           | adds a new access key to an account                                                                               |
| [`near delete-key`](/tools/near-cli#near-delete-key)     | deletes an access key from an account                                                                             |

**Accounts**

| Command                                                           | Description                                                                 |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`near create-account`](/tools/near-cli#near-create-account) | creates an account                                                          |
| [`near state`](/tools/near-cli#near-state)                   | shows general details of an account                                         |
| [`near keys`](/tools/near-cli#near-keys)                     | displays all access keys for a given account                                |
| [`near send`](/tools/near-cli#near-send)                     | sends tokens from one account to another                                    |
| [`near delete`](/tools/near-cli#near-delete)                 | deletes an account and transfers remaining balance to a beneficiary account |

**Contracts**

| Command                                                   | Description                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`near deploy`](/tools/near-cli#near-deploy)         | deploys a smart contract to the NEAR blockchain                                |
| [`near dev-deploy`](/tools/near-cli#near-dev-deploy) | creates a development account and deploys a contract to it _(`testnet` only)_  |
| [`near call`](/tools/near-cli#near-call)             | makes a contract call which can invoke `change` _or_ `view` methods            |
| [`near view`](/tools/near-cli#near-view)             | makes a contract call which can **only** invoke a `view` method                |
| [`near view-state`](#near-view-state)                     | returns contract state (key / value pairs) in either utf-8 or borsh serialized |

**Transactions**

| Command                                                 | Description                                |
| ------------------------------------------------------- | ------------------------------------------ |
| [`near tx-status`](/tools/near-cli#near-tx-status) | queries a transaction's status by `txHash` |

**Validators**

| Command                                                                   | Description                                                                     |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`near validators current`](/tools/near-cli#near-validators-current) | displays current [epoch](/concepts/basics/epoch) validator pool details           |
| [`near validators next`](/tools/near-cli#near-validators-next)       | displays validator details for the next [epoch](/concepts/basics/epoch)           |
| [`near proposals`](/tools/near-cli#near-proposals)                   | displays validator proposals for the [epoch](/concepts/basics/epoch) _after_ next |

**REPL**

| Command                                       | Description                                                                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`near repl`](/tools/near-cli#near-repl) | launches an interactive connection to the NEAR blockchain ([REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) |

> For EVM support see [Project Aurora's](https://aurora.dev) [`aurora-cli`](https://github.com/aurora-is-near/aurora-cli).
