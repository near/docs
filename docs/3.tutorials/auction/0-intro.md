---
id: introduction
title: NEAR Zero to Hero 
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this Zero to Hero series, you'll learn how to build a Web3 application from start to finish on NEAR.

We'll start by cloning a simple auction smart contract and slowly add features by introducing new concepts as we go. By the time you finish this tutorial, you will have learned how to use several key primitives and concepts along the way:

- Building a smart contract
- Testing a contract in a realistic environment 
- Deploying and locking a contract

<!-- - Making cross-contract calls
- Using Non-Fungible Tokens
- Using Fungible Tokens 
- Creating a frontend for a contract
- Setting up an indexer 
- Creating a factory contract  -->

For this tutorial, you have the option to follow along in JavaScript or Rust.  

---

## Prerequisites

Before starting, make sure to set up your development environment.

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

---

## Overview

These are the steps that will bring you from **Zero** to **Hero** in no time! 💪

| Step | Name                                   | Description                                                     |
|------|----------------------------------------|-----------------------------------------------------------------|
| 1    | [Basic contract](./1-basic.md)         | Learn the how a basic smart contract is structured          |
| 2    | [Locking the contract](./2-locking.md) | Learn to create contracts with no access keys                   |

<!-- | 3    | [Winning an NFT](./3-nft.md)           | Learn about sending NFTs using cross-contract calls             |
| 4    | [Bidding with FTs](./4-ft.md)          | Learn about sending and receiving FTs                           |
| 5    | [Create a Frontend](#)                 | Create a frontend to interact with your smart contract          |
| 6    | [Monitor the Bids](#)                  | Learn how to use an indexer to monitor your contract's activity |
| 7    | [Factory](#)                           | Create a contract that will create auctions                     | -->

---

## Next steps

Ready to start? Let's jump to the [Basic contract](./1-basic.md) and begin your learning journey!

If you would like to learn about a specific concept feel free to skip to the relevant section.

---

## Versioning 

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">

        Versioning for this tutorial
        At the time of this writing, this example works with the following versions:

        - near-cli-rs: `0.12.0`
        - near-sdk-js: `2.0.0`
        - near-workspaces-js: `3.5.0`
        - node: `21.6.1`
        

    </TabItem>
    <TabItem value="rust" label="🦀 Rust">

        Versioning for this tutorial
        At the time of this writing, this example works with the following versions:

        - near-cli-rs: `0.12.0`
        - near-sdk-rs: `5.1.0`
        - near-workspaces-rs: `0.10.0`
        - rustc: `1.78.0`
        - cargo-near: `0.6.2`
        

    </TabItem>
</Tabs>
