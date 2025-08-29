---
id: access-keys
title: Access Key Management
sidebar_label: Access Key Management
description: "Understand how function-call access keys enable gasless operations in NEAR Drop."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

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

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="140" end="170" />

**The result**: Recipients can claim tokens without having NEAR accounts or paying gas!

---

## Key Permissions Breakdown

Function-call keys in NEAR Drop have strict limits:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="8" end="20" />

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

<Github fname="claim.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/claim.rs"
        start="200" end="220" />

---

## Advanced Key Patterns

### Time-Limited Keys

You can make keys that expire:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="300" end="330" />

### Key Rotation

For extra security, you can rotate keys:

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="350" end="380" />

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

<Github fname="lib.rs" language="rust" 
        url="https://github.com/Festivemena/Near-drop/blob/main/contract/src/lib.rs"
        start="400" end="420" />

---

## Integration with Frontend

Your frontend can generate keys securely:

<Github fname="crypto.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/utils/crypto.js"
        start="1" end="30" />

Create claim URLs:

<Github fname="crypto.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/utils/crypto.js"
        start="32" end="45" />

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