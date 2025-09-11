---
id: setup
title: Setting up Your Development Environment
sidebar_label: Development Setup
description: "Learn how to set up your development environment for building NEAR smart contracts with token handling capabilities."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before building our donation smart contract, we need to set up a proper development environment. This includes installing the necessary tools, creating accounts, and initializing our project structure.

## Prerequisites

Ensure you have the following tools installed on your system:

- **Node.js** (v18 or later) and **npm** or **yarn**
- **Rust** (latest stable version) with `wasm32-unknown-unknown` target
- **NEAR CLI** for account management and deployment

<Tabs groupId="os">
  <TabItem value="macos" label="macOS">

```bash
# Install Node.js via Homebrew
brew install node

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Install NEAR CLI
npm install -g near-cli
```

  </TabItem>
  <TabItem value="linux" label="Linux">

```bash
# Install Node.js via package manager
sudo apt update
sudo apt install nodejs npm

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Install NEAR CLI
npm install -g near-cli
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```bash
# Install Node.js from https://nodejs.org
# Download and install Rust from https://rustup.rs
rustup target add wasm32-unknown-unknown

# Install NEAR CLI
npm install -g near-cli
```

  </TabItem>
</Tabs>

## Creating NEAR Accounts

For this tutorial, we'll need two accounts: one for development/deployment and one to act as the donation beneficiary.

### Create Developer Account

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Near CLI (Short)">

```bash
# Create a new developer account with testnet funding
near create-account donation-dev.testnet --useFaucet
```

  </TabItem>
  <TabItem value="full" label="Near CLI (Full)">

```bash
# Create a new account pre-funded by faucet service
near account create-account sponsor-by-faucet-service donation-dev.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
```

  </TabItem>
</Tabs>

### Create Beneficiary Account

```bash
# Create an account that will receive donations
near create-account donation-beneficiary.testnet --useFaucet
```

:::tip
Write down your account names as we'll use them throughout the tutorial. Replace `donation-dev.testnet` and `donation-beneficiary.testnet` with your actual account names.
:::

## Project Initialization

Now let's create our project structure. We'll build both Rust and JavaScript versions of the contract.

### Initialize Rust Contract

```bash
# Create project directory
mkdir near-donation-tutorial
cd near-donation-tutorial

# Initialize Rust contract
cargo init --name donation-contract
```

Add the following to your `Cargo.toml`:

```toml
[package]
name = "donation-contract"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
near-sdk = "5.0"
serde_json = "1.0"

[profile.release]
codegen-units = 1
opt-level = "z"
lto = true
debug = false
panic = "abort"
overflow-checks = true
```

### Initialize TypeScript Contract (Alternative)

If you prefer TypeScript, create a separate directory:

```bash
# In the same project root
mkdir contract-ts
cd contract-ts
npm init -y

# Install NEAR SDK for JavaScript
npm install near-sdk-js
npm install -D typescript @types/node
```

## Project Structure

Your project should now look like this:

```bash
near-donation-tutorial/
├── src/                    # Rust contract source
│   ├── lib.rs
│   └── donation.rs
├── contract-ts/           # TypeScript contract (optional)
│   ├── src/
│   └── package.json
├── tests/                 # Integration tests
├── frontend/              # Web interface (we'll add this later)
├── Cargo.toml
└── README.md
```

## Environment Configuration

Set up your environment variables for easier development:

```bash
# Create .env file
echo "CONTRACT_NAME=donation-dev.testnet" >> .env
echo "BENEFICIARY=donation-beneficiary.testnet" >> .env
echo "NETWORK=testnet" >> .env
```

## Verification

Let's verify everything is set up correctly:

```bash
# Check Rust installation
rustc --version
cargo --version

# Check NEAR CLI
near --version

# Check Node.js (for frontend later)
node --version
npm --version

# Test account access
near state donation-dev.testnet --networkId testnet
```

You should see account information including balance and storage usage.

:::info Next Steps
With your development environment ready, we can now start building the donation smart contract. In the next section, we'll implement the core contract structure and token handling logic.
:::

## Troubleshooting

### Common Issues

**Rust target not found**: Run `rustup target add wasm32-unknown-unknown`

**NEAR CLI authentication**: Run `near login` and follow the browser authentication process

**Account creation fails**: Ensure you have sufficient funds or use the faucet option

**Permission errors**: On Unix systems, you might need to use `sudo` for global npm installs