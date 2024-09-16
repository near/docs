---
id: introduction
title: A Step-by-Step Guide to Mastering NEAR
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome! In this guide we will help you navigate NEAR tech stack, so you can build Web3 applications from start to finish in no-time.

We'll start from a simple auction contract and slowly build on top of it a full Web3 application to carry on-chain auctions.

By the time you finish this tutorial, you will have learned how to use several key primitives and concepts along the way:

- Building and testing a contract
- Deploying, updating and locking a contract
- Creating a frontend to interact with the contract
- Using an indexing API to keep track of the contract's activity
- Creating a factory to deploy new contracts

<!-- - Making cross-contract calls
- Using Non-Fungible Tokens
- Using Fungible Tokens 
- Creating a frontend for a contract
- Setting up an indexer 
- Creating a factory contract -->

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

We will be using the tool [NEAR CLI](../../4.tools/cli.md) to interact with the blockchain through the terminal, and you can choose between JavaScript or Rust to write the contract.


---

## Overview

This series will touch on different level of the NEAR tech stack. Each section will be independent of the previous one, so feel free to jump into the section that interests you the most.

#### 1. Smart Contract
1. [The Auction Contract](./1-basic.md): We cover a simple auction smart contract                      
2. [Updating and Locking a Contract](./2-locking.md): Discover what it means to lock a contract                     
3. Giving an NFT to the Winner (soon) : Give the highest bidder an NFT to signal their win            
4. Integrating Fungible Tokens (soon) : Allow people to use fungible tokens to bid (e.g. stable coins)

#### 2. Frontend

1. Creating the frontend : Lets learn how to connect a frontend with your smart contract
2. Easily query on-chain data : Use open APIs to keep track of the users and their bidding price

#### 3. Factory
1. Creating a factory: Allow users to easily deploy and initialize their own auction contracts


---

## Next steps

Ready to start? Let's jump to the [The Auction Contract](./1-basic.md) and begin your learning journey!

:::note Versioning for this article

- near-cli: `0.12.0`
- near-sdk-js: `2.0.0`
- near-sdk-rs: `5.1.0`
- near-workspaces-js: `3.5.0`
- node: `21.6.1`
- near-workspaces-rs: `0.10.0`
- rustc: `1.78.0`
- cargo-near: `0.6.2`
        
:::