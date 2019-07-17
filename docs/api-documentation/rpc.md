# RPC

Standard JSON RPC 2.0 is used across the board.

The following methods are available:

## Status

`status` returns current status of the node: `http post http://127.0.0.1:3030/ jsonrpc=2.0 method=status params:="[]" id="dontcare"`

Result:

```JSON
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "chain_id": "test-chain-YNSoa",
        "rpc_addr": "0.0.0.0:3030",
        "sync_info": {
            "latest_block_hash": "2E7PfbFYG1BdGLNb4Vvd5PkQFoMPXCqgtCaeUtiQKCvJ",
            "latest_block_height": 789350,
            "latest_block_time": "2019-06-26T02:02:04.706330754Z",
            "latest_state_root": "5FEbgTkiYnXAwh14xqSAT7bBRzLWwj9Rp7Ch8Mawn1EL",
            "syncing": false
        },
        "validators": [
            "test.near"
        ]
    }
}
```

## Send transaction \(async\)

`broadcast_tx_async`: sends transaction and returns right away with the hash of the transaction in base64.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async params:="[<base64 of the SignedTransaction>]" id="dontcare"`

## Send transaction \(IN DEVELOPMENT\)

`broadcast_tx_commit`: sends transaction and returns only until transaction fully gets executed \(including receipts\). Has timeout of 5 \(by default\) seconds.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async params:="[<base64 of the SignedTransaction>]" id="dontcare"`

Result \(`FinalTransactionResult`\):

```JSON
TBD
```

## Query

`query(path: string, data: string)`: queries information in the state machine / database. Where `path` can be:

* `account/<account_id>` - returns view of account information, e.g. `{"amount": 1000000, "nonce": 102, "account_id": "test.near"}`
* `access_key/<account_id>` - returns all access keys for given account.
* `access_key/<account_id>/<public_key>` - returns details about access key for given account with this public key. If there is no such access key, returns nothing.
* `contract/<account_id>` - returns full state of the contract \(might be expensive if contract has large state\).
* `call/<account_id>/<method name>` - calls `<method name>` in contract `<account_id>` as view function with `data` as parameters.

And `data` is base58 encoding of the bytes that must be passed.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=query params:='["account/test.near", ""]' id="dontcare"`

```JSON
{
    "id": "dont",
    "jsonrpc": "2.0",
    "result": {
        "account_id": "test.near",
        "amount": "38C95D0217000",
        "code_hash": "11111111111111111111111111111111",
        "nonce": 1,
        "public_keys": [
            [...]
        ],
        "stake": "2FAF080"
    }
}
```

## Block

`block(height: u64)`: returns block for given height. If there was re-org, this may differ.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=block params:="[1000]" id="dontcare"`

```JSON
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "header": {
            "approval_mask": [],
            "approval_sigs": [],
            "hash": [...],
            "height": 1000,
            "prev_hash": [...],
            "prev_state_root": [...],
            "signature": [...],
            "timestamp": 1558593531626085000,
            "total_weight": {
                "num": 1000
            },
            "tx_root": [...]
        },
        "transactions": []
    }
}
```

## Transaction Status

`tx(hash: bytes)`: queries status of the transaction by hash, returns FinalTransactionResult that includes status, logs and result: `{"status": "Completed", "logs": [{"hash": "<hash>", "lines": [], "receipts": [], "result": null}]}`.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=tx params:=["<base 58 of transaction hash>"] id=dontcare`