---
id: rpc-params
title: Named Parameters
sidebar_label: Named Parameters
---
>

The blocks that did not reach the `final` finality status (i.e. `optimistic` and `near-final`) may disapear if re-org after a fork happens. You can only count on the finalized blocks, but in some cases it is good to have the access to the latest blocks.

### Using block height

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "block_id": 33442
             }'
```

### Using block hash
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "block_id": "44uJTeQ5aybLAXnWzfkH2xrhoBmuU2cXBCySXQ7mj1jC",
             }'
```

### Using `optimistic` finality

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "optimistic"
             }'
```

### Using `near-final` finality

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "near-final"
             }'
```

### Using `final` finality

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "final"
             }'
```

Learn more about the query parameters at [RPC reference](../api/rpc#query)



## Send transaction (async)

`broadcast_tx_async(signed_transaction: string)`

Sends transaction and returns right away with the hash of the transaction in base58.

- method `broadcast_tx_async`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=broadcast_tx_async params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

```json
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": "2i33XJFr6CVhynRXWVtYs9CxaufkKPQMGEYjUgerUyHw"
}
```

The value of `result` is the transaction hash and can be [viewed in NEAR Explorer](https://explorer.testnet.near.org/transactions/2i33XJFr6CVhynRXWVtYs9CxaufkKPQMGEYjUgerUyHw)



## Send Transaction (wait until done)

`broadcast_tx_commit(signed_transaction: string)`

Sends transaction and returns only until transaction fully gets executed (including receipts). Has timeout of 10 seconds.

- method `broadcast_tx_commit`
- params
  - (1) `<base 64 of the SignedTransaction>`

```bash
http post http://rpc.testnet.near.org jsonrpc=2.0 method=broadcast_tx_commit params:='["<base 64 of the SignedTransaction>"]' id=dontcare
```

*note: this was tested using NEAR CLI*

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


### View contract state
Returns full state of the contract (might be expensive if contract has large state)
- method: `query`
- params: 
   - `request_type`: `view_state`
   - `finality`: `optimistic`, `near-final`, or `final`
   - `account_id`: `guest-book.testnet`,
   - `prefix_base64`: `""`

### Example

<details>
<summary>Example response: </summary>
<p>

```json

```

</p>
</details>



## Transaction Status

`tx(transaction_hash: string, sender_id: string)`

Queries status of a transaction by hash and returns `FinalTransactionResult`.

- method `tx`
- params
  - (1) `<base 58 of transaction hash>` (see [NEAR Explorer](https://explorer.testnet.near.org) for a valid transaction hash)
  - (2) `<sender account id>` used to determine which shard to look for transaction

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=tx params:='["CqiBnYCRgkGV2odJPXJTBkoZHXjDNQFJKw7oRYWU1j6g", ""]' id=dontcare
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

Please note that, in the case of function call transactions, the query will not wait for **all** the receipts generated
by this transaction to finish before returning. Rather, it will only wait for the its return value to finish (could be a promise)
before returning. More specifically, consider the following function
```rust
pub fn transfer(receiver_id: String) {
    Promise::new(receiver_id).transfer(10);
}
```
Let's say a transaction only contain a function call action that calls this method. It will only wait for the function call
receipt, not necessarily the receipt that contains the transfer, to finish before returning. On the other hand, if the function
is slightly modified
```rust
pub fn transfer_promise(receiver_id: String) -> Promise {
    Promise::new(receiver_id).transfer(10)
}
```
to have the promise as a return value, then the tx status query will wait for this promise to finish before returning.
 
Despite such design, `tx` endpoint can be used to check whether all receipts have finished. Instead of looking at `status`, we can go through all the receipts
returned and see if any of their status is `Unknown`. If none of the status is unknown, we can be certain that all receipts
generated have finished.

In addition, `tx` endpoint does not provide finality guarantees. To make sure that the entire execution is final, it suffices
to check that every `block_hash` in every outcome is final.




## State Changes / Experimental Methods

<blockquote class="warning">
<strong>heads up</strong><br><br>

Experimental API methods are feature-complete, but we do not guarantee them to be backward-compatible or exist forever. For example, we are going to remove `EXPERIMENTAL_genesis_records` API soon and `EXPERIMENTAL_genesis_config` does not have a stable structure (we used to change it quite frequently); we are committed to never do such changes for the non-EXPERIMENTAL endpoints. 

EXPERIMENTAL endpoints are useful for API evaluation on the real network. While the API is in EXPERIMENTAL state we collect the feedback and can iterate on the input/output structure.

</blockquote>
## Changes

- method: `EXPERIMENTAL_changes`
- params:
  - `block_id`: block hash | block height | omit it if you want to use `finality`
  - `finality`: "optimistic" | "final" | "near-final" | omit it if you want to use `block_id`
  - `changes_type`: "account_changes" | "single_access_key_changes" | "all_access_key_changes" | "contract_code_changes" | "data_changes" \
    *the extra fields based on `changes_type` are the following*
    - `account_changes`:
      - `account_ids`
    - `single_access_key_changes`:
      - `keys` a list of
        - `account_id`
        - `public_key`
    - `all_access_key_changes`:
      - `account_ids`
    - `contract_code_changes`:
      - `account_ids`
    - `data_changes`:
      - `account_ids`
    - `key_prefix_base64` *(base64-encoded string of the key-prefix data saved from a smart contract)*

### Example of Account Changes

When an account gets modified (created, updated, removed), we can query the block which contains the receipts for the transaction:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes \
    'params:={
        "block_id": 1,
        "changes_type": "account_changes",
        "account_ids": ["new-account"]
    }'
```

