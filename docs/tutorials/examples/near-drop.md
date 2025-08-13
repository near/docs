---
id: near-drop
title: Near Drop
description: "NEAR Drop is a smart contract that allows users to create token drops ($NEAR, Fungible and Non-Fungible Tokens), and link them to specific private keys. Whoever has the private key can claim the drop into an existing account, or ask the contract to create a new one for them."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# NEAR Drop Tutorial: Creating Token Airdrops Made Simple

Ever wanted to send tokens to someone who doesn't have a NEAR account yet? Or maybe you want to distribute tokens to a group of people in a seamless way? That's exactly what NEAR Drop contracts are for!

## What Are Drops?

Think of a drop as a digital gift card that you can send to anyone. Here's how it works:

**Traditional way**: "Hey Bob, create a NEAR account first, then I'll send you some tokens"
**With drops**: "Hey Bob, here's a link. Click it and you'll get tokens AND a new account automatically"

A drop is essentially a smart contract that holds tokens (NEAR, fungible tokens, or NFTs) and links them to a special private key. Anyone with that private key can claim the tokens - either into an existing account or by creating a brand new account on the spot.

### Real-World Example

Imagine Alice wants to onboard her friend Bob to NEAR:

1. **Alice creates a drop**: She puts 5 NEAR tokens into a drop and gets a special private key
2. **Alice shares the key**: She sends Bob the private key (usually as a link)
3. **Bob claims the drop**: Bob uses the key to either:
   - Claim tokens into his existing NEAR account, or
   - Create a new NEAR account and receive the tokens there

The magic happens because of NEAR's unique **Function Call Keys** - the contract can actually create accounts on behalf of users!

## Types of Drops

There are three types of drops you can create:

- **NEAR Drops**: Drop native NEAR tokens
- **FT Drops**: Drop fungible tokens (like stablecoins)
- **NFT Drops**: Drop non-fungible tokens (like collectibles)

## Building Your Own Drop Contract

Let's walk through creating a drop contract step by step.

### 1. Setting Up the Contract Structure

First, let's understand what our contract needs to track:

<Language value="rust" language="rust">

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct NearDropContract {
    /// The account used to create new accounts (usually "testnet" or "mainnet")
    pub top_level_account: AccountId,
    
    /// Counter for assigning unique IDs to drops
    pub next_drop_id: u64,
    
    /// Maps public keys to their corresponding drop IDs
    pub drop_id_by_key: UnorderedMap<PublicKey, u64>,
    
    /// Maps drop IDs to the actual drop data
    pub drop_by_id: UnorderedMap<u64, Drop>,
}
```

</Language>

### 2. Defining Drop Types

We need to handle three different types of drops:

<Language value="rust" language="rust">

```rust
#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop),
    NonFungibleToken(NftDrop),
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct NearDrop {
    pub amount_per_drop: U128,
    pub counter: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct FtDrop {
    pub contract_id: AccountId,
    pub amount_per_drop: U128,
    pub counter: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq)]
pub struct NftDrop {
    pub contract_id: AccountId,
    pub counter: u64,
}
```

</Language>

### 3. Creating NEAR Drops

Here's how to implement NEAR token drops:

<Language value="rust" language="rust">

```rust
#[payable]
pub fn create_near_drop(
    &mut self,
    public_keys: Vec<PublicKey>,
    amount_per_drop: U128,
) -> bool {
    let attached_deposit = env::attached_deposit();
    let amount_per_drop: u128 = amount_per_drop.into();
    
    // Calculate required deposit
    let required_deposit = (public_keys.len() as u128) * amount_per_drop;
    
    // Check if user attached enough NEAR
    require!(
        attached_deposit >= required_deposit,
        "Not enough deposit attached"
    );
    
    // Create the drop
    let drop_id = self.next_drop_id;
    self.next_drop_id += 1;
    
    let drop = Drop::Near(NearDrop {
        amount_per_drop: amount_per_drop.into(),
        counter: public_keys.len() as u64,
    });
    
    // Store the drop
    self.drop_by_id.insert(&drop_id, &drop);
    
    // Add each public key to the contract and map it to the drop
    for public_key in public_keys {
        // Add key to contract as a function call key
        self.add_function_call_key(public_key.clone());
        
        // Map the key to this drop
        self.drop_id_by_key.insert(&public_key, &drop_id);
    }
    
    true
}

