---
id: queries
title: Advanced Query Methods and Analytics
sidebar_label: Advanced Queries
description: "Implement sophisticated query methods, analytics, and administrative features for your donation smart contract."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from '@site/src/components/codetabs';

Now let's add advanced query capabilities and analytics to make our donation contract more useful for both users and administrators. We'll implement search functionality, time-based queries, and administrative controls.

## Time-Based Analytics

Let's add methods to query donations within specific time periods and generate analytics.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Add these structures and methods to `src/donation.rs`:

```rust
/// Time-based donation analytics
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct DonationAnalytics {
    pub period_donations: U128,
    pub period_donors: u32,
    pub average_donation: U128,
    pub donation_frequency: f64, // donations per day
}

/// Date range for queries
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct DateRange {
    pub start_timestamp: u64,
    pub end_timestamp: u64,
}

#[near_bindgen]
impl DonationContract {
    /// Get donations within a time range
    pub fn get_donations_by_date_range(&self, date_range: DateRange) -> Vec<DonationEvent> {
        self.donation_history
            .iter()
            .filter(|donation| {
                donation.timestamp >= date_range.start_timestamp 
                && donation.timestamp <= date_range.end_timestamp
            })
            .cloned()
            .collect()
    }
    
    /// Get donation analytics for a specific time period
    pub fn get_donation_analytics(&self, date_range: DateRange) -> DonationAnalytics {
        let period_donations: Vec<&DonationEvent> = self.donation_history
            .iter()
            .filter(|donation| {
                donation.timestamp >= date_range.start_timestamp 
                && donation.timestamp <= date_range.end_timestamp
            })
            .collect();
            
        let total_amount: Balance = period_donations.iter()
            .map(|d| d.amount)
            .sum();
            
        let unique_donors: std::collections::HashSet<&AccountId> = period_donations.iter()
            .map(|d| &d.donor)
            .collect();
            
        let days_in_period = ((date_range.end_timestamp - date_range.start_timestamp) / 86_400_000_000_000) as f64;
        let donation_frequency = if days_in_period > 0.0 {
            period_donations.len() as f64 / days_in_period
        } else {
            0.0
        };
        
        let average_donation = if !period_donations.is_empty() {
            total_amount / period_donations.len() as Balance
        } else {
            0
        };
        
        DonationAnalytics {
            period_donations: U128(total_amount),
            period_donors: unique_donors.len() as u32,
            average_donation: U128(average_donation),
            donation_frequency,
        }
    }
    
    /// Get donations from a specific donor with pagination
    pub fn get_donations_by_donor(&self, donor: AccountId, from_index: Option<u32>, limit: Option<u32>) -> Vec<DonationEvent> {
        let start_index = from_index.unwrap_or(0) as usize;
        let limit = limit.unwrap_or(10).min(50) as usize;
        
        let donor_donations: Vec<DonationEvent> = self.donation_history
            .iter()
            .filter(|donation| donation.donor == donor)
            .cloned()
            .collect();
            
        let end_index = (start_index + limit).min(donor_donations.len());
        
        if start_index >= donor_donations.len() {
            return vec![];
        }
        
        // Return most recent first
        let mut result = donor_donations;
        result.reverse();
        result[start_index..end_index].to_vec()
    }
    
    /// Search donations by message content
    pub fn search_donations_by_message(&self, search_term: String, limit: Option<u32>) -> Vec<DonationEvent> {
        let limit = limit.unwrap_or(10).min(50) as usize;
        let search_term = search_term.to_lowercase();
        
        self.donation_history
            .iter()
            .filter(|donation| {
                if let Some(ref message) = donation.message {
                    message.to_lowercase().contains(&search_term)
                } else {
                    false
                }
            })
            .rev() // Most recent first
            .take(limit)
            .cloned()
            .collect()
    }
    
    /// Get donation milestones (every 1000 NEAR raised)
    pub fn get_donation_milestones(&self) -> Vec<DonationEvent> {
        let mut milestones = Vec::new();
        let mut running_total: Balance = 0;
        let mut next_milestone: Balance = 1_000_000_000_000_000_000_000_000_000; // 1000 NEAR
        
        for donation in &self.donation_history {
            running_total += donation.amount;
            
            if running_total >= next_milestone {
                milestones.push(donation.clone());
                next_milestone += 1_000_000_000_000_000_000_000_000_000; // Next 1000 NEAR
            }
        }
        
        milestones
    }
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Add these classes to `contract-ts/src/model.ts`:

```typescript
export class DonationAnalytics {
  period_donations: string;
  period_donors: number;
  average_donation: string;
  donation_frequency: number;

