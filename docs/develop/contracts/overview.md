---
id: overview
title: Smart Contract Overview
sidebar_label: Overview
---

> Smart Contracts are the back-end of your application that runs code and stores data on the blockchain. All smart contracts on NEAR must be compiled to [WebAssembly](https://webassembly.org/) or simply WASM. Currently, we support two languages [AssemblyScript](https://www.assemblyscript.org/) and [Rust](https://www.rust-lang.org/) with custom software development kits (SDKs) to assist in their creation.

Although developers use one of two technologies to write and compile Smart Contracts on the NEAR platform:

1. **Rust** *(a powerful language with a great developer experience)*
2. **AssemblyScript** *(not recommended for financial applications)*

Whichever language you use to build your Smart Contracts, know that, once compiled to Wasm, they are eventually deployed and executed on the NEAR platform exactly the same way.


If you're familiar with **Rust** then check out <code>[near-sdk-rs](/docs/develop/contracts/rust/intro)</code> for authoring Smart Contracts in Rust that can be deployed to the NEAR platform.  The `near-sdk-rs` repository has several great examples to help you get started quickly.

If you prefer JavaScript then **AssemblyScript** is the way to go for writing Smart Contracts on the NEAR platform. 

You can explore a lot of Smart Contract examples and deploy them in seconds, literally, from our [examples](http://near.dev). And if you'd rather build locally, check out [create-near-app](https://github.com/near/create-near-app) to get started.  Either way, you'll be interacting with your first deployed contract in minutes.


<blockquote class="warning">
<strong>heads up</strong><br /><br />

AssemblyScript is for non financial use cases.

</blockquote>

## Get Started

If you're new to blockchain development there are a few key ideas that need your immediate attention.  You can skip this section if you've built a distributed application before.

Programming on a blockchain is a lot like writing a "normal" web application in most ways. When in doubt, use the same mental models you already understand from other types of programming. There are a few key concepts which are either different or worth highlighting specifically:

- Deploying your back-end

  You deploy your application's back-end to the blockchain, where it is called a "smart contract" or just "contract" for short.

- State/Storage

  The state of the contract, which you would normally store by writing values into a database, is instead stored on the blockchain. The NEAR Platform supports several types of storage including scalar (strings, Boolean values, numbers, etc) and collection types (key-value pairs, list types)

  You can modify state with "change operations" and read state with "view operations." Inside of change operations, you can write to storage in an easier way with persistent collections.

- Cost of operation

  Each operation has a certain cost associated with it. More complex operations (including storage on chain) have a higher cost. This cost is generally accounted for using a measure called "gas".

- Blockchain Environment

  Similarly to how an HTTP request runs on a web server, each function call to a smart contract gets executed in an entirely new stateless environment on the blockchain. Specifically, each node in the relevant shard (which typically contains around 100 nodes) spins up a virtual machine to execute that code locally. That virtual machine then executes the WebAssembly (Wasm) that your AssemblyScript code has been compiled into. Once it is done, the node quits the VM.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
