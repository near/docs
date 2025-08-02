---
id: donation
title: "Handling NEAR Tokens in Smart Contracts"
description: "Learn to securely receive, track, and forward NEAR tokens in smart contracts with practical examples."
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 🏗️ Contract Basics

### Core Structure (Rust)
```rust
use near_sdk::{env, near_bindgen, AccountId, Promise};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Donation {
    pub donor: AccountId,
    pub amount: u128,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct DonationContract {
    beneficiary: AccountId,
    donations: Vec<Donation>,
} ```
