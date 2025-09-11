---
id: contract
title: Building the Coin Flip Smart Contract
sidebar_label: Smart Contract Implementation
description: "Implement the core coin flip game logic and contract structure using NEAR's smart contract SDK."
---

Now that we have our development environment ready, let's build the core smart contract for our coin flip game. We'll start with the basic structure and gradually add the randomness functionality.

## Contract Architecture

Our coin flip contract will have:
- **Game Logic**: Handle player guesses and determine outcomes
- **Point System**: Track player scores across games
- **State Management**: Persist player data between transactions
- **Input Validation**: Ensure secure and valid user inputs

## Basic Contract Structure

Let's start with the fundamental contract structure:

### Rust Implementation

Create `src/lib.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs">

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};

// Define the possible coin flip outcomes
#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub enum CoinSide {
    Heads,
    Tails,
}

// Main contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct CoinFlipContract {
    // Store player points
    player_points: UnorderedMap<AccountId, u32>,
    // Track total games played
    total_games: u64,
    // Track total players
    total_players: u32,
}

// Contract implementation
#[near_bindgen]
impl CoinFlipContract {
    /// Initialize the contract
    #[init]
    pub fn new() -> Self {
        Self {
            player_points: UnorderedMap::new(b"p"),
            total_games: 0,
            total_players: 0,
        }
    }

    /// Get current points for a player
    pub fn get_points(&self, player: AccountId) -> u32 {
        self.player_points.get(&player).unwrap_or(0)
    }

    /// Get total games played
    pub fn get_total_games(&self) -> u64 {
        self.total_games
    }

    /// Get total number of players
    pub fn get_total_players(&self) -> u32 {
        self.total_players
    }
}
```

</Github>

### JavaScript Implementation

Create `src/contract.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js">

```javascript
import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';

// Define valid coin sides
const VALID_SIDES = ['heads', 'tails'];

@NearBindgen({})
export class CoinFlipContract {
  constructor() {
    // Initialize player points storage
    this.playerPoints = new UnorderedMap('points');
    // Track game statistics  
    this.totalGames = 0;
    this.totalPlayers = 0;
  }

  @view({})
  getPoints({ player }) {
    return this.playerPoints.get(player, { defaultValue: 0 });
  }

  @view({})
  getTotalGames() {
    return this.totalGames;
  }

  @view({})
  getTotalPlayers() {
    return this.totalPlayers;
  }
}
```

</Github>

## Adding Game Logic Structure

Now let's add the core game logic without randomness first:

### Rust Game Logic

Add these methods to your Rust contract:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L45-L85">

```rust
impl CoinFlipContract {
    /// Main game function - flip coin and update points
    pub fn flip_coin(&mut self, guess: CoinSide) -> CoinSide {
        let player = env::predecessor_account_id();
        
        // We'll add randomness logic here in the next step
        let outcome = CoinSide::Heads; // Placeholder
        
        // Update player statistics
        self.update_player_stats(&player, &guess, &outcome);
        
        // Log the result
        env::log_str(&format!("Player {} guessed {:?}, outcome was {:?}", 
                             player, guess, outcome));
        
        outcome
    }

    /// Internal method to update player statistics
    fn update_player_stats(&mut self, player: &AccountId, guess: &CoinSide, outcome: &CoinSide) {
        let current_points = self.player_points.get(player).unwrap_or(0);
        
        // Check if this is a new player
        if current_points == 0 && !self.player_points.contains_key(player) {
            self.total_players += 1;
        }
        
        // Calculate new points
        let new_points = if guess == outcome {
            current_points + 1 // Correct guess: +1 point
        } else {
            current_points.saturating_sub(1) // Wrong guess: -1 point (min 0)
        };
        
        // Update storage
        self.player_points.insert(player, &new_points);
        self.total_games += 1;
        
        // Log point change
        let change = if guess == outcome { "+1" } else { "-1" };
        env::log_str(&format!("Points: {} → {} ({})", current_points, new_points, change));
    }

