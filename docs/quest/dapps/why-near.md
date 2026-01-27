---
id: why-near
title: Why NEAR?
description: Discover why NEAR Protocol is the best choice for building Web3 applications
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="dapps" total={5} />

## Making Web3 Apps Simpler

NEAR Protocol is designed to make the decentralized world as user-friendly as possible thanks to:

1. Simple to remember accounts, like `alice.near`
2. Low transaction costs, often just fractions of a penny
3. Fast confirmations! Blocks are created every 600ms
4. A bast ecosystem of wallets to choose from to manage your account

---

## Key Features of NEAR for Web3 Apps


Let's dive into some of the standout features that make NEAR Protocol a great choice for building Web3 applications.

<div class="row">
  <div class="col col--6">
    <Card title="Simple Accounts">
      Instead of complex addresses like `0x7c24f07982...41424D980852`, your wallet gets a simple name like `alice.near`, making it easy to remember and share.
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Super Low Costs">
      Each interaction with a smart contract or token transfer has a small fee. On NEAR these fees are typically just fractions of a penny, keeping apps affordable to use frequently.
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '1rem'}}>
  <div class="col col--6">
    <Card title="Lightning Fast">
      NEAR produces a block every 600ms, so transactions are generally finalized in about 1.2 seconds — much faster than chains that take multiple seconds or minutes
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Multiple Wallet Options">
      Choose from a [variety of wallets](https://wallet.near.org) including Telegram wallets, browser extensions, and mobile apps to manage your identity and assets
    </Card>
  </div>
</div>

---

## Real Examples of Web3 Apps


You might be wondering what you can actually build with this technology. Here are some real examples:

<div class="row">
  <div class="col col--6">
    <Card title="Financial Apps">
      <p>Think of apps like digital banks, but without the bank. You can lend money to others and earn interest, or swap one type of token for another, all automatically through smart contracts.</p>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Digital Art & Collectibles">
      <p>Artists can mint unique digital artworks verified as authentic and owned by specific people. These NFTs can be bought, sold, and traded just like physical art.</p>
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '1rem'}}>
  <div class="col col--6">
    <Card title="Gaming">
      <p>Play games where items you earn or buy are truly yours — tradable or sellable. Game items on-chain persist even if the game company disappears.</p>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Community Governance">
      <p>Groups can make decisions using transparent voting systems powered by smart contracts, so votes are recorded and auditable on the blockchain.</p>
    </Card>
  </div>
</div>

---

## Quiz

<Quiz course="dapps" id="web3-why-near-quiz">
  <MultipleChoice question="Which is a human-readable NEAR account example?">
    <Option> A. `0x7c24f07982...41424D980852`</Option>
    <Option correct> B. `alice.near` </Option>
    <Option> C. `user-12345` </Option>
    <Option> D. `alice@example.com` </Option>
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


