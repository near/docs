This is an example on how you can make your smart contract buy a NFT on some marketplace (Paras this case).

:::info
Please note that in this example the contract will be the owner of the NFT, however, some marketplaces allow you to buy NFT for somebody else.
:::

```rust
const NFT_MARKETPLACE_CONTRACT: &str = "paras-marketplace-v2.testnet";

// Define the contract structure
#[near(contract_state)]
pub struct Contract {
  nft_marketplace_contract: AccountId
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
          nft_marketplace_contract: NFT_MARKETPLACE_CONTRACT.parse().unwrap()
        }
    }
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_nft_contract)]
trait ExternalNftContract {
  fn buy(&self, nft_contract_id: AccountId, token_id: TokenId, ft_token_id: Option<AccountId>, price: Option<U128>) -> Promise;
}

// Implement the contract structure
#[near]
impl Contract {
  #[payable]
  pub fn buy(&mut self, nft_contract_id: AccountId, token_id: TokenId, ft_token_id: Option<AccountId>, price: Option<U128>) -> Promise {
    let promise = ext_nft_contract::ext(self.nft_marketplace_contract.clone())
      .with_static_gas(Gas(30*TGAS))
      .with_attached_deposit(env::attached_deposit())
      .buy(nft_contract_id, token_id, ft_token_id, price);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(30*TGAS))
      .buy_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn buy_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting NFT contract");
    }
  }
}
```
