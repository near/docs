---
id: testing
title: Deploy and Test Your Contract
sidebar_label: Deploy and Test
Description: Learn how to deploy and test your smart contract
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Now that we have a complete donation contract, let's deploy it to NEAR testnet and test all functionality through the command line.

## Create a NEAR Account

First, you need a NEAR testnet account to deploy the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Near CLI (legacy)">

```bash
# Create account with funding from faucet
near create-account your-contract.testnet --useFaucet

# Login to your account  
near login
```

  </TabItem>
  <TabItem value="full" label="Near CLI (new)">

```bash
# Create a new account pre-funded by faucet
near account create-account sponsor-by-faucet-service \
  your-contract.testnet autogenerate-new-keypair \
  save-to-keychain network-config testnet create
```

  </TabItem>
</Tabs>

## Deploy the Contract

<Tabs>
  <TabItem value="rust" label="Rust">

```bash
# Build the contract
cargo near build

# Deploy with initialization
near deploy your-contract.testnet \
  --wasmFile target/near/contract.wasm \
  --initFunction init \
  --initArgs '{"beneficiary": "beneficiary.testnet"}'
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```bash
# Build the contract
npm run build

# Deploy the WASM file
near deploy your-contract.testnet ./build/donation.wasm

# Initialize the contract
near call your-contract.testnet init \
  '{"beneficiary": "beneficiary.testnet"}' \
  --accountId your-contract.testnet
```

  </TabItem>
</Tabs>

## Test View Methods

Start by testing the read-only methods to verify deployment:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Near CLI (legacy)">

```bash
# Check the beneficiary
near view your-contract.testnet get_beneficiary

# Check number of donors (should be 0)
near view your-contract.testnet number_of_donors

# Check donations list (should be empty)
near view your-contract.testnet get_donations \
  '{"from_index": 0, "limit": 10}'
```

  </TabItem>
  <TabItem value="full" label="Near CLI (new)">

```bash
# Check beneficiary
near contract call-function as-read-only \
  your-contract.testnet get_beneficiary json-args '{}' \
  network-config testnet now

# Check number of donors
near contract call-function as-read-only \
  your-contract.testnet number_of_donors json-args '{}' \
  network-config testnet now
```

  </TabItem>
</Tabs>

## Test Donations

Now let's test the donation functionality:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Near CLI (legacy)">

```bash
# Make a donation
near call your-contract.testnet donate \
  --accountId donor.testnet \
  --deposit 1

# Check your donation was recorded
near view your-contract.testnet get_donation_for_account \
  '{"account_id": "donor.testnet"}'

# Verify donor count increased
near view your-contract.testnet number_of_donors
```

  </TabItem>
  <TabItem value="full" label="Near CLI (new)">

```bash
# Make a donation
near contract call-function as-transaction \
  your-contract.testnet donate json-args '{}' \
  prepaid-gas '30.0 Tgas' attached-deposit '1 NEAR' \
  sign-as donor.testnet network-config testnet \
  sign-with-keychain send

# Check donation was recorded
near contract call-function as-read-only \
  your-contract.testnet get_donation_for_account \
  json-args '{"account_id": "donor.testnet"}' \
  network-config testnet now
```

  </TabItem>
</Tabs>

## Test Multiple Donations

Test the storage cost logic with multiple donations:

```bash
# First donation (pays storage cost)
near call your-contract.testnet donate \
  --accountId alice.testnet --deposit 0.1

# Second donation from same account (no storage cost)  
near call your-contract.testnet donate \
  --accountId alice.testnet --deposit 0.2

# Different donor
near call your-contract.testnet donate \
  --accountId bob.testnet --deposit 0.5

# Check total donors
near view your-contract.testnet number_of_donors

# Get paginated donations
near view your-contract.testnet get_donations \
  '{"from_index": 0, "limit": 10}'
```

## Verify Fund Transfer

Check that donations were forwarded to the beneficiary:

```bash
# Get beneficiary balance before
near state beneficiary.testnet

# Make donation
near call your-contract.testnet donate \
  --accountId test.testnet --deposit 1

# Check beneficiary balance after (should increase by ~0.999 NEAR)
near state beneficiary.testnet
```

:::tip
The beneficiary receives slightly less than the donation amount due to the storage cost deduction for first-time donors.
:::

## Test Error Cases

Verify error handling works correctly:

```bash
# Try donating too little to cover storage
near call your-contract.testnet donate \
  --accountId new-donor.testnet --deposit 0.0001
# Should fail with storage cost error

# Try unauthorized beneficiary change
near call your-contract.testnet change_beneficiary \
  '{"new_beneficiary": "hacker.testnet"}' \
  --accountId not-owner.testnet
# Should fail with access error
```

## Monitor Contract Activity

Track your contract's activity through NEAR explorers:

- **Testnet Explorer**: https://testnet.nearblocks.io/address/your-contract.testnet
- **NEAR Explorer**: https://explorer.testnet.near.org/accounts/your-contract.testnet

Look for:
- Donation transactions
- Transfer calls to beneficiary
- Contract method calls
- Token flow

## Performance Testing

For production contracts, test with larger datasets:

```bash
# Create many donations to test pagination
for i in {1..20}; do
  near call your-contract.testnet donate \
    --accountId "test-$i.testnet" --deposit 0.1
done

# Test pagination limits
near view your-contract.testnet get_donations \
  '{"from_index": 0, "limit": 5}'

near view your-contract.testnet get_donations \
  '{"from_index": 5, "limit": 5}'
```

## Debugging Tips

If transactions fail:

1. **Check gas limits**: Complex operations may need more gas
2. **Verify deposits**: Ensure sufficient NEAR for storage costs  
3. **Review logs**: Use `near tx-status TRANSACTION_HASH` to see detailed logs
4. **Test locally first**: Use unit tests before testnet deployment

## Contract Upgrade

When you need to update your contract:

```bash
# Deploy new version (keeps state)
near deploy your-contract.testnet new-contract.wasm

# Or redeploy with state reset
near delete your-contract.testnet beneficiary.testnet
# Then redeploy fresh
```

Continue to [Build Frontend](5-frontend.md) to learn how to create a web interface for your donation contract.