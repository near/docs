---
id: balance-changes
title: 잔고 변경
sidebar_label: 잔고 변경
---


## 전제 조건 {#prerequisites}

- [NEAR 계정](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli)
- [`near login`](/tools/near-cli#near-login)을 실행하여 로컬에 저장된 발신자 계정의 자격 증명

### 네이티브 NEAR (Ⓝ) {#native-near}

> 계정의 잔고 변경은 [변경 RPC 엔드포인트](/api/rpc/setup#view-account-changes)를 사용하여 추적할 수 있습니다. NEAR-CLI를 사용하여 계정에 토큰을 보낸 다음, 변경 사항을 확인하여 이를 테스트할 수 있습니다.

## 토큰 전송 {#send-tokens}

- [`near send`](/tools/near-cli#near-send)를 사용하여 토큰을 전송합니다.

```bash
near send sender.testnet receiver.testnet 1
```

- 다음과 같은 결과가 터미널에 표시되어야 합니다.

```bash
Sending 1 NEAR to receiver.testnet from sender.testnet
Transaction Id 4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
```

## 잔고 변화 보기 {#view-balance-changes}

- Open the transaction URL in [NearBlocks Explorer](https://testnet.nearblocks.io/) and copy the `BLOCK HASH`.
- `BLOCK HASH`와 accountId를 사용하여, [변경 RPC 엔드포인트](/api/rpc/setup#view-account-changes)를 쿼리하여 변화를 확인합니다.

**HTTPie를 사용한 쿼리 예시:**

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
<summary>응답 예시:</summary>

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

또는 accountId만 필요한 [`view_account` 쿼리](/api/rpc/setup#view-account)를 통해 계정 잔액을 볼 수 있습니다.

**HTTPie 요청 예시:**

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
params:='{
  "request_type": "view_account",
  "finality": "final",
  "account_id": "sender.testnet"
}'
  ```

**응답 예시:**

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

**참고:** 가스 가격은 블록 간에 변경될 수 있습니다. 결정론적 가스 비용이 있는 트랜잭션의 경우에도, 드는 NEAR의 비용이 다를 수 있습니다. [`gas_price` RPC 엔드포인트](https://docs.near.org/api/rpc/setup#gas-price)를 사용하여 최근 블록의 가스 가격을 쿼리할 수 있습니다.

---

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
