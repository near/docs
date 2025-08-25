---
id: near-drops
title: NEAR Token Drops
sidebar_label: NEAR Token Drops  
description: "Build the foundation: distribute native NEAR tokens using function-call keys for gasless claiming."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

Let's start with the simplest drop type: native NEAR tokens. This will teach you the core concepts before we move to more complex token types.

---

## Project Setup

First, create a new Rust project:

```bash
cargo near new near-drop --contract
cd near-drop
```

Update `Cargo.toml`:
```toml
[dependencies]
near-sdk = { version = "5.1.0", features = ["unstable"] }
serde = { version = "1.0", features = ["derive"] }
```

---

## Basic Contract Structure

Let's start with the main contract in `src/lib.rs`:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="1" end="30" />

---

## Contract Initialization

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="32" end="50" />

---

## Creating NEAR Drops

The main function everyone will use:

<Github fname="near_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/near_drop.rs"
        start="1" end="80" />

---

## Claiming Tokens

Now for the claiming logic in `src/claim.rs`:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="1" end="40" />

Core claiming logic:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="85" end="130" />

---

## Helper Functions

Add some useful view functions:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="200" end="230" />

---

## Build and Test

```bash
# Build the contract
cargo near build

# Create test account
near create-account drop-test.testnet --useFaucet

# Deploy
near deploy drop-test.testnet target/near/near_drop.wasm

# Initialize
near call drop-test.testnet new '{"top_level_account": "testnet"}' --accountId drop-test.testnet
```

---

## Create Your First Drop

```bash
# Create a drop with 2 NEAR per claim for 2 recipients
near call drop-test.testnet create_near_drop '{
  "public_keys": [
    "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
    "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"
  ],
  "amount_per_drop": "2000000000000000000000000"
}' --accountId drop-test.testnet --deposit 5
```

---

## Claim Tokens

Recipients can now claim using their private keys:

```bash
# Claim to existing account
near call drop-test.testnet claim_for '{"account_id": "alice.testnet"}' \
  --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Or create new account and claim
near call drop-test.testnet create_account_and_claim '{"account_id": "bob-new.testnet"}' \
  --accountId drop-test.testnet \
  --keyPair <private-key-here>
```

---

## What You've Built

Congratulations! You now have:

✅ **NEAR token distribution system**
✅ **Gasless claiming** with function-call keys  
✅ **Account creation** for new users
✅ **Automatic cleanup** after claims
✅ **Cost estimation** for creating drops

The foundation is solid. Next, let's add support for fungible tokens, which involves cross-contract calls and is a bit more complex.

[Continue to Fungible Token Drops →](./ft-drops.md)

---

:::tip Quick Test
Try creating a small drop and claiming it yourself to make sure everything works before moving on!
:::