    /// Get player's game history summary
    pub fn get_player_stats(&self, player: AccountId) -> (u32, bool) {
        let points = self.player_points.get(&player).unwrap_or(0);
        let has_played = self.player_points.contains_key(&player);
        (points, has_played)
    }
}
```

</Github>

### JavaScript Game Logic

Add these methods to your JavaScript contract:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L25-L65">

```javascript
export class CoinFlipContract {
  @call({})
  flipCoin({ guess }) {
    // Validate input
    if (!VALID_SIDES.includes(guess)) {
      throw new Error(`Invalid guess: must be ${VALID_SIDES.join(' or ')}`);
    }

    const player = near.predecessorAccountId();
    
    // We'll add randomness logic here in the next step
    const outcome = 'heads'; // Placeholder
    
    // Update player statistics
    this.updatePlayerStats(player, guess, outcome);
    
    // Log the result
    near.log(`Player ${player} guessed ${guess}, outcome was ${outcome}`);
    
    return outcome;
  }

  updatePlayerStats(player, guess, outcome) {
    const currentPoints = this.playerPoints.get(player, { defaultValue: 0 });
    
    // Check if this is a new player
    if (currentPoints === 0 && !this.playerPoints.containsKey(player)) {
      this.totalPlayers += 1;
    }
    
    // Calculate new points
    const newPoints = guess === outcome 
      ? currentPoints + 1  // Correct guess: +1 point
      : Math.max(0, currentPoints - 1); // Wrong guess: -1 point (min 0)
    
    // Update storage
    this.playerPoints.set(player, newPoints);
    this.totalGames += 1;
    
    // Log point change
    const change = guess === outcome ? '+1' : '-1';
    near.log(`Points: ${currentPoints} → ${newPoints} (${change})`);
  }

  @view({})
  getPlayerStats({ player }) {
    const points = this.playerPoints.get(player, { defaultValue: 0 });
    const hasPlayed = this.playerPoints.containsKey(player);
    return { points, hasPlayed };
  }
}
```

</Github>

## Input Validation and Security

Let's add robust input validation to prevent common issues:

### Rust Validation

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L90-L110">

```rust
impl CoinFlipContract {
    /// Validate that the caller is not a contract (optional security measure)
    fn validate_caller(&self) {
        let caller = env::predecessor_account_id();
        
        // Simple check: ensure caller ID doesn't contain dots after the first one
        // This helps prevent some contract-to-contract calls
        let parts: Vec<&str> = caller.as_str().split('.').collect();
        if parts.len() > 2 {
            env::panic_str("Direct user accounts only");
        }
    }

    /// Enhanced flip coin with validation
    pub fn flip_coin_secure(&mut self, guess: CoinSide) -> CoinSide {
        // Validate caller (optional)
        // self.validate_caller();
        
        // Additional validation could go here
        // For example: minimum account age, maximum games per block, etc.
        
        self.flip_coin(guess)
    }
}
```

</Github>

## Error Handling

Add comprehensive error handling:

### Rust Error Handling

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L115-L130">

```rust
// Custom error types
#[derive(BorshSerialize, BorshDeserialize)]
pub enum GameError {
    InvalidGuess,
    ContractCallNotAllowed,
    RateLimitExceeded,
}

impl std::fmt::Display for GameError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            GameError::InvalidGuess => write!(f, "Invalid guess: must be Heads or Tails"),
            GameError::ContractCallNotAllowed => write!(f, "Contract-to-contract calls not allowed"),
            GameError::RateLimitExceeded => write!(f, "Too many games played in this block"),
        }
    }
}
```

</Github>

### JavaScript Error Handling

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/src/contract.js#L70-L85">

```javascript
export class CoinFlipContract {
  validateInput(guess) {
    if (typeof guess !== 'string') {
      throw new Error('Guess must be a string');
    }
    
    if (!VALID_SIDES.includes(guess.toLowerCase())) {
      throw new Error(`Invalid guess: must be ${VALID_SIDES.join(' or ')}`);
    }
    
    return guess.toLowerCase();
  }

