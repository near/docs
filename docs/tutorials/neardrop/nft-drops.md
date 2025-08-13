---
id: nft-drops
title: NFT Drops
sidebar_label: NFT Drops
description: "Distribute unique NFTs with one-time claims and ownership verification."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NFT drops are special because each NFT is unique. Unlike NEAR or FT drops where multiple people can get the same amount, each NFT can only be claimed once.

---

## What Makes NFT Drops Different

- **One NFT = One Key**: Each NFT gets exactly one private key
- **Ownership Matters**: The contract must own the NFT before creating the drop
- **No Duplicates**: Once claimed, that specific NFT is gone forever

---

## Add NFT Support

First, extend your drop types in `src/drop_types.rs`:
<TabItem value="rust" label="🦀 Rust">
```rust
#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop),
    NonFungibleToken(NftDrop),  // New!
}

#[derive(BorshDeserialize, BorshSerialize, Clone)]
pub struct NftDrop {
    pub nft_contract: AccountId,
    pub token_id: String,
    pub counter: u64,  // Always 1 for NFTs
}
```
</TabItem>

Update the helper methods:
<TabItem value="rust" label="🦀 Rust">
```rust
impl Drop {
    pub fn get_counter(&self) -> u64 {
        match self {
            Drop::Near(drop) => drop.counter,
            Drop::FungibleToken(drop) => drop.counter,
            Drop::NonFungibleToken(drop) => drop.counter,
        }
    }
    
    pub fn decrement_counter(&mut self) {
        match self {
            Drop::Near(drop) => drop.counter -= 1,
            Drop::FungibleToken(drop) => drop.counter -= 1,
            Drop::NonFungibleToken(drop) => drop.counter -= 1,
        }
    }
}
```
</TabItem>

---

## NFT Cross-Contract Interface

Add NFT methods to `src/external.rs`:

<TabItem value="rust" label="🦀 Rust">
```rust
// Interface for NEP-171 NFT contracts
#[ext_contract(ext_nft)]
pub trait NonFungibleToken {
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: String,
        memo: Option<String>,
    );
    
    fn nft_token(&self, token_id: String) -> Option<JsonToken>;
}

#[derive(near_sdk::serde::Serialize, near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonToken {
    pub token_id: String,
    pub owner_id: AccountId,
}

// Gas for NFT operations
pub const GAS_FOR_NFT_TRANSFER: Gas = Gas(30_000_000_000_000);
pub const GAS_FOR_NFT_CALLBACK: Gas = Gas(20_000_000_000_000);
```
</TabItem>

---

## Creating NFT Drops

Add this to your main contract:

<TabItem value="rust" label="🦀 Rust">
```rust
#[near_bindgen]
impl Contract {
    /// Create an NFT drop (only 1 key since NFTs are unique)
    pub fn create_nft_drop(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> u64 {
        let deposit = env::attached_deposit();
        
        // Calculate cost (only 1 key for NFTs)
        let cost = DROP_STORAGE_COST + KEY_STORAGE_COST + ACCESS_KEY_ALLOWANCE;
        assert!(deposit >= cost, "Need {} NEAR for NFT drop", cost.as_near());
        
        // Validate token ID
        assert!(!token_id.is_empty(), "Token ID cannot be empty");
        assert!(token_id.len() <= 64, "Token ID too long");
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::NonFungibleToken(NftDrop {
            nft_contract: nft_contract.clone(),
            token_id: token_id.clone(),
            counter: 1, // Always 1 for NFTs
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        self.add_claim_key(&public_key, drop_id);
        
        env::log_str(&format!("Created NFT drop {} for token {}", drop_id, token_id));
        drop_id
    }
    
    /// Create multiple NFT drops at once
    pub fn create_nft_drops_batch(
        &mut self,
        nft_drops: Vec<NftDropConfig>,
    ) -> Vec<u64> {
        let mut drop_ids = Vec::new();
        let total_cost = (DROP_STORAGE_COST + KEY_STORAGE_COST + ACCESS_KEY_ALLOWANCE) 
            * nft_drops.len() as u64;
        
        assert!(env::attached_deposit() >= total_cost, "Insufficient deposit for batch");
        
        for config in nft_drops {
            let drop_id = self.create_single_nft_drop(
                config.public_key,
                config.nft_contract,
                config.token_id,
            );
            drop_ids.push(drop_id);
        }
        
        drop_ids
    }
    
    fn create_single_nft_drop(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> u64 {
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::NonFungibleToken(NftDrop {
            nft_contract, token_id, counter: 1,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        self.add_claim_key(&public_key, drop_id);
        drop_id
    }
}

#[derive(near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct NftDropConfig {
    pub public_key: PublicKey,
    pub nft_contract: AccountId,
    pub token_id: String,
}
```
</TabItem>

---

## NFT Claiming Logic

Update your claiming logic in `src/claim.rs`:

