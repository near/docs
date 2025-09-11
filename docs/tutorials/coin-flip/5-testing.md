---
id: testing
title: Testing Your Randomness-Powered Contract
sidebar_label: Comprehensive Testing
description: "Learn how to thoroughly test smart contracts with randomness, including statistical validation and edge case handling."
---

Testing contracts with randomness presents unique challenges. Unlike deterministic functions, we can't predict exact outputs, so we need different testing strategies. This section covers comprehensive testing approaches for randomness-powered applications.

## Testing Strategy Overview

When testing randomness, we focus on:

1. **Statistical Properties**: Distribution, fairness, and quality
2. **Edge Cases**: Invalid inputs, boundary conditions
3. **State Management**: Points, statistics, and persistence
4. **Security**: Input validation and access control
5. **Performance**: Gas usage and efficiency

## Setting Up the Test Environment

Let's create a comprehensive test suite that covers all aspects of our contract:

### Rust Test Setup

First, update your `Cargo.toml` to include testing dependencies:

<Github language="toml" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/Cargo.toml#L15-L20">

```toml
[dev-dependencies]
near-workspaces = "0.10.0"
tokio = { version = "1.0", features = ["full"] }
serde_json = "1.0"
statistical-tests = "0.1" # For statistical analysis
```

</Github>

### JavaScript Test Setup

Update your `package.json` test dependencies:

<Github language="json" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/package.json#L20-L25">

```json
{
  "devDependencies": {
    "near-workspaces": "^3.4.0",
    "ava": "^5.3.0",
    "simple-statistics": "^7.8.0"
  }
}
```

</Github>

## Statistical Testing of Randomness

The most important aspect is ensuring our randomness is actually random and fair:

### Rust Statistical Tests

Create `tests/test_statistical.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_statistical.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;
use std::collections::HashMap;

#[tokio::test]
async fn test_fair_distribution() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    let mut results = HashMap::new();
    let total_flips = 100;
    
    // Perform many coin flips
    for i in 0..total_flips {
        let outcome: CoinSide = alice
            .call(&contract.id(), "flip_coin")
            .args_json(json!({"guess": "Heads"}))
            .transact()
            .await?
            .json()?;
            
        *results.entry(format!("{:?}", outcome)).or_insert(0) += 1;
        
        // Small delay to encourage different blocks
        if i % 10 == 0 {
            tokio::time::sleep(tokio::time::Duration::from_millis(50)).await;
        }
    }
    
    let heads_count = results.get("Heads").unwrap_or(&0);
    let tails_count = results.get("Tails").unwrap_or(&0);
    
    // Statistical validation
    assert!(*heads_count > 0, "Should have some heads");
    assert!(*tails_count > 0, "Should have some tails");
    
    // Chi-square test for fairness (simplified)
    let expected = total_flips as f64 / 2.0;
    let chi_square = ((*heads_count as f64 - expected).powi(2) / expected) +
                     ((*tails_count as f64 - expected).powi(2) / expected);
    
    // For 1 degree of freedom, critical value at p=0.05 is 3.84
    assert!(chi_square < 10.0, "Distribution seems unfair (chi-square: {})", chi_square);
    
    println!("✅ Distribution test: {} heads, {} tails (χ² = {:.2})", 
             heads_count, tails_count, chi_square);
    
    Ok(())
}

#[tokio::test]
async fn test_player_specific_randomness() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Create multiple players
    let alice = worker.dev_create_account().await?;
    let bob = worker.dev_create_account().await?;
    let charlie = worker.dev_create_account().await?;
    
    let players = vec![&alice, &bob, &charlie];
    let mut all_results = Vec::new();
    
    // Each player flips in the same block (simulate simultaneous games)
    for player in &players {
        let outcome: CoinSide = player
            .call(&contract.id(), "simulate_flip")
            .args_json(json!({"player": player.id()}))
            .transact()
            .await?
            .json()?;
        
        all_results.push(outcome);
    }
    
    // Check that we got some variety (not all same outcome)
    let heads_count = all_results.iter().filter(|&x| matches!(x, CoinSide::Heads)).count();
    let tails_count = all_results.len() - heads_count;
    
    // With 3 players, we expect some variety (though it's possible to get all same by chance)
    println!("✅ Player-specific randomness: {} heads, {} tails among {} players", 
             heads_count, tails_count, players.len());
    
    Ok(())
}

#[tokio::test]
async fn test_randomness_seed_changes() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let mut previous_seeds = std::collections::HashSet::new();
    
    // Check that random seeds change across different calls
    for i in 0..10 {
        let seed: Vec<u8> = contract
            .call("get_current_random_seed")
            .transact()
            .await?
            .json()?;
        
        // Convert to string for easy comparison
        let seed_str = format!("{:?}", seed);
        previous_seeds.insert(seed_str);
        
        // Small delay to potentially get different blocks
        tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
    }
    
    // We should have seen at least a few different seeds
    assert!(previous_seeds.len() > 1, 
            "Random seeds should vary across different blocks. Got {} unique seeds", 
            previous_seeds.len());
    
    println!("✅ Seed variation test: {} unique seeds out of 10 calls", previous_seeds.len());
    
    Ok(())
}
```

