# RPC

Standard JSON RPC 2.0 is used across the board.

The following methods are available:

## Status

`status` returns current status of the node: `http post http://127.0.0.1:3030/ jsonrpc=2.0 method=status params:="[]" id="dontcare"`

Result:

```text
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

## Send transaction \(wait until done\)

`broadcast_tx_commit`: sends transaction and returns only until transaction fully gets executed \(including receipts\). Has timeout of 5 \(by default\) seconds.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_async params:="[<base64 of the SignedTransaction>]" id="dontcare"`

Result \(`FinalTransactionResult`\):

```text
TODO
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

```text
{
    "id": "dont",
    "jsonrpc": "2.0",
    "result": {
        "account_id": "test.near",
        "amount": "38C95D0217000",
        "code_hash": "11111111111111111111111111111111",
        "nonce": 1,
        "public_keys": [
            [
                87,
                28,
                188,
                168,
                229,
                99,
                248,
                98,
                172,
                50,
                5,
                116,
                12,
                91,
                162,
                44,
                93,
                39,
                164,
                254,
                160,
                225,
                139,
                177,
                45,
                169,
                170,
                26,
                60,
                16,
                68,
                105
            ]
        ],
        "stake": "2FAF080"
    }
}
```

## Block

`block(height: u64)`: returns block for given height. If there was re-org, this may differ.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=block params:="[1000]" id="dontcare"`

```text
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "header": {
            "approval_mask": [],
            "approval_sigs": [],
            "hash": [
                152,
                72,
                70,
                145,
                206,
                4,
                234,
                230,
                138,
                61,
                51,
                245,
                104,
                247,
                229,
                226,
                0,
                81,
                99,
                179,
                159,
                164,
                118,
                40,
                82,
                168,
                190,
                157,
                36,
                107,
                207,
                247
            ],
            "height": 1000,
            "prev_hash": [
                201,
                21,
                255,
                187,
                50,
                174,
                160,
                138,
                224,
                60,
                191,
                52,
                52,
                222,
                223,
                83,
                205,
                87,
                192,
                50,
                228,
                37,
                212,
                147,
                229,
                187,
                189,
                160,
                162,
                118,
                238,
                248
            ],
            "prev_state_root": [
                60,
                123,
                214,
                134,
                4,
                35,
                99,
                126,
                200,
                56,
                8,
                154,
                82,
                9,
                233,
                14,
                38,
                74,
                194,
                87,
                31,
                206,
                239,
                156,
                231,
                206,
                97,
                26,
                226,
                18,
                229,
                10
            ],
            "signature": [
                171,
                152,
                134,
                58,
                164,
                127,
                171,
                95,
                167,
                221,
                67,
                138,
                89,
                210,
                250,
                97,
                192,
                29,
                6,
                101,
                15,
                210,
                52,
                187,
                15,
                184,
                173,
                173,
                31,
                60,
                59,
                61,
                73,
                12,
                54,
                21,
                7,
                159,
                75,
                124,
                212,
                67,
                90,
                225,
                77,
                129,
                255,
                232,
                120,
                242,
                217,
                238,
                13,
                36,
                230,
                17,
                37,
                222,
                76,
                193,
                123,
                177,
                195,
                5
            ],
            "timestamp": 1558593531626085000,
            "total_weight": {
                "num": 1000
            },
            "tx_root": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        "transactions": []
    }
}
```

## Transaction Status

`tx(hash: bytes)`: queries status of the transaction by hash, returns FinalTransactionResult that includes status, logs and result: `{"status": "Completed", "logs": [{"hash": "<hash>", "lines": [], "receipts": [], "result": null}]}`.

`http post http://127.0.0.1:3030/ jsonrpc=2.0 method=tx params:=["<base 58 of transaction hash>"] id=dontcare`
