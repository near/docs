---
id: overview
title: Multichain Gas Relayer Overview
sidebar_label: Overview
---

The Multichain Gas Relayer on NEAR is designed to facilitate cross-chain transactions by managing gas fees and transaction relays across different blockchain networks.

## What is it?

The Multichain Gas Relayer is a mechanism designed to enable gas fee payments and transaction relays across multiple blockchains. Gas fees are transaction fees paid to miners or validators to execute operations on a blockchain network. These fees can vary significantly across different blockchains and can pose a barrier to interoperability and seamless transactions between them.

### Benefits

1. **Interoperability**: Enables seamless interaction and transactions between different blockchains without the need for users to hold native tokens of each blockchain for gas fees.
  
2. **Cost Efficiency**: Reduces the overall cost of cross-chain transactions by optimizing gas fee management and leveraging economies of scale.
  
3. **User Experience**: Improves the user experience by abstracting the complexity of managing gas fees across multiple blockchains.

## System Design

This section provides an overview of the system design, including the main components, a technical diagram, and a high-level workflow of the Multichain Relayer system.

### System Components

1. [**Multichain Relayer Server**](multichain-server.md): This server coordinates the relaying of transactions between NEAR and other blockchains. It listens for signed transaction payloads and submits them to the appropriate foreign chain RPCs.

2. [**Gas Station Contract**](gas-station.md): A smart contract on NEAR that manages the creation, signing, and relaying of transactions to foreign chains. It also handles gas fee calculations and collects NEAR tokens for gas payments on foreign chains.

3. [**MPC Signing Service**](../chain-signatures.md): A network of trusted Multi-Party Computation (MPC) signers that cooperatively sign transactions. This ensures secure transaction signing and validation on the NEAR blockchain before relaying to foreign chains.

### Technical Diagram

Below is a design diagram of the entire Multichain Relayer system:

[![multichain_relayer_technical_design.png](/docs/multichain_relayer_technical_design.png)](/docs/multichain_relayer_technical_design.png)

:::note

- The [gas station contract](gas-station.md) and the [MPC signing service contract](https://github.com/near/mpc-recovery/tree/main/contract) are in the green box which take place on NEAR.
- The [multichain relayer server](multichain-server.md) focuses on the blue _Multichain Relayer Core Backend Services_ box in the middle and the connections to the XChain systems in the red box via RPCs.
- The [XChain Settlement](gas-station.md#settlement) process happening in the yellow box can be either manual or automated. [Automated settlement](gas-station.md#automated-settlement) is available for select partners based on their xChain transaction volume.

:::

### Workflow

1. **Transaction Creation**: Users initiate a transaction on NEAR, specifying the foreign chain transaction and attaching NEAR tokens to cover gas fees on the foreign chain. This transaction is sent to the Gas Station Contract.

2. **Transaction Signing**: The Gas Station Contract invokes the MPC signing service to sign the transaction. This step may require multiple calls due to gas limitations on NEAR, especially for complex transactions.

3. **Event Emission and Indexing**: Once the transactions are signed, the Gas Station Contract emits an event. The Gas Station Event Indexer picks up this event and triggers the Multichain Relayer Server to relay the signed transactions.

4. **Relaying Transactions**: The Multichain Relayer Server first sends a funding transaction to ensure the user’s account on the foreign chain has sufficient gas. Once confirmed, it sends the user’s signed transaction to the foreign chain.

---

## Key Features

- **Paymaster Accounts**: These are accounts on the destination chains that hold the native gas tokens. They ensure users have enough gas to complete their transactions on foreign chains.
- **xChain Settlement**: regular [cross-chain settlement](gas-station.md#settlement) is needed to ensure paymaster accounts have sufficient funds. This can be manual or automated, and involves swapping NEAR tokens for foreign chain tokens and transferring them to the paymaster accounts.
  - [Automated settlement](gas-station.md#automated-settlement) is available for select partners based on their cross-chain transaction volume.
- **Supported Chains**: Initially supports BSC, Ethereum, Base, Arbitrum, and Optimism with plans to expand to other chains.

## Limitations and Considerations

- **Gas and Slippage**: Users must account for potential gas and slippage issues when using the service. It’s recommended to overestimate gas fees and use high slippage settings in volatile markets.
- **Nonce Management**: Proper management of nonce values is crucial to avoid transaction failures, particularly with concurrent transactions and multiple paymaster accounts.
