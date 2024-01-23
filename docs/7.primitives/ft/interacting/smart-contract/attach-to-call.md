import {Github} from "@site/src/components/codetabs";

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

Full smart contract code you may find below.

<Github fname="lib.rs"
  url="https://github.com/garikbesson/interact-with-near-ft-example/blob/main/src/lib.rs"
  start="20" end="27" />