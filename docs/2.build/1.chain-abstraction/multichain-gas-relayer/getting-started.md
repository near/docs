---
id: getting-started
title: "Multichain Gas Relayer: Getting Started Guide"
hide_table_of_contents: true
---

The Multichain Gas Relayer provides gas abstraction for foreign chains outside of NEAR. This system, in conjunction with NEAR Chain Signatures, allows NEAR users to transact on other blockchains and pay for gas using NEAR, USDC, USDT, or other NEAR-based tokens from a single NEAR account.

![img](https://pages.near.org/wp-content/uploads/2024/02/acct-abstraction-blog-1.png)

Chain Signatures lets users manage remote accounts and transact on any blockchain from a single NEAR account. The Multichain Gas Relayer further simplifies this process by eliminating the need for users to acquire native gas tokens to transact on other chains.


---

## Why did NEAR create the Multichain Gas Relayer?

NEAR's mission is to build blockchain infrastructure for Chain Abstracted applications. Chain abstraction aims to make blockchain technology more user-friendly by simplifying interactions. A key step in achieving this is reducing the complexity of paying for transaction gas across different blockchains. Users should be able to pay for cross-chain transactions with a single asset or have the gas fees fully sponsored on their behalf.

---

## How does it work?

The Multichain Gas Relayer has 3 core components:

1. **Gas Station Smart Contract**: A smart contract on NEAR that manages the creation, signing, of transactions to foreign chains. It also handles gas fee calculations and collects NEAR tokens for gas payments on foreign chains.  
2. **Multichain Relayer Server**: This server coordinates the relaying of transactions between NEAR and other blockchains. It listens for signed transaction payloads and submits them to the appropriate foreign chain RPCs.  
3. **Chain Signatures**: A network of distributed Multi-Party Computation (MPC) signers that cooperatively sign transactions. This ensures secure transaction signing and validation on the NEAR blockchain before relaying to foreign chains.

### System Workflow

1. **Transaction Creation**: Users initiate a transaction on NEAR, specifying the foreign chain transaction and attaching NEAR tokens to cover gas fees on the foreign chain. This transaction is sent to the Gas Station Contract.  
2. **Transaction Signing**: The Gas Station Contract invokes Chain Signatures MPC signing service to sign the transaction. This step may require multiple calls due to gas limitations on NEAR, especially for complex transactions.  
3. **Event Emission and Indexing**: Once the transactions are signed, the Gas Station Contract emits an event. The Gas Station Event Indexer picks up this event and triggers the Multichain Relayer Server to relay the signed transactions.  
4. **Relaying Transactions**: The Multichain Relayer Server first sends a funding transaction to ensure the user’s account on the foreign chain has sufficient gas. Once confirmed, it sends the user’s originally intended signed transaction to the foreign chain for execution.

---

## Example Real-World Flow

* Alice has an alice.near account that maps to a remote Optimism (OP) address, 0xabc  
* Alice wants to interact with a Farcaster application on OP using her NEAR account, but she prefers to pay for gas with assets she has on hand, specifically USDT  
* Alice initiates an on-chain action on Farcaster from her NEAR account. She sends the transaction to a gas station smart contract, including the OP transaction payload in the arguments and attaching the necessary USDT amount for the cross-chain gas payment  
* The transaction bundle is sent to the NEAR gas station contract, which then forwards it to the NEAR MPC signing service. This bundle includes (1) the transaction to fund the user's 0xabc address with the ETH needed for gas, and (2) the user's original transaction to take action on the Farcaster application  
* The MPC service will sign both transactions and forward the signed transactions back to the gas station contract  
* The relayer operator will observe the events (signed transactions) emitted from the gas station contract and submit them to the Optimism network. This process starts by initiating a fund transfer from a treasury paymaster account on Optimism that holds ETH. The paymaster account will transfer ETH to the user's 0xabc address, equivalent to the USDT originally sent by the user  
* Then the relayer will submit the final transaction, and the originally intended Farcaster transaction will be executed from the user's 0xabc address, using ETH to cover the gas

---

## What chains are supported?

The NEAR Multichain Gas Relayer supports cross-chain gas abstraction on Base, Optimism, Arbitrum and Binance Smart Chain, and Ethereum. These chains were selected based on multiple factors including interest from key partners, low gas fees, and fast finality for transactions. Support for EDDSA chains like Solana will be coming soon in conjunction with EDDSA support for NEAR chain signatures.

---

## Where can I go to learn more?

* Visit our [docs](https://docs.near.org/build/chain-abstraction/multichain-gas-relayer/overview) to learn more about how to integrate the Multichain Gas Relayer into your product  
* Join the NEAR Chain Abstraction [developer group](https://t.me/chain\_abstraction) on Telegram to ask questions and discuss ideas with other developers.