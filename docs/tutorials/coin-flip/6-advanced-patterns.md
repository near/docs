---
id: advanced-patterns
title: Advanced Randomness Patterns
sidebar_label: Advanced Techniques
description: "Explore advanced randomness patterns and techniques for complex applications beyond simple coin flips."
---

Now that you've mastered basic randomness with our coin flip game, let's explore advanced patterns and techniques that enable more sophisticated randomness-powered applications. These patterns will help you build complex games, fair lotteries, and advanced DeFi protocols.

## Pattern 1: Weighted Random Selection

Sometimes you need outcomes with different probabilities - like rare items in games or tiered rewards in DeFi.

### Basic Weighted Selection

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/advanced_patterns.rs#L10-L45">

```rust
use near_sdk::{env, near_bindgen};
use std::collections::HashMap;

#[near_bindgen]
impl CoinFlipContract {
    /// Select from weighted options (e.g., loot drops, reward tiers)
    pub fn weighted_selection(&self, weights: Vec<(String, u32)>) -> String {
        if weights.is_empty() {
            env::panic_str("No options provided");
        }
        
        // Calculate total weight
        let total_weight: u32 = weights.iter().map(|(_, weight)| weight).sum();
        if total_weight == 0 {
            env::panic_str("Total weight cannot be zero");
        }
        
        // Generate random value in range [0, total_weight)
        let random_seed = env::random_seed();
        let random_value = self.random_u32_range(0, total_weight);
        
        // Find the selected item
        let mut cumulative_weight = 0u32;
        for (item, weight) in weights {
            cumulative_weight += weight;
            if random_value < cumulative_weight {
                return item;
            }
        }
        
        // Fallback (should never reach here)
        weights.last().unwrap().0.clone()
    }
    
    /// Helper: Generate random u32 in range [min, max)
    fn random_u32_range(&self, min: u32, max: u32) -> u32 {
        if min >= max {
            return min;
        }
        
        let random_seed = env::random_seed();
        let random_bytes = [random_seed[0], random_seed[1], random_seed[2], random_seed[3]];
        let random_u32 = u32::from_le_bytes(random_bytes);
        
        min + (random_u32 % (max - min))
    }
}
```

</Github>

### JavaScript Weighted Selection

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/advanced_patterns.js#L10-L40">

```javascript
export class AdvancedRandomness extends CoinFlipContract {
  @call({})
  weightedSelection({ weights }) {
    if (!Array.isArray(weights) || weights.length === 0) {
      throw new Error('No options provided');
    }
    
    // Calculate total weight
    const totalWeight = weights.reduce((sum, [item, weight]) => sum + weight, 0);
    if (totalWeight === 0) {
      throw new Error('Total weight cannot be zero');
    }
    
    // Generate random value
    const randomValue = this.randomU32Range(0, totalWeight);
    
    // Find selected item
    let cumulativeWeight = 0;
    for (const [item, weight] of weights) {
      cumulativeWeight += weight;
      if (randomValue < cumulativeWeight) {
        return item;
      }
    }
    
    // Fallback
    return weights[weights.length - 1][0];
  }
  
  randomU32Range(min, max) {
    if (min >= max) return min;
    
    const randomSeed = near.randomSeed();
    const randomU32 = randomSeed[0] + (randomSeed[1] << 8) + 
                     (randomSeed[2] << 16) + (randomSeed[3] << 24);
    
    return min + (randomU32 % (max - min));
  }
}
```

</Github>

### Example Usage: Loot Box System

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/loot_system.rs">

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct LootBox {
    pub common_items: Vec<String>,
    pub rare_items: Vec<String>, 
    pub legendary_items: Vec<String>,
}

#[near_bindgen]
impl CoinFlipContract {
    /// Open a loot box with tiered rewards
    pub fn open_loot_box(&self) -> (String, String) {
        // Define rarity weights: 70% common, 25% rare, 5% legendary
        let rarity_weights = vec![
            ("common".to_string(), 70),
            ("rare".to_string(), 25),
            ("legendary".to_string(), 5),
        ];
        
        let rarity = self.weighted_selection(rarity_weights);
        
        // Select specific item based on rarity
        let item = match rarity.as_str() {
            "common" => self.select_from_pool(&["Sword", "Shield", "Potion"]),
            "rare" => self.select_from_pool(&["Magic Sword", "Enchanted Shield", "Elixir"]),
            "legendary" => self.select_from_pool(&["Dragon Sword", "Divine Shield", "Phoenix Feather"]),
            _ => "Unknown Item".to_string(),
        };
        
        (rarity, item)
    }
    
