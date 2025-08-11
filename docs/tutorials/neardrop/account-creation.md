---
id: account-creation
title: Account Creation
sidebar_label: Account Creation
description: "Enable new users to create NEAR accounts automatically when claiming their first tokens."
---

The ultimate onboarding experience: users can claim tokens AND get a NEAR account created for them automatically. No existing account required!

---

## The Magic of NEAR Account Creation

Most blockchains require you to have an account before you can receive tokens. NEAR flips this around:

**Traditional Flow:**
1. Create wallet → Fund with tokens → Receive more tokens

**NEAR Drop Flow:**
1. Get private key → Claim tokens → Account created automatically ✨

This eliminates the biggest barrier to Web3 adoption.

---

## How It Works

Account creation happens in two phases:

### Phase 1: Create the Account
```rust
Promise::new(account_id.clone())
    .create_account()
    .transfer(NearToken::from_near(1))  // Fund with 1 NEAR
```

### Phase 2: Claim the Tokens
```rust
.then(
    Self::ext(env::current_account_id())
        .resolve_account_creation(public_key, account_id)
)
```

If account creation succeeds, we proceed with the normal claiming process. If it fails (account already exists), we try to claim anyway.

---

## Implementation

Add this to your `src/claim.rs`:

```rust
#[near_bindgen]
impl Contract {
    /// Create new account and claim tokens to it
    pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
        let public_key = env::signer_account_pk();
        
        // Validate account format
        self.validate_account_id(&account_id);
        
        // Check we have a valid drop for this key
        let drop_id = self.drop_id_by_key.get(&public_key)
            .expect("No drop found for this key");
        
        let drop = self.drop_by_id.get(&drop_id)
            .expect("Drop data not found");
        
        // Calculate funding based on drop type
        let funding = self.calculate_account_funding(&drop);
        
        // Create account with initial funding
        Promise::new(account_id.clone())
            .create_account()
            .transfer(funding)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(Gas(50_000_000_000_000))
                    .resolve_account_creation(public_key, account_id)
            )
    }
    
    /// Handle account creation result
    #[private]
    pub fn resolve_account_creation(
        &mut self,
        public_key: PublicKey,
        account_id: AccountId,
    ) {
        match env::promise_result(0) {
            PromiseResult::Successful(_) => {
                env::log_str(&format!("Created account {}", account_id));
                self.process_claim(&public_key, &account_id);
            }
            PromiseResult::Failed => {
                // Account creation failed - maybe it already exists?
                env::log_str("Account creation failed, trying to claim anyway");
                self.process_claim(&public_key, &account_id);
            }
        }
    }
    
    /// Validate account ID format
    fn validate_account_id(&self, account_id: &AccountId) {
        let account_str = account_id.as_str();
        
        // Check length
        assert!(account_str.len() >= 2 && account_str.len() <= 64, 
                "Account ID must be 2-64 characters");
        
        // Must be subaccount of top-level account
        assert!(account_str.ends_with(&format!(".{}", self.top_level_account)),
                "Account must end with .{}", self.top_level_account);
        
        // Check valid characters (lowercase, numbers, hyphens, underscores)
        let name_part = account_str.split('.').next().unwrap();
        assert!(name_part.chars().all(|c| 
            c.is_ascii_lowercase() || c.is_ascii_digit() || c == '-' || c == '_'
        ), "Invalid characters in account name");
    }
    
    /// Calculate how much NEAR to fund the new account with
    fn calculate_account_funding(&self, drop: &Drop) -> NearToken {
        match drop {
            Drop::Near(_) => NearToken::from_millinear(500),      // 0.5 NEAR
            Drop::FungibleToken(_) => NearToken::from_near(1),    // 1 NEAR (for FT registration)
            Drop::NonFungibleToken(_) => NearToken::from_millinear(500), // 0.5 NEAR
        }
    }
}
```

---

## Account Naming Strategies

### User-Chosen Names

Let users pick their own account names:

```rust
pub fn create_named_account_and_claim(&mut self, preferred_name: String) -> Promise {
    let public_key = env::signer_account_pk();
    
    // Clean up the name
    let clean_name = self.sanitize_name(&preferred_name);
    let full_account_id = format!("{}.{}", clean_name, self.top_level_account)
        .parse::<AccountId>()
        .expect("Invalid account name");
    
    self.create_account_and_claim(full_account_id)
}

fn sanitize_name(&self, name: &str) -> String {
    name.to_lowercase()
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || *c == '-' || *c == '_')
        .take(32)  // Limit length
        .collect()
}
```

### Deterministic Names

Or generate predictable names from keys:

```rust
use near_sdk::env::sha256;

pub fn create_deterministic_account_and_claim(&mut self) -> Promise {
    let public_key = env::signer_account_pk();
    
    // Generate name from public key hash
    let key_bytes = match &public_key {
        PublicKey::ED25519(bytes) => bytes,
        _ => env::panic_str("Unsupported key type"),
    };
    
    let hash = sha256(key_bytes);
    let name = hex::encode(&hash[..8]); // Use first 8 bytes
    
    let account_id = format!("{}.{}", name, self.top_level_account)
        .parse::<AccountId>()
        .expect("Failed to generate account ID");
    
    self.create_account_and_claim(account_id)
}
```

---

