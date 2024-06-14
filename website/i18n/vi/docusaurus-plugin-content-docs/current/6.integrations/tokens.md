---
id: fungible-tokens
title: Fungible tokens
sidebar_label: Fungible Tokens
---

## Giới thiệu {#introduction}

Vui lòng xem [tiêu chuẩn kỹ thuật cho fungible token](https://nomicon.io/Standards/FungibleToken/) và một [ví dụ implementation](https://github.com/near-examples/FT) để tham khảo chi tiết.

Một khía cạnh đáng chú ý của tiêu chuẩn là tên method được bắt đầu bằng `ft_`. Nó là một quy ước hữu ích khi tìm kiếm các transactions có liên quan đến các fungible token.

## Lấy số dư {#get-balance}

Sử dụng [NEAR CLI](/docs/tools/near-cli) tool, chúng ta có thể kiểm tra số dư của một account với [`near view`](/docs/tools/near-cli#near-view):

`near view ft.demo.testnet ft_balance_of '{"account_id": "mike.testnet"}'`

Trả về:

```
View call: ft.demo.testnet.ft_balance_of({"account_id": "mike.testnet"})
'1000000'
```

Một cách thay thế, bạn có thể [call một contract function](/api/rpc/setup#call-a-contract-function) sử dụng `query` RPC endpoint. Bên dưới là một ví dụ sử dụng HTTPie:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=ftbalance method=query \
params:='{
  "request_type": "call_function",
  "finality": "final",
  "account_id": "ft.demo.testnet",
  "method_name": "ft_balance_of",
  "args_base64": "eyJhY2NvdW50X2lkIjogIm1pa2UudGVzdG5ldCJ9"
}'
```

Trả về:

```bash
HTTP/1.1 200 OK
Alt-Svc: clear
Via: 1.1 google
access-control-allow-origin:
content-length: 176
content-type: application/json
date: Thu, 27 May 2021 12:53:38 GMT

{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "block_hash": "3mvNHpZAsXiJ6SuHU1mbLVB4iXCfh5i5d41pnkaSoaJ5",
        "block_height": 49282350,
        "logs": [],
        "result": [ 34, 49, 48, 48, 48, 48, 48, 48, 34 ]
    }
}
```

Như đã nhắc trước đó, `kết quả` là một mảng các byte. Có rất nhiều cách để convert các byte này thành một form human-readable như [dtool CLI](https://github.com/guoxbin/dtool#installation).

`dtool a2h '[34,49,48,48,48,48,48,48,34]' | dtool h2s`

Trả về:

`"1000000"`

**Chú ý:** Số dư fungible token của account `mike.testnet` là `1000000` được thể hiện trong dấu nháy kép. Bởi vì nó là một vấn đề với JSON serialization. Các khoản tiền nhận được trong các tham số và các kết quả cần phải được serialize dưới dạng Base-10 string, ví dụ. "100". Điều này được thực hiện để tránh giới hạn JSON của giá trị integer tối đa là 2**53, một việc chắc chắn có thể xảy ra với các fungible tokens.

## Lấy thông tin về FT {#get-info-about-the-ft}

Bạn có thể lấy `name`, `decimals`, `icon` và bất kỳ các parameter nào bằng cách gọi function:
  - using NEAR CLI:

```bash
near view <contract_account_id> ft_metadata
```

Result:

```bash
View call: ft.demo.testnet.ft_metadata()
{
  spec: 'ft-1.0.0',
  name: 'Example Token Name',
  symbol: 'MOCHI',
  icon: null,
  reference: null,
  reference_hash: null,
  decimals: 24
}
```

  - with JSON RPC call:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=ftmetadata method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "<contract_account_id>",
    "method_name": "ft_metadata",
    "args_base64": ""
  }'
```

Example response:

```bash
HTTP/1.1 200 OK
Alt-Svc: clear
Via: 1.1 google
access-control-allow-origin:
content-length: 604
content-type: application/json
date: Wed, 02 Jun 2021 15:51:17 GMT

{
  "id": "ftmetadata",
  "jsonrpc": "2.0",
  "result": {
      "block_hash": "B3fu3v4dmn19B6oqjHUXN3k5NhdP9EW5kkjyuFUDpa1r",
      "block_height": 50061565,
      "logs": [],
      "result": [ 123, 34, 115, 112, 101, 99, 34, 58, 34, 102, 116, 45, 49, 46, 48, 46, 48, 34, 44, 34, 110, 97, 109, 101, 34, 58, 34, 69, 120, 97, 109, 112, 108, 101, 32, 84, 111, 107, 101, 110, 32, 78, 97, 109, 101, 34, 44, 34, 115, 121, 109, 98, 111, 108, 34, 58, 34, 77, 79, 67, 72, 73, 34, 44, 34, 105, 99, 111, 110, 34, 58, 110, 117, 108, 108, 44, 34, 114, 101, 102, 101, 114, 101, 110, 99, 101, 34, 58, 110, 117, 108, 108, 44, 34, 114, 101, 102, 101, 114, 101, 110, 99, 101, 95, 104, 97, 115, 104, 34, 58, 110, 117, 108, 108, 44, 34, 100, 101, 99, 105, 109, 97, 108, 115, 34, 58, 50, 52, 125 ]
  }
}
```

Decoded result in this case is:

```json
{
    "spec": "ft-1.0.0",
    "name": "Example Token Name",
    "symbol": "MOCHI",
    "icon": null,
    "reference": null,
    "reference_hash": null,
    "decimals": 24
}
```

## Transfer đơn giản {#simple-transfer}

To follow this guide, please check the [step by step instructions](/integrations/create-transactions#low-level----create-a-transaction) on how to create a transaction first.

In order to send a fungible token to an account, the receiver must have a storage deposit. This is because each smart contract on NEAR must account for storage used, and each account on a fungible token contract is a key-value pair, taking up a small amount of storage. For more information, please see [how storage works in NEAR](/concepts/storage/storage-staking). To check if account has deposited the storage for this FT do the following:

Get storage balance of the account. `storage_balance_of` function returns the amount of deposited storage or `null` if there is no deposit.
  - using NEAR CLI:

```bash
near view <contract_account_id> storage_balance_of '{"account_id": "<user_account_id>"}'
```


    Result:

```bash
View call: ft.demo.testnet.storage_balance_of({"account_id": "serhii.testnet"})
null
```

  - with JSON RPC call:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=storagebalanceof method=query \
  params:='{
     "request_type": "call_function",
     "finality": "final",
     "account_id": "ft.demo.testnet",
     "method_name": "storage_balance_of",
     "args_base64": "eyJhY2NvdW50X2lkIjogInNlcmhpaS50ZXN0bmV0In0K"
  }'
```

Example response:

```bash
HTTP/1.1 200 OK
Alt-Svc: clear
Via: 1.1 google
access-control-allow-origin:
content-length: 173
content-type: application/json
date: Wed, 02 Jun 2021 14:22:01 GMT
{
  "id": "storagebalanceof",
  "jsonrpc": "2.0",
  "result": {
      "block_hash": "EkM2j4yxRVoQ1TCqF2KUb7J4w5G1VsWtMLiycq6k3f53",
      "block_height": 50054247,
      "logs": [],
      "result": [ 110, 117, 108, 108 ]
  }
}
```

Decoded result in this case is `null`.

Get the minimum storage required for FT. (The storage used for an account's key-value pair.)

  - using NEAR CLI:

```bash
near view <contract_account_id> storage_balance_bounds`
```

Result:

```bash
View call: ft.demo.testnet.storage_balance_bounds()
{ min: '1250000000000000000000', max: '1250000000000000000000' }
```

  - with JSON RPC call

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=storagebalancebounds method=query \
  params:='{
      "request_type": "call_function",
      "finality": "final",
      "account_id": "<contract_account_id>",
      "method_name": "storage_balance_bounds",
      "args_base64": ""
  }'
