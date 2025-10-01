---
id: randomness-basics
title: Understanding On-Chain Randomness
sidebar_label: Randomness Fundamentals
description: Understand the basics of On-Chain Randomness and why this approach works
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Before diving into code, let's understand why traditional randomness approaches fail on blockchains and how NEAR solves this problem.

## Why Traditional Methods Don't Work

<Tabs>
  <TabItem value="bad" label="❌ What NOT to do" default>

```javascript
// Using timestamp - Predictable and manipulable
const outcome = Date.now() % 2 ? 'heads' : 'tails';

// Using block data - Miners can influence
const result = block.timestamp % 100;

// Using previous transaction - Public and predictable  
const random = previousTx.hash % 6 + 1;
```

  </TabItem>
  
  <TabItem value="problem" label="The Problem">
```plain
These methods fail because:
- **Timestamps** are predictable and can be slightly manipulated by block producers
- **Block hashes** are known before user transactions are included
- **Transaction data** is public before execution
- **External input** breaks consensus as nodes can't agree
```
  </TabItem>
</Tabs>

## NEAR's VRF Solution

NEAR uses a Verifiable Random Function (VRF) that provides:

<Github language="rust" start="14" end="21" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

The random seed is:
- **Unpredictable**: Cannot be known before the block is produced
- **Verifiable**: Can be cryptographically verified as authentic
- **Consistent**: Same for all transactions in a block

## Accessing Randomness in Your Contract

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="6" end="12" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="13" end="22" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

  </TabItem>
</Tabs>

## Important Limitations

### Block-Level Consistency
All calls to `random_seed()` within the same block return the same value:

```javascript
// Both calls return the same seed if in the same block
const seed1 = near.randomSeed();
const seed2 = near.randomSeed(); 
// seed1 === seed2
```

### Generating Multiple Values
To get different random values in one transaction, combine the seed with unique data:

```javascript
// To get different random values in one transaction
function multipleRandomValues(count) {
  const seed = near.randomSeed();
  const values = [];
  
  for (let i = 0; i < count; i++) {
    // Mix seed with index for uniqueness
    const mixed = new Uint8Array([...seed, i]);
    values.push(mixed[0] % 100);
  }
  
  return values;
}
```

### Security Considerations

:::warning
NEAR's randomness is suitable for:
- ✅ Games and lotteries
- ✅ NFT trait generation
- ✅ Random selection processes

But NOT for:
- ❌ Cryptographic key generation
- ❌ Security-critical random values
- ❌ High-value financial applications without additional safeguards
:::

Now that you understand the fundamentals, let's [build a coin flip](2-basic-contract.md) contract that properly uses NEAR's randomness.