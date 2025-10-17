---
id: accounts
title: Understanding NEAR Accounts
sidebar_label: 👤 Accounts
description: Learn about NEAR Protocol's account system - understand named accounts, implicit accounts, access keys, and how NEAR accounts work differently from other blockchains.
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";

<Progress course="accounts" total={3} />

Welcome to the world of NEAR accounts! In this lesson, we'll explore how NEAR Protocol's account system works and why it's designed to be more user-friendly than traditional blockchain accounts.

Think of NEAR accounts as your digital identity on the blockchain - but instead of complex addresses that look like random strings of characters, you get human-readable names that actually make sense.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/suUerHpmNM0?si=jG3NypPwzH83cXuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## What Makes NEAR Accounts Special?

A **NEAR account** is your personal space on the blockchain where you can:
- **Store your digital assets** like tokens and collectibles
- **Interact with smart contracts** and decentralized applications
- **Control accounts on other blockchains** (like Ethereum or Bitcoin)
- **Help onboard new users** by covering their transaction costs

The key difference is that instead of having an address like `0x742d35Cc6634C0532925a3b8D`, you can have a simple name like `alice.near` which is much easier to remember and share!

---

## Two Types of Accounts

NEAR supports two main types of accounts, each with their own advantages:

### Named Accounts - The User-Friendly Option

**Named accounts** use simple, memorable names like:
- `alice.near`
- `bob.near` 
- `mycompany.near`

These work just like domain names on the internet, they're easy to remember, share, and type. Just like how `google.com` is easier to remember than a long IP address, `alice.near` is much more user-friendly than a complex blockchain address.

### Implicit Accounts - The Traditional Option

**Implicit accounts** use traditional blockchain addresses like:
- `fb9243ce...` (64 characters long)
- `a96ad3cb539b653e4b869bd7cf26590690e8971...`

These are derived directly from cryptographic key pairs and are similar to accounts on other blockchains like Ethereum.

---

## The Account Hierarchy System

One of NEAR's coolest features is its **hierarchical account system**, which works like a domain structure:

### How It Works

Think of it like organizing files on your computer:
1. **Top-level accounts** (like `near`, `sweat`, `kaiching`) are created by the registrar
2. **Sub-accounts** can be created under these top-level accounts:
   - `bob.near` (created under `near`)
   - `alice.near` (created under `near`)
3. **Sub-sub-accounts** can be created under existing accounts:
   - `app.bob.near` (created under `bob.near`)
   - `store.alice.near` (created under `alice.near`)

### The Rules

- **No cross-account control**: `near` cannot create `app.bob.near` - only `bob.near` can
- **Independent entities**: Each account is completely separate - `bob.near` has no control over `app.bob.near`
- **Domain-like structure**: This creates a familiar, organized system similar to how websites work

---

## Access Keys and Permissions

NEAR accounts use a sophisticated **access key system** that provides both security and flexibility:

### Types of Access Keys

**Full Access Keys:**
- Complete control over the account
- Can transfer tokens, create sub-accounts, and modify the account
- Like having the master key to your house

**Function Call Keys:**
- Limited permissions for specific smart contracts
- Can only call certain functions on designated contracts
- Like having a key that only works for specific rooms

### Why This Matters

- **Key rotation**: If one key is compromised, you can replace it without losing your account
- **Granular permissions**: Different keys can have different levels of access
- **Third-party integration**: Apps can request limited permissions instead of full account access

---

## NEAR vs Most Other Blockchains

Let's compare NEAR accounts to most other blockchains to see why NEAR is more user-friendly:

| Feature | Most Other Blockchains | NEAR Account |
|---------|----------------------|--------------|
| **Account ID** | Complex public key (`0x123...`, `bc1...`, etc.) | Named accounts (`alice.near`) + Implicit accounts |
| **Secret Keys** | Single private key | Multiple key-pairs with different permissions |
| **Smart Contracts** | Synchronous execution | Asynchronous execution |
| **Transaction Costs** | Often dollars or high fees | Tenths of a cent |
| **Block Time** | 10+ seconds to minutes | ~1.3 seconds |

### Key Advantages of NEAR Accounts

**User Experience:**
- Human-readable names instead of complex addresses
- Faster transaction confirmation
- Much lower transaction costs
- No need to worry about gas price spikes

**Developer Experience:**
- Asynchronous smart contract execution
- More flexible permission system
- Better integration with traditional web development
- Predictable and low costs for users

