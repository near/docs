---
id: deploy-factory
title: Deploying Your Factory Contract
sidebar_label: Deploy Factory
description: "Deploy the factory contract to NEAR testnet and upload the initial contract template."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Now that we have our factory contract built, let's deploy it to NEAR testnet and upload our first contract template.

## Deploy the Factory

First, let's deploy our factory contract to a testnet account:

<Tabs>
  <TabItem value="cli" label="NEAR CLI" default>

```bash
# Create a new account for your factory (optional)
near account create-account fund-myself my-factory.testnet

# Deploy the factory contract
near contract deploy my-factory.testnet use-file target/wasm32-unknown-unknown/release/factory.wasm with-init-call new json-args '{"code": ""}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

  </TabItem>
  <TabItem value="script" label="Deploy Script">

Create a `deploy.sh` script:

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"

# Build the factory contract
cargo build --target wasm32-unknown-unknown --release

# Deploy factory
near contract deploy $FACTORY_ACCOUNT \
  use-file target/wasm32-unknown-unknown/release/factory.wasm \
  with-init-call new json-args '{"code": ""}' \
  prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' \
  network-config testnet sign-with-keychain send

echo "Factory deployed to: $FACTORY_ACCOUNT"
```

  </TabItem>
</Tabs>

## Prepare Your Template Contract

For this tutorial, we'll use a simple "Hello World" contract as our template. Here's a minimal example:

```rust
use near_sdk::near_bindgen;
use near_sdk::{env, AccountId, PanicOnDefault};

#[near_bindgen]
#[derive(PanicOnDefault)]
pub struct HelloWorld {
    pub beneficiary: AccountId,
}

#[near_bindgen]
impl HelloWorld {
    #[init]
    pub fn new(beneficiary: AccountId) -> Self {
        Self { beneficiary }
    }
    
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }
    
    pub fn say_hello(&self) -> String {
        format!("Hello from {}", env::current_account_id())
    }
}
```

Build this contract:

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Upload Contract Template

Now we need to upload our template contract to the factory. This requires converting the WASM file to base64:

<Tabs>
  <TabItem value="bash" label="Bash" default>

```bash
# Convert contract to base64
export TEMPLATE_BYTES=$(cat target/wasm32-unknown-unknown/release/hello_world.wasm | base64 -w 0)

# Upload to factory
near call my-factory.testnet update_stored_contract "$TEMPLATE_BYTES" \
  --base64 --accountId my-factory.testnet \
  --gas 300000000000000 --networkId testnet
```

  </TabItem>
  <TabItem value="script" label="Upload Script">

Create an `upload_template.sh` script:

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"
TEMPLATE_PATH="target/wasm32-unknown-unknown/release/hello_world.wasm"

# Convert to base64
TEMPLATE_BYTES=$(cat $TEMPLATE_PATH | base64 -w 0)

# Upload template
near call $FACTORY_ACCOUNT update_stored_contract "$TEMPLATE_BYTES" \
  --base64 --accountId $FACTORY_ACCOUNT \
  --gas 300000000000000 --networkId testnet

echo "Template contract uploaded successfully!"
```

  </TabItem>
</Tabs>

## Verify Deployment

Let's verify that our factory is deployed and ready:

```bash
# Check factory state (should show stored contract size)
near view my-factory.testnet get_info --networkId testnet
```

## Understanding the Costs

When uploading contract templates, consider these costs:

**Storage Costs:**
- Each byte of stored WASM code costs storage
- Larger contracts require more NEAR tokens locked for storage
- Storage costs are paid by the factory account

**Gas Costs:**
- Uploading large contracts consumes significant gas
- Use `--gas 300000000000000` (300 TGas) for safety
- Failed uploads still consume gas

**Deployment Costs (for later steps):**
- Creating sub-accounts: ~0.1 NEAR minimum
- Contract deployment: Gas + storage for the new account
- Initialization calls: Additional gas costs

## Common Issues

**"Smart contract panicked: The contract is not initialized"**
- Make sure you called the `new` method during deployment
- Verify the initialization parameters are correct

**"Exceeded the prepaid gas"**
- Increase gas limit for large contract uploads
- Try with `--gas 300000000000000`

**"Not enough balance"**
- Ensure your factory account has enough NEAR for storage costs
- Add more funds if needed

## Next Steps

With your factory deployed and template uploaded, you're ready to [create your first contract instances](3-create-instances.md)!