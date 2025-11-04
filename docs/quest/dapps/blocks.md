---
id: building-blocks
title: Building Blocks
description: Learn what are the main building blocks of Web3 apps
hide_title: true
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";
import Card from '@site/src/components/UI/Card';

<Progress course="dapps" total={5} />

# Building Blocks of Decentralized Apps

Decentralized applications (dApps or Web3 apps) on NEAR are made up of four different components that work together to provide an awesome user experience:

1. The **decentralized network**
2. **Accounts & Smart Contracts**
3. **Wallets**
4. The **Frontend**

---

## Infrastructure Level

At the infrastructure level, we have the **decentralized network** that keeps `accounts` and `smart contracts` secure and operational.

<div class="row" style={{marginTop: '2rem'}}>
  <div class="col col--6">
    <Card title="The Decentralized Network">
      Decentralized networks such as NEAR Protocol are made up of many independent computers that work together to provide secure and transparent services
      
      No single entity controls the network, making it censorship-resistant and highly secure

      <ul>
        <li><a>Keep all accounts secure</a></li>
        <li><a>Validates and records transactions between accounts</a></li>
        <li><a>Executes decentralized code (smart contracts)</a></li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Accounts & Contracts">
      The decentralized network hosts all users `accounts`, each of which can have a small program called `smart contracts`. For example, a contract can automate investment payments or store digital art

      Smart contracts are completely transparent - anyone can see what code is running

      <ul>
        <li><a>Store funds and data on the blockchain</a></li>
        <li><a>Handle transfers without human intervention</a></li>
        <li><a>Expose functions so users can interact with them</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## User Level

On the user side, we have **wallets** that allow you easily manage your accounts and assets, and the applications (**frontend**) that provides the user interface to interact with everything.

<div class="row" style={{marginTop: '1rem'}}>
  <div class="col col--6">
    <Card title="Wallets">
      Wallets are applications that allow you to easily create and access your accounts, and its associated digital keys and assets.

      You can access multiple accounts from a single wallet, or use different wallet apps to access the same account.

      <ul>
        <li><a>Hold your account's address</a></li>
        <li><a>Hold your digital assets</a></li>
        <li><a>Hold your account's credentials</a></li>
      </ul>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="The Frontend">
      The website or mobile apps you interact with are what we call `frontends`. These applications can be hosted anywhere, be that some cloud service, your local computer or a blockchain-based storage solution
      
      The frontend of a decentralized app knows how to:
      <ul>
        <li><a>Retrieve data from the chain</a></li>
        <li><a>Let you login using your wallet</a></li>
        <li><a>Call functions on smart contract to read or write data</a></li>
      </ul>
    </Card>
  </div>
</div>

---

## How It All Works Together

Let's walk through a simple example on how these pieces fit together using a [digital guestbook](https://near-examples.github.io/guest-book-examples/) where people can leave messages:

<video autoplay loop controls width="100%">
  <source src="/assets/docs/quest/dapps/guest-book.mp4" type="video/mp4" />
</video>
*Main view of our Guest Book example app*

1. **You visit the app** - The frontend shows you a simple interface to leave a message
2. **You connect your NEAR wallet** - If you don't have one, you'll be prompted to create one
3. **You write a message** - The app shows you a form to enter your greeting
4. **Your message is stored forever** - It's now permanently saved on the blockchain

The beautiful thing is that once your message is stored, it can't be deleted, changed, or lost. Even if the frontend disappears, your message will remain stored in the guestbook smart contract.

---

## Quiz

<Quiz course="dapps" id="web3-blocks-quiz">
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


