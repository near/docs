---
id: takeaways
title: Takeaways
description: Main takeaways from this lesson
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={3} />

## A Friendly Model Account

Let's compare NEAR accounts to most other blockchains to see why NEAR is more user-friendly:

| Feature               | Most Other Blockchains                          | NEAR Account                                                        |
|-----------------------|-------------------------------------------------|---------------------------------------------------------------------|
| **Account ID**        | Complex public key (`0x123...`, `bc1...`, etc.) | Named accounts (`alice.near`), Implicit accounts, Eth-like accounts |
| **Secret Keys**       | Single private key                              | Multiple key-pairs with different permissions                       |
| **Smart Contracts**   | Synchronous execution                           | Asynchronous execution                                              |

---

## Best Practices

1. **Use named accounts** for main activities - they're easier to manage
2. **Create sub-accounts** for different purposes (trading, gaming, business)
3. **Use function call keys** when integrating with third-party applications
4. **Keep full access keys secure** - they have complete control over your account
5. **Regularly review permissions** and remove unused access keys

---

## Key Takeaways

- **NEAR accounts** are your digital identity on the blockchain, supporting both human-readable names and traditional addresses
- **Named accounts** (like `alice.near`) are easy to remember and share, while **implicit accounts** use traditional cryptographic addresses
- **Hierarchical structure** allows creating organized sub-accounts, similar to domain names on the internet
- **Access keys** provide flexible security with different permission levels for different use cases

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


