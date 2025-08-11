---
id: account-creation
title: Account Creation
sidebar_label: Account Creation
description: "Learn how to create new NEAR accounts during the claiming process, enabling seamless onboarding for users without existing NEAR accounts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

One of NEAR Drop's most powerful features is the ability to create new NEAR accounts for users who don't have them yet. This eliminates the biggest barrier to Web3 adoption: requiring users to set up accounts before they can receive tokens.

---

## The Account Creation Challenge

Traditional blockchain onboarding has a chicken-and-egg problem:
1. Users need an account to receive tokens
2. Users need tokens to pay for account creation
3. Users need gas to claim tokens

NEAR Drop solves this by:
1. Using function-call keys for gasless operations
2. Creating accounts programmatically during claims
3. Funding new accounts from the drop contract

![Account Creation Flow](/docs/assets/tutorials/near-drop/account-creation-flow.png)

---

## How Account Creation Works

### The Two-Phase Process

Account creation in NEAR Drop happens in two phases:

1. **Account Creation**: Create the new account and fund it
2. **Token Transfer**: Transfer the claimed tokens to the new account

```rust
/// Create account and claim in two phases
pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
    let public_key = env::signer_account_pk();
    
    // Phase 1: Create and fund the account
    let create_promise = Promise::new(account_id.clone())
        .create_account()
        .transfer(NearToken::from_near(1)); // Initial funding
    
    // Phase 2: Resolve creation and claim tokens
    create_promise.then(
        Self::ext(env::current_account_id())
            .with_static_gas(Gas(30_000_000_000_000))
            .resolve_account_create(public_key, account_id)
    )
}
```

### Account Validation

Before creating accounts, we need to validate the requested account ID:

```rust
impl Contract {
    /// Validate account ID before creation
    fn validate_new_account_id(&self, account_id: &AccountId) -> Result<(), String> {
        let account_str = account_id.as_str();
        
        // Check length constraints
        if account_str.len() < 2 || account_str.len() > 64 {
            return Err("Account ID must be between 2 and 64 characters".to_string());
        }
        
        // Check format for subaccounts
        if account_str.contains('.') {
            let parts: Vec<&str> = account_str.split('.').collect();
            
            // Must end with top-level account
            if !account_str.ends_with(&format!(".{}", self.top_level_account)) {
                return Err(format!(
                    "Account must be a subaccount of {}",
                    self.top_level_account
                ));
            }
            
            // Validate each part
            for part in &parts[..parts.len()-1] {
                if !self.is_valid_account_part(part) {
                    return Err("Invalid characters in account ID".to_string());
                }
            }
        } else {
            // Top-level account validation
            if !self.is_valid_account_part(account_str) {
                return Err("Invalid characters in account ID".to_string());
            }
        }
        
        Ok(())
    }
    
    /// Check if account ID part contains valid characters
    fn is_valid_account_part(&self, part: &str) -> bool {
        part.chars().all(|c| {
            c.is_ascii_lowercase() || c.is_ascii_digit() || c == '_' || c == '-'
        })
    }
}
```

---

## Enhanced Account Creation Implementation

### Complete Account Creation Logic

