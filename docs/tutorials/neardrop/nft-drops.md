---
id: nft-drops
title: Non-Fungible Token Drops
sidebar_label: NFT Drops
description: "Learn how to implement NFT drops using NEP-171 standard tokens. This section covers unique token distribution, cross-contract NFT transfers, and ownership management patterns."
---

import {Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NFT drops represent the most unique form of token distribution in the NEAR Drop system. Unlike NEAR or FT drops where multiple recipients can receive the same amount, NFT drops distribute unique, one-of-a-kind tokens. This creates interesting patterns around scarcity, ownership, and distribution mechanics.

---

## Understanding NFT Drop Requirements

NFT drops introduce several unique considerations:

1. **Uniqueness**: Each NFT can only be claimed once
2. **Cross-Contract Transfers**: We need to interact with NEP-171 NFT contracts
3. **Ownership Verification**: Ensuring the drop contract owns the NFTs before distribution
4. **Metadata Preservation**: Maintaining all NFT properties during transfer
5. **Single-Use Keys**: Each access key can only claim one specific NFT

---

## Extending Drop Types for NFTs

First, let's extend our drop types to include NFTs. Update `src/drop_types.rs`:

```rust
use near_sdk::{AccountId, NearToken, serde::{Deserialize, Serialize}};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop),
    NonFungibleToken(NftDrop),
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct NearDrop {
    pub amount: NearToken,
    pub counter: u64,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct FtDrop {
    pub ft_contract: AccountId,
    pub amount: String,
    pub counter: u64,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct NftDrop {
    pub nft_contract: AccountId,
    pub token_id: String,
    pub counter: u64, // Should always be 1 for NFTs
}

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
            Drop::Near(drop) => {
                if drop.counter > 0 {
                    drop.counter -= 1;
                }
            }
            Drop::FungibleToken(drop) => {
                if drop.counter > 0 {
                    drop.counter -= 1;
                }
            }
            Drop::NonFungibleToken(drop) => {
                if drop.counter > 0 {
                    drop.counter -= 1;
                }
            }
        }
    }
}
```

---

## Cross-Contract NFT Interface

Update `src/external.rs` to include NFT contract methods:

```rust
use near_sdk::{ext_contract, AccountId, Gas, json_types::U128};

// Existing FT interface...

// Interface for NEP-171 non-fungible token contracts
#[ext_contract(ext_nft)]
pub trait NonFungibleToken {
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: String,
        approval_id: Option<u64>,
        memo: Option<String>,
    );
    
    fn nft_token(&self, token_id: String) -> Option<JsonToken>;
}

// Interface for NFT callbacks to this contract
#[ext_contract(ext_nft_self)]
pub trait NftDropCallbacks {
    fn nft_transfer_callback(
        &mut self,
        public_key: near_sdk::PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
    );
}

#[derive(near_sdk::serde::Serialize, near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonToken {
    pub token_id: String,
    pub owner_id: AccountId,
    pub metadata: Option<TokenMetadata>,
    pub approved_account_ids: Option<std::collections::HashMap<AccountId, u64>>,
}

#[derive(near_sdk::serde::Serialize, near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenMetadata {
    pub title: Option<String>,
    pub description: Option<String>,
    pub media: Option<String>,
    pub media_hash: Option<String>,
    pub copies: Option<u64>,
    pub issued_at: Option<String>,
    pub expires_at: Option<String>,
    pub starts_at: Option<String>,
    pub updated_at: Option<String>,
    pub extra: Option<String>,
    pub reference: Option<String>,
    pub reference_hash: Option<String>,
}

// Gas constants for NFT operations
pub const GAS_FOR_NFT_TRANSFER: Gas = Gas(30_000_000_000_000);
pub const GAS_FOR_NFT_CALLBACK: Gas = Gas(20_000_000_000_000);
```

---

## Creating NFT Drops

Add the NFT drop creation function to your main contract in `src/lib.rs`:

```rust
#[near_bindgen]
impl Contract {
    /// Create a new NFT drop
    pub fn create_nft_drop(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> u64 {
        let deposit = env::attached_deposit();
        
        // Calculate required deposit (only one key for NFTs)
        let required_deposit = self.calculate_nft_drop_cost();
        
        assert!(
            deposit >= required_deposit,
            "Insufficient deposit. Required: {}, Provided: {}",
            required_deposit.as_yoctonear(),
            deposit.as_yoctonear()
        );
        
        // Validate token_id format
        assert!(!token_id.is_empty(), "Token ID cannot be empty");
        assert!(token_id.len() <= 64, "Token ID too long");
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::NonFungibleToken(NftDrop {
            nft_contract: nft_contract.clone(),
            token_id: token_id.clone(),
            counter: 1, // NFTs are unique, so counter is always 1
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        
        // Add access key and map public key to drop ID
        self.add_access_key_for_drop(&public_key);
        self.drop_id_by_key.insert(&public_key, &drop_id);
        
        env::log_str(&format!(
            "Created NFT drop {} for token {} from contract {}",
            drop_id,
            token_id,
            nft_contract
        ));
        
        drop_id
    }
    
    /// Calculate the cost of creating an NFT drop
    fn calculate_nft_drop_cost(&self) -> NearToken {
        // NFT drops only support one key per drop since each NFT is unique
        DROP_STORAGE_COST
            .saturating_add(KEY_STORAGE_COST)
            .saturating_add(ACCESS_KEY_STORAGE_COST)
            .saturating_add(FUNCTION_CALL_ALLOWANCE)
    }
    
    /// Create multiple NFT drops at once for different tokens
    pub fn create_nft_drops_batch(
        &mut self,
        nft_drops: Vec<NftDropConfig>,
    ) -> Vec<u64> {
        let mut drop_ids = Vec::new();
        let total_drops = nft_drops.len();
        
        let deposit = env::attached_deposit();
        let required_deposit = self.calculate_nft_drop_cost()
            .saturating_mul(total_drops as u64);
        
        assert!(
            deposit >= required_deposit,
            "Insufficient deposit for {} NFT drops. Required: {}, Provided: {}",
            total_drops,
            required_deposit.as_yoctonear(),
            deposit.as_yoctonear()
        );
        
        for nft_drop in nft_drops {
            let drop_id = self.create_single_nft_drop_internal(
                nft_drop.public_key,
                nft_drop.nft_contract,
                nft_drop.token_id,
            );
            drop_ids.push(drop_id);
        }
        
        env::log_str(&format!(
            "Created {} NFT drops in batch",
            total_drops
        ));
        
        drop_ids
    }
    
    /// Internal method for creating a single NFT drop without deposit checks
    fn create_single_nft_drop_internal(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> u64 {
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::NonFungibleToken(NftDrop {
            nft_contract,
            token_id,
            counter: 1,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        self.add_access_key_for_drop(&public_key);
        self.drop_id_by_key.insert(&public_key, &drop_id);
        
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

---

## Implementing NFT Claiming Logic

Update your `src/claim.rs` file to handle NFT claims:

```rust
use crate::external::*;
use near_sdk::Promise;

#[near_bindgen]
impl Contract {
    /// Internal claiming logic (updated to handle NFT drops)
    fn internal_claim(&mut self, public_key: &PublicKey, receiver_id: &AccountId) {
        let drop_id = self.drop_id_by_key.get(public_key)
            .expect("No drop found for this key");
        
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop not found");
        
        assert!(drop.get_counter() > 0, "All drops have been claimed");
        
        match &drop {
            Drop::Near(near_drop) => {
                // Handle NEAR token drops (as before)
                Promise::new(receiver_id.clone())
                    .transfer(near_drop.amount);
                
                env::log_str(&format!(
                    "Claimed {} NEAR tokens to {}",
                    near_drop.amount.as_yoctonear(),
                    receiver_id
                ));
                
                self.cleanup_after_claim(public_key, &mut drop, drop_id);
            }
            Drop::FungibleToken(ft_drop) => {
                // Handle FT drops (as before)
                self.claim_ft_drop(
                    public_key.clone(),
                    receiver_id.clone(),
                    ft_drop.ft_contract.clone(),
                    ft_drop.amount.clone(),
                );
                return;
            }
            Drop::NonFungibleToken(nft_drop) => {
                // Handle NFT drops with cross-contract calls
                self.claim_nft_drop(
                    public_key.clone(),
                    receiver_id.clone(),
                    nft_drop.nft_contract.clone(),
                    nft_drop.token_id.clone(),
                );
                return;
            }
        }
    }
    
    /// Claim NFT with proper ownership verification
    fn claim_nft_drop(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
    ) {
        // Transfer the NFT to the receiver
        ext_nft::ext(nft_contract.clone())
            .with_static_gas(GAS_FOR_NFT_TRANSFER)
            .nft_transfer(
                receiver_id.clone(),
                token_id.clone(),
                None, // approval_id
                Some(format!("NEAR Drop claim to {}", receiver_id))
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_NFT_CALLBACK)
                    .nft_transfer_callback(
                        public_key,
                        receiver_id,
                        nft_contract,
                        token_id,
                    )
            );
    }
    
    /// Handle the result of NFT transfer
    #[private]
    pub fn nft_transfer_callback(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
    ) {
        if is_promise_success() {
            env::log_str(&format!(
                "Successfully transferred NFT {} from {} to {}",
                token_id,
                nft_contract,
                receiver_id
            ));
            
            // Get drop info for cleanup
            let drop_id = self.drop_id_by_key.get(&public_key)
                .expect("Drop not found during cleanup");
            
            let mut drop = self.drop_by_id.get(&drop_id)
                .expect("Drop data not found during cleanup");
            
            // Clean up after successful transfer
            self.cleanup_after_claim(&public_key, &mut drop, drop_id);
        } else {
            env::log_str(&format!(
                "Failed to transfer NFT {} from {} to {}",
                token_id,
                nft_contract,
                receiver_id
            ));
            
            // NFT transfer failed - this could happen if:
            // 1. The drop contract doesn't own the NFT
            // 2. The NFT contract has some issue
            // 3. The token doesn't exist
            env::panic_str("NFT transfer failed");
        }
    }
    
    /// Verify NFT ownership before creating drop (utility method)
    pub fn verify_nft_ownership(
        &self,
        nft_contract: AccountId,
        token_id: String,
    ) -> Promise {
        ext_nft::ext(nft_contract)
            .with_static_gas(Gas(10_000_000_000_000))
            .nft_token(token_id)
    }
}
```

---

## NFT Drop Security Considerations

NFT drops require additional security considerations:

### Ownership Verification

Before creating NFT drops, it's crucial to verify that the contract owns the NFTs:

```rust
#[near_bindgen]
impl Contract {
    /// Verify and create NFT drop with ownership check
    pub fn create_nft_drop_with_verification(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> Promise {
        // First verify ownership
        ext_nft::ext(nft_contract.clone())
            .with_static_gas(Gas(10_000_000_000_000))
            .nft_token(token_id.clone())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(30_000_000_000_000))
                    .handle_nft_verification(
                        public_key,
                        nft_contract,
                        token_id,
                        env::attached_deposit(),
                    )
            )
    }
    
    /// Handle NFT ownership verification result
    #[private]
    pub fn handle_nft_verification(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
        deposit: NearToken,
    ) -> u64 {
        if let PromiseResult::Successful(val) = env::promise_result(0) {
            if let Ok(Some(token_info)) = near_sdk::serde_json::from_slice::<Option<JsonToken>>(&val) {
                // Verify that this contract owns the NFT
                assert_eq!(
                    token_info.owner_id,
                    env::current_account_id(),
                    "Contract does not own NFT {} from {}",
                    token_id,
                    nft_contract
                );
                
                // Create the drop with the provided deposit
                let required_deposit = self.calculate_nft_drop_cost();
                assert!(
                    deposit >= required_deposit,
                    "Insufficient deposit for NFT drop"
                );
                
                // Proceed with drop creation
                return self.create_single_nft_drop_internal(
                    public_key,
                    nft_contract,
                    token_id,
                );
            }
        }
        
        env::panic_str("NFT ownership verification failed");
    }
}
```

### Preventing Double Claims

Since NFTs are unique, we need to ensure they can't be claimed twice:

```rust
impl Contract {
    /// Enhanced cleanup that removes NFT drops completely
    fn cleanup_after_claim(&mut self, public_key: &PublicKey, drop: &mut Drop, drop_id: u64) {
        match drop {
            Drop::NonFungibleToken(_) => {
                // For NFTs, always remove the drop completely since they're unique
                self.drop_by_id.remove(&drop_id);
                env::log_str(&format!("NFT drop {} fully claimed and removed", drop_id));
            }
            _ => {
                // Handle other drop types as before
                drop.decrement_counter();
                
                if drop.get_counter() == 0 {
                    self.drop_by_id.remove(&drop_id);
                } else {
                    self.drop_by_id.insert(&drop_id, &drop);
                }
            }
        }
        
        // Always remove the public key mapping and access key
        self.drop_id_by_key.remove(public_key);
        Promise::new(env::current_account_id())
            .delete_key(public_key.clone());
    }
}
```

---

## Testing NFT Drops

### Deploy a Test NFT Contract

You'll need an NFT contract for testing. Use the reference implementation:

```bash
# Clone and build the NFT contract
git clone https://github.com/near-examples/NFT.git
cd NFT
cargo near build

