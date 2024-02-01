:::info
Please notice that a contract can only transfer an NFT that they own, or an NFT that they were approved to transfer.
:::

```rust
const YOCTO_NEAR: u128 = 1;

#[ext_contract(ext_nft_contract)]
trait ExternalNftContract {
  fn nft_transfer(&self, receiver_id: AccountId, token_id: TokenId) -> Promise;
}

impl Contract {
  #[payable]
  pub fn nft_transfer(&mut self, receiver_id: AccountId, token_id: TokenId) -> Promise {
    let promise = ext_nft_contract::ext(self.nft_contract.clone())
      .with_attached_deposit(YOCTO_NEAR)
      .nft_transfer(receiver_id, token_id);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .nft_transfer_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn nft_transfer_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting NFT contract");
    }
  }
}
```