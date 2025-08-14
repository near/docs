---
id: secure-randomness-guide
title: "Building with Randomness: A Practical Guide"
description: "Master on-chain randomness implementation in NEAR Protocol through hands-on examples, common pitfalls, and production-ready patterns."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Creating unpredictable outcomes in smart contracts is one of the most challenging aspects of blockchain development. This comprehensive guide walks you through implementing robust randomness solutions using NEAR Protocol, illustrated through a practical coin flip gambling contract.

![img](/docs/assets/examples/coin-flip.png)

---

## Why Randomness is Hard on Blockchains

Traditional applications can rely on operating system entropy, hardware random number generators, or external APIs for randomness. Smart contracts face a unique constraint: **deterministic execution**. Every node must produce identical results when processing the same transaction.

This deterministic requirement creates several challenges:
- No access to system entropy sources
- Miners/validators can influence block-level data
- Transaction ordering affects outcomes
- Replay attacks become possible

---

## NEAR's Entropy Generation

NEAR solves the randomness dilemma through its built-in `random_seed` function. This mechanism leverages cryptographic properties of the blockchain itself to generate pseudo-random values that are both deterministic and practically unpredictable.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="46" end="70" />
  </Language>
  <Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
</CodeTabs>

### Under the Hood

NEAR's random seed is constructed from:
1. **Block producer signature** - Cryptographic signature of the block
2. **Previous block hash** - Creates dependency on blockchain history  
3. **Epoch information** - Adds temporal variance
4. **Gas usage patterns** - Incorporates transaction execution context

The result is a 32-byte array that appears random but remains reproducible across all validators.

---

## Production Implementation Patterns

### Basic Random Number Generation

```rust
use near_sdk::env;

impl Contract {
    pub fn generate_random_u8(&self) -> u8 {
        let seed = env::random_seed();
        seed[0]
    }
    
    pub fn random_in_range(&self, min: u32, max: u32) -> u32 {
        let seed = env::random_seed();
        let random_u32 = u32::from_le_bytes([seed[0], seed[1], seed[2], seed[3]]);
        min + (random_u32 % (max - min + 1))
    }
}
```

### Weighted Random Selection

```rust
pub fn weighted_random(&self, weights: Vec<u32>) -> usize {
    let total_weight: u32 = weights.iter().sum();
    let random_value = self.random_in_range(0, total_weight - 1);
    
    let mut cumulative = 0;
    for (index, weight) in weights.iter().enumerate() {
        cumulative += weight;
        if random_value < cumulative {
            return index;
        }
    }
    weights.len() - 1  // Fallback
}
```

---

## Attack Vectors and Mitigation

### Block Producer Manipulation

**Risk**: Validators can potentially influence randomness by controlling block timing or transaction inclusion.

**Mitigation Strategy**:
```rust
pub fn delayed_random_reveal(&mut self, commitment_block: u64) {
    // Only allow reveals after sufficient blocks have passed
    let current_block = env::block_height();
    require!(current_block >= commitment_block + 10, "Too early to reveal");
    
    // Use future block hash for additional entropy
    let delayed_seed = env::random_seed();
    self.process_random_outcome(delayed_seed);
}
```

### Front-Running Protection

**Implementation**:
```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct PendingBet {
    player: AccountId,
    commitment: Vec<u8>,
    block_height: u64,
}

pub fn commit_bet(&mut self, commitment_hash: Base58CryptoHash) {
    let pending = PendingBet {
        player: env::predecessor_account_id(),
        commitment: commitment_hash.into(),
        block_height: env::block_height(),
    };
    
    self.pending_bets.insert(&env::predecessor_account_id(), &pending);
}

pub fn reveal_bet(&mut self, guess: String, nonce: u64) -> String {
    let account = env::predecessor_account_id();
    let pending = self.pending_bets.get(&account).expect("No pending bet");
    
    // Verify commitment
    let guess_hash = env::sha256(format!("{}{}", guess, nonce).as_bytes());
    require!(guess_hash == pending.commitment, "Invalid commitment");
    
    // Ensure enough blocks have passed
    require!(env::block_height() > pending.block_height + 3, "Reveal too early");
    
    self.execute_flip(guess)
}
```

---

## Comprehensive Testing Framework

Testing randomness requires sophisticated approaches beyond simple unit tests:

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

