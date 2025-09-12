---
id: advanced-patterns
title: Advanced Randomness Patterns
sidebar_label: Advanced Techniques
description: "Explore advanced randomness patterns and techniques for complex applications beyond simple coin flips."
---

Now that you've mastered basic randomness with our coin flip game, let's explore advanced patterns that enable more sophisticated randomness-powered applications. These patterns will help you build complex games, fair lotteries, and advanced DeFi protocols.

## Pattern 1: Weighted Random Selection

Sometimes you need outcomes with different probabilities - like rare items in games or tiered rewards in DeFi.

### Basic Weighted Selection

```rust
use near_sdk::{env, near_bindgen};

#[near_bindgen]
impl CoinFlipContract {
    /// Select from weighted options (e.g., loot drops, reward tiers)
    pub fn weighted_selection(&self, weights: Vec<(String, u32)>) -> String {
        if weights.is_empty() {
            env::panic_str("No options provided");
        }
        
        let total_weight: u32 = weights.iter().map(|(_, weight)| weight).sum();
        if total_weight == 0 {
            env::panic_str("Total weight cannot be zero");
        }
        
        let random_value = self.random_u32_range(0, total_weight);
        
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

### JavaScript Weighted Selection

```javascript
export class AdvancedRandomness extends CoinFlipContract {
  @call({})
  weightedSelection({ weights }) {
    if (!Array.isArray(weights) || weights.length === 0) {
      throw new Error('No options provided');
    }
    
    const totalWeight = weights.reduce((sum, [item, weight]) => sum + weight, 0);
    if (totalWeight === 0) {
      throw new Error('Total weight cannot be zero');
    }
    
    const randomValue = this.randomU32Range(0, totalWeight);
    
    let cumulativeWeight = 0;
    for (const [item, weight] of weights) {
      cumulativeWeight += weight;
      if (randomValue < cumulativeWeight) {
        return item;
      }
    }
    
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

### Example: Loot Box System

```rust
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

## Pattern 2: Bias-Free Range Selection

For critical applications like lotteries, you need perfectly unbiased random selection:

### Rejection Sampling for Unbiased Results

```rust
#[near_bindgen]
impl CoinFlipContract {
    /// Generate unbiased random number in range [min, max)
    pub fn unbiased_range(&self, min: u32, max: u32) -> u32 {
        if min >= max {
            return min;
        }
        
        let range = max - min;
        let random_seed = env::random_seed();
        
        // Calculate maximum valid value to avoid bias
        let max_valid = u32::MAX - (u32::MAX % range);
        
        // Try different bytes from the seed
        for i in (0..29).step_by(4) {
            let candidate = u32::from_le_bytes([
                random_seed[i], 
                random_seed[i + 1], 
                random_seed[i + 2], 
                random_seed[i + 3]
            ]);
            
            if candidate < max_valid {
                return min + (candidate % range);
            }
        }
        
        // Fallback
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

## Pattern 3: Multi-Round Randomness

For complex games requiring multiple random events:

### Sequential Randomness with Entropy Mixing

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
        
        // Calculate bonus multiplier based on dice sum
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

## Pattern 4: Commit-Reveal for High-Stakes Applications

For maximum security in high-value scenarios:

### Commit-Reveal Scheme

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct Commitment {
    pub player: AccountId,
    pub commitment_hash: Vec<u8>,
    pub timestamp: u64,
    pub stake: u128,
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
        
        // Check timing (reveal must be within 10 minutes)
        let elapsed = env::block_timestamp() - commitment.timestamp;
        assert!(elapsed <= 600_000_000_000, "Reveal window expired");
        
        // Use mixed entropy for outcome
        let game_outcome = self.commit_reveal_flip(&commitment, &nonce);
        
        // Handle payout
        if guess == game_outcome {
            Promise::new(player).transfer(commitment.stake * 2);
        }
        
        game_outcome
    }
    
    /// Generate outcome using multiple entropy sources
    fn commit_reveal_flip(&self, commitment: &Commitment, nonce: &str) -> CoinSide {
        let mut entropy_sources = Vec::new();
        
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
```

## Real-World Application Examples

### NFT Mystery Box

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
        let payment = env::attached_deposit();
        assert!(payment >= 1_000_000_000_000_000_000_000_000, "Insufficient payment"); // 1 NEAR
        
        // Determine rarity (5% legendary, 15% rare, 80% common)
        let rarity_weights = vec![
            ("legendary".to_string(), 5),
            ("rare".to_string(), 15), 
            ("common".to_string(), 80),
        ];
        let rarity = self.weighted_selection(rarity_weights);
        
        // Generate attributes based on rarity
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

## Testing Advanced Patterns

Create comprehensive tests for these advanced patterns:

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
    
    let common_count = results.get("common").unwrap_or(&0);
    let rare_count = results.get("rare").unwrap_or(&0);
    let legendary_count = results.get("legendary").unwrap_or(&0);
    
    // Verify distribution roughly matches weights (70%, 25%, 5%)
    assert!(*common_count > 600 && *common_count < 800);
    assert!(*rare_count > 200 && *rare_count < 350);
    assert!(*legendary_count > 20 && *legendary_count < 80);
    
    println!("✅ Weighted selection: Common={}, Rare={}, Legendary={}", 
             common_count, rare_count, legendary_count);
    
    Ok(())
}

#[tokio::test]
async fn test_unbiased_range() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;
    
    let mut results = vec![0u32; 10];
    
    // Test range 0-9, should be roughly uniform
    for _ in 0..1000 {
        let result: u32 = contract
            .call("unbiased_range")
            .args_json(json!({"min": 0, "max": 10}))
            .transact()
            .await?
            .json()?;
        
        assert!(result < 10, "Result should be in range [0,10)");
        results[result as usize] += 1;
    }
    
    // Each bucket should have roughly 100 samples (with some variance)
    for (i, count) in results.iter().enumerate() {
        assert!(*count > 70 && *count < 130, 
                "Bucket {} has {} samples, expected ~100", i, count);
    }
    
    println!("✅ Unbiased range test passed");
    Ok(())
}

#[tokio::test]
async fn test_lottery_winners() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;
    
    let participants = vec![
        "alice.near".to_string(),
        "bob.near".to_string(), 
        "charlie.near".to_string(),
        "david.near".to_string(),
        "eve.near".to_string(),
    ];
    
    let winners: Vec<String> = contract
        .call("lottery_winners")
        .args_json(json!({"participants": participants, "winner_count": 3}))
        .transact()
        .await?
        .json()?;
    
    // Should select exactly 3 unique winners
    assert_eq!(winners.len(), 3);
    
    // Winners should be from the original participants
    for winner in &winners {
        assert!(participants.contains(winner));
    }
    
    // Winners should be unique
    let mut unique_winners = winners.clone();
    unique_winners.sort();
    unique_winners.dedup();
    assert_eq!(unique_winners.len(), winners.len());
    
    println!("✅ Lottery winners: {:?}", winners);
    Ok(())
}
```

### JavaScript Testing

```javascript
test('weighted selection maintains proper distribution', async (t) => {
  const { contract } = t.context.accounts;
  
  const weights = [
    ['common', 70],
    ['rare', 25], 
    ['legendary', 5]
  ];
  
  const results = { common: 0, rare: 0, legendary: 0 };
  
  for (let i = 0; i < 500; i++) {
    const result = await contract.view('weightedSelection', { weights });
    results[result]++;
  }
  
  // Verify rough distribution
  t.true(results.common > 300 && results.common < 400);
  t.true(results.rare > 100 && results.rare < 200);
  t.true(results.legendary > 10 && results.legendary < 50);
  
  console.log(`✅ Weighted results: ${JSON.stringify(results)}`);
});

test('commit-reveal scheme works securely', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  // Create commitment
  const nonce = 'random123';
  const guess = 'heads';
  const commitmentData = nonce + guess;
  const commitment = Buffer.from(await crypto.subtle.digest('SHA-256', 
    new TextEncoder().encode(commitmentData)));
  
  // Phase 1: Commit
  await alice.call(contract, 'commitGuess', 
    { commitmentHash: Array.from(commitment) },
    { attachedDeposit: '1000000000000000000000000' } // 1 NEAR
  );
  
  // Phase 2: Reveal
  const outcome = await alice.call(contract, 'revealAndPlay', { nonce, guess });
  
  t.true(['heads', 'tails'].includes(outcome));
  console.log(`✅ Commit-reveal outcome: ${outcome}`);
});
```

## Best Practices Summary

### ✅ Advanced Pattern Guidelines

1. **Weighted Selection**: Always validate weights sum > 0 and handle edge cases
2. **Unbiased Ranges**: Use rejection sampling for critical fairness requirements
3. **Multi-Round Games**: Mix entropy sources for independent random events
4. **Commit-Reveal**: Implement timing windows and proper hash verification
5. **NFT Generation**: Combine multiple randomness sources for complex attributes

### 🔒 Security Considerations

- **Input Validation**: Always validate ranges, weights, and array sizes
- **Entropy Mixing**: Use multiple sources for high-security applications
- **Timing Attacks**: Implement proper windows for time-sensitive operations
- **Economic Incentives**: Consider game theory and potential manipulation
- **Gas Limits**: Optimize complex operations for reasonable gas usage

## Real-World Applications

🎮 **Gaming Applications:**
- Complex RPGs with multiple random elements
- Card games with deck shuffling and draws
- Battle systems with random outcomes and critical hits

💰 **DeFi Protocols:**
- Fair lotteries and prize distributions
- Random reward mechanisms in yield farming
- Governance systems with random jury selection

🖼️ **NFT Projects:**
- Procedural art generation with weighted traits
- Mystery box mechanics with rarity tiers
- Dynamic NFTs with evolving random attributes

## Summary

Advanced randomness patterns enable sophisticated applications by providing:

- **Weighted Selection**: Fair probability distributions for tiered systems
- **Unbiased Ranges**: Perfect fairness for critical applications  
- **Multi-Round Games**: Complex interactions with independent random events
- **Commit-Reveal**: Maximum security for high-stakes scenarios
- **Real-World Applications**: Production-ready patterns for games, DeFi, and NFTs

These patterns form the foundation for building engaging, fair, and secure randomness-powered applications on NEAR Protocol.

## Next Steps

You now have a complete toolkit for implementing advanced randomness in NEAR applications! Consider exploring:

- Cross-contract randomness coordination
- Integration with external oracle systems  
- Advanced cryptographic techniques like VDFs
- Combining randomness with other NEAR Protocol features

:::tip Production Checklist
Before deploying advanced randomness contracts:
- ✅ Implement comprehensive statistical testing
- ✅ Add proper input validation and error handling
- ✅ Consider economic implications and attack vectors
- ✅ Optimize gas usage for complex operations
- ✅ Plan for contract upgrades and maintenance
:::

:::info Community Resources
Share your randomness-powered applications with the community:
- [NEAR Discord](https://near.chat) - Get help and feedback
- [Developer Telegram](https://t.me/neardev) - Connect with other builders
- [GitHub Discussions](https://github.com/near/nearcore/discussions) - Technical discussions
:::