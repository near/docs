---
id: getting-started
title: "Multichain Gas Relayer: Getting Started Guide"
---

[Chain Signatures](../chain-signatures/getting-started.md) lets users manage remote accounts and transact on any blockchain from a single NEAR account. The Multichain Gas Relayer further simplifies this process by eliminating the need for users to acquire the tokens needed in the foreign chain to execute their transactions.

![img](https://pages.near.org/wp-content/uploads/2024/02/acct-abstraction-blog-1.png)

In other words, the Multichain Gas Relayer provides gas abstraction for foreign chains, allowing NEAR accounts to pay for the gas needed in the target chain using our native token (NEAR) and fungible tokens (e.g. USDC and USDT).

---

## Why a Multichain Gas Relayer?

NEAR's mission is to build blockchain infrastructure for Chain Abstracted applications. Chain abstraction aims to make blockchain technology more user-friendly by simplifying interactions.

A key step in achieving this is reducing the complexity of paying for transaction gas across different blockchains. Users should be able to pay for cross-chain transactions with a single asset or have the gas fees fully sponsored on their behalf.

---

## How Does it Work?

The Multichain Gas Relayer has 3 core components:

1. **Gas Station Smart Contract**: A smart contract on NEAR that manages the creation, signing, of transactions to foreign chains. It also handles gas fee calculations and collects NEAR tokens for gas payments on foreign chains

2. **Multichain Relayer Server**: This server coordinates the relaying of transactions between NEAR and other blockchains. It listens for signed transaction payloads and submits them to the appropriate foreign chain RPCs

3. **Chain Signatures**: A network of distributed Multi-Party Computation (MPC) signers that cooperatively sign transactions. This ensures secure transaction signing and validation on the NEAR blockchain before relaying to foreign chains

#### System Workflow

![chain-signatures](/docs/assets/welcome-pages/multi-chain-gas-diagram.png)
_Diagram of a chain signature in NEAR with gas being covered by the Relayer_

1. **Transaction Creation**: An account sends a transaction to the Gas Station Contract, specifying the foreign chain transaction and attaching NEAR tokens to cover gas fees on the foreign chain.

2. **Transaction Signing**: The Gas Station Contract invokes Chain Signatures MPC signing service to sign the transaction. This step may require multiple calls due to gas limitations on NEAR, especially for complex transactions

3. **Event Emission and Indexing**: Once the transactions are signed, the Gas Station Contract emits an event. The Gas Station Event Indexer picks up this event and triggers the Multichain Relayer Server to relay the signed transactions

4. **Relaying Transactions**: The Multichain Relayer Server first sends a funding transaction to ensure the user’s account on the foreign chain has sufficient gas. Once confirmed, it sends the user’s originally intended signed transaction to the foreign chain for execution

---

## Example Real-World Flow

- Alice has an `alice.near` account that maps to a remote Optimism (OP) address, `0xabc`
- Alice wants to interact with a Farcaster application on OP using her NEAR account, but she prefers to pay for gas with assets she has on hand, specifically USDT
- Alice initiates an on-chain action on Farcaster from her NEAR account. She sends the transaction to a gas station smart contract, including the OP transaction payload in the arguments and attaching the necessary USDT amount for the cross-chain gas payment
- The transaction bundle is sent to the NEAR gas station contract, which then forwards it to the NEAR MPC signing service. This bundle includes (1) the transaction to fund the user's `0xabc` address with the ETH needed for gas, and (2) the user's original transaction to take action on the Farcaster application
- The MPC service will sign both transactions and forward the signed transactions back to the gas station contract
- The relayer operator will observe the events (signed transactions) emitted from the gas station contract and submit them to the Optimism network. This process starts by initiating a fund transfer from a treasury paymaster account on Optimism that holds ETH. The paymaster account will transfer ETH to the user's `0xabc` address, equivalent to the USDT originally sent by the user
- Then the relayer will submit the final transaction, and the originally intended Farcaster transaction will be executed from the user's `0xabc` address, using ETH to cover the gas

---

## What chains are supported?

Currently, the Multichain Gas Relayer supports [Base](https://www.base.org/), [Optimism](https://www.optimism.io/), [Arbitrum](https://arbitrum.io/) and [Binance Smart Chain](https://www.bnbchain.org/en/bnb-smart-chain), and [Ethereum](https://ethereum.org/en/).

These chains were selected based on multiple factors including interest from key partners, low gas fees, and fast finality for transactions. Support for EDDSA chains like [Solana](https://solana.com/) will be coming soon in conjunction with EDDSA support for NEAR chain signatures.

---

## Where can I go to learn more?

- Visit our [docs](./overview.md) to learn more about how to integrate the Multichain Gas Relayer into your product
- Join the NEAR Chain Abstraction [developer group](https://t.me/chain\_abstraction) on Telegram to ask questions and discuss ideas with other developers.