# Deploy to testnet
near create-account test-nft.testnet --useFaucet
near deploy test-nft.testnet target/near/non_fungible_token.wasm

# Initialize
near call test-nft.testnet new_default_meta '{
  "owner_id": "drop-contract.testnet"
}' --accountId test-nft.testnet
```

### Mint NFTs to the Drop Contract

```bash
# Mint NFT to drop contract
near call test-nft.testnet nft_mint '{
  "token_id": "unique-drop-token-001",
  "metadata": {
    "title": "Exclusive Drop NFT",
    "description": "A unique NFT distributed via NEAR Drop",
    "media": "https://example.com/nft-image.png"
  },
  "receiver_id": "drop-contract.testnet"
}' --accountId drop-contract.testnet --deposit 0.1
```

### Create NFT Drop

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create an NFT drop
  near call drop-contract.testnet create_nft_drop '{
    "public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
    "nft_contract": "test-nft.testnet",
    "token_id": "unique-drop-token-001"
  }' --accountId drop-contract.testnet --deposit 0.1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create an NFT drop
  near contract call-function as-transaction drop-contract.testnet create_nft_drop json-args '{
    "public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
    "nft_contract": "test-nft.testnet",
    "token_id": "unique-drop-token-001"
  }' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Claim NFT

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Claim NFT to an existing account
  near call drop-contract.testnet claim_for '{
    "account_id": "nft-collector.testnet"
  }' --accountId drop-contract.testnet \
    --keyPair '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "private_key": "ed25519:..."}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Claim NFT to an existing account
  near contract call-function as-transaction drop-contract.testnet claim_for json-args '{
    "account_id": "nft-collector.testnet"
  }' prepaid-gas '200.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8 --signer-private-key ed25519:... send
  ```
  </TabItem>