  @call({})
  flipCoinSecure({ guess }) {
    try {
      const validatedGuess = this.validateInput(guess);
      return this.flipCoin({ guess: validatedGuess });
    } catch (error) {
      near.log(`Error: ${error.message}`);
      throw error;
    }
  }
}
```

</Github>

## Contract State Management

Add methods to manage contract state:

### Rust State Management

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/src/lib.rs#L135-L155">

```rust
impl CoinFlipContract {
    /// Reset a player's points (admin function - could add access control)
    pub fn reset_player_points(&mut self, player: AccountId) {
        let current_points = self.player_points.get(&player).unwrap_or(0);
        if current_points > 0 {
            self.player_points.remove(&player);
            env::log_str(&format!("Reset points for player: {}", player));
        }
    }

    /// Get contract statistics
    pub fn get_contract_stats(&self) -> (u64, u32, u32) {
        let active_players = self.player_points.len();
        (self.total_games, self.total_players, active_players)
    }
}
```

</Github>

## Building and Testing the Contract

Let's build our contract to ensure everything compiles correctly:

### Rust Build

```bash
cargo near build
```

### JavaScript Build

```bash
npm run build
```

## Testing Basic Functionality

Create a simple test to verify our contract structure:

### Rust Test

Create `tests/test_basic.rs`:

<Github language="rust" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/tests/test_basic.rs">

```rust
use coin_flip_contract::{CoinFlipContract, CoinSide};

#[tokio::test]
async fn test_contract_initialization() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&contract_wasm).await?;

    // Test contract initialization
    let stats: (u64, u32, u32) = contract
        .call("get_contract_stats")
        .transact()
        .await?
        .json()?;

    assert_eq!(stats, (0, 0, 0)); // No games, no players initially
    println!("✅ Contract initialized correctly");

    Ok(())
}
```

</Github>

### JavaScript Test

Create `tests/test_basic.js`:

<Github language="javascript" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/tests/test_basic.js">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('contract');
  
  // Deploy the contract
  await contract.deploy('./build/contract.wasm');
  
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown();
});

test('contract initializes with zero stats', async (t) => {
  const { contract } = t.context.accounts;
  
  const totalGames = await contract.view('getTotalGames');
  const totalPlayers = await contract.view('getTotalPlayers');
  
  t.is(totalGames, 0);
  t.is(totalPlayers, 0);
});

test('player starts with zero points', async (t) => {
  const { root, contract } = t.context.accounts;
  
  const points = await contract.view('getPoints', { player: root.accountId });
  t.is(points, 0);
});
```

</Github>

Run the tests:

```bash
# Rust
cargo test

# JavaScript  
npm test
```

## Contract Deployment

Let's deploy our basic contract to testnet:

### Deploy Command

```bash
# Build first
cargo near build  # or npm run build

# Deploy
near contract deploy coinflip.testnet use-file ./target/wasm32-unknown-unknown/release/coin_flip_contract.wasm with-init-call new json-args {} prepaid-gas 100.0 Tgas attached-deposit 0 NEAR network-config testnet sign-with-keychain send
```

### Verify Deployment

```bash
# Check contract stats
near contract call-function as-read-only coinflip.testnet get_contract_stats json-args {} network-config testnet now

# Test getting points for an account
near contract call-function as-read-only coinflip.testnet get_points json-args '{"player": "your-account.testnet"}' network-config testnet now
```

## What We've Built So Far

At this point, we have:

✅ **Contract Structure**: Basic coin flip game framework  
✅ **State Management**: Player points storage and statistics  
✅ **Input Validation**: Secure input handling and error management  
✅ **Game Logic**: Point system for wins/losses  
✅ **Testing Framework**: Basic tests to verify functionality  
✅ **Deployment**: Contract deployed to testnet  

❌ **Missing**: Actual randomness implementation (coming next!)

## Next Steps

Our contract structure is solid, but we're still using a placeholder for the coin flip outcome. In the next section, we'll implement the core randomness logic using NEAR's VRF system to make our coin flips truly random and fair.

The current contract always returns "Heads" - not very exciting for a coin flip game! Let's fix that by diving into the randomness implementation.

:::tip Development Note
Notice how we built the contract structure first before adding randomness. This approach helps you:
- Test the core game logic independently  
- Ensure proper state management
- Validate input handling
- Verify the contract compiles and deploys correctly
:::

:::info Current Contract State
Your contract is now deployed and functional, but deterministic. Players will always get the same result, making it predictable. The randomness implementation in the next section will make each flip truly unpredictable!
:::