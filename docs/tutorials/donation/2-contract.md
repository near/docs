---
id: contract
title: Building the Core Donation Contract
sidebar_label: Core Contract
description: "Learn how to create the fundamental structure of a donation smart contract that can receive and handle NEAR tokens."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from '@site/src/components/codetabs';

Now that our development environment is ready, let's build the core donation smart contract. This contract will handle NEAR token transfers, track donations, and manage beneficiaries.

## Contract Structure Overview

Our donation contract needs to:

1. **Accept donations** through payable functions
2. **Store donation records** for transparency
3. **Forward tokens** to the beneficiary immediately
4. **Track donation statistics** like total amount and donor count

## Basic Contract Setup

Let's start by creating the fundamental contract structure.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

First, update `src/lib.rs`:

```rust
use near_sdk::{
    env, near_bindgen, require, AccountId, Balance, BorshDeserialize, 
    BorshSerialize, PanicOnDefault, Promise
};
use std::collections::HashMap;

mod donation;
pub use donation::*;

#[near_bindgen]
impl DonationContract {
    #[init]
    pub fn new(beneficiary: AccountId) -> Self {
        require!(!env::state_exists(), "Already initialized");
        Self {
            beneficiary,
            donations: HashMap::new(),
            total_donations: 0,
        }
    }
}
```

Now create `src/donation.rs`:

```rust
use near_sdk::{
    env, near_bindgen, require, AccountId, Balance, BorshDeserialize, 
    BorshSerialize, PanicOnDefault, Promise, json_types::U128
};
use std::collections::HashMap;

/// Represents a single donation record
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Donation {
    pub account_id: AccountId,
    pub total_amount: Balance,
    pub timestamp: u64,
}

/// The main donation contract
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct DonationContract {
    /// Account that receives the donations
    pub beneficiary: AccountId,
    /// Map of donor account to their donation info
    pub donations: HashMap<AccountId, Donation>,
    /// Total amount donated to this contract
    pub total_donations: Balance,
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Create `contract-ts/src/contract.ts`:

```typescript
import { NearBindgen, near, call, view, initialize, LookupMap } from 'near-sdk-js';
import { Donation } from './model';

@NearBindgen({})
class DonationContract {
  beneficiary: string = '';
  donations: LookupMap<Donation> = new LookupMap('d');
  totalDonations: string = '0';

  @initialize({})
  init({ beneficiary }: { beneficiary: string }): void {
    this.beneficiary = beneficiary;
    this.totalDonations = '0';
  }
}
```

And create `contract-ts/src/model.ts`:

```typescript
export class Donation {
  account_id: string;
  total_amount: string;
  timestamp: string;

  constructor(account_id: string, total_amount: string, timestamp: string) {
    this.account_id = account_id;
    this.total_amount = total_amount;
    this.timestamp = timestamp;
  }
}
```

  </TabItem>
</Tabs>

## Implementing the Donation Function

The core functionality is the `donate` method that accepts NEAR tokens and forwards them to the beneficiary.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Add this method to `src/donation.rs`:

```rust
#[near_bindgen]
impl DonationContract {
    /// Accepts a donation and forwards it to the beneficiary
    #[payable]
    pub fn donate(&mut self) {
        let donor: AccountId = env::predecessor_account_id();
        let donation_amount: Balance = env::attached_deposit();
        
        // Ensure a donation was actually sent
        require!(donation_amount > 0, "Donation amount must be greater than 0");
        
        // Update donation records
        self.total_donations += donation_amount;
        
        match self.donations.get(&donor) {
            Some(mut existing_donation) => {
                existing_donation.total_amount += donation_amount;
                existing_donation.timestamp = env::block_timestamp();
                self.donations.insert(donor.clone(), existing_donation);
            }
            None => {
                let new_donation = Donation {
                    account_id: donor.clone(),
                    total_amount: donation_amount,
                    timestamp: env::block_timestamp(),
                };
                self.donations.insert(donor.clone(), new_donation);
            }
        }
        
        // Transfer the donation to the beneficiary
        Promise::new(self.beneficiary.clone()).transfer(donation_amount);
        
        // Log the donation event
        env::log_str(&format!(
            "Thank you @{} for donating {}! Total raised: {}",
            donor,
            donation_amount,
            self.total_donations
        ));
    }
    
    /// Get the current beneficiary
    pub fn get_beneficiary(&self) -> AccountId {
        self.beneficiary.clone()
    }
    
