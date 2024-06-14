---
id: introduction
title: Chain Abstraction
sidebar_label: Introduction
---

Do you know how your favorite apps are built and which database they use? Chances are not, since we choose apps based on their functionality, and not their underlying tech.

We believe that **same should be true for blockchain apps**, users should be able to enjoy an application, without the underlying tech hampering their experience. The user experience should be so good, that they don't realize they're using a blockchain.

![img](/docs/assets/welcome-pages/chain-abstraction-landing.png)

To help make this a reality, NEAR provides a set of services that allow to **abstract away** the blockchain from the user experience. This means that users can use blockchain-based application - both in NEAR and **other chains** - without needing to understand the technical details.

---

## Abstraction services

Through a combination of multiple technologies, NEAR allows to create a seamless flow, in which users can use their email to create an account, use such account without acquiring funds, and even control accounts across multiple chains.

This is achieved through a combination of multiple services:

- **Relayers**: A service that allows developers to subsidize gas fees for their users.
- **FastAuth**: A service that allows users to create and recover accounts using their email address through multi-party computation (MPC).
- **Multi-chain signatures**: A service that allows users to use their NEAR account to sign transactions in other chains.

---

## A holistic view

The combination of these services allows to create a **seamless** user experience, in which users can use blockchain-based applications without realizing they are using a blockchain.

Users will simply login with an email, and a **zero-fund** account will be created for them. No seed phrases to remember, no private keys to safe keep, and no need to acquire funds.

Once having their account, apps can ask the user to create meta-transactions and send them to any relayer. The relayer will pass the transaction to the network, attaching NEAR to pay for the execution fees. The transaction will then be executed as if the user had sent it, since the relayer is only there to attach NEAR to the submission.

If the user wants to interact with other blockchains, they can use their account to interact with a multi-chain signature relayer, which will relay the transaction to the right network, covering GAS fees.

As an example, this would allow users to collect NFTs across different chains, without ever needing to explicitly create an account or acquire crypto. All with just a single email login.
