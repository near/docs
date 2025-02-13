```rust
#[near(serializers = [json])]
pub struct PoolInfo {
  /// Pool kind.
  pub pool_kind: String,
  /// List of tokens in the pool.
  pub token_account_ids: Vec<AccountId>,
  /// How much NEAR this contract has.
  pub amounts: Vec<U128>,
  /// Fee charged for swap.
  pub total_fee: u32,
  /// Total number of shares.
  pub shares_total_supply: U128,
  pub amp: u64,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn get_pools(&self, from_index: u64, limit: u64) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_get_pools_callback(&self, #[callback_result] call_result: Result<Vec<PoolInfo>, PromiseError>) -> Option<Vec<PoolInfo>> {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract");
      return None;
    }

    // Return the pools data
    let pools_data = call_result.unwrap();
    return Some(pools_data);
  }

  pub fn get_amm_pools(&self, from_index: u64, limit: u64) -> Promise {
    let promise = ext_amm_contract::ext(self.amm_contract.clone())
      .get_pools(from_index, limit);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .external_get_pools_callback()
    )
  }
}
```
