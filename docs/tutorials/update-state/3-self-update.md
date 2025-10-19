---
id: self-update
title: Self-Updating Contracts
sidebar_label: Self-Update
---

import {Github} from "@site/src/components/codetabs"

Self-updating contracts can deploy new code and migrate state on themselves, enabling autonomous upgrades without external deployment tools.

## The Update Method

Add an `update_contract` method that deploys new code:

<Github fname="update.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/update.rs"
    start="10" end="31" />

### How It Works

**1. Authorization Check**

```rust
assert!(
    env::predecessor_account_id() == self.manager,
    "Only the manager can update the code"
);
```

Only the designated manager account can update the contract.

**2. Receive Contract Code**

```rust
let code = env::input().expect("Error: No input").to_vec();
```

Read the contract bytecode directly from input to avoid gas overhead of deserializing large parameters.

**3. Deploy and Migrate**

```rust
Promise::new(env::current_account_id())
    .deploy_contract(code)
    .function_call(
        "migrate".to_string(),
        NO_ARGS,
        NearToken::from_near(0),
        CALL_GAS,
    )
    .as_return()
```

Chain two actions:
- Deploy the new contract code
- Call `migrate` to transform the state

Both actions execute atomically - if either fails, both revert.

## Base Contract Setup

Store the manager address in state:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/lib.rs"
    start="17" end="25" />

Initialize with a manager:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/lib.rs"
    start="27" end="34" />

## Updated Contract with Migration

The updated contract includes both the update method and migration logic:

<Github fname="migrate.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/update/src/migrate.rs"
    start="18" end="45" />

## Deployment Process

### Initial Deployment

Deploy the base contract:

```bash
cd self-updates/base
cargo near build

cargo near deploy <contract-account> \
  with-init-call init \
  json-args '{"manager":"<manager-account>"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```

### Locking the Contract

For maximum security, remove the contract's access keys so only the `update_contract` method can change it:

```bash
# List current keys
near account list-keys <contract-account> \
  network-config testnet now

# Delete the full access key
near account delete-keys <contract-account> \
  public-keys <key-from-above> \
  network-config testnet \
  sign-with-keychain send
```

Now the contract is "locked" - it can only be updated through its own `update_contract` method.

## Performing Self-Update

Build the updated contract:

```bash
cd self-updates/update
cargo near build
```

Call the update method from the manager account:

```bash
near contract call-function as-transaction \
  <contract-account> update_contract \
  file-args ../../target/near/self_update/self_update.wasm \
  prepaid-gas '300.0 Tgas' \
  attached-deposit '0 NEAR' \
  sign-as <manager-account> \
  network-config testnet \
  sign-with-keychain send
```

The contract:
1. Verifies the caller is the manager
2. Deploys the new code on itself
3. Calls its own `migrate` method
4. Transforms the state to the new format

## Verifying the Update

Check the updated state:

```bash
near contract call-function as-read-only \
  <contract-account> get_messages \
  json-args {} \
  network-config testnet now
```

Messages now include payment information:

```json
[
  {
    "payment": "90000000000000000000000",
    "premium": false,
    "sender": "user.testnet",
    "text": "hello"
  }
]
```

The old method is gone:

```bash
near contract call-function as-read-only \
  <contract-account> get_payments \
  json-args {} \
  network-config testnet now
# Error: MethodNotFound
```

## Access Control Patterns

### Single Manager

Basic pattern with one manager:

```rust
pub struct Contract {
    manager: AccountId,
}

pub fn update_contract(&self) -> Promise {
    assert_eq!(
        env::predecessor_account_id(),
        self.manager,
        "Unauthorized"
    );
    // ... update logic
}
```

### Multiple Managers

Allow multiple authorized updaters:

```rust
pub struct Contract {
    managers: UnorderedSet<AccountId>,
}

pub fn update_contract(&self) -> Promise {
    assert!(
        self.managers.contains(&env::predecessor_account_id()),
        "Unauthorized"
    );
    // ... update logic
}

#[private]
pub fn add_manager(&mut self, account: AccountId) {
    self.managers.insert(account);
}
```

### DAO Governance

Integrate with a DAO for decentralized updates:

```rust
pub struct Contract {
    dao_contract: AccountId,
}

pub fn update_contract(&self) -> Promise {
    // Verify this is a callback from the DAO
    assert_eq!(
        env::predecessor_account_id(),
        self.dao_contract,
        "Must be called by DAO"
    );
    // ... update logic
}
```

The DAO contract would include a proposal system for voting on updates.

## Security Considerations

**Manager Key Security**: The manager account key controls contract updates. Use a hardware wallet or multisig.

**Lock Early**: Deploy with the update method, then lock the contract by removing keys.

**Audit Update Methods**: The update method is a critical security point - audit it carefully.

**Test Updates**: Always test the full update flow on testnet first.

**Emergency Stop**: Consider adding a pause mechanism:

```rust
pub struct Contract {
    manager: AccountId,
    paused: bool,
}

pub fn pause(&mut self) {
    assert_eq!(env::predecessor_account_id(), self.manager);
    self.paused = true;
}

pub fn update_contract(&self) -> Promise {
    assert!(!self.paused, "Contract is paused");
    assert_eq!(env::predecessor_account_id(), self.manager);
    // ... update logic
}
```

## Multi-Version Updates

For complex updates spanning multiple versions, track state version:

<Github fname="migrations.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/advanced-multi-version-updates/v3/src/migrations.rs"
    start="8" end="13" />

Handle incremental migrations:

<Github fname="migrations.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/advanced-multi-version-updates/v3/src/migrations.rs"
    start="125" end="146" />

This allows migrating through multiple versions: V1 → V2 → V3.

Next, we'll cover testing strategies for state migrations.