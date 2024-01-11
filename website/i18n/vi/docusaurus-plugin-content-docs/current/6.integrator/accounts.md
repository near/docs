---
id: accounts
title: Account
sidebar_label: Accounts
---

## Giới thiệu {#introduction}

Vui lòng xem [tài liệu cho các account](/docs/concepts/account) đối với các thông tin cơ bản.

- Đối với các sàn giao dịch, NEAR hỗ trợ tạo [implicit account](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) cho phép việc tạo các account mà không cần trả phí cho bất kỳ transaction nào.
- Bạn có thể tạo một implicit account bằng cách làm theo các bước trong [hướng dẫn này](/docs/roles/integrator/implicit-accounts).
- Accounts must have enough tokens to cover its storage which currently costs `0.0001 NEAR` per byte. This equates to a minimum balance of `0.00182 NEAR` for an account with one access key. Bạn có thể truy vấn giá storage trực tiếp bằng cách sử dụng [`protocol-config`](https://docs.near.org/api/rpc/setup#protocol-config) RPC endpoint. Để có thêm thông tin chi tiết về các loại phí storage vui lòng xem [section này của economics paper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

## Transfer từ Function Call {#transfer-from-function-call}

NEAR cho phép các transfer diễn ra trong một function call. Quan trọng hơn, khi một account được deploy với một contract nào đó, có thể cách duy nhất để transfer các token từ account đó là thông qua một function call. Tuy nhiên, các sàn giao dịch cũng cần phải hỗ trợ việc transfer thông qua các function call tương tự. Chúng tôi đề xuất cách tiếp cận sau:

Sàn giao dịch có thể [truy vấn block by height](/api/rpc/setup#block) để lấy thông tin các block trên mỗi height, và đối với mỗi block, [truy vấn chunk của nó](/api/rpc/setup#chunk) để thu thâp được các transtraction được đính kèm trong mỗi block. Đối với mỗi transaction, [truy vấn status của nó](/api/rpc/setup#transaction-status-with-receipts) để thấy được các receipt được tạo ra từ các transaction. Bởi vì các sàn giao dịch chỉ quan tâm đến các transfer đến địa chỉ của họ, họ chỉ cần lọc các receipt mà chỉ chứa action `Transfer` và `predecessor_id` không phải là `system` (các receipts với `predecessor_id` bằng `system` là [các refund](https://nomicon.io/RuntimeSpec/Refunds.html)). Sau đó, để kiểm tra receipt có thành công hay không, chỉ cần tìm `receipt_id` trong `receipts_outcome` và xem status của nó là `SuccessValue`.

Ngoài ra, sàn giao dịch có thể sử dụng [indexer framework](https://github.com/near/nearcore/tree/master/chain/indexer) để giúp index on-chain data bao gồm các receipt. Một ví dụ sử dụng indexer có thể tìm thấy [tại đây](https://github.com/near/nearcore/tree/master/tools/indexer/example).

Dưới đây, chúng tôi kể ra các ví dụ từ các contract có khả năng được sử dụng để thực hiện transfer thông qua các function call.

**Ví dụ về transfer từ một lockup contract**

Một contract `evgeny.lockup.near` đã được deploy và chúng ta có thể kiểm tra chủ sở hữu của nó bằng cách

```bash
> near view evgeny.lockup.near get_owner_account_id
View call: evgeny.lockup.near.get_owner_account_id()
'evgeny.near'
```

Bây giờ chúng ta muốn chuyển một số các unlocked token (1 NEAR) bằng lệnh call sau

```bash
near call evgeny.lockup.near transfer '{"amount":"1000000000000000000000000", "receiver_id": "evgeny.near"}' --accountId=evgeny.near
```

**Lưu ý**: response dưới đây có thể nhận được bằng cách thực hiện RPC với transaction hash và NEAR account như sau:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=txstatus method=EXPERIMENTAL_tx_status \
  params:='[ "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2", "evgeny.near"]'
```

<details>
<summary>**Ví dụ về response như sau:**</summary>

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

Như chúng ta có thể thấy, có bốn receipt được tạo ra trong function call này. Nếu chúng ta áp dụng các tiêu chí đã đề cập ở trên, chúng ta có thể tìm trong `các receipt` field object này

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

chỉ chứa `Transfer` action và có `predecessor_id` không phải là `system`. Bây giờ chúng ta có thể kiểm tra status của quá trình thực thi bằng cách tìm một receipt id tương tự `EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC` trong `receipts_outcome` field của kết quả được trả về từ rpc, điều này dẫn chúng ta đến kết quả thực thi này

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

và status của nó chứa ` SuccessValue `, điều này cho biết rằng receipt đã thành công. Do đó chúng ta biết rằng `1000000000000000000000000` yoctoNEAR, hay 1 NEAR đã được chuyển thành công.

**Ví dụ về transfer từ một multisig contract**

Mutisig contract, giống như tên của nó, sử dụng nhiều chữ ký để xác nhận một transaction và do đó, các hành động được thực hiện bởi multisig contract bao gồm nhiều transaction. In the following example, we will show how a transfer is done from a multisig contract that requires two confirmations.

- Bước đầu tiên: `add_request_and_confirm`. Việc này bắt đầu hành động mà multisig contract muốn thực hiện với một xác nhận. Multisig contract `multsigtest.testnet` muốn transfer 1 NEAR tới `bowen` và đầu tiên nó gửi một transaction, call `add_request_and_confirm` với một request

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

điều đó cho thấy nó muốn chuyển 1 NEAR tới `bowen`. Lưu ý rằng transaction này chỉ ghi lại hành động mà không thực hiện transfer thực tế. Kết quả transaction như sau:

<details>
<summary>**Ví dụ về response nhận được:**</summary>

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

- Bước thứ 2: `confirm`. Transaction thứ hai được gửi để xác nhận transfer. Transaction này sử dụng request id được trả lại bởi transaction đầu tiên và thực hiện actual transfer. Kết quả transaction như sau

<details>
<summary>** Ví dụ về response nhận được:**</summary>

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

Lưu ý rằng tương tự như transfer từ lockup contract, cũng có một receipt trong `receipts` field đáp ứng yêu cầu của chúng ta:

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

và chúng ta có thể tìm thấy kết quả của nó trong `receipts_outcome`:

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

cho biết rằng transaction đã thành công.

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
