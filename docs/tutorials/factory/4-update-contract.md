---
id: update-contract
title: Updating Stored Contracts
sidebar_label: Update Contract Template
description: "Learn how to update the contract template stored in your factory for future deployments."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

One of the factory pattern's most powerful features is the ability to update the stored contract template. This means you can improve your contract and all future instances will use the new version.

## Why Update Contract Templates?

**Bug Fixes:** Deploy corrected versions to prevent issues in new instances

**Feature Additions:** Add new functionality to future deployments  

**Performance Improvements:** Optimize gas usage and execution speed

**Security Enhancements:** Address security vulnerabilities

**API Changes:** Update contract interfaces and methods

:::info
Updating the stored contract only affects **future** deployments. Existing instances remain unchanged and independent.
:::

## Prepare Your Updated Contract

Let's create an improved version of our Hello World contract with additional features:

```rust
use near_sdk::near_bindgen;
use near_sdk::{env, AccountId, PanicOnDefault, Timestamp};

#[near_bindgen]
#[derive(PanicOnDefault)]
pub struct HelloWorldV2 {
    pub beneficiary: AccountId,
    pub created_at: Timestamp,
    pub greeting_count: u64,
}

#[near_bindgen]
impl HelloWorldV2 {
    #[init]
    pub fn new(beneficiary: AccountId) -> Self {
        Self { 
            beneficiary,
            created_at: env::block_timestamp(),
            greeting_count: 0,
        }
    }
    
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }
    
    pub fn get_created_at(&self) -> Timestamp {
        self.created_at
    }
    
    pub fn say_hello(&mut self) -> String {
        self.greeting_count += 1;
        format!(
            "Hello #{} from {} (created at {})", 
            self.greeting_count,
            env::current_account_id(),
            self.created_at
        )
    }
    
    pub fn get_greeting_count(&self) -> u64 {
        self.greeting_count
    }
}
```

Build the updated contract:

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Update the Factory Template

Now let's update our factory with the new contract template:

<Tabs>
  <TabItem value="cli" label="NEAR CLI" default>

```bash
# Convert new contract to base64
export NEW_TEMPLATE_BYTES=$(cat target/wasm32-unknown-unknown/release/hello_world_v2.wasm | base64 -w 0)

# Update factory's stored contract
near call my-factory.testnet update_stored_contract "$NEW_TEMPLATE_BYTES" \
  --base64 --accountId my-factory.testnet \
  --gas 300000000000000 --networkId testnet
```

  </TabItem>
  <TabItem value="script" label="Update Script">

Create an `update_template.sh` script:

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"
NEW_CONTRACT_PATH="target/wasm32-unknown-unknown/release/hello_world_v2.wasm"

echo "Updating factory template with: $NEW_CONTRACT_PATH"

# Convert to base64
NEW_TEMPLATE_BYTES=$(cat $NEW_CONTRACT_PATH | base64 -w 0)

# Update the stored contract
near call $FACTORY_ACCOUNT update_stored_contract "$NEW_TEMPLATE_BYTES" \
  --base64 --accountId $FACTORY_ACCOUNT \
  --gas 300000000000000 --networkId testnet

echo "Factory template updated successfully!"
echo "New instances will use the updated contract."
```

  </TabItem>
</Tabs>

## Test the Updated Template

Create a new instance to verify the template was updated:

```bash
# Create instance with new template
near call my-factory.testnet create_factory_subaccount_and_deploy \
  '{"name": "hello-v2", "beneficiary": "alice.testnet"}' \
  --deposit 1.5 --accountId your-account.testnet \
  --gas 300000000000000 --networkId testnet

# Test new features
near view hello-v2.my-factory.testnet get_created_at --networkId testnet
near view hello-v2.my-factory.testnet get_greeting_count --networkId testnet

# Test the enhanced say_hello method
near call hello-v2.my-factory.testnet say_hello \
  --accountId your-account.testnet --networkId testnet
```

## Version Comparison

Let's compare old and new instances:

<Tabs>
  <TabItem value="old" label="Old Version">

```bash
# Old instance (hello1.my-factory.testnet)
near view hello1.my-factory.testnet say_hello --networkId testnet
# Output: "Hello from hello1.my-factory.testnet"

# This method doesn't exist in v1
near view hello1.my-factory.testnet get_created_at --networkId testnet
# Error: MethodNotFound
```

  </TabItem>
  <TabItem value="new" label="New Version">

```bash
# New instance (hello-v2.my-factory.testnet)
near call hello-v2.my-factory.testnet say_hello \
  --accountId your-account.testnet --networkId testnet
# Output: "Hello #1 from hello-v2.my-factory.testnet (created at 1699123456789)"

# New methods work
near view hello-v2.my-factory.testnet get_created_at --networkId testnet
near view hello-v2.my-factory.testnet get_greeting_count --networkId testnet
```

  </TabItem>
</Tabs>

## Managing Multiple Versions

For production systems, consider implementing version tracking:

```rust
#[near_bindgen]
#[derive(PanicOnDefault)]
pub struct VersionedFactory {
    pub current_version: String,
    pub contracts: UnorderedMap<String, Vec<u8>>, // version -> bytecode
}

#[near_bindgen]
impl VersionedFactory {
    pub fn update_contract_version(&mut self, version: String) {
        self.contracts.insert(&version, env::input().unwrap().to_vec());
        self.current_version = version;
    }
    
    pub fn deploy_specific_version(&mut self, name: String, version: String, args: String) {
        let code = self.contracts.get(&version).expect("Version not found");
        // Deploy specific version...
    }
}
```

## Update Best Practices

**Test Thoroughly:** Always test updated contracts on testnet first

**Version Documentation:** Keep track of changes between versions

**Backward Compatibility:** Consider how changes affect existing instances

**Storage Costs:** Larger contracts increase deployment costs

**Breaking Changes:** Document any API changes for instance users

**Rollback Plan:** Keep previous versions available if needed

## Gas and Storage Considerations

**Update Costs:**
- Gas: 200-300 TGas for large contracts
- Storage: Additional costs for larger bytecode
- No cost for smaller/optimized contracts

**Deployment Impact:**
- Future deployments use new storage costs
- Existing instances unaffected
- Factor new costs into deposit calculations

## Automation and CI/CD

For production factories, consider automation:

```bash
#!/bin/bash
# Automated deployment pipeline

# Build latest contract
cargo build --target wasm32-unknown-unknown --release

# Run tests
cargo test

# Update factory if tests pass
if [ $? -eq 0 ]; then
    ./update_template.sh
    echo "Factory updated with latest version"
else
    echo "Tests failed, factory not updated"
    exit 1
fi
```

## Monitoring Updates

Track your factory's evolution:

```bash
# Check factory state
near view my-factory.testnet get_info --networkId testnet

# Monitor storage usage
near state my-factory.testnet --networkId testnet
```

## Final Thoughts

You've now learned the complete factory pattern workflow:

✅ **Built** a factory contract that stores and deploys bytecode
✅ **Deployed** your factory to testnet  
✅ **Created** multiple contract instances
✅ **Updated** the stored contract template

The factory pattern enables powerful automation and standardization for smart contract deployment on NEAR. Use it when you need to deploy many similar contracts while maintaining consistency and reducing costs.

## Next Steps

Consider exploring:
- **Advanced Factory Patterns:** Multi-template factories, versioning systems
- **Access Control:** Permission systems for who can deploy instances  
- **Factory Upgrades:** Upgrading the factory contract itself
- **Cross-Contract Calls:** Factories that interact with their instances
- **Integration:** Using factories in larger application architectures