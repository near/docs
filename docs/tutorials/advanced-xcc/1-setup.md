---
id: setup
title: Setting up the Advanced Cross-Contract Calls Project
sidebar_label: Project Setup
description: "Get the advanced cross-contract calls example project running locally with all necessary dependencies and test contracts."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Let's set up the project environment with the main contract and test contracts.

## Obtaining the Project

```bash
git clone https://github.com/near-examples/cross-contract-calls
cd cross-contract-calls
```

Choose your language:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
cd contract-advanced-ts
npm install
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
cd contract-advanced-rs
cargo check
```

  </TabItem>
</Tabs>

## Project Structure

```
├── tests/                    # Test environment
│   └── external-contracts/   # Pre-compiled contracts
│       ├── counter.wasm      # Simple counter
│       ├── guest-book.wasm   # Message storage
│       └── hello-near.wasm   # Greeting contract
├── src/                      # Main contract code
│   ├── batch_actions.*       # Batch operations
│   ├── multiple_contracts.*  # Parallel execution
│   └── similar_contracts.*   # Same-type calls
└── README.md
```

## Test Contracts Overview

### Hello NEAR Contract
- `get_greeting()` - Returns current greeting
- `set_greeting(message: string)` - Updates greeting

### Counter Contract  
- `get_num()` - Returns current count
- `increment()` - Increases by 1
- `decrement()` - Decreases by 1

### Guest Book Contract
- `add_message(text: string)` - Adds message
- `get_messages()` - Returns all messages

## Building the Contract

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
npm run build
# Output: build/cross_contract.wasm
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
cargo near build
# Output: target/wasm32-unknown-unknown/release/cross_contract.wasm
```

  </TabItem>
</Tabs>

## Running Tests

Verify everything works:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
npm test
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
cargo test
```

  </TabItem>
</Tabs>

Expected output:
```
✓ Test batch actions
✓ Test multiple contracts  
✓ Test similar contracts
```

## Contract Initialization

The main contract needs external contract addresses:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```typescript
@NearBindgen({})
export class CrossContractCall {
  hello_account: AccountId;
  counter_account: AccountId;
  guestbook_account: AccountId;

  @initialize({})
  init({
    hello_account,
    counter_account,
    guestbook_account,
  }: {
    hello_account: AccountId;
    counter_account: AccountId;
    guestbook_account: AccountId;
  }) {
    this.hello_account = hello_account;
    this.counter_account = counter_account;
    this.guestbook_account = guestbook_account;
  }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
#[near_bindgen]
impl Contract {
    #[init]
    pub fn init(
        hello_account: AccountId,
        counter_account: AccountId,
        guestbook_account: AccountId,
    ) -> Self {
        Self {
            hello_account,
            counter_account,
            guestbook_account,
        }
    }
}
```

  </TabItem>
</Tabs>

## Deploy Your Contract

```bash
# Create your account
near account create-account sponsor-by-faucet-service xcc.YOUR_NAME.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

# Deploy with initialization
near contract deploy xcc.YOUR_NAME.testnet use-file ./build/cross_contract.wasm with-init-call init json-args '{
  "hello_account":"hello.near-examples.testnet",
  "counter_account":"counter.near-examples.testnet",
  "guestbook_account":"guestbook.near-examples.testnet"
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

Now let's explore [batch actions](2-batch-actions.md) in the next chapter!