---
id: building
title: Building Applications
sidebar_label: Building
---

Building applications on the NEAR platform includes:
- Writing and deploying smart contracts to the blockchain
- Interacting with your (and others') smart contracts from your application

You can build smart contracts using
- Rust
- AssemblyScript *(not recommended for financial applications)*

The fastest way to get started is to use NEAR Studio (limited to web applications and AssemblyScript smart contracts)

## First Steps

- Use [NEAR Example](http://near.dev/) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> to deploy one of several AssemblyScript sample applications in minutes
- Use your own development environment to create dApps
  - Beginner: [TestNet](/docs/local-setup/local-dev-testnet)
  - Advanced: [Local Node](/docs/local-setup/local-dev-node) (independent of TestNet)
- Follow our introductory [JavaScript library Guides](/docs/roles/developer/examples/near-api-js/guides) to
  - Create an account
  - Authenticate with NEAR Shell
  - Prepare your developer playground (a single HTML file with inline JavaScript)
  - Explore levels of abstraction in `near-api-js`
  - Send yourself money (after hacking on our wallet storage to learn how it works)
- Follow our end-to-end guided walkthroughs to
  - [Zero to Hero](/docs/tutorials/zero-to-hero)
  - [Issue a token](/docs/tutorials/near-studio/token)
  - [Call one smart contract from another](/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)
  - [Test smart contracts](/docs/tutorials/test-your-smart-contracts)

## Smart Contract Development

All smart contracts are compiled to Wasm and deployed to the blockchain using the same process (via near-api-js with JavaScript or more directly using RPC calls)

**We recommend developers use Rust** to author their smart contracts to take advantage of language safety features.


### Using `Rust`

We recommend developers build smart contracts using the Rust programming language for it's safety.

- [Rust Smart Contracts](/docs/roles/developer/contracts/near-sdk-rs): `near-sdk-rs` provides improved safety with the Rust programming language for high value contracts.

- [Workshop: MapReduce with Asynchronous Smart Contracts](https://github.com/nearprotocol/workshop) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> \
  3 exercises and a challenge that will introduce you to development of smart contracts on the NEAR platform using the Rust programming language.



### Using `AssemblyScript`

- [AssemblyScript Smart Contracts](/docs/roles/developer/contracts/assemblyscript): `near-sdk-as` is a collection of helpers that make your SmartContracts look a lot like TypeScript (although the are not!) while compiling to Wasm for execution.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is for non financial use cases.

</blockquote>

## Getting Help

If you have feedback or suggestions for improvement, please don't keep quiet about it.

- Find us on [Discord](http://near.chat) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> or [Spectrum](https://spectrum.chat/near) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>.
- All our code is open source on [GitHub](https://github.com/nearprotocol) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>.
- For documentation feedback please file [issues](https://github.com/nearprotocol/docs/issues) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> on our docs repo or submit a [pull request](https://github.com/nearprotocol/docs/pulls) <img src="../../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> with your edits.

