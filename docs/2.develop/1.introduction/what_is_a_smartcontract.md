---
id: smartcontract
title: Smart Contracts from a Developer Perspective
sidebar_label: What is a Smart Contract?
---
A smart contract is nothing but a program stored on a blockchain. As any piece of modern software it is composed of public and private functions that interact with each other in order to accomplish a task. They are written in human readable languages, and then compiled and deployed to a blockchain. Once deployed, any user from the blockchain can interact with them.

While smart contracts are tightly related to blockchains, it is not necessary to fully understand how a blockchain works in order to develop a smart contract. As a programmer, you can simply abstract away the underlying complexity and think of the blockchain as an execution environment. Particularly, it is sufficient to understand that you will be writing apps that execute in an environment with nice advantages but **important constraints**:

1. Computational resources are **much more limited** than on a consumer's PC. Forget about iterating an array of thousands of entries. Data structures are your friends.

2. Interactions with other apps (other smart contracts) are **asynchronous** and **independent**. This means that once your contract calls another one, its execution is finished. If there is a return, you will have to handle it as a new call to your smart contract.

3. We will be dealing with **real money**, so security must be our top concern. You don't want the user's money to get lost or locked. At the same time, you want to avoid losing all your money in storage. Don't worry, we have a whole section about this.