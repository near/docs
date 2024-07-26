---
id: introduction
title: Auction Zero to Hero 
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this Zero to Hero series, you'll learn everything you need to know about building Web3 applications on NEAR.

We will start by building a simple auction contract, and slowly build up on it, adding more and more concepts as we go. By the time you finish this tutorial you would have touch on several key primitives and concepts along the way:

- Building a smart contract
- Deploying and locking a contract
- Making cross-contract calls
- Using Non-Fungible Tokens
- Using Fungible Tokens 

This tutorial comes with contracts written in both JavaScript and Rust. 

---

## Prerequisites

Before starting, make sure to setup your development environment.

<details>
<summary>Working on Windows?</summary>

  See our blog post [getting started on NEAR using Windows](/blog/getting-started-on-windows) for a step-by-step guide on how to setup WSL and your environment

</details>

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```bash
# Install Node.js using nvm (more option in: https://nodejs.org/en/download)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install latest

# Install NEAR CLI to deploy and interact with the contract
npm i -g near-cli
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```bash
# Install Rust: https://www.rust-lang.org/tools/install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Contracts will be compiled to wasm, so we need to add the wasm target
rustup target add wasm32-unknown-unknown

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

# Install cargo near to help building the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
```

</TabItem>

</Tabs>

:::tip Testnet Account

There is no need to have a `testnet` account to follow this tutorial.

However, if you want to create one, you can do so through [a wallet](https://testnet.mynearwallet.com), and use it from the `near-cli` by invoking `near login`.

:::




---

## Overview

These are the steps that will bring you from Zero to Hero in no time! 💪

| Step | Name                                   | Description                                                     |
|------|----------------------------------------|-----------------------------------------------------------------|
| 1    | [Basic contract](./1-basic.md)         | Learn how to create an auction contract from scratch            |
| 2    | [Locking the contract](./2-locking.md) | Learn to create contracts with no access keys                   |
| 3    | [Winning an NFT](./3-nft.md)           | Learn about sending NFTs using cross-contract calls             |
| 4    | [Bidding with FTs](./4-ft.md)          | Learn about sending and receiving FTs                           |
| 5    | [Create a Frontend](#)                 | Create a frontend to interact with your smart contract          |
| 6    | [Monitor the Bids](#)                  | Learn how to use an indexer to monitor your contract's activity |
| 6    | [Factory](#)                           | Create a contract that will create auctions                     |

---

## Versioning 

:::note Versioning for this tutorial
At the time of this writing, this example works with the following versions:

- rustc: `1.78.0`
- near-sdk-rs: `5.1.0`
- cargo-near: `0.6.2`
- near-cli-rs `0.12.0`

:::




<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">


    </TabItem>

</Tabs>