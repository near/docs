---
id: deploy
title: Implementing the Deploy Method
sidebar_label: Deploy Contracts
---

import {Github} from "@site/src/components/codetabs"

The `deploy` method is the core of the factory pattern - it creates a sub-account and deploys a contract onto it using global contracts.

## The Complete Deploy Method

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="35" end="75" />

Let's break down each part of this method.

## Validating the Deposit

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="38" end="44" />

The attached deposit must cover:
- Account creation and storage
- Initial balance for the new sub-account to initialize the contract

:::info Why Require Deposit?

While deploying via global contracts doesn't cost storage, the new contract needs tokens to:
- Cover storage when initialized with state
- Pay for future transactions
- Maintain minimum account balance

:::

## Creating the Sub-Account

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="46" end="52" />

Key points:
- Sub-accounts must follow the pattern `name.factory-account.testnet`
- The factory can **only** create its own sub-accounts
- Account ID validation ensures the name is valid

### Account Creation Limitations

The factory:
- ✅ **Can** create `sub.factory.testnet` if it is `factory.testnet`
- ❌ **Cannot** create sub-accounts for other accounts
- ❌ **Cannot** create top-level accounts like `newaccount.testnet`

## Building the Promise Chain

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="54" end="58" />

The promise chain:
1. **create_account**: Creates the new sub-account
2. **transfer**: Moves attached deposit to the new account
3. **add_full_access_key**: Adds the signer's public key so they control the account

:::tip Full Access Key

Adding the signer's public key as a full access key ensures the caller can manage their new sub-account immediately after creation.

:::

## Deploying the Global Contract

The final step differs based on how the global contract is referenced:

### Deploy by Account ID

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="60" end="67" />

Uses `use_global_contract_by_account_id()` to deploy the most recent global contract from that account.

### Deploy by Code Hash

<Github fname="lib.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/lib.rs"
    start="68" end="74" />

Uses `use_global_contract()` with the decoded base58 hash to deploy that specific contract version.

## Using the Deploy Method

Deploy a new contract instance:

```bash
near contract call-function as-transaction <factory-account> deploy \
  json-args '{"name": "my-token"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0.2 NEAR' \
  sign-as <your-account> \
  network-config testnet \
  sign-with-keychain send
```

This creates `my-token.<factory-account>` with the global contract deployed on it.

## Initialize the Deployed Contract

After deployment, initialize the contract. For the default FT contract:

```bash
near contract call-function as-transaction my-token.<factory-account> \
  new_default_meta \
  json-args '{
    "owner_id": "<your-account>",
    "total_supply": "100000000000000000000000000"
  }' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  sign-as <your-account> \
  network-config testnet \
  sign-with-keychain send
```

## Verify the Deployment

Check that the contract is working:

```bash
near contract call-function as-read-only \
  my-token.<factory-account> ft_metadata \
  json-args {} \
  network-config testnet now
```

Expected response:

```json
{
  "decimals": 24,
  "name": "Example NEAR fungible token",
  "symbol": "EXAMPLE",
  "spec": "ft-1.0.0"
}
```

## Promise Chain Execution

The entire operation executes atomically:

1. If account creation fails → entire operation reverts
2. If transfer fails → entire operation reverts
3. If key addition fails → entire operation reverts
4. If global contract deployment fails → entire operation reverts

This ensures you never end up with a partially created account.

## Cost Savings

Using global contracts dramatically reduces costs:

| Deployment Method | Storage Cost per Instance |
|------------------|---------------------------|
| Traditional | ~3 NEAR (full bytecode) |
| Global Contracts | ~0.2 NEAR (just state) |

For 100 instances, this saves **~280 NEAR**!

Next, we'll implement management functions to update the global contract reference and configuration.