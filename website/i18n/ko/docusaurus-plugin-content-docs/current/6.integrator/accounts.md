---
id: accounts
title: 계정
sidebar_label: 계정
---

## 소개 {#introduction}

기본적인 정보는 [계정에 대한 문서](/concepts/basics/accounts/model)를 참고하세요.

- 거래소의 경우, NEAR는 트랜잭션 비용을 지불하지 않고 계정을 생성할 수 있는 [암시적 계정(Implicit Account)](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) 생성을 지원합니다.
- [이 가이드](/integrator/implicit-accounts)의 단계에 따라 암시적 계정을 만들 수 있습니다.
- Accounts must have enough tokens to cover its storage which currently costs `0.0001 NEAR` per byte. This equates to a minimum balance of `0.00182 NEAR` for an account with one access key. [`protocol-config`](https://docs.near.org/api/rpc/setup#protocol-config) RPC 엔드포인트를 사용하여 실시간 스토리지 가격을 쿼리할 수 있습니다. For more details on storage fees see [this section of the economics paper](https://pages.near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

## 함수 호출에 의한 전송 {#transfer-from-function-call}

NEAR에서는 함수 호출 내에서 전송이 가능합니다. 더 중요한 것은, 계정이 일부 컨트랙트와 함께 배포될 때, 해당 계정에서 토큰을 전송하는 유일한 방법은 함수 호출을 통해서만 가능하다는 것입니다. 따라서 거래소는 함수 호출을 통한 전송도 지원해야 합니다. 다음과 같은 접근 방식을 권장합니다.

거래소는 [높이별로 블록을 쿼리하여](/api/rpc/setup#block) 각 높이에서 블록을 가져오고, 모든 블록에 대해 [청크를 쿼리하여](/api/rpc/setup#chunk) 블록에 포함된 트랜잭션을 얻을 수 있습니다. 각 트랜잭션에 대해, 거래소는 [상태를 쿼리하여](/api/rpc/setup#transaction-status-with-receipts) 트랜잭션에서 생성된 Receipt를 확인합니다. 거래소는 주소로의 전송에만 관심이 있기 때문에, `Transfer` Action만 포함하고 `predecessor_id`가 `system`이 아닌 Receipt만 필터링하면 됩니다(`predecessor_id`가 `system`과 같은 Receipt는 [환불](https://nomicon.io/RuntimeSpec/Refunds.html)됩니다). 그런 다음, Receipt의 성공 여부를 확인하려면, `receipts_outcome`에서 `receipt_id`을 찾아 상태가 `SuccessValue`인지 확인하는 것으로 충분합니다.

아니면 거래소는 [인덱서 프레임워크](https://github.com/near/nearcore/tree/master/chain/indexer)를 사용하여, Receipt를 포함하는 온체인 데이터를 인덱싱할 수 있습니다. 인덱서의 사용 예는 [여기](https://github.com/near/nearcore/tree/master/tools/indexer/example)에서 찾을 수 있습니다.

아래에는 함수 호출을 통해 전송을 수행하는 데 사용될 가능성이 있는 컨트랙트의 예가 포함되어 있습니다.

**락업 컨트랙트에서 전송의 예**

`evgeny.lockup.near` 컨트랙트가 배포되면, 다음과 같이 소유자를 확인할 수 있습니다.

```bash
> near view evgeny.lockup.near get_owner_account_id
View call: evgeny.lockup.near.get_owner_account_id()
'evgeny.near'
```

이제 다음 호출을 통해 잠금 해제된 토큰 일부(1 NEAR)를 전송하려고 합니다.

```bash
near call evgeny.lockup.near transfer '{"amount":"1000000000000000000000000", "receiver_id": "evgeny.near"}' --accountId=evgeny.near
```

**참고**: 아래 응답은 다음과 같이 트랜잭션 해시 및 NEAR 계정으로 RPC를 치면 얻을 수 있습니다.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=txstatus method=EXPERIMENTAL_tx_status \
  params:='[ "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2", "evgeny.near"]'
```

<details>
<summary>응답 예시:</summary>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "evgeny.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicmVjZWl2ZXJfaWQiOiJldmdlbnkubmVhciJ9",
                  "deposit": "0",
                  "gas": 100000000000000,
                  "method_name": "transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU",
        "receiver_id": "evgeny.lockup.near"
      },
      {
        "predecessor_id": "evgeny.lockup.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000000000000000000000000"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
        "receiver_id": "evgeny.near"
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
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv",
        "receiver_id": "evgeny.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18655658845681462514128"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d",
        "receiver_id": "evgeny.near"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "9boEKq9G1UFsEuzmuQrxh5dkRc8xsv8PSPGEkYiTyRLj",
        "id": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU",
        "outcome": {
          "executor_id": "evgeny.lockup.near",
          "gas_burnt": 3574640311481,
          "logs": [
            "Transferring 1000000000000000000000000 to account @evgeny.near"
          ],
          "receipt_ids": [
            "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
            "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d"
          ],
          "status": {
            "SuccessReceiptId": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC"
          },
          "tokens_burnt": "357464031148100000000"
        },
        "proof": []
      },
      {
        "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
        "id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
        "outcome": {
          "executor_id": "evgeny.near",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "AwHdk5dushTSXHFBt3R5MiexjiXybwdnEaB7L9iJ5F6t"
          }
        ]
      },
      {
        "block_hash": "46788Ay85YGnQaH5tfbboQNWJs3gyXsPbcWzRyxqw56K",
        "id": "J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv",
        "outcome": {
          "executor_id": "evgeny.near",
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
        "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
        "id": "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d",
        "outcome": {
          "executor_id": "evgeny.near",
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
            "hash": "9RRJpH5VdDxsHpp323EshcAauV5wUNDyW9FpEJBRXXq8"
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
            "args": "eyJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicmVjZWl2ZXJfaWQiOiJldmdlbnkubmVhciJ9",
            "deposit": "0",
            "gas": 100000000000000,
            "method_name": "transfer"
          }
        }
      ],
      "hash": "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2",
      "nonce": 6,
      "public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq",
      "receiver_id": "evgeny.lockup.near",
      "signature": "ed25519:4nfzTMpQJKCY3KaqUTFig4Xy9uxwbMeQpMJjtNKsXmwiVqgcVSWRguZEgZM8L2x1jvdpZHsYjLCxc9cSBamXuXPH",
      "signer_id": "evgeny.near"
    },
    "transaction_outcome": {
      "block_hash": "4u7maz2U43W4DPxqQE8KoRNi5dTRHrAsKsFk2qDQsQEw",
      "id": "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2",
      "outcome": {
        "executor_id": "evgeny.near",
        "gas_burnt": 2428086459116,
        "logs": [],
        "receipt_ids": ["CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU"],
        "status": {
          "SuccessReceiptId": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU"
        },
        "tokens_burnt": "242808645911600000000"
      },
      "proof": []
    }
  }
}
```
</details>

보시다시피 이 함수 호출에서 생성된 Receipt가 4개 있습니다. 위에서 언급한 기준을 적용하면 `receipts` 필드에서 이 객체를 찾을 수 있습니다.

```json
{
  "predecessor_id": "evgeny.lockup.near",
  "receipt": {
    "Action": {
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "gas_price": "186029458",
      "input_data_ids": [],
      "output_data_receivers": [],
      "signer_id": "evgeny.near",
      "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
    }
  },
  "receipt_id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
  "receiver_id": "evgeny.near"
}
```

이는 `Transfer` Action을 포함하고, 여기서 `predecessor_id`은 `system`이 아닙니다. 이제 rpc 반환 결과의 `receipts_outcome` 필드에서 `EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC`에서 동일한 Receipt ID를 찾아 실행 상태를 확인할 수 있으며, 이는 다음 실행 결과로 이어집니다.

```json
{
  "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
  "id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
  "outcome": {
    "executor_id": "evgeny.near",
    "gas_burnt": 223182562500,
    "logs": [],
    "receipt_ids": ["J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv"],
    "status": {
      "SuccessValue": ""
    },
    "tokens_burnt": "22318256250000000000"
  },
  "proof": [
    {
      "direction": "Right",
      "hash": "AwHdk5dushTSXHFBt3R5MiexjiXybwdnEaB7L9iJ5F6t"
    }
  ]
}
```

상태에는 `SuccessValue`가 포함되어 있으며, Receipt가 성공했음을 나타냅니다. 따라서 우리는 `1000000000000000000000000` yoctoNEAR 또는 1 NEAR가 성공적으로 전송되었음을 알 수 있습니다.

**다중 서명(Multisig) 컨트랙트에서 전송 예시**

이름에서 알 수 있듯이 다중 서명 컨트랙트는 트랜잭션을 확인하기 위해 다중 서명을 사용하므로, 다중 서명 컨트랙트에서 수행하는 작업에는 여러 트랜잭션이 포함됩니다. In the following example, we will show how a transfer is done from a multisig contract that requires two confirmations.

- 첫 번쨰 단계: `add_request_and_confirm`을 통해, 다중 서명 컨트랙트의 첫 번째 확인 작업을 시작합니다. 이는 다중 서명 컨트랙트가 한 개의 확인 작업으로 실행하고 싶은 Action을 시작합니다. 다중 서명 컨트랙트 `multsigtest.testnet`는 `bowen`에게 1 NEAR를 전송하려고 하며, 먼저 요청과 함께 `add_request_and_confirm`를 호출하는 트랜잭션을 보냅니다.

```json
{
  "request": {
    "receiver_id": "bowen",
    "actions": [
      {
        "type": "Transfer",
        "amount": "1000000000000000000000000"
      }
    ]
  }
}
```

이는 1 NEAR를 `bowen`에 전송하려고 하는 것을 나타냅니다. 이 트랜잭션은 작업을 기록할 뿐 실제 전송을 수행하지는 않습니다. 트랜잭션 결과는 다음과 같습니다.

<details>
<summary>응답 예시:</summary>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "3069687780141648922140"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:JDewsbE7nz6orFD4zJ3mVzqhfcaoSD6Hmi5as3AHHiTt"
          }
        },
        "receipt_id": "4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD",
        "receiver_id": "multisigtest.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "6uJWHTvUrtFQAurUyfuAfy9EdoR9FhLodGh44aHJta6m",
        "id": "94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 8024094920263,
          "logs": [],
          "receipt_ids": ["4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD"],
          "status": {
            "SuccessValue": "OA=="
          },
          "tokens_burnt": "802409492026300000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "GedzmwRkxA5VkT8GLBCnrPUmnEhWPXadPmiq4Ho1s9pH"
          },
          {
            "direction": "Right",
            "hash": "GirkzdS9YpsAz5fXuL5T3rXd93aRcnXNAdXYi241qpWK"
          }
        ]
      },
      {
        "block_hash": "4JyQ6guJKeWZxxXrKndLDuSa5URuirmBi6RzsbKYFsBE",
        "id": "4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      }
    ],
    "status": {
      "SuccessValue": "OA=="
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZXF1ZXN0Ijp7InJlY2VpdmVyX2lkIjoiYm93ZW4iLCJhY3Rpb25zIjpbeyJ0eXBlIjoiVHJhbnNmZXIiLCJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn1dfX0=",
            "deposit": "0",
            "gas": 30000000000000,
            "method_name": "add_request_and_confirm"
          }
        }
      ],
      "hash": "FGREJkC1e8y95Rc35iD1LVRiDy1WcAZhAxxkSinfb2mL",
      "nonce": 10,
      "public_key": "ed25519:JDewsbE7nz6orFD4zJ3mVzqhfcaoSD6Hmi5as3AHHiTt",
      "receiver_id": "multisigtest.testnet",
      "signature": "ed25519:3NUKXd4uj2eEBqGQtRAxkTFW7UfG44tjvQNNHBDvN9ZswTTMRsDrMJSd1U3GqWF7QToqWQR9J8atNEVTemSWYw41",
      "signer_id": "multisigtest.testnet"
    },
    "transaction_outcome": {
      "block_hash": "6uJWHTvUrtFQAurUyfuAfy9EdoR9FhLodGh44aHJta6m",
      "id": "FGREJkC1e8y95Rc35iD1LVRiDy1WcAZhAxxkSinfb2mL",
      "outcome": {
        "executor_id": "multisigtest.testnet",
        "gas_burnt": 2428204963618,
        "logs": [],
        "receipt_ids": ["94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth"],
        "status": {
          "SuccessReceiptId": "94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth"
        },
        "tokens_burnt": "242820496361800000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "AsNAQabPFkmaugRGhCbzcEcR8Gnd22WXxPM2fb2cwHiv"
        },
        {
          "direction": "Right",
          "hash": "GirkzdS9YpsAz5fXuL5T3rXd93aRcnXNAdXYi241qpWK"
        }
      ]
    }
  }
}
```
</details>

- 두 번째 단계: `confirm`을 통해, 전송을 확정짓는 두 번째 트랜잭션이 보내집니다. 두 번째 트랜잭션은 전송 확인 작업을 위해 보내집니다. 이 트랜잭션은 첫 트랜잭션에 의해 반환된 요청 id를 받아 실제 전송 작업을 수행합니다. 트랜잭션 결과는 다음과 같습니다.

<details>
<summary>응답 예시:</summary>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "multisigtest.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000000000000000000000000"
                }
              }
            ],
            "gas_price": "451542320",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "78458115804795000000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd",
        "receiver_id": "multisigtest.testnet"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "112870156274913516718240"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT",
        "receiver_id": "multisigtest.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "9JEiMrZ1SpAUEbQswde3Diptzwy35Vrvd41VZWG9hYVE",
        "id": "FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 10109796553814,
          "logs": [],
          "receipt_ids": [
            "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
            "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT"
          ],
          "status": {
            "SuccessReceiptId": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy"
          },
          "tokens_burnt": "1010979655381400000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "9e2UcG6qBRahBh3V2Z8bGJLh5c4jXfZdP3WBJkCpJCfj"
          }
        ]
      },
      {
        "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
        "id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "FFWaWUFt6sNx5XNHzGYsYBSYFWtGPoww5XQz1QmLVc8i"
          }
        ]
      },
      {
        "block_hash": "G6LDdnAa2b38TB4KZ89HAyVgfgyiRPDDgSxoZypbUYpx",
        "id": "6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd",
        "outcome": {
          "executor_id": "multisigtest.testnet",
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
        "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
        "id": "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT",
        "outcome": {
          "executor_id": "multisigtest.testnet",
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
            "hash": "DpDYAEKZTtSomgyeNcJ2i4qjvfqnCtf1CXa83Cz5wvEy"
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
            "args": "eyJyZXF1ZXN0X2lkIjo4fQ==",
            "deposit": "0",
            "gas": 250000000000000,
            "method_name": "confirm"
          }
        }
      ],
      "hash": "Fu39vwxC4mu9ks1DZA5Cib63RnBMHpFonk2DcbpioEYc",
      "nonce": 9,
      "public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz",
      "receiver_id": "multisigtest.testnet",
      "signature": "ed25519:2raQq7t3cmzSL2krE2xaNqXhAw7cKMoXrBjT2ZhAGfCVtGwzbbQ8zkB17vrCSFZDbFmPWSJpoqsw8qPZZiorwSzS",
      "signer_id": "multisigtest.testnet"
    },
    "transaction_outcome": {
      "block_hash": "9JEiMrZ1SpAUEbQswde3Diptzwy35Vrvd41VZWG9hYVE",
      "id": "Fu39vwxC4mu9ks1DZA5Cib63RnBMHpFonk2DcbpioEYc",
      "outcome": {
        "executor_id": "multisigtest.testnet",
        "gas_burnt": 2427972426482,
        "logs": [],
        "receipt_ids": ["FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB"],
        "status": {
          "SuccessReceiptId": "FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB"
        },
        "tokens_burnt": "242797242648200000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "B6hN48qeVP8J3hP8XGcANShM264QkNjgJAfMtsuknqex"
        }
      ]
    }
  }
}
```
</details>

락업 컨트랙트에서의 전송 과정과 유사하게, `receipts` 필드 내에 우리의 요구 사항을 충족하는 Receipt도 한 개 있습니다.

```json
{
  "predecessor_id": "multisigtest.testnet",
  "receipt": {
    "Action": {
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "gas_price": "451542320",
      "input_data_ids": [],
      "output_data_receivers": [],
      "signer_id": "multisigtest.testnet",
      "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
    }
  },
  "receipt_id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
  "receiver_id": "bowen"
}
```

결과는 `receipts_outcome`에서 볼 수 있습니다.

```json
{
  "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
  "id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
  "outcome": {
    "executor_id": "bowen",
    "gas_burnt": 223182562500,
    "logs": [],
    "receipt_ids": ["6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd"],
    "status": {
      "SuccessValue": ""
    },
    "tokens_burnt": "22318256250000000000"
  },
  "proof": [
    {
      "direction": "Right",
      "hash": "FFWaWUFt6sNx5XNHzGYsYBSYFWtGPoww5XQz1QmLVc8i"
    }
  ]
}
```

이는 트랜잭션이 성공했음을 나타냅니다.

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