### Statistical Validation

```rust
#[cfg(test)]
mod randomness_tests {
    use super::*;
    
    #[test]
    fn test_distribution_uniformity() {
        let contract = Contract::new();
        let mut frequency = [0; 256];
        
        // Generate large sample size
        for _ in 0..10000 {
            let random_byte = contract.generate_random_u8();
            frequency[random_byte as usize] += 1;
        }
        
        // Chi-square test for uniformity
        let expected = 10000.0 / 256.0;
        let chi_square: f64 = frequency.iter()
            .map(|&observed| {
                let diff = observed as f64 - expected;
                (diff * diff) / expected
            })
            .sum();
        
        // Critical value at 0.05 significance level with 255 degrees of freedom â‰ˆ 293.2
        assert!(chi_square < 300.0, "Distribution not uniform enough");
    }
    
    #[test]
    fn test_entropy_across_blocks() {
        // Simulate different block contexts
        let mut unique_values = std::collections::HashSet::new();
        
        for block in 0..1000 {
            // Mock different block heights
            testing_env!(VMContextBuilder::new().block_index(block).build());
            
            let random_val = Contract::new().generate_random_u8();
            unique_values.insert(random_val);
        }
        
        // Should have reasonable diversity
        assert!(unique_values.len() > 200, "Insufficient entropy across blocks");
    }
}
```

---

## Advanced Randomness Architectures

### Oracle Integration Pattern

For applications requiring cryptographically secure randomness:

```rust
#[ext_contract(ext_randomness_oracle)]
trait RandomnessOracle {
    fn request_randomness(&mut self, callback_gas: Gas) -> Promise;
}

impl Contract {
    #[payable]
    pub fn request_secure_flip(&mut self, guess: String) -> Promise {
        let oracle_account: AccountId = "randomness.oracle.near".parse().unwrap();
        
        ext_randomness_oracle::request_randomness(
            oracle_account,
            env::attached_deposit(),
            Gas(50_000_000_000_000)
        )
        .then(ext_self::handle_oracle_response(
            guess,
            env::predecessor_account_id(),
            env::current_account_id(),
            0,
            Gas(50_000_000_000_000)
        ))
    }
    
    pub fn handle_oracle_response(
        &mut self, 
        guess: String, 
        player: AccountId,
        #[callback_result] oracle_result: Result<Vec<u8>, PromiseError>
    ) -> String {
        match oracle_result {
            Ok(random_bytes) => {
                let outcome = if random_bytes[0] % 2 == 0 { "heads" } else { "tails" };
                self.process_game_result(&player, &guess, &outcome)
            },
            Err(_) => {
                // Fallback to NEAR's randomness
                self.flip_coin_internal(guess)
            }
        }
    }
}
```

### Multi-Signature Randomness

Combine multiple entropy sources for enhanced security:

```rust
pub struct MultiSourceRandom {
    pub near_seed: Vec<u8>,
    pub user_entropy: Vec<u8>,
    pub oracle_data: Option<Vec<u8>>,
    pub timestamp_salt: u64,
}

impl Contract {
    pub fn multi_source_flip(&mut self, user_entropy: String, guess: String) -> String {
        let sources = MultiSourceRandom {
            near_seed: env::random_seed().to_vec(),
            user_entropy: user_entropy.into_bytes(),
            oracle_data: self.latest_oracle_randomness.clone(),
            timestamp_salt: env::block_timestamp(),
        };
        
        let combined_entropy = self.combine_entropy_sources(sources);
        let result_byte = env::sha256(&combined_entropy)[0];
        
        let outcome = if result_byte % 2 == 0 { "heads" } else { "tails" };
        self.process_game_result(&env::predecessor_account_id(), &guess, &outcome)
    }
    
    fn combine_entropy_sources(&self, sources: MultiSourceRandom) -> Vec<u8> {
        let mut combined = Vec::new();
        combined.extend_from_slice(&sources.near_seed);
        combined.extend_from_slice(&sources.user_entropy);
        
        if let Some(oracle) = sources.oracle_data {
            combined.extend_from_slice(&oracle);
        }
        
        combined.extend_from_slice(&sources.timestamp_salt.to_le_bytes());
        combined
    }
}
```

---

## Performance Considerations

### Gas Optimization