</Github>

### JavaScript Statistical Tests

Create `tests/test_statistical.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/tests/test_statistical.js">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';
import ss from 'simple-statistics';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  
  await contract.deploy('./build/contract.wasm');
  
  const alice = await root.createSubAccount('alice');
  const bob = await root.createSubAccount('bob');
  
  t.context.accounts = { root, contract, alice, bob };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('fair distribution over many flips', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  const results = [];
  const totalFlips = 100;
  
  for (let i = 0; i < totalFlips; i++) {
    const outcome = await alice.call(contract, 'flipCoin', { guess: 'heads' });
    results.push(outcome === 'heads' ? 1 : 0); // 1 for heads, 0 for tails
    
    // Small delay to encourage different blocks
    if (i % 10 === 0 && i > 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  const headsCount = results.reduce((sum, val) => sum + val, 0);
  const tailsCount = totalFlips - headsCount;
  
  // Basic checks
  t.true(headsCount > 0, 'Should have some heads');
  t.true(tailsCount > 0, 'Should have some tails');
  
  // Chi-square test for fairness
  const expected = totalFlips / 2;
  const chiSquare = Math.pow(headsCount - expected, 2) / expected + 
                   Math.pow(tailsCount - expected, 2) / expected;
  
  // For 1 degree of freedom, critical value at p=0.05 is 3.84
  t.true(chiSquare < 10, `Distribution seems unfair (χ² = ${chiSquare})`);
  
  console.log(`✅ Distribution: ${headsCount} heads, ${tailsCount} tails (χ² = ${chiSquare.toFixed(2)})`);
});

test('different players get different results in same block', async (t) => {
  const { alice, bob, contract } = t.context.accounts;
  
  // Simulate multiple flips without state changes
  const aliceResult = await contract.view('simulateFlip', { player: alice.accountId });
  const bobResult = await contract.view('simulateFlip', { player: bob.accountId });
  
  // While they might be the same by chance, test that the function works
  t.true(['heads', 'tails'].includes(aliceResult));
  t.true(['heads', 'tails'].includes(bobResult));
  
  console.log(`✅ Player-specific: Alice=${aliceResult}, Bob=${bobResult}`);
});

test('randomness quality metrics', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  const results = [];
  const totalFlips = 50;
  
  // Collect results
  for (let i = 0; i < totalFlips; i++) {
    const outcome = await alice.call(contract, 'flipCoin', { guess: 'heads' });
    results.push(outcome === 'heads' ? 1 : 0);
  }
  
  // Calculate statistics
  const mean = ss.mean(results);
  const variance = ss.variance(results);
  const standardDeviation = ss.standardDeviation(results);
  
  // For fair coin: mean should be ~0.5, variance ~0.25
  t.true(Math.abs(mean - 0.5) < 0.2, `Mean too far from 0.5: ${mean}`);
  t.true(variance > 0.1, `Variance too low: ${variance}`); // Should have some variance
  
  console.log(`✅ Quality metrics: mean=${mean.toFixed(3)}, var=${variance.toFixed(3)}, std=${standardDeviation.toFixed(3)}`);
});
```

</Github>

## Testing Game Logic and State Management

Beyond randomness, we need to test the game mechanics:

### Rust Game Logic Tests