</Tabs>

### Verify NFT Transfer

```bash
# Check NFT ownership after claim
near view test-nft.testnet nft_token '{
  "token_id": "unique-drop-token-001"
}'
```

---

## Adding NFT-Specific View Methods

Add helpful view methods for NFT drops:

```rust
#[near_bindgen]
impl Contract {
    /// Get NFT drop details
    pub fn get_nft_drop_details(&self, drop_id: u64) -> Option<NftDropInfo> {
        if let Some(Drop::NonFungibleToken(nft_drop)) = self.drop_by_id.get(&drop_id) {
            Some(NftDropInfo {
                nft_contract: nft_drop.nft_contract,
                token_id: nft_drop.token_id,
                is_claimed: nft_drop.counter == 0,
            })
        } else {
            None
        }
    }
    
    /// Calculate NFT drop cost (view method)
    pub fn calculate_nft_drop_cost_view(&self) -> NearToken {
        self.calculate_nft_drop_cost()
    }
    
    /// Check if an NFT drop exists for a specific token
    pub fn nft_drop_exists(&self, nft_contract: AccountId, token_id: String) -> bool {
        // This is a linear search - in production you might want to optimize this
        for drop_id in 0..self.next_drop_id {
            if let Some(Drop::NonFungibleToken(nft_drop)) = self.drop_by_id.get(&drop_id) {
                if nft_drop.nft_contract == nft_contract && nft_drop.token_id == token_id {
                    return nft_drop.counter > 0;
                }
            }
        }
        false
    }
    
    /// Get all NFT drops for a specific contract
    pub fn get_nft_drops_by_contract(&self, nft_contract: AccountId) -> Vec<NftDropInfo> {
        let mut nft_drops = Vec::new();
        
        for drop_id in 0..self.next_drop_id {
            if let Some(Drop::NonFungibleToken(nft_drop)) = self.drop_by_id.get(&drop_id) {
                if nft_drop.nft_contract == nft_contract {
                    nft_drops.push(NftDropInfo {
                        nft_contract: nft_drop.nft_contract,
                        token_id: nft_drop.token_id,
                        is_claimed: nft_drop.counter == 0,
                    });
                }
            }
        }
        
        nft_drops
    }
}

#[derive(near_sdk::serde::Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct NftDropInfo {
    pub nft_contract: AccountId,
    pub token_id: String,
    pub is_claimed: bool,
}
```

