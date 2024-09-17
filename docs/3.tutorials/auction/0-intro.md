---
id: introduction
title: A Step-by-Step Guide to Mastering NEAR
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome! In this guide we will help you navigate NEAR tech stack, so you can build Web3 applications from start to finish in no-time.

We'll start from a simple auction contract and slowly build on top of it to create a full Web3 application to carry out on-chain auctions.

By the time you finish this tutorial, you will have learned several concepts and how to use many key privitives along the way:

- [Creating a simple smart contract](./1.1-basic.md)
- [Writing tests for a contract](./1.2-testing.md)
- [Deploying a contract to testnet](./1.3-deploy.md)

<!-- - [Locking a contract](./2-locking.md)
- [Making cross-contract calls](./3-nft.md#transferring-the-nft-to-the-winner)
- [Using Non-Fungible Tokens](./3-nft.md)
- [Using Fungible Tokens](./4-ft.md) 
- [Creating a frontend to interact with the contract](./5-frontend.md)
- [Using an indexing API to keep track of the contract's activity](./6-indexing.md)
- [Modifying a contract factory to deploy your own contracts](./7-factory.md) -->

---

## Prerequisites

Before starting, make sure to set up your development environment! 

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

    # Install the NEAR CLI to deploy and interact with the contract
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
    ```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```bash
    # Install Rust: https://www.rust-lang.org/tools/install
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

    # Contracts will be compiled to wasm, so we need to add the wasm target
    rustup target add wasm32-unknown-unknown

    # Install the NEAR CLI to deploy and interact with the contract
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

    # Install cargo near to help building the contract
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
    ```

  </TabItem>

</Tabs>

We will be use [NEAR CLI](../../4.tools/cli.md) to interact with the blockchain through the terminal, and you can choose between JavaScript and Rust to write the contract.

---

## Overview

This series will touch on different level of the NEAR tech stack. Each section will be independent of the previous one, so feel free to jump into the section that interests you the most.

#### 1. Smart Contract
1. [The Auction Contract](./1-basic.md): We cover a simple auction smart contract                      
2. [Updating and Locking a Contract](./2-locking.md): Discover what it means to lock a contract                     
3. Giving an NFT to the Winner (soon) : Give the highest bidder an NFT to signal their win            
4. Integrating Fungible Tokens (soon) : Allow people to use fungible tokens to bid (e.g. stable coins)

#### 2. Frontend

1. Creating the frontend (soon): Lets learn how to connect a frontend with your smart contract
2. Easily query on-chain data (soon) : Use open APIs to keep track of the users and their bidding price

#### 3. Factory
1. Creating a factory (soon): Allow users to easily deploy and initialize their own auction contracts

---

## Next steps

Ready to start? Let's jump to the [The Auction Contract](./1-basic.md) and begin your learning journey!

---

:::note Versioning for this article

- near-cli: `0.12.0`
- rustc: `1.78.0`
- cargo: `1.80.1`
- cargo-near: `0.6.2`
- rustc: `1.78.0`
- node: `21.6.1`
        
:::