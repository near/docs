---
id: access-keys
title: Access Key Management
sidebar_label: Access Key Management  
description: "Deep dive into NEAR's function-call access keys and how they enable gasless operations in the NEAR Drop system. Learn key generation, management, and security patterns."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Function-call access keys are one of NEAR's most powerful features, enabling gasless operations and seamless user experiences. In the NEAR Drop system, they're the secret sauce that allows recipients to claim tokens without needing NEAR tokens for gas fees.

---

## Understanding NEAR Access Keys

NEAR supports two types of access keys:

1. **Full Access Keys**: Complete control over an account (like a master key)
2. **Function-Call Access Keys**: Limited permissions to call specific methods

![Access Key Types](/docs/assets/tutorials/near-drop/access-key-types.png)

### Why Function-Call Keys Are Perfect for Drops

Function-call keys solve a classic blockchain UX problem: new users need tokens to pay for gas, but they need gas to claim tokens. It's a chicken-and-egg problem that function-call keys elegantly solve.

---

## How Access Keys Work in NEAR Drop

### The Access Key Lifecycle

1. **Key Generation**: Create a public/private key pair
2. **Key Addition**: Add the public key to the contract with limited permissions  
3. **Key Distribution**: Share the private key with recipients
4. **Key Usage**: Recipients use the key to sign claiming transactions
5. **Key Cleanup**: Remove used keys to prevent reuse

```rust
// Adding a function-call access key
Promise::new(env::current_account_id())
    .add_access_key(
        public_key.clone(),
        FUNCTION_CALL_ALLOWANCE, // Gas allowance
        env::current_account_id(), // Receiver contract
        "claim_for,create_account_and_claim".to_string(), // Allowed methods
    )
```

### Key Permissions and Restrictions

Function-call keys in NEAR Drop have very specific limitations:

```rust
// Key permissions structure
pub struct AccessKeyPermission {
    pub allowance: Option<NearToken>,      // Gas budget
    pub receiver_id: AccountId,            // Which contract can be called
    pub method_names: Vec<String>,         // Which methods are allowed
}
```

For NEAR Drop keys:
- **Allowance**: Limited gas budget (e.g., 0.005 NEAR)
- **Receiver**: Only the drop contract itself
- **Methods**: Only `claim_for` and `create_account_and_claim`

---

## Implementing Key Management

### Key Generation Strategies

There are several approaches to generating keys for drops:

#### 1. Contract-Generated Keys (Recommended)

Let the contract generate keys internally:

```rust
use near_sdk::env::random_seed;
use ed25519_dalek::{Keypair, PublicKey as Ed25519PublicKey};

impl Contract {
    /// Generate a new keypair for a drop
    pub fn generate_drop_keypair(&self) -> (PublicKey, String) {
        let mut rng = near_sdk::env::rng_seed();
        let keypair = Keypair::generate(&mut rng);
        
        let public_key = PublicKey::ED25519(
            keypair.public.to_bytes().try_into().unwrap()
        );
        
        let private_key = base58::encode(keypair.secret.to_bytes());
        
        (public_key, private_key)
    }
    
    /// Create drop with auto-generated keys
    pub fn create_near_drop_with_keys(
        &mut self,
        num_keys: u32,
        amount_per_drop: NearToken,
    ) -> Vec<DropKey> {
        let mut drop_keys = Vec::new();
        let mut public_keys = Vec::new();
        
        for _ in 0..num_keys {
            let (public_key, private_key) = self.generate_drop_keypair();
            
            drop_keys.push(DropKey {
                public_key: public_key.clone(),
                private_key,
            });
            
            public_keys.push(public_key);
        }
        
        // Create the drop
        let drop_id = self.create_near_drop(public_keys, amount_per_drop);
        
        // Return keys for distribution
        drop_keys
    }
}

#[derive(near_sdk::serde::Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct DropKey {
    pub public_key: PublicKey,
    pub private_key: String,
}
```

#### 2. Client-Generated Keys

Generate keys on the client side and submit public keys:

```javascript
// Frontend key generation example
import { KeyPair } from 'near-api-js';

function generateDropKeys(count) {
    const keys = [];
    
    for (let i = 0; i < count; i++) {
        const keyPair = KeyPair.fromRandom('ed25519');
        keys.push({
            publicKey: keyPair.publicKey.toString(),
            privateKey: keyPair.secretKey,
        });
    }
    
    return keys;
}

// Use with drop creation
const keys = generateDropKeys(10);
const publicKeys = keys.map(k => k.publicKey);

await contract.create_near_drop({
    public_keys: publicKeys,
    amount_per_drop: '1000000000000000000000000', // 1 NEAR
});
```

---

## Advanced Key Management Patterns

### Key Rotation for Security

Implement key rotation to enhance security:

```rust
impl Contract {
    /// Rotate access keys for enhanced security
    pub fn rotate_drop_keys(&mut self, drop_id: u64, new_public_keys: Vec<PublicKey>) {
        let mut drop = self.drop_by_id.get(&drop_id)
            .expect("Drop not found");
        
        // Only allow rotation if no claims have been made
        assert_eq!(
            drop.get_counter(),
            new_public_keys.len() as u64,
            "Cannot rotate keys after claims have been made"
        );
        
        // Remove old keys
        self.remove_drop_keys(drop_id);
        
        // Add new keys
        for public_key in new_public_keys {
            self.add_access_key_for_drop(&public_key);
            self.drop_id_by_key.insert(&public_key, &drop_id);
        }
        
        env::log_str(&format!("Rotated keys for drop {}", drop_id));
    }
    
    /// Remove all keys associated with a drop
    fn remove_drop_keys(&mut self, drop_id: u64) {
        let keys_to_remove: Vec<PublicKey> = self.drop_id_by_key
            .iter()
            .filter_map(|(key, id)| if id == drop_id { Some(key) } else { None })
            .collect();
        
        for key in keys_to_remove {
            self.drop_id_by_key.remove(&key);
            Promise::new(env::current_account_id())
                .delete_key(key);
        }
    }
}
```

### Time-Limited Keys

Create keys that expire after a certain time:

```rust
use near_sdk::Timestamp;

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct TimeLimitedDrop {
    pub drop: Drop,
    pub expires_at: Timestamp,
}

impl Contract {
    /// Create a time-limited drop
    pub fn create_time_limited_drop(
        &mut self,
        public_keys: Vec<PublicKey>,
        amount_per_drop: NearToken,
        duration_seconds: u64,
    ) -> u64 {
        let expires_at = env::block_timestamp() + (duration_seconds * 1_000_000_000);
        
        // Create normal drop first
        let drop_id = self.create_near_drop(public_keys, amount_per_drop);
        
        // Convert to time-limited drop
        if let Some(drop) = self.drop_by_id.remove(&drop_id) {
            let time_limited_drop = TimeLimitedDrop {
                drop,
                expires_at,
            };
            
            // Store as time-limited (you'd need to update your storage structure)
            self.time_limited_drops.insert(&drop_id, &time_limited_drop);
        }
        
        drop_id
    }
    
    /// Check if a drop has expired
    pub fn is_drop_expired(&self, drop_id: u64) -> bool {
        if let Some(time_limited_drop) = self.time_limited_drops.get(&drop_id) {
            env::block_timestamp() > time_limited_drop.expires_at
        } else {
            false
        }
    }
    
    /// Cleanup expired drops
    pub fn cleanup_expired_drops(&mut self) {
        let current_time = env::block_timestamp();
        let mut expired_drops = Vec::new();
        
        for (drop_id, time_limited_drop) in self.time_limited_drops.iter() {
            if current_time > time_limited_drop.expires_at {
                expired_drops.push(drop_id);
            }
        }
        
        for drop_id in expired_drops {
            self.remove_drop_keys(drop_id);
            self.time_limited_drops.remove(&drop_id);
            env::log_str(&format!("Cleaned up expired drop {}", drop_id));
        }
    }
}
```

---

## Key Security Best Practices

### 1. Minimal Permissions

Always use the principle of least privilege:

