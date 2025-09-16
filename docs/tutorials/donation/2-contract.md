---
id: contract
title: Handling Token Donations
sidebar_label: Handle Donations
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from '@site/src/components/codetabs';

Now we'll implement the core donation functionality. This involves creating payable methods that can receive NEAR tokens, managing storage costs, and automatically forwarding funds to the beneficiary.

## Understanding Storage Costs

NEAR charges for data storage in smart contracts. Each new donor entry requires storage, so we need to account for this cost in our donation logic.

<Tabs>
  <TabItem value="rust" label="Rust" default>

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="5" end="5" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="model.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/model.ts"
        start="1" end="1" />

  </TabItem>
</Tabs>

:::tip
Storage costs are one-time fees paid when first storing data. Subsequent updates to existing data don't require additional storage fees.
:::

## The Donation Method

The `donate` method is the heart of our contract. It must be marked as `payable` to accept NEAR tokens, handle storage costs, track donations, and forward funds.

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="donation.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
        start="12" end="54" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="contract.ts"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
        start="16" end="44" />

  </TabItem>
</Tabs>

## Key Concepts Explained

**Payable Functions**: The `#[payable]` decorator (Rust) or `payableFunction: true` (TypeScript) allows methods to receive NEAR tokens.

**Storage Management**: We charge new donors a storage fee but not returning donors, since their data already exists.

**Promise Transfers**: We use `Promise::new().transfer()` in Rust or `promiseBatchCreate` + `promiseBatchActionTransfer` in TypeScript to send tokens to the beneficiary.

**Deposit Handling**: `env::attached_deposit()` (Rust) or `near.attachedDeposit()` (TypeScript) gets the amount of NEAR sent with the transaction.

## Testing the Donation Logic

Let's examine how the donation handling is tested to understand the expected behavior.

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="lib.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
        start="49" end="85" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="main.ava.js"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
        start="33" end="48" />

  </TabItem>
</Tabs>

## Advanced Testing with Workspaces

For integration testing, both implementations use NEAR Workspaces to simulate real blockchain interactions:

<Tabs>
  <TabItem value="rust" label="Rust">

<Github fname="workspaces.rs"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/tests/workspaces.rs"
        start="20" end="45" />

  </TabItem>
  <TabItem value="ts" label="TypeScript">

<Github fname="main.ava.js"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
        start="49" end="60" />

  </TabItem>
</Tabs>

## Running Tests

Test your donation logic to ensure everything works correctly:

<Tabs>
  <TabItem value="rust" label="Rust">

```bash
# Unit tests
cargo test

# Integration tests with workspaces
cargo test --test workspaces
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```bash
# Build and test
npm run build
npm run test
```

  </TabItem>
</Tabs>

## Key Takeaways

- **Payable methods** can receive NEAR tokens with transactions
- **Storage costs** must be handled for new data entries
- **Promise transfers** allow contracts to send tokens to other accounts
- **Testing** verifies both donation recording and fund forwarding work correctly

Continue to [Query Donation Data](3-queries.md) to learn about implementing view methods for retrieving donation information.