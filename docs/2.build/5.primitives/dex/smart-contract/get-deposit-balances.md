```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn get_deposits(&self, account_id: AccountId) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_get_deposits_callback(&self, #[callback_result] call_result: Result<HashMap<AccountId, U128>, PromiseError>) -> Option<HashMap<AccountId, U128>> {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract");
      return None;
    }

    // Return the pools data
    let deposits_data = call_result.unwrap();
    return Some(deposits_data);
  }

  pub fn get_contract_deposits(&self) -> Promise {
    let promise = ext_amm_contract::ext(self.amm_contract.clone())
      .get_deposits(env::current_account_id());

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .external_get_deposits_callback()
    )
  }
}
```
