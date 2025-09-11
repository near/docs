---
id: setup
title: Setting up the Advanced Cross-Contract Calls Project
sidebar_label: Project Setup
description: "Get the advanced cross-contract calls example project running locally with all necessary dependencies and test contracts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Before we dive into building advanced cross-contract calls, let's set up the complete project environment. This includes the main contract, external test contracts, and all necessary tooling.

## Obtaining the Project

You have two options to start with the Advanced Cross-Contract Calls example:

| GitHub Codespaces | Clone Locally |
|------------------|---------------|
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

<Tabs>
  <TabItem value="codespaces" label="GitHub Codespaces" default>
  
Click the "Open in GitHub Codespaces" button above to get a fully configured development environment in your browser.

  </TabItem>
  <TabItem value="local" label="Local Setup">

```bash
# Clone the repository
git clone https://github.com/near-examples/cross-contract-calls
cd cross-contract-calls

# Choose your preferred language
cd contract-advanced-ts  # for TypeScript
# or
cd contract-advanced-rs  # for Rust
```

  </TabItem>
</Tabs>

## Project Structure

The project includes everything you need to build and test advanced cross-contract calls:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```bash
contract-advanced-ts/
┌── sandbox-ts/                    # Sandbox testing environment
│   ├── external-contracts/        # Pre-compiled test contracts
│   │   ├── counter.wasm           # Simple counter contract
│   │   ├── guest-book.wasm        # Guest book contract  
│   │   └── hello-near.wasm        # Hello world contract
│   └── main.ava.ts               # Integration tests
├── src/                          # Main contract code
│   ├── internal/                 # Internal modules
│   │   ├── batch_actions.ts      # Batch operations logic
│   │   ├── constants.ts          # Contract constants
│   │   ├── multiple_contracts.ts # Parallel execution logic
│   │   ├── similar_contracts.ts  # Same-type contract calls
│   │   └── utils.ts              # Utility functions
│   └── contract.ts               # Main contract entry point
├── package.json                  # Dependencies and scripts
├── README.md
└── tsconfig.json                # TypeScript configuration
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```bash
contract-advanced-rs/
┌── tests/                        # Sandbox testing environment  
│   ├── external-contracts/       # Pre-compiled test contracts
│   │   ├── counter.wasm          # Simple counter contract
│   │   ├── guest-book.wasm       # Guest book contract
│   │   └── hello-near.wasm       # Hello world contract
│   └── test_basics.rs           # Integration tests
├── src/                         # Main contract code
│   ├── batch_actions.rs         # Batch operations logic
│   ├── lib.rs                   # Main contract entry point
│   ├── multiple_contracts.rs    # Parallel execution logic
│   └── similar_contracts.rs     # Same-type contract calls
├── Cargo.toml                   # Dependencies and metadata
├── README.md
└── rust-toolchain.toml          # Rust toolchain configuration
```

  </TabItem>
</Tabs>

## Installing Dependencies

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```bash
# Navigate to the TypeScript contract directory
cd contract-advanced-ts

# Install dependencies
npm install
# or
yarn install
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```bash
# Navigate to the Rust contract directory  
cd contract-advanced-rs

# Rust dependencies are managed automatically by Cargo
# Verify your setup
cargo check
```

  </TabItem>
</Tabs>

## Understanding the Test Contracts

The project includes three pre-compiled contracts that we'll interact with:

### 1. Hello NEAR Contract
A simple contract that returns greeting messages.

**Key Methods:**
- `get_greeting()` - Returns the current greeting
- `set_greeting(message: string)` - Updates the greeting

### 2. Guest Book Contract  
A contract for storing visitor messages.

**Key Methods:**
- `add_message(text: string)` - Adds a new message
- `get_messages()` - Returns all messages

### 3. Counter Contract
A simple counter with increment/decrement functionality.