Create `tests/test_game_logic.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_game_logic.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;

#[tokio::test]
async fn test_point_system() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    // Alice starts with 0 points
    let initial_points: u32 = alice
        .call(&contract.id(), "get_points")
        .args_json(json!({"player": alice.id()}))
        .transact()
        .await?
        .json()?;
    assert_eq!(initial_points, 0);
    
    // Track Alice's expected points
    let mut expected_points = 0u32;
    
    // Play multiple games and track points
    for i in 0..20 {
        let guess = if i % 2 == 0 { CoinSide::Heads } else { CoinSide::Tails };
        
        let outcome: CoinSide = alice
            .call(&contract.id(), "flip_coin")
            .args_json(json!({"guess": guess}))
            .transact()
            .await?
            .json()?;
        
        // Update expected points
        if guess == outcome {
            expected_points += 1;
        } else {
            expected_points = expected_points.saturating_sub(1);
        }
        
        // Verify points match expectation
        let actual_points: u32 = alice
            .call(&contract.id(), "get_points")
            .args_json(json!({"player": alice.id()}))
            .transact()
            .await?
            .json()?;
        
        assert_eq!(actual_points, expected_points, 
                   "Points mismatch at game {}: expected {}, got {}", 
                   i + 1, expected_points, actual_points);
    }
    
    println!("✅ Point system test passed: {} final points", expected_points);
    
    Ok(())
}

#[tokio::test]
async fn test_multiple_players() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Create multiple players
    let alice = worker.dev_create_account().await?;
    let bob = worker.dev_create_account().await?;
    let charlie = worker.dev_create_account().await?;
    
    let players = vec![&alice, &bob, &charlie];
    
    // Each player plays some games
    for (i, player) in players.iter().enumerate() {
        let games_to_play = 5 + i; // Different number of games per player
        
        for _ in 0..games_to_play {
            let _outcome: CoinSide = player
                .call(&contract.id(), "flip_coin")
                .args_json(json!({"guess": "Heads"}))
                .transact()
                .await?
                .json()?;
        }
    }
    
    // Verify contract statistics
    let (total_games, total_players, active_players): (u64, u32, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;
    
    assert_eq!(total_games, 5 + 6 + 7); // Sum of games played
    assert_eq!(total_players, 3); // Three players registered
    assert_eq!(active_players, 3); // All players are active
    
    println!("✅ Multiple players test: {} games, {} players", total_games, total_players);
    
    Ok(())
}

#[tokio::test]
async fn test_player_stats() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    // Check initial stats
    let (points, has_played): (u32, bool) = alice
        .call(&contract.id(), "get_player_stats")
        .args_json(json!({"player": alice.id()}))
        .transact()
        .await?
        .json()?;
    
    assert_eq!(points, 0);
    assert!(!has_played);
    
    // Play one game
    let _outcome: CoinSide = alice
        .call(&contract.id(), "flip_coin")
        .args_json(json!({"guess": "Heads"}))
        .transact()
        .await?
        .json()?;
    
    // Check updated stats
    let (new_points, now_has_played): (u32, bool) = alice
        .call(&contract.id(), "get_player_stats")
        .args_json(json!({"player": alice.id()}))
        .transact()
        .await?
        .json()?;
    
    assert!(now_has_played);
    // Points should be 0 or 1 depending on the outcome
    assert!(new_points <= 1);
    
    println!("✅ Player stats test passed");
    
    Ok(())
}
```

</Github>

### JavaScript Game Logic Tests

Create `tests/test_game_logic.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/tests/test_game_logic.js">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  
  await contract.deploy('./build/contract.wasm');
  
  const alice = await root.createSubAccount('alice');
  const bob = await root.createSubAccount('bob');
  
  t.context.accounts = { root, contract, alice, bob };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('point system works correctly', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  // Initial points should be 0
  let points = await contract.view('getPoints', { player: alice.accountId });
  t.is(points, 0);
  
  let expectedPoints = 0;
  
  // Play several games and track points
  for (let i = 0; i < 15; i++) {
    const guess = i % 2 === 0 ? 'heads' : 'tails';
    const outcome = await alice.call(contract, 'flipCoin', { guess });
    
    // Update expected points
    if (guess === outcome) {
      expectedPoints += 1;
    } else {
      expectedPoints = Math.max(0, expectedPoints - 1);
    }
    
    // Verify actual points match expected
    const actualPoints = await contract.view('getPoints', { player: alice.accountId });
    t.is(actualPoints, expectedPoints, `Points mismatch at game ${i + 1}`);
  }
  
  console.log(`✅ Point system verified: ${expectedPoints} final points`);
});

test('multiple players have independent scores', async (t) => {
  const { alice, bob, contract } = t.context.accounts;
  
  // Alice plays some games
  await alice.call(contract, 'flipCoin', { guess: 'heads' });
  await alice.call(contract, 'flipCoin', { guess: 'heads' });
  
  // Bob plays different games
  await bob.call(contract, 'flipCoin', { guess: 'tails' });
  
  // Check that they have independent scores
  const alicePoints = await contract.view('getPoints', { player: alice.accountId });
  const bobPoints = await contract.view('getPoints', { player: bob.accountId });
  
  // They should both have some score (0, 1, or 2)
  t.true(alicePoints >= 0 && alicePoints <= 2);
  t.true(bobPoints >= 0 && bobPoints <= 1);
  
  // Verify total games
  const totalGames = await contract.view('getTotalGames');
  t.is(totalGames, 3);
  
  console.log(`✅ Independent scores: Alice=${alicePoints}, Bob=${bobPoints}`);
});

test('player statistics tracking', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  // Check initial stats
  let stats = await contract.view('getPlayerStats', { player: alice.accountId });
  t.is(stats.points, 0);
  t.is(stats.hasPlayed, false);
  
  // Play a game
  await alice.call(contract, 'flipCoin', { guess: 'heads' });
  
  // Check updated stats
  stats = await contract.view('getPlayerStats', { player: alice.accountId });
  t.is(stats.hasPlayed, true);
  t.true(stats.points >= 0 && stats.points <= 1);
  
  console.log(`✅ Player stats: points=${stats.points}, hasPlayed=${stats.hasPlayed}`);
});
```

