---
id: quickstart
title: Developer Quickstart
sidebar_label: Orientation
---

## Overview

This overview will start with the basics of building blockchain applications with NEAR. It may cover information found elsewhere in the documentation. If you're up to speed with *why* and *how* to build on NEAR, you may skip down to the [Building Applications](#building-applications) section.

To get started developing a decentralized app (dApp) we're going to need an account. Folks familiar with blockchain wallets may recognize account hashes - a long string of numbers and letters. In NEAR, however, accounts are human readable names. If you haven't create an account with our Wallet webapp, please [follow these directions](/docs/local-setup/create-account).

Once you've signed up for your account you'll see you have 10 NEAR.

**How did I get 10 NEAR?**

There's a common term in blockchain called "faucets." These are essentially addresses that store quite a bit of a token or currency that are willing to dole it out. Typically faucets are simple websites that ask for an account and then send test tokens/cryptocurrency to that account. Again, these are **test** tokens, which are essentially fake. Monopoly money, if you will.

<blockquote class="info">
If you're curious about the code behind the 10 NEAR sent to your account, please <a href="https://github.com/nearprotocol/near-contract-helper" target="_blank">visit this Github repository</a>.
</blockquote>

**What good are test tokens?**

In NEAR Protocol and other blockchains, test tokens are quite useful. The development cycle in blockchain is quite different than traditional web applications today. 

In traditional web apps there may be a local, dev, staging, and production environment. These environments work best when they're as similar as possible, if not identical. (Matching operating systems, memory settings, server settings, etc.)

In blockchain, most development takes place on a **testnet**, which is similar to a **development server** traditionally. **Mainnet** is the term used for the production blockchain. Tokens on mainnet are typically the ones the financial news talks about, as they may be bought and sold on exchanges. Tokens on testnet do not have any value, intrinsic or speculative. Testnet is purely a playground for developers, but works similarly to mainnet.

**Why not have a local blockchain when developing?**

While it's possible to run a local version of a blockchain while developing, this can end up having drawbacks:

- It can consuming a lot of memory and storage resources.
- When it comes time for other accounts to interact with your code, it's not publicly available.
- Smart contract code may run nearly instantaneously, which is not how it will behave on the real blockchain.
- Gas prices may fluctuate depending on the validators, and this will not be accounted for with a local blockchain.

For these reasons and more, smart contract developers will typically use the testnet with testnet tokens to develop. Developing on the testnet with testnet tokens will feel very similar to how the smart contract will operate once deployed to mainnet.

**What are smart contracts and gas?**

Chances are you're familiar with the term "cloud computing" or that smartphones may store photos "in the cloud." There's a joke that "the cloud" simply means "other people's computers" but perhaps it's more correct to say, "some company's computers." In blockchain it's closer to the first definition.

The blockchain is decentralized, meaning that it is constantly being changed and updated, and when it is, it's synced across many computers. How do these computers communicate with one another and decide? That's a great question, and a fundamental challenge in blockchain technology and computer science. Please see [the Nightshade article](/downloads/Nightshade.pdf) for more info.

As developers, we can write programs on this "shared computer," if you will. We can write small programs (or large, complex programs!) that are stored on the NEAR blockchain and can be invoked. These small programs are called "smart contracts" although they have nothing to do with legal contracts whatsoever. These are analogous to "serverless" code in cloud computing. Some folks liken smart contracts to AWS Lambda functions: little pieces of code that spin up and run when they're called. The comparison is fitting in the sense that, similar to serverless functions, smart contracts can only be invoked. There is no long-running, background process that executes code every few minutes or hours. However, the comparison is quite different in that these smart contracts don't come with a monthly bill. Instead, they're paid for with "gas."

So we have a decentralized "shared computer" that can call little programs called smart contracts that we write, and we don't receive a bill for cloud storage at the end of the month. Now we have two problems: 

1. Why should anyone host your program on their machine for free?
2. What happens if someone writes an annoying smart contract that gets caught in a loop and hogs all the resources?

