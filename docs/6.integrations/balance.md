---
id: balance-changes
title: Balance changes
sidebar_label: Balance Changes
---


## Prerequisites {#prerequisites}

- [NEAR Account](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli)
- Credentials for sender account stored locally by running [`near login`](/tools/near-cli#near-login)

### Native NEAR (Ⓝ) {#native-near}

> Balance changes on accounts can be tracked by using our [changes RPC endpoint](/api/rpc/setup#view-account-changes). You can test this out by sending tokens to an account using [NEAR-CLI](/tools/near-cli#near-send) and then viewing the changes made.

## Send Tokens {#send-tokens}

- Send tokens using [`near send`](/tools/near-cli#near-send)

```bash
near send sender.testnet receiver.testnet 1
```

- You should see a result in your terminal that looks something like this:

```bash
Sending 1 NEAR to receiver.testnet from sender.testnet
Transaction Id 4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
```

## View Balance Changes {#view-balance-changes}

- Open the transaction URL in [NearBlocks Explorer](https://testnet.nearblocks.io/) and copy the `BLOCK HASH`.
- Using the `BLOCK HASH` and the accountId, query the [changes RPC endpoint](/api/rpc/setup#view-account-changes) to view changes.

**Example Query using HTTPie:**

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes \
    'params:={
        "block_id": "CJ24svU3C9FaULVjcNVnWuVZjK6mNaQ8p6AMyUDMqB37",
        "changes_type": "account_changes",
        "account_ids": ["sender.testnet"]
    }'
```

<details>
<summary>**Example Response:**</summary>

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "BRgE4bjmUo33jmiVBcZaWGkSLVeL7TTi4ZxYTvJdPbB9",
    "changes": [
      {
        "cause": {
          "tx_hash": "4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy",
          "type": "transaction_processing"
        },
        "change": {
          "account_id": "sender.testnet",
          "amount": "11767430014412510000000000",
          "code_hash": "11111111111111111111111111111111",
          "locked": "0",
          "storage_paid_at": 0,
          "storage_usage": 806
        },
        "type": "account_update"
      }
    ]
  }
}
```
</details>

---

Alternatively, you can view account balances by [querying `view_account`](/api/rpc/setup#view-account) which only requires an accountId.

**Example HTTPie Request:**

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "sender.testnet"
  }'
  ```

**Example Response:**

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "amount": "11767430683960197500000000",
    "block_hash": "HUiscpNyoyR5z1UdnZhAJLNz1G8UjBrFTecSYqCrvdfW",
    "block_height": 50754977,
    "code_hash": "11111111111111111111111111111111",
    "locked": "0",
    "storage_paid_at": 0,
    "storage_usage": 806
  }
}
```

**Note:** Gas prices can change between blocks. Even for transactions with deterministic gas cost the cost in NEAR could also be different. You can query the gas price for recent blocks using the [`gas_price` RPC endpoint](https://docs.near.org/api/rpc/setup#gas-price).

---

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
