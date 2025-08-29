---
id: contract-architecture
title: Contract Architecture
sidebar_label: Contract Architecture
description: "Understand how the NEAR Drop contract works - the core data types, storage patterns, and drop management system."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

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

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="15" end="25" />

**Why this design?**
- Find drops quickly by key (for claiming)
- Find drops by ID (for management) 
- Keep storage costs reasonable

---

## Drop Types

We support three types of token drops:

### NEAR Drops
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="15" end="20" />

### Fungible Token Drops 
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="22" end="28" />

### NFT Drops
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="30" end="36" />

All wrapped in an enum:
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="5" end="13" />

---

## The Magic: Function-Call Keys

Here's where NEAR gets awesome. Instead of requiring gas fees, we use **function-call access keys**.

When you create a drop:
1. Generate public/private key pairs
2. Add public keys to the contract with limited permissions
3. Share private keys with recipients
4. Recipients sign transactions using the contract's account (gasless!)

The keys can ONLY call claiming functions - nothing else.

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="150" end="165" />

---

## Storage Cost Management

Creating drops costs money because we're storing data on-chain. The costs include:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="8" end="13" />

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
```rust
// Example validation
assert!(!token_id.is_empty(), "Token ID cannot be empty");
assert!(amount > 0, "Amount must be positive");
```

---

## File Organization

We'll organize the code into logical modules:

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

This keeps things organized and makes it easy to understand each piece.

---

## What's Next?

Now that you understand the architecture, let's start building! We'll begin with the simplest drop type: NEAR tokens.

[Continue to NEAR Token Drops →](./near-drops.md)

---

:::tip Key Takeaway
The contract is essentially a **key-to-token mapping system** powered by NEAR's function-call access keys. Users get keys, keys unlock tokens, and everything happens without gas fees for the recipient!
:::