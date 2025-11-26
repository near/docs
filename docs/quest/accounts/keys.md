---
id: access-keys
title: Access Keys & Permissions
description: Learn about the two main types of NEAR Addresses
hide_title: true
---

import Card from '@site/src/components/UI/Card';

import Progress from "@site/src/components/Academy/Progress";
import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";

<Progress course="accounts" total={6} />

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

---

## Quiz

<Quiz course="accounts" id="accounts-quiz">
    <MultipleChoice question="What is the difference between a Full Access Key and a Function Call Key?">
        <Option> A. Full Access Keys are free, Function Call Keys cost money.</Option>
        <Option correct> B. Full Access Keys have complete control, Function Call Keys have limited permissions for specific contracts.</Option>
        <Option> C. Full Access Keys work on mainnet, Function Call Keys work on testnet.</Option>
        <Option> D. Full Access Keys are for named accounts, Function Call Keys are for implicit accounts.</Option>
    </MultipleChoice>
</Quiz>


