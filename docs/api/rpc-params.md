---
id: rpc-params
title: Named Parameters
sidebar_label: Named Parameters
---

We are heading away from the positional-based APIs for easier maintainability.

<blockquote class="warning">
<strong>heads up</strong><br><br>

This page refers to a **technical preview**.

These features are not currently available on TestNet.  They will be available in an upcoming release.

</blockquote>

This is an improvement of our RPC API that allows querying account info, access key(s), and state by a given block identifier (either block height or block hash).

## Introduction

The following identifiers are used throughout the code samples below. 

- `account_id`: (string) NEAR [account ID format](/docs/concepts/account)
- `prefix`: (base64 string) optional string used to segment our key-value store
- `public_key` (string) the public part of your public/private key pair
- `method_name`: (string) the name of the RPC method you're calling

## Common Parameters

- `block_id`: (integer) block height or block hash
- `finality`: (string) filter for status of block finalization [ `optmistic` | `near-final` | `final` ] 


*At time of writing, `finality` is only available on StageNet.*

To run the examples below, you will likely need a more recent block height or block hash.  You can find that here: https://staging-rpc.nearprotocol.com/status

### Using block height

```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list", 
                "account_id": "node0", 
                "block_id": 33442,
                "finality": "optimistic"
             }'
```

### Using block hash
```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list", 
                "account_id": "node0", 
                "block_id": 33442,
                "finality": "optimistic"
             }'
```

### Using `optimistic` finality

```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0", 
                "block_id": 33442,
                "finality": "optimistic"
             }'
```

### Using `near-final` finality

```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0", 
                "block_id": 33442,
                "finality": "near-final"
             }'
```

### Using `final` finality

```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0", 
                "block_id": 33442,
                "finality": "final"
             }'
```

<blockquote class="info">
<strong>did you know?</strong><br><br>

The `request_type` parameter can take any one of the following values (and associated parameters)

```rust
view_account          account_id: string
view_state            account_id: string, prefix: string /* base64 */
view_access_key       account_id: string, public_key: string
view_access_key_list  account_id: string
call_function         account_id: string, method_name: string, args: string /* base64 */
```

For a concrete example we can use the NEAR StageNet environment.

1. The first two examples above are based on choosing a `request_type` of `view_access_key_list` which in turn requires `account_id` as a parameter.  

2. As of [nearcore/2127](https://github.com/nearprotocol/nearcore/pull/2127) we also need to specify finality as one of `optimistic`, `near-final` or `final`.  

3. We can fetch the latest block hash from https://staging-rpc.nearprotocol.com/status

```bash
http post https://staging-rpc.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0", 
                "block_id": "Ub5ctYJgeka2LGRj3h9VCTYA4BWg73bpMN8qvfRzd3R",
                "finality": "optimistic"
             }'
```

And the result is

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "FGBBvTYQwfjki55BELKhLB1ccyLa1HaA1GUt5BxoigBY",
    "block_height": 589403,
    "keys": [
      {
        "access_key": {
          "nonce": 1,
          "permission": "FullAccess"
        },
        "public_key": "ed25519:23vYngy8iL7q94jby3gszBnZ9JptpMf5Hgf7KVVa2yQi"
      }
    ]
  }
}
```

</blockquote>   

