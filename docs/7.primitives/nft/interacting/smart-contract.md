---
id: smart-contract
title: Smart Contract
hide_table_of_contents: false
---

This is the basis of a smart contract, using the example of which we will look at how to interact with NFTs in different ways.

```rust
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_sdk::ext_contract;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, log, near_bindgen, AccountId, Promise, PromiseError};

const NFT_CONTRACT: &str = "x.paras.near";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
  nft_contract: AccountId
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
          nft_contract: NFT_CONTRACT.parse().unwrap(),
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {}
```

## Mint a NFT

In case with Paras NFT contract before minting NFT token you may need to create token series from your contract account. You can do it via [Paras UI](https://paras.id/en) or use `near-cli`:

```bash
# Example of the command creating token series on Paras
near call x.paras.near nft_create_series '{"token_metadata": {"title": "NFT #1", "media": "bafybeibnpe5x6euhjtn5qrayfgeemxyru7ho3yhdyaifv7gsvdn46j6vzi", "reference": "bafybeif6cjn5bmdp7w5x2jms2xlz64qmp7crd5z77rl3iy3m54mlustdiu", "copies": 10}, "royalty": {"<YOUR_CONTRACT_ADDRESS>": 1000}, "price": null}' --accountId <YOUR_CONTRACT_ADDRESS> --depositYocto 6090000000000000000000
```

How to mint token from a smart contract:

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_nft_contract)]
trait ExternalNftContract {
  fn nft_mint(&self, token_series_id: String, receiver_id: AccountId) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
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
```

:::info
Values of gas and deposit which we used here are not constant. They depends on work logic you have in your contract.
:::

## Buy a NFT

There is an example how you can make your smart contract to buy NFT on a some marketplace (Paras this case). Note, that contract will be an NFT owner in such case. If you want to let user buy NFT on marketplace from your app, you can do it using an example from [NEAR component](/primitives/nft/interacting/bos#buy-a-nft) or [web app](/primitives/nft/interacting/web-app#buy-a-nft) sections.

```rust
const NFT_MARKETPLACE_CONTRACT: &str = "paras-marketplace-v2.testnet";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
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
#[near_bindgen]
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

## Query NFT data

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

## Transfer a NFT

Before transfering token in a such way you may need to force user to approve your smart contract on NFT contract. Predecessor of such transaction (account which actually sign a transaction) must be token owner. So the only way to do it is a suggest user to approve your account via client side (UX).

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
## List a NFT up for a sale

Due to the specifics of putting a token up for sale on a NFT marketplace (more precisely, the need for the owner of the token to sign an approval transaction), you need to do this on the client side.

Check out how to do it from a [NEAR component](/primitives/nft/interacting/bos#list-a-nft-up-for-a-sale) or from a [web app](/primitives/nft/interacting/web-app#list-a-nft-up-for-a-sale).


## Additional resources

If you want to create your own NFT contract this resources might be useful:
- [Example implementation](https://github.com/near-examples/NFT) of a NFT contract (in Rust) which uses [near-contract-standards](https://github.com/near/near-sdk-rs/tree/master/near-contract-standards) and workspaces-js and -rs tests.

- [NFT Zero to Hero Tutorial](https://docs.near.org/tutorials/nfts/introduction) explores every aspect of the [NEP-171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md) standard including an NFT marketplace.

:::info
  Read more about cross contract calls [here](https://docs.near.org/tutorials/examples/xcc).
:::

:::tip
Example of [how to attach NFTs to a contract call](/develop/relevant-contracts/nft#attaching-nfts-to-a-call).
:::