```

Example response:

```bash
HTTP/1.1 200 OK
Alt-Svc: clear
Via: 1.1 google
access-control-allow-origin:
content-length: 357
content-type: application/json
date: Wed, 02 Jun 2021 15:42:49 GMT

{
  "id": "storagebalancebounds",
  "jsonrpc": "2.0",
  "result": {
      "block_hash": "Fy3mBqwj5nvUDha3X7G61kmUeituHASEX12oCASrChEE",
      "block_height": 50060878,
      "logs": [],
      "result": [ 123, 34, 109, 105, 110, 34, 58, 34, 49, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 34, 44, 34, 109, 97, 120, 34, 58, 34, 49, 50, 53, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 34, 125 ]
  }
}
```

Decoded result should look similar to:

```json
  {
    "min": "1250000000000000000000",
    "max": "1250000000000000000000"
  }
```

Basic fungible tokens are simple smart contracts that don't have variable storage as compared to a smart contract that might store free-form text, for instance. The only storage needed is for an accounts key-value pair, which will always be covered by the `1250000000000000000000` yoctoⓃ storage balance.

If there is not enough deposit for the storage or returned value is `null` - you should deposit more storage with the next command:
  - using NEAR CLI, don't forget to convert from yoctoⓃ to Ⓝ:

```bash
near call <contract_account_id> storage_deposit '{"account_id": "<user_account_id>"}' --accountId <sender_account_id> --deposit <deposit in Ⓝ>
```

Result example:

```bash
Scheduling a call: ft.demo.testnet.storage_deposit() with attached 0.125 NEAR
Transaction Id 9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
{ total: '1250000000000000000000', available: '0' }
```

  - with JSON RPC call:

  At the top of this section is a link detailing how to [construct a transaction](/integrations/create-transactions#low-level----create-a-transaction) without the full abstraction of the [`near-api-js` library](https://www.npmjs.com/package/near-api-js). For this and future examples that use the [RPC method `broadcast_tx_commit`](https://docs.near.org/api/rpc/setup#send-transaction-await) we will provide a JSON-like object meant to act similar to [pseudocode](https://en.wikipedia.org/wiki/Pseudocode), only imparting high-level details of a transaction. This code block below is the first example of this, detailing what goes into the transaction discussed currently, involving the method `storage_deposit`.

```yaml
Transaction: {
    block_hash: `456…abc`,
    signer_id: "serhii.testnet",
    public_key: "ed25519:789…def",
    nonce: 123,
    receiver_id: "ft.demo.testnet",
    actions: [
        FunctionCall(
            FunctionCallAction {
                method_name: storage_deposit,
                args: `{"account_id": "robertyan.near"}`,
                gas: 300000000000000,
                deposit: 1250000000000000000000,
            },
        ),
    ]
}
```

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZi/qoVEgrAAAPAAAAZnQuZGVtby50ZXN0bmV0JYbWPOu0P9T32vtUKnZSh+EaoboQqg0/De2i8Y+AjHIBAAAAAg8AAABzdG9yYWdlX2RlcG9zaXQCAAAAe30AQHoQ81oAAAAAILSd2XlDeBoAAAAAAAAAZF7+s4lcHOzy+re59VErt7LcZkPMMUVgOJV8LH5TsLBBv+8h/5tZ6+HFwxSp605A4c46oS9Jw4KBRXZD07lKCg=="]'
```

<details>

<summary>**Example Response:**</summary>

