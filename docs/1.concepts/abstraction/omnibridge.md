---
id: omnibridge
title: OmniBridge
---

The [OmniBridge](https://github.com/Near-One/omni-bridge) is a technical solution that allows users to transfer tokens between different blockchain networks, including Near, Solana, Ethereum, Base, and Arbitrum. This interoperability enhances liquidity and access to assets across ecosystems.

OmniBridge's implementation includes smart contracts and blockchain relayers leveraging NEAR [Multi-Party Computation (MPC)](chain-signatures.md#multi-party-computation-service) and [Chain Signatures](chain-signatures.md) technology to facilitate cross-chain asset transfers in a secure and efficient manner.



## Key Features

- **Cross-Chain Functionality:** Enables asset movements between Near, Solana, and Ethereum seamlessly.
- **Decentralized Mechanism:** Utilizes smart contracts to ensure secure transfers without relying on a centralized authority.
- **User-Friendly Interface:** Designed to simplify the process for end-users looking to swap assets.

### Supported Chains

Currently supported chains:

- Ethereum (ETH)
- NEAR
- Solana (SOL)
- Arbitrum (ARB)
- Base

## Architecture

The Omnibridge uses relayers that handle the cross-chain communication. The [omni-relayer](https://github.com/Near-One/omni-bridge/tree/main/omni-relayer) monitors events on the source chain and facilitate the corresponding actions on the target chain.
Smart contracts are deployed on both chains to manage the locking and minting/burning of tokens during the transfer process.

![Omnibridge](/docs/assets/omnibridge.svg)
_OmniBridge architecture diagram_

### Components

- **User Interface (dApp)**: users initiate cross-chain transactions using a dApp.
- **Bridge SDK**: either the [`bridge-sdk-js`](https://github.com/Near-One/bridge-sdk-js) for JavaScript developers or [`bridge-sdk-rs`](https://github.com/Near-One/bridge-sdk-rs) for Rust developers.
- **Smart Contracts**: the smart contracts on each blockchain, indicating function calls for locking/minting assets.
- **Omni Relayer**: facilitate communication by monitoring events on one chain and executing actions on the other.
- **Assets**: tokens and assets, such as `$ETH` and `$NEAR`, to illustrate assets being transferred between chains.

## Use Cases

- **Decentralized Applications (dApps)**: developers can build applications that require inter-chain interoperability, enhancing their usability and functionality.
- **Tooling for Existing dApps**: Allows existing projects to easily integrate cross-chain capabilities, expanding their reach.
- **DeFi Applications:** Enable liquidity across different DeFi platforms by allowing users to move their tokens freely.
- **NFTs and Gaming:** Facilitate the trading or transfer of digital assets among different blockchain networks.

## SDKs

Currently, NEAR's OmniBridge solution provides client SDKs in [JavaScript](#javascript) and [Rust](#rust).

### JavaScript

The Omnibridge JavaScript SDK, available in the [`bridge-sdk-js`](https://github.com/Near-One/bridge-sdk-js) repository, provides JS developers with tools to interact with the OmniBridge easily.

:::warning
The JavaScript OmniBridge SDK is currently under heavy development and should be considered highly unstable. The API surface is subject to frequent and breaking changes without notice. While we encourage exploration and feedback, we strongly advise against using this in production environments at this time.
:::

#### Key Features

- **Simple API:** Developers can integrate cross-chain capabilities into their applications with straightforward method calls.
- **Event Listening:** Capable of listening for blockchain events, which aids in tracking the status of asset transfers.
- **Support for Multiple Tokens:** The SDK is equipped to handle various tokens, making it versatile for different use cases.

### Rust

The Omnibridge Rust SDK, available in the [`bridge-sdk-rs`](https://github.com/Near-One/bridge-sdk-rs) repository, serves as a specialized toolkit for Rust developers, and provides tools for cross-chain asset transfers and cross-chain features while maintaining a focus on performance and security.

#### Key Features

   - **Simplicity**: The SDK simplifies complex operations, allowing developers to implement cross-chain functionalities without needing extensive knowledge of the underlying blockchain interactions.
   - **Bridges Functionality**: Encapsulates functions necessary to interact with the OmniBridge, including initiating token transfers and managing various transaction states.
   - **Event Handling**: Provides capabilities for monitoring events from the bridge, facilitating real-time tracking of asset movements.

## Learn more

If you are a developer looking to deep dive into Omnibridge, we recommend checking these GitHub repositories:

:::info GitHub
- [Omni-Bridge](https://github.com/Near-One/omni-bridge)
- [bridge-sdk-js](https://github.com/Near-One/bridge-sdk-js)
- [bridge-sdk-rs](https://github.com/Near-One/bridge-sdk-rs)
:::