fn add_function_call_key(&self, public_key: PublicKey) {
    let promise = Promise::new(env::current_account_id()).add_access_key(
        public_key,
        ACCESS_KEY_ALLOWANCE,
        env::current_account_id(),
        "claim_for,create_account_and_claim".to_string(),
    );
    promise.as_return();
}
```

</Language>

### 4. Creating FT Drops

For fungible token drops, the process is similar but we need to handle token transfers:

<Language value="rust" language="rust">

```rust
pub fn create_ft_drop(
    &mut self,
    public_keys: Vec<PublicKey>,
    ft_contract: AccountId,
    amount_per_drop: U128,
) -> Promise {
    let drop_id = self.next_drop_id;
    self.next_drop_id += 1;
    
    let drop = Drop::FungibleToken(FtDrop {
        contract_id: ft_contract.clone(),
        amount_per_drop,
        counter: public_keys.len() as u64,
    });
    
    self.drop_by_id.insert(&drop_id, &drop);
    
    for public_key in public_keys {
        self.add_function_call_key(public_key.clone());
        self.drop_id_by_key.insert(&public_key, &drop_id);
    }
    
    // Transfer FT tokens to the contract
    let total_amount: u128 = amount_per_drop.0 * (drop.counter as u128);
    
    ext_ft_contract::ext(ft_contract)
        .with_attached_deposit(1)
        .ft_transfer_call(
            env::current_account_id(),
            total_amount.into(),
            None,
            "".to_string(),
        )
}
```

</Language>

### 5. Claiming Drops

Users can claim drops in two ways:

#### Claim to Existing Account

<Language value="rust" language="rust">

```rust
pub fn claim_for(&mut self, account_id: AccountId) -> Promise {
    let public_key = env::signer_account_pk();
    self.internal_claim(account_id, public_key)
}

fn internal_claim(&mut self, account_id: AccountId, public_key: PublicKey) -> Promise {
    // Get the drop ID for this key
    let drop_id = self.drop_id_by_key.get(&public_key)
        .expect("No drop found for this key");
    
    // Get the drop data
    let mut drop = self.drop_by_id.get(&drop_id)
        .expect("Drop not found");
    
    // Decrease counter
    match &mut drop {
        Drop::Near(near_drop) => {
            near_drop.counter -= 1;
            let amount = near_drop.amount_per_drop.0;
            
            // Transfer NEAR tokens
            Promise::new(account_id).transfer(amount)
        }
        Drop::FungibleToken(ft_drop) => {
            ft_drop.counter -= 1;
            let amount = ft_drop.amount_per_drop;
            
            // Transfer FT tokens
            ext_ft_contract::ext(ft_drop.contract_id.clone())
                .with_attached_deposit(1)
                .ft_transfer(account_id, amount, None)
        }
        Drop::NonFungibleToken(nft_drop) => {
            nft_drop.counter -= 1;
            
            // Transfer NFT
            ext_nft_contract::ext(nft_drop.contract_id.clone())
                .with_attached_deposit(1)
                .nft_transfer(account_id, "token_id".to_string(), None, None)
        }
    }
    
    // Update or remove the drop
    if drop.get_counter() == 0 {
        self.drop_by_id.remove(&drop_id);
        self.drop_id_by_key.remove(&public_key);
    } else {
        self.drop_by_id.insert(&drop_id, &drop);
    }
}
```

</Language>

#### Claim to New Account

<Language value="rust" language="rust">

```rust
pub fn create_account_and_claim(&mut self, account_id: AccountId) -> Promise {
    let public_key = env::signer_account_pk();
    
    // Create the new account first
    Promise::new(account_id.clone())
        .create_account()
        .add_full_access_key(public_key.clone())
        .transfer(NEW_ACCOUNT_BALANCE)
        .then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas(30_000_000_000_000))
                .resolve_account_create(account_id, public_key)
        )
}

#[private]
pub fn resolve_account_create(
    &mut self,
    account_id: AccountId,
    public_key: PublicKey,
) -> Promise {
    match env::promise_result(0) {
        PromiseResult::Successful(_) => {
            // Account created successfully, now claim the drop
            self.internal_claim(account_id, public_key)
        }
        _ => {
            env::panic_str("Failed to create account");
        }
    }
}
```

</Language>

### 6. Deployment and Usage

#### Deploy the Contract

<Tabs groupId="cli-tabs">
<TabItem value="short" label="Short">

```bash
# Build the contract
cargo near build

# Deploy with initialization
cargo near deploy <your-account>.testnet with-init-call new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

</TabItem>
<TabItem value="full" label="Full">

```bash
# Build the contract
cargo near build

# Deploy with initialization
cargo near deploy <your-account>.testnet \
  with-init-call new \
  json-args '{"top_level_account": "testnet"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```

</TabItem>
</Tabs>

