---
id: tracking
title: Implementing Donation Tracking and History
sidebar_label: Donation Tracking
description: "Learn how to implement comprehensive donation tracking, pagination, and efficient storage management in your NEAR smart contract."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from '@site/src/components/codetabs';

Now that our contract can accept donations, let's implement comprehensive tracking features that make the donation process transparent and user-friendly. We'll add pagination, donor statistics, and efficient data retrieval methods.

## Enhanced Data Structures

First, let's improve our data structures to support better tracking and querying.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Update `src/donation.rs` with enhanced structures:

```rust
use near_sdk::{
    env, near_bindgen, require, AccountId, Balance, BorshDeserialize, 
    BorshSerialize, PanicOnDefault, Promise, json_types::U128, serde::{Deserialize, Serialize}
};
use std::collections::{HashMap, VecDeque};

/// Represents a single donation record with detailed information
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Donation {
    pub account_id: AccountId,
    pub total_amount: Balance,
    pub timestamp: u64,
    pub donation_count: u32,
}

/// A single donation event for history tracking
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct DonationEvent {
    pub donor: AccountId,
    pub amount: Balance,
    pub timestamp: u64,
    pub message: Option<String>,
}

/// Statistics about donations
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct DonationStats {
    pub total_donations: U128,
    pub total_donors: u32,
    pub largest_donation: U128,
    pub latest_donation: Option<DonationEvent>,
}

/// Enhanced donation contract with comprehensive tracking
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct DonationContract {
    pub beneficiary: AccountId,
    pub donations: HashMap<AccountId, Donation>,
    pub donation_history: VecDeque<DonationEvent>,
    pub total_donations: Balance,
    pub largest_donation: Balance,
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Update `contract-ts/src/model.ts`:

```typescript
export class Donation {
  account_id: string;
  total_amount: string;
  timestamp: string;
  donation_count: number;

  constructor(account_id: string, total_amount: string, timestamp: string, donation_count: number = 1) {
    this.account_id = account_id;
    this.total_amount = total_amount;
    this.timestamp = timestamp;
    this.donation_count = donation_count;
  }
}

export class DonationEvent {
  donor: string;
  amount: string;
  timestamp: string;
  message?: string;

  constructor(donor: string, amount: string, timestamp: string, message?: string) {
    this.donor = donor;
    this.amount = amount;
    this.timestamp = timestamp;
    this.message = message;
  }
}

export class DonationStats {
  total_donations: string;
  total_donors: number;
  largest_donation: string;
  latest_donation?: DonationEvent;

  constructor(
    total_donations: string,
    total_donors: number,
    largest_donation: string,
    latest_donation?: DonationEvent
  ) {
    this.total_donations = total_donations;
    this.total_donors = total_donors;
    this.largest_donation = largest_donation;
    this.latest_donation = latest_donation;
  }
}
```

Update `contract-ts/src/contract.ts`:

```typescript
import { NearBindgen, near, call, view, initialize, LookupMap, Vector, assert } from 'near-sdk-js';
import { Donation, DonationEvent, DonationStats } from './model';

@NearBindgen({})
export class DonationContract {
  beneficiary: string = '';
  donations: LookupMap<Donation> = new LookupMap('d');
  donationHistory: Vector<DonationEvent> = new Vector('h');
  totalDonations: string = '0';
  largestDonation: string = '0';

  @initialize({})
  init({ beneficiary }: { beneficiary: string }): void {
    this.beneficiary = beneficiary;
    this.totalDonations = '0';
    this.largestDonation = '0';
  }
}
```

## Storage Management

Efficient storage management is crucial for keeping your contract economical and performant. Here are key strategies we've implemented:

### History Limits

```rust
// Keep only last 100 donations in history to manage storage
if self.donation_history.len() > 100 {
    self.donation_history.pop_front();
}
```

### Pagination

We implement pagination to avoid gas limit issues when returning large datasets:

```rust
pub fn get_donations(&self, from_index: Option<u32>, limit: Option<u32>) -> Vec<DonationEvent> {
    let limit = limit.unwrap_or(10).min(50) as usize; // Cap at 50
    // ... pagination logic
}
```

### Gas Optimization

- **View methods** don't consume gas for the caller
- **Query limits** prevent excessive gas consumption
- **Efficient data structures** reduce storage costs

## Advanced Features

### Donation Messages

Users can now include optional messages with their donations:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```rust
// Call with message
near call $CONTRACT_ID donate '{"message": "Keep up the great work!"}' --deposit 1 --accountId $YOUR_ACCOUNT
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```bash
# Call with message
near call $CONTRACT_ID donate '{"message": "Keep up the great work!"}' --deposit 1 --accountId $YOUR_ACCOUNT
```

  </TabItem>