<details>
<summary>Sample response if *account was updated*</summary>
<p>

```json
{
  "block_hash": "DYHRzRbxUR1ANPdCQcgQE9g5zyYQoDZ1k8BJEQ3hDSgW",
  "changes": [{
    "cause": {
      "type": "receipt_processing",
      "receipt_hash": "8rPN9tHY9MtT23TqBvvBGBQzwskA5fuZDjmiLpTobgRv"
    },
    "type": "account_update",
    "change": {
      "account_id": "new-account",
      "amount": "0",
      "locked": "0",
      "code_hash": "11111111111111111111111111111111",
      "storage_usage": 100,
      "storage_paid_at": 9
    }
  }]
}
```
</p>
</details>

<details>
<summary>Sample response if *account was deleted*</summary>
<p>

```json
{
  "block_hash": "DYHRzRbxUR1ANPdCQcgQE9g5zyYQoDZ1k8BJEQ3hDSgW",
  "changes": [
    {
      "cause": {
        "type": "receipt_processing",
        "receipt_hash": "8rPN9tHY9MtT23TqBvvBGBQzwskA5fuZDjmiLpTobgRv"
      },
      "type": "account_deletion",
      "change": {
        "account_id": "new-account"
      }
    }
  ]
}
```

</p>
</details>


### Example of Data Changes

When some key gets modified (created, updated, removed), we can query the block which contains the receipts for the transaction:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes \
    'params:={
        "block_id": 1,
        "changes_type": "data_changes",
        "account_ids": ["new-account"],
        "key_prefix_base64": "bXlfa2V5"
    }'

# note: key_prefix_base64 is base64-encoded text "my_key" prefix which was used via Storage
```

<details>
<summary>Sample response</summary>
<p>

*assume the key was modified twice in a single block, and then removed*

```json
{
  "block_hash": "DYHRzRbxUR1ANPdCQcgQE9g5zyYQoDZ1k8BJEQ3hDSgW",
  "changes": [{
      "cause": {
        "type": "receipt_processing",
        "receipt_hash": "111N9tHY9MtT23TqBvvBGBQzwskA5fuZDjmiLpTob111",
      },
      "type": "data_update",
      "change": {
        "account_id": "new-account",
        "key_base64": "bXlfa2V5",           /* base64-encoded "my_key" */
        "value_base64": "bXlfdmFsdWVfMQ=="  /* base64-encoded "my_value_1" */
      }
    },
    {
      "cause": {
        "type": "receipt_processing",
        "receipt_hash": "222N9tHY9MtT23TqBvvBGBQzwskA5fuZDjmiLpTob222"
      },
      "type": "data_update",
      "change": {
        "account_id": "new-account",
        "key_base64": "bXlfa2V5",           /* base64-encoded "my_key" */
        "value_base64": "bXlfdmFsdWVfMg=="  /* base64-encoded "my_value_2" */
      }
    },
    {
      "cause": {
        "type": "receipt_processing",
        "receipt_hash": "333N9tHY9MtT23TqBvvBGBQzwskA5fuZDjmiLpTob333"
      },
      "type": "data_deletion",
      "change": {
        "account_id": "new-account",
        "key_base64": "bXlfa2V5"            /* base64-encoded "my_key" */
      }
    }
  ]
}
```

</p>
</details>

