---
id: deploy
title: Deploying and Testing Your Donation Contract
sidebar_label: Deploy & Test
description: "Learn how to deploy your donation smart contract to NEAR testnet and create comprehensive integration tests."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from '@site/src/components/codetabs';

Now that our donation contract is feature-complete, let's deploy it to NEAR testnet and create comprehensive tests to ensure everything works correctly in a real blockchain environment.

## Pre-Deployment Checklist

Before deploying, let's ensure our contract is ready for production:

### Build and Optimize

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```bash
# Clean and build with optimizations
cargo clean
cargo build --target wasm32-unknown-unknown --release

# Verify the build succeeded and check file size
ls -la target/wasm32-unknown-unknown/release/donation_contract.wasm

# Optional: Use wasm-opt for further optimization
wasm-opt -Oz target/wasm32-unknown-unknown/release/donation_contract.wasm \
  -o target/wasm32-unknown-unknown/release/donation_contract_optimized.wasm
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-ts

# Install dependencies and build
npm install
npm run build

# Verify build output
ls -la build/contract.wasm
```

  </TabItem>
</Tabs>

### Run Local Tests

Ensure all tests pass before deployment:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```bash
# Run all unit tests
cargo test

# Run tests with detailed output
cargo test -- --nocapture
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
# Run JavaScript/TypeScript tests (if configured)
npm test
```

  </TabItem>
</Tabs>

## Contract Deployment

### Deploy to Testnet

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Near CLI (Short)">

```bash
# Deploy the contract
near deploy donation-dev.testnet target/wasm32-unknown-unknown/release/donation_contract.wasm

# Initialize the contract
near call donation-dev.testnet new \
  '{"beneficiary": "donation-beneficiary.testnet"}' \
  --accountId donation-dev.testnet
```

  </TabItem>
  <TabItem value="full" label="Near CLI (Full)">

```bash
# Deploy the contract
near contract deploy donation-dev.testnet \
  use-file target/wasm32-unknown-unknown/release/donation_contract.wasm \
  without-init-call network-config testnet \
  sign-with-keychain send

# Initialize the contract  
near contract call-function as-transaction donation-dev.testnet new \
  json-args '{"beneficiary": "donation-beneficiary.testnet"}' \
  prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' \
  sign-as donation-dev.testnet network-config testnet \
  sign-with-keychain send
```

  </TabItem>
</Tabs>

### Verify Deployment

```bash
# Check contract state
near view donation-dev.testnet get_beneficiary

# Check contract metadata
near view donation-dev.testnet get_contract_metadata

# Verify initialization
near view donation-dev.testnet get_donation_stats
```

## Integration Testing

Let's create comprehensive integration tests that interact with the deployed contract.

### Create Test Scripts

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Create `tests/integration.rs`:

