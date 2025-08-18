---
id: account-creation
title: Account Creation
sidebar_label: Account Creation
description: "Enable new users to create NEAR accounts automatically when claiming their first tokens."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

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
<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="40" end="60" />

### Phase 2: Claim the Tokens
<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="62" end="75" />

If account creation succeeds, we proceed with the normal claiming process. If it fails (account already exists), we try to claim anyway.

---

## Implementation

Add this to your `src/claim.rs`:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="10" end="80" />

Validate account ID format:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="100" end="140" />

Calculate funding based on drop type:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="142" end="160" />

---

## Account Naming Strategies

### User-Chosen Names

Let users pick their own account names:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="180" end="220" />

### Deterministic Names

Or generate predictable names from keys:

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="240" end="280" />

---

## Frontend Integration

Make account creation seamless in your UI:

<Github fname="ClaimDrop.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/ClaimDrop.js"
        start="50" end="120" />

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

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="300" end="350" />

---

## Cost Considerations

Account creation costs depend on the drop type:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="450" end="480" />

---

## Frontend Account Creation Flow

Add account creation options to your claiming interface:

<Github fname="AccountCreationForm.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/AccountCreationForm.js"
        start="1" end="80" />

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