The answers are incentives and gas. Folks who participate in running nodes on the blockchain are called validators, and they're rewarded for contributing their processing power and honesty to the system. (Folks interested in the subject can [become a validator here](/docs/validator/staking).) So validators are rewarded for contributing to keeping the system running, and gas is the cost of sending transactions and invoking smart contracts on the blockchain.

This is a very basic explanation of incentives. Please refer to [our economics paper for more detail](/papers/economics-in-sharded-blockchain/).

**How does one code a smart contract?**

NEAR is excited about the future of [WebAssembly](https://webassembly.org/), which is <em>a binary instruction format for a stack-based virtual machine</em>. In NEAR, smart contracts compile down to `.wasm` files that are run on our WebAssembly virtual machine.

NEAR embraces WebAssembly for the future of blockchain. This also means that NEAR is not writing a brand new programming language or having to maintain one. There are several common programming languages that can compile down to wasm. The next section will go over the languages and provide links to getting started. We have a number of turnkey examples to get any developer started writing smart contracts on NEAR.

# Building Applications

Building applications on the NEAR platform includes:
- Writing and deploying smart contracts to the blockchain
- Interacting with those (and maybe other) smart contracts from your application

You can build smart contracts using
- Rust
- AssemblyScript *(not recommended for financial applications)*

The fastest way to get started is to use NEAR Studio (limited to web applications and AssemblyScript smart contracts)

## First Steps

- Use [NEAR Studio](http://near.dev/) to deploy one of several AssemblyScript sample applications in minutes
- Use your own development environment to create dApps
  - Beginner: [TestNet](/docs/local-setup/local-dev-testnet)
  - Advanced: [Local Node](/docs/local-setup/local-dev-node) (independent of TestNet)
- Follow our introductory [JavaScript SDK Guides](/docs/roles/developer/examples/nearlib/guides) to
  - Create an account
  - Authenticate with NEAR Shell
  - Prepare your developer playground (a single HTML file with inline JavaScript)
  - Explore levels of abstraction in `nearlib`
  - Send yourself money (after hacking on our wallet storage to learn how it works)
- Follow our end-to-end guided walkthroughs to
  - [Zero to Hero](/docs/tutorials/zero-to-hero)
  - [Issue a token](/docs/tutorials/near-studio/token)
  - [Call one smart contract from another](/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)
  - [Test smart contracts](/docs/tutorials/test-your-smart-contracts)

## Smart Contract Development

All smart contracts are compiled to Wasm and deployed to the blockchain using the same process (via nearlib with JavaScript or more directly using RPC calls)

**We recommend developers use Rust** to author their smart contracts to take advantage of language safety features.


### Using `Rust`

We recommend developers build smart contracts using the Rust programming language for it's safety.

- [Rust Smart Contracts](/docs/near-bindgen/near-bindgen): `near-bindgen` provides improved safety with the Rust programming language for high value contracts.

- [Workshop: MapReduce with Asynchronous Smart Contracts](https://github.com/nearprotocol/workshop)  \
  3 exercises and a challenge that will introduce you to development of smart contracts on the NEAR platform using the Rust programming language.



### Using `AssemblyScript`

- [AssemblyScript Smart Contracts](/docs/development/writing-smart-contracts): `near-runtime-ts` is a collection of helpers that make your SmartContracts look a lot like TypeScript (although the are not!) while compiling to Wasm for execution.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is for non financial use cases.

</blockquote>

## Getting Help

If you have feedback or suggestions for improvement, please don't keep quiet about it.

- Find us on [Discord](http://near.chat) or [Spectrum](https://spectrum.chat/near).
- All our code is open source on [GitHub](https://github.com/nearprotocol).
- For documentation feedback please file [issues](https://github.com/nearprotocol/docs/issues) on our docs repo or submit a [pull request](https://github.com/nearprotocol/docs/pulls) with your edits.
