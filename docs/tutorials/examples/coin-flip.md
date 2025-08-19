
---
id: coin-flip
title: "Coin Flip on NEAR: Mastering Randomness in Smart Contracts"
description: "Learn how to implement secure and fair randomness in NEAR smart contracts through a practical coin flip game, with beginner-friendly examples and advanced techniques."
---

# Coin Flip on NEAR: Mastering Randomness in Smart Contracts

Randomness is a cornerstone of many Web3 applications, from games like lotteries and coin flips to DeFi protocols and NFT minting. However, generating randomness on a blockchain is tricky because all nodes must agree on the same result. In this beginner-friendly tutorial, we'll build a Coin Flip game on NEAR Protocol to learn how to handle randomness securely and fairly. We'll use both JavaScript and Rust, include testing, and explore advanced patterns for more complex applications—all while keeping things clear and approachable.

![img](/docs/assets/examples/coin-flip.png)

## Why Randomness on Chain Is Hard

In traditional programming, you might use Math.random() or /dev/urandom for randomness. On a blockchain like NEAR, things are different because:

**Consensus Requirement**: Every node in the network must compute the same result to maintain agreement. If your coin flip gives "heads" on one node and "tails" on another, the blockchain breaks.

**Predictability Risks**: Using predictable inputs like block timestamps can be manipulated by miners or malicious actors, leading to unfair outcomes.

For example, this won't work on a blockchain:

```javascript
// ❌ BAD: Predictable and manipulable
const outcome = (block.timestamp % 2) ? 'heads' : 'tails';
```

## NEAR's Elegant Solution

NEAR Protocol solves this with a Verifiable Random Function (VRF), providing a secure and unpredictable random seed through:

- **Rust**: env::random_seed() (returns a 32-byte array)
- **JavaScript**: near.randomSeed() (returns a 32-byte array)

This randomness is:

**Secure**: Based on cryptographic VRF, making it resistant to manipulation.
**Consistent**: All nodes in a block get the same random seed, ensuring consensus.
**Immediate**: Available within your contract call, no external oracles needed.

The seed is derived from block-level data (e.g., block producer signatures, block height, and previous randomness), ensuring unpredictability for users but determinism for validators.

:::tip
Think of NEAR's randomness like flipping a coin where every observer sees the same result, but no one can predict it before the flip!
:::

## Building the Coin Flip Contract

Let's build a simple coin flip game where players guess "heads" or "tails," earn points for correct guesses, and lose points for wrong ones. We'll provide implementations in both JavaScript and Rust, followed by tests.

### JavaScript Implementation

This contract uses NEAR's JavaScript SDK to create a coin flip game.

```javascript
import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';
import { AccountId } from 'near-sdk-js/lib/types';

type Side = 'heads' | 'tails';

function simulateCoinFlip(): Side {
  // Get 32-byte random seed from NEAR's VRF
  const randomSeed = near.randomSeed();
  // Use first byte for a simple 50/50 chance
  return randomSeed[0] % 2 === 0 ? 'heads' : 'tails';
}

@NearBindgen({})
class CoinFlip {
  points: UnorderedMap<number> = new UnorderedMap<number>("points");

  static schema = {
    points: { class: UnorderedMap, value: 'number' }
  };

  @call({})
  flip_coin({ player_guess }: { player_guess: Side }): Side {
    // Validate input
    if (!['heads', 'tails'].includes(player_guess)) {
      throw new Error('Invalid guess: must be heads or tails');
    }

    const player: AccountId = near.predecessorAccountId();
    near.log(`${player} guessed ${player_guess}`);

    // Generate secure randomness
    const outcome = simulateCoinFlip();

    // Update player points
    let player_points: number = this.points.get(player, { defaultValue: 0 });
    if (player_guess === outcome) {
      near.log(`Result: ${outcome} - You won!`);
      player_points += 1;
    } else {
      near.log(`Result: ${outcome} - You lost`);
      player_points = Math.max(0, player_points - 1);
    }

    this.points.set(player, player_points);
    return outcome;
  }

  @view({})
  points_of({ player }: { player: AccountId }): number {
    return this.points.get(player, { defaultValue: 0 });
  }
}
```

