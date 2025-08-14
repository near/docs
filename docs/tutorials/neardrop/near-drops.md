---
id: near-drops
title: NEAR Token Drops
sidebar_label: NEAR Token Drops  
description: "Build the foundation: distribute native NEAR tokens using function-call keys for gasless claiming."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Let's start with the simplest drop type: native NEAR tokens. This will teach you the core concepts before we move to more complex token types.

---

## Project Setup

First, create a new Rust project:

```bash
cargo near new near-drop --contract
cd near-drop
```

Update `Cargo.toml`:
```toml
[dependencies]
near-sdk = { version = "5.1.0", features = ["unstable"] }
serde = { version = "1.0", features = ["derive"] }
```

---

## Basic Contract Structure

Let's start with the main contract in `src/lib.rs`:

  <TabItem value="rust" label="🦀 Rust">
```rust
use near_sdk::{
    env, near_bindgen, AccountId, NearToken, Promise, PublicKey,
    collections::{LookupMap, UnorderedMap},
    BorshDeserialize, BorshSerialize,
};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub top_level_account: AccountId,
    pub next_drop_id: u64,
    pub drop_id_by_key: LookupMap<PublicKey, u64>,
    pub drop_by_id: UnorderedMap<u64, Drop>,
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub enum Drop {
    Near(NearDrop),
    // We'll add FT and NFT later
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub struct NearDrop {
    pub amount: NearToken,
    pub counter: u64,
}
```
</TabItem>

---

## Contract Initialization

  <TabItem value="rust" label="🦀 Rust">
```rust
impl Default for Contract {
    fn default() -> Self {
        env::panic_str("Contract must be initialized")
    }
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(top_level_account: AccountId) -> Self {
        Self {
            top_level_account,
            next_drop_id: 0,
            drop_id_by_key: LookupMap::new(b"k"),
            drop_by_id: UnorderedMap::new(b"d"),
        }
    }
}
```
</TabItem>

---

## Creating NEAR Drops

The main function everyone will use:
  <TabItem value="rust" label="🦀 Rust">
```rust
// Storage costs (rough estimates)
const DROP_STORAGE_COST: NearToken = NearToken::from_millinear(10);
const KEY_STORAGE_COST: NearToken = NearToken::from_millinear(1);
const ACCESS_KEY_ALLOWANCE: NearToken = NearToken::from_millinear(5);

#[near_bindgen]
impl Contract {
    /// Create a drop that distributes NEAR tokens
    pub fn create_near_drop(
        &mut self,
        public_keys: Vec<PublicKey>,
        amount_per_drop: NearToken,
    ) -> u64 {
        let num_keys = public_keys.len() as u64;
        let deposit = env::attached_deposit();
        
        // Calculate total cost
        let storage_cost = DROP_STORAGE_COST + KEY_STORAGE_COST * num_keys;
        let token_cost = amount_per_drop * num_keys;
        let gas_cost = ACCESS_KEY_ALLOWANCE * num_keys;
        let total_cost = storage_cost + token_cost + gas_cost;
        
        assert!(deposit >= total_cost, "Need {} NEAR, got {}", 
                total_cost.as_near(), deposit.as_near());
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::Near(NearDrop {
            amount: amount_per_drop,
            counter: num_keys,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        
        // Add function-call keys
        for public_key in public_keys {
            self.add_claim_key(&public_key, drop_id);
        }
        
        env::log_str(&format!("Created drop {} with {} NEAR per claim", 
                             drop_id, amount_per_drop.as_near()));
        drop_id
    }
    
    /// Add a function-call access key for claiming
    fn add_claim_key(&mut self, public_key: &PublicKey, drop_id: u64) {
        // Map key to drop
        self.drop_id_by_key.insert(public_key, &drop_id);
        
        // Add limited access key to contract
        Promise::new(env::current_account_id())
            .add_access_key(
                public_key.clone(),
                ACCESS_KEY_ALLOWANCE,
                env::current_account_id(),
                "claim_for,create_account_and_claim".to_string(),
            );
    }
}
```
</TabItem>

---

## Claiming Tokens

Now for the claiming logic in `src/claim.rs`:

  <TabItem value="rust" label="🦀 Rust">
