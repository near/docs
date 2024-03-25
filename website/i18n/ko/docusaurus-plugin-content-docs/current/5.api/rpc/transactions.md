---
id: transactions
title: RPC 엔드포인트
sidebar_label: 트랜잭션
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 사용하면 트랜잭션을 보내고 해당 상태를 쿼리할 수 있습니다.

---

## 트랜잭션 전송 (비동기) {#send-transaction-async}

> 트랜잭션을 보내고 즉시 트랜잭션 해시를 반환합니다.

- 메서드: `broadcast_tx_async`
- 매개변수: `[SignedTransaction encoded in base64]`

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "broadcast_tx_async",
  "params": [
    "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
  ]
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_async \
    params:='[
        "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
    ]'
```

</TabItem>
</Tabs>

응답 예시:

```json
{
  "jsonrpc": "2.0",
  "result": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
  "id": "dontcare"
}
```

Final transaction results can be queried using [Transaction Status](#transaction-status) or [NearBlocks Explorer](https://testnet.nearblocks.io/) using the above `result` hash returning a result similar to the example below.

![NEAR-Explorer-transactionHash](/docs/assets/NEAR-Explorer-transactionHash.png)

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `broadcast_tx_async` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인수를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## 트랜잭션 전송 (대기) {#send-transaction-await}

> 트랜잭션을 보내고 트랜잭션이 완전히 완료될 때까지 기다립니다. _(타임아웃 10초 있음)_

- 메서드: `broadcast_tx_commit`
- 매개변수: `[SignedTransaction encoded in base64]`

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "broadcast_tx_commit",
  "params": [
    "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDQAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldIODI4YfV/QS++blXpQYT+bOsRblTRW4f547y/LkvMQ9AQAAAAMAAACh7czOG8LTAAAAAAAAAAXcaTJzu9GviPT7AD4mNJGY79jxTrjFLoyPBiLGHgBi8JK1AnhK8QknJ1ourxlvOYJA2xEZE8UR24THmSJcLQw="
  ]
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
    params:='[
        "DwAAAG5lYXJrYXQudGVzdG5ldABuTi5L1rwnlb35hc9tn5WELkxfiGfGh1Q5aeGNQDejo0QAAAAAAAAAEAAAAGpvc2hmb3JkLnRlc3RuZXSiWAc6W9KlqXS5fK+vjFRDV5pAxHRKU0srKX/cmdRTBgEAAAADAAAAoe3MzhvC0wAAAAAAAAB9rOE9zc5zQYLL1j6VTh3I4fQbERs6I07gJfrAC6jo8DB4HolR9Xps3v4qrZxkgZjwv6wB0QOROM4UEbeOaBoB"
    ]'
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "signer_id": "sender.testnet",
      "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
      "nonce": 13,
      "receiver_id": "receiver.testnet",
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "signature": "ed25519:7oCBMfSHrZkT7tzPDBxxCd3tWFhTES38eks3MCZMpYPJRfPWKxJsvmwQiVBBxRLoxPTnXVaMU2jPV3MdFKZTobH",
      "hash": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR"
    },
    "transaction_outcome": {
      "proof": [],
      "block_hash": "9MzuZrRPW1BGpFnZJUJg6SzCrixPpJDfjsNeUobRXsLe",
      "id": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR",
      "outcome": {
        "logs": [],
        "receipt_ids": ["BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"],
        "gas_burnt": 223182562500,
        "tokens_burnt": "22318256250000000000",
        "executor_id": "sender.testnet",
        "status": {
          "SuccessReceiptId": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"
        }
      }
    },
    "receipts_outcome": [
      {
        "proof": [],
        "block_hash": "5Hpj1PeCi32ZkNXgiD1DrW4wvW4Xtic74DJKfyJ9XL3a",
        "id": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh",
        "outcome": {
          "logs": [],
          "receipt_ids": ["3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "receiver.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      },
      {
        "proof": [],
        "block_hash": "CbwEqMpPcu6KwqVpBM3Ry83k6M4H1FrJjES9kBXThcRd",
        "id": "3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR",
        "outcome": {
          "logs": [],
          "receipt_ids": [],
          "gas_burnt": 0,
          "tokens_burnt": "0",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-1}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `broadcast_tx_commit` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>트랜잭션 실행 중에 오류가 발생했습니다.</td>
      <td>
        <ul>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>트랜잭션이 라우팅되었지만 10초 동안 체인에 기록되지 않았습니다.</td>
      <td>
        <ul>
          <li> 동일한 트랜잭션으로 요청을 다시 제출하세요(NEAR 프로토콜에서 고유한 트랜잭션은 정확히 한 번만 적용되므로, 이전에 보낸 트랜잭션이 적용되면 이 요청은 알려진 결과만 반환하고, 그렇지 않으면 트랜잭션을 다시 한 번 체인으로 라우팅합니다)</li>
          <li>트랜잭션이 유효한지 확인하세요.</li>
          <li>서명자 계정 ID에 트랜잭션 수수료를 충당하기에 충분한 토큰이 있는지 확인하세요(각 계정의 일부 토큰은 스토리지 비용을 충당하기 위해 잠겨 있음을 명심하세요).</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## 트랜잭션 상태 {#transaction-status}

> 트랜잭션 상태를 해시로 조회하고 최종 트랜잭션 결과를 반환합니다.

- 메서드: `tx`
- 매개변수:
  - `transaction hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
  - `sender account id`

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "tx",
  "params": ["6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm", "sender.testnet"]
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.txStatus(
  "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
  "sender.testnet"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=tx \
    params:='[ "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm", "sender.testnet"]'
```

</TabItem>
</Tabs>

<details>
<summary>결과 예시:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "signer_id": "sender.testnet",
      "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
      "nonce": 15,
      "receiver_id": "receiver.testnet",
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "signature": "ed25519:3168QMdTpcwHvM1dmMYBc8hg9J3Wn8n7MWBSE9WrEpns6P5CaY87RM6k4uzyBkQuML38CZhU18HzmQEevPG1zCvk",
      "hash": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm"
    },
    "transaction_outcome": {
      "proof": [
        {
          "hash": "F7mL76CMdfbdZ3xCehVGNh1fCyaR37gr3MeGX3EZkiVf",
          "direction": "Right"
        }
      ],
      "block_hash": "ADTMLVtkhsvzUxuf6m87Pt1dnF5vi1yY7ftxmNpFx7y",
      "id": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
      "outcome": {
        "logs": [],
        "receipt_ids": ["3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT"],
        "gas_burnt": 223182562500,
        "tokens_burnt": "22318256250000000000",
        "executor_id": "sender.testnet",
        "status": {
          "SuccessReceiptId": "3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT"
        }
      }
    },
    "receipts_outcome": [
      {
        "proof": [
          {
            "hash": "6h95oEd7ih62KXfyPT4zsZYont4qy9sWEXc5VQVDhqtG",
            "direction": "Right"
          },
          {
            "hash": "6DnibgZk1T669ZprcehUy1GpCSPw1kjzXRGu69nSaUNn",
            "direction": "Right"
          }
        ],
        "block_hash": "GgFTVr33r4MrpAiHc9mr8TZqLnpZAX1BaZTNvhBnciy2",
        "id": "3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT",
        "outcome": {
          "logs": [],
          "receipt_ids": ["46KYgN8ddxs4Qy8C7BDQH49XUfcYZsaQmAvdU1nfcL9V"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "receiver.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      },
      {
        "proof": [
          {
            "hash": "CD9Y7Bw3MSFgaPZzpc1yP51ajhGDCAsR61qXcMNcRoHf",
            "direction": "Left"
          }
        ],
        "block_hash": "EGAgKuW6Bd6QKYSaxAkx2pPGmnjrjAcq4UpoUiqMXvPH",
        "id": "46KYgN8ddxs4Qy8C7BDQH49XUfcYZsaQmAvdU1nfcL9V",
        "outcome": {
          "logs": [],
          "receipt_ids": [],
          "gas_burnt": 0,
          "tokens_burnt": "0",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-2}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `tx` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>트랜잭션 실행 중에 오류가 발생했습니다.</td>
      <td>
        <ul>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_TRANSACTION</td>
      <td>요청된 트랜잭션은 아직 체인에 기록되지 않았거나 가비지 수집되었기 때문에 노드에서 사용할 수 없습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>트랜잭션이 5 이상의 에포크 전에 제출된 경우 <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
          <li>트랜잭션 해시를 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>합리적인 시간 동안 트랜잭션 상태를 기다릴 수 없습니다.</td>
      <td>
        <ul>
          <li>다른 노드에 요청을 보내세요.</li>
          <li>나중에 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## Receipt가 있는 트랜잭션 상태 {#transaction-status-with-receipts}

> 해시로 트랜잭션 상태를 쿼리하고 최종 트랜잭션 결과 _와_ 모든 Receipt의 세부 정보를 반환합니다.

- 메서드: `EXPERIMENTAL_tx_status`
- 매개변수:
  - `transaction hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
  - `sender account id` _(트랜잭션을 쿼리할 샤드를 결정하는 데 사용됨)_

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_tx_status",
  "params": ["HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd", "bowen"]
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_txStatus(
  "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
  "bowen"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status params:='["HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd", "bowen"]' id=dontcare
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시:</summary>
<p>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "bowen",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJhbW91bnQiOiIxMDAwIiwicmVjZWl2ZXJfaWQiOiJib3dlbiJ9",
                  "deposit": "0",
                  "gas": 100000000000000,
                  "method_name": "transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8",
        "receiver_id": "evgeny.lockup.m0"
      },
      {
        "predecessor_id": "evgeny.lockup.m0",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "19200274886926125000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18663792669276228632284"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp",
        "receiver_id": "bowen"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "HuqYrYsC7h2VERFMgFkqaNqSiFuTH9CA3uJr3BkyNxhF",
        "id": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8",
        "outcome": {
          "executor_id": "evgeny.lockup.m0",
          "gas_burnt": 3493189769144,
          "logs": ["Transferring 1000 to account @bowen"],
          "receipt_ids": [
            "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
            "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp"
          ],
          "status": {
            "SuccessReceiptId": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa"
          },
          "tokens_burnt": "349318976914400000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "5WwHEszBcpfrHnt2VTvVDVnEEACNq5EpQdjz1aW9gTAa"
          }
        ]
      },
      {
        "block_hash": "DJ6oK5FtPPSwksS6pKdEjFvHWAaSVocnVNLoyi8aYk1k",
        "id": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "CXSXmKpDU8R3UUrBAsffWMeGfKanKqEHCQrHeZkR3RKT"
          },
          {
            "direction": "Right",
            "hash": "2dNo7A1VHKBmMA86m1k3Z9DVXwWgQJGkKGRg8wUR3co9"
          }
        ]
      },
      {
        "block_hash": "9cjUoqAksMbs7ZJ4CXiuwm8vppz9QctTwGmgwZ5mDmUA",
        "id": "5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      },
      {
        "block_hash": "DJ6oK5FtPPSwksS6pKdEjFvHWAaSVocnVNLoyi8aYk1k",
        "id": "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "A2Ry6NCeuK8WhRCWc41hy6uddadc5nLJ1NBX5wVYo3Yb"
          },
          {
            "direction": "Right",
            "hash": "2dNo7A1VHKBmMA86m1k3Z9DVXwWgQJGkKGRg8wUR3co9"
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
          "FunctionCall": {
            "args": "eyJhbW91bnQiOiIxMDAwIiwicmVjZWl2ZXJfaWQiOiJib3dlbiJ9",
            "deposit": "0",
            "gas": 100000000000000,
            "method_name": "transfer"
          }
        }
      ],
      "hash": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
      "nonce": 77,
      "public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK",
      "receiver_id": "evgeny.lockup.m0",
      "signature": "ed25519:5v1hJuw5RppKGezJHBFU6z3hwmmdferETud9rUbwxVf6xSBAWyiod93Lezaq4Zdcp4zbukDusQY9PjhV47JVCgBx",
      "signer_id": "bowen"
    },
    "transaction_outcome": {
      "block_hash": "9RX2pefXKw8M4EYjLznDF3AMvbkf9asAjN8ACK7gxKsa",
      "id": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
      "outcome": {
        "executor_id": "bowen",
        "gas_burnt": 2428026088898,
        "logs": [],
        "receipt_ids": ["FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8"],
        "status": {
          "SuccessReceiptId": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8"
        },
        "tokens_burnt": "242802608889800000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "DXf4XVmAF5jnjZhcxi1CYxGPuuQrcAmayq9X5inSAYvJ"
        }
      ]
    }
  }
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-3}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `EXPERIMENTAL_tx_status` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>트랜잭션 실행 중에 오류가 발생했습니다.</td>
      <td>
        <ul>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_TRANSACTION</td>
      <td>요청된 트랜잭션은 아직 체인에 기록되지 않았거나 가비지 수집되었기 때문에 노드에서 사용할 수 없습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>트랜잭션이 5 이상의 에포크 전에 제출된 경우 <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
          <li>트랜잭션 해시를 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>합리적인 시간 동안 트랜잭션 상태를 기다릴 수 없습니다.</td>
      <td>
        <ul>
          <li>다른 노드에 요청을 보내세요.</li>
          <li>나중에 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

