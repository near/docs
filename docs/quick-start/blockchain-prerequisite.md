---
id: blockchain-prerequisite
title: Smart Contract Prerequisite
sidebar_label: Smart Contracts Prerequisite
---

## Approaching Smart Contracts: How they're different from web applications

Programming on a blockchain is a lot like writing a "normal" web application in most ways. When in doubt, use the same mental models you already understand from other types of programming. There are a few key concepts which are either different or worth highlighting specifically:

### Deploying your backend

You deploy your application's back-end to the blockchain, where it is called a "smart contract" or just "contract" for short.

In NEAR, contract functions are written in [AssemblyScript](https://docs.assemblyscript.org/) which is a dialect of [TypeScript](https://www.typescriptlang.org/) that compiles to WebAssembly. This is for portability and ease of access for web developers.

<blockquote class="warning">
<strong>heads up</strong><br><br>

AssemblyScript is for non financial use cases.

</blockquote>

### State/Storage

The state of the contract, which you would normally store by writing values into a database, is instead stored on the blockchain using a simple key-value store called `storage` \(which behaves similarly to web browser storage or any other key-value database\).

You can modify state with "change operations" and read state with "view operations." Inside of change operations, you can write to storage in an easier way with persistent collections.

### Costs of Operation

Each operation has a certain cost associated with it. More complex operations \(including storage on chain\) have a higher cost. This cost is generally accounted for using a measure called "gas".

### Blockchain Environment

Similarly to how an HTTP request runs on a web server, each function call to a smart contract gets executed in an entirely new stateless environment on the blockchain. Specifically, each node in the relevant shard (which typically contains around 100 nodes) spins up a virtual machine to execute that code locally. That virtual machine then executes the Web Assembly (Wasm) that your AssemblyScript code has been compiled into. Once it is done, the node quits the VM.
