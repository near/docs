# RPC

Standard JSON RPC 2.0 is used across the board.

The following methods are available:

## Status

`status` returns current status of the node: `http post http://127.0.0.1:3030/ jsonrpc=2.0 method=status id=dontcare 'params:=[]'`

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
        },
        "validators": [
            {
                "account_id": "near",
                "is_slashed": false
            },
            {
                "account_id": "figment.test2",
                "is_slashed": false
            },
            {
                "account_id": "bowen",
                "is_slashed": false
            }
        ],
        "version": {
            "build": "ce95d67c",
            "version": "0.3.1"
        }
    }
}
```

## Send transaction \(async\)

`broadcast_tx_async`: sends transaction and returns right away with the hash of the transaction in base58.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async id=dontcare 'params:=["<base 58 of the SignedTransaction>"]'`

## Send transaction \(IN DEVELOPMENT\)

`broadcast_tx_commit`: sends transaction and returns only until transaction fully gets executed \(including receipts\). Has timeout of 5 \(?\) seconds.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async id=dontcare 'params:=["<base 58 of the SignedTransaction>"]'`

Result \(`FinalTransactionResult`\):

```javascript
TBD
```

## Query

`query(path: string, data: bytes)`: queries information in the state machine / database. Where `path` can be:

* `account/<account_id>` - returns view of account information.
* `access_key/<account_id>` - returns all access keys for given account.
* `access_key/<account_id>/<public_key>` - returns details about access key for given account with this public key. If there is no such access key, returns nothing.
* `contract/<account_id>` - returns full state of the contract \(might be expensive if contract has large state\).
* `call/<account_id>/<method name>` - calls `<method name>` in contract `<account_id>` as view function with `data` as parameters.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=query id=dontcare 'params:=["account/test.near", ""]'`

```javascript
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "amount": "1000000000000000011",
        "code_hash": "11111111111111111111111111111111",
        "staked": "0",
        "storage_paid_at": 0,
        "storage_usage": 182
    }
}
```

## Block

`block(height: u64)`: returns block for given height. If there was re-org, this may differ.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=block id=dontcare 'params:=[1000]'`

```javascript
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "header": {
            "approval_mask": [
                false,
                true
            ],
            "approval_sigs": [
                "ed25519:..."
            ],
            "epoch_hash": "...",
            "hash": "...",
            "height": 173592,
            "prev_hash": "...",
            "prev_state_root": "...",
            "signature": "ed25519:...",
            "timestamp": 1568047128577482804,
            "total_weight": 208940,
            "tx_root": "11111111111111111111111111111111",
            "validator_proposals": []
        },
        "transactions": [
            {
                "actions": [
                    "CreateAccount",
                    {
                        "Transfer": {
                            "deposit": "10000000000000000000"
                        }
                    },
                    {
                        "AddKey": {
                            "access_key": {
                                "nonce": 0,
                                "permission": "FullAccess"
                            },
                            "public_key": "ed25519:..."
                        }
                    }
                ],
                "hash": "...",
                "nonce": 110,
                "public_key": "ed25519:...",
                "receiver_id": "studio-n5ubb8npy",
                "signature": "ed25519:...",
                "signer_id": "test"
            }
        ]
    }
}
```

## Transaction Status

`tx(hash: bytes)`: queries status of the transaction by hash, returns FinalTransactionResult that includes status, logs and result: `{"status": "Completed", "logs": [{"hash": "<hash>", "lines": [], "receipts": [], "result": null}]}`

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=tx id=dontcare 'params:=["<base 58 of transaction hash>"]'`

```javascript
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "status": "Completed",
        "transactions": [
            {
                "hash": "2ZBygTrowP7MTeRQ8rXp8v84benMTaYbHhwFw5w85CTS",
                "result": {
                    "logs": [],
                    "receipts": [
                        "CdbagwttuZnTcjGT3R8Qs9fsv8GFuFeUtJVnVZeAjoop"
                    ],
                    "result": null,
                    "status": "Completed"
                }
            },
            {
                "hash": "CdbagwttuZnTcjGT3R8Qs9fsv8GFuFeUtJVnVZeAjoop",
                "result": {
                    "logs": [],
                    "receipts": [],
                    "result": "",
                    "status": "Completed"
                }
            }
        ]
    }
}
```