```rust
// Good: Minimal gas allowance
const FUNCTION_CALL_ALLOWANCE: NearToken = NearToken::from_millinear(5); // 0.005 NEAR

// Good: Specific method restrictions  
let allowed_methods = "claim_for,create_account_and_claim".to_string();

// Good: Contract-specific receiver
let receiver_id = env::current_account_id();
```

### 2. Key Lifecycle Management

Properly manage the entire key lifecycle:

```rust
impl Contract {
    /// Complete key lifecycle management
    fn manage_drop_key_lifecycle(
        &mut self,
        public_key: &PublicKey,
        drop_id: u64,
    ) {
        // 1. Add key with minimal permissions
        self.add_access_key_for_drop(public_key);
        
        // 2. Map key to drop
        self.drop_id_by_key.insert(public_key, &drop_id);
        
        // 3. Log key creation for audit trail
        env::log_str(&format!(
            "Added access key {} for drop {}",
            public_key,
            drop_id
        ));
        
        // 4. Set up cleanup (handled in claim functions)
    }
    
    /// Secure key cleanup after use
    fn secure_key_cleanup(&mut self, public_key: &PublicKey) {
        // 1. Remove from mappings
        self.drop_id_by_key.remove(public_key);
        
        // 2. Delete from account
        Promise::new(env::current_account_id())
            .delete_key(public_key.clone());
        
        // 3. Log removal for audit trail
        env::log_str(&format!(
            "Removed access key {} after use",
            public_key
        ));
    }
}
```

### 3. Key Validation

Validate keys before adding them:

```rust
impl Contract {
    /// Validate public key before adding
    fn validate_public_key(&self, public_key: &PublicKey) -> Result<(), String> {
        match public_key {
            PublicKey::ED25519(key_data) => {
                if key_data.len() != 32 {
                    return Err("Invalid ED25519 key length".to_string());
                }
                
                // Check if key already exists
                if self.drop_id_by_key.contains_key(public_key) {
                    return Err("Key already exists".to_string());
                }
                
                Ok(())
            }
            _ => Err("Only ED25519 keys are supported".to_string()),
        }
    }
    
    /// Safe key addition with validation
    pub fn add_validated_access_key(&mut self, public_key: PublicKey, drop_id: u64) {
        self.validate_public_key(&public_key)
            .unwrap_or_else(|err| env::panic_str(&err));
        
        self.manage_drop_key_lifecycle(&public_key, drop_id);
    }
}
```

---

## Monitoring and Analytics

### Key Usage Tracking

Track how keys are being used:

```rust
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct KeyUsageStats {
    pub total_keys_created: u64,
    pub keys_claimed: u64,
    pub keys_expired: u64,
    pub average_claim_time: u64,
}

impl Contract {
    /// Track key usage statistics
    pub fn get_key_usage_stats(&self) -> KeyUsageStats {
        KeyUsageStats {
            total_keys_created: self.total_keys_created,
            keys_claimed: self.keys_claimed,
            keys_expired: self.keys_expired,
            average_claim_time: self.calculate_average_claim_time(),
        }
    }
    
    /// Update stats when key is claimed
    fn update_claim_stats(&mut self, claim_timestamp: Timestamp) {
        self.keys_claimed += 1;
        self.total_claim_time += claim_timestamp - self.drop_creation_time;
    }
}
```

### Gas Usage Analysis

Monitor gas consumption patterns:

```rust
impl Contract {
    /// Track gas usage for different operations
    pub fn track_gas_usage(&mut self, operation: &str, gas_used: Gas) {
        let current_stats = self.gas_usage_stats.get(operation)
            .unwrap_or_default();
        
        let updated_stats = GasUsageStats {
            total_calls: current_stats.total_calls + 1,
            total_gas: current_stats.total_gas + gas_used.0,
            average_gas: (current_stats.total_gas + gas_used.0) / 
                        (current_stats.total_calls + 1),
        };
        
        self.gas_usage_stats.insert(operation.to_string(), &updated_stats);
    }
    
    /// Get gas usage statistics
    pub fn get_gas_stats(&self, operation: String) -> Option<GasUsageStats> {
        self.gas_usage_stats.get(&operation)
    }
}
```