    fn select_from_pool(&self, items: &[&str]) -> String {
        if items.is_empty() {
            return "Empty".to_string();
        }
        
        let index = self.random_u32_range(0, items.len() as u32) as usize;
        items[index].to_string()
    }
}
```

</Github>

## Pattern 2: Bias-Free Range Selection

For critical applications like lotteries, you need perfectly unbiased random selection:

### Rejection Sampling for Unbiased Results

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/unbiased_random.rs">

```rust
#[near_bindgen]
impl CoinFlipContract {
    /// Generate unbiased random number in range [min, max) using rejection sampling
    pub fn unbiased_range(&self, min: u32, max: u32) -> u32 {
        if min >= max {
            return min;
        }
        
        let range = max - min;
        let random_seed = env::random_seed();
        
        // Calculate the maximum valid value to avoid bias
        let max_valid = u32::MAX - (u32::MAX % range);
        
        // Try up to 8 times with different bytes from the seed
        for i in (0..29).step_by(4) {
            let candidate = u32::from_le_bytes([
                random_seed[i], 
                random_seed[i + 1], 
                random_seed[i + 2], 
                random_seed[i + 3]
            ]);
            
            // Accept only if within valid range
            if candidate < max_valid {
                return min + (candidate % range);
            }
        }
        
        // Fallback: use simple modulo (minimal bias for 32-byte seed)
        let fallback = u32::from_le_bytes([
            random_seed[0], random_seed[1], random_seed[2], random_seed[3]
        ]);
        min + (fallback % range)
    }
    
    /// Fair lottery: select N winners from M participants
    pub fn lottery_winners(&self, participants: Vec<String>, winner_count: u32) -> Vec<String> {
        if participants.is_empty() || winner_count == 0 {
            return vec![];
        }
        
        let winner_count = std::cmp::min(winner_count, participants.len() as u32);
        let mut winners = Vec::new();
        let mut remaining = participants;
        
        // Fisher-Yates shuffle to select winners
        for _ in 0..winner_count {
            if remaining.is_empty() {
                break;
            }
            
            let index = self.unbiased_range(0, remaining.len() as u32) as usize;
            winners.push(remaining.remove(index));
        }
        
        winners
    }
}
```

</Github>

### JavaScript Unbiased Implementation

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/unbiased_random.js">

```javascript
export class UnbiasedRandom extends CoinFlipContract {
  @call({})
  unbiasedRange({ min, max }) {
    if (min >= max) return min;
    
    const range = max - min;
    const randomSeed = near.randomSeed();
    
    // Calculate maximum valid value
    const maxValid = Math.floor(0xFFFFFFFF / range) * range;
    
    // Try multiple candidates
    for (let i = 0; i < 7; i += 4) {
      const candidate = randomSeed[i] + (randomSeed[i + 1] << 8) + 
                       (randomSeed[i + 2] << 16) + (randomSeed[i + 3] << 24);
      
      if (candidate < maxValid) {
        return min + (candidate % range);
      }
    }
    
    // Fallback
    const fallback = randomSeed[0] + (randomSeed[1] << 8) + 
                    (randomSeed[2] << 16) + (randomSeed[3] << 24);
    return min + (fallback % range);
  }
  
  @call({})
  lotteryWinners({ participants, winnerCount }) {
    if (!participants || participants.length === 0 || winnerCount <= 0) {
      return [];
    }
    
    const actualWinnerCount = Math.min(winnerCount, participants.length);
    const winners = [];
    const remaining = [...participants]; // Copy array
    
    for (let i = 0; i < actualWinnerCount; i++) {
      if (remaining.length === 0) break;
      
      const index = this.unbiasedRange({ min: 0, max: remaining.length });
      winners.push(remaining.splice(index, 1)[0]);
    }
    
    return winners;
  }
}
```

</Github>

## Pattern 3: Multi-Round Randomness

For complex games requiring multiple random events:

### Sequential Randomness with Entropy Mixing

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/multi_round.rs">

```rust
use near_sdk::collections::UnorderedMap;

#[derive(BorshSerialize, BorshDeserialize)]
pub struct GameRound {
    pub round_id: u64,
    pub player: AccountId,
    pub dice_rolls: Vec<u8>,
    pub cards_drawn: Vec<u8>,
    pub bonus_multiplier: f64,
}

