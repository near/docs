---
id: introduction
title: NEAR Drop Tutorial
sidebar_label: Introduction
description: "Learn to build a token distribution system using NEAR Drop smart contracts. This tutorial covers creating token drops for $NEAR, Fungible Tokens, and NFTs with function-call access keys for seamless user experience."
---

In this comprehensive tutorial, you'll learn how to build and deploy a NEAR Drop smart contract that enables seamless token distribution across the NEAR ecosystem. NEAR Drop allows users to create token drops ($NEAR, Fungible Tokens, and Non-Fungible Tokens) and link them to specific private keys, creating a smooth onboarding experience for new users.

---

## What You'll Build

By the end of this tutorial, you'll have created a fully functional token distribution system that includes:

- **NEAR Token Drops**: Distribute native NEAR tokens to multiple recipients
- **Fungible Token (FT) Drops**: Create drops for any NEP-141 compatible token  
- **Non-Fungible Token (NFT) Drops**: Distribute unique NFTs to users
- **Function-Call Access Keys**: Enable gasless claiming for recipients
- **Account Creation**: Allow users without NEAR accounts to claim drops and create accounts

![NEAR Drop Flow](/docs/assets/tutorials/near-drop/near-drop-flow.png)

---

## Prerequisites

To complete this tutorial successfully, you'll need:

- [Rust](/smart-contracts/quickstart#prerequisites) installed
- [A NEAR wallet](https://testnet.mynearwallet.com)
- [NEAR-CLI](/tools/near-cli#installation)
- [cargo-near](https://github.com/near/cargo-near)
- Basic understanding of smart contracts and NEAR Protocol

:::info New to NEAR?
If you're new to NEAR development, we recommend starting with our [Smart Contract Quickstart](../../smart-contracts/quickstart.md) guide.
:::

---

## How NEAR Drop Works

NEAR Drop leverages NEAR's unique [Function-Call Access Keys](../../protocol/access-keys.md) to create a seamless token distribution experience:

1. **Create Drop**: A user creates a drop specifying recipients, token amounts, and generates public keys
2. **Add Access Keys**: The contract adds function-call access keys that allow only claiming operations
3. **Distribute Keys**: Private keys are distributed to recipients (via links, QR codes, etc.)
4. **Claim Tokens**: Recipients use the private keys to claim their tokens
5. **Account Creation**: New users can create NEAR accounts during the claiming process

### Key Benefits

- **No Gas Fees for Recipients**: Function-call keys handle gas costs
- **Smooth Onboarding**: New users can claim tokens and create accounts in one step  
- **Multi-Token Support**: Works with NEAR, FTs, and NFTs
- **Batch Operations**: Create multiple drops efficiently
- **Secure Distribution**: Private keys control access to specific drops

---

## Tutorial Overview

This tutorial is divided into several sections that build upon each other:

| Section | Description |
|---------|-------------|
| [Contract Architecture](./contract-architecture) | Understand the smart contract structure and key components |
| [NEAR Token Drops](./near-drops) | Implement native NEAR token distribution |
| [Fungible Token Drops](./ft-drops) | Add support for NEP-141 fungible tokens |
| [NFT Drops](./nft-drops) | Enable NFT distribution with NEP-171 tokens |
| [Access Key Management](./access-keys) | Learn how function-call keys enable gasless operations |
| [Account Creation](./account-creation) | Allow new users to create accounts when claiming |
| [Frontend Integration](./frontend) | Build a web interface for creating and claiming drops |
| [Testing & Deployment](./testing-deployment) | Test your contract and deploy to testnet/mainnet |

---

## Real-World Use Cases

NEAR Drop smart contracts are perfect for:

- **Airdrops**: Distribute tokens to community members
- **Marketing Campaigns**: Create token-gated experiences
- **Onboarding**: Introduce new users to your dApp with token gifts
- **Events**: Distribute commemorative NFTs at conferences
- **Gaming**: Create in-game item drops and rewards
- **DAO Operations**: Distribute governance tokens to members

---

## What Makes This Tutorial Special

This tutorial showcases several advanced NEAR concepts:

- **Function-Call Access Keys**: Learn to use NEAR's powerful key system
- **Cross-Contract Calls**: Interact with FT and NFT contracts
- **Account Creation**: Programmatically create new NEAR accounts
- **Storage Management**: Handle storage costs efficiently
- **Batch Operations**: Process multiple operations in single transactions

---

## Example Scenario

Throughout this tutorial, we'll use a practical example: **"NEAR Community Airdrop"**

Imagine you're organizing a community event and want to:
1. Give 5 NEAR tokens to 100 community members
2. Distribute 1000 community FTs to early adopters  
3. Award special event NFTs to participants
4. Allow users without NEAR accounts to claim and create accounts

This tutorial will show you how to build exactly this system!

---

## Next Steps

Ready to start building? Let's begin with understanding the contract architecture and core concepts.

[Continue to Contract Architecture →](./contract-architecture)

---

:::note Versioning for this article
At the time of this writing, this tutorial works with the following versions:

- near-cli: `0.17.0`
- rustc: `1.82.0`
- cargo-near: `0.6.2`
- near-sdk-rs: `5.1.0`
:::