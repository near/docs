---
id: access-keys
title: Access Key Management
sidebar_label: Access Key Management
description: "Understand how function-call access keys enable gasless operations in NEAR Drop."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is where NEAR gets really cool. Function-call access keys are what make gasless claiming possible - let's understand how they work!

---

## The Problem NEAR Solves

Traditional blockchains have a chicken-and-egg problem:
- You need tokens to pay gas fees
- But you need gas to receive tokens
- New users are stuck!

NEAR's solution: **Function-call access keys** that let you call specific functions without owning the account.

---

## How Access Keys Work

NEAR has two types of keys:

**Full Access Keys** 🔑
- Complete control over an account
- Can do anything: transfer tokens, deploy contracts, etc.
- Like having admin access

**Function-Call Keys** 🎫  
- Limited permissions
- Can only call specific functions
- Like having a concert ticket - gets you in, but only to your seat

---

## NEAR Drop's Key Magic

Here's what happens when you create a drop:

   <TabItem value="rust" label="🦀 Rust">
```rust
// 1. Generate public/private key pairs
let keypair = KeyPair::fromRandom('ed25519');

// 2. Add public key to contract with limited permissions
Promise::new(contract_account)
    .add_access_key(
        public_key,
        NearToken::from_millinear(5),  // 0.005 NEAR gas budget
        contract_account,               // Can only call this contract
        "claim_for,create_account_and_claim"  // Only these methods
    )

// 3. Give private key to recipient
// 4. Recipient signs transactions using the CONTRACT'S account (gasless!)
```
</TabItem>

**The result**: Recipients can claim tokens without having NEAR accounts or paying gas!

---

## Key Permissions Breakdown

Function-call keys in NEAR Drop have strict limits:

   <TabItem value="rust" label="🦀 Rust">
```rust
pub struct AccessKeyPermission {
    allowance: NearToken::from_millinear(5),    // Gas budget: 0.005 NEAR
    receiver_id: "drop-contract.testnet",       // Can only call this contract
    method_names: ["claim_for", "create_account_and_claim"]  // Only these methods
}
```
</TabItem>

**What keys CAN do:**
- Call `claim_for` to claim to existing accounts
- Call `create_account_and_claim` to create new accounts
- Use up to 0.005 NEAR worth of gas

**What keys CANNOT do:**
- Transfer tokens from the contract
- Call any other functions
- Deploy contracts or change state maliciously
- Exceed their gas allowance

---

## Key Lifecycle

The lifecycle is simple and secure:

```
1. CREATE → Add key with limited permissions
2. SHARE → Give private key to recipient  
3. CLAIM → Recipient uses key to claim tokens
4. CLEANUP → Remove key after use (prevents reuse)
```

Here's the cleanup code:

   <TabItem value="rust" label="🦀 Rust">
```rust
fn cleanup_after_claim(&mut self, public_key: &PublicKey) {
    // Remove mapping
    self.drop_id_by_key.remove(public_key);
    
    // Delete the access key
    Promise::new(env::current_account_id())
        .delete_key(public_key.clone());
        
    env::log_str("Key cleaned up after claim");
}
```
</TabItem>

---

## Advanced Key Patterns

### Time-Limited Keys

You can make keys that expire:

   <TabItem value="rust" label="🦀 Rust">
```rust
pub struct TimeLimitedDrop {
    drop: Drop,
    expires_at: Timestamp,
}

impl Contract {
    pub fn cleanup_expired_keys(&mut self) {
        let now = env::block_timestamp();
        
        // Find and remove expired drops
        for (drop_id, drop) in self.time_limited_drops.iter() {
            if now > drop.expires_at {
                self.remove_all_keys_for_drop(drop_id);
            }
        }
    }
}
```
</TabItem>

### Key Rotation

For extra security, you can rotate keys:

   <TabItem value="rust" label="🦀 Rust">
```rust
impl Contract {
    pub fn rotate_drop_keys(&mut self, drop_id: u64, new_keys: Vec<PublicKey>) {
        // Remove old keys
        self.remove_old_keys(drop_id);
        
        // Add new keys
        for key in new_keys {
            self.add_claim_key(&key, drop_id);
        }
    }
}
```
</TabItem>

---

## Security Best Practices

**✅ DO:**
- Use minimal gas allowances (0.005 NEAR is plenty)
- Remove keys immediately after use
- Validate key formats before adding
- Monitor key usage patterns

**❌ DON'T:**
- Give keys excessive gas allowances
- Reuse keys for multiple drops
- Skip cleanup after claims
- Log private keys anywhere

---

## Gas Usage Monitoring

Track how much gas your keys use:

   <TabItem value="rust" label="🦀 Rust">
```rust
impl Contract {
    pub fn track_key_usage(&mut self, operation: &str) {
        let gas_used = env::used_gas();
        
        // Log for monitoring
        env::log_str(&format!("{} used {} gas", operation, gas_used.0));
        
        // Could store in state for analytics
        self.gas_usage_stats.insert(operation, gas_used);
    }
}
```
</TabItem>

---

## Integration with Frontend

Your frontend can generate keys securely:

<TabItem value="js" label="🌐 JavaScript">
```javascript
import { KeyPair } from 'near-api-js';

// Generate keys on the client
function generateDropKeys(count) {
    return Array.from({ length: count }, () => {
        const keyPair = KeyPair.fromRandom('ed25519');
        return {
            publicKey: keyPair.publicKey.toString(),
            privateKey: keyPair.secretKey,
            claimUrl: generateClaimUrl(keyPair.secretKey)
        };
    });
}

// Create claim URLs
function generateClaimUrl(privateKey) {
    return `${window.location.origin}/claim?key=${encodeURIComponent(privateKey)}`;
}
```
</TabItem>

---

## Troubleshooting Common Issues

**"Access key not found"**
- Key wasn't added properly to the contract
- Key was already used and cleaned up
- Check the public key format

**"Method not allowed"**
- Trying to call a function not in the allowed methods list
- Our keys only allow `claim_for` and `create_account_and_claim`

**"Insufficient allowance"**
- Key ran out of gas budget
- Increase `FUNCTION_CALL_ALLOWANCE` if needed

**"Key already exists"**
- Trying to add a duplicate key
- Generate new unique keys for each drop

---

## Why This Matters

Function-call access keys are NEAR's superpower for user experience:

🎯 **No Onboarding Friction**: New users can interact immediately
⚡ **Gasless Operations**: Recipients don't pay anything  
🔒 **Still Secure**: Keys have minimal, specific permissions
🚀 **Scalable**: Works for any number of recipients

This is what makes NEAR Drop possible - without function-call keys, you'd need a completely different (and much more complex) approach.

---

## Next Steps

Now that you understand how the gasless magic works, let's see how to create new NEAR accounts during the claiming process.

[Continue to Account Creation →](./account-creation.md)

---

:::tip Key Insight
Function-call access keys are like giving someone a specific key to your house that only opens one room and only works once. It's secure, limited, and perfect for token distribution!
:::