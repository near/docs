---
id: new-to-near
title: New to NEAR?
sidebar_label: New to NEAR?
---

Welcome! This page is your map for getting to know the NEAR platform.

If you have questions along the way, join our community on [Discord](http://near.chat/) and reach out! We're here to help.

## What is NEAR?

NEAR Protocol ("NEAR" hereafter) is a decentralized development platform where developers can host serverless applications and smart contracts that easily connect to "open finance" [1] networks and benefit from an ecosystem of "open web" [2] components.

Unlike most blockchain-based platforms, NEAR Protocol is built from the ground up to be the easiest in the world for developers _and_ their end users, while still providing the scalability and security you need to serve those users.  Specifically, NEAR is designed to make it easier to:

1. **Build** decentralized applications, even if you're only used to building with "traditional" web or app concepts.
2. **Onboard** users with a smooth experience, even if they have never used crypto, tokens, keys, wallets, or other blockchain artifacts.
3. **Scale** your application seamlessly - the underlying platform automatically expands capacity via sharding without additional costs or effort on your part.

[1]: *"Open Finance" networks facilitate digital value transfer and storage using tokens and tokenized assets.  This spans everything from easy peer-to-peer payments to sophisticated lending and trading protocols.*

[2]: *"Open Web" components are re-usable smart contracts that share state, making for easy composability of applications that still protect users' data. Whereas Open Finance is built on the permissionless movement of value, the Open Web further generalizes this openness to operate on all data.*

## What is a blockchain?

A blockchain is a particular type of irreversible distributed ledger which combines aspects of both computation and data storage. Each new block which is added contains modifications to the state of the ledger that have been agreed upon by the consensus of the distributed nodes which run the network.  

These ledgers allow for a large number of participants to permissionlessly but collaboratively manage extremely large amounts of value (Bitcoin is worth >$100B) entirely through basic cryptoeconomic incentives.

While it is intellectually interesting to explore the theory and technology behind blockchains, it is not necessary to do this in order to build, test, and deploy apps. Similarly, you don't need to understand how fault-tolerant commodity compute clusters work inside AWS, GCP, or Azure in order to deploy an app to these clouds. Focus on the code! We've made it easy.

## Why are we building NEAR?

You may have heard of distributed computing, databases, or computer networks, all of which play a role in blockchains.

Currently, most web-services utilize a single server and a single database to process your request and provide information. This infrastructure is usually managed by an individual entity who treats all of their data processing like a black box: the request goes in, something happens, and the user receives an output.

While the company may rely on third parties to verify those claims, the user will never be able to verify what happened in the black box. This system relies on trust between users and companies.

NEAR is similar in principle to the “cloud-based” infrastructure that developers currently build applications on top of, except that the cloud is no longer controlled by a single company running a giant data center — that data center is actually made up of all the people around the world who are operating nodes on the decentralized network. Instead of a “company-operated cloud,” it's a “community-operated cloud.”

To set the stage, we’re building a “base-layer blockchain,” or a layer-one, meaning that it’s on the same level of the ecosystem as projects like Ethereum or Cosmos. That means everything in the ecosystem is built on top of the NEAR blockchain, including your application.

### Best orientation videos

- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] Blockchain 101 Onramp: Deconstructing the Blockchain Ecosystem
- [ [watch](https://www.youtube.com/watch?v=Gd-aNfDqgQY&feature=youtu.be&t=1100) ] What are Decentralized Applications and How Do They Work?
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] The Design of Blockchain-Based Apps
- [ [watch](https://www.youtube.com/watch?v=bBC-nXj3Ng4) ] But how does Bitcoin actually work? *by 3Blue1Brown*

### Best orientation resources

- [ [read](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) ] The Beginner’s Guide to the NEAR Blockchain
- [ [read](https://medium.com/@trentmc0/blockchain-infrastructure-landscape-a-first-principles-framing-92cc5549bafe) ] Blockchain Infrastructure Landscape: A First Principles Framing
- [ [read](https://a16z.com/2019/11/08/crypto-glossary/) ] a16z Crypto Glossary
- [ [read](https://a16z.com/2018/02/10/crypto-readings-resources/) ] a16z Crypto Canon


## How do I get started?

1. Set up an [account](https://wallet.testnet.near.org/).
2. Choose a [starter project](http://near.dev/), click `Run` at the top, and play for a few minutes.
3. Check out the [network status](http://explorer.testnet.near.org) (and any changes *you* made while playing in step 2). The block explorer provides you with insights on nodes, transactions, and blocks. You can look for your account ID (used in step 2).
4. Dive [into the docs](https://docs.near.org).
5. [Let us know](http://near.chat) if you need anything.


### Is there anything that I should know up front?

Developing on a sharded blockchain-based platform is conceptually similar to building web applications, but there are still differences you will need to watch out for.  For example, the "smart contracts" that back these applications require careful thinking about good security practices, asynchronous calls, and release management when deploying to production.

Luckily, there are plenty of tools available in these docs to test-drive these things and learn more about how they work.


## What else can I explore?

### Network Status

[ [Open](https://nearprotocol.statuspal.io/) ] NEAR Protocol network status page

### Lunch & Learn Series

[ [Watch](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y) ] new episodes published regularly

- NEAR Lunch & Learn Ep. 05: **Accounts and Runtime**
- NEAR Lunch & Learn Ep. 04: **Nightshade: Consensus and finality**
- NEAR Lunch & Learn Ep. 03: **Light clients in Proof-of-Stake systems**
- NEAR Lunch & Learn Ep. 02: **Economics in a Sharded Blockchain**
- NEAR Lunch & Learn Ep. 01: **Cross Shard Transactions with One Block Delay**

### Whiteboard Series

[ [Watch](https://www.youtube.com/playlist?list=PL9tzQn_TEuFWweVbfTbaedFdwVrvaYPq4) ] new episodes published regularly

- Whiteboard Series with NEAR | Ep: 31 Kevin Davis from **Kava Labs**
- Whiteboard Series with NEAR | Ep: 30 David Vorick from **Sia**
- Whiteboard Series with NEAR | Ep: 29 Taylor Wei from **Top Network**
- Whiteboard Series with NEAR | Ep: 28 Jaynti Kanani from **Matic**
- Whiteboard Series with NEAR | Ep: 27 Xiaoshan Zhu from **Meter**

### StackOverflow Questions

[ [View](https://stackoverflow.com/tags/nearprotocol) ] new questions and answers published regularly

- Could we consider non-plugins web-based crypto wallets as safe? ([view](https://stackoverflow.com/questions/59165184/could-we-consider-non-plugins-web-based-crypto-wallets-as-safe))
- How to print the length of an array in AssemblyScript / NEAR? ([view](https://stackoverflow.com/questions/57897731/how-to-print-the-length-of-an-array-in-assemblyscript-near))
- Changing VMContext attributes during tests ([view](https://stackoverflow.com/questions/58956740/changing-vmcontext-attributes-during-tests))
- String attribute set in init method always returns empty string ([view](https://stackoverflow.com/questions/58659873/string-attribute-set-in-init-method-always-returns-empty-string))
- How to attach value (deposit) to transaction with near-api-js? ([view](https://stackoverflow.com/questions/57904221/how-to-attach-value-deposit-to-transaction-with-near-api-js))



### Stay Connected

- [ [Subscribe](https://near.org/newsletter) ] to our newsletter
- [ [Join](https://near.org/events/) ] us at upcoming events
- [ [Read](https://near.org/blog/) ] our blog

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