---

## Integration Patterns

### With Web Applications

```javascript
// Frontend integration example
class NearDropClient {
    constructor(contract) {
        this.contract = contract;
    }
    
    async createDropWithKeys(numKeys, amountPerDrop) {
        // Generate keys locally for better security
        const keys = this.generateKeys(numKeys);
        const publicKeys = keys.map(k => k.publicKey);
        
        // Create drop with public keys
        const dropId = await this.contract.create_near_drop({
            public_keys: publicKeys,
            amount_per_drop: amountPerDrop,
        });
        
        // Return drop info with private keys for distribution
        return {
            dropId,
            keys: keys.map(k => ({
                publicKey: k.publicKey,
                privateKey: k.secretKey,
                claimUrl: this.generateClaimUrl(k.secretKey),
            })),
        };
    }
    
    generateClaimUrl(privateKey) {
        return `https://yourapp.com/claim?key=${privateKey}`;
    }
}
```

### With QR Codes

```javascript
// Generate QR codes for drop links
import QRCode from 'qrcode';

async function generateDropQRCodes(dropKeys) {
    const qrCodes = [];
    
    for (const key of dropKeys) {
        const claimUrl = `https://yourapp.com/claim?key=${key.privateKey}`;
        const qrCodeDataUrl = await QRCode.toDataURL(claimUrl);
        
        qrCodes.push({
            publicKey: key.publicKey,
            qrCode: qrCodeDataUrl,
            claimUrl,
        });
    }
    
    return qrCodes;
}
```

---

## Troubleshooting Common Issues

### Key Permission Errors

```rust
// Common error: Key doesn't have permission
impl Contract {
    /// Diagnose key permission issues
    pub fn diagnose_key_permissions(&self, public_key: PublicKey) -> KeyDiagnostic {
        let drop_id = self.drop_id_by_key.get(&public_key);
        
        KeyDiagnostic {
            key_exists: drop_id.is_some(),
            drop_exists: drop_id.map(|id| self.drop_by_id.contains_key(&id)).unwrap_or(false),
            has_claims_remaining: drop_id
                .and_then(|id| self.drop_by_id.get(&id))
                .map(|drop| drop.get_counter() > 0)
                .unwrap_or(false),
        }
    }
}

#[derive(near_sdk::serde::Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct KeyDiagnostic {
    pub key_exists: bool,
    pub drop_exists: bool,
    pub has_claims_remaining: bool,
}
```

### Gas Estimation Issues

```rust
impl Contract {
    /// Estimate gas for different claim scenarios
    pub fn estimate_claim_gas(&self, drop_type: String) -> Gas {
        match drop_type.as_str() {
            "near" => Gas(15_000_000_000_000),     // 15 TGas
            "ft" => Gas(100_000_000_000_000),      // 100 TGas (includes cross-contract calls)
            "nft" => Gas(50_000_000_000_000),      // 50 TGas
            _ => Gas(20_000_000_000_000),          // Default
        }
    }
    
    /// Check if key has sufficient allowance
    pub fn check_key_allowance(&self, public_key: PublicKey, operation: String) -> bool {
        let required_gas = self.estimate_claim_gas(operation);
        required_gas.0 <= FUNCTION_CALL_ALLOWANCE.as_yoctonear()
    }
}
```

---

## Next Steps

Access keys are fundamental to NEAR Drop's gasless experience. With proper key management, you can create seamless token distribution experiences that don't require recipients to have existing NEAR accounts or tokens.

Next, let's explore how to create new NEAR accounts during the claiming process, completing the onboarding experience.

[Continue to Account Creation →](./account-creation)

---

:::note Access Key Best Practices
- Use minimal gas allowances (0.005 NEAR is usually sufficient)
- Restrict methods to only what's necessary for claiming
- Always clean up keys after use to prevent reuse
- Consider time-limited keys for additional security
- Monitor key usage patterns for optimization opportunities
:::