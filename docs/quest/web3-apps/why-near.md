---
id: why-near
title: Why NEAR?
description: Learn the fundamentals of building Web3 applications on NEAR Protocol - understand wallets, smart contracts, and user interactions at a high level.
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="web3-apps" total={3} />

## Making Web3 Apps Simpler

NEAR Protocol is designed to make Web3 apps as user-friendly as possible thanks to:

1. Simple to Remember Accounts
2. Low Transaction Costs
3. Fast Confirmations
4. Multiple Wallet Choices

---

## Key Features of NEAR for Web3 Apps

Let's dive into some of the standout features that make NEAR Protocol a great choice for building Web3 applications.

### Simple Accounts

Instead of complex addresses like `0x7c24f07982...41424D980852`, your wallet gets a simple name like `alice.near`, making it easy to remember and share.

### Super Low Costs

On every chain, each time you call functions on a smart contract or send tokens you pay a small transaction fee. On NEAR these fees are just fractions of a penny - making it affordable to use Web3 apps regularly.

### Lightning Fast

While chains like Ethereum can multiple seconds - even minutes - to confirm a transaction, NEAR is built for speed. Since NEAR produces a block every 600ms, transactions are generally finalized in just 1.2 seconds.

### Multiple Wallet Options

You can choose from [various wallets](https://wallet.near.org), allowing users to choose their preferred way to store and manage their digital identity and assets. Including options like Telegram wallets, browser extensions, and mobile apps.

---

## Real Examples of Web3 Apps

You might be wondering what you can actually build with this technology. Here are some real examples:

**Financial Apps**: Think of apps like digital banks, but without the bank. You can lend money to others and earn interest, or swap one type of token for another, all automatically.

**Digital Art and Collectibles**: Artists can create unique digital artwork that's verified as authentic and owned by specific people. These can be bought, sold, and traded just like physical art.

**Gaming**: Imagine playing a game where the items you earn or buy are actually yours - you can trade them with other players or even sell them. The game items are stored on the blockchain, so they persist even if the game company disappears.

**Community Governance**: Groups of people can make decisions together through transparent voting systems. No more wondering if your vote actually counted - everything is recorded on the blockchain.

---

## The Big Picture

Web3 applications represent a fundamental shift in how we think about digital services:

**Instead of trusting companies**, we trust the blockchain network
**Instead of giving up control**, we maintain control of our data and assets
**Instead of being locked in**, we can use our assets across different apps
**Instead of geographic restrictions**, we have global access to services

This isn't just about technology - it's about creating a more fair, transparent, and user-controlled internet where you're not just a product being sold to advertisers.

---

## Key Takeaways

- **Web3 apps** are decentralized applications that put you in control instead of companies
- **Your digital wallet** serves as your identity and secure storage for your assets
- **Smart contracts** are automated programs that handle business logic on the blockchain
- **The frontend** provides the familiar user interface that connects everything together
- **NEAR Protocol** makes Web3 apps user-friendly with low costs and fast transactions
- **The future** of Web3 apps focuses on user ownership, transparency, and global access

Understanding these fundamental concepts will help you navigate the world of Web3 applications, whether you're a developer looking to build them or a user wanting to understand how they work!

---

## Quiz

<Quiz course="web3-apps" id="web3-why-near-quiz">
  <MultipleChoice question="Which is a human-readable NEAR account example?">
    <Option> A. 0x7c24f07982...41424D980852</Option>
    <Option correct> B. alice.near</Option>
    <Option> C. user-12345</Option>
    <Option> D. alice@example.com</Option>
  </MultipleChoice>
  <MultipleChoice question="How fast are transactions generally finalized on NEAR?">
    <Option> A. 10–30 seconds</Option>
    <Option> B. Around 10 minutes</Option>
    <Option correct> C. About 1.2 seconds</Option>
    <Option> D. Instantly with zero confirmation</Option>
  </MultipleChoice>
  <MultipleChoice question="Which statement best describes NEAR’s transaction fees?">
    <Option> A. Comparable to several dollars per transaction</Option>
    <Option> B. Free for all users forever</Option>
    <Option correct> C. Fractions of a penny for typical interactions</Option>
    <Option> D. Paid only by validators</Option>
  </MultipleChoice>
  <MultipleChoice question="Which benefit describes wallet options on NEAR?">
    <Option> A. Only one official wallet is allowed</Option>
    <Option correct> B. Multiple choices including Telegram, browser extensions, and mobile apps</Option>
    <Option> C. Wallets must be approved per app</Option>
    <Option> D. Wallets work only on desktop</Option>
  </MultipleChoice>
  <MultipleChoice question="Which of the following is specifically contrasted with Ethereum?">
    <Option> A. NEAR uses proof-of-work while Ethereum uses proof-of-stake</Option>
    <Option correct> B. NEAR finalizes in ~1.2s vs Ethereum can take multiple seconds/minutes</Option>
    <Option> C. NEAR requires gas, Ethereum does not</Option>
    <Option> D. NEAR has fewer wallets available</Option>
  </MultipleChoice>
</Quiz>


