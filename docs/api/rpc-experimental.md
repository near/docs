---
id: rpc-experimental
title: Experimental Methods
sidebar_label: Experimental Methods
---

<blockquote class="warning">
<strong>heads up</strong><br><br>

Experimental API methods are feature-complete, but we do not guarantee them to be backward-compatible or exist forever. For example, we are going to remove `EXPERIMENTAL_genesis_records` API soon and `EXPERIMENTAL_genesis_config` does not have a stable structure (we used to change it quite frequently); we are committed to never do such changes for the non-EXPERIMENTAL endpoints. 

EXPERIMENTAL endpoints are useful for API evaluation on the real network. While the API is in EXPERIMENTAL state we collect the feedback and can iterate on the input/output structure.

</blockquote>

## Changes in Block

- method: `EXPERIMENTAL_changes_in_block`
- params:
  - `block_id`: block hash | block height | omit it if you want to use `finality`
  - `finality`: "optimistic" | "final" | "near-final" | omit it if you want to use `block_id`

Using block hash as `block_id`

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes_in_block \
    'params:={
        "block_id": "RECENT BLOCK HASH HERE"
    }'
```

Using block identifier as `block_id`

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes_in_block \
    'params:={
        "block_id": 1
    }'
```

Using finality instead of `block_id`

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes_in_block \
    'params:={
        "finality": "optimistic"
    }'
```

<details>
<summary>Sample response</summary>
<p>

```json
{
  "block_hash": "DYHRzRbxUR1ANPdCQcgQE9g5zyYQoDZ1k8BJEQ3hDSgW",
  "changes": [{
      "type": "data_touched",
      "account_id": "frol.near"
    },
    {
      "type": "account_touched",
      "account_id": "frol.near"
    },
    {
      "type": "access_key_touched",
      "account_id": "user.near"
    },
  ]
}
```

</p>
</details>

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

## Genesis Config

- method: `EXPERIMENTAL_genesis_config`
- params: none

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
          method=EXPERIMENTAL_genesis_config
```

<details><summary>Sample response</summary>
<p>

