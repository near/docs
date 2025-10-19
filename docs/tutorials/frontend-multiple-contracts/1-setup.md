---
id: setup
title: Project Setup and Wallet Integration
sidebar_label: Project Setup
---

import {Github} from "@site/src/components/codetabs"

In this section, we'll set up the project structure and implement wallet integration using NEAR Wallet Selector.

## Clone and Install

Start by cloning the repository and installing dependencies:

```bash
git clone https://github.com/near-examples/frontend-multiple-contracts
cd frontend-multiple-contracts
npm install
```

## Project Structure

The project has a simple structure:

```
frontend-multiple-contracts/
├── frontend/
│   ├── index.html
│   ├── index.js
│   └── wallet.js
└── package.json
```

## Wallet Setup

The `Wallet` class handles authentication and blockchain interactions. Let's examine the key components:

### Initialize Wallet Selector

<Github fname="wallet.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/wallet.js"
    start="26" end="31" />

The wallet selector supports multiple wallet providers (MyNearWallet, HereWallet) and manages the connection state.

### Starting Up the Wallet

<Github fname="wallet.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/wallet.js"
    start="38" end="55" />

The `startUp` method:
- Initializes the wallet selector with testnet configuration
- Checks if a user is already signed in
- Sets up an observable to track account changes
- Executes a callback function when authentication state changes

### Sign In and Sign Out

<Github fname="wallet.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/wallet.js"
    start="60" end="71" />

These methods display the wallet modal for authentication and handle logout.

## Main Application Setup

Configure your main application to use the wallet:

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="4" end="10" />

Define the contract addresses you'll interact with and initialize the wallet instance.

### Page Load Handler

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="13" end="21" />

On page load:
1. Start the wallet and handle authentication state
2. Load data from both contracts

## HTML Interface

Set up the basic HTML structure:

<Github fname="index.html"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.html"
    start="23" end="34" />

The interface displays greetings from Hello NEAR and messages from the Guest Book side by side.

## Running the Application

Start the development server:

```bash
npm start
```

The application opens at `http://localhost:1234`. You can now view data from both contracts, but you'll need to sign in to send transactions.

Next, we'll implement querying data from multiple contracts simultaneously.