```rust
use near_sdk::{Promise, PromiseResult, Gas};

#[near_bindgen]
impl Contract {
    /// Create account and claim with comprehensive error handling
    pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Validate the account ID
        self.validate_new_account_id(&account_id)
            .unwrap_or_else(|err| env::panic_str(&err));
        
        // Check if this key has a valid drop
        let drop_id = self.drop_id_by_key.get(&public_key)
            .expect("No drop found for this key");
        
        let drop = self.drop_by_id.get(&drop_id)
            .expect("Drop not found");
        
        assert!(drop.get_counter() > 0, "All drops have been claimed");
        
        // Calculate funding amount based on drop type
        let initial_funding = self.calculate_initial_funding(&drop);
        
        env::log_str(&format!(
            "Creating account {} and claiming drop {}",
            account_id,
            drop_id
        ));
        
        // Create account with initial funding
        Promise::new(account_id.clone())
            .create_account()
            .transfer(initial_funding)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(50_000_000_000_000))
                    .resolve_account_create(public_key, account_id, drop_id)
            )
    }
    
    /// Calculate initial funding based on drop type
    fn calculate_initial_funding(&self, drop: &Drop) -> NearToken {
        match drop {
            Drop::Near(_) => {
                // Basic storage funding
                NearToken::from_millinear(500) // 0.5 NEAR for storage
            }
            Drop::FungibleToken(_) => {
                // Extra for FT registration
                NearToken::from_near(1) // 1 NEAR to cover FT storage registration
            }
            Drop::NonFungibleToken(_) => {
                // Standard funding for NFT ownership
                NearToken::from_millinear(500) // 0.5 NEAR
            }
        }
    }
    
    /// Resolve account creation and proceed with claim
    #[private]
    pub fn resolve_account_create(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
        drop_id: u64,
    ) {
        match env::promise_result(0) {
            PromiseResult::Successful(_) => {
                env::log_str(&format!("Successfully created account {}", account_id));
                
                // Account created successfully, now claim the drop
                self.internal_claim(&public_key, &account_id);
            }
            PromiseResult::Failed => {
                env::log_str(&format!("Failed to create account {}", account_id));
                
                // Account creation failed - could be:
                // 1. Account already exists
                // 2. Invalid account ID
                // 3. Insufficient funds
                
                // Try to claim anyway in case account already exists
                match self.check_account_exists(&account_id) {
                    Ok(true) => {
                        env::log_str("Account already exists, proceeding with claim");
                        self.internal_claim(&public_key, &account_id);
                    }
                    _ => {
                        env::panic_str("Account creation failed and account does not exist");
                    }
                }
            }
        }
    }
    
    /// Check if an account exists
    fn check_account_exists(&self, account_id: &AccountId) -> Result<bool, String> {
        // This is a simplified check - in practice you might want to make
        // a cross-contract call to verify account existence
        Ok(account_id.as_str().len() >= 2)
    }
}
```

---

## Advanced Account Creation Patterns

### Batch Account Creation

Create multiple accounts efficiently:

```rust
impl Contract {
    /// Create multiple accounts and claim drops in batch
    pub fn batch_create_accounts_and_claim(
        &mut self,
        account_configs: Vec<AccountConfig>,
    ) -> Promise {
        assert!(
            !account_configs.is_empty() && account_configs.len() <= 10,
            "Can create 1-10 accounts per batch"
        );
        
        let total_funding = account_configs.len() as u128 * 
            NearToken::from_near(1).as_yoctonear();
        
        assert!(
            env::account_balance() >= NearToken::from_yoctonear(total_funding),
            "Insufficient balance for batch account creation"
        );
        
        // Create accounts sequentially
        let mut promise = Promise::new(account_configs[0].account_id.clone())
            .create_account()
            .transfer(NearToken::from_near(1));
        
        for config in account_configs.iter().skip(1) {
            promise = promise.then(
                Promise::new(config.account_id.clone())
                    .create_account()
                    .transfer(NearToken::from_near(1))
            );
        }
        
        // Resolve all creations
        promise.then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(100_000_000_000_000))
                .resolve_batch_account_creation(account_configs)
        )
    }
    
    /// Resolve batch account creation
    #[private]
    pub fn resolve_batch_account_creation(
        &mut self,
        account_configs: Vec<AccountConfig>,
    ) {
        let mut successful_accounts = Vec::new();
        let mut failed_accounts = Vec::new();
        
        for (i, config) in account_configs.iter().enumerate() {
            match env::promise_result(i) {
                PromiseResult::Successful(_) => {
                    successful_accounts.push(config.account_id.clone());
                }
                PromiseResult::Failed => {
                    failed_accounts.push(config.account_id.clone());
                }
            }
        }
        
        env::log_str(&format!(
            "Created {} accounts successfully, {} failed",
            successful_accounts.len(),
            failed_accounts.len()
        ));
        
        // Process claims for successful accounts
        for config in account_configs {
            if successful_accounts.contains(&config.account_id) {
                self.internal_claim(&config.public_key, &config.account_id);
            }
        }
    }
}

#[derive(near_sdk::serde::Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct AccountConfig {
    pub account_id: AccountId,
    pub public_key: PublicKey,
}
```