**Key Methods:**
- `get_num()` - Returns current count
- `increment()` - Increases count by 1
- `decrement()` - Decreases count by 1

## Building the Main Contract

Let's build and test the main contract to ensure everything is working:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```bash
# Build the contract
npm run build

# Run tests to verify everything works
npm test
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```bash
# Build the contract
cargo build --target wasm32-unknown-unknown --release

# Run tests to verify everything works  
cargo test
```

  </TabItem>
</Tabs>

If the tests pass, you're ready to proceed! The output should look something like:

```bash
✓ Test batch actions with sequential execution
✓ Test multiple contracts with parallel execution  
✓ Test similar contracts with response handling
✓ Integration tests passed
```

## Deploying Test Contracts (Optional)

For this tutorial, we'll primarily use the sandbox environment, but if you want to deploy the test contracts to testnet:

<Tabs>
  <TabItem value="short" label="Quick Commands">

```bash
# Create accounts for test contracts
near create-account hello-test.testnet --useFaucet
near create-account guestbook-test.testnet --useFaucet  
near create-account counter-test.testnet --useFaucet

# Deploy the contracts
near deploy hello-test.testnet ./sandbox-ts/external-contracts/hello-near.wasm
near deploy guestbook-test.testnet ./sandbox-ts/external-contracts/guest-book.wasm
near deploy counter-test.testnet ./sandbox-ts/external-contracts/counter.wasm
```

  </TabItem>
  <TabItem value="full" label="Full CLI Commands">

```bash
# Create test contract accounts
near account create-account sponsor-by-faucet-service hello-test.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
near account create-account sponsor-by-faucet-service guestbook-test.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
near account create-account sponsor-by-faucet-service counter-test.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

# Deploy contracts  
near contract deploy hello-test.testnet use-file ./sandbox-ts/external-contracts/hello-near.wasm with-init-call new json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
near contract deploy guestbook-test.testnet use-file ./sandbox-ts/external-contracts/guest-book.wasm with-init-call new json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
near contract deploy counter-test.testnet use-file ./sandbox-ts/external-contracts/counter.wasm with-init-call new json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

  </TabItem>
</Tabs>

## Project Configuration

The main contract needs to know which external contracts to interact with. This is configured during initialization:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// Example initialization in contract.ts
@NearBindgen({})
export class CrossContractCalls {
  hello_account: AccountId;
  guestbook_account: AccountId; 
  counter_account: AccountId;

  @initialize({})
  new({
    hello_account,
    guestbook_account,
    counter_account,
  }: {
    hello_account: AccountId;
    guestbook_account: AccountId;
    counter_account: AccountId;
  }) {
    this.hello_account = hello_account;
    this.guestbook_account = guestbook_account;
    this.counter_account = counter_account;
  }
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
// Example initialization in lib.rs
#[near_bindgen]
impl CrossContractCalls {
    #[init]
    pub fn new(
        hello_account: AccountId,
        guestbook_account: AccountId,
        counter_account: AccountId,
    ) -> Self {
        Self {
            hello_account,
            guestbook_account, 
            counter_account,
        }
    }
}
```

  </TabItem>
</Tabs>

## Next Steps

With your development environment set up and working, you're ready to dive into the core concepts:

1. **[Batch Actions](2-batch-actions.md)** - Learn to execute multiple actions atomically
2. **[Parallel Execution](3-parallel-execution.md)** - Execute multiple contracts simultaneously
3. **[Response Handling](4-response-handling.md)** - Handle complex response patterns

:::tip Troubleshooting

If you encounter issues during setup:

- Ensure you have the latest version of NEAR CLI
- For Rust: Make sure you have the `wasm32-unknown-unknown` target installed: `rustup target add wasm32-unknown-unknown`
- For TypeScript: Ensure Node.js version 18 or higher
- Check that all test contracts are present in the `external-contracts` directory

:::

Let's move on to [implementing batch actions](2-batch-actions.md)!