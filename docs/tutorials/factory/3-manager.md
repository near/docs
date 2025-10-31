---
id: manager
title: Managing Factory Configuration
sidebar_label: Configuration Management
---

import {Github} from "@site/src/components/codetabs"

The factory needs management functions to update which global contract it deploys and configure deployment parameters.

## Manager Module

Create a separate module for management functions:

<Github fname="manager.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
    start="1" end="18" />

## Update Global Contract Reference

The `update_global_contract_id` method allows changing which contract the factory deploys:

<Github fname="manager.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
    start="7" end="11" />

The `#[private]` macro restricts this method - only the contract account itself can call it.

### Switch to Account-Based Reference

Update the factory to deploy from a specific account:

```bash
near contract call-function as-transaction <factory-account> \
  update_global_contract_id \
  json-args '{
    "contract_id": {
      "AccountId": "ft.globals.primitives.testnet"
    },
    "min_deposit": "200000000000000000000000"
  }' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  sign-as <factory-account> \
  network-config testnet \
  sign-with-keychain send
```

### Switch to Hash-Based Reference

Update the factory to deploy a specific contract version:

```bash
near contract call-function as-transaction <factory-account> \
  update_global_contract_id \
  json-args '{
    "contract_id": {
      "CodeHash": "3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX"
    },
    "min_deposit": "200000000000000000000000"
  }' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  sign-as <factory-account> \
  network-config testnet \
  sign-with-keychain send
```

:::caution Private Method

Only the factory contract account can update its configuration. If you try to call this from another account, the transaction will fail with "Method is private".

:::

## Query Current Configuration

### Get Global Contract Reference

<Github fname="manager.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
    start="13" end="15" />

Check which global contract the factory is currently using:

```bash
near contract call-function as-read-only \
  <factory-account> get_global_contract_id \
  json-args {} \
  network-config testnet now
```

Response examples:

```json
// Account-based reference
{
  "AccountId": "ft.globals.primitives.testnet"
}

// Hash-based reference
{
  "CodeHash": "3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX"
}
```

### Get Minimum Deposit

<Github fname="manager.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
    start="17" end="19" />

Check the minimum required deposit:

```bash
near contract call-function as-read-only \
  <factory-account> get_min_deposit \
  json-args {} \
  network-config testnet now
```

Response:
```json
"200000000000000000000000"  // 0.2 NEAR in yoctoNEAR
```

## Complete Manager Implementation

Include the manager module in your main contract file:

```rust
// In lib.rs
mod manager;
```

This makes the management methods available on your contract instance.

## Configuration Strategy

Choose your configuration based on your needs:

### Account-Based Reference
**Best for:**
- Trusting the deployer to maintain the global contract
- Wanting automatic updates to the latest version
- Flexibility to deploy new global contract versions

**Example use case:** A protocol team manages a global contract and regularly updates it with new features.

### Hash-Based Reference
**Best for:**
- Requiring a specific, immutable contract version
- Security-critical applications
- Audit requirements

**Example use case:** A DAO deploys multiple instances and wants to ensure all use the exact same audited code.

## Access Control Patterns

The `#[private]` macro is simple but limited. For more complex access control:

```rust
#[near]
impl GlobalFactoryContract {
    // Only owner can update
    pub fn update_global_contract_id(
        &mut self,
        contract_id: GlobalContractId,
        min_deposit: NearToken
    ) {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Only owner can update"
        );
        self.global_contract_id = contract_id;
        self.min_deposit_amount = min_deposit;
    }
}
```

This pattern allows designating an owner separate from the contract account.

## Updating Multiple Parameters

You can extend the update method to handle more configuration:

```rust
pub struct FactoryConfig {
    pub global_contract_id: GlobalContractId,
    pub min_deposit: NearToken,
    pub max_instances: u64,
    pub enabled: bool,
}

#[private]
pub fn update_config(&mut self, config: FactoryConfig) {
    self.global_contract_id = config.global_contract_id;
    self.min_deposit_amount = config.min_deposit;
    // Update other fields...
}
```

This keeps the management API clean while allowing comprehensive configuration updates.

Next, we'll implement comprehensive tests to ensure the factory works correctly.