### Account Creation with Custom Funding

Allow variable funding amounts based on use case:

```rust
impl Contract {
    /// Create account with custom funding amount
    pub fn create_account_with_funding(
        &mut self,
        account_id: AccountId,
        funding_amount: NearToken,
    ) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Validate funding amount
        assert!(
            funding_amount >= NearToken::from_millinear(100),
            "Minimum funding is 0.1 NEAR"
        );
        
        assert!(
            funding_amount <= NearToken::from_near(10),
            "Maximum funding is 10 NEAR"
        );
        
        // Validate we have enough balance
        let contract_balance = env::account_balance();
        assert!(
            contract_balance >= funding_amount,
            "Contract has insufficient balance for funding"
        );
        
        Promise::new(account_id.clone())
            .create_account()
            .transfer(funding_amount)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(30_000_000_000_000))
                    .resolve_custom_funding_creation(
                        public_key,
                        account_id,
                        funding_amount,
                    )
            )
    }
    
    /// Resolve custom funding account creation
    #[private]
    pub fn resolve_custom_funding_creation(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
        funding_amount: NearToken,
    ) {
        if is_promise_success() {
            env::log_str(&format!(
                "Created account {} with {} NEAR funding",
                account_id,
                funding_amount.as_near()
            ));
            
            self.internal_claim(&public_key, &account_id);
        } else {
            env::panic_str("Custom funding account creation failed");
        }
    }
}
```

---

## Account Naming Strategies

### Deterministic Account Names

Generate predictable account names:

```rust
use near_sdk::env::sha256;

impl Contract {
    /// Generate deterministic account name from public key
    pub fn generate_account_name(&self, public_key: &PublicKey) -> AccountId {
        let key_bytes = match public_key {
            PublicKey::ED25519(bytes) => bytes,
            _ => env::panic_str("Unsupported key type"),
        };
        
        // Create deterministic hash
        let hash = sha256(key_bytes);
        let hex_string = hex::encode(&hash[..8]); // Use first 8 bytes
        
        // Create account ID
        let account_str = format!("{}.{}", hex_string, self.top_level_account);
        
        account_str.parse().unwrap_or_else(|_| {
            env::panic_str("Failed to generate valid account ID")
        })
    }
    
    /// Create account with deterministic name
    pub fn create_deterministic_account_and_claim(&mut self) -> Promise {
        let public_key = env::signer_account_pk();
        let account_id = self.generate_account_name(&public_key);
        
        self.create_account_and_claim(account_id)
    }
}
```

### Human-Readable Account Names

Allow users to choose their account names with validation:

```rust
impl Contract {
    /// Create account with user-chosen name
    pub fn create_named_account_and_claim(
        &mut self,
        preferred_name: String,
    ) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Sanitize and validate name
        let clean_name = self.sanitize_account_name(&preferred_name);
        let account_id = format!("{}.{}", clean_name, self.top_level_account)
            .parse::<AccountId>()
            .unwrap_or_else(|_| env::panic_str("Invalid account name"));
        
        self.create_account_and_claim(account_id)
    }
    
    /// Sanitize user input for account names
    fn sanitize_account_name(&self, name: &str) -> String {
        name.to_lowercase()
            .chars()
            .filter(|c| c.is_ascii_alphanumeric() || *c == '-' || *c == '_')
            .take(32) // Limit length
            .collect()
    }
    
    /// Check if an account name is available
    pub fn is_account_name_available(&self, name: String) -> Promise {
        let clean_name = self.sanitize_account_name(&name);
        let account_id = format!("{}.{}", clean_name, self.top_level_account);
        
        // This would need a cross-contract call to check existence
        // For now, return a simple validation
        Promise::new(account_id.parse().unwrap())
            .function_call(
                "get_account".to_string(),
                vec![],
                NearToken::from_yoctonear(0),
                Gas(5_000_000_000_000),
            )
    }
}
```

