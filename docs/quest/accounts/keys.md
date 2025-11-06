---
id: access-keys
title: Access Keys & Permissions
description: Learn about the two main types of NEAR Addresses
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={3} />

## Access Keys and Permissions

Most commonly, blockchains use a rigid system where every account is linked to a single private key that has complete control over it.

NEAR accounts use a more flexible and secure **access key system**, allowing accounts to have **multiple keys**, each with different permission levels.

<div class="row" style={{marginTop: '2rem'}}>
  <div class="col col--6">
    <Card title="Full Access Keys">
      <p>Full Access Keys behave like traditional private keys on other blockchains, meaning they have complete control over the account.</p>
      <ul>
        <li><a>Complete control over the account</a></li>
        <li><a>Like having the master key to your house</a></li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Function Call Keys">
      <p>Limited permissions for specific smart contracts and operations.</p>
      <ul>
        <li><a>Call specific smart contracts</a></li>
        <li><a>Call specific functions on the contract</a></li>
        <li><a>Like a key that only works on specific rooms</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## Why This Matters

There are multiple advantages to using multiple access keys with different permissions:

1. **Key rotation**: If one key is compromised, you can replace it without losing your account
2. **Granular permissions**: Different keys can have different levels of access
3. **Third-party integration**: Apps can request limited permissions to your account to do specific tasks for you

---

## Why Function Call Keys?

<div class="row">
    <div class="col col--6">
    Imagine you are playing a game that registers your score on the blockchain.
    
    On other protocols this will require you to either share your private key with the game (truly terrible idea), or to sign every single transaction manually.

    With NEAR, the game can request a `Function Call Key` that **only allows** it call a function to update score on your behalf, **nothing else**.

    </div>
    <div class="col col--6">
        <video width="100%" height="215" frameborder="0" autoplay loop allowfullscreen controls>
            <source src="/assets/docs/quest/accounts/sign.mp4" type="video/mp4" />
        </video>
        *This is **not** what the future of web3 gaming looks like*
    </div>
</div>



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

## Security and Best Practices

### Security Features

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


