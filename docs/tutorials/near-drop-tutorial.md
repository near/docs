---
id: randomness-patterns-workshop
title: "Randomness in Action: From Theory to Implementation"
description: "Explore randomness generation patterns in NEAR smart contracts through interactive examples, debugging techniques, and scalable architectures."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Building applications that require unpredictable outcomes presents fascinating challenges in blockchain development. Let's dive into practical randomness implementation using NEAR Protocol, exploring everything from basic concepts to sophisticated patterns through our coin flip demonstration.

![img](/docs/assets/examples/coin-flip.png)

---

## Understanding Randomness in Decentralized Systems

When we think about randomness in traditional software, we typically reach for language-built functions like `Math.random()` or system calls to `/dev/urandom`. Smart contracts operate in a completely different environment where these approaches simply don't work.

The core issue isn't technical complexityâ€”it's philosophical. How do you generate something unpredictable in a system designed to be completely predictable?

### The Consensus Dilemma

Every blockchain transaction must produce identical results across thousands of validators. If your smart contract generated different random numbers on different nodes, the network would fork. This fundamental requirement shapes every randomness solution in blockchain development.

Think of it like this: imagine trying to flip a coin in a room full of mirrors, where every reflection must show the exact same result. That's the challenge smart contract developers face.

---

## NEAR's Elegant Solution

NEAR Protocol provides randomness through a clever cryptographic approach that satisfies both requirements: unpredictability for users and determinism for validators.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="46" end="70" />
  </Language>
</CodeTabs>

The magic happens in `env::random_seed()`. This function doesn't actually generate randomnessâ€”it reveals randomness that was already baked into the blockchain through the block production process.

### Dissecting the Random Seed

NEAR constructs its random seed from several blockchain-native sources:

```rust
// Conceptual breakdown of random_seed() components
pub fn understand_random_seed() {
    let seed = env::random_seed();
    
    // This 32-byte array contains entropy from:
    // - Block producer's cryptographic signature
    // - Previous epoch's random value
    // - Current block height and timestamp
    // - Network-specific constants
    
    println!("Raw entropy: {:?}", seed);
    println!("As number: {}", u64::from_le_bytes([
        seed[0], seed[1], seed[2], seed[3],
        seed[4], seed[5], seed[6], seed[7]
    ]));
}
```

What makes this brilliant is timing: the randomness becomes available exactly when the block is produced, not before. Users can't predict it, but validators can all compute the same value.

---

## Practical Implementation Strategies

Let's explore different approaches to using NEAR's randomness, each suited for different scenarios.

### Simple Binary Decisions

The most straightforward pattern for yes/no, heads/tails, win/lose scenarios:

```rust
pub fn simple_coinflip(&self) -> bool {
    let entropy = env::random_seed();
    entropy[0] & 1 == 0  // Use bitwise AND for even/odd check
}

pub fn percentage_chance(&self, success_rate: u8) -> bool {
    require!(success_rate <= 100, "Invalid percentage");
    let entropy = env::random_seed();
    (entropy[0] % 100) < success_rate
}
```

### Range Selection with Even Distribution

When you need random numbers within specific ranges:

```rust
pub fn random_range(&self, min: u32, max: u32) -> u32 {
    require!(min < max, "Invalid range");
    
    let seed = env::random_seed();
    let random_u32 = u32::from_le_bytes([seed[0], seed[1], seed[2], seed[3]]);
    
    // Use modulo with range size
    let range_size = max - min;
    min + (random_u32 % range_size)
}

pub fn pick_from_list<T: Clone>(&self, items: &[T]) -> T {
    let index = self.random_range(0, items.len() as u32);
    items[index as usize].clone()
}
```

### Probability-Weighted Selection

For scenarios where different outcomes should have different likelihood:

```rust
pub fn weighted_selection(&self, weights: Vec<u32>) -> usize {
    let total_weight: u32 = weights.iter().sum();
    require!(total_weight > 0, "No valid weights provided");
    
    let random_point = self.random_range(0, total_weight);
    let mut cumulative_weight = 0;
    
    for (index, &weight) in weights.iter().enumerate() {
        cumulative_weight += weight;
        if random_point < cumulative_weight {
            return index;
        }
    }
    
    // Should never reach here with valid weights
    weights.len() - 1
}
```

---

## Debugging and Validation Techniques

Working with randomness creates unique debugging challenges. Here are patterns I've found essential:

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs"
            start="25" end="82" />
  </Language>
  <Language value="js" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="32" end="57" />
  </Language>
</CodeTabs>

### Entropy Visualization

Sometimes you need to see the randomness to understand it:

```rust
#[cfg(feature = "debug")]
pub fn analyze_entropy(&self, samples: u32) -> String {
    let mut results = Vec::new();
    
    for i in 0..samples {
        // Simulate different block contexts
        let mock_seed = self.mock_random_seed(i);
        results.push(mock_seed[0]);
    }
    
    let avg: f64 = results.iter().map(|&x| x as f64).sum::<f64>() / results.len() as f64;
    let min = *results.iter().min().unwrap();
    let max = *results.iter().max().unwrap();
    
    format!("Samples: {}, Average: {:.2}, Range: {}-{}", 
            samples, avg, min, max)
}
```

### Pattern Detection Tests

Critical for catching biased randomness:

```rust
#[test]
fn test_no_sequential_patterns() {
    let mut contract = Contract::new();
    let mut consecutive_same = 0;
    let mut max_consecutive = 0;
    let mut last_result = None;
    
    for _ in 0..1000 {
        let current = contract.simple_coinflip();
        
        if Some(current) == last_result {
            consecutive_same += 1;
            max_consecutive = max_consecutive.max(consecutive_same);
        } else {
            consecutive_same = 1;
        }
        
        last_result = Some(current);
    }
    
    // Shouldn't have more than 10 consecutive identical results
    assert!(max_consecutive <= 10, "Too many consecutive identical results: {}", max_consecutive);
}
```

---

## Scaling Randomness for Complex Applications

As your application grows, simple randomness patterns might not suffice. Here are architectural approaches for more sophisticated needs:

### Randomness Pools

Pre-generate and cache random values for high-frequency operations:

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct RandomnessPool {
    values: Vec<u8>,
    current_index: usize,
    refresh_block: u64,
}

impl Contract {
    pub fn init_randomness_pool(&mut self, pool_size: usize) {
        let seed = env::random_seed();
        let mut pool = Vec::with_capacity(pool_size);
        
        // Generate expanded pool using cryptographic hash
        for i in 0..pool_size {
            let input = [&seed[..], &i.to_le_bytes()].concat();
            let hash = env::sha256(&input);
            pool.push(hash[0]);
        }
        
        self.randomness_pool = Some(RandomnessPool {
            values: pool,
            current_index: 0,
            refresh_block: env::block_height(),
        });
    }
    
