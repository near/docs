---
id: testing
title: Testing State Migrations
sidebar_label: Testing
---

import {Github} from "@site/src/components/codetabs"

Thorough testing ensures your state migrations work correctly and don't lose data. Use `near-workspaces` for integration testing.

## Test Setup

Create a test fixture that deploys the base contract and adds data:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/tests/workspaces.rs"
    start="14" end="62" />

This creates:
- A sandbox environment
- The base contract with initial data
- Test accounts to interact with the contract

## Testing Basic Migration

### Verify Base Contract State

First, confirm the base contract works:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/tests/workspaces.rs"
    start="64" end="109" />

### Test the Migration

Deploy the updated contract and verify migration:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/tests/workspaces.rs"
    start="111" end="164" />

Key assertions:
- Migration succeeds without errors
- Old data is preserved with new structure
- Payments are correctly moved into messages
- Old methods are removed

## Testing Versioned State

For versioned state, test that old and new versions coexist:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/tests/workspaces.rs"
    start="14" end="111" />

Verify:
- Old V1 messages convert to V2 with defaults
- New V2 messages store complete data
- No migration method needed

## Testing Self-Updates

Test that the contract can update itself:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/update/tests/workspaces.rs"
    start="104" end="161" />

Verify:
- Only the manager can trigger updates
- Update and migration happen atomically
- State is correctly transformed

## Running Tests

Execute all migration tests:

```bash
# Test basic migration
cd basic-updates/update
cargo test --test workspaces

# Test versioned state
cd enum-updates/update
cargo test --test workspaces

# Test self-updates
cd self-updates/update
cargo test --test workspaces
```

## Test Best Practices

### Test with Realistic Data Volumes

Don't just test with 2 messages - test with hundreds:

```rust
#[tokio::test]
async fn test_large_migration() {
    // ... setup
    
    // Add 500 messages
    for i in 0..500 {
        alice.call(contract.id(), "add_message")
            .args_json(json!({"text": format!("Message {}", i)}))
            .deposit(ONE_TENTH_NEAR)
            .transact()
            .await
            .unwrap();
    }
    
    // Deploy and migrate
    let updated_wasm = near_workspaces::compile_project("./").await.unwrap();
    // ... test migration
}
```

### Test Gas Limits

Ensure migrations don't exceed gas limits:

```rust
let migrate_outcome = guest_book
    .call(migrated_contract.id(), "migrate")
    .args_json(json!({}))
    .gas(Gas::from_tgas(300)) // Test with appropriate gas
    .transact()
    .await
    .unwrap();

assert!(migrate_outcome.is_success());

// Check actual gas used
let gas_used = migrate_outcome.total_gas_burnt;
println!("Migration used {} Tgas", gas_used.as_tgas());
```

### Test Edge Cases

```rust
#[tokio::test]
async fn test_empty_state_migration() {
    // Test migrating with no data
}

#[tokio::test]
async fn test_partial_data_migration() {
    // Test migrating when some fields are missing
}

#[tokio::test]
async fn test_failed_migration_rollback() {
    // Verify state doesn't change if migration fails
}
```

### Test Authorization

For self-updating contracts, verify access control:

```rust
#[tokio::test]
async fn test_unauthorized_update() {
    let base_contract = base_contract().await;
    let updated_wasm = near_workspaces::compile_project("./").await.unwrap();

    // Try to update from non-manager account
    let unauthorized_outcome = base_contract.bob
        .call(base_contract.guest_book.id(), "update_contract")
        .args(updated_wasm)
        .gas(Gas::from_tgas(300))
        .transact()
        .await
        .unwrap();

    // Should fail
    assert!(unauthorized_outcome.is_failure());
}
```

## Manual Testing on Testnet

After automated tests pass, manually test on testnet:

### 1. Deploy Base Contract

```bash
cargo near deploy test-migrate.testnet \
  with-init-call init json-args '{"manager":"manager.testnet"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```

### 2. Add Test Data

```bash
# Add several messages with varying payments
near contract call-function as-transaction \
  test-migrate.testnet add_message \
  json-args '{"text": "Test message 1"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0.05 NEAR' \
  sign-as your-account.testnet \
  network-config testnet \
  sign-with-keychain send
```

### 3. Export State Before Migration

```bash
near contract call-function as-read-only \
  test-migrate.testnet get_messages \
  json-args {} \
  network-config testnet now > messages-before.json

near contract call-function as-read-only \
  test-migrate.testnet get_payments \
  json-args {} \
  network-config testnet now > payments-before.json
```

### 4. Deploy Updated Contract

