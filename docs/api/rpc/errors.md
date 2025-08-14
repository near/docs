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

Here is the exhaustive list of the error variants that can be returned:

| ERROR_TYPE (`error.name`) | ERROR_CAUSE (`error.cause.name`) | Status Code | Reason | Solution |
|---|---|---|---|---|
| HANDLER_ERROR | UNKNOWN_BLOCK | 200 | The requested block has not been produced yet or it has been garbage-collected (cleaned up to save space on the RPC node) | • Check that the requested block is legit • If the block had been produced more than 5 epochs ago, try to send your request to [an archival node](https://near-nodes.io/intro/node-types#archival-node) |
| HANDLER_ERROR | INVALID_ACCOUNT | 200 | The requested `account_id` is invalid | • Provide a valid `account_id` |
| HANDLER_ERROR | UNKNOWN_ACCOUNT | 200 | The requested `account_id` has not been found while viewing since the account has not been created or has been already deleted | • Check the `account_id` • Specify a different block or retry if you request the latest state |
| HANDLER_ERROR | UNKNOWN_ACCESS_KEY | 200 | The requested `public_key` has not been found while viewing since the public key has not been created or has been already deleted | • Check the `public_key` • Specify a different block or retry if you request the latest state |
| HANDLER_ERROR | UNAVAILABLE_SHARD | 200 | The node was unable to found the requested data because it does not track the shard where data is present | • Send a request to a different node which might track the shard |
| HANDLER_ERROR | NO_SYNCED_BLOCKS | 200 | The node is still syncing and the requested block is not in the database yet | • Wait until the node finish syncing • Send a request to a different node which is synced |
| REQUEST_VALIDATION_ERROR | PARSE_ERROR | 400 | Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.) | • Check the arguments passed and pass the correct ones • Check `error.cause.info` for more details |
| INTERNAL_ERROR | INTERNAL_ERROR | 500 | Something went wrong with the node itself or overloaded | • Try again later • Send a request to a different node • Check `error.cause.info` for more details |
