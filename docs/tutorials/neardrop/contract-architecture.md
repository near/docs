---
id: contract-architecture
title: Contract Architecture
sidebar_label: Contract Architecture
description: "Understand how the NEAR Drop contract works - the core data types, storage patterns, and drop management system."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before we start coding, let's understand how the NEAR Drop contract is structured. Think of it as the blueprint for our token distribution system.

---

## The Big Picture

The contract manages three things:
1. **Drops** - Collections of tokens ready for distribution
2. **Keys** - Private keys that unlock specific drops
3. **Claims** - The process of users getting their tokens

Here's how they connect:

```
Drop #1 (10 NEAR) ──→ Key A ──→ Alice claims
Drop #1 (10 NEAR) ──→ Key B ──→ Bob claims
Drop #2 (1 NFT)   ──→ Key C ──→ Carol claims
```

---

## Contract State

The contract stores everything in four simple maps:

<TabItem value="rust" label="🦀 Rust">
```rust
pub struct Contract {
    pub top_level_account: AccountId,     // "testnet" or "near"
    pub next_drop_id: u64,                // Counter for unique drop IDs
    pub drop_id_by_key: LookupMap<PublicKey, u64>,    // Key → Drop ID
    pub drop_by_id: UnorderedMap<u64, Drop>,          // Drop ID → Drop Data
}
```
</TabItem>

**Why this design?**
- Find drops quickly by key (for claiming)
- Find drops by ID (for management) 
- Keep storage costs reasonable

---

## Drop Types

We support three types of token drops:

### NEAR Drops
<TabItem value="rust" label="🦀 Rust">
```rust
pub struct NearDrop {
    pub amount: NearToken,    // How much NEAR per claim
    pub counter: u64,         // How many claims left
}
```
</TabItem>

### Fungible Token Drops 
<TabItem value="rust" label="🦀 Rust"> 
```rust
pub struct FtDrop {
    pub ft_contract: AccountId,  // Which FT contract
    pub amount: String,          // Amount per claim
    pub counter: u64,            // Claims remaining
}
```
</TabItem>

### NFT Drops
<TabItem value="rust" label="🦀 Rust">
```rust
pub struct NftDrop {
    pub nft_contract: AccountId,  // Which NFT contract
    pub token_id: String,         // Specific NFT
    pub counter: u64,             // Always 1 (NFTs are unique)
}
```
</TabItem>

All wrapped in an enum:
<TabItem value="rust" label="🦀 Rust">
```rust
pub enum Drop {
    Near(NearDrop),
    FungibleToken(FtDrop), 
    NonFungibleToken(NftDrop),
}
```
</TabItem>

---

## The Magic: Function-Call Keys

Here's where NEAR gets awesome. Instead of requiring gas fees, we use **function-call access keys**.

When you create a drop:
1. Generate public/private key pairs
2. Add public keys to the contract with limited permissions
3. Share private keys with recipients
4. Recipients sign transactions using the contract's account (gasless!)

The keys can ONLY call claiming functions - nothing else.
<TabItem value="rust" label="🦀 Rust">
```rust
// Adding a function-call key
Promise::new(env::current_account_id())
    .add_access_key(
        public_key,
        NearToken::from_millinear(5),  // 0.005 NEAR gas allowance
        env::current_account_id(),      // Can only call this contract  
        "claim_for,create_account_and_claim".to_string()  // Specific methods
    )
```
</TabItem>

---

## Storage Cost Management

Creating drops costs money because we're storing data on-chain. The costs include:

<TabItem value="rust" label="🦀 Rust">
```rust
const DROP_STORAGE_COST: NearToken = NearToken::from_millinear(10);   // Drop data
const KEY_STORAGE_COST: NearToken = NearToken::from_millinear(1);     // Key mapping
const ACCESS_KEY_STORAGE_COST: NearToken = NearToken::from_millinear(1); // Adding key to account
const FUNCTION_CALL_ALLOWANCE: NearToken = NearToken::from_millinear(5); // Gas for claiming
```
</TabItem>

**Total for 5-key NEAR drop**: ~0.08 NEAR + token amounts

---

## Security Model

The contract protects against common attacks:

**Access Control**
- Only specific functions can be called with function-call keys
- Keys are removed after use to prevent reuse
- Amount validation prevents overflows

**Key Management** 
- Each key works only once
- Keys have limited gas allowances
- Automatic cleanup after claims

**Error Handling**
<TabItem value="rust" label="🦀 Rust">
```rust
// Example validation
assert!(!token_id.is_empty(), "Token ID cannot be empty");
assert!(amount > 0, "Amount must be positive");
```
</TabItem>

---

## File Organization

We'll organize the code into logical modules:

<Tabs groupId="code-tabs">
```
src/
├── lib.rs              # Main contract and initialization
├── drop_types.rs       # Drop type definitions  
├── near_drops.rs       # NEAR token drop logic
├── ft_drops.rs         # Fungible token drop logic
├── nft_drops.rs        # NFT drop logic
├── claim.rs            # Claiming logic for all types
└── external.rs         # Cross-contract interfaces
```
</Tabs>

This keeps things organized and makes it easy to understand each piece.

---

## What's Next?

Now that you understand the architecture, let's start building! We'll begin with the simplest drop type: NEAR tokens.

[Continue to NEAR Token Drops →](./near-drops.md)

---

:::tip Key Takeaway
The contract is essentially a **key-to-token mapping system** powered by NEAR's function-call access keys. Users get keys, keys unlock tokens, and everything happens without gas fees for the recipient!
:::