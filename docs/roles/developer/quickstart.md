---
id: quickstart
title: Orientation
sidebar_label: Orientation
---

This overview will start with the basics of building blockchain applications with NEAR. It may cover information found elsewhere in the documentation. If you're up to speed with *why* and *how* to build on NEAR, you may jump to [Building Applications](/docs/roles/developer/building-apps).

To get started developing a decentralized app (dApp) we're going to need an account. Folks familiar with blockchain wallets may expect an account to be a hash, which is a long string of numbers and letters. In NEAR, accounts are human-readable and easy to remember. If you haven't created an account with our Wallet webapp, please [follow these directions](/docs/local-setup/create-account).

Once you've signed up for your account you'll see you have 500 NEAR.

**How did I get 500 NEAR?**

There's a common term in blockchain called "faucets." These are essentially mechanisms (like a website) that are willing to dole out test tokens. These test tokens are essentially fake, like Monopoly money.

<blockquote class="info">
If you're curious about the code behind the 500 NEAR sent to your account, please <a href="https://github.com/near/near-contract-helper" target="_blank">visit this Github repository</a>.
</blockquote>

**What good are test tokens?**

In NEAR Protocol and other blockchains, test tokens are quite useful during development. The development cycle in blockchain is different than traditional web applications.

In traditional web apps there may be a local, dev, staging, and production environment. These environments work best when they're as similar as possible, if not identical. (Matching operating systems, memory settings, server settings, etc.)

In blockchain, most development takes place on a **testnet**, which is similar to a **development server.** **Mainnet** is the term used for the production blockchain. Tokens on mainnet may be bought and sold on exchanges and are typically the ones mentioned in financial news. Tokens on testnet don't have any value, intrinsic or speculative. Testnet is purely a playground for developers, but it works similarly to mainnet.

**Why not have a local blockchain when developing?**

While it's possible to run a local version of a blockchain while developing, this may have drawbacks:

- It can consume a lot of memory and storage resources.
- When it comes time for other accounts or smart contracts to interact with your smart contract, it's not publicly available.
- Smart contract code may run nearly instantaneously, which is not how it will behave on the real blockchain.
- Gas prices may fluctuate depending on the validators, and this will not be accounted for with a local blockchain.

For these reasons and more, smart contract developers will typically use the testnet with test tokens to develop. This will feel very similar to how the smart contract will operate once deployed on mainnet.

**What are smart contracts and gas?**

Chances are you're familiar with the term "cloud computing" or that smartphones may store photos "in the cloud." There's a joke that "the cloud" simply means "other people's computers" but perhaps it's more correct to say, "some company's computers." In blockchain it's closer to the first definition.

The blockchain is decentralized, meaning that it is constantly being changed and updated, and when it is, it's synced across many computers. How do these computers communicate with one another and decide? That's a great question, and a fundamental challenge in blockchain technology and computer science. Please see [the Nightshade article](https://near.org/papers/nightshade) for more info.

As developers, we can write programs on this "shared computer.". We can write small programs (or large, complex programs!) that are stored on the NEAR blockchain and can be invoked. These small programs are called "smart contracts" although they have nothing to do with legal contracts whatsoever. These are analogous to "serverless" code in cloud computing. Some folks liken smart contracts to AWS Lambda functions: little pieces of code that spin up and run when they're called. The comparison is fitting in the sense that, similar to serverless functions, smart contracts can only be invoked. There is no long-running, background process that executes code every few hours. However, the comparison is different in that these smart contracts don't come with a monthly bill. Instead, they're paid for with "gas."

So we have a decentralized "shared computer" that can call little programs called smart contracts that we write, and we don't receive a bill for cloud storage at the end of the month. Now we have two problems:

1. Why should anyone volunteer their computer's resources to run your smart contracts?
2. What happens if someone writes accidentally runs a smart contract that gets caught in a loop and hogs all the resources?

The answer to both questions is the gas incentive. Folks who participate in running nodes on the blockchain are called validators. They're rewarded for contributing their processing power, storage, and honesty to the collective. (Folks interested in the subject can [become a validator here](/docs/validator/staking).) So validators are rewarded for contributing to keeping the system running, and gas is the cost of sending transactions and invoking smart contracts on the blockchain.

This is a very basic explanation of incentives. Please refer to [our economics paper for more detail](https://near.org/papers/economics-in-sharded-blockchain).

**How does one code a smart contract?**

NEAR is excited about the future of [WebAssembly](https://webassembly.org/), which is <em>a binary instruction format for a stack-based virtual machine</em>. In NEAR, smart contracts compile down to `.wasm` files that are run on a WebAssembly virtual machine.

NEAR embraces WebAssembly for the future of blockchain. This also means that NEAR is not writing a new programming language or having to maintain one. There are several common programming languages that can compile down to wasm. The next section will cover the supported languages and provide links to getting started.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
