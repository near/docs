---
id: what-is
title: What is Chain Abstraction?
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";

![img](/docs/assets/welcome-pages/chain-abstraction-landing.png)

> `Chain abstraction` is about **abstracting away** the complexities of **blockchain technology** from end-user experiences while maintaining its benefits. Users should not have to worry about which blockchain they are using or whether they are using one at all. NEAR Protocol advances this vision by introducing a framework that transcends single-platform development, enabling applications to control assets across any blockchain. 

To help on this task, NEAR Protocol provides services that allow to **create** and **recover accounts** using **email addresses**, use the account **without acquiring funds**, and **control accounts** in **other chains**. The combination of these services allows to create a **seamless** user experience, in which users can use blockchain-based applications without realizing they are using a blockchain.

As an example, this would allow users to collect NFTs across different chains, without ever needing to explicitly create an account or acquire crypto. All with just a single login.


## Chain Abstraction: The Holistic View

NEAR's ecosystem vision is to facilitate interactions across all blockchain networks and the larger internet. This transformative approach aims at enhancing the user experience and developer capabilities through advanced technologies, specifically in the realm of decentralized finance (DeFi) and artificial intelligence (AI).

Central to this vision is the concept of **chain abstraction**, which is designed to provide seamless access to a wider range of crypto assets, smart contracts, and blockchain states. This is achieved through a trio of key technologies: the intent layer, [chain signatures](chain-signatures/chain-signatures.md), and the [omnibridge](#).

![Chain Abstraction Stack](/docs/assets/chain-abstract-1.png)
 
- The intent layer serves as a foundational framework for user requests.
- [Chain signatures](chain-signatures/chain-signatures.md) empower smart contracts to sign transactions across different assets and chains.
- [Omnibridge](#) facilitates communication and state transitions between various blockchains, ensuring that transactions are executed smoothly.

---

## Multi-chain signatures: One account, multiple chains

Currently, users and applications are siloed in different chains. This means that a user needs to create a new account for each chain they want to use. This is not only cumbersome for the user, but also for the developer who needs to maintain different codebases for each chain.

NEAR Protocol provides a multi-chain signature service that allows users to use their NEAR Account to sign transactions in **other chains**. This means that a user can use the same account to interact with **Ethereum**, **Binance Smart Chain**, **Avalanche**, and **NEAR**.

![Chain Signatures](/docs/assets/chain-abstract-2.png)

:::info
Multi-chain signatures work by combining **smart contracts** that produce signatures, with indexers that listen for these signatures, and relayers that submit the transactions to other networks. This allows users to hold assets and use applications in **any** network, only needing to have a single NEAR account.
:::

---

## Applications

Thanks to significant advancements in the cryptocurrency space, including cross-chain interactions, account management, and the raise of AI applications, truly innovative projects are being developed in the NEAR ecosystem:

### Bitcoin Use Cases

   - **Bitcoin Lending**: improve the ability to borrow against Bitcoin held on the Layer 1 blockchain through chain signatures, making it easier to connect wallets and interact with lending protocols.
   - **Trading**: enable issuing and trading assets on Bitcoin, though current experiences are limited. The integration of chain signatures aims to streamline this process.
   - **Restaking**: support liquid stake tokens and restaking capabilities.

### Cross-Chain Protocols

   - Designing protocols that are agnostic to different blockchain environments. This enables users to swap assets between chains without needing to deploy multiple versions of a protocol.
   - Examples include projects like **Omnilane** and **Thesis**, which allow flexible asset swaps and margin-based protocols across various chains, enhancing liquidity and capital usage.

### Account Abstraction

   - The development of account abstraction has led to the creation of wallet systems, like those integrated into applications such as **HOT Wallet**, which can manage assets across multiple blockchains.
   - An example is a wallet that enables users to conduct transactions and swaps, showcasing seamless interaction with various decentralized applications (dApps) through unified balance management.

### AI-Driven Autonomous Agents

   - The potential for creating persistent AI agents that leverage decentralized technologies, which can operate independently on the blockchain.
   - These agents would utilize multi-party computation technology to interact with users and the network in a secure, decentralized manner.

### Relayers: Cover gas fees

Allowing users to start using a dApp without having to acquire funds is a powerful tool to increase user adoption. NEAR Protocol provides a service that allows developers to subsidize gas fees for their users.

This concept, known as "Account Abstraction" in other chains, is a **built-in feature** in NEAR. User can wrap transactions in messages known as **meta-transaction**, that any other account can relay to the network.

:::tip
In NEAR the relayers simply attach NEAR to cover gas fees, and pass the transaction to the network. There, the transaction is executed as if the **user had sent it**.
:::

<!--

### Fast-Auth: Email onboarding

One of the first barriers that new users face when entering the world of Web3 is the need to create a crypto wallet. This generally implies the need to choose a wallet, create and store a recovery phrase, and obtain deposit funds to start using the account.

With FastAuth, users only need to provide an email address to create a NEAR account. Using the same email address the user will be able to use their account across applications and devices.

:::warning
FastAuth is being deprecated, stay tuned for updates
:::

<hr subclass="subsection" />

-->