#[near_bindgen]
impl CoinFlipContract {
    /// Complex game with multiple random elements
    pub fn play_complex_game(&mut self, player: AccountId) -> GameRound {
        let round_id = self.total_games + 1;
        
        // Generate base entropy
        let base_seed = env::random_seed();
        
        // Roll 3 dice with different entropy sources
        let dice_rolls = vec![
            self.entropy_dice(&base_seed, &player, 0),
            self.entropy_dice(&base_seed, &player, 1), 
            self.entropy_dice(&base_seed, &player, 2),
        ];
        
        // Draw 5 cards (1-52)
        let cards_drawn = (0..5)
            .map(|i| self.entropy_card(&base_seed, &player, i))
            .collect();
        
        // Calculate bonus multiplier based on results
        let dice_sum: u32 = dice_rolls.iter().map(|&x| x as u32).sum();
        let bonus_multiplier = match dice_sum {
            3..=6 => 0.5,    // Low roll
            7..=14 => 1.0,   // Normal roll
            15..=18 => 2.0,  // High roll
            _ => 1.0,
        };
        
        GameRound {
            round_id,
            player: player.clone(),
            dice_rolls,
            cards_drawn,
            bonus_multiplier,
        }
    }
    
    /// Generate dice roll (1-6) with custom entropy
    fn entropy_dice(&self, base_seed: &[u8; 32], player: &AccountId, variant: u8) -> u8 {
        let mut entropy_data = Vec::new();
        entropy_data.extend_from_slice(base_seed);
        entropy_data.extend_from_slice(player.as_str().as_bytes());
        entropy_data.push(variant);
        entropy_data.extend_from_slice(&env::block_height().to_le_bytes());
        
        let hash = env::sha256(&entropy_data);
        (hash[0] % 6) + 1
    }
    
