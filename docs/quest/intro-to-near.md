---
id: intro-to-near
title: Introduction to NEAR Web3 Apps
sidebar_label: 🌐 Intro to Web3 Apps
description: Learn the fundamentals of building Web3 applications on NEAR Protocol - understand wallets, smart contracts, and user interactions at a high level.
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";

<Progress course="web3-apps" total={3} />

Welcome to the world of Web3 applications! In this lesson, we'll explore how modern blockchain applications work on NEAR Protocol, focusing on the key concepts that make Web3 apps different from traditional web applications.

Think of Web3 apps as the next evolution of the internet - where you're in control of your data, your identity, and your digital assets, instead of big companies controlling everything.

---

## What Makes Web3 Apps Different?

Let's start with a simple comparison. You know how when you use apps like Facebook or Gmail, you have to trust the company to:
- Keep your data safe
- Not sell your information
- Not change the rules on you
- Keep the service running

**Web3 apps flip this completely on its head.** Instead of trusting a company, you trust the blockchain - a network of computers that no single entity controls.

### The Key Difference

**Traditional Web Apps:**
- Your data lives on company servers
- You create accounts with usernames and passwords
- Companies can see, change, or delete your data
- If the company shuts down, your data might disappear

**Web3 Apps:**
- Your data lives on the blockchain (a decentralized network)
- You connect with a digital wallet instead of creating accounts
- You control your own data and identity
- Your data persists even if the app disappears

---

## The Three Building Blocks of Web3 Apps

Every Web3 app is made up of three main parts that work together:

### 1. Your Digital Wallet - Your Identity

Think of your wallet as your digital passport. Instead of carrying cash and cards, it holds:
- Your unique blockchain address (like `alice.near` - much easier to remember than complex addresses!)
- Your private keys (like a super-secure password)
- Your digital tokens and assets
- Your transaction history

It's like having a secure digital wallet that holds your identity and assets, but instead of cash, it holds digital tokens and your blockchain identity.

### 2. Smart Contracts - The Automated Backend

Smart contracts are like digital assistants that never sleep. They:
- Store your data permanently on the blockchain
- Automatically execute business logic
- Handle transactions without human intervention
- Are completely transparent - anyone can see what they do

For example, imagine a smart contract that automatically pays you interest on your savings, or one that stores your digital art collection with guaranteed authenticity.

### 3. The Frontend - What You Actually See

This is the website or mobile app you interact with - the part that looks familiar. It:
- Connects to your wallet for login
- Shows you data from smart contracts
- Lets you interact with blockchain functions
- Provides the same user experience you're used to

---

## How It All Works Together

Let's walk through a simple example to see how these pieces fit together.

Imagine you want to create a digital guestbook where people can leave messages:

1. **You visit the app** - It looks like a normal website
2. **You connect your wallet** - Instead of creating an account, you just connect your wallet
3. **You write a message** - The app shows you a form to enter your greeting
4. **You sign the transaction** - Your wallet asks you to confirm the action
5. **Your message is stored forever** - It's now permanently saved on the blockchain

The beautiful thing is that once your message is stored, it can't be deleted, changed, or lost - even if the app disappears.

---

## Why NEAR Protocol Makes This Easy

NEAR Protocol is designed to make Web3 apps as user-friendly as possible:

**Human-Readable Names**: Instead of complex addresses like `0x742d35Cc6634C0532925a3b8D`, you get simple names like `alice.near`

**Super Low Costs**: Transactions cost just fractions of a penny, not dollars

**Lightning Fast**: Transactions are confirmed in seconds, not minutes

**Multiple Wallet Options**: You can choose from various wallets that suit your preferences

**No Fees for Reading**: Looking at data is completely free - you only pay when you make changes

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

<Quiz course="web3-apps" id="web3-apps-quiz">
    <MultipleChoice question="What is the main difference between traditional web apps and Web3 apps?">
        <Option> A. Web3 apps are faster than traditional web apps.</Option>
        <Option correct> B. Web3 apps use decentralized blockchain technology instead of centralized servers.</Option>
        <Option> C. Web3 apps are more expensive to build than traditional web apps.</Option>
        <Option> D. Web3 apps only work on mobile devices.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is a wallet in the context of Web3 applications?">
        <Option> A. A physical device for storing cryptocurrency.</Option>
        <Option correct> B. A digital identity that contains your blockchain address, private keys, and token balances.</Option>
        <Option> C. A mobile app for making payments.</Option>
        <Option> D. A browser extension for faster internet browsing.</Option>
    </MultipleChoice>
    <MultipleChoice question="What are smart contracts?">
        <Option> A. Legal documents that are stored on the blockchain.</Option>
        <Option> B. Traditional contracts that have been digitized.</Option>
        <Option correct> C. Self-executing programs that run on the blockchain and handle business logic automatically.</Option>
        <Option> D. Contracts that are signed using smart devices.</Option>
    </MultipleChoice>
    <MultipleChoice question="Which of the following is NOT a typical step in the Web3 app user journey?">
        <Option> A. Connect wallet to the application.</Option>
        <Option> B. View data from smart contracts.</Option>
        <Option correct> C. Create a traditional username and password account.</Option>
        <Option> D. Sign transactions with their wallet.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is one advantage of NEAR Protocol for Web3 app development?">
        <Option> A. It requires users to pay high fees for all interactions.</Option>
        <Option correct> B. It uses human-readable account names like 'alice.near' instead of complex addresses.</Option>
        <Option> C. It only supports one type of wallet.</Option>
        <Option> D. It processes transactions very slowly.</Option>
    </MultipleChoice>
</Quiz>


