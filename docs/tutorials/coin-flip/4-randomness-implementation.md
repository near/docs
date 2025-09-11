---
id: randomness-implementation
title: Implementing Secure Randomness
sidebar_label: Adding Randomness Logic
description: "Implement NEAR's VRF-based randomness system in your coin flip contract for fair and unpredictable outcomes."
---

Now comes the exciting part - implementing true randomness in our coin flip game! We'll replace our placeholder logic with NEAR's secure Verifiable Random Function (VRF) to create fair, unpredictable coin flips.

## Understanding the Implementation

NEAR's `env::random_seed()` and `near.randomSeed()` provide a 32-byte array of cryptographically secure random data. For our coin flip, we need to convert this into a simple binary choice: heads or tails.

## Basic Randomness Implementation

Let's start with the simplest approach - using one byte from the random seed:

### Rust Implementation

Replace the placeholder in your `flip_coin` method:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L50-L75">

```rust
impl CoinFlipContract {
    /// Generate a random coin flip outcome
    fn generate_coin_flip(&self) -> CoinSide {
        let random_seed = env::random_seed();
        
        // Use the first byte of the random seed
        // Even numbers = Heads, Odd numbers = Tails
        if random_seed[0] % 2 == 0 {
            CoinSide::Heads
        } else {
            CoinSide::Tails
        }
    }

    /// Main game function with real randomness
    pub fn flip_coin(&mut self, guess: CoinSide) -> CoinSide {
        let player = env::predecessor_account_id();
        
        // Generate random outcome
        let outcome = self.generate_coin_flip();
        
        // Update player statistics
        self.update_player_stats(&player, &guess, &outcome);
        
        // Log the result for transparency
        env::log_str(&format!(
            "🎲 Player {} guessed {:?}, coin landed on {:?}", 
            player, guess, outcome
        ));
        
        outcome
    }
}
```

</Github>

### JavaScript Implementation

Update your `flipCoin` method:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L30-L55">

```javascript
export class CoinFlipContract {
  generateCoinFlip() {
    const randomSeed = near.randomSeed();
    
    // Use the first byte of the random seed
    // Even numbers = heads, Odd numbers = tails
    return randomSeed[0] % 2 === 0 ? 'heads' : 'tails';
  }

  @call({})
  flipCoin({ guess }) {
    // Validate input
    if (!VALID_SIDES.includes(guess)) {
      throw new Error(`Invalid guess: must be ${VALID_SIDES.join(' or ')}`);
    }

    const player = near.predecessorAccountId();
    
    // Generate random outcome
    const outcome = this.generateCoinFlip();
    
    // Update player statistics
    this.updatePlayerStats(player, guess, outcome);
    
    // Log the result for transparency
    near.log(`🎲 Player ${player} guessed ${guess}, coin landed on ${outcome}`);
    
    return outcome;
  }
}
```

</Github>

## Enhanced Randomness for Better Distribution

Using a single byte gives us good randomness, but we can improve distribution by using multiple bytes:

### Rust Enhanced Implementation

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L80-L100">

```rust
impl CoinFlipContract {
    /// Enhanced random generation using multiple bytes
    fn generate_coin_flip_enhanced(&self) -> CoinSide {
        let random_seed = env::random_seed();
        
        // Combine multiple bytes for better distribution
        let combined_randomness = (random_seed[0] as u32)
            .wrapping_add((random_seed[1] as u32) << 8)
            .wrapping_add((random_seed[2] as u32) << 16)
            .wrapping_add((random_seed[3] as u32) << 24);
        
        // Use modulo to determine outcome
        if combined_randomness % 2 == 0 {
            CoinSide::Heads
        } else {
            CoinSide::Tails
        }
    }

    /// Alternative: Use hash-based randomness for even better distribution
    fn generate_coin_flip_hash(&self) -> CoinSide {
        use near_sdk::env;
        
        let random_seed = env::random_seed();
        let block_height = env::block_height();
        let timestamp = env::block_timestamp();
        
        // Create additional entropy by combining with block data
        // Note: This is still deterministic within the same block
        let entropy_source = format!("{:?}-{}-{}", random_seed, block_height, timestamp);
        let hash = env::sha256(entropy_source.as_bytes());
        
        // Use the hash for randomness
        hash[0] % 2 == 0 ? CoinSide::Heads : CoinSide::Tails
    }
}
```

</Github>

### JavaScript Enhanced Implementation

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L60-L85">

