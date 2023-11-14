---
id: smart-contract
title: Smart Contract
hide_table_of_contents: false
---

This section will explain how a smart contract can handle a deposit in FTs, send tokens, swap tokens and attach them to call.

---

### Base Contract

The examples assume that the contract is defined as follows:

```rust
use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_contract_standards::fungible_token::core::ext_ft_core::ext;
use near_sdk::ext_contract;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, serde_json, log, Gas, AccountId, Promise, PromiseOrValue, PromiseError};

const FT_CONTRACT: &str = "token-v3.cheddar.testnet";
const AMM_CONTRACT: &str = "v2.ref-finance.near";

const PRICE: u128 = 100_000_000_000_000_000_000_000;
const YOCTO_NEAR: u128 = 1;
const TGAS: u64 = 1_000_000_000_000;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
  ft_contract: AccountId,
  amm_contract: AccountId,
  price: U128
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
          ft_contract: FT_CONTRACT.parse().unwrap(),
          amm_contract: AMM_CONTRACT.parse().unwrap(),
          price: U128(PRICE),
        }
    }
}

// Message parameters to receive via token function call.
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
#[serde(untagged)]
enum TokenReceiverMessage {
  Action {
    // Parameters which you want to get in msg object, e.g. buyer_id
    buyer_id: Option<AccountId>,
  },
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn swap(&self, pool_id: u64, token_in: AccountId, token_out: AccountId, amount_in: u128, min_amount_out: U128) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {}
```

---

## Swap tokens (a contract is holder of tokens)

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn swap(&self, pool_id: u64, token_in: AccountId, token_out: AccountId, amount_in: u128, min_amount_out: U128) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  #[payable]
  pub fn swap_tokens(&mut self, pool_id: u64, token_in: AccountId, token_out: AccountId, amount_in: u128, min_amount_out: U128) -> Promise {
    assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");
  
    let promise = ext_amm_contract::ext(self.amm_contract.clone())
      .with_static_gas(Gas(300*TGAS))
      .with_attached_deposit(YOCTO_NEAR)
      .swap(pool_id, token_in, token_out, amount_in, min_amount_out);
  
    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(30*TGAS))
      .external_call_callback()
    )
  }
}
```