```json
{
  "id": "myid",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "serhii.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "e30=",
                  "deposit": "125000000000000000000000",
                  "gas": 100000000000000,
                  "method_name": "storage_deposit"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "4urgFabknn1myZkjTYdb1BFSoEimP21k9smCUWoSggA7",
        "receiver_id": "ft.demo.testnet"
      },
      {
        "predecessor_id": "ft.demo.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "123750000000000000000000"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "7neJYE45vXnQia1LQqWuAfyTRXHy4vv88JaULa5DnNBd",
        "receiver_id": "serhii.testnet"
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
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "2c59u2zYj41JuhMfPUCKjNucmYfz2Jt83JLWP6VyQn1S",
        "receiver_id": "serhii.testnet"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18587201427159524319124"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "kaYatRKxcC1NXac69WwTqg6K13oXq2yEuy4LLZtsV2G",
        "receiver_id": "serhii.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "6Gz6P8N3F447kRc7kkxEhuZRZTzfuTUEagye65bPVGb",
        "id": "4urgFabknn1myZkjTYdb1BFSoEimP21k9smCUWoSggA7",
        "outcome": {
          "executor_id": "ft.demo.testnet",
          "gas_burnt": 4258977405434,
          "logs": [],
          "receipt_ids": [
            "7neJYE45vXnQia1LQqWuAfyTRXHy4vv88JaULa5DnNBd",
            "kaYatRKxcC1NXac69WwTqg6K13oXq2yEuy4LLZtsV2G"
          ],
          "status": {
            "SuccessValue": "eyJ0b3RhbCI6IjEyNTAwMDAwMDAwMDAwMDAwMDAwMDAiLCJhdmFpbGFibGUiOiIwIn0="
          },
          "tokens_burnt": "425897740543400000000"
        },
        "proof": []
      },
      {
        "block_hash": "J6YXMnLPfLEPyvL3fWdhWPzpWAeW8zNY2CwAFwAg9tfr",
        "id": "7neJYE45vXnQia1LQqWuAfyTRXHy4vv88JaULa5DnNBd",
        "outcome": {
          "executor_id": "serhii.testnet",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": [
            "2c59u2zYj41JuhMfPUCKjNucmYfz2Jt83JLWP6VyQn1S"
          ],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "D6tGfHwKh21PqzhBTsdKCsTtZvXFDkmH39dQiQBoGN3w"
          }
        ]
      },
      {
        "block_hash": "HRRF7N1PphZ46eN5g4DjqEgYHBYM76yGiXSTYWsfMGoy",
        "id": "2c59u2zYj41JuhMfPUCKjNucmYfz2Jt83JLWP6VyQn1S",
        "outcome": {
          "executor_id": "serhii.testnet",
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
        "block_hash": "J6YXMnLPfLEPyvL3fWdhWPzpWAeW8zNY2CwAFwAg9tfr",
        "id": "kaYatRKxcC1NXac69WwTqg6K13oXq2yEuy4LLZtsV2G",
        "outcome": {
          "executor_id": "serhii.testnet",
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
            "hash": "1uVJZ8vNQpHMwPA38DYJjk9PpvnHDhsDcMxrTXcwf1s"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": "eyJ0b3RhbCI6IjEyNTAwMDAwMDAwMDAwMDAwMDAwMDAiLCJhdmFpbGFibGUiOiIwIn0="
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "e30=",
            "deposit": "125000000000000000000000",
            "gas": 100000000000000,
            "method_name": "storage_deposit"
          }
        }
      ],
      "hash": "6sDUF1f5hebpybUbipNJer5ez13EY4HW1VBJEBqZjCEm",
      "nonce": 47589658000011,
      "public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN",
      "receiver_id": "ft.demo.testnet",
      "signature": "ed25519:31PfuinsVvM1o2CmiZbSguFkZKYqAtkf5PHerfexhDbC3SsJWDzRFBpoUYTNDJddhKeqs93GQ3SHtUyqaSYhhQ9X",
      "signer_id": "serhii.testnet"
    },
    "transaction_outcome": {
      "block_hash": "5XiuxzTpyw6p2NTD5AqrZYNW7SHvpj8MhUCyn1x2KSQR",
      "id": "6sDUF1f5hebpybUbipNJer5ez13EY4HW1VBJEBqZjCEm",
      "outcome": {
        "executor_id": "serhii.testnet",
        "gas_burnt": 2427959010878,
        "logs": [],
        "receipt_ids": [
          "4urgFabknn1myZkjTYdb1BFSoEimP21k9smCUWoSggA7"
        ],
        "status": {
          "SuccessReceiptId": "4urgFabknn1myZkjTYdb1BFSoEimP21k9smCUWoSggA7"
        },
        "tokens_burnt": "242795901087800000000"
      },
      "proof": []
    }
  }
}
```

</details>

Transfer the tokens:
  - using NEAR CLI:

```bash
near call <contract_account_id> ft_transfer '{"receiver_id": "<receiver_account_id>", "amount": "1"}' --accountId <sender_account_id> --amount 0.000000000000000000000001
```

Result example:

```bash
Scheduling a call: berryclub.ek.near.ft_transfer({"receiver_id": "volovyk.near", "amount": "1"}) with attached 0.000000000000000000000001 NEAR
Receipt: GDeE3Kv1JHgs71A22NEUbgq55r2Hvcnis8gCMyJtQ2mx
    Log [berryclub.ek.near]: Transfer 1 from serhii.near to volovyk.near
Transaction Id 3MkWKbXVP8wyy4pBofELqiE1pwx7ie2v3SKCwaobNcEe
To see the transaction in the transaction explorer, please open this url in your browser
https://nearblocks.io/txns/3MkWKbXVP8wyy4pBofELqiE1pwx7ie2v3SKCwaobNcEe
''
```

  - with JSON RPC call:

Transaction representation:

```yaml
Transaction: {
    block_hash: `456…abc`,
    signer_id: "serhii.near",
    public_key: "ed25519:789…def",
    nonce: 123,
    receiver_id: "berryclub.ek.near",
    actions: [
        FunctionCall(
            FunctionCallAction {
                method_name: ft_transfer,
                args: `{"receiver_id": "volovyk.near", "amount": "1"}`,
                gas: 300000000000000,
                deposit: 1,
            },
        ),
    ]
}
```

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["CwAAAHNlcmhpaS5uZWFyAAmQpgZcJM5nMc6f3tqmw/YI4eAvc84ZgsKMRRRzhY/6CQAAAAAAAAARAAAAYmVycnljbHViLmVrLm5lYXLLWPIiUOElkDF3u4hLAMJ0Sjeo1V338pDdHIp70va3ewEAAAACCwAAAGZ0X3RyYW5zZmVyKwAAAHsicmVjZWl2ZXJfaWQiOiJ2b2xvdnlrLm5lYXIiLCJhbW91bnQiOiIxIn0AQHoQ81oAAAEAAAAAAAAAAAAAAAAAAAAA7fDOZQt3zCtdS05Y8XaZFlwO/Gd5wkkNAHShzDiLQXk4Q4ixpraLPMJivs35PZD0gocXl1iGFbQ46NG3VllzCA=="]'
```

To get details of this transaction:

```bash
http post https://archival-rpc.mainnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
  params:='["2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX", "serhii.near"]' id=myid