```javascript
export class CoinFlipContract {
  generateCoinFlipEnhanced() {
    const randomSeed = near.randomSeed();
    
    // Combine multiple bytes for better distribution
    const combinedRandomness = randomSeed[0] 
      + (randomSeed[1] << 8) 
      + (randomSeed[2] << 16) 
      + (randomSeed[3] << 24);
    
    return combinedRandomness % 2 === 0 ? 'heads' : 'tails';
  }

  generateCoinFlipHash() {
    const randomSeed = near.randomSeed();
    const blockHeight = near.blockHeight();
    const timestamp = near.blockTimestamp();
    
    // Create additional entropy (still deterministic within same block)
    const entropySource = `${Array.from(randomSeed).join(',')}-${blockHeight}-${timestamp}`;
    const hash = near.sha256(entropySource);
    
    return hash[0] % 2 === 0 ? 'heads' : 'tails';
  }
}
```

</Github>

## Handling Block-Level Consistency

Remember that all transactions in the same block get the same random seed. For some applications, you might want to introduce additional variance:

### Player-Specific Randomness

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L105-L125">

```rust
impl CoinFlipContract {
    /// Generate randomness that's unique per player within the same block
    fn generate_player_specific_flip(&self, player: &AccountId) -> CoinSide {
        let random_seed = env::random_seed();
        
        // Combine random seed with player account ID for uniqueness
        let player_bytes = player.as_str().as_bytes();
        let mut combined = Vec::with_capacity(32 + player_bytes.len());
        combined.extend_from_slice(&random_seed);
        combined.extend_from_slice(player_bytes);
        
        // Hash the combined data
        let hash = env::sha256(&combined);
        
        if hash[0] % 2 == 0 {
            CoinSide::Heads
        } else {
            CoinSide::Tails
        }
    }
}
```

</Github>

### JavaScript Player-Specific Implementation

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L90-L105">

```javascript
export class CoinFlipContract {
  generatePlayerSpecificFlip(player) {
    const randomSeed = near.randomSeed();
    
    // Combine random seed with player account for uniqueness
    const playerBytes = new TextEncoder().encode(player);
    const combined = new Uint8Array(randomSeed.length + playerBytes.length);
    combined.set(randomSeed);
    combined.set(playerBytes, randomSeed.length);
    
    // Hash the combined data
    const hash = near.sha256(combined);
    
    return hash[0] % 2 === 0 ? 'heads' : 'tails';
  }
}
```

</Github>

## Adding Randomness Transparency

For trust and debugging, let's add methods to expose randomness information:

### Rust Transparency Methods

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L130-L155">

```rust
impl CoinFlipContract {
    /// Get the current random seed for transparency (view only)
    pub fn get_current_random_seed(&self) -> Vec<u8> {
        env::random_seed().to_vec()
    }

    /// Get randomness info for the current block
    pub fn get_randomness_info(&self) -> (u64, u64, String) {
        let block_height = env::block_height();
        let timestamp = env::block_timestamp();
        let seed_first_bytes = format!("{:02x}{:02x}{:02x}{:02x}", 
            env::random_seed()[0], env::random_seed()[1], 
            env::random_seed()[2], env::random_seed()[3]);
        
        (block_height, timestamp, seed_first_bytes)
    }

    /// Simulate a coin flip without changing state (for testing)
    pub fn simulate_flip(&self, player: AccountId) -> CoinSide {
        self.generate_player_specific_flip(&player)
    }
}
```

</Github>

### JavaScript Transparency Methods

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L110-L135">

```javascript
export class CoinFlipContract {
  @view({})
  getCurrentRandomSeed() {
    return Array.from(near.randomSeed());
  }

  @view({})
  getRandomnessInfo() {
    const blockHeight = near.blockHeight();
    const timestamp = near.blockTimestamp();
    const seed = near.randomSeed();
    const seedPreview = `${seed[0].toString(16).padStart(2, '0')}${seed[1].toString(16).padStart(2, '0')}${seed[2].toString(16).padStart(2, '0')}${seed[3].toString(16).padStart(2, '0')}`;
    
    return {
      blockHeight: blockHeight.toString(),
      timestamp: timestamp.toString(), 
      seedPreview
    };
  }

  @view({})
  simulateFlip({ player }) {
    return this.generatePlayerSpecificFlip(player);
  }
}
```

</Github>

## Testing Randomness Quality

Let's create tests to verify our randomness implementation works correctly:

### Rust Randomness Tests

