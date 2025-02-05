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

2. [**Chain Signatures**](#chain-signatures): Enables NEAR accounts, including smart contracts, to sign and execute transactions on other blockchains (like Bitcoin or Ethereum), allowing cross-chain interactions.

3. [**OmniBridge**](#omnibridge): A trustless multi-chain asset bridge that combines Chain Signatures for cross-chain transaction execution with a verification layer that allows NEAR smart contracts to confirm transactions and state on foreign chains. This creates a fully trustless system where NEAR can both initiate and verify cross-chain operations.

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

Chain Signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols. By using [Multi-Party Computation (MPC)](../../1.concepts/abstraction/chain-signatures.md#multi-party-computation-service), this technology allows a single NEAR account to control accounts and assets on external chains like Bitcoin, Ethereum, and Base.

Key benefits include:

- Single Account, Multi-Chain Operations: Manage multiple blockchain interactions from one NEAR account
- Reduced Development Overhead: Write smart contracts on NEAR that directly sign cross-chain transactions
- Secure Transaction Signing: Leverage decentralized MPC for trustless signature generation

For example, this enables dApps built on NEAR to interact with Bitcoin's UTXO model or Ethereum's account model, powering use cases like cross-chain DeFi protocols, atomic swaps, and NFT marketplaces.

:::tip
To learn more about Chain Signatures, the concepts, and how to implement it, check these articles:

- [What are Chain Signatures?](../../1.concepts/abstraction/chain-signatures.md)
- [Getting started with Chain Signatures](chain-signatures/getting-started.md)
- [Implementing Chain Signatures](chain-signatures/chain-signatures.md)

:::

### OmniBridge

The [OmniBridge](https://github.com/Near-One/omni-bridge) extends NEAR's chain abstraction capabilities by combining two key elements: Chain Signatures for cross-chain transaction execution, and a verification layer that allows NEAR smart contracts to confirm the state and transactions on foreign chains. This creates a trustless bridge where NEAR contracts can both initiate and verify cross-chain operations.

1. **Chain Signatures Integration**:
   - NEAR smart contracts can generate derivation addresses on other blockchains
   - These contracts can directly sign and execute transactions on external chains

2. **State Verification Layer (Omniprover)**:
   - Allows NEAR smart contracts to verify the state and transactions on foreign chains
   - Supports different verification methods based on the target chain (e.g., light client proofs)
   - Ensures trustless verification of incoming transfers and state changes from external chains
   - For example, when receiving assets from Ethereum, NEAR contracts can verify the deposit actually occurred

3. **Decentralized Relayer Network**:
   - Open participation model for relayers
   - Trustless and incentivized system
   - Ensures efficient transaction processing and state updates across chains

This architecture creates a fully trustless bridge by combining NEAR's ability to execute transactions on foreign chains (via Chain Signatures) with the capability to independently verify the results of those transactions (via Omniprover).

---

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
