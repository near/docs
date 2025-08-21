---
id: errors
title: RPC Errors
description: "Understand common RPC errors and how to handle them."
---

Understand common RPC errors and how to handle them.

## What Could Go Wrong?

When API request fails, RPC server returns a structured error response with a
limited number of well-defined error variants, so client code can exhaustively
handle all the possible error cases. Our JSON-RPC errors follow
[verror](https://github.com/joyent/node-verror) convention for structuring
the error response:

```json
{
  "error": {
    "name": <ERROR_TYPE>,
    "cause": {
      "info": {..},
      "name": <ERROR_CAUSE>
    },
    "code": -32000,
    "data": String,
    "message": "Server error"
  },
  "id": "dontcare",
  "jsonrpc": "2.0"
}
```

> **Heads up**
>
> The fields `code`, `data`, and `message` in the structure above are considered
> legacy ones and might be deprecated in the future. Please, don't rely on them.

Here is the exhaustive list of the error variants that can be returned, organized by HTTP status code:

## 200 - Successful Response with Error Data

These errors occur when the request was processed successfully but the requested data could not be retrieved or an operation could not be completed due to various blockchain-related conditions.

**ERROR_TYPE:** `HANDLER_ERROR`

### General Errors

These are general errors that can occur across different API endpoints.

| ERROR_CAUSE       | Reason                                                                                                                         | Solution                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UNKNOWN_BLOCK     | The requested block has not been produced yet or it has been garbage-collected (cleaned up to save space on the RPC node)      | • Check that the requested block is legit <br/>• If the block had been produced more than 5 epochs ago, try to send your request to [an archival node](https://near-nodes.io/intro/node-types#archival-node) |
| INVALID_ACCOUNT   | The requested `account_id` is invalid                                                                                          | • Provide a valid `account_id`                                                                                                                                                                               |
| UNKNOWN_ACCOUNT   | The requested `account_id` has not been found while viewing since the account has not been created or has been already deleted | • Check the `account_id` <br/>• Specify a different block or retry if you request the latest state                                                                                                           |
| UNAVAILABLE_SHARD | The node was unable to found the requested data because it does not track the shard where data is present                      | • Send a request to a different node which might track the shard                                                                                                                                             |
| NO_SYNCED_BLOCKS  | The node is still syncing and the requested block is not in the database yet                                                   | • Wait until the node finish syncing <br/>• Send a request to a different node which is synced                                                                                                               |
| NOT_SYNCED_YET    | The node is still syncing and the requested block is not in the database yet                                                   | • Wait until the node finish syncing <br/>• Send a request to a different node which is                                                                                                                      |

### Access Keys

Errors specific to [Access Keys API](/api/rpc/access-keys).

| ERROR_CAUSE        | Reason                                                                                                                            | Solution                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| UNKNOWN_ACCESS_KEY | The requested `public_key` has not been found while viewing since the public key has not been created or has been already deleted | • Check the `public_key` <br/>• Specify a different block or retry if you request the latest state |

### Accounts / Contracts

Errors specific to [Accounts / Contracts API](/api/rpc/contracts).

| ERROR_CAUSE              | Reason                                                                                                            | Solution                                                                                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NO_CONTRACT_CODE         | The account does not have any `contract` deployed on it                                                           | • Use different account <br/>• Specify a different block or retry if you request the latest state                                                                 |
| TOO_LARGE_CONTRACT_STATE | The requested contract state is too large to be returned from this node (the default limit is 50kb of state size) | • Send the request to a node with larger limits in order to view the requested state <br/>• Spin up your own node where you can increase the limits to view state |
| CONTRACT_EXECUTION_ERROR | The execution of the view function call failed (crashed, run out of the default 200 TGas limit, etc)              | • Check `error.cause.info` for more details                                                                                                                       |

### Block / Chunk

Errors specific to [Block / Chunk API](/api/rpc/block-chunk).

| ERROR_CAUSE      | Reason                                                             | Solution                                                               |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| UNKNOWN_CHUNK    | The requested chunk is not available or has been garbage-collected | • Check chunk ID validity <br/>• Try an archival node for older chunks |
| INVALID_SHARD_ID | The provided shard ID is invalid or doesn't exist                  | • Provide a valid shard ID within the network's shard range            |

### Network

Errors specific to [Network API](/api/rpc/network).

| ERROR_CAUSE   | Reason                                                       | Solution                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNKNOWN_EPOCH | An epoch for the provided block can't be found in a database | • Check that the requested block is legit <br/>• If the block had been produced more than 5 epochs ago, try to send your request to an archival node <br/>•Check that the requested block is the last block of some epoch |

### Transactions

Errors specific to [Transactions API](/api/rpc/transactions).

| ERROR_CAUSE         | Reason                                                                 | Solution                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INVALID_TRANSACTION | An error happened during transaction execution                         | • See `error.cause.info` for details, likely a field in the transaction was invalid <br/>•If `error.cause.info` is `ShardCongested`, resubmit the identical transaction after a delay. (Consider adding a priority fee once [NEP-541](https://github.com/near/NEPs/pull/541) is released.) <br/>• If `error.cause.info` is `ShardStuck`, you may also resubmit the identical transaction after a delay |
| UNKNOWN_RECEIPT     | The receipt with the given `receipt_id` was never observed on the node | • Check the provided `receipt_id` is correct <br/>• Send a request on a different node                                                                                                                                                                                                                                                                                                                 |

## 400 - Bad Request

These errors indicate that the request was malformed or contains invalid parameters that prevent the server from processing it.

**ERROR_TYPE:** `REQUEST_VALIDATION_ERROR`

| ERROR_CAUSE | Reason                                                                                      | Solution                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| PARSE_ERROR | Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.) | • Check the arguments passed and pass the correct ones <br/>• Check `error.cause.info` for more details |

## 408 - Request Timeout

These errors occur when a request takes too long to process and times out before completion.

**ERROR_TYPE:** `REQUEST_VALIDATION_ERROR`

### Transaction Timeouts

Errors specific to [Transactions API](/api/rpc/transactions) that occur due to timeout conditions.

| ERROR_CAUSE   | Reason                                                                    | Solution                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TIMEOUT_ERROR | Transaction was routed, but has not been recorded on chain in 10 seconds. | • Resubmit the request with the identical transaction (in NEAR Protocol unique transactions apply exactly once, so if the previously sent transaction gets applied, this request will just return the known result, otherwise, it will route the transaction to the chain once again) <br/>• Check that your transaction is valid <br/>• Check that the signer account id has enough tokens to cover the transaction fees (keep in mind that some tokens on each account are locked to cover the storage cost) |

## 500 - Internal Server Error

These errors indicate that something went wrong on the server side, typically due to internal issues or server overload.

**ERROR_TYPE:** `INTERNAL_ERROR`

| ERROR_CAUSE    | Reason                                                  | Solution                                                                                                     |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| INTERNAL_ERROR | Something went wrong with the node itself or overloaded | • Try again later <br/>• Send a request to a different node <br/>• Check `error.cause.info` for more details |
