---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

### Transaction Reference Links
 - [Basics](/docs/concepts/transaction)
 - [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)
 - [Constructing Transactions](/docs/tutorials/create-transactions)

## Native NEAR (Ⓝ)

## Balance Changes

> Balance changes on accounts can be tracked by using our [changes RPC endpoint](/docs/api/rpc#view-account-changes). You can test this out by sending tokens to an account using [NEAR-CLI](/docs/tools/near-cli#near-send) and then viewing the changes made.

### Prerequisites

- [NEAR Account](/docs/develop/basics/create-account)
- [NEAR-CLI](/docs/tools/near-cli)
- Credentials for sender account stored locally by running [`near login`](/docs/tools/near-cli#near-login)

### Send Tokens

- Send tokens using [`near send`](/docs/tools/near-cli#near-send)

```bash
near send sender.testnet receiver.testnet 1
```

- You should see a result in your terminal that looks something like this:

```bash
Sending 1 NEAR to receiver.testnet from sender.testnet
Transaction Id 4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/4To336bYcoGc3LMucJPMk6fMk5suKfCrdNotrRtTxqDy
```

### View Balance Changes

- Open the transaction URL in [NEAR Explorer](https://explorer.testnet.near.org/) and copy the `BLOCK HASH`.
- Using the `BLOCK HASH` and the accountId, query the [changes RPC endpoint](/docs/api/rpc#view-account-changes) to view changes.

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

Alternatively, you can view account balances by [querying `view_account`](/docs/api/rpc#view-account) which only requires an accountId.

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

**Note:** Gas prices can change between blocks. Even for transactions with deterministic gas cost the cost in NEAR could also be different. You can query the gas price for recent blocks using the [`gas_price` RPC endpoint](https://docs.near.org/docs/api/rpc#gas-price).

---

## Accounts

Please see the [documentation for accounts](/docs/concepts/account) for basic information.

- For exchanges, NEAR supports [implicit account](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) creation which allows the creation of accounts without paying for transactions.
- You can create an implicit account by following the steps in [this guide](/docs/roles/integrator/implicit-accounts).
- Accounts must have enough tokens to cover its storage which currently costs 0.0001 NEAR per byte. This equates to a minimum balance of 0.0182 NEAR for an account with one access key. You can query the live storage price using the [`protocol-config`](https://docs.near.org/docs/api/rpc#protocol-config) RPC endpoint. For more details on storage fees see [this section of the economics paper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

### Transfer from Function Call

NEAR allows transfers to happen within a function call. More importantly, when an account is deployed with some contract, it is possible that the only way to transfer tokens from that account is through a function call. Therefore, exchanges need to support transfers through function calls as well. We recommend the following approach:

Exchange can [query block by height](/docs/api/rpc#block) to get blocks on each height, and for every block,
[query its chunk](/docs/api/rpc#chunk) to obtain the transactions included in the block. For each transaction,
[query its status](/docs/api/rpc#transaction-status-with-receipts) to see the receipts generated from
transactions. Since exchanges are only interested in transfers to their addresses, they only need to filter receipts that
only contain `Transfer` action and whose `predecessor_id` is not `system` (receipts with `predecessor_id` equal to `system`
are [refunds](https://nomicon.io/RuntimeSpec/Refunds.html)). Then, to check whether the receipt succeeds, it is sufficient
to look for the `receipt_id` in `receipts_outcome` and see if its status is `SuccessValue`.

Alternatively, exchange can use [the indexer framework](https://github.com/near/nearcore/tree/master/chain/indexer)
to help index on-chain data which include receipts. An example usage of the indexer can be found [here](https://github.com/near/nearcore/tree/master/tools/indexer/example).

Below we include examples from the contracts that are likely to be used to perform transfers through function calls.

**Example of transfer from a lockup contract**

A contract `evgeny.lockup.near` is deployed and we can check its owner by

```bash
> near view evgeny.lockup.near get_owner_account_id
View call: evgeny.lockup.near.get_owner_account_id()
'evgeny.near'
```

Now we want to transfer some unlocked tokens (1 NEAR) with the following call

```bash
near call evgeny.lockup.near transfer '{"amount":"1000000000000000000000000", "receiver_id": "evgeny.near"}' --accountId=evgeny.near
```

**Note**: the response below can be obtained by hitting the RPC with the transaction hash and NEAR account like this:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=txstatus method=EXPERIMENTAL_tx_status \
  params:='[ "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2", "evgeny.near"]'
```

<details>
<summary>**Example Response:**</summary>

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

As we can see, there are four receipts generated in this function call. If we apply the criteria mentioned above, we can
find in `receipts` field this object

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

which contains only `Transfer` action and whose `predecessor_id` is not `system`. Now we can check the status of the
execution by looking for the same receipt id `EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC` in `receipts_outcome` field
of the rpc return result, this leads us to this execution outcome

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

and its status contains `SuccessValue`, which indicates that the receipt has succeeded. Therefore we know that
`1000000000000000000000000` yoctoNEAR, or 1 NEAR has been successfully transferred.

**Example of transfer from a multisig contract**

Mutisig contract, as the name suggests, uses multiple signatures to confirm a transaction and therefore, actions performed
by the multisig contract involves multiple transactions. In the following example, we will show a how a transfer is done from
a mutlisig contract that requires two confirmations.

- First step: `add_request_and_confirm`. This initiates the action that the multisig contract wants to perform with one
  confirmation. The multisig contract `multsigtest.testnet` wants to transfer 1 NEAR to `bowen` and it first
  sends a transaction that calls `add_request_and_confirm` with a request

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

that indicates it wants to transfer 1 NEAR to `bowen`. Notice that this transaction only records the action
but does not perform the actual transfer. The transaction result is as follows:

<details>
<summary>**Example Response:**</summary>

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

- Second step: `confirm`. A second transaction is sent to confirm the transfer. This transaction takes the request id
  returned by the first transaction and does the actual transfer. The transaction result is as follows

<details>
<summary>**Example Response:**</summary>

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

Notice that similar to the transfer from lockup contract, there is also one receipt in the `receipts` field that meet
our requirements:

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

and we can find its outcome in `receipts_outcome`:

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

which indicates that the transaction is successful.

## Fungible tokens

Please see the [spec for the fungible token standard](https://nomicon.io/Standards/FungibleToken/README.html) and an [example implementation](https://github.com/near-examples/FT) for reference details.

One notable aspect of the standard is that method names are prefixed with `ft_`. This will be a helpful convention when querying for transactions related to fungible tokens.

### Get balance

Using the abstraction of the [NEAR CLI](/docs/tools/near-cli) tool, we can check the balance of a user's account with [`near view`](/docs/tools/near-cli#near-view):

`near view ft.demo.testnet ft_balance_of '{"account_id": "mike.testnet"}'`

Returns:

```
View call: ft.demo.testnet.ft_balance_of({"account_id": "mike.testnet"})
'1000000'
```

Alternatively, you can [call a contract function](/docs/api/rpc#call-a-contract-function) using the `query` RPC endpoint. Below is an example using HTTPie:

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

Returns:

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

As mentioned earlier, the `result` is an array of bytes. There are various ways to convert bytes into a more human-readable form such as the [dtool CLI](https://github.com/guoxbin/dtool#installation).

`dtool a2h '[34,49,48,48,48,48,48,48,34]' | dtool h2s`

Returns:

`"1000000"`

**Note:** The fungible token balance of the account `mike.testnet` is `1000000` wrapped in double-quotes. This is because of an issue with JSON serialization. Amounts given in arguments and results must be serialized as Base-10 strings, e.g. "100". This is done to avoid JSON limitation of max integer value of 2**53, which can certainly happen with fungible tokens.

### Get info about the FT

You can get `name`, `decimals`, `icon` and other parameters by calling the next function:
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

### Simple transfer

To follow this guide, please check the [step by step instructions](/docs/tutorials/create-transactions#low-level----create-a-transaction) on how to create a transaction first. 

In order to send a fungible token to an account, the receiver must have a storage deposit. This is because each smart contract on NEAR must account for storage used, and each account on a fungible token contract is a key-value pair, taking up a small amount of storage. For more information, please see [how storage works in NEAR](/docs/concepts/storage-staking). To check if account has deposited the storage for this FT do the following:

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
         "eyJhY2NvdW50X2lkIjogInNlcmhpaS50ZXN0bmV0In0K"
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
    near call <contract_account_id> storage_deposit '' --accountId <user_account_id> --deposit <deposit in Ⓝ>`
    ```

    Result example:

    ```bash
    Scheduling a call: ft.demo.testnet.storage_deposit() with attached 0.125 NEAR
    Transaction Id 9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/9CMrMMt3UzeU63FFrUyFb1gNGuHXxvKfHqYJzyFTAk6z
    { total: '1250000000000000000000', available: '0' }
    ```

  - with JSON RPC call:
      
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
    https://explorer.mainnet.near.org/transactions/3MkWKbXVP8wyy4pBofELqiE1pwx7ie2v3SKCwaobNcEe
    ''
    ```

  - with JSON RPC call:

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

  - using NEAR Explorer: https://explorer.near.org

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
    near call <contract_account_id> ft_transfer '{"receiver_id": "<user_account_id>", "amount": "10000000000"}' --accountId<contract_account_id> --amount 0.000000000000000000000001
    ```

  - with JSON RPC call:
        
    ```bash
      http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
      params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZofqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTm8Xq8BTIi6utG0424Gg7CknYzLH8RH/A409jq5o0zi7gEAAAACCwAAAGZ0X3RyYW5zZmVyPwAAAHsicmVjZWl2ZXJfaWQiOiJkZXYtMTYyMzMzMzkxNjM2OC01ODcwNzQzNDg3ODUzMyIsImFtb3VudCI6IjEifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABCwjqayKdpWgM6PE0ixzm/Gy0EtdpxVn0xehMTBReVfVAKIBTDPoPSaOdT8fAhk343F5uOMfSijhTqU2mWV3oD"]'
    ```

To get details of this transaction:

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

### Transfer and call

If the idea of a fungible token using "transfer and call" is new, please review the comments above the function in [the Nomicon spec](https://nomicon.io/Standards/FungibleToken/Core.html#reference-level-explanation). Also, see a similar idea [from EIP-677](https://github.com/ethereum/EIPs/issues/677).

For this example we will build and deploy FT contracts from [near-sdk-rs/examples/fungible-token](https://github.com/near/near-sdk-rs/tree/master/examples/fungible-token).

Let's call `ft_transfer_call` function on `ft` contract (receiver) and examine successful and unsuccessful scenarios.

#### Successful transfer and call
  Let's send 10 N to `DEFI` contract that requires only 9 N.

  - using NEAR CLI
    ```bash
    near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "10", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001
    ```

  - with JSON RPC call
    ```bash
      http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
      params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZqPqoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTn9j4g2IJ8nGQ38i3+k+4WBAeJL1xP7ygQhC7CrvEG4NQEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxWAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzNjkzMTIxOTU1LTcxNjY3NjMyNTMxMTc2IiwiYW1vdW50IjoiMTAiLCJtc2ciOiJ0YWtlLW15LW1vbmV5In0AQHoQ81oAAAEAAAAAAAAAAAAAAAAAAAAANY2lHqJlAJYNDGEQiUNnmfiBV44Q1sdg45xNlNvlROOM+AtN1z3PSJqM6M6jAKXUwANoQTzFqXhIMHIjIPbTAA=="]'
    ```

<details>
<summary>**Example Response:**</summary>

```json
{
  "id": "dontcare",
  "jsonrpc": "2.0",
  "result": {
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
            "Sender @serhii.testnet is transfering 10 tokens using ft_on_transfer, msg = take-my-money"
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

Now, let's try to follow the steps described in the previous section and determine if these transactions was successful.
  * `result` » `transaction_outcome` » `outcome` has `SuccessReceiptId` field
  * It's value is `Hw6z8kJ7CSaC6SgyQzcmXzNX9gq1gaAnLS169qgyZ2Vk` and it's a `receipt ID`.
  * we can find it in `result` » `receipts_outcome` under position `0`
  * `0` position `outcome` has its own `outcome` » `status` »  `SuccessReceiptId`, which can point us to another recipe
  * this recipe can be found under position `3`, it has `SuccessValue` in its `outcome` » `status`, so the transaction was successful.

#### Failed transfer and call
Let's try to send more tokens that account have:

  - using NEAR CLI
    ```bash
        near call <ft_contract_id> ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "1000000000", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001

    ```

  - with JSON RPC call
      ```bash
          http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
          params:='["DgAAAHNlcmhpaS50ZXN0bmV0AEKEp54fyVkp8dJE2l/m1ErjdhDGodBK8ZF6JLeHFMeZn/qoVEgrAAAgAAAAZGV2LTE2MjMzMzM3OTU2MjMtMjEzOTk5NTk3NzgxNTnrbOQ93Wv9xxBwmq4yDYrssCpwKSI2bzjNNCCCHMZKNwEAAAACEAAAAGZ0X3RyYW5zZmVyX2NhbGxeAAAAeyJyZWNlaXZlcl9pZCI6ImRldi0xNjIzMzMzOTE2MzY4LTU4NzA3NDM0ODc4NTMzIiwiYW1vdW50IjoiMTAwMDAwMDAwMCIsIm1zZyI6InRha2UtbXktbW9uZXkifQBAehDzWgAAAQAAAAAAAAAAAAAAAAAAAABQh3k+7zG2m/Yz3O/FBrvLaBwR/5YRB5FbFnb27Nfu6BW/Wh77RFH7+ktBwGLBwFbJGxiumIcsqBiGXgg1EPMN"]'
      ```
    
To get details of this transaction:

```bash
http post https://archival-rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status \
    params:='["FQsh44pvEsK8RS9AbK868CmGwfhUU2pUrizkQ6wCWTsB", "serhii.testnet"]'
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

## Blocks and Finality

Some important pieces of information regarding blocks and finality include:

- Expected block time is around 1s and expected time to finality is around 2s. The last final block can be queried by
  specifying `{"finality": "final"}` in the block query. For example, to get the latest final block on mainnet, one can run

```bash
http post https://rpc.mainnet.near.org method=block params:='{"finality":"final"}' id=123 jsonrpc=2.0
```

- Block height are not necessarily continuous and certain heights may be skipped if, for example, a block producer for that height is offline. For example, after a block at height 100 is produced, the block at height 101 may be skipped. When block at height 102 is produced, its previous block is the block at height 100.

- Some blocks may not include new chunks if, for example, the previous chunk producer is offline. Even though in the RPC
  return result every block will have non-empty `chunks` field, it does not imply that there is a new chunk included in the block.
  The way to tell whether the chunk is included in the block is to check whether `height_included` in the chunk is the same
  as the height of the block.

## Running an Archival Node
Please refer to configuration changes required in `config.json` for archival node by referring to the documentation on [Run an Archival Node](/docs/develop/node/archival/run-archival-node).

## Staking and Delegation

- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