</Tabs>

### Top Donor Rankings

The contract now tracks and can return top donors:

```rust
// Get top 5 donors
let top_donors = contract.get_top_donors(Some(5));
```

### Real-time Statistics

Get comprehensive donation statistics:

```rust
let stats = contract.get_donation_stats();
println!("Total raised: {} NEAR", stats.total_donations.0 as f64 / 1e24);
println!("Number of donors: {}", stats.total_donors);
```

## Testing Enhanced Features

Let's create tests for our new tracking features:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Add to `src/tests.rs`:

```rust
#[test]
fn test_donation_tracking() {
    let mut context = VMContextBuilder::new();
    testing_env!(context
        .predecessor_account_id(accounts(0))
        .attached_deposit(1_000_000_000_000_000_000_000_000) // 1 NEAR
        .build());

    let mut contract = DonationContract::new(accounts(1));
    
    // First donation
    contract.donate(Some("First donation!".to_string()));
    
    // Second donation from same user
    testing_env!(context
        .attached_deposit(2_000_000_000_000_000_000_000_000) // 2 NEAR
        .build());
    contract.donate(None);
    
    // Check stats
    let stats = contract.get_donation_stats();
    assert_eq!(stats.total_donations.0, 3_000_000_000_000_000_000_000_000);
    assert_eq!(stats.total_donors, 1);
    assert_eq!(stats.largest_donation.0, 2_000_000_000_000_000_000_000_000);
    
    // Check donation history
    let history = contract.get_donations(None, None);
    assert_eq!(history.len(), 2);
    assert_eq!(history[0].amount, 2_000_000_000_000_000_000_000_000); // Most recent first
}

#[test]
fn test_pagination() {
    let mut context = VMContextBuilder::new();
    let mut contract = DonationContract::new(accounts(1));
    
    // Make multiple donations
    for i in 0..15 {
        testing_env!(context
            .predecessor_account_id(accounts(0))
            .attached_deposit(1_000_000_000_000_000_000_000_000)
            .build());
        contract.donate(Some(format!("Donation {}", i)));
    }
    
    // Test pagination
    let first_page = contract.get_donations(Some(0), Some(5));
    assert_eq!(first_page.len(), 5);
    
    let second_page = contract.get_donations(Some(5), Some(5));
    assert_eq!(second_page.len(), 5);
    
    // Verify they're different donations
    assert_ne!(first_page[0].timestamp, second_page[0].timestamp);
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Testing for JavaScript contracts will be covered in the deployment section with comprehensive sandbox tests.

  </TabItem>
</Tabs>

## Building and Verifying

Build your enhanced contract:

```bash
# Rust
cargo build --target wasm32-unknown-unknown --release

# JavaScript
cd contract-ts && npm run build
```

Run tests to ensure everything works:

```bash
# Rust
cargo test

