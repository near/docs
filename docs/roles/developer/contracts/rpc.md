---
id: rpc
title: RPC
sidebar_label: RPC
---

The generic solution to invoking smart contracts on the NEAR Platform is our RPC interface. This method is used by `near-api-js`. Our [RPC interface](/docs/interaction/rpc) uses Standard JSON RPC 2.0 across the board.

The diagram below shows this relationship with RPC at the center:

```text
          ----
              |
Your New App  |
              |
          ----+
              |
NEAR Explorer |                                     o ----------------------- o
              |                                     |                         |
          ----+           o ----------- o           |  +-------------------+  |
              |    use    |             |  ------>  |  |                   |  |
NEAR Wallet   |  -------> | near-api-js |    RPC    |  |  NEAR blockchain  |  |
              |           |             |  <------  |  |                   |  |
          ----+           o ----------- o           |  +-------------------+  |
              |                                     |                         |
NEAR Examples |                                     o ----------------------- o
              |
          ----+
              |
NEAR Shell    |
              |
          ----
```


For `view` methods:

The documentation linked above includes details of the `query` method which supports the `call/<account_id>/<method name>` to call `<method name>` on the contract identified by `<account_id>`.  `<method_name>` may only be invoked as a `view` method in this case.

For `change` methods:

Alternatively, to invoke a `change` method a signed transaction is required via the `broadcast_tx_async` methods which sends transaction and returns right away with the hash of the transaction in base58.