```rust
// Efficient: Use single random_seed() call
pub fn batch_random_generation(&self, count: u8) -> Vec<u8> {
    let seed = env::random_seed();
    (0..count).map(|i| seed[i as usize % 32]).collect()
}

// Inefficient: Multiple random_seed() calls
pub fn inefficient_batch(&self, count: u8) -> Vec<u8> {
    (0..count).map(|_| env::random_seed()[0]).collect()  // Don't do this!
}
```

### Storage Patterns

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct GameState {
    pub entropy_cache: Vec<u8>,        // Cache for multiple operations
    pub last_refresh_block: u64,       // Track cache freshness
    pub pending_reveals: UnorderedMap<AccountId, PendingReveal>,
}

impl Contract {
    pub fn refresh_entropy_cache(&mut self) {
        let current_block = env::block_height();
        if current_block > self.state.last_refresh_block + 10 {
            self.state.entropy_cache = env::random_seed().to_vec();
            self.state.last_refresh_block = current_block;
        }
    }
}
```

---

## Real-World Application Guidelines

### Risk Assessment Matrix

| Application Type | Randomness Requirements | Recommended Approach |
|-----------------|------------------------|---------------------|
| Casual Games | Medium entropy, fast | NEAR `random_seed()` |
| Gambling/DeFi | High security | Commit-reveal + Oracle |
| NFT Generation | Deterministic uniqueness | Seed + Token ID hash |
| Consensus Mechanisms | Maximum security | Multi-party + VRF |

### Implementation Checklist

âœ… **Security**
- [ ] Implement commit-reveal for high-value operations
- [ ] Add front-running protection
- [ ] Consider validator manipulation risks
- [ ] Plan for emergency randomness fallbacks

âœ… **Testing**
- [ ] Statistical distribution tests
- [ ] Cross-block entropy validation
- [ ] Edge case handling
- [ ] Gas usage optimization

âœ… **User Experience**
- [ ] Clear randomness disclaimers
- [ ] Appropriate waiting periods
- [ ] Failure handling and refunds
- [ ] Transparent outcome verification

---

## Common Pitfalls and Solutions

### Pitfall: Predictable Patterns

```rust
// Bad: Predictable based on block height
pub fn bad_random(&self) -> u8 {
    (env::block_height() % 256) as u8  // Don't do this!
}

// Good: Use cryptographic randomness
pub fn good_random(&self) -> u8 {
    env::random_seed()[0]
}
```

### Pitfall: Insufficient Entropy

```rust
// Bad: Limited entropy range  
pub fn limited_entropy(&self) -> bool {
    env::block_timestamp() % 2 == 0  // Predictable!
}

// Good: Full cryptographic entropy
pub fn full_entropy(&self) -> bool {
    env::random_seed()[0] % 2 == 0
}
```

---

## Migration and Upgrade Strategies

When upgrading randomness implementations:

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub enum RandomnessVersion {
    V1Basic,
    V2CommitReveal,
    V3OracleIntegrated,
}

impl Contract {
    pub fn migrate_randomness_version(&mut self, new_version: RandomnessVersion) {
        // Ensure no pending operations
        require!(self.pending_operations.is_empty(), "Complete pending operations first");
        
        self.randomness_version = new_version;
        
        match new_version {
            RandomnessVersion::V3OracleIntegrated => {
                self.initialize_oracle_integration();
            },
            _ => {}
        }
    }
}
```

---

## Conclusion

Effective randomness in smart contracts requires careful consideration of security, performance, and user experience trade-offs. NEAR's built-in randomness provides an excellent foundation for most applications, while advanced patterns like commit-reveal and oracle integration address high-security requirements.

The key to successful randomness implementation lies in:
1. **Understanding your threat model** - What attacks are you defending against?
2. **Choosing appropriate complexity** - Don't over-engineer simple use cases
3. **Testing thoroughly** - Statistical validation is crucial
4. **Planning for upgrades** - Randomness requirements may evolve

Remember: Perfect randomness doesn't exist in deterministic systems. The goal is achieving randomness that's "good enough" for your specific application while remaining practical to implement and use.

:::note Development Environment

This tutorial is tested with:

- NEAR CLI: `4.0.13`
- Node.js: `18.19.1`
- Rust: `1.77.0`
- near-sdk-rs: `4.1.0`

:::