# JavaScript tests will be covered in deployment section
```

:::tip Storage Costs
Each piece of data stored in your contract costs NEAR tokens for storage. The current cost is approximately 1 NEAR per 100kb of data. Our history limiting ensures storage costs remain reasonable.
:::

:::info Performance Considerations
- **Pagination** prevents gas limit issues with large datasets
- **View methods** are free to call and don't modify state
- **Efficient sorting** is implemented for top donor queries
:::

Your donation contract now has comprehensive tracking capabilities! In the next section, we'll implement advanced query methods and add administrative features.

## Enhanced Donation Function

Let's update our donation function to include comprehensive tracking with optional messages.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```rust
#[near_bindgen]
impl DonationContract {
    /// Enhanced donate function with message support and comprehensive tracking
    #[payable]
    pub fn donate(&mut self, message: Option<String>) {
        let donor: AccountId = env::predecessor_account_id();
        let donation_amount: Balance = env::attached_deposit();
        
        require!(donation_amount > 0, "Donation amount must be greater than 0");
        
        // Update total donations
        self.total_donations += donation_amount;
        
        // Track largest donation
        if donation_amount > self.largest_donation {
            self.largest_donation = donation_amount;
        }
        
        // Update donor records
        match self.donations.get(&donor) {
            Some(mut existing_donation) => {
                existing_donation.total_amount += donation_amount;
                existing_donation.timestamp = env::block_timestamp();
                existing_donation.donation_count += 1;
                self.donations.insert(donor.clone(), existing_donation);
            }
            None => {
                let new_donation = Donation {
                    account_id: donor.clone(),
                    total_amount: donation_amount,
                    timestamp: env::block_timestamp(),
                    donation_count: 1,
                };
                self.donations.insert(donor.clone(), new_donation);
            }
        }
        
        // Add to donation history
        let donation_event = DonationEvent {
            donor: donor.clone(),
            amount: donation_amount,
            timestamp: env::block_timestamp(),
            message: message.clone(),
        };
        
        self.donation_history.push_back(donation_event);
        
        // Keep only last 100 donations in history to manage storage
        if self.donation_history.len() > 100 {
            self.donation_history.pop_front();
        }
        
        // Transfer to beneficiary
        Promise::new(self.beneficiary.clone()).transfer(donation_amount);
        
        // Enhanced logging
        let log_message = match message {
            Some(msg) => format!(
                "Thank you @{} for donating {} NEAR with message: '{}'. Total raised: {} NEAR",
                donor,
                donation_amount as f64 / 1e24,
                msg,
                self.total_donations as f64 / 1e24
            ),
            None => format!(
                "Thank you @{} for donating {} NEAR! Total raised: {} NEAR",
                donor,
                donation_amount as f64 / 1e24,
                self.total_donations as f64 / 1e24
            ),
        };
        
        env::log_str(&log_message);
    }
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

```typescript
@call({ payableFunction: true })
donate({ message }: { message?: string }): void {
  const donor = near.predecessorAccountId();
  const donationAmount = near.attachedDeposit();
  
  assert(donationAmount > BigInt(0), 'Donation amount must be greater than 0');
  
  // Update totals
  this.totalDonations = (BigInt(this.totalDonations) + donationAmount).toString();
  
  // Track largest donation
  if (donationAmount > BigInt(this.largestDonation)) {
    this.largestDonation = donationAmount.toString();
  }
  
  // Update donor records
  const existingDonation = this.donations.get(donor);
  if (existingDonation) {
    existingDonation.total_amount = (BigInt(existingDonation.total_amount) + donationAmount).toString();
    existingDonation.timestamp = near.blockTimestamp().toString();
    existingDonation.donation_count += 1;
    this.donations.set(donor, existingDonation);
  } else {
    const newDonation = new Donation(
      donor,
      donationAmount.toString(),
      near.blockTimestamp().toString(),
      1
    );
    this.donations.set(donor, newDonation);
  }
  
  // Add to history
  const donationEvent = new DonationEvent(
    donor,
    donationAmount.toString(),
    near.blockTimestamp().toString(),
    message
  );
  
  this.donationHistory.push(donationEvent);
  
  // Keep only last 100 donations
  if (this.donationHistory.length > 100) {
    this.donationHistory.swapRemove(0);
  }
  
  // Transfer to beneficiary
  const promise = near.promiseBatchCreate(this.beneficiary);
  near.promiseBatchActionTransfer(promise, donationAmount);
  
  const logMessage = message
    ? `Thank you @${donor} for donating ${donationAmount} with message: '${message}'. Total: ${this.totalDonations}`
    : `Thank you @${donor} for donating ${donationAmount}! Total: ${this.totalDonations}`;
  
  near.log(logMessage);
}
```

  </TabItem>
</Tabs>

## Comprehensive Query Methods

Now let's implement various methods to query donation data with pagination and statistics.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```rust
#[near_bindgen]
impl DonationContract {
    /// Get donation statistics
    pub fn get_donation_stats(&self) -> DonationStats {
        let latest_donation = self.donation_history.back().cloned();
        
        DonationStats {
            total_donations: U128(self.total_donations),
            total_donors: self.donations.len() as u32,
            largest_donation: U128