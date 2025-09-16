---
id: advanced-patterns
title: Advanced Randomness Patterns
sidebar_label: Advanced Patterns
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs"

Beyond simple coin flips, many applications need sophisticated randomness patterns. Here are production-ready implementations.

## Random Numbers in a Range

Generate random numbers within specific bounds:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```javascript
function randomInRange(min, max) {
  const seed = near.randomSeed();
  // Use 4 bytes for better distribution
  const value = new DataView(seed.buffer).getUint32(0, true);
  const range = max - min;
  return min + (value % range);
}

// Example: Roll a dice (1-6)
const diceRoll = randomInRange(1, 7);
```

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="85" end="92" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

  </TabItem>
</Tabs>

## Weighted Random Selection

For loot boxes or rarity systems:

<Github language="rust" start="94" end="110" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

Usage example:
```rust
// 70% common, 20% rare, 10% legendary
let weights = vec![70, 20, 10];
let selected_index = self.weighted_selection(weights);
```

## Avoiding Modulo Bias

For cryptographically fair distribution:

```rust
pub fn unbiased_range(&self, min: u32, max: u32) -> u32 {
    let range = max - min;
    let max_valid = u32::MAX - (u32::MAX % range);
    let seed = env::random_seed();
    
    let mut value = u32::from_le_bytes([
        seed[0], seed[1], seed[2], seed[3]
    ]);
    
    // Rejection sampling
    while value >= max_valid {
        // Use next 4 bytes
        value = u32::from_le_bytes([
            seed[4], seed[5], seed[6], seed[7]
        ]);
    }
    
    min + (value % range)
}
```

## Shuffling Arrays

For card games or random ordering:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```javascript
function shuffle(array) {
  const seed = near.randomSeed();
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = seed[i % 32] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
pub fn shuffle<T: Clone>(&self, mut items: Vec<T>) -> Vec<T> {
    let seed = env::random_seed();
    let len = items.len();
    
    for i in (1..len).rev() {
        let j = (seed[i % 32] as usize) % (i + 1);
        items.swap(i, j);
    }
    
    items
}
```

  </TabItem>
</Tabs>

## Generating Unique Random Values

When you need multiple different random values:

```javascript
function multipleRandomValues(count) {
  const seed = near.randomSeed();
  const values = [];
  
  for (let i = 0; i < count; i++) {
    // Mix seed with index for uniqueness
    const hash = near.sha256(
      new Uint8Array([...seed, i])
    );
    values.push(hash[0] % 100);
  }
  
  return values;
}
```

## Random with Commit-Reveal

For high-stakes randomness where users shouldn't know outcomes immediately:

```rust
#[near_bindgen]
impl Contract {
    pub fn commit_guess(&mut self, commitment: String) {
        let caller = env::predecessor_account_id();
        self.commitments.insert(&caller, &commitment);
    }
    
    pub fn reveal_and_play(&mut self, guess: String, nonce: String) -> bool {
        let caller = env::predecessor_account_id();
        let commitment = self.commitments.get(&caller).unwrap();
        
        // Verify commitment
        let hash = env::sha256(format!("{}{}", guess, nonce).as_bytes());
        assert_eq!(commitment, base64::encode(hash));
        
        // Now use randomness
        let outcome = self.simulate_coin_flip();
        guess == outcome
    }
}
```

## Monitoring Randomness Health

Track distribution for quality assurance:

<Github language="rust" start="112" end="130" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

Now let's [Deploy and interact](5-deployment.md) with your randomness-powered contract