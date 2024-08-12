---
id: transactions
title: Các RPC Endpoint
sidebar_label: Transactions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ví dụ:

---

## Send transaction {#send-tx}

> Sends transaction. Returns the guaranteed execution status and the results the blockchain can provide at the moment.

- method: `send_tx`
- các param:
  - `signed_tx_base64`: SignedTransaction encoded in base64
  - [Optional] `wait_until`: the required minimal execution level. [Read more here](#tx-status-result). The default value is `EXECUTED_OPTIMISTIC`.

Using `send_tx` with `wait_until = NONE` is equal to legacy `broadcast_tx_async` method.  
Using `send_tx` with finality `wait_until = EXECUTED_OPTIMISTIC` is equal to legacy `broadcast_tx_commit` method.

Ví dụ về response nhận được:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "send_tx",
  "params": {
    "signed_tx_base64": "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE=",
    "wait_until": "INCLUDED_FINAL"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=send_tx \
    params:='{
      "signed_tx_base64": "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE=",
      "wait_until": "EXECUTED"
    }'
```

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=send_tx \
    params:='{
      "signed_tx_base64": "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
    }'
```

</TabItem>
</Tabs>

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/docs/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "final_execution_status": "FINAL",
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

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-send-tx}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo quy ước [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Ví dụ:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>200</td>
      <td>Một eror đã xảy ra trong quá trình thực thi transaction</td>
      <td>
        <ul>
          <li>See <code>error.cause.info</code> for details, likely a field in the transaction was invalid</li>
          <li>If <code>error.cause.info</code> is <code>ShardCongested</code>, resubmit the identical transaction after a delay. (Consider adding a priority fee once [NEP-541](https://github.com/near/NEPs/pull/541) is released.)</li>
          <li>If <code>error.cause.info</code> is <code>ShardStuck</code>, you may also resubmit the identical transaction after a delay</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>408</td>
      <td>Transaction đã được định tuyến (route), nhưng chưa được record trên chain sau 10 giây.</td>
      <td>
        <ul>
          <li> Resubmit the request with the identical transaction (in NEAR Protocol unique transactions apply exactly once, so if the previously sent transaction gets applied, this request will just return the known result, otherwise, it will route the transaction to the chain once again)</li>
          <li>Hãy kiểm tra lại transaction của bạn là hợp lệ</li>
          <li>Kiểm tra xem account id của người ký có đủ token để thanh toán transaction fee hay không (lưu ý rằng một số token trên mỗi account có thể bị khóa để trang trải storage cost)</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Đã xảy ra lỗi với chính node đó, hoặc bị overload</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>Gởi một request đến một node khác</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## Status của Transaction {#transaction-status}

> Query status của một transaction bằng hash và trả về kết quả cuối cùng của transaction.

- method: `tx`
- các param:
  - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
  - `sender_account_id` _(used to determine which shard to query for transaction)_
  - [Optional] `wait_until`: the required minimal execution level. Read more [here](/api/rpc/transactions#tx-status-result). The default value is `EXECUTED_OPTIMISTIC`.

A Transaction status request with `wait_until != NONE` will wait until the transaction appears on the blockchain. If the transaction does not exist, the method will wait until the timeout is reached. If you only need to check whether the transaction exists, use `wait_until = NONE`, it will return the response immediately.

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "tx",
  "params": {
    "tx_hash": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
    "sender_account_id": "sender.testnet",
    "wait_until": "EXECUTED"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=tx \
    params:='{"tx_hash": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm", "sender_account_id": "sender.testnet"}'
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ kết quả nhận được là:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "final_execution_status": "FINAL",
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

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-2}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Ví dụ:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>200</td>
      <td>Một error đã xảy ra trong quá trình thực thi transaction</td>
      <td>
        <ul>
          <li>Xem <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_TRANSACTION</td>
      <td>200</td>
      <td>Transaction được request không available trên node do nó có thể chưa được record trên chain, hoặc đã bị garbage-collect</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>If the transaction had been submitted more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
          <li>Kiểm tra lại transaction hash</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>408</td>
      <td>Không thể đợi status của transaction trong khoảng thời gian timeout</td>
      <td>
        <ul>
          <li>Gởi một request đến một node khác</li>
          <li>Try again later</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Đã xảy ra lỗi với chính node đó, hoặc bị overload</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>Gởi một request đến một node khác</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## Status của Transaction với các Receipt {#transaction-status-with-receipts}

> Query status của một transaction bằng hash, trả về kết quả cuối cùng của transaction _và_ các detail của tất cả các receipt.

- method: `EXPERIMENTAL_tx_status`
- các param:
  - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
  - `sender_account_id` _(used to determine which shard to query for transaction)_
  - [Optional] `wait_until`: the required minimal execution level. Read more [here](/api/rpc/transactions#tx-status-result). The default value is `EXECUTED_OPTIMISTIC`.

A Transaction status request with `wait_until != NONE` will wait until the transaction appears on the blockchain. If the transaction does not exist, the method will wait until the timeout is reached. If you only need to check whether the transaction exists, use `wait_until = NONE`, it will return the response immediately.


Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_tx_status",
  "params": {
    "tx_hash": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
    "sender_account_id": "bowen",
    "wait_until": "EXECUTED"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status params:='{"tx_hash": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd", "sender_account_id": "bowen"}' id=dontcare
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ về response nhận được:</summary>
<p>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "final_execution_status": "FINAL",
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

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-3}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Ví dụ:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>200</td>
      <td>Một error đã xảy ra trong quá trình thực thi transaction</td>
      <td>
        <ul>
          <li>Xem <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_TRANSACTION</td>
      <td>200</td>
      <td>Transaction được request không available trên node do nó có thể chưa được record trên chain, hoặc đã bị garbage-collect</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>If the transaction had been submitted more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
          <li>Kiểm tra lại transaction hash</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>408</td>
      <td>Không thể đợi status của transaction trong khoảng thời gian timeout</td>
      <td>
        <ul>
          <li>Gởi một request đến một node khác</li>
          <li>Hãy thử lại sau</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Đã xảy ra lỗi với chính node đó, hoặc bị overload</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>Gởi một request đến một node khác</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

### Receipt thông qua ID {#receipt-by-id}

> Fetche một receipt thông qua ID của nó (như vậy, không có status hoặc kết quả của execute)

- method: `EXPERIMENTAL_receipt`
- params:
  - `receipt_id` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid receipt id)_

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

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
<summary>Ví dụ về response nhận được:</summary>
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

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-4}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Dưới đây là danh sách đầy đủ các error variant có thể được trả về bởi method `EXPERIMENTAL_receipt`:

<table>
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HANDLER_ERROR</td>
      <td>UNKNOWN_RECEIPT</td>
      <td>200</td>
      <td>Receipt với <code>receipt_id</code> đã cho chưa bao giờ được thấy trên node</td>
      <td>
        <ul>
          <li>Kiểm tra <code>receipt_id</code> đã cho có chính xác không</li>
          <li>Gởi một request đến một node khác</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Đã xảy ra lỗi với chính node đó, hoặc bị overload</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>Gởi một request đến một node khác</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Transaction Execution Levels {#tx-status-result}

All the methods listed above have `wait_until` request parameter, and `final_execution_status` response value. They correspond to the same enum `TxExecutionStatus`. See the detailed explanation for all the options:

```rust
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TxExecutionStatus {
  /// Transaction is waiting to be included into the block
  None,
  /// Transaction is included into the block. The block may be not finalized yet
  Included,
  /// Transaction is included into the block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for tx and each receipt may be not finalized yet
  #[default]
  ExecutedOptimistic,
  /// Transaction is included into finalized block
  IncludedFinal,
  /// Transaction is included into finalized block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for each receipt may be not finalized yet
  Executed,
  /// Transaction is included into finalized block +
  /// Execution of all transaction receipts is finalized, including refund receipts
  Final,
}
```

---

# Deprecated methods {#deprecated}

## [deprecated] Send transaction (async) {#send-transaction-async}

> Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

> Send một transaction và lập tức trả về transaction hash.

- method: `broadcast_tx_async`
- các param: [SignedTransaction được encode trong base64]

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

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

Ví dụ về response nhận được:

```json
{
  "jsonrpc": "2.0",
  "result": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
  "id": "dontcare"
}
```

Final transaction results can be queried using [Transaction Status](#transaction-status) or [NearBlocks Explorer](https://testnet.nearblocks.io/) using the above `result` hash returning a result similar to the example below.

![NEAR-Explorer-transactionHash](/docs/assets/NEAR-Explorer-transactionHash.png)

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Ví dụ:

<table class="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr class="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## [deprecated] Send transaction (await) {#send-transaction-await}

> Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

> Send một transaction và đợi đến khi transaction hoàn tất. _(Có timeout là 10 giây)_

- method: `broadcast_tx_commit`
- các param: `[SignedTransaction được encode dưới dạng base64]`

Example:

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
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "final_execution_status": "FINAL",
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

#### What could go wrong? {#what-could-go-wrong-1}

When API request fails, RPC server returns a structured error response with a limited number of well-defined error variants, so client code can exhaustively handle all the possible error cases. Our JSON-RPC errors follow [verror](https://github.com/joyent/node-verror) convention for structuring the error response:


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

> **Heads up**
> 
> The fields `code`, `data`, and `message` in the structure above are considered legacy ones and might be deprecated in the future. Please, don't rely on them.

Here is the exhaustive list of the error variants that can be returned by `broadcast_tx_commit` method:

<table class="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>INVALID_TRANSACTION</td>
      <td>200</td>
      <td>An error happened during transaction execution</td>
      <td>
        <ul>
          <li>See <code>error.cause.info</code> for details, likely a field in the transaction was invalid</li>
          <li>If <code>error.cause.info</code> is <code>ShardCongested</code>, resubmit the identical transaction after a delay. (Consider adding a priority fee once [NEP-541](https://github.com/near/NEPs/pull/541) is released.)</li>
          <li>If <code>error.cause.info</code> is <code>ShardStuck</code>, you may also resubmit the identical transaction after a delay</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TIMEOUT_ERROR</td>
      <td>408</td>
      <td>Transaction was routed, but has not been recorded on chain in 10 seconds.</td>
      <td>
        <ul>
          <li> Resubmit the request with the identical transaction (in NEAR Protocol unique transactions apply exactly once, so if the previously sent transaction gets applied, this request will just return the known result, otherwise, it will route the transaction to the chain once again)</li>
          <li>Check that your transaction is valid</li>
          <li>Check that the signer account id has enough tokens to cover the transaction fees (keep in mind that some tokens on each account are locked to cover the storage cost)</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>400</td>
      <td>Passed arguments can't be parsed by JSON RPC server (missing arguments, wrong format, etc.)</td>
      <td>
        <ul>
          <li>Check the arguments passed and pass the correct ones</li>
          <li>Check <code>error.cause.info</code> for more details</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
          <li>Check <code>error.cause.info</code> for more details</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
