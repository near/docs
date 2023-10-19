---
id: smart-contract
title: Smart Contract
hide_table_of_contents: false
---

## Create a NFT
## Query NFT data
## Transfer a NFT
## List a NFT up for a sale


If you want to create your own NFT contract this resources might be useful:
- [Example implementation](https://github.com/near-examples/NFT) of a NFT contract (in Rust) which uses [near-contract-standards](https://github.com/near/near-sdk-rs/tree/master/near-contract-standards) and workspaces-js and -rs tests.

- [NFT Zero to Hero Tutorial](https://docs.near.org/tutorials/nfts/introduction) explores every aspect of the [NEP-171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md) standard including an NFT marketplace.

But what if you need to get information about a NFT inside your smart contract?

There is a short example how to do it. Public function ```add_token_series``` saves data about a particular token series in your contract. Function accepts only the string id parameter and gets details from NFT contract. In that case it is a Paras contract ```paras-token-v2.testnet```.

```rust	
pub fn add_token_series(&mut self, id: String) {
  assert_eq!(self.owner_ids.contains(&env::predecessor_account_id()), true, "ERR_NO_ACCESS");

  let log_message = format!("Token series id: {:?}", id);
  env::log(log_message.as_bytes());

  ext_paras_receiver::nft_get_series_single(
    id,
    &"paras-token-v2.testnet".to_string(), //contract account to make the call to
    0, //attached deposit
    30_000_000_000_000,
  );

  //we then resolve the promise and call nft_resolve_transfer on our own contract
  .then(ext_self::resolve_paras_token_series(
    &env::current_account_id(), //contract account to make the call to
    0, //attached deposit
    30_000_000_000_000, //GAS attached to the call
  ));
}

pub fn resolve_paras_token_series(&mut self) {
  let log_message = format!("Get token series cross-contract callback");
  env::log(log_message.as_bytes());

  match env::promise_result(0) {
    PromiseResult::NotReady => unreachable!(),
    PromiseResult::Failed => env::panic(b"Unable to get user tokens"),
    PromiseResult::Successful(result) => {
      let token_series = near_sdk::serde_json::from_slice::<TokenSeriesJson>(&result).unwrap();

      let log_message = format!("User tokens: {:?}", token_series);
      env::log(log_message.as_bytes());

      self.tokens_series.insert(&token_series.token_series_id, &token_series);
    },
  }
}
```

:::info
  This example uses a cross contract call. Read more about cross contract calls [here](https://docs.near.org/tutorials/examples/xcc).
:::

### How Does it Work?
 The workflow is as follows:
1. You call `add_token_series` in your contract passing the token series id.
2. Your contract make a cross contract call to Paras NFT contract `paras-token-v2.testnet`
3. Your contract handles callback from cross contract call using `resolve_paras_token_series` method.
4. `resolve_paras_token_series` method saves a token series data inside the contract data structure.

:::tip
Another example of [how to attach NFTs to a contract call](/develop/relevant-contracts/nft#attaching-nfts-to-a-call).
:::