    /// Get total donations received
    pub fn get_total_donations(&self) -> U128 {
        U128(self.total_donations)
    }
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Add this method to `contract-ts/src/contract.ts`:

```typescript
import { NearBindgen, near, call, view, initialize, LookupMap, assert } from 'near-sdk-js';
import { Donation } from './model';

@NearBindgen({})
export class DonationContract {
  beneficiary: string = '';
  donations: LookupMap<Donation> = new LookupMap('d');
  totalDonations: string = '0';

  @initialize({})
  init({ beneficiary }: { beneficiary: string }): void {
    this.beneficiary = beneficiary;
    this.totalDonations = '0';
  }

  @call({ payableFunction: true })
  donate(): void {
    const donor = near.predecessorAccountId();
    const donationAmount = near.attachedDeposit();
    
    assert(donationAmount > BigInt(0), 'Donation amount must be greater than 0');
    
    // Update total donations
    this.totalDonations = (BigInt(this.totalDonations) + donationAmount).toString();
    
    // Update donation records
    const existingDonation = this.donations.get(donor);
    if (existingDonation) {
      existingDonation.total_amount = (BigInt(existingDonation.total_amount) + donationAmount).toString();
      existingDonation.timestamp = near.blockTimestamp().toString();
      this.donations.set(donor, existingDonation);
    } else {
      const newDonation = new Donation(
        donor,
        donationAmount.toString(),
        near.blockTimestamp().toString()
      );
      this.donations.set(donor, newDonation);
    }
    
    // Transfer to beneficiary
    const promise = near.promiseBatchCreate(this.beneficiary);
    near.promiseBatchActionTransfer(promise, donationAmount);
    
    near.log(`Thank you @${donor} for donating ${donationAmount}! Total raised: ${this.totalDonations}`);
  }

  @view({})
  get_beneficiary(): string {
    return this.beneficiary;
  }

  @view({})
  get_total_donations(): string {
    return this.totalDonations;
  }
}
```

  </TabItem>
</Tabs>

## Key Concepts Explained

### Payable Functions

The `#[payable]` decorator (Rust) or `payableFunction: true` (JS) allows the function to receive NEAR tokens. Without this, the function would panic if tokens are attached.

### Token Transfer

- **Rust**: `Promise::new(account).transfer(amount)` creates a promise to transfer tokens
- **JavaScript**: `near.promiseBatchCreate()` and `near.promiseBatchActionTransfer()` achieve the same

### Storage Considerations

We use efficient storage patterns:
- **HashMap** (Rust) stores donation records in contract state
- **LookupMap** (JavaScript) provides similar functionality with optimized storage access

### Error Handling

Both implementations include proper error handling:
- Checking for zero donations
- Validating attached deposits
- Ensuring proper initialization

## Building the Contract

Let's test our contract compiles correctly:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```bash
# Build the contract
cargo build --target wasm32-unknown-unknown --release

# Check for any compilation errors
cargo check
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-ts

# Install dependencies if not already done
npm install

# Build the contract
npm run build
```

Add this build script to your `package.json`:

```json
{
  "scripts": {
    "build": "near-sdk-js build src/contract.ts build/contract.wasm"
  }
}
```

  </TabItem>
</Tabs>

If the build succeeds, you're ready to move on to implementing donation tracking and query methods.

:::tip Gas Considerations
Token transfers consume gas. Always ensure your contract functions have sufficient gas allowance, especially when making cross-contract calls or promises.
:::

:::info Next Steps
Our basic donation contract can now accept and forward tokens! In the next section, we'll add comprehensive donation tracking and query capabilities to make the contract more useful and transparent.
:::

## Testing the Core Functionality

Before moving forward, let's create a simple test to verify our donation function works:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Create `src/tests.rs`:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::testing_env;
    use near_sdk::test_utils::{accounts, VMContextBuilder};

    #[test]
    fn test_donation() {
        let mut context = VMContextBuilder::new();
        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1_000_000_000_000_000_000_000_000) // 1 NEAR
            .build());

        let mut contract = DonationContract::new(accounts(1));
        contract.donate();

        assert_eq!(contract.get_total_donations().0, 1_000_000_000_000_000_000_000_000);
    }
}
```

Run the test with `cargo test`.

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

We'll cover comprehensive testing in the deployment section, including sandbox tests that simulate the full blockchain environment.

  </TabItem>
</Tabs>

Your donation contract core is now ready! The next step is implementing comprehensive tracking and query methods.