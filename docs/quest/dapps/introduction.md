---
id: intro-to-web3
title: Introduction
description: Learn what Decentralized applications are at a high level
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="dapps" total={5} />

# Introduction to Decentralized Apps

Welcome to the world of blockchain! In this lesson, we will explore how modern blockchain applications work on NEAR Protocol, focusing on the key concepts that make Decentralized apps different from traditional ones.

![NEAR Protocol](/assets/docs/welcome-pages/1.near-protocol.png)

---

## Traditional Apps

<div class="row">
  <div class="col col--7">
    Did you ever notice that different applications force you to have different accounts? Facebook, Gmail, and your bank all make you create an account, each living only on their servers.

    The problem is not just that you have to remember multiple usernames and passwords. You are also giving full control of your funds and data to these different companies.

    Not only you need to trust them with not playing around with your data and assets, but also hope they do not shut down or decide to lock you out of your account.
  </div>
  <div class="col col--5">
    <Card >
      <ul>
        <li><a>Multiple accounts, each isolated and tied to a specific service </a></li>
        <li><a>Companies are in charge of your data and funds</a></li>
        <li><a>Data can be lost if the company shuts down</a></li>
        <li><a>Companies can change or shutdown services without notice</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## The Decentralized World

Decentralized applications change the traditional model completely. Instead of relying on a single company to manage your data and funds, you interact with a decentralized network of computers that provide secure and transparent services.

<hr class="subsection" />

### Accounts
In NEAR Protocol you have a single identity, known as your NEAR account. Nobody except **you** can control this account, and you can use it to access **any application built on any chain**.

:::tip Multiple Accounts

You still can have multiple accounts if you choose to, but they are all under your control, and not tied to any specific service

:::

<hr class="subsection" />

### Decentralized Applications

Decentralized apps live on blockchains. They are fully transparent and auditable, and can be configured such that **nobody** can change them nor shut them down.

Decentralized apps are interoperable by default, being able to easily interact with others and share data. Also, in the decentralized world there are **no geographical borders**. You can access any app from anywhere in the world, and easily send and receive funds across borders.

Moreover, since anyone can create NEAR apps, you can connect directly with your users, cutting the man in the middle and thus greatly reducing costs.

<br />

<div class="row">
  <div class="col col--6">
    <Card title="Traditional Web Apps" >
      <ul>
        <li><a>Multiple accounts, each isolated and tied to a specific service </a></li>
        <li><a>Companies are in charge of your data and funds</a></li>
        <li><a>Data can be lost if the company shuts down</a></li>
        <li><a>Companies can change or shutdown services without notice</a></li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Decentralized Apps" >
      <ul>
        <li><a>A single account for all applications</a></li>
        <li><a>You are in charge of your data and funds</a></li>
        <li><a>Data persists even if the companies disappear</a></li>
        <li><a>Services are transparent and auditable</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## Quiz

<Quiz course="dapps" id="web3-intro-quiz">
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


