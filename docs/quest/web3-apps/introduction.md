---
id: intro-to-web3
title: Introduction to Web3 Apps
description: Learn the fundamentals of building Web3 applications on NEAR Protocol - understand wallets, smart contracts, and user interactions at a high level.
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="web3-apps" total={3} />

# Introduction to Web3 Applications

Welcome to the world of Web3 applications! In this lesson, we'll explore how modern blockchain applications work on NEAR Protocol, focusing on the key concepts that make Web3 apps different from traditional web applications.

---

## What Makes Web3 Apps Different?

Let's start with a simple comparison. When you use apps like Facebook or Gmail, you have to trust the companies behind those products to:
1. Keep your data safe
2. Not sell your information
3. Not change the rules on you
4. Keep the service running

**Web3 apps flip this completely on its head.** Instead of trusting a company, you trust the blockchain - a network of computers that no single entity controls.

<div class="row">
  <div class="col col--6">
    <Card title="Traditional Web Apps" >
      <ul>
        <li><a>Data stored on centralized servers</a></li>
        <li><a>Accounts created with usernames and passwords</a></li>
        <li><a>Companies control your data</a></li>
        <li><a>Data can be lost if the company shuts down</a></li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Web3 Apps" >
      <ul>
        <li><a>Data stored on decentralized blockchain</a></li>
        <li><a>Connect using digital wallets</a></li>
        <li><a>You control your own data</a></li>
        <li><a>Data persists even if the app disappears</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## Quiz

<Quiz course="web3-apps" id="web3-intro-quiz">
  <MultipleChoice question="What do Web3 apps change about trust compared to traditional apps?">
    <Option> A. Users trust companies more because they are regulated.</Option>
    <Option correct> B. Users trust the blockchain network instead of a single company.</Option>
    <Option> C. Users don't need to trust anything at all.</Option>
    <Option> D. Users trust the app's password system.</Option>
  </MultipleChoice>
  <MultipleChoice question="Which statement belongs to Web3 apps in the comparison table?">
    <Option> A. Accounts created with usernames and passwords.</Option>
    <Option correct> B. Data stored on a decentralized blockchain.</Option>
    <Option> C. Companies control your data.</Option>
    <Option> D. Data can be lost if the company shuts down.</Option>
  </MultipleChoice>
  <MultipleChoice question="How do users typically access Web3 apps on NEAR?">
    <Option> A. By creating a traditional username/password account.</Option>
    <Option correct> B. By connecting with a digital wallet.</Option>
    <Option> C. By emailing the app owner for access.</Option>
    <Option> D. By calling a customer support line.</Option>
  </MultipleChoice>
  <MultipleChoice question="What happens to user data if a Web3 app’s frontend disappears?">
    <Option> A. All data is lost permanently.</Option>
    <Option> B. Data is archived by the company for later recovery.</Option>
    <Option correct> C. Data persists on the blockchain and remains accessible.</Option>
    <Option> D. Data becomes private and cannot be viewed.</Option>
  </MultipleChoice>
  <MultipleChoice question="Which is NOT a feature of Web3 apps?">
    <Option> A. You control your own data.</Option>
    <Option> B. Data persists even if the app disappears.</Option>
    <Option correct> C. Companies can change the rules unilaterally at any time.</Option>
    <Option> D. You connect using digital wallets.</Option>
  </MultipleChoice>
</Quiz>


