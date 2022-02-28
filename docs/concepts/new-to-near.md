---
id: new-to-near
title: New to NEAR?
sidebar_label: New to NEAR?
---

Welcome! This page is your map for getting to know the NEAR platform.

If you have questions along the way, join our community on [Discord](http://near.chat/) and reach out! We're here to help.

## What is NEAR? {#what-is-near}

NEAR is a blockchain that has been built from the ground up to be high-performant, incredibly secure, and infinitely scalable all while supporting sustainability. 

Simply put, NEAR is a [layer one](https://blockchain-comparison.com/blockchain-protocols/), [sharded](https://near.org/blog/near-launches-simple-nightshade-the-first-step-towards-a-sharded-blockchain/), [proof-of-stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain built for usability and scalability.

## Why Build on NEAR? {#why-build-on-near}

- NEAR's proof of stake network is sustainable and **[certified carbon-neutral](https://near.org/blog/the-near-blockchain-is-climate-neutral/)**.
- 1000x lower transaction fees for users.
- 30% of gas fees are paid out to smart contract developers.
- [Human-readable account names](https://docs.near.org/docs/concepts/account) follow a scoped DNS naming pattern.
- Interoperable with Ethereum using [Rainbow Bridge](https://rainbowbridge.app/transfer) _(first trustless bridge ever created)_.
- EVM compatible with [Project Aurora](http://www.aurora.dev).
- Free educational courses with live teachers at [NEAR University](http://near.university).
- Project funding available through our [Grants Program](http://near.org/grants).


### What is blockchain? {#what-is-blockchain}
To start, you can think of a blockchain as a decentralized database where you can store and retrieve information from anywhere around the world. It’s decentralized due to the fact that it isn’t owned or controlled by one single entity.
­
This database holds the historical data of all the actions that have occurred since its creation. It does this by keeping track of an ever-increasing list of blocks. Each block contains information about what happened during its time. While you don’t need an account to view information, every user that makes any changes to the state of the blockchain must have an account, or wallet. 

![empty-nft-in-wallet](/docs/assets/new-to-near/simple-blockchain.png)

### A simple scenario {#simple-scenario}
Let’s analyze a simple scenario to better understand what happens behind the scenes. Let’s say that you sent your friend $50. This would be part of something called a transaction which states that $50 was taken from your wallet and sent to your friend’s. This transaction is then recorded in a block and made part of the chain’s history. If you were to then query for the balance of your account, it would reflect the transfer.
 
### NEAR's account model {#account-model}
Unlike most blockchains, NEAR has a unique account model that allows for human readable account names. You could own the account benji.near for example. Ethereum, on the other hand, has accounts that are a 42-character hexadecimal number such as 0x71C7656EC7ab88b098defB751B7401B5f6d8976F. This makes the user experience smoother and allows for less confusion when creating transactions. In the scenario above, it would be much easier for Josh to tell Benji that his account was joshua.near instead of 0x71C7656EC7ab88b098defB751B7401B5f6d8976F.
 
### Access keys {#access-keys}
When submitting a transaction to the blockchain, it must be signed. If we take the above scenario as an example, the transaction could be thought of as a cheque where important information such as the date, receiver and amount are filled in. For the cheque to be valid, it must be signed by the sender. It’s the same on the blockchain where the sending account must sign the transaction using what’s called a private key.
 
Each access key comes with a public and private key. As the names suggest, the public key is what is broadcast to the public. You can think of it as a cellphone where the wallpaper shows your name. Anyone with your phone will know that it belongs to you, but only those that know your password can log in and send text messages on your behalf.
 
On NEAR, there are two types of keys that each allow different levels of access to your account. Firstly, there are full access keys. This allows you to transfer funds, delete your account, deploy contracts and more. Think of this key as a cellphone that contains all your sensitive information. If somebody gets a hold of that phone, they can access your bank account, delete your apps, etc. Secondly, there are function call access keys. These types of keys only allow the holder to call a set of predefined functions on a specific smart contract. These keys have limited permissions and cannot be used to transfer funds. You can think of them as toy phones that can still be used to verify your identity, but if the pin were to be compromised, your account wouldn’t be completely lost, and your assets would be somewhat protected.
 
Full access keys should never be disclosed to anybody and when interacting with applications built on NEAR, you should only ever log in with a function call access key. Another interesting feature that NEAR allows you to do with a full access key is create what’s known as a sub-account. If you own the account benji.near, for example, you can create the account collections.benji.near. This account is completely separate and is not owned by benji.near. It’s an entirely new account and the only difference between it and benji.near is the name. You can use subaccounts to provide organizational structure to your work and your accounts. By owning benji.near, you can now have an account for your collections, cold wallet, fungible tokens, and more.­­

### Validation {#validation} 
Since anyone can interact with the blockchain, there needs to be a verification process involved to make sure a malicious actor doesn’t record transactions that never happened. To combat this, NEAR uses what’s known as a Proof-of-Stake model. As a very simple overview, users stake funds in order to be randomly selected to validate blocks and make sure nothing malicious is happening. If the user themselves are malicious, they would lose their stake. When compared with the more popular, Proof-of-Work model, this not only results in a higher throughput of transactions per second, but it also leads to a carbon footprint roughly 200,000 times more efficient than Bitcoin and other Proof-of-Work blockchains.

![empty-nft-in-wallet](/docs/assets/new-to-near/simple-validator.png)

### Best orientation videos {#best-orientation-videos}

- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] Blockchain 101 Onramp: Deconstructing the Blockchain Ecosystem
- [ [watch](https://www.youtube.com/watch?v=Gd-aNfDqgQY&feature=youtu.be&t=1100) ] What are Decentralized Applications and How Do They Work?
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] The Design of Blockchain-Based Apps
- [ [watch](https://www.youtube.com/watch?v=bBC-nXj3Ng4) ] But how does Bitcoin actually work? *by 3Blue1Brown*

### Best orientation resources {#best-orientation-resources}

- [ [read](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) ] The Beginner’s Guide to the NEAR Blockchain
- [ [read](https://medium.com/@trentmc0/blockchain-infrastructure-landscape-a-first-principles-framing-92cc5549bafe) ] Blockchain Infrastructure Landscape: A First Principles Framing
- [ [read](https://a16z.com/2019/11/08/crypto-glossary/) ] a16z Crypto Glossary
- [ [read](https://a16z.com/2018/02/10/crypto-readings-resources/) ] a16z Crypto Canon


## How do I get started? {#how-do-i-get-started}

1. Set up an [account](https://wallet.testnet.near.org/).
2. Choose a [starter project](http://near.dev/), click `Run` at the top, and play for a few minutes.
3. Check out the [network status](http://explorer.testnet.near.org) (and any changes *you* made while playing in step 2). The block explorer provides you with insights on nodes, transactions, and blocks. You can look for your account ID (used in step 2).
4. Dive [into the docs](https://docs.near.org).
5. [Let us know](http://near.chat) if you need anything.


### Is there anything that I should know up front? {#is-there-anything-that-i-should-know-up-front}

Developing on a sharded blockchain-based platform is conceptually similar to building web applications, but there are still differences you will need to watch out for.  For example, the "smart contracts" that back these applications require careful thinking about good security practices, asynchronous calls, and release management when deploying to production.

Luckily, there are plenty of tools available in these docs to test-drive these things and learn more about how they work.


## What else can I explore? {#what-else-can-i-explore}

### Network Status {#network-status}

[ [Open](https://nearprotocol.statuspal.io/) ] NEAR Protocol network status page

### Lunch & Learn Series {#lunch--learn-series}

[ [Watch](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y) ] new episodes published regularly

- NEAR Lunch & Learn Ep. 05: **Accounts and Runtime**
- NEAR Lunch & Learn Ep. 04: **Nightshade: Consensus and finality**
- NEAR Lunch & Learn Ep. 03: **Light clients in Proof-of-Stake systems**
- NEAR Lunch & Learn Ep. 02: **Economics in a Sharded Blockchain**
- NEAR Lunch & Learn Ep. 01: **Cross Shard Transactions with One Block Delay**

### Whiteboard Series {#whiteboard-series}

[ [Watch](https://www.youtube.com/playlist?list=PL9tzQn_TEuFWweVbfTbaedFdwVrvaYPq4) ] new episodes published regularly

- Whiteboard Series with NEAR | Ep: 31 Kevin Davis from **Kava Labs**
- Whiteboard Series with NEAR | Ep: 30 David Vorick from **Sia**
- Whiteboard Series with NEAR | Ep: 29 Taylor Wei from **Top Network**
- Whiteboard Series with NEAR | Ep: 28 Jaynti Kanani from **Matic**
- Whiteboard Series with NEAR | Ep: 27 Xiaoshan Zhu from **Meter**

### StackOverflow Questions {#stackoverflow-questions}

[ [View](https://stackoverflow.com/tags/nearprotocol) ] new questions and answers published regularly

- Could we consider non-plugins web-based crypto wallets as safe? ([view](https://stackoverflow.com/questions/59165184/could-we-consider-non-plugins-web-based-crypto-wallets-as-safe))
- How to print the length of an array in AssemblyScript / NEAR? ([view](https://stackoverflow.com/questions/57897731/how-to-print-the-length-of-an-array-in-assemblyscript-near))
- Changing VMContext attributes during tests ([view](https://stackoverflow.com/questions/58956740/changing-vmcontext-attributes-during-tests))
- String attribute set in init method always returns empty string ([view](https://stackoverflow.com/questions/58659873/string-attribute-set-in-init-method-always-returns-empty-string))
- How to attach value (deposit) to transaction with near-api-js? ([view](https://stackoverflow.com/questions/57904221/how-to-attach-value-deposit-to-transaction-with-near-api-js))



### Stay Connected {#stay-connected}

- [ [Subscribe](https://near.org/) ] to our newsletter
- [ [Join](https://near.events/) ] us at upcoming events
- [ [Read](https://near.org/blog/) ] our blog

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