---

## Account Recovery Patterns

### Key Rotation for New Accounts

Set up key rotation for newly created accounts:

```rust
impl Contract {
    /// Create account with key rotation setup
    pub fn create_secure_account_and_claim(
        &mut self,
        account_id: AccountId,
        recovery_key: PublicKey,
    ) -> Promise {
        let public_key = env::signer_account_pk();
        
        Promise::new(account_id.clone())
            .create_account()
            .transfer(NearToken::from_near(1))
            .add_full_access_key(recovery_key) // Add recovery key
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(50_000_000_000_000))
                    .resolve_secure_account_creation(
                        public_key,
                        account_id,
                    )
            )
    }
    
    /// Set up account security after creation
    #[private]
    pub fn resolve_secure_account_creation(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
    ) {
        if is_promise_success() {
            env::log_str(&format!(
                "Created secure account {} with recovery key",
                account_id
            ));
            
            // Claim tokens
            self.internal_claim(&public_key, &account_id);
            
            // Optional: Remove the original function-call key after successful claim
            Promise::new(account_id)
                .delete_key(public_key);
        } else {
            env::panic_str("Secure account creation failed");
        }
    }
}
```

---

## Integration with Wallets

### Wallet Integration for Account Creation

```javascript
// Frontend integration for account creation
class AccountCreationService {
    constructor(contract, wallet) {
        this.contract = contract;
        this.wallet = wallet;
    }
    
    async createAccountAndClaim(privateKey, preferredName) {
        try {
            // Import the private key temporarily
            const keyPair = KeyPair.fromString(privateKey);
            
            // Sign transaction with the private key
            const outcome = await this.wallet.signAndSendTransaction({
                receiverId: this.contract.contractId,
                actions: [{
                    type: 'FunctionCall',
                    params: {
                        methodName: 'create_named_account_and_claim',
                        args: {
                            preferred_name: preferredName
                        },
                        gas: '100000000000000',
                        deposit: '0'
                    }
                }]
            });
            
            return {
                success: true,
                transactionHash: outcome.transaction.hash,
                newAccountId: `${preferredName}.testnet`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    async checkAccountAvailability(name) {
        try {
            const result = await this.contract.is_account_name_available({
                name: name
            });
            return { available: true };
        } catch (error) {
            return { available: false, reason: error.message };
        }
    }
}
```

---

## Error Handling and Recovery

### Comprehensive Error Handling

```rust
impl Contract {
    /// Handle account creation errors gracefully
    pub fn create_account_with_fallback(
        &mut self,
        primary_account_id: AccountId,
        fallback_account_id: Option<AccountId>,
    ) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Try primary account creation
        Promise::new(primary_account_id.clone())
            .create_account()
            .transfer(NearToken::from_near(1))
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(60_000_000_000_000))
                    .resolve_account_creation_with_fallback(
                        public_key,
                        primary_account_id,
                        fallback_account_id,
                    )
            )
    }
    
    /// Resolve with fallback options
    #[private]
    pub fn resolve_account_creation_with_fallback(
        &mut self,
        public_key: PublicKey,
        primary_account_id: AccountId,
        fallback_account_id: Option<AccountId>,
    ) {
        match env::promise_result(0) {
            PromiseResult::Successful(_) => {
                // Primary account creation succeeded
                self.internal_claim(&public_key, &primary_account_id);
            }
            PromiseResult::Failed => {
                if let Some(fallback_id) = fallback_account_id {
                    env::log_str("Primary account creation failed, trying fallback");
                    
                    // Try fallback account
                    Promise::new(fallback_id.clone())
                        .create_account()
                        .transfer(NearToken::from_near(1))
                        .then(
                            Self::ext(env::current_account_id())
                                .with_static_gas(Gas(30_000_000_000_000))
                                .resolve_fallback_creation(public_key, fallback_id)
                        );
                } else {
                    // No fallback, try to claim with existing account
                    env::log_str("No fallback available, attempting direct claim");
                    self.internal_claim(&public_key, &primary_account_id);
                }
            }
        }
    }
    
    /// Resolve fallback account creation
    #[private]
    pub fn resolve_fallback_creation(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
    ) {
        if is_promise_success() {
            env::log_str("Fallback account creation succeeded");
            self.internal_claim(&public_key, &account_id);
        } else {
            env::panic_str("Both primary and fallback account creation failed");
        }
    }
}
```