#### Create a Drop

<Tabs groupId="cli-tabs">
<TabItem value="short" label="Short">

```bash
# Create a NEAR drop
near call <your-contract>.testnet create_near_drop '{"public_keys": ["ed25519:YourPublicKeyHere"], "amount_per_drop": "1000000000000000000000000"}' --accountId <your-account>.testnet --deposit 2 --gas 100000000000000
```

</TabItem>
<TabItem value="full" label="Full">

```bash
# Create a NEAR drop
near contract call-function as-transaction <your-contract>.testnet create_near_drop json-args '{"public_keys": ["ed25519:YourPublicKeyHere"], "amount_per_drop": "1000000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '2 NEAR' sign-as <your-account>.testnet network-config testnet sign-with-keychain send
```

</TabItem>
</Tabs>

#### Claim a Drop

<Tabs groupId="cli-tabs">
<TabItem value="short" label="Short">

```bash
# Claim to existing account
near call <your-contract>.testnet claim_for '{"account_id": "<recipient>.testnet"}' --accountId <your-contract>.testnet --gas 30000000000000 --useLedgerKey "ed25519:YourPrivateKeyHere"

# Claim to new account
near call <your-contract>.testnet create_account_and_claim '{"account_id": "<new-account>.testnet"}' --accountId <your-contract>.testnet --gas 100000000000000 --useLedgerKey "ed25519:YourPrivateKeyHere"
```

</TabItem>
<TabItem value="full" label="Full">

```bash
# Claim to existing account
near contract call-function as-transaction <your-contract>.testnet claim_for json-args '{"account_id": "<recipient>.testnet"}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as <your-contract>.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:YourPublicKeyHere --signer-private-key ed25519:YourPrivateKeyHere send

# Claim to new account
near contract call-function as-transaction <your-contract>.testnet create_account_and_claim json-args '{"account_id": "<new-account>.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <your-contract>.testnet network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:YourPublicKeyHere --signer-private-key ed25519:YourPrivateKeyHere send
```

</TabItem>
</Tabs>

### 7. Testing Your Contract

<Tabs groupId="code-tabs">
<TabItem value="rust" label="🦀 Rust">

Create integration tests to verify functionality:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env, MockedBlockchain};

    #[test]
    fn test_create_near_drop() {
        let context = VMContextBuilder::new()
            .signer_account_id(accounts(0))
            .attached_deposit(1000000000000000000000000) // 1 NEAR
            .build();
        testing_env!(context);

        let mut contract = NearDropContract::new(accounts(0));
        
        let public_keys = vec![
            "ed25519:6E8sCci9badyRkXb3JoRpBj5p8C6Tw41ELDZoiihKEtp".parse().unwrap()
        ];
        
        let result = contract.create_near_drop(
            public_keys, 
            U128(500000000000000000000000) // 0.5 NEAR per drop
        );
        
        assert!(result);
    }

    #[test]
    fn test_claim_drop() {
        // Set up contract and create drop
        // Then test claiming functionality
    }
}
```

Run the tests:

```bash
cargo test
```

</TabItem>
</Tabs>

### Key Points to Remember

1. **Function Call Keys**: The contract adds public keys as function call keys to itself, allowing holders of the private keys to call claim methods
2. **Storage Costs**: Account for storage costs when calculating required deposits
3. **Security**: Only specific methods can be called with the function call keys
4. **Cleanup**: Remove drops and keys when all tokens are claimed to save storage
5. **Error Handling**: Always validate inputs and handle edge cases

This contract provides a foundation for token distribution systems and can be extended with additional features like:
- Time-based expiration
- Multiple token types in a single drop  
- Whitelist functionality
- Custom claim conditions

The beauty of this system is that it dramatically improves user onboarding - users can receive tokens and create accounts in a single step, removing traditional barriers to blockchain adoption.

## Why This Matters

Drop contracts solve a real problem in blockchain adoption. Instead of the usual friction of "create an account first, then I'll send you tokens," drops allow you to onboard users seamlessly. They get tokens AND an account in one smooth experience.

This is particularly powerful for:

- **Airdrops**: Distribute tokens to a large audience
- **Onboarding**: Get new users into your ecosystem
- **Gifts**: Send crypto gifts to friends and family
- **Marketing**: Create engaging distribution campaigns

The NEAR Drop contract leverages NEAR's unique Function Call Keys to create this seamless experience. It's a perfect example of how thoughtful protocol design can enable better user experiences.

Want to see this in action? The contract powers tools like [Keypom](https://keypom.xyz/) and NEAR's Token Drop Utility, making token distribution accessible to everyone.