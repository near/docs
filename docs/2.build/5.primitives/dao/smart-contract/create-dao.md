

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_factory_contract)]
trait ExternalDaoFactoryContract {
  fn create(&mut self, name: AccountId, args: Base64VecU8) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[payable]
  pub fn create_dao(&mut self, name: AccountId, args: Base64VecU8) -> Promise {
    let promise = ext_dao_factory_contract::ext(self.dao_factory_contract.clone())
      .with_attached_deposit(env::attached_deposit())
      .with_static_gas(Gas(30*TGAS))
      .create(name, args);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(50*TGAS))
      .external_common_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_common_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract")
    }
  }
}
```
