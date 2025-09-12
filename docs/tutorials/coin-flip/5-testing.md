---
id: testing
title: Testing Your Randomness-Powered Contract
sidebar_label: Comprehensive Testing
description: "Learn how to thoroughly test smart contracts with randomness, including statistical validation and edge case handling."
---

Testing contracts with randomness presents unique challenges. Unlike deterministic functions, we can't predict exact outputs, so we need different testing strategies focused on statistical properties, edge cases, and security.

## Testing Strategy Overview

When testing randomness, we focus on:

1. **Statistical Properties**: Distribution, fairness, and quality
2. **Edge Cases**: Invalid inputs, boundary conditions
3. **State Management**: Points, statistics, and persistence
4. **Security**: Input validation and access control

## Statistical Testing of Randomness

The most important aspect is ensuring our randomness is actually random and fair:

### Rust Statistical Tests

Create `tests/test_statistical.rs`:

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};
use near_workspaces::{Account, Contract};
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
    
    // Chi-square test for fairness
    let expected = total_flips as f64 / 2.0;
    let chi_square = ((*heads_count as f64 - expected).powi(2) / expected) +
                     ((*tails_count as f64 - expected).powi(2) / expected);
    
    assert!(chi_square < 10.0, "Distribution seems unfair (χ² = {})", chi_square);
    
    println!("✅ Distribution test: {} heads, {} tails (χ² = {:.2})", 
             heads_count, tails_count, chi_square);
    
    Ok(())
}

#[tokio::test]
async fn test_player_specific_randomness() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    let bob = worker.dev_create_account().await?;
    let charlie = worker.dev_create_account().await?;
    
    let players = vec![&alice, &bob, &charlie];
    let mut all_results = Vec::new();
    
    for player in &players {
        let outcome: CoinSide = player
            .call(&contract.id(), "simulate_flip")
            .args_json(json!({"player": player.id()}))
            .transact()
            .await?
            .json()?;
        
        all_results.push(outcome);
    }
    
    let heads_count = all_results.iter().filter(|&x| matches!(x, CoinSide::Heads)).count();
    let tails_count = all_results.len() - heads_count;
    
    println!("✅ Player-specific randomness: {} heads, {} tails among {} players", 
             heads_count, tails_count, players.len());
    
    Ok(())
}
```

### JavaScript Statistical Tests

Create `tests/test_statistical.js`:

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

test('fair distribution over many flips', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  const results = [];
  const totalFlips = 100;
  
  for (let i = 0; i < totalFlips; i++) {
    const outcome = await alice.call(contract, 'flipCoin', { guess: 'heads' });
    results.push(outcome === 'heads' ? 1 : 0);
    
    if (i % 10 === 0 && i > 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  const headsCount = results.reduce((sum, val) => sum + val, 0);
  const tailsCount = totalFlips - headsCount;
  
  t.true(headsCount > 0, 'Should have some heads');
  t.true(tailsCount > 0, 'Should have some tails');
  
  // Chi-square test for fairness
  const expected = totalFlips / 2;
  const chiSquare = Math.pow(headsCount - expected, 2) / expected + 
                   Math.pow(tailsCount - expected, 2) / expected;
  
  t.true(chiSquare < 10, `Distribution seems unfair (χ² = ${chiSquare})`);
  
  console.log(`✅ Distribution: ${headsCount} heads, ${tailsCount} tails (χ² = ${chiSquare.toFixed(2)})`);
});

test('different players get independent results', async (t) => {
  const { alice, bob, contract } = t.context.accounts;
  
  const aliceResult = await contract.view('simulateFlip', { player: alice.accountId });
  const bobResult = await contract.view('simulateFlip', { player: bob.accountId });
  
  t.true(['heads', 'tails'].includes(aliceResult));
  t.true(['heads', 'tails'].includes(bobResult));
  
  console.log(`✅ Independent results: Alice=${aliceResult}, Bob=${bobResult}`);
});
```

## Testing Game Logic and State Management

### Rust Game Logic Tests

Create `tests/test_game_logic.rs`:

```rust
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
    
    let mut expected_points = 0u32;
    
    // Play multiple games and track points
    for i in 0..10 {
        let guess = if i % 2 == 0 { CoinSide::Heads } else { CoinSide::Tails };
        
        let outcome: CoinSide = alice
            .call(&contract.id(), "flip_coin")
            .args_json(json!({"guess": guess}))
            .transact()
            .await?
            .json()?;
        
        if guess == outcome {
            expected_points += 1;
        } else {
            expected_points = expected_points.saturating_sub(1);
        }
        
        let actual_points: u32 = alice
            .call(&contract.id(), "get_points")
            .args_json(json!({"player": alice.id()}))
            .transact()
            .await?
            .json()?;
        
        assert_eq!(actual_points, expected_points, 
                   "Points mismatch at game {}", i + 1);
    }
    
    println!("✅ Point system test passed: {} final points", expected_points);
    Ok(())
}

#[tokio::test]
async fn test_multiple_players() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    let alice = worker.dev_create_account().await?;
    let bob = worker.dev_create_account().await?;
    let charlie = worker.dev_create_account().await?;
    
    let players = vec![&alice, &bob, &charlie];
    
    // Each player plays some games
    for (i, player) in players.iter().enumerate() {
        let games_to_play = 3 + i; // Different number of games per player
        
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
    let (total_games, total_players): (u64, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;
    
    assert_eq!(total_games, 3 + 4 + 5); // Sum of games played
    assert_eq!(total_players, 3); // Three players registered
    
    println!("✅ Multiple players: {} games, {} players", total_games, total_players);
    Ok(())
}
```

## Testing Input Validation and Security

### JavaScript Security Tests

```javascript
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
  
  const initialGames = await contract.view('getTotalGames');
  
  // Call view methods multiple times
  for (let i = 0; i < 5; i++) {
    await contract.view('getPoints', { player: alice.accountId });
    await contract.view('getCurrentRandomSeed');
    await contract.view('simulateFlip', { player: alice.accountId });
  }
  
  const finalGames = await contract.view('getTotalGames');
  t.is(initialGames, finalGames);
  
  console.log('✅ View methods confirmed read-only');
});

test('gas usage is reasonable', async (t) => {
  const { alice, contract } = t.context.accounts;
  
  const result = await alice.call(contract, 'flipCoin', { guess: 'heads' });
  
  // Should use reasonable gas (less than 10 TGas for simple operation)
  t.true(result.transaction.gas_used < '10000000000000');
  
  console.log(`✅ Gas usage: ${result.transaction.gas_used}`);
});
```

## Running Tests

### Rust Test Setup

Update `Cargo.toml`:

```toml
[dev-dependencies]
near-workspaces = "0.10.0"
tokio = { version = "1.0", features = ["full"] }
serde_json = "1.0"
```

Create `run_tests.sh`:

```bash
#!/bin/bash
set -e

echo "🧪 Running Coin Flip Contract Tests"
echo "=================================="

# Build contract
echo "📦 Building contract..."
cargo near build

# Run all tests
echo "🔬 Running tests..."
cargo test --test test_statistical
cargo test --test test_game_logic
cargo test --test test_security

echo "✅ All tests passed!"
```

### JavaScript Test Setup

Update `package.json`:

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "ava tests/test_basic.js",
    "test:statistical": "ava tests/test_statistical.js",
    "test:security": "ava tests/test_security.js"
  },
  "devDependencies": {
    "near-workspaces": "^3.4.0",
    "ava": "^5.3.0"
  }
}
```

## Test Results Analysis

When you run these tests, expect output like:

```bash
✅ Distribution test: 52 heads, 48 tails (χ² = 0.16)
✅ Player-specific randomness: 2 heads, 1 tails among 3 players  
✅ Point system test passed: 3 final points
✅ Multiple players: 12 games, 3 players
✅ All invalid inputs properly rejected
✅ View methods confirmed read-only
✅ Gas usage: 2847593000000
```

## Key Testing Principles

### ✅ Essential Tests

1. **Statistical Fairness**: Verify random distribution over many samples
2. **State Consistency**: Points and statistics update correctly
3. **Input Validation**: Reject invalid inputs gracefully
4. **Gas Efficiency**: Operations use reasonable gas amounts
5. **Independence**: Different players get independent randomness

### ❌ Common Testing Mistakes

- **Single Sample Testing**: Testing randomness with only one or two samples
- **Ignoring Edge Cases**: Not testing boundary conditions and invalid inputs
- **State Pollution**: Tests affecting each other's state
- **Deterministic Expectations**: Expecting exact outcomes from random functions

## Summary

Comprehensive testing of randomness-powered contracts requires:

- **Statistical Validation**: Use chi-square tests and large sample sizes
- **State Management Testing**: Verify all game mechanics work correctly
- **Security Testing**: Validate inputs and ensure view methods are read-only
- **Performance Testing**: Monitor gas usage and efficiency

The key is testing statistical properties rather than exact outcomes, ensuring your randomness is fair, secure, and efficient.

## Next Steps

With robust testing in place, you're ready to explore [advanced randomness patterns](6-advanced-patterns.md) for more complex applications like weighted selection, multi-round games, and high-security scenarios.

:::tip Testing Best Practices
- Run statistical tests with large sample sizes (100+ iterations)
- Test with multiple players to verify independence
- Always test input validation and security edge cases
- Monitor gas usage to ensure efficiency
- Use automated testing in your deployment pipeline
:::