```rust
use near_workspaces::{Account, Contract, Worker};
use serde_json::json;

#[tokio::test]
async fn test_donation_workflow() -> anyhow::Result<()> {
    let worker = near_workspaces::sandbox().await?;
    
    // Create accounts
    let beneficiary = worker.dev_create_account().await?;
    let donor1 = worker.dev_create_account().await?;
    let donor2 = worker.dev_create_account().await?;
    
    // Deploy and initialize contract
    let contract = worker
        .dev_deploy(&std::fs::read("target/wasm32-unknown-unknown/release/donation_contract.wasm")?)
        .await?;
        
    contract
        .call("new")
        .args_json(json!({
            "beneficiary": beneficiary.id()
        }))
        .transact()
        .await?
        .into_result()?;
    
    // Test initial state
    let beneficiary_result: String = contract
        .view("get_beneficiary")
        .await?
        .json()?;
    assert_eq!(beneficiary_result, beneficiary.id().to_string());
    
    // Test donation without message
    let initial_beneficiary_balance = beneficiary.view_account().await?.balance;
    
    let donation_result = donor1
        .call(contract.id(), "donate")
        .args_json(json!({}))
        .deposit(near_workspaces::types::NearToken::from_near(1))
        .transact()
        .await?;
    
    assert!(donation_result.is_success());
    
    // Verify beneficiary received funds
    let final_beneficiary_balance = beneficiary.view_account().await?.balance;
    assert!(final_beneficiary_balance > initial_beneficiary_balance);
    
    // Test donation with message
    donor2
        .call(contract.id(), "donate")
        .args_json(json!({
            "message": "Keep up the great work!"
        }))
        .deposit(near_workspaces::types::NearToken::from_near(2))
        .transact()
        .await?
        .into_result()?;
    
    // Verify donation tracking
    let stats: serde_json::Value = contract
        .view("get_donation_stats")
        .await?
        .json()?;
    
    assert_eq!(stats["total_donors"], 2);
    assert_eq!(stats["total_donations"], "3000000000000000000000000"); // 3 NEAR
    
    // Test donor-specific queries
    let donor1_donations: Vec<serde_json::Value> = contract
        .view("get_donations_by_donor")
        .args_json(json!({
            "donor": donor1.id(),
            "from_index": 0,
            "limit": 10
        }))
        .await?
        .json()?;
    
    assert_eq!(donor1_donations.len(), 1);
    
    // Test message search
    let message_results: Vec<serde_json::Value> = contract
        .view("search_donations_by_message")
        .args_json(json!({
            "search_term": "great work",
            "limit": 10
        }))
        .await?
        .json()?;
    
    assert_eq!(message_results.len(), 1);
    assert_eq!(message_results[0]["donor"], donor2.id().to_string());
    
    Ok(())
}

#[tokio::test]
async fn test_administrative_functions() -> anyhow::Result<()> {
    let worker = near_workspaces::sandbox().await?;
    
    let beneficiary = worker.dev_create_account().await?;
    let new_beneficiary = worker.dev_create_account().await?;
    let unauthorized_user = worker.dev_create_account().await?;
    
    let contract = worker
        .dev_deploy(&std::fs::read("target/wasm32-unknown-unknown/release/donation_contract.wasm")?)
        .await?;
        
    contract
        .call("new")
        .args_json(json!({
            "beneficiary": beneficiary.id()
        }))
        .transact()
        .await?
        .into_result()?;
    
    // Test successful beneficiary change
    let change_result = beneficiary
        .call(contract.id(), "change_beneficiary")
        .args_json(json!({
            "new_beneficiary": new_beneficiary.id()
        }))
        .transact()
        .await?;
    
    assert!(change_result.is_success());
    
    // Verify beneficiary changed
    let current_beneficiary: String = contract
        .view("get_beneficiary")
        .await?
        .json()?;
    assert_eq!(current_beneficiary, new_beneficiary.id().to_string());
    
    // Test unauthorized beneficiary change (should fail)
    let unauthorized_result = unauthorized_user
        .call(contract.id(), "change_beneficiary")
        .args_json(json!({
            "new_beneficiary": unauthorized_user.id()
        }))
        .transact()
        .await?;
    
    assert!(unauthorized_result.is_failure());
    
    Ok(())
}

#[tokio::test]
async fn test_edge_cases() -> anyhow::Result<()> {
    let worker = near_workspaces::sandbox().await?;
    
    let beneficiary = worker.dev_create_account().await?;
    let donor = worker.dev_create_account().await?;
    
    let contract = worker
        .dev_deploy(&std::fs::read("target/wasm32-unknown-unknown/release/donation_contract.wasm")?)
        .await?;
        
    contract
        .call("new")
        .args_json(json!({
            "beneficiary": beneficiary.id()
        }))
        .transact()
        .await?
        .into_result()?;
    
    // Test zero donation (should fail)
    let zero_donation_result = donor
        .call(contract.id(), "donate")
        .args_json(json!({}))
        .deposit(near_workspaces::types::NearToken::from_yoctonear(0))
        .transact()
        .await?;
    
    assert!(zero_donation_result.is_failure());
    
    // Test queries with no data
    let empty_donations: Vec<serde_json::Value> = contract
        .view("get_donations")
        .args_json(json!({
            "from_index": 0,
            "limit": 10
        }))
        .await?
        .json()?;
    
    assert_eq!(empty_donations.len(), 0);
    
    // Test non-existent donor details
    let non_existent: Option<serde_json::Value> = contract
        .view("get_donor_details")
        .args_json(json!({
            "donor": "non-existent.testnet"
        }))
        .await?
        .json()?;
    
    assert!(non_existent.is_none());
    
    Ok(())
}
```

Add to `Cargo.toml`:

```toml
[dev-dependencies]
near-workspaces = "0.9"
tokio = { version = "1.0", features = ["full"] }
anyhow = "1.0"
serde_json = "1.0"
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Create `contract-ts/sandbox-test/main.ava.ts`:

```typescript
import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  const worker = await Worker.init();
  const root = worker.rootAccount;

  const contract = await root.devDeploy('./build/contract.wasm');
  const beneficiary = await root.createSubAccount('beneficiary');
  const donor1 = await root.createSubAccount('donor1');
  const donor2 = await root.createSubAccount('donor2');

  // Initialize contract
  await contract.call(contract, 'init', {
    beneficiary: beneficiary.accountId,
  });

  t.context.worker = worker;
  t.context.accounts = { contract, beneficiary, donor1, donor2 };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('donation workflow', async (t) => {
  const { contract, beneficiary, donor1, donor2 } = t.context.accounts;

  // Test initial state
  const initialBeneficiary = await contract.view('get_beneficiary');
  t.is(initialBeneficiary, beneficiary.accountId);

  // Make a donation
  await donor1.call(
    contract,
    'donate',
    {},
    { attachedDeposit: '1000000000000000000000000' } // 1 NEAR
  );

  // Verify donation tracking
  const stats = await contract.view('get_donation_stats');
  t.is(stats.total_donors, 1);
  t.is(stats.total_donations, '1000000000000000000000000');

  // Make donation with message
  await donor2.call(
    contract,
    'donate',
    { message: 'Keep up the great work!' },
    { attachedDeposit: '2000000000000000000000000' } // 2 NEAR
  );

  // Verify updated stats
  const updatedStats = await contract.view('get_donation_stats');
  t.is(updatedStats.total_donors, 2);
  t.is(updatedStats.total_donations, '3000000000000000000000000');

  // Test search functionality
  const searchResults = await contract.view('search_donations_by_message', {
    search_term: 'great work',
    limit: 10,
  });
  t.is(searchResults.length, 1);
  t.is(searchResults[0].donor, donor2.accountId);
});

test('administrative functions', async (t) => {
  const { contract, beneficiary } = t.context.accounts;
  const newBeneficiary = await t.context.worker.rootAccount.createSubAccount('newbeneficiary');

  // Change beneficiary (should succeed)
  await beneficiary.call(contract, 'change_beneficiary', {
    new_beneficiary: newBeneficiary.accountId,
  });

  // Verify change
  const currentBeneficiary = await contract.view('get_beneficiary');
  t.is(currentBeneficiary, newBeneficiary.accountId);

  // Test contract metadata
  const metadata = await contract.view('get_contract_metadata');
  t.is(metadata.beneficiary, newBeneficiary.accountId);
  t.is(metadata.version, '1.0.0');
});

test('edge cases and error handling', async (t) => {
  const { contract, donor1 } = t.context.accounts;

  // Test zero donation (should fail)
  const zeroResult = await t.throwsAsync(async () => {
    await donor1.call(
      contract,
      'donate',
      {},
      { attachedDeposit: '0' }
    );
  });

  // Test queries with no data
  const emptyDonations = await contract.view('get_donations', {
    from_index: 0,
    limit: 10,
  });
  t.is(emptyDonations.length, 0);

  // Test non-existent donor
  const nonExistentDonor = await contract.view('get_donor_details', {
    donor: 'non-existent.testnet',
  });
  t.is(nonExistentDonor, null);
});
```

  </TabItem>
</Tabs>

### Run Integration Tests

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```bash
# Run integration tests
cargo test --test integration

# Run specific test
cargo test --test integration test_donation_workflow

# Run with output
cargo test --test integration -- --nocapture
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-ts

# Install test dependencies
npm install --save-dev ava near-workspaces

# Add test script to package.json
npm run test

# Or run directly
npx ava sandbox-test/main.ava.ts
```

  </TabItem>
</Tabs>

## Manual Testing on Testnet

Let's manually test our deployed contract to ensure it works correctly:

### Basic Functionality Tests

```bash
export CONTRACT_ID="donation-dev.testnet"
export BENEFICIARY="donation-beneficiary.testnet"

# Test 1: Make a donation
near call $CONTRACT_ID donate '{}' \
  --deposit 0.5 \
  --accountId your-test-account.testnet

# Test 2: Make a donation with message
near call $CONTRACT_ID donate '{"message": "Great project!"}' \
  --deposit 1.0 \
  --accountId your-test-account.testnet

# Test 3: Check donation stats
near view $CONTRACT_ID get_donation_stats

# Test 4: Get recent donations
near view $CONTRACT_ID get_donations '{"from_index": 0, "limit": 5}'

# Test 5: Get donor details
near view $CONTRACT_ID get_donor_details \
  '{"donor": "your-test-account.testnet"}'
```

### Advanced Feature Tests

```bash
# Test search functionality
near view $CONTRACT_ID search_donations_by_message \
  '{"search_term": "project", "limit": 10}'

# Test top donors
near view $CONTRACT_ID get_top_donors '{"limit": 3}'

# Test date range queries (last 24 hours)
YESTERDAY=$(date -d 'yesterday' +%s)000000000
NOW=$(date +%s)000000000