```

<details>

<summary>**Example Response:**</summary>

```json
{
  "id": "myid",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "serhii.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJyZWNlaXZlcl9pZCI6InZvbG92eWsubmVhciIsImFtb3VudCI6IjEifQ==",
                  "deposit": "1",
                  "gas": 100000000000000,
                  "method_name": "ft_transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.near",
            "signer_public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM"
          }
        },
        "receipt_id": "ExhYcvwAUb3Jpm38pSQ5oobwJAouBqqDZjbhavKrZtur",
        "receiver_id": "berryclub.ek.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18418055677558685763688"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.near",
            "signer_public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM"
          }
        },
        "receipt_id": "EAPh8XrBMqm6iuVH5jsfemz4YqUxWsV8Mz241cw5tjvE",
        "receiver_id": "serhii.near"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "6Re4NTkKzD7maKx3MuoxzYVHQKqjgnXW8rNjGjeVx8YC",
        "id": "ExhYcvwAUb3Jpm38pSQ5oobwJAouBqqDZjbhavKrZtur",
        "outcome": {
          "executor_id": "berryclub.ek.near",
          "gas_burnt": 6365774114160,
          "logs": [
            "Transfer 1 from serhii.near to volovyk.near"
          ],
          "receipt_ids": [
            "EAPh8XrBMqm6iuVH5jsfemz4YqUxWsV8Mz241cw5tjvE"
          ],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "636577411416000000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "2eUmWnLExsH5jb6mALY9jTC8FiQH4FcuxQ16tn7RfkYr"
          },
          {
            "direction": "Right",
            "hash": "266d5QfDKXNbAWJgXMJXgLP97VwoMiC4Qyt8wH7xcs1Q"
          },
          {
            "direction": "Right",
            "hash": "EkJAuJigdVSZj41yGXSZYAtDV7Xwe2Hv9Xsqcv6LUZvq"
          }
        ]
      },
      {
        "block_hash": "3XMoeEdm1zE64aByFuWCrZaxfbvsjMHRFcL8Wsp95vyt",
        "id": "EAPh8XrBMqm6iuVH5jsfemz4YqUxWsV8Mz241cw5tjvE",
        "outcome": {
          "executor_id": "serhii.near",
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
            "direction": "Right",
            "hash": "EGC9ZPJHTbmCs3aQDuCkFQboGLBxU2uzrSZMsp8WonDu"
          },
          {
            "direction": "Right",
            "hash": "EsBd1n7bDAphA3HY84DrrKd1GP1VugeNiqFCET2S5sNG"
          },
          {
            "direction": "Left",
            "hash": "H4q3ByfNB7QH9QEuHN3tcGay7tjhsZwjXx3sq3Vm3Lza"
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
            "args": "eyJyZWNlaXZlcl9pZCI6InZvbG92eWsubmVhciIsImFtb3VudCI6IjEifQ==",
            "deposit": "1",
            "gas": 100000000000000,
            "method_name": "ft_transfer"
          }
        }
      ],
      "hash": "2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX",
      "nonce": 10,
      "public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM",
      "receiver_id": "berryclub.ek.near",
      "signature": "ed25519:5eJPGirNkBUbMeyRfEA4fgi1FtkgGk8pmbbkmiz3Faf6zrANpBsCs5bZd5heSTvQ6b3fEPLSPCPi2iwD2XJT93As",
      "signer_id": "serhii.near"
    },
    "transaction_outcome": {
      "block_hash": "EAcwavyaeNWZnfhYP2nAWzeDgMiuiyRHfaprFqhXgCRF",
      "id": "2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX",
      "outcome": {
        "executor_id": "serhii.near",
        "gas_burnt": 2428041740436,
        "logs": [],
        "receipt_ids": [
          "ExhYcvwAUb3Jpm38pSQ5oobwJAouBqqDZjbhavKrZtur"
        ],
        "status": {
          "SuccessReceiptId": "ExhYcvwAUb3Jpm38pSQ5oobwJAouBqqDZjbhavKrZtur"
        },
        "tokens_burnt": "242804174043600000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "GatQmy7fW5uXRJRSg7A315CWzWWcQCGk4GJXyW3cjw4j"
        },
        {
          "direction": "Right",
          "hash": "89WJwAetivZLvAkVLXUt862o7zJX7YYt6ZixdWebq3xv"
        },
        {
          "direction": "Right",
          "hash": "CH3wHSqYPJp35krLjSgJTgCFYnv1ymhd9bJpjXA31VVD"
        }
      ]
    }
  }
}
```

</details>

You can get the same info later by the transaction hash from the previous call:

  - using NEAR Explorer: https://nearblocks.io


<!--
- using NEAR CLI:
near tx-status <transaction_hash> --accountId <transaction_signer>
-->

  - with JSON RPC call

```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_tx_status \
  params:='[ "2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX", "sender.testnet"]'
```

Let's create test transaction that should fail and investigate the response. We will try to send more tokens that are available on this account:
  - using NEAR CLI:

```bash
near call <contract_account_id> ft_transfer '{"receiver_id": "<user_account_id>", "amount": "10000000000"}' --accountId <sender_account_id> --amount 0.000000000000000000000001
```

  - with JSON RPC call:

Transaction đại diện:

```yaml
Transaction: {
    block_hash: `456…abc`,
    signer_id: "serhii.near",
    public_key: "ed25519:789…def",
    nonce: 123,
    receiver_id: "berryclub.ek.near",
    actions: [
        FunctionCall(
            FunctionCallAction {
                method_name: ft_transfer,
                args: `{"receiver_id":"volovyk.near","amount":"10000000000000000000"}`,
                gas: 300000000000000,
                deposit: 1,
            },
        ),
    ]
}
```

```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZofqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTm8Xq8BTIi6utG0424Gg7CknYzLH8RH/A409jq5o0zi7gEAAAACCwAAAGZ0X3RyYW5zZmVyPwAAAHsicmVjZWl2ZXJfaWQiOiJkZXYtMTYyMzMzMzkxNjM2OC01ODcwNzQzNDg3ODUzMyIsImFtb3VudCI6IjEifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABCwjqayKdpWgM6PE0ixzm/Gy0EtdpxVn0xehMTBReVfVAKIBTDPoPSaOdT8fAhk343F5uOMfSijhTqU2mWV3oD"]'
```

Để xem chi tiết của transaction này:

```bash
http post https://archival-rpc.mainnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
  params:='["CKHzodHvFw4C87PazsniycYZZHm37CEWLE2u8VUUMU7r", "serhii.near"]' id=myid
