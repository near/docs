import {Github} from "@site/src/components/codetabs";

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_nft_contract)]
trait ExternalNftContract {
  fn nft_token(&self, token_id: TokenId) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  pub fn nft_token(&self, token_id: TokenId) -> Promise {
    let promise = ext_nft_contract::ext(self.nft_contract.clone())
      .nft_token(token_id);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .nft_token_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn nft_token_callback(&self, #[callback_result] call_result: Result<Token, PromiseError>) -> Option<Token> {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting NFT contract");
      return None;
    }

    // Return the token data
    let token_data: Token = call_result.unwrap();
    return Some(token_data);
  }
}
```

Full smart contract code you may find below.

<Github fname="lib.rs"
  url="https://github.com/garikbesson/interact-with-near-nft-example/blob/main/src/lib.rs"
  start="20" end="27" />