---

## Advanced NFT Drop Patterns

### Rarity-Based Drops

You can implement rarity-based NFT drops by analyzing metadata:

```rust
impl Contract {
    /// Create NFT drop with rarity verification
    pub fn create_rare_nft_drop(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
        required_rarity: String,
    ) -> Promise {
        ext_nft::ext(nft_contract.clone())
            .with_static_gas(Gas(10_000_000_000_000))
            .nft_token(token_id.clone())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(30_000_000_000_000))
                    .handle_rarity_verification(
                        public_key,
                        nft_contract,
                        token_id,
                        required_rarity,
                        env::attached_deposit(),
                    )
            )
    }
    
    /// Handle rarity verification
    #[private]
    pub fn handle_rarity_verification(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
        required_rarity: String,
        deposit: NearToken,
    ) -> u64 {
        if let PromiseResult::Successful(val) = env::promise_result(0) {
            if let Ok(Some(token_info)) = near_sdk::serde_json::from_slice::<Option<JsonToken>>(&val) {
                // Verify ownership
                assert_eq!(token_info.owner_id, env::current_account_id());
                
                // Check rarity in metadata
                if let Some(metadata) = token_info.metadata {
                    if let Some(extra) = metadata.extra {
                        let extra_data: serde_json::Value = serde_json::from_str(&extra)
                            .unwrap_or_else(|_| serde_json::Value::Null);
                        
                        if let Some(rarity) = extra_data.get("rarity") {
                            assert_eq!(
                                rarity.as_str().unwrap_or(""),
                                required_rarity,
                                "NFT rarity does not match requirement"
                            );
                        } else {
                            env::panic_str("NFT does not have rarity metadata");
                        }
                    }
                }
                
                // Create the drop if all validations pass
                return self.create_single_nft_drop_internal(
                    public_key,
                    nft_contract,
                    token_id,
                );
            }
        }
        
        env::panic_str("Rarity verification failed");
    }
}
```

