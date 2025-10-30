---
id: building-blocks
title: Building Blocks of Decentralized Apps
description: Learn what are the main building blocks of Web3 apps
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="web3-apps" total={3} />

# Building Blocks of Web3 Apps

Every Web3 app is made up of 3 main parts that work together:

1. Blockchain Network
2. A Digital Wallet
2. Smart Contracts
3. A Frontend

---

## Blockchain Network - The Decentralized Computer

A core component of any decentralized application is the blockchain network it runs on (for example, NEAR Protocol). Blockchain networks are made up of many independent computers - known as nodes - that work together to:

- Securely store funds for each user
- Validate and record transactions between accounts
- Store data securely
- Execute decentralized code (smart contracts)

---

## Wallets - Your Digital Identity

Think of your wallet as your digital passport. Instead of carrying cash and cards, it holds:
- An address that is easy to remember (like `alice.near`)
- Your digital keys (which allow you to act securely on the chain)
- Your digital assets (tokens, NFTs, etc.)

It's like having a secure digital wallet that holds your identity and assets, but instead of cash, it holds digital tokens and your blockchain identity.

---

## Smart Contracts - Logic on the Chain

Smart contracts are small pieces of code that live in the chain. They:

- Can store data on the blockchain
- Handle transactions without human intervention
- Are completely transparent - anyone can see what code is running

For example, imagine a smart contract that automatically pays you interest on your savings, or one that stores your digital art collection with guaranteed authenticity.

---

## The Frontend - What You Actually See

This is the website or mobile app you interact with - the part that looks familiar. It:
- Knows how to retrieve data from the chain
- Allows you to login using your wallet
- Lets you interact with different smart contract functions

---

## How It All Works Together

Let's walk through a simple example on how these pieces fit together using a [digital guestbook](https://near-examples.github.io/guest-book-examples/) where people can leave messages:

<img src="/assets/docs/quest/web3-apps/guest-book.png" alt="Guestbook" />

1. **You visit the app** - It looks like a normal website
2. **You connect your NEAR wallet** - If you don't have one, you'll be prompted to create one
3. **You write a message** - The app shows you a form to enter your greeting
4. **You sign the transaction** - Your wallet asks you to confirm the action
5. **Your message is stored forever** - It's now permanently saved on the blockchain

The beautiful thing is that once your message is stored, it can't be deleted, changed, or lost. Even if the frontend disappears, your message
will remain stored in the guestbook smart contract.

---

## Quiz

<Quiz course="web3-apps" id="web3-blocks-quiz">
  <MultipleChoice question="Which of the following is NOT one of the three main building blocks of a Web3 app?">
    <Option> A. Your digital wallet</Option>
    <Option> B. Smart contracts</Option>
    <Option> C. The frontend</Option>
    <Option correct> D. A centralized database controlled by the app</Option>
  </MultipleChoice>
  <MultipleChoice question="What does your wallet represent?">
    <Option> A. A storage place for smart contract code</Option>
    <Option correct> B. Your digital identity with an address (e.g., alice.near), keys, and assets</Option>
    <Option> C. A way to speed up the website</Option>
    <Option> D. A backup for lost passwords</Option>
  </MultipleChoice>
  <MultipleChoice question="Which capability is attributed to smart contracts?">
    <Option> A. Rendering the user interface</Option>
    <Option correct> B. Storing data and handling transactions automatically on-chain</Option>
    <Option> C. Managing browser cookies</Option>
    <Option> D. Hosting the website content on a CDN</Option>
  </MultipleChoice>
  <MultipleChoice question="What is the primary role of the frontend in a Web3 app?">
    <Option> A. To mine new blocks</Option>
    <Option> B. To generate private keys</Option>
    <Option correct> C. Provide the UI, connect a wallet, and call smart contract functions</Option>
    <Option> D. To set gas prices on the network</Option>
  </MultipleChoice>
  <MultipleChoice question="In the guestbook example, what ensures your message is saved permanently?">
    <Option> A. The website’s database backup</Option>
    <Option> B. A moderator manually approves it</Option>
    <Option correct> C. You sign a transaction with your wallet and the smart contract stores it on-chain</Option>
    <Option> D. The browser caches it for offline use</Option>
  </MultipleChoice>
</Quiz>