```rust
use crate::*;

#[near_bindgen]
impl Contract {
    /// Claim tokens to an existing account
    pub fn claim_for(&mut self, account_id: AccountId) {
        let public_key = env::signer_account_pk();
        self.process_claim(&public_key, &account_id);
    }
    
    /// Create new account and claim tokens to it
    pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Validate account format
        assert!(account_id.as_str().ends_with(&format!(".{}", self.top_level_account)),
                "Account must end with .{}", self.top_level_account);
        
        // Create account with 1 NEAR funding
        Promise::new(account_id.clone())
            .create_account()
            .transfer(NearToken::from_near(1))
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(30_000_000_000_000))
                    .finish_account_creation(public_key, account_id)
            )
    }
    
    /// Handle account creation result and claim
    #[private]
    pub fn finish_account_creation(&mut self, public_key: PublicKey, account_id: AccountId) {
        if env::promise_results_count() == 1 {
            match env::promise_result(0) {
                PromiseResult::Successful(_) => {
                    self.process_claim(&public_key, &account_id);
                }
                _ => env::panic_str("Account creation failed"),
            }
        }
    }
    
    /// Core claiming logic
    fn process_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
        // Find the drop
        let drop_id = self.drop_id_by_key.get(public_key)
            .expect("No drop found for this key");
        
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop data not found");
        
        // Check if claims available
        let Drop::Near(near_drop) = &drop else {
            env::panic_str("Wrong drop type");
        };
        
        assert!(near_drop.counter > 0, "No claims remaining");
        
        // Send tokens
        Promise::new(receiver_id.clone()).transfer(near_drop.amount);
        
        // Update drop counter
        if let Drop::Near(ref mut near_drop) = drop {
            near_drop.counter -= 1;
            
            if near_drop.counter == 0 {
                // All claimed, clean up
                self.drop_by_id.remove(&drop_id);
            } else {
                // Update remaining counter
                self.drop_by_id.insert(&drop_id, &drop);
            }
        }
        
        // Remove used key
        self.drop_id_by_key.remove(public_key);
        Promise::new(env::current_account_id()).delete_key(public_key.clone());
        
        env::log_str(&format!("Claimed {} NEAR to {}", 
                             near_drop.amount.as_near(), receiver_id));
    }
}
```
</TabItem>

---

## Helper Functions

Add some useful view functions:

  <TabItem value="rust" label="🦀 Rust">
```rust
#[near_bindgen]
impl Contract {
    /// Get drop information
    pub fn get_drop(&self, drop_id: u64) -> Option<Drop> {
        self.drop_by_id.get(&drop_id)
    }
    
    /// Check what drop a key can claim
    pub fn get_drop_for_key(&self, public_key: PublicKey) -> Option<u64> {
        self.drop_id_by_key.get(&public_key)
    }
    
    /// Calculate cost for creating a NEAR drop
    pub fn estimate_near_drop_cost(&self, num_keys: u64, amount_per_drop: NearToken) -> NearToken {
        let storage_cost = DROP_STORAGE_COST + KEY_STORAGE_COST * num_keys;
        let token_cost = amount_per_drop * num_keys;
        let gas_cost = ACCESS_KEY_ALLOWANCE * num_keys;
        storage_cost + token_cost + gas_cost
    }
}
```
</TabItem>

---

## Build and Test

```bash
# Build the contract
cargo near build

# Create test account
near create-account drop-test.testnet --useFaucet

# Deploy
near deploy drop-test.testnet target/near/near_drop.wasm

# Initialize
near call drop-test.testnet new '{"top_level_account": "testnet"}' --accountId drop-test.testnet
```

---

## Create Your First Drop

```bash
# Create a drop with 2 NEAR per claim for 2 recipients
near call drop-test.testnet create_near_drop '{
  "public_keys": [
    "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
    "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"
  ],
  "amount_per_drop": "2000000000000000000000000"
}' --accountId drop-test.testnet --deposit 5
```

---

## Claim Tokens

Recipients can now claim using their private keys:

```bash
# Claim to existing account
near call drop-test.testnet claim_for '{"account_id": "alice.testnet"}' \
  --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Or create new account and claim
near call drop-test.testnet create_account_and_claim '{"account_id": "bob-new.testnet"}' \
  --accountId drop-test.testnet \
  --keyPair <private-key-here>
```

---

## What You've Built

Congratulations! You now have:

✅ **NEAR token distribution system**
✅ **Gasless claiming** with function-call keys  
✅ **Account creation** for new users
✅ **Automatic cleanup** after claims
✅ **Cost estimation** for creating drops

The foundation is solid. Next, let's add support for fungible tokens, which involves cross-contract calls and is a bit more complex.

[Continue to Fungible Token Drops →](./ft-drops.md)

---

:::tip Quick Test
Try creating a small drop and claiming it yourself to make sure everything works before moving on!
:::