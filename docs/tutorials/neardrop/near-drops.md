---
id: near-drops
title: NEAR Token Drops
sidebar_label: NEAR Token Drops
description: "Learn how to implement NEAR token drops, the simplest form of token distribution using native NEAR tokens. This section covers creating drops, managing storage costs, and claiming NEAR tokens."
---

import {Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR token drops are the foundation of the NEAR Drop system. They allow you to distribute native NEAR tokens to multiple recipients using a simple and gas-efficient approach. Let's implement this functionality step by step.

---

## Setting Up the Project

First, let's create a new Rust project and set up the basic structure:

```bash
cargo near new near-drop --contract
cd near-drop
```

Add the necessary dependencies to your `Cargo.toml`:

```toml
[package]
name = "near-drop"
version = "0.1.0"
edition = "2021"

[dependencies]
near-sdk = { version = "5.1.0", features = ["unstable"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[profile.release]
codegen-units = 1
opt-level = "z"
lto = true
debug = false
panic = "abort"
overflow-checks = true
```

---

## Contract Structure

Let's start by defining the main contract structure in `src/lib.rs`:

<Github language="rust" start="1" end="35" url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs" />

This structure provides the foundation for managing multiple types of drops efficiently.

---

## Implementing NEAR Token Drops

### Drop Type Definition

Create `src/drop_types.rs` to define our drop types:

```rust
use near_sdk::{AccountId, NearToken, serde::{Deserialize, Serialize}};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum Drop {
    Near(NearDrop),
    // We'll add FT and NFT variants later
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct NearDrop {
    pub amount: NearToken,
    pub counter: u64,
}

impl Drop {
    pub fn get_counter(&self) -> u64 {
        match self {
            Drop::Near(drop) => drop.counter,
        }
    }
    
    pub fn decrement_counter(&mut self) {
        match self {
            Drop::Near(drop) => {
                if drop.counter > 0 {
                    drop.counter -= 1;
                }
            }
        }
    }
}
```

### Creating NEAR Drops

Now let's implement the function to create NEAR token drops. Add this to your `src/lib.rs`:

```rust
use near_sdk::{
    env, near_bindgen, AccountId, NearToken, Promise, PublicKey,
    collections::{LookupMap, UnorderedMap},
    BorshDeserialize, BorshSerialize,
};

// Storage costs (approximate values)
const DROP_STORAGE_COST: NearToken = NearToken::from_millinear(10); // 0.01 NEAR
const KEY_STORAGE_COST: NearToken = NearToken::from_millinear(1);   // 0.001 NEAR  
const ACCESS_KEY_STORAGE_COST: NearToken = NearToken::from_millinear(1); // 0.001 NEAR
const FUNCTION_CALL_ALLOWANCE: NearToken = NearToken::from_millinear(5); // 0.005 NEAR

#[near_bindgen]
impl Contract {
    /// Create a new NEAR token drop
    pub fn create_near_drop(
        &mut self,
        public_keys: Vec<PublicKey>,
        amount_per_drop: NearToken,
    ) -> u64 {
        let deposit = env::attached_deposit();
        let num_keys = public_keys.len() as u64;
        
        // Calculate required deposit
        let required_deposit = self.calculate_near_drop_cost(num_keys, amount_per_drop);
        
        assert!(
            deposit >= required_deposit,
            "Insufficient deposit. Required: {}, Provided: {}",
            required_deposit.as_yoctonear(),
            deposit.as_yoctonear()
        );
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::Near(NearDrop {
            amount: amount_per_drop,
            counter: num_keys,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        
        // Add access keys and map public keys to drop ID
        for public_key in public_keys {
            self.add_access_key_for_drop(&public_key);
            self.drop_id_by_key.insert(&public_key, &drop_id);
        }
        
        env::log_str(&format!(
            "Created NEAR drop {} with {} tokens per claim for {} keys",
            drop_id,
            amount_per_drop.as_yoctonear(),
            num_keys
        ));
        
        drop_id
    }
    
    /// Calculate the cost of creating a NEAR drop
    fn calculate_near_drop_cost(&self, num_keys: u64, amount_per_drop: NearToken) -> NearToken {
        let storage_cost = DROP_STORAGE_COST
            .saturating_add(KEY_STORAGE_COST.saturating_mul(num_keys))
            .saturating_add(ACCESS_KEY_STORAGE_COST.saturating_mul(num_keys));
        
        let total_token_cost = amount_per_drop.saturating_mul(num_keys);
        let total_allowance = FUNCTION_CALL_ALLOWANCE.saturating_mul(num_keys);
        
        storage_cost
            .saturating_add(total_token_cost)
            .saturating_add(total_allowance)
    }
    
    /// Add a function-call access key for claiming drops
    fn add_access_key_for_drop(&self, public_key: &PublicKey) {
        Promise::new(env::current_account_id())
            .add_access_key(
                public_key.clone(),
                FUNCTION_CALL_ALLOWANCE,
                env::current_account_id(),
                "claim_for,create_account_and_claim".to_string(),
            );
    }
}
```

---

## Claiming NEAR Tokens

Now let's implement the claiming functionality. Create `src/claim.rs`:

```rust
use crate::*;

#[near_bindgen]
impl Contract {
    /// Claim a drop to an existing account
    pub fn claim_for(&mut self, account_id: AccountId) {
        let public_key = env::signer_account_pk();
        self.internal_claim(&public_key, &account_id);
    }
    
    /// Create a new account and claim drop to it
    pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Validate that this is a valid subaccount creation
        assert!(
            account_id.as_str().ends_with(&format!(".{}", self.top_level_account)),
            "Account must be a subaccount of {}",
            self.top_level_account
        );
        
        // Create the account first
        let create_promise = Promise::new(account_id.clone())
            .create_account()
            .transfer(NearToken::from_near(1)); // Fund with 1 NEAR for storage
        
        // Then claim the drop
        create_promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(30_000_000_000_000))
                .resolve_account_create(public_key, account_id)
        )
    }
    
    /// Resolve account creation and claim drop
    #[private]
    pub fn resolve_account_create(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
    ) {
        // Check if account creation was successful
        if is_promise_success() {
            self.internal_claim(&public_key, &account_id);
        } else {
            env::panic_str("Failed to create account");
        }
    }
    
    /// Internal claiming logic
    fn internal_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
        // Get the drop ID from the public key
        let drop_id = self.drop_id_by_key.get(public_key)
            .expect("No drop found for this key");
        
        // Get the drop data
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop not found");
        
        // Check if drop is still claimable
        assert!(drop.get_counter() > 0, "All drops have been claimed");
        
        // Process the claim based on drop type
        match &drop {
            Drop::Near(near_drop) => {
                // Transfer NEAR tokens
                Promise::new(receiver_id.clone())
                    .transfer(near_drop.amount);
                
                env::log_str(&format!(
                    "Claimed {} NEAR tokens to {}",
                    near_drop.amount.as_yoctonear(),
                    receiver_id
                ));
            }
        }
        
        // Decrement counter and update drop
        drop.decrement_counter();
        
        if drop.get_counter() == 0 {
            // All drops claimed, clean up
            self.drop_by_id.remove(&drop_id);
        } else {
            // Update the drop with decremented counter
            self.drop_by_id.insert(&drop_id, &drop);
        }
        
        // Remove the public key mapping and access key
        self.drop_id_by_key.remove(public_key);
        
        Promise::new(env::current_account_id())
            .delete_key(public_key.clone());
    }
}

/// Check if the last promise was successful
fn is_promise_success() -> bool {
    env::promise_results_count() == 1 && 
    matches!(env::promise_result(0), PromiseResult::Successful(_))
}
```

---

## Building and Testing

### Build the Contract

```bash
cargo near build
```

### Deploy and Initialize

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account for your contract
  near create-account drop-contract.testnet --useFaucet
  
  # Deploy the contract
  near deploy drop-contract.testnet target/near/near_drop.wasm
  
  # Initialize the contract
  near call drop-contract.testnet new '{"top_level_account": "testnet"}' --accountId drop-contract.testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account for your contract
  near account create-account sponsor-by-faucet-service drop-contract.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  
  # Deploy the contract
  near contract deploy drop-contract.testnet use-file target/near/near_drop.wasm without-init-call network-config testnet sign-with-keychain send
  
  # Initialize the contract
  near contract call-function as-transaction drop-contract.testnet new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Create a NEAR Drop

To create a NEAR drop, you need to generate public keys and calculate the required deposit:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a drop with 2 NEAR tokens per claim for 2 recipients
  near call drop-contract.testnet create_near_drop '{
    "public_keys": [
      "ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", 
      "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"
    ],
    "amount_per_drop": "2000000000000000000000000"
  }' --accountId drop-contract.testnet --deposit 5
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a drop with 2 NEAR tokens per claim for 2 recipients
  near contract call-function as-transaction drop-contract.testnet create_near_drop json-args '{
    "public_keys": [
      "ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", 
      "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"
    ],
    "amount_per_drop": "2000000000000000000000000"
  }' prepaid-gas '100.0 Tgas' attached-deposit '5 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Claim Tokens