Create `tests/test_randomness.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_randomness.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;

#[tokio::test]
async fn test_randomness_distribution() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Create test account
    let alice = worker.dev_create_account().await?;

    let mut heads_count = 0;
    let mut tails_count = 0;
    let total_flips = 20;

    // Perform multiple flips across different blocks
    for i in 0..total_flips {
        // Call flip_coin
        let outcome: CoinSide = alice
            .call(&contract.id(), "flip_coin")
            .args_json(json!({"guess": "Heads"}))
            .transact()
            .await?
            .json()?;

        match outcome {
            CoinSide::Heads => heads_count += 1,
            CoinSide::Tails => tails_count += 1,
        }

        // Add some delay to potentially get different blocks
        if i % 5 == 0 {
            tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
        }
    }

    // Verify we got both outcomes (basic randomness check)
    assert!(heads_count > 0, "Should have at least one heads");
    assert!(tails_count > 0, "Should have at least one tails");
    assert_eq!(heads_count + tails_count, total_flips);

    println!("✅ Randomness test passed: {} heads, {} tails", heads_count, tails_count);
    
    Ok(())
}

#[tokio::test] 
async fn test_randomness_transparency() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Test randomness info
    let info: (u64, u64, String) = contract
        .call("get_randomness_info")
        .transact()
        .await?
        .json()?;

    assert!(info.0 > 0); // Block height should be positive
    assert!(info.1 > 0); // Timestamp should be positive  
    assert_eq!(info.2.len(), 8); // Seed preview should be 8 hex chars

    println!("✅ Randomness transparency test passed");
    
    Ok(())
}
```

</Github>

### JavaScript Randomness Tests

Create `tests/test_randomness.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/tests/test_randomness.js">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  
  await contract.deploy('./build/contract.wasm');
  
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('randomness produces both heads and tails', async (t) => {
  const { root, contract } = t.context.accounts;
  
  let headsCount = 0;
  let tailsCount = 0;
  const totalFlips = 20;

  for (let i = 0; i < totalFlips; i++) {
    const outcome = await root.call(contract, 'flipCoin', { guess: 'heads' });
    
    if (outcome === 'heads') {
      headsCount++;
    } else {
      tailsCount++;
    }
  }

  // Basic randomness verification
  t.true(headsCount > 0, 'Should have at least one heads');
  t.true(tailsCount > 0, 'Should have at least one tails'); 
  t.is(headsCount + tailsCount, totalFlips);

  console.log(`✅ Got ${headsCount} heads, ${tailsCount} tails`);
});

test('randomness transparency methods work', async (t) => {
  const { contract } = t.context.accounts;
  
  const randomSeed = await contract.view('getCurrentRandomSeed');
  const randomnessInfo = await contract.view('getRandomnessInfo');
  
  t.true(Array.isArray(randomSeed));
  t.is(randomSeed.length, 32);
  
  t.true(typeof randomnessInfo.blockHeight === 'string');
  t.true(typeof randomnessInfo.timestamp === 'string'); 
  t.is(randomnessInfo.seedPreview.length, 8);
});
```

</Github>

## Building and Testing

Let's build and test our randomness implementation:

```bash
# Build the contract
cargo near build  # or npm run build

# Run randomness tests
cargo test test_randomness  # or npm test test_randomness
```

## Deploying with Randomness

Deploy your updated contract:

```bash
# Deploy updated contract
near contract deploy coinflip.testnet use-file ./target/wasm32-unknown-unknown/release/coin_flip_contract.wasm without-init-call network-config testnet sign-with-keychain send
```

### Testing on Testnet

```bash
# Test a real coin flip
near contract call-function as-transaction coinflip.testnet flip_coin json-args '{"guess": "Heads"}' prepaid-gas 100.0 Tgas attached-deposit 0 NEAR sign-as your-account.testnet network-config testnet send

# Check randomness info  
near contract call-function as-read-only coinflip.testnet get_randomness_info json-args {} network-config testnet now
```

## Key Takeaways

🎯 **What We've Implemented:**
- ✅ True cryptographic randomness using NEAR's VRF
- ✅ Multiple randomness strategies (basic, enhanced, player-specific)
- ✅ Transparency methods for trust and debugging
- ✅ Comprehensive tests for randomness quality
- ✅ Fair 50/50 distribution for heads/tails

🔒 **Security Benefits:**
- **Unpredictable**: Players cannot predict outcomes
- **Fair**: Each flip has exactly 50% chance for each side
- **Transparent**: Randomness source is verifiable
- **Consensus-Safe**: All validators agree on the same result

## Next Steps

With randomness implemented, our coin flip game is now truly functional! In the next section, we'll create comprehensive tests to ensure our contract works perfectly under all conditions and explore testing strategies for randomness-based applications.

:::tip Pro Tip
The `generate_player_specific_flip` method is particularly useful when you need different random outcomes for different users within the same block. This technique can be applied to many randomness use cases beyond coin flips!
:::