```bash
cargo near deploy test-migrate.testnet \
  with-init-call migrate json-args {} \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```

### 5. Verify Migration

```bash
near contract call-function as-read-only \
  test-migrate.testnet get_messages \
  json-args {} \
  network-config testnet now > messages-after.json

# Compare before and after
diff messages-before.json messages-after.json
```

### 6. Test New Functionality

```bash
# Add a message with the new contract
near contract call-function as-transaction \
  test-migrate.testnet add_message \
  json-args '{"text": "Post-migration message"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0.1 NEAR' \
  sign-as your-account.testnet \
  network-config testnet \
  sign-with-keychain send

# Verify it has payment embedded
near contract call-function as-read-only \
  test-migrate.testnet get_messages \
  json-args {} \
  network-config testnet now
```

## Testing Checklist

Before deploying to mainnet, verify:

- [ ] All automated tests pass
- [ ] Manual testnet migration successful
- [ ] Data integrity confirmed (no lost messages/payments)
- [ ] Gas usage acceptable for your data volume
- [ ] New contract methods work correctly
- [ ] Removed methods properly deleted
- [ ] Authorization works as expected (for self-updates)
- [ ] State size doesn't exceed limits
- [ ] Multiple migrations tested (for multi-version updates)

## Debugging Failed Migrations

If a migration fails:

**1. Check Error Messages**

```bash
# The transaction will show the panic message
near tx-status <transaction-hash> --accountId <contract-account>
```

**2. Verify State Structure**

Ensure your `OldState` structure matches the deployed contract exactly.

**3. Test Serialization**

```rust
#[test]
fn test_old_state_deserialization() {
    let old_state = OldState {
        messages: Vector::new(b"m"),
        payments: Vector::new(b"p"),
    };
    
    // Try to serialize and deserialize
    let bytes = borsh::to_vec(&old_state).unwrap();
    let deserialized: OldState = borsh::from_slice(&bytes).unwrap();
}
```

**4. Check Storage Keys**

Ensure storage key prefixes match the old contract:

```rust
// Old contract used b"m" and b"p"
Vector::new(b"m") // for messages
Vector::new(b"p") // for payments
```

## Summary

You've learned how to:
- Write comprehensive integration tests for state migrations
- Test basic migrations, versioned state, and self-updates
- Verify data integrity across contract updates
- Test with realistic data volumes and gas limits
- Manually test migrations on testnet
- Debug failed migrations

## Key Testing Principles

**Always test before mainnet**: Never deploy a migration to mainnet without thorough testnet testing.

**Test with production-like data**: Use similar data volumes to what you have in production.

**Verify data integrity**: Confirm no data is lost during migration.

**Test incrementally**: For complex migrations, test each version transition separately.

**Monitor gas usage**: Ensure migrations complete within gas limits for your data size.

## Migration Strategies Comparison

### Basic Migration
- **Best for**: One-time schema changes
- **Pros**: Simple, explicit control
- **Cons**: Requires migration transaction, potential downtime
- **Testing focus**: Data transformation correctness

### Versioned State
- **Best for**: Evolving schemas with frequent updates
- **Pros**: No downtime, gradual migration, flexible
- **Cons**: Storage overhead, complexity increases over time
- **Testing focus**: Version conversion logic

### Self-Update
- **Best for**: Autonomous contracts, DAO-governed protocols
- **Pros**: No external deployment needed, atomic update+migration
- **Cons**: More complex, critical security point
- **Testing focus**: Authorization, atomic execution

## Production Checklist

Before deploying to mainnet:

1. **Code Review**: Have migrations reviewed by other developers
2. **Testnet Testing**: Complete full migration cycle on testnet
3. **Data Export**: Back up current state before migration
4. **Gas Estimation**: Verify gas costs for your data volume
5. **Rollback Plan**: Know how to revert if something goes wrong
6. **Monitoring**: Watch contract after migration for issues
7. **Communication**: Inform users about the update if needed

## Next Steps

With these migration patterns, you can:

- **Update contracts safely**: Change state structures without losing data
- **Plan for evolution**: Use versioning for contracts that will evolve
- **Build autonomous systems**: Create self-updating contracts for DAOs
- **Test thoroughly**: Ensure migrations work before mainnet deployment

## Additional Resources

- [NEAR Contract Standards](https://github.com/near/NEPs/tree/master/neps)
- [State Migration Examples](https://github.com/near-examples/update-migrate-rust)
- [near-workspaces Documentation](https://docs.rs/near-workspaces/)
- [Upgrade Pattern Best Practices](https://docs.near.org/develop/upgrade)

Remember: State migrations are critical operations. Always prioritize data safety and thorough testing!