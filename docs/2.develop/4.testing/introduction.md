---
id: introduction
title: Introduction
---

While developing your smart contract you will want to test that it works as it is supposed to, and moreover, does so securely. In NEAR we have developed tools to help you carry out such tests. Basically, there are two types of tests you can perform:

1. **Unit Tests** to test methods individually. They are written in the contract's language and are executed locally.
2. **On-Chain Tests** 

    a. _Integration Tests_ to test how your contract behaves in a realistic environment. They are written in javascript and execute in the NEAR testnet.    

    b. _Sandbox Tests_ to test your contract in a realistic yet totally controlled environment. They are written in javascript and execute in the NEAR sandbox.

We recommend all developers to implement both types of tests, since each is suitable to detect different types of errors and make your code intentional. Furthermore, we strongly recommend to first release all projects on testnet, and give users time to try them before releasing them on mainnet.

---
## Setting Up Testing
Testing a smart contract involves using different pieces of software depending on which type of test you are performing. In order to save you from the trouble of setting them up, we recommend you copy the structure from one of our [example projects](https://near.dev).