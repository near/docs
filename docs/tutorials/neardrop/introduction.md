---
id: introduction
title: NEAR Drop Tutorial
sidebar_label: Introduction
description: "Build a token distribution system that lets you airdrop NEAR, FTs, and NFTs to users without them needing gas fees or existing accounts."
---

import {Github} from "@site/src/components/codetabs"

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

## Project Structure

Your completed project will look like this:

<Github fname="README.md" language="bash" 
        url="https://github.com/Festivemena/Near-drop/blob/main/README.md"
        start="10" end="30" />

The frontend structure:

<Github fname="package.json" language="json" 
        url="https://github.com/Festivemena/Drop/blob/main/package.json"
        start="1" end="30" />

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
| [Access Keys](/tutorials/neardrop/access-keys) | Understanding gasless operations |
| [Account Creation](/tutorials/neardrop/account-creation) | Auto account creation |
| [Frontend](/tutorials/neardrop/frontend) | Build a web interface |

Each section builds on the previous one, so start from the beginning!

---

## Repository Links

- **Smart Contract**: [github.com/Festivemena/Near-drop](https://github.com/Festivemena/Near-drop)
- **Frontend**: [github.com/Festivemena/Drop](https://github.com/Festivemena/Drop)

---

## Quick Start

If you want to jump straight into the code:

```bash
# Clone the smart contract
git clone https://github.com/Festivemena/Near-drop.git
cd Near-drop

# Build and deploy
cd contract
cargo near build
near deploy <your-account>.testnet target/near/near_drop.wasm

# Clone the frontend
git clone https://github.com/Festivemena/Drop.git
cd Drop
npm install
npm run dev
```

---

## Ready to Start?

Let's dive into how the contract architecture works and start building your token distribution system.

[Continue to Contract Architecture →](./contract-architecture.md)

---

:::note Version Requirements
This tutorial uses the latest NEAR SDK features. Make sure you have:
- near-cli: `0.17.0`+
- rustc: `1.82.0`+
- cargo-near: `0.6.2`+
- node: `18.0.0`+
:::