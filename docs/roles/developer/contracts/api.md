---
id: api 
title: API
sidebar_label: API
---

The generic solution to invoking smart contracts on the NEAR Platform is our RPC interface. This method is used by `near-api-js`. Our [RPC interface](/docs/api/rpc) uses Standard JSON RPC 2.0 across the board.

For `view` methods:

The documentation linked above includes details of the `query` method which supports the `call/<account_id>/<method name>` to call `<method name>` on the contract identified by `<account_id>`.  `<method_name>` may only be invoked as a `view` method in this case.

For `change` methods:

Alternatively, to invoke a `change` method a signed transaction is required via the `broadcast_tx_async` methods which sends transaction and returns right away with the hash of the transaction in base58.