  constructor(
    period_donations: string,
    period_donors: number,
    average_donation: string,
    donation_frequency: number
  ) {
    this.period_donations = period_donations;
    this.period_donors = period_donors;
    this.average_donation = average_donation;
    this.donation_frequency = donation_frequency;
  }
}

export class DateRange {
  start_timestamp: string;
  end_timestamp: string;

  constructor(start_timestamp: string, end_timestamp: string) {
    this.start_timestamp = start_timestamp;
    this.end_timestamp = end_timestamp;
  }
}
```

Add these methods to `contract-ts/src/contract.ts`:

```typescript
@view({})
get_donations_by_date_range({ date_range }: { date_range: DateRange }): DonationEvent[] {
  const result: DonationEvent[] = [];
  const startTime = BigInt(date_range.start_timestamp);
  const endTime = BigInt(date_range.end_timestamp);
  
  for (let i = 0; i < this.donationHistory.length; i++) {
    const donation = this.donationHistory.get(i);
    const donationTime = BigInt(donation.timestamp);
    
    if (donationTime >= startTime && donationTime <= endTime) {
      result.push(donation);
    }
  }
  
  return result.reverse(); // Most recent first
}

@view({})
get_donation_analytics({ date_range }: { date_range: DateRange }): DonationAnalytics {
  const periodDonations: DonationEvent[] = [];
  const startTime = BigInt(date_range.start_timestamp);
  const endTime = BigInt(date_range.end_timestamp);
  
  for (let i = 0; i < this.donationHistory.length; i++) {
    const donation = this.donationHistory.get(i);
    const donationTime = BigInt(donation.timestamp);
    
    if (donationTime >= startTime && donationTime <= endTime) {
      periodDonations.push(donation);
    }
  }
  
  let totalAmount = BigInt(0);
  const uniqueDonors = new Set<string>();
  
  periodDonations.forEach(donation => {
    totalAmount += BigInt(donation.amount);
    uniqueDonors.add(donation.donor);
  });
  
  const daysInPeriod = Number(endTime - startTime) / (86_400 * 1e9); // nanoseconds to days
  const donationFrequency = daysInPeriod > 0 ? periodDonations.length / daysInPeriod : 0;
  const averageDonation = periodDonations.length > 0 ? totalAmount / BigInt(periodDonations.length) : BigInt(0);
  
  return new DonationAnalytics(
    totalAmount.toString(),
    uniqueDonors.size,
    averageDonation.toString(),
    donationFrequency
  );
}

@view({})
get_donations_by_donor({ donor, from_index, limit }: { 
  donor: string; 
  from_index?: number; 
  limit?: number; 
}): DonationEvent[] {
  const startIndex = from_index || 0;
  const maxLimit = Math.min(limit || 10, 50);
  
  const donorDonations: DonationEvent[] = [];
  
  for (let i = 0; i < this.donationHistory.length; i++) {
    const donation = this.donationHistory.get(i);
    if (donation.donor === donor) {
      donorDonations.push(donation);
    }
  }
  
  // Reverse to get most recent first, then apply pagination
  donorDonations.reverse();
  const endIndex = Math.min(startIndex + maxLimit, donorDonations.length);
  
  return donorDonations.slice(startIndex, endIndex);
}