```

<details>

<summary>**Example Response:**</summary>

```json
{
  "id": "myid",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "serhii.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJyZWNlaXZlcl9pZCI6InZvbG92eWsubmVhciIsImFtb3VudCI6IjEwMDAwMDAwMDAwMDAwMDAwMDAwIn0=",
                  "deposit": "1",
                  "gas": 100000000000000,
                  "method_name": "ft_transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.near",
            "signer_public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM"
          }
        },
        "receipt_id": "5bdBKwS1RH7wm8eoG6ZeESdhNpj9HffUcf8RoP6Ng5d",
        "receiver_id": "berryclub.ek.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "system",
            "signer_public_key": "ed25519:11111111111111111111111111111111"
          }
        },
        "receipt_id": "Td3QxpKhMdi8bfVeMiQZwNS1VzPXceQdn6xdftoC8k6",
        "receiver_id": "serhii.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18653463364152698495356"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.near",
            "signer_public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM"
          }
        },
        "receipt_id": "DwLMVTdqv9Z4g9QC4AthTXHqqeJVAH4s1tFXHQYMArW7",
        "receiver_id": "serhii.near"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "DTruWLgm5Y56yDrxUipvYqKKm8F7hxVQTarNQqe147zs",
        "id": "5bdBKwS1RH7wm8eoG6ZeESdhNpj9HffUcf8RoP6Ng5d",
        "outcome": {
          "executor_id": "berryclub.ek.near",
          "gas_burnt": 4011776278642,
          "logs": [],
          "receipt_ids": [
            "Td3QxpKhMdi8bfVeMiQZwNS1VzPXceQdn6xdftoC8k6",
            "DwLMVTdqv9Z4g9QC4AthTXHqqeJVAH4s1tFXHQYMArW7"
          ],
          "status": {
            "Failure": {
              "ActionError": {
                "index": 0,
                "kind": {
                  "FunctionCallError": {
                    "ExecutionError": "Smart contract panicked: The account doesn't have enough balance"
                  }
                }
              }
            }
          },
          "tokens_burnt": "401177627864200000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "6GHrA42oMEF4g7YCBpPw9EakkLiepTHnQBvaKtmsenEY"
          },
          {
            "direction": "Right",
            "hash": "DCG3qZAzf415twXfHmgBUdB129g2iZoQ4v8dawwBzhSh"
          }
        ]
      },
      {
        "block_hash": "F9xNWGhJuYW336f3qVaDDAipsyfpudJHYbmt5in3MeMT",
        "id": "Td3QxpKhMdi8bfVeMiQZwNS1VzPXceQdn6xdftoC8k6",
        "outcome": {
          "executor_id": "serhii.near",
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
            "direction": "Right",
            "hash": "CJNvis1CoJmccshDpPBrk3a7fdZ5HnMQuy3p2Kd2GCdS"
          },
          {
            "direction": "Left",
            "hash": "4vHM3fbdNwXGMp9uYzVKB13abEM6qdPUuZ9rfrdsaDzc"
          }
        ]
      },
      {
        "block_hash": "F9xNWGhJuYW336f3qVaDDAipsyfpudJHYbmt5in3MeMT",
        "id": "DwLMVTdqv9Z4g9QC4AthTXHqqeJVAH4s1tFXHQYMArW7",
        "outcome": {
          "executor_id": "serhii.near",
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
            "hash": "BR3R7tjziEgXMiHaJ7VuuXCo2yBHB2ZzsoxobPhPjFeJ"
          },
          {
            "direction": "Left",
            "hash": "4vHM3fbdNwXGMp9uYzVKB13abEM6qdPUuZ9rfrdsaDzc"
          }
        ]
      }
    ],
    "status": {
      "Failure": {
        "ActionError": {
          "index": 0,
          "kind": {
            "FunctionCallError": {
              "ExecutionError": "Smart contract panicked: The account doesn't have enough balance"
            }
          }
        }
      }
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZWNlaXZlcl9pZCI6InZvbG92eWsubmVhciIsImFtb3VudCI6IjEwMDAwMDAwMDAwMDAwMDAwMDAwIn0=",
            "deposit": "1",
            "gas": 100000000000000,
            "method_name": "ft_transfer"
          }
        }
      ],
      "hash": "CKHzodHvFw4C87PazsniycYZZHm37CEWLE2u8VUUMU7r",
      "nonce": 12,
      "public_key": "ed25519:eLbduR3uJGaAHLXeGKEfo1fYmYFKkLyR1R8ZPCxrJAM",
      "receiver_id": "berryclub.ek.near",
      "signature": "ed25519:63MC3f8m5jeycpy97G9XaCwmJLx4YHRn2x5AEJDiYYzZ3TzdzWsrz8dgaz2kHR2jsWh35aZoL97tw1RRTHK6ZQYq",
      "signer_id": "serhii.near"
    },
    "transaction_outcome": {
      "block_hash": "7YUgyBHgmbGy1edhaWRZeBVq9zzbnzrRGtVRQS5PpooW",
      "id": "CKHzodHvFw4C87PazsniycYZZHm37CEWLE2u8VUUMU7r",
      "outcome": {
        "executor_id": "serhii.near",
        "gas_burnt": 2428084223182,
        "logs": [],
        "receipt_ids": [
          "5bdBKwS1RH7wm8eoG6ZeESdhNpj9HffUcf8RoP6Ng5d"
        ],
        "status": {
          "SuccessReceiptId": "5bdBKwS1RH7wm8eoG6ZeESdhNpj9HffUcf8RoP6Ng5d"
        },
        "tokens_burnt": "242808422318200000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "Agyg5P46kSVa4ptG9spteHpZ5c8XkvfbmDN5EUXhC1Wr"
        },
        {
          "direction": "Right",
          "hash": "3JDKkLCy5bJaAU3exa66sotTwJyGwyChxeNJgKReKw34"
        },
        {
          "direction": "Right",
          "hash": "7GXEmeQEJdd4c2kgN7NoYiF2bkjzV4bNkMmkhpK14NTz"
        }
      ]
    }
  }
}
```

</details>

Was the fungible token transfer successful?
  - Look for `result` » `transaction_outcome` » `outcome` » see if `SuccessReceiptId` is a key
  - if `SuccessReceiptId` is not a key, this fungible token transfer has `failed`.
  - If it does have that key, get the value, which is a `receipt ID`
  - Loop through `result` » `receipts_outcome` until you find an object that ID (from above) under the id key
  - in that object check `outcome` » `status` » (see if SuccessValue is a key)
  - If SuccessValue is a key, fungible token transfer succeeded, if not, it failed.

To determine how many fungible tokens were transferred, look at:
  - `result` » `transaction` » `actions` » `FunctionCall` » `args`
  - then take the args and `base64` decode it, that will give you a JSON payload and look for the `amount` key
  - It will contain a stringified number that represents the number of fungible tokens that were successfully transferred

## Transfer và call {#transfer-and-call}

If the idea of a fungible token using "transfer and call" is new, please review the comments above the function in [the Nomicon spec](https://nomicon.io/Standards/Tokens/FungibleToken/Core#reference-level-explanation). Also, see a similar idea [from EIP-677](https://github.com/ethereum/EIPs/issues/677).

For this example we will build and deploy FT contracts from [near-sdk-rs/examples/fungible-token](https://github.com/near/near-sdk-rs/tree/master/examples/fungible-token).

Let's call `ft_transfer_call` function on `ft` contract (receiver) and examine successful and unsuccessful scenarios.

### Transfer và call thành công {#successful-transfer-and-call}
  Let's send 10 N to `DEFI` contract that requires only 9 N.

  - using NEAR CLI
    ```bash
    near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "10", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001
    ```

  - with JSON RPC call

Transaction representation:

```yaml
Transaction: {
    block_hash: `456…abc`,
    signer_id: "serhii.testnet",
    public_key: "ed25519:789…def",
    nonce: 123,
    receiver_id: "dev-1623333795623-21399959778159",
    actions: [
        FunctionCall(
            FunctionCallAction {
                method_name: ft_transfer_call,
                args: `{"receiver_id":"dev-1623693121955-71667632531176","amount":"10","msg":"take-my-money"}`,
                gas: 300000000000000,
                deposit: 1,
            },
        ),
    ]
}
```

```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZqPqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTn9j4g2IJ8nGQ38i3+k+4WBAeJL1xP7ygQhC7CrvEG4NQEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxWAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzNjkzMTIxOTU1LTcxNjY3NjMyNTMxMTc2IiwiYW1vdW50IjoiMTAiLCJtc2ciOiJ0YWtlLW15LW1vbmV5In0AQHoQ81oAAAEAAAAAAAAAAAAAAAAAAAAANY2lHqJlAJYNDGEQiUNnmfiBV44Q1sdg45xNlNvlROOM+AtN1z3PSJqM6M6jAKXUwANoQTzFqXhIMHIjIPbTAA=="]'
```

To get details of this transaction:

```bash
http post https://archival-rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
    params:='["5n1kwA3TQQyFTkddR2Jau3H1Pt8ebQNGaov6aCQ6TDp1", "serhii.testnet"]' id=myid
