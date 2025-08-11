---
id: ft-drops
title: Fungible Token Drops
sidebar_label: Fungible Token Drops
description: "Learn how to implement fungible token (FT) drops using NEP-141 standard tokens. This section covers cross-contract calls, storage registration, and FT transfer patterns."
---

import {Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Fungible token drops allow you to distribute any NEP-141 compatible token through the NEAR Drop system. This is more complex than NEAR drops because it requires cross-contract calls and proper storage management on the target FT contract.

---

## Understanding FT Drop Requirements

Fungible token drops involve several additional considerations:

1. **Cross-Contract Calls**: We need to interact with external FT contracts
2. **Storage Registration**: Recipients must be registered on the FT contract
3. **Transfer Patterns**: Using `ft_transfer` for token distribution
4. **Error Handling**: Managing failures in cross-contract operations

---

## Extending the Drop Types

First, let's extend our drop types to include fungible tokens. Update `src/drop_types.rs`:

```rust
use near_sdk::{AccountId, NearToken, serde::{Deserialize, Serialize}};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop),
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
    pub amount: String, // Using String to handle large numbers
    pub counter: u64,
}

impl Drop {
    pub fn get_counter(&self) -> u64 {
        match self {
            Drop::Near(drop) => drop.counter,
            Drop::FungibleToken(drop) => drop.counter,
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
        }
    }
}
```

---

## Cross-Contract Interface

Create `src/external.rs` to define the interface for interacting with FT contracts:

```rust
use near_sdk::{ext_contract, AccountId, Gas};

// Interface for NEP-141 fungible token contracts
#[ext_contract(ext_ft)]
pub trait FungibleToken {
    fn ft_transfer(&mut self, receiver_id: AccountId, amount: String, memo: Option<String>);
    fn storage_deposit(&mut self, account_id: Option<AccountId>, registration_only: Option<bool>);
    fn storage_balance_of(&self, account_id: AccountId) -> Option<StorageBalance>;
}

// Interface for callbacks to this contract
#[ext_contract(ext_self)]
pub trait FtDropCallbacks {
    fn ft_transfer_callback(
        &mut self,
        public_key: near_sdk::PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    );
}

#[derive(near_sdk::serde::Serialize, near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct StorageBalance {
    pub total: String,
    pub available: String,
}

// Gas constants for cross-contract calls
pub const GAS_FOR_FT_TRANSFER: Gas = Gas(20_000_000_000_000);
pub const GAS_FOR_STORAGE_DEPOSIT: Gas = Gas(30_000_000_000_000);
pub const GAS_FOR_CALLBACK: Gas = Gas(20_000_000_000_000);

// Storage deposit for FT registration (typical amount)
pub const STORAGE_DEPOSIT_AMOUNT: NearToken = NearToken::from_millinear(125); // 0.125 NEAR
```

---

## Creating FT Drops

Add the FT drop creation function to your main contract in `src/lib.rs`:

```rust
#[near_bindgen]
impl Contract {
    /// Create a new fungible token drop
    pub fn create_ft_drop(
        &mut self,
        public_keys: Vec<PublicKey>,
        ft_contract: AccountId,
        amount_per_drop: String,
    ) -> u64 {
        let deposit = env::attached_deposit();
        let num_keys = public_keys.len() as u64;
        
        // Calculate required deposit
        let required_deposit = self.calculate_ft_drop_cost(num_keys);
        
        assert!(
            deposit >= required_deposit,
            "Insufficient deposit. Required: {}, Provided: {}",
            required_deposit.as_yoctonear(),
            deposit.as_yoctonear()
        );
        
        // Validate that the amount is a valid number
        amount_per_drop.parse::<u128>()
            .expect("Invalid amount format");
        
        // Create the drop
        let drop_id = self.next_drop_id;
        self.next_drop_id += 1;
        
        let drop = Drop::FungibleToken(FtDrop {
            ft_contract: ft_contract.clone(),
            amount: amount_per_drop.clone(),
            counter: num_keys,
        });
        
        self.drop_by_id.insert(&drop_id, &drop);
        
        // Add access keys and map public keys to drop ID
        for public_key in public_keys {
            self.add_access_key_for_drop(&public_key);
            self.drop_id_by_key.insert(&public_key, &drop_id);
        }
        
        env::log_str(&format!(
            "Created FT drop {} with {} {} tokens per claim for {} keys",
            drop_id,
            amount_per_drop,
            ft_contract,
            num_keys
        ));
        
        drop_id
    }
    
    /// Calculate the cost of creating an FT drop
    fn calculate_ft_drop_cost(&self, num_keys: u64) -> NearToken {
        let storage_cost = DROP_STORAGE_COST
            .saturating_add(KEY_STORAGE_COST.saturating_mul(num_keys))
            .saturating_add(ACCESS_KEY_STORAGE_COST.saturating_mul(num_keys));
        
        let total_allowance = FUNCTION_CALL_ALLOWANCE.saturating_mul(num_keys);
        
        // Add storage deposit for potential registrations
        let registration_buffer = STORAGE_DEPOSIT_AMOUNT.saturating_mul(num_keys);
        
        storage_cost
            .saturating_add(total_allowance)
            .saturating_add(registration_buffer)
    }
}
```

---

## Implementing FT Claiming Logic

The FT claiming process is more complex because it involves:
1. Checking if the recipient is registered on the FT contract
2. Registering them if necessary
3. Transferring the tokens
4. Handling callbacks for error recovery

Update your `src/claim.rs` file:

```rust
use crate::external::*;
use near_sdk::Promise;

#[near_bindgen]
impl Contract {
    /// Internal claiming logic (updated to handle FT drops)
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
                
                // Clean up immediately for NEAR drops
                self.cleanup_after_claim(public_key, &mut drop, drop_id);
            }
            Drop::FungibleToken(ft_drop) => {
                // Handle FT drops with cross-contract calls
                self.claim_ft_drop(
                    public_key.clone(),
                    receiver_id.clone(),
                    ft_drop.ft_contract.clone(),
                    ft_drop.amount.clone(),
                );
                
                // Note: cleanup happens in callback for FT drops
                return;
            }
        }
    }
    
    /// Claim fungible tokens with proper registration handling
    fn claim_ft_drop(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        // First, check if the receiver is registered on the FT contract
        ext_ft::ext(ft_contract.clone())
            .with_static_gas(GAS_FOR_STORAGE_DEPOSIT)
            .storage_balance_of(receiver_id.clone())
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_CALLBACK)
                    .handle_storage_check(
                        public_key,
                        receiver_id,
                        ft_contract,
                        amount,
                    )
            );
    }
    
    /// Handle the result of storage balance check
    #[private]
    pub fn handle_storage_check(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        let storage_balance: Option<StorageBalance> = match env::promise_result(0) {
            PromiseResult::Successful(val) => {
                near_sdk::serde_json::from_slice(&val)
                    .unwrap_or(None)
            }
            _ => None,
        };
        
        if storage_balance.is_none() {
            // User is not registered, register them first
            env::log_str(&format!("Registering {} on FT contract", receiver_id));
            
            ext_ft::ext(ft_contract.clone())
                .with_static_gas(GAS_FOR_STORAGE_DEPOSIT)
                .with_attached_deposit(STORAGE_DEPOSIT_AMOUNT)
                .storage_deposit(Some(receiver_id.clone()), Some(true))
                .then(
                    Self::ext(env::current_account_id())
                        .with_static_gas(GAS_FOR_CALLBACK)
                        .handle_registration_and_transfer(
                            public_key,
                            receiver_id,
                            ft_contract,
                            amount,
                        )
                );
        } else {
            // User is already registered, proceed with transfer
            self.execute_ft_transfer(public_key, receiver_id, ft_contract, amount);
        }
    }
    
    /// Handle registration completion and proceed with transfer
    #[private]
    pub fn handle_registration_and_transfer(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        if is_promise_success() {
            env::log_str(&format!("Successfully registered {}", receiver_id));
            self.execute_ft_transfer(public_key, receiver_id, ft_contract, amount);
        } else {
            env::log_str(&format!("Failed to register {} on FT contract", receiver_id));
            // Registration failed - this shouldn't happen in normal circumstances
            // For now, we'll panic, but in production you might want to handle this gracefully
            env::panic_str("Failed to register user on FT contract");
        }
    }
    
    /// Execute the actual FT transfer
    fn execute_ft_transfer(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        ext_ft::ext(ft_contract.clone())
            .with_static_gas(GAS_FOR_FT_TRANSFER)
            .ft_transfer(
                receiver_id.clone(),
                amount.clone(),
                Some(format!("NEAR Drop claim to {}", receiver_id))
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_CALLBACK)
                    .ft_transfer_callback(
                        public_key,
                        receiver_id,
                        ft_contract,
                        amount,
                    )
            );
    }
    
    /// Handle the result of FT transfer
    #[private]
    pub fn ft_transfer_callback(
        &mut self,
        public_key: PublicKey,
        receiver_id: AccountId,
        ft_contract: AccountId,
        amount: String,
    ) {
        if is_promise_success() {
            env::log_str(&format!(
                "Successfully transferred {} {} tokens to {}",
                amount,
                ft_contract,
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
                "Failed to transfer {} {} tokens to {}",
                amount,
                ft_contract,
                receiver_id
            ));
            
            // Transfer failed - this could happen if:
            // 1. The drop contract doesn't have enough tokens
            // 2. The FT contract has some issue
            // For now, we'll panic, but you might want to handle this more gracefully
            env::panic_str("FT transfer failed");
        }
    }
    
    /// Clean up after a successful claim
    fn cleanup_after_claim(&mut self, public_key: &PublicKey, drop: &mut Drop, drop_id: u64) {
        // Decrement counter
        drop.decrement_counter();
        
        if drop.get_counter() == 0 {
            // All drops claimed, remove the drop entirely
            self.drop_by_id.remove(&drop_id);
            env::log_str(&format!("Drop {} fully claimed and removed", drop_id));
        } else {
            // Update the drop with decremented counter
            self.drop_by_id.insert(&drop_id, &drop);
        }
        
        // Remove the public key mapping and access key
        self.drop_id_by_key.remove(public_key);
        
        // Remove the access key from the account
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

## Testing FT Drops

### Deploy a Test FT Contract

First, you'll need an FT contract to test with. You can use the [reference FT implementation](https://github.com/near-examples/FT):

```bash
# Clone and build the FT contract
git clone https://github.com/near-examples/FT.git
cd FT
cargo near build

# Deploy to testnet
near create-account test-ft.testnet --useFaucet
near deploy test-ft.testnet target/near/fungible_token.wasm

# Initialize with your drop contract as owner
near call test-ft.testnet new_default_meta '{
  "owner_id": "drop-contract.testnet",
  "total_supply": "1000000000000000000000000000"
}' --accountId test-ft.testnet
```

### Create an FT Drop

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create an FT drop with 1000 tokens per claim
  near call drop-contract.testnet create_ft_drop '{
    "public_keys": [
      "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
      "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"
    ],
    "ft_contract": "test-ft.testnet",
    "amount_per_drop": "1000000000000000000000000"
  }' --accountId drop-contract.testnet --deposit 2
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create an FT drop with 1000 tokens per claim
  near contract call-function as-transaction drop-contract.testnet create_ft_drop json-args '{
    "public_keys": [
      "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
      "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"
    ],
    "ft_contract": "test-ft.testnet",
    "amount_per_drop": "1000000000000000000000000"
  }' prepaid-gas '200.0 Tgas' attached-deposit '2 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Transfer FT Tokens to Drop Contract

Before users can claim, the drop contract needs to have the FT tokens:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # First register the drop contract on the FT contract
  near call test-ft.testnet storage_deposit '{
    "account_id": "drop-contract.testnet"
  }' --accountId drop-contract.testnet --deposit 0.25

  # Transfer tokens to the drop contract
  near call test-ft.testnet ft_transfer '{
    "receiver_id": "drop-contract.testnet",
    "amount": "2000000000000000000000000"
  }' --accountId drop-contract.testnet --depositYocto 1
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # First register the drop contract on the FT contract
  near contract call-function as-transaction test-ft.testnet storage_deposit json-args '{
    "account_id": "drop-contract.testnet"
  }' prepaid-gas '100.0 Tgas' attached-deposit '0.25 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send

  # Transfer tokens to the drop contract
  near contract call-function as-transaction test-ft.testnet ft_transfer json-args '{
    "receiver_id": "drop-contract.testnet",
    "amount": "2000000000000000000000000"
  }' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as drop-contract.testnet network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

### Claim FT Tokens

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Claim FT tokens to an existing account
  near call drop-contract.testnet claim_for '{
    "account_id": "recipient.testnet"
  }' --accountId drop-contract.testnet \
    --keyPair '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "private_key": "ed25519:..."}'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Claim FT tokens to an existing account
  near contract call-function as-transaction drop-contract.testnet claim_for json-args '{
    "account_id": "recipient.testnet"
  }' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8 --signer-private-key ed25519:... send
  ```
  </TabItem>
