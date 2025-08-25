---
id: factory
title: How to Deploy Contracts from Contracts
description: "Learn how to implement the factory pattern on NEAR to programmatically deploy smart contracts from within other smart contracts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# How to Deploy Contracts from Contracts

The factory pattern is a powerful design pattern that allows one smart contract to deploy and manage other smart contracts programmatically. This tutorial will teach you how to build a factory contract that can store compiled contract code and deploy it to new sub-accounts automatically.

## What is a Factory Contract?

A factory contract is a smart contract that acts as a template deployer. Instead of manually deploying each instance of a contract, the factory automates this process by:

- Storing compiled contract bytecode
- Creating new sub-accounts 
- Deploying the stored contract to those sub-accounts
- Managing and updating the stored contract code

This pattern is particularly useful when you need to deploy many instances of the same contract type, such as creating multiple DAOs, token contracts, or any standardized smart contract.

## Why Use the Factory Pattern?

**Cost Efficiency**: Deploy once, reuse many times without re-uploading contract code.

**Standardization**: Ensure all deployed contracts follow the same tested pattern.

**Automation**: Programmatically create contracts without manual intervention.

**Upgradability**: Update the stored contract template for future deployments.

**Access Control**: Implement permissions for who can deploy new instances.

---

## Understanding NEAR Account Limitations

Before implementing a factory, it's crucial to understand NEAR's account creation rules:

### What Factories Can Do
- Create sub-accounts of themselves (e.g., `factory.near` can create `instance1.factory.near`)
- Deploy contracts to their own sub-accounts
- Manage the stored contract bytecode

### What Factories Cannot Do
- Create sub-accounts for other accounts
- Deploy contracts to accounts they don't own
- Control sub-accounts after creation (they become independent)

This means your factory at `factory.testnet` can create `dao1.factory.testnet` and `dao2.factory.testnet`, but cannot create `dao1.alice.testnet`.

---

## Building Your Factory Contract

Let's examine the core components of a factory contract:

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
            start="14" end="66" />
    <Github fname="manager.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
            start="5" end="19" />
  </Language>
</CodeTabs>

### Core Factory Methods

The factory implements two essential methods:

**`create_factory_subaccount_and_deploy`**: Creates a new sub-account and deploys the stored contract to it.

**`update_stored_contract`**: Updates the contract bytecode that will be deployed to future instances.

---

## Implementing Contract Deployment

When you call `create_factory_subaccount_and_deploy`, the factory:

1. **Creates the sub-account** using NEAR's account creation APIs
2. **Transfers the required deposit** for account creation and storage
3. **Deploys the stored contract** bytecode to the new account
4. **Initializes the contract** with the provided parameters

```bash
near call <factory-account> create_factory_subaccount_and_deploy '{ "name": "sub", "beneficiary": "<account-to-be-beneficiary>"}' --deposit 1.24 --accountId <account-id> --gas 300000000000000
```

The deposit covers:
- Account creation costs (~0.1 NEAR)
- Storage costs for the contract code
- Initial balance for the new contract

---

## Managing Contract Updates

One of the factory pattern's key advantages is the ability to update the stored contract for future deployments:

### The Update Method Implementation

```rust
#[private]
pub fn update_stored_contract(&mut self) {
  self.code = env::input().expect("Error: No input").to_vec();
}
```

This method uses a clever optimization: instead of deserializing the input parameters (which would consume excessive gas for large files), it reads the raw input directly using `env::input()`.

### Why This Optimization Matters

Standard parameter deserialization would:
1. Parse the entire WASM file from JSON
2. Validate the input format
3. Convert it to the appropriate data type

For large contract files, this process consumes the entire gas limit. The direct input approach bypasses this overhead.

### Updating Your Stored Contract

```bash
# Convert your contract to base64
export BYTES=`cat ./path/to/new-contract.wasm | base64`

# Update the factory's stored contract
near call <factory-account> update_stored_contract "$BYTES" --base64 --accountId <factory-account> --gas 30000000000000
```

---

## Testing Your Factory

### 1. Deploy the Factory

```bash
./deploy.sh
```

Check the deployment:
```bash
cat ./neardev/dev-account
# Returns: dev-1659899566943-21539992274727
```

### 2. Create Your First Instance

```bash
near call <factory-account> create_factory_subaccount_and_deploy '{ "name": "test-instance", "beneficiary": "alice.testnet"}' --deposit 1.24 --accountId <your-account> --gas 300000000000000
```

### 3. Verify the Deployment

```bash
near view test-instance.<factory-account> get_beneficiary
# Expected: alice.testnet
```

---

## Best Practices and Considerations

### Gas Management
- Contract deployment requires significant gas (200-300 TGas)
- Always specify sufficient gas limits
- Test gas requirements with smaller contracts first

### Storage Costs
- Factor in storage costs for both factory and deployed contracts
- Require sufficient deposit to cover all costs
- Consider implementing deposit refund mechanisms

### Security Considerations
- Implement access controls for who can deploy contracts
- Validate initialization parameters before deployment
- Consider implementing factory ownership and permissions

### Contract Versioning
- Implement version tracking for stored contracts
- Consider allowing multiple contract versions
- Document breaking changes between versions

---

## Alternative Approaches

### Direct Account Creation
Instead of using a factory, you could create accounts directly, but this requires:
- Manual contract deployment for each instance
- Separate storage costs for each deployment
- More complex coordination between deployments

### Proxy Pattern
For upgradeable contracts, consider the proxy pattern where:
- A proxy contract delegates calls to an implementation contract
- Updates change the implementation address
- All instances can be upgraded simultaneously

### When to Use Factories
Factories work best when:
- You need many instances of similar contracts
- Instances should be independent after creation
- You want to standardize deployment parameters
- Cost optimization is important for multiple deployments

---

## Common Pitfalls to Avoid

**Insufficient Deposits**: Always calculate the minimum required deposit including account creation, storage, and initialization costs.

**Gas Limit Errors**: Contract deployment is gas-intensive. Start with higher limits and optimize down.

**Access Control**: Implement proper permissions to prevent unauthorized contract deployments.

**Storage Management**: Monitor storage costs as they accumulate with each stored contract and deployment.

**Sub-account Naming**: Plan your naming convention carefully as sub-accounts cannot be renamed after creation.

:::note Development Environment
This tutorial works with:
- near-cli: `4.0.13`
- node: `18.19.1` 
- rustc: `1.77.0`
:::

The factory pattern provides a powerful way to scale smart contract deployment on NEAR. By understanding the account limitations, gas considerations, and implementation details, you can build efficient factory contracts that automate and standardize your deployment process.
