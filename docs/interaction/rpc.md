---
id: rpc
title: API
sidebar_label: API
---

Standard JSON RPC 2.0 is used across the board.

Notes:

- all methods are HTTP `POST`
- endpoint URL varies by network
  - for TestNet use `https://rpc.nearprotocol.com`
  - for Staging use `https://rpc.betanet.nearprotocol.com` _(may be unstable)_

You can see this interface defined in `nearcore` [here](https://github.com/nearprotocol/nearcore/blob/master/chain/jsonrpc/client/src/lib.rs#L185)

<blockquote class="info">
<strong>note</strong><br><br>

The commands mentioned on this page beginning with `http` are using the tool [HTTPie](https://httpie.org/doc#installation).
Please install it in order to copy/paste those commands.

</blockquote>

## Status

`status`

Returns current status of the node

- method `query(path: string, data: string)`
- params *none*

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=status params:='[]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "chain_id": "testnet",
    "rpc_addr": "0.0.0.0:8080",
    "sync_info": {
      "latest_block_hash": "En24v7abQGFMRAeqmA7742z9QUN1ZGvgPyD3BsVpj5fp",
      "latest_block_height": 289032,
      "latest_block_time": "2020-01-23T15:11:41.594468356Z",
      "latest_state_root": "8tJ13zjE6ZRj3CwBdAgbv7fH3Nr4SPaoYygNbqKCReMa",
      "syncing": false
    },
    "validators": [
      {
        "account_id": "far",
        "is_slashed": false
      }
    ],
    "version": {
      "build": "1a0ea717-modified",
      "version": "0.4.12"
    }
  }
}
```

## Send transaction (async)

`broadcast_tx_async(signed_transaction: string)`

Sends transaction and returns right away with the hash of the transaction in base58.

- method `broadcast_tx_async`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=broadcast_tx_async params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

```json
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": "2i33XJFr6CVhynRXWVtYs9CxaufkKPQMGEYjUgerUyHw"
}
```

The value of `result` is the transaction hash and can be [viewed in NEAR Explorer](https://explorer.nearprotocol.com/transactions/2i33XJFr6CVhynRXWVtYs9CxaufkKPQMGEYjUgerUyHw)



## Send Transaction (wait until done)

`broadcast_tx_commit(signed_transaction: string)`

Sends transaction and returns only until transaction fully gets executed (including receipts). Has timeout of 10 seconds.

- method `broadcast_tx_commit`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post http://rpc.nearprotocol.com jsonrpc=2.0 method=broadcast_tx_commit params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

*note: this was tested using NEAR shell*

```bash
near call dev-jdvw47f9j setResponse --args '{"apiResponse": "hello"}' --accountId ajax
```

```json
{
  "receipts_outcome": [
    {
      "block_hash": "8xr1UHftKtth1HErsJ5SEHBgVpbHqyWHQVWeXnT78RfV",
      "id": "Aei6qE1jXnoXA81WvDk69kc8HfPV8kZTRgte38nHV6j8",
      "outcome": {
        "gas_burnt": 2389161082329,
        "logs": [
          "Writing the string [ hello ] to the blockchain ..."
        ],
        "receipt_ids": [
          "Gus1JVoJgBaccBtzHApDs22k6A5CZ8vEgRWHmEhVfQCs"
        ],
        "status": {
          "SuccessValue": ""
        }
      },
      "proof": []
    },
    {
      "block_hash": "11111111111111111111111111111111",
      "id": "Gus1JVoJgBaccBtzHApDs22k6A5CZ8vEgRWHmEhVfQCs",
      "outcome": {
        "gas_burnt": 0,
        "logs": [],
        "receipt_ids": [],
        "status": "Unknown"
      },
      "proof": []
    }
  ],
  "status": {
    "SuccessValue": ""
  },
  "transaction": {
    "actions": [
      {
        "FunctionCall": {
          "args": "eyJhcGlSZXNwb25zZSI6ImhlbGxvIn0=",
          "deposit": "0",
          "gas": 100000000000000,
          "method_name": "setResponse"
        }
      }
    ],
    "hash": "7RnMJsHMVMUbArUdKcMaSBPPomjLzQxzhsuvwP3FXGyi",
    "nonce": 5,
    "public_key": "ed25519:4dYj4upxVxeaiQtV1EB5NvUjuK2axytiAaChr6xNCSgp",
    "receiver_id": "dev-jdvw47f9j",
    "signature": "ed25519:3UrQcvvjuGSWM2w5sQ5GNZYBVWxRMjFbFp1cPg59Qg1rL4PtWMi5s7HY7cgSdx5PB17aqX1nrjiUiK7xxxtBeu6M",
    "signer_id": "ajax"
  },
  "transaction_outcome": {
    "block_hash": "A7NDYejEMJ5RNTdcVuoYDTezruYSh8QKPrVK4TkcUnqy",
    "id": "7RnMJsHMVMUbArUdKcMaSBPPomjLzQxzhsuvwP3FXGyi",
    "outcome": {
      "gas_burnt": 2291572068402,
      "logs": [],
      "receipt_ids": [
        "Aei6qE1jXnoXA81WvDk69kc8HfPV8kZTRgte38nHV6j8"
      ],
      "status": {
        "SuccessReceiptId": "Aei6qE1jXnoXA81WvDk69kc8HfPV8kZTRgte38nHV6j8"
      }
    },
    "proof": []
  }
}
```

## Query

`query({ request_type: string, finality: string, ...})`

`query({ request_type: string, block_id: string | integer, ...})`

Learn more about the common identifiers [here](../api/rpc-params).

Using `request_type` parameter you can query various information:

### `view_account`

Returns view of account information.

It requires extra arguments passed along within the query:
  * `account_id` (string)
  
#### Example

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "near.test"
  }'
```

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "amount": "10000000999999952626000000",
    "locked": "0",
    "code_hash": "11111111111111111111111111111111",
    "storage_usage": 387,
    "storage_paid_at": 0,
    "block_height": 1498598,
    "block_hash": "BS7nPrqSqhVYGmgeGGcD86KPQh5s68LQP1BtJvQjJ4dY"
  }
}
```

### `view_state`

Returns full state of the contract (might be expensive if contract has large state).

It requires extra arguments passed along within the query:
* `account_id` (string)
* `prefix_base64` (base64-encoded string)
  
#### Example

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_state",
    "finality": "final",
    "account_id": "test",
    "prefix_base64": "U1RBVEU="
  }'
```