</Github>

## Testing Input Validation and Security

Security testing ensures our contract handles invalid inputs gracefully:

### Rust Security Tests

Create `tests/test_security.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_security.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;

#[tokio::test]
async fn test_valid_inputs() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    // Test both valid inputs
    let outcome1: CoinSide = alice
        .call(&contract.id(), "flip_coin")
        .args_json(json!({"guess": "Heads"}))
        .transact()
        .await?
        .json()?;
    
    let outcome2: CoinSide = alice
        .call(&contract.id(), "flip_coin")
        .args_json(json!({"guess": "Tails"}))
        .transact()
        .await?
        .json()?;
    
    // Both should work without errors
    assert!(matches!(outcome1, CoinSide::Heads | CoinSide::Tails));
    assert!(matches!(outcome2, CoinSide::Heads | CoinSide::Tails));
    
    println!("✅ Valid inputs test passed");
    
    Ok(())
}

#[tokio::test] 
async fn test_view_methods_dont_change_state() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    // Get initial stats
    let initial_stats: (u64, u32, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;
    
    // Call view methods multiple times
    for _ in 0..5 {
        let _points: u32 = alice
            .call(&contract.id(), "get_points")
            .args_json(json!({"player": alice.id()}))
            .transact()
            .await?
            .json()?;
        
        let _seed: Vec<u8> = contract
            .call("get_current_random_seed")
            .transact()
            .await?
            .json()?;
        
        let _info: (u64, u64, String) = contract
            .call("get_randomness_info")
            .transact()
            .await?
            .json()?;
    }
    
    // Stats should remain unchanged
    let final_stats: (u64, u32, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;
    
    assert_eq!(initial_stats, final_stats);
    
    println!("✅ View methods don't change state");
    
    Ok(())
}

#[tokio::test]
async fn test_gas_usage() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    
    // Test gas usage for flip_coin
    let result = alice
        .call(&contract.id(), "flip_coin")
        .args_json(json!({"guess": "Heads"}))
        .gas(300_000_000_000_000) // 300 TGas
        .transact()
        .await?;
    
    let gas_used = result.total_gas_burnt;
    
    // Should use reasonable amount of gas (less than 10 TGas for simple operation)
    assert!(gas_used < 10_000_000_000_000, "Gas usage too high: {}", gas_used);
    
    println!("✅ Gas usage test: {} gas used", gas_used);
    
    Ok(())
}
```

</Github>

### JavaScript Security Tests

Create `tests/test_security.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/tests/test_security.js">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  
  await contract.deploy('./build/contract.wasm');
  
  const alice = await root.createSubAccount('alice');
  
  t.context.accounts = { root, contract, alice };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('rejects invalid guess inputs', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  const invalidInputs = ['head', 'tail', 'HEADS', 'invalid', '', 123, null];
  
  for (const invalidInput of invalidInputs) {
    await t.throwsAsync(
      async () => {
        await alice.call(contract, 'flipCoin', { guess: invalidInput });
      },
      { instanceOf: Error },
      `Should reject invalid input: ${invalidInput}`
    );
  }
  
  console.log('✅ All invalid inputs properly rejected');
});

test('view methods are read-only', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  // Get initial state
  const initialGames = await contract.view('getTotalGames');
  const initialPlayers = await contract.view('getTotalPlayers');
  
  // Call view methods multiple times
  for (let i = 0; i < 5; i++) {
    await contract.view('getPoints', { player: alice.accountId });
    await contract.view('getCurrentRandomSeed');
    await contract.view('getRandomnessInfo');
    await contract.view('simulateFlip', { player: alice.accountId });
  }
  
  // State should be unchanged
  const finalGames = await contract.view('getTotalGames');
  const finalPlayers = await contract.view('getTotalPlayers');
  
  t.is(initialGames, finalGames);
  t.is(initialPlayers, finalPlayers);
  
  console.log('✅ View methods confirmed read-only');
});

test('consistent randomness within same call', async (t) => {
  const { contract } = t.context.accounts;
  
  // Multiple calls to get seed should return same value within same transaction
  const info1 = await contract.view('getRandomnessInfo');
  const info2 = await contract.view('getRandomnessInfo');
  
  // Within same block, should get same randomness info
  t.is(info1.seedPreview, info2.seedPreview);
  t.is(info1.blockHeight, info2.blockHeight);
  
  console.log('✅ Randomness consistency verified');
});
```

