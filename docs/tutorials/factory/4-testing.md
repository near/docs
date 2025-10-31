---
id: testing
title: Testing the Factory Contract
sidebar_label: Testing
---

import {Github} from "@site/src/components/codetabs"

Testing factory contracts requires verifying both management functions and the deployment process. We'll use `near-workspaces` for integration testing.

## Test Setup

Create `tests/workspaces.rs`:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="1" end="10" />

:::info Runtime Version

Global contracts require nearcore 2.7.0 or later. The `sandbox_with_version("2.7.0")` ensures we're testing with the correct runtime.

:::

## Testing Management Functions

Test that the factory correctly stores and updates configuration:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="16" end="24" />

### Verify Default Configuration

After deployment, check the default global contract reference:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="25" end="32" />

### Update to Hash-Based Reference

Test switching to a code hash reference:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="34" end="44" />

### Verify the Update

Confirm the new configuration is stored:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="46" end="53" />

### Update to Account-Based Reference

Test switching to an account reference:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="55" end="65" />

### Verify Minimum Deposit

Check the minimum deposit configuration:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="74" end="82" />

## Testing Edge Cases

Test error conditions and invalid inputs:

<Github fname="workspaces.rs"
    url="https://github.com/near-examples/factory-rust/blob/main/tests/workspaces.rs"
    start="87" end="108" />

This test verifies that using a non-existent global contract hash fails appropriately.

## Running Tests

Execute all tests:

```bash
# Run all tests
cargo test

# Run only integration tests
cargo test --test workspaces

# Run with output
cargo test -- --nocapture
```

## Unit Tests

You can also add unit tests directly in your contract modules:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;

    #[test]
    fn test_default_config() {
        let context = VMContextBuilder::new()
            .current_account_id(accounts(0))
            .build();
        testing_env!(context);

        let contract = GlobalFactoryContract::default();
        
        let expected = GlobalContractId::AccountId(
            "ft.globals.primitives.testnet".parse().unwrap()
        );
        assert_eq!(contract.global_contract_id, expected);
        assert_eq!(
            contract.min_deposit_amount,
            NearToken::from_millinear(200)
        );
    }

    #[test]
    #[should_panic(expected = "Attach at least")]
    fn test_insufficient_deposit() {
        let mut context = VMContextBuilder::new()
            .current_account_id(accounts(0))
            .attached_deposit(NearToken::from_millinear(100))
            .build();
        testing_env!(context);

        let mut contract = GlobalFactoryContract::default();
        contract.deploy("sub".to_string());
    }
}
```

## Testing Deployment (Manual)

While `near-workspaces` doesn't yet support deploying global contracts in tests, you can manually test deployment:

### 1. Deploy Factory

```bash
cargo near deploy <factory-account>
```

### 2. Deploy a Sub-Account

```bash
near contract call-function as-transaction <factory-account> deploy \
  json-args '{"name": "test"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0.2 NEAR' \
  sign-as <your-account> \
  network-config testnet \
  sign-with-keychain send
```

### 3. Verify Sub-Account Creation

```bash
near account view-account-summary test.<factory-account> \
  network-config testnet
```

### 4. Initialize the Contract

```bash
near contract call-function as-transaction test.<factory-account> \
  new_default_meta \
  json-args '{
    "owner_id": "<your-account>",
    "total_supply": "1000000000000000000000000"
  }' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  sign-as <your-account> \
  network-config testnet \
  sign-with-keychain send
```

### 5. Test the Deployed Contract

```bash
near contract call-function as-read-only test.<factory-account> \
  ft_metadata \
  json-args {} \
  network-config testnet now
```

## Continuous Integration

Add GitHub Actions for automated testing:

```yaml
name: Test Factory Contract
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          
      - name: Install cargo-near
        run: cargo install --locked cargo-near
        
      - name: Run tests
        run: cargo test
```

## Test Coverage

Ensure comprehensive coverage:

- ✅ Default configuration on deployment
- ✅ Updating global contract reference (both types)
- ✅ Updating minimum deposit
- ✅ Querying configuration
- ✅ Invalid global contract hash handling
- ✅ Insufficient deposit handling
- ✅ Invalid sub-account names
- ✅ Access control (private methods)

## Debugging Tips

When tests fail:

1. **Check runtime version**: Global contracts need nearcore 2.7.0+
2. **Verify deposits**: Ensure attached deposits meet minimum requirements
3. **Validate account names**: Sub-account names must be valid NEAR account IDs
4. **Review logs**: Use `env::log_str` in your contract for debugging
5. **Test incrementally**: Start with simple cases and add complexity

## Summary

You've learned how to:
- Set up a factory contract project with global contracts support
- Implement the deploy method to create sub-accounts with deployed contracts
- Manage factory configuration and global contract references
- Test the factory with both unit and integration tests

This factory pattern enables efficient, scalable contract deployment across the NEAR ecosystem!

:::tip Production Considerations

Before deploying to mainnet:
- Thoroughly test with realistic scenarios
- Implement proper access control
- Consider upgrade paths for the factory itself
- Monitor gas costs and optimize where possible
- Document the deployment and initialization process for users

:::