NOTE: `U1RBVEU=` is base64-encoded value of the string "`STATE`".

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "values": [
      {
        "key": "U1RBVEU=",
        "value": "CQAAAAAAAAAAAAAAaQMAAAAAAAAACQAAAAAAAAAAAAAAawMAAAAAAAAACQAAAAAAAAAAAAAAdg==",
        "proof": []
      }
    ],
    "proof": [],
    "block_height": 1497113,
    "block_hash": "9WRcRRPPe1TnGbwgKnMgHFHw2LbscWJmT18bQhcG76NV"
  }
}
```

### `view_access_key`

Returns details about access key for given account with this public key. If there is no such access key, returns nothing.

It requires extra arguments passed along within the query:
* `account_id` (string)
* `public_key` (string)
  
#### Example

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "near.test",
    "public_key": "ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL"
  }'
```

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "nonce": 0,
    "permission": {
      "FunctionCall": {
        "allowance": "100000000",
        "receiver_id": "studio-d4zxn4xdu",
        "method_names": []
      }
    },
    "block_height": 1499389,
    "block_hash": "8XE2jKwBdfnSj2B7zoQB2GKWCYKdf4HhZRzeaXXqtdDD"
  }
}
```


### `view_access_key_list`

Returns all access keys for given account.

It requires extra arguments passed along within the query:
* `account_id` (string)
  
#### Example

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "near.test"
  }'
```

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "keys": [
      {
        "public_key": "ed25519:4Ynh6YmogjUYc5V9VqtQ1pRnZ4KuJSAJdkuj9hLj4a2p",
        "access_key": {
          "nonce": 1,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL",
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "100000000",
              "receiver_id": "studio-d4zxn4xdu",
              "method_names": []
            }
          }
        }
      }
    ],
    "block_height": 1499214,
    "block_hash": "9pco3yy126LpgeM2EoFxuuGMcLTepehjwmtBSWS4q8t8"
  }
}