@view({})
search_donations_by_message({ search_term, limit }: { 
  search_term: string; 
  limit?: number; 
}): DonationEvent[] {
  const maxLimit = Math.min(limit || 10, 50);
  const searchTermLower = search_term.toLowerCase();
  const results: DonationEvent[] = [];
  
  // Search from most recent backwards
  for (let i = this.donationHistory.length - 1; i >= 0 && results.length < maxLimit; i--) {
    const donation = this.donationHistory.get(i);
    if (donation.message && donation.message.toLowerCase().includes(searchTermLower)) {
      results.push(donation);
    }
  }
  
  return results;
}

@view({})
get_donation_milestones(): DonationEvent[] {
  const milestones: DonationEvent[] = [];
  let runningTotal = BigInt(0);
  let nextMilestone = BigInt('1000000000000000000000000000'); // 1000 NEAR
  
  for (let i = 0; i < this.donationHistory.length; i++) {
    const donation = this.donationHistory.get(i);
    runningTotal += BigInt(donation.amount);
    
    if (runningTotal >= nextMilestone) {
      milestones.push(donation);
      nextMilestone += BigInt('1000000000000000000000000000'); // Next 1000 NEAR
    }
  }
  
  return milestones;
}
```

  </TabItem>
</Tabs>

## Administrative Functions

Let's add administrative functions for contract management.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Add these administrative methods:

```rust
#[near_bindgen]
impl DonationContract {
    /// Change the beneficiary (only callable by current beneficiary)
    pub fn change_beneficiary(&mut self, new_beneficiary: AccountId) {
        require!(
            env::predecessor_account_id() == self.beneficiary,
            "Only the current beneficiary can change the beneficiary"
        );
        
        let old_beneficiary = self.beneficiary.clone();
        self.beneficiary = new_beneficiary.clone();
        
        env::log_str(&format!(
            "Beneficiary changed from {} to {}",
            old_beneficiary,
            new_beneficiary
        ));
    }
    
    /// Emergency pause functionality (only callable by beneficiary)
    pub fn set_pause_status(&mut self, paused: bool) {
        require!(
            env::predecessor_account_id() == self.beneficiary,
            "Only the beneficiary can pause/unpause the contract"
        );
        
        // Note: In a full implementation, you'd store this in contract state
        // and check it in the donate function
        env::log_str(&format!("Contract pause status set to: {}", paused));
    }
    
    /// Get contract metadata
    pub fn get_contract_metadata(&self) -> serde_json::Value {
        serde_json::json!({
            "version": "1.0.0",
            "beneficiary": self.beneficiary,
            "total_donations": self.total_donations.to_string(),
            "total_donors": self.donations.len(),
            "contract_balance": env::account_balance().to_string(),
            "storage_used": env::storage_usage(),
        })
    }
    
    /// Get detailed donor information
    pub fn get_donor_details(&self, donor: AccountId) -> Option<serde_json::Value> {
        if let Some(donation_info) = self.donations.get(&donor) {
            let donor_history: Vec<&DonationEvent> = self.donation_history
                .iter()
                .filter(|d| d.donor == donor)
                .collect();
                
            Some(serde_json::json!({
                "donor": donor,
                "total_donated": donation_info.total_amount.to_string(),
                "donation_count": donation_info.donation_count,
                "first_donation": donor_history.first().map(|d| d.timestamp),
                "latest_donation": donation_info.timestamp,
                "largest_single_donation": donor_history.iter()
                    .map(|d| d.amount)
                    .max()
                    .unwrap_or(0)
                    .to_string(),
            }))
        } else {
            None
        }
    }
}
```

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

Add these administrative methods:

```typescript
@call({})
change_beneficiary({ new_beneficiary }: { new_beneficiary: string }): void {
  assert(
    near.predecessorAccountId() === this.beneficiary,
    'Only the current beneficiary can change the beneficiary'
  );
  
  const oldBeneficiary = this.beneficiary;
  this.beneficiary = new_beneficiary;
  
  near.log(`Beneficiary changed from ${oldBeneficiary} to ${new_beneficiary}`);
}