### Rust Implementation

This contract uses NEAR's Rust SDK for the same coin flip game.

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};

#[derive(BorshDeserialize, BorshSerialize)]
pub enum Side {
    Heads,
    Tails,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CoinFlip {
    points: UnorderedMap<AccountId, u32>,
}

impl Default for CoinFlip {
    fn default() -> Self {
        Self {
            points: UnorderedMap::new(b"p"),
        }
    }
}

#[near_bindgen]
impl CoinFlip {
    #[private]
    fn simulate_coin_flip(&self) -> Side {
        let random_seed = env::random_seed();
        if random_seed[0] % 2 == 0 {
            Side::Heads
        } else {
            Side::Tails
        }
    }

    pub fn flip_coin(&mut self, player_guess: Side) -> Side {
        let player = env::predecessor_account_id();
        let outcome = self.simulate_coin_flip();

        // Update points
        let current_points = self.points.get(&player).unwrap_or(0);
        let new_points = match (&player_guess, &outcome) {
            (Side::Heads, Side::Heads) | (Side::Tails, Side::Tails) => {
                env::log_str("You won!");
                current_points + 1
            }
            _ => {
                env::log_str("You lost!");
                current_points.saturating_sub(1)
            }
        };

        self.points.insert(&player, &new_points);
        outcome
    }

    pub fn points_of(&self, player: AccountId) -> u32 {
        self.points.get(&player).unwrap_or(0)
    }
}
```

### How It Works

**Randomness**: Both implementations use NEAR's VRF-based random_seed() to generate a 32-byte array. We use the first byte (random_seed[0]) to decide heads (even) or tails (odd).

**Game Logic**: Players guess "heads" or "tails." A correct guess adds 1 point; a wrong guess subtracts 1 (minimum 0).

**State**: Points are stored in an UnorderedMap, persisting player scores across calls.

## Testing Your Contract

Testing ensures your contract works as expected. Below are tests for both implementations using NEAR's testing frameworks.

### JavaScript Tests (AVA + near-workspaces)

```javascript
import anyTest from 'ava';
import { Worker } from 'near-workspaces';

const test = anyTest;

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  await contract.deploy(process.argv[2]);

  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('by default the user has no points', async (t) => {
  const { root, contract } = t.context.accounts;
  const points = await contract.view('points_of', { player: root.accountId });
  t.is(points, 0);
});

test('points are correctly computed', async (t) => {
  const { root, contract } = t.context.accounts;

  let counter = { 'heads': 0, 'tails': 0 };
  let expected_points = 0;

  for (let i = 0; i < 10; i++) {
    const res = await root.call(contract, 'flip_coin', { player_guess: 'heads' });
    counter[res] += 1;
    expected_points += res === 'heads' ? 1 : -1;
    expected_points = Math.max(expected_points, 0);
  }

  // Basic randomness check: both outcomes should appear
  t.true(counter['heads'] >= 2, 'Expected at least 2 heads');
  t.true(counter['tails'] >= 2, 'Expected at least 2 tails');

  const points = await contract.view('points_of', { player: root.accountId });
  t.is(points, expected_points);
});
```

### Rust Tests (near-workspaces)

```rust
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;

#[tokio::test]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?
        .create_subaccount("alice")
        .initial_balance(NearToken::from_near(30))
        .transact().await?.into_result()?;

    test_user_has_no_points(&alice, &contract).await?;
    test_points_are_correctly_computed(&alice, &contract).await?;
    Ok(())
}

async fn test_user_has_no_points(
    user: &Account,
    contract: &Contract,
) -> Result<(), Box<dyn std::error::Error>> {
    let points: u32 = user.call(contract.id(), "points_of")
        .args_json(json!({ "player": user.id()}))
        .transact().await?.json()?;
    assert_eq!(points, 0);
    Ok(())
}