```

### `call_function`

Calls `method_name` in contract `account_id` as [view function](../../developer/contracts/assemblyscript#view-and-change-functions) with data as parameters.
  
It requires extra arguments passed along within the query:
* `account_id` (string)
* `method_name` (string)
* `args_base64` (base64-encoded string)
  
#### Example

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }'
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

`args_base64` is a base64-encoded data representing input arguments to the contract. `near-sdk-rs` and `near-sdk-as` use JSON object with named arguments by default, so `e30=` is the base64-encoded string of `{}` (empty JSON object).
</blockquote>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "result": [
      48
    ],
    "logs": [],
    "block_height": 1504272,
    "block_hash": "4MkU8Xy82kD875NwXo7gh5wrRbpLrE5gbJ38JHtpp7m1"
  },
  "id": "dontcare"
}
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

`[48]` is an array of bytes, to be specific it is an ASCII code of `0`, `near-sdk-rs` and `near-sdk-as` return a JSON-serialized results.
</blockquote>


## Deprecated version of `query` method

<details>
<summary>See more</summary>
<p>

`query(path: string, data: string)`

Queries information in the state machine / database. Where `path` can be:

- method `query`
- params *(various)*

### `account/<account_id>`

Returns view of account information

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query params:='["account/near.test", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "amount": "10000000999999952626000000",
    "block_height": 287825,
    "code_hash": "11111111111111111111111111111111",
    "locked": "0",
    "storage_paid_at": 0,
    "storage_usage": 387
  }
}
```

### `access_key/<account_id>`

Returns all access keys for given account.

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_height": 287952,
    "keys": [
      {
        "access_key": {
          "nonce": 1,
          "permission": "FullAccess"
        },
        "public_key": "ed25519:4Ynh6YmogjUYc5V9VqtQ1pRnZ4KuJSAJdkuj9hLj4a2p"
      },
      {
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "100000000",
              "method_names": [],
              "receiver_id": "dev-d4zxn4xdu"
            }
          }
        },
        "public_key": "ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL"
      },
      {
        "access_key": {
          "nonce": 1,
          "permission": "FullAccess"
        },
        "public_key": "ed25519:HzkMAfXsiw2iJ55moB5n2TXNYZFTv1fafWgySUWgE3VQ"
      }
    ]
  }
}
```


### `access_key/<account_id>/<public_key>`

Returns details about access key for given account with this public key. If there is no such access key, returns nothing.


**`FullAccess` key**

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test/ed25519:4Ynh6YmogjUYc5V9VqtQ1pRnZ4KuJSAJdkuj9hLj4a2p", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_height": 288274,
    "nonce": 1,
    "permission": "FullAccess"
  }
}
```

**`FunctionCall` access key**

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test/ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_height": 288293,
    "nonce": 0,
    "permission": {
      "FunctionCall": {
        "allowance": "100000000",
        "method_names": [],
        "receiver_id": "dev-d4zxn4xdu"
      }
    }
  }
}
```

### `contract/<account_id>`

Returns full state of the contract (might be expensive if contract has large state).

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 method=query params:='["contract/my_token", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_height": 2057,
    "values": [
      {
        "key": "U1RBVEU=",
        "value": "AgAAAGFpAQAAAAAAAAACAAAAYWsBAAAAAAAAAAIAAABhdqCGAQAAAAAAAAAAAAAAAAA="
      },
      {
        "key": "YWkMAAAAbXlfdmFsaWRhdG9y",
        "value": "AAAAAAAAAAA="
      },
      {
        "key": "YWsAAAAAAAAAAA==",
        "value": "DAAAAG15X3ZhbGlkYXRvcg=="
      },
      {
        "key": "YXYAAAAAAAAAAA==",
        "value": "oIYBAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      }
    ]
  }
}
```

The second input parameter is base58-encoded state key prefix.