    pub fn consume_random(&mut self) -> u8 {
        let pool = self.randomness_pool.as_mut().expect("Pool not initialized");
        
        // Refresh pool if too old or exhausted
        if pool.current_index >= pool.values.len() || 
           env::block_height() > pool.refresh_block + 100 {
            self.init_randomness_pool(pool.values.len());
            pool = self.randomness_pool.as_mut().unwrap();
        }
        
        let value = pool.values[pool.current_index];
        pool.current_index += 1;
        value
    }
}
```

### State-Dependent Randomness

Incorporate game state or user history into randomness calculations:

```rust
pub fn contextual_random(&self, user: &AccountId, game_state: u64) -> u8 {
    let base_seed = env::random_seed();
    let user_hash = env::sha256(user.as_bytes());
    let state_bytes = game_state.to_le_bytes();
    
    // Combine multiple entropy sources
    let combined_input = [&base_seed[..], &user_hash[..], &state_bytes].concat();
    let final_hash = env::sha256(&combined_input);
    
    final_hash[0]
}
```

### Delayed Revelation Patterns

For situations where immediate randomness revelation could enable gaming:

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct DelayedReveal {
    commitment: Vec<u8>,
    reveal_block: u64,
    participants: Vec<AccountId>,
}

pub fn schedule_random_reveal(&mut self, delay_blocks: u64) -> u64 {
    let reveal_block = env::block_height() + delay_blocks;
    let commitment = env::sha256(&env::random_seed());
    
    let reveal_id = self.next_reveal_id;
    self.next_reveal_id += 1;
    
    self.delayed_reveals.insert(&reveal_id, &DelayedReveal {
        commitment,
        reveal_block,
        participants: vec![env::predecessor_account_id()],
    });
    
    reveal_id
}

pub fn execute_delayed_reveal(&mut self, reveal_id: u64) -> Vec<u8> {
    let reveal = self.delayed_reveals.get(&reveal_id).expect("Invalid reveal ID");
    require!(env::block_height() >= reveal.reveal_block, "Too early to reveal");
    
    // The randomness is now "fresh" and couldn't have been predicted
    // when the commitment was made
    let final_randomness = env::random_seed();
    self.delayed_reveals.remove(&reveal_id);
    
    final_randomness.to_vec()
}
```

---

## Edge Cases and Error Handling

Real-world randomness implementation must handle various edge cases gracefully:

### Randomness Exhaustion

```rust
pub fn safe_random_with_fallback(&self) -> Result<u8, &'static str> {
    let seed = env::random_seed();
    
    // Check for degenerate cases (shouldn't happen in practice)
    if seed.iter().all(|&x| x == 0) {
        return Err("Degenerate randomness detected");
    }
    
    // Use multiple bytes for redundancy
    let primary = seed[0];
    let secondary = seed[1];
    
    if primary == secondary {
        // Use XOR of multiple bytes as fallback
        Ok(seed[0] ^ seed[1] ^ seed[2] ^ seed[3])
    } else {
        Ok(primary)
    }
}
```

### Bias Prevention

```rust
pub fn unbiased_range(&self, min: u32, max: u32) -> u32 {
    let range = max - min;
    let max_valid = u32::MAX - (u32::MAX % range);
    
    let seed = env::random_seed();
    let mut candidate = u32::from_le_bytes([seed[0], seed[1], seed[2], seed[3]]);
    
    // Rejection sampling to prevent modulo bias
    let mut byte_index = 4;
    while candidate >= max_valid && byte_index < 32 {
        candidate = u32::from_le_bytes([
            seed[byte_index % 32], 
            seed[(byte_index + 1) % 32],
            seed[(byte_index + 2) % 32], 
            seed[(byte_index + 3) % 32]
        ]);
        byte_index += 4;
    }
    
    min + (candidate % range)
}
```

---

## Performance Optimization Patterns

Randomness operations can be surprisingly expensive if not optimized properly:

### Batch Operations

```rust
pub fn batch_random_generation(&self, count: u8) -> Vec<u8> {
    require!(count <= 32, "Cannot generate more than 32 values per call");
    
    let seed = env::random_seed();
    
    if count <= 32 {
        // Direct slice from seed
        seed[0..count as usize].to_vec()
    } else {
        // Expand using hash chain
        let mut results = Vec::with_capacity(count as usize);
        let mut current_hash = seed.to_vec();
        
        for _ in 0..count {
            current_hash = env::sha256(&current_hash).to_vec();
            results.push(current_hash[0]);
        }
        
        results
    }
}
```

### Lazy Evaluation

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct LazyRandom {
    seed: Option<Vec<u8>>,
    consumed_bytes: u8,
}

impl LazyRandom {
    pub fn new() -> Self {
        Self { seed: None, consumed_bytes: 0 }
    }
    
