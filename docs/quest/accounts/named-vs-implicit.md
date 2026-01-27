---
id: named-vs-implicit
title: Implicit & Named Accounts
description: Learn about the two main types of NEAR Addresses
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={6} />

## Address Types in NEAR Protocol

While NEAR supports multiple types of addresses, most accounts use one of two: **named address** or **implicit address**.

---

## Implicit Accounts

Implicit addresses are deterministically derived from cryptographic key, similarly to how accounts are created on other chains. For example:

- The private key: `ed25519:4x1xiJ6u3sZF3NgrwPUCnHqup2o...`
- Corresponds to the public key: `ed25519:CQLP1o1F3Jbdttek3GoRJYhzfT...`
- And controls the account: `a96ad3cb539b653e4b869bd7cf26590690e8971...` (64 chars)

You don't even need to be online to create an implicit account, just generate a key pair and derive the address!

:::tip

You can delete the private key of an implicit account, effectively locking it forever! This creates a "burner" account that can receive funds but never spend them

:::

---

## Named Accounts

One of NEAR's coolest features is named accounts, which are not only easy to share and remember, but also act as domains!

1. **Top-level accounts** like `near` (or `sweat` and `kaiching`) are created by an account called `registrar`
2. **Sub-accounts** can be created from top level accounts:
   - `alice.near` (created by `near`)
   - `bob.tg` (created by `tg`)
   - `claim.sweat` (created by `sweat`)
3. In turn, sub-accounts can create **sub-accounts** of themselves!
   - `app.alice.near` (created by `alice.near`)
   - `store.bob.tg` (created by `bob.tg`)
4. And so on...

<hr class="subsection" />

### The Rules

While accounts can create sub-accounts, there are important rules to keep in mind:

- **No cross-account control**: `near` cannot create `app.bob.near` - only `bob.near` can
- **Independent entities**: Each account is completely separate - `bob.near` has no control over `app.bob.near`
- **Domain-like structure**: This creates a familiar, organized system similar to how websites work

:::tip Why accounts do not control sub-accounts?

Because otherwise nobody could create their own `.near` or `.sweat` accounts!

:::

<hr class="subsection" />

### Creating Named Accounts

If only `near` can create `alice.near`, then **how do you get a `.near` account?**. The answer is, through the **smart contract** deployed on the `near` account.

Any account on NEAR Protocol (`implicit`, `named` or `ethereum-like` accounts) can call the function `create_account` on the `near` smart contract, passing an **account name** (e.g. `alice.near`) and a **public key**. This will create the new account `alice.near`, which will be **controlled by the `private` counterpart** of the provided `public key`.

---

## Account Examples

Let's look at how people can actually use NEAR accounts:

### Personal Accounts
- `john.near` - A personal account for everyday use
- `trading.john.near` - A sub-account specifically for trading activities
- `nft.john.near` - A sub-account for NFT collections

### Business Accounts
- `company.near` - Main business account
- `payroll.company.near` - Sub-account for employee payments
- `marketing.company.near` - Sub-account for marketing activities

### Application Accounts
- `myapp.near` - Main application account
- `api.myapp.near` - Sub-account for API services
- `user.myapp.near` - Sub-account for user management

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


