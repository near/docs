<MainRs>

```ts
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    val: i8,
}

#[near_bindgen]
impl Counter {
  // Public - get value of counter
  pub fn get_num(&self) -> i8 {
      return self.val;
  }

  // Public - increment the counter
  pub fn increment(&mut self) {
      safeguard_overflow()
      self.val += 1;
      let log_message = format!("Increased number to {}", self.val);
      env::log(log_message.as_bytes());
  }

  // Internal - safeguard against overflow
  fn safeguard_underflow(&self) {
    if(self.val == 127){
      env::panic!("Already at maximum")
    }
  }
}
```

</MainRs>