---

## Real-World Account Examples

Let's look at how people actually use NEAR accounts:

### Personal Accounts
- `john.near` - A personal account for everyday use
- `john.trading.near` - A sub-account specifically for trading activities
- `john.nft.near` - A sub-account for NFT collections

### Business Accounts
- `company.near` - Main business account
- `payroll.company.near` - Sub-account for employee payments
- `marketing.company.near` - Sub-account for marketing activities

### Application Accounts
- `myapp.near` - Main application account
- `api.myapp.near` - Sub-account for API services
- `user.myapp.near` - Sub-account for user management

---

## Security and Best Practices

### Security Features

**Implicit Account Security:**
- You can delete the private key of an implicit account, effectively locking it forever
- This creates a "burner" account that can receive funds but never spend them

**Named Account Benefits:**
- Easy to remember and share
- Can create organized sub-account structures
- Professional appearance for businesses

### Best Practices

1. **Use named accounts** for main activities - they're easier to manage
2. **Create sub-accounts** for different purposes (trading, gaming, business)
3. **Use function call keys** when integrating with third-party applications
4. **Keep full access keys secure** - they have complete control over your account
5. **Regularly review permissions** and remove unused access keys

---

## The Big Picture

NEAR's account system is designed to bridge the gap between traditional web applications and blockchain technology:

**For Users:**
- Familiar naming system similar to email addresses
- Easy account management and organization
- Low-cost transactions that don't break the bank

**For Developers:**
- Flexible permission system for building secure applications
- Asynchronous execution for better performance
- Integration-friendly design for web applications

**For Businesses:**
- Professional account names that build trust
- Organized sub-account structures for different departments
- Cost-effective operations with minimal transaction fees
---

## Key Takeaways

- **NEAR accounts** are your digital identity on the blockchain, supporting both human-readable names and traditional addresses
- **Named accounts** (like `alice.near`) are easy to remember and share, while **implicit accounts** use traditional cryptographic addresses
- **Hierarchical structure** allows creating organized sub-accounts, similar to domain names on the internet
- **Access keys** provide flexible security with different permission levels for different use cases
- **NEAR advantages** include faster transactions, lower costs, and better user experience compared to other blockchains
- **Best practices** include using named accounts for main activities and creating sub-accounts for different purposes

Understanding NEAR's account system is fundamental to using the platform effectively, whether you're a developer building applications or a user managing your digital assets!

---

## Quiz

<Quiz course="accounts" id="accounts-quiz">
    <MultipleChoice question="What are the two main types of NEAR accounts?">
        <Option> A. Public accounts and private accounts.</Option>
        <Option correct> B. Named accounts (like alice.near) and implicit accounts (like 0x123...).</Option>
        <Option> C. Personal accounts and business accounts.</Option>
        <Option> D. Main accounts and backup accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is a key advantage of named accounts over implicit accounts?">
        <Option> A. Named accounts are more secure than implicit accounts.</Option>
        <Option correct> B. Named accounts are human-readable and easy to remember, like alice.near.</Option>
        <Option> C. Named accounts cost less to create than implicit accounts.</Option>
        <Option> D. Named accounts can hold more tokens than implicit accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="In NEAR's hierarchical account system, who can create the sub-account 'store.bob.near'?">
        <Option> A. The 'near' account can create it.</Option>
        <Option correct> B. Only the 'bob.near' account can create it.</Option>
        <Option> C. Any account can create it.</Option>
        <Option> D. Only the registrar can create it.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is the difference between a Full Access Key and a Function Call Key?">
        <Option> A. Full Access Keys are free, Function Call Keys cost money.</Option>
        <Option correct> B. Full Access Keys have complete control, Function Call Keys have limited permissions for specific contracts.</Option>
        <Option> C. Full Access Keys work on mainnet, Function Call Keys work on testnet.</Option>
        <Option> D. Full Access Keys are for named accounts, Function Call Keys are for implicit accounts.</Option>
    </MultipleChoice>
    <MultipleChoice question="How do NEAR transaction costs compare to Ethereum?">
        <Option> A. NEAR transactions cost more than Ethereum transactions.</Option>
        <Option correct> B. NEAR transactions cost tenths of a cent, while Ethereum transactions often cost dollars.</Option>
        <Option> C. NEAR and Ethereum have the same transaction costs.</Option>
        <Option> D. NEAR transactions are always free.</Option>
    </MultipleChoice>
</Quiz>