```

<details>

<summary>**Example Response:**</summary>

```json
{
  "id": "myid",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "serhii.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzNjkzMTIxOTU1LTcxNjY3NjMyNTMxMTc2IiwiYW1vdW50IjoiMTAiLCJtc2ciOiJ0YWtlLW15LW1vbmV5In0=",
                  "deposit": "1",
                  "gas": 100000000000000,
                  "method_name": "ft_transfer_call"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk",
        "receiver_id": "dev-1623333795623-21399959778159"
      },
      {
        "predecessor_id": "dev-1623333795623-21399959778159",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJzZW5kZXJfaWQiOiJzZXJoaWkudGVzdG5ldCIsImFtb3VudCI6IjEwIiwibXNnIjoidGFrZS1teS1tb25leSJ9",
                  "deposit": "0",
                  "gas": 70000000000000,
                  "method_name": "ft_on_transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [
              {
                "data_id": "EiDQi54XHfdD1KEcgiNzogXxXuwTpzeQfmyqVwbq7H4D",
                "receiver_id": "dev-1623333795623-21399959778159"
              }
            ],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "EB69xtJiLRh9RNzAHgBGmom8551hrK2xSRreqbjvJgu5",
        "receiver_id": "dev-1623693121955-71667632531176"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "13116953530949529501760"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "AkwgvxUspRgy255fef2hrEWMbrMWFtnTRGduSgDRdSW1",
        "receiver_id": "serhii.testnet"
      },
      {
        "predecessor_id": "dev-1623333795623-21399959778159",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJzZW5kZXJfaWQiOiJzZXJoaWkudGVzdG5ldCIsInJlY2VpdmVyX2lkIjoiZGV2LTE2MjM2OTMxMjE5NTUtNzE2Njc2MzI1MzExNzYiLCJhbW91bnQiOiIxMCJ9",
                  "deposit": "0",
                  "gas": 5000000000000,
                  "method_name": "ft_resolve_transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [
              "EiDQi54XHfdD1KEcgiNzogXxXuwTpzeQfmyqVwbq7H4D"
            ],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR",
        "receiver_id": "dev-1623333795623-21399959778159"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "761030677610514102464"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "9rxcC9o8x4RX7ftsDCfxK8qnisYv45rA1HGPxhuukWUL",
        "receiver_id": "serhii.testnet"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "2137766093631769060520"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "H7YWFkvx16Efy2keCQ7BQ67BMEsdgdYLqJ99G4H3dR1D",
        "receiver_id": "serhii.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "B9yZz1w3yzrqQnfBFAf17S4TLaHakXJWqmFDBbFxaEiZ",
        "id": "Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk",
        "outcome": {
          "executor_id": "dev-1623333795623-21399959778159",
          "gas_burnt": 20612680932083,
          "logs": [
            "Transfer 10 from serhii.testnet to dev-1623693121955-71667632531176"
          ],
          "receipt_ids": [
            "EB69xtJiLRh9RNzAHgBGmom8551hrK2xSRreqbjvJgu5",
            "4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR",
            "H7YWFkvx16Efy2keCQ7BQ67BMEsdgdYLqJ99G4H3dR1D"
          ],
          "status": {
            "SuccessReceiptId": "4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR"
          },
          "tokens_burnt": "2061268093208300000000"
        },
        "proof": []
      },
      {
        "block_hash": "7Z4LHWksvw7sKYKwpQfjEMG8oigjtRXKa3EopN7hS2v7",
        "id": "EB69xtJiLRh9RNzAHgBGmom8551hrK2xSRreqbjvJgu5",
        "outcome": {
          "executor_id": "dev-1623693121955-71667632531176",
          "gas_burnt": 3568066327145,
          "logs": [
            "Sender @serhii.testnet is transferring 10 tokens using ft_on_transfer, msg = take-my-money"
          ],
          "receipt_ids": [
            "AkwgvxUspRgy255fef2hrEWMbrMWFtnTRGduSgDRdSW1"
          ],
          "status": {
            "SuccessValue": "IjEi"
          },
          "tokens_burnt": "356806632714500000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "5X2agUKpqmk7QkUZsDQ4R4HdX7zXeuPYpVAfvbmF5Gav"
          }
        ]
      },
      {
        "block_hash": "CrSDhQNn72K2Qr1mmoM9j3YHCo3wfZdmHjpHJs74WnPk",
        "id": "AkwgvxUspRgy255fef2hrEWMbrMWFtnTRGduSgDRdSW1",
        "outcome": {
          "executor_id": "serhii.testnet",
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
            "direction": "Right",
            "hash": "4WG6hF5fTAtM7GSqU8mprrFwRVbChGMCV2NPZEjEdnc1"
          }
        ]
      },
      {
        "block_hash": "CrSDhQNn72K2Qr1mmoM9j3YHCo3wfZdmHjpHJs74WnPk",
        "id": "4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR",
        "outcome": {
          "executor_id": "dev-1623333795623-21399959778159",
          "gas_burnt": 6208280264404,
          "logs": [
            "Refund 1 from dev-1623693121955-71667632531176 to serhii.testnet"
          ],
          "receipt_ids": [
            "9rxcC9o8x4RX7ftsDCfxK8qnisYv45rA1HGPxhuukWUL"
          ],
          "status": {
            "SuccessValue": "Ijki"
          },
          "tokens_burnt": "620828026440400000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "BzT8YhEDDWSuoGGTBzH2Cj5GC4c56uAQxk41by4KVnXi"
          }
        ]
      },
      {
        "block_hash": "3Q2Zyscj6vG5nC2vdoYfcBHU9RVaAwoxHsHzAKVcAHZ6",
        "id": "9rxcC9o8x4RX7ftsDCfxK8qnisYv45rA1HGPxhuukWUL",
        "outcome": {
          "executor_id": "serhii.testnet",
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
        "block_hash": "7Z4LHWksvw7sKYKwpQfjEMG8oigjtRXKa3EopN7hS2v7",
        "id": "H7YWFkvx16Efy2keCQ7BQ67BMEsdgdYLqJ99G4H3dR1D",
        "outcome": {
          "executor_id": "serhii.testnet",
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
            "hash": "61ak42D3duBBunCz3w4xXxoEeR2N7oav5e938TnmGFGN"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": "Ijki"
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzNjkzMTIxOTU1LTcxNjY3NjMyNTMxMTc2IiwiYW1vdW50IjoiMTAiLCJtc2ciOiJ0YWtlLW15LW1vbmV5In0=",
            "deposit": "1",
            "gas": 100000000000000,
            "method_name": "ft_transfer_call"
          }
        }
      ],
      "hash": "5n1kwA3TQQyFTkddR2Jau3H1Pt8ebQNGaov6aCQ6TDp1",
      "nonce": 47589658000040,
      "public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN",
      "receiver_id": "dev-1623333795623-21399959778159",
      "signature": "ed25519:256qp2jAGXhhw2t2XfUAjWwzz3XcD83DH2v9THwDPsZjCLWHU8QJd6cuA773NP9yBmTd2ZyYiFHuxVEkYqnbsaSb",
      "signer_id": "serhii.testnet"
    },
    "transaction_outcome": {
      "block_hash": "96k8kKzFuZWxyiUnT774Rg7DC3XDZNuxhxD1qEViFupd",
      "id": "5n1kwA3TQQyFTkddR2Jau3H1Pt8ebQNGaov6aCQ6TDp1",
      "outcome": {
        "executor_id": "serhii.testnet",
        "gas_burnt": 2428149065268,
        "logs": [],
        "receipt_ids": [
          "Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk"
        ],
        "status": {
          "SuccessReceiptId": "Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk"
        },
        "tokens_burnt": "242814906526800000000"
      },
      "proof": []
    }
  }
}
```

</details>

Now, let's try to follow the steps described in the previous section and determine if these transactions was successful. In addition to being successful, let's analyze the various receipts in the series of cross-contract calls to determine how many fungible tokens were transferred. This will be the most complex case we'll look at.

  1. Kiểm tra `result` » `transaction_outcome` » `outcome` » `status` có `SuccessReceiptId` là một key. Nếu không, không có bất kỳ fungible token được transfer.
  2. Lấy value của `SuccessReceiptId` key. Trong case phía trên, nó có giá trị là `Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk`.
  3. Bây giờ, phía dưới `result` » `receipts` lặp qua array cho đến khi bạn tìm thấy một receipt có `receipt_id` khớp với value từ step 2. (Chú ý rằng trong receipt, phía dưới `Actions` có một element đề cập đến việc gọi `method_name: "ft_transfer_call"`.) Trong cùng một level của JSON, có một `args` key. Nó là một giá trị đã được mã hoá dưới dạng base64 của các argument được pass lên method. Khi giải mã chúng:

```json
{"receiver_id":"dev-1623693121955-71667632531176","amount":"10","msg":"take-my-money"}
```

  4. Lặp qua từng `result` » `receipts_outcome` cho đến khi tìm được object có `id` bằng value ở step 2. Tương tự step 1, object này cũng sẽ chứa một `status` field mà có thể chứa `SuccessReceiptId` key. Một lần nữa, nếu nó không có, không có bất kỳ fungible token được transfer, ngược lại, lấy value của `SuccessReceiptId`. Trong ví dụ phía trên, value là `4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR`.
  5. Tương tự step phía trước, lặp qua `result` » `receipts_outcome` cho đến khi bạn tìm thấy object có `id` khớp với value ở step 4. Trong object này kiểm tra `outcome` » `status` có `SuccessValue` field. `SuccessValue` này thể hiện có bao nhiêu fungible token từ contract đang nhận được "trả về" fungible token contract. Chú ý rằng trong ví dụ phía trên, value là `Ijki`, đây là một phiên bản được mã hoá dưới dạng base64 của `"9"`. Tại thời điểm này, chúng ta biết được rằng có 10 fungible token đã được send (từ step 3) và 9 được nhận.

For additional clarity, let's take a look at one more optional aspect. In step 4 we isolated an obeject in `result` » `receipts_outcome`. There's an array of `receipt_ids` that's particularly interesting. The first element in the array is the receipt ID `EB69xtJiLRh9RNzAHgBGmom8551hrK2xSRreqbjvJgu5`. If we loop through the `result` » `receipts_outcome` and find this as the value for the `id` key, we'll see what happened in the function `ft_on_transfer` which takes place in the contract receiving the fungible tokens. In this object the `status` » `SuccessValue` is `IjEi` which is the base64-encoded value of `"1"`.

In summary:
1. Một user đã call fungible token contract với `ft_transfer_call` method, chỉ định receiver account, có bao nhiêu token được send, và các thông tin custom khác.
2. Receiver account được implement `ft_on_transfer`, trả về `"1"` cho callback function trên fungible token contract.
3. Callback của fungible token contract là `ft_resolve_transfer` và nhận được value `"1"`. Nó cho biết rằng 1 token đã được trả lại, vì vậy hãy trừ đi 10 token mà nó dự định gửi. Sau đó nó sẽ trả cho user lượng token đã được sử dụng trong serie back-and-forth của các cross-contract call này: `"9"`.

### Không thành công transfer and call {#failed-transfer-and-call}
Let's try to send more tokens than the account has:

  - using NEAR CLI

```bash
    near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "1000000000", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001
