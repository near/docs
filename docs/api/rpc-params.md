---
id: rpc-params
title: Named Parameters
sidebar_label: Named Parameters
---

We are heading away from the positional-based APIs for easier maintainability.

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

*`block_id` and `finality` are mutually exclusive parameters -- use one or the other, but not both.*

<blockquote class="warning">
<strong>heads up</strong><br><br>

The blocks that did not reach the `final` finality status (i.e. `optimistic` and `near-final`) may disapear if re-org after a fork happens. You can only count on the finalized blocks, but in some cases it is good to have the access to the latest blocks.
</blockquote>

To run the examples below, you will likely need a more recent block height or block hash.  You can find that here: https://rpc.testnet.nearprotocol.com/status

### Using block height

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "block_id": 33442
             }'
```

### Using block hash
```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "block_id": "44uJTeQ5aybLAXnWzfkH2xrhoBmuU2cXBCySXQ7mj1jC",
             }'
```

### Using `optimistic` finality

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "optimistic"
             }'
```

### Using `near-final` finality

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "near-final"
             }'
```

### Using `final` finality

```bash
http post https://rpc.testnet.nearprotocol.com jsonrpc=2.0 id=dontcare \
    method=query \
    'params:={
                "request_type": "view_access_key_list",
                "account_id": "node0",
                "finality": "final"
             }'
```

Learn more about the query parameters at [RPC reference](../interaction/rpc#query)
