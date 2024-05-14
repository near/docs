

```rust
// Set of possible action to take
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub enum Action {
  // Action to add proposal. Used internally.
  AddProposal,
  // Action to remove given proposal. Used for immediate deletion in special cases.
  RemoveProposal,
  // Vote to approve given proposal or bounty.
  VoteApprove,
  // Vote to reject given proposal or bounty.
  VoteReject,
  // Vote to remove given proposal or bounty (because it's spam).
  VoteRemove,
  // Finalize proposal, called when it's expired to return the funds
  // (or in the future can be used for early proposal closure).
  Finalize,
  // Move a proposal to the hub to shift into another DAO.
  MoveToHub,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_contract)]
trait ExternalDaoContract {
  fn act_proposal(&mut self, id: u64, action: Action, memo: Option<String>) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[payable]
  pub fn act_proposal(&mut self, id: u64, action: Action, memo: Option<String>) -> Promise {
    let promise = ext_dao_contract::ext(self.dao_contract.clone())
      .with_attached_deposit(env::attached_deposit())
      .with_static_gas(Gas(10*TGAS))
      .act_proposal(id, action, memo);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
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