```

Transaction representation:

```yaml
Transaction: {
    block_hash: `456…abc`,
    signer_id: "serhii.testnet",
    public_key: "ed25519:789…def",
    nonce: 123,
    receiver_id: "dev-1623333795623-21399959778159",
    actions: [
        FunctionCall(
            FunctionCallAction {
                method_name: ft_transfer_call,
                args: `{"receiver_id":"dev-1623333916368-58707434878533","amount":"1000000000","msg":"take-my-money"}`,
                gas: 300000000000000,
                deposit: 1,
            },
        ),
    ]
}
```

  - with JSON RPC call

```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZn/qoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTnrbOQ93Wv9xxBwmq4yDYrssCpwKSI2bzjNNCCCHMZKNwEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxeAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzMzMzOTE2MzY4LTU4NzA3NDM0ODc4NTMzIiwiYW1vdW50IjoiMTAwMDAwMDAwMCIsIm1zZyI6InRha2UtbXktbW9uZXkifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABQh3k+7zG2m/Yz3O/FBrvLaBwR/5YRB5FbFnb27Nfu6BW/Wh77RFH7+ktBwGLBwFbJGxiumIcsqBiGXgg1EPMN"]'
```

To get details of this transaction:

```bash
http post https://archival-rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
    params:='["FQsh44pvEsK8RS9AbK868CmGwfhUU2pUrizkQ6wCWTsB", "serhii.testnet"]' id=myid