async fn test_points_are_correctly_computed(
    user: &Account,
    contract: &Contract,
) -> Result<(), Box<dyn std::error::Error>> {
    let mut tails_counter = 0;
    let mut heads_counter = 0;
    let mut expected_points = 0;

    for _ in 0..10 {
        let outcome: String = user.call(contract.id(), "flip_coin")
            .args_json(json!({"player_guess": "Tails"}))
            .transact().await?.json()?;

        if outcome.eq("Tails") {
            tails_counter += 1;
            expected_points += 1;
        } else {
            heads_counter += 1;
            expected_points = expected_points.saturating_sub(1);
        }
    }

    assert!(heads_counter >= 2, "Expected at least 2 heads");
    assert!(tails_counter >= 2, "Expected at least 2 tails");

    let points: u32 = user.call(contract.id(), "points_of")
        .args_json(json!({ "player": user.id()}))
        .transact().await?.json()?;

    assert_eq!(points, expected_points);
    Ok(())
}
```

### What These Tests Verify

**Initial State**: Players start with zero points.
**Logic**: Points increase for wins and decrease for losses, with a minimum of 0.
**Randomness**: Both heads and tails appear in a sample of 10 flips, ensuring basic randomness quality.
**State Persistence**: Points are correctly stored and retrieved.

## Understanding NEAR's Randomness

### How It Works

NEAR's randomness is generated using a Verifiable Random Function (VRF), which combines:

- Block producer's cryptographic signature
- Previous epoch's random value
- Block height and timestamp
- Network-specific constants

This produces a 32-byte random seed that's:

**Unpredictable**: Users can't guess it before the block is produced.
**Deterministic**: All nodes compute the same seed for consensus.
**Cryptographically Secure**: Suitable for gaming and most DApps, though not for generating cryptographic keys due to block-level determinism.

:::note
The random seed is the same for all transactions in a single block. If you need different random values within one transaction, combine the seed with other inputs like block height or user IDs (see advanced patterns below).
:::

### Limitations

**Block-Level Consistency**: All calls to random_seed() in the same block return the same value. This ensures consensus but means you can't generate multiple unique random numbers in one transaction without additional logic.

**Validator Trust**: While VRF is secure, validators could theoretically influence future blocks' randomness (though this requires compromising NEAR's consensus, which is highly unlikely).

**Not for Key Generation**: The seed is secure for DApps but not suitable for cryptographic key generation due to its block-level scope.

## Advanced Randomness Patterns

For simple apps like our coin flip, using one byte of the random seed is fine. But for more complex applications, you'll need advanced techniques. Here are a few, explained simply:

### 1. Random Numbers in a Range

Suppose you want a random number between min and max (e.g., 1 to 6 for a die roll). Here's how to do it safely in Rust:

```rust
pub fn random_range(&self, min: u32, max: u32) -> u32 {
    assert!(min < max, "min must be less than max");
    let seed = env::random_seed();
    let random_u32 = u32::from_le_bytes([seed[0], seed[1], seed[2], seed[3]]);
    let range_size = max - min;
    min + (random_u32 % range_size)
}
```

:::warning
Using modulo (%) can introduce slight bias because not all numbers divide evenly into u32::MAX. For high-security apps, use rejection sampling (see below).
:::

### 2. Avoiding Modulo Bias (Advanced)

Modulo can skew results if the range doesn't evenly divide u32::MAX. Here's a bias-free version using rejection sampling:

```rust
pub fn unbiased_range(&self, min: u32, max: u32) -> u32 {
    let range = max - min;
    let max_valid = u32::MAX - (u32::MAX % range);
    let seed = env::random_seed();
    let mut candidate = u32::from_le_bytes([seed[0], seed[1], seed[2], seed[3]]);
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

This ensures every number in the range has an equal chance, which is critical for fair lotteries or NFT drops.

### 3. Weighted Random Selection

For scenarios where outcomes have different probabilities (e.g., 70% chance of "common" item, 20% "rare," 10% "epic"):

```rust
pub fn weighted_selection(&self, weights: Vec<u32>) -> usize {
    let total_weight: u32 = weights.iter().sum();
    assert!(total_weight > 0, "No valid weights provided");

    let random_value = self.unbiased_range(0, total_weight);
    let mut cumulative_weight = 0;

    for (index, &weight) in weights.iter().enumerate() {
        cumulative_weight += weight;
        if random_value < cumulative_weight {
            return index;
        }
    }

    weights.len() - 1 // Fallback
}
```

Example: weights = [70, 20, 10] for common, rare, epic items.

### 4. Handling Edge Cases

Sometimes, the random seed might be invalid (e.g., all zeros, though rare). Here's a safe fallback:

```rust
pub fn safe_random_byte(&self) -> u8 {
    let seed = env::random_seed();
    if seed.iter().all(|&x| x == 0) {
        // Use XOR of multiple bytes as fallback
        seed[0] ^ seed[1] ^ seed[2] ^ seed[3]
    } else {
        seed[0]
    }
}
```

## Monitoring Randomness Quality

For production apps, track randomness to ensure it's fair. Here's a simple way to monitor distribution in Rust:

```rust
#[derive(BorshSerialize, BorshDeserialize, Default)]
pub struct RandomnessStats {
    pub total_calls: u64,
    pub distribution: [u32; 256],
}

impl CoinFlip {
    pub fn record_random_usage(&mut self, value: u8) {
        self.stats.total_calls += 1;
        self.stats.distribution[value as usize] += 1;
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

        1.0 / (1.0 + chi_square / 1000.0) // 1.0 = perfect, 0.0 = biased
    }
}
```

This tracks how evenly random bytes are distributed, helping you catch issues like bias or errors.

## Real-World Applications

Randomness powers many Web3 use cases:

**Gaming**: Dice rolls, card shuffles, loot drops (e.g., our coin flip game).
**DeFi**: Lottery systems, random reward distributions.
**NFTs**: Random trait assignment during minting, mystery box reveals.
**Governance**: Random jury selection, tie-breaking in votes.

## Best Practices

1. **Use Multiple Bytes**: For better distribution, use several bytes from the seed:

```javascript
function betterRandom(max) {
  const seed = near.randomSeed();
  let value = 0;
  for (let i = 0; i < 4; i++) {
    value += seed[i] * Math.pow(256, i);
  }
  return value % max;
}
```

2. **Validate Inputs**: Always check user inputs:

```javascript
if (!['heads', 'tails'].includes(guess)) {
  throw new Error('Invalid guess: must be heads or tails');
}
```

3. **Handle Block-Level Consistency**: Combine the seed with unique inputs for different random values:

```rust
let seed = env::random_seed();
let variant_1 = (seed[0] as u32 * 7 + env::block_height()) % 100;
let variant_2 = (seed[1] as u32 * 13 + env::block_timestamp()) % 100;
```

4. **Test Thoroughly**: Use statistical tests (like the chi-square test above) to verify randomness quality.

5. **Monitor in Production**: Track distribution to detect issues early.

## Why NEAR for Randomness?

NEAR's randomness is ideal because it's:

**Simple**: No external oracles or multi-step schemes.
**Fast**: Available instantly in your contract.
**Cost-Effective**: No extra fees.
**Secure**: VRF-based and consensus-protected.
**Developer-Friendly**: Easy APIs in Rust and JavaScript.

## Key Takeaways

- Blockchain randomness requires consensus, making traditional methods like Math.random() unusable.
- NEAR's env::random_seed() and near.randomSeed() provide VRF-based, secure randomness.
- Start with simple patterns (like our coin flip) and use advanced techniques (e.g., unbiased ranges, weighted selection) for complex apps.
- Test and monitor randomness to ensure fairness and reliability.
- NEAR's approach is perfect for gaming, DeFi, NFTs, and governance applications.

Ready to build something random? Deploy this coin flip contract or experiment with advanced patterns in your next NEAR project!

:::note Development Setup
NEAR CLI: 4.0.13
Node.js: 18.19.1
Rust: 1.77.0
near-sdk: 4.1.0
:::
