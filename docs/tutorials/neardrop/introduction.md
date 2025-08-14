---
id: introduction
title: NEAR Drop Tutorial
sidebar_label: Introduction
description: "Build a token distribution system that lets you airdrop NEAR, FTs, and NFTs to users without them needing gas fees or existing accounts."
---

Ever wanted to give tokens to someone who doesn't have a NEAR account? Or send an airdrop without recipients needing gas fees? That's exactly what we're building!

**NEAR Drop** lets you create token distributions that anyone can claim with just a private key - no NEAR account or gas fees required.

---

## What You'll Build

A complete token distribution system with:

- **NEAR Token Drops**: Send native NEAR to multiple people
- **FT Drops**: Distribute any NEP-141 token (like stablecoins) 
- **NFT Drops**: Give away unique NFTs
- **Gasless Claims**: Recipients don't pay any fees
- **Auto Account Creation**: New users get NEAR accounts automatically

---

## How It Works

1. **Create Drop**: You generate private keys and link them to tokens
2. **Share Keys**: Send private keys via links, QR codes, etc.
3. **Gasless Claims**: Recipients use keys to claim without gas fees
4. **Account Creation**: New users get NEAR accounts created automatically

The magic? **Function-call access keys** - NEAR's unique feature that enables gasless operations.

---

## Real Examples

- **Community Airdrop**: Give 5 NEAR to 100 community members
- **Event NFTs**: Distribute commemorative NFTs at conferences  
- **Onboarding**: Welcome new users with token gifts
- **Gaming Rewards**: Drop in-game items to players

---

## What You Need

- [Rust installed](https://rustup.rs/)
- [NEAR CLI](../../tools/cli.md#installation)
- [A NEAR wallet](https://testnet.mynearwallet.com)
- Basic understanding of smart contracts

---

## Tutorial Structure

| Section | What You'll Learn |
|---------|-------------------|
| [Contract Architecture](/tutorials/neardrop/contract-architecture) | How the smart contract works |
| [NEAR Drops](/tutorials/neardrop/near-drops) | Native NEAR token distribution |
| [FT Drops](/tutorials/neardrop/ft-drops) | Fungible token distribution |
| [NFT Drops](/tutorials/neardrop/nft-drops) | NFT distribution patterns |
| [Frontend](/tutorials/neardrop/frontend) | Build a web interface |

Each section builds on the previous one, so start from the beginning!

---

## Ready to Start?

Let's dive into how the contract architecture works and start building your token distribution system.

[Continue to Contract Architecture →](./contract-architecture.md)

---

:::note
This tutorial uses the latest NEAR SDK features. Make sure you have:
- near-cli: `0.17.0`+
- rustc: `1.82.0`+
- cargo-near: `0.6.2`+
:::