---
id: rpc
title: RPC
sidebar_label: RPC
---

Standard JSON RPC 2.0 is used across the board.

The following methods are available:

## Status

`status` returns current status of the node: `http post http://127.0.0.1:3030/ jsonrpc=2.0 method=status params:="[]" id="dontcare"`

Result:

```javascript
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "chain_id": "test-chain-nmZGf",
        "rpc_addr": "0.0.0.0:3030",
        "sync_info": {
            "latest_block_hash": "ugvtXLvad6DMGIYOf/NpgHt2AWbnhooTH53kp2GwB+w=",
            "latest_block_height": 17034,
            "latest_block_time": "2019-05-26T04:50:11.150214Z",
            "latest_state_root": "PHvWhgQjY37IOAiaUgnpDiZKwlcfzu+c585hGuIS5Qo=",
            "syncing": false
        }
    }
}
```

## Send transaction \(async\)

`broadcast_tx_async`: sends transaction and returns right away with the hash of the transaction in base58.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async params:="[<base 58 of the SignedTransaction>]" id="dontcare"`

## Send Transaction (wait until done)

`broadcast_tx_commit`: sends transaction and returns only until transaction fully gets executed \(including receipts\). Has timeout of 5 \(?\) seconds.


RPC:
```
http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_commit params:="[<base 58 of the SignedTransaction>]" id="dontcare"
```

Result:
```
{"jsonrpc":"2.0","result":{"status":"Completed","transactions":[{"hash":"GLTdMcUAVT5DB6YEWABcMgASFuPGFMCbQkC8TcvZdby3","result":{"logs":[],"receipts":["8YrftHfvmDA4EAwf6BZe3d5TQd51joJW3JHpoj4iAUBF"],"result":null,"status":"Completed"}},{"hash":"8YrftHfvmDA4EAwf6BZe3d5TQd51joJW3JHpoj4iAUBF","result":{"logs":[],"receipts":[],"result":"","status":"Completed"}}]},"id":133}
```

## Query

`query(path: string, data: bytes)`: queries information in the state machine / database. Where `path` can be:

* `account/<account_id>` - returns view of account information, e.g. `{"amount": 1000000, "nonce": 102, "account_id": "test.near"}`
* `access_key/<account_id>` - returns all access keys for given account.
* `access_key/<account_id>/<public_key>` - returns details about access key for given account with this public key. If there is no such access key, returns nothing.
* `contract/<account_id>` - returns full state of the contract \(might be expensive if contract has large state\).
* `call/<account_id>/<method name>` - calls `<method name>` in contract `<account_id>` as view function with `data` as parameters.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=query params:="[\"account/test.near\",\"\"]" id="dontcare"`

```javascript
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "code": 0,
        "codespace": "",
        "height": 0,
        "index": -1,
        "info": "",
        "key": "YWNjb3VudC90ZXN0Lm5lYXI=",
        "log": "exists",
        "proof": [],
        "value": "eyJhY2NvdW50X2lkIjoidGVzdC5uZWFyIiwibm9uY2UiOjAsImFtb3VudCI6MTAwMDAwMDAwMDAwMCwic3Rha2UiOjUwMDAwMDAwLCJwdWJsaWNfa2V5cyI6W1sxNjIsMTIyLDE0MCwyMTksMTcyLDEwNSw4MCw3OCwxOTAsMTY1LDI1NSwxNDAsMTExLDQzLDIyLDE0OSwyMTEsMTUyLDIyNywyMjcsNjcsMjIyLDIzNCw3Nyw5NiwxNTYsNjYsMjMsMTcyLDk2LDc2LDEzN11dLCJjb2RlX2hhc2giOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBPSJ9"
    }
}
```

Where `value` is base58 encoded JSON of the account status: `'{"account_id":"test.near","nonce":0,"amount":1000000000000,"stake":50000000,"public_keys":[[...]],"code_hash":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="}'`

the `[...]` will  be replaced with a public key as an array.

Note, this is Tendermint-like compatibility, that should be refactored.

## Block

`block(height: u64)`: returns block for given height. If there was re-org, this may differ.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=block params:="[1000]" id="dontcare"`

```javascript
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

`tx(hash: bytes)`: queries status of the transaction by hash, returns FinalTransactionResult that includes status, logs and result: `{"status": "Completed", "logs": [{"hash": "<hash>", "lines": [], "receipts": [], "result": null}]}`

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=tx params:=["<base 58 of transaction hash>"] id=dontcare`