Recipients can claim their tokens using the private keys:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Claim to an existing account
  near call drop-contract.testnet claim_for '{"account_id": "recipient.testnet"}' \
    --accountId drop-contract.testnet \
    --keyPair '{"public_key": "ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "private_key": "ed25519:..."}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Claim to an existing account
  near contract call-function as-transaction drop-contract.testnet claim_for json-args '{"account_id": "recipient.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q --signer-private-key ed25519:... send
  ```
  </TabItem>
</Tabs>

---

## Adding View Methods

Let's add some helpful view methods to query drop information:

```rust
#[near_bindgen]
impl Contract {
    /// Get drop information by ID
    pub fn get_drop(&self, drop_id: u64) -> Option<Drop> {
        self.drop_by_id.get(&drop_id)
    }
    
    /// Get drop ID by public key
    pub fn get_drop_id_by_key(&self, public_key: PublicKey) -> Option<u64> {
        self.drop_id_by_key.get(&public_key)
    }
    
    /// Get the total number of drops created
    pub fn get_next_drop_id(&self) -> u64 {
        self.next_drop_id
    }
    
    /// Calculate the cost of creating a NEAR drop (view method)
    pub fn calculate_near_drop_cost_view(
        &self, 
        num_keys: u64, 
        amount_per_drop: NearToken
    ) -> NearToken {
        self.calculate_near_drop_cost(num_keys, amount_per_drop)
    }
}
```

---

## Error Handling and Validation

Add proper error handling throughout your contract:

```rust
// Add these error messages as constants
const ERR_NO_DROP_FOUND: &str = "No drop found for this key";
const ERR_DROP_NOT_FOUND: &str = "Drop not found";
const ERR_ALL_CLAIMED: &str = "All drops have been claimed";
const ERR_INSUFFICIENT_DEPOSIT: &str = "Insufficient deposit";
const ERR_INVALID_ACCOUNT: &str = "Invalid account format";