### Collection-Based Drops

Create drops for entire NFT collections:

```rust
impl Contract {
    /// Create drops for multiple NFTs from the same collection
    pub fn create_collection_drop(
        &mut self,
        nft_contract: AccountId,
        token_ids: Vec<String>,
        public_keys: Vec<PublicKey>,
    ) -> Vec<u64> {
        assert_eq!(
            token_ids.len(),
            public_keys.len(),
            "Token IDs and public keys arrays must have the same length"
        );
        
        let total_drops = token_ids.len();
        let deposit = env::attached_deposit();
        let required_deposit = self.calculate_nft_drop_cost()
            .saturating_mul(total_drops as u64);
        
        assert!(
            deposit >= required_deposit,
            "Insufficient deposit for collection drop"
        );
        
        let mut drop_ids = Vec::new();
        
        for (i, token_id) in token_ids.into_iter().enumerate() {
            let drop_id = self.create_single_nft_drop_internal(
                public_keys[i].clone(),
                nft_contract.clone(),
                token_id,
            );
            drop_ids.push(drop_id);
        }
        
        env::log_str(&format!(
            "Created collection drop with {} NFTs from {}",
            total_drops,
            nft_contract
        ));
        
        drop_ids
    }
}
```

---

## Error Handling for NFT Operations

Add comprehensive error handling:

```rust
// Error constants
const ERR_NFT_NOT_FOUND: &str = "NFT not found";
const ERR_NFT_NOT_OWNED: &str = "Contract does not own this NFT";
const ERR_NFT_ALREADY_CLAIMED: &str = "This NFT has already been claimed";
const ERR_INVALID_TOKEN_ID: &str = "Invalid token ID format";

impl Contract {
    /// Enhanced NFT drop creation with comprehensive validation
    pub fn create_nft_drop_safe(
        &mut self,
        public_key: PublicKey,
        nft_contract: AccountId,
        token_id: String,
    ) -> u64 {
        // Validate inputs
        self.validate_nft_drop_inputs(&public_key, &nft_contract, &token_id);
        
        // Check if drop already exists for this NFT
        assert!(
            !self.nft_drop_exists(nft_contract.clone(), token_id.clone()),
            "{}",
            ERR_NFT_ALREADY_CLAIMED
        );
        
        // Create the drop
        self.create_nft_drop(public_key, nft_contract, token_id)
    }
    
    /// Validate NFT drop inputs
    fn validate_nft_drop_inputs(
        &self,
        public_key: &PublicKey,
        nft_contract: &AccountId,
        token_id: &String,
    ) {
        // Validate public key format
        assert!(
            matches!(public_key, PublicKey::ED25519(_)),
            "Only ED25519 keys are supported"
        );
        
        // Validate NFT contract account ID
        assert!(
            nft_contract.as_str().len() >= 2 && nft_contract.as_str().contains('.'),
            "Invalid NFT contract account ID"
        );
        
        // Validate token ID
        assert!(!token_id.is_empty(), "{}", ERR_INVALID_TOKEN_ID);
        assert!(token_id.len() <= 64, "Token ID too long (max 64 characters)");
        
        // Check for reserved characters
        assert!(
            token_id.chars().all(|c| c.is_alphanumeric() || "-_.".contains(c)),
            "Token ID contains invalid characters"
        );
    }
}
```

---

## Gas Optimization for NFT Operations

NFT drops can be gas-intensive due to cross-contract calls. Here are optimization strategies:

```rust
// Optimized gas constants based on testing
pub const GAS_FOR_NFT_TRANSFER: Gas = Gas(30_000_000_000_000);      // 30 TGas
pub const GAS_FOR_NFT_CALLBACK: Gas = Gas(20_000_000_000_000);       // 20 TGas
pub const GAS_FOR_NFT_VERIFICATION: Gas = Gas(10_000_000_000_000);   // 10 TGas

impl Contract {
    /// Optimized NFT claiming with gas monitoring
    fn claim_nft_drop_optimized(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
    ) {
        let initial_gas = env::used_gas();
        
        // Transfer the NFT with optimized gas allocation
        ext_nft::ext(nft_contract.clone())
            .with_static_gas(GAS_FOR_NFT_TRANSFER)
            .nft_transfer(
                receiver_id.clone(),
                token_id.clone(),
                None,
                Some("NEAR Drop claim".to_string()) // Shorter memo to save gas
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_NFT_CALLBACK)
                    .nft_transfer_callback_optimized(
                        public_key,
                        receiver_id,
                        nft_contract,
                        token_id,
                        initial_gas,
                    )
            );
    }
    
    /// Optimized callback with gas usage reporting
    #[private]
    pub fn nft_transfer_callback_optimized(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        nft_contract: AccountId,
        token_id: String,
        initial_gas: Gas,
    ) {
        let gas_used = env::used_gas() - initial_gas;
        
        if is_promise_success() {
            env::log_str(&format!(
                "NFT {} transferred to {} using {} gas",
                token_id,
                receiver_id,
                gas_used.0
            ));
            
            // Efficient cleanup
            if let Some(drop_id) = self.drop_id_by_key.get(&public_key) {
                self.drop_by_id.remove(&drop_id);
                self.drop_id_by_key.remove(&public_key);
                
                // Remove access key
                Promise::new(env::current_account_id())
                    .delete_key(public_key);
            }
        } else {
            env::panic_str("NFT transfer failed");
        }
    }
}
```

---

## Next Steps

You now have a complete NFT drop system that handles:
- Unique token distribution patterns
- Cross-contract NFT transfers with proper callbacks  
- Ownership verification and security measures
- Advanced patterns like rarity-based and collection drops
- Comprehensive error handling and gas optimization

The NFT drop implementation completes the core token distribution functionality. Next, let's explore how function-call access keys work in detail to understand the gasless claiming mechanism.

[Continue to Access Key Management →](./access-keys)

---

:::note NFT Drop Considerations
- Always verify NFT ownership before creating drops
- NFT drops are inherently single-use (counter always equals 1)
- Test with various NFT contracts to ensure NEP-171 compatibility
- Monitor gas costs as they can be higher than NEAR/FT drops
- Consider implementing batch operations for multiple NFT drops
:::