---

## Testing Account Creation

### CLI Testing Commands

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create account and claim with deterministic name
  near call drop-contract.testnet create_deterministic_account_and_claim \
    --accountId drop-contract.testnet \
    --keyPair '{"public_key": "ed25519:...", "private_key": "ed25519:..."}'

  # Create account with custom name
  near call drop-contract.testnet create_named_account_and_claim '{
    "preferred_name": "alice-drop"
  }' --accountId drop-contract.testnet \
    --keyPair '{"public_key": "ed25519:...", "private_key": "ed25519:..."}'

  # Check if account was created successfully
  near view alice-drop.testnet get_account
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create account and claim with deterministic name
  near contract call-function as-transaction drop-contract.testnet create_deterministic_account_and_claim json-args '{}' prepaid-gas '150.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:... --signer-private-key ed25519:... send

  # Create account with custom name
  near contract call-function as-transaction drop-contract.testnet create_named_account_and_claim json-args '{
    "preferred_name": "alice-drop"
  }' prepaid-gas '150.0 Tgas' attached-deposit '0 NEAR' sign-as drop-contract.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:... --signer-private-key ed25519:... send

  # Check if account was created successfully  
  near contract call-function as-read-only alice-drop.testnet state json-args '{}' network-config testnet now
  ```
  </TabItem>
</Tabs>

---

## Performance Considerations

### Optimizing Account Creation

```rust
// Constants for account creation optimization
const MAX_ACCOUNTS_PER_BATCH: usize = 5;
const MIN_ACCOUNT_FUNDING: NearToken = NearToken::from_millinear(100);
const MAX_ACCOUNT_FUNDING: NearToken = NearToken::from_near(5);

impl Contract {
    /// Optimized account creation with resource management
    pub fn create_account_optimized(&mut self, account_id: AccountId) -> Promise {
        // Check contract balance before creation
        let available_balance = env::account_balance();
        let required_funding = NearToken::from_near(1);
        
        assert!(
            available_balance >= required_funding.saturating_mul(2),
            "Insufficient contract balance for account creation"
        );
        
        // Create with minimal required funding
        Promise::new(account_id.clone())
            .create_account()
            .transfer(required_funding)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(40_000_000_000_000))
                    .resolve_optimized_creation(
                        env::signer_account_pk(),
                        account_id,
                    )
            )
    }
}
```

---

## Next Steps

Account creation is the final piece of the onboarding puzzle. Users can now:
1. Receive private keys for drops
2. Create NEAR accounts without existing tokens
3. Claim their tokens to new accounts
4. Start using NEAR immediately

Next, let's build a frontend that ties everything together into a seamless user experience.

[Continue to Frontend Integration →](./frontend)

---

:::note Account Creation Best Practices
- Always validate account IDs before creation attempts
- Provide adequate initial funding based on intended use
- Implement fallback strategies for failed creations
- Consider deterministic naming for better UX
- Monitor contract balance to ensure sufficient funds for creation
:::