    /// Generate card (1-52) with custom entropy  
    fn entropy_card(&self, base_seed: &[u8; 32], player: &AccountId, variant: u8) -> u8 {
        let mut entropy_data = Vec::new();
        entropy_data.extend_from_slice(base_seed);
        entropy_data.extend_from_slice(player.as_str().as_bytes());
        entropy_data.push(100 + variant); // Different salt than dice
        entropy_data.extend_from_slice(&env::block_timestamp().to_le_bytes());
        
        let hash = env::sha256(&entropy_data);
        (hash[0] % 52) + 1
    }
}
```

</Github>

## Pattern 4: Commit-Reveal for High-Stakes Applications

For maximum security in high-value scenarios:

### Commit-Reveal Scheme

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/commit_reveal.rs">

```rust
use near_sdk::collections::LookupMap;

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Commitment {
    pub player: AccountId,
    pub commitment_hash: Vec<u8>,
    pub timestamp: u64,
    pub stake: u128,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Reveal {
    pub nonce: String,
    pub guess: CoinSide,
}

#[near_bindgen]
impl CoinFlipContract {
    /// Phase 1: Player commits to their guess without revealing it
    #[payable]
    pub fn commit_guess(&mut self, commitment_hash: Vec<u8>) {
        let player = env::predecessor_account_id();
        let stake = env::attached_deposit();
        
        assert!(stake >= 1_000_000_000_000_000_000_000_000, "Minimum stake: 1 NEAR");
        assert!(commitment_hash.len() == 32, "Invalid commitment hash length");
        
        let commitment = Commitment {
            player: player.clone(),
            commitment_hash,
            timestamp: env::block_timestamp(),
            stake,
        };
        
        self.commitments.insert(&player, &commitment);
        
        env::log_str(&format!("Commitment recorded for {}", player));
    }
    
    /// Phase 2: Player reveals their guess and nonce
    pub fn reveal_and_play(&mut self, nonce: String, guess: CoinSide) -> CoinSide {
        let player = env::predecessor_account_id();
        
        // Get and remove commitment
        let commitment = self.commitments.get(&player)
            .expect("No commitment found");
        self.commitments.remove(&player);
        
        // Verify commitment
        let reveal_data = format!("{}{:?}", nonce, guess);
        let reveal_hash = env::sha256(reveal_data.as_bytes());
        
        assert_eq!(reveal_hash, commitment.commitment_hash, "Invalid reveal");
        
        // Check timing (e.g., reveal must be within 10 minutes)
        let elapsed = env::block_timestamp() - commitment.timestamp;
        assert!(elapsed <= 600_000_000_000, "Reveal window expired"); // 10 minutes in nanoseconds
        
        // Use both NEAR's randomness AND commitment timing for extra entropy
        let game_outcome = self.commit_reveal_flip(&commitment, &nonce);
        
        // Handle payout
        if guess == game_outcome {
            // Player wins: return stake + bonus
            Promise::new(player).transfer(commitment.stake * 2);
        }
        // If player loses, stake stays in contract
        
        game_outcome
    }
    
    /// Generate outcome using commitment entropy + NEAR randomness
    fn commit_reveal_flip(&self, commitment: &Commitment, nonce: &str) -> CoinSide {
        let mut entropy_sources = Vec::new();
        
        // Mix multiple entropy sources
        entropy_sources.extend_from_slice(&env::random_seed());
        entropy_sources.extend_from_slice(&commitment.commitment_hash);
        entropy_sources.extend_from_slice(nonce.as_bytes());
        entropy_sources.extend_from_slice(&commitment.timestamp.to_le_bytes());
        entropy_sources.extend_from_slice(&env::block_height().to_le_bytes());
        
        let final_hash = env::sha256(&entropy_sources);
        
        if final_hash[0] % 2 == 0 {
            CoinSide::Heads
        } else {
            CoinSide::Tails
        }
    }
}

// Add to contract struct
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct CoinFlipContract {
    // ... existing fields
    commitments: LookupMap<AccountId, Commitment>,
}
```

</Github>

## Pattern 5: Randomness Quality Monitoring

For production applications, monitor randomness quality:

### Statistical Health Monitoring

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/quality_monitor.rs">

```rust
#[derive(BorshSerialize, BorshDeserialize, Default)]
pub struct RandomnessHealth {
    pub total_samples: u64,
    pub byte_distribution: [u32; 256],
    pub last_update: u64,
    pub health_score: f64,
}

#[near_bindgen]
impl CoinFlipContract {
    /// Record randomness usage for quality monitoring
    pub fn record_randomness(&mut self, sample: u8) {
        self.randomness_health.total_samples += 1;
        self.randomness_health.byte_distribution[sample as usize] += 1;
        self.randomness_health.last_update = env::block_timestamp();
        
        // Update health score every 1000 samples
        if self.randomness_health.total_samples % 1000 == 0 {
            self.randomness_health.health_score = self.calculate_health_score();
        }
    }
    
    /// Calculate statistical health score (0.0 = poor, 1.0 = perfect)
    fn calculate_health_score(&self) -> f64 {
        if self.randomness_health.total_samples < 1000 {
            return 1.0; // Insufficient data
        }
        
        let expected_per_bucket = self.randomness_health.total_samples as f64 / 256.0;
        let mut chi_square = 0.0;
        
        for &observed in &self.randomness_health.byte_distribution {
            let diff = observed as f64 - expected_per_bucket;
            chi_square += (diff * diff) / expected_per_bucket;
        }
        
        // Convert chi-square to health score (simplified)
        let normalized_chi_square = chi_square / self.randomness_health.total_samples as f64;
        1.0 / (1.0 + normalized_chi_square)
    }
    
    /// Get randomness quality report
    pub fn get_randomness_health(&self) -> RandomnessHealth {
        self.randomness_health.clone()
    }
    
    /// Alert if randomness quality is poor
    pub fn check_randomness_alert(&self) -> Option<String> {
        if self.randomness_health.total_samples < 1000 {
            return None;
        }
        
        if self.randomness_health.health_score < 0.8 {
            Some(format!(
                "⚠️  Randomness quality degraded: {:.2} (samples: {})", 
                self.randomness_health.health_score,
                self.randomness_health.total_samples
            ))
        } else {
            None
        }
    }
}
```

</Github>

## Real-World Application Examples

### NFT Mystery Box

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/nft_mystery_box.rs">

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct NFTMetadata {
    pub rarity: String,
    pub attribute1: String,
    pub attribute2: String,
    pub power_level: u32,
}

#[near_bindgen]
impl CoinFlipContract {
    /// Mint NFT with random attributes
    #[payable]
    pub fn mint_random_nft(&mut self) -> NFTMetadata {
        let player = env::predecessor_account_id();
        let payment = env::attached_deposit();
        
        assert!(payment >= 1_000_000_000_000_000_000_000_000, "Insufficient payment"); // 1 NEAR
        
        // Determine rarity (5% legendary, 15% rare, 80% common)
        let rarity_weights = vec![
            ("legendary".to_string(), 5),
            ("rare".to_string(), 15), 
            ("common".to_string(), 80),
        ];
        let rarity = self.weighted_selection(rarity_weights);
        
        // Generate random attributes based on rarity
        let (attribute1, attribute2) = match rarity.as_str() {
            "legendary" => (
                self.select_from_pool(&["Dragon", "Phoenix", "Cosmic"]),
                self.select_from_pool(&["Fire", "Lightning", "Void"]),
            ),
            "rare" => (
                self.select_from_pool(&["Knight", "Mage", "Archer"]),
                self.select_from_pool(&["Ice", "Earth", "Wind"]),
            ),
            _ => (
                self.select_from_pool(&["Warrior", "Scout", "Peasant"]),
                self.select_from_pool(&["Normal", "Basic", "Simple"]),
            ),
        };
        
        // Random power level based on rarity
        let power_level = match rarity.as_str() {
            "legendary" => self.random_u32_range(80, 100),
            "rare" => self.random_u32_range(50, 80),
            _ => self.random_u32_range(10, 50),
        };
        
        NFTMetadata {
            rarity,
            attribute1,
            attribute2,
            power_level,
        }
    }
}
```

</Github>

## Testing Advanced Patterns

Create comprehensive tests for advanced patterns:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_advanced_patterns.rs">

```rust
#[tokio::test]
async fn test_weighted_selection() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;
    
    let weights = vec![
        ("common".to_string(), 70),
        ("rare".to_string(), 25),
        ("legendary".to_string(), 5),
    ];
    
    let mut results = std::collections::HashMap::new();
    
    // Run many selections
    for _ in 0..1000 {
        let result: String = contract
            .call("weighted_selection")
            .args_json(json!({"weights": weights}))
            .transact()
            .await?
            .json()?;
        
        *results.entry(result).or_insert(0) += 1;
    }
    
    // Verify distribution roughly matches weights
    let common_count = results.get("common").unwrap_or(&0);
    let rare_count = results.get("rare").unwrap_or(&0);
    let legendary_count = results.get("legendary").unwrap_or(&0);
    
    // Should be roughly 70%, 25%, 5% (with some variance)
    assert!(*common_count > 600 && *common_count < 800);
    assert!(*rare_count > 200 && *rare_count < 350);
    assert!(*legendary_count > 20 && *legendary_count < 80);
    
    println!("✅ Weighted selection: Common={}, Rare={}, Legendary={}", 
             common_count, rare_count, legendary_count);
    
    Ok(())
}
```

</Github>

## Key Takeaways

🎯 **Advanced Patterns Enable:**
- **Weighted Selection**: Fair probability distributions for games and rewards
- **Unbiased Ranges**: Perfect fairness for critical applications
- **Multi-Round Games**: Complex interactions with multiple random elements
- **Commit-Reveal**: Maximum security for high-stakes scenarios
- **Quality Monitoring**: Production-ready randomness validation

🔒 **Security Considerations:**
- Always validate inputs and handle edge cases
- Use multiple entropy sources for high-security applications
- Monitor randomness quality in production
- Consider economic incentives and potential attacks

🚀 **Real-World Applications:**
- **Gaming**: Complex RPGs, card games, battle systems
- **DeFi**: Fair lotteries, random rewards, yield farming bonuses
- **NFTs**: Procedural generation, mystery boxes, trait assignment
- **DAOs**: Random sampling, fair governance mechanisms

## Next Steps

You now have a comprehensive toolkit for implementing randomness in NEAR applications! Whether you're building simple games or complex DeFi protocols, these patterns provide the foundation for fair, secure, and engaging randomness-powered features.

Consider exploring:
- Cross-contract randomness sharing
- Randomness oracles for external data
- Advanced cryptographic techniques like VDFs
- Integration with other NEAR Protocol features

:::tip Production Checklist
Before deploying randomness-critical contracts:
- ✅ Implement comprehensive testing
- ✅ Add quality monitoring  
- ✅ Plan for edge cases and failures
- ✅ Consider economic implications
- ✅ Audit for security vulnerabilities
:::

:::info Community Resources
Join the NEAR developer community to share your randomness-powered applications:
- [NEAR Discord](https://near.chat)
- [Developer Telegram](https://t.me/neardev)
- [GitHub Discussions](https://github.com/near/nearcore/discussions)
:::