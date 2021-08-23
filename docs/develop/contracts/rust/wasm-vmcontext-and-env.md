---
id: wasm-vmcontext-and-env
title: Understanding the Importance of WebAssembly, VMContext, and env
sidebar_label: Wasm, VMContext, and env
---

# Understanding the Importance of WebAssembly, VMContext, and env
## WebAssembly
NEAR compiles smart contracts to [WebAssembly](https://webassembly.org/), or Wasm. Wasm helps NEAR protocol transactions to be fast, safe, and open.

TODO

## VMContext
TODO

## env
[`near-sdk::env`](https://docs.rs/near-sdk/latest/near_sdk/env/index.html) makes blockchain specific methods available to the smart contract. These methods include (but aren't limited to):
* [`account_balance`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.account_balance.html)
* [`current_account_id`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.current_account_id.html)
* [`is_valid_account_id`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.is_valid_account_id.html)
* [`signer_account_id`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.signer_account_id.html)
* [`storage_usage`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.storage_usage.html)
