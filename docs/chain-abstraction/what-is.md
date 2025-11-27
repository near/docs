---
id: what-is
title: What is Chain Abstraction?
sidebar_label: Introduction
description: "Learn how NEAR allows you to seamlessly work across all chains"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs";
import Card from '@site/src/components/UI/Card';
import ConceptCard from '@site/src/components/UI/ConceptCard';

Through a combination of innovative technologies, NEAR enables developers to build applications that work seamlessly across multiple blockchains while abstracting away the underlying complexity for both developers and end users.

<ConceptCard
  title="Multi-Chain Accounts"
  description='A core piece of tech that enables NEAR accounts, including smart contracts, to sign transactions for all other blockchains (including Bitcoin, Ethereum and Solana)'
  image="/assets/docs/welcome-pages/10.templates.png"
  index={0}
  href="/chain-abstraction/chain-signatures"
/>

<ConceptCard
  title="Swaps via Intents"
  description='A decentralized system where users simply express desired outcomes (like "swap BTC for ETH at the best price"), and a network of solvers then competes to fulfill these intents optimally'
  image="/assets/docs/welcome-pages/9.near-nodes.png"
  index={1}
  href="/chain-abstraction/intents/overview"
/>

<ConceptCard
  title="OmniBridge"
  description='A multi-chain bridge that enables secure and efficient cross-chain transfers. The bridge serves as both a token factory and custodian, managing native and bridged tokens'
  image="/assets/docs/welcome-pages/4.smart-contracts.png"
  index={2}
  href="/chain-abstraction/omnibridge/overview"
/>

---

## Why Chain Abstraction Matters

By building on NEAR, developers do not need to worry about the complexities of integrating with multiple blockchains. Instead, they can focus on building great applications that work seamlessly across all chains.

Meanwhile, users can enjoy a smooth experience, using unified accounts and assets without needing to even understand on which blockchain they are operating.

<div class="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
  <div class="col col--6">
    <Card title="Benefits for Developers" >
      - <a>Integrate with multiple blockchains through a single NEAR API </a>
      - <a>Focus on application logic instead of blockchain complexity </a>
      - <a>Reach users regardless of their preferred blockchain network </a>
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Benefits for Users" >
      - <a>Operate across all chains using a single NEAR account </a>
      - <a>Access assets and services from multiple blockchains seamlessly </a>
      - <a>Enjoy a unified and intuitive user experience </a>
    </Card>
  </div>
</div>

<details> 

<summary> Example: Cross-Chain NFT Marketplace </summary>

Imagine building a digital art marketplace where users can purchase NFTs from different blockchains (Ethereum, Solana, etc.). Without chain abstraction, you'd need to:

- Implement multiple blockchain connections
- Handle different wallet types
- Manage cross-chain transfers
- Build complex UIs to explain blockchain concepts

With chain abstraction, both you and your users just focus on the core experience: browsing and trading art. All blockchain complexity is handled automatically behind the scenes.

</details>

---

<!-- ## Overview

NEAR's chain abstraction framework consists of three core technologies that work together to create seamless cross-chain experiences: `NEAR Intents`, `Chain Signatures`, and the `OmniBridge`.

### [**NEAR Intents**](./intents/overview.md)

A decentralized system where users simply express desired outcomes (like "swap BTC for ETH at the best price"), and a network of solvers then competes to fulfill these intents optimally, handling all the technical complexity behind the scenes

<hr class="subsection" />

### [**Chain Signatures**](#chain-signatures)

A core piece of tech that enables NEAR accounts, including smart contracts, to **sign transactions** for all other blockchains (including Bitcoin, Ethereum and Solana)

<hr class="subsection" />

### [**OmniBridge**](#omnibridge)

A **multi-chain bridge** that enables secure and efficient cross-chain transfers. The bridge serves as both a token factory and custodian, managing native and bridged tokens through a unified interface.

--- -->

<!-- ### NEAR Intents

[NEAR Intents](intents/overview.md) are a new transaction type that allows information, requests, assets, and actions to be exchanged between users, services, and AI agents.

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

Chain Signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols. By using [Multi-Party Computation (MPC)](chain-signatures.md#multi-party-computation-service), this technology allows a single NEAR account to control accounts and assets on external chains like Bitcoin, Ethereum, and Base.

Key benefits include:

- Single Account, Multi-Chain Operations: Manage multiple blockchain interactions from one NEAR account
- Reduced Development Overhead: Write smart contracts on NEAR that directly sign cross-chain transactions
- Secure Transaction Signing: Leverage decentralized MPC for trustless signature generation

For example, this enables dApps built on NEAR to interact with Bitcoin's UTXO model or Ethereum's account model, powering use cases like cross-chain DeFi protocols, atomic swaps, and NFT marketplaces.

:::tip
To learn more about Chain Signatures, the concepts, and how to implement it, check these articles:

- [What are Chain Signatures?](chain-signatures.md)
- [Getting started with Chain Signatures](chain-signatures/getting-started.md)
- [Implementing Chain Signatures](chain-signatures/implementation.md)

:::

### OmniBridge

The [OmniBridge](omnibridge/overview.md) is a multi-chain asset bridge that combines Chain Signatures with chain-specific verification methods to enable secure and efficient cross-chain asset transfers. It consists of three core components:

1. **Chain Signatures Integration**:
   - Enables NEAR smart contracts to generate and control accounts on other blockchains
   - Allows direct signing and execution of transactions on external chains
   - Provides secure message signing through MPC network

2. **Verification Layer**:
   - Hybrid verification approach combining MPC signatures and light clients
   - Chain-specific verification methods based on target chain requirements
   - Significantly reduces verification times from hours to minutes
   - Lowers gas costs across all supported chains

3. **Bridge Token Factory**:
   - Unified contract serving as both token factory and custodian
   - Manages both native and bridged tokens through NEP-141 standard
   - Handles token locking, minting, and burning operations
   - Supports permissionless relayer network for efficient processing

This architecture creates a robust bridge system that combines NEAR's ability to execute transactions on foreign chains with secure verification methods, while maintaining high efficiency and security through MPC threshold guarantees.

:::info
For detailed implementation information and current status, see the [OmniBridge documentation](omnibridge/overview.md).
::: -->