    pub fn next_byte(&mut self) -> u8 {
        if self.seed.is_none() {
            self.seed = Some(env::random_seed().to_vec());
        }
        
        let seed = self.seed.as_ref().unwrap();
        if self.consumed_bytes >= 32 {
            // Refresh seed using hash
            let new_seed = env::sha256(seed);
            self.seed = Some(new_seed.to_vec());
            self.consumed_bytes = 0;
        }
        
        let byte = self.seed.as_ref().unwrap()[self.consumed_bytes as usize];
        self.consumed_bytes += 1;
        byte
    }
}
```

---

## Integration with Game Mechanics

Let's see how these patterns come together in a real gaming scenario beyond simple coin flips:

### Multi-Stage Randomness

```rust
pub fn complex_game_round(&mut self, player_choice: String) -> GameResult {
    // Stage 1: Determine base outcome
    let base_random = env::random_seed()[0];
    let base_success = base_random % 100 < 60; // 60% base success rate
    
    // Stage 2: Apply player choice modifier
    let choice_bonus = match player_choice.as_str() {
        "aggressive" => if base_random % 3 == 0 { 15 } else { -5 },
        "defensive" => 5,
        "balanced" => 0,
        _ => panic!("Invalid choice"),
    };
    
    // Stage 3: Random bonus/penalty
    let bonus_random = env::random_seed()[1];
    let random_modifier = (bonus_random % 21) as i8 - 10; // -10 to +10
    
    let final_score = if base_success { 50 } else { 20 } + choice_bonus + random_modifier;
    
    GameResult {
        success: final_score > 40,
        score: final_score.max(0) as u32,
        bonus_applied: random_modifier,
    }
}
```

---

## Monitoring and Analytics

Track randomness quality in production:

```rust
#[derive(BorshSerialize, BorshDeserialize, Default)]
pub struct RandomnessStats {
    pub total_calls: u64,
    pub distribution: [u32; 256],
    pub last_reset: u64,
}

impl Contract {
    pub fn record_random_usage(&mut self, value: u8) {
        self.stats.total_calls += 1;
        self.stats.distribution[value as usize] += 1;
        
        // Reset stats monthly
        if env::block_height() > self.stats.last_reset + 2_628_000 { // ~30 days
            self.stats = RandomnessStats {
                last_reset: env::block_height(),
                ..Default::default()
            };
        }
    }
    
    pub fn get_randomness_health(&self) -> f64 {
        if self.stats.total_calls == 0 {
            return 1.0;
        }
        
        let expected_per_bucket = self.stats.total_calls as f64 / 256.0;
        let mut chi_square = 0.0;
        
        for &observed in &self.stats.distribution {
            let diff = observed as f64 - expected_per_bucket;
            chi_square += (diff * diff) / expected_per_bucket;
        }
        
        // Return health score (1.0 = perfect, 0.0 = terrible)
        1.0 / (1.0 + chi_square / 1000.0)
    }
}
```

---

## Wrapping Up: Randomness Best Practices

Working with randomness in smart contracts is both an art and a science. Through our exploration of the coin flip example and beyond, several key principles emerge:

**Start Simple**: NEAR's `env::random_seed()` handles most use cases elegantly. Don't over-engineer unless you have specific security requirements.

**Test Thoroughly**: Randomness bugs are subtle and often emerge only under load or over time. Build comprehensive test suites.

**Plan for Scale**: Consider how your randomness needs might evolve as your application grows in complexity and user base.

**Monitor in Production**: Track randomness quality and distribution patterns to catch issues early.

The beauty of blockchain randomness lies not in achieving perfect unpredictability, but in creating systems that are fair, auditable, and resistant to manipulation while remaining practical to use.

Remember: your users don't need to understand the cryptographic details, but they should be able to trust that your randomness is fair and unbiased.

:::note Development Setup

This tutorial works with:

- NEAR CLI: `4.0.13`
- Node.js: `18.19.1`
- Rust: `1.77.0`
- near-sdk: `4.1.0`

:::
