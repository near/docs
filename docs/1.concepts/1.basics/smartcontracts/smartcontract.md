---
id: smartcontracts
title: Smart Contracts
---

:::info
Smart Contracts are the back-end of your application that perform logic and store data on the blockchain. All smart contracts on NEAR must be compiled to WebAssembly or simply WASM. Currently, Pagoda supports two languages Rust and JavaScript (pre-release) with custom software development kits (SDKs) to assist in their creation.
:::

## What is a Smart Contract?

Smart Contracts are pieces of logic that are asved on the network of computers that generate and validate the blockchain, and are triggered whenever an RPC API call is performed to the network, either to read or write data. You deploy your application's back-end logic to the blockchain, where it is called a "smart contract" or just "contract" for short. 

Whenever a smart contract function is called through the RPC API, this call is routed to a an available node (or machine/computer) that initiates a virtual environment in which the smart contract logic is executed. 

The relevant logic from the contract is then executed, reading/writing data and returning a result. If changes were made to the contract these are saved and the changes are propagated to the network. Finally, the virtual environment is torn down and the result is returned to the caller of the RPC API call.

## Getting Started

If you're new to blockchain development there are a few key ideas that need your immediate attention. You can skip this section if you've built a distributed application before.

Programming on a blockchain is a lot like writing a "normal" web application in most ways. When in doubt, use the same mental models you already understand from other types of programming. There are a few key concepts which are either different or worth highlighting specifically:

### State/Storage

The state of the contract, which you would normally store in a database, is instead stored on the blockchain. The NEAR blockchain supports several types of storage including scalar (strings, Boolean values, numbers, etc) and collection types (key-value pairs, list types)

You can modify state with "change operations" and read state with "view operations." Inside of change operations, you can write to storage in an easier way with persistent collections.

Read more about [state for smart contracts](./state.md).

### Cost of operation

Each operation has a certain cost associated with it. More complex operations (including storage on chain) have a higher cost. This cost is generally accounted for using a measure called "gas". [Read more about gas.](../transactions/gas.md)

### Blockchain Environment

Similarly to how an HTTP request that runs on a web server, each function call to a smart contract gets executed in an entirely new stateless virtual environment on the blockchain. Specifically, each node in the relevant shard (which typically contains around 100 nodes) spins up a virtual machine to execute that code locally. That virtual machine then executes the WebAssembly (Wasm) that your AssemblyScript code has been compiled into. Once it is done, the node tears down the VM.

## Programming Languages for Smart Contracts

Although developers use one of two technologies to write and compile Smart Contracts on the NEAR platform:

1. Rust (a powerful language with a great developer experience)
2. JavaScript (upcoming with [near-sdk-js](https://github.com/near/near-sdk-js))
3. AssemblyScript (with [near-sdk-as](https://github.com/near/near-sdk-as), not being actively maintained and not recommended for financial applications)
4. Any lanugaue that can be compiled to WASM (WebAssembly)

Whichever language you use to build your Smart Contracts, know that, once compiled to Wasm, they are eventually deployed and executed on the NEAR platform exactly the same way.

If you're familiar with Rust then check out [near-sdk-rs](https://github.com/near/near-sdk-rs) for authoring Smart Contracts in Rust that can be deployed to the NEAR platform. The `near-sdk-rs` repository has several great examples to help you get started quickly.

You can explore a lot of Smart Contract examples and deploy them in seconds, literally, from our [examples](http://near.dev/).
