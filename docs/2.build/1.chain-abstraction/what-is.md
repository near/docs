---
id: what-is
title: What is Chain Abstraction?
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";

![img](/docs/assets/welcome-pages/chain-abstraction-landing.png)

# What is Chain Abstraction?

Chain abstraction makes blockchain technology invisible to end users while preserving all its benefits. The goal is simple: users should be able to interact with blockchain applications as easily as they do with traditional web applications, regardless of which blockchain network they're using.

With chain abstraction, both users and developers can seamlessly interact across multiple blockchains without dealing with the underlying complexity. This means a single application can work with Bitcoin, Ethereum, or any other blockchain, while maintaining a simple, unified experience.

:::info Example
Imagine a digital art marketplace where users can purchase NFTs that exist on different blockchains (Ethereum, Solana, etc.). With chain abstraction, users don't need to:

- Create multiple blockchain wallets
- Buy different cryptocurrencies for gas fees
- Understand which blockchain their NFT lives on

They simply browse, click, and buy - the complexity is handled behind the scenes.
:::

## Overview

NEAR's chain abstraction framework consists of three core technologies that work together to create seamless cross-chain experiences:

1. [**Intent / Solver Layer**](#intent--solver-layer): A decentralized system where users express desired outcomes (like "swap Token A for Token B at the best price") without specifying technical details. A network of solvers then competes to fulfill these intents optimally, handling complex cross-chain operations behind the scenes.

2. **Chain Signatures**: Enables NEAR smart contracts to securely sign and execute transactions on other blockchains (like Bitcoin or Ethereum), allowing cross-chain interactions.

3. **OmniBridge**: Connects different blockchain networks together, allowing assets and data to flow between them, ensuring transactions are executed smoothly across chains.

![Chain Abstraction Stack](/docs/assets/chain-abstract-1.svg)
_Chain Abstraction Stack high-level diagram_

### Intent / Solver Layer

The Intent / Solver Layer (aka [NEAR Intents](https://pages.near.org/blog/introducing-near-intents/)) are a new type of transaction that allow information, requests, assets, and actions to be exchanged between AI agents, services, and end users.

This represents a paradigm shift in how users and AI agents interact with blockchain networks. Instead of directly executing complex transactions across multiple chains, users simply declare what they want to achieve, and the network determines how to make it happen.

Here's how it works:

1. **Users/Agents Submit Intents**: Express desired outcomes without specifying the technical details (e.g., "Get the best price for my Bitcoin across all DEXs and CEXs")
2. **Solver Network Competes**: A decentralized network of solvers (both AI agents and traditional market makers) compete to fulfill these intents optimally
3. **Cross-Chain Execution**: The best solution is automatically executed, potentially spanning multiple chains and services

:::info Example
Instead of a user having to:

1. Bridge assets between chains
2. Find the best trading venues
3. Execute multiple transactions
4. Handle different wallet requirements

They simply submit an intent: "Swap Token A for Token B at the best price"
The Intent Layer handles all complexity across Web2 and Web3 behind the scenes.
:::

For developers, the Intent Layer provides:

- A unified framework for building cross-chain applications
- Access to both AI agents and traditional solvers for transaction optimization
- Built-in liquidity aggregation across DeFi and CeFi
- Support for complex use cases beyond simple swaps, including:
  - Cross-chain stablecoin operations
  - DeFi programmability for non-smart contract assets
  - Account-based trading (AccountFi)
  - AI agent interactions and negotiations

:::info
NEAR Intents are designed to power both traditional DeFi operations and the emerging AI economy, creating a unified transaction framework for Web2 and Web3 interactions.
:::

### Chain Signatures

By using [Multi-Party Computation (MPC)](../../1.concepts/abstraction/chain-signatures.md#multi-party-computation-service), Chain Signatures enables accounts and smart contracts on the NEAR blockchain to sign and execute transactions on external chains, such as Bitcoin, Ethereum, and Base.

For example, this allows a dApp built on NEAR to interact with Bitcoin's UTXO model, enabling advanced functionality like asset transfers or decentralized finance (DeFi) protocols.

:::tip
To learn more about Chain Signatures, the concepts, and how to implement it, check these articles:
- [What are Chain Signatures?](../../1.concepts/abstraction/chain-signatures.md)
- [Getting started with Chain Signatures](chain-signatures/getting-started.md)
- [Implementing Chain Signatures](chain-signatures/chain-signatures.md)
:::

### OmniBridge

The [OmniBridge](https://github.com/Near-One/omni-bridge) is a multi-chain asset bridge that facilitates secure and efficient asset transfers between different blockchain networks, leveraging NEAR Multi-Party Computation (MPC) and Chain Signatures technology.

OmniBridge acts as an aggregator of various message passing layers and light clients, enabling NEAR smart contracts to access states on external blockchains including Bitcoin, Ethereum, and Solana.

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

Thanks to significant advancements in the cryptocurrency space, including cross-chain interactions, account management, and the raise of AI applications, truly innovative projects are being developed in the NEAR ecosystem.

### Bitcoin Use Cases

By combining chain abstraction technologies, NEAR acts as a bridge to Bitcoin, where developers can harness Bitcoin's security and decentralization alongside NEAR's scalability and smart contract capabilities.

A simple architecture for Bitcoin chain abstraction would include:
- **Business logic on NEAR:** developers write smart contracts on NEAR, leveraging its high throughput, low fees, and comprehensive developer tooling.
- **Bitcoin integration with Chain Signatures:** the smart contract sends a signature request to the NEAR blockchain, where the Chain Signatures module signs Bitcoin transactions securely. Then, the signed transaction is relayed to the Bitcoin network.
- **User Experience:** Users interact with the dApp through a single account. Additionally, gas fees can be subsidized using [NEAR relayers](#relayers-cover-gas-fees), ensuring smooth onboarding.

:::info Use cases

Check [Proximity](https://www.proximity.dev/)'s list of Bitcoin use cases using NEAR Chain Abstraction:

- [BitcoinFi](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#df89)
- [Payment Gateways for Merchants](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#0c38)
- [Cross-Chain NFT Platforms](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#521b)
- [Bitcoin Custody Solutions](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#6a7c)

:::

### Relayers: Cover gas fees

Allowing users to start using a dApp without having to acquire funds is a powerful tool to increase user adoption. NEAR Protocol provides a service that allows developers to subsidize gas fees for their users.

This concept, known as "Account Abstraction" in other chains, is a **built-in feature** in NEAR. User can wrap transactions in messages known as **meta-transaction**, that any other account can relay to the network.

:::tip
In NEAR the relayers simply attach NEAR to cover gas fees, and pass the transaction to the network. There, the transaction is executed as if the **user had sent it**.
:::
