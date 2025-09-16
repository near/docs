---
id: create-instances
title: Creating Contract Instances
sidebar_label: Create Instances
description: "Use your factory to deploy multiple contract instances to sub-accounts."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Now that your factory is deployed and has a contract template stored, let's create some contract instances!

## Understanding Instance Creation

When you call the factory's deployment method, it:

1. **Creates a new sub-account** under your factory
2. **Transfers the required deposit** for account creation and storage
3. **Deploys the stored contract** to the new sub-account
4. **Initializes the contract** with your specified parameters

The new contract becomes completely independent after creation.

## Create Your First Instance

Let's deploy our first contract instance:

<Tabs>
  <TabItem value="cli" label="NEAR CLI" default>

```bash
near call my-factory.testnet create_factory_subaccount_and_deploy \
  '{
    "name": "hello1", 
    "beneficiary": "alice.testnet"
  }' \
  --deposit 1.5 --accountId your-account.testnet \
  --gas 300000000000000 --networkId testnet
```

  </TabItem>
  <TabItem value="script" label="Deployment Script">

Create a `create_instance.sh` script:

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"
INSTANCE_NAME=$1
BENEFICIARY=$2

if [ -z "$INSTANCE_NAME" ] || [ -z "$BENEFICIARY" ]; then
    echo "Usage: ./create_instance.sh <instance_name> <beneficiary_account>"
    exit 1
fi

near call $FACTORY_ACCOUNT create_factory_subaccount_and_deploy \
  "{
    \"name\": \"$INSTANCE_NAME\", 
    \"beneficiary\": \"$BENEFICIARY\"
  }" \
  --deposit 1.5 --accountId $FACTORY_ACCOUNT \
  --gas 300000000000000 --networkId testnet

echo "Instance created: $INSTANCE_NAME.$FACTORY_ACCOUNT"
```

Usage: `./create_instance.sh hello1 alice.testnet`

  </TabItem>
</Tabs>

This creates a new contract at `hello1.my-factory.testnet` initialized with `alice.testnet` as the beneficiary.

## Verify Instance Creation

Let's confirm our instance was created and works correctly:

```bash
# Check the beneficiary
near view hello1.my-factory.testnet get_beneficiary --networkId testnet
# Expected output: alice.testnet

# Test the contract functionality
near view hello1.my-factory.testnet say_hello --networkId testnet
# Expected output: "Hello from hello1.my-factory.testnet"
```

## Create Multiple Instances

One of the factory pattern's main benefits is creating multiple instances easily:

```bash
# Create several instances with different beneficiaries
near call my-factory.testnet create_factory_subaccount_and_deploy \
  '{"name": "dao1", "beneficiary": "dao-member1.testnet"}' \
  --deposit 1.5 --accountId your-account.testnet \
  --gas 300000000000000 --networkId testnet

near call my-factory.testnet create_factory_subaccount_and_deploy \
  '{"name": "dao2", "beneficiary": "dao-member2.testnet"}' \
  --deposit 1.5 --accountId your-account.testnet \
  --gas 300000000000000 --networkId testnet

near call my-factory.testnet create_factory_subaccount_and_deploy \
  '{"name": "game1", "beneficiary": "game-admin.testnet"}' \
  --deposit 1.5 --accountId your-account.testnet \
  --gas 300000000000000 --networkId testnet
```

## Understanding Deposit Requirements

The `--deposit` parameter covers several costs:

**Account Creation:** ~0.1 NEAR minimum for new account creation

**Storage Costs:** Contract code storage on the new account (~0.1-1 NEAR depending on contract size)

**Initial Balance:** Remaining deposit becomes the new account's initial balance

**Recommended Deposits:**
- Small contracts (< 100KB): 1.0 NEAR
- Medium contracts (100-500KB): 1.5 NEAR  
- Large contracts (> 500KB): 2.0+ NEAR

## Batch Creation Script

For creating many instances, use a batch script:

<Tabs>
  <TabItem value="bash" label="Batch Script">

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"

# Array of instances to create
declare -a INSTANCES=(
  "instance1:alice.testnet"
  "instance2:bob.testnet"
  "instance3:charlie.testnet"
  "dao1:dao-admin.testnet"
  "game1:game-master.testnet"
)

for instance in "${INSTANCES[@]}"; do
  IFS=':' read -r name beneficiary <<< "$instance"
  
  echo "Creating instance: $name with beneficiary: $beneficiary"
  
  near call $FACTORY_ACCOUNT create_factory_subaccount_and_deploy \
    "{\"name\": \"$name\", \"beneficiary\": \"$beneficiary\"}" \
    --deposit 1.5 --accountId $FACTORY_ACCOUNT \
    --gas 300000000000000 --networkId testnet
    
  echo "Created: $name.$FACTORY_ACCOUNT"
  echo "---"
done

echo "All instances created successfully!"
```

  </TabItem>
  <TabItem value="verification" label="Verification Script">

```bash
#!/bin/bash
set -e

FACTORY_ACCOUNT="my-factory.testnet"

# Verify all instances
declare -a INSTANCES=("instance1" "instance2" "instance3" "dao1" "game1")

for name in "${INSTANCES[@]}"; do
  echo "Checking $name.$FACTORY_ACCOUNT:"
  
  # Check if account exists and get beneficiary
  near view $name.$FACTORY_ACCOUNT get_beneficiary --networkId testnet 2>/dev/null && \
    echo "✅ $name.$FACTORY_ACCOUNT is working" || \
    echo "❌ $name.$FACTORY_ACCOUNT failed"
  
  echo "---"
done
```

  </TabItem>
</Tabs>

## Monitoring Deployment

You can monitor your deployments by checking transaction receipts:

```bash
# Get recent transactions for your factory
near tx-status <transaction_hash> --accountId my-factory.testnet --networkId testnet
```

Or view them in [NEAR Explorer](https://testnet.nearblocks.io/) by searching for your factory account.

## Common Issues

**"Sub-account already exists"**
- Each sub-account name must be unique
- Try a different name or add numbers/timestamps

**"Not enough deposit"**
- Increase the `--deposit` amount
- Large contracts need more storage deposit

**"Exceeded the prepaid gas"**
- Use `--gas 300000000000000` for safety
- Contract deployment is gas-intensive

**"Account doesn't exist after creation"**
- Check the transaction receipt for errors
- Verify the factory has enough balance for deposits

## Instance Independence

Remember that once created, instances are completely independent:

- They have their own balance and storage
- The factory cannot control them after creation
- They can be updated independently of the factory
- Each instance can have different owners/admins

Ready to learn how to update your factory's contract template? Continue to [updating stored contracts](4-update-contract.md).