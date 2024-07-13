---
id: onboarding
title: Onboarding Guide
---

Welcome! If you are reading this you are probably wondering how to get started on NEAR! In this guide, we’ll help you navigate NEAR and see what’s possible, and even share a couple of ideas for you to try out.

NEAR offers a wide range of tools and documentation, which can be overwhelming at first glance. Relax – these tools are designed to be easy to learn and simple to integrate, so you can quickly build a complete application.

Read on for an overview of everything NEAR has to offer, so you can understand which resources to focus on and start building in no time.

---

## Get the Blockchain Basics

If you are completely new to building on blockchains, you will want to understand the basics of accounts and transactions. If you’re already well-versed in Web3 development, we’d still suggest that you take a look, since NEAR is unique in terms of its account model and how transactions are processed.

We cover the basics of on-chain development – and what makes NEAR special – in the [NEAR Protocol](https://docs.near.org/concepts/basics/protocol) section of our docs. You’ll want to pay particular attention to the [account model.](https://docs.near.org/concepts/protocol/account-model)

You don’t need to be an expert in blockchain to start building your first on-chain app. Being familiar with these concepts is helpful, but everything will become clearer when you start putting these concepts into action.

---

## New to NEAR?

If this is the first time you’ve heard of NEAR, we recommend starting by getting familiar with what NEAR can achieve.

If you are a hands-on learner, start by creating a testnet [web wallet](https://testnet.mynearwallet.com/) or explore our [selection of wallets](https://wallet.near.org/) - it’s completely free. Then go and check some of our demo applications to understand how fast and seamless NEAR can be:

- [Hello NEAR](https://near-examples.github.io/hello-near-examples/hello-near): A friendly application that stores and retrieves a message from the chain. Notice that users are not interrupted to sign a transaction!
- [Guest-Book](https://near-examples.github.io/guest-book-examples/): Leave a message on our testnet guestbook. If you don’t attach money, you are not interrupted to sign a transaction!
- [Testnet Exchange](https://testnet.ref.finance/): Swap some NEAR for other tokens on the testnet version of our exchange. Testnet tokens have no value, but they are useful as you’re learning how to build.

Another way to understand what NEAR is capable of is by checking on real projects running on NEAR:

- [Sweat](https://sweatco.in/): People can seamlessly create an account and start receiving tokens as rewards for walking
- [Hot Wallet](http://t.me/herewalletbot): A telegram wallet, simply interact with the bot and it will create a wallet that you can start using to explore the NEAR ecosystem
- [NEAR Social](https://near.social/): A social network built on top of NEAR
- [A whole ecosystem to explore](https://dev.near.org/applications): Check the NEAR catalog, which lists the main projects that are live on NEAR right now

---

## Find the Resources you Need

The NEAR platform supports a range of different entry points to on-chain development. Knowing your goals will help you find the right entry point into our documentation.  

You don’t need to master it all to get started, simply focus on learning what you need to build the project you want.

<hr class="subsection" />

### NEAR Primitives For Quick Prototypes

Before you try to create a project from scratch, check out the variety of built-in solutions to see if there is something you can adapt and reuse:

- Do you need to create a reward token, issue prize tickets, or represent a currency? Check our section on [Fungible Tokens](https://docs.near.org/build/primitives/ft).
- Want to allow ownership of specific assets such as collectibles, event tickets, single-use codes, and other unique assets? Check our section on [Non-Fungible tokens](https://docs.near.org/build/primitives/nft).
- If you’re looking to create governance tools for an organization, [Decentralized Autonomous Organizations](https://docs.near.org/build/primitives/dao) will help you handle decision-making processes.
- Distributing digital assets (NFTs, FTs) is easy with [LinkDrops](https://docs.near.org/build/primitives/linkdrop). You simply provide a link for users and they can claim your asset drop.

<hr class="subsection" />

### Chain Abstraction

If you want your application to scale to large numbers of users, including users who aren’t using any other on-chain apps, consider chain abstraction. The idea behind chain abstraction is quite simple: blockchain technology should be abstracted away from the user experience. In other words, people should not realize when they are using a blockchain, let alone which blockchain they are using.

To help with this goal, NEAR Protocol allows users to create and recover accounts using email addresses, use the account without acquiring funds, and control accounts in other chains. All this happens in the most seamless way possible.

- [Fast Auth](https://docs.near.org/build/chain-abstraction/fastauth-sdk) is an SDK that makes logging in as simple as an email-based login to an off-chain application – no seed phrases or private keys to manage.
- [Meta Transactions](https://docs.near.org/build/chain-abstraction/meta-transactions): With NEAR, developers can bundle transactions and subsidize gas fees for their users thanks to the baked-in meta-transactions
- [Chain Signatures](https://docs.near.org/build/chain-abstraction/chain-signatures): A single NEAR account can control multiple other accounts on foreign chains.

<hr class="subsection" />

### Smooth Multi-Chain Apps

If you’ve used blockchain apps and been frustrated by being limited to a single chain, or disappointed by clunky auth processes for multi-chain apps, NEAR offers a better solutions. NEAR accounts can control [multiple accounts across different](https://docs.near.org/build/chain-abstraction/chain-signatures) chains signatures make chain-agnostic projects simple, and are even more powerful in combination with other chain abstraction concepts.

<hr class="subsection" />

### Smart Contracts Are More Flexible Than You Think

If you want to create a small, decentralized backend service, you may want a smart contract. Smart contracts are small pieces of logic that live on the blockchain and are amazing for storing user information and acting on it. The name may sound like they’re meant for financial services, but smart contracts are very versatile and can support development of tons of projects.

If you want to understand from scratch how smart contracts work, we have a [dedicated docs section](https://docs.near.org/build/smart-contracts/what-is) for them, which includes an [awesome quickstart tutorial](https://docs.near.org/build/smart-contracts/quickstart) to guide you on creating your first contract.

<hr class="subsection" />

### Integrating NEAR Front To Back

Do you have a smart contract that you want to make available for end users? Do you have a cool consumer app idea that needs straightforward blockchain integration? Are you just looking for a versatile auth protocol that will keep the option of on-chain functionality open?

For all of these situations, we have tools and docs for integrating NEAR into your frontend or full-stack application:.

- Check out [Creating a NEAR app Quickstart](https://docs.near.org/build/web3-apps/quickstart). This will guide you through setting up a a minimal front-end NEAR app based on Next.js that talks with a smart contract.
- [NEAR Components](https://docs.near.org/build/near-components/what-is) are similar to React components but stored on chain, making them composable, reusable and decentralized. You can combine and adapt them quickly to create widgets and applets of all kinds.
- If you want to authenticate users into your backend using NEAR protocol, we have [auth docs](https://docs.near.org/build/web3-apps/backend/) that will guide you through it.

<hr class="subsection" />

### Chain Data Solutions

If your project needs to consume information on what happens on the chain – _e.g._ how many transactions a contract is receiving, how many assets a user has – then you want to check our [documentation on data solutions](https://docs.near.org/build/data-infrastructure/what-is).

NEAR offers ready-to-use solutions to access and monitor on-chain data easily. This is very useful to automate actions based on specific events, cache data to reduce latency, gather usage data of the blockchain, and even study user preferences.

---

# Fun Ideas

Now that you know the basic NEAR tech stack, you can start building projects with what you’ve learned. If you’re still looking for ideas, or just want to see what others might be thinking about, we’ve put together a list of hackathon-ready projects. These should all be achievable with the information you’ll find in the docs in the sections above, and simple enough that you can build something cool in just a few days.

<hr class="subsection" />

### Cross-Chain DAO

In NEAR, transactions are fast and cost only fractions of a cent. That makes it the ideal platform for a Decentralized Autonomous Organization in which people can propose ideas vote on them.

- You could use NEAR’s chain abstraction tools to allow proposals and voting on NEAR, but then execute the action on a foreign chain such as Ethereum. Ex: A community could vote on a NEAR DAO about whether to buy an NFT on OpenSea, and handle both ends of the process through a single app.
- As with any other account on NEAR, the account linked to a DAO will be able to control multiple Ethereum accounts.
- Users could vote that the DAO requests a signature for one of the accounts it controls, with a payload that represents executing a function call on Ethereum.

Technologies to use:
  - DAO
  - Chain Signatures

<hr class="subsection" />

### Cross-chain Linkdrops

Thanks to the awesome NEAR account model, people can easily create Linkdrops, _i.e.,_ URL links that allow users to claim assets and even preconfigured full accounts.

- An idea for a project is to create a system of Linkdrops that actually drop assets on other chains, such as ETH or BTC
- The challenge here is to create a simple UI, such that users could load assets into a foreign account controlled on NEAR, and then create a linkdrop for such accounts.

Technologies to use:
  - Linkdrops
  - Chain Signatures