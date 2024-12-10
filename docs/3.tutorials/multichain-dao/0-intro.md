---
id: introduction
title: Near Multi-Chain DAO Governance
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome! In this guide, you’ll learn how to effortlessly leverage Near Multi-Chain DAO Contract to sign an EIP-1559 transaction on behalf of decentralized organizations like DAOs or multisigs.

## Overview

The [Near Multi-Chain DAO Contract](https://github.com/nearuaguild/abstract-dao) is designed to act as an intermediary between Decentralized Organizations and a Multi-Party Computation (MPC) contract. Its primary purpose is to streamline the governance process for DAO councils by allowing them to vote on proposals once and automatically generate the necessary signatures for the same payload across multiple Ethereum Virtual Machine (EVM) compatible chains — differing only by the chain ID and Gas.

### Environments

Currently, there're 2 environments:

1. Testnet: `abstract-dao.testnet`
2. Dev (unstable): `dev.abstract-dao.testnet`

### Use Case

Imagine you are part of a Decentralized Organization that needs to transfer funds across multiple EVM-compatible chains. With the traditional approach, your organization would need to vote separately for each chain, making the process repetitive and time-consuming.

Here’s how it works with Near Multi-chain DAO:

1. **Craft an EIP-1559 Payload**: You create the transaction details (the payload), which specify the parameters such as the recipient address, nonce, value, and the data you want to send. This payload remains the same across all chains, with only the chain ID and Gas Fees differing.

2. **Choose a Single Allowed Account**: As part of the voting process, your organization chooses an "allowed account," which is the member who will be responsible for generating signatures for the transaction across different chains.

3. **Vote on the Request**: Your decentralized organization votes once to approve this request. Each member can review the transaction, then cast their vote to confirm or reject it.

4. **Generate Signatures**: Once the request has enough confirmations, the transaction is approved. And the allowed account can proceed with generating signatures for the transaction on as many EVM-compatible chains as needed.

The result is a drastically simplified governance process (one vote, one confirmation) and the ability to sign and execute transactions across multiple chains in a coordinated manner.

---

## Prerequisites

To complete this tutorial successfully, you'll need [Near CLI](/tools/near-cli#installation) to be installed.

Also this guide assumes you will be using a Multisig contract as the Decentralized Organization (DAO) for signing EIP-1559 transactions.

:::info Deploy Multisig
If you don't have one so far, please download [compiled Wasm file](https://github.com/near/core-contracts/raw/refs/heads/master/multisig2/res/multisig2.wasm) from the repository and deploy it to newly created account.

:::

---

## Next steps

This guide significantly overlaps with concepts related to [Chain Signatures](/build/chain-abstraction/chain-signatures/getting-started). Please review it first to gain a better understanding of what's happening if you haven't already.

Ready to start? Let's jump to the [Signature Generation](./1-signing.md) and begin your learning journey!

---

:::note Versioning for this article

- near-cli: `0.12.0`
- rustc: `1.78.0`
- cargo: `1.80.1`
- cargo-near: `0.6.2`
- rustc: `1.78.0`
- node: `21.6.1`

:::
