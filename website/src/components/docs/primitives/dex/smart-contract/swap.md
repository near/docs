```rust
#[near(serializers = [json])]
pub struct SwapAction {
    /// Pool which should be used for swapping.
    pub pool_id: u64,
    /// Token to swap from.
    pub token_in: AccountId,
    /// Amount to exchange.
    /// If amount_in is None, it will take amount_out from previous step.
    /// Will fail if amount_in is None on the first step.
    pub amount_in: Option<U128>,
    /// Token to swap into.
    pub token_out: AccountId,
    /// Required minimum amount of token_out.
    pub min_amount_out: U128,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn swap(&self, actions: Vec<SwapAction>) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_call_callback(&self, #[callback_result] call_result: Result<String, PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract");
    }
  }

  #[payable]
  pub fn swap_tokens(&mut self, pool_id: u64, token_in: AccountId, token_out: AccountId, amount_in: U128, min_amount_out: U128) -> Promise {
    assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

    let swap_action = SwapAction {
      pool_id,
      token_in,
      token_out,
      amount_in: Some(amount_in),
      min_amount_out
    };

    let mut actions = Vec::new();
    actions.push(swap_action);

    let promise = ext_amm_contract::ext(self.amm_contract.clone())
      .with_static_gas(Gas(150*TGAS))
      .with_attached_deposit(YOCTO_NEAR)
      .swap(actions);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(100*TGAS))
      .external_call_callback()
    )
  }
}
```