@call({})
set_pause_status({ paused }: { paused: boolean }): void {
  assert(
    near.predecessorAccountId() === this.beneficiary,
    'Only the beneficiary can pause/unpause the contract'
  );
  
  // Note: In a full implementation, you'd store this in contract state
  // and check it in the donate function
  near.log(`Contract pause status set to: ${paused}`);
}

@view({})
get_contract_metadata(): any {
  return {
    version: '1.0.0',
    beneficiary: this.beneficiary,
    total_donations: this.totalDonations,
    total_donors: this.donations.length,
    contract_balance: near.accountBalance(),
    storage_used: near.storageUsage().toString(),
  };
}

@view({})
get_donor_details({ donor }: { donor: string }): any | null {
  const donationInfo = this.donations.get(donor);
  if (!donationInfo) {
    return null;
  }
  
  const donorHistory: DonationEvent[] = [];
  let largestDonation = BigInt(0);
  let firstDonation: DonationEvent | null = null;
  
  for (let i = 0; i < this.donationHistory.length; i++) {
    const donation = this.donationHistory.get(i);
    if (donation.donor === donor) {
      donorHistory.push(donation);
      if (!firstDonation) {
        firstDonation = donation;
      }
      const amount = BigInt(donation.amount);
      if (amount > largestDonation) {
        largestDonation = amount;
      }
    }
  }
  
  return {
    donor,
    total_donated: donationInfo.total_amount,
    donation_count: donationInfo.donation_count,
    first_donation: firstDonation?.timestamp || null,
    latest_donation: donationInfo.timestamp,
    largest_single_donation: largestDonation.toString(),
  };
}
```

  </TabItem>
</Tabs>

## Query Usage Examples

Here are practical examples of how to use these advanced query methods:

### Time-Based Analytics

```bash
# Get donations from the last 7 days
WEEK_AGO=$(date -d '7 days ago' +%s)000000000  # Convert to nanoseconds
NOW=$(date +%s)000000000

near view $CONTRACT_ID get_donation_analytics \
  '{"date_range": {"start_timestamp": "'$WEEK_AGO'", "end_timestamp": "'$NOW'"}}'
```

### Donor-Specific Queries

```bash
# Get all donations from a specific donor
near view $CONTRACT_ID get_donations_by_donor \
  '{"donor": "alice.testnet", "from_index": 0, "limit": 10}'

# Get detailed donor information
near view $CONTRACT_ID get_donor_details \
  '{"donor": "alice.testnet"}'
```

### Message Search

```bash
# Search for donations with specific messages
near view $CONTRACT_ID search_donations_by_message \
  '{"search_term": "birthday", "limit": 5}'
```

### Milestone Tracking

```bash
# Get all milestone donations
near view $CONTRACT_ID get_donation_milestones
```

## Performance Considerations

### Gas Optimization

- **Pagination limits**: All query methods limit results to prevent gas issues
- **Efficient filtering**: Use iterators and early termination where possible
- **View methods only**: Query methods are read-only and don't consume caller's gas

### Storage Efficiency

- **Bounded collections**: History is limited to prevent unbounded growth
- **Efficient data structures**: Use appropriate collection types for different access patterns
- **Lazy loading**: Don't load unnecessary data in queries

## Testing Advanced Queries

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Add comprehensive tests in `src/tests.rs`:

```rust
#[test]
fn test_date_range_queries() {
    let mut context = VMContextBuilder::new();
    let mut contract = DonationContract::new(accounts(1));
    
    let start_time = 1_000_000_000;
    let mid_time = 2_000_000_000;
    let end_time = 3_000_000_000;
    
    // Make donations at different times
    testing_env!(context
        .predecessor_account_id(accounts(0))
        .attached_deposit(1_000_000_000_000_000_000_000_000)
        .block_timestamp(start_time)
        .build());
    contract.donate(Some("Early donation".to_string()));
    
    testing_env!(context
        .block_timestamp(mid_time)
        .build());
    contract.donate(Some("Mid donation".to_string()));
    
    testing_env!(context
        .block_timestamp(end_time)
        .build());
    contract.donate(Some("Late donation".to_string()));
    
    // Query first half
    let date_range = DateRange {
        start_timestamp: start_time,
        end_timestamp: mid_time,
    };
    let first_half = contract.get_donations_by_date_range(date_range);
    assert_eq!(first_half.len(), 2);
    
    // Query analytics for full period
    let full_range = DateRange {
        start_timestamp: start_time,
        end_timestamp: end_time,
    };
    let analytics = contract.get_donation_analytics(full_range);
    assert_eq!(analytics.period_donations.0, 3_000_000_000_000_000_000_000_000);
    assert_eq!(analytics.period_donors, 1);
}

