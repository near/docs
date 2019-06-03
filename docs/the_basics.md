---
name: The Basics
route: /basics
menu: Introduction
description: How to think about Smart Contracts compared to conventional web applications.
---

# Smart Contract Basics

### Approaching Smart Contracts: How they're different from web applications

Programming on a blockchain is a lot like writing a "normal" web application in most ways. When in doubt, use the same mental models you already understand from other types of programming. There are a few key concepts which are either different or worth highlighting specifically:

### Deploying your backend

You deploy your application's back-end to the blockchain, where it is called a "smart contract" or just "contract" for short.

In Near, contract functions are written in [TypeScript](https://www.typescriptlang.org/). If you're interested in why, [check this out](details/language-typescript.md#why-typescript).

### State/Storage

The state of the contract, which you would normally store by writing values into a database, is instead stored on the blockchain using a simple key-value store called `globalStorage` \(which behaves similarly to web browser storage or any other key-value database\).

### Costs of Operation

Each operation has a certain cost associated with it. More complex operations \(including storage on chain\) have a higher cost. This cost is generally accounted for using a measure called "gas". 

This is currently not enabled in this version of the Near, but will be included in future releases. Who pays for gas \(and how\) to run contract code is an important issue.

### Blockchain Environment

Similarly to how an HTTP request runs on a web server, each function call to a smart contract gets executed in an entirely new stateless environment on the blockchain. Specifically, each node in the relevant shard \(which typically contains around 100 nodes\) spins up a virtual machine to execute that code locally. That virtual machine then executes the Web Assembly \(WASM\) that your TypeScript code has been compiled into. Once it is done, the node quits the VM.