// Update your claiming function with better error handling
fn internal_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
    let drop_id = self.drop_id_by_key.get(public_key)
        .unwrap_or_else(|| env::panic_str(ERR_NO_DROP_FOUND));
    
    let mut drop = self.drop_by_id.get(&drop_id)
        .unwrap_or_else(|| env::panic_str(ERR_DROP_NOT_FOUND));
    
    assert!(drop.get_counter() > 0, "{}", ERR_ALL_CLAIMED);
    
    // Rest of implementation...
}
```

---

## Key Takeaways

In this section, you've learned:

1. **NEAR Drop Basics**: How to create and manage native NEAR token distributions
2. **Storage Management**: How to calculate and handle storage costs for drops
3. **Access Keys**: Using function-call keys to enable gasless claiming
4. **Account Creation**: Allowing new users to create NEAR accounts when claiming
5. **Security**: Proper validation and error handling for safe operations

The NEAR token drop implementation provides the foundation for more complex drop types. The pattern of creating drops, managing access keys, and handling claims will be consistent across all drop types.

---

## Next Steps

Now that you have a working NEAR token drop system, let's extend it to support fungible token (FT) drops, which will introduce cross-contract calls and additional complexity.

[Continue to Fungible Token Drops →](./ft-drops)

---

:::note Testing Tips
- Test with small amounts first to verify functionality
- Use testnet for all development and testing
- Keep track of your private keys securely during testing
- Monitor gas usage to optimize costs
:::