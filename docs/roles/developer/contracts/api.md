---
id: api 
title: API
sidebar_label: API
---
To invoke smart contracts on the NEAR blockchain, we use a [JSON RPC 2.0 interface](/docs/api/rpc). This interface is used by `near-api-js` to call on two types of methods; `view` and `change`.

## `view` methods:

>View methods do not effect the blockchain state and use the RPC `query` method with a param of `request_type` : `call_function`.

[[ Click here ]](/docs/api/rpc#call-a-contract-function) to see an example of a `call_function` request.


## `change` methods:

>Alternatively, you can modify state on the blockchain by invoking a `change` method. To perform this RPC call, a [signed transaction](/docs/tutorials/create-transactions) is required. This can be done either synchronously using `broadcast_tx_commit` or asynchronously via `broadcast_tx_async`. 

[[ Click here ]](/docs/api/rpc#send-transaction-async) to see an example of a `broadcast_tx_async` request.

[[ Click here ]](/docs/api/rpc#send-transaction-await) to see an example of a `broadcast_tx_commit` request.

<blockquote class="info">

[See here](/docs/roles/developer/contracts/assemblyscript#view-and-change-functions) for more information about `view` and `change` methods.

</blockquote>