## Frontend Integration

Make account creation seamless in your UI:

```jsx
function ClaimForm() {
    const [claimType, setClaimType] = useState('new'); // 'existing' or 'new'
    const [accountName, setAccountName] = useState('');
    
    const handleClaim = async () => {
        const keyPair = KeyPair.fromString(privateKey);
        
        if (claimType === 'existing') {
            await contract.claim_for({ account_id: accountName });
        } else {
            await contract.create_named_account_and_claim({ 
                preferred_name: accountName 
            });
        }
    };

    return (
        <div>
            <div>
                <label>
                    <input 
                        type="radio" 
                        value="existing" 
                        checked={claimType === 'existing'}
                        onChange={(e) => setClaimType(e.target.value)}
                    />
                    Claim to existing account
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="new" 
                        checked={claimType === 'new'}
                        onChange={(e) => setClaimType(e.target.value)}
                    />
                    Create new account
                </label>
            </div>
            
            <input
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder={claimType === 'existing' ? 'alice.testnet' : 'my-new-name'}
            />
            {claimType === 'new' && <span>.testnet</span>}
            
            <button onClick={handleClaim}>
                {claimType === 'existing' ? 'Claim Tokens' : 'Create Account & Claim'}
            </button>
        </div>
    );
}
```

---

## Testing Account Creation

```bash
# Test creating new account and claiming
near call drop-test.testnet create_named_account_and_claim '{
  "preferred_name": "alice-new"
}' --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Check if account was created
near view alice-new.testnet state

# Verify balance includes claimed tokens
near view alice-new.testnet account
```

---

## Error Handling

Handle common issues gracefully:

```rust
impl Contract {
    pub fn create_account_with_fallback(
        &mut self,
        primary_name: String,
        fallback_name: Option<String>,
    ) -> Promise {
        let primary_account = format!("{}.{}", primary_name, self.top_level_account);
        
        // Try primary name first
        Promise::new(primary_account.parse().unwrap())
            .create_account()
            .transfer(NearToken::from_near(1))
            .then(
                Self::ext(env::current_account_id())
                    .handle_creation_with_fallback(primary_name, fallback_name)
            )
    }
    
    #[private]
    pub fn handle_creation_with_fallback(
        &mut self,
        primary_name: String,
        fallback_name: Option<String>,
    ) {
        if env::promise_result(0).is_successful() {
            // Primary succeeded
            let account_id = format!("{}.{}", primary_name, self.top_level_account);
            self.process_claim(&env::signer_account_pk(), &account_id.parse().unwrap());
        } else if let Some(fallback) = fallback_name {
            // Try fallback
            let fallback_account = format!("{}.{}", fallback, self.top_level_account);
            Promise::new(fallback_account.parse().unwrap())
                .create_account()
                .transfer(NearToken::from_near(1));
        } else {
            env::panic_str("Account creation failed and no fallback provided");
        }
    }
}
```

---

## Cost Considerations

Account creation costs depend on the drop type:

```rust
// Funding amounts by drop type
const NEAR_DROP_FUNDING: NearToken = NearToken::from_millinear(500);    // 0.5 NEAR
const FT_DROP_FUNDING: NearToken = NearToken::from_near(1);             // 1 NEAR  
const NFT_DROP_FUNDING: NearToken = NearToken::from_millinear(500);     // 0.5 NEAR

// Total cost = drop cost + account funding
pub fn estimate_cost_with_account_creation(&self, drop_type: &str, num_keys: u64) -> NearToken {
    let base_cost = match drop_type {
        "near" => self.estimate_near_drop_cost(num_keys, NearToken::from_near(1)),
        "ft" => self.estimate_ft_drop_cost(num_keys),
        "nft" => self.estimate_nft_drop_cost(),
        _ => NearToken::from_near(0),
    };
    
    let funding_per_account = match drop_type {
        "near" | "nft" => NEAR_DROP_FUNDING,
        "ft" => FT_DROP_FUNDING,
        _ => NearToken::from_near(0),
    };
    
    base_cost + (funding_per_account * num_keys)
}
```

---

## What You've Accomplished

Amazing! You now have:

✅ **Automatic account creation** during claims
✅ **Flexible naming strategies** (user-chosen or deterministic)  
✅ **Robust error handling** for edge cases
✅ **Cost optimization** based on drop types
✅ **Seamless UX** that removes Web3 barriers

This is the complete onboarding solution - users go from having nothing to owning a NEAR account with tokens in a single step!

---

## Real-World Impact

Account creation enables powerful use cases:

🎯 **Mass Onboarding**: Bring thousands of users to Web3 instantly
🎁 **Gift Cards**: Create accounts for family/friends with token gifts  
📱 **App Onboarding**: New users get accounts + tokens to start using your dApp
🎮 **Gaming**: Players get accounts + in-game assets automatically
🏢 **Enterprise**: Employee onboarding with company tokens

You've eliminated the biggest friction point in Web3 adoption!

---

## Next Steps

With gasless claiming and automatic account creation working, it's time to build a beautiful frontend that makes this power accessible to everyone.

[Continue to Frontend Integration →](./frontend.md)

---

:::tip Pro Tip
Always provide enough initial funding for the account type. FT drops need more funding because recipients might need to register on multiple FT contracts later.
:::