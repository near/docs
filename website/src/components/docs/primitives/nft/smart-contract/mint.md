```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_nft_contract)]
trait ExternalNftContract {
  fn nft_mint(&self, token_series_id: String, receiver_id: AccountId) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[payable]
  pub fn nft_mint(&mut self, token_series_id: String, receiver_id: AccountId) -> Promise {
    let promise = ext_nft_contract::ext(self.nft_contract.clone())
      .with_static_gas(Gas(30*TGAS))
      .with_attached_deposit(env::attached_deposit())
      .nft_mint(token_series_id, receiver_id);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(30*TGAS))
      .nft_mint_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn nft_mint_callback(&self, #[callback_result] call_result: Result<TokenId, PromiseError>) -> Option<TokenId> {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting NFT contract");
      return None;
    }

    // Return the token data
    let token_id: TokenId = call_result.unwrap();
    return Some(token_id);
  }
}
