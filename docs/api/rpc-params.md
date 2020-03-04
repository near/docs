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


**Using block height:**
```bash
http post http://127.0.0.1:3030/ jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list", 
                "account_id": "test.near", 
                "block_id": 300 
             }'
```

**Using block hash:**
```bash
http post http://127.0.0.1:3030/ jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list", 
                "account_id": "test.near", 
                "block_id": "2UP3MujcMuqyrFAtiLwJsjQrxkZuqZWMwCF664dM7MaW" 
             }'
```

<blockquote class="info">
<strong>did you know?</strong><br><br>

The `request_type` parameter can take any one of the following values:
- `view_account`
- `view_access_key`
- `view_access_key_list`
- `view_state`
- `call_function`

Each of the values above may have it's own associated parameters as per the code below:

```rust
ViewAccount { account_id: AccountId },
ViewState { account_id: AccountId, prefix: Vec<u8> /* base64 string */ },
ViewAccessKey { account_id: AccountId, public_key: PublicKey },
ViewAccessKeyList { account_id: AccountId },
CallFunction { account_id: AccountId, method_name: String, args: Vec<u8> /* base64 string */ },
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
                "account_id": "test.near", 
                "block_id": "2UP3MujcMuqyrFAtiLwJsjQrxkZuqZWMwCF664dM7MaW",
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



