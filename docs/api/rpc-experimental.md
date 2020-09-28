---
id: rpc-experimental
title: Experimental Methods
sidebar_label: Experimental Methods
---

<blockquote class="warning">
<strong>heads up</strong><br><br>

Experimental API methods are feature-complete, but we do not guarantee them to be backward-compatible or exist forever. 

These endpoints are useful for API evaluation on the real network. While the API is in EXPERIMENTAL state, we collect feedback and can iterate on the input/output structure.

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
