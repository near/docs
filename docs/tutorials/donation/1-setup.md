---
id: setup
title: Setting up the Donation Contract
sidebar_label: Contract Setup
description: Learn the Rudiments of Setting Up your Donation Smart Contract
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from '@site/src/components/codetabs';

The first step is setting up the basic structure of our donation contract. We'll define the contract state, initialization method, and basic beneficiary management.

## Contract State Structure

The donation contract needs to track two key pieces of data: who receives the donations (beneficiary) and how much each donor has contributed.

<Tabs>
  <TabItem value="rust" label="Rust" default>

```rust
use near_sdk::store::IterableMap;
use near_sdk::{near, AccountId, NearToken, PanicOnDefault};

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub beneficiary: AccountId,
    pub donations: IterableMap<AccountId, NearToken>,
}
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```ts
import { NearBindgen, near, call, view, initialize, UnorderedMap } from 'near-sdk-js'

@NearBindgen({ requireInit: true })
class DonationContract {
  beneficiary: string = "";
  donations = new UnorderedMap<bigint>('uid-1');

  static schema = {
    beneficiary: "string",
    donations: { class: UnorderedMap, value: "bigint" }
  }
}
```

  </TabItem>
</Tabs>

## Contract Initialization

Every NEAR contract needs an initialization method to set up the initial state. Our contract requires a beneficiary to be specified during deployment.

<Tabs>
  <TabItem value="rust" label="Rust">

```rust
#[near]
impl Contract {
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(beneficiary: AccountId) -> Self {
        Self {
            beneficiary,
            donations: IterableMap::new(b"d"),
        }
    }
}
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```ts
@initialize({ privateFunction: true })
init({ beneficiary }: { beneficiary: string }) {
  this.beneficiary = beneficiary
}
```

  </TabItem>
</Tabs>

:::tip
The `#[private]` decorator in Rust and `privateFunction: true` in TypeScript ensure only the contract account can call the initialization method.
:::

## Beneficiary Management

Add methods to view and update the beneficiary. The update method should be restricted to the contract owner for security.

<Tabs>
  <TabItem value="rust" label="Rust">

```rust
impl Contract {
    pub fn get_beneficiary(&self) -> &AccountId {
        &self.beneficiary
    }

    #[private] // only callable by the contract's account
    pub fn change_beneficiary(&mut self, new_beneficiary: AccountId) {
        self.beneficiary = new_beneficiary;
    }
}
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```ts
@view({})
get_beneficiary(): string { 
  return this.beneficiary 
}

@call({ privateFunction: true })
change_beneficiary(beneficiary: string) {
  this.beneficiary = beneficiary;
}
```

  </TabItem>
</Tabs>

## Building the Contract

Now let's build the contract to ensure our setup is correct.

<Tabs>
  <TabItem value="rust" label="Rust">

First, create your `Cargo.toml`:

<Github fname="Cargo.toml"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/Cargo.toml"
        start="1" end="15" />

Build the contract:
```bash
cargo near build
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

Create your `package.json`:

<Github fname="package.json"
        url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/package.json"
        start="1" end="12" />

Build the contract:
```bash
npm run build
```

  </TabItem>
</Tabs>

## Basic Unit Test

Let's add a simple test to verify our initialization works correctly.

<Tabs>
  <TabItem value="rust" label="Rust">

```rust
#[cfg(test)]
mod tests {
    use super::*;

    const BENEFICIARY: &str = "beneficiary.testnet";

    #[test]
    fn initializes() {
        let contract = Contract::init(BENEFICIARY.parse().unwrap());
        assert_eq!(contract.beneficiary, BENEFICIARY.parse::<AccountId>().unwrap());
    }
}
```

Run the test:
```bash
cargo test
```

  </TabItem>
  <TabItem value="ts" label="TypeScript">

```ts
// In your test file with NEAR Workspaces
import { Worker, NEAR } from 'near-workspaces';

test.beforeEach(async (t) => {
  const worker = t.context.worker = await Worker.init();
  const root = worker.rootAccount;

  const beneficiary = await root.createSubAccount("beneficiary");
  const contract = await root.createSubAccount("contract");

  await contract.deploy(process.argv[2]);
  await contract.call(contract, "init", { beneficiary: beneficiary.accountId });

  t.context.accounts = { contract, beneficiary };
});
```

  </TabItem>
</Tabs>

## Next Steps

With the basic contract structure in place, you're ready to implement the core donation functionality. The next chapter will cover how to handle token transfers using payable methods.

Continue to [Handle Donations](2-contract.md) to learn about accepting NEAR token payments.