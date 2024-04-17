---
id: balance-changes
title: Balance changes
sidebar_label: Balance Changes
---


## Các điều kiện tiên quyết {#prerequisites}

- [NEAR Account](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli)
- Thông tin xác thực cho sender account được lưu trữ trên local bằng cách chạy [`near login`](/docs/tools/near-cli#near-login)

### Native NEAR (Ⓝ) {#native-near}

> Các thay đổi số dư trên các account có thể được theo dõi bằng cách sử dụng [changes RPC endpoint](/api/rpc/setup#view-account-changes) của chúng tôi. Bạn có thể kiểm tra điều này bằng cách gửi các token đến một account sử dụng [NEAR-CLI](/tools/near-cli#near-send) và sau đó xem các thay đổi đã thực hiện.

## Send Tokens {#send-tokens}

- Gửi các token sử dụng [`near send`](/docs/tools/near-cli#near-send)

```bash
near send sender.testnet receiver.testnet 1
```

- Bạn sẽ thấy một kết quả trong terminal của mình trông giống như sau:

```bash
Sending 1 NEAR to receiver.testnet from sender.testnet
Transaction Id 4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
```

## View Balance Changes {#view-balance-changes}

- Open the transaction URL in [NearBlocks Explorer](https://testnet.nearblocks.io/) and copy the `BLOCK HASH`.
- Sử dụng `BLOCK HASH` và accountId, truy vấn [changes RPC endpoint](/api/rpc/setup#view-account-changes) để xem những thay đổi.

**Ví dụ Query sử dụng HTTPie:**

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
<summary>**Ví dụ về response nhận được:**</summary>

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

Ngoài ra, bạn có thể xem số dư của account bằng cách [truy vấn `view_account`](/api/rpc/setup#view-account) mà chỉ yêu cầu một accountId.

**Ví dụ HTTPie Request:**

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "sender.testnet"
  }'
  ```

**Ví dụ về response nhận được là:**

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

** Lưu ý:** Biểu phí Gas có thể thay đổi giữa các block. Ngay cả đối với các transaction đã xác định giá gas, chi phí trong NEAR cũng có thể khác. You can query the gas price for recent blocks using the [`gas_price` RPC endpoint](https://docs.near.org/api/rpc/setup#gas-price).

---

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
