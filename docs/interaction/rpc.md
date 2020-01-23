---
id: rpc
title: RPC
sidebar_label: RPC
---

Standard JSON RPC 2.0 is used across the board.

The following methods are available:

## Status

`status`

Returns current status of the node

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `query`
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

`broadcast_tx_async`

Sends transaction and returns right away with the hash of the transaction in base58.

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `broadcast_tx_async`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=broadcast_tx_async params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

## Send Transaction (wait until done)

`broadcast_tx_commit`

Sends transaction and returns only until transaction fully gets executed (including receipts). Has timeout of 10 seconds.

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `broadcast_tx_commit`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post http://127.0.0.1:3030/ jsonrpc=2.0 method=broadcast_tx_commit params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Completed",
    "transactions": [
      {
        "hash": "GLTdMcUAVT5DB6YEWABcMgASFuPGFMCbQkC8TcvZdby3",
        "result": {
          "logs": [],
          "receipts": [
            "8YrftHfvmDA4EAwf6BZe3d5TQd51joJW3JHpoj4iAUBF"
          ],
          "result": null,
          "status": "Completed"
        }
      },
      {
        "hash": "8YrftHfvmDA4EAwf6BZe3d5TQd51joJW3JHpoj4iAUBF",
        "result": {
          "logs": [],
          "receipts": [],
          "result": "",
          "status": "Completed"
        }
      }
    ]
  },
  "id": 133
}
```

## Query

`query(path: string, data: bytes)`

Queries information in the state machine / database. Where `path` can be:

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `query`
- params *(various)*

### `account/<account_id>`

Returns view of account information

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=query params:='["account/near.test", ""]' id=dontcare
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
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test", ""]' id=dontcare
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
              "receiver_id": "studio-d4zxn4xdu"
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
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test/ed25519:4Ynh6YmogjUYc5V9VqtQ1pRnZ4KuJSAJdkuj9hLj4a2p", ""]' id=dontcare
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
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=query params:='["access_key/near.test/ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL", ""]' id=dontcare
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
        "receiver_id": "studio-d4zxn4xdu"
      }
    }
  }
}
```

### `contract/<account_id>`

Returns full state of the contract (might be expensive if contract has large state).


### `call/<account_id>/<method name>`

Calls `<method name>` in contract `<account_id>` as view function with `data` as parameters.

## Block

`block(height: u64)`

Queries network and returns block for given height. If there was re-org, this may differ.

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
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

## Transaction Status Endpoint

`tx(txHash: string)`

Queries status of a transaction by hash and returns `FinalTransactionResult`.

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `tx`
- params
  - (1) `<base 58 of transaction hash>` (see [NEAR Explorer](https://explorer.nearprotocol.com) for a valid transaction hash)
  - (2) `<sender account id>` (ignored)

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

## Validators Endpoint

`validators(blockHash: string)`

Queries for active validators on the network and returns details about them and the current state of validation on the blockchain

- HTTP `POST`
- URL `https://rpc.nearprotocol.com`
- method `validators`
- params
  - (1) `<base 58 block hash>` (see [status page](https://rpc.nearprotocol.com/status) for a valid `latest_block_hash`)

```bash
http post https://rpc.nearprotocol.com jsonrpc=2.0 method=validators params:='["8ehA3NYL5uSF8zefbnqnz66twYJ45rfst6SrqBNv7oka"]' id=dontcare
```

*currently*

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

*coming soon ...* (see [`nearcore` PR 1962](https://github.com/nearprotocol/nearcore/pull/1962))

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "current_fishermen": [],
    "current_proposals": [],
    "current_validators": [
      {
        "account_id": "test.near",
        "is_slashed": false,
        "num_expected_blocks": 38,
        "num_produced_blocks": 38,
        "public_key": "ed25519:22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV",
        "shards": [
          0
        ],
        "stake": "50445149127868051176979985"
      }
    ],
    "next_fishermen": [],
    "next_validators": [
      {
        "account_id": "test.near",
        "public_key": "ed25519:22skMptHjFWNyuEWY22ftn2AbLPSYpmYwGJRGwpNHbTV",
        "shards": [
          0
        ],
        "stake": "50445324683980935237733345"
      }
    ]
  }
}
```
