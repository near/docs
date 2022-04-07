---
id: introduction
title: Introduction
---

While developing your smart contract you will want to test that it works as it is supposed to, and moreover, it does in a safe way. In NEAR we have developed tools to help you carry such tests. Basically, there are three types of tests you can perform:

1. Unit tests, to test methods individually. They are written in the contract's language and are executed localy.
2. Integration tests, to test how your contract behaves in a realistic environment. They are written in javascript and execute in the NEAR testnet.
3. Sandbox tests, to test your contract in a realistic yet totally controlled environment. They are written in javascript and execute in the NEAR sandbox.

We recommend all developers to implement the 3 types of tests, since each is suitable to detect different types of error. Furthermore, we strongly recommend to first release all projects in the testnet, and give users time to try them before releasing them into mainnet.

---
## Setting Up Testing
Testing a smart contract involves using different pieces of software depending on which type of test you are performing. In order to save you from the trouble of setting them up, we recommend you copy the structure from one of our [example projects](https://near.dev).