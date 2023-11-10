---
id: smart-contract
title: Smart Contract
hide_table_of_contents: false
---

This section will explain how a smart contract can handle a deposit in FTs, send tokens, swap tokens and attach them to call.

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

## Handle a deposit

If you want your contract to handle deposit in FTs you have to implement the `ft_on_transfer` method. When executed, such method will know:

- Which FT was transferred, since it is the predecessor account.
- Who is sending the FT, since it is a parameter
- How many FT were transferred, since it is a parameter
- If there are any parameters encoded as a message

The `ft_on_transfer` must return how many FT tokens have to be refunded, so the FT contract gives them back to the sender.

```rust
// Implement the contract structure
#[near_bindgen]
impl Contract {}

#[near_bindgen]
impl FungibleTokenReceiver for Contract {
  // Callback on receiving tokens by this contract.
  // `msg` format is either "" for deposit or `TokenReceiverMessage`.
  fn ft_on_transfer(
    &mut self,
    sender_id: AccountId,
    amount: U128,
    msg: String,
  ) -> PromiseOrValue<U128> {
    let token_in = env::predecessor_account_id();

    assert!(token_in == self.ft_contract, "{}", "The token is not supported");
    assert!(amount >= self.price, "{}", "The attached amount is not enough");

    env::log_str(format!("Sender id: {:?}", sender_id).as_str());

    if msg.is_empty() {
      // Your internal logic here
      PromiseOrValue::Value(U128(0))
    } else {
      let message =
        serde_json::from_str::<TokenReceiverMessage>(&msg).expect("WRONG_MSG_FORMAT");
      match message {
        TokenReceiverMessage::Action {
          buyer_id,
        } => {
          let buyer_id = buyer_id.map(|x| x.to_string());
          env::log_str(format!("Target buyer id: {:?}", buyer_id).as_str());
          // Your internal business logic
          PromiseOrValue::Value(U128(0))
        }
      }
    }
  }
}
```

---

## Send tokens (a contract is holder of tokens)

```rust
#[near_bindgen]
impl Contract {
  #[payable]
  pub fn send_tokens(&mut self, receiver_id: AccountId, amount: U128) -> Promise {
    assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

    let promise = ext(self.ft_contract.clone())
      .with_attached_deposit(YOCTO_NEAR)
      .ft_transfer(receiver_id, amount, None);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(30*TGAS))
      .external_call_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_call_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract");
    }
  }
}
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

---

## Attaching FTs to a Call

Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

```rust
#[payable]
pub fn call_with_attached_tokens(&mut self, receiver_id: AccountId, amount: U128) -> Promise {
  assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

  let promise = ext(self.ft_contract.clone())
    .with_static_gas(Gas(150*TGAS))
    .with_attached_deposit(YOCTO_NEAR)
    .ft_transfer_call(receiver_id, amount, None, "".to_string());

  return promise.then( // Create a promise to callback query_greeting_callback
    Self::ext(env::current_account_id())
    .with_static_gas(Gas(100*TGAS))
    .external_call_callback()
  )
}
```

How it works:

1. You call ft_transfer_call in the FT contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls receiver.ft_on_transfer(sender, msg, amount)
4. The FT contract handles errors in the ft_resolve_transfer callback.
5. The FT contract returns you how much of the attached amount was actually used.

---