near view $CONTRACT_ID get_donation_analytics \
  "{\"date_range\": {\"start_timestamp\": \"$YESTERDAY\", \"end_timestamp\": \"$NOW\"}}"
```

### Administrative Tests

```bash
# Test beneficiary change (only beneficiary can do this)
near call $CONTRACT_ID change_beneficiary \
  '{"new_beneficiary": "new-beneficiary.testnet"}' \
  --accountId $BENEFICIARY

# Test unauthorized access (should fail)
near call $CONTRACT_ID change_beneficiary \
  '{"new_beneficiary": "hacker.testnet"}' \
  --accountId your-test-account.testnet
```

## Performance Testing

Test your contract's performance under various conditions:

### Load Testing

```bash
# Script to make multiple donations
for i in {1..10}; do
  near call $CONTRACT_ID donate \
    "{\"message\": \"Donation #$i\"}" \
    --deposit 0.1 \
    --accountId donor-$i.testnet &
done
wait

# Check if all donations were recorded
near view $CONTRACT_ID get_donation_stats
```

### Gas Usage Analysis

```bash
# Test gas consumption for different operations
near call $CONTRACT_ID donate '{}' \
  --deposit 1.0 \
  --gas 300000000000000 \
  --accountId test-account.testnet

# Check gas usage for large queries
near view $CONTRACT_ID get_donations \
  '{"from_index": 0, "limit": 50}' \
  --gas 300000000000000
```

## Monitoring and Maintenance

### Contract Health Checks

Create a monitoring script:

```bash
#!/bin/bash
# monitor-contract.sh

CONTRACT_ID="your-donation-contract.testnet"

echo "=== Contract Health Check ==="
echo "Timestamp: $(date)"

# Check contract metadata
echo "Contract Metadata:"
near view $CONTRACT_ID get_contract_metadata

# Check donation stats
echo -e "\nDonation Statistics:"
near view $CONTRACT_ID get_donation_stats

# Check recent activity
echo -e "\nRecent Donations:"
near view $CONTRACT_ID get_donations '{"from_index": 0, "limit": 3}'

echo "=== Health Check Complete ==="
```

### Storage Monitoring

```bash
# Monitor storage usage
METADATA=$(near view $CONTRACT_ID get_contract_metadata)
echo "Storage used: $(echo $METADATA | jq -r '.storage_used')"
echo "Contract balance: $(echo $METADATA | jq -r '.contract_balance')"
```

## Troubleshooting Common Issues

### Deployment Issues

**Problem**: Contract deployment fails
```bash
# Check account balance
near state donation-dev.testnet

# Ensure sufficient storage deposit
near call donation-dev.testnet storage_deposit \
  '{}' --deposit 0.1 --accountId donation-dev.testnet
```

**Problem**: Contract initialization fails
```bash
# Check if contract is already initialized
near view donation-dev.testnet get_beneficiary

# If needed, redeploy without initialization
near deploy donation-dev.testnet contract.wasm
```

### Runtime Issues

**Problem**: Donations fail with gas errors
```bash
# Increase gas limit
near call $CONTRACT_ID donate '{}' \
  --deposit 1.0 \
  --gas 300000000000000 \
  --accountId donor.testnet
```

**Problem**: Query methods return empty results
```bash
# Check if contract has data
near view $CONTRACT_ID number_of_donors
near view $CONTRACT_ID total_donation_events
```

## Production Checklist

Before deploying to mainnet:

- [ ] All unit tests pass
- [ ] Integration tests pass on testnet
- [ ] Manual testing completed successfully  
- [ ] Gas usage analyzed and optimized
- [ ] Administrative functions tested
- [ ] Edge cases handled properly
- [ ] Storage costs calculated
- [ ] Monitoring setup configured
- [ ] Backup and recovery plan established
- [ ] Security audit completed (recommended)

:::tip Production Deployment

For mainnet deployment, follow the same process but use:
- `--networkId mainnet` 
- Real NEAR tokens for testing (start small!)
- A mainnet account with sufficient balance
- Consider using a more descriptive contract account name

Example mainnet deployment:
```bash
near deploy my-charity-donation.near contract.wasm --networkId mainnet
```

:::

## Deployment Summary

Congratulations! You've successfully:

- **Built and optimized** your donation smart contract
- **Deployed to testnet** with proper initialization
- **Created comprehensive tests** including unit, integration, and manual testing
- **Implemented monitoring** and health checks
- **Tested administrative functions** and security measures
- **Analyzed performance** and gas usage
- **Prepared for production** deployment

Your donation contract is now ready for real-world use! The next and final step is building a user-friendly frontend interface.