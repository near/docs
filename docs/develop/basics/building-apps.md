---
id: building-apps
title: Building Applications
sidebar_label: Building Apps
---

This page will provide a high-level overview of how applications are put together on NEAR and a suggested path you can use to learn how to build your own.


## Overview of NEAR Applications

Applications on the NEAR platform typically have two distinct parts, which are conceptually similar to the back-end and front-end parts of a typical web application:

1. **Building the Smart Contract(s):** Writing and deploying smart contracts to the blockchain, which handle storing and modifying data on the chain.  The contract(s) will need to expose an API.
2. **Calling the Smart Contract(s):** You will need to interact with the smart contract(s) from your application.  Just like with typical APIs, you can interact with your own contracts or contracts which have been deployed by other people ("[cross-contract calls](/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)"). Using JavaScript code on a web-based or mobile frontend is a common pattern for calling smart contracts.


### Building Smart Contracts

You can **build** smart contracts using any language which compiles to Web Assembly (Wasm), but the ones currently supported by these docs are:

1. **Rust** (the ["Most Loved" language on Stack Overflow](https://insights.stackoverflow.com/survey/2020)). To write smart contracts in Rust, you will use the SDK [`near-sdk-rs`](/docs/roles/developer/contracts/near-sdk-rs), a wrapper which provides improved safety for the Rust programming language for high value contracts.
2. **AssemblyScript** (closely related to [the #2 most-loved language, TypeScript](https://insights.stackoverflow.com/survey/2020). To write smart contracts in AssemblyScript, you will use the SDK [`near-sdk-as`](/docs/roles/developer/contracts/assemblyscript), a collection of helpers that make your SmartContracts look similar to TypeScript while compiling to Wasm for execution. AssemblyScript is currently **not recommended for production financial applications**.

For details on how to build, test and deploy smart contracts, see [the section on Smart Contracts](/docs/roles/developer/contracts/intro).


### Calling Smart Contracts

The typical way to **call** smart contracts is to use the [`near-api-js`](/docs/roles/developer/examples/near-api-js/introduction) library, which wraps the more bare-metal [JSON-RPC calls](/docs/api/rpc) that actually perform the API calls.

For details on calling smart contracts, see the section on Using Contracts, particularly [the JavaScript guide](/docs/development/calling-smart-contracts).

### Testing Smart Contracts

Smart contracts can be easily tested using whichever language you prefer. See the [Test Your Smart Contracts](/docs/tutorials/test-your-smart-contracts) tutorial and the respective SDK explanations for more information.

### Deploying Smart Contracts

While there is only one "MainNet" ('official' production network), there are many other potential networks you could deploy your application to.  These range from your local environment's TestNet to any number of third-party networks available in the wild.  See [Networks](/docs/roles/developer/networks) for more information.

### Digging Deeper

This is just a high level overview of smart contracts. The [section on Smart Contracts](/docs/roles/developer/contracts/intro) goes into greater depth on all of these concepts.


## Getting up to Speed: First Steps

One approach to learning app development with NEAR is to read through all of the sections identified above before writing your contract.

If you prefer a more experimental and rapid approach, try the following:

1. Explore [NEAR Examples](http://near.dev/) to deploy one of several sample applications in minutes. You will be able to deploy them using Gitpod's web-hosted environment, modify the code, play with them in the browser there and view transactions on the blockchain via an explorer or wallet.  You can modify this code into your own apps.
2. Use your own development environment to create dApps
    1. Beginner level setup (recommended): [TestNet](/docs/local-setup/local-dev-testnet)
    2. Advanced level setup: [Local Node](/docs/local-setup/local-dev-node) (independent of TestNet)
3. Follow our introductory [JavaScript library Guides](/docs/roles/developer/examples/near-api-js/guides) to
    1. Create an account
    1. Authenticate with NEAR CLI
    1. Prepare your developer playground (a single HTML file with inline JavaScript)
    1. Explore levels of abstraction in `near-api-js`
    1. Send yourself money (after hacking on our wallet storage to learn how it works)
4. Follow our end-to-end guided walkthroughs
    1. [Issue a token](/docs/tutorials/near-studio/token)
    1. [Call one smart contract from another](/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)
    1. [Test smart contracts](/docs/tutorials/test-your-smart-contracts)




 <!--
*** Temporarily removed until workshop is updated and republished ***
Workshop: MapReduce with Asynchronous Smart Contracts](https://github.com/near/workshop
  3 exercises and a challenge that will introduce you to development of smart contracts on the NEAR platform using the Rust programming language. -->






## Getting Help

If you have feedback or suggestions for improvement, please don't keep quiet about it.

- Find us on [Discord](http://near.chat).
- All our code is open source on [GitHub](https://github.com/near).
- For documentation feedback please file [issues](https://github.com/near/docs/issues) on our docs repo or submit a [pull request](https://github.com/near/docs/pulls) with your edits.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
