---
id: setup
title: Setting Up Your Development Environment
sidebar_label: Development Setup
description: "Set up your development environment for building randomness-powered NEAR smart contracts."
---

In this section, we'll set up everything you need to develop, test, and deploy your coin flip smart contract with secure randomness.

## Prerequisites

Before we begin, ensure you have:

- **Node.js** (version 18 or higher)
- **Rust** (latest stable version)
- **Git** for version control
- A **NEAR testnet account**

## Installing NEAR CLI

NEAR CLI is essential for contract deployment and interaction:

```bash
npm install -g near-cli
```

Verify the installation:

```bash
near --version
```

## Creating a NEAR Testnet Account

If you don't have a NEAR testnet account:

```bash
near account create-account fund-myself coinflip-tutorial.testnet --useFaucet
```

## Project Setup

Let's create our project structure. You can choose either Rust or JavaScript for your smart contract implementation.

### Option 1: Rust Project Setup

Create a new Rust project:

```bash
mkdir coin-flip-near
cd coin-flip-near
cargo init --name coin_flip_contract
```

Update your `Cargo.toml`:

<Github language="toml" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/Cargo.toml">

```toml
[package]
name = "coin_flip_contract"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
near-sdk = "5.0.0"

[profile.release]
codegen-units = 1
opt-level = "z"
lto = true
debug = false
panic = "abort"
overflow-checks = true
```

</Github>

### Option 2: JavaScript Project Setup

Create a new JavaScript project:

```bash
mkdir coin-flip-near
cd coin-flip-near
npm init -y
```

Install dependencies:

```bash
npm install near-sdk-js
npm install --save-dev @babel/core @babel/preset-env babel-jest jest
```

Create a basic `package.json`:

<Github language="json" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/package.json">

```json
{
  "name": "coin-flip-contract",
  "version": "1.0.0",
  "description": "A NEAR smart contract demonstrating secure randomness",
  "main": "index.js",
  "scripts": {
    "build": "near-sdk-js build src/contract.js build/contract.wasm",
    "test": "jest",
    "deploy": "near contract deploy coinflip.testnet use-file build/contract.wasm without-init-call network-config testnet sign-with-keychain send"
  },
  "dependencies": {
    "near-sdk-js": "^2.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "babel-jest": "^29.5.0",
    "jest": "^29.5.0",
    "near-workspaces": "^3.4.0"
  }
}
```

</Github>

## Project Structure

Create the following directory structure:

```
coin-flip-near/
├── src/                    # Smart contract source code
│   ├── lib.rs             # Rust main file
│   └── contract.js        # JavaScript main file
├── tests/                 # Integration tests
│   ├── test.rs           # Rust tests
│   └── test.js           # JavaScript tests
├── build/                 # Compiled contract artifacts
├── Cargo.toml            # Rust dependencies (Rust only)
├── package.json          # Node.js dependencies (JS only)
└── README.md
```

## Development Tools Setup

### For Rust Development

Install additional Rust tools:

```bash
# WASM target for compilation
rustup target add wasm32-unknown-unknown

# Cargo-near for optimized builds
cargo install cargo-near
```

### For JavaScript Development

Create a `.babelrc` file for Jest testing:

<Github language="json" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/js-contract/.babelrc">

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "18"
        }
      }
    ]
  ]
}
```

</Github>

## Environment Configuration

Create a `.env` file for environment variables:

```bash
# Network configuration
NEAR_ENV=testnet
CONTRACT_ACCOUNT_ID=coinflip.testnet

# Test configuration  
TEST_ACCOUNT_ID=test-account.testnet
```

## Testing Setup

We'll use NEAR Workspaces for integration testing. Install it:

### For Rust:

Add to your `Cargo.toml`:

```toml
[dev-dependencies]
near-workspaces = "0.10.0"
tokio = "1.0"
serde_json = "1.0"
```

### For JavaScript:

```bash
npm install --save-dev near-workspaces ava
```

## IDE Configuration

### VS Code Setup

Create `.vscode/settings.json` for optimal development experience:

<Github language="json" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/.vscode/settings.json">

```json
{
  "rust-analyzer.cargo.target": "wasm32-unknown-unknown",
  "rust-analyzer.check.command": "clippy",
  "editor.formatOnSave": true,
  "files.associations": {
    "*.rs": "rust"
  }
}
```

</Github>

Recommended VS Code extensions:
- **rust-analyzer**: Rust language support
- **NEAR Protocol**: NEAR-specific tooling
- **ES6 String HTML**: Better JavaScript template literal support

## Build Scripts

### Rust Build Script

Create `build.sh`:

<Github language="bash" url="https://github.com/near-examples/coin-flip-randomness-tutorial/blob/main/rust-contract/build.sh">

```bash
#!/bin/bash
set -e

# Build the contract
cargo near build

# Copy the built contract to the correct location
cp target/wasm32-unknown-unknown/release/coin_flip_contract.wasm ./contract.wasm

echo "Contract built successfully!"
```

</Github>

### JavaScript Build Script  

The build is handled by the `near-sdk-js build` command in your package.json.

## Verification

Let's verify everything is set up correctly:

### Test Rust Setup:

```bash
# Compile the contract (will create a minimal hello world)
cargo check
cargo near build
```

### Test JavaScript Setup:

```bash
# Install dependencies and test build
npm install
npm run build
```

### Test NEAR CLI:

```bash
near account view-account-summary coinflip-tutorial.testnet network-config testnet
```

You should see your account details if everything is configured correctly.

## Next Steps

With your environment set up, you're ready to start building the smart contract! In the next section, we'll create the basic structure of our coin flip contract and implement the core game logic.

:::tip Development Tips
- Use `cargo check` frequently during Rust development for faster compilation
- Enable format-on-save in your IDE to maintain consistent code style
- Keep your NEAR CLI updated: `npm update -g near-cli`
:::

:::info Troubleshooting
If you encounter issues:
- Ensure Node.js version is 18+
- Check that Rust is properly installed with `rustc --version`
- Verify NEAR CLI can connect: `near validators current`
:::