</Tabs>

---

## Adding View Methods for FT Drops

Add these helpful view methods to query FT drop information:

```rust
#[near_bindgen]
impl Contract {
    /// Calculate FT drop cost (view method)
    pub fn calculate_ft_drop_cost_view(&self, num_keys: u64) -> NearToken {
        self.calculate_ft_drop_cost(num_keys)
    }
    
    /// Get FT drop details
    pub fn get_ft_drop_details(&self, drop_id: u64) -> Option<FtDropInfo> {
        if let Some(Drop::FungibleToken(ft_drop)) = self.drop_by_id.get(&drop_id) {
            Some(FtDropInfo {
                ft_contract: ft_drop.ft_contract,
                amount_per_drop: ft_drop.amount,
                remaining_claims: ft_drop.counter,
            })
        } else {
            None
        }
    }
}

#[derive(near_sdk::serde::Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct FtDropInfo {
    pub ft_contract: AccountId,
    pub amount_per_drop: String,
    pub remaining_claims: u64,
}
```

---

## Error Handling for FT Operations

Add specific error handling for FT operations:

```rust
// Add these error constants
const ERR_FT_TRANSFER_FAILED: &str = "Fungible token transfer failed";
const ERR_FT_REGISTRATION_FAILED: &str = "Failed to register on FT contract";
const ERR_INVALID_FT_AMOUNT: &str = "Invalid FT amount format";

// Enhanced error handling in create_ft_drop
pub fn create_ft_drop(
    &mut self,
    public_keys: Vec<PublicKey>,
    ft_contract: AccountId,
    amount_per_drop: String,
) -> u64 {
    // Validate amount format
    amount_per_drop.parse::<u128>()
        .unwrap_or_else(|_| env::panic_str(ERR_INVALID_FT_AMOUNT));
    
    // Validate FT contract exists (basic check)
    assert!(
        ft_contract.as_str().len() >= 2 && ft_contract.as_str().contains('.'),
        "Invalid FT contract account ID"
    );
    
    // Rest of implementation...
}
```

