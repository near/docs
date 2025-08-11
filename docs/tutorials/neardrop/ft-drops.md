---
id: ft-drops
title: Fungible Token Drops
sidebar_label: FT Drops
description: "Add support for NEP-141 fungible tokens with cross-contract calls and automatic user registration."
---

Time to level up! Let's add support for fungible token drops. This is where things get interesting because we need to interact with other contracts.

---

## Why FT Drops Are Different

Unlike NEAR tokens (which are native), fungible tokens live in separate contracts. This means:

- **Cross-contract calls** to transfer tokens
- **User registration** on FT contracts (for storage)
- **Callback handling** when things go wrong
- **More complex gas management**

But don't worry - we'll handle all of this step by step.

---

## Extend Drop Types

First, let's add FT support to our drop types in `src/drop_types.rs`:

```rust
#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop),  // New!
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub struct FtDrop {
    pub ft_contract: AccountId,
    pub amount: String,  // String to handle large numbers
    pub counter: u64,
}
```

Update the helper methods:
```rust
impl Drop {
    pub fn get_counter(&self) -> u64 {
        match self {
            Drop::Near(drop) => drop.counter,
            Drop::FungibleToken(drop) => drop.counter,
        }
    }
    
    pub fn decrement_counter(&mut self) {
        match self {
            Drop::Near(drop) => drop.counter -= 1,
            Drop::FungibleToken(drop) => drop.counter -= 1,
        }
    }
}
```

---

## Cross-Contract Interface

Create `src/external.rs` to define how we talk to FT contracts:

```rust
use near_sdk::{ext_contract, AccountId, Gas, NearToken};

// Interface for NEP-141 fungible token contracts
#[ext_contract(ext_ft)]
pub trait FungibleToken {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: String, memo: Option<String>);
    fn storage_deposit(&mut self, account_id: Option<AccountId>);
}

// Interface for callbacks to our contract
#[ext_contract(ext_self)]
pub trait DropCallbacks {
    fn ft_transfer_callback(&mut self, public_key: PublicKey, receiver_id: AccountId);
}

// Gas constants
pub const GAS_FOR_FT_TRANSFER: Gas = Gas(20_000_000_000_000);
pub const GAS_FOR_STORAGE_DEPOSIT: Gas = Gas(30_000_000_000_000);
pub const GAS_FOR_CALLBACK: Gas = Gas(20_000_000_000_000);

// Storage deposit for FT registration
pub const STORAGE_DEPOSIT: NearToken = NearToken::from_millinear(125); // 0.125 NEAR
```

---

## Creating FT Drops

Add this to your main contract in `src/lib.rs`:

```rust
use crate::external::*;

#[near_bindgen]
impl Contract {
    /// Create a fungible token drop
    pub fn create_ft_drop(
        &mut self,
        public_keys: Vec<PublicKey>,
        ft_contract: AccountId,
        amount_per_drop: String,
    ) -> u64 {
        let num_keys = public_keys.len() as u64;
        let deposit = env::attached_deposit();
        
        // Validate amount format
        amount_per_drop.parse::<u128>()
            .expect("Invalid amount format");
        
        // Calculate costs
        let storage_cost = DROP_STORAGE_COST + KEY_STORAGE_COST * num_keys;
        let gas_cost = ACCESS_KEY_ALLOWANCE * num_keys;
        let registration_buffer = STORAGE_DEPOSIT * num_keys; // For user registration
        let total_cost = storage_cost + gas_cost + registration_buffer;
        
        assert!(deposit >= total_cost, "Need {} NEAR for FT drop", total_cost.as_near());
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::FungibleToken(FtDrop {
            ft_contract: ft_contract.clone(),
            amount: amount_per_drop.clone(),
            counter: num_keys,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        
        // Add keys
        for public_key in public_keys {
            self.add_claim_key(&public_key, drop_id);
        }
        
        env::log_str(&format!("Created FT drop {} with {} {} tokens per claim", 
                             drop_id, amount_per_drop, ft_contract));
        drop_id
    }
}
```

---

## FT Claiming Logic

The tricky part! Update your `src/claim.rs`:

```rust
impl Contract {
    /// Updated core claiming logic
    fn process_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
        let drop_id = self.drop_id_by_key.get(public_key)
            .expect("No drop found for this key");
        
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop data not found");
        
        assert!(drop.get_counter() > 0, "No claims remaining");
        
        match &drop {
            Drop::Near(near_drop) => {
                // Handle NEAR tokens (same as before)
                Promise::new(receiver_id.clone()).transfer(near_drop.amount);
                self.cleanup_claim(public_key, &mut drop, drop_id);
            }
            Drop::FungibleToken(ft_drop) => {
                // Handle FT tokens with cross-contract call
                self.claim_ft_tokens(
                    public_key.clone(),
                    receiver_id.clone(),
                    ft_drop.ft_contract.clone(),
                    ft_drop.amount.clone(),
                );
                // Note: cleanup happens in callback for FT drops
            }
        }
    }
    
    /// Claim FT tokens with automatic user registration
    fn claim_ft_tokens(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        // First, register the user on the FT contract
        ext_ft::ext(ft_contract.clone())
            .with_static_gas(GAS_FOR_STORAGE_DEPOSIT)
            .with_attached_deposit(STORAGE_DEPOSIT)
            .storage_deposit(Some(receiver_id.clone()))
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_CALLBACK)
                    .ft_registration_callback(public_key, receiver_id, ft_contract, amount)
            );
    }
    
    /// Handle FT registration result
    #[private]
    pub fn ft_registration_callback(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        // Registration succeeded or user was already registered
        // Now transfer the actual tokens
        ext_ft::ext(ft_contract.clone())
            .with_static_gas(GAS_FOR_FT_TRANSFER)
            .ft_transfer(
                receiver_id.clone(),
                amount.clone(),
                Some("NEAR Drop claim".to_string())
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_CALLBACK)
                    .ft_transfer_callback(public_key, receiver_id)
            );
    }
    
    /// Handle FT transfer result
    #[private]
    pub fn ft_transfer_callback(&mut self, public_key: PublicKey, receiver_id: AccountId) {
        let success = env::promise_results_count() == 1 &&
            matches!(env::promise_result(0), PromiseResult::Successful(_));
        
        if success {
            env::log_str(&format!("FT tokens transferred to {}", receiver_id));
            
            // Clean up the claim
            if let Some(drop_id) = self.drop_id_by_key.get(&public_key) {
                if let Some(mut drop) = self.drop_by_id.get(&drop_id) {
                    self.cleanup_claim(&public_key, &mut drop, drop_id);
                }
            }
        } else {
            env::panic_str("FT transfer failed");
        }
    }
    
    /// Clean up after successful claim
    fn cleanup_claim(&mut self, public_key: &PublicKey, drop: &mut Drop, drop_id: u64) {
        drop.decrement_counter();
        
        if drop.get_counter() == 0 {
            self.drop_by_id.remove(&drop_id);
        } else {
            self.drop_by_id.insert(&drop_id, drop);
        }
        
        self.drop_id_by_key.remove(public_key);
        Promise::new(env::current_account_id()).delete_key(public_key.clone());
    }
}
```

---

## Testing FT Drops

You'll need an FT contract to test with. Let's use a simple one:

```bash
# Deploy a test FT contract (you can use the reference implementation)
near create-account test-ft.testnet --useFaucet
near deploy test-ft.testnet ft-contract.wasm

# Initialize with your drop contract as owner
near call test-ft.testnet new_default_meta '{
  "owner_id": "drop-test.testnet",
  "total_supply": "1000000000000000000000000000"
}' --accountId test-ft.testnet
```

Register your drop contract and transfer some tokens to it:

```bash
# Register drop contract
near call test-ft.testnet storage_deposit '{
  "account_id": "drop-test.testnet"
}' --accountId drop-test.testnet --deposit 0.25

# Transfer tokens to drop contract
near call test-ft.testnet ft_transfer '{
  "receiver_id": "drop-test.testnet",
  "amount": "10000000000000000000000000"
}' --accountId drop-test.testnet --depositYocto 1
```

Now create an FT drop:

```bash
# Create FT drop with 1000 tokens per claim
near call drop-test.testnet create_ft_drop '{
  "public_keys": [
    "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8"
  ],
  "ft_contract": "test-ft.testnet",
  "amount_per_drop": "1000000000000000000000000"
}' --accountId drop-test.testnet --deposit 2
```

Claim the FT drop:

```bash
# Claim FT tokens (recipient gets registered automatically)
near call drop-test.testnet claim_for '{
  "account_id": "alice.testnet"
}' --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Check if Alice received the tokens
near view test-ft.testnet ft_balance_of '{"account_id": "alice.testnet"}'
```

---

## Add Helper Functions

```rust
#[near_bindgen]
impl Contract {
    /// Calculate FT drop cost
    pub fn estimate_ft_drop_cost(&self, num_keys: u64) -> NearToken {
        let storage_cost = DROP_STORAGE_COST + KEY_STORAGE_COST * num_keys;
        let gas_cost = ACCESS_KEY_ALLOWANCE * num_keys;
        let registration_buffer = STORAGE_DEPOSIT * num_keys;
        storage_cost + gas_cost + registration_buffer
    }
    
    /// Get FT drop details
    pub fn get_ft_drop_info(&self, drop_id: u64) -> Option<(AccountId, String, u64)> {
        if let Some(Drop::FungibleToken(ft_drop)) = self.drop_by_id.get(&drop_id) {
            Some((ft_drop.ft_contract, ft_drop.amount, ft_drop.counter))
        } else {
            None
        }
    }
}
```

---

## Common Issues & Solutions

**"Storage deposit failed"**
- The FT contract needs sufficient balance to register users
- Make sure you attach enough NEAR when creating the drop

**"FT transfer failed"**  
- Check that the drop contract actually owns the FT tokens
- Verify the FT contract address is correct

**"Gas limit exceeded"**
- FT operations use more gas than NEAR transfers
- Our gas constants should work for most cases

---

## What You've Accomplished

Great work! You now have:

✅ **FT drop creation** with cost calculation
✅ **Cross-contract calls** to FT contracts  
✅ **Automatic user registration** on FT contracts
✅ **Callback handling** for robust error recovery
✅ **Gas optimization** for complex operations

FT drops are significantly more complex than NEAR drops because they involve multiple contracts and asynchronous operations. But you've handled it like a pro!

Next up: NFT drops, which have their own unique challenges around uniqueness and ownership.

[Continue to NFT Drops →](./nft-drops.md)

---

:::tip Pro Tip
Always test FT drops with small amounts first. The cross-contract call flow has more moving parts, so it's good to verify everything works before creating large drops.
:::