```json
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "avg_hidden_validator_seats_per_shard": [
            0
        ],
        "block_producer_kickout_threshold": 90,
        "chain_id": "testnet",
        "chunk_producer_kickout_threshold": 60,
        "config_version": 1,
        "developer_reward_percentage": 30,
        "dynamic_resharding": false,
        "epoch_length": 600,
        "fishermen_threshold": "10000000000000000000000000",
        "gas_limit": 1000000000000000,
        "gas_price_adjustment_rate": 1,
        "genesis_height": 0,
        "genesis_time": "2020-04-10T05:34:43.480929839Z",
        "max_inflation_rate": 5,
        "min_gas_price": "5000",
        "num_block_producer_seats": 100,
        "num_block_producer_seats_per_shard": [
            100
        ],
        "num_blocks_per_year": 31536000,
        "protocol_reward_percentage": 10,
        "protocol_treasury_account": "near",
        "protocol_version": 7,
        "runtime_config": {
            "account_creation_config": {
                "min_allowed_top_level_account_length": 0,
                "registrar_account_id": "registrar"
            },
            "storage_amount_per_byte": "90900000000000000000",
            "transaction_costs": {
                "action_creation_config": {
                    "add_key_cost": {
                        "full_access_cost": {
                            "execution": 0,
                            "send_not_sir": 0,
                            "send_sir": 0
                        },
                        "function_call_cost": {
                            "execution": 0,
                            "send_not_sir": 0,
                            "send_sir": 0
                        },
                        "function_call_cost_per_byte": {
                            "execution": 37538150,
                            "send_not_sir": 37538150,
                            "send_sir": 37538150
                        }
                    },
                    "create_account_cost": {
                        "execution": 0,
                        "send_not_sir": 0,
                        "send_sir": 0
                    },
                    "delete_account_cost": {
                        "execution": 454830000000,
                        "send_not_sir": 454830000000,
                        "send_sir": 454830000000
                    },
                    "delete_key_cost": {
                        "execution": 0,
                        "send_not_sir": 0,
                        "send_sir": 0
                    },
                    "deploy_contract_cost": {
                        "execution": 513359000000,
                        "send_not_sir": 513359000000,
                        "send_sir": 513359000000
                    },
                    "deploy_contract_cost_per_byte": {
                        "execution": 27106233,
                        "send_not_sir": 27106233,
                        "send_sir": 27106233
                    },
                    "function_call_cost": {
                        "execution": 1367372500000,
                        "send_not_sir": 1367372500000,
                        "send_sir": 1367372500000
                    },
                    "function_call_cost_per_byte": {
                        "execution": 2354953,
                        "send_not_sir": 2354953,
                        "send_sir": 2354953
                    },
                    "stake_cost": {
                        "execution": 0,
                        "send_not_sir": 0,
                        "send_sir": 0
                    },
                    "transfer_cost": {
                        "execution": 13025000000,
                        "send_not_sir": 13025000000,
                        "send_sir": 13025000000
                    }
                },
                "action_receipt_creation_config": {
                    "execution": 924119500000,
                    "send_not_sir": 924119500000,
                    "send_sir": 924119500000
                },
                "burnt_gas_reward": {
                    "denominator": 10,
                    "numerator": 3
                },
                "data_receipt_creation_config": {
                    "base_cost": {
                        "execution": 539890689500,
                        "send_not_sir": 539890689500,
                        "send_sir": 539890689500
                    },
                    "cost_per_byte": {
                        "execution": 14234654,
                        "send_not_sir": 14234654,
                        "send_sir": 14234654
                    }
                },
                "storage_usage_config": {
                    "num_bytes_account": 100,
                    "num_extra_bytes_record": 40
                }
            },
            "wasm_config": {
                "ext_costs": {
                    "base": 126224222,
                    "keccak256_base": 710092630,
                    "keccak256_byte": 5536829,
                    "keccak512_base": 1420185260,
                    "keccak512_byte": 11073658,
                    "log_base": 0,
                    "log_byte": 0,
                    "promise_and_base": 0,
                    "promise_and_per_promise": 672136,
                    "promise_return": 34854215,
                    "read_memory_base": 1629369577,
                    "read_memory_byte": 123816,
                    "read_register_base": 639340699,
                    "read_register_byte": 63637,
                    "sha256_base": 710092630,
                    "sha256_byte": 5536829,
                    "storage_has_key_base": 20019912030,
                    "storage_has_key_byte": 4647597,
                    "storage_iter_create_from_byte": 429608,
                    "storage_iter_create_prefix_base": 28443562030,
                    "storage_iter_create_prefix_byte": 442354,
                    "storage_iter_create_range_base": 25804628282,
                    "storage_iter_create_to_byte": 1302886,
                    "storage_iter_next_base": 24213271567,
                    "storage_iter_next_key_byte": 0,
                    "storage_iter_next_value_byte": 1343211668,
                    "storage_read_base": 19352220621,
                    "storage_read_key_byte": 4792496,
                    "storage_read_value_byte": 139743,
                    "storage_remove_base": 109578968621,
                    "storage_remove_key_byte": 9512022,
                    "storage_remove_ret_value_byte": 0,
                    "storage_write_base": 21058769282,
                    "storage_write_evicted_byte": 0,
                    "storage_write_key_byte": 23447086,
                    "storage_write_value_byte": 9437547,
                    "touching_trie_node": 1,
                    "utf16_decoding_base": 0,
                    "utf16_decoding_byte": 9095538,
                    "utf8_decoding_base": 0,
                    "utf8_decoding_byte": 591904,
                    "write_memory_base": 76445225,
                    "write_memory_byte": 809907,
                    "write_register_base": 0,
                    "write_register_byte": 0
                },
                "grow_mem_cost": 1,
                "limit_config": {
                    "initial_memory_pages": 1024,
                    "max_actions_per_receipt": 100,
                    "max_arguments_length": 4194304,
                    "max_contract_size": 4194304,
                    "max_gas_burnt": 200000000000000,
                    "max_gas_burnt_view": 200000000000000,
                    "max_length_method_name": 256,
                    "max_length_returned_data": 4194304,
                    "max_length_storage_key": 4194304,
                    "max_length_storage_value": 4194304,
                    "max_memory_pages": 2048,
                    "max_number_bytes_method_names": 2000,
                    "max_number_input_data_dependencies": 128,
                    "max_number_logs": 100,
                    "max_number_registers": 100,
                    "max_promises_per_function_call_action": 1024,
                    "max_register_size": 104857600,
                    "max_stack_height": 16384,
                    "max_total_log_length": 16384,
                    "max_total_prepaid_gas": 10000000000000000,
                    "registers_memory_limit": 1073741824
                },
                "regular_op_cost": 3856371
            }
        },
        "total_supply": "1009000000000000000000000000000000000",
        "transaction_validity_period": 100,
        "validators": [
            {
                "account_id": "node0",
                "amount": "50000000000000000000000000000000",
                "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX"
            },
            {
                "account_id": "node1",
                "amount": "50000000000000000000000000000000",
                "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e"
            },
            {
                "account_id": "node2",
                "amount": "50000000000000000000000000000000",
                "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5"
            },
            {
                "account_id": "node3",
                "amount": "50000000000000000000000000000000",
                "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su"
            }
        ]
    }
}
```

</p>
</details>

## Genesis Records

- method: `EXPERIMENTAL_genesis_records`
- params:
  - (1) (optional) `pagination` object includes `offset` and `limit`

If you pass empty parameters, you will get the default pagination, which is offset 0 and limit 100.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
          method=EXPERIMENTAL_genesis_records \
          'params:={}'
```

Yet, you have control over the pagination:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
          method=EXPERIMENTAL_genesis_records \
          'params:={"pagination": {"offset": 1, "limit": 2}}'
```

<details><summary>Sample response</summary>
<p>

```json
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "pagination": {
            "limit": 10,
            "offset": 2
        },
        "records": [
            {
                "Account": {
                    "account": {
                        "amount": "1000000000000000000000000000000000",
                        "code_hash": "11111111111111111111111111111111",
                        "locked": "0",
                        "storage_paid_at": 0,
                        "storage_usage": 0
                    },
                    "account_id": "near"
                }
            },
            {
                "AccessKey": {
                    "access_key": {
                        "nonce": 0,
                        "permission": "FullAccess"
                    },
                    "account_id": "near",
                    "public_key": "ed25519:546XB2oHhj7PzUKHiH9Xve3Ze5q1JiW2WTh6abXFED3c"
                }
            }
        ]
    }
}
```

</p>
</details>
