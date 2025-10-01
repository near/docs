---
id: testing-randomness
title: Testing On-Chain Randomness
sidebar_label: Testing Randomness
description: Learn how to Test you Coin Flip Contract and understand practically how On-Chain Randomness works
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Testing randomness requires special attention to ensure fair distribution and proper behavior.

## Setting Up Tests

<Tabs>
  <TabItem value="js" label="JavaScript (AVA)" default>

<Github language="javascript" start="1" end="22" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js" />

  </TabItem>
  <TabItem value="rust" label="Rust" >

<Github language="rust" start="1" end="22" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs" />

  </TabItem>
</Tabs>

## Testing Initial State

Verify players start with zero points:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="31" end="35" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="24" end="38" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs" />

  </TabItem>
</Tabs>

## Testing Randomness Distribution

Verify both outcomes occur with reasonable frequency:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="37" end="56" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="40" end="78" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs" />

  </TabItem>
</Tabs>

## Running Tests

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
# Run all tests
npm test

# Run with verbose output
npm test -- --verbose

# Run specific test file
npm test sandbox-test/main.ava.js
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
# Run all tests
cargo test

# Run with output
cargo test -- --nocapture

# Run specific test
cargo test test_points_are_correctly_computed
```

  </TabItem>
</Tabs>

## Test Best Practices

### 1. Test Edge Cases
```javascript
test('handles minimum points correctly', async (t) => {
  // Ensure points don't go below 0
  const points = await contract.view('points_of', { 
    player: account.accountId 
  });
  t.true(points >= 0);
});
```

### 2. Mock Randomness for Unit Tests
For deterministic testing, consider mocking:
```rust
#[cfg(test)]
fn mock_random_seed() -> [u8; 32] {
    [42; 32] // Fixed seed for testing
}
```

### 3. Integration Testing
Test the full flow with multiple accounts:

```javascript
test('multiple players maintain separate scores', async (t) => {
  const { root, contract } = t.context.accounts;
  const alice = await root.createSubAccount('alice');
  
  // Play as root
  await root.call(contract, 'flip_coin', { player_guess: 'heads' });
  
  // Play as alice
  await alice.call(contract, 'flip_coin', { player_guess: 'tails' });
  
  // Check separate scores
  const rootPoints = await contract.view('points_of', { player: root.accountId });
  const alicePoints = await contract.view('points_of', { player: alice.accountId });
  
  t.not(rootPoints, alicePoints); // Different players, different scores
});
```

With tests confirming our randomness works correctly, let's explore [advanced patterns](4-advanced-patterns.md) for more complex use cases.