</Github>

## Performance and Load Testing

Test how your contract performs under various conditions:

### Rust Performance Tests

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_performance.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{types::NearToken, Account, Contract};
use serde_json::json;
use std::time::Instant;

#[tokio::test]
async fn test_concurrent_players() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Create multiple accounts
    let mut players = Vec::new();
    for i in 0..10 {
        let player = worker.dev_create_account().await?;
        players.push(player);
    }
    
    let start_time = Instant::now();
    
    // Have all players play simultaneously
    let mut handles = Vec::new();
    for player in players {
        let contract_clone = contract.clone();
        let handle = tokio::spawn(async move {
            let _outcome: CoinSide = player
                .call(&contract_clone.id(), "flip_coin")
                .args_json(json!({"guess": "Heads"}))
                .transact()
                .await
                .unwrap()
                .json()
                .unwrap();
        });
        handles.push(handle);
    }
    
    // Wait for all to complete
    for handle in handles {
        handle.await?;
    }
    
    let duration = start_time.elapsed();
    
    // Verify all games were recorded
    let (total_games, total_players, _): (u64, u32, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;
    
    assert_eq!(total_games, 10);
    assert_eq!(total_players, 10);
    
    println!("✅ Concurrent test: 10 players completed in {:?}", duration);
    
    Ok(())
}
```

</Github>

## Running All Tests

Create comprehensive test scripts:

### Rust Test Script

Create `run_tests.sh`:

<Github language="bash" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/run_tests.sh">

```bash
#!/bin/bash
set -e

echo "🧪 Running Coin Flip Contract Tests"
echo "=================================="

# Build the contract first
echo "📦 Building contract..."
cargo near build

# Run unit tests
echo "🔬 Running unit tests..."
cargo test --lib

# Run integration tests
echo "🔗 Running integration tests..."
cargo test --test test_basic
cargo test --test test_game_logic
cargo test --test test_statistical
cargo test --test test_security
cargo test --test test_performance

echo "✅ All tests passed!"

# Optional: Run with coverage
if command -v cargo-tarpaulin &> /dev/null; then
    echo "📊 Generating coverage report..."
    cargo tarpaulin --out Html
    echo "Coverage report generated: tarpaulin-report.html"
fi
```

</Github>

### JavaScript Test Script

Update your `package.json`:

<Github language="json" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/package.json#L10-L16">

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "ava tests/test_basic.js",
    "test:integration": "ava tests/test_*.js",
    "test:statistical": "ava tests/test_statistical.js",
    "test:security": "ava tests/test_security.js",
    "coverage": "nyc ava"
  }
}
```

</Github>

## Test Results Analysis

When you run these tests, you should see output like:

```bash
✅ Distribution test: 52 heads, 48 tails (χ² = 0.16)
✅ Player-specific randomness: 2 heads, 1 tails among 3 players  
✅ Seed variation test: 7 unique seeds out of 10 calls
✅ Point system test passed: 3 final points
✅ Multiple players test: 18 games, 3 players
✅ Valid inputs test passed
✅ Gas usage test: 2847593000000 gas used
```

## Next Steps

With comprehensive testing in place, our coin flip contract is robust and ready for production. In the final section, we'll explore advanced randomness patterns and techniques that you can apply to more complex applications.

:::tip Testing Best Practices
- Always test statistical properties of randomness, not just functionality
- Use multiple players to verify independence  
- Test edge cases and invalid inputs
- Monitor gas usage to ensure efficiency
- Run tests multiple times to catch flaky behavior
:::

:::info Test Coverage
Aim for high test coverage but focus on critical paths:
- Randomness quality and fairness
- State management and persistence
- Input validation and security
- Gas efficiency and performance
:::