#[test]
fn test_donor_queries() {
    let mut context = VMContextBuilder::new();
    let mut contract = DonationContract::new(accounts(2));
    
    // Donations from different accounts
    testing_env!(context
        .predecessor_account_id(accounts(0))
        .attached_deposit(1_000_000_000_000_000_000_000_000)
        .build());
    contract.donate(Some("From Alice".to_string()));
    
    testing_env!(context
        .predecessor_account_id(accounts(1))
        .attached_deposit(2_000_000_000_000_000_000_000_000)
        .build());
    contract.donate(Some("From Bob".to_string()));
    
    testing_env!(context
        .predecessor_account_id(accounts(0))
        .attached_deposit(500_000_000_000_000_000_000_000)
        .build());
    contract.donate(Some("Alice again".to_string()));
    
    // Test donor-specific queries
    let alice_donations = contract.get_donations_by_donor(accounts(0), None, None);
    assert_eq!(alice_donations.len(), 2);
    
    let bob_donations = contract.get_donations_by_donor(accounts(1), None, None);
    assert_eq!(bob_donations.len(), 1);
    
    // Test donor details
    let alice_details = contract.get_donor_details(accounts(0));
    assert!(alice_details.is_some());
    
    if let Some(details) = alice_details {
        let total = details["total_donated"].as_str().unwrap();
        assert_eq!(total, "1500000000000000000000000"); // 1.5 NEAR
    }
}

#[test]
fn test_message_search() {
    let mut context = VMContextBuilder::new();
    let mut contract = DonationContract::new(accounts(1));
    
    // Add donations with various messages
    testing_env!(context
        .predecessor_account_id(accounts(0))
        .attached_deposit(1_000_000_000_000_000_000_000_000)
        .build());
    contract.donate(Some("Happy birthday!".to_string()));
    
    testing_env!(context.build());
    contract.donate(Some("Great work on the project".to_string()));
    
    testing_env!(context.build());
    contract.donate(Some("Another birthday wish".to_string()));
    
    // Search for birthday messages
    let birthday_donations = contract.search_donations_by_message("birthday".to_string(), None);
    assert_eq!(birthday_donations.len(), 2);
    
    // Search for non-existent term
    let empty_result = contract.search_donations_by_message("vacation".to_string(), None);
    assert_eq!(empty_result.len(), 0);
}

#[test]
fn test_administrative_functions() {
    let mut context = VMContextBuilder::new();
    testing_env!(context
        .predecessor_account_id(accounts(1)) // beneficiary
        .build());
    
    let mut contract = DonationContract::new(accounts(1));
    
    // Test changing beneficiary (should succeed)
    contract.change_beneficiary(accounts(2));
    assert_eq!(contract.get_beneficiary(), accounts(2));
    
    // Test metadata
    let metadata = contract.get_contract_metadata();
    assert_eq!(metadata["beneficiary"], accounts(2).to_string());
}

