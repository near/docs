---
id: queries
title: Querying Donation Data
sidebar_label: Query Donation Data
description: Learn how to query your Donation Contracts for various datas
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from '@site/src/components/codetabs';

Now that we can accept donations, we need ways to query the data. View methods allow anyone to read contract state without paying gas fees, making them perfect for displaying donation information.

## Individual Donation Queries

First, let's implement a method to get donation information for a specific account:

<Tabs>
  <TabItem value="rust" label="Rust" default>

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="56" end="67" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="contract.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
        start="59" end="66" />

  </TabItem>
</Tabs>

## Donation Data Structure

The methods return structured data that's easy for frontends to consume:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="7" end="11" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="model.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/model.ts"
        start="3" end="12" />

  </TabItem>
</Tabs>

## Counting Donors

A simple method to get the total number of unique donors:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="69" end="72" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="contract.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
        start="52" end="53" />

  </TabItem>
</Tabs>

## Paginated Donation Lists

For displaying all donations, we need pagination to handle large datasets efficiently:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="74" end="89" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="contract.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
        start="55" end="66" />

  </TabItem>
</Tabs>

## Beneficiary Management

Remember the beneficiary methods from our setup? They're view methods too:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="lib.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
        start="21" end="28" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="contract.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
        start="49" end="54" />

  </TabItem>
</Tabs>

## Testing Query Methods

Let's verify our query methods work correctly in the integration tests:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="workspaces.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/tests/workspaces.rs"
        start="47" end="75" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="main.ava.js"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
        start="62" end="72" />

  </TabItem>
</Tabs>

## Using View Methods via CLI

Once deployed, you can query your contract using NEAR CLI:

```bash
# Get beneficiary
near view donation.near-examples.testnet get_beneficiary

# Get number of donors
near view donation.near-examples.testnet number_of_donors

# Get donations with pagination
near view donation.near-examples.testnet get_donations \
  '{"from_index": 0, "limit": 10}'

# Get specific donation
near view donation.near-examples.testnet get_donation_for_account \
  '{"account_id": "alice.testnet"}'
```

## Key Concepts

**View Methods**: Functions marked with `#[view]` (Rust) or `@view({})` (TypeScript) are read-only and don't cost gas to call.

**Pagination**: Large datasets should be paginated to avoid hitting gas limits and provide better user experience.

**Data Serialization**: NEAR automatically serializes return values to JSON, making them easy to consume from frontends.

**Public Access**: View methods can be called by anyone, even accounts without NEAR tokens.

## Query Performance Tips

1. **Use pagination** for methods that could return large datasets
2. **Consider caching** frequently accessed data in your frontend
3. **Batch queries** when possible to reduce RPC calls
4. **Index important data** for efficient lookups

## Error Handling

View methods can still fail if they access non-existent data or exceed computation limits:

```rust
// Always handle missing data gracefully
let donated_amount = self
    .donations
    .get(&account_id)
    .cloned()
    .unwrap_or(NearToken::from_near(0)); // Default to 0 if not found
```

Continue to [Deploy and Test](4-testing.md) to learn how to deploy your contract and test it on NEAR testnet.