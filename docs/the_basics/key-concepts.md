---
description: >-
  The key concepts of the NEAR protocol blockchain. How to think about Smart
  Contracts as compared to conventional web applications.
---

# Key Concepts

## Deploying Code

You deploy your application's back-end to the blockchain, where it is called a "smart contract" or just "contract" for short.

All Smart Contracts are written in [TypeScript](https://www.typescriptlang.org/). If you're interested in why, [check this out](language-typescript.md#why-typescript).

## Approaching Smart Contracts: How they're different from web applications

Writing a contract is a lot like writing a "normal" web application in most ways. When in doubt, use the same mental models you already understand from other types of programming. There are a few key concepts which are either different or worth highlighting specifically:

1. The state of the contract, which you would normally store by writing values into a database, is instead stored on the blockchain using a simple key-value store called `globalStorage` \(which behaves similarly to web browser storage or any other key-value database\).
2. Each operation has a certain cost associated with it. More complex operations \(including storage on chain\) have a higher cost. This cost is generally accounted for using a measure called "gas". This is currently not enabled in this version of the environment but will be included in future releases. Who pays for gas \(and how\) to run contract code is an important issue.
3. Similarly to how an HTTP request runs on a web server, each function call to a smart contract gets executed in an entirely new stateless environment on the blockchain. Specifically, each node in the relevant shard \(which typically contains around 100 nodes\) spins up a virtual machine to execute that code locally. That virtual machine then executes the Web Assembly \(WASM\) that your TypeScript code has been compiled into. Once it is done, the node quits the VM.

To dig into the components of a smart contract, view the [Reference](reference-do-things.md)



### 