<TabItem value="rust" label="🦀 Rust">
```rust
impl Contract {
    fn process_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
        let drop_id = self.drop_id_by_key.get(public_key)
            .expect("No drop found for this key");
        
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop data not found");
        
        assert!(drop.get_counter() > 0, "Drop already claimed");
        
        match &drop {
            Drop::Near(near_drop) => {
                Promise::new(receiver_id.clone()).transfer(near_drop.amount);
                self.cleanup_claim(public_key, &mut drop, drop_id);
            }
            Drop::FungibleToken(ft_drop) => {
                self.claim_ft_tokens(/* ... */);
            }
            Drop::NonFungibleToken(nft_drop) => {
                // Transfer NFT with cross-contract call
                self.claim_nft(
                    public_key.clone(),
                    receiver_id.clone(),
                    nft_drop.nft_contract.clone(),
                    nft_drop.token_id.clone(),
                );
            }
        }
    }
    
    /// Claim NFT with cross-contract call
    fn claim_nft(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
    ) {
        ext_nft::ext(nft_contract.clone())
            .with_static_gas(GAS_FOR_NFT_TRANSFER)
            .nft_transfer(
                receiver_id.clone(),
                token_id.clone(),
                Some("NEAR Drop claim".to_string()),
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_NFT_CALLBACK)
                    .nft_transfer_callback(public_key, receiver_id, token_id)
            );
    }
    
    /// Handle NFT transfer result
    #[private]
    pub fn nft_transfer_callback(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        token_id: String,
    ) {
        let success = env::promise_results_count() == 1 &&
            matches!(env::promise_result(0), PromiseResult::Successful(_));
        
        if success {
            env::log_str(&format!("NFT {} transferred to {}", token_id, receiver_id));
            
            // Clean up the claim
            if let Some(drop_id) = self.drop_id_by_key.get(&public_key) {
                // For NFTs, always remove completely since they're unique
                self.drop_by_id.remove(&drop_id);
                self.drop_id_by_key.remove(&public_key);
                Promise::new(env::current_account_id()).delete_key(public_key);
            }
        } else {
            env::panic_str("NFT transfer failed - contract may not own this NFT");
        }
    }
}
```
</TabItem>

---

## Testing NFT Drops

You'll need an NFT contract for testing:

```bash
# Deploy test NFT contract
near create-account test-nft.testnet --useFaucet
near deploy test-nft.testnet nft-contract.wasm

# Initialize
near call test-nft.testnet new_default_meta '{
  "owner_id": "drop-test.testnet"
}' --accountId test-nft.testnet

# Mint NFT to your drop contract
near call test-nft.testnet nft_mint '{
  "token_id": "unique-nft-001",
  "metadata": {
    "title": "Exclusive Drop NFT",
    "description": "A unique NFT from NEAR Drop"
  },
  "receiver_id": "drop-test.testnet"
}' --accountId drop-test.testnet --deposit 0.1
```

Create and test the NFT drop:

```bash
# Create NFT drop
near call drop-test.testnet create_nft_drop '{
  "public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
  "nft_contract": "test-nft.testnet",
  "token_id": "unique-nft-001"
}' --accountId drop-test.testnet --deposit 0.1

# Claim the NFT
near call drop-test.testnet claim_for '{
  "account_id": "alice.testnet"
}' --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Verify Alice owns the NFT
near view test-nft.testnet nft_token '{"token_id": "unique-nft-001"}'
```

---

## Helper Functions

Add some useful view methods:

<TabItem value="rust" label="🦀 Rust">
```rust
#[near_bindgen]
impl Contract {
    /// Get NFT drop details
    pub fn get_nft_drop_info(&self, drop_id: u64) -> Option<(AccountId, String, bool)> {
        if let Some(Drop::NonFungibleToken(nft_drop)) = self.drop_by_id.get(&drop_id) {
            Some((
                nft_drop.nft_contract,
                nft_drop.token_id,
                nft_drop.counter == 0, // is_claimed
            ))
        } else {
            None
        }
    }
    
    /// Calculate NFT drop cost
    pub fn estimate_nft_drop_cost(&self) -> NearToken {
        DROP_STORAGE_COST + KEY_STORAGE_COST + ACCESS_KEY_ALLOWANCE
    }
    
    /// Check if NFT drop exists for a token
    pub fn nft_drop_exists(&self, nft_contract: AccountId, token_id: String) -> bool {
        for drop_id in 0..self.next_drop_id {
            if let Some(Drop::NonFungibleToken(nft_drop)) = self.drop_by_id.get(&drop_id) {
                if nft_drop.nft_contract == nft_contract && 
                   nft_drop.token_id == token_id && 
                   nft_drop.counter > 0 {
                    return true;
                }
            }
        }
        false
    }
}
```
</TabItem>

---

## Important Notes

**⚠️ Ownership is Critical**
- The drop contract MUST own the NFT before creating the drop
- If the contract doesn't own the NFT, claiming will fail
- Always verify ownership before creating drops

**🔒 Security Considerations**
- Each NFT drop supports exactly 1 key (since NFTs are unique)
- Once claimed, the NFT drop is completely removed
- No possibility of double-claiming the same NFT

**💰 Cost Structure**
- NFT drops are cheaper than multi-key drops (only 1 key)
- No need for token funding (just storage + gas costs)
- Total cost: ~0.017 NEAR per NFT drop

---

## What You've Accomplished

Great work! You now have complete NFT drop support:

✅ **Unique NFT distribution** with proper ownership validation
✅ **Cross-contract NFT transfers** with error handling
✅ **Batch NFT drop creation** for collections
✅ **Complete cleanup** after claims (no leftover data)
✅ **Security measures** to prevent double-claiming

Your NEAR Drop system now supports all three major token types: NEAR, FTs, and NFTs!

---

## Next Steps

Let's explore how function-call access keys work in detail to understand the gasless claiming mechanism.

[Continue to Access Key Management →](./access-keys.md)

---

:::tip NFT Drop Pro Tips
- Always test with a small NFT collection first
- Verify the drop contract owns all NFTs before creating drops  
- Consider using batch creation for large NFT collections
- NFT drops are perfect for event tickets, collectibles, and exclusive content
:::