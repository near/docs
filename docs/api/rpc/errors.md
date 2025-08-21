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

| ERROR_CAUSE              | Reason                                                                                                                            | Solution                                                                                                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UNKNOWN_BLOCK            | The requested block has not been produced yet or it has been garbage-collected (cleaned up to save space on the RPC node)         | <ul><li>Check that the requested block is legit</li><li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank">an archival node</a></li></ul> |
| INVALID_ACCOUNT          | The requested `account_id` is invalid                                                                                             | <ul><li>Provide a valid `account_id`</li></ul>                                                                                                                                                                                                           |
| UNKNOWN_ACCOUNT          | The requested `account_id` has not been found while viewing since the account has not been created or has been already deleted    | <ul><li>Check the `account_id`</li><li>Specify a different block or retry if you request the latest state</li></ul>                                                                                                                                      |
| UNKNOWN_ACCESS_KEY       | The requested `public_key` has not been found while viewing since the public key has not been created or has been already deleted | <ul><li>Check the `public_key`</li><li>Specify a different block or retry if you request the latest state</li></ul>                                                                                                                                      |
| UNAVAILABLE_SHARD        | The node was unable to found the requested data because it does not track the shard where data is present                         | <ul><li>Send a request to a different node which might track the shard</li></ul>                                                                                                                                                                         |
| NO_SYNCED_BLOCKS         | The node is still syncing and the requested block is not in the database yet                                                      | <ul><li>Wait until the node finish syncing</li><li>Send a request to a different node which is synced</li></ul>                                                                                                                                          |
| NOT_SYNCED_YET           | The node is still syncing and hasn't reached the requested block                                                                  | <ul><li>Wait for the node to sync</li><li>Try a different synced node</li></ul>                                                                                                                                                                          |
| NO_CONTRACT_CODE         | The requested `contract_code` has not been found while viewing                                                                    | <ul><li>Check the `public_key`</li><li>Specify a different block or retry if you request the latest state</li></ul>                                                                                                                                                       |
| TOO_LARGE_CONTRACT_STATE | The contract state is too large to return in a single response                                                                    | <ul><li>Use pagination or request specific state keys</li><li>Consider using archival nodes for large state queries</li></ul>                                                                                                                            |
| CONTRACT_EXECUTION_ERROR | The execution of the view function call failed (crashed, run out of the default 200 TGas limit, etc)                              | <ul><li>Check `error.cause.info` for more details</li></ul>                                                                                                                                                                                              |
| UNKNOWN_CHUNK            | The requested chunk is not available or has been garbage-collected                                                                | <ul><li>Check chunk ID validity</li><li>Try an archival node for older chunks</li></ul>                                                                                                                                                                  |
| INVALID_SHARD_ID         | The provided shard ID is invalid or doesn't exist                                                                                 | <ul><li>Provide a valid shard ID within the network's shard range</li></ul>                                                                                                                                                                              |
| UNKNOWN_EPOCH            | The requested epoch information is not available                                                                                  | <ul><li>Check epoch ID validity</li><li>Try an archival node for historical epoch data</li></ul>                                                                                                                                                         |
| INVALID_TRANSACTION      | The transaction format or data is invalid                                                                                         | <ul><li>Verify transaction structure</li><li>Check all required fields are present and valid</li></ul>                                                                                                                                                   |

## 400 - Bad Request

These errors indicate that the request was malformed or contains invalid parameters that prevent the server from processing it.

**ERROR_TYPE:** `REQUEST_VALIDATION_ERROR`

| ERROR_CAUSE | Reason                                                                                      | Solution                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| PARSE_ERROR | Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.) | <ul><li>Check the arguments passed and pass the correct ones</li><li>Check `error.cause.info` for more details</li></ul> |

## 500 - Internal Server Error

These errors indicate that something went wrong on the server side, typically due to internal issues or server overload.

**ERROR_TYPE:** `INTERNAL_ERROR`

| ERROR_CAUSE    | Reason                                                  | Solution                                                                                                                       |
| -------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| INTERNAL_ERROR | Something went wrong with the node itself or overloaded | <ul><li>Try again later</li><li>Send a request to a different node</li><li>Check `error.cause.info` for more details</li></ul> |
