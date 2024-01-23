import {Github} from "@site/src/components/codetabs";

If you want your contract to handle deposit in FTs you have to implement the `ft_on_transfer` method. When executed, such method will know:

- Which FT was transferred, since it is the predecessor account.
- Who is sending the FT, since it is a parameter
- How many FT were transferred, since it is a parameter
- If there are any parameters encoded as a message

The `ft_on_transfer` must return how many FT tokens have to **be refunded**, so the FT contract gives them back to the sender.

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

Full smart contract code you may find below.

<Github fname="lib.rs"
  url="https://github.com/garikbesson/interact-with-near-ft-example/blob/main/src/lib.rs"
  start="20" end="27" />