---
id: types
title: Address Types
description: Learn about the different types of accounts in NEAR Protocol
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={3} />

## Address Types in NEAR Protocol

Each account in NEAR protocol is identified by a **single and unique** address. While NEAR supports multiple types of addresses, most accounts use one of two: **named address** or **implicit address**.

<div class="row" style={{marginTop: '2rem'}}>
  <div class="col col--6">
    <Card title="Named Addresses" >
    Named addresses are human-readable addresses that are easy to remember and share, making them ideal for everyday use:

    - <a>`near` / `account.near` / `account.sweat` / `app.finance.tg`</a>

    </Card>
  </div>
  <div class="col col--6">
    <Card title="Implicit Address" >
    Implicit addresses are derived from cryptographic key pairs and are a long strings of 64 characters

    - <a>`757503837a63ece206449d450ec77ae8d79c88ccda5e62a810f4eeb51db93050`</a>
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '2rem'}}>
    <div class="col col--6">
        <Card title="Ethereum Address" >
        NEAR Protocol supports Ethereum-like addresses to allow interoperability with EVM-based applications and tools

        - <a>`0x32Be343B94f860124dC4fEe278FDCBD38C102D88`</a>
        </Card>
    </div>
    <div class="col col--6">
        <Card title="Other Addresses" >
        NEAR supports more addresses in order to accommodate various use cases, an address is valid if:
        
        - <a>It has between 2 and 64 chars</a>
        - <a>Uses valid chars (`a-z`, `0-9`, `-`, `_`, `.`)</a>
        - <a>Does not start or finish on a special character (`.`,`-`,`_`)</a>
        
        </Card>
    </div>
</div>

---

## Named Accounts

One of NEAR's coolest features is named accounts, which are not only easy to share and remember, but also act as domains!

1. **Top-level accounts** (like `near`, `sweat`, `kaiching`) are created by an account called `registrar`
2. Those top level account can create **sub-accounts**:
   - `bob.near` (created under `near`)
   - `alice.near` (created under `near`)
3. In turn, sub-accounts can create **sub-accounts** of themselves!
   - `app.bob.near` (created under `bob.near`)
   - `store.alice.near` (created under `alice.near`)
4. And so on...


### The Rules

- **No cross-account control**: `near` cannot create `app.bob.near` - only `bob.near` can
- **Independent entities**: Each account is completely separate - `bob.near` has no control over `app.bob.near`
- **Domain-like structure**: This creates a familiar, organized system similar to how websites work





---





### Implicit Accounts - The Traditional Option

**Implicit accounts** use traditional blockchain addresses like:
- `fb9243ce...` (64 characters long)
- `a96ad3cb539b653e4b869bd7cf26590690e8971...`

These are derived directly from cryptographic key pairs and are similar to accounts on other blockchains like Ethereum.

---

## The Account Hierarchy System


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