It is worth noting that the new API [nearprotocol/docs#184](https://github.com/nearprotocol/docs/issues/184) uses base64-encoded values. The output keys and values are encoded with base64 (the output is the same for current and the new APIs).

### `call/<account_id>/<method_name>`

Calls `<method name>` in contract `<account_id>` as view function with `data` as parameters.

Note: the second parameter is a JSON string encoded with base58 (NOT base64):

```bash
http post https://rpc.nearprotocol.com/ jsonrpc=2.0 method=query params:='["call/dev-heptm2q29/whoSaidHi","AQ4"]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_height": 1388549,
    "logs": [],
    "result": "ImZyb2wubmVhciI="
  }
}
```

`AQ4` is `{}` (empty JSON object) in base58 encoding. The output result is an array of bytes (numbers) of JSON.

`ImZyb2wubmVhciI=` is a JSON string `"frol.near"` (with quotes) in base64 encoding.
</p>
</details>

## Block

`block(block_height: u64 | block_hash: string)`

Queries network and returns block for given height. If there was re-org, this may differ.

- method `block`
- params
  - (1) `<block height as integer>` (see [NEAR Explorer](https://explorer.nearprotocol.com) for a valid block height)

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=block params:='[1000]' id=dontcare
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "chunks": [
      {
        "balance_burnt": "0",
        "chunk_hash": "J61x78wgagQ9evm5tocRj33TSuuxHFrZzyD8drR8o9Lq",
        "encoded_length": 8,
        "encoded_merkle_root": "D7vyy5n5oKyZUBEWbj4VdyRktH4ZzBx1JnDMDaS8sDAG",
        "gas_limit": 1000000000000000,
        "gas_used": 0,
        "height_created": 1000,
        "height_included": 1000,
        "outcome_root": "11111111111111111111111111111111",
        "outgoing_receipts_root": "6m2bJP9TiEtxqHSzLygPCQqiGdgYQQYaSYTFeP2gEUQj",
        "prev_block_hash": "7XkFdjUSXXCGdgoZbpdM5DehXSh7uAu7eXeMdVBxRU2L",
        "prev_state_root": "582a9JD8Ts8vMKqJSsLRmvdEm9FyLYrx1Ssujc5hSkL9",
        "rent_paid": "0",
        "shard_id": 0,
        "signature": "ed25519:3rQsYzWqRfAhqADMcH2JLPPsubHcBp3yBJNeHexAZDGrStb72rNb6vL2JctZkqyFwHxmLvaEMwaowtthmmu3Y64k",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      /* ... continued for each chunk ... */
    ],
    "header": {
      "approvals": [
        [
          "far",
          "7XkFdjUSXXCGdgoZbpdM5DehXSh7uAu7eXeMdVBxRU2L",
          "3rURN1sFxUwQVzWpnPyrMjxZftd4QMj54RTDs1Lin3MC",
          "ed25519:5dxfFjqaJsWVPuH9gXWJtYdeMpBVcKcYfbH8RPFGvvX6vq9h3uv4CrwvmaDUgXv2wmLEsEANPGq4b2KJR5uiuuVk"
        ]
      ],
      "challenges_result": [],
      "challenges_root": "11111111111111111111111111111111",
      "chunk_headers_root": "9zcPf9kndKeHuNptPn6KPamaW3AfikmcrVp57uH4Y6x5",
      "chunk_mask": [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      ],
      "chunk_receipts_root": "CNktChEct984axKmREForA86DmHfRRaKr55urUqA9Nfq",
      "chunk_tx_root": "7ADhq2WENoYFqd7SPga7n8hS1juBNJJJgJYoy7czSaEc",
      "chunks_included": 8,
      "epoch_id": "3rURN1sFxUwQVzWpnPyrMjxZftd4QMj54RTDs1Lin3MC",
      "gas_price": "100",
      "hash": "BQLidbFoQf62MQBGURokMEy6U1pSvNWio3ANBKKVU5hu",
      "height": 1000,
      "last_quorum_pre_commit": "B58SjfZ86mrw61Rcvg76uZNQZCdfPudzyYmCRF15ehFz",
      "last_quorum_pre_vote": "7XkFdjUSXXCGdgoZbpdM5DehXSh7uAu7eXeMdVBxRU2L",
      "next_bp_hash": "HnXfTqBzxQzYEJptuQBnjRfJ8WpkdNPKFVfJDc7A2SUx",
      "next_epoch_id": "79mKZobxgrugozxmcu5399QFwSsqHBPzaDziLAWERtyq",
      "outcome_root": "7ADhq2WENoYFqd7SPga7n8hS1juBNJJJgJYoy7czSaEc",
      "prev_hash": "7XkFdjUSXXCGdgoZbpdM5DehXSh7uAu7eXeMdVBxRU2L",
      "prev_state_root": "FDCj1SaJ9YaAMVYfoPuFNTS17bP4eY5vXtH1qZzQFqvt",
      "rent_paid": "0",
      "score": "19591494011875585000000000",
      "signature": "ed25519:3puQQENzDsPgg6oV89f5QH7U84ziMrDFKxv3xNSfdsZrAmTTPee2KWWsE39Rjd2KWHpGHEyJ76gkHjMw5THKuBXJ",
      "timestamp": 1579220301061391600,
      "total_supply": "1638150454593810427394246",
      "total_weight": "19591495037209980000000000",
      "validator_proposals": [],
      "validator_reward": "0"
    }
  },
  "id": "dontcare"
}
```

## Chunk

`chunk(chunk_hash: string)`

Queries for details of a specific chunk appending details of receipts and transactions to the same chunk data provided by `block()`

- method `chunk`
- params
  - (1) `<base 58 chunk hash>` (see [status page](https://rpc.nearprotocol.com/status) for a valid `latest_block_hash` then use this to retrieve any `chunk_hash` from the returned collection of `result.chunks`)

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=chunk params:='["9tHJjVZ9CikzNax8i6fKE3rDDQHKXBuXp4pR7M879nxS"]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "header": {
      "balance_burnt": "0",
      "chunk_hash": "31d9LCJrwXZ4hWuPrPeKbHaFMwSnJPrmm7Tt2MWaAcQx",
      "encoded_length": 235,
      "encoded_merkle_root": "CoCmpsJ4AteJDA2kTNfhLNVBx7PLhf4yc1bbCszzjZw",
      "gas_limit": 1000000000000000,
      "gas_used": 0,
      "height_created": 789406,
      "height_included": 0,
      "outcome_root": "11111111111111111111111111111111",
      "outgoing_receipts_root": "6m2bJP9TiEtxqHSzLygPCQqiGdgYQQYaSYTFeP2gEUQj",
      "prev_block_hash": "4sm53hoomwPSyp2sjoUXtjryiH2BcKpXWXyLKcj2uYsQ",
      "prev_state_root": "2p1FppanS4h3Hyff8hbC6pYLCTtBZwuhSM4mdSY2K4LM",
      "rent_paid": "0",
      "shard_id": 0,
      "signature": "ed25519:96CQeZ9VDmfmLMWLoGQ5NxZ6UaGAwjy8sDiXXxQybAMhUnmf6q6D3TdMW1Gndn8VAtNyV4v9gCuAcDpMJEi2tbQ",
      "tx_root": "7xQr3bwtiF7DmuZAWmxnn7Suqexwj7U2BJ8gknmB4vm8",
      "validator_proposals": [],
      "validator_reward": "0"
    },
    "receipts": [],
    "transactions": [
      {
        "actions": [
          {
            "FunctionCall": {
              "args": "eyJjb2xvciI6MTA3fQ==",
              "deposit": "0",
              "gas": 2000000000000,
              "method_name": "changeColor"
            }
          }
        ],
        "hash": "AtvAvhYNV8vLCBCzFwJSY7q7dEeFHD7sv4zrvyLAbRkv",
        "nonce": 2,
        "public_key": "ed25519:7x6Dxh6VmWDaDhKzuxrU6XZve9SsnMUbC628DtKG22WS",
        "receiver_id": "mikedotdmg",
        "signature": "ed25519:2pxR9DNN8cqk1FuN8s6iB38Rz3hLDrhDsDuFkGgDA73YVtPPg4zGLJteqap1kXTC77pBoWumawLxAnWBKrSmSVGi",
        "signer_id": "mikedotdmg"
      }
    ]
  }
}
```


## Transaction Status

`tx(transaction_hash: string, sender_id: string)`

Queries status of a transaction by hash and returns `FinalTransactionResult`.

- method `tx`
- params
  - (1) `<base 58 of transaction hash>` (see [NEAR Explorer](https://explorer.nearprotocol.com) for a valid transaction hash)
  - (2) `<sender account id>` used to determine which shard to look for transaction

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=tx params:='["CqiBnYCRgkGV2odJPXJTBkoZHXjDNQFJKw7oRYWU1j6g", ""]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "receipts_outcome": [
      {
        "block_hash": "52yXcXjL6gR2HV5c5bXdv3FE7uGgcXdCaipq9MQo9kUx",
        "id": "Cj9eqPrvh9oCAUi6hRxiQjJzsEAa7bQnja3q5U6bX5yC",
        "outcome": {
          "gas_burnt": 924119500000,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          }
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "8SxoArHHF3ko3RvigCxCHGLtbWg9XiQawQEGraMAZ3yy"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "actions": [
        {
          "AddKey": {
            "access_key": {
              "nonce": 0,
              "permission": "FullAccess"
            },
            "public_key": "ed25519:9y5RuRL7YaGKxsbZynHQjVktVVMCk4fMNywkTYiqdnPz"
          }
        }
      ],
      "hash": "CqiBnYCRgkGV2odJPXJTBkoZHXjDNQFJKw7oRYWU1j6g",
      "nonce": 1,
      "public_key": "ed25519:8xNjM142ibwb79JvY7u6grXFEtEgeaohez1HmoAwC7xT",
      "receiver_id": "david_sanford80wirethingsnet",
      "signature": "ed25519:4e3aAi93Fdk4GEnzFTddhnFwHzN8rrSXbkS9sJfbpnn5MJSLFVp8TF2TjQcWXQmtY5Mb9EPJ1KdV91h1UJ2zg5Ld",
      "signer_id": "david_sanford80wirethingsnet"
    },
    "transaction_outcome": {
      "block_hash": "52yXcXjL6gR2HV5c5bXdv3FE7uGgcXdCaipq9MQo9kUx",
      "id": "CqiBnYCRgkGV2odJPXJTBkoZHXjDNQFJKw7oRYWU1j6g",
      "outcome": {
        "gas_burnt": 924119500000,
        "logs": [],
        "receipt_ids": [
          "Cj9eqPrvh9oCAUi6hRxiQjJzsEAa7bQnja3q5U6bX5yC"
        ],
        "status": {
          "SuccessReceiptId": "Cj9eqPrvh9oCAUi6hRxiQjJzsEAa7bQnja3q5U6bX5yC"
        }
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "81vrGGwyr15GvPkhMeV3NcHZLRy6T2z86JQyeyZPe87r"
        }
      ]
    }
  }
}
```

## Validators

`validators(block_hash: string)`

Queries for active validators on the network and returns details about them and the current state of validation on the blockchain

- method `validators`
- params
  - (1) `<base 58 block hash>` (see [status page](https://rpc.nearprotocol.com/status) for a valid `latest_block_hash` or pass `null` for latest)


### On TestNet

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=validators params:='["8ehA3NYL5uSF8zefbnqnz66twYJ45rfst6SrqBNv7oka"]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "current_fishermen": [],
    "current_proposals": [],
    "current_validators": [
      {
        "account_id": "far",
        "is_slashed": false,
        "num_missing_blocks": 0,
        "stake": "200663637577332478904026936259"
      }
    ],
    "next_fishermen": [],
    "next_validators": [
      {
        "account_id": "far",
        "amount": "200665040940372677611389132209",
        "public_key": "ed25519:7rNEmDbkn8grQREdTt3PWhR1phNtsqJdgfV26XdR35QL"
      }
    ]
  }
}
```

### On Staging

*coming soon (see staging)...* (see [`nearcore` PR 1962](https://github.com/nearprotocol/nearcore/pull/1962))

You can get the `latest_block_hash` on staging from https://rpc.betanet.nearprotocol.com/status or just pass `null` as a parameter for the most recent block hash instead

```bash
http post https://rpc.betanet.nearprotocol.com jsonrpc=2.0 method=validators params:='[null]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "current_fishermen": [],
    "current_proposals": [],
    "current_validators": [
      {
        "account_id": "far",
        "is_slashed": false,
        "num_expected_blocks": 330,
        "num_produced_blocks": 330,
        "public_key": "ed25519:7rNEmDbkn8grQREdTt3PWhR1phNtsqJdgfV26XdR35QL",
        "shards": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "stake": "200004186292589888646450791793915395"
      }
    ],
    "next_fishermen": [],
    "next_validators": [
      {
        "account_id": "far",
        "public_key": "ed25519:7rNEmDbkn8grQREdTt3PWhR1phNtsqJdgfV26XdR35QL",
        "shards": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "stake": "200004229452627983713359803935223094"
      }
    ]
  }
}
```


## Gas Price

`gas_price(null | block_height: u64 | block_hash: string)`

Queries for gas price using `null` (for latest) as well as a specific `block_height` or `block_hash`.

- method `gas_price`
- params
  - (1) (see [status page](https://rpc.nearprotocol.com/status) for a valid `latest_block_hash` or use `null` for latest)

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=gas_price params:='["8ehA3NYL5uSF8zefbnqnz66twYJ45rfst6SrqBNv7oka"]' id=dontcare
```

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "gas_price": "5000"
  }
}
```
