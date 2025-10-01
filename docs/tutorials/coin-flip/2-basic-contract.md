---
id: basic-contract
title: Building a Coin Flip Contract
sidebar_label: Building the Contract
description: Learn how to build the Coin Flip Contract
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Let's build a coin flip game where players guess "heads" or "tails" and earn points for correct guesses.

## Obtaining the Project

You have two options to start with the Coin Flip tutorial:

| GitHub Codespaces | Clone Locally |
|------------------|---------------|
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/coin-flip-examples?quickstart=1) | 🌐 `https://github.com/near-examples/coin-flip-examples` |

<Tabs>
  <TabItem value="codespaces" label="GitHub Codespaces" default>
  
Click the "Open in GitHub Codespaces" button above to get a fully configured development environment in your browser.

  </TabItem>
  <TabItem value="local" label="Local Setup">

```bash
# Clone the repository
git clone https://github.com/near-examples/coin-flip-examples
cd coin-flip-examples

# Choose your preferred language
cd contract-ts  # for TypeScript
# or
cd contract-rs  # for Rust
```

  </TabItem>
</Tabs>

## Contract Structure

Our contract needs:
- A method to flip the coin using randomness
- Storage for player points
- View methods to check scores

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="1" end="21" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="1" end="37" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

  </TabItem>
</Tabs>

## Implementing the Coin Flip

The core logic generates a random outcome and compares it with the player's guess:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="23" end="47" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="44" end="67" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

  </TabItem>
</Tabs>

## Key Implementation Details

### 1. Random Seed Usage
We use only the first byte of the 32-byte seed for simplicity:
```javascript
randomSeed[0] % 2 === 0 ? 'heads' : 'tails'
```

### 2. State Management
Points are stored in an `UnorderedMap` for efficient access:
- JavaScript: `UnorderedMap<number>`
- Rust: `UnorderedMap<AccountId, u8>`

### 3. Input Validation
Always validate user input:
```javascript
if (!['heads', 'tails'].includes(player_guess)) {
  throw new Error('Invalid guess');
}
```

## View Methods

Add methods to check player scores:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github language="javascript" start="49" end="55" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github language="rust" start="69" end="75" url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs" />

  </TabItem>
</Tabs>

## Building the Contract

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
# Install dependencies
npm install

# Build the contract
npm run build

# The compiled contract will be in build/coin_flip.wasm
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
# Build the contract
cargo near build

# The compiled contract will be in target/wasm32-unknown-unknown/release/
```

  </TabItem>
</Tabs>

Now that we have a working contract, let's test it to ensure the [randomness](3-testing-randomness.md) behaves correctly.