### ID에 따른 Receipt {#receipt-by-id}

> ID로 Receipt를 가져옵니다(상태 또는 실행 결과 없이 있는 그대로).

- 메서드: `EXPERIMENTAL_receipt`
- 매개변수:
  - `receipt_id` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid receipt id)_

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_receipt",
  "params": { "receipt_id": "2EbembRPJhREPtmHCrGv3Xtdm3xoc5BMVYHm3b2kjvMY" }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_receipt params:='{"receipt_id": "2EbembRPJhREPtmHCrGv3Xtdm3xoc5BMVYHm3b2kjvMY"}' id=dontcare
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시:</summary>
<p>

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
    "predecessor_id": "bohdan.testnet",
    "receipt": {
      "Action": {
        "actions": [
          {
            "Transfer": {
              "deposit": "1000000000000000000000000"
            }
          }
        ],
        "gas_price": "103000000",
        "input_data_ids": [],
        "output_data_receivers": [],
        "signer_id": "bohdan.testnet",
        "signer_public_key": "ed25519:DhC7rPNTBwWJtmVXs1U1SqJztkn9AWbj6jCmQtkrg3TA"
      }
    },
    "receipt_id": "2EbembRPJhREPtmHCrGv3Xtdm3xoc5BMVYHm3b2kjvMY",
    "receiver_id": "frol.testnet"
  }
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-4}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `EXPERIMENTAL_receipt` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table>
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HANDLER_ERROR</td>
      <td>UNKNOWN_RECEIPT</td>
      <td>주어진 <code>receipt_id</code> Receipt가 노드에서 관찰되지 않았습니다.</td>
      <td>
        <ul>
          <li>제공된 <code>receipt_id</code>가 올바른지 확인하세요.</li>
          <li>다른 노드에서 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
