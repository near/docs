---
id: protocol
title: Protocol
---

NEAR Protocol (“NEAR” hereafter) is a public blockchain built from the ground up to be user-focused, secure and amazingly fast. Specifically, NEAR is designed to:

1. **Onboard** users with a smooth experience, even if they have never used crypto, tokens, wallets, or other blockchain artifacts.
2. **Build** decentralized applications with ease, specially for web developers that have never developed a smart contract before.
3. **Scale** applications seamlessly - transfers are instantaneous and have almost zero cost. The underlying platform automatically scales applications without additional costs or effort on the developer’s side.
4. **Be Green**. NEAR works using something called proof-of-stake which is highly efficient in terms of energy. NEAR consumes in a year what bitcoin consumes in [3 minutes](https://medium.com/nearprotocol/how-near-went-carbon-neutral-e656db96da47#:~:text=The%20firm%20found%20that%20NEAR,PoS%20technology%20instead%20of%20PoW).

## What is a blockchain? {#why-are-we-building-near}
You may have heard of distributed computing, databases, or computer networks, all of which play a role in blockchains.

Currently, most web-services utilize a single server and a single database to process your request and provide information. This infrastructure is usually managed by an individual entity who treats all of their data processing like a black box: the request goes in, something happens, and the user receives an output.

While the company may rely on third parties to verify those claims, the user will never be able to verify what happened in the black box. This system relies on trust between users and companies.

NEAR is similar in principle to the “cloud-based” infrastructure that developers currently build applications on top of, except that the cloud is no longer controlled by a single company running a giant data center — that data center is actually made up of all the people around the world who are operating nodes on the decentralized network. Instead of a “company-operated cloud,” it's a “community-operated cloud.”

To set the stage, we’re building a “base-layer blockchain,” or a layer-one, meaning that it’s on the same level of the ecosystem as projects like Ethereum or Cosmos. That means everything in the ecosystem is built on top of the NEAR blockchain, including your application.

## What can we do with a blockchain?
There are two main actions that any user can perform in the NEAR ecosystem: transferring money and interacting with decentralized applications.

**Transferring money**: Transferring money refers to sending NEARs from one user to another using the NEAR WALLET. Transfers in NEAR are instantaneous and have negligible transaction costs.

**Executing decentralized applications**: Besides transferring money, NEAR tokens can be used to execute decentralized applications, aka smart contracts. Smart contracts are small programs that live in the blockchain. 

**TODO:** Talk about the wonders of smart contracts here.

## Executing commands

Interaction with NEAR is done with [JSON RPC API](../../api/rpc/introduction) via HTTP calls.

With the API you can call smart contracts, send transactions, manage keys and get information about blockchain data and status.

Some actions, such as deploying a contract, are abstracted by the NEAR CLI and other tools, but eventually all actions are done via JSON RPC.

<blockquote class="info">
  We recommend using the CLI for deploying contracts. In a CI/CD environments you can write a shell script to utilize the CLI for deployments.
</blockquote>

### API requests flow

There are few types of [Nodes on NEAR](./validators): RPC Nodes, Validators, and Archival Nodes.

When calling an endpoint on `near.org`, it resolves to a server which in turn chooses an available RPC node to handle the request.
Then the RPC node passes the request to an available Validator node. Finally, the validator node spawns a VM environment to execute the contract.

Due to the decentralized nature of a blockchain network, there are many RPC nodes and a request can reach any one of them, after which it can pass it to any one of the validators.

![JSON Network Arch](/docs/assets/JSONNetworkArch.png)

## Who secures the blockchain?

A secure blockchain mean that it's extremely difficult (to the degree of the impossible) to tamper with chain state.
In a decentralized network there isn't a single entity who is responsible for the security of the network,
because it's impossible to guarantee that such entity won't become malicious. That means there have to be special
mechanisms to keep the network secure.
There are few types of mechanisms that allow a blockchain to function properly and be resistant to attacks (such as [Sybil resistance](https://en.wikipedia.org/wiki/Sybil_attack)).
For example, Bitcoin uses the _proof-of-work_ (PoW) mechanism, which is based on assumptions from cryptography - 
it would take an unreasonable amount of computing power to manipulate chain state that was already written.

NEAR Protocol is a _proof-of-stake_ (PoS) network. In PoS, validator operators (people who operate computers that are responsible for writing the blockchain state),
deposit a large amount of money (they _stake_ tokens), which serves as an "insurance" for their honesty.
Validators oversee each other, and if someone is detected as malicious, it gets "slashed" - the money he staked is taken away from him.
For participation in this activity, validators receive rewards - more tokens. The more you stake, the more rewards you get.
In PoS networks an attempt to manipulate the chain would mean -

- taking control over the majority of the validators at once, so that the malicious activity won't be flagged as such, and
- putting very large sum of capital at risk, because an unsuccessful attack would mean slashing your staked tokens.

That means - the larger the network (the more validators there are), the better its security, because it makes it difficult
to overtake the network.

## Want to dig deeper?

Here are some of the best **introductory videos**:
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] Blockchain 101 Onramp: Deconstructing the Blockchain Ecosystem
- [ [watch](https://www.youtube.com/watch?v=Gd-aNfDqgQY&feature=youtu.be&t=1100) ] What are Decentralized Applications and How Do They Work?
- [ [watch](https://www.youtube.com/watch?v=Y21YtLzGbH0&feature=youtu.b&t=2656) ] The Design of Blockchain-Based Apps
- [ [watch](https://www.youtube.com/watch?v=bBC-nXj3Ng4) ] But how does Bitcoin actually work? *by 3Blue1Brown*

And you can read more in these **educational resources**:
- [ [read](https://near.org/blog/the-beginners-guide-to-the-near-blockchain/) ] The Beginner’s Guide to the NEAR Blockchain
- [ [read](https://medium.com/@trentmc0/blockchain-infrastructure-landscape-a-first-principles-framing-92cc5549bafe) ] Blockchain Infrastructure Landscape: A First Principles Framing
- [ [read](https://a16z.com/2019/11/08/crypto-glossary/) ] a16z Crypto Glossary
- [ [read](https://a16z.com/2018/02/10/crypto-readings-resources/) ] a16z Crypto Canon