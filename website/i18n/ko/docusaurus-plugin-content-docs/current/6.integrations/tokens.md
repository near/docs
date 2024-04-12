---
id: fungible-tokens
title: 대체 가능한 토큰
sidebar_label: 대체 가능한 토큰 (Fungible Token)
---

## 소개 {#introduction}

세부 사항은 [대체 가능한 토큰(FT) 표준](https://nomicon.io/Standards/FungibleToken/) 및 [예제 구현](https://github.com/near-examples/FT)에 대한 사양을 참고하세요.

표준에서 한 가지 주목할만한 측면은, 메서드 이름에 `ft_`라는 접두사가 붙는다는 것입니다. 이것은 대체 가능한 토큰과 관련된 트랜잭션을 쿼리할 때 유용한 규칙이 될 것입니다.

## 잔고 가져오기 {#get-balance}

[NEAR CLI](/tools/near-cli) 도구의 추상화를 이용하여, [`near view`](/tools/near-cli#near-view)를 통해 사용자 계정의 잔고를 확인할 수 있습니다.

`near view ft.demo.testnet ft_balance_of '{"account_id": "mike.testnet"}'`

다음을 반환합니다.

```
View call: ft.demo.testnet.ft_balance_of({"account_id": "mike.testnet"})
'1000000'
```

또는, `query` RPC 엔드포인트를 사용하여 [컨트랙트 함수를 호출](/api/rpc/setup#call-a-contract-function)할 수 있습니다. 다음은 HTTPie를 사용한 예시입니다.

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

다음을 반환합니다.

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

앞에서 언급했듯이, `result`는 바이트 배열입니다. [dtool CLI](https://github.com/guoxbin/dtool#installation)와 같이, 바이트를 사람이 읽을 수 있는 형식으로 변환하는 다양한 방법이 있습니다.

`dtool a2h '[34,49,48,48,48,48,48,48,34]' | dtool h2s`

다음을 반환합니다.

`"1000000"`

**참고:** `mike.testnet` 계정의 대체 가능한 토큰 잔액은 큰 따옴표로 묶인 `1000000`입니다. 큰 따옴표로 묶인 이유는, JSON 직렬화 문제 때문입니다. 인자 및 결과에 주어진 양은 "100"과 같이 Base-10 문자열로 직렬화되어야 합니다. 이는 JSON에 있는 최대 정수 값 제한 2\*\*53을 피하기 위함입니다.

## FT에 대한 정보 얻기 {#get-info-about-the-ft}

다음과 같은 함수를 호출하여 `name`, `decimals`, `icon` 및 기타 매개변수를 가져올 수 있습니다.

- using NEAR CLI:

  ```bash
  near view <contract_account_id> ft_metadata
  ```

  결과:

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

- JSON RPC 호출 사용:

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

  응답 예시:

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

  이 경우 디코딩된 결과는 다음과 같습니다.

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

## 간단한 전송 {#simple-transfer}

이 가이드를 따르려면, 먼저 트랜잭션 생성 방법에 대한 [단계별 지침](/integrator/create-transactions#low-level----create-a-transaction)을 확인하시기 바랍니다.

대체 가능한 토큰을 계정에 보내려면, 수신자에게 스토리지 보증금이 있어야 합니다. NEAR의 각 스마트 컨트랙트는 사용된 스토리지를 고려해야 하고, 대체 가능한 토큰 컨트랙트 내 각 계정은 소량의 스토리지를 차지하는 키-값 쌍이기 때문입니다. 자세한 내용은 [NEAR에서 스토리지가 작동하는 방식](/concepts/storage/storage-staking)을 참조하세요. 계정이 이 FT에 대한 스토리지를 예치했는지 확인하려면 다음 과정을 수행하면 됩니다.

우선 계정의 스토리지 잔액을 가져옵니다. `storage_balance_of` 함수는 예치된 스토리지의 양을 반환하거나, 보증금이 없는 경우 `null`을 반환합니다.

- using NEAR CLI:

  ```bash
  near view <contract_account_id> storage_balance_of '{"account_id": "<user_account_id>"}'
  ```

  결과:

  ```bash
  View call: ft.demo.testnet.storage_balance_of({"account_id": "serhii.testnet"})
  null
  ```

- JSON RPC 호출 사용:

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

  응답 예시:

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

  이 경우 디코딩된 결과는 `null`입니다.

FT에 필요한 최소 스토리지를 확보하세요. (이는 계정의 키-값 쌍에 사용되는 스토리지입니다)

- using NEAR CLI:

  ```bash
  near view <contract_account_id> storage_balance_bounds`
  ```

  결과는 다음과 같습니다.

  ```bash
  View call: ft.demo.testnet.storage_balance_bounds()
  { min: '1250000000000000000000', max: '1250000000000000000000' }
  ```

- JSON RPC 호출 사용

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

  응답 예시:

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

  디코딩된 결과는 다음과 같은 형태입니다.

  ```json
  {
    "min": "1250000000000000000000",
    "max": "1250000000000000000000"
  }
  ```

간단한 예시를 들면, 이 컨트랙트는 자유 형식의 텍스트를 저장할 수 있는 스마트 컨트랙트와 비교했을 때 가변 스토리지가 없는 형태를 가지고 있습니다. 이 경우 필요한 스토리지는 오직 계정 키-값 쌍을 위한 공간이며, 항상 `1250000000000000000000` yoctoⓃ 만큼의 스토리지 보증금으로 처리됩니다.

스토리지에 대한 보증금이 충분하지 않거나, 반환된 값이 `null`인 경우, 다음 명령으로 더 많은 스토리지 보증금을 예치해야 합니다.

- NEAR CLI 사용(yoctoⓃ를 Ⓝ로 바꾸는 것 잊지 말기!):

  ```bash
  near call <contract_account_id> storage_deposit '{"account_id": "<user_account_id>"}' --accountId <sender_account_id> --deposit <deposit in Ⓝ>
  ```

  결과 예시:

  ```bash
  Scheduling a call: ft.demo.testnet.storage_deposit() with attached 0.125 NEAR
  Transaction Id 9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
  To see the transaction in the transaction explorer, please open this url in your browser
  https://testnet.nearblocks.io/txns/9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
  { total: '1250000000000000000000', available: '0' }
  ```

- JSON RPC 호출 사용:

이 섹션의 맨 위에는 [`near-api-js` 라이브러리](https://www.npmjs.com/package/near-api-js)의 전체 추상화 없이 [트랜잭션을 구성](/integrator/create-transactions#low-level----create-a-transaction)하는 방법을 자세히 설명하는 링크가 있습니다.[ RPC 메서드 `broadcast_tx_commit`](https://docs.near.org/api/rpc/setup#send-transaction-await)를 사용하는 이 예제와 향후 예제의 경우, 트랜잭션의 높은 수준의 세부 정보만 전달하는 [의사 코드(pseudocode)](https://en.wikipedia.org/wiki/Pseudocode)처럼 작동하는 유사 JSON 객체를 제공할 것입니다. [RPC 메서드 `broadcast_tx_commit`](https://docs.near.org/api/rpc/setup#send-transaction-await)을 사용하는 현재 및 미래의 예를 위해, 우리는 [pseudocode](https://en.wikipedia.org/wiki/Pseudocode)와 유사하게 동작하도록 의도된 JSON과 유사한 객체를 제공할 것이며 트랜잭션의 높은 수준의 세부 정보만 제공할 것입니다. 아래의 코드 블록은 이에 대한 첫 번째 예시이며, `storage_deposit` 메서드를 포함해 현재 논의된 트랜잭션에 들어가는 내용을 자세히 설명합니다.

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

````
  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
      params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZi/qoVEgrAAAPAAAAZnQuZGVtby50ZXN0bmV0JYbWPOu0P9T32vtUKnZSh+EaoboQqg0/De2i8Y+AjHIBAAAAAg8AAABzdG9yYWdlX2RlcG9zaXQCAAAAe30AQHoQ81oAAAAAILSd2XlDeBoAAAAAAAAAZF7+s4lcHOzy+re59VErt7LcZkPMMUVgOJV8LH5TsLBBv+8h/5tZ6+HFwxSp605A4c46oS9Jw4KBRXZD07lKCg=="]'
  ```
````

<details>
<summary>응답 예시:</summary>

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

토큰 전송:

- using NEAR CLI:

  ```bash
  near call <contract_account_id> ft_transfer '{"receiver_id": "<receiver_account_id>", "amount": "1"}' --accountId <sender_account_id> --amount 0.000000000000000000000001
  ```

  결과 예시:

  ```bash
  Scheduling a call: berryclub.ek.near.ft_transfer({"receiver_id": "volovyk.near", "amount": "1"}) with attached 0.000000000000000000000001 NEAR
  Receipt: GDeE3Kv1JHgs71A22NEUbgq55r2Hvcnis8gCMyJtQ2mx
      Log [berryclub.ek.near]: Transfer 1 from serhii.near to volovyk.near
  Transaction Id 3MkWKbXVP8wyy4pBofELqiE1pwx7ie2v3SKCwaobNcEe
  To see the transaction in the transaction explorer, please open this url in your browser
  https://nearblocks.io/txns/3MkWKbXVP8wyy4pBofELqiE1pwx7ie2v3SKCwaobNcEe
  ''
  ```

- JSON RPC 호출을 사용하면:

트랜잭션 표현:

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

````
  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
      params:='["CwAAAHNlcmhpaS5uZWFyAAmQpgZcJM5nMc6f3tqmw/YI4eAvc84ZgsKMRRRzhY/6CQAAAAAAAAARAAAAYmVycnljbHViLmVrLm5lYXLLWPIiUOElkDF3u4hLAMJ0Sjeo1V338pDdHIp70va3ewEAAAACCwAAAGZ0X3RyYW5zZmVyKwAAAHsicmVjZWl2ZXJfaWQiOiJ2b2xvdnlrLm5lYXIiLCJhbW91bnQiOiIxIn0AQHoQ81oAAAEAAAAAAAAAAAAAAAAAAAAA7fDOZQt3zCtdS05Y8XaZFlwO/Gd5wkkNAHShzDiLQXk4Q4ixpraLPMJivs35PZD0gocXl1iGFbQ46NG3VllzCA=="]'
  ```
````

이 트랜잭션의 세부 사항을 얻으려면, 다음과 같이 하면 됩니다.

```bash
http post https://archival-rpc.mainnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
  params:='["2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX", "serhii.near"]' id=myid
```

<details>
<summary>응답 예시:</summary>

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

이전 호출의 트랜잭션 해시를 통해, 나중에 동일한 정보를 얻을 수 있습니다.

- using NEAR Explorer: https://nearblocks.io

<!--
- using NEAR CLI:
near tx-status <transaction_hash> --accountId <transaction_signer>
-->

- JSON RPC 호출 사용

```bash
    http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_tx_status \
    params:='[ "2Fy4714idMCoja7QLdGAbQZHzV2XEnUdwZX6yGa46VMX", "sender.testnet"]'
```

실패하는 테스트 트랜잭션을 생성하고, 응답을 조사해 봅시다. 이 계정에서 사용할 수 있는 더 많은 토큰을 보내려고 합니다.

- using NEAR CLI:

  ```bash
  near call <contract_account_id> ft_transfer '{"receiver_id": "<user_account_id>", "amount": "10000000000"}' --accountId <sender_account_id> --amount 0.000000000000000000000001
  ```

- JSON RPC 호출 사용:

트랜잭션 표현:

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

````
```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZofqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTm8Xq8BTIi6utG0424Gg7CknYzLH8RH/A409jq5o0zi7gEAAAACCwAAAGZ0X3RyYW5zZmVyPwAAAHsicmVjZWl2ZXJfaWQiOiJkZXYtMTYyMzMzMzkxNjM2OC01ODcwNzQzNDg3ODUzMyIsImFtb3VudCI6IjEifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABCwjqayKdpWgM6PE0ixzm/Gy0EtdpxVn0xehMTBReVfVAKIBTDPoPSaOdT8fAhk343F5uOMfSijhTqU2mWV3oD"]'
```
````

다음과 같이 트랜잭션 세부 사항을 얻을 수 있습니다.

```bash
http post https://archival-rpc.mainnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
  params:='["CKHzodHvFw4C87PazsniycYZZHm37CEWLE2u8VUUMU7r", "serhii.near"]' id=myid
```

<details>
<summary>응답 예시:</summary>

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

대체 가능한 토큰 전송이 성공적이었나요?

- `result` » `transaction_outcome` » `outcome`으로 가서 `SuccessReceiptId`가 키인지 확인합니다.
- `SuccessReceiptId`가 키가 아니라면, 이 토큰 전송은 `실패`한 것입니다.
- 만약 키가 있다면, `receipt ID` 값을 가져옵니다.
- id 키 아래에서 (위에서 아래로) ID가 있는 객체를 찾을 때까지 `result` » `receipts_outcome`를 반복합니다.
- 해당 객체에서 `outcome` » `status`에서 SuccessValue가 키인지 확인합니다.
- SuccessValue이 키가 맞다면, 토큰 전송은 성공합니다.

얼마나 많은 대체 가능한 토큰이 전송되었는지 확인하려면 다음을 살펴보세요.

- `result` » `transaction` » `actions` » `FunctionCall` » `args`로 이동합니다.
- 이는 JSON 페이로드를 제공하고, `amount` 키를 찾아줄 것입니다.
- 이 값은 성공적으로 전송된 대체 가능한 토큰의 수를 나타내는 문자열화된 숫자가 포함할 것입니다.

## 전송 및 호출 {#transfer-and-call}

"전송 및 호출"을 사용하는 대체 가능한 토큰에 대한 새로운 아이디어가 있는 경우, [Nomicon 사양](https://nomicon.io/Standards/FungibleToken/Core.html#reference-level-explanation) 내 함수에 있는 설명을 검토하세요. 또한 [EIP-677](https://github.com/ethereum/EIPs/issues/677)의 유사한 아이디어를 참조하세요.

이 예에서는 [near-sdk-rs/examples/fungible-token](https://github.com/near/near-sdk-rs/tree/master/examples/fungible-token)에서 FT 컨트랙트를 구축하고 배포합니다.

`ft` 컨트랙트(수신자)에서 `ft_transfer_call` 함수를 호출하고, 성공 및 실패 시나리오를 검토해 봅시다.

### 성공적인 전송 및 호출 {#successful-transfer-and-call}

9 N만 필요한 `DEFI` 컨트랙트에 10 N을 보내 봅시다.

- NEAR CLI 사용
  ```bash
  near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "10", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001
  ```

- JSON RPC 호출 사용

트랜잭션 표현:

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

````
```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
  params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZqPqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTn9j4g2IJ8nGQ38i3+k+4WBAeJL1xP7ygQhC7CrvEG4NQEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxWAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzNjkzMTIxOTU1LTcxNjY3NjMyNTMxMTc2IiwiYW1vdW50IjoiMTAiLCJtc2ciOiJ0YWtlLW15LW1vbmV5In0AQHoQ81oAAAEAAAAAAAAAAAAAAAAAAAAANY2lHqJlAJYNDGEQiUNnmfiBV44Q1sdg45xNlNvlROOM+AtN1z3PSJqM6M6jAKXUwANoQTzFqXhIMHIjIPbTAA=="]'
```
````

이 트랜잭션의 세부 사항을 얻으려면, 다음과 같이 할 수 있습니다.

```bash
http post https://archival-rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
    params:='["5n1kwA3TQQyFTkddR2Jau3H1Pt8ebQNGaov6aCQ6TDp1", "serhii.testnet"]' id=myid
```

<details>
<summary>응답 예시:</summary>

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

이제, 이전 섹션에서 설명한 단계를 따라 이러한 트랜잭션이 성공했는지 확인하겠습니다. 성공 여부 외에도, 일련의 교차 컨트랙트 호출(cross-contract call)에서 다양한 Receipt를 분석하여 얼마나 많은 대체 가능한 토큰이 전송되었는지 확인합시다. 이것은 우리가 살펴볼 가장 복잡한 경우입니다.

1. `result` » `transaction_outcome` » `outcome` » `status`로 가서 `SuccessReceiptId`가 키인지 확인합니다. 만약 아니라면, 토큰은 전송되지 않습니다.
2. `SuccessReceiptId` 키의 값을 가져옵니다. 위 경우, 이는 `Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk`입니다.
3. 이제, `result` » `receipts`에서 `receipt_id`가 2단계의 값과 일치하는 receipt를 찾을 때까지 배열을 반복합니다. (receipt 내에서, `method_name: "ft_transfer_call"` 호출을 언급하는 요소가 `Actions` 아래에 있음을 주의하세요) 동일한 디렉토리의 JSON 내에는 `args` 키가 있습니다. JSON과 같은 수준에 `args` 키가 있습니다. 이는 메서드에 전달되는 인자의 base64 인코딩된 값입니다. 디코딩하면 다음과 같습니다.

```json
{"receiver_id":"dev-1623693121955-71667632531176","amount":"10","msg":"take-my-money"}
```

4. `id`가 2단계의 값과 같은 객체를 찾을 때까지 `result` » `receipts_outcome`을 반복합니다. 1단계와 유사하게, 이 객체는 `SuccessReceiptId` 키를 담고 있는 `status` 필드도 포함할 것입니다. 다시, 만약 토큰이 전송된 것이라면, `SuccessReceiptId`의 값을 가져옵니다. 위 예시에서, 이 값은 `4Tc8MsrJZSMpNZx7u4jSqxr3WhRzqxaNHxLJFqz8tUPR`입니다.
5. 이전 단계와 유사하게, `id`가 4단계의 값과 같은 객체를 찾을 때까지 `result` » `receipts_outcome`을 반복합니다. 해당 객체에서 `outcome` » `status`가 `SuccessValue`를 가지고 있는지 확인합니다. 이 `SuccessValue`는 수령 컨트랙트가 얼마나 많은 토큰을 토큰 컨트랙트로 "반환하고 있는지"을 나타냅니다. 위 예시에서 이 값은 `Ijki`로, 이는 `"9"`의 base64 인코딩된 버전입니다. 이 시점에서 우리는 10개의 대체 가능한 토큰이 전송되었고(3단계에서), 9개가 사용되었다는 것을 알 수 있습니다.

좀 더 명확하게 하기 위해, 하나만 더 확인해보도록 하겠습니다. 4단계에서, 우리는 `result` » `receipts_outcome` 내 객체를 분리했습니다. 이는 `receipt_ids`의 배열이었고, 이는 꽤 흥미롭습니다. 해당 배열 내 첫 요소는 receipt ID `EB69xtJiLRh9RNzAHgBGmom8551hrK2xSRreqbjvJgu5`입니다. 만약 `result` » `receipts_outcome`을 반복하여 이 값이 `id` 키에 대한 값임을 찾았다면, `ft_on_transfer` 함수 내에서 컨트랙트가 토큰을 수령하는 작업이 발생했다는 것을 알게 될 것입니다. 이 객체에서 `status` » `SuccessValue`는 `"1"`의 base64 인코딩된 값인 `IjEi`입니다.

요약하면,

1. 사용자는 대체 가능한 토큰 컨트랙트를 `ft_transfer_call` 메서드로 호출하여, 수신자 계정, 보낼 토큰 수 및 사용자 정의 정보를 지정하였습니다.
2. 수신자 계정은 `ft_on_transfer`를 구현하여, 대체 가능한 토큰 컨트랙트의 콜백 함수로 `"1"`을 반환합니다.
3. 대체 가능한 토큰 컨트랙트의 콜백은 `ft_resolve_transfer`이며, `"1"`을 반환합니다. 이는 1개의 토큰이 반환되었다는 의미이므로, 보내려는 10개에서 이를 뺍니다. 그런 다음 일련의 교차 컨트랙트 호출에서 사용된 토큰 수 `"9"`를 사용자에게 반환합니다.

### 실패한 전송 및 호출 {#failed-transfer-and-call}

계정에 있는 것보다 더 많은 토큰을 전송해 보겠습니다.

- NEAR CLI 사용
  ```bash
      near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "1000000000", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001
  ```

트랜잭션 표현:

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

- JSON RPC 호출 사용
  ```bash
      http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
      params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZn/qoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTnrbOQ93Wv9xxBwmq4yDYrssCpwKSI2bzjNNCCCHMZKNwEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxeAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzMzMzOTE2MzY4LTU4NzA3NDM0ODc4NTMzIiwiYW1vdW50IjoiMTAwMDAwMDAwMCIsIm1zZyI6InRha2UtbXktbW9uZXkifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABQh3k+7zG2m/Yz3O/FBrvLaBwR/5YRB5FbFnb27Nfu6BW/Wh77RFH7+ktBwGLBwFbJGxiumIcsqBiGXgg1EPMN"]'
  ```

이 트랜잭션의 세부 사항은 다음과 같이 얻을 수 있습니다.

```bash
http post https://archival-rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
    params:='["FQsh44pvEsK8RS9AbK868CmGwfhUU2pUrizkQ6wCWTsB", "serhii.testnet"]' id=myid
```

<details>
<summary>응답 예시:</summary>

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

응답을 분석해 봅시다.

- `result` » `transaction_outcome` » `outcome` » `status` » `SuccessReceiptId`는 `83AdQ16bpAC7BEUyF7zoRsAgeNW7HHmjhZLvytEsrygo`입니다.
- `result` » `receipts_outcome` » `0` » `outcome` » `status`를 확인하고, 거기에서 상태가 `Failure`인지 찾아봅니다.

:::tip 질문이 있으신가요? <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
