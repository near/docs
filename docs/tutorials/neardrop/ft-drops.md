---
id: ft-drops
title: Fungible Token Drops
sidebar_label: FT Drops
description: "Add support for NEP-141 fungible tokens with cross-contract calls and automatic user registration."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

Time to level up! Let's add support for fungible token drops. This is where things get interesting because we need to interact with other contracts.

---

## Why FT Drops Are Different

Unlike NEAR tokens (which are native), fungible tokens live in separate contracts. This means:

- **Cross-contract calls** to transfer tokens
- **User registration** on FT contracts (for storage)
- **Callback handling** when things go wrong
- **More complex gas management**

But don't worry - we'll handle all of this step by step.

---

## Extend Drop Types

First, let's add FT support to our drop types in `src/drop_types.rs`:

<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="5" end="35" />

Update the helper methods:
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="37" end="60" />

---

## Cross-Contract Interface

Create `src/external.rs` to define how we talk to FT contracts:

<Github fname="external.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/external.rs"
        start="1" end="30" />

---

## Creating FT Drops

Add this to your main contract in `src/lib.rs`:

<Github fname="ft_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/ft_drop.rs"
        start="1" end="60" />

---

## FT Claiming Logic

The tricky part! Update your `src/claim.rs`:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="150" end="200" />

FT claiming with automatic user registration:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="202" end="280" />

---

## Testing FT Drops

You'll need an FT contract to test with. Let's use a simple one:

```bash
# Deploy a test FT contract (you can use the reference implementation)
near create-account test-ft.testnet --useFaucet
near deploy test-ft.testnet ft-contract.wasm

# Initialize with your drop contract as owner
near call test-ft.testnet new_default_meta '{
  "owner_id": "drop-test.testnet",
  "total_supply": "1000000000000000000000000000"
}' --accountId test-ft.testnet
```

Register your drop contract and transfer some tokens to it:

```bash
# Register drop contract
near call test-ft.testnet storage_deposit '{
  "account_id": "drop-test.testnet"
}' --accountId drop-test.testnet --deposit 0.25

# Transfer tokens to drop contract
near call test-ft.testnet ft_transfer '{
  "receiver_id": "drop-test.testnet",
  "amount": "10000000000000000000000000"
}' --accountId drop-test.testnet --depositYocto 1
```

Now create an FT drop:

```bash
# Create FT drop with 1000 tokens per claim
near call drop-test.testnet create_ft_drop '{
  "public_keys": [
    "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8"
  ],
  "ft_contract": "test-ft.testnet",
  "amount_per_drop": "1000000000000000000000000"
}' --accountId drop-test.testnet --deposit 2
```

Claim the FT drop:

```bash
# Claim FT tokens (recipient gets registered automatically)
near call drop-test.testnet claim_for '{
  "account_id": "alice.testnet"
}' --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Check if Alice received the tokens
near view test-ft.testnet ft_balance_of '{"account_id": "alice.testnet"}'
```

---

## Add Helper Functions

<Github fname="ft_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/ft_drop.rs"
        start="120" end="150" />

---

## Common Issues & Solutions

**"Storage deposit failed"**
- The FT contract needs sufficient balance to register users
- Make sure you attach enough NEAR when creating the drop

**"FT transfer failed"**  
- Check that the drop contract actually owns the FT tokens
- Verify the FT contract address is correct

**"Gas limit exceeded"**
- FT operations use more gas than NEAR transfers
- Our gas constants should work for most cases

---

## What You've Accomplished

Great work! You now have:

✅ **FT drop creation** with cost calculation
✅ **Cross-contract calls** to FT contracts  
✅ **Automatic user registration** on FT contracts
✅ **Callback handling** for robust error recovery
✅ **Gas optimization** for complex operations

FT drops are significantly more complex than NEAR drops because they involve multiple contracts and asynchronous operations. But you've handled it like a pro!

Next up: NFT drops, which have their own unique challenges around uniqueness and ownership.

[Continue to NFT Drops →](./nft-drops.md)

---

:::tip Pro Tip
Always test FT drops with small amounts first. The cross-contract call flow has more moving parts, so it's good to verify everything works before creating large drops.
:::