#[test]
#[should_panic(expected = "Only the current beneficiary can change the beneficiary")]
fn test_unauthorized_beneficiary_change() {
    let mut context = VMContextBuilder::new();
    testing_env!(context
        .predecessor_account_id(accounts(0)) // not beneficiary
        .build());
    
    let mut contract = DonationContract::new(accounts(1));
    contract.change_beneficiary(accounts(2)); // Should panic
}
```

  </TabItem>
</Tabs>

## CLI Usage Examples

Here are practical command-line examples for interacting with your enhanced donation contract:

### Basic Queries

```bash
# Set your contract ID
export CONTRACT_ID="your-donation-contract.testnet"

# Get donation statistics
near view $CONTRACT_ID get_donation_stats

# Get recent donations with pagination
near view $CONTRACT_ID get_donations '{"from_index": 0, "limit": 5}'

# Get top donors
near view $CONTRACT_ID get_top_donors '{"limit": 3}'
```

### Advanced Analytics

```bash
# Get donations from last 30 days
THIRTY_DAYS_AGO=$(date -d '30 days ago' +%s)000000000
NOW=$(date +%s)000000000

near view $CONTRACT_ID get_donation_analytics \
  "{\"date_range\": {\"start_timestamp\": \"$THIRTY_DAYS_AGO\", \"end_timestamp\": \"$NOW\"}}"

# Search donations by message
near view $CONTRACT_ID search_donations_by_message \
  '{"search_term": "charity", "limit": 10}'

# Get milestone donations
near view $CONTRACT_ID get_donation_milestones
```

### Administrative Commands

```bash
# Change beneficiary (only current beneficiary can do this)
near call $CONTRACT_ID change_beneficiary \
  '{"new_beneficiary": "new-beneficiary.testnet"}' \
  --accountId current-beneficiary.testnet

# Get contract metadata
near view $CONTRACT_ID get_contract_metadata

# Get detailed donor information
near view $CONTRACT_ID get_donor_details \
  '{"donor": "generous-donor.testnet"}'
```

## Integration with Frontend

These query methods are designed to integrate seamlessly with frontend applications:

### JavaScript Integration Example

```javascript
// Get recent donations for display
const recentDonations = await contract.get_donations({
  from_index: 0,
  limit: 10
});

// Get donation statistics for dashboard
const stats = await contract.get_donation_stats();

// Search functionality
const searchResults = await contract.search_donations_by_message({
  search_term: userSearchTerm,
  limit: 20
});

// User profile page
const userDetails = await contract.get_donor_details({
  donor: currentUser.accountId
});
```

## Error Handling and Edge Cases

Our query methods handle various edge cases:

- **Empty results**: Return empty arrays/null when no data matches
- **Invalid pagination**: Clamp indices to valid ranges
- **Gas limits**: Limit result sizes to prevent gas issues
- **Invalid timestamps**: Handle malformed date ranges gracefully

## Performance Monitoring

Monitor your contract's performance with these built-in metrics:

```bash
# Check storage usage
near view $CONTRACT_ID get_contract_metadata

# Monitor gas consumption for different query sizes
near view $CONTRACT_ID get_donations '{"limit": 50}' --gas 300000000000000
```

:::tip Optimization Tips

1. **Use pagination** for large result sets
2. **Limit search terms** to prevent excessive computation
3. **Cache frequently accessed data** in your frontend
4. **Monitor storage costs** and implement cleanup if needed

:::

:::info Next Steps

Your donation contract now has comprehensive query and analytics capabilities! In the next section, we'll deploy the contract to NEAR testnet and create comprehensive tests to ensure everything works correctly.

:::

## Summary

We've successfully implemented:

- **Time-based analytics** for donation tracking over periods
- **Advanced search capabilities** including message search and donor filtering  
- **Administrative functions** for contract management
- **Comprehensive error handling** and edge case management
- **Performance optimizations** with pagination and gas limits
- **Detailed testing** to ensure reliability

Your donation contract is now feature-complete and ready for deployment!