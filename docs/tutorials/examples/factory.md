---
id: factory
title: Factory
description: "A factory is a smart contract that stores a global contract id, and automatizes deploying contracts onto new sub-accounts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

A factory is a smart contract that stores a global contract id, and automatizes deploying contracts onto new sub-accounts.

We have a [**A Generic Factory**](https://github.com/near-examples/factory-rust) that deploys new contracts based on global contract id. The global contract id can be global account id or hash. You can change the global contract id by calling `update_global_contract_id` method. The factory creates sub-accounts of itself and deploys corresponding contract on them.

:::info
You can learn more about global contracts on NEAR [here](../../smart-contracts/global-contracts.md).
:::

---

## Overview {#generic-factory}

The factory is a smart contract that:

1. Creates sub-accounts of itself and deploys its contract on them (`deploy`).
2. Can manage its settings using the `update_global_contract_id` and `update_min_deposit` methods.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/add-global-contracts/src/lib.rs"
            start="54" end="93" />
    <Github fname="manager.rs"
            url="https://github.com/near-examples/factory-rust/blob/add-global-contracts/src/manager.rs"
            start="7" end="23" />
  </Language>
</CodeTabs>

---

## Quickstart

1. Make sure you have installed [rust](https://www.rust-lang.org/).
2. Install the [`NEAR CLI`](/tools/near-cli#installation)
3. Install the [`cargo near`](https://github.com/near/cargo-near) extension.

<hr className="subsection" />

### Build and Deploy the Factory

You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
cargo near deploy
```

<hr className="subsection" />

### Deploy the Stored Contract Into a Sub-Account

Method `deploy` will create a sub-account of the factory and deploy contract on it using stored global contract id. It also asserts that the attached deposit is at least the minimum required deposit stored in the factory.

:::info
Technically, there is no need to attach any deposit just to deploy a contract using global contracts. But to initialize it further, you will need some NEAR tokens to cover the storage cost. Since initiliazing method can't accept deposit, it makes sense to attach some minimum amount of tokens during creating account and deploying a contract.
:::

The following command will create the `sub.<factory-account>`, which will have a global contract deployed on it.

```bash
near contract call-function as-transaction <factory-account> deploy json-args '{"name": "sub"}' prepaid-gas '100.0 Tgas' attached-deposit '0.2 NEAR' sign-as <your-account> network-config testnet sign-with-keychain send
```

By default, the global contract is the [Fungible Token](../../primitives/ft.md#global-contracts) primitive contract `ft.globals.primitives.testnet`. To initilize the contract, you can call its `new_default_meta` method:

```bash
near contract call-function as-transaction sub.<factory-account> new_default_meta json-args '{"owner_id": "<your-account>", "total_supply": "100000000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <your-account> network-config testnet sign-with-keychain send
```

Then you can call `ft_metadata` method to verify that the contract is deployed and initialized correctly:

```bash
near contract call-function as-read-only sub.<factory-account> ft_metadata json-args {} network-config testnet now
# The response should be like this:
# {
#  "decimals": 24,
#  "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
#  "name": "Example NEAR fungible token",
#  "reference": null,
#  "reference_hash": null,
#  "spec": "ft-1.0.0",
#  "symbol": "EXAMPLE"
#}
```

<hr className="subsection" />

### Update the Stored Contract

`update_global_contract_id` enables to change the global contract id that the factory stores.

The method is interesting because it has no declared parameters, and yet it takes
an input: the new contract to store as a stream of bytes.

To use it, we need to pass the contract id we want to store. It can be in form of account id or global contract hash. What is the difference between them you can read in [Global Contracts](../../smart-contracts/global-contracts.md#solution) section.

```bash
near contract call-function as-transaction <factory-account> update_global_contract_id json-args '{"contract_id": "3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <factory-account> network-config testnet sign-with-keychain send
```

---

## Factories - Concepts & Limitations

Factories are an interesting concept, here we further explain some of their implementation aspects,
as well as their limitations.

<hr className="subsection" />

### Automatically Creating Accounts

NEAR accounts can only create sub-accounts of itself, therefore, the `factory` can only create and
deploy contracts on its own sub-accounts.

This means that the factory:

1. **Can** create `sub.factory.testnet` and deploy a contract on it.
2. **Cannot** create sub-accounts of the `predecessor`.
3. **Can** create new accounts (e.g. `account.testnet`), but **cannot** deploy contracts on them.

It is important to remember that, while `factory.testnet` can create `sub.factory.testnet`, it has
no control over it after its creation.

<hr className="subsection" />

### The Deploy Method

During the creation of a sub-account we add signers public key to the new sub-account as a full access key. It means that the predecessor will be able to control the new sub-account after its creation.

Also, in the tutorial, we attach deposit to the `deploy` call which goes straight to the new sub-account. When we deploy a new contract using global contracts, we need to initialize it after deployment. That tokens will cover the storage after the deployed contract is initialized.
