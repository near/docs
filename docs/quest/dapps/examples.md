---
id: examples
title: Examples of Web3 Apps
description: Understand what kinds of applications can be built on NEAR Protocol with real-world examples.
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="dapps" total={5} />

## Real Examples of Web3 Apps

You might be wondering what you can actually build with decentralized technology, and the answer is: almost anything! Here are some real examples of different fields where decentralized apps are making an impact:

<div class="row">
  <div class="col col--6">
    <Card title="Financial Apps">
      Think of apps like digital banks, but without the bank. You can lend money to others and earn interest, or swap one type of token for another, all automatically
      
      In NEAR Protocol for example we have the decentralized exchange [Ref Finance](https://ref.finance/) and a cross-chain platform for swaps named [NEAR Intents](https://app.near-intents.org)
      <ul>
        <li>[Ref Finance](https://ref.finance/)</li>
        <li>[NEAR Intents](https://app.near-intents.org)</li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Community Governance">
      In Web 3, groups of people can make decisions together through transparent voting systems. No more wondering if your vote actually counted - everything is recorded on the blockchain.
      
      [NEAR Treasury](https://neartreasury.com/) and [Astra++](https://near.social/astraplusplus.ndctools.near/widget/home) are examples of community governance in action

      <ul>
        <li><a href="https://neartreasury.com/">NEAR Treasury</a></li>
        <li><a href="https://near.social/astraplusplus.ndctools.near/widget/home">Astra++</a></li>
      </ul>
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '2rem'}}>
  <div class="col col--6">
    <Card title="Digital Art & Collectibles">
      <p>Artists can create unique digital artwork that is verified as authentic and owned by specific people. These can be collected and traded just like physical art</p>
      <ul>
        <li>[Hot Craft](https://hotcraft.art)</li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Gaming">
      Imagine playing a game where the items you earn are actually yours. Since items are stored on the blockchain, they are readily available on any game that supports them, and easily tradable with other players.
      <ul>
        <li>[NEAR Gaming](https://x.com/neargamesdao)</li>
      </ul>
    </Card>
  </div>
</div>

---

## Quiz

<Quiz course="dapps" id="web3-examples-quiz">
  <MultipleChoice question="If you want to swap one token for another automatically, which app category are you using?">
    <Option> A. Community governance</Option>
    <Option> B. Digital art and collectibles</Option>
    <Option> C. Gaming</Option>
    <Option correct> D. Financial apps</Option>
  </MultipleChoice>
  <MultipleChoice question="In which case would you use NEAR Intents?">
    <Option> A. When you want to mint and collect digital art</Option>
    <Option correct> B. When you want to lend assets and earn interest or automate token actions</Option>
    <Option> C. When you want to vote on community proposals</Option>
    <Option> D. When you want to buy or trade in‑game items</Option>
  </MultipleChoice>
  <MultipleChoice question="What’s the key idea behind community governance apps?">
    <Option> A. Private votes counted by a central team</Option>
    <Option correct> B. Transparent voting with everything recorded on-chain</Option>
    <Option> C. Decisions made by moderators only</Option>
    <Option> D. Anonymous off-chain polls</Option>
  </MultipleChoice>
  <MultipleChoice question="What makes gaming on Web3 different?">
    <Option> A. Items are rented from the game company</Option>
    <Option> B. Items disappear when the company shuts down</Option>
    <Option correct> C. You actually own items and can trade or sell them independently</Option>
    <Option> D. Items can’t be moved between accounts</Option>
  </MultipleChoice>
  <MultipleChoice question="For digital art and collectibles, what does the blockchain provide?">
    <Option> A. Secret storage that only the artist can view</Option>
    <Option> B. Automatic price increases</Option>
    <Option correct> C. Verifiable authenticity and ownership</Option>
    <Option> D. Unlimited free copies</Option>
  </MultipleChoice>
</Quiz>


