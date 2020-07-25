---
id: building-apps
title: Building Applications
sidebar_label: Building Apps
---

Building applications on the NEAR platform includes:

1. Writing and deploying smart contracts to the blockchain
2. Interacting with your (and others') smart contracts from your application

You can build smart contracts using any language which compiles to Web Assembly (WASM), but the ones currently supported by these docs are:

1. Rust (the ["Most Loved" language on Stack Overflow](https://insights.stackoverflow.com/survey/2020))
2. AssemblyScript (closely related to [the #2 most-loved language, TypeScript](https://insights.stackoverflow.com/survey/2020) but currently **not recommended for production financial applications**).

The fastest way to get started is to start from one of the [NEAR Examples](http://near.dev), download the code yourself, and begin modifying it to work for your use case.

## First Steps

This is a more general path to getting started with app development which charts a path through the following sections:

1. Explore [NEAR Examples](http://near.dev/) to deploy one of several sample applications in minutes. You will be able to deploy them using Gitpod's web-hosted environment, modify the code, play with them in the browser there and view transactions on the blockchain via an explorer or wallet.
2. Use your own development environment to create dApps
    1. Beginner level setup: [TestNet](/docs/local-setup/local-dev-testnet)
    2. Advanced level setup: [Local Node](/docs/local-setup/local-dev-node) (independent of TestNet)
3. Follow our introductory [JavaScript library Guides](/docs/roles/developer/examples/near-api-js/guides) to
    1. Create an account
    1. Authenticate with NEAR Shell
    1. Prepare your developer playground (a single HTML file with inline JavaScript)
    1. Explore levels of abstraction in `near-api-js`
    1. Send yourself money (after hacking on our wallet storage to learn how it works)
4. Follow our end-to-end guided walkthroughs
    1. [Issue a token](/docs/tutorials/near-studio/token)
    1. [Call one smart contract from another](/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)
    1. [Test smart contracts](/docs/tutorials/test-your-smart-contracts)

## Smart Contract Development

All smart contracts are compiled to Wasm and deployed to the blockchain using the same process (via `near-api-js` with JavaScript or more directly using RPC calls)

**We recommend developers use Rust** to author their smart contracts to take advantage of language safety features.


### Using `Rust`

We recommend developers build smart contracts using the Rust programming language for its safety.

If you are unfamiliar with Rust but looking to learn, [Rust in Easy English](https://github.com/Dhghomon/easy_rust) is a guide to the language which uses easy English words (for people who may not speak English as a first language), which makes it particularly accessible for anyone who wants to get started.

- [Rust Smart Contracts](/docs/roles/developer/contracts/near-sdk-rs): `near-sdk-rs` provides improved safety with the Rust programming language for high value contracts.

 <!--
*** Temporarily removed until workshop is updated and republished ***
Workshop: MapReduce with Asynchronous Smart Contracts](https://github.com/nearprotocol/workshop
  3 exercises and a challenge that will introduce you to development of smart contracts on the NEAR platform using the Rust programming language. -->



### Using `AssemblyScript`

- [AssemblyScript Smart Contracts](/docs/roles/developer/contracts/assemblyscript): `near-sdk-as` is a collection of helpers that make your SmartContracts look a lot like TypeScript (although the are not!) while compiling to Wasm for execution.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is currently safe only for non-financial use cases.

</blockquote>

## Getting Help

If you have feedback or suggestions for improvement, please don't keep quiet about it.

- Find us on [Discord](http://near.chat) or [Spectrum](https://spectrum.chat/near).
- All our code is open source on [GitHub](https://github.com/nearprotocol).
- For documentation feedback please file [issues](https://github.com/nearprotocol/docs/issues) on our docs repo or submit a [pull request](https://github.com/nearprotocol/docs/pulls) with your edits.
