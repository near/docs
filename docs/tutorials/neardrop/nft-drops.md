---
id: nft-drops
title: NFT Drops
sidebar_label: NFT Drops
description: "Distribute unique NFTs with one-time claims and ownership verification."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

NFT drops are special because each NFT is unique. Unlike NEAR or FT drops where multiple people can get the same amount, each NFT can only be claimed once.

---

## What Makes NFT Drops Different

- **One NFT = One Key**: Each NFT gets exactly one private key
- **Ownership Matters**: The contract must own the NFT before creating the drop
- **No Duplicates**: Once claimed, that specific NFT is gone forever

---

## Add NFT Support

First, extend your drop types in `src/drop_types.rs`:
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="5" end="40" />

Update the helper methods:
<Github fname="drop_types.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/drop_types.rs"
        start="42" end="70" />

---

## NFT Cross-Contract Interface

Add NFT methods to `src/external.rs`:

<Github fname="external.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/external.rs"
        start="30" end="65" />

---

## Creating NFT Drops

Add this to your main contract:

<Github fname="nft_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/nft_drop.rs"
        start="1" end="50" />

Batch NFT creation:

<Github fname="nft_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/nft_drop.rs"
        start="52" end="100" />

---

## NFT Claiming Logic

Update your claiming logic in `src/claim.rs`:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="300" end="380" />

---

## Testing NFT Drops

You'll need an NFT contract for testing:

```bash
# Deploy test NFT contract
near create-account test-nft.testnet --useFaucet
near deploy test-nft.testnet nft-contract.wasm

# Initialize
near call test-nft.testnet new_default_meta '{
  "owner_id": "drop-test.testnet"
}' --accountId test-nft.testnet

# Mint NFT to your drop contract
near call test-nft.testnet nft_mint '{
  "token_id": "unique-nft-001",
  "metadata": {
    "title": "Exclusive Drop NFT",
    "description": "A unique NFT from NEAR Drop"
  },
  "receiver_id": "drop-test.testnet"
}' --accountId drop-test.testnet --deposit 0.1
```

Create and test the NFT drop:

```bash
# Create NFT drop
near call drop-test.testnet create_nft_drop '{
  "public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8",
  "nft_contract": "test-nft.testnet",
  "token_id": "unique-nft-001"
}' --accountId drop-test.testnet --deposit 0.1

# Claim the NFT
near call drop-test.testnet claim_for '{
  "account_id": "alice.testnet"
}' --accountId drop-test.testnet \
  --keyPair <private-key-here>

# Verify Alice owns the NFT
near view test-nft.testnet nft_token '{"token_id": "unique-nft-001"}'
```

---

## Helper Functions

Add some useful view methods:

<Github fname="nft_drop.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/nft_drop.rs"
        start="150" end="200" />

---

## Important Notes

**⚠️ Ownership is Critical**
- The drop contract MUST own the NFT before creating the drop
- If the contract doesn't own the NFT, claiming will fail
- Always verify ownership before creating drops

**🔒 Security Considerations**
- Each NFT drop supports exactly 1 key (since NFTs are unique)
- Once claimed, the NFT drop is completely removed
- No possibility of double-claiming the same NFT

**💰 Cost Structure**
- NFT drops are cheaper than multi-key drops (only 1 key)
- No need for token funding (just storage + gas costs)
- Total cost: ~0.017 NEAR per NFT drop

---

## What You've Accomplished

Great work! You now have complete NFT drop support:

✅ **Unique NFT distribution** with proper ownership validation
✅ **Cross-contract NFT transfers** with error handling
✅ **Batch NFT drop creation** for collections
✅ **Complete cleanup** after claims (no leftover data)
✅ **Security measures** to prevent double-claiming

Your NEAR Drop system now supports all three major token types: NEAR, FTs, and NFTs!

---

## Next Steps

Let's explore how function-call access keys work in detail to understand the gasless claiming mechanism.

[Continue to Access Key Management →](./access-keys.md)

---

:::tip NFT Drop Pro Tips
- Always test with a small NFT collection first
- Verify the drop contract owns all NFTs before creating drops  
- Consider using batch creation for large NFT collections
- NFT drops are perfect for event tickets, collectibles, and exclusive content
:::