```

<details>

<summary>**Example response**:</summary>

```json
{
  "id": "myid",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "serhii.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzMzMzOTE2MzY4LTU4NzA3NDM0ODc4NTMzIiwiYW1vdW50IjoiMTAwMDAwMDAwMCIsIm1zZyI6InRha2UtbXktbW9uZXkifQ==",
                  "deposit": "1",
                  "gas": 100000000000000,
                  "method_name": "ft_transfer_call"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo",
        "receiver_id": "dev-1623333795623-21399959778159"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "system",
            "signer_public_key": "ed25519:11111111111111111111111111111111"
          }
        },
        "receipt_id": "Euy4Q33DfvJTXD8HirE5ACoXnw9PMTQ2Hq47aGyD1spc",
        "receiver_id": "serhii.testnet"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18681184841157733814920"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "serhii.testnet",
            "signer_public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN"
          }
        },
        "receipt_id": "6ZDoSeV3gLFS2NXqMCJGEUR3VwBpSxBEPjnEEaAQfmXL",
        "receiver_id": "serhii.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "BohRBwqjRHssDVS9Gt9dj3SYuipxHA81xXFjRVLqgGeb",
        "id": "83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo",
        "outcome": {
          "executor_id": "dev-1623333795623-21399959778159",
          "gas_burnt": 3734715409940,
          "logs": [],
          "receipt_ids": [
            "Euy4Q33DfvJTXD8HirE5ACoXnw9PMTQ2Hq47aGyD1spc",
            "6ZDoSeV3gLFS2NXqMCJGEUR3VwBpSxBEPjnEEaAQfmXL"
          ],
          "status": {
            "Failure": {
              "ActionError": {
                "index": 0,
                "kind": {
                  "FunctionCallError": {
                    "ExecutionError": "Smart contract panicked: The account doesn't have enough balance"
                  }
                }
              }
            }
          },
          "tokens_burnt": "373471540994000000000"
        },
        "proof": []
      },
      {
        "block_hash": "4BzTmMmTjKvfs6ANS5gmJ6GQzhqianEGWq7SaxSfPbdC",
        "id": "Euy4Q33DfvJTXD8HirE5ACoXnw9PMTQ2Hq47aGyD1spc",
        "outcome": {
          "executor_id": "serhii.testnet",
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
            "direction": "Right",
            "hash": "5ipmcdgTieQqFXWQFCwcbZhFtkHE4PL4nW3mknBchpG6"
          }
        ]
      },
      {
        "block_hash": "4BzTmMmTjKvfs6ANS5gmJ6GQzhqianEGWq7SaxSfPbdC",
        "id": "6ZDoSeV3gLFS2NXqMCJGEUR3VwBpSxBEPjnEEaAQfmXL",
        "outcome": {
          "executor_id": "serhii.testnet",
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
            "hash": "9tcjij6M8Ge4aJcAa97He5nw8pH7PF8ZjRHVahBZD2VW"
          }
        ]
      }
    ],
    "status": {
      "Failure": {
        "ActionError": {
          "index": 0,
          "kind": {
            "FunctionCallError": {
              "ExecutionError": "Smart contract panicked: The account doesn't have enough balance"
            }
          }
        }
      }
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzMzMzOTE2MzY4LTU4NzA3NDM0ODc4NTMzIiwiYW1vdW50IjoiMTAwMDAwMDAwMCIsIm1zZyI6InRha2UtbXktbW9uZXkifQ==",
            "deposit": "1",
            "gas": 100000000000000,
            "method_name": "ft_transfer_call"
          }
        }
      ],
      "hash": "FQsh44pvEsK8RS9AbK868CmGwfhUU2pUrizkQ6wCWTsB",
      "nonce": 47589658000031,
      "public_key": "ed25519:5UfEFyve3RdqKkWtALMreA9jzsAGDgCtwEXGNtkGeruN",
      "receiver_id": "dev-1623333795623-21399959778159",
      "signature": "ed25519:2cPASnxKtCoQtZ9NFq63fg8RzpjvmmE8hL4s2jk8zuhnBCD3AnYQ6chZZrUBGwu7WrsGuWUyohP1bEca4vfbsorC",
      "signer_id": "serhii.testnet"
    },
    "transaction_outcome": {
      "block_hash": "FwHUeqmYpvgkL7eBrUUAEMCuaQshcSy5vm4AHchebhK1",
      "id": "FQsh44pvEsK8RS9AbK868CmGwfhUU2pUrizkQ6wCWTsB",
      "outcome": {
        "executor_id": "serhii.testnet",
        "gas_burnt": 2428166952740,
        "logs": [],
        "receipt_ids": [
          "83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo"
        ],
        "status": {
          "SuccessReceiptId": "83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo"
        },
        "tokens_burnt": "242816695274000000000"
      },
      "proof": []
    }
  }
}
```

</details>


Let's examine this response.

  * `result` » `transaction_outcome` » `outcome` » `status` » `SuccessReceiptId` is `83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo`
  * check `result` » `receipts_outcome` » `0` » `outcome` » `status` and find `Failure` status there

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