---

## Gas Optimization Tips

FT drops use more gas due to cross-contract calls. Here are some optimization tips:

1. **Batch Operations**: Group multiple claims when possible
2. **Gas Estimation**: Monitor gas usage and adjust constants
3. **Storage Efficiency**: Minimize data stored in contract state
4. **Error Recovery**: Implement proper rollback mechanisms

```rust
// Optimized gas constants based on testing
pub const GAS_FOR_FT_TRANSFER: Gas = Gas(20_000_000_000_000);      // 20 TGas
pub const GAS_FOR_STORAGE_DEPOSIT: Gas = Gas(30_000_000_000_000);  // 30 TGas  
pub const GAS_FOR_CALLBACK: Gas = Gas(20_000_000_000_000);         // 20 TGas
```

---

## Next Steps

You now have a working FT drop system that handles:
- Cross-contract FT transfers
- Automatic user registration on FT contracts
- Proper error handling and callbacks
- Storage cost management

Next, let's implement NFT drops, which introduce unique token distribution patterns.

[Continue to NFT Drops →](./nft-drops)

---

:::note FT Drop Considerations
- Always ensure the drop contract has sufficient FT tokens before creating drops
- Monitor gas costs as they are higher than NEAR token drops
- Test with various FT contracts to ensure compatibility
- Consider implementing deposit refunds for failed operations
:::