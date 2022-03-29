<MainRs>

```rust
use near_sdk::{env, near_bindgen, AccountId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

use models::{Donation, STORAGE_COST}

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct DonationTracker {
    beneficiary: AccountId,
    donations: PersistentVector<Donation>
}

#[near_bindgen]
impl DonationTracker {
  // Public - get value of counter
  pub fn init(&self, beneficiary: AccountId) -> Self {
      DonationTracker::new(beneficiary)
  }

  // Public - increment the counter
  pub fn donate(&mut self): i32 {
      // Get who is calling the method, and how much NEAR they attached
      let from: AccountId = env::predecesor();
      let amount: Balance = env::attachedDeposit();

      // Send almost all of it to the beneficiary (deduct some to cover storage)
      Contract(self.beneficiary).transfer(amount - STORAGE_COST);
    
      // Record the donation
      const donation_number: i32 = self.add_donation(from, amount);
      let log_message = format!("Thank you {}, your donation is the number {}", from, donation_number);
      env::log(log_message.as_bytes());

      return donation_number
  }

  // Private
  fn add_donation(&mut self): i32{
      let donation: Donation = Donation::new(from, amount);
      self.donations.append(donation);
      return self.donations.length
  }

  // Internal - safeguard against overflow
  pub fn get_donation_by_number(&self, donation_number: i32): Donation {
    assert!(donation_number > 0 &&  donation_number <= self.donations.length, "Invalid donation number")
    return self.donations[donation_number - 1] 
  }
}
```

</MainRs>