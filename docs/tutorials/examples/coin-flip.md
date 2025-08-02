---
id: coin-flip
title: "On-Chain Randomness in NEAR Smart Contracts"
description: "Learn to implement secure randomness in NEAR contracts, including trade-offs and testing strategies."
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

## 🎲 Why Blockchain Randomness is Hard
Unlike traditional apps, smart contracts need **deterministic execution** - meaning every node must get identical results. This makes true randomness impossible. NEAR provides two practical approaches:

1. **Blockhash Randomness** (for basic use cases)
2. **Oracle-Based Randomness** (for high-value applications)

---

## 📦 Implementing Blockhash Randomness
NEAR's runtime provides limited randomness via `env::random_seed()`:

```rust
```rust
#[near_bindgen]
impl CoinFlip {
    #[payable]
    pub fn flip_coin(&mut self, guess: bool) -> bool {
        // Get 32-byte random seed from block producer
        let random_seed = env::random_seed();
        
        // Convert first byte to 0-255 number
        let random_byte = random_seed[0] as u8;
        
        // 50% probability (better for testing than production)
        let outcome = random_byte < 